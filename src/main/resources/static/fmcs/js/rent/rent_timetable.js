//시간표및 요금정보 등록
const timetablePopupTemplate = `
<div id="timetablePopupTemplate">
<!--<div id="popOperationTree" style="float:left; width: 20%; padding-right: 10px;"></div>-->
<div id="priceSearchForm"></div>
</div>`;

let tab4_form = null;
var placeEventYn = "1";
var facilityTimetablePopup = null;
var facilityPricePopup = null;
var timetableNewForm = null;
var priceContentMainForm = null;
var popPriceListForm = null;
var operationTreeList = null;
var priceNewContentForm = null;
var groupId = "";
var priceButton = null;

/*
const timetableGubun_gbn = [
	{text: "전일", value: "A"},
	{text: "회차", value: "R"}
];
*/

const priceGubun_gbn = [
	{text: "전일", value: "AD"},
	{text: "새벽", value: "SR"},
	{text: "오전", value: "AM"},
	{text: "오후", value: "PM"},
	{text: "야간", value: "NT"}
];

let timetableColumnList = [
	{dataField: "timeId", visible: false},
	{dataField: "timeName", width: "8%", caption: "시간명칭", validationRules: [{ type: "required" }]},
	{dataField: "timeGbn", width: "5%", caption: "시간구분", alignment: "center", showEditorAlways: true, lookup: {dataSource: priceGubun_gbn, displayExpr: "text", valueExpr: "value"}},
	{dataField: "sTime", width: "8%", caption: "시작시간", alignment: "center",
		editCellTemplate: function(cellElement, cellInfo) {
            $("<div id='txt"+cellInfo.rowIndex+"' />").dxDateBox({
            	type: "time", pickerType: "list", interval: 10, displayFormat: "HH:mm", validationRules: [{ type: "required" }],
            	onInitialized: function(e) {
            		var timetableStartDate = cellInfo.value;
            		if (timetableStartDate == null) {
            			e.component.option("value", nowDate);
            		}
            		else {
            			e.component.option("value", timetableStartDate);
            		}
            	}
            }).appendTo(cellElement);
		}
    },
    {dataField: "eTime", width: "8%", caption: "종료시간", alignment: "center", 
		editCellTemplate: function(cellElement, cellInfo) {
            $("<div id='txt"+cellInfo.rowIndex+"' />").dxDateBox({
            	type: "time", pickerType: "list", interval: 10, displayFormat: "HH:mm", validationRules: [{ type: "required" }],
            	onInitialized: function (e) {
            		var timetableEndtDate = cellInfo.value;
            		if (timetableEndtDate == null) {
            			e.component.option("value", nowDate.setHours(nowDate.getHours() + 1));
            		}
            		else {
            			e.component.option("value", timetableEndtDate);
            		}
            	} 
            }).appendTo(cellElement);
		}
    },
    {name: "weekdayEvent", caption: "평일요금(행사)등록", headerCellTemplate: function (header, info) {
	    	$("<div>").dxButton({
	    		icon: 'plus',
	    		hint: info.column.caption,
	    		elementAttr: {class: "add_btn"},
	    		onClick: function () {
	    			priceAdd("DE");
	    		}
	    	}).appendTo(header);
	    },
	    columns: [
	    	{dataField: "rentFeeGnb01TimeSeq", width: "15%", caption: "평일요금(행사)", showEditorAlways: true, lookup: {dataSource: partPriceData("DE"), displayExpr: "text", valueExpr: "value"}}
	    ]
	},
	{name: "weekdayNonEvent", caption: "평일요금(비행사)등록", headerCellTemplate: function (header, info) {
	    	$("<div>").dxButton({
	    		icon: 'plus',
	    		hint: info.column.caption,
	    		elementAttr: {class: "add_btn"},
	    		onClick: function () {
	    			priceAdd("DN");
	    		}
	    	}).appendTo(header);
	    },
	    columns: [
	    	{dataField: "rentFeeGnb02TimeSeq", width: "15%", caption: "평일요금(비행사)", showEditorAlways: true, lookup: {dataSource: partPriceData("DN"), displayExpr: "text", valueExpr: "value"}}
	   	]
	},
    {name: "weekendEvent", caption: "주말/공휴일요금(비행사)등록", headerCellTemplate: function (header, info) {
	    	$("<div>").dxButton({
	    		icon: 'plus',
	    		hint: info.column.caption,
	    		elementAttr: {class: "add_btn"},
	    		onClick: function () {
	    			priceAdd("EE");
	    		}
	    	}).appendTo(header);
	    },
	    columns: [
	    	{dataField: "rentFeeGnb03TimeSeq", width: "15%", caption: "주말/공휴일요금(비행사)", showEditorAlways: true, lookup: {dataSource: partPriceData("EE"), displayExpr: "text", valueExpr: "value"}}
	    ]
	},
    {name: "weekendNonEvent", caption: "주말/공휴일요금(비행사)등록", headerCellTemplate: function (header, info) {
	    	$("<div>").dxButton({
	    		icon: 'plus',
	    		hint: info.column.caption,
	    		elementAttr: {class: "add_btn"},
	    		onClick: function () {
	    			priceAdd("EN");
	    		}
	    	}).appendTo(header);
	    },
	    columns: [
	    	{dataField: "rentFeeGnb04TimeSeq", width: "15%", caption: "주말/공휴일요금(비행사)", showEditorAlways: true, lookup: {dataSource: partPriceData("EN"), displayExpr: "text", valueExpr: "value"}}
	    ]
	},
	{dataField: "USE_YN", width: "5%", caption: "사용여부", alignment: "center", showEditorAlways: true, validationRules: [{ type: "required" }], lookup: {dataSource: use_gbn, displayExpr: "text", valueExpr: "value"}}
];

function initTimetable() {
	//if (groupId == "") groupId = "T001";
	facilityBasicData();
	
	timetableList(groupId);
}

//시간표 및 요금설정 기본 장소 Data
function facilityBasicData() {
	//장소별 행사요금운영여부 호출
	if (placeCd == "1") {
		placeEventYn = "1"
	}
	else if (placeCd == "2") {
		placeEventYn = "0"
	}
	else {
		placeEventYn = "1"
	}
}

