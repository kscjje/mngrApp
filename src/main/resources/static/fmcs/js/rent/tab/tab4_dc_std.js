//할인정보 설정관리
let tab4_form = null;
let discountPopupForm = null;

function initDiscountList() {
	let resultList = new DevExpress.data.ArrayStore({
		key: "ID",
		data: discountResultDataList()
	});
	
	tab4_form = $("#tab4 .tab_contents2").dxDataGrid({
		dataSource: resultList,
		keyExpr: "ID",
		width: "100%",
		allowColumnReordering: false,
		allowColumnResizing: true,
		showBorders: true,
		columnHidingEnabled: false,
		selection: {mode: "single"},
		sorting: {mode: "none"},
		paging: {
	      enabled: false
		},
		editing: {
	      mode: "batch",
	      allowUpdating: true,
	      allowDeleting: true,
	      useIcons: true
		},
		toolbar: {
			items: [{
				location: "after",
				widget: "dxButton",
				cssClass: "form-button",
				options: {
					text: "감면확정",
					type: "default",
					onClick: function () {
						discountPopup();
					}
				}
			},
			{
				location: "after",
				widget: "dxButton",
				cssClass: "form-button",
				options: {
					text: "저장",
					type: "success",
					onClick: function () {
						DevExpress.ui.notify("저장");
					}
				}
			}]
		},
		columns:[
			{dataField: "DC_NAME", width: 300, caption: "할인명", allowEditing: false},
			{dataField: "DC_TYPE", visible: false},
			{dataField: "DC_TYPE_NAME", width: 200, caption: "할인할증그룹", alignment: "center", allowEditing: false},
			{dataField: "DC_LIMIT", dataType: "object", width: 500, caption: "범위",  showEditorAlways: true,
				editCellTemplate: function (cellElement, cellInfo) {
					let obj = {
						AGE_BEGIN: null,
						AGE_BEGIN_LIMIT: null,
						AGE_END: null,
						AGE_END_LIMIT: null,
						PISC_MERITER: null,
						PISC_ATHZER_CL: null,
						WHTHRC_AREAIDX: null,
						PISC_DSPSN_CL: null,
						PISC_MNYCH_CNT: null
					}
					
					
					if (cellInfo.value) {
						obj = {
							AGE_BEGIN: cellInfo.value.AGE_BEGIN,
							AGE_BEGIN_LIMIT: cellInfo.value.AGE_BEGIN_LIMIT,
							AGE_END: cellInfo.value.AGE_END,
							AGE_END_LIMIT: cellInfo.value.AGE_END_LIMIT,
							PISC_MERITER: cellInfo.value.PISC_MERITER,
							PISC_ATHZER_CL: cellInfo.value.PISC_ATHZER_CL,
							WHTHRC_AREAIDX: cellInfo.value.WHTHRC_AREAIDX,
							PISC_DSPSN_CL: cellInfo.value.PISC_DSPSN_CL,
							PISC_MNYCH_CNT: cellInfo.value.PISC_MNYCH_CNT
						};
					}
					
					//연령
					let $discountAgeContainers = document.createElement("div");
					$discountAgeContainers.className = "hs-accessory-multieditor-column";
					let $discountStartAge = $("<div>").dxNumberBox({
						width: "20%",
						value: obj.AGE_BEGIN,
						showSpinButtons: true,
						min: 0, max: 100,
						placeholder: "연령",
						onValueChanged: function (e) {
							obj.AGE_BEGIN = e.value;
							cellInfo.setValue(obj);
						}
					});
					let $discountStartLimit = $("<div>").dxSelectBox({
						width: "20%",
						dataSource: range_gbn,
						displayExpr: "text",
						valueExpr: "value",
						value: obj.AGE_BEGIN_LIMIT,
						onValueChanged: function (e) {
							obj.AGE_BEGIN_LIMIT = e.value;
							cellInfo.setValue(obj);
						}
					});
					let $discountEndAge = $("<div>").dxNumberBox({
						width: "20%",
						value: obj.AGE_END,
						showSpinButtons: true,
						min: 0, max: 100,
						placeholder: "연령",
						onValueChanged: function (e) {
							obj.AGE_END = e.value; 
							cellInfo.setValue(obj);
						}
					});
					let $discountEndLimit = $("<div>").dxSelectBox({
						width: "20%",
						dataSource: range_gbn,
						displayExpr: "text",
						valueExpr: "value",
						value: obj.AGE_END_LIMIT,
						onValueChanged: function (e) {
							obj.AGE_END_LIMIT = e.value;
							cellInfo.setValue(obj);
						}
					});
					$($discountAgeContainers)
						.append($discountStartAge)
						.append($discountStartLimit)
						.append("<div>~</div>")
						.append($discountEndAge)
						.append($discountEndLimit);
					
					//국가유공
					let $discountMeritoriousContainers = document.createElement("div");
					$discountMeritoriousContainers.className = "hs-accessory-multieditor-column";
					let $discountRelationship = $("<div>").dxSelectBox({
						width: "30%",
						dataSource: dc_type_gbn1,
						displayExpr: "text",
						valueExpr: "value",
						placeholder: "관계",
						value: obj.PISC_MERITER,
						onValueChanged: function (e) {
							obj.PISC_MERITER = e.value;
							cellInfo.setValue(obj);
						}
					});
					let $discountAuthPerson = $("<div>").dxSelectBox({
						width: "30%",
						dataSource: dc_type_gbn2,
						displayExpr: "text",
						valueExpr: "value",
						placeholder: "수권여부",
						value: obj.PISC_ATHZER_CL,
						onValueChanged: function (e) {
							obj.PISC_ATHZER_CL = e.value;
							cellInfo.setValue(obj);
						}
					});
					$($discountMeritoriousContainers)
						.append($discountRelationship)
						.append($discountAuthPerson);
					
					//거주지
					let $discountAreaContainers = document.createElement("div");
					$discountAreaContainers.className = "hs-accessory-multieditor-column";
					let $discountArea = $("<div>").dxSelectBox({
						width: "50%",
						dataSource: getAreaList(),
						displayExpr: "text",
						valueExpr: "value",
						placeholder: "행정동 선택",
						value: obj.WHTHRC_AREAIDX,
						onValueChanged: function (e) {
							obj.WHTHRC_AREAIDX = e.value;
							cellInfo.setValue(obj);
						}
					});
					$($discountAreaContainers)
						.append($discountArea);
					
					//장애등곱
					let $discountLevelContainers = document.createElement("div");
					$discountLevelContainers.className = "hs-accessory-multieditor-column";
					let $discountLevel = $("<div>").dxSelectBox({
						width: "50%",
						dataSource: dc_type_gbn3,
						displayExpr: "text",
						valueExpr: "value",
						placeholder: "장애등급",
						value: obj.PISC_DSPSN_CL,
						onValueChanged: function (e) {
							obj.PISC_DSPSN_CL = e.value;
							cellInfo.setValue(obj);
						}
					});
					$($discountLevelContainers)
						.append($discountLevel);
					
					if (cellInfo.data.DC_TYPE == "0001") {
						//장애등급
						cellElement.append($discountLevelContainers);
					}
					else if (cellInfo.data.DC_TYPE == "0002") {
						//국가유공자
						cellElement.append($discountMeritoriousContainers);
					}
					else if (cellInfo.data.DC_TYPE == "0003") {
						//연령
						cellElement.append($discountAgeContainers);
					}
					else if (cellInfo.data.DC_TYPE == "0004") {
						//거주지
						cellElement.append($discountAreaContainers);
					}
				}
			},
			{dataField: "DC_AMT_TYPE", width: 150, caption: "할인단위", alignment: "center", showEditorAlways: true, editorType: "dxSelectBox",
				setCellValue: function(newData, value) {
					this.defaultSetCellValue(newData, value);
				},
				editorOptions: {dataSource: discount_gbn, displayExpr: "text", valueExpr: "value",
					onInitialized: function (e) {
						e.component.option("dataSource")[2].visible = false;
						e.component.option("dataSource")[3].visible = false;
					}
				}
			}, 
			{dataField: "DC_PRICE", width: 100, caption: "할인율/할인금액", showEditorAlways: true,
				editCellTemplate: function(cellElement, cellInfo) {
		            $("<div id='txt"+cellInfo.rowIndex+"' class='cell_two_widget' />").dxNumberBox({
		                value: cellInfo.value,
		                min: 0,
		                showSpinButtons: true,
		                onValueChanged: function(e) {
		                    cellInfo.setValue(e.value);
		                }
		            }).appendTo(cellElement);
		            if (cellInfo.data.DC_AMT_TYPE == "0") {
		            	cellElement.append( "<span id='unit"+cellInfo.rowIndex+"' style='padding-right: 10px;'> % </span>");
		            }
		            else {
		            	cellElement.append( "<span id='unit"+cellInfo.rowIndex+"' style='padding-right: 10px;'> 원 </span>");
		            }
				}
			}
		]
	}).dxDataGrid("instance");
}

