(function(window){
	// 定义一个Player类
	function Player($audio){
		return new Player.prototype.init($audio);
	}
	Player.prototype = {
		constructor: Player,
		musicList: [],
		init: function($audio){
			this.$audio = $audio;
			this.audio = $audio.get(0);
		},
		currentIndex: -1,
		playMusic: function(index,music){
			//判断是否是同一首音乐
			if(this.currentIndex == index){
				//同一首音乐
				if(this.audio.paused){
					//play()播放
					this.audio.play();
				}else{
					//pause()暂停 
					this.audio.pause();
				}
			}else{
					//不是同一首音乐
					this.$audio.attr("src",music.link_url);
					this.audio.play();
					this.currentIndex = index;
			}
		} ,
		preIndex: function(){
			var index = this.currentIndex - 1;
			if(index < 0){
				index = this.musicList.length - 1;
			}
			return index;
		},
		nextIndex: function(){
			var index = this.currentIndex + 1;
			if(index > this.musicList.length - 1){
				index = 0;
			}
			return index;
		},
		changeMusic: function(index){
			//删除对应的数据
			this.musicList.splice(index,1);

			//判断当前删除的是否是正在播放的音乐的前边音乐
			if(index < this.currentIndex){
				this.currentIndex = this.currentIndex - 1;
			}
		},
		// getMusicDuration: function(){
		// 	//audio.duration 获取视频的时长
		// 	return this.audio.duration;
		// },
		// getMusicCurrentTime: function(){
		// 	//audio.currentTime获取视频的当前时长
		// 	return this.audio.currentTime;
		// },
		//时间更新
		musicTimeUpdate: function(callBack){
			var $this = this;
			this.$audio.on("timeupdate",function(){
				// console.log(player.getMusicDuration(),player.getMusicCurrentTime());
				var duration = $this.audio.duration;
				var currentTime = $this.audio.currentTime;
				var timeStr = $this.formatDate(duration,currentTime);
				callBack(duration,currentTime,timeStr);
			});
		},
		//定义一个格式化时间的方法
		formatDate: function(duration,currentTime){
			var endMin = parseInt(duration / 60);
			var endSec = parseInt(duration % 60);
			if(endMin < 10){
				endMin = "0" + endMin;
			}
			if(endSec < 10){
				endSec = "0" + endSec;
			}

			var startMin = parseInt(currentTime / 60);
			var startSec = parseInt(currentTime % 60);
			if(startMin < 10){
				startMin = "0" + startMin;
			}
			if(startSec < 10){
				startSec = "0" + startSec;
			}
			return startMin + ":" +startSec + " / " + endMin + ":" + endSec;
		},
		//定义一个歌曲跳转的方法
		musicSeekTo: function(value){
			this.audio.currentTime = this.audio.duration * value;
		}
	}
	Player.prototype.init.prototype = Player.prototype;
	window.Player = Player;
})(window)