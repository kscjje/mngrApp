//컨텐츠 정보 등록
let tab3_form = null;
function initContentsList() {
	tab3_form = $("#tab3 .tab_contents2").dxForm({
		showColonAfterLabel: false,
		formData: contentData(),
		colcount: 2,
		items: [
			{itemType: "button", colSpan: 6, horizontalAlignment: "right", cssClass: "form-button",
				buttonOptions: {
					text: "저장하기",
					type: "success",
					useSubmitBehavior: true
				}
			},
			{itemType: "group", colCount: 6, caption: "컨텐츠 정보", items: [
				{dataField: "RENT_PLACE_ADDR", label: {text: "주소",}, colSpan: 4, editorType: "dxTextBox", 
					editorOptions: {
					    buttons: [{
					        name: "addr_type", location: "after",
					        options: {
					        	text: "주소검색", type: "default", disabled: false,
					        	onClick() {
									DevExpress.ui.notify("주소검색");
					        	},
					        },
					    }],
					}
				},
				{ colSpan: 2, itemType: "empty" },
				
				{dataField: "RENT_PLACE_LA", label: {text: "위도"}, editorType: "dxTextBox"},
				{dataField: "RENT_PLACE_LO", label: {text: "경도"}, editorType: "dxTextBox"},
				{ colSpan: 4, itemType: "empty" },
				
				{colSpan: 6, itemType: "group", label: {text: "대관장소 이미지첨부"}, items: [
					{dataField: "RENT_PLACE_FILEID", label: {visible: false}, template: function(data, itemElement) {
	    					itemElement.append(
	    						$("<div>").attr("id", "dxfu1").dxFileUploader({
	    							multiple: true,
	    							uploadMode: "useButtons",
	    							uploadUrl: "https://js.devexpress.com/Demos/NetCore/FileUploader/Upload",
	    							allowedFileExtensions: img_ext,
	    							maxFileSize: 4000000,
		    						onValueChanged: function(e) {
		    							$("#dxfu1 .dx-fileuploader-input-wrapper").next("div").css("float", "left");
		    	    					$("#dxfu1 .dx-fileuploader-input-wrapper").next("div").next("div").css("padding", "5px 3px 0");
		    	    					$("#dxfu1 .dx-fileuploader-input-wrapper").next("div").next("div").children().css("float", "left").css("width", "200px");
		    						}
	    						})
	    					);
						}
	    			}
				]},
				{colSpan: 3, dataField: "RENT_PLACE_GUIDE", label: {text: "대관장장소소개"}, cssClass: "labelflex",
					template : function(cellInfo, container) {
						//console.log(cellInfo);
						container.append($("<div>").dxTextArea({
							value: cellInfo.component.option("formData").RENT_PLACE_GUIDE,
							inputAttr: { id: "inroduction_editor" },
						}));
						CKEDITOR.replace("inroduction_editor");
						CKEDITOR.on("instanceLoaded", function(e) {e.editor.resize("100%",330)} );
						CKEDITOR.instances.inroduction_editor.on("change", 
							function () {
	   	            		//cellInfo.setValue(CKEDITOR.instances.noti_editor.getData());
							}
						);
					},
				},
				{colSpan: 3, itemType: "empty"}
				/*
				{colSpan: 3, dataField: "RENT_PLACE_STPLAT", label: {text: "이용약관"}, cssClass: "labelflex",
					template : function(cellInfo, container) {
						container.append($("<div>").dxTextArea({
							value: cellInfo.component.option("formData").RENT_PLACE_STPLAT,
							inputAttr: { id: "useterms_editor" },
						}));
						CKEDITOR.replace("useterms_editor");
						CKEDITOR.on("instanceLoaded", function(e) {e.editor.resize("100%",330)} );
						CKEDITOR.instances.useterms_editor.on("change", 
							function () {
	   	            		//cellInfo.setValue(CKEDITOR.instances.noti_editor.getData());
							}
						);
					},
				}
				*/
			]}
		]
	}).dxForm("instance");
}

function contentData() {
	var resultData = {};
	
	resultData = {RENT_PLACE_ID: 1, RENT_PLACE_ADDR: "공설운동장A", RENT_PLACE_LA: "456.456", RENT_PLACE_LO: "123.123", RENT_PLACE_FILEID: "", RENT_PLACE_GUIDE: "장소소개 테스트", RENT_PLACE_STPLAT: "이용약관 테스트"}
	
	return resultData;
}