function discountPopup() {
	if(discountPopupForm){
		discountPopupForm = null;
		$("#discount_Popup").dxPopup("dispose");
	}
	
	discountPopupForm = $("#discount_Popup").dxPopup({
		contentTemplate: function (e) {
			discountTemplate(e)
		},
		visible: true,
		title: "감면확정 항목선택",
		width: 600,
        height: 700,
		position: { my: "center", at: "center", of: window },
		dragEnabled: true,
		toolbarItems: [{
			widget: "dxButton",
			toolbar: "bottom",
		    location: "after",
		    options: {
		    	text: "저장",
		        onClick() {
		    		DevExpress.ui.notify("감면확정");
		    	},
		    },
		}, 
		{
			widget: "dxButton",
			toolbar: "bottom",
		    location: "after",
		    options: {
		    	text: "취소",
		        onClick() {
		    		discountPopupForm.hide();
		    		discountPopupForm = null;
		    		$("#discount_Popup").dxPopup("dispose");
		    	}
		    }
		}]
	}).dxPopup("instance");
}

function discountTemplate(objPopup) {
	let discountContent = $("<div id='discountChoiceForm' />");
	
	discountChoiceForm = discountContent.dxForm({
		showColonAfterLabel: false,
	    formData: discountFormData(),
	    colCount: 2,
	    items: [
	    	{dataField: "RENT_FCLTY_SEQ", label: {text: "대관시설분류"}, editorType: "dxSelectBox",
	    		editorOptions: {dataSource: rentList(),
	    			disabled: true, layout: "horizontal", valueExpr: "value", displayExpr: "text", value: rentFcltySeq
	    		}
	    	},
	    	{ itemType: "empty" },
	    	
	    	{colSpan: 2, itemType: "group", caption: "감면목록", items: [
	    		{dataField: "DC_REASON_CD", label: {visible: false}, cssClass: "hs-bg-white", editorType: "dxList",
	    			editorOptions: {
	    				dataSource: DISCOUNT_ITEMS,
	    				keyExpr: "DC_CD",
	    				displayExpr: "DC_NAME",
	    				height: 400,
						showSelectionControls: true,
						selectionAllMode: "allPages",
						selectionMode: "all",
						onSelectionChanged: function (e) {
						}
	    			}
	    		}
	    	]}
	    ],
	    onInitialized: function (e) {
	    	var customHandlerInit = function (e) {
				var orgData = e.component.option("formData");
				
				if (orgData.DC_REASON_CD) {
					var selectedItems = e.component.getEditor("DC_REASON_CD").option("dataSource").filter((items) => orgData.DC_REASON_CD.includes(items.DC_CD));
					e.component.getEditor("DC_REASON_CD").option("selectedItems", selectedItems);
				}
	    	}
	    	
	    	e.component.on("contentReady", customHandlerInit);
	    }
	}).dxForm("instance");
	
	objPopup.append(discountContent);
}

