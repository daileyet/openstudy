/**
 * widgets components configure file js
 * @author:open-thinks@outlook.com
 * @description:widgets components configure file
 * @since:2015/1/12
 */
(function() {
	var golabl = this;
	var ot = golabl.ot = golabl.ot || {};
	var wconfig = ot.wconfig = ot.wconfig || {};
	////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Configure here
	////////////////////////////////////////////////////////////////////////////////////////////////////////////
	wconfig.email = {}
	wconfig.calendar = {}
	wconfig.camera = {}
	wconfig.music = {
		href: 'music.html'
	}
	wconfig.weather = {
		'init-ops': {
			cityname: '苏州'
		}
	}
	wconfig.desktop = {}
	wconfig.blog = {
		href: '//openbolg.sinaapp.com/'
	}

	wconfig['trello'] = {
		href: 'https://trello.com/'
	}
	wconfig['ms-word'] = {
		href: 'https://office.live.com/start/Word.aspx'
	}
	wconfig['ms-excel'] = {
		href: 'https://office.live.com/start/excel.aspx'
	}
	wconfig['ms-outlook'] = {
		href: 'https://blu170.mail.live.com/'
	}
	wconfig['ms-powerpoint'] = {
		href: 'https://office.live.com/start/PowerPoint.aspx'
	}
	wconfig['ms-onedrive'] = {
		href: 'https://onedrive.live.com'
	}
	wconfig['ms-onenote'] = {
		href: 'https://www.onenote.com/notebooks/'
	}
})();