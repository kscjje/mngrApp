// 기초관리 > 결제수단관리
// 결제수단 등록/수정 팝업 FORM

var columnList = null;
var gridPayMethod = null;
var editmode="new";


const pcomcd_gbn = [
	{id: "TOSS", text: "TOSS"}, 
	{id: "ALLAT", text: "ALLAT"}, 
	{id: "INICIS", text: "INICIS"}, 
	{id: "NICE", text: "NICE"}, 
	{id: "NICEPAY", text: "NICEPAY"}
];

const ptype_gbn = [
	{id: "CASH", text: "현금"}, 
	{id: "CARD", text: "신용카드"}, 
	{id: "BANK", text: "계좌이체"}, 
	{id: "BANK", text: "가상계좌이체"} 
];

const cardcp_gbn = [
	{id: "04", text: "BC카드"}, 
	{id: "05", text: "현대카드(다이너스)"}, 
	{id: "06", text: "LG카드"}, 
	{id: "07", text: "삼성카드"} ,
	{id: "08", text: "아멕스카드"} 
];

let resultList = new DevExpress.data.ArrayStore({
	key: "ID",
	data: mainListData()
});


function formInit() {
	// 조건 생성
	createCondition();
	
	// 그리드 생성
	createDataGrid();
}

function createCondition() {
	//Search Form
	$("#payMethodSearch").dxForm({
		showColonAfterLabel: false,
	    labelMode:'hidden',
	    colCount: 2,
	    items: [
	    	{dataField: "P_COMCD", editorType: "dxSelectBox", editorOptions: {	dataSource: pcomcd_gbn, layout: "horizontal", valueExpr: "id", displayExpr: "text", placeholder: "결제구분(전체)"}},
	    	{dataField: "P_TYPE", editorType: "dxSelectBox", editorOptions: {	dataSource:ptype_gbn, layout: "horizontal", valueExpr: "id", displayExpr: "text", placeholder: "결제수단구분(전체)"} }
	    ]
	});
	
	//검색버튼
	$("#searchBtn").dxButton({
		stylingMode: "contained",
		icon: "find",
		type: "default",
		onClick() {
			var msg = "";
			if($("input[name='SEARCH_COLUMN']").val() == ""){
				msg = "키워드 제외 검색";
			}
			else {
				msg = $("select[name='SEARCH_COLUMN']").val() +" = "+ $("input[name='SEARCH_KEYWORD']").val() +" 검색 ";
			}
			DevExpress.ui.notify(msg);
		}
	});
	
	//리셋버튼
	$('#searchInitBtn').dxButton({
		stylingMode: 'contained',
		icon:'clear',
		type: 'default',
		elementAttr: {
			class: "btnRefresh"
		},
		onClick() {
			$("#payMethodSearch").dxForm("instance").resetValues();
		},
	});
}

function createDataGrid() {
	mainListColumn();
	
	
	//Main Grid
	gridPayMethod = $("#gridList").dxDataGrid({
		dataSource:  resultList,
		columns: columnList,
		selection: {mode: "single"},
		allowColumnReordering: true,
		allowColumnResizing: true,
		showBorders: true,
		showRowLines: true,
		columnHidingEnabled: true,
		paging: {pageSize: 10},
		columnChooser: {enabled: true},
        focusedRowEnabled: true,
        onFocusedRowChanged(e) {
        	const focusedRowKey = e.component.option('focusedRowKey');
		    selectedRowIndex = e.rowIndex;
        	editmode="view";
        },
        editing: {
			mode: "popup",
		 	selectTextOnEditStart: true,
			// startEditAction: 'click',
		 	popup: {
				title: "결제수단관리",
				showTitle: true,
				width: 500,
			  	height:500,
			 	onShown:function(){
			  	}
			},
			form: {
				showColonAfterLabel: false,
				elementAttr: {
			         id: "editForm",
			   	},
				items: createPayMethodDetailForm(),
				onInitialized: function(e) {
					frmPopup  = e.component;
				},
				onContentReady: function () {
					
				},
				colCount: 1,
			},
		},
		onRowDblClick: function (e) {
			updatePayMethod();
		},
		onInitNewRow: function(e){
			if(gridPayMethod.option("editing.mode")=="popup"){
				gridPayMethod.option("editing.popup.title", "결제수단등록");
			}
		},
		onEditorPrepared :function(e){
			if(e.row && e.row.isNewRow){
				editmode='create';
			}
			//console.log(editmode);
		},
		onEditingStart: function(e) {
			editRowKey = e.key;
			if(gridPayMethod.option("editing.mode")=="popup"){
				gridPayMethod.option("editing.popup.title", "결제수단수정");
			}
		},
		onRowPrepared(e){
		},
		onRowUpdated(e) {
	          //  alert('RowUpdated');
		},
		onEditCanceled() {
			gridPayMethod.option("editing.mode", "popup");
		},
		onSaved() {
			gridPayMethod.option("editing.mode", "popup");
		},
	    export: {
	        enabled: true,
	    },
	    onExporting(e) {
	    	exportPayMethod();
	    	e.cancel = true;
	    }		
	}).dxDataGrid("instance");
}


