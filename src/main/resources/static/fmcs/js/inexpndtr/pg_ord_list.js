function formInit() {
	createTab();
	
	createCardTab();
}

function createTab() {
	const longtabs = [
		{ 
			id: 'card',
			text: '신용거래현황',
		}, { 
			id: 'cash',
			text: '현금승인현황',
		},
	];
		
	$('.tabs-container').dxTabs({
		dataSource: longtabs,
		scrollByContent: false,
		showNavButtons: true,
		onItemClick(e) {
			switch(e.itemData.id) {
				case 'card' :
					createCardTab();
					break;
				case 'cash' :
					createCashTab();
					break;
			}			
		},
		selectedIndex: 0,
	});
}

function createCardTab() {
	$(".tab-contents > div").hide();
	$("#card").show();
	
	createCardCondition();
	createCardDataGrid();
	createCardSummaryForm();
}

function createCashTab() {
	$(".tab-contents > div").hide();
	$("#cash").show();
	
	createCashCondition();
	createCashDataGrid();
}

function createCardCondition() {
	let colCondition = [];
	colCondition.push({dataField: 'DATE_TYPE', label: {visible:false}, editorType:"dxSelectBox", editorOptions: {
		dataSource: new DevExpress.data.ArrayStore({
			data: dateType,
			key: 'ID',
		}),
		displayExpr: 'NAME',
		valueExpr: 'ID',
		value: '1',
		searchEnabled: true,
	}});	
	colCondition.push({dataField: 'REG_START_DT', label: {visible:false}, editorType:"dxDateBox",});
	colCondition.push({dataField: 'REG_END_DT', label: {text: '~',}, editorType:"dxDateBox",});
	colCondition.push({dataField: 'CARD_TYPE', label: {visible:false}, editorType:"dxSelectBox", editorOptions: {
		dataSource: new DevExpress.data.ArrayStore({
			data: cardType,
			key: 'ID',
		}),
		displayExpr: 'NAME',
		valueExpr: 'ID',
		value: '',
		searchEnabled: true,
	}});	
	
	colCondition.push({dataField: 'CORP_TYPE', label: {text: '카드종류'}, editorType:"dxTagBox", editorOptions: {
		dataSource: new DevExpress.data.ArrayStore({
			data: corpType,
			key: 'ID',
		}),
		displayExpr: 'NAME',
		valueExpr: 'ID',
	}});
	colCondition.push({dataField: 'CARD_NO', label: {text: '카드번호'}});
	colCondition.push({dataField: 'REQ_NO', label: {text: '승인번호'}});
	colCondition.push({dataField: 'PUB_YN', label: {visible:false}, editorType:"dxSelectBox", editorOptions: {
		dataSource: new DevExpress.data.ArrayStore({
			data: pubYn,
			key: 'ID',
		}),
		displayExpr: 'NAME',
		valueExpr: 'ID',
		value: '',
		searchEnabled: true,
	}});
	
	colCondition.push({colSpan:1, dataField: 'MERT_TYPE', label: {text:'수납자'}, editorType:"dxTagBox", editorOptions: {
		dataSource: new DevExpress.data.ArrayStore({
			data: [{ID:'admin',NAME:'관리자'}, {ID:'hong',NAME:'홍길동'}],
			key: 'ID',
		}),
		displayExpr: 'NAME',
		valueExpr: 'ID',
	}});	
	colCondition.push(...createCommonUserSearchItem("#userPopup", "#card .form-group.condition"));
	
	colCondition.push({dataField: 'MERT_TYPE', label: {text:'상점ID'}, editorType:"dxSelectBox", editorOptions: {
		dataSource: new DevExpress.data.ArrayStore({
			data: mertType,
			key: 'ID',
		}),
		displayExpr: 'NAME',
		valueExpr: 'ID',
		value: '',
		searchEnabled: true,
	}});	
	colCondition.push({dataField: 'MERT_TYPE', label: {visible:false,}, editorType:"dxSelectBox", editorOptions: {
		dataSource: new DevExpress.data.ArrayStore({
			data: onlineType,
			key: 'ID',
		}),
		displayExpr: 'NAME',
		valueExpr: 'ID',
		value: '',
		searchEnabled: true,
	}});	

	
	$('#card .form-group.condition').dxForm({
	    colCount: 4,
	    showColonAfterLabel: false,
	    items: colCondition,
        alignItemLabels: true,
	});  
	
	$('#card .searchBtn').dxButton({
		stylingMode: 'contained',
		icon: 'find',
		type: 'default',
		onClick() {
		},
	});
	$('#card .btnRefresh').dxButton({
		stylingMode: 'contained',
		icon:'clear',
		type: 'default',
		elementAttr: {
			class: "btnRefresh"
		},
		onClick() {
		},
	});	
	
	$('#card .form-group.condition').dxForm("instance").repaint();
}

