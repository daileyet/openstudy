/**
 * Displays Column Groups in Interactive Reports (IR)
 *
 * Based off of: http://www.talkapex.com/2009/03/column-groups-in-apex-interactive.html
 *
 * Uses Console Logger: http://www.talkapex.com/2010/08/javascript-console-logger.html
 * 
 * Developed by Clarifit
 * http://www.clarifit.com
 * apex@clarifit.com
 *
 * Change Log
 *  1.0.1
 *    - Fixed issue with shifting
 *  1.0.2
 *    - Fixed issue when you uncheck all options available to column in "Allow Users To:"
 *  1.0.3
 *    - Fixed issue of error when no rows found
 *    - Changed references of $ jQuery namespace to apex.jQuery
 *  1.0.4 enhancement by dailey.dai@oracle.com
 *	 -	Implement customized css for whole column group
 *   -	Implement customized individual group css
 *   -	Implement rowspan for special column group
 */
$clarifitIRColGroup = (function() {
    that = {}; //Public objects
    /**
   * Returns the TH for the column groups
   * Requred in a function since referenced twice (once in loop and once at end)
   *
   * @param pColSpan TH Column span
   * @param pGrpName Name of group to appear in TH to user
   * @return HTML text for TH (including TH)
   */
    this.getColGrpThHtml = function(pColSpan, pGrpName) {
        var vGrpName = (pGrpName.length > 0 ? pGrpName: '&nbsp;');
        return '<th colspan="' + pColSpan + '" class="' + vGrpName + '"><div>' + vGrpName + '</div></th>';
    }; //getColGrpThHtml
    /**
   * Injects the column group header above the column rows
   * Will use the same styles used for the column headers
   *
   * @param pColGrps JSON object of column groups. Each entry contains a "column_alias" and "column_group"
   * @param pOptions
   *  - irColGroupRowId (string): ID to use for Column Group row. If null then "irColGrpRow" will be used
   *  - dispBorder (boolean): Display border for column groups. Default to true
   */
    this.dispColGrp = function(pColGrps, pOptions) {
        //Set Default Options
        var vDefaults = {
            irColGroupRowId: 'irColGrpRow',
            dispBorder: true
        };
        pOptions = jQuery.extend(true, vDefaults, pOptions);

        if (pOptions.irColGroupRowId.length == 0) pOptions.irColGroupRowId = 'irColGrpRow';

        //Log Parameters
        apex.jQuery.console.logParams();

        // retrieve the Interactive report table
        var vTbl = apex.jQuery('.apexir_WORKSHEET_DATA');

        // Prevent Duplicate rows
        apex.jQuery('#' + pOptions.irColGroupRowId).remove();

        // Add the Column Group row
        apex.jQuery(vTbl[0].rows[0]).before('<tr id="' + pOptions.irColGroupRowId + '"></tr>');

        var vIRColGrpRow = apex.jQuery('#' + pOptions.irColGroupRowId);
        var vPrevColGrp = '';
        var vColGrpExists = false;
        var vColSpan = 1;

        // Loop over the row headers and see if we need to add a column group.
        apex.jQuery.console.groupCollapsed('Column Info');
        //Only loop through each row if there is data. Required for when "No Data Found" issue
        if (vTbl[0].rows.length > 0) {
            for (var i = 0; i < apex.jQuery(vTbl[0].rows[1].cells).length; i++) {
                // For IR, the column headers have divs with id of apexir
                vColId = '';

                // Only set the col ID if it exists (needed for IR row_id icon)
                if (typeof(apex.jQuery('.apexir_WORKSHEET_DATA tr:eq(1) th:eq(' + i + ')').attr('id')) != "undefined") vColId = apex.jQuery('.apexir_WORKSHEET_DATA tr:eq(1) th:eq(' + i + ')').attr('id').toUpperCase();
                var vColGrp = ''; // Current Column group
                // Find the ID in the IR Groups global variable (genereated in AP)
                for (var j = 0; j < pColGrps.columns.length; j++) {
                    if (pColGrps.columns[j].column_alias.toUpperCase() == vColId) {
                        vColGrpExists = true;
                        vColGrp = pColGrps.columns[j].column_group;
                        break;
                    } //if
                } // For IR Col Groups
                apex.jQuery.console.log('Column Id: ' + vColId, ' Group: ' + vColGrp);
                // Only print the col group header for the previous entry. This allows us to set the col span for similar groups
                // Have to do it this way to support IE  (otherwise we could look at the previous entry and update it's col span
                // If the current previous column group is the same as the current group then keep going (don't print yet)
                if (vColGrp == vPrevColGrp) {
                    vColSpan = (i == 0 ? 1 : vColSpan + 1); //If it's the first column only set the colspan to 1
                    apex.jQuery.console.log('Group same as previous. ', 'Colspan: ', vColSpan);
                } else if (i > 0) {
                    // Display the previous item
                    apex.jQuery.console.log('New Group. Print previous group with ColSpan: ', vColSpan);
                    vIRColGrpRow.append(getColGrpThHtml(vColSpan, vPrevColGrp));
                    vColSpan = 1;
                }

                // If this is the last item then display it
                if (i == apex.jQuery(vTbl[0].rows[1].cells).length - 1) {
                    apex.jQuery.console.log('Last column. Print regardless. ColSpan: ', vColSpan);
                    vIRColGrpRow.append(getColGrpThHtml(vColSpan, vColGrp));
                }

                vPrevColGrp = vColGrp;
            } // For each column being displayed
            // Process special group APEX_ROWSPAN
            for (var i = 0; i < apex.jQuery(vTbl[0].rows[0].cells).length; i++) {
                var vColGrp = ''; // Current Column group
                var groupTH = apex.jQuery('.apexir_WORKSHEET_DATA tr:eq(0) th:eq(' + i + ')');
                if (typeof(groupTH.attr('class')) != "undefined") vColGrp = groupTH.attr('class').toUpperCase();
                if (vColGrp.indexOf("APEX_ROWSPAN")!=-1) {
                    var colspan = 1;
                    if (groupTH.attr('colspan') != "undefined") {
                        colspan = groupTH.attr('colspan');
                        colspan = parseInt(colspan);
                        if (colspan > 1) {
                            groupTH.attr('colspan', '1');
                            for (var j = 1; j < colspan; j++) {
                                groupTH.after(getColGrpThHtml(1, vColGrp));
                            }
                        }
                    }
                }

            }

            var offset_remove = 0;
			var offset_add=0;
            // Rowspan feature 
            for (var i = 0; i < apex.jQuery(vTbl[0].rows[0].cells).length; i++) {
                var vColGrp = ''; // Current Column group
                var groupTH = apex.jQuery('.apexir_WORKSHEET_DATA tr:eq(0) th:eq(' + i + ')');
                if (typeof(groupTH.attr('class')) != "undefined") vColGrp = groupTH.attr('class').toUpperCase();

                // process rowspan
                if (vColGrp.indexOf("APEX_ROWSPAN")!=-1) {
                    var cellDiv = apex.jQuery('.apexir_WORKSHEET_DATA tr:eq(1) th:eq(' + (offset_add + i - offset_remove) + ') div');
                    var cellGrpTH = groupTH;
                    cellGrpTH.attr("rowspan", "2").empty();
                    var cellTD = cellDiv.parent();
                    cellGrpTH.append(cellDiv);
                    cellTD.remove();
                    offset_remove = offset_remove + 1;
                }else{
					if (typeof(groupTH.attr('colspan')) != "undefined"){
						offset_add=offset_add + parseInt(groupTH.attr('colspan'))-1;
					}
				}

            } //Rowspan feature End	  	 	  
        } // If rows exist
        else {
            // No Columns
            apex.jQuery.console.log('No columns found');
        }
        apex.jQuery.console.groupEnd();

        // Remove the col group heading if no column groups:
        if (!vColGrpExists) vIRColGrpRow.remove();
        else {
            // Set CSS attributes
			// default group
            apex.jQuery('#' + pOptions.irColGroupRowId + ' th div').css({
                'text-decoration': 'none',
                'cursor': 'default'
            });

            apex.jQuery('#' + pOptions.irColGroupRowId + ' th').css(pOptions.groupFormat);

            apex.jQuery('#' + pOptions.irColGroupRowId + ' th div').css(pOptions.groupFormat);

			// special group and heading
            for (var i = 0; i < apex.jQuery(vTbl[0].rows[1].cells).length; i++) {
                vColId = '';
                var headingTH = apex.jQuery('.apexir_WORKSHEET_DATA tr:eq(1) th:eq(' + i + ')');
                // Only set the col ID if it exists (needed for IR row_id icon)
                if (typeof(headingTH.attr('id')) != "undefined") vColId = headingTH.attr('id').toUpperCase();
                var vColGrp = ''; // Current Column group
                var vStyle = ''; //Current Column group style(group description)			
                // Find the ID in the IR Groups global variable (genereated in AP)
                for (var j = 0; j < pColGrps.columns.length; j++) {
                    if (pColGrps.columns[j].column_alias.toUpperCase() == vColId) {
                        vColGrpExists = true;
                        vColGrp = pColGrps.columns[j].column_group;
                        vStyle = pColGrps.columns[j].column_group_desc;
                        break;
                    } //if
                } // For IR Col Groups
                if (vStyle.length > 0) {
                    var reg = new RegExp('[#][^#]+[#]', 'g');
                    if (reg.test(vStyle)) {
                        var matcher = vStyle.match(reg);
                        if (matcher.length > 0) {
                            for (var j = 0; j < matcher.length; j++) {
                                var formatCode = matcher[j].replace('#', '').replace('#', '');
                                if (j == 0) { //css group
                                    var formatObject = $u_eval('({' + formatCode + '})');
                                    apex.jQuery("#" + pOptions.irColGroupRowId + " th[class='" + vColGrp + "']").css(formatObject);
                                    apex.jQuery("#" + pOptions.irColGroupRowId + " th[class='" + vColGrp + "'] div").css(formatObject);
                                } else if (j == 1) { //css heading
                                    var formatObject = $u_eval('({' + formatCode + '})');
                                    apex.jQuery('.apexir_WORKSHEET_DATA tr:eq(1) th:eq(' + i + ')').css(formatObject);
                                    apex.jQuery('.apexir_WORKSHEET_DATA tr:eq(1) th:eq(' + i + ') div').css(formatObject);
                                }
                            }
                        }
                    }
                }
            }

			for (var i = 0; i < apex.jQuery(vTbl[0].rows[0].cells).length; i++) {
				var grpTH = apex.jQuery('.apexir_WORKSHEET_DATA tr:eq(0) th:eq(' + i + ')');
				var vColGrp='';
				var vRowSpan=1;
				var vStyle='';
				if (typeof(grpTH.attr('class')) != "undefined") 
					vColGrp = grpTH.attr('class').toUpperCase();
				if(vColGrp.indexOf("APEX_ROWSPAN")!=-1){
					for (var j = 0; j < pColGrps.columns.length; j++) {
						 if (pColGrps.columns[j].column_group.toUpperCase() == vColGrp) {
							vStyle=pColGrps.columns[j].column_group_desc;
							break;
						 }
					}
					if (vStyle.length > 0) {
						var reg = new RegExp('[#][^#]+[#]', 'g');
						if (reg.test(vStyle)) {
							var matcher = vStyle.match(reg);
							if (matcher.length > 0) {
								for (var j = 0; j < matcher.length; j++) {
									var formatCode = matcher[j].replace('#', '').replace('#', '');
									if (j == 0) { //css group
										var formatObject = $u_eval('({' + formatCode + '})');
										apex.jQuery("#" + pOptions.irColGroupRowId + " th[class='" + vColGrp + "']").css(formatObject);
										apex.jQuery("#" + pOptions.irColGroupRowId + " th[class='" + vColGrp + "'] div").css(formatObject);
									} 
								}
							}
						}
					}
					
				}
				

					
			}
			
			
			for(var i=0; i<apex.jQuery(vTbl[0].rows).length;i++ ){// css data cell
				if(i<2)continue;//ignore group and head rows
				
				for(var j=0;j<apex.jQuery(vTbl[0].rows[i].cells).length;j++){
					var grpTD=apex.jQuery('.apexir_WORKSHEET_DATA tr:eq('+i+') td:eq(' + j + ')');
					var vHeader='';
					var vStyle='';
					if (typeof(grpTD.attr('headers')) != "undefined") 
					vHeader = grpTD.attr('headers').toUpperCase();
					for (var k = 0; k < pColGrps.columns.length; k++) {
						 if (pColGrps.columns[k].column_alias.toUpperCase() == vHeader) {
							vStyle=pColGrps.columns[k].column_group_desc;
							break;
						 }
					}
					if (vStyle.length > 0){
						var reg = new RegExp('[#][^#]+[#]', 'g');
						if (reg.test(vStyle)) {
							var matcher = vStyle.match(reg);
							if (matcher.length > 2) {
									var formatCode = matcher[2].replace('#', '').replace('#', '');
									var formatObject = $u_eval('({' + formatCode + '})');
									apex.jQuery('.apexir_WORKSHEET_DATA tr:eq('+i+') td:eq(' + j + ')').css(formatObject);									
							}
						}					
					}
					
				}
				
				
			}
			
            if (pOptions.dispBorder) {
                // Set column border
                var irColRow = apex.jQuery('.apexir_WORKSHEET_DATA th:eq(0)');
                apex.jQuery('#' + pOptions.irColGroupRowId + ' th').css({
                    'border-right-width': irColRow.css('border-bottom-width'),
                    'border-right-color': irColRow.css('border-bottom-color'),
                    'border-right-style': irColRow.css('border-bottom-style')
                });
            } // disp border
        } //else
    }; //dispColGrp
    /** 
   * Wrapper to be called from Plugin
   * @param pThis Dynamic Action "this" object
   *  pThis.action.attribute01: (json) JSON object of column groups
   *  pThis.action.attribute02: (string) ID for column group row in table
   *  pThis.action.attribute03: (string) String representation of true or false to display border on column group
   *  pThis.action.attribute04: (string) Group format
   */
    that.loadColGrp = function(pThis) {
        apex.jQuery.console.groupCollapsed(pThis.action.action);
        apex.jQuery.console.log('this', pThis);

        var grpStyle = pThis.action.attribute04;
        if (grpStyle) {} else {
            grpStyle = "width:'auto',height:'auto'";
        }

        var vOptions = {
            irColGroupRowId: pThis.action.attribute02,
            dispBorder: (pThis.action.attribute03.toLowerCase() == 'true' ? true: false),
            groupFormat: $u_eval('({' + grpStyle + '})')
        };
        dispColGrp(apex.jQuery.parseJSON(pThis.action.attribute01), vOptions); //$u_eval: converts JSON text to object
        apex.jQuery.console.groupEnd();
    }; //loadColGrp
    return that; // Return public functions
})(); //apex.jQueryclarifitIRColGroup
