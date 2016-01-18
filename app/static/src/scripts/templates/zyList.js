/*TMODJS:{"debug":true,"version":50,"md5":"8f761a42d79aa96a320030b7bd403058"}*/
define(function(require) {
    return require("./template")("zyList", function($data, $filename) {
        try {
            var $utils = this, $line = ($utils.$helpers, 0), $each = $utils.$each, list = $data.list, current = ($data.media, 
            $data.index, $data.current), $escape = $utils.$escape, $out = "";
            return $out += '<div class="zongyi_list"> ', $line = 2, $each(list, function(media) {
                $out += ' <div class="list_item zongyi_list_item', $line = 3, current == media.tv.episode && ($out += " highlight", 
                $line = 3), $out += '" data-episode="', $line = 3, $out += $escape(media.tv.episode), 
                $out += '"> <a data-vname="', $line = 4, $out += $escape(media.tv.name), $out += '" data-sname="', 
                $line = 4, $out += $escape(media.site_name), $out += '" data-hash="', $line = 4, 
                $out += $escape(media.hash), $out += '" data-eindex="', $line = 4, $out += $escape(media.tv.episode), 
                $out += '" class="touch-link episode" href="', $line = 4, $out += $escape(media.url), 
                $out += '"> <div class="icon"> <img src="', $line = 6, $out += $escape(media.tv.screenshot), 
                $out += '" /> </div> <div class="info"> <div class="name">', $line = 9, $out += $escape(media.tv.name), 
                $out += '</div> <div class="summary">', $line = 10, $out += $escape(media.tv.episode), 
                $out += "</div> </div> </a> </div> ", $line = 14;
            }), $out += " </div>", new String($out);
        } catch (e) {
            throw {
                filename: $filename,
                name: "Render Error",
                message: e.message,
                line: $line,
                source: '<div class="zongyi_list">\n{{each list as media index}}\n<div class="list_item zongyi_list_item{{if current==media.tv.episode}} highlight{{/if}}" data-episode="{{media.tv.episode}}">\n	<a data-vname="{{media.tv.name}}" data-sname="{{media.site_name}}" data-hash="{{media.hash}}" data-eindex="{{media.tv.episode}}" class="touch-link episode" href="{{media.url}}">\n    <div class="icon">\n    	<img src="{{media.tv.screenshot}}" />\n    </div>\n    <div class="info">\n        <div class="name">{{media.tv.name}}</div>\n        <div class="summary">{{media.tv.episode}}</div>\n    </div>\n    </a>\n</div>\n{{/each}}\n</div>'.split(/\n/)[$line - 1].replace(/^\s+/, "")
            };
        }
    });
});