//강좌컨텐츠
let subMenuList6=null;

let info_opt_form=null;
let caution_opt_form=null;
let detailInfo_opt_form=null;
let file_opt_form=null;
let notice_opt_form=null;
function CreateTab6Init()
{
	if(subMenuList6!=null) return;
	var menus = [
		  { id: 0, text: '강좌소개', },
		  { id: 1, text: '강좌신청안내및 주의사항', visible:false },
		  { id: 2, text: '강좌세부내용', },
		  { id: 3, text: '파일첨부', },
		  { id: 4, text: '강좌공지사항', },
	]
	subMenuList6 = $('#tab6 .tab_list').dxList({
		 dataSource: new DevExpress.data.DataSource({
		      store: new DevExpress.data.ArrayStore({
		        key: 'id',
		        data: menus,
		      }),
		    }),
		selectionMode:'single', 
	    allowItemDeleting: false,
	    onSelectionChanged(component) {
	    	var cur= subMenuList6.option('selectedItemKeys');
	    	DisplayTab6Form(cur);
	      },
	}).dxList('instance');
	subMenuList6.selectItem(0);
	//$("#saveBtn6").dxButton({text: '저장하기',type: 'success',	});
}
function DisplayTab6Form(cur)
{
	if(cur!=0){
		if(info_opt_form && info_opt_form.option("visible") == true){
			info_opt_form.option("visible",false);
		}
	}
	if(cur!=1){
		if(caution_opt_form && caution_opt_form.option("visible") == true){
			caution_opt_form.option("visible",false);
		}
	}
	if(cur!=2){
		if(detailInfo_opt_form && detailInfo_opt_form.option("visible") == true){
			detailInfo_opt_form.option("visible",false);
		}
	}
	if(cur!=3){
		if(file_opt_form && file_opt_form.option("visible") == true){
			file_opt_form.option("visible",false);
		}
		$("#saveBtn6").show();
	}else{
		$("#saveBtn6").hide();
	}
	if(cur!=4){
		if(notice_opt_form && notice_opt_form.option("visible") == true){
			notice_opt_form.option("visible",false);
		}
	}
	
	if(cur == 0){
		DisplayTab6InfoOptForm();
		info_opt_form.option("visible",true);
	}else if(cur == 1){
		DisplayTab6CautionOptForm();
		caution_opt_form.option("visible",true);
	}else if(cur == 2){		
		DisplayTab6DetailInfoOptForm();
		detailInfo_opt_form.option("visible",true);
	}else if(cur == 3){		
		DisplayTab6FileOptForm();
		file_opt_form.option("visible",true);
	}else{
		DisplayTab6NoticeForm();
		notice_opt_form.option("visible",true);
	}
	
}

function DisplayTab6InfoOptForm(){
	if(info_opt_form!= null){
		return;
	}
	info_opt_form = $('#tab6 #info_opt_form').dxForm({
		showColonAfterLabel: false,
		  items: [
			  {	  
				      itemType: 'button',colSpan:2,
				      horizontalAlignment: 'right',
				      buttonOptions: {
				        text: '저장하기',
				        type: 'success',
				        useSubmitBehavior: true,
				      },
				},
    		{label: {visible:false},
    			template : function(cellInfo,container) {
             	 container.append($('<div>').dxTextArea({
	              		value: cellInfo.value,
	            		inputAttr: { id: 'info_editor' },
	            	 }));
	            	 CKEDITOR.replace('info_editor');
	            	 CKEDITOR.on('instanceLoaded', function(e) {e.editor.resize('100%',300)} );
	            	 CKEDITOR.instances.info_editor.on("change", 
	            		function () {
	            		 //cellInfo.setValue(CKEDITOR.instances.noti_editor.getData());
	            	 	}
	            	 );
	              },
    		},
    		
	    	
		]
	}).dxForm("instance");
	//editorInit(270);
}
function DisplayTab6CautionOptForm(){
	if(caution_opt_form!= null){
		return;
	}
	caution_opt_form = $('#tab6 #caution_opt_form').dxForm({
		showColonAfterLabel: false,
		colCount:1,
	    items: [
	    	 {	  
			      itemType: 'button',
			      horizontalAlignment: 'right',
			      buttonOptions: {
			        text: '저장하기',
			        type: 'success',
			        useSubmitBehavior: true,
			      },
			},
    		{label: {visible:false},
	    		template : function(cellInfo,container) {
	              	 container.append($('<div>').dxTextArea({
	              		value: cellInfo.value,
	            		inputAttr: { id: 'caution_editor' },
	            	 }));
	            	 CKEDITOR.replace('caution_editor');
	            	 CKEDITOR.on('instanceLoaded', function(e) {e.editor.resize('100%',300)} );
	            	 CKEDITOR.instances.caution_editor.on("change", 
	            		function () {
	            		 //cellInfo.setValue(CKEDITOR.instances.noti_editor.getData());
	            	 	}
	            	 );
	              },
    		},
		   
	    	
		]
	}).dxForm("instance");
	//editorInit(270);
}