//Main Column
function mainListColumn() {
	columnList = [
		{dataField: "P_COMCD", width: 150, caption: "결제대행사", alignment: "center", lookup: {dataSource: pcomcd_gbn, displayExpr: "text", valueExpr: "id"}}, 
		{dataField: "P_TYPE", width: 150, caption: "결제수단구분",  alignment: "center", lookup: {dataSource: ptype_gbn, displayExpr: "text", valueExpr: "id"}},
		{dataField: "METHOD_CD", width: 80, caption: "결제수단코드", alignment: "center"},
		{dataField: "METHOD_NM", width: 200, caption: "결제수단명"},
		{dataField: "COMPANY_SEC", width: 160, caption: "카드사구분", lookup: {dataSource: cardcp_gbn, displayExpr: "text", valueExpr: "value"}},
		{dataField: "PG_VAN", width: 160, caption: "PG/VAN 구분"},
//		{dataField: "CARD_SEC", width: 120, caption: "VAN사 코드"},
		{dataField: "CARD_RATE", width: 160, caption: "카드수수료율", alignment: "center"},
		{dataField: "CHECK_RATE", width: 110, caption: "체크카드수수료율", alignment: "center"},
		{dataField: "USE_YN", width: 130, caption: "사용여부", alignment: "center", lookup: {dataSource: use_gbn, displayExpr: "text", valueExpr: "value"}}
	];
}

