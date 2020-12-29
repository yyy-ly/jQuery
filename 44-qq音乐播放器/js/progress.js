(function(window){

	// 定义一个Progress类
	function Progress($progressBar,$progressLine,$progressDot){
		return new Progress.prototype.init($progressBar,$progressLine,$progressDot);
	}
	Progress.prototype = {
		constructor: Progress,
		init: function($progressBar,$progressLine,$progressDot){
			this.$progressBar = $progressBar;
			this.$progressLine = $progressLine;
			this.$progressDot = $progressDot;	
		},
		progressClick: function(callBack){
			var $this = this;//此时的this是progress
			//监听背景的点击
			this.$progressBar.click(function(event){
				//获取背景距离窗口默认的距离
				var normalLeft = $(this).offset().left; 
				
				//获取点击的位置距离窗口的位置
				var eventLeft = event.pageX;

				//设置前景的宽度
				$this.$progressLine.css("width",eventLeft - normalLeft);
				$this.$progressDot.css("left",eventLeft - normalLeft);

				//计算进度条比例
				var value = (eventLeft - normalLeft) / $(this).width();
				callBack(value);
			})
		},
		progressMove: function(callBack){
			var $this = this;
			//1.监听鼠标的按下事件
			this.$progressBar.mousedown(function(){
				//获取背景距离窗口默认的距离
				var normalLeft = $(this).offset().left; 
				//2.监听鼠标的移动事件
				$(document).mousemove(function(){
					//获取点击的位置距离窗口的位置
					var eventLeft = event.pageX;
					//设置前景的宽度
					$this.$progressLine.css("width",eventLeft - normalLeft);
					//设置小圆点位置
					$this.$progressDot.css("left",eventLeft - normalLeft);
					//判断小圆点是否脱线
					if(eventLeft - normalLeft < 0){
            $this.$progressDot.css("left",0);
					}
					//计算进度条比例
					var value = (eventLeft - normalLeft) / $(this).width();
					callBack(value);
				})
			})
			//3.监听鼠标的抬起事件
			$(document).mouseup(function(){
				$(document).off("mousemove");
			})
		},
		setProgress: function(value){
			if(value < 0 || value > 100) return;
			this.$progressLine.css({
				width: value+"%"
			});
			this.$progressDot.css({
				left: value+"%"
			})

		}
	}
	Progress.prototype.init.prototype = Progress.prototype;
	window.Progress = Progress;
})(window)