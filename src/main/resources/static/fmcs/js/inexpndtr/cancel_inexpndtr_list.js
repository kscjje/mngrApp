function formInit() {
	// 조건 생성
	createCondition();
	
	// 그리드 생성
	createDataGrid();
}

function createCondition() {
	let colCondition = [];
	colCondition.push({colSpan:2, dataField: 'REG_START_DT', label: {text: '환불(수입)일자',}, editorType:"dxDateBox",});
	colCondition.push({colSpan:2, dataField: 'REG_END_DT', label: {text: '~',}, editorType:"dxDateBox",});
	
	colCondition.push({colSpan:3, dataField: 'REG_END_DT', label: {text: '운영상품분류'}, editorType:"dxDropDownBox", editorOptions: { 
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
	//colCondition.push({itemType: 'empty',});
	
	colCondition.push({colSpan:2, dataField: 'MERT_TYPE', label: {visible:false}, editorType:"dxSelectBox", editorOptions: {
		dataSource: new DevExpress.data.ArrayStore({
			data: cashType,
			key: 'ID',
		}),
		displayExpr: 'NAME',
		valueExpr: 'ID',
		value: '',
	}});
	
	colCondition.push({colSpan:2, dataField: 'MERT_TYPE', label: {visible:false}, editorType:"dxSelectBox", editorOptions: {
		dataSource: new DevExpress.data.ArrayStore({
			data: onlineType3,
			key: 'ID',
		}),
		displayExpr: 'NAME',
		valueExpr: 'ID',
		value: '',
	}});
	
	colCondition.push({colSpan:2, dataField: 'MERT_TYPE', label: {text:'수납자'}, editorType:"dxTagBox", editorOptions: {
		dataSource: new DevExpress.data.ArrayStore({
			data: [{ID:'admin',NAME:'관리자'}, {ID:'hong',NAME:'홍길동'}],
			key: 'ID',
		}),
		displayExpr: 'NAME',
		valueExpr: 'ID',
	}});
	
	colCondition.push({dataField: 'DEPOSIT_YN', label: {text: '사물함보증금 포함',}, editorType:"dxCheckBox",
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

const syncTreeViewSelection = function (treeViewInstance, value) {
	if (!value) {
		treeViewInstance.unselectAll();
		return;
	}

	value.forEach((key) => {treeViewInstance.selectItem(key);});
};

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
		caption: '결제정보',
		columns: [{
			dataField: 'RDC_END_DT',
			width: 90,
			caption: '환불방법',
		}, {
			dataField: 'RDC_START_DT',
			width: 120,
			caption: '운영상품분류',	
		}, {
			dataField: 'RDC_START_DT',
			width: 100,
			caption: '회원번호',	
		}, {
			dataField: 'RDC_START_DT',
			width: 100,
			caption: '회원명',	
		}, {
			dataField: 'RDC_START_DT',
			width: 90,
			caption: '휴대전화',
		}, {
			dataField: 'RDC_START_DT',
			width: 150,
			caption: '강좌명',
		}, {
			dataField: 'RDC_START_DT',
			width: 150,
			caption: '요금',
		}, {
			dataField: 'RDC_START_DT',
			width: 90,
			caption: '수량',
		}, {
			dataField: 'RDC_START_DT',
			width: 90,
			caption: '수임금액',
		}, {
			dataField: 'RDC_START_DT',
			width: 90,
			caption: '결제방법',			
		}],
	}, {
		caption: '환불정보',
		columns: [{
			dataField: 'RDC_END_DT',
			width: 90,
			caption: '환불금액',
		}, {
			dataField: 'RDC_START_DT',
			width: 90,
			caption: '공급가액',	
		}, {
			dataField: 'RDC_START_DT',
			width: 90,
			caption: '부가세액',	
		}, {
			dataField: 'RDC_START_DT',
			width: 130,
			caption: '온라인환불요청일시',	
		}, {
			dataField: 'RDC_START_DT',
			width: 90,
			caption: '해약일자',	
		}, {
			dataField: 'RDC_START_DT',
			width: 90,
			caption: '환불일자',	
		}, {
			dataField: 'RDC_START_DT',
			width: 150,
			caption: '환불사유',				
		}],	
	}, {
		caption: '공제금액',
		columns: [{
			dataField: 'RDC_END_DT',
			width: 90,
			caption: '위약금',
		}, {
			dataField: 'RDC_START_DT',
			width: 90,
			caption: '이용료',
		}, {
			dataField: 'RDC_START_DT',
			width: 90,
			caption: '지급대행수수료',
		}, {
			dataField: 'RDC_START_DT',
			width: 90,
			caption: '합계',			
		}],	
	}, {
		caption: '환불계좌정보',
		columns: [{
			dataField: 'ACCT_NAME',
			width: 90,
			caption: '예금주',
		}, {
			dataField: 'ACCT_NO',
			width: 110,
			caption: '계좌번호',
		}, {
			dataField: 'BANK_NAME',
			width: 110,
			caption: '은행명',
		}, {
			dataField: 'ACCT_DESC',
			width: 150,
			caption: '비고',			
		}],			
	}
	];
	
	resultColumn = setColumnAlignment(resultColumn);
	return resultColumn;
}	

