/**
 * plugin for immediate editor
 * @desc:immediate edit controller in apex report
 * @author:dailey.dai@oracle.com
 * @date:2015/06/17
 * @param $ jQuery 
 * @param objConfig immediate config object
 * 		objConfig = {
 * 			elements:[
 * 				{
 * 				'jquerySelector':'',
 * 				'oldValSelector':'b.final-status',
 * 				'controller':'select',
 * 				'processName':'MANUAL_SET_STATUS',
 * 				'processCallback':{
 * 					'success':function(callObj){},
 * 					'fail':function(callObj){}
 * 				},
 * 				'data':[{'display':'','value':''}],
 * 				'db_column':'MANUAL_STATUS'
 *			 }
 * 		]
 * }
 */
(function($){
	$.fn.immediateEdit=function(objConfig){
		var $trigger = $(this);
		var ops = objConfig || {
			elements:[]
		};
		$trigger.unbind('click').click(function(){
			//loop config to make immediate controller
			var $triggerSingle = $(this);
			var $row = $triggerSingle.parents("tr");
			for(var i=0,j=ops.elements.length;i<j;i++){
				////////////////////////////////////////////////////////////////////////////////////
				var el = ops.elements[i],$CELL = $row.find(el.jquerySelector);
				var immediateController= classes.ImmediateController.create(el,$CELL,$triggerSingle);
				immediateController.active();
				////////////////////////////////////////////////////////////////////////////////////
			}
		})//end trigger element click event
	}
})(apex.jQuery);