function discountFormData() {
	var formData = {};
	
	formData = {ID: 1, RENT_FCLTY_SEQ: "FG001", DC_REASON_CD: ["0002","0003","0004","0005"]}
	
	return formData;
}

function discountResultDataList() {
	var dataList = "";
	
	//국가유공자 감면
	var plscMeriterData = "";
	var PLSC_MERITER_SELF = "T";
	var PLSC_MERITER_SPOUSE = "F";
	var PLSC_MERITER_BRVFM = "F";
	if (PLSC_MERITER_SELF == "T") {
		plscMeriterData = "A";
	}
	if (PLSC_MERITER_SPOUSE == "T") {
		plscMeriterData = plscMeriterData & "B";
	}
	if (PLSC_MERITER_BRVFM == "T") {
		plscMeriterData = plscMeriterData & "C";
	}
	
	dataList = [
		{ID: 1, DC_USE_YN: "1", DC_NAME: "경로할인", DC_TYPE: "0003", DC_TYPE_NAME: "연령", DC_LIMIT: {AGE_BEGIN: 60, AGE_BEGIN_LIMIT: "0", AGE_END: 100, AGE_END_LIMIT: "1", PISC_MERITER: "", PISC_ATHZER_CL: "", WHTHRC_AREAIDX: "", PISC_DSPSN_CL: "", PISC_MNYCH_CNT: null}, DC_AMT_TYPE: "0", DC_PRICE: 50},
		{ID: 2, DC_USE_YN: "1", DC_NAME: "국가유공자", DC_TYPE: "0002", DC_TYPE_NAME: "국가유공자", DC_LIMIT: {AGE_BEGIN: null, AGE_BEGIN_LIMIT: "", AGE_END: null, AGE_END_LIMIT: "", PISC_MERITER: plscMeriterData, PISC_ATHZER_CL: "Y", WHTHRC_AREAIDX: "", PISC_DSPSN_CL: "", PISC_MNYCH_CNT: null}, DC_AMT_TYPE: "1", DC_PRICE: 5000},
		{ID: 3, DC_USE_YN: "1", DC_NAME: "관내거주", DC_TYPE: "0004", DC_TYPE_NAME: "거주지", DC_LIMIT: {AGE_BEGIN: null, AGE_BEGIN_LIMIT: "", AGE_END: null, AGE_END_LIMIT: "", PISC_MERITER: "", PISC_ATHZER_CL: "", WHTHRC_AREAIDX: "", PISC_DSPSN_CL: "", PISC_MNYCH_CNT: null}, DC_AMT_TYPE: "1", DC_PRICE: 1000},
		{ID: 4, DC_USE_YN: "1", DC_NAME: "기초생활수급자", DC_TYPE: "0000", DC_TYPE_NAME: "기준없음", DC_LIMIT: {AGE_BEGIN: null, AGE_BEGIN_LIMIT: "", AGE_END: null, AGE_END_LIMIT: "", PISC_MERITER: "", PISC_ATHZER_CL: "", WHTHRC_AREAIDX: "", PISC_DSPSN_CL: "", PISC_MNYCH_CNT: null}, DC_AMT_TYPE: "0", DC_PRICE: 50},
	]
	
	return dataList;
}