function timetableList(groupId){
	let resultList = new DevExpress.data.ArrayStore({
		key: "timeId",
		data: timetableResultDataList(groupId)
	});

	tab4_form = $("#tab4 .tab_contents2").dxDataGrid({
		export: {enabled: true},
		columns: timetableColumnList,
		selection: {mode: "single"},
		allowColumnReordering: false,
		allowColumnResizing: true,
		showBorders: true,
		showRowLines: true,
		columnHidingEnabled: false,
		paging: {enabled: false},
		toolbar: {
			items: [{
				location: "before",
				widget: "dxSelectBox",
				options: {
					label: false,
					items: timeGroup(),
					displayExpr: "text",
					valueExpr: "value",
					onInitialized: function (e) {
						e.component.option("value", groupId);
					},
					onValueChanged: function (e) {
						groupId = e.value;
						
						timetableList(groupId);
					}
				}
			},
			{
	        	location: "before",
	        	widget: "dxButton",
	      		cssClass: "form-button",
	      		options: {
	      			text: groupId == "" ? "시간표등록" : "시간표수정",
	      			onClick() {
	      				createFacilityTimetable(groupId);
	      				//console.log("aa");
	      				//gridComplete.refresh();
	      			}
	      		}
			},
			{
	        	location: 'after',
	        	widget: 'dxButton',
	      		cssClass:'form-button',
	      		options: {
	      			text: '회차추가',
	      			type: "success",
      				useSubmitBehavior: true,
	      			onClick() {
      					if (groupId != "") {
	      					tab4_form.addRow();
      					}
      					else {
      						DevExpress.ui.notify("시간표 선택 후 회차를 추가하십시오.");
      					}
	      				//console.log("aa");
	      				//gridComplete.refresh();
	      			}
	      		}
			}]
		},
		dataSource: resultList,
		customizeColumns: function(columns){
			/*
			//평일 시간표일때의 경우 Grid
			if (groupId == "T001") {
				columns.forEach(column => {
					if (column.dataField == "rentFeeGnb03TimeSeq" || column.dataField == "rentFeeGnb04TimeSeq") {
						column.allowEditing = false;
					}
				});
				tab4_form.columnOption("rentFeeGnb01TimeSeq", "validationRules", [{type: "required"}]);
				tab4_form.columnOption("rentFeeGnb02TimeSeq", "validationRules", [{type: "required"}]);
			}
			//주말 시간표일때의 경우 Grid
			else if (groupId == "T002") {
				columns.forEach(column => {
					if (column.dataField == "rentFeeGnb01TimeSeq" || column.dataField == "rentFeeGnb02TimeSeq") {
						column.allowEditing = false;
					}
				});
				tab4_form.columnOption("rentFeeGnb03TimeSeq", "validationRules", [{type: "required"}]);
				tab4_form.columnOption("rentFeeGnb04TimeSeq", "validationRules", [{type: "required"}]);
			}
			*/
			
			if (placeEventYn == "1") {
				tab4_form.columnOption("weekdayEvent", "visible", true);
				tab4_form.columnOption("weekendEvent", "visible", true);
				
				tab4_form.columnOption("rentFeeGnb01TimeSeq", "validationRules", [{type: "required"}]);
				tab4_form.columnOption("rentFeeGnb02TimeSeq", "validationRules", [{type: "required"}]);
				tab4_form.columnOption("rentFeeGnb03TimeSeq", "validationRules", [{type: "required"}]);
				tab4_form.columnOption("rentFeeGnb04TimeSeq", "validationRules", [{type: "required"}]);
			}
			else {
				tab4_form.columnOption("weekdayEvent", "visible", false);
				tab4_form.columnOption("weekendEvent", "visible", false);
				
				tab4_form.columnOption("rentFeeGnb02TimeSeq", "validationRules", [{type: "required"}]);
				tab4_form.columnOption("rentFeeGnb04TimeSeq", "validationRules", [{type: "required"}]);
			}
		},
		focusedRowEnabled: true,
		editing: {
			mode: "row",
		 	allowUpdating: true,
		 	allowDeleting: true,
		 	allowAdding: true,
		 	useIcons: true
		},
		onInitNewRow: function(e){
		},
		onEditorPrepared :function(e){
			/*
			if(e.row && e.row.isNewRow){
				editmode='create';
			}
			*/
			//console.log(editmode);
		},
		onEditingStart: function(e) {
			if (groupId == "") {
				DevExpress.ui.notify("시간표 선택 후 수정하십시오.");
			}
		},
		onRowPrepared(e){
		},
		onRowUpdated(e) {
	          //  alert('RowUpdated');
		},
		onEditCanceled() {
			tab4_form.option("editing.mode", "row");
		},
		onSaved() {
			DevExpress.ui.notify("회차저장");
			//tab4_form.option("editing.mode", "row");
		},
		onRowValidating: function (e) {
		}
	}).dxDataGrid("instance");
}

function timeGroup() {
	var groupList = [];
	
	groupList = [
		{text: "시간표그룹(전체)", value: ""},
		{text: "하절기", value: 1},
		{text: "동절기", value: 2}
	];
	
	return groupList;
}

