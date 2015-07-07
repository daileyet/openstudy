$('.test-step-preview').click(function(event){
	
	var $el = $(this);
	
	var showSteps=function(html){
		var $case = $(html);
		var $panel = $('.ot-fw .test-case-panel');
		if($panel.length ==0 ){//new container
			var container = '<div class="ot-fw"><div class="ot-fw-header"><img class="ot-fw-close" title="close" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAD/klEQVRIS5VWW2gUVxg+/8zOmsiauDZito2iMe2kbGMMydZuZ8XLRhb7UMH2Kb6UWvoqtKDkoaIWEUTEJyFCg30pCBaaQqRt2izBEONlTWIICSbEbbFSghIL0pfdPcfvnNmZ7GxmsJ4QOJf//77/8p0zS+wVI5PJxMJEH5Oud8N0K/4bBGMvGFFecH6PFwoDN4aGprCP7dWDgvAP7t3bpNfWnsH5EXga0q7S2EEjIsE4zxVLpd5fhob+qMbzJch0dx/SNK0fxlHHgDTN1xZZCEkmiUqi1Pf02fKxXC5XcIhWOR1Ip4/pRBcFEyQPifyBqyPlgsNFOVx/urx8xCHxEOzbvTsTMkI/w9BARIHlCyqrwJCtEIyu/p7Nfu4payqViq7RaA4RbFQHMmfl4B0OcdCZ2scfF8XD2ZtjA26U+yzrpCB2yimLAwDAPs7Yr9i/zIRorKTzO5MByHIRo/ns6GirIkgmm2oNtjmPomz0RkjfjYyNfSklaFldZkiEhzGNKRLBLo3cuvW1nCWTyVaD2H2A1TiZywDRlYxNkEikdY1+w0Keqz1pgDB6R8fvnFdwGFZXl6kZoWGsrt0cH//KycYyzXUUXf8narre8Ye2pEr6FNiHnR0nGGnnIE23ZGX5QW68Z+zexI8OWCIRb7x7d+afSnBRFxkEaUrG5hJAvlhMKcAPdu7sZxr7rFKSKkF7FDDvuT3xwCVxwOPxeKRuTfgGepqSe15/mQG9UAS72tv6QQcCrzSdRgOgUCzy9ydmZuST4I5Ee9s1xPypwg7wVQSdbfErmHzhZ6SUTfzS/elZt+YOww7TNI0wesJYzFbfSoAqOKJ/FUFH/N0TeFHOVRsoQUMtk7Nzq8ArSUI6ZRFHI7JxSWyNlHvQ0dqyRzBNRuKmKlXAuPh+6uG8vJGqH2ZDw7qaNzb8hPZcfjA/7/Zkx/bt72mGdgfuSqbSVhHgDjmqMdrfacljL1YpM1j1Ti8sKplK8HC0bhAgFtZFXhI9M4uLikSdbaiHTJmSabl38rqlXVm2NW89yYlO2WqAkS2zQgkK+q8ohiMhTV57pRY1PGc6zqCkskwlAQQ/Ob3wqNMlkFHokbWTqMU2G2HlGVKPpIurIUJXwvYD6jlT75es7/65/OMRz4tpbnnTgpaH4W9/YKqk50YfMLGVw3Cl6MLsX4+PK4xq27ebYp+g+z8gyv9NsvKyKh1df/j3kx7ZJ18Cudn81qY0cYYvmtjsVCooG/fV1QjPiji78GTp28r6Bn5UttTXR0M1xjeo5lEUNeKXbTl76J0NCKaffrS05LnpgRlUlq0BzY8Q/whXzkL6LVLrZRHksc6JQmkw//x5Pqg/r/1ZLGfi+xPFj+QlLbfSju5ajBkAAAAASUVORK5CYII=" /><span class="ot-fw-title"></span></div>'
				+ '<div class="ot-fw-content"><div style="position: relative; " class="test-case-panel">'
				+ html
				+ '</div></div></div>';
			$(container).appendTo('body');
			$panel =  $('.ot-fw .test-case-panel');
		}else{
			$panel.empty();
			$case.appendTo($panel);
		}
		//position
		var position = $el.offset();
		$('.ot-fw').offset(position);
		$('.ot-fw').draggable({ cancel: '.ot-fw-content' });
		$('.ot-fw .ot-fw-title').text($el.data('param1'));
		$('.ot-fw').show();
		$('.ot-fw .ot-fw-close')
		.click(function(){
			$('.ot-fw').hide();
		});
	}
	
	
	apex.server.process(
			'Show_Test_Case_Steps', {
			      x01 : $el.data('param0'),
			      x02 : $el.data('param1')
			}, {
			      dataType :
			'text',
			      success :
			function(data) {
			    	  showSteps(data); 
			      }
			});
	
});