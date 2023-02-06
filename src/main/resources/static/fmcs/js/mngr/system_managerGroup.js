// 시스템관리 > 권한그룹관리
// 권한그룹 등록/수정 팝업 FORM

var columnList = null;
var gridMngrGroup = null;
var editmode="new";




let resultList = new DevExpress.data.ArrayStore({
	key: "AUTHOR_CODE",
	data: mainListData()
});


function formInit() {
	
	// 그리드 생성
	createDataGrid();
}


function createDataGrid() {
	mainListColumn();
	
	
	//Main Grid
	gridMngrGroup = $("#gridList").dxDataGrid({
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
				title: "권한그룹관리",
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
			if(gridMngrGroup.option("editing.mode")=="popup"){
				gridMngrGroup.option("editing.popup.title", "권한그룹등록");
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
			if(gridMngrGroup.option("editing.mode")=="popup"){
				gridMngrGroup.option("editing.popup.title", "권한그룹수정");
			}
		},
		onRowPrepared(e){
		},
		onRowUpdated(e) {
	          //  alert('RowUpdated');
		},
		onEditCanceled() {
			gridMngrGroup.option("editing.mode", "popup");
		},
		onSaved() {
			gridMngrGroup.option("editing.mode", "popup");
		},
	    export: {
	        enabled: false,
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
		{dataField: "AUTHOR_CODE", width: 150, caption: "그룹코드",  alignment: "center"},
		{dataField: "AUTHOR_NM", width: 150, caption: "그룹명", alignment: "center"},
		{
	        dataField: 'BTN',
	        caption: '',
	        allowGrouping: false,
	        cellTemplate: btnCellTemplate,
	    },
	];
}

const btnCellTemplate = function (container, options) {
	 $("<div>")
		.append($("<input>", {type: "button", value:"메뉴관리", id:"menuBtn"+options.rowIndex, class: "dx-widget dx-button dx-button-mode-contained dx-button-success dx-button-has-text" }))
		.appendTo(container);
	 
	 $("#menuBtn"+options.rowIndex).click(function (){
		 location.href='/fmcs/mngr/mngGroupMenu';
	 })
};

function mainListData() {
	var dataList = "";
	
	dataList = [
		{AUTHOR_CODE: "ROLE_SUPER", AUTHOR_NM: "수퍼 관리자", AUTHOR_DC:"설명"},
		{AUTHOR_CODE: "ROLE_USER", AUTHOR_NM: "일반 사용자", AUTHOR_DC: "설명"},
	];
	
	return dataList;
}


function createPayMethodDetailForm() {
	var payMethodDetailItems = "";
	
	payMethodDetailItems = [
		{colSpan: 1, dataField: "AUTHOR_CODE", label: {text: "그룹코드"}, editorOptions:{disabled: true}  },
		{colSpan: 1, dataField: "AUTHOR_NM", label: {text: "그룹명"}  },
		{colSpan: 1, dataField: "AUTHOR_DC", label: {text: "설명"} },
	]

	return payMethodDetailItems;
}


//신규 버튼
function createPayMethod(){
	gridMngrGroup.option("editing.mode", "popup");
	
	
	gridMngrGroup.addRow();
	gridMngrGroup.deselectAll();
}
//수정 버튼
function updatePayMethod(){
	let key = gridMngrGroup.option("focusedRowKey");
	if (!key) return;
	gridMngrGroup.option("editing.mode", "popup");
	editmode='update';
	
	var idx = gridMngrGroup.getRowIndexByKey(key);
	gridMngrGroup.editRow(idx);
	gridMngrGroup.deselectAll();
}
//삭제 버튼
function deletePayMethod(){
	let key = gridMngrGroup.option("focusedRowKey");
	if (!key) return;
	
	showConfirm('삭제하시겠습니까?', "권한그룹 삭제", 
		function(){
			var selectedRow = _.where(gridMngrGroup.getDataSource().items(), {ID:key});
			var resultDs = dsRemove(gridMngrGroup.getDataSource(), selectedRow, "ID");
			gridMngrGroup.option({"dataSource":resultDs, "focusedRowIndex":0});
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
