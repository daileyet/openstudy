(function(options){
	options.preImg='<img class="pre-day-event" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACtUlEQVRogc3ZXY6iQBQF4AICiIiAtijQ/AgK8mMBvYFZQi+BpcwSXAJLYgmzhFrCnYeJSXcypiozD9yTfO/nxGAVSsiC+fj4mIZhmLMss5fs8U/p+34ahgGGYYC+79kwDN3SnYRDKX30fQ9fdV3HKKXj0t24oZSOXdfBK5TSn0t3fBlK6UgpBZ77/T6hey7quv683+8gom1bXA920zRd27asbVvgaZoGV/miKLqmaVjTNMBT1zWu8lVVJXVds7quQQCu8lmW2VVVzVVVAc/tdvuFrnxZlvPtdgOesixZURS4DrGiKOayLIGnKAp85a/X63S9XoHncrngK5/n+XS5XIAnz3N2Pp9xlc+y7JHnOYhI0/TH0n2/JU3TMcsyEJHnOa4LW5qm4/l8BhFpmuIqH0XRZ5qmICKOY1zlwzDskiRhSZIAD8rycRyzOI6BJ4qix9J9v8X3/SSKIhZFEQiYlu77La7r2mEYzu/v78AThiG+8kEQzGEYAk8QBLjKE0JIEARzEAQgAF95QgjxfX/2fR94TqcTzgGu69rH43E+nU7A43ke3hGe583H4xF40I5wHCc5HA7M8zzgORwOaEd0+/2evb29gQBcB9kzjuN0u92O7fd7EIDrKvGM4zifu90ORDiOg3bE6LouiEA7wrKs0XEcEGFZFs4R2+32Yds2iNhsNrheKZ+xLGvabrcggJmmieul/hnLsibLskAA3hGmac6bzQYEoB1hr9fr2TRNEIB7xHq9Bh7DMH4RQvD8uPvMarVKDMNghmGAgJlgHKGqaqfrOlutVsCj6zreEZqmMV3XgUfTNJwjFEX51DQNRKiqOi/d969RFGVUVRUETATjp0DInxGKosArsizj/aP7GVmWH7Isw1eSJDFFUXBe9F5kkiQJJEkCQggjhKA8zHiZCCH/9a3zG8xTbRA6pdVnAAAAAElFTkSuQmCC"/>';
	options.nextImg='<img class="next-day-event" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACw0lEQVRogdXX3Y2jShAF4MIIsN38tI2NbRg8uPGADTY/k8CGcEMglA1hQiAkQtgQOoS6D6uVVju7t1vaB+oe6Xu1TknIHAD+IkKIoO/76f39ffyb35klfd+3XdfJvu+x73vsuu7/c0TTNEPbtrLrOvxZ0zQfc3dTpmmar23b4p80TTPM3fG3EUIEz+dzbJoGNdA7QggRPB6P6fl8oo6qqv6Zu/OnCCGCuq6nx+OBGmRd1+3cnT9FCBFUVTXVdY0aZFEUdI+oqgo1yPv9/jp3508RQgS32+3b/X5HDZMQIpi786cURdGWZSlvtxuqlGVJ94iiKGRZlqhSFMU0d9/fpiiK9nq9yre3N9RAc3JcLpc2z3N5vV5RJc9zmkdkWfYlz3PUIYSguZvyPB+EEKgjyzJ6kwMAIMuy4XK5oA6yR5zP5yHLMtSRpim93QTw/YjX11fUIJMkoTc5AADSNP04n8+ogfQRY5qmqEGeTid6uwkAIEmS8eXlBVWSJJk2mw29yQEAEMfxmCQJqsRxTPuIOI5RA83ddDwex9PphBroHRBF0Xg8HlHlcDjQe4SiKBoPhwOqRFFEr/x+vx+jKEKV/X4vOee0/kZ3u93HbrdDlTAMJeec1ossDMMhDENU2W639Mpzzoftdos6OOe0xhznfNhsNqiDc05rTnueN3DOUYfnebTKu677JQgC1OH7Pq1PSsZY6/u+9H0fVTzPo/VRzxhrPc+TnuehBnrlXdeVruuiCmOM1r5hjLWMMckYQ5X1ej0BAKmJEKxWq2/r9Ro1kCw/rVYr1CCXyyWpfRM4jjMtl0tUcRxHWpZFaiIEtm1PjuOgim3b5MqDZVmTbduowzRNWvsGAALLskbLslDFNE1aE+HnLBaLr6Zp4n+gW/5HTNMcDMOQi8UCf0Fr3yjSAoA0DAMNw0AAoDURNBMAwAQzlv8XiuBtEM7RRnUAAAAASUVORK5CYII="/>';
	
	var fc_te={
	events:[],
	fetchEvents:function(start,end){
		var events=[];
		apex.server.process('CALL_RUNTIME_EVENTS_SQL', {
				"x01" : start.getTime(),
				"x02" : end.getTime()
			}, {
				"dataType" : "json",
				"success" : function(data) {
					fc_te.events = data;
					$(options.containerSel+' img.fc-content-loading').hide();
					fc_te.renderUI(start);
				}
			});
	},
	renderUI:function(today){
	
		var sToday='<div class="fc-te" style="display:table-cell;">'
		+'<div class="fc-day-header fc-widget-header" style="width: 264px;text-align:center;"></div>'
		+'<div data-date="" class="fc-day fc-widget-content fc-today fc-state-highlight" style="width: 264px;">'
			+'<div>'
				+'<div class="fc-day-number" style="width: 100%; float: right; background: none repeat scroll 0% 0% LightGray; text-align: right;">4</div>'
				+'<div class="fc-day-content" style="padding:2px;min-height:228px;">'
				+'<img class="fc-content-loading" style="position:relative;display:none;left:50%;margin-left:-15px;" src="data:image/gif;base64,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" />'
			+'</div></div>'
		+'</div></div>'
		
		sToday='<div class="fc-te-all">'
		+'<div style="display:table-cell;vertical-align:middle;">'+options.preImg+'</div>'
		+sToday
		+'<div style="display:table-cell;vertical-align:middle;">'+options.nextImg+'</div>'
		+'</div>'
		;
		
		var $today=$('.fc-te');
		if($today.length==0){
			$today=$(sToday).appendTo(options.containerSel);
			$today.find('img.pre-day-event').css('cursor','pointer').click(function(){
				var currentDay=$.datepicker.parseDate(options.dateStyle,$v(options.selDateItem));
				var preDay=new Date(currentDay.getFullYear(),currentDay.getMonth(),currentDay.getDate()-1);
				$s(options.selDateItem,$.datepicker.formatDate(options.dateStyle,preDay));
			})
			$today.find('img.next-day-event').css('cursor','pointer').click(function(){
				var currentDay=$.datepicker.parseDate(options.dateStyle,$v(options.selDateItem));
				var nextDay=new Date(currentDay.getFullYear(),currentDay.getMonth(),currentDay.getDate()+1);
				$s(options.selDateItem,$.datepicker.formatDate(options.dateStyle,nextDay));
			})
		}
		
			if(today.getDate()== new Date().getDate()){
				$(options.containerSel+' .fc-day').addClass('fc-today').addClass('fc-state-highlight').removeClass('fc-past');
			}else{
				$(options.containerSel+' .fc-day').removeClass('fc-today').removeClass('fc-state-highlight').addClass('fc-past');
			}
			$(options.containerSel+' .fc-day').data('date',$.datepicker.formatDate('yy-mm-dd', today));
			$(options.containerSel+' .fc-day-content div').remove();
			$(options.containerSel+' .fc-day-header').text(fc_te.week[today.getDay()])
			$(options.containerSel+' .fc-day-number').html(today.getDate()+'&nbsp;');
		
		for(var i=0;i<fc_te.events.length;i++){
			var e=fc_te.events[i];
			var sEvent=
			'<div style="background-color:'+e.backgroundColor+'; border-color: '+e.borderColor+'; color: '+e.textColor+'; width: 100%;" id="'+e.id+'" class="fc-event fc-event-hori fc-event-start fc-event-end">'
				+'<div class="fc-event-inner">'
					+'<span class="fc-event-title">'+e.title+'</span>'
				+'</div>'
			+'</div>';
			if(i>=options.max_event_count){
				break;
			}
			$('.fc-day-content',$today).append($(sEvent));
		}
		
		if(fc_te.events.length>options.max_event_count){
			$('.fc-day-number',$today).prepend('<a href="javascript:void(0)" title="'+fc_te.events.length+'" class="more_link" style="cursor: pointer; display: inline;font-weight:bold;color:black;text-decoration:none;margin-right:8px;">more...</a>');
		}
				
	},
	week:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
	updateUI:function(){
		
		var today=new Date();
		today=$.datepicker.parseDate(options.dateStyle,$v(options.selDateItem));
		var start=new Date(today.getFullYear(),today.getMonth(),today.getDate());
		var end=new Date(today.getFullYear(),today.getMonth(),today.getDate()+1);
		$(options.containerSel+' .fc-day-content div').remove();
		$(options.containerSel+' img.fc-content-loading').show();
		fc_te.fetchEvents(start,end);
		
	}
};
this.fc_te=fc_te;

$(function(){
	fc_te.updateUI();
});
	
})({
	dateStyle:'mm/dd/yy',
	containerSel:'#events-container'
	,selDateItem:'P129_DATE',
	max_event_count:6
})