function partPriceData(partData) {
	var partSelectDataList = [];

	if (partData == "DE") {
		partSelectDataList = [
			{text: "대관료(평일행사)_전일 40,000월", value: "FDE001"},
			{text: "대관료(평일행사)_새벽 6,000월", value: "FDE002"},
			{text: "대관료(평일행사)_오전 6,000월", value: "FDE003"},
			{text: "대관료(평일행사)_오후 10,000월", value: "FDE004"},
			{text: "대관료(평일행사)_야간 11,000월", value: "FDE005"}
		];
	}
	else if (partData == "DN") {
		partSelectDataList = [
			{text: "대관료(평일비행사)_전일 20,000월", value: "FDN001"},
			{text: "대관료(평일비행사)_새벽 3,000월", value: "FDN002"},
			{text: "대관료(평일비행사)_오전 3,000월", value: "FDN003"},
			{text: "대관료(평일비행사)_오후 5,000월", value: "FDN004"},
			{text: "대관료(평일비행사)_야간 6,000월", value: "FDN005"}
		];
	}
	else if (partData == "EE") {
		partSelectDataList = [
			{text: "대관료(주말행사)(토,일)_전일 50,000월", value: "FEE001"},
			{text: "대관료(주말행사)(토,일)_새벽 8,000월", value: "FEE002"},
			{text: "대관료(주말행사)(토,일)_오전 8,000월", value: "FEE003"},
			{text: "대관료(주말행사)(토,일)_오후 12,000월", value: "FEE004"},
			{text: "대관료(주말행사)(토,일)_야간 14,000월", value: "FEE005"},
			{text: "대관료(주말행사)(공휴일)_전일 60,000월", value: "FEE006"},
			{text: "대관료(주말행사)(공휴일)_새벽 10,000월", value: "FEE007"},
			{text: "대관료(주말행사)(공휴일)_오전 10,000월", value: "FEE008"},
			{text: "대관료(주말행사)(공휴일)_오후 14,000월", value: "FEE009"},
			{text: "대관료(주말행사)(공휴일)_야간 16,000월", value: "FEE010"}
		];
	}
	else if (partData == "EN") {
		partSelectDataList = [
			{text: "대관료(주말비행사)(토,일)_전일 30,000월", value: "FEN001"},
			{text: "대관료(주말비행사)(토,일)_새벽 7,000월", value: "FEN002"},
			{text: "대관료(주말비행사)(토,일)_오전 7,000월", value: "FEN003"},
			{text: "대관료(주말비행사)(토,일)_오후 10,000월", value: "FEN004"},
			{text: "대관료(주말비행사)(토,일)_야간 11,000월", value: "FEN005"},
			{text: "대관료(주말비행사)(공휴일)_전일 30,000월", value: "FEN006"},
			{text: "대관료(주말비행사)(공휴일)_새벽 7,000월", value: "FEN007"},
			{text: "대관료(주말비행사)(공휴일)_오전 7,000월", value: "FEN008"},
			{text: "대관료(주말비행사)(공휴일)_오후 10,000월", value: "FEN009"},
			{text: "대관료(주말비행사)(공휴일)_야간 11,000월", value: "FEN010"}
		];
	}
	else if (partData == "DB") {
		partSelectDataList = [
			{text: "대관료(평일)_전일 20,000월", value: "FDB001"},
			{text: "대관료(평일)_새벽 3,000월", value: "FDB002"},
			{text: "대관료(평일)_오전 3,000월", value: "FDB003"},
			{text: "대관료(평일)_오후 5,000월", value: "FDB004"},
			{text: "대관료(평일)_야간 6,000월", value: "FDB005"}
		];
	}
	else if (partData == "EB") {
		partSelectDataList = [
			{text: "대관료(주말)(토,일)_전일 30,000월", value: "FEB001"},
			{text: "대관료(주말)(토,일)_새벽 5,000월", value: "FEB002"},
			{text: "대관료(주말)(토,일)_오전 5,000월", value: "FEB003"},
			{text: "대관료(주말)(토,일)_오후 7,000월", value: "FEB004"},
			{text: "대관료(주말)(토,일)_야간 8,000월", value: "FEB005"},
			{text: "대관료(주말)(공휴일)_전일 30,000월", value: "FEB006"},
			{text: "대관료(주말)(공휴일)_새벽 5,000월", value: "FEB007"},
			{text: "대관료(주말)(공휴일)_오전 5,000월", value: "FEB008"},
			{text: "대관료(주말)(공휴일)_오후 7,000월", value: "FEB009"},
			{text: "대관료(주말)(공휴일)_야간 8,000월", value: "FEB010"}
		];
	}
	return partSelectDataList;
}

function timetableResultDataList(groupId) {
	var dataList = "";
	
	if (groupId == "1") {
		dataList = [
			{timeId: 1, rentTimeGrpno: "1", timeName: "전일", timeGbn: "AD", sTime: "06:00", eTime: "22:00", rentFeeGnb01TimeSeq: "FDE001", rentFeeGnb02TimeSeq: "FDN001", rentFeeGnb03TimeSeq: "FEE001", rentFeeGnb04TimeSeq: "FEN001", USE_YN: "1"},
			{timeId: 2, rentTimeGrpno: "1", timeName: "1회차", timeGbn: "SR", sTime: "06:00", eTime: "07:00", rentFeeGnb01TimeSeq: "FDE002", rentFeeGnb02TimeSeq: "FDN002", rentFeeGnb03TimeSeq: "FEE002", rentFeeGnb04TimeSeq: "FEN002", USE_YN: "1"},
			{timeId: 3, rentTimeGrpno: "1", timeName: "2회차", timeGbn: "AM", sTime: "07:00", eTime: "08:00", rentFeeGnb01TimeSeq: "FDE003", rentFeeGnb02TimeSeq: "FDN003", rentFeeGnb03TimeSeq: "FEE003", rentFeeGnb04TimeSeq: "FEN003", USE_YN: "1"},
			{timeId: 4, rentTimeGrpno: "1", timeName: "3회차", timeGbn: "AM", sTime: "08:00", eTime: "09:00", rentFeeGnb01TimeSeq: "FDE003", rentFeeGnb02TimeSeq: "FDN003", rentFeeGnb03TimeSeq: "FEE003", rentFeeGnb04TimeSeq: "FEN003", USE_YN: "1"},
		]
	}
	else if (groupId == "2") {
		dataList = [
			{timeId: 1, rentTimeGrpno: "2", timeName: "전일", timeGbn: "AD", sTime: "06:00", eTime: "22:00", rentFeeGnb01TimeSeq: "FDE001", rentFeeGnb02TimeSeq: "FDN001", rentFeeGnb03TimeSeq: "FEE001", rentFeeGnb04TimeSeq: "FEN001", USE_YN: "1"},
			{timeId: 2, rentTimeGrpno: "2", timeName: "1회차", timeGbn: "SR", sTime: "06:00", eTime: "07:00", rentFeeGnb01TimeSeq: "FDE002", rentFeeGnb02TimeSeq: "FDN002", rentFeeGnb03TimeSeq: "FEE002", rentFeeGnb04TimeSeq: "FEN002", USE_YN: "1"},
			{timeId: 3, rentTimeGrpno: "2", timeName: "2회차", timeGbn: "AM", sTime: "07:00", eTime: "08:00", rentFeeGnb01TimeSeq: "FDE004", rentFeeGnb02TimeSeq: "FDN004", rentFeeGnb03TimeSeq: "FEE004", rentFeeGnb04TimeSeq: "FEN004", USE_YN: "1"},
			{timeId: 4, rentTimeGrpno: "2", timeName: "3회차", timeGbn: "AM", sTime: "08:00", eTime: "09:00", rentFeeGnb01TimeSeq: "FDE004", rentFeeGnb02TimeSeq: "FDN004", rentFeeGnb03TimeSeq: "FEE004", rentFeeGnb04TimeSeq: "FEN004", USE_YN: "1"},
		]
	}
	else {
		dataList = [
			{timeId: 1, rentTimeGrpno: "1", timeName: "전일", timeGbn: "AD", sTime: "06:00", eTime: "22:00", rentFeeGnb01TimeSeq: "FDE001", rentFeeGnb02TimeSeq: "FDN001", rentFeeGnb03TimeSeq: "FEE001", rentFeeGnb04TimeSeq: "FEN001", USE_YN: "1"},
			{timeId: 2, rentTimeGrpno: "2", timeName: "전일", timeGbn: "AD", sTime: "06:00", eTime: "22:00", rentFeeGnb01TimeSeq: "FDE001", rentFeeGnb02TimeSeq: "FDN001", rentFeeGnb03TimeSeq: "FEE001", rentFeeGnb04TimeSeq: "FEN001", USE_YN: "1"},
			{timeId: 3, rentTimeGrpno: "1", timeName: "1회차", timeGbn: "SR", sTime: "06:00", eTime: "07:00", rentFeeGnb01TimeSeq: "FDE002", rentFeeGnb02TimeSeq: "FDN002", rentFeeGnb03TimeSeq: "FEE002", rentFeeGnb04TimeSeq: "FEN002", USE_YN: "1"},
			{timeId: 4, rentTimeGrpno: "2", timeName: "1회차", timeGbn: "SR", sTime: "06:00", eTime: "07:00", rentFeeGnb01TimeSeq: "FDE002", rentFeeGnb02TimeSeq: "FDN002", rentFeeGnb03TimeSeq: "FEE002", rentFeeGnb04TimeSeq: "FEN002", USE_YN: "1"},
			{timeId: 5, rentTimeGrpno: "1", timeName: "2회차", timeGbn: "AM", sTime: "07:00", eTime: "08:00", rentFeeGnb01TimeSeq: "FDE003", rentFeeGnb02TimeSeq: "FDN003", rentFeeGnb03TimeSeq: "FEE003", rentFeeGnb04TimeSeq: "FEN003", USE_YN: "1"},
			{timeId: 6, rentTimeGrpno: "2", timeName: "2회차", timeGbn: "AM", sTime: "07:00", eTime: "08:00", rentFeeGnb01TimeSeq: "FDE004", rentFeeGnb02TimeSeq: "FDN004", rentFeeGnb03TimeSeq: "FEE004", rentFeeGnb04TimeSeq: "FEN004", USE_YN: "1"},
			{timeId: 7, rentTimeGrpno: "1", timeName: "3회차", timeGbn: "AM", sTime: "08:00", eTime: "09:00", rentFeeGnb01TimeSeq: "FDE003", rentFeeGnb02TimeSeq: "FDN003", rentFeeGnb03TimeSeq: "FEE003", rentFeeGnb04TimeSeq: "FEN003", USE_YN: "1"},
			{timeId: 8, rentTimeGrpno: "2", timeName: "3회차", timeGbn: "AM", sTime: "08:00", eTime: "09:00", rentFeeGnb01TimeSeq: "FDE004", rentFeeGnb02TimeSeq: "FDN004", rentFeeGnb03TimeSeq: "FEE004", rentFeeGnb04TimeSeq: "FEN004", USE_YN: "1"},
		]
	}
	
	return dataList;
}

