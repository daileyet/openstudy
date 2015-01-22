(function() {
	function PlayListEndException() {
		this.name = 'PlayListEndException';
	}
	var RESOURCE_URL = 'https://apex.oracle.com/pls/apex/open-thinks/youdao/music/api/list';
	var LYRIC_URL = 'https://apex.oracle.com/pls/apex/open-thinks/youdao/music/api/lyric/';
	var youdao = this.youdao = this.youdao || {};

	var youdaoMusic = youdao.music = {
		YOUDAO_PATH: 'http://xue.youdao.com',

		options: {
			listSel: '',
			playSel: '',
			lyricSel: ''
		},
		init: function(ops) {
			youdaoMusic.options = ops;
			youdaoMusic.playlist.render(RESOURCE_URL);
			youdaoMusic.player.init($(youdaoMusic.options.playSel)[0]);
		}
	}

	/**
	 *playlist
	 */
	var playlist = youdaoMusic.playlist = {
		currntPlay: 0,
		listLength: 0,
		loop: true,
		items: [],
		navNext: null,
		navPrevious: null,
		render: function(fetchUrl) {
			playlist.navNext = null;
			playlist.navPrevious = null;
			playlist.items = [];
			playlist.fetch(fetchUrl);
		},
		getCurrentPlay: function() {
			return playlist.items[playlist.currntPlay];
		},
		next: function() {
			if (playlist.currntPlay + 1 >= playlist.listLength) {
				if (!playlist.loop) throw new PlayListEndException();
				else {
					playlist.currntPlay = 0;
					return;
				}
			}
			playlist.currntPlay = playlist.currntPlay + 1;
		},
		fetch: function(url) {
			$.getJSON(url, function(data) {
				if (data.next) {
					playlist.navNext = data.next.$ref;
				}
				if (data.previous) {
					playlist.navPrevious = data.previous.$ref;
				}
				if (data.items) {
					playlist.items = data.items;
				}
				playlist.updateUI();
			})
		},
		updateUI: function() {
			var listData = playlist.items;
			playlist.listLength = listData.length;
			playlist.currntPlay = 0;
			var $listConent = $(youdaoMusic.options.listSel + ' .content');
			var $listNav = $(youdaoMusic.options.listSel + ' .nav');
			$listConent.empty();
			$listNav.empty();

			if (playlist.navPrevious) {
				$listNav.append('<button name="PP">&lt;</button>');
			}
			if (playlist.navNext) {
				$listNav.append('<button name="PN">&gt;</button>');
			}

			$.each(playlist.items, function(i, e) {
				$('<a data-index="' + i + '" href="javascript:void(0)">' + e.name + '</a>').appendTo($listConent);
			});
			$("a", $listConent).unbind("click").click(function() {
				var index = $(this).data("index");
				playlist.currntPlay = parseInt(index);
				player.play();
			});

			$("button", $listNav).unbind('click').click(function() {
				var clickedBtnName = $(this).attr('name');
				var updateUrl = (clickedBtnName == 'PN' ? playlist.navNext : playlist.navPrevious);
				playlist.render(updateUrl);
			});
		}
	};





	/**
	 *player
	 */
	var player = youdaoMusic.player = {
		audio: new Audio(),
		init: function(audio) {
			player.audio = audio;
			player.audio.onended = function() {
				try {
					playlist.next();
					player.play();
				} catch (ex) {
					console.log("Play end.");
				}
			}
		},
		play: function() {
			player.audio.src = youdaoMusic.YOUDAO_PATH + playlist.getCurrentPlay().audio_url;
			$('a[data-index!="' + playlist.currntPlay + '"]').removeClass('audio-list-active');
			$('a[data-index="' + playlist.currntPlay + '"]').addClass('audio-list-active');
			player.audio.play();
			var lyric_url = LYRIC_URL + playlist.getCurrentPlay().id
			$.get(lyric_url, function(html) {
				$(youdaoMusic.options.lyricSel).html(html);
			});
		}
	}

})();

(function() {
	var youdao = this.youdao = this.youdao || {};
	var youdaoMusicSrc = youdao.musicSrc = [];
})();