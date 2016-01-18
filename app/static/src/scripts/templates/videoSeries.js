/*TMODJS:{"debug":true,"version":5,"md5":"8842732208bc6d76ec2f6a253e183f6f"}*/
define(function(require) {
    return require("./template")("videoSeries", function($data, $filename) {
        try {
            var $utils = this, $line = ($utils.$helpers, 0), $each = $utils.$each, $escape = ($data.item, 
            $data.index, $utils.$escape), $out = "";
            return $line = 1, $each($data, function(item) {
                $out += '<a data-type="series" class="video-item" href="javascript:void(0);" data-video-id="', 
                $line = 1, $out += $escape(item.video_id), $out += '" data-name="', $line = 1, $out += $escape(item.name), 
                $out += '" data-cover="', $line = 1, item.icon && ($line = 1, $out += $escape(item.icon.s75), 
                $line = 1), $out += '" data-score="', $line = 1, $out += $escape(item.douban.score), 
                $out += '" data-year="', $line = 1, $out += $escape(item.year), $out += '" data-runtime="', 
                $line = 1, $out += $escape(item.runtime), $out += '"> <div class="cover"> <img src="', 
                $line = 3, item.icon && ($line = 3, $out += $escape(item.icon.s75), $line = 3), 
                $out += '"> <div class="info">', $line = 4, $out += $escape(item.douban.score), 
                $out += '分</div> </div> <div class="title">', $line = 6, $out += $escape(item.name), 
                $out += "</div> </a>", $line = 7;
            }), new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '{{each $data as item index}}<a data-type="series" class="video-item" href="javascript:void(0);" data-video-id="{{item.video_id}}" data-name="{{item.name}}" data-cover="{{if item.icon}}{{item.icon.s75}}{{/if}}" data-score="{{item.douban.score}}" data-year="{{item.year}}" data-runtime="{{item.runtime}}">\n    <div class="cover">\n        <img src="{{if item.icon}}{{item.icon.s75}}{{/if}}">\n        <div class="info">{{item.douban.score}}分</div>\n    </div>    \n    <div class="title">{{item.name}}</div>\n</a>{{/each}}'.split(/\n/)[$line - 1].replace(/^\s+/, "")
            };
        }
    });
});