//시간표 등록 POPUP
function createFacilityTimetable(groupId){
	
	if(facilityTimetablePopup){
		facilityTimetablePopup = null;
		$("#facilityTimetable_Popup").dxPopup("dispose");
	}
	
	facilityTimetablePopup = $("#facilityTimetable_Popup").dxPopup({
		contentTemplate: function (e) {
			timetableTemplate(groupId, e)
		},
		visible: true,
		title: groupId == "" ? "시간표등록" : "시간표수정",
		width: 800,
        height: 600,
		position: { my: "center", at: "center", of: window },
		dragEnabled: true,
		toolbarItems: [{
			widget: "dxButton",
			toolbar: "bottom",
		    location: "after",
		    options: {
		    	text: "저장",
		        onClick() {
		    		DevExpress.ui.notify("시간표 저장");
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
		    		timetableNewForm = null;
		    		facilityTimetablePopup.hide();
		    		facilityTimetablePopup = null;
		    		$("#facilityTimetable_Popup").dxPopup("dispose");
		    	}
		    }
		}]
	}).dxPopup("instance");
}

//시간표 등록 FORM
function timetableTemplate (groupId, objPopup) {
	let timeTableContent = $("<div id='facilityTimetableNewForm' />");
	
	timetableNewForm = timeTableContent.dxForm({
		repaintChangesOnly: true,
		showColonAfterLabel: false,
	    colCount: 1,
	    formData: timeTableFormData(groupId),
	    items: [
	    	{dataField: "rentTimeGrpno", visible: false},
	    	{itemType: "group", colCount: 2, caption: "기본설정", items: [
	    		{dataField: "rentFcltySeq", label: {text: "대관시설분류"}, editorType: "dxSelectBox",
	    			editorOptions: {dataSource: facilityCategories_gbn,
	    				layout: "horizontal", valueExpr: "value", displayExpr: "text", placeholder: "대관시설분류(전체)", disabled: true,
	    				onInitialized: function (e) {
							e.component.option("value", e.component.option("dataSource")[0].value);
						}
	    			}
	    		},
	    		{dataField: "rentPlaceId", label: {text: "대관장소명"}, editorType: "dxSelectBox",
	    			editorOptions: {dataSource: placeList(), 
	    				layout: "horizontal", valueExpr: "value", displayExpr: "text", disabled: true,
	    				onInitialized: function (e) {
							e.component.option("value", e.component.option("dataSource")[0].value);
						}
	    			}
	    		},
	    		
	    		{dataField: "rentTimeGrpnm", label: {text: "시간표그룹명칭"}, editorType: "dxTextBox"},
	    		{itemType: "empty"},
	    		/*
	    		{dataField: "RENT_TIME_USE_YN", label: {text: "사용여부"}, editorType: "dxSelectBox",
	    			editorOptions: {dataSource: use_gbn,
	    				layout: "horizontal", valueExpr: "value", displayExpr: "text",
	    				onInitialized: function (e) {
	    					if (!e.component.option("value")) {
								e.component.option("value", e.component.option("dataSource")[0].value);
							}
	    				}
	    			}
	    		}
	    		*/
	    	]},
	    	{name: "timetableApplySet", itemType: "group", colCount: 2, caption: "적용기간설정", items: [
	    		{dataField: "rentTimePdgbn", label: {text: "적용기간설정방식"}, editorType: "dxSelectBox",
	    			editorOptions: {dataSource: applySetType_gbn,
	    				layout: "horizontal", valueExpr: "value", displayExpr: "text",
	    				onInitialized: function (e) {
	    					if (!e.component.option("value")) {
								e.component.option("value", e.component.option("dataSource")[0].value);
							}
	    				}
	    			}
	    		},
	    		{ itemType: "empty" },
	    		
	    		{name: "timeApplyMonth", dataField: "rentTimeMonth", colSpan: 2, itemType: "group", colCount: 6, label: {text: "적용월"}, items: [
	    			{name: "TM_JAN", label: {visible: false}, editorType: "dxCheckBox", editorOptions: {text: "1월", value: false}},
	    			{name: "TM_FEB", label: {visible: false}, editorType: "dxCheckBox", editorOptions: {text: "2월", value: false}},
	    			{name: "TM_MAR", label: {visible: false}, editorType: "dxCheckBox", editorOptions: {text: "3월", value: false}},
	    			{name: "TM_APR", label: {visible: false}, editorType: "dxCheckBox", editorOptions: {text: "4월", value: false}},
	    			{name: "TM_MAY", label: {visible: false}, editorType: "dxCheckBox", editorOptions: {text: "5월", value: false}},
	    			{name: "TM_JUN", label: {visible: false}, editorType: "dxCheckBox", editorOptions: {text: "6월", value: false}},
	    			
	    			{name: "TM_JUL", label: {visible: false}, editorType: "dxCheckBox", editorOptions: {text: "7월", value: false}},
	    			{name: "TM_AUG", label: {visible: false}, editorType: "dxCheckBox", editorOptions: {text: "8월", value: false}},
	    			{name: "TM_SEP", label: {visible: false}, editorType: "dxCheckBox", editorOptions: {text: "9월", value: false}},
	    			{name: "TM_OCT", label: {visible: false}, editorType: "dxCheckBox", editorOptions: {text: "10월", value: false}},
	    			{name: "TM_NOV", label: {visible: false}, editorType: "dxCheckBox", editorOptions: {text: "11월", value: false}},
	    			{name: "TM_DEC", label: {visible: false}, editorType: "dxCheckBox", editorOptions: {text: "12월", value: false}}
	    		]},
	    		
	    		{name: "timeApplyDate", colSpan: 2, itemType: "group", colCount: 5, visible: false, label: {text: "적용일자"}, items: [
	    			{colSpan: 2, dataField: "rentTimePdsdate", cssClass: "form-date-from-label", label: {location: "right", text: "~"}, 
	    				template: function (cellInfo, container) {
	    					var sMonth = "";
	    					var sDay = "";
	    					if (cellInfo.component.option("formData").rentTimePdsdate) {
	    						sMonth = parseInt(cellInfo.component.option("formData").rentTimePdsdate.split("-")[0]);
	    						sDay = parseInt(cellInfo.component.option("formData").rentTimePdsdate.split("-")[1]);
	    					}

	    					let $rentTimePDSDateContainer = document.createElement("div");
	    					let $rentTimePDSMonth = $("<div class='form-date-temp' />").dxSelectBox({
	    						labelMode: "hidden", placeholder: "월선택", dataSource: monthItems_gbn, valueExpr: "value", displayExpr: "text",
	    						value: sMonth
	    					});
	    					let $rentTimePDSDay = $("<div class='form-date-temp' />").dxSelectBox({
	    						labelMode: "hidden", placeholder: "일선택", dataSource: dateItems_gbn, valueExpr: "value", displayExpr: "text",
	    						value: sDay
	    					});
	    					
	    					$($rentTimePDSDateContainer)
	    						.append($rentTimePDSMonth)
	    						.append($rentTimePDSDay);
	    					
	    					container.append($rentTimePDSDateContainer);
	    				}
	    			},
	    			{colSpan: 2, dataField: "rentTimePdedate", label: {visible: false}, 
	    				template: function (cellInfo, container) {
	    					var eMonth = "";
	    					var eDay = "";
	    					if (cellInfo.component.option("formData").rentTimePdedate) {
	    						eMonth = parseInt(cellInfo.component.option("formData").rentTimePdedate.split("-")[0]);
	    						eDay = parseInt(cellInfo.component.option("formData").rentTimePdedate.split("-")[1]);
	    					}

	    					let $rentTimePDEDateContainer = document.createElement("div");
	    					let $rentTimePDEMonth = $("<div class='form-date-temp' />").dxSelectBox({
	    						labelMode: "hidden", placeholder: "월선택", dataSource: monthItems_gbn, valueExpr: "value", displayExpr: "text",
	    						value: eMonth
	    					});
	    					let $rentTimePDEDay = $("<div class='form-date-temp' />").dxSelectBox({
	    						labelMode: "hidden", placeholder: "일선택", dataSource: dateItems_gbn, valueExpr: "value", displayExpr: "text",
	    						value: eDay
	    					});
	    					
	    					$($rentTimePDEDateContainer)
	    						.append($rentTimePDEMonth)
	    						.append($rentTimePDEDay);
	    					
	    					container.append($rentTimePDEDateContainer);
	    				}
	    			},
	    			{ itemType: "empty" }
    			]},
	    		
	    		{name: "timeApplyWeek", colSpan: 2, itemType: "group", label: {text: "적용요일"}, colCount: 5, items: [
	    			{dataField: "TWALL", label: {visible: false}, editorType: "dxCheckBox", editorOptions: {text: "전체", value: false} },
	    			{name: "timeApplySelectWeek", dataField: "rentTimeDaygbn", colSpan: 4, itemType: "group", colCount: 4, label: {visible: false}, cssClass: "check-form-week", items: [
		    			{dataField: "TW_MON", label: {visible: false}, editorType: "dxCheckBox", editorOptions: {text: "월요일", value: false} },
		    			{dataField: "TW_TUE", label: {visible: false}, editorType: "dxCheckBox", editorOptions: {text: "화요일", value: false} },
		    			{dataField: "TW_WED", label: {visible: false}, editorType: "dxCheckBox", editorOptions: {text: "수요일", value: false} },
		    			{dataField: "TW_THU", label: {visible: false}, editorType: "dxCheckBox", editorOptions: {text: "목요일", value: false} },
		    			{dataField: "TW_FRI", label: {visible: false}, editorType: "dxCheckBox", editorOptions: {text: "금요일", value: false} },
		    			{dataField: "TW_SAT", label: {visible: false}, editorType: "dxCheckBox", editorOptions: {text: "토요일", value: false} },
		    			{dataField: "TW_SUN", label: {visible: false}, editorType: "dxCheckBox", editorOptions: {text: "일요일", value: false} },
		    			{dataField: "TW_HOL", label: {visible: false}, editorType: "dxCheckBox", editorOptions: {text: "공휴일", value: false} }
		    		]}
	    		]}
	    	]}
	    ],
	    onInitialized: function (e) {
	    	var customHandlerInit = function (e) {
				var orgData = e.component.option("formData");
				
				if (orgData.rentTimePdgbn == "M") {
					e.component.itemOption("timetableApplySet.timeApplyMonth", "visible", true);
					e.component.itemOption("timetableApplySet.timeApplyDate", "visible", false);
				}
				else if (orgData.rentTimePdgbn == "D") {
					e.component.itemOption("timetableApplySet.timeApplyMonth", "visible", false);
					e.component.itemOption("timetableApplySet.timeApplyDate", "visible", true);
				}
				
				if (orgData.rentTimeMonth) {
					const arrApplyMonth = orgData.rentTimeMonth;

					for (i = 0; i < arrApplyMonth.length; i++) {
						 const applyMonth = arrApplyMonth[i];
 
						 switch(applyMonth) {
						 	case "1": e.component.getEditor("TM_JAN").option("value", true); break;
						 	case "2": e.component.getEditor("TM_FEB").option("value", true); break;
						 	case "3": e.component.getEditor("TM_MAR").option("value", true); break;
						 	case "4": e.component.getEditor("TM_APR").option("value", true); break;
						 	case "5": e.component.getEditor("TM_MAY").option("value", true); break;
						 	case "6": e.component.getEditor("TM_JUN").option("value", true); break;
						 	case "7": e.component.getEditor("TM_JUL").option("value", true); break;
						 	case "8": e.component.getEditor("TM_AUG").option("value", true); break;
						 	case "9": e.component.getEditor("TM_SEP").option("value", true); break;
						 	case "10": e.component.getEditor("TM_OCT").option("value", true); break;
						 	case "11": e.component.getEditor("TM_NOV").option("value", true); break;
						 	case "12": e.component.getEditor("TM_DEC").option("value", true); break;
						 }
						 
					 }
				}
				
				if (orgData.rentTimeDaygbn) {
					const arrApplyWeek = orgData.rentTimeDaygbn;
					
					if (arrApplyWeek.length == 8) {
						e.component.getEditor("TWALL").option("value", true);
					}

					for (i = 0; i < arrApplyWeek.length; i++) {
						const applyWeek = arrApplyWeek[i];

						switch(applyWeek) {
							case "0":  e.component.getEditor("TW_SUN").option("value", true); break;	
							case "1":  e.component.getEditor("TW_MON").option("value", true); break;
							case "2":  e.component.getEditor("TW_TUE").option("value", true); break;
							case "3":  e.component.getEditor("TW_WED").option("value", true); break;
							case "4":  e.component.getEditor("TW_THU").option("value", true); break;
							case "5":  e.component.getEditor("TW_FRI").option("value", true); break;
							case "6":  e.component.getEditor("TW_SAT").option("value", true); break;
							case "7":  e.component.getEditor("TW_HOL").option("value", true); break;
						}
					}
				}
	    	}
	    	e.component.on("contentReady", customHandlerInit);
	    },
	    onFieldDataChanged: function (e) {
	    	if (timetableNewForm) {
		    	if (e.dataField == "rentTimePdgbn") {
		    		if (e.value == "M") {
		    			timetableNewForm.itemOption("timetableApplySet.timeApplyMonth", "visible", true);
						timetableNewForm.itemOption("timetableApplySet.timeApplyDate", "visible", false);
		    		}
		    		else if (e.value == "D") {
		    			timetableNewForm.itemOption("timetableApplySet.timeApplyMonth", "visible", false);
						timetableNewForm.itemOption("timetableApplySet.timeApplyDate", "visible", true);
		    		}
		    	}
		    	
		    	if (e.dataField == "TWALL") {
		    		if (e.value == true) {
		    			e.component.getEditor("TW_MON").option("value", true);
		    			e.component.getEditor("TW_TUE").option("value", true);
		    			e.component.getEditor("TW_WED").option("value", true);
		    			e.component.getEditor("TW_THU").option("value", true);
		    			e.component.getEditor("TW_FRI").option("value", true);
		    			e.component.getEditor("TW_SAT").option("value", true);
		    			e.component.getEditor("TW_SUN").option("value", true);
						e.component.getEditor("TW_HOL").option("value", true);
		    		}
		    		else if (e.value == false) {
		    			e.component.getEditor("TW_MON").option("value", false);
		    			e.component.getEditor("TW_TUE").option("value", false);
		    			e.component.getEditor("TW_WED").option("value", false);
		    			e.component.getEditor("TW_THU").option("value", false);
		    			e.component.getEditor("TW_FRI").option("value", false);
		    			e.component.getEditor("TW_SAT").option("value", false);
		    			e.component.getEditor("TW_SUN").option("value", false);
		    			e.component.getEditor("TW_HOL").option("value", false);
		    		}
		    	}
		    	
		    	if (e.dataField == "TW_SUN" || e.dataField == "TW_MON" || e.dataField == "TW_TUE" || e.dataField == "TW_WED" || e.dataField == "TW_THU" || e.dataField == "TW_FRI" || e.dataField == "TW_SAT" || e.dataField == "TW_HOL") {
		    		if (e.value) {
		    			if ($("input[name^='TW_'][value=true]").length == 7) {
							e.component.getEditor("TWALL").option("value", true);
						}
		    		}
		    		else {
		    			if ($("input[name^='TW_'][value=true]").length == 1) {
		    				e.component.getEditor("TWALL").option("value", false);
		    			}
		    			else {
		    				e.component.getEditor("TWALL").option("value", null);
		    			}
		    		}
		    	}
	    	}
	    }
	}).dxForm("instance");
	
	objPopup.append(timeTableContent);
	
}

