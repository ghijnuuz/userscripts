// ==UserScript==
// @name		易迅网 3点秒杀活动 自动提交订单
// @version		v1.0.0
// @match		http://qiang.yixun.com/order/*
// @grant       none
// @author		ghijnuuz@gmail.com
// ==/UserScript==

function autoSubmitOrder() {
	var obj = $("#J_Submit");
	if (obj.length > 0 && obj.is(":visible")) {
		obj[0].click();
		console.log("click.");
	}
	setTimeout(autoSubmitOrder, 500);
};

setTimeout(autoSubmitOrder, 3000);
