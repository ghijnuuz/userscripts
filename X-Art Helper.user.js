// ==UserScript==
// @name         X-Art Helper
// @namespace    http://www.x-art.com/
// @version      0.4
// @description  X-Art Helper
// @author       anonymous
// @match        http://www.x-art.com/videos/*/
// @grant        none
// @require      http://code.jquery.com/jquery-2.1.4.min.js
// ==/UserScript==

/**
 * XArt 助手
 * @type {{DoHelp}}
 */
var XArtHelper = (function () {
    /**
     * 种子搜索引擎
     * @type {{Engines: *[], GetSearchLinkArray: TorrentSearchEnginer.GetSearchLinkArray}}
     */
    var TorrentSearchEnginer = {
        Engines: [{
            name: "BreadSearch",
            url: "http://www.breadsearch.com/search/{SearchString}"
        }, {
            name: "BTDigg",
            url: "http://btdigg.org/search?q={SearchString}"
        }, {
            name: "The Pirate Bay",
            url: "https://thepiratebay.gd/search/{SearchString}"
        }, {
            name: "Torrentz",
            url: "https://torrentz.eu/any?f={SearchString}"
        }, {
            name: "ExtraTorrent",
            url: "http://extratorrent.cc/search/?search={SearchString}"
        }, {
            name: "BitSnoop",
            url: "http://bitsnoop.com/search/all/{SearchString}"
        }],
        /**
         * 获取搜索链接的数组
         * @param searchStr
         * @returns {Array}
         * @constructor
         */
        GetSearchLinkArray: function (searchStr) {
            var result = [];
            for (var i = 0; i < this.Engines.length; i++) {
                var item = this.Engines[i];
                var str = '<a target="_blank" style="color:#fff;" href="' + item.url.replace(/\{SearchString\}/, searchStr) + '">' + item.name + '</a>';
                result.push(str);
            }
            return result;
        }
    };
    var Videos = {
        /**
         * 获取视频信息
         * @returns {{}}
         * @constructor
         */
        GetVideoInfo: function () {
            var result = {};
            result.name = $(".wrapper .info h1").text();
            result.date = new Date($(".wrapper .row .info h2").eq(2).text());
            result.models = [];
            $(".wrapper .row .info h2 a").each(function () {
                result.models.push($(this).text());
            });
            /**
             * 获取文件名
             * @returns {string}
             * @constructor
             */
            result.GetFileName = function () {
                var dateNumber = this.date.getFullYear() * 10000 + (this.date.getMonth() + 1) * 100 + this.date.getDate();
                var modelsStr = this.models.join(" & ");
                return "X-Art " + dateNumber + " " + modelsStr + " - " + this.name;
            };
            /**
             * 获取搜索内容
             * @returns {string}
             * @constructor
             */
            result.GetSearchString = function () {
                var modelsStr = this.models.join(" ");
                return "X-Art " + modelsStr + " " + this.name;
            };
            return result;
        },
        /**
         * 进行帮助
         * @constructor
         */
        DoHelp: function () {
            var videoInfo = Videos.GetVideoInfo();
            var inputHtml = '<input type="text" style="width: 100%;" value="' + videoInfo.GetFileName() + '" />';
            var searchLinkArray = TorrentSearchEnginer.GetSearchLinkArray(videoInfo.GetSearchString());
            var searchHtml = '<p>Download: ' + searchLinkArray.join(" | ") + '</p>';
            var addHtml = '<div class="row collapse">' + inputHtml + '<br/>' + searchHtml + '</div>';
            $(".wrapper .row .info .group-btns").before(addHtml);
        }
    };
    return {
        DoHelp: Videos.DoHelp
    };
})();

XArtHelper.DoHelp();
