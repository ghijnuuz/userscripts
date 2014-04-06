// ==UserScript==
// @name		自动猜拳
// @version		v1.0.0
// @match		http://fight.huodong.xiaomi.com/*
// @author		ghijnuuz@gmail.com
// @description 2014米粉节 世界拳王争霸赛
// ==/UserScript==

var obj;
// 开始游戏
obj = $("#wrapper .g-start-btn");
if (obj.length > 0) {
	obj[0].click();
}
// 玩游戏
var playing = function() {
	// 猜拳
	if ($(".jq-window-fight").is(":hidden") == false) {
		obj = $(".jq-window-fight .g-window-inner .g-window-fight");
		if (obj.length > 0) {
			obj.find("a").last().click();
		}
	}
	// 赢了
	if ($(".jq-window-result").is(":hidden") == false) {
		obj = $(".jq-window-result .g-window-inner .g-window-rbtn-getaward");
		if (obj.length > 0) {
			obj[0].click();
		}
	}
	// 砸彩蛋
	if ($(".jq-window-getaward-egg").is(":hidden") == false) {
		obj = $(".jq-window-getaward-egg .g-window-inner .g-window-egg .inner");
		if (obj.length > 0) {
			obj.find("a").last().click();
		}
	}
	// 返回
	if ($(".jq-window-getaward-egg").is(":hidden") == false
		&& $(".jq-window-getaward-egg .g-window-inner .g-window-rbtn-continue").is(":hidden") == false) {
		obj = $(".jq-window-getaward-egg .g-window-inner .g-window-rbtn-continue");
		if (obj.length > 0) {
			obj[0].click();
		}
	}
	// 输了
	if ($(".jq-window-result-loose").is(":hidden") == false) {
		obj = $(".jq-window-result-loose .g-window-inner .g-window-rbtn");
		if (obj.length > 0) {
			obj[0].click();
		}
	}
}
setInterval(playing, 1000);