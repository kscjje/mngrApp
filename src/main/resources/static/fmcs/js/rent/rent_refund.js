//환불규정 설정관리
let tab6_form = null;
//let $refundCriteriaGrid = null;

function initRefund() {
	tab6_form = $("#tab6 .tab_contents2").dxForm({
		showColonAfterLabel: false,
		formData: refundResultDataList(),
		colcount: 2,
		items: [
			{itemType: "group", colSpan: 2, horizontalAlignment: "right", cssClass: "form-button-right", items: [
				{ template: function (cellInfo, container) {
					let $buttonContainer = document.createElement("div");
					
					let $settingButton = $("<div>").dxButton({
						text: "환불위약금설정",
						type: "default",
						onClick() {
							DevExpress.ui.notify("환불위약금설정 페이지 이동");
						}
					});
					let $submitButton = $("<div>").dxButton({
						text: "저장하기",
						type: "success",
						useSubmitBehavior: true,
						onClick() {
							DevExpress.ui.notify("환불위약금 저장");
						}
					});
					
					$($buttonContainer)
						.append($settingButton)
						.append("<span style='width: 10px;'>&nbsp;</span>")
						.append($submitButton);
					
					container.append($buttonContainer);
					
					/*
					container.append($("<div>").dxButtonGroup({
						items: [
							{text: "환불위약금설정", type: "success"},
							{text: "저장하기", type: "success"}
						]
					}));
					*/
					
				} }
			]},
			/*
			{itemType: "group", colSpan: 2, colCount: 4, cssClass: "form-button", items: [
				{itemType: "empty", colSpan: 2},
				{itemType: "button", 
					buttonOptions: {
						text: "환불위약금설정",
						type: "success",
						useSubmitBehavior: true,
						onClick() {
							DevExpress.ui.notify("환불위약금설정 페이지 이동");
						}
					}
				},
				{itemType: "button",  
					buttonOptions: {
						text: "저장하기",
						type: "success",
						useSubmitBehavior: true
					}
				}
			]},
			*/
			{itemType: "group", colSpan: 2, colCount: 2, items: [
				{ itemType: "group", caption: "환불지급기준", items: [
					{ template: function (data, itemElement) {
							refundCriteriaList(data, itemElement); 
						}
					}
				]},
				{ itemType: "group", colCount: 2, caption: "환불규정약관", items: [
					{dataField: "REFUND_AGREE_YN", label: {text: "약관동의여부"}, disabled: true, editorType: "dxSelectBox", 
						editorOptions: {dataSource: use_gbn, 
							layout: "horizontal", valueExpr: "value", displayExpr: "text",
							onInitialized: function (e) {
								if (e.component.option("value") == null) {
									e.component.option("value", e.component.option("dataSource")[0].value);
								}
							}
						}
					},
					{itemType: "empty"},
					
					{name: "REFUND_CONTENTS", dataField: "REFUND_CONTENTS", colSpan: 2, label: {visible: false}, disabled: true,
						template: function (cellInfo, container) {
							container.append($("<div>").dxTextArea({
								value: cellInfo.component.option("formData").REFUND_CONTENTS,
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
				]}
			]}
		]
	}).dxForm("instance");
}

function refundResultDataList() {
	var resultData = {};
	
	resultData = {ID: 1, REFUND_AGREE_YN: "1", REFUND_CONTENTS: "환불규정 텍스트"};
	
	return resultData;
}

function refundCriteriaList(data, itemElement) {
	let criteriaResultList = new DevExpress.data.ArrayStore({
		key: "ID",
		data: refundCriteriaData()
	});
	
	itemElement.append( $("<div id='refundCriteria'>").dxDataGrid({
		dataSource: criteriaResultList,
		keyExpr: "ID",
		width: "100%",
		showBorders: true,
		allowColumnResizing: true,
		focusedRowEnabled: true,
		focusedRowIndex: 0,
		selection: {mode: "single"},
		sorting:{mode: "none"},
		paging: {
	      enabled: false,
		},
		editing: {
			mode: "cell",
		 	allowUpdating: true
		},
		columns:[
			{width: "80%", caption: "환불지급율", alignment: "center",
				calculateCellValue: function (rowData) {
					var refundRateContaner = "";
					let refundStartDay = null;
					let refundEndDay = null;
					let refundRate = null;
					
					if (rowData) {
						refundStartDay = rowData.REFUND_START_DAY;
						refundEndDay = rowData.REFUND_END_DAY;
						refundRate = rowData.REFUND_RATE;
					
						refundRateContaner = "이용일 "+ refundStartDay +"일 전부터 "+ refundEndDay +"일 전까지 "+ refundRate +"% 환불";
					}
					
					return refundRateContaner;
				}
			},
			{dataField: "USE_YN", width: "10%", caption: "사용유무", alignment: "center", showEditorAlways: true, lookup: {dataSource: use_gbn, displayExpr: "text", valueExpr: "value"}}
		]
	}) );

	//itemElement.append($refundCriteriaGrid);
}

function refundCriteriaData() {
	var dataList = [];
	var i
	
	//저장된 Data
	dataList.push({ID: 1, USE_YN: "1", REFUND_START_DAY: 5, REFUND_END_DAY: 10, REFUND_RATE: 50})
	dataList.push({ID: 2, USE_YN: "1", REFUND_START_DAY: 11, REFUND_END_DAY: 15, REFUND_RATE: 60})
	dataList.push({ID: 3, USE_YN: "1", REFUND_START_DAY: 16, REFUND_END_DAY: 20, REFUND_RATE: 70})
	
	return dataList;
}