/*TMODJS:{"debug":true,"version":75,"md5":"9d94bf90edd0c30858dc203feb85ebbd"}*/
define(function(require) {
    return require("./template")("detail", function($data, $filename) {
        try {
            var $utils = this, $line = ($utils.$helpers, 0), $escape = $utils.$escape, cover = $data.cover, name = $data.name, rClass = $data.rClass, score = $data.score, runtime = $data.runtime, year = $data.year, canPlay = $data.canPlay, preShow = $data.preShow, sites = $data.sites, $each = $utils.$each, viewedInfo = ($data.site, 
            $data.index, $data.viewedInfo), multiple = $data.multiple, celebrity = $data.celebrity, category = ($data.item, 
            $data.category), tags = $data.tags, area = $data.area, pubdate = $data.pubdate, summary = $data.summary, $out = "";
            return $out += '<div class="detail-item"> <div class="thumb"> <img class="placeholder" src="', 
            $line = 3, $out += $escape(cover), $out += '"> <a class="report-link" href="javascript:;">报告小编</a> </div> <div class="content"> <h1 style="display:none">', 
            $line = 7, $out += $escape(name), $out += '</h1> <p class="score-star ', $line = 8, 
            $out += $escape(rClass), $out += '">', $line = 8, $out += $escape(score), $out += "</p> <!-- <p>时长: ", 
            $line = 9, $out += $escape(runtime), $out += "</p> <p>时间: ", $line = 10, $out += $escape(year), 
            $out += "年</p> --> ", $line = 11, 0 == canPlay ? ($out += ' <div class="no-play">暂时没有可用的视频源</div> ', 
            $line = 13) : preShow ? ($out += "  ", $line = 19) : ($out += " ", $line = 20, sites && sites.length && ($out += ' <div class="siteListWrapper"> <div class="siteList"> ', 
            $line = 23, $each(sites, function(site) {
                $out += ' <a href="javascript:void(0);" class="', $line = 24, "56" == site ? ($out += "m56", 
                $line = 24) : ($line = 24, $out += $escape(site), $line = 24), $out += '" data-name="', 
                $line = 24, $out += $escape(site), $out += '"></a> ', $line = 25;
            }), $out += " </div> </div> ", $line = 28), $out += ' <div class="viewedInfo"> ', 
            $line = 30, viewedInfo && ($out += " ", $line = 31, viewedInfo.index ? ($out += " 上次看到第", 
            $line = 32, $out += $escape(viewedInfo.index), $out += "集", $line = 32, viewedInfo.d && ($out += " ", 
            $line = 32, $out += $escape(viewedInfo.vd), $out += " / ", $line = 32, $out += $escape(viewedInfo.d), 
            $line = 32), $out += " ", $line = 33) : viewedInfo.d && ($out += " 上次看到 ", $line = 34, 
            $out += $escape(viewedInfo.vd), $out += " / ", $line = 34, $out += $escape(viewedInfo.d), 
            $out += " ", $line = 35), $out += " ", $line = 36), $out += ' </div> <div class="actions"> <a class="play" href="javascript:void(0);">播放</a> <span class="gap"></span> <a class="download" href="javascript:void(0);">缓存</a> </div> <!-- ', 
            $line = 43, viewedInfo && ($out += " ", $line = 44, viewedInfo.index ? ($out += ' <div class="viewedInfo">上次看到第', 
            $line = 45, $out += $escape(viewedInfo.index), $out += "集", $line = 45, viewedInfo.d && ($out += " ", 
            $line = 45, $out += $escape(viewedInfo.vd), $out += " / ", $line = 45, $out += $escape(viewedInfo.d), 
            $line = 45), $out += "</div> ", $line = 46) : viewedInfo.d && ($out += ' <div class="viewedInfo">上次看到 ', 
            $line = 47, $out += $escape(viewedInfo.vd), $out += " / ", $line = 47, $out += $escape(viewedInfo.d), 
            $out += "</div> ", $line = 48), $out += " ", $line = 49), $out += " --> ", $line = 50), 
            $out += ' <a class="follow" href="javascript:void(0);"></a> <p class="download-guide">如在线播放卡顿，可缓存后观看↑</p> </div> <div class="background" style="background-image:url(', 
            $line = 54, $out += $escape(cover), $out += ')"></div> </div> <div class="detail-cards"> ', 
            $line = 58, multiple ? ($out += ' <div class="buttons"> ', $line = 60, 1 == canPlay && ($out += ' <div class="button" data-target="select">剧集</div> <div class="separator"></div> ', 
            $line = 63), $out += ' <div class="button" data-target="summary">详情</div> <div class="separator"></div> <div class="button" data-target="related">推荐</div>  </div> ', 
            $line = 69) : ($out += ' <div class="buttons"> <div class="button" data-target="summary">详情</div> <div class="separator"></div> <div class="button" data-target="related">推荐</div>  </div> ', 
            $line = 76), $out += ' <div class="cards"> ', $line = 78, preShow ? ($out += ' <div class="card"></div> ', 
            $line = 80) : ($out += ' <div class="card" id="card-summary" style="display:none;"> ', 
            $line = 82, celebrity && ($out += ' <div class="video-celebrity"> ', $line = 84, 
            celebrity.directors && ($out += ' <p class="video-celebrity-info clearfix"><span class="video-celebrity-title">导演:&nbsp;&nbsp;</span><span class="video-celebrity-words">', 
            $line = 85, $each(celebrity.directors, function(item, index) {
                $line = 85, index > 0 && ($out += "&nbsp;/&nbsp;", $line = 85), $out += '<a href="javascript:;" class="filter-btns" data-target="celebrity:', 
                $line = 85, $out += $escape(item.name.cn), $out += '">', $line = 85, $out += $escape(item.name.cn), 
                $out += "</a>", $line = 85;
            }), $out += "</span></p> ", $line = 86), $out += " ", $line = 87, celebrity.screenwriters && ($out += ' <p class="video-celebrity-info clearfix"><span class="video-celebrity-title">编剧:&nbsp;&nbsp;</span><span class="video-celebrity-words">', 
            $line = 88, $each(celebrity.screenwriters, function(item, index) {
                $line = 88, index > 0 && ($out += "&nbsp;/&nbsp;", $line = 88), $out += '<a href="javascript:;" class="filter-btns" data-target="celebrity:', 
                $line = 88, $out += $escape(item.name.cn), $out += '">', $line = 88, $out += $escape(item.name.cn), 
                $out += "</a>", $line = 88;
            }), $out += "</span></p> ", $line = 89), $out += " ", $line = 90, celebrity.actors && ($out += ' <p class="video-celebrity-info clearfix"><span class="video-celebrity-title">主演:&nbsp;&nbsp;</span><span class="video-celebrity-words">', 
            $line = 91, $each(celebrity.actors, function(item, index) {
                $line = 91, index > 0 && ($out += "&nbsp;/&nbsp;", $line = 91), $out += '<a href="javascript:;" class="filter-btns" data-target="celebrity:', 
                $line = 91, $out += $escape(item.name.cn), $out += '">', $line = 91, $out += $escape(item.name.cn), 
                $out += "</a>", $line = 91;
            }), $out += "</span></p> ", $line = 92), $out += " <!-- ", $line = 93, category && ($out += ' <p class="video-celebrity-info"><span class="video-celebrity-title">类型:&nbsp;&nbsp;</span>', 
            $line = 94, $each(category, function(item, index) {
                $line = 94, index > 0 && ($out += "&nbsp;/&nbsp;", $line = 94), $line = 94, $out += $escape(item.name), 
                $line = 94;
            }), $out += "</p> ", $line = 95), $out += " --> ", $line = 96, tags && ($out += ' <p class="video-celebrity-info clearfix"><span class="video-celebrity-title">标签:&nbsp;&nbsp;</span><span class="video-celebrity-words">', 
            $line = 97, $each(tags, function(item, index) {
                $line = 97, index > 0 && ($out += "&nbsp;/&nbsp;", $line = 97), $out += '<a href="javascript:;" class="filter-btns" data-target="tag:', 
                $line = 97, $out += $escape(item.name), $out += '">', $line = 97, $out += $escape(item.name), 
                $out += "</a>", $line = 97;
            }), $out += "</span></p> ", $line = 98), $out += " ", $line = 99, area && ($out += ' <p class="video-celebrity-info clearfix"><span class="video-celebrity-title">制片国家/地区:&nbsp;&nbsp;</span><span class="video-celebrity-words">', 
            $line = 100, $each(area, function(item, index) {
                $line = 100, index > 0 && ($out += "&nbsp;/&nbsp;", $line = 100), $line = 100, $out += $escape(item.name), 
                $line = 100;
            }), $out += "</span></p> ", $line = 101), $out += " ", $line = 102, pubdate && ($out += ' <p class="video-celebrity-info long-info clearfix"><span class="video-celebrity-title">上映日期:&nbsp;&nbsp;</span><span class="video-celebrity-words">', 
            $line = 103, $out += $escape(pubdate), $out += "</span></p> ", $line = 104), $out += " ", 
            $line = 105, runtime && ($out += ' <p class="video-celebrity-info clearfix"><span class="video-celebrity-title">片长:&nbsp;&nbsp;</span><span class="video-celebrity-words">', 
            $line = 106, $out += $escape(runtime), $out += "</span></p> ", $line = 107), $out += " </div> ", 
            $line = 109), $out += ' <div class="video-summary">', $line = 110, $out += $escape(summary), 
            $out += '</div> </div> <div class="card" id="card-select" style="display:none;"></div> <div class="card" id="card-comments" style="display:none;">评论</div> <div class="card recommend-video" id="card-related" style="display:none;"></div> ', 
            $line = 116), $out += " </div> </div>", new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '<div class="detail-item">\n    <div class="thumb">\n        <img class="placeholder" src="{{cover}}">\n        <a class="report-link" href="javascript:;">报告小编</a>\n    </div>\n    <div class="content">\n        <h1 style="display:none">{{name}}</h1>\n        <p class="score-star {{rClass}}">{{score}}</p>\n        <!-- <p>时长: {{runtime}}</p>\n        <p>时间: {{year}}年</p> -->\n        {{if canPlay == 0}}\n            <div class="no-play">暂时没有可用的视频源</div>\n        {{else if preShow}}\n            <!-- <div class="actions disabled">\n                <a class="play">播放</a>\n                <span class="gap"></span>\n                <a class="download">缓存</a>\n            </div> -->\n        {{else}}\n            {{if sites && sites.length}}\n                <div class="siteListWrapper">\n                    <div class="siteList">\n                    {{each sites as site index}}\n                    <a href="javascript:void(0);" class="{{if site==\'56\'}}m56{{else}}{{site}}{{/if}}" data-name="{{site}}"></a>\n                    {{/each}}\n                    </div>\n                </div>\n            {{/if}}\n            <div class="viewedInfo">\n                {{if viewedInfo}}\n                    {{if viewedInfo.index}}\n                        上次看到第{{viewedInfo.index}}集{{if viewedInfo.d}} {{viewedInfo.vd}} / {{viewedInfo.d}}{{/if}}\n                    {{else if viewedInfo.d}}\n                        上次看到 {{viewedInfo.vd}} / {{viewedInfo.d}}\n                    {{/if}}\n                {{/if}}\n            </div>\n            <div class="actions">\n                <a class="play" href="javascript:void(0);">播放</a>\n                <span class="gap"></span>\n                <a class="download" href="javascript:void(0);">缓存</a>\n            </div>\n            <!-- {{if viewedInfo}}\n                {{if viewedInfo.index}}\n                    <div class="viewedInfo">上次看到第{{viewedInfo.index}}集{{if viewedInfo.d}} {{viewedInfo.vd}} / {{viewedInfo.d}}{{/if}}</div>\n                {{else if viewedInfo.d}}\n                    <div class="viewedInfo">上次看到 {{viewedInfo.vd}} / {{viewedInfo.d}}</div>\n                {{/if}}\n            {{/if}} -->\n        {{/if}}\n        <a class="follow" href="javascript:void(0);"></a>\n        <p class="download-guide">如在线播放卡顿，可缓存后观看↑</p>\n    </div>\n    <div class="background" style="background-image:url({{cover}})"></div>\n</div>\n\n<div class="detail-cards">\n    {{if multiple}}\n    <div class="buttons">\n        {{if canPlay == 1}}\n        <div class="button" data-target="select">剧集</div>\n        <div class="separator"></div>\n        {{/if}}\n        <div class="button" data-target="summary">详情</div>\n        <div class="separator"></div>\n        <div class="button" data-target="related">推荐</div>\n        <!-- <div class="arrow"></div> -->\n    </div>\n    {{else}}\n    <div class="buttons">\n        <div class="button" data-target="summary">详情</div>\n        <div class="separator"></div>\n        <div class="button" data-target="related">推荐</div>\n        <!-- <div class="arrow"></div> -->\n    </div>\n    {{/if}}\n    <div class="cards">\n        {{if preShow}}\n            <div class="card"></div>\n        {{else}}\n            <div class="card" id="card-summary" style="display:none;">\n            {{if celebrity}}\n                <div class="video-celebrity">\n                    {{if celebrity.directors}}\n                        <p class="video-celebrity-info clearfix"><span class="video-celebrity-title">导演:&nbsp;&nbsp;</span><span class="video-celebrity-words">{{each celebrity.directors as item index}}{{if index > 0}}&nbsp;/&nbsp;{{/if}}<a href="javascript:;" class="filter-btns" data-target="celebrity:{{item.name.cn}}">{{item.name.cn}}</a>{{/each}}</span></p>\n                    {{/if}}\n                    {{if celebrity.screenwriters}}\n                        <p class="video-celebrity-info clearfix"><span class="video-celebrity-title">编剧:&nbsp;&nbsp;</span><span class="video-celebrity-words">{{each celebrity.screenwriters as item index}}{{if index > 0}}&nbsp;/&nbsp;{{/if}}<a href="javascript:;" class="filter-btns" data-target="celebrity:{{item.name.cn}}">{{item.name.cn}}</a>{{/each}}</span></p>\n                    {{/if}}\n                    {{if celebrity.actors}}\n                        <p class="video-celebrity-info clearfix"><span class="video-celebrity-title">主演:&nbsp;&nbsp;</span><span class="video-celebrity-words">{{each celebrity.actors as item index}}{{if index > 0}}&nbsp;/&nbsp;{{/if}}<a href="javascript:;" class="filter-btns" data-target="celebrity:{{item.name.cn}}">{{item.name.cn}}</a>{{/each}}</span></p>\n                    {{/if}}\n                    <!-- {{if category}}\n                        <p class="video-celebrity-info"><span class="video-celebrity-title">类型:&nbsp;&nbsp;</span>{{each category as item index}}{{if index > 0}}&nbsp;/&nbsp;{{/if}}{{item.name}}{{/each}}</p>\n                    {{/if}} -->\n                    {{if tags}}\n                        <p class="video-celebrity-info clearfix"><span class="video-celebrity-title">标签:&nbsp;&nbsp;</span><span class="video-celebrity-words">{{each tags as item index}}{{if index > 0}}&nbsp;/&nbsp;{{/if}}<a href="javascript:;" class="filter-btns" data-target="tag:{{item.name}}">{{item.name}}</a>{{/each}}</span></p>\n                    {{/if}}\n                    {{if area}}\n                        <p class="video-celebrity-info clearfix"><span class="video-celebrity-title">制片国家/地区:&nbsp;&nbsp;</span><span class="video-celebrity-words">{{each area as item index}}{{if index > 0}}&nbsp;/&nbsp;{{/if}}{{item.name}}{{/each}}</span></p>\n                    {{/if}}\n                    {{if pubdate}}\n                        <p class="video-celebrity-info long-info clearfix"><span class="video-celebrity-title">上映日期:&nbsp;&nbsp;</span><span class="video-celebrity-words">{{pubdate}}</span></p>\n                    {{/if}}\n                    {{if runtime}}\n                        <p class="video-celebrity-info clearfix"><span class="video-celebrity-title">片长:&nbsp;&nbsp;</span><span class="video-celebrity-words">{{runtime}}</span></p>\n                    {{/if}}\n                </div>\n            {{/if}}\n                <div class="video-summary">{{summary}}</div>\n                \n            </div>\n            <div class="card" id="card-select" style="display:none;"></div>\n            <div class="card" id="card-comments" style="display:none;">评论</div>\n            <div class="card recommend-video" id="card-related" style="display:none;"></div>\n        {{/if}}\n    </div>\n</div>'.split(/\n/)[$line - 1].replace(/^\s+/, "")
            };
        }
    });
});