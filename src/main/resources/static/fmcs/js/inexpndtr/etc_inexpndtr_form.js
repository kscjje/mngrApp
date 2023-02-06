function formInit() {
	// 조건 생성
	createCondition();
	
	// 유저폼 생성
	createForm();
	
	createLectureGrid();
	createCartGrid();
	createPaymentGrid();
}

function createCondition() {
	var colCondition = [];
	
	colCondition.push({dataField: 'STTS_REG_DT', label: {text: '매출일자'}, editorType:"dxDateBox"});
	colCondition.push({dataField: 'USER_NAME', label: {text: '회원명'}, editorType:"dxTextBox", editorOptions:{
	    buttons: [{
	        name: 'btn_id',
	        location: 'after',
	        options: {
	       		template: '<i class="nav-icon fas fa-search-plus"></i>',
	        	type: 'default',
	        	onClick() {
					createUserSearchPopup("#userPopup", $('.form-group.condition').dxForm("instance").option("formData"), function(data) {
						setFormData($('#formUser'), data);
					});
	        	},
	        },
	      }]
	 	},
	});
	
	$('.form-group.condition').dxForm({
	    colCount: 2,
	    showColonAfterLabel: false,
	    items: colCondition,
        alignItemLabels: true,
	});  
	
	$('#addDailyChinMember').dxButton({
		stylingMode: 'contained',
		text: '일일회원',
		type: 'default',
		onClick() {
			$('#formUser').dxForm("instance").resetValues();
			$('#formUser').dxForm("instance").getEditor("USER_NAME").option("value", "일일회원");
		},
	});		
}

function createForm() {
	var columns = [];
	columns.push({dataField: 'USER_NO', label: {text: '회원번호',},});			
	columns.push({dataField: 'USER_NAME', label: {text: '회원성명',},});
	columns.push({dataField: 'USER_HP', label: {text: '휴대전화',},});		
	columns.push({dataField: 'USER_BIRTH', label: {text: '생년월일',},});		
	
	$('#formUser').dxForm({
	    colCount: 4,
	    showColonAfterLabel: false,
	    items: columns,
        alignItemLabels: true,
        readOnly:true, 
	});  
}

function createLectureGrid() {
	var userSearchList = lecListJoin.filter(function(item1, idx1) {
		return lecListJoin.findIndex(function(item2, idx2) {
			return item1.LEC_SEQ == item2.LEC_SEQ;
		}) == idx1;
	});
		
	$('#lecturePaymentTemplate .lecture-grid').dxDataGrid({
		allowColumnReordering: true,
		allowColumnResizing: true,
		columnAutoWidth: true,
		showBorders: true,
		columnFixing: {enabled: true},
		focusedRowEnabled: true,
		focusedRowIndex: 0,
		dataSource: userSearchList,
		keyExpr: 'LEC_SEQ',
		columns: getLectureColumnList(),
		scrolling: {
			rowRenderingMode: 'virtual',
		},	
		paging: {
			pageSize: 20,
		},
		pager: {
			visible: true,
		    showInfo: true,
		    infoText: "총 {2}건   {0}/{1}",
		    showNavigationButtons: true,
		},		
		onKeyDown(e) {
			if (e.event.keyCode == 32) { // space
				DevExpress.ui.notify('등록담기');
			}
		},
	    onToolbarPreparing(e) {
	    	const dataGrid = e.component;
	    	e.toolbarOptions.items.unshift( {
	             location: 'after',
	             template() {
	               return createRightSelect();
	             }
	    		}
	    	);
	    	
	    	e.toolbarOptions.items.push(
        	{
        		location: 'after',
           		widget: 'dxButton',
           		options: {
           			icon: 'refresh',
           			onClick() {
           				dataGrid.refresh();
           			},
           		},
           	},
          );
	    },		
	});
}

function createRightSelect(){
	//$('<div id="treeBox"').dxDropDownBox({
	return $("<div id='treeBox'>").dxDropDownBox({
	    value: ['0001'],
	    width:400,
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
	});
}

function createCartGrid() {
	var userSearchList = lecListJoin.filter(function(item1, idx1) {
		return lecListJoin.findIndex(function(item2, idx2) {
			return item1.LEC_SEQ == item2.LEC_SEQ;
		}) == idx1;
	});
		
	$('#lecturePaymentTemplate .cart-grid').dxDataGrid({
		allowColumnReordering: true,
		allowColumnResizing: true,
		columnAutoWidth: true,
		showBorders: true,
		focusedRowEnabled: true,
		focusedRowIndex: 0,
		dataSource: userSearchList,
		keyExpr: 'LEC_SEQ',
		columns: getCartColumnList(),
		scrolling: {
			rowRenderingMode: 'virtual',
		},	
	    editing: {
	    	mode: 'row',
	        allowUpdating: true,
	        allowDeleting: true,
	        useIcons: true,
	    },	
	});
}

