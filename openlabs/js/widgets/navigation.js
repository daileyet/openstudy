(function($) {//navigation bar
	var golabl = this;
	var ot = golabl.ot = golabl.ot || {};
	var widgets = ot.widgets = ot.widgets || {};
	var navigation = widgets.navigation =  widgets.navigation || {id:'navigation'};
	var content = navigation.content ={};
	var items = navigation.content.items =[
		{
			name:'Index',
			display:'Labs',
			link:'index.html',
			bg:{
				"background-color":"#1b6eae"
			}
		},
		{
			name:'Blog',
			display:'Blog',
			link:'barcode.html',
			bg:{
				"background-color":"#78aa1c"
			}
		},
		{
			name:'Music',
			display:'Music',
			link:'music.html',
			bg:{
				"background-color":"#fa6800"
			}
		},
		{
			name:'Barcode',
			display:'Barcode',
			link:'barcode.html',
			bg:{
				"background-color":"#6a00ff"
			}
		}
	];
	
	var template = navigation.content.template = {
		items:'<div class="open-navbar">{items}</div>',
		item:'<div title="{item.display}" class="tag"><span>{item.display}</span></div>'
	};
	
	var output = navigation.output = function(){
		var sItems = "";
		for(var index=0,len=items.length;index<len;index++){
			var item = items[index];
			var sItem = template.item.replace("{item.display}",item.display).replace("{item.display}",item.display);
			sItems = sItems + sItem;
		}
		return template.items.replace("{items}",sItems);
	}
	
	var active = navigation.active = function(parent,hidenTagName){
		var html = output();
		var $items = $(html);
		var appendToObj = parent || $('body');
		$items.appendTo($(appendToObj));
		$('div',$items).each(function(index){
			var $item=$(this);
			$item.css(items[index].bg);
			$item.attr("name",items[index].name);
			$item.click(function(){
				window.location=items[index].link;
			});
			if(hidenTagName && hidenTagName==items[index].name){
				$item.hide();
			}
		});
		
	}
	
})(jQuery)