function createTab5Init() {
	$(".tab-contents > div").hide();
	$("#tab5").show();
	
	var columnlist = getTab5ColumnList();
	//var lectureList = getList();
	
	var lectureList = lecListJoin.filter(function(item1, idx1) {
		return lecListJoin.findIndex(function(item2, idx2) {
			return item1.LEC_SEQ == item2.LEC_SEQ;
		}) == idx1;
	});
	
	$('#tab5 .gridContainer').dxDataGrid({
		dataSource: lectureList,
		keyExpr: "LEC_SEQ",
		allowColumnReordering: true,
		allowColumnResizing: true,
		showBorders: true,
		showRowLines: true,
		//columnFixing: {enabled: true},
		loadPanel: {enabled: false},
		scrolling: {mode: "infinite"},
		export: {enabled: true},
		columnChooser: {enabled: true},
		columns: columnlist,
		focusedRowEnabled: true,
	    //selection: {mode: 'multiple'},	
	    onToolbarPreparing(e) {
			const dataGrid = e.component;
			e.toolbarOptions.items.push({
				 location: 'after',
				 widget: 'dxButton',
				 options: {
					 	icon: 'fa fa-commenting-o',
					 	onClick() {
					 		gridEduPrg.refresh();
					 	},
				 },
			});
		},//ontoolbar	    		
	});
}

function getTab5ColumnList() {
	var resultColumn = {};
	
	resultColumn = [{
		dataField: 'LEC_SEQ',
		width: 80,
		caption: '번호',
	}, {
		dataField: 'LEC_NAME',
		caption: '강좌명',
	}, {
		dataField: 'DLY_START_DT',
		width: 90,
		caption: '연기시작일',		
	}, {							
		dataField: 'DLY_END_DT',
		width: 90,
		caption: '연기종료일',
	}, {
		dataField: 'APP_REG_DT',
		width: 140,
		caption: '처리일시',		
	}, {
		dataField: 'APP_REG_ADMIN_ID',
		width: 110,
		caption: '담당자',			
	}, {
		dataField: 'DLY_DESC',
		caption: '연기사유',
	}, {
		dataField: 'DLY_ETC',
		caption: '비고',	
	}];
	
	resultColumn = setColumnAlignment(resultColumn);
	return resultColumn;
}	