function createCashCondition() {
	let colCondition = [];
	
	colCondition.push({dataField: 'REG_START_DT', label: {text: '승인기간',}, editorType:"dxDateBox",});
	colCondition.push({dataField: 'REG_END_DT', label: {text: '~',}, editorType:"dxDateBox",});
	colCondition.push({dataField: 'REQ_NO', label: {text: '승인번호'}});
	colCondition.push(...createCommonUserSearchItem("#userPopup", "#card .form-group.condition"));
	
	$('#cash .form-group.condition').dxForm({
	    colCount: 4,
	    showColonAfterLabel: false,
	    items: colCondition,
        alignItemLabels: true,
	});  
	
	$('#cash .searchBtn').dxButton({
		stylingMode: 'contained',
		icon: 'find',
		type: 'default',
		onClick() {
		},
	});
	$('#cash .btnRefresh').dxButton({
		stylingMode: 'contained',
		icon:'clear',
		type: 'default',
		elementAttr: {
			class: "btnRefresh"
		},
		onClick() {
		},
	});	
	
	$('#cash .form-group.condition').dxForm("instance").repaint();
}

function createCardDataGrid() {
	var lectureList = lecListJoin.filter(function(item1, idx1) {
		return lecListJoin.findIndex(function(item2, idx2) {
			return item1.USER_NO == item2.USER_NO;
		}) == idx1;
	});
	
	$('#card .gridContainer').dxDataGrid({
		dataSource: lectureList,
		keyExpr: "USER_NO",
		allowColumnReordering: true,
		allowColumnResizing: true,
		showBorders: true,
		showRowLines: true,
		//columnFixing: {enabled: true},
		loadPanel: {enabled: false},
		scrolling: {mode: "infinite"},
		export: {enabled: true},
		columnChooser: {enabled: true},
		columns: getCardColumnList(),
		focusedRowEnabled: true,
	    //selection: {mode: 'multiple',showCheckBoxesMode:'always'},	
		paging: {
			pageSize: 20,
		},
		pager: {
			visible: true,
		    showInfo: true,
		    infoText: "총 {2}건   {0}/{1}",
		    showNavigationButtons: true,
		},		   		
	});	
}

function createCashDataGrid() {
	var lectureList = lecListJoin.filter(function(item1, idx1) {
		return lecListJoin.findIndex(function(item2, idx2) {
			return item1.USER_NO == item2.USER_NO;
		}) == idx1;
	});
	
	$('#cash .gridContainer').dxDataGrid({
		dataSource: lectureList,
		keyExpr: "USER_NO",
		allowColumnReordering: true,
		allowColumnResizing: true,
		showBorders: true,
		showRowLines: true,
		//columnFixing: {enabled: true},
		loadPanel: {enabled: false},
		scrolling: {mode: "infinite"},
		export: {enabled: true},
		columnChooser: {enabled: true},
		columns: getCashColumnList(),
		focusedRowEnabled: true,
	    //selection: {mode: 'multiple',showCheckBoxesMode:'always'},	
		paging: {
			pageSize: 20,
		},
		pager: {
			visible: true,
		    showInfo: true,
		    infoText: "총 {2}건   {0}/{1}",
		    showNavigationButtons: true,
		},		   		
	});	
}

