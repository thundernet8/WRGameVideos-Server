/*TMODJS:{"debug":true,"version":53,"md5":"cd3e0edb7aa214a892239f74655e2cd1"}*/
define(function(require) {
    return require("./template")("listItem", function($data, $filename) {
        try {
            var $utils = this, $line = ($utils.$helpers, 0), $each = $utils.$each, list = $data, $escape = ($data.item,
            $data.index, $utils.$escape), $out = "";
            return $line = 1, $each(list, function(item, index) {
                $out += '<a class="video-item" href="javascript:void(0);" data-name="', $line = 1, 
                $out += $escape(item.video_title), $out += '" data-video-id="', $line = 1, $out += $escape(item.video_id),
                $out += '" data-cover="', $line = 1, item.video_cover && ($line = 1, $out += $escape(item.video_cover),
                $line = 1), $out += '" data-score="', $line = 1, item.video_score ? ($line = 1, $out += $escape(item.video_score/10.0),
                $line = 1) : $line = 1,
                $out += '" data-runtime="', $line = 1, $out += $escape(item.video_duration), $out += '"> <div class="cover"> <img src="',
                $line = 3, item.video_cover && ($line = 3, $out += $escape(item.video_cover), $line = 3),
                $out += '"> <div class="rank-bg rank-info"></div> <div class="rank-num rank-info">', 
                $line = 5, $out += $escape(index + 1), $out += '</div> <div class="info">', $line = 6, 
                item.video_score ? ($line = 6, $out += $escape((item.video_score/10.0).toFixed(1)), $out += " 分", $line = 6) : $line = 6,
                $out += '</div> </div> <div class="title">', $line = 8, $out += $escape(item.video_title),
                $out += "</div> </a>", $line = 9;
            }), new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '{{each list as item index}}<a class="video-item" href="javascript:void(0);" data-name="{{item.video_title}}" data-video-id="{{item.video_id}}" data-cover="{{if item.video_cover}}{{item.video_cover}}{{/if}}" data-score="{{if item.video_score}}{{item.video_score}}{{else}}{{/if}}" data-year="" data-runtime="{{item.video_duration}}">\n	<div class="cover">\n		<img src="{{if item.video_cover}}{{item.video_cover}}{{/if}}">\n		<div class="rank-bg rank-info"></div>\n		<div class="rank-num rank-info">{{index + 1}}</div>\n		<div class="info">{{if item.video_score}}{{item.video_score/10.0}} 分{{else}}{{/if}}</div>\n	</div>\n	<div class="title">{{item.video_title}}</div>\n</a>{{/each}}'.split(/\n/)[$line - 1].replace(/^\s+/, "")
            };
        }
    });
});