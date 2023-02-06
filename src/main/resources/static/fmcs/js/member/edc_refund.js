var colCondition = [];
var frmCondition = {};
	
function formInit() {
	// 조건 생성
	createCondition();
	
	// 그리드 생성
	createDataGrid();
	
	// 상세 그리드 생성
	createDataGridDetail();	
}

function createCondition() {
	const employee = {
		  ID: '',
		  NAME: '',
		  GENDER: '',
		  HP: '',
		  REG_START_DT: '',
		  REG_END_DT: '',
		  BIRTH: '',
		  CARNO: '',
		  TYPE: '',
		  SMS_YN: '',
		  CASH_INC: '',
		  TERM_YN: '',
		  PARENT_SMS_YN: '',
		  PARENT_HP: '',
		  ADDRESS: '',
		  ADDR_TYPE: '',
		  ETC: '',
		};
		
	const categoryType = [{
		  ID: 'P',
		  NAME: '운영상품분류',
		}, {
		  ID: 'S',
		  NAME: '강좌검색분류',			  		  	  
		}];		

	const searchStatus = [{
		  ID: '',
		  NAME: '요청구분(전체)',
		}, {
		  ID: 'S',
		  NAME: '환불',	
		}, {
		  ID: 'C',
		  NAME: '강좌변경',	
		}, {
		  ID: 'D',
		  NAME: '연기',			  		  	  
		}];
		
	const refundStatus = [{
		  ID: '',
		  NAME: '환불상태(전체)',
		}, {
		  ID: 'D',
		  NAME: '정산대기',	
		}, {
		  ID: 'S',
		  NAME: '환불완료',			  		  	  
		}];
		
	const appStatus = [{
		  ID: '',
		  NAME: '신청상태(전체)',
		}, {
		  ID: 'A',
		  NAME: '신청',	
		}, {
		  ID: 'C',
		  NAME: '신청취소',	
		}, {
		  ID: 'S',
		  NAME: '승인',	
		}, {
		  ID: 'D',
		  NAME: '승인거부',			  		  		  	  
		}];	
		
	colCondition.push({dataField: 'CATEGORY_TYPE', label: {visible:false}, editorType:"dxSelectBox", editorOptions: {
	    dataSource: new DevExpress.data.ArrayStore({
	        data: categoryType,
	        key: 'ID',
	    }),
	    displayExpr: 'NAME',
	    valueExpr: 'ID',
	    value: 'P',
        searchEnabled: true,
      }
	});
	
	colCondition.push({
		dataField:'CTGCD',label: {text: ' '},
		template: function (data, itemElement) {
			itemElement.append( $("<div id='treeCtgCd'>")
					.dxDropDownBox({
						value: data.component.option('formData')[data.dataField],
		         		valueExpr: 'CTGCD',
		         		displayExpr: 'CTGNM',
		         		placeholder: 'Select a value...',
		         		dataSource: classCategories,
		         		contentTemplate(e) {
		         			const value = e.component.option('value');
		         		    const $treeView = $('<div>').dxTreeView({
		         		        dataSource: e.component.getDataSource(),
		         		        dataStructure: 'plain',
		         		        keyExpr: 'CTGCD',
		         		        parentIdExpr: 'PRNCTGCD',
		         		        selectionMode: 'single',
		         		        displayExpr: 'CTGNM',
		         		        selectByClick: true,
		         		        onContentReady(args) {
		         		          syncTreeViewSelection(args.component, value);
		         		        },
		         		        selectNodesRecursive: false,
		         		        onItemSelectionChanged(args) {
		         		          const selectedKeys = args.component.getSelectedNodeKeys();
		         		          e.component.option('value', selectedKeys);
		         		        },
		         		    });
	         		        treeView = $treeView.dxTreeView('instance');
		         		    e.component.on('valueChanged', (args) => {
		         		        syncTreeViewSelection(treeView, args.value);
		         		        e.component.close();
		         		    });
		         		    return $treeView;
		         		},                    
		            })
				);
			},
	});						
		
	colCondition.push({dataField: 'SEARCH_STATUS', label: {visible:false}, editorType:"dxSelectBox", editorOptions: {
	    dataSource: new DevExpress.data.ArrayStore({
	        data: searchStatus,
	        key: 'ID',
	    }),
	    displayExpr: 'NAME',
	    valueExpr: 'ID',
	    value: '',
        searchEnabled: true,
      }
	});	
	
	colCondition.push({dataField: 'REFUND_STATUS', label: {visible:false}, editorType:"dxSelectBox", editorOptions: {
	    dataSource: new DevExpress.data.ArrayStore({
	        data: refundStatus,
	        key: 'ID',
	    }),
	    displayExpr: 'NAME',
	    valueExpr: 'ID',
	    value: '',
        searchEnabled: true,
      }
	});				
		
	colCondition.push({dataField: 'SEARCH_START_DT', label: {text: '요청일자',}, editorType:"dxDateBox",});
	colCondition.push({dataField: 'SEARCH_END_DT', label: {text: '~',}, editorType:"dxDateBox",});
	
	colCondition.push({dataField: 'APP_STATUS', label: {visible:false}, editorType:"dxSelectBox", editorOptions: {
	    dataSource: new DevExpress.data.ArrayStore({
	        data: appStatus,
	        key: 'ID',
	    }),
	    displayExpr: 'NAME',
	    valueExpr: 'ID',
	    value: '',
        searchEnabled: true,
      }
	});		

	colCondition.push({dataField: 'USER_NAME', label: {text: '회원명'}, editorType:"dxTextBox", editorOptions:{
	    buttons: [{
	        name: 'btn_id',
	        location: 'after',
	        options: {
	       		template: '<i class="nav-icon fas fa-search-plus"></i>',
	        	type: 'default',
	        	onClick() {
	        	},
	        },
	      }]
	 	},
	});
	
	$('.form-group.condition').dxForm({
	    colCount: 4,
	    showColonAfterLabel: false,
	    formData: employee,
	    items: colCondition,
        alignItemLabels: true,
	});  
	
	$('#searchBtn').dxButton({
		stylingMode: 'contained',
		icon:'find',
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
	
	var lectureList = refndListJoin;
	
	$('#refundList .gridContainer').dxDataGrid({
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
	});	
	
	$("#refundList .btn-top-area > div").eq(0).dxButton({
		stylingMode: 'contained',
		text: '반환신청서 출력',
		type: 'default',
		onClick() {
			DevExpress.ui.notify('The Contained button was clicked');
		},
	});		
}

function createDataGridDetail() {
	var columnlist = getColumnDetail();
	//var lectureList = getList();
	
	var lectureList = refndDetailJoin;
	
	$('#refundDetail .gridContainer').dxDataGrid({
		dataSource: lectureList,
		keyExpr: "LEC_SEQ",
		allowColumnReordering: true,
		allowColumnResizing: true,
		showBorders: true,
		showRowLines: true,
		columnChooser: {enabled: true},
		//columnFixing: {enabled: true},
		loadPanel: {enabled: false},
		scrolling: {mode: "infinite"},
		export: {enabled: false},
		columnChooser: {enabled: true},
		columns: columnlist,
		focusedRowEnabled: true,
	    selection: {mode: 'multiple'},	 		
	});	
	
	$("#refundDetail .btn-top-area > div").eq(0).dxButton({
		stylingMode: 'contained',
		text: '환불정산',
		type: 'default',
		onClick() {
			createLectureRefundPopup("#userPopup", "#userPopup2");
		},
	});	
	
	$("#refundDetail .btn-top-area > div").eq(1).dxButton({
		stylingMode: 'contained',
		text: '신청승인취소',
		type: 'default',
		onClick() {
			DevExpress.ui.notify('The Contained button was clicked');
		},
	});
	
	$('#refundDetail .desc-text-area').dxTextArea({
	    value: "",
	});			
}

function getColumnList() {
	var resultColumn = {};
	
	resultColumn = [{
		dataField: 'REF_SEQ',
		width: 60,
		caption: '접수번호',
	}, {
		dataField: 'USER_NO',
		width: 110,
		caption: '회원번호',
	}, {
		dataField: 'USER_NAME',
		width: 100,
		caption: '회원명',
	}, {
		dataField: 'USER_HP',
		width: 100,
		caption: '휴대전화',	
	}, {
		dataField: 'REF_SEARCH_TYPE',
		width: 70,
		caption: '요청구분',					
	}, {		
		dataField: 'REF_APP_DESC',
		caption: '신청내용',
	}, {		
		dataField: 'REF_REG_DT',
		width: 140,
		caption: '신청일자',	
	}, {		
		dataField: 'REF_STATUS',
		width: 80,
		caption: '환불진행상태',	
	}, {		
		dataField: 'PROG_PRICE',
		width: 80,
		caption: '취소금액',	
	}, {		
		dataField: 'REF_REPAY_PRICE',
		width: 80,
		caption: '재결제금액',	
	}, {		
		dataField: 'PAY_ERR_DESC',
		caption: '결제오류',	
	}, {		
		dataField: 'REF_APP_TYPE',
		width: 70,
		caption: '접수경로',	
	}, {		
		dataField: 'REF_BANK',
		width: 90,
		caption: '환불은행',	
	}, {		
		dataField: 'REF_ACT_NO',
		width: 110,
		caption: '환불계좌',	
	}, {		
		dataField: 'REF_ACT_NAME',
		width: 80,
		caption: '환불예금주',																									
	}];
	
	resultColumn = setColumnAlignment(resultColumn);
	return resultColumn;
}	

function getColumnDetail() {
	var resultColumn = {};
	
	resultColumn = [{
		dataField: 'LEC_SEQ',
		visible: false,
		caption: '강좌번호',
	}, {
		dataField: 'LEC_NAME',
		caption: '강좌명',
	}, {
		dataField: 'PROG_PRICE',
		width: 80,
		caption: '수강료',
	}, {
		dataField: 'PAY_PRICE',
		width: 80,
		caption: '결제금액',	
	}, {
		dataField: 'PAY_REG_DT',
		width: 140,
		caption: '결제일자',					
	}, {		
		dataField: 'PAY_TYPE',
		width: 80,
		caption: '결제방법',
	}, {		
		dataField: 'PAY_END_YN',
		width: 80,
		caption: '결제상태',		
	}, {		
		dataField: 'REF_STTS_DESC',
		caption: '정산내역',	
	}, {		
		dataField: 'PAY_PRICE',
		width: 80,
		caption: '이용료',	
	}, {		
		dataField: 'REF_FNT_PRICE',
		width: 80,
		caption: '위약금',	
	}, {		
		dataField: 'REF_REPAY_PRICE',
		width: 80,
		caption: '재결제금액',	
	}, {		
		dataField: 'REF_INV_NO',
		width: 80,
		caption: '원전표영수증',	
	}, {		
		dataField: 'REF_END_YN',
		width: 80,
		caption: '매출구분',																									
	}];
	
	resultColumn = setColumnAlignment(resultColumn);
	return resultColumn;
}
