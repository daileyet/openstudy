/**
 * plugin for immediate editor
 * @desc:immediate edit controller in apex report
 * @author:dailey.dai@oracle.com
 * @date:2015/06/17
 * @param $ jQuery 
 */
(function($){
	
	$.fn.immediateEdit=function(objConfig){
		var $trigger = $(this);
		var ops = objConfig || {
			elements:[
				{
//					'jquerySelector':'td[headers=STATUS]',
//					'oldValSelector':'b.final-status',
//					'controller':'select',
//					'processName':'MANUAL_SET_STATUS',
//					'processCallback':{
//						'success':function(callObj){},
//						'fail':function(callObj){}
//					},
//					'data':[
//						{'display':'','value':''},
//						{'display':'','value':''},
//						{'display':'','value':''},
//						{'display':'','value':''},
//						{'display':'','value':''},
//						{'display':'','value':''},
//						{'display':'','value':''},
//						{'display':'','value':''},
//						{'display':'','value':''},
//						{'display':'','value':''},
//						{'display':'','value':''}
//					]
				}
			]
		};
		
		
		function get_immediate_oldval($cell,el){
			var $wrapper = $cell.find(".immediate-wrapper");
			var $oldVal = $(el.oldValSelector,$wrapper);
			var oldVal = $oldVal.data('immediate-oldval');
			oldVal = (oldVal=="" || oldVal==undefined )?$oldVal.text():oldVal;
			return oldVal;
		}
		
		function get_immediate_newval($cell){
			var $controller = $cell.find('.immediate-controller');
			var newVal = $controller.val();
			return newVal;
		}
		
		function get_immediate_id($cell,el,$triggerSingle){
			var $wrapper = $cell.find(".immediate-wrapper");
			var $oldVal = $(el.oldValSelector,$wrapper);
			var rowid = $oldVal.data('immediate-id');
			rowid = (rowid==undefined || rowid=="")? $triggerSingle.data('immediate-id') :rowid;
			return rowid;
		}
		
		$trigger.unbind('click').click(function(){
			//loop config to make immediate controller
			console.log("click event trigger");
			var $triggerSingle = $(this);
			var $row = $triggerSingle.parents("tr");
			var i,j;
			for(i=0,j=ops.elements.length;i<j;i++){
				////////////////////////////////////////////////////////////////////////////////////
				var el = ops.elements[i];
				switch (el.controller){
					case 'select':
						var $cell = $row.find(el.jquerySelector);
						var $immediate = $cell.find(".immediate-place");
						var $wrapper = $cell.find(".immediate-wrapper");
						var $oldVal = $(el.oldValSelector,$wrapper);
						if($immediate.length > 0 ){
							$immediate.toggleClass('immediate-hiden');
							$cell.find(".immediate-wrapper").toggleClass('immediate-hiden');
						}else{
							//wrapper origial place
							var str_origianl = "<div class='immediate-wrapper immediate-hiden'>"+$cell.html()+"</div>";
							$cell.empty();
							$(str_origianl).appendTo($cell);
							//get old value
							var oldVal = get_immediate_oldval($cell,el);
							//get unqiue id
							var rowid = get_immediate_id($cell,el,$triggerSingle);
							// create immediate place
							var str_immediate = 
							"<div class='immediate-place'>"
							+"<select class='immediate-controller'>"
							+(function(options){
								var str_options = "";
								var j,k;
								for(j=0,k=options.length;j<k;j++){
									var option = options[j];
									var str_display = option.display==""?option.value:option.display;
									var str_option = "<option value='"+option.value+"'>"+str_display+"</option>";
									if(oldVal == option.value){
										str_option = "<option value='"+option.value+"' selected >"+str_display+"</option>";
									}
									str_options=str_options+str_option;
								}
								return str_options;
							})(el.data)
							+"</select>"
							+"</div>";
							$(str_immediate).appendTo($cell);
						}
						
						$('.immediate-controller',$cell).unbind('change').bind('change',{},function(event){
							var $controller = $(this);
							var newVal = get_immediate_newval($cell);
							var oldVal = get_immediate_oldval($cell,el);
							var rowid  = get_immediate_id($cell,el,$triggerSingle);
							
							var $wrapper=$cell.find(".immediate-wrapper");
							var $immediate=$cell.find(".immediate-place");
							var $oldVal = $(el.oldValSelector,$wrapper);
							if(newVal == oldVal){
								return;
							}
							apex.server.process(
								el.processName,
								{
									'x01': rowid,
									'x02': newVal
								},
								{
									dataType:'json',
									success:function(data){
										var callback = el.processCallback || {'success':function(){},'fail':function(){}};
										if(data.type=="SUCCESS"){
											buildNotifyMsg('Update successfully!','success');
											if($oldVal.data('immediate-oldval')){
												$oldVal.data('immediate-oldval',newVal);
											}else{
												$oldVal.text(newVal);
											}
											callback.success({
												'$wrapper':$wrapper,
												'$immediate':$immediate,
												'$cell':$cell,
												'data':{
													'oldVal':oldVal,
													'newVal':newVal,
													'id':rowid
												}
											});
										}else{
											buildNotifyMsg('Update failed!','warning');
											callback.fail({
												'$wrapper':$wrapper,
												'$immediate':$immediate,
												'$cell':$cell,
												'data':{
													'oldVal':oldVal,
													'newVal':newVal,
													'id':rowid
												}
											});
										}
										$wrapper.toggleClass('immediate-hiden');
										$immediate.toggleClass('immediate-hiden');
									}
								}
							);
						});
						break;
					default:
						break;
				}// end of each element process
				////////////////////////////////////////////////////////////////////////////////////
			}
		})//end trigger element click event
		
	}
})(apex.jQuery)