function placeList() {
	var facilityPlaceList = [];
	
	facilityPlaceList = [
		{text: "공설운동장A", value: "1"},
		{text: "공설운동장B", value: "2"}
	]
	
	return facilityPlaceList;
}

//시간표 FormData
function timeTableFormData(groupId) {
	var formData = {};

	if (groupId == "1") {
		formData = {rentTimeGrpno: 1, rentFcltySeq: "FG001", rentPlaceId: 1, rentTimeGrpnm: "하절기", RENT_TIME_USE_YN: "1", rentTimePdgbn: "M", rentTimeMonth: ["6","7","8"], rentTimePdsdate: "", rentTimePdedate: "", rentTimeDaygbn: ["1","2","3"]}
	} 
	else if (groupId == "2") {
		formData = {rentTimeGrpno: 2, rentFcltySeq: "FG002", rentPlaceId: 1, rentTimeGrpnm: "동절기", RENT_TIME_USE_YN: "1", rentTimePdgbn: "D", rentTimeMonth: "", rentTimePdsdate: "1-1", rentTimePdedate: "2-31", rentTimeDaygbn: ["0","6","7"]}
	}
	
	return formData;
}

//구분별 요금 등록 POPUP
function priceAdd(gubun) {
	if(facilityPricePopup){
		facilityPricePopup = null;
		$("#facilityPrice_Popup").dxPopup("dispose");
	}
	
	facilityPricePopup = $("#facilityPrice_Popup").dxPopup({
		contentTemplate: $("<div>").append(timetablePopupTemplate),
		visible: true,
		title: "구분별 요금 등록/수정",
		width: 900,
        height: 600,
		position: { my: "center", at: "center", of: window },
		dragEnabled: true,
		onShown() {
			//alert("aa");
			//operationTree();
			//priceNewForm(gubun);
			createPriceForm(gubun);
			//$("#timetablePopupTemplate > #popOperationTree").dxTreeList("instance");
			$("#timetablePopupTemplate > #priceSearchForm").dxForm("instance");
		},
		toolbarItems: [{
			widget: "dxButton",
			toolbar: "bottom",
		    location: "after",
		    options: {
		    	text: "저장",
		        onClick() {
		    		DevExpress.ui.notify("요금저장");
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
		    		facilityPricePopup.hide();
		    		facilityPricePopup = null;
		    		$("#facilityPrice_Popup").dxPopup("dispose");
		    	}
		    }
		}]
	}).dxPopup("instance");
}

