// ==UserScript==
// @name         X-Art Helper
// @namespace    http://www.x-art.com/
// @version      0.1
// @description  X-Art Helper
// @author       anonymous
// @match        http://www.x-art.com/videos/*
// @grant        none
// @require      http://code.jquery.com/jquery-1.11.2.min.js
// ==/UserScript==

var XArt = {
	videos: {
		getVideoInfo: function() {
			var result = {};
			result.name = $("#content h1").text();
			result.date = new Date($("#content .head-list li").eq(0).text());
			result.models = new Array();
			$("#content .head-list li a").each(function() {
				result.models.push($(this).text());
			});
			result.getFileName = function() {
				var dateNumber = this.date.getFullYear() * 10000 + (this.date.getMonth() + 1) * 100 + this.date.getDate();
				var modelsStr = this.models.join(" & ");
				return "X-Art " + dateNumber + " " + modelsStr +  " - " + this.name;
			};
			result.getSearchString = function() {
				var modelsStr = this.models.join(" ");
				return "X-Art " + modelsStr + " " + this.name;
			};
			return result;
		},
		doHelp: function() {
			var videoInfo = XArt.videos.getVideoInfo();
			// 添加输入框，写入文件名
			$("#content .box").eq(0).before('<div><input type="text" style="width: 100%;" id="filenametext" /></div>');
			$("#filenametext").val(videoInfo.getFileName());
			// 添加下载按钮
			var btdiggStr = "http://btdigg.org/search?info_hash=&q=" + videoInfo.getSearchString();
			var thepriatebayStr = "";
			var bitsnoopStr = "http://bitsnoop.com/search/all/" + videoInfo.getSearchString() + "/c/d/1/";
			$("#content .box").eq(0).before('<div>DownLoad: <a target="_blank" href="' + btdiggStr + '">BTDigg</a> | <a target="_blank" href="' + thepriatebayStr + '">The Pirate Bay</a> | <a target="_blank" href="' + bitsnoopStr + '">BitSnoop</a></div>');
		}
	}
};

XArt.videos.doHelp();