function DisplayTab6DetailInfoOptForm(){
	if(detailInfo_opt_form!= null){
		return;
	}
	detailInfo_opt_form = $('#tab6 #detailInfo_opt_form').dxForm({
		showColonAfterLabel: false,
		colCount:1,
	    items: [
			  {	  
			      itemType: 'button',colSpan:2,
			      horizontalAlignment: 'right',
			      buttonOptions: {
			        text: '저장하기',
			        type: 'success',
			        useSubmitBehavior: true,
			      },
			},
	    	{label: {visible:false},
    			template : function(cellInfo,container) {
                	 container.append($('<div>').dxTextArea({
   	              		value: cellInfo.value,
   	            		inputAttr: { id: 'detailInfo_editor' },
   	            	 }));
   	            	 CKEDITOR.replace('detailInfo_editor');
   	            	 CKEDITOR.on('instanceLoaded', function(e) {e.editor.resize('100%',300)} );
   	            	 CKEDITOR.instances.detailInfo_editor.on("change", 
   	            		function () {
   	            		 //cellInfo.setValue(CKEDITOR.instances.noti_editor.getData());
   	            	 	}
   	            	 );
   	              },
	    	},
	    	
		]
	}).dxForm("instance");
	//editorInit(270);
}
const AttachFiles={
		photoUrl:'https://www.incheon.go.kr/comm/getImage?srvcId=IRLctre&upperNo=29668&fileTy=IMG&fileNo=1&thumbTy=L',
		planDocs :[
			  {
			    name: 'Description.pptx',
			    isDirectory: false,
			    size: 1024,
			  },
			  {
			    name: 'Description.xls',
			    isDirectory: false,
			    size: 2048,
			  },
		]
};


function DisplayTab6FileOptForm(){
	if(file_opt_form!= null){
		return;
	}
	//elementAttr: {id: "editForm",},
	// <form id="form" method="post" action="" enctype="multipart/form-data">
	file_opt_form = $('#tab6 #file_opt_form').dxForm({
		showColonAfterLabel: false,
		formData:AttachFiles,
		colCount:2,
	    items: [
	    	{itemType:'group',caption:'강좌사진',colCount:3,
	    		items:[
	    			{
	    				dataField:"photoUrl",
	    				label:{visible:false},
	    				template: function(data, itemElement) {
	    				if(data.editorOptions.value){
		    					var d = document.createElement("div");
		    					d.className ="cst-small-button-container";
		    					//d.style.position="absolute";
		    					d.style.left="10px";
		    					d.innerHTML =`
									<div class="cst-small-button dx-widget dx-button dx-button-normal dx-button-mode-contained"><div class="dx-button-content"><i class="dx-icon dx-icon-close"></i></div></div>
								</div>
								<div style="float: left;margin-top: 1px;">
									<img src="`+data.editorOptions.value+`" style="width:150px; height: 150px;">
								</div>`;	
							
		    					itemElement.append(d);
	    					}
	    				},
	    			},
	    			{
	    				colSpan:2,label:{visible:false},
	    				template: function(data, itemElement) {
	    					itemElement.append($("<div>").attr("id", "dxfu1").dxFileUploader({
	    					uploadMode: 'useButtons',
	    					uploadUrl: 'https://js.devexpress.com/Demos/NetCore/FileUploader/Upload',
	    					allowedFileExtensions: img_ext,
	    					maxFileSize: 4000000,
	    				}));  
	    			},
	    			},
	    			
	    		]
			},
			{
				itemType:'group',caption:'강의계획서',colSpan:2,
		    	items:[	{
    				label:{visible:false},
    				template: function(data, itemElement) {
    					itemElement.append($("<div>").attr("id", "dxfu1").dxFileManager({
    					    name: 'fileManager',
    					    hint:'파일 최대 3개까지 업로드 가능',
    					    fileSystemProvider: AttachFiles.planDocs,
    					    height: 230,
    					    permissions: {
    					      delete: true,
    					      upload: AttachFiles.planDocs.length<3,
    					      download: true,
    					      refresh:false,
    					    },
    					    allowedFileExtensions: doc_ext,
    					    itemView: {
    					        details: {
    					          columns: [
    					            'thumbnail', 'name',
    					             'size',
    					          ],
    					        },
    					        showParentFolder: false,
    					      },toolbar: {
    					          items: [
    					              'upload',
    					              {
    					                name: 'separator',
    					                location: 'after',
    					              },
    					              'switchView',
    					            ],
    					            fileSelectionItems: [
    					               'delete', 'separator','download',
    					               'clearSelection',
    					            ],
    					      },
    					      onContextMenuItemClick: onItemClick,
    					      onFileUploaded: function(e) {
    					    	  if( AttachFiles.planDocs.length>=3){
    					    		  e.component.option('permissions.upload',false);
    					    	  } 
    					        },
    					      onItemDeleted: function(e) {
    					    	  if( AttachFiles.planDocs.length<3){
    					    		  e.component.option('permissions.upload',true);
    					    	  } 
    					        },
    					      contextMenu: {
    					    	  items: [
    					    		  'delete',
    					    		  'download'
    					    		  ],
    					      },
    					      upload: {
    					            chunkSize: 500000,
    					            maxFileSize: 1000000
    					        },
    					  }));
    				}
    			},]
				
			}
	    	    
		]

}).dxForm("instance");
}
//https://js.devexpress.com/Demos/WidgetsGallery/Demo/FileManager/UICustomization/jQuery/Light/
function onItemClick(args) {
    let updated = false;
    if (args.itemData.extension) {
    } else if (args.itemData.category !== undefined) {
    }
}

