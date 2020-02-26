;(function(window){
/**
检测浏览器的webp特性
*/
	if(window.webpFeature){
		return ;
	}
	window.webpFeature={};
	
	var kTestImages = {
			 lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
			 lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
			 alpha: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
			 animation: "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
	};
	
	for(feature in kTestImages){
		var img = new Image();
		img.feature=feature;
		img.onload = function () {
		 var result = (this.width > 0) && (this.height > 0);
		 window.webpFeature[this.feature]=result;
		};
		img.src = "data:image/webp;base64," + kTestImages[feature];
	}
})(window);
