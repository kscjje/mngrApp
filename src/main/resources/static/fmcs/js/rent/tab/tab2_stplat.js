//컨텐츠 정보 등록
let tab2_form = new Array(10);

//하위탭설정
function initContents() {
	//if(subMenuList != null) return;
	
	var tabClass = "";
	var states = "";
	var tabSelectedItem ='';
	
	tabClass = "#tab2 .tab_list";

	subMenuList = $(tabClass).dxList({
		dataSource: new DevExpress.data.DataSource({
			store: new DevExpress.data.ArrayStore({
				key: "stplatKindCd",
				data: tabList("STPLAT_KIND")
			})
		}),
		selectionMode: "single", 
		allowItemDeleting: false,
		onSelectionChanged(component,element) {
	    	var cur = subMenuList.option("selectedItemKeys");
	    	
	    	editContentForm(cur);
	    	contentDisplayFormMenuChange(cur);
		}
	}).dxList("instance");
	
	subMenuList.selectItem(0);
}

function tabList(obj) {
	var tabData = "";
	
	if (obj == "STPLAT_KIND") {
		tabData = [
			{stplatKindCd: "1001", text: "개인정보수집동의"},
			{stplatKindCd: "1002", text: "개인정보3자동의"},
			{stplatKindCd: "2001", text: "이용조례약관"},
			{stplatKindCd: "3001", text: "환불동의약관"}
		]
	}
	
	return tabData;
}

function editContentForm(subTabId) {
	if (subTabId == "1001") {
		tab2_form[0] = $("#tab2 .contents1").dxForm({
			showColonAfterLabel: false,
			formData: contentData(subTabId),
			colcount: 2,
			items: [
				{itemType: "button", colSpan: 2, horizontalAlignment: "right", cssClass: "form-button",
					buttonOptions: {
						text: "저장하기",
						type: "success",
						useSubmitBehavior: true
					}
				},
				{dataField: "rentStplatId", visible: false},
				{dataField: "rentStplatKind", visible: false},
				{dataField: "useYn", label: {text: "약관동의여부"}, editorType: "dxSelectBox", 
					editorOptions: {dataSource: use_gbn, 
						layout: "horizontal", valueExpr: "value", displayExpr: "text",
						onInitialized: function (e) {
							if (e.component.option("value") == null) {
								e.component.option("value", e.component.option("dataSource")[0].value);
							}
						}
					}
				},
				{ itemType: "empty" },
				{colSpan: 2, dataField: "rentStplatInfo", label: {visible: false}, cssClass: "labelflex",
					template : function(cellInfo, container) {
						container.append($("<div>").dxTextArea({
							value: cellInfo.component.option("formData").rentStplatInfo,
							inputAttr: { id: "collect_editor" },
						}));
						CKEDITOR.replace("collect_editor");
						CKEDITOR.on("instanceLoaded", function(e) {e.editor.resize("100%",330)} );
						CKEDITOR.instances.collect_editor.on("change", 
							function () {
	   	            		//cellInfo.setValue(CKEDITOR.instances.noti_editor.getData());
							}
						);
					}
				}
			]
		}).dxForm("instance");
	}
	else if (subTabId == "1002"){
		tab2_form[1] = $("#tab2 .contents2").dxForm({
			showColonAfterLabel: false,
			formData: contentData(subTabId),
			colCount: 2,
			items: [
				{itemType: "button", colSpan: 2, horizontalAlignment: "right", cssClass: "form-button",
					buttonOptions: {
						text: "저장하기",
						type: "success",
						useSubmitBehavior: true
					}
				},
				{dataField: "rentStplatId", visible: false},
				{dataField: "rentStplatKind", visible: false},
				{dataField: "useYn", label: {text: "약관동의여부"}, editorType: "dxSelectBox", 
					editorOptions: {dataSource: use_gbn, 
						layout: "horizontal", valueExpr: "value", displayExpr: "text",
						onInitialized: function (e) {
							if (e.component.option("value") == null) {
								e.component.option("value", e.component.option("dataSource")[0].value);
							}
						}
					}
				},
				{ itemType: "empty" },
				{colSpan: 2, dataField: "rentStplatInfo", label: {visible: false}, cssClass: "labelflex",
					template : function(cellInfo, container) {
						container.append($("<div>").dxTextArea({
							value: cellInfo.component.option("formData").rentStplatInfo,
							inputAttr: { id: "third_editor" },
						}));
						CKEDITOR.replace("third_editor");
						CKEDITOR.on("instanceLoaded", function(e) {e.editor.resize("100%",330)} );
						CKEDITOR.instances.third_editor.on("change", 
							function () {
	   	            		//cellInfo.setValue(CKEDITOR.instances.noti_editor.getData());
							}
						);
					}
				}
			]
		}).dxForm("instance");
	}
	else if (subTabId == "2001"){
		tab2_form[2] = $("#tab2 .contents3").dxForm({
			showColonAfterLabel: false,
			formData: contentData(subTabId),
			colcount: 2,
			items: [
				{itemType: "button", colSpan: 2, horizontalAlignment: "right", cssClass: "form-button",
					buttonOptions: {
						text: "저장하기",
						type: "success",
						useSubmitBehavior: true
					}
				},
				{dataField: "rentStplatId", visible: false},
				{dataField: "rentStplatKind", visible: false},
				{dataField: "useYn", label: {text: "약관동의여부"}, editorType: "dxSelectBox", 
					editorOptions: {dataSource: use_gbn, 
						layout: "horizontal", valueExpr: "value", displayExpr: "text",
						onInitialized: function (e) {
							if (e.component.option("value") == null) {
								e.component.option("value", e.component.option("dataSource")[0].value);
							}
						}
					}
				},
				{ itemType: "empty" },
				{colSpan: 2, dataField: "rentStplatInfo", label: {visible: false}, cssClass: "labelflex",
					template : function(cellInfo, container) {
						container.append($("<div>").dxTextArea({
							value: cellInfo.component.option("formData").rentStplatInfo,
							inputAttr: { id: "useOrdinance_editor" },
						}));
						CKEDITOR.replace("useOrdinance_editor");
						CKEDITOR.on("instanceLoaded", function(e) {e.editor.resize("100%",330)} );
						CKEDITOR.instances.useOrdinance_editor.on("change", 
							function () {
	   	            		//cellInfo.setValue(CKEDITOR.instances.noti_editor.getData());
							}
						);
					}
				}
			]
		}).dxForm("instance");
	}
	else if (subTabId == "3001"){
		tab2_form[3] = $("#tab2 .contents4").dxForm({
			showColonAfterLabel: false,
			formData: contentData(subTabId),
			colcount: 2,
			items: [
				{itemType: "button", colSpan: 2, horizontalAlignment: "right", cssClass: "form-button",
					buttonOptions: {
						text: "저장하기",
						type: "success",
						useSubmitBehavior: true
					}
				},
				{dataField: "rentStplatId", visible: false},
				{dataField: "rentStplatKind", visible: false},
				{dataField: "useYn", label: {text: "약관동의여부"}, editorType: "dxSelectBox", 
					editorOptions: {dataSource: use_gbn, 
						layout: "horizontal", valueExpr: "value", displayExpr: "text",
						onInitialized: function (e) {
							if (e.component.option("value") == null) {
								e.component.option("value", e.component.option("dataSource")[0].value);
							}
						}
					}
				},
				{ itemType: "empty" },
				{colSpan: 2, dataField: "rentStplatInfo", label: {visible: false}, cssClass: "labelflex",
					template : function(cellInfo, container) {
						container.append($("<div>").dxTextArea({
							value: cellInfo.component.option("formData").rentStplatInfo,
							inputAttr: { id: "refund_editor" },
						}));
						CKEDITOR.replace("refund_editor");
						CKEDITOR.on("instanceLoaded", function(e) {e.editor.resize("100%",330)} );
						CKEDITOR.instances.refund_editor.on("change", 
							function () {
	   	            		//cellInfo.setValue(CKEDITOR.instances.noti_editor.getData());
							}
						);
					}
				}
			]
		}).dxForm("instance");
	}
}

