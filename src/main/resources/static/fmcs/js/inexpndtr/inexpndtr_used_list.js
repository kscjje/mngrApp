function formInit() {
	createCondition();
	createTab();
	
	createPayTab();
}

function createTab() {
	const longtabs = [
		{ 
			id: 'pay',
			text: '수입금정산일지 I',
		}, { 
			id: 'income',
			text: '수입금정산일지 II',
		}, { 
			id: 'detail',
			text: '수입금정산세부현황',			
		},
	];
		
	$('.tabs-container').dxTabs({
		dataSource: longtabs,
		scrollByContent: false,
		showNavButtons: true,
		onItemClick(e) {
			switch(e.itemData.id) {
				case 'pay' :
					createPayTab();
					break;
				case 'income' :
					createIncomeTab();
					break;
				case 'detail' :
					createDetailTab();
					break;					
			}			
		},
		selectedIndex: 0,
	});
}

function createPayTab() {
	$(".tab-contents > div").hide();
	$("#pay").show();
	
	createDataGridPay();
}

function createIncomeTab() {
	$(".tab-contents > div").hide();
	$("#income").show();
	
	createDataGridIncome();
}

function createDetailTab() {
	$(".tab-contents > div").hide();
	$("#detail").show();
	
	createDataGridDetail();
}

function createCondition() {
	let colCondition = [];
	colCondition.push({colSpan:2, dataField: 'REG_START_DT', label: {text: '수입(환불)일자',}, editorType:"dxDateBox",});
	colCondition.push({colSpan:2, dataField: 'REG_END_DT', label: {text: '~',}, editorType:"dxDateBox",});
	
	colCondition.push({colSpan:3, dataField: 'CATE_TYPE', label: {text: '운영상품분류'}, editorType:"dxDropDownBox", editorOptions: {
		    value: ['0001'],
		    valueExpr: 'CTGCD',
		    displayExpr: 'CTGNM_DISP',
		    placeholder: '운영상품분류 선택',
		    showClearButton: true,
		    dataSource: new DevExpress.data.CustomStore({
				loadMode: 'raw',
				key: 'COMCD',
				load() {
					return classCategories;
				},
			}),
		    contentTemplate(e) {
		    	const v = e.component.option('value');
		    	const $treeView = $('<div>').dxTreeView({
		    		dataSource: e.component.getDataSource(),
		    		dataStructure: 'plain',
		    		keyExpr: 'CTGCD',
		    		parentIdExpr: 'PRNCTGCD',
		    		selectionMode: 'multiple',
		    		displayExpr: 'CTGNM_DISP',
		    		selectByClick: true,
		    		onContentReady(args) {
		    			syncTreeViewSelection(args.component, v);
		    		},
		    		selectNodesRecursive: true,
		    		showCheckBoxesMode: 'normal',
		    		onItemSelectionChanged(args) {
		    			const selectedKeys = args.component.getSelectedNodeKeys();
		    			e.component.option('value', selectedKeys);
		    		},
		    	});
		    	treeView = $treeView.dxTreeView('instance');
		    	e.component.on('valueChanged', (args) => {
		    		const { value } = args;
		    		syncTreeViewSelection(treeView, value);
		    	});
		    	return $treeView;
		    },
		}
	});
	
	colCondition.push({colSpan:2, dataField: 'MERT_TYPE', label: {visible:false,}, editorType:"dxSelectBox", editorOptions: {
		dataSource: new DevExpress.data.ArrayStore({
			data: onlineType2,
			key: 'ID',
		}),
		displayExpr: 'NAME',
		valueExpr: 'ID',
		value: '',
		searchEnabled: true,
	}});
	
	colCondition.push({colSpan:2, dataField: 'MERT_TYPE', label: {text:'수납자'}, editorType:"dxTagBox", editorOptions: {
		dataSource: new DevExpress.data.ArrayStore({
			data: [{ID:'admin',NAME:'관리자'}, {ID:'hong',NAME:'홍길동'}],
			key: 'ID',
		}),
		displayExpr: 'NAME',
		valueExpr: 'ID',
	}});

	
	$('.form-group.condition').dxForm({
	    colCount: 7,
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
	
	$('.form-group.condition').dxForm("instance").repaint();
}

function createDataGridPay() {
	var columnlist = getColumnPayList();
	//var lectureList = getList();
	
	var lectureList = lecListJoin.filter(function(item1, idx1) {
		return lecListJoin.findIndex(function(item2, idx2) {
			return item1.USER_NO == item2.USER_NO;
		}) == idx1;
	});
	
	$('#pay .gridContainer').dxDataGrid({
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
		columns: columnlist,
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

function createDataGridIncome() {
	var columnlist = getColumnIncomeList();
	//var lectureList = getList();
	
	var lectureList = lecListJoin.filter(function(item1, idx1) {
		return lecListJoin.findIndex(function(item2, idx2) {
			return item1.USER_NO == item2.USER_NO;
		}) == idx1;
	});
	
	$('#income .gridContainer').dxDataGrid({
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
		columns: columnlist,
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

function createDataGridDetail() {
	var columnlist = getColumnDetailList();
	//var lectureList = getList();
	
	var lectureList = lecListJoin.filter(function(item1, idx1) {
		return lecListJoin.findIndex(function(item2, idx2) {
			return item1.USER_NO == item2.USER_NO;
		}) == idx1;
	});
	
	$('#detail .gridContainer').dxDataGrid({
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
		columns: columnlist,
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

function getColumnPayList() {
	var resultColumn = {};
	
	resultColumn = [{
		dataField: 'USER_NO',
		visible: false,
		caption: '번호',
	}, {
		dataField: 'PROG_NAME',
		width: 180,
		caption: '요금명',
	}, {
		dataField: 'LEC_NAME',
		width: 180,
		caption: '강좌명',
	}, {
		caption: '무료',		
		columns: [
			{
				dataField: 'FREE_MEMBER',
				width: 90,
				caption: '인원',	
			},			
		]
	}, {
		caption: '현금수입내역',	
		columns: [
			{
				dataField: 'USER_NAME',
				width: 90,
				caption: '인원',	
			}, {
				dataField: 'USER_GENDER',
				width: 90,
				caption: '공급가액',			
			}, {
				dataField: 'USER_ID',
				width: 90,
				caption: '부가세',			
			}, {			
				dataField: 'USER_HP',
				width: 90,
				caption: '현금',
			},			
		],
	}, {
		caption: '카드수입내역',	
		columns: [
			{
				dataField: 'USER_NAME',
				width: 90,
				caption: '인원',	
			}, {
				dataField: 'USER_GENDER',
				width: 90,
				caption: '공급가액',			
			}, {
				dataField: 'USER_ID',
				width: 90,
				caption: '부가세',			
			}, {			
				dataField: 'USER_HP',
				width: 90,
				caption: '카드',
			},			
		],		
	}, {
		caption: '환불내역',	
		columns: [
			{
				dataField: 'USER_NAME',
				width: 90,
				caption: '인원',	
			}, {
				dataField: 'USER_GENDER',
				width: 90,
				caption: '공급가액',			
			}, {
				dataField: 'USER_ID',
				width: 90,
				caption: '부가세',			
			}, {			
				dataField: 'USER_HP',
				width: 90,
				caption: '환불금액',
			},				
		],
	}, {
		caption: '합계',	
		columns: [
			{		
				dataField: 'USER_REG_TYPE',
				width: 80,
				caption: '총인원',	
			}, {		
				dataField: 'USER_TYPE',
				width: 80,
				caption: '총계',	
			}, {		
				dataField: 'USER_TYPE',
				width: 80,
				caption: '부가세',	
			}, {		
				dataField: 'USER_TYPE',
				width: 80,
				caption: '할인금액',					
			}			
		],		
	}, ];
	
	resultColumn = setColumnAlignment(resultColumn);
	return resultColumn;
}

function getColumnIncomeList() {
	var resultColumn = {};
	
	resultColumn = [{
		dataField: 'USER_NO',
		visible: false,
		caption: '번호',
	}, {
		dataField: 'PROG_NAME',
		width: 180,
		caption: '요금명',
	}, {
		dataField: 'LEC_NAME',
		width: 180,
		caption: '강좌명',
	}, {
		caption: '수입내역',	
		columns: [
			{
				dataField: 'INCOME_CASH_CNT',
				width: 50,
				caption: '인원',	
			}, {
				dataField: 'INCOME_CASH_PRICE',
				width: 90,
				caption: '현금',			
			}, {
				dataField: 'INCOME_CARD_CNT',
				width: 50,
				caption: '인원',	
			}, {
				dataField: 'INCOME_CARD_PRICE',
				width: 90,
				caption: '카드',
			}, {
				dataField: 'INCOME_ACCT_CNT',
				width: 50,
				caption: '인원',	
			}, {
				dataField: 'INCOME_ACCT_PRICE',
				width: 90,
				caption: '이체',
			}, {
				dataField: 'INCOME_VT_CNT',
				width: 50,
				caption: '인원',	
			}, {
				dataField: 'INCOME_VT_CNT',
				width: 90,
				caption: '가상',			
			}, {
				dataField: 'INCOME_ZERO_CNT',
				width: 50,
				caption: '인원',	
			}, {
				dataField: 'INCOME_ZERO_PRICE',
				width: 90,
				caption: '제로',			
			}, {
				dataField: 'INCOME_SUM_CNT',
				width: 50,
				caption: '인원',	
			}, {
				dataField: 'INCOME_SUM_PRICE',
				width: 90,
				caption: '소계',				
			},			
		],
	}, {
		caption: '지출내역',	
		columns: [
			{
				dataField: 'SPEND_CASH_CNT',
				width: 50,
				caption: '인원',	
			}, {
				dataField: 'SPEND_CASH_PRICE',
				width: 90,
				caption: '현금',			
			}, {
				dataField: 'SPEND_CARD_CNT',
				width: 50,
				caption: '인원',	
			}, {
				dataField: 'SPEND_CARD_PRICE',
				width: 90,
				caption: '카드',
			}, {
				dataField: 'SPEND_ACCT_CNT',
				width: 50,
				caption: '인원',	
			}, {
				dataField: 'SPEND_ACCT_PRICE',
				width: 90,
				caption: '이체',
			}, {
				dataField: 'SPEND_VT_CNT',
				width: 50,
				caption: '인원',	
			}, {
				dataField: 'SPEND_VT_CNT',
				width: 90,
				caption: '가상',			
			}, {
				dataField: 'SPEND_ZERO_CNT',
				width: 50,
				caption: '인원',	
			}, {
				dataField: 'SPEND_ZERO_PRICE',
				width: 90,
				caption: '제로',			
			}, {
				dataField: 'SPEND_SUM_CNT',
				width: 50,
				caption: '인원',	
			}, {
				dataField: 'SPEND_SUM_PRICE',
				width: 90,
				caption: '소계',				
			},			
		],
	}, {
		caption: '합계내역',	
		columns: [
			{
				dataField: 'CASH_CNT',
				width: 50,
				caption: '인원',	
			}, {
				dataField: 'CASH_PRICE',
				width: 90,
				caption: '현금',			
			}, {
				dataField: 'CARD_CNT',
				width: 50,
				caption: '인원',	
			}, {
				dataField: 'CARD_PRICE',
				width: 90,
				caption: '카드',
			}, {
				dataField: 'ACCT_CNT',
				width: 50,
				caption: '인원',	
			}, {
				dataField: 'ACCT_PRICE',
				width: 90,
				caption: '이체',
			}, {
				dataField: 'VT_CNT',
				width: 50,
				caption: '인원',	
			}, {
				dataField: 'VT_CNT',
				width: 90,
				caption: '가상',			
			}, {
				dataField: 'ZERO_CNT',
				width: 50,
				caption: '인원',	
			}, {
				dataField: 'ZERO_PRICE',
				width: 90,
				caption: '제로',			
			}, {
				dataField: 'SUM_CNT',
				width: 50,
				caption: '인원',	
			}, {
				dataField: 'SUM_PRICE',
				width: 90,
				caption: '총계',				
			},			
		],	
	}, ];
	
	resultColumn = setColumnAlignment(resultColumn);
	return resultColumn;
}

function getColumnDetailList() {
	var resultColumn = {};
	
	resultColumn = [{
		dataField: 'PROG_NAME',
		width: 180,
		caption: '요금명',
	}, {
		dataField: 'LEC_NAME',
		width: 180,
		caption: '강좌명',
	}, {
		dataField: 'PAY_REG_DT',
		width: 90,
		caption: '결제일자',
	}, {
		dataField: 'USER_NO',
		width: 110,
		caption: '회원번호',
	}, {
		dataField: 'USER_NAME',
		width: 80,
		caption: '회원명',
	}, {
		dataField: 'USER_GENDER',
		width: 50,
		caption: '성별',
	}, {
		dataField: 'USER_BIRTH',
		width: 90,
		caption: '생년월일',
	}, {
		dataField: 'USER_HP',
		width: 100,
		caption: '휴대전화',	
	}, {
		dataField: 'LEC_START_DT',
		width: 90,
		caption: '유효시작일',	
	}, {
		dataField: 'LEC_END_DT',
		width: 90,
		caption: '유효종료일',			
	}, {
		caption: '수입내역',	
		columns: [
			{
				dataField: 'INCOME_CASH',
				width: 90,
				caption: '현금',	
			}, {
				dataField: 'INCOME_CARD',
				width: 90,
				caption: '카드',			
			}, {
				dataField: 'INCOME_ACCT',
				width: 90,
				caption: '계좌이체',			
			}, {			
				dataField: 'INCOME_BANK',
				width: 90,
				caption: '무통장입금',
			}, {			
				dataField: 'INCOME_SUM',
				width: 90,
				caption: '소계',				
			},			
		],
	}, {
		caption: '지출내역',	
		columns: [
			{
				dataField: 'SPEND_CASH',
				width: 90,
				caption: '현금',	
			}, {
				dataField: 'SPEND_CARD',
				width: 90,
				caption: '카드',			
			}, {
				dataField: 'SPEND_ACCT',
				width: 90,
				caption: '계좌이체',			
			}, {			
				dataField: 'SPEND_BANK',
				width: 90,
				caption: '무통장입금',
			}, {			
				dataField: 'SPEND_SUM',
				width: 90,
				caption: '소계',				
			},			
		],	
	}, {
		caption: '합계',	
		columns: [
			{
				dataField: 'CASH',
				width: 90,
				caption: '현금',	
			}, {
				dataField: 'CARD',
				width: 90,
				caption: '카드',			
			}, {
				dataField: 'ACCT',
				width: 90,
				caption: '계좌이체',			
			}, {			
				dataField: 'BANK',
				width: 90,
				caption: '무통장입금',
			}, {			
				dataField: 'SUM',
				width: 90,
				caption: '총계',				
			},			
		],	
	}, ];
	
	resultColumn = setColumnAlignment(resultColumn);
	return resultColumn;
}


