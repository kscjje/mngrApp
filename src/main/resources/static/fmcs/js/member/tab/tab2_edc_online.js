function createTab2Init() {
	$(".tab-contents > div").hide();
	$("#tab2").show();	
	$("#tab2 .tab2_2").hide();
	$("#tab2 .tab2_1").show();
	
	$("#tab2 .tab2_1 .btn-top-area > div").eq(0).dxButton({
		stylingMode: 'contained',
		text: '강좌신청',
		type: 'default',
		onClick() {
			DevExpress.ui.notify('The Contained button was clicked');
		},
	});
	
	$("#tab2 .tab2_1 .btn-top-area > div").eq(1).dxButton({
		stylingMode: 'contained',
		text: '결제하기',
		type: 'default',
		onClick() {
			DevExpress.ui.notify('The Contained button was clicked');
		},
	});
	
	var columnlist = getTab2_1ColumnList();
	//var lectureList = getList();
	
	var lectureList = lecListJoin.filter(function(item1, idx1) {
		return lecListJoin.findIndex(function(item2, idx2) {
			return item1.APP_NO == item2.APP_NO;
		}) == idx1;
	});
	
	$('#tab2 .tab2_1 .gridContainer').dxDataGrid({
		dataSource: lectureList,
		keyExpr: "APP_NO",
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

function getTab2_1ColumnList() {
	var resultColumn = {};
	
	resultColumn = [{
		dataField: 'APP_NO',
		width: 80,
		caption: '접수번호',	
	}, {
		dataField: 'APP_TYPE',
		width: 80,
		caption: '접수구분',			
	}, {
		dataField: 'APP_REG_DT',
		width: 140,
		caption: '접수일시',	
	}, {
		dataField: 'APP_STATUS',
		width: 80,
		caption: '접수상태',			
	}, {
		dataField: 'APP_CONF_DT',
		width: 140,
		caption: '승인일시',		
	}, {
		dataField: 'LEC_NAME',
		caption: '강좌명',
	}, {
		dataField: 'LEC_START_DT',
		width: 80,
		caption: '이용시작일',
	}, {
		dataField: 'LEC_END_DT',
		width: 80,
		caption: '이용종료일',		
	}, {
		dataField: 'PROG_NAME',
		caption: '프로그램명',			
	}, {
		dataField: 'PROG_PRICE',
		width: 80,
		caption: '판매금액',
	}];
	
	resultColumn = setColumnAlignment(resultColumn);
	return resultColumn;
}	

function createTab2_2Init() {
	$(".tab-contents > div").hide();
	$("#tab2").show();
	$("#tab2 .tab2_1").hide();
	$("#tab2 .tab2_2").show();
	
	$("#tab2 .tab2_2 .btn-top-area > div").eq(0).dxButton({
		stylingMode: 'contained',
		text: '대기신청',
		type: 'default',
		onClick() {
			createLockerWaitPopup('#userPopup');
		},
	});
	
	$("#tab2 .tab2_2 .btn-top-area > div").eq(1).dxButton({
		stylingMode: 'contained',
		text: '결제하기',
		type: 'default',
		onClick() {
			DevExpress.ui.notify('The Contained button was clicked');
		},
	});
	
	var columnlist = getTab2_2ColumnList();
	//var lectureList = getList();
	
	var lectureList = lckListJoin.filter(function(item1, idx1) {
		return lckListJoin.findIndex(function(item2, idx2) {
			return item1.APP_NO == item2.APP_NO;
		}) == idx1;
	});
	
	$('#tab2 .tab2_2 .gridContainer').dxDataGrid({
		dataSource: lectureList,
		keyExpr: "APP_NO",
		allowColumnReordering: true,
		allowColumnResizing: true,
		showBorders: true,
		showRowLines: true,
		columnFixing: {enabled: true},
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

function getTab2_2ColumnList() {
	var resultColumn = {};
	
	resultColumn = [{
		dataField: 'APP_NO',
		width: 80,
		caption: '대기순번',	
	}, {
		dataField: 'LCK_APP_STATUS',
		width: 80,
		caption: '상태',		
	}, {
		dataField: 'APP_CONF_DT',
		width: 140,
		caption: '승인일시',						
	}, {
		dataField: 'LCK_APP_TYPE',
		width: 80,
		caption: '접수구분',
	}, {
		dataField: 'LCK_PLACE',
		width: 150,
		caption: '사물함위치',	
	}, {
		dataField: 'LCK_NO',
		width: 80,
		caption: '사물함번호',		
	}, {
		dataField: 'LCK_FLOOR',
		width: 80,
		caption: '단구분',
	}, {
		dataField: 'LCK_SIZE',
		width: 80,
		caption: '크기',	
	}, {
		dataField: 'LCK_USE_MONTH',
		width: 80,
		caption: '이용개월수',		
	}, {								
		dataField: 'LCK_START_DT',
		width: 80,
		caption: '임대시작일',
	}, {
		dataField: 'LCK_END_DT',
		width: 80,
		caption: '임대종료일',			
	}, {
		dataField: 'LCK_PRICE',
		width: 80,
		caption: '임대료',
	}, {
		dataField: 'LCK_APP_DESC',
		caption: '비고',		
	}];
	
	resultColumn = setColumnAlignment(resultColumn);
	return resultColumn;
}	