function contentDisplayFormMenuChange(curItem){
	if (tab2_form[0] && tab2_form[0].option("visible") == true) {
		tab2_form[0].option("visible", false);
	}
	if (tab2_form[1] && tab2_form[1].option("visible") == true) {
		tab2_form[1].option("visible", false);
	}
	if (tab2_form[2] && tab2_form[2].option("visible") == true) {
		tab2_form[2].option("visible", false);
	}
	if (tab2_form[3] && tab2_form[3].option("visible") == true) {
		tab2_form[3].option("visible", false);
	}
	
	if ( curItem == "1001" ) {
		tab2_form[0].option("visible", true);
	}
	else if ( curItem == "1002" ) {
		tab2_form[1].option("visible", true);
	}
	else if ( curItem == "2001" ) {
		tab2_form[2].option("visible",true);
	}
	else if ( curItem == "3001" ) {
		tab2_form[3].option("visible",true);
	}
	
}

function contentData(subTabId) {
	var resultData = {};
	
	if (subTabId == "1001") {
		resultData = {rentStplatId: 1, rentStplatKind: "1001", useYn: "1", rentStplatInfo: "개인정보수집동의 테스트"}
	}
	else if (subTabId == "1002") {
		resultData = {rentStplatId: 2, rentStplatKind: "1002", useYn: "1", rentStplatInfo: "개인정보 제3자동의 테스트"}
	}
	else if (subTabId == "2001") {
		resultData = {rentStplatId: 3, rentStplatKind: "2001", useYn: "1", rentStplatInfo: "이용조례약관 테스트"}
	}
	else if (subTabId == "3001") {
		resultData = {rentStplatId: 4, rentStplatKind: "3001", useYn: "1", rentStplatInfo: "환불동의약관 테스트"}
	}
	
	return resultData;
}