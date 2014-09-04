create or replace PACKAGE  "EVENT_COMMON_CALENDAR_FILTER_M" as
    TYPE vc_assoc_arr is table of varchar2(32767) index by varchar2(255);
    function get_multi_filter_sql(column_name varchar2,report_ids varchar2 default null) return varchar2;
    function json_escape(p_text varchar2) return varchar2;
    function jsonify_array(p_arr vc_assoc_arr, p_nest number := 0) return varchar2;
    
    procedure get_event_json(p_app_id in varchar2, p_session in varchar2, p_category_id IN varchar2 default NULL, start_date in varchar2 default null, end_date in varchar2 default null,p_customer in clob default NULL,p_exclude in varchar2 default NULL);
    
    
    procedure get_event_json_runtime(p_app_id in varchar2 default NULL, p_session in varchar2 default NULL,
        p_category_id IN varchar2 default NULL, start_date in varchar2 default null, end_date in varchar2 default null,p_customer in clob default null);
    
    function validate_event_runtime(f_query_sql varchar2) return NUMBER;
    function get_validate_event_runtime(f_query_sql varchar2) return varchar2;
    
end;


create or replace PACKAGE BODY  "EVENT_COMMON_CALENDAR_FILTER_M" as
    
    function json_escape(p_text varchar2) return varchar2 is
      --TODO: Correctly escape as per json specs
      begin
        return REGEXP_REPLACE(p_text,'[[:space:]]',' ');
      end;
  
    
