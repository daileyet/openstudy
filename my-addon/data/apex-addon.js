/**
 * Firefox addon for apex app, makes it easily and helpful for developer
 * @author dailey.dai@oracle.com
 * @since 23-JUN-14
 */
(function() {

    var apex_addon = {
        getAppID: function() {
            var sDocUrl = document.URL,
            sDocUrl_Sub = '',
            sAPP_ID = '';
            var r = new RegExp("f\\?p=\\d*", "gi");
            var matchs = sDocUrl.match(r);
            if (matchs && matchs.length == 1) {
                sDocUrl_Sub = matchs[0];
                sAPP_ID = sDocUrl_Sub.substring(sDocUrl_Sub.indexOf("=") + 1);
            }
            return sAPP_ID;
        },
        isOracleApex: function() {
            var sDocUrl = document.URL;
            return sDocUrl.indexOf('apex.oracle.com') != -1;
        },
        getPageID: function() {
            var sDocUrl = document.URL,
            sDocUrl_Sub = '',
            sPage_ID = '';
            var r = new RegExp("f\\?p=\\d*:\\d*", "gi");
            var matchs = sDocUrl.match(r);
            if (matchs && matchs.length == 1) {
                sDocUrl_Sub = matchs[0];
                sPage_ID = sDocUrl_Sub.substring(sDocUrl_Sub.indexOf(":") + 1);
            }
            return sPage_ID;
        },
        isValidSSOLogin: function() {
            var sDocUrl = document.URL;
            return sDocUrl.indexOf('mysso') != -1 && sDocUrl.indexOf('signon') != -1 && apex_addon.pref.sso != undefined && apex_addon.pref.sso.username != '';
        },
        isValidApexDevLogin: function() {
            //apex_addon.pref.items!=undefined && apex_addon.pref.items.length>0
            var currentURLtype = apex_addon.isOracleApex() ? 'oracle': 'oraclecorp';
            if (apex_addon.pref.items == undefined) apex_addon.pref.items = [];
            var arry = $.grep(apex_addon.pref.items,
            function(e, index) {
                return e.type != undefined && e.type == currentURLtype
            });
            return arry.length > 0;
        },
        getSession: function(type) { //type: workspace or application
            var stype = type;
            if (stype == undefined) {
                stype = 'workspace';
            }
            try {
                switch (stype.toLowerCase()) {
                case 'workspace':
                    var homeLink = $('#apex-dev-toolbar a:first').attr('href');
                    return homeLink.substring(homeLink.lastIndexOf(':') + 1);
                    break;
                case 'application':
                    return $('#pInstance').val();
                    break;
                }
            } catch(e) {}
            return '';
        },
        show: function() {
            var $ui = $("#apex-addon-firefox");
            if ($ui.length == 0) {
                $ui = apex_addon.createUI();
            }
            apex_addon.updateUI();
        },
        doApexLogin: function(index) {
            var item = apex_addon.pref.items[index];
            $('#F4550_P1_COMPANY').attr('value', item.workspace);
            $('#F4550_P1_USERNAME').attr('value', item.username);
            $('#F4550_P1_PASSWORD').attr('value', item.password);
            if (item.password != '' && item.workspace != '' && item.username != '') {
                $("#pRequest").val('LOGIN_BUTTON');
                $("form[name='wwv_flow']").submit();
            }
        },
        doSSOLogin: function() {
            $('#sso_username').attr('value', apex_addon.pref.sso.username);
            $('#ssopassword').attr('value', apex_addon.pref.sso.password);
            if (apex_addon.pref.sso.username != '' && apex_addon.pref.sso.password != '') {
                $(document.LoginForm).submit();
            }

        },
        createUI: function() {

            var sUI = '<div id="apex-addon-firefox" style="right:' + apOps.getPosition().right + ';top:' + apOps.getPosition().top + ';">' + '<table cellpadding="0" cellspacing="0" style="">' + '<tr>'
            ///////////////////////////////////////////////////
            + '<td align="center" style="width:20px;">' + '<img class="apex-addon-switch" style="cursor:pointer;margin-top:4px;" title="Apex addon" src=""/>' + '</td>'
            ///////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////
            + '<td style="width:245px;">' + '<div class="apex-addon-sso" style="">' + '<a href="javascript:void(0)">My SSO</a>' + '</div>'
            ////////////////////////////////////////////////////////
            + '<div class="apex-addon-login" style="">' + '<ul>' + (function(items) {
                var ret = '';
                if (items == undefined) items = [];
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    var currentURLtype = apex_addon.isOracleApex() ? 'oracle': 'oraclecorp';
                    if (item.type != undefined && currentURLtype == item.type) {
                        ret = ret + '<li><a href="javascript:void(0)" data-item="' + i + '">' + item.workspace + '</a></li>';
                    }
                }
                return ret;
            })(apex_addon.pref.items) + '</ul>' + '</div>'
            ///////////////////////////////////////////////////////
            + '<div style="padding-left:2px;" class="apex-addon-quick-link">' + '<p class="apex-addon-workspace" style="display:none">Workspace:<b>' + apDa.current.worksapce + '</b></p>' + '<span>Quick links:</span>' + '<div class="apex-addon-links">' + (function(links) {
                var ret = '';
                for (var i in links) {
                    var link = links[i];
                    //ret=ret+'<a href="'+link.url+'" title="'+link.title+'" style="">'+link.text+'</a>&nbsp;'
                    ret = ret + '<a target="_blank" href="' + link.url + '" title="' + link.title + '" style=""><img src="' + link.img + '" /></a>&nbsp;';
                }
                return ret;
            })(apOps.getLinks()) + '</div>' + '</div>'
            ///////////////////////////////////////////////////////
            + '</td>' + '<td style="vertical-align:top;padding-top:2px;padding-right:2px;">' + '<img src="" width="16" class="collapse-first" data-image="' + (function() {
                return apex_addon.pref.hidden ? 'checked': 'unchecked';
            })() + '" title="Hidden when page load"/>' + '</td>' + '<tr>'
            ///////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////
            + '</div>';

            $(sUI).appendTo('body');
            var $switch = $('img.apex-addon-switch'),
            $ui = $('#apex-addon-firefox'),
            $hidden = $('img.collapse-first');

            apOps.isShown = !apex_addon.pref.hidden;

            $switch.attr('src', apOps.isShown ? apOps.switchImages.show: apOps.switchImages.hide).click(function() {
                $switch.attr('src', apOps.isShown ? apOps.switchImages.hide: apOps.switchImages.show);
                $ui.animate({
                    right: apOps.isShown ? -230 : 1
                });
                apOps.isShown = !apOps.isShown;
            });

            $ui.draggable({
                axis: "y",
                stop: function() {
                    var newPos = {
                        right: $ui.css('right'),
                        top: $ui.css('top')
                    }
                    //////////////////////////////////////////////////////////////////////////////////////////////////////
                    self.port.emit('addon-position', newPos);
                }
            });

            $('.apex-addon-login a').click(function() {
                var $link = $(this);
                apex_addon.doApexLogin(parseInt($link.data('item')));
            });
            $('.apex-addon-sso a').click(function() {
                apex_addon.doSSOLogin();
            });

            $hidden.click(function() {
                var $img = $(this);
                var sImg = $img.data("image"),
                bHide = true;;
                if (sImg == 'checked') {
                    sImg = 'unchecked';
                    bHide = false;
                } else {
                    sImg = 'checked';
                    bHide = true;
                }
                $img.attr('src', apOps.switchImages[sImg]).data('image', sImg);
                apex_addon.pref.hidden = bHide;
                self.port.emit('addon-hidden', apex_addon.pref.hidden);
            }).attr('src', apOps.switchImages[$hidden.data('image')]);

            return $('#apex-addon-firefox');

        },
        base64Image:function(){
        	var $imgs=$("img");
        	$imgs.each(function(){
        		var $img=$(this);
        		
        		if($img.attr("src").startsWith('data:image')){
        			return;
        		}
        		
        		$img.attr("src",getBase64Image($img[0]));
        		
        	});
        },
        updateUI: function() {
            var $ui = $("#apex-addon-firefox"),
            $switch = $('img.apex-addon-switch'),
            sAppID = apex_addon.getAppID();
            function positionSwitch() {
                $switch.css('top', $ui.position().top + $ui.height() / 2 - 4);
            }
            if (sAppID == '') { //sso login
                if (apex_addon.isValidSSOLogin()) {
                    $ui.find('.apex-addon-quick-link').hide();
                    $ui.find('.apex-addon-login').hide();
                    $ui.show();
                    positionSwitch();
                } else {
                    $ui.remove();
                }
            } else if (['4000', '4550', '4500'].indexOf(sAppID) != -1) {
                $ui.hide();
                if (sAppID == '4550' && apex_addon.getPageID() == '1' && apex_addon.isValidApexDevLogin()) { // login workspace
                    $ui.find('.apex-addon-quick-link').hide();
                    $ui.find('.apex-addon-sso').hide();
                    $ui.show();
                    positionSwitch();
                } else {
                    $ui.remove();
                }
            } else {
                if (apex_addon.getSession() != '') {
                    $ui.find('.apex-addon-login').hide();
                    $ui.find('.apex-addon-sso').hide();
                    $.getJSON(apOps.getQuery(),
                    function(data) {
                        apDa.current = data;
                        $ui.find('.apex-addon-workspace b').text(apDa.current.worksapce);
                        $ui.find('.apex-addon-workspace').show();
                        positionSwitch();
                    });
                    $ui.show();
                    positionSwitch();
                } else { // not dev view
                    $ui.remove();
                }

            }
        },
        options: {
            isShown: true,
            switchImages: {
                show: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABNUlEQVQ4T42TvUoDQRSFXcRCX0ICWhiL/JAyCEmldd5A/IM0gUCewM4mENQYEEtfwRRKsJcEK6MgNj6ANpEUxu/IXhjG2awDh5k5c+93Z2dnooW/rYh1iKpoNV5+o79DXTRyUyJnssK4g3YDUNfqMWmgiUwDKLmPyinJtnzPYFsQA1z+o7LPvsA4EkDf/BCofIxXQxtzdlUQQKQDL+iTeQmp1+FlEyDnArygtUDAO14lBTIWYIqWEioY5CPeyaYXN00DKP4EtZDuhu6B234Bz2g9YQdX+HtIh3mNFr24JwFEFd1vacmKPxUgj4YBwD6evj1U2cJzdpFCv3JG1Hdg25Z8xqBugGUmN2gr4Sx8e4Cxg77cxyRIG/mXyk9W5aaSteACLFBnIoiecyY2X+lvkV7io0v8AW8NOTrrAE0BAAAAAElFTkSuQmCC',
                hide: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABLElEQVQ4T2NkwARGQKF0IHYCYnmo9AMgvQ+IZwDxBWQtjEgcLiB7MhAnYTEUWWgWkFMAxN9BgjADQJp3ArENAc0w6UNAhgfIEJgBc4mwGd3smUCBDJABID+fxWHzb6B4JRBXALEIFjWGIANAJqVhkQRpDgXirUC8Doh9saiZDjLgNhCroEkia14IlIvC4cKbIAN+ATErkgJiNYO0/MJmwDdoCJ8G0huA2B2H7XADbgFZqmiKvgL5nkBMyJAbIBeAUhco5aEDYgyZCjLAAIjP43AmzBCQN6qxqNGHJSRcUQnSAwpU5ECGmTMNyMiGGcAJ5OwAYjs8AYYsdQAaRj+QMxPIkAlAjC1RIWsG2VwMxD9AgsgGwBSBwgRkCCg7K0IF7wHpvUAMyomXkE0DAKhePDqkVrNeAAAAAElFTkSuQmCC',
                checked: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACH0lEQVRYhcWXP4gTQRSHX8RDECwsBDkbG7PEkM2b3+8lhWmCdpZid4U2sfDPiYVwjYWtZcTORrDUKs11V1mJ5cHBNVp4hY0giGLwYjN7t46TZOPtXgam2Z2Z75u3b3fniRy2mqoOAIxI7pGclNz3AIxUdSAiNcm3JElWSW5VAJ3Wt5IkWT3YeQDfITkkuVFyH/q1DyREpCaqOsguAnhBckUqaiRXPGNCcqKqA/HPPNt5ZfC8RBYJACPJJdywbBiARrPZPB+RGGaJKblnslEmXFXXAOyT/GFmjySX+T4nJiQnlQjU6/ULAL4Gmf/q2AQAbIavHoDdYxEAcCf27qvqWuUCqnqR5LcQbmZv8+OqEgg/aFnovzjnzlUu4Jx7EAs9gBvh2NIFGo3GJZLfI/DXsfFlC5xwzr2LwD+3Wq2zRxJot9uu2+3WZ9FV9XEs9GZ2fdqcQgIk1/31sZndjC3knLsM4GdE4OUs6bkCqno7WPAfiX6/f9LM3kdC/7HX6505kgDJD5Fd/SVB8kkEvp+m6dVZ8MIR8D+SqISqKslf4X3n3PN58EICftDdWHKRHJP8FNn9LsnTpQn4SNybIhHCf3c6nStF4AsJiIiY2f15Amb2rCh8YQGR6Z9Zv/ttETlVqYCftB4RGAPgIvD/FvATHwZZ/3RReExgoUNpmqbXnHNvSN6SsMIpLnB4KF36sXzphYksuzQTWX5xmrWllOd/ABcM1ZmPc6pjAAAAAElFTkSuQmCC',
                unchecked: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAuElEQVRYhe2XsQ0DIQxFP8UtcQvQWv4zsQNzIGUSBrg1MsGtQRp8QZHSHSGFv+SGgv/ALvyBt4KIJFWtJE+S7eY6VbWKSAIQMCrGuJM8Jph+qyPGuF8v/zB/kiwk881V+t0XBIAAEUl2qKoPkhsmieTWPRrJJiIJvef28mnmI4T9hKpWDANXZpsPEMUGE0NP8g8Bsvk6gAM4gAM4gAM4gAM4wF8ArF1Kl6/ly4MJVkczYH04NS2J5y/x59conCz+KgAAAABJRU5ErkJggg=='
            },
            queryURL: 'https://apex.oraclecorp.com/pls/apex/hcmca_test/addons/#APP_ID#',
            getQuery: function(appid) {
                var queryApp = appid;
                if (queryApp == undefined) {
                    queryApp = apex_addon.getAppID();
                }
                apOps.queryURL = apex_addon.pref.restful_url;
                return apOps.queryURL.replace('#APP_ID#', queryApp);
            },
            quickLinks: [{
                text: 'Edit',
                urlTemplate: 'https://apex.&DOMAIN..com/pls/apex/f?p=4000:4150:&SESSION.::NO:1,4150:FB_FLOW_ID,FB_FLOW_PAGE_ID,F4000_P1_FLOW,F4000_P4150_GOTO_PAGE,F4000_P1_PAGE:&APP_ID.,&APP_PAGE_ID.,&APP_ID.,&APP_PAGE_ID.,&APP_PAGE_ID.',
                title: 'Edit Page',
                url: '',
                img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABNElEQVQ4jZ3UTUrDQBQA4A8LgmJVVBQErZYKYkEXrt25Edx6BQ/iUql4AReeQ8FS6w8oegLRjeDKja6ti0wgDUna+OBByHvzMTOZDFFUsI7tAVnTH2OYSb1TQQe9AfmGlcS4aTyE2guacWFtCOwVy6mJjOIYv6HnKS40EwOPsJuRCwloAtc4D8+HifHzafAgvR+pqOIm0f8Y0BPcYbwMWEU3YzsuwvKrWUvOAydxm4H10MZIsnkQOIvnHOxSdHT6ogicwn0O1hHtXxwNLBaBc6LzlYVdpWa2gc9g5YL7+M7AuhIfAEt4D7Vc8Ax1bOKjABPGxPVcsIcv7GALP6KvnMZKgTG6ij3R0cmKUmAPpzlQKbBMFIKt0FAmW2lwmOtr2Gww/AU7KNsS/3RFdL3X/5m1GPsDnEe61t7KxjYAAAAASUVORK5CYII='
            },
            {
                text: 'Object',
                urlTemplate: 'https://apex.&DOMAIN..com/pls/apex/f?p=4500:1001:&SESSION.::NO:::',
                title: 'Object Browser',
                url: '',
                img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAARCAIAAABfOGuuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEWSURBVDhPnZG/aoNQGMW/h8obKCq0mEIrFDqE0MGhQ0DI4CD+wVX3jg4iIoIOgkJxEHwFX6c93A9LuRCb5DcczuGek3iV5nk2DGN3NShjQqZpqqr6eDUoY0KKojzdCCak6/rLjWBCD3dBe8HnCsfvy3CBngVZlhVFAeWIleM4mqZBJc8FehXkeV5VFZQjqpZl2bYNlTwX6E1QlmXTNFCOqEZRBBOGoeS5QAdBXddd10E5btyNC/QuaNt2GAYoR8w8z8N3gUqeC4QLAPzVOI5QjqjizHVd/om/ngv0Iej7fpomKEdU0zSFSZJE8lygk+BrhePG3bhAQRDg45xX4MHxMjj1fZ+WZcG7/p39a+I4xoQ2nmfj6AeBrOAx10ARZwAAAABJRU5ErkJggg=='
            },
            {
                text: 'SQL',
                urlTemplate: 'https://apex.&DOMAIN..com/pls/apex/f?p=4500:1003:&SESSION.::NO:::',
                title: 'SQL Commands',
                url: '',
                img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAARCAIAAABfOGuuAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADJSURBVDhPnZHNCoJQEEa/h+oNFBIKC9oEQRKhLRJEQXCnL+e7+PcO9jEDFxcZk2fl4py5c69o2zYIgp0ZykwQhqHv+0czlJnA87zznzDBfhM4CLMZ9XESzNWsPi4Cs67r7kLf9z+mqI+roN4wDGmaxnHMj7VSfdwEJzHIsixJkrVSfUTCMsvzvCiKcRy/Hqg+nsJyybIsp2laW1J9vARKHM/1qqpyjV7D3VwHqY+3YP8B6oMnEHumPpqm4QM8zFCu63prZl9vaX4ANVNP1riYjk8AAAAASUVORK5CYII='
            },
            {
                text: 'Image',
                urlTemplate: 'https://apex.&DOMAIN..com/pls/apex/f?p=4000:4035:&SESSION.::NO:::',
                title: 'Images',
                img: '/i/htmldb/icons/pt_images.png'
            },
            {
                text: 'Files',
                urlTemplate: 'https://apex.&DOMAIN..com/pls/apex/f?p=4000:40:&SESSION.::NO:::',
                title: 'Static Files',
                img: '/i/htmldb/icons/pt_files.png'
            },
            {
                text: 'Security',
                urlTemplate: 'https://apex.&DOMAIN..com/pls/apex/f?p=4000:4070:&SESSION.::NO:::',
                title: 'Authorization Schemes',
                img: '/i/htmldb/icons/pt_security.png'
            },
            {
                text: 'Tabs',
                urlTemplate: 'https://apex.&DOMAIN..com/pls/apex/f?p=4000:643:&SESSION.::NO:::',
                title: 'Tabs',
                img: '/i/htmldb/icons/pt_tab.png'
            },
            {
                text: 'Lov',
                urlTemplate: 'https://apex.&DOMAIN..com/pls/apex/f?p=4000:4110:&SESSION.::NO:::',
                title: 'Lists of Values',
                img: '/i/htmldb/icons/pt_lov.png'
            },{
            	text: 'Base64',
                urlTemplate: 'javascript:base64Image()',
                title: 'Image Base64',
                img: '/i/htmldb/icons/pt_lov.png'
            }],
            getLinks: function() {
                var session = apex_addon.getSession();
                var sDomain = apex_addon.isOracleApex() ? 'oracle': 'oraclecorp';
                var sAppId = apex_addon.getAppID();
                var sPageId = apex_addon.getPageID();
                for (var i in apOps.quickLinks) {
                    apOps.quickLinks[i].url = apOps.quickLinks[i].urlTemplate.replace('&SESSION.', session);
                    apOps.quickLinks[i].url = apOps.quickLinks[i].url.replace('&DOMAIN.', sDomain);
                    apOps.quickLinks[i].url = apOps.quickLinks[i].url.replace('&APP_ID.', sAppId);
                    apOps.quickLinks[i].url = apOps.quickLinks[i].url.replace('&APP_PAGE_ID.', sPageId);
                }
                return apOps.quickLinks;
            },
            getPosition: function() {
                if (apex_addon.pref.hidden == undefined) {
                    apex_addon.pref.hidden = true;
                }
                if (!apex_addon.pref.hidden) {
                    return apex_addon.pref.position;
                } else {
                    return {
                        right: '-230px',
                        top: apex_addon.pref.position.top
                    };
                }
            }
        },
        data: {
            current: {}
        },
        pref: {}

    },
    apOps = apex_addon.options,
    apDa = apex_addon.data;

    $(document).ready(function() {

        self.port.on('options-pref',
        function(prefObj) {
            apex_addon.pref = {
                sso: prefObj.apex_options.sso,
                items: prefObj.apex_options.items,
                restful_url: prefObj.apex_workspace_RESTful,
                position: prefObj.apex_options.position,
                hidden: prefObj.apex_options.hidden
            };
            apex_addon.show();
        });

    });

})();