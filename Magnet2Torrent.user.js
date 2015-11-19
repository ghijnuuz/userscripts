// ==UserScript==
// @name         Magnet2Torrent
// @namespace    http://anonymous.com/
// @version      0.2
// @description  Magnet2Torrent
// @author       anonymous
// @match        http://www.breadsearch.com/*
// @match        http://btdigg.org/*
// @match        https://thepiratebay.gd/*
// @match        https://torrentz.eu/*
// @match        http://extratorrent.cc/*
// @match        http://bitsnoop.com/*
// @grant        none
// @require      http://code.jquery.com/jquery-2.1.4.min.js
// ==/UserScript==

$("a").each(function () {
    var hrefStr = $(this).attr("href");
    if (hrefStr && hrefStr.length > 0 && hrefStr.match(/^magnet:\?/i)) {
        var infoHash = hrefStr.replace(/(.*urn:btih:)([0-9a-f]*)(&.*)/i, "$2").toUpperCase();
        var newNode = $(this).clone();
        $(this).after(newNode);
        var newHrefStr = "http://torcache.net/torrent/{infoHash}.torrent".replace(/\{infoHash\}/, infoHash);
        newNode.attr("href", newHrefStr);
        newNode.attr("target", "_blank");
        newNode.attr("title", "Magnet2Torrent");
    }
});