function getCardColumnList() {
	var resultColumn = {};
	
	resultColumn = [{
		dataField: 'USER_NO',
		visible:false,
		caption: '번호',
	}, {
		dataField: 'PAY_REG_DT',
		width: 110,
		caption: '거래일자',
	}, {
		dataField: 'USER_NO',
		width: 90,
		caption: '회원번호',
	}, {
		dataField: 'USER_NAME',
		width: 110,
		caption: '회원명',	
	}, {
		dataField: 'PAY_NO',
		width: 100,
		caption: '승인번호',			
	}, {
		dataField: 'PAY_TYPE',
		width: 90,
		caption: '승인구분',			
	}, {			
		dataField: 'SLIP_YN',
		width: 100,
		caption: '전표입력여부',
	}, {
		dataField: 'CORP_TYPE',
		width: 80,
		caption: '카드종류',
	}, {
		dataField: 'USER_CAR_NO',
		width: 150,
		caption: '카드번호',
	}, {
		dataField: 'PROG_PRICE',
		width: 110,
		caption: '승인금액',
	}, {
		dataField: 'ORG_DE',
		width: 90,
		caption: '원거래일',
	}, {		
		dataField: 'ONLINE_YN',
		width: 80,
		caption: '온라인구분',	
	}, {		
		dataField: 'PAY_TYPE',
		width: 80,
		caption: '결제방법',	
	}, {		
		dataField: 'REG_DE',
		width: 130,
		caption: '등록일시',	
	}, {		
		dataField: 'MOD_DE',
		width: 130,
		caption: '변경일시',
	}, {		
		dataField: 'CATE_ID',
		width: 150,
		caption: '운영상품분류',
	}, {		
		dataField: 'OID',
		width: 120,
		caption: 'OID',	
	}, {		
		dataField: 'USER_NAME',
		width: 90,
		caption: '실수강회원',	
	}, {		
		dataField: 'USER_TYPE',
		width: 90,
		caption: '수납자',			
	}];
	
	resultColumn = setColumnAlignment(resultColumn);
	return resultColumn;
}

function getCashColumnList() {
	var resultColumn = {};
	
	resultColumn = [{
		dataField: 'USER_NO',
		visible:false,
		caption: '번호',
	}, {
		dataField: 'PAY_REG_DT',
		width: 110,
		caption: '승인일자',
	}, {
		dataField: 'USER_NO',
		width: 90,
		caption: '회원번호',
	}, {
		dataField: 'USER_NAME',
		width: 110,
		caption: '회원명',	
	}, {
		dataField: 'USER_HP',
		width: 110,
		caption: '휴대전화',			
	}, {
		dataField: 'PAY_NO',
		width: 110,
		caption: '승인번호',			
	}, {
		dataField: 'CORP_TYPE',
		width: 90,
		caption: '증빙구분',
	}, {
		dataField: 'PAY_TYPE',
		width: 90,
		caption: '승인구분',		
	}, {
		dataField: 'PROG_PRICE',
		width: 110,
		caption: '승인금액',
	}, {		
		dataField: 'CATE_ID',
		caption: '운영상품분류',
	}, {		
		dataField: 'OID',
		caption: '요금명',	
	}, {		
		dataField: 'USER_NAME',
		width: 90,
		caption: '실수강회원',	
	}, {		
		dataField: 'USER_TYPE',
		width: 90,
		caption: '수납자',			
	}];
	
	resultColumn = setColumnAlignment(resultColumn);
	return resultColumn;
}

function createCardSummaryForm() {
	let colCondition = [];
	colCondition.push({dataField: 'PAY_CNT', label: {text: '승인건수'}, editorType:"dxNumberBox", editorOptions:{
		format: "#,##0 건",
	},});
	colCondition.push({dataField: 'CANCEL_CNT', label: {text: '취소건수'}, editorType:"dxNumberBox", editorOptions:{
		format: "#,##0 건",
	},});
	colCondition.push({dataField: 'TOT_CNT', label: {text: '총건수'}, editorType:"dxNumberBox", editorOptions:{
		format: "#,##0 건",
	},});
	
	colCondition.push({dataField: 'PAY_PRICE', label: {text: '승인금액'}, editorType:"dxNumberBox", editorOptions:{
		format: "#,##0 원",
	},});
	colCondition.push({dataField: 'CANCEL_PRICE', label: {text: '취소금액'}, editorType:"dxNumberBox", editorOptions:{
		format: "#,##0 원",
	},});
	colCondition.push({dataField: 'SUM_PRICE', label: {text: '합계금액'}, editorType:"dxNumberBox", editorOptions:{
		format: "#,##0 원",
	},});
	
	$('#card .summaryContainer').dxForm({
	    colCount: 3,
	    showColonAfterLabel: false,
	    items: colCondition,
        alignItemLabels: true,
        readOnly: true,
	});  
	
	$('#card .summaryContainer').dxForm("instance").repaint();
}