function createPriceForm(gubun) {
	/*
	$("#timetablePopupTemplate > #popOperationTree").dxTreeList({
		dataSource: facilityCategoriesList(),
	    dataStructure: "plain",
	    parentIdExpr: "PRNCTGCD",
	    keyExpr: "CTGCD",
	    columns: [
	    	{dataField: "CTGNM", caption: "운영상품분류"}
	    ],
	    focusedRowEnabled: true,
	    height: 450,
	    onItemClick(e) {
	    	const item = e.itemData;
	    },
	    onNodesInitialized: function(e) {
           // e.component.__root = e.root;
        }
	})
	*/
	
	$("#timetablePopupTemplate > #priceSearchForm").dxForm({
		showColonAfterLabel: false,
		alignItemLabels: true,
		formData: priceSearchFormData(gubun),
	    colCount: 1,
	    height: 450,
	    items: [
	    	{itemType: "group", colCount: 2, caption: "요금구분정보", items: [
	    		{dataField: "comItemctgcd", label: {text: "운영상품분류"}, editorType: "dxSelectBox",
	    			editorOptions: {dataSource: facilityCategoriesList(), 
	    				layout: "horizontal", valueExpr: "comItemctgcd", displayExpr: "comItemctgnm", placeholder: "운영상품분류(전체)", disabled: true
	    			}
	    		},
	    		{dataField: "rentFcltySeq", label: {text: "대관시설분류"}, editorType: "dxSelectBox",
	    			editorOptions: {dataSource: facilityCategories_gbn,
	    				layout: "horizontal", valueExpr: "value", displayExpr: "text", placeholder: "대관시설분류(전체)", disabled: true 
	    			}
	    		},
	    		{dataField: "rentPlaceId", label: {text: "대관장소명"}, editorType: "dxSelectBox",
	    			editorOptions: {dataSource: placeList(), 
	    				layout: "horizontal", valueExpr: "value", displayExpr: "text", disabled: true,
	    				onInitialized: function (e) {
							e.component.option("value", e.component.option("dataSource")[0].value);
						}
	    			}
	    		},
	    		
	    		{dataField: "rentFeeGbn", label: {text: "요금구분"}, editorType: "dxSelectBox",
	    			editorOptions: {dataSource: priceType_gbn,
	    				layout: "horizontal", valueExpr: "value", displayExpr: "text", disabled: true,
	    				onInitialized: function (e) {
	    					e.component.option("value", gubun);
	    				}
	    			}
	    		},
	    		{ itemType: "empty" }
	    		]
	    	},
	    	{itemType: "group", caption: "요금항목", items: [
	    		{template: function (data, itemElement) { priceAddList(gubun, data, itemElement); }
	    		}
	    	]}
	    ]
	});
	
	//setFormData("#timetablePopupTemplate", null);
}

