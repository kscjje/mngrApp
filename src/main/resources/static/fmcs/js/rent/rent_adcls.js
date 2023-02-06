//부속시설
let tab5_form = null;
const use_unit_gbn = [
	{text: "개수", value: "C"},
	{text: "시간", value: "T"}
];

const accessoryColumnList = [
	{dataField: "ITEM_CD", visible: false},
	{dataField: "ADCLS_NAME", width: "15%", caption: "대관부속시설품목", allowEditing: false},
	{dataField: "ADCLS_ITEM_UNITGBN", width: "8%", caption: "이용단위", alignment: "center", allowEditing: false, lookup: {dataSource: use_unit_gbn, displayExpr: "text", valueExpr: "value"}},
	{dataField: "ADCLS_ITEM_COST", width: "8%", caption: "이용금액", alignment: "right", dataType: "number", format: def_numberFormat, allowEditing: false,
		editCellTemplate: function(cellElement, cellInfo) {
            $("<div id='txt"+cellInfo.rowIndex+"' class='cell_two_widget' />").dxNumberBox({
                value: cellInfo.value,
                onValueChanged: function(e) {
                    cellInfo.setValue(e.value);
                }
            }).appendTo(cellElement);
           	cellElement.append( "<span id='unit"+cellInfo.rowIndex+"'> 원 </span>");
		}
	},
	{dataField: "USE_YN", width: "15%", caption: "예약부속시설자동적용", alignment: "center", showEditorAlways: true, editorType: "dxSelectBox",
		setCellValue: function(newData, value) {
			this.defaultSetCellValue(newData, value);
		},
		editorOptions: {dataSource: apply_gbn, displayExpr: "text", valueExpr: "value"}
	},
	{dataField: "RENT_TIME_MONTH", width: "20%", caption: "자동적용월", showEditorAlways: true, 
		editCellTemplate: function (cellElement, cellInfo) {
			let autoStartMonth = null;
			if (cellInfo.value) {
				autoStartMonth = cellInfo.value;
			};
			
			let $autoStartMonth = $("<div />").dxTagBox({
				width: "100%",
				value: autoStartMonth,
				dataSource: monthItems_gbn,
				displayExpr: "text",
				valueExpr: "value",
				showSelectionControls: true,
				applyValueMode: "useButtons",
				placeholder: "자동적용 시작월 선택",
				onValueChanged: function (e) {
					autoStartMonth = e.value;
					cellInfo.setValue(autoStartMonth);
				}
			});
			
			if (cellInfo.data.USE_YN == "1") {
				cellElement.append($autoStartMonth);
			}
		}
	},
	{dataField: "TIME_SEQ", width: "26%", caption: "자동적용 회차", showEditorAlways: true,
		editCellTemplate: function (cellElement, cellInfo) {
			let autoAccessNumber = null;
			if (cellInfo.value) {
				autoAccessNumber = cellInfo.value;
			};
			
			let $autoAccessNumber = $("<div />").dxTagBox({
				value: autoAccessNumber,
				dataSource: accessoryRoundList(),
				displayExpr: "text",
				valueExpr: "value",
				showSelectionControls: true,
				applyValueMode: "useButtons",
				placeholder: "자동적용 회차선택",
				onValueChanged: function (e) {
					autoAccessNumber = e.value;
					cellInfo.setValue(autoAccessNumber);
				}
			});
			
			if (cellInfo.data.USE_YN == "1") {
				cellElement.append($autoAccessNumber);
			}
		}
	}
];

function initAccessory() {
	let resultList = new DevExpress.data.ArrayStore({
		key: "ITEM_CD",
		data: accessoryResultDataList()
	});
	
	tab5_form = $("#tab5 .tab_contents2").dxDataGrid({
		columns: accessoryColumnList,
		allowColumnReordering: false,
		allowColumnResizing: true,
		showBorders: true,
		columnHidingEnabled: false,
		selection: {mode: "single"},
		paging: {enabled: false},
		toolbar: {
			items: [{
				location: "after",
	        	widget: "dxButton",
	      		cssClass: "form-button",
	      		options: {
	      			text: "부속시설추가",
	      			type: "default",
	      			useSubmitBehavior: true,
	      			onClick() {
	      				DevExpress.ui.notify("부속시설등록 페이지 이동");
	      				//goUrl("fcltyItem", "1");	//페이지이동 (이동명, 시설분류번호)
	      			}
	      		}
			},
			{
				location: "after",
				widget: "dxButton",
				cssClass: "form-button",
				options: {
					text: "저장하기",
					type: "success",
					useSubmitBehavior: true,
					onClick() {
						DevExpress.ui.notify("리스트 저장");
					}
				} 
			}]
		},
		dataSource: resultList,
		editing: {
			mode: "batch",
		 	allowUpdating: true
		},
		onEditorPrepared :function(e){
		},
		onEditingStart: function(e) {
		},
		onRowPrepared(e){
		},
		onRowUpdated(e) {
		},
		onEditCanceled() {
		},
		onSaved() {
			DevExpress.ui.notify("부속시설사용 저장");
		},
		onRowValidating: function (e) {
		}
	}).dxDataGrid("instance");
}

function accessoryRoundList() {
	var roundDataList = "";
	
	roundDataList = [
		{text: "종일(06:00~22:00)", value: "1"},
		{text: "1회차(06:00~07:00)", value: "2"},
		{text: "2회차(07:00~08:00)", value: "3"},
		{text: "3회차(08:00~09:00)", value: "4"},
		{text: "4회차(09:00~10:00)", value: "5"},
		{text: "5회차(10:00~11:00)", value: "6"}
	]
	
	return roundDataList;
}

function accessoryResultDataList() {
	var dataList = "";
	
	dataList = [
		{ITEM_CD: 1, ADCLS_NAME: "난방", ADCLS_ITEM_UNITGBN: "T", ADCLS_ITEM_COST: "10000", USE_YN: "1", RENT_TIME_MONTH: ["11","12","1","2"], TIME_SEQ: ["1","2","3"]},
		{ITEM_CD: 2, ADCLS_NAME: "미니골대", ADCLS_ITEM_UNITGBN: "T", ADCLS_ITEM_COST: "2000", USE_YN: "0", RENT_TIME_MONTH: [""], TIME_SEQ: [""]}
	]
	
	return dataList;
} 