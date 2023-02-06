var frmCondition = {};
var gridInstance = null;


function formInit() {
	// 조건 생성
	createCondition();
	
	// 그리드 생성
	createDataGrid();
}

function createCondition() {
	var colCondition = [];
	colCondition.push({dataField: 'SEARCH_TYPE', label: {visible:false}, editorType:"dxSelectBox", editorOptions: {
	    dataSource: new DevExpress.data.ArrayStore({
	        data: searchType,
	        key: 'ID',
	    }),
	    displayExpr: 'NAME',
	    valueExpr: 'ID',
	    value: 'T',
      }
	});	
	colCondition.push({colSpan:2,dataField: 'SEARCH_KEYWORD', label: {visible:false}, editorOptions:{ 
			placeholder: '검색할 내용을 입력해주세요',
		}
	});
	
	colCondition.push({dataField: 'DEL_YN', label: {text: '삭제글 보기',}, editorType:"dxCheckBox",
		editorOptions: {value: false},
	});
	
	
	$('.form-group.condition').dxForm({
	    colCount: 6,
	    showColonAfterLabel: false,
	    items: colCondition,
        alignItemLabels: true,
	});  
	
	$('#searchBtn').dxButton({
		stylingMode: 'contained',
		icon: 'find',
		type: 'default',
		onClick() {
		},
	});
	$('#searchInitBtn').dxButton({
		stylingMode: 'contained',
		icon:'clear',
		type: 'default',
		elementAttr: {
			class: "btnRefresh"
		},
		onClick() {
		},
	});		
}

function createDataGrid() {
	var columnlist = getColumnList();
	
	var termsList = termsListJoin.filter(function(item1, idx1) {
		return termsListJoin.findIndex(function(item2, idx2) {
			return item1.TERMS_NO == item2.TERMS_NO;
		}) == idx1;
	});
	
	gridInstance = $('.gridContainer').dxDataGrid({
		dataSource: termsList,
		keyExpr: "TERMS_NO",
		allowColumnReordering: true,
		allowColumnResizing: true,
		showBorders: true,
		showRowLines: true,
		//columnFixing: {enabled: true},
		loadPanel: {enabled: false},
		scrolling: {mode: "infinite"},
		export: {enabled: true},
		onExporting(e) {
			const workbook = new ExcelJS.Workbook();
			const worksheet = workbook.addWorksheet('Employees');

			DevExpress.excelExporter.exportDataGrid({
				component: e.component,
				worksheet,
				autoFilterEnabled: true,
			}).then(() => {
				workbook.xlsx.writeBuffer().then((buffer) => {
					saveAs(new Blob([buffer], { type: 'application/octet-stream' }), '약관정보관리.xlsx');
				});
			});
			e.cancel = true;
		},
		columnChooser: {enabled: true},
		columns: columnlist,
		paging: {
			pageSize: 1,
		},
		pager: {
			visible: true,
		    showInfo: true,
		    infoText: "총 {2}건   {0}/{1}",
		    showNavigationButtons: true,
		},
		focusedRowEnabled: true,
		editing: {
		      mode: 'popup',
		      popup: {
		            title: '약관정보 관리',
		            showTitle: true,
		            width: 1200,
		            height: 900,
		            onShown:function(){
		            	var frmInstance = $("#editBbs").dxForm("instance");
	       	        	frmInstance.validate();
	       	        	//editorInit();
		            },
		            onHiding:function(){
		            }
		      },
		      form: {
		    	  showColonAfterLabel: false,
		    	  elementAttr: {id: "editBbs"},
		          items: getBoardItems(),
		          colCount: 4,
		      },
		},
		onRowDblClick(e) {
			detailTerms();
		},
    	onEditingStart: function(e){
    		gridInstance.option("editing.popup.title", "약관정보 수정");
    	},
    	onInitNewRow: function(e){
    		gridInstance.option("editing.popup.title", "약관정보 등록");
    	}
	}).dxDataGrid('instance');
}


function getBoardItems() {	
	var colCondition = [];
	
	colCondition.push({colSpan:4, dataField: 'TERMS_SJ', label: {text: '제목',},editorType: 'dxTextBox'});
	colCondition.push({colSpan:4, dataField: 'TERMS_VERSION', label: {text: '버전',},editorType: 'dxTextBox'});
	colCondition.push({colSpan:4, dataField: 'TERMS_CN', label: {text: '내용',},editorType: 'dxTextArea',
		editorOptions: { height: 430, inputAttr: {class: "txtEditor"}},
	});
	
	colCondition.push({dataField: 'USE_YN', label: {text: '사용여부'}, editorType:"dxSelectBox",
		editorOptions:{
		    valueExpr: 'ID',
		    displayExpr: 'NAME',
		    layout: "horizontal",
		    dataSource: useType,
    		value: '1', 		
		}, 
	});	
	
	return colCondition;
}

//상세 보기
function detailTerms(){
	let key = gridInstance.option("focusedRowKey");
	if (!key) return;
	
	let idx = gridInstance.getRowIndexByKey(key);
	let rowData = gridInstance.getDataSource().items()[idx];
	createTermsDetailPopup("#userPopup", rowData);
}


//신규 버튼
function createBbs(){
	gridInstance.addRow();
	gridInstance.deselectAll();
}
//수정 버튼
function updateBbs(){
	let key = gridInstance.option("focusedRowKey");
	if (!key) return;
	
	var idx = gridInstance.getRowIndexByKey(key);
	gridInstance.editRow(idx);
	gridInstance.deselectAll();
}
//삭제 버튼
function deleteBbs(){
	let key = gridInstance.option("focusedRowKey");
	if (!key) return;
	
	showConfirm('삭제하시겠습니까?', "약관정보 삭제", 
		function(){
			var selectedRow = _.where(gridInstance.getDataSource().items(), {TERMS_NO:key});
			var resultDs = dsRemove(gridInstance.getDataSource(), selectedRow, "TERMS_NO");
			gridInstance.option({"dataSource":resultDs, "focusedRowIndex":0});
		}
	);
}


function getColumnList() {
	var resultColumn = [];
	
	resultColumn = [{
		dataField: 'RNUM',
		width: 90,
		caption: '번호',
		dataType: 'number',
	},{
		dataField: 'TERMS_NO',
		width: 90,
		caption: '약관코드',
	}, {
		dataField: 'TERMS_SJ',
		caption: '제목',
		cellTemplate: function(element, options) {
			$('<a>' + options.value + '</a>')
       			.attr("href", "javascript:detailTerms();")
       			.appendTo(element);		
		}		
	}, {
		dataField: 'TERMS_VERSION',
		width: 120,
		caption: '버전',
		
	}, {
		dataField: 'USE_YN',
		caption: '사용여부',
		width: 120,
		lookup: {dataSource: use_gbn, displayExpr: "text", valueExpr: "value"}		
	}, {
		dataField: 'FRST_REGISTER_ID',
		width: 120,
		caption: '작성자',
	}, {
		dataField: 'FRST_REGIST_PNTTM',
		width: 130,
		caption: '작성일시',	
	},{
		dataField: 'LAST_UPDUSR_ID',
		width: 120,
		caption: '수정자',
	}, {
		dataField: 'LAST_UPDT_PNTTM',
		width: 130,
		caption: '수정일시',			
	}];		
	

	resultColumn = setColumnAlignment(resultColumn);
	return resultColumn;
}	

