// ==UserScript==
// @name         Magnet2Torrent
// @namespace    http://anonymous.com/
// @version      0.1
// @description  Magnet2Torrent
// @author       anonymous
// @match        http://btdigg.org/*
// @match        http://torrentz.eu/*
// @match        http://extratorrent.cc/*
// @match        http://bitsnoop.com/*
// @grant        none
// @require      http://code.jquery.com/jquery-1.11.2.min.js
// ==/UserScript==

$("a").each(function() {
	var hrefStr = $(this).attr("href");
	if (hrefStr && hrefStr.length > 0 && hrefStr.match(/^magnet:\?/i)) {
		var infoHash = hrefStr.replace(/(.*urn:btih:)([0-9a-f]*)(&.*)/i, "$2").toUpperCase();
		var newNode = $(this).clone();
		$(this).after(newNode);
		var newHrefStr = "http://torcache.net/torrent/{infoHash}.torrent".replace(/{infoHash}/, infoHash);
		newNode.attr("href", newHrefStr);
		newNode.attr("target", "_blank");
		newNode.attr("title", "Magnet2Torrent");
	}
})