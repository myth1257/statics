(function($){
	function crateCommentInfo(obj){
		if(typeof(obj.time) == "undefined" || obj.time == ""){
			obj.time = getNowDateFormat();
		}
		
		var el = "<div class='comment'> <a class='avatar'> <img src='"+obj.img+"'></a><div class='content'><a class='author'>"+obj.replyName+"</a>"
				+"<div class='metadata'> <span class='date'>"+obj.time+"</span> </div>";
		el = el+"<div class='text'><p>"+obj.content+"</p></div></div>";
        if (obj.replyBody != "" && obj.replyBody.length > 0) {
            var arr = obj.replyBody;
            for (var j = 0; j < arr.length; j++) {
                var replyObj = arr[j];
                el = el + createReplyComment(replyObj);
            }
        }
        el = el + "</div>";
		return el;
	}
	
	//返回每个回复体内容
	function createReplyComment(reply){
		var replyEl = "<div class='comments'><div class='comment'><a class='avatar'><img src='"+reply.img+"'></a><div class='content'><a class='author'>"+reply.replyName+"</a><div class='metadata'><span class='date'>"+reply.time+"</span></div><div class='text'>"+reply.content+"</div></div></div></div>";
		return replyEl;
	}
	function getNowDateFormat(){
		var nowDate = new Date();
		var year = nowDate.getFullYear();
		var month = filterNum(nowDate.getMonth()+1);
		var day = filterNum(nowDate.getDate());
		var hours = filterNum(nowDate.getHours());
		var min = filterNum(nowDate.getMinutes());
		var seconds = filterNum(nowDate.getSeconds());
		return year+"-"+month+"-"+day+" "+hours+":"+min+":"+seconds;
	}
	function filterNum(num){
		if(num < 10){
			return "0"+num;
		}else{
			return num;
		}
	}
	function replyClick(el){
		el.parent().parent().append("<div class='replybox'><textarea cols='80' rows='50' placeholder='来说几句吧......' class='mytextarea' ></textarea><span class='send'>发送</span></div>")
		.find(".send").click(function(){
			var content = $(this).prev().val();
			if(content != ""){
				var parentEl = $(this).parent().parent().parent().parent();
				var obj = new Object();
				obj.replyName="匿名";
				if(el.parent().parent().hasClass("reply")){
					console.log("1111");
					obj.beReplyName = el.parent().parent().find("a:first").text();
				}else{
					console.log("2222");
					obj.beReplyName=parentEl.find("h3").text();
				}
				obj.content=content;
				obj.time = getNowDateFormat();
				var replyString = createReplyComment(obj);
				$(".replybox").remove();
				parentEl.find(".reply-list").append(replyString).find(".reply-list-btn:last").click(function(){alert("不能回复自己");});
			}else{
				alert("空内容");
			}
		});
	}
	
	
	$.fn.addCommentList=function(options){
		var defaults = {
			data:[],
			add:""
		}
		var option = $.extend(defaults, options);
		//加载数据
		if(option.data.length > 0){
			var dataList = option.data;
			var totalString = "";
			for(var i=0;i<dataList.length;i++){
				var obj = dataList[i];
				var objString = crateCommentInfo(obj);
				totalString = totalString+objString;
			}
			$(this).append(totalString).find(".reply-btn").click(function(){
				if($(this).parent().parent().find(".replybox").length > 0){
					$(".replybox").remove();
				}else{
					$(".replybox").remove();
					replyClick($(this));
				}
			});
			$(".reply-list-btn").click(function(){
				if($(this).parent().parent().find(".replybox").length > 0){
					$(".replybox").remove();
				}else{
					$(".replybox").remove();
					replyClick($(this));
				}
			})
		}
		
		//添加新数据
		if(option.add != ""){
			obj = option.add;
			var str = crateCommentInfo(obj);
			$(this).prepend(str).find(".reply-btn").click(function(){
				replyClick($(this));
			});
		}
	}
	
	
})(jQuery);