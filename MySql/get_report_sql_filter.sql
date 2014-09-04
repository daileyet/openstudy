create or replace function get_report_sql_filter(f_app_id in number,f_page_id in number,f_report_id in number,f_cond_column_name in varchar2)
return varchar2
--@author dailey.dai@oracle.com
--@desc get simple filter column sql from ir saved report
as
v_region_id number;
v_cond_final varchar2(32767);
v_cond_once  varchar2(1000);

function format_cond_sql(f_cond_sql in varchar2,f_cond_exp in varchar2) return varchar2
  as
  v_cond_val_arr CX_UTIL.T_ARRAY;
  v_cond_placeholder varchar2(50);
  v_replace_sql varchar2(1000);
  begin
    --Template1:
    --"EVENT_TYPE" in (#APXWS_EXPR_VAL1#, #APXWS_EXPR_VAL2#) 
    --10-R8 Waves,11-GA
    
    --Template2:
    --"REGION" = #APXWS_EXPR#
    --South America
    
    --Template3:
    --"REGION" is not null
    --
    
    v_cond_val_arr:=CX_UTIL.SPLIT(f_cond_exp,',');
    IF v_cond_val_arr.COUNT = 0 THEN -- template 3
      return f_cond_sql;
    ELSIF v_cond_val_arr.COUNT = 1 THEN -- template 2
      return REPLACE(f_cond_sql,'#APXWS_EXPR#',''''||f_cond_exp||'''');
    ELSE
      v_replace_sql:=f_cond_sql;
      FOR i IN 1..v_cond_val_arr.COUNT
      LOOP
        v_cond_placeholder:='#APXWS_EXPR_VAL'||i||'#';
        v_replace_sql:=REPLACE(v_replace_sql,v_cond_placeholder,''''||v_cond_val_arr(i)||'''');
      END LOOP;
      return v_replace_sql;
    END IF;

  end format_cond_sql;
begin
-- get ir region id
  SELECT region_id
     INTO v_region_id
     FROM apex_application_page_regions
    WHERE application_id = f_app_id
      AND page_id = f_page_id
      AND source_type = 'Interactive Report';
      
for ir_con in (      
select 
REPORT_NAME,REPORT_ID,CONDITION_COLUMN_NAME,CONDITION_OPERATOR,CONDITION_EXPRESSION,CONDITION_SQL,CONDITION_DISPLAY 
from apex_application_page_ir_cond 
where APPLICATION_ID=f_app_id and PAGE_ID=f_page_id and REPORT_ID = f_report_id and CONDITION_COLUMN_NAME=UPPER(f_cond_column_name))
loop
v_cond_once:= format_cond_sql(ir_con.CONDITION_SQL,ir_con.CONDITION_EXPRESSION);
IF v_cond_once IS NOT NULL THEN
  v_cond_final:=v_cond_final||' AND ' ||v_cond_once;
END IF;
end loop;
v_cond_final:=LTRIM(v_cond_final,' AND ');

return v_cond_final;
end get_report_sql_filter;