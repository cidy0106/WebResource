/*!
 * Jquery Methods v.1.0.1
 * https://github.com/cidy0106/WebResource/js/jquery.methods.js
 *
 * Copyright 2018 Cidy0106#gmail.com
 * Released under the MIT license
 */
;(function($){
	// List of HTML entities for escaping.
	var htmlEscapes = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;',
	  "'": '&#x27;',
	  '/': '&#x2F;'
	};

	// Regex containing the keys listed immediately above.
	var htmlEscaper = /[&<>"'\/]/g;

	
	$.extend({
		/* Escape a string for HTML interpolation.*/
		escapeHtml : function(string) {
			return ('' + string).replace(htmlEscaper, function(match) {
				return htmlEscapes[match];
			});
		},
		localeTime:function(time){
			if(!time){
				return '';
			}
			var createTime=new Date();
			  createTime.setTime(parseInt(time));
			  return createTime.toLocaleString();
		},
		/* format number ，make it “smaller” ， eg：1000  to 1K  */
		formatHumanNumber:function(num,defaultVal){
			if(typeof num==='string'){
				num=parseInt(num);
			}
			if((typeof num==='undefined' || isNaN(num)) && typeof defaultVal!=='undefined'){
				return defaultVal;
			}
			if(num>=2000){
				return Math.floor(num/1000) +'K';
			}
			return num;
		},
		 tipsBox: function (options) {
             options = $.extend({
                 obj: null,  //jq对象，要在那个html标签上显示
                 str: '<i class="fa fa-heart" aria-hidden="true"></i>',  //字符串，要显示的内容;也可以传一段html，如: "<b style='font-family:Microsoft YaHei;'>+1</b>"
                 startSize: "12px",  //动画开始的文字大小
                 endSize: "30px",    //动画结束的文字大小
                 interval: 600,  //动画时间间隔
                 color: "red",    //文字颜色
                 callback: function () {
                 }    //回调函数
             }, options);
             options.id='tipsBox-'+new Date().getTime();
             $("body").append("<span id='"+options.id+"'>" + options.str + "</span>");
             var box = $('#'+options.id);
             var left = options.obj.offset().left + options.obj.width() / 2;
             var top = options.obj.offset().top - options.obj.height();
             box.css({
                 "position": "absolute",
                 "left": left + "px",
                 "top": top + "px",
                 "z-index": 9999,
                 "font-size": options.startSize,
                 "line-height": options.endSize,
                 "color": options.color
             });
             box.animate({
                 "font-size": options.endSize,
                 "opacity": "0",
                 "top": top - parseInt(options.endSize) + "px"
             }, options.interval, function () {
                 box.remove();
                 options.callback();
             });
         },
          /***获取给定get查询参数值****/
         getQuery:function(search,name){
              var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
              var r = search.substr(1).match(reg);
              if(r!=null)return  decodeURIComponent(r[2]); return null;
         },
		 utf16to8 : function(str) {
			var out, i, len, c;
			out = "";
			len = str.length;
			for (i = 0; i < len; i++) {
				c = str.charCodeAt(i);
				if ((c >= 0x0001) && (c <= 0x007F)) {
					out += str.charAt(i);
				} else if (c > 0x07FF) {
					out += String
							.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
					out += String
							.fromCharCode(0x80 | ((c >> 6) & 0x3F));
					out += String
							.fromCharCode(0x80 | ((c >> 0) & 0x3F));
				} else {
					out += String
							.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
					out += String
							.fromCharCode(0x80 | ((c >> 0) & 0x3F));
				}
			}
			return out;
		},
		utf8to16 : function(s) {
			if (!s) {
				return;
			}
			var i, codes, bytes, ret = [], len = s.length;
			for (i = 0; i < len; i++) {
				codes = [];
				codes.push(s.charCodeAt(i));
				if (((codes[0] >> 7) & 0xff) == 0x0) {
					// 单字节 0xxxxxxx
					ret.push(s.charAt(i));
				} else if (((codes[0] >> 5) & 0xff) == 0x6) {
					// 双字节 110xxxxx 10xxxxxx
					codes.push(s.charCodeAt(++i));
					bytes = [];
					bytes.push(codes[0] & 0x1f);
					bytes.push(codes[1] & 0x3f);
					ret.push(String.fromCharCode((bytes[0] << 6)
							| bytes[1]));
				} else if (((codes[0] >> 4) & 0xff) == 0xe) {
					// 三字节 1110xxxx 10xxxxxx 10xxxxxx
					codes.push(s.charCodeAt(++i));
					codes.push(s.charCodeAt(++i));
					bytes = [];
					bytes.push((codes[0] << 4)
							| ((codes[1] >> 2) & 0xf));
					bytes.push(((codes[1] & 0x3) << 6)
							| (codes[2] & 0x3f));
					ret.push(String.fromCharCode((bytes[0] << 8)
							| bytes[1]));
				}
			}
			return ret.join('');
		},
                getCache:function(key){
				if(window.localStorage){
					return JSON.parse(window.localStorage.getItem(key));
				}else if(window.sessionStorage){
					return JSON.parse(window.sessionStorage.getItem(key));
				}else{
					return null;
				}
			},
			setCache:function(key,val){
				if(window.localStorage){
					window.localStorage.setItem(key,JSON.stringify(val));
				}else if(window.sessionStorage){
					window.sessionStorage.setItem(key,JSON.stringify(val));
				}
			}
	});

        $.fn.extend({
			serializeJson : function() {
				var serializeObj = {};
				var array = this.serializeArray();
				var str = this.serialize();
				$(array).each(function() {
					if (serializeObj[this.name]) {
						if ($.isArray(serializeObj[this.name])) {
							serializeObj[this.name].push(this.value);
						} else {
							serializeObj[this.name] = [serializeObj[this.name],	this.value ];
						}
					} else {
						serializeObj[this.name] = this.value;
					}
				});
				return serializeObj;
			}
		});

})(jQuery);