function get_multi_filter_sql(column_name varchar2,report_ids varchar2 default null) return varchar2
    
    is
      v_rpid_arr CX_UTIL.T_ARRAY;
      v_ret_sql varchar2(5000);
      v_filter_sql varchar2(1000);
    begin
        IF report_ids IS NULL THEN
            return  return GET_REPORT_SQL_FILTER(10259,113,column_name);
        END IF;
        
        IF INSTR(report_ids,':')=0 THEN
            return GET_REPORT_SQL_FILTER(10259,113,column_name,TO_NUMBER(report_ids));
        END IF;
    
        v_rpid_arr:=CX_UTIL.SPLIT(report_ids,':');
        
        v_ret_sql:='';
        for i in 1..v_rpid_arr.count
        loop
            
            v_filter_sql:=GET_REPORT_SQL_FILTER(10259,113,column_name,TO_NUMBER(v_rpid_arr(i)));
            

            IF v_filter_sql IS NOT NULL THEN
               --htp.p(v_rpid_arr(i)||'--'|| v_filter_sql||'</br>');
               v_ret_sql:=v_ret_sql||' OR '||v_filter_sql;
            END IF;
        end loop;
        v_ret_sql:=LTRIM(v_ret_sql,' OR ');
        v_ret_sql:=' ( '||v_ret_sql||' ) ';
        return v_ret_sql;
    end get_multi_filter_sql;


    function jsonify_array(p_arr vc_assoc_arr, p_nest number := 0) return varchar2 is
        v_json_array clob := '';
        v_newline VARCHAR2(10) := ','||CHR(10);
        v_key VARCHAR2(255);
        v_nesting VARCHAR2(100) := LPAD(' ', p_nest, ' ');
      begin
        v_key := p_arr.FIRST;
        WHILE v_key IS NOT NULL LOOP
          v_json_array := v_json_array||v_nesting||'"'||v_key||'": "'||json_escape(p_arr(v_key))||'"'||v_newline;      
          v_key := p_arr.NEXT(v_key);
        END LOOP;
        
        return REGEXP_REPLACE(v_json_array,v_newline||'$');
      end;
    

      
    -- get manual events
    procedure get_event_json(p_app_id in varchar2, p_session in varchar2, p_category_id IN varchar2 default NULL, start_date in varchar2 default null, end_date in varchar2 default null,p_customer in clob default NULL,p_exclude in varchar2 default NULL) as
        TYPE V_FILTERTyp IS REF CURSOR;
        TYPE V_CUSTREGIONTyp IS REF CURSOR;
        v_start_date date;
        v_end_date date;
        event vc_assoc_arr;
        v_output clob;
        v_buffer pls_integer := 255;
        v_index pls_integer := 1;
        v_category_ids varchar2(100);
        v_customers clob;
        
          v_event_type_filter clob;
          v_region_filter clob;
          v_cust_filter clob;
          v_first_filter_sql clob;
          v_second_filter_sql clob;
          v_filter_cursor V_FILTERTyp;
          v_ev_row v_common_event%ROWTYPE;
          v_csutregion_cursor V_CUSTREGIONTyp;
          v_cg_row CUST_REGION_VW%ROWTYPE;
    begin
      owa_util.mime_header('text/json', false);
      owa_util.http_header_close;
      
      IF start_date IS NOT NULL THEN
          SELECT date'1970-01-01' + start_date/1000/ 60 / 60 / 24   into v_start_date  from dual;
      END IF;
 
      IF end_date IS NOT NULL THEN
          SELECT date'1970-01-01' + end_date/1000/ 60 / 60 / 24  into v_end_date  from dual;
      END IF;
 
       v_event_type_filter:=get_multi_filter_sql('EVENT_TYPE');
       
 
       v_first_filter_sql:='select * from v_common_event where DATA_SOURCE=''MANUAL'' ';
        IF v_event_type_filter IS NOT NULL THEN
            v_first_filter_sql:=v_first_filter_sql|| ' and '||v_event_type_filter;
        END IF;
        v_output := '[';
        
        v_region_filter:=get_multi_filter_sql('REGION');
        v_cust_filter:=replace(get_multi_filter_sql('CUSTOMER_NAME'),'CUSTOMER_NAME','CUSTOMER_CODE');
        open v_filter_cursor for v_first_filter_sql;
        loop
            fetch v_filter_cursor into v_ev_row;
            EXIT WHEN v_filter_cursor%NOTFOUND;
            IF v_ev_row.end_date IS NULL THEN v_ev_row.end_date:=v_ev_row.start_date; END IF;
            
            IF  v_start_date IS NULL OR
                    v_end_date IS NULL OR
                    (v_ev_row.start_date > v_start_date and v_ev_row.start_date <= v_end_date) or
                    (v_ev_row.end_date > v_start_date and v_ev_row.end_date<= v_end_date) THEN
                    
                v_second_filter_sql:='select * from CUST_REGION_VW where 1=1 ';
                IF v_region_filter IS NOT NULL THEN
                    v_second_filter_sql:=v_second_filter_sql|| ' and '||v_region_filter;
                END IF;
                IF v_cust_filter IS NOT NULL THEN
                    v_second_filter_sql:=v_second_filter_sql|| ' and '||v_cust_filter;
                END IF;
                
                IF v_ev_row.SPECIAL_CUSTOMER IS NULL THEN
                    event('id') := v_ev_row.event_id||'_'||v_ev_row.TYPE_ID;
                    event('title') := v_ev_row.category||' : '||v_ev_row.title;
                    --event('allDay'):='false';
                    event('description'):=v_ev_row.description;
                    event('start') := to_char(v_ev_row.start_date, 'yyyy-mm-dd');
                    event('end') := to_char(v_ev_row.end_date, 'yyyy-mm-dd');
                    --event('className') := replace(e.category, ' ', '');
                    event('textColor'):=v_ev_row.TEXT_COLOR;
                    event('backgroundColor'):=v_ev_row.BACKGROUND_COLOR;
                    event('borderColor'):=v_ev_row.BORDER_COLOR;
                    --event('url') := 'f?p='||p_app_id||':114:'||p_session||'::::P114_EVENT_ID,P114_TARGET_PAGEID:'||v_ev_row.event_id||',113';
                    event('specific'):=v_ev_row.SPECIAL_CUSTOMER;
                    v_output := v_output || '{';
                    v_output := v_output || jsonify_array(event,2);
                    v_output := v_output || '},';    
                ELSE
                    v_second_filter_sql:=v_second_filter_sql||' and  instr(UPPER('''||v_ev_row.SPECIAL_CUSTOMER||'''),upper(CUSTOMER_CODE))>0';
                    
                    open v_csutregion_cursor for v_second_filter_sql;
                    loop
                        fetch v_csutregion_cursor into v_cg_row;
                        EXIT WHEN v_csutregion_cursor%NOTFOUND;
                            event('id') := v_ev_row.event_id||'_'||v_ev_row.TYPE_ID;
                            event('title') := v_ev_row.category||' : '||v_ev_row.title;
                            event('description'):=v_ev_row.description;
                            event('start') := to_char(v_ev_row.start_date, 'yyyy-mm-dd');
                            event('end') := to_char(v_ev_row.end_date, 'yyyy-mm-dd');
                            event('textColor'):=v_ev_row.TEXT_COLOR;
                            event('backgroundColor'):=v_ev_row.BACKGROUND_COLOR;
                            event('borderColor'):=v_ev_row.BORDER_COLOR;
                            --event('url') := 'f?p='||p_app_id||':114:'||p_session||'::::P114_EVENT_ID,P114_TARGET_PAGEID:'||v_ev_row.event_id||',113';
                            event('specific'):=v_ev_row.SPECIAL_CUSTOMER;
                             
                            v_output := v_output || '{';
                            v_output := v_output || jsonify_array(event,2);
                            v_output := v_output || '},';    
                        EXIT;                
                    end loop;--end v_csutregion_cursor v_second_filter_sql
                    close v_csutregion_cursor;
                END IF;--end SPECIAL_CUSTOMER is null
                
            END IF;
        
        end loop;--end v_filter_cursor v_first_filter_sql
         close v_filter_cursor;
      
      
      v_output := substr(v_output, 1, dbms_lob.getlength(v_output)-1);--strip away the last comma
      v_output := v_output || ']';
 
      if instr(v_output,'{') < 1 THEN
        v_output:='[]';      
      END IF;
        --print out the contents of output
        for i in 1..ceil(dbms_lob.getlength(v_output)/v_buffer) loop
            htp.prn(substr(v_output,v_index,v_buffer));
            v_index := v_index + v_buffer;
        end loop;
        
      EXCEPTION
         WHEN OTHERS THEN
          v_output:='[]';
          htp.prn(v_output);
           --RAISE;      
 
    end get_event_json;
 
 
    -- get sql events
    procedure get_event_json_runtime(p_app_id in varchar2 default NULL, p_session in varchar2 default NULL,
        p_category_id IN varchar2 default NULL, start_date in varchar2 default null, end_date in varchar2 default null,p_customer in clob default NULL) as
     --Same type as the internal apex vc_assoc_arr, just incase we can just use that later
      TYPE V_EVENTTyp  IS REF CURSOR;
      TYPE V_FILTERTyp IS REF CURSOR;
      v_event_cursor    V_EVENTTyp;
      v_title clob;
      v_description clob;
      v_start_date date;
      v_end_date date;
      p_start_date date;
      p_end_date date;
      v_stmt_str      clob;
      event vc_assoc_arr;
      event_list vc_assoc_arr;        
 
      v_output clob;
      v_buffer pls_integer := 255;
      v_index pls_integer := 1;
      v_category_ids clob;
      v_customers clob;
      v_validate number;
      v_seq number;
      
      
      v_event_type_filter clob;
      v_region_filter clob;
      v_cust_filter clob;
      v_first_filter_sql clob;
      v_second_filter_sql clob;
      v_filter_cursor V_FILTERTyp;
      v_ev_row v_common_event%ROWTYPE;
    begin
      owa_util.mime_header('text/json', false);
      owa_util.http_header_close;
    
      IF start_date IS NOT NULL THEN
          SELECT date'1970-01-01' + start_date/1000/ 60 / 60 / 24  into p_start_date  from dual;
      END IF;
 
      IF end_date IS NOT NULL THEN
          SELECT date'1970-01-01' + end_date/1000/ 60 / 60 / 24  into p_end_date  from dual;
      END IF;
      --Because the JSON needs to return an array, it needs to return in the format
      --[{"property1" : "value1", "property2":"value2"},{"property1" : "value1", "property2":"value2"}]
      
      v_output := '[';
      
    -----------------------------------------------------------------------------------------------------------------------------------
    -----------------------------------------------------------------------------------------------------------------------------------
      v_event_type_filter:=get_multi_filter_sql('EVENT_TYPE');
      v_region_filter:=replace(get_multi_filter_sql('REGION'),'"REGION"','GET_CUST_REGION(EVENT_CUSTOMER)');
      v_cust_filter:=replace(get_multi_filter_sql('CUSTOMER_NAME'),'CUSTOMER_NAME','EVENT_CUSTOMER');
     
      v_first_filter_sql:='select * from v_common_event where DATA_SOURCE=''SQL'' ';
      IF v_event_type_filter IS NOT NULL THEN
        v_first_filter_sql:=v_first_filter_sql|| ' and '||v_event_type_filter;
      END IF;
      
      --htp.p('v_first_filter_sql>>'||v_first_filter_sql);
      v_seq:=0;
      open v_filter_cursor for v_first_filter_sql;
      loop
        FETCH v_filter_cursor into v_ev_row;
        EXIT WHEN v_filter_cursor%NOTFOUND;
        
        v_second_filter_sql:=v_ev_row.SQL_QUERY;
        v_validate:= validate_event_runtime(v_second_filter_sql);
        v_second_filter_sql:='select '||get_validate_event_runtime(v_second_filter_sql)||' from ('||v_second_filter_sql||') where 1=1 ';
        
        
        IF v_validate=2 THEN
            IF v_cust_filter IS not NULL THEN
                v_second_filter_sql:=v_second_filter_sql||' and '||v_cust_filter;    
                
            END IF;
            IF v_region_filter IS NOT NULL THEN
                v_second_filter_sql:=v_second_filter_sql||' and '||v_region_filter;
            END IF;
        END IF;
        --htp.p('v_second_filter_sql>>'||v_second_filter_sql);
        open v_event_cursor for v_second_filter_sql;
        loop
            FETCH v_event_cursor INTO v_title,v_description,v_start_date,v_end_date;
            EXIT WHEN v_event_cursor%NOTFOUND;
            IF v_start_date IS NOT NULL and v_end_date IS NOT NULL THEN
            
                IF (v_start_date > p_start_date and v_start_date <= p_end_date) or
                  (v_end_date > p_start_date and v_end_date<= p_end_date) or (start_date IS NULL and end_date is NULL) THEN
                  
                event('id') := '0'||'_'||v_ev_row.TYPE_ID||'_'||v_seq;
                event('title') := v_title;
                --event('allDay'):='false';
                event('description'):=v_description;
                event('start') := to_char(v_start_date, 'yyyy-mm-dd');
                event('end') := to_char(v_end_date, 'yyyy-mm-dd');
                --event('className') := replace(e.category, ' ', '');
                event('textColor'):=v_ev_row.TEXT_COLOR;
                event('backgroundColor'):=v_ev_row.BACKGROUND_COLOR;
                event('borderColor'):=v_ev_row.BORDER_COLOR;
                --event('url') := '#';
                v_output := v_output || '{';
                v_output := v_output || jsonify_array(event,2);
                v_output := v_output || '},';
                
                END IF;
                v_seq:=v_seq+1;
                
            END IF;
        end loop;
        CLOSE v_event_cursor;
        
      end loop;
      CLOSE v_filter_cursor;
     
    -----------------------------------------------------------------------------------------------------------------------------------
    -----------------------------------------------------------------------------------------------------------------------------------
     
 
      v_output := substr(v_output, 1, dbms_lob.getlength(v_output)-1);--strip away the last comma
      v_output := v_output || ']';
      
      if instr(v_output,'{') < 1 THEN
        v_output:='[]';
      END IF;
      --print out the contents of output
        for i in 1..ceil(dbms_lob.getlength(v_output)/v_buffer) loop
            htp.prn(substr(v_output,v_index,v_buffer));
            v_index := v_index + v_buffer;
        end loop;
 
      EXCEPTION
       WHEN OTHERS THEN
          v_output:='[]';
          RAISE;
          --htp.prn('An error was encountered - '||SQLCODE||' -ERROR- '||SQLERRM);
          htp.prn(v_output);
 
 end get_event_json_runtime;
 
    function validate_event_runtime(f_query_sql varchar2) return NUMBER
AS
  c           NUMBER;
  d           NUMBER;
  col_cnt     INTEGER;
  f           BOOLEAN;
  rec_tab     DBMS_SQL.DESC_TAB;
  col_num    NUMBER;
  rec DBMS_SQL.DESC_REC;
  v_ret        NUMBER DEFAULT 0;
  /*
   v_ret: 0 validate failed
          1 validate success
          2    exist 'EVENT_CUSTOMER' column
      
   */
BEGIN
  c := DBMS_SQL.OPEN_CURSOR;
 
  DBMS_SQL.PARSE(c, f_query_sql, DBMS_SQL.NATIVE);
 
  d := DBMS_SQL.EXECUTE(c);
 
  DBMS_SQL.DESCRIBE_COLUMNS(c, col_cnt, rec_tab);
 
 
  IF col_cnt >= 4 then
    IF rec_tab(1).col_type in (1,9,96,115,286,287,288) THEN
        IF rec_tab(2).col_type in (1,9,96,115,286,287,288) THEN
            IF rec_tab(3).col_type in (12,187) THEN
                IF rec_tab(4).col_type in (12,187) THEN
                    v_ret:=1;
                END IF;
            END IF;
        END IF;
    END IF;
  END IF;
IF v_ret=1 THEN
  for i in 1..col_cnt
  loop
    IF rec_tab(i).col_type in (1,9,96,115,286,287,288) and upper(rec_tab(i).col_name)='EVENT_CUSTOMER' THEN
        v_ret:=2;
    END IF;  
  end loop;
END IF;
  
   
  DBMS_SQL.CLOSE_CURSOR(c);
  
  --htp.prn(v_ret);
  return v_ret;
  EXCEPTION
     WHEN OTHERS THEN
       IF DBMS_SQL.IS_OPEN(c) THEN
         DBMS_SQL.CLOSE_CURSOR(c);
       END IF;
       v_ret:=0;       
       --htp.prn(v_ret);
       return v_ret;     
END validate_event_runtime;
 
 
  function get_validate_event_runtime(f_query_sql varchar2) return varchar2
  as c           NUMBER;
  d           NUMBER;
  col_cnt     INTEGER;
  f           BOOLEAN;
  rec_tab     DBMS_SQL.DESC_TAB;
  col_num    NUMBER;
  rec DBMS_SQL.DESC_REC;
  v_ret        clob ;
 
BEGIN
  c := DBMS_SQL.OPEN_CURSOR;
 
  DBMS_SQL.PARSE(c, f_query_sql, DBMS_SQL.NATIVE);
 
  d := DBMS_SQL.EXECUTE(c);
 
  DBMS_SQL.DESCRIBE_COLUMNS(c, col_cnt, rec_tab);
 
 
  v_ret:=' ';
  
  for i in 1..4
  loop
    v_ret:=v_ret||rec_tab(i).col_name||',';
  end loop;
  v_ret:=RTRIM(v_ret,',');
 
  DBMS_SQL.CLOSE_CURSOR(c);
  
  --htp.prn(v_ret);
  return v_ret;
  EXCEPTION
     WHEN OTHERS THEN
       IF DBMS_SQL.IS_OPEN(c) THEN
         DBMS_SQL.CLOSE_CURSOR(c);
       END IF;     
       return v_ret;    
end get_validate_event_runtime;
     
    
end EVENT_COMMON_CALENDAR_FILTER_M ;