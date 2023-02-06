//환불규정 설정관리
let tab3_form = null;

function initRefundList() {
	tab3_form = $("#tab3 .tab_contents2").dxForm({
		showColonAfterLabel: false,
		formData: refundResultDataList(),
		colcount: 2,
		items: [
			{dataField: "RENT_STPLAT_ID", visible: false},
			{itemType: "button", colSpan: 2, horizontalAlignment: "right", cssClass: "form-button",
				buttonOptions: {
					text: "저장하기",
					type: "success",
					useSubmitBehavior: true
				}
			},
			{itemType: "group", colSpan: 2, colCount: 2, items: [
				{ itemType: "group", caption: "환불지급기준", items: [
					{ template: function (data, itemElement) {
							refundCriteriaList(data, itemElement); 
						}
					}
				]},
				{ itemType: "group", colCount: 2, caption: "환불규정약관", items: [
					{dataField: "USE_YN", label: {text: "약관동의여부"}, editorType: "dxSelectBox", 
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
					
					{dataField: "RENT_STPLAT_INFO", colSpan: 2, label: {visible: false},
						template: function (cellInfo, container) {
							container.append($("<div>").dxTextArea({
								value: cellInfo.component.option("formData").RENT_STPLAT_INFO,
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

function refundCriteriaList(data, itemElement) {
	let criteriaResultList = new DevExpress.data.ArrayStore({
		key: "NO",
		data: refundCriteriaData()
	});
	
	itemElement.append( $("<div id='refundCriteria'>").dxDataGrid({
		dataSource: criteriaResultList,
		keyExpr: "NO",
		width: "100%",
		showBorders: true,
		allowColumnResizing: true,
		focusedRowEnabled: true,
		focusedRowIndex: 0,
		selection: {mode: "multiple", showCheckBoxesMode: "always", deferred: true},
		selectionFilter: ["USE_YN", "=", "1"],
		sorting:{mode: "none"},
		paging: {
	      enabled: false,
		},
		editing: {
	      mode: "batch",
		},
		columns:[
			{dataField: "USE_YN", visible: false },
			{dataField: "RENT_RETPAY_STDSEQ", visible: false},
			{dataField: "RETPAY_STDR", width: "100%", caption: "환불지급율", showEditorAlways: true,
				editCellTemplate: function (cellElement, cellInfo) {
					let refundStartDay = null;
					let refundEndDay = null;
					let refundRate = null;
					
					if (cellInfo.value) {
						refundStartDay = cellInfo.value.RENTDATE_BFDAYS_FM;
						refundEndDay = cellInfo.value.RENTDATE_BFDAYS_TO;
						refundRate = cellInfo.value.RENT_DDC_TARIFF;
					}
					
					let $refundRateContainer = document.createElement("div");
					$refundRateContainer.className = "hs-accessory-multieditor-column";
					let $refundStartDay = $("<div id='refundBefore_"+ cellInfo.rowIndex +"'>").dxSelectBox({
						width: "12%",
						value: refundStartDay,
						dataSource: dateItems_gbn,
						displayExpr: "text",
						valueExpr: "value",
						disabled: cellInfo.data.USE_YN == 1? false : true,
						placeholder: "",
						onContentReady: function (e) {
							e.component.option("dataSource")[0].visible = false;
						},
						onValueChanged: function (e) {
							//refundStartDay = e.value;
							//cellInfo.setValue(refundStartDay);
						}
					});
					
					let $refundEndDay = $("<div id='refundAfter_"+ cellInfo.rowIndex +"'>").dxSelectBox({
						width: "12%",
						value: refundEndDay,
						dataSource: dateItems_gbn,
						displayExpr: "text",
						valueExpr: "value",
						disabled: cellInfo.data.USE_YN == 1? false : true,
						placeholder: "",
						onContentReady: function (e) {
						},
						onValueChanged: function (e) {
							//refundStartDay = e.value;
							//cellInfo.setValue(refundStartDay);
						}
					});
					
					let $refundRate = $("<div id='refundRate_"+ cellInfo.rowIndex +"'>").dxNumberBox({
						width: "12%",
						showSpinButtons: true,
						value: refundRate,
						disabled: cellInfo.data.USE_YN == 1? false : true,
						min: 0,
						max: 100
					});
					
					$($refundRateContainer)
						.append("<span style='width: 4%'>이용일</span>")	
						.append($refundStartDay)
						.append("<span style='width: 4%'>전부터</spanㄹ>")
						.append($refundEndDay)
						.append("<span style='width: 4%'>전까지</span>")
						.append($refundRate)
						.append("<span style='width: 4%'>% 환불</span>");

					cellElement.append($refundRateContainer);
				}
			}
		],
		onSelectionChanged(e) {
			for (i = 0; i < 10; i++) {
				$("#refundBefore_"+i).dxSelectBox("instance").option("disabled", true);
				$("#refundAfter_"+i).dxSelectBox("instance").option("disabled", true);
				$("#refundRate_"+i).dxNumberBox("instance").option("disabled", true);
			}
			
			e.component.getSelectedRowKeys().then(function (arrKey) {
				var arrIndex = 0;
				for (i = 0; i < arrKey.length; i++) {
					arrIndex = arrKey[i] -1;
					$("#refundBefore_"+ arrIndex).dxSelectBox("instance").option("disabled", false);
					$("#refundAfter_"+ arrIndex).dxSelectBox("instance").option("disabled", false);
					$("#refundRate_"+ arrIndex).dxNumberBox("instance").option("disabled", false);
				}
				//console.log(e.component.cell(0, "RETPAY_STDR"));
			});
        }
	}) );

	//itemElement.append($refundCriteriaGrid);
}

function refundResultDataList() {
	var dataList = {};
	
	dataList = {RENT_STPLAT_ID: 1, USE_YN: "1", RENT_STPLAT_INFO: "환불규정약관 텍스트"};
	
	return dataList;
}

function refundCriteriaData() {
	var dataList = [];
	var i, j
	
	//저장된 Data
	dataList.push({NO: 1, RENT_RETPAY_STDSEQ: 1, USE_YN: "1", RETPAY_STDR: {RENTDATE_BFDAYS_FM: 5, RENTDATE_BFDAYS_TO: 10, RENT_DDC_TARIFF: 50}})
	dataList.push({NO: 2, RENT_RETPAY_STDSEQ: 2, USE_YN: "1", RETPAY_STDR: {RENTDATE_BFDAYS_FM: 11, RENTDATE_BFDAYS_TO: 15, RENT_DDC_TARIFF: 60}})
	dataList.push({NO: 3, RENT_RETPAY_STDSEQ: 3, USE_YN: "1", RETPAY_STDR: {RENTDATE_BFDAYS_FM: 16, RENTDATE_BFDAYS_TO: 20, RENT_DDC_TARIFF: 70}})
	i = 3;
	//나머지 기본 Grid
	for (j = i+1; j <= 10; j++) {
		dataList.push({NO: j, RENT_RETPAY_STDSEQ: null, USE_YN: "0", RETPAY_STDR: {RENTDATE_BFDAYS_FM: "", RENTDATE_BFDAYS_TO: "", RENT_DDC_TARIFF: ""}})
	}
	
	return dataList;
}