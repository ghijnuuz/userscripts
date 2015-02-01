// ==UserScript==
// @name         X-Art Helper
// @namespace    http://www.x-art.com/
// @version      0.2
// @description  X-Art Helper
// @author       anonymous
// @match        http://www.x-art.com/videos/*/
// @grant        none
// @require      http://code.jquery.com/jquery-1.11.2.min.js
// ==/UserScript==

var XArt = {
	TorrentSearchEngine: {
		Engines: [{
			name: "BTDigg",
			url: "http://btdigg.org/search?q={SearchString}"
		}, {
			name: "The Pirate Bay",
			url: "https://thepiratebay.se/search/{SearchString}"
		}, {
			name: "Torrentz",
			url: "http://torrentz.eu/any?f={SearchString}"
		}, {
			name: "ExtraTorrent",
			url: "http://extratorrent.cc/search/?search={SearchString}"
		}, {
			name: "BitSnoop",
			url: "http://bitsnoop.com/search/all/{SearchString}"
		}],
		GetSearchLinkArray: function(searchStr) {
			var result = new Array();
			for (var i = 0; i < this.Engines.length; i++) {
				var item = this.Engines[i];
				var str = '<a target="_blank" href="' + item.url.replace(/{SearchString}/, searchStr) + '">' + item.name + '</a>';
				result.push(str);
			};
			return result;
		}
	},
	Videos: {
		GetVideoInfo: function() {
			var result = {};
			result.name = $("#content h1").text();
			result.date = new Date($("#content .head-list li").eq(0).text());
			result.models = new Array();
			$("#content .head-list li a").each(function() {
				result.models.push($(this).text());
			});
			result.GetFileName = function() {
				var dateNumber = this.date.getFullYear() * 10000 + (this.date.getMonth() + 1) * 100 + this.date.getDate();
				var modelsStr = this.models.join(" & ");
				return "X-Art " + dateNumber + " " + modelsStr +  " - " + this.name;
			};
			result.GetSearchString = function() {
				var modelsStr = this.models.join(" ");
				return "X-Art " + modelsStr + " " + this.name;
			};
			return result;
		},
		DoHelp: function() {
			var videoInfo = XArt.Videos.GetVideoInfo();
			// 添加输入框，写入文件名
			$("#content .box").eq(0).before('<div><input type="text" style="width: 100%;" id="filenametext" /></div>');
			$("#filenametext").val(videoInfo.GetFileName());
			// 添加下载按钮
			var searchLinkArray = XArt.TorrentSearchEngine.GetSearchLinkArray(videoInfo.GetSearchString());
			$("#content .box").eq(0).before('<div>DownLoad: ' + searchLinkArray.join(" | ") + '</div>');
		}
	}
};

XArt.Videos.DoHelp();
