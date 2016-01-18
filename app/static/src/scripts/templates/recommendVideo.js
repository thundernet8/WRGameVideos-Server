/*TMODJS:{"debug":true,"version":50,"md5":"2782ae0571aaaec1cb5ace2ed743a676"}*/
define(function(require) {
    return require("./template")("recommendVideo", function($data, $filename) {
        try {
            var $utils = this, $line = ($utils.$helpers, 0), $each = $utils.$each, $escape = ($data.item, 
            $data.index, $utils.$escape), $out = "";
            return $line = 1, $each($data, function(item) {
                $out += '<a data-type="recommend" class="video-item" href="javascript:void(0);" data-video-id="', 
                $line = 1, $out += $escape(item.video_id), $out += '" data-name="', $line = 1, $out += $escape(item.video_title),
                $out += '" data-cover="', $line = 1, item.video_cover && ($line = 1, $out += $escape(item.video_cover),
                $line = 1), $out += '" data-runtime="',
                $line = 1, $out += $escape(item.video_duration_str), $out += '"> <div class="cover"> <img src="',
                $line = 3, item.video_cover && ($line = 3, $out += $escape(item.video_cover), $line = 3),
                $out += '"> <div class="info">', $line = 4, $out += $escape(item.video_score/10.0),
                $out += '分</div> </div> <div class="title">', $line = 6, $out += $escape(item.video_title),
                $out += "</div> </a>", $line = 7;
            }), new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '{{each $data as item index}}<a data-type="recommend" class="video-item" href="javascript:void(0);" data-video-id="{{item.video_id}}" data-name="{{item.name}}" data-cover="{{if item.icon}}{{item.icon.s75}}{{/if}}" data-score="{{item.douban.score}}" data-year="{{item.year}}" data-runtime="{{item.runtime}}">\n    <div class="cover">\n        <img src="{{if item.icon}}{{item.icon.s75}}{{/if}}">\n        <div class="info">{{item.douban.score}}分</div>\n    </div>    \n    <div class="title">{{item.name}}</div>\n</a>{{/each}}'.split(/\n/)[$line - 1].replace(/^\s+/, "")
            };
        }
    });
});