;(function($){
	/**
	 * 用在tinymce（v4.9.8），其他版本暂未测试
	 */
	$(document).ready(function(){
		/**
		 * add button to tinymce
		 */
		tinymce.PluginManager.add('uploadimage', function (editor) {
			var showUploadImage=function(){
				editor.settings.show_upload_image(editor);
			};
			
			editor.addCommand("mceUploadImageEditor", showUploadImage);
			
		    editor.addButton('uploadimage', {
		        icon: 'image',
		        image:editor.settings.icon_upload_image,
		        tooltip: 'Upload Image',
		        onclick: showUploadImage
		    });

//		    editor.addMenuItem('uploadimage', {
//		        icon: 'image',
//		        image:editor.settings.icon_upload_image,
//		        text: 'Upload Image',
//		        context: 'tools',
//		        onclick: showUploadImage
//		    });
		});
		
	});
})(jQuery);