function getLectureColumnList() {
	var resultColumn = {};
	
	resultColumn = [{
		dataField: 'LEC_SEQ',
		caption: '강좌번호',
		visible: false,
	}, {		
		dataField: 'LEC_PLACE',
		caption: '운영상품분류',			
	}, {		
		dataField: 'LEC_NAME',
		caption: '요금명',	
	}, {				
		dataField: 'PROG_PRICE',
		width:130,
		dataType: "number",
		caption: '단가',	
	}, {
        type: "buttons",
        width:80,
        buttons: [{
            text: "등록담기",
            onClick: function (e) {
            	DevExpress.ui.notify('등록담기');
            }
        }]		
	}];
	
	resultColumn = setColumnAlignment(resultColumn);
	
	return resultColumn;
}

function getCartColumnList() {
	var resultColumn = {};
	
	resultColumn = [{
		dataField: 'LEC_SEQ',
		caption: '강좌번호',
		visible: false,
	}, {		
		dataField: 'LEC_NAME',
		caption: '품목명',	
		allowEditing: false,
	}, {		
		dataField: 'LEC_REMAIN_CNT',
		width:80,
		caption: '수량',		
		dataType: 'number',
	}, {		
		dataField: 'PROG_PRICE',
		width:80,
		caption: '단가',	
		dataType: 'number',		
	}, {		
		dataField: 'PROG_PRICE',
		width:80,
		caption: '할인금액',	
		dataType: 'number',
	}, {		
		dataField: 'PROG_PRICE',
		width:80,
		caption: '판매금액',
		dataType: 'number',
		allowEditing: false,
	}, {		
		dataField: 'PROG_PRICE',
		width:80,
		caption: '부가세',	
		dataType: 'number',
		allowEditing: false,
	}, {		
		dataField: 'LEC_REDUCE_DESC',
		caption: '비고',	
	}, {
        type: "buttons",
        width:60,
    }];
	
	resultColumn = setColumnAlignment(resultColumn);
	return resultColumn;
}

function createPaymentGrid() {
	$("#lecturePaymentTemplate .locker-payment-button-container > div").eq(0).dxButton({
        icon: 'fa fa-credit-card',
        method: 'card',
        hint: '카드결제',
        text: '카드결제',
        template: function (itemData, $buttonContent) {
        	var tmpl = `<div class="locker-payment-button">
        			<i class="<@=icon@> fa-3x grey"></i>
        			<div class="mt15"><@=text@></div>
        		</div>`;
            $buttonContent.append(_.template(tmpl)({icon:itemData.icon, text:itemData.text}));
        },
        onClick(e) {
        },
	});
	
	$("#lecturePaymentTemplate .locker-payment-button-container > div").eq(1).dxButton({
        icon: 'fa fa-money',
        method: 'cash',
        hint: '현금결제',
        text: '현금결제',
        template: function (itemData, $buttonContent) {
        	var tmpl = `<div class="locker-payment-button">
    			<i class="<@=icon@> fa-3x grey"></i>
    			<div class="mt15"><@=text@></div>
    		</div>`;
        	$buttonContent.append(_.template(tmpl)({icon:itemData.icon, text:itemData.text}));
        },
        onClick(e) {
        },
	});
	
	$("#lecturePaymentTemplate .locker-payment-button-container > div").eq(2).dxButton({
        icon: 'fa fa-google-wallet',
        method: 'simplyPay',
        hint: '간편결제',
        text: '간편결제',
        template: function (itemData, $buttonContent) {
        	var tmpl = `<div class="locker-payment-button">
    			<i class="<@=icon@> fa-3x grey"></i>
    			<div class="mt15"><@=text@></div>
    		</div>`;
        	$buttonContent.append(_.template(tmpl)({icon:itemData.icon, text:itemData.text}));
        },
        onClick(e) {
        },
	});
	
	var userSearchList = payList;
		
	$('#lecturePaymentTemplate .payment-grid').dxDataGrid({
		allowColumnReordering: true,
		allowColumnResizing: true,
		columnAutoWidth: true,
		showBorders: true,
		columnFixing: {enabled: false},
		focusedRowEnabled: true,
		focusedRowIndex: 0,
		dataSource: userSearchList,
		keyExpr: 'PAY_SEQ',
		columns: getPaymentColumnList(),
		scrolling: {
			rowRenderingMode: 'virtual',
		},	
	    editing: {
	    	mode: 'row',
	        allowDeleting: true,
	    },
	});
	
	$('#lecturePaymentTemplate .btn-top-area > div').eq(0).dxButton({
		stylingMode: 'contained',
		text: '등록완료',
		type: 'default',
		width: 110,
		onClick() {
		},
	});	
	
	$('#lecturePaymentTemplate .btn-top-area > div').eq(1).dxButton({
		stylingMode: 'contained',
		text: '환불매출등록',
		type: 'default',
		width: 110,
		onClick() {
		},
	});		
}

function getPaymentColumnList() {
	var resultColumn = {};
	
	resultColumn = [{
		dataField: 'PAY_SEQ',
		caption: '결제번호',
		visible: false,
	}, {		
		dataField: 'PAY_TYPE',
		caption: '결제수단',	
	}, {		
		dataField: 'PAY_PRICE',
		caption: '결제금액',			
	}, {
        type: "buttons",
        buttons: [{
            text: "결제취소",
            onClick: function (e) {
                // Execute your command here
            }
        }]
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