function priceAddList(gubun, data, itemElement) {
	let popPriceResultList = new DevExpress.data.ArrayStore({
		key: "rentItemId",
		data: priceResultDataList(gubun)
	});
	
	itemElement.append(
		$("<div id='priceAddListForm'>").dxDataGrid({
			columns: popPriceGridColumn(gubun),
			selection: {mode: "single"},
			allowColumnReordering: false,
			allowColumnResizing: true,
			showBorders: true,
			showRowLines: true,
			columnHidingEnabled: false,
			paging: {enabled: false},
			toolbar: {items: [{
		        	location: 'after',
		        	widget: 'dxButton',
		      		cssClass:'functionbtn',
		      		options: {
		      			text: '추가',
		      			onClick() {
		      				var priceListForm = $("#priceAddListForm").dxDataGrid("instance");
		      				priceListForm.addRow();
		      				//console.log("aa");
		      				//gridComplete.refresh();
		      			}
		      		}
				},
				/*
				{
		        	location: 'after',
		        	widget: 'dxButton',
		      		cssClass:'functionbtn',
		      		options: {
		      			text: '삭제',
		      			onClick() {
		      				var priceListForm = $("#priceAddListForm").dxDataGrid("instance");
		      				priceListForm.deleteRow();
		      				//popPriceListForm.deleteRow();
		      				//console.log("aa");
		      				//gridComplete.refresh();
		      			}
		      		}
				}
				*/
				]
			},
			dataSource: popPriceResultList,
			customizeColumns: function(columns){
			},
			focusedRowEnabled: true,
			editing: {
				mode: "form",
			 	allowUpdating: true,
			 	allowDeleting: true,
			 	allowAdding: true,
			 	useIcons: true
			},
			onInitNewRow: function(e){
			},
			onEditorPrepared :function(e){
				/*
				if(e.row && e.row.isNewRow){
					editmode='create';
				}
				*/
				//console.log(editmode);
			},
			onEditingStart: function(e) {
			},
			onRowPrepared(e){
			},
			onRowUpdated(e) {
		          //  alert('RowUpdated');
			},
			onEditCanceled() {
			},
			onSaved() {
				DevExpress.ui.notify("요금저장");
				//tab4_form.option("editing.mode", "row");
			},
			onRowValidating: function (e) {
			}
		})
	)
}