function mainListData() {
	var dataList = "";
	
	dataList = [
		{ID: 1, P_COMCD: "TOSS", P_TYPE: "CARD", METHOD_CD: "11", METHOD_NM: "국민", COMPANY_SEC: "", PG_VAN: "PG", CARD_SEC: "11", CARD_RATE: "0.1", CHECK_RATE: "0.5", USE_YN: "1"},
		{ID: 2, P_COMCD: "TOSS", P_TYPE: "CARD", METHOD_CD: "91", METHOD_NM: "NH", COMPANY_SEC: "", PG_VAN: "PG", CARD_SEC: "91", CARD_RATE: "0.1", CHECK_RATE: "0.5", USE_YN: "1"},
		{ID: 3, P_COMCD: "TOSS", P_TYPE: "CARD", METHOD_CD: "30", METHOD_NM: "KDB산업체크", COMPANY_SEC: "", PG_VAN: "PG", CARD_SEC: "30", CARD_RATE: "0.1", CHECK_RATE: "0.5", USE_YN: "1"},
		{ID: 4, P_COMCD: "TOSS", P_TYPE: "CARD", METHOD_CD: "31", METHOD_NM: "비씨", COMPANY_SEC: "", PG_VAN: "PG", CARD_SEC: "31", CARD_RATE: "0.1", CHECK_RATE: "0.5", USE_YN: "1"},
		{ID: 5, P_COMCD: "TOSS", P_TYPE: "CARD", METHOD_CD: "32", METHOD_NM: "하나", COMPANY_SEC: "", PG_VAN: "PG", CARD_SEC: "32", CARD_RATE: "0.1", CHECK_RATE: "0.5", USE_YN: "1"},
		{ID: 6, P_COMCD: "TOSS", P_TYPE: "CARD", METHOD_CD: "33", METHOD_NM: "우리(구.평화VISA)", COMPANY_SEC: "", PG_VAN: "PG", CARD_SEC: "33", CARD_RATE: "0.1", CHECK_RATE: "0.5", USE_YN: "1"},
		{ID: 7, P_COMCD: "TOSS", P_TYPE: "CARD", METHOD_CD: "34", METHOD_NM: "수협", COMPANY_SEC: "", PG_VAN: "PG", CARD_SEC: "34", CARD_RATE: "0.1", CHECK_RATE: "0.5", USE_YN: "1"},
		{ID: 8, P_COMCD: "TOSS", P_TYPE: "CARD", METHOD_CD: "35", METHOD_NM: "전북", COMPANY_SEC: "", PG_VAN: "PG", CARD_SEC: "35", CARD_RATE: "0.1", CHECK_RATE: "0.5", USE_YN: "1"},
		{ID: 9, P_COMCD: "TOSS", P_TYPE: "CARD", METHOD_CD: "36", METHOD_NM: "씨티", COMPANY_SEC: "", PG_VAN: "PG", CARD_SEC: "36", CARD_RATE: "0.1", CHECK_RATE: "0.5", USE_YN: "1"},
	];
	
	return dataList;
}


