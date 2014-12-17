(function() {
	function PlayListEndException() {
		this.name = 'PlayListEndException';
	}
	var youdao = this.youdao = this.youdao || {};

	var youdaoMusic = youdao.music = {
		YOUDAO_PATH: 'http://xue.youdao.com',
		options: {
			listSel: '',
			playSel: ''
		},
		init: function(ops) {
			youdaoMusic.options = ops;
			youdaoMusic.playlist.init(youdao.musicSrc)
			youdaoMusic.player.init($(youdaoMusic.options.playSel)[0]);
		}
	}

	var playlist = youdaoMusic.playlist = {
		currntPlay: 0,
		listLength: 0,
		loop: true,
		items: [],
		init: function(listData) {
			playlist.items = listData;
			playlist.listLength = listData.length;
			$(youdaoMusic.options.listSel).empty();
			$.each(playlist.items, function(i, e) {
				$('<a data-index="' + i + '" href="javascript:void(0)">' + e.name + '</a>').appendTo(youdaoMusic.options.listSel);
			});
			$(youdaoMusic.options.listSel+" a").unbind("click").click(function() {
				var index = $(this).data("index");
				playlist.currntPlay=parseInt(index);
				player.play();
			});
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
		}
	};
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
			player.audio.src = youdaoMusic.YOUDAO_PATH + playlist.getCurrentPlay().url;
			player.audio.play();
		}
	}

})()