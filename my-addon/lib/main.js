const buttons = require('sdk/ui/button/action');
const tabs = require("sdk/tabs");
const pageMod = require("sdk/page-mod");
const self = require("sdk/self");
const {Cc, Ci,Cu} = require("chrome");

// get the "data.txt" file in the profile directory

var button = buttons.ActionButton({
	id : "apex-link",
	label : "Visit Oracle Apex",
	icon : {
		"16" : "./images/icon-16.ico"
	},
	onClick : handleClick
});
var ss = require("sdk/simple-storage")
ss.storage.addonPosition = {};
ss.storage.isHiden = true;
var optionPanel = require("sdk/panel").Panel({
	width : 430,
	height : 400,
	contentURL : self.data.url("addon-options.html"),
	contentScriptFile : [self.data.url("jquery-1.11.1.min.js"), self.data.url("apex-addon-options.js")]
});

optionPanel.on('show', function() {
	var myPrefs = getPref();
	optionPanel.port.emit('options-data', myPrefs.apex_options);
})
optionPanel.port.on('persist-prefs', function(data) {
	storePref(data);
});

var sp = require("sdk/simple-prefs");
sp.on("configure", function() {
	optionPanel.show();
});

pageMod.PageMod({
	include : ["https://apex.oraclecorp.com/pls/apex/*", "https://login.oracle.com/mysso/signon.jsp", "https://apex.oracle.com/pls/apex/*"],
	contentStyleFile : self.data.url("apex-addon.css"),
	contentScriptFile : [self.data.url("jquery.1.11.1.jquery-1.11.1.min.js"), self.data.url("jqueryui.1.10.4.jquery-ui.min.js"), self.data.url("addon-util.js"), self.data.url("apex-addon.js")],
	onAttach : function(worker) {
		worker.port.emit("options-pref", getPref());
		worker.port.on('addon-position', function(objPos) {
			ss.storage.addonPosition = objPos;
		});
		worker.port.on('addon-hidden', function(isHide) {
			ss.storage.isHiden = isHide;
		});
	}
});

function handleClick(state) {
	tabs.open(sp.prefs.apex_tab_url);
}

function storePref(dataJson) {
	var sJson = JSON.stringify(dataJson);
	sp.prefs.apex_options = sJson;
}

function getPref() {
	var pos = {
		top : '82px',
		right : '1px'
	};
	if (ss.storage.addonPosition.top == undefined) {
		ss.storage.addonPosition = pos;
	} else {
		pos = ss.storage.addonPosition;
	}
	var mySetting = JSON.parse(sp.prefs.apex_options);

	mySetting.position = pos;
	mySetting.hidden = ss.storage.isHiden;

	var restful_url = sp.prefs.apex_workspace_RESTful;

	var myPrefs = {
		apex_workspace_RESTful : restful_url,
		apex_options : mySetting
	}
	return myPrefs;

}

