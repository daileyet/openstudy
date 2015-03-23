(function($) {
	var golabl = this;
	var ot = golabl.ot = golabl.ot || {};
	var widgets = ot.widgets = ot.widgets || {};
	var barcodeGen = widgets.barcodeGen = widgets.barcodeGen || {id: 'barcode-gen'};
	//clean barcode list item in history
	var clean = barcodeGen.clean = function(clenaObj) {
		if (clenaObj && clenaObj.target) {
			if (clenaObj.type == 'ONE') {
				$(clenaObj.target).remove();
			} else {
				$(clenaObj.target).empty();
			}
		}
	}
	
	var barCodeUrl = barcodeGen.barCodeUrl =function(){
		var URL="http://qr.liantu.com/api.php?";
		var aParams = [];
		var sParam = "";
		$("input[data-param],select[data-param]").each(function(){
			var sVal = $(this).val();
			var sParam = $(this).data('param');
			if(sVal==="" || sParam ===""){
			}else{
				if(['bg','fg','gc','pt','inpt'].indexOf(sParam)!=-1){//color setting
					if($('input[data-target="'+sParam+'"]').prop("checked")){
						sVal=sVal.replace("#","");
					}else{
						return true;
					}
				}
				aParams.push(sParam+"="+sVal);
			}
		});
		sParam = aParams.join("&");
		return URL+sParam;
	}
	
	var listGenerator= barcodeGen.listGenerator =  function(listContainer) {
		var tmp_html = '<div class="list" >'
			+ '<div class="list-content">' 
			+ '<div class="image-container shadow">' 
			+ '{BARCODE_IMAGE_TAG}' 
			+ '</div>' 
			+ '<span class="list-subtitle">'
			+ '<span class="place-right">{GENERATE_TIME} <i class="icon-remove fg-red barcode-remove" ></i>&nbsp;&nbsp;</span><span class="barcode-content">{BARCODE_VALUE}</span>'
			+'</span>'
			+ '</div>' 
			+ '</div>';
		var barCodeVal = $("#barcode").val();
		var vBARCODE_IMAGE_TAG = '<img onload="$(this).show();" style="display:none" src="' + barCodeUrl() + '"/>';
		var now = new Date();
		var vGENERATE_TIME = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
		var vBARCODE_VALUE = barCodeVal;
		var final_html = tmp_html;
		final_html = final_html.replace('{BARCODE_IMAGE_TAG}', vBARCODE_IMAGE_TAG).replace('{GENERATE_TIME}', vGENERATE_TIME).replace('{BARCODE_VALUE}', vBARCODE_VALUE);
		var $barcode_list = $(final_html).prependTo(listContainer);
		$("i.barcode-remove", $barcode_list).unbind('click').click(function() {
			var $icon = $(this);
			var clenaObj = {
				target: $icon.parents('div.list'),
				type: 'ONE'
			}
			clean(clenaObj);
		});
	};

	/**
	 * entry, need call in page dom ready
	 */
	var actionRegiester = barcodeGen.actionRegiester = function(){
		$("#btnGenerator").click(function() {
			var listContainer = $("#barcodeDisply .group-content .barcode-list-content");
			listGenerator(listContainer);
		});
		
	
		$(".barcode-remove-all").click(function() {
			var clenaObj = {
				target: $("#barcodeDisply .group-content .barcode-list-content"),
				type: 'ALL'
			}
			clean(clenaObj);
		});
	}
})(jQuery);