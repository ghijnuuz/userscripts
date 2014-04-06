// ==UserScript==
// @name		什么值得买 自动签到
// @version		v1.0.1
// @match		http://*.smzdm.com/*
// @author		ghijnuuz@gmail.com
// @description 什么值得买网站，登陆后打开网页自动签到
// ==/UserScript==

// 如果找到“签到领积分”按钮，点击签到
// 如果未找到按钮，并且当前为未签到状态，打开签到页面
setTimeout(function() {
	var obj = $("#qdDailyBut");
	if (obj.length > 0) {
		obj[0].click();
	} else {
		obj = $("#signInHeaderBtn.signIn a");
		if (obj.length > 0) {
			obj[0].click();
		}
	}
}, 3000);