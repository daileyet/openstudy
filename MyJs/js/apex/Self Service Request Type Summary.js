(function($){
/**
*this is a js for controller units status display in summary ui
*/
var state_map = {
'Compile Success':{css:{'background-color':'green'}, tip:function(el){return el.attr('name');}},
'Compile Error':{css:{'background-color':'#DA4F49'},tip:function(el){return el.attr('name');}},
'Disabled':{css:{'background-color':'orange'}},
'Dispatched':{css:{'background-color':'#5A99E8'},tip:function(el){return el.attr('dispatch')}}
};
$('.unit-part-status').each(function(){//loop each unit part status div

	var $el=$(this);
	var state = $.trim($el.text()); 
	$el.css(state_map[state].css);
	if(state_map[state].tip){
		$el.attr('title',state_map[state].tip($el));
	}
});
})(apex.jQuery);