function createPayMethodDetailForm() {
	var payMethodDetailItems = "";
	
	payMethodDetailItems = [
		{colSpan: 1, dataField: "P_COMCD", label: {text: "결제대행사"}, editorType: "dxSelectBox",
			editorOptions: {dataSource: pcomcd_gbn,
				layout: "horizontal", valueExpr: "id", displayExpr: "text",
				onInitialized: function (e) {
					debugger;
					if(editmode == "update" && $("#gridList").dxDataGrid("instance").getSelectedRowsData()[0] != undefined)
						e.component.option("value", $("#gridList").dxDataGrid("instance").getSelectedRowsData()[0].P_COMCD);
					else
						e.component.option("value", e.component.option("dataSource")[0].value);
				}
			},
			validationRules: [{
	        	type: 'required',
	        	message: '결제대행사 필수',
	    	}],
		},
		{colSpan: 1, dataField: "P_TYPE", editorType: "dxTextBox", label: {text: "결제수단구분"}, editorType: "dxSelectBox",
			editorOptions: {dataSource: ptype_gbn,
				layout: "horizontal", valueExpr: "id", displayExpr: "text",
				onInitialized: function (e) {
					if(editmode == "update" && $("#gridList").dxDataGrid("instance").getSelectedRowsData()[0] != undefined)
						e.component.option("value", $("#gridList").dxDataGrid("instance").getSelectedRowsData()[0].P_TYPE);
					else
						e.component.option("value", e.component.option("dataSource")[0].value);
				}
			},
			validationRules: [{
	        	type: 'required',
	        	message: '결제수단구분 필수',
	    	}],
	    },
		{colSpan: 1, dataField: "METHOD_CD", label: {text: "결제수단코드"}, editorOptions:{disabled: true}  },
		{colSpan: 1 ,dataField: "METHOD_NM", label: {text: "결제수단명"},
			validationRules: [{
	        	type: 'required',
	        	message: '결제수단명 필수',
	    	}],
	    },
	    {colSpan: 1, dataField: "COMPANY_SEC", label: {text: "카드사"}, editorType: "dxSelectBox",
			editorOptions: {dataSource: cardcp_gbn,
				layout: "horizontal", valueExpr: "id", displayExpr: "text",
				onInitialized: function (e) {
					if(editmode == "update" && $("#gridList").dxDataGrid("instance").getSelectedRowsData()[0] != undefined)
						e.component.option("value", $("#gridList").dxDataGrid("instance").getSelectedRowsData()[0].COMPANY_SEC);
					else
						e.component.option("value", e.component.option("dataSource")[0].value);
				}
			}
	    },
	    {colSpan: 1, dataField: "PG_VAN",  label: {text: "PG/VAN 구분"}, editorType: "dxSelectBox",
			editorOptions: {dataSource: [{id:"PG", text: "PG"},{ id:"VAN", text:"VAN"}],
				layout: "horizontal", valueExpr: "id", displayExpr: "text",
				onInitialized: function (e) {
					if(editmode == "update" && $("#gridList").dxDataGrid("instance").getSelectedRowsData()[0] != undefined)
						e.component.option("value", $("#gridList").dxDataGrid("instance").getSelectedRowsData()[0].PG_VAN);
					else
						e.component.option("value", e.component.option("dataSource")[0].value);
				}
			}
	    },
		{colSpan: 1, dataField: "CARD_RATE", label: {text: "카드수수료율"},
			validationRules: [{
		        	type: 'required',
		        	message: '카드수수료율 필수',
	    		},
	    		{
	    	        type: 'pattern',
	    	        message: '소수점 두자리수',
	    	        pattern:  /^[0-9]{1,3}(\.)[0-9]{1,2}$/,
	    	    }
			],
	    },
		{colSpan: 1, dataField: "CHECK_RATE", label: {text: "체크카드수수료율"},
			validationRules: [{
		        	type: 'required',
		        	message: '체크카드수수료율 필수',
	    		},
	    		{
	    	        type: 'pattern',
	    	        message: '소수점 두자리수',
	    	        pattern:  /^[0-9]{1,3}(\.)[0-9]{1,2}$/,
	    	    }
	    	],
	    },
	    {colSpan: 1, dataField: "USE_YN", editorType: "dxTextBox", label: {text: "사용여부"}, editorType: "dxSelectBox",
			editorOptions: {dataSource: use_gbn,
				layout: "horizontal", valueExpr: "value", displayExpr: "text",
				onInitialized: function (e) {
					if(editmode == "update" && $("#gridList").dxDataGrid("instance").getSelectedRowsData()[0] != undefined)
						e.component.option("value", $("#gridList").dxDataGrid("instance").getSelectedRowsData()[0].USE_YN);
					else
						e.component.option("value", e.component.option("dataSource")[0].value);
				}
			},
			validationRules: [{
	        	type: 'required',
	        	message: '결제수단구분 필수',
	    	}],
	    },
	]

	return payMethodDetailItems;
}


//신규 버튼
function createPayMethod(){
	gridPayMethod.option("editing.mode", "popup");
	
	
	gridPayMethod.addRow();
	gridPayMethod.deselectAll();
}
//수정 버튼
function updatePayMethod(){
	let key = gridPayMethod.option("focusedRowKey");
	if (!key) return;
	gridPayMethod.option("editing.mode", "popup");
	editmode='update';
	
	var idx = gridPayMethod.getRowIndexByKey(key);
	gridPayMethod.editRow(idx);
	gridPayMethod.deselectAll();
}
//삭제 버튼
function deletePayMethod(){
	let key = gridPayMethod.option("focusedRowKey");
	if (!key) return;
	
	showConfirm('삭제하시겠습니까?', "결제수단 삭제", 
		function(){
			var selectedRow = _.where(gridPayMethod.getDataSource().items(), {ID:key});
			var resultDs = dsRemove(gridPayMethod.getDataSource(), selectedRow, "ID");
			gridPayMethod.option({"dataSource":resultDs, "focusedRowIndex":0});
		}
	);
}

//엑셀버튼
function exportPayMethod() {
    const dataGrid1 = $('#gridList').dxDataGrid('instance');

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Main sheet');

    DevExpress.excelExporter.exportDataGrid({
        worksheet: worksheet,
        component: dataGrid1
    }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer) {
            saveAs(new Blob([buffer], {
                type: 'application/octet-stream'
            }), '결제수단관리.xlsx');
        });
    });
}

