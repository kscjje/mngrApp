function formInit() {
	// 조건 생성
	createCondition();
	
	// 그리드 생성
	createDataGrid();
}

function createCondition() {
	let colCondition = [];
	colCondition.push({colSpan:2, dataField: 'REG_START_DT', label: {text: '수입일자',}, editorType:"dxDateBox",});
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
	
	colCondition.push({colSpan:2, dataField: 'REG_NO', label: {text: '영수증번호',},});
	
	colCondition.push({colSpan:2, dataField: 'MERT_TYPE', label: {text:'수납자'}, editorType:"dxTagBox", editorOptions: {
		dataSource: new DevExpress.data.ArrayStore({
			data: [{ID:'admin',NAME:'관리자'}, {ID:'hong',NAME:'홍길동'}],
			key: 'ID',
		}),
		displayExpr: 'NAME',
		valueExpr: 'ID',
	}});
	
	colCondition.push({colSpan:1, dataField: 'RENT_YN', label: {text: '사물함임대료 포함',}, editorType:"dxCheckBox",
		editorOptions: {value: false},
	});
	
	colCondition.push({colSpan:2, dataField: 'DEPOSIT_YN', label: {text: '　사물함보증금 포함',}, editorType:"dxCheckBox",
		editorOptions: {value: false},
	});	
	
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
}

function createDataGrid() {
	var columnlist = getColumnList();
	//var lectureList = getList();
	
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

function getColumnList() {
	var resultColumn = {};
	
	resultColumn = [{
		dataField: 'USER_NO',
		visible: false,
		caption: '번호',
	}, {
		dataField: 'USER_CENTER',
		width: 90,
		caption: '수입일자',
	}, {
		dataField: 'USER_CENTER',
		width: 100,
		caption: '영수증번호',		
	}, {
		dataField: 'USER_NO',
		width: 110,
		caption: '회원번호',
	}, {
		dataField: 'USER_NAME',
		width: 90,
		caption: '회원명',	
	}, {
		dataField: 'USER_GENDER',
		caption: '요금명',			
	}, {
		dataField: 'USER_ID',
		caption: '강좌명',			
	}, {			
		dataField: 'USER_HP',
		width: 70,
		caption: '수량',
	}, {
		dataField: 'USER_BIRTH',
		width: 80,
		caption: '단가',
	}, {
		dataField: 'USER_CAR_NO',
		width: 80,
		caption: '할인금액',
	}, {
		dataField: 'USER_POST',
		caption: '감면사유',
	}, {
		dataField: 'USER_ADDRESS',
		width: 90,
		caption: '수입총액',
	}, {		
		dataField: 'USER_PRIVACY_YN',
		width: 90,
		caption: '결제수단',	
	}, {		
		dataField: 'USER_SEND_YN',
		width: 90,
		caption: '수납자',	
	}, {		
		dataField: 'USER_REG_TYPE',
		caption: '비고',	
	}, {		
		dataField: 'USER_TYPE',
		width: 80,
		caption: '구분',							
	}];
	
	resultColumn = setColumnAlignment(resultColumn);
	return resultColumn;
}	

const syncTreeViewSelection = function (treeViewInstance, value) {
	if (!value) {
		treeViewInstance.unselectAll();
		return;
	}

	value.forEach((key) => {treeViewInstance.selectItem(key);});
};