//구분별 요금 등록 팝업 Grid column 
function popPriceGridColumn(gubun) {
	var fieldPriceName = "";
	if (gubun == "DE") {
		fieldPriceName = "대관료(평일행사)_";
	}
	else if (gubun == "DN") {
		fieldPriceName = "대관료(평일비행사)_";
	}
	else if (gubun == "EE") {
		fieldPriceName = "대관료(주말행사)_";
	}
	else if (gubun == "EN") {
		fieldPriceName = "대관료(주말비행사)_";
	}
	
	var priceAddColumnList = [
		{dataField: "rentItemId", visible: false},
		{dataField: "rentTimeGbn", width: "10%", caption: "대상적용시간", alignment: "center", showEditorAlways: true, 
			editCellTemplate: function(cellElement, cellInfo) {
				var orgPriceName = cellInfo.data.itemName;
				var priceNameTxt = "";

				$("<div />").dxSelectBox({
					width: "100%", dataSource: priceGubun_gbn,	displayExpr: "text", valueExpr: "value", value: cellInfo.value, validationRules: [{type: "required"}],
					onValueChanged: function(e) {
						//cellInfo.setValue(e.value);
						if (!orgPriceName) {
							priceNameTxt = fieldPriceName + e.component.option("text");
							var textInstance =$('#txt'+cellInfo.rowIndex).dxTextBox('instance');
							textInstance.option("value", priceNameTxt);
						}
					}
				}).appendTo(cellElement);
			}
		},
		{dataField: "itemName", width: "20%", caption: "항목명", showEditorAlways: true,
			editCellTemplate: function (cellElement, cellInfo) {
				$("<div id='txt"+cellInfo.rowIndex+"' />").dxTextBox({
					width: "100%", value: cellInfo.value, validationRules: [{type: "required"}]
				}).appendTo(cellElement);
			}
		},
		{dataField: "FIELD_WEEK_GUBUN", width: "25%", caption: "대상적용요일", showEditorAlways: true,
			editCellTemplate: function(cellElement, cellInfo) {
				var selectWeekDay = null;
				if (cellInfo.value) {
					selectWeekDay = cellInfo.value;
				};
				
	            if (gubun == "EE" || gubun == "EN") {
					$("<div />").dxTagBox(
		            	{dataSource: weekend_gbn, displayExpr: "text", valueExpr: "value", value: selectWeekDay, showSelectionControls: true, applyValueMode: "useButtons",
		            		onContentReady: function (e) {
		            			/*
		            			e.component.option("dataSource")[1].visible = false;
		            			e.component.option("dataSource")[2].visible = false;
		            			e.component.option("dataSource")[3].visible = false;
		            			e.component.option("dataSource")[4].visible = false;
		            			e.component.option("dataSource")[5].visible = false;
		            			*/
		            		}
		            	}
		            ).appendTo(cellElement);
	            }
	            else {
	            	$("<div />").dxTagBox(
			            	{dataSource: weekday_gbn, displayExpr: "text", valueExpr: "value", value: selectWeekDay, showSelectionControls: true, applyValueMode: "useButtons",
			            		onContentReady: function (e) {
			            			/*
			            			e.component.option("dataSource")[0].visible = false;
			            			e.component.option("dataSource")[6].visible = false;
			            			e.component.option("dataSource")[7].visible = false;
			            			*/
			            		}
			            	}
			            ).appendTo(cellElement);
	            }
	        }
		},
		{dataField: "rentFee", width: "10%", caption: "금액", showEditorAlways: true, dataType: "number", format: def_numberFormat,  
			onInitialized: function (e) {
				if (e.value == null) {
					e.value = 0;
				}
			}
		},
		{dataField: "onlineOpenyn", width: "15%", caption: "온라인공개여부", alignment: "center", showEditorAlways: true, validationRules: [{type: "required"}], 
			lookup: {dataSource: online_gbn, displayExpr: "text", valueExpr: "value",
				onInitialized: function (e) {
					if (e.value == null) {
						e.value = e.column.option("dataSource")[0].value;
					}
				}
			}
		},
		{dataField: "taxtGbn", width: "10%", caption: "과세여부", alignment: "center", showEditorAlways: true, validationRules: [{type: "required"}], 
			lookup: {dataSource: tax_gbn, displayExpr: "text", valueExpr: "value",
				onInitialized: function (e) {
					if (e.value == null) {
						e.value = e.column.option("dataSource")[0].value;
					}
				}
			}
		}
	];
	
	return priceAddColumnList;
}

function priceSearchFormData(gubun) {
	var priceFormData = "";
	
	priceFormData = {comItemctgcd: "0002", rentFcltySeq: "1", rentPlaceId: placeCd, rentFeeGbn: gubun};
	
	return priceFormData;
}

function priceResultDataList(gubun) {
	var priceDataList = "";
	
	if (gubun == "DE" || gubun == "DN") {
		priceDataList = [
			{rentItemId: 1, rentTimeGbn: "AD", itemName: "대관료(평일행사)_전일", FIELD_WEEK_GUBUN: "", rentFee: 10000, onlineOpenyn: "1", taxtGbn: "0"},
			{rentItemId: 2, rentTimeGbn: "SR", itemName: "대관료(평일행사)_새벽", FIELD_WEEK_GUBUN: "", rentFee: 1000, onlineOpenyn: "1", taxtGbn: "0"},
			{rentItemId: 3, rentTimeGbn: "AM", itemName: "대관료(평일행사)_오전", FIELD_WEEK_GUBUN: "", rentFee: 2000, onlineOpenyn: "1", taxtGbn: "0"}
		]
	}
	else if (gubun == "EE" || gubun == "EN"){
		priceDataList = [
			{rentItemId: 1, rentTimeGbn: "AD", itemName: "대관료(주말행사)_전일", FIELD_WEEK_GUBUN: ["0","6","7"], rentFee: 10000, onlineOpenyn: "1", taxtGbn: "0"},
			{rentItemId: 2, rentTimeGbn: "SR", itemName: "대관료(주말행사)_새벽", FIELD_WEEK_GUBUN: ["0","7"], rentFee: 1000, onlineOpenyn: "1", taxtGbn: "0"},
			{rentItemId: 3, rentTimeGbn: "AM", itemName: "대관료(주말행사)_오전", FIELD_WEEK_GUBUN: ["0","6"], rentFee: 2000, onlineOpenyn: "1", taxtGbn: "0"}
		]
	}
	
	return priceDataList;
}