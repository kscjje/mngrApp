function formInit() {
	// 조건 생성
	createCondition();
	
	// 그리드 생성
	createDataGrid();
	createCardSummaryForm();
}

function createCondition() {
	var colCondition = [];
	colCondition.push({dataField: 'REG_START_DT', label: {text: '입금일자',}, editorType:"dxDateBox",});
	
	colCondition.push({colSpan:1, dataField: 'MERT_TYPE', label: {text:'수납자'}, editorType:"dxTagBox", editorOptions: {
		dataSource: new DevExpress.data.ArrayStore({
			data: [{ID:'admin',NAME:'관리자'}, {ID:'hong',NAME:'홍길동'}],
			key: 'ID',
		}),
		displayExpr: 'NAME',
		valueExpr: 'ID',
	}});
	
	colCondition.push({colSpan:2, dataField: 'CATE_TYPE', label: {text:'운영상품분류'}, editorType:"dxDropDownBox", editorOptions: {
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
	
	$('.form-group.condition').dxForm({
	    colCount: 4,
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

function createDataGrid() {
	var lectureList = lecListJoin.filter(function(item1, idx1) {
		return lecListJoin.findIndex(function(item2, idx2) {
			return item1.USER_NO == item2.USER_NO;
		}) == idx1;
	});
	
	$('.gridContainer').dxDataGrid({
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
		columns: getColumnList(),
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

function getColumnList() {
	var resultColumn = {};
	
	resultColumn = [{
		dataField: 'USER_NO',
		visible: false,
		caption: '번호',
	}, {
		dataField: 'USER_CENTER',
		width: 100,
		caption: '수납자명',
	}, {
		dataField: 'USER_NO2',
		width: 110,
		caption: '회원번호',
	}, {
		dataField: 'USER_NAME',
		width: 100,
		caption: '회원명',	
	}, {
		dataField: 'USER_GENDER',
		width: 120,
		caption: '영수증번호',			
	}, {
		dataField: 'USER_ID',
		width: 90,
		caption: '등록시간',			
	}, {			
		dataField: 'USER_HP',
		width: 90,
		caption: '수납구분',
	}, {
		dataField: 'USER_BIRTH',
		width: 80,
		caption: '수납금액',
	}, {
		dataField: 'USER_POST',
		caption: '구분',
	}];
	
	resultColumn = setColumnAlignment(resultColumn);
	return resultColumn;
}	

function createCardSummaryForm() {
	let colCondition = [];
	colCondition.push({colSpan:3, dataField: 'CASH_CNT', label: {text: '현금결제'}, editorType:"dxNumberBox", editorOptions:{
		format: "#,##0 건",
	},});
	colCondition.push({colSpan:2, dataField: 'CASH_PRICE', label: {visible:false}, editorType:"dxNumberBox", editorOptions:{
		format: "#,##0 원",
	},});
	colCondition.push({colSpan:3, dataField: 'CARD_CNT', label: {text: '카드결제'}, editorType:"dxNumberBox", editorOptions:{
		format: "#,##0 건",
	},});
	colCondition.push({colSpan:2, dataField: 'CARD_PRICE', label: {visible:false}, editorType:"dxNumberBox", editorOptions:{
		format: "#,##0 원",
	},});
	colCondition.push({colSpan:3, dataField: 'ACCT_CNT', label: {text: '계좌이체결제'}, editorType:"dxNumberBox", editorOptions:{
		format: "#,##0 건",
	},});
	colCondition.push({colSpan:2, dataField: 'ACCT_PRICE', label: {visible:false}, editorType:"dxNumberBox", editorOptions:{
		format: "#,##0 원",
	},});
	colCondition.push({colSpan:3, dataField: 'VACCT_CNT', label: {text: '가상계좌결제'}, editorType:"dxNumberBox", editorOptions:{
		format: "#,##0 건",
	},});
	colCondition.push({colSpan:2, dataField: 'VACCT_PRICE', label: {visible:false}, editorType:"dxNumberBox", editorOptions:{
		format: "#,##0 원",
	},});	
	
	colCondition.push({colSpan:3, dataField: 'CASH_CNT', label: {text: '현금환불'}, editorType:"dxNumberBox", editorOptions:{
		format: "#,##0 건",
	},});
	colCondition.push({colSpan:2, dataField: 'CASH_PRICE', label: {visible:false}, editorType:"dxNumberBox", editorOptions:{
		format: "#,##0 원",
	},});
	colCondition.push({colSpan:3, dataField: 'CARD_CNT', label: {text: '카드환불'}, editorType:"dxNumberBox", editorOptions:{
		format: "#,##0 건",
	},});
	colCondition.push({colSpan:2, dataField: 'CARD_PRICE', label: {visible:false}, editorType:"dxNumberBox", editorOptions:{
		format: "#,##0 원",
	},});
	colCondition.push({colSpan:3, dataField: 'ACCT_CNT', label: {text: '계좌이체환불'}, editorType:"dxNumberBox", editorOptions:{
		format: "#,##0 건",
	},});
	colCondition.push({colSpan:2, dataField: 'ACCT_PRICE', label: {visible:false}, editorType:"dxNumberBox", editorOptions:{
		format: "#,##0 원",
	},});
	colCondition.push({colSpan:3, dataField: 'VACCT_CNT', label: {text: '가상계좌환불'}, editorType:"dxNumberBox", editorOptions:{
		format: "#,##0 건",
	},});
	colCondition.push({colSpan:2, dataField: 'VACCT_PRICE', label: {visible:false}, editorType:"dxNumberBox", editorOptions:{
		format: "#,##0 원",
	},});
	
	colCondition.push({colSpan:3, dataField: 'CASH_CNT', label: {
		text: '현금합계',
		template: function (data, labelElement) {
			labelElement.append("<bold>" +data.text +"&nbsp; &nbsp; </bold>");
		}
	}, editorType:"dxNumberBox", editorOptions:{
		format: "#,##0 건",
	},});
	colCondition.push({colSpan:2, dataField: 'CASH_PRICE', label: {visible:false}, editorType:"dxNumberBox", editorOptions:{
		format: "#,##0 원",
	},});
	colCondition.push({colSpan:3, dataField: 'CARD_CNT', label: {
		text: '카드합계',
		template: function (data, labelElement) {
			labelElement.append("<bold>" +data.text +"&nbsp; &nbsp; </bold>");
		}
	}, editorType:"dxNumberBox", editorOptions:{
		format: "#,##0 건",
	},});
	colCondition.push({colSpan:2, dataField: 'CARD_PRICE', label: {visible:false}, editorType:"dxNumberBox", editorOptions:{
		format: "#,##0 원",
	},});
	colCondition.push({colSpan:3, dataField: 'ACCT_CNT', label: {
		text: '계좌이체합계',
		template: function (data, labelElement) {
			labelElement.append("<bold>" +data.text +"</bold>");
		}
	}, editorType:"dxNumberBox", editorOptions:{
		format: "#,##0 건",
	},});
	colCondition.push({colSpan:2, dataField: 'ACCT_PRICE', label: {visible:false}, editorType:"dxNumberBox", editorOptions:{
		format: "#,##0 원",
	},});
	colCondition.push({colSpan:3, dataField: 'VACCT_CNT', label: {
		text: '가상계좌합계',
		template: function (data, labelElement) {
			labelElement.append("<bold>" +data.text +"</bold>");
		}
	}, editorType:"dxNumberBox", editorOptions:{
		format: "#,##0 건",
	},});
	colCondition.push({colSpan:2, dataField: 'VACCT_PRICE', label: {visible:false}, editorType:"dxNumberBox", editorOptions:{
		format: "#,##0 원",
	},});
	
	colCondition.push({colSpan:5, itemType: 'empty',});
	colCondition.push({colSpan:3, dataField: 'INVOICE_CNT', label: {
		text: '영수증전표',
		template: function (data, labelElement) {
			labelElement.append("<bold>" +data.text +"</bold>");
		}
	}, editorType:"dxNumberBox", editorOptions:{
		format: "#,##0 건",
	},});
	
	colCondition.push({colSpan:12, 
	template: function (data, itemElement) {
		return "<div style='margin-top:7px;'>※ 현금건수, 현금금액, 카드건수, 카드금액은 취소건수 및 취소금액을 제외했습니다.<div>";
	},});
	
	$('.summaryContainer').dxForm({
	    colCount: 20,
	    showColonAfterLabel: false,
	    items: colCondition,
        alignItemLabels: true,
        readOnly: true,
	});  
	
	$('.summaryContainer').dxForm("instance").repaint();
}

const syncTreeViewSelection = function (treeViewInstance, value) {
	if (!value) {
		treeViewInstance.unselectAll();
		return;
	}

	value.forEach((key) => {treeViewInstance.selectItem(key);});
};