function getScheduleFilesOptions(files) {
	const options = [];
	for (let i = 0; i < files.length; i += 1) {
		options.push(generateNewFileOptions(i));
    }
    return options;
}

function DisplayTab6NoticeForm(){
	if(notice_opt_form!= null){
		return;
	}
	var noticeformData={
			EDC_NOTICE_OPENYN:'0', //공지사항 공개여부
			EDC_NOTICE_DATE_YN:'0',//공지사항 공개 기간
			EDC_NOTICE_SDATE:'',//시작일
			EDC_NOTICE_EDATE:'',//종료일
			EDC_NOTICE_CONTENT:'<p><b><span style="background-color:#2ecc71;">abc</span></b></p>',//내용
	}
	
	$('#tab6 #notice_opt_form').dxForm({
		formData:noticeformData,
		showColonAfterLabel: false,
		colCount:6,
		onInitialized: function(e) {
			notice_opt_form = e.component;
			 var customHandlerInit = function (e) {
				 var orgData = e.component.option("formData");
				e.component.getEditor("EDC_NOTICE_SDATE").option('disabled',  orgData.EDC_NOTICE_DATE_YN == '0' ? true:false);
				e.component.getEditor("EDC_NOTICE_EDATE").option('disabled',  orgData.EDC_NOTICE_DATE_YN == '0' ? true:false);
			 }
			e.component.on("contentReady", customHandlerInit);
		},
		onFieldDataChanged: function (e) {
			//e.component.beginUpdate();
			//e.component.endUpdate();
			if(e.dataField=='EDC_NOTICE_DATE_YN'){ 
				e.component.getEditor("EDC_NOTICE_SDATE").option('disabled',  e.value == '0' ? true:false);
				e.component.getEditor("EDC_NOTICE_EDATE").option('disabled',  e.value == '0' ? true:false);
			}
		},
	    items: [
	    	{colSpan:2,dataField: 'EDC_NOTICE_OPENYN',
				label: {text: '공지사항 공개 여부',},
				editorType:'dxSelectBox',
		    	editorOptions:{
		    		dataSource:online_gbn, valueExpr: 'value',displayExpr: 'text'
		    	}
			},
			{	  
				itemType: 'button',colSpan:4,
			    horizontalAlignment: 'right',
			    buttonOptions: {
			    text: '저장하기',
			        type: 'success',
			        useSubmitBehavior: true,
			    },
			},
		  	{colSpan:2,dataField: 'EDC_NOTICE_DATE_YN',
				label: {text: '공지사항 공개 기간',},
				editorType:'dxSelectBox',
		    	editorOptions:{
		    		dataSource:set_gbn, valueExpr: 'value',displayExpr: 'text'
		    	}
			},
			{dataField:'EDC_NOTICE_SDATE',label: {text:'시작일'},
    			editorType:'dxDateBox',editorOptions:{
    				displayFormat: 'yyyy-MM-dd'}
	    	},  
	    	{dataField:'EDC_NOTICE_EDATE',label: {text:'종료일'},
	    		editorType: "dxDateBox",
	    		editorOptions: {displayFormat: 'yyyy-MM-dd'} 
	    	}, 
	    	{colSpan:2,itemType:'empty'},
	    	{colSpan:6,label: {visible:false},
    			template : function(cellInfo,container) {
                	 container.append($('<div>').dxTextArea({
   	              		value: noticeformData.EDC_NOTICE_CONTENT,
   	            		inputAttr: { id: 'notice_editor' },
   	            	 }));
   	            	 CKEDITOR.replace('notice_editor');
   	            	 CKEDITOR.on('instanceLoaded', function(e) {e.editor.resize('100%',270)} );
   	            	 CKEDITOR.instances.notice_editor.on("change", 
   	            		function () {
   	            		notice_opt_form.updateData('EDC_NOTICE_CONTENT',CKEDITOR.instances.notice_editor.getData());
   	            	 	}
   	            	 );
   	              },
	    	},
	    	
		]
	});
	//editorInit(270);
}

/*
$('#file-uploader-images').dxFileUploader({
   
    uploadMode: 'useButtons',
    uploadUrl: 'https://js.devexpress.com/Demos/NetCore/FileUploader/Upload',
    allowedFileExtensions: ['.jpg', '.jpeg', '.gif', '.png'],
  });
  $('#file-uploader-max-size').dxFileUploader({
    multiple: true,
    uploadMode: 'useButtons',
    uploadUrl: 'https://js.devexpress.com/Demos/NetCore/FileUploader/Upload',
    maxFileSize: 4000000,
  });
  */
