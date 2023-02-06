function createTab6Init() {
	$(".tab-contents > div").hide();
	$("#tab6").show();
	
	var columnlist = getTab6ColumnList();
	//var lectureList = getList();
	
	var lectureList = facilList;
	
	$('#tab6 .gridContainer').dxDataGrid({
		dataSource: lectureList,
		keyExpr: "FAC_SEQ",
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

function getTab6ColumnList() {
	var resultColumn = {};
	
	resultColumn = [{
		dataField: 'FAC_SEQ',
		width: 80,
		caption: '번호',
	}, {
		dataField: 'FAC_APP_REG_DT',
		width: 130,
		caption: '신청일시',
	}, {
		dataField: 'FAC_START_DT',
		width: 90,
		caption: '시작일자',		
	}, {							
		dataField: 'FAC_END_DT',
		width: 90,
		caption: '종료일자',
	}, {
		dataField: 'FAC_TEAM_NAME',
		caption: '단체명',		
	}, {
		dataField: 'FAC_PLACE',
		caption: '장소명',			
	}, {
		dataField: 'FAC_PROG_NAME',
		caption: '요금명',
	}, {
		dataField: 'FAC_PROG_PRICE',
		width: 90,
		caption: '판매금액',		
	}, {
		dataField: 'FAC_DUE_DT',
		width: 90,
		caption: '결제예정일',	
	}, {
		dataField: 'FAC_PAY_DT',
		width: 90,
		caption: '결제일자',	
	}, {
		dataField: 'FAC_PAY_STATUS',
		width: 110,
		caption: '결제구분',							
	}];
	
	resultColumn = setColumnAlignment(resultColumn);
	return resultColumn;
}	
