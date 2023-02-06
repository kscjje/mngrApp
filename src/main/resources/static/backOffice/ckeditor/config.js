/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For complete reference see:
	// https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_config.html
	//config.height = 500; 
	
	config.toolbar = [
		{ name: 'styles', items: [ 'FontSize' ] },
		{ name: 'colors', items: [ 'TextColor', 'BGColor' ] },
		{ name: 'document', items: [ 'Source'] },
		{ name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike'] },
		{ name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] },
		{ name: 'links', items: [ 'Link', 'Unlink'] },
		{ name: 'insert', items: [ 'Image', 'Table', 'HorizontalRule', 'SpecialChar'] },
	];

	// Remove some buttons provided by the standard plugins, which are
	// not needed in the Standard(s) toolbar.


	// Set the most common block elements.
	config.format_tags = 'p;h1;h2;h3;pre';

	// Simplify the dialog windows.
	//config.removeDialogTabs = 'image:advanced;link:advanced';

	// add sjpark
	//config.extraPlugins = 'youtube,font,colorbutton,panelbutton,justify,spacingsliders';
	config.extraPlugins = 'font,colorbutton,justify';
	config.image2_prefillDimensions = false;
	config.allowedContent = true;
	
	// add sjpark
	config.font_names = '굴림;돋움;바탕;궁서;굴림체;돋움체;바탕체;궁서체;나눔고딕;나눔명조;';
	//config.contentsCss = ['/css/admin.css','/js/ckeditor/contents.css'],['/js/ckeditor/contents.css'];
	
	//config.autoGrow_minHeight = 750;
	config.autoGrow_maxHeight = 800;
	config.autoGrow_bottomSpace = 50;
	config.autoGrow_onStartup = true;
	config.resize_enabled = false;
};
