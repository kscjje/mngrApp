var colCondition = [];
var frmCondition = {};
	
function formInit() {
	// 조건 생성
	createCondition();
	
	// 그리드 생성
	createDataGridProgram();
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

	const searchType = [{
		  ID: 'L',
		  NAME: '강좌요금',
		}, {
		  ID: 'U',
		  NAME: '회원',		  
		}];
		
	colCondition.push({dataField: 'SEARCH_START_DT', label: {text: '변경일자',}, editorType:"dxDateBox",});
	colCondition.push({dataField: 'SEARCH_END_DT', label: {text: '~',}, editorType:"dxDateBox",});
	colCondition.push({dataField: 'USER_TYPE', label: {text: '변경구분'}, cssClass:'grp_low_height', editorType:"dxRadioGroup",
		editorOptions:{
		    valueExpr: 'ID',
		    displayExpr: 'NAME',	
		    layout: 'horizontal',		
			items: searchType,
    		value: 'L',
			onValueChanged(data) {
				if (data.value == 'L') {
					$('.gridContainerUser').hide();
					$('.gridContainerProgram').show();
				} else {
					$('.gridContainerProgram').hide();
					$('.gridContainerUser').show();
					
					if ($('.gridContainerUser').text().length < 1) {
						createDataGridUser();						
					}
				}
			},    		
		}, 
	});
	colCondition.push(...createCommonUserSearchItem("#userPopup", ".form-group.condition"));
	colCondition.push({dataField: 'USER_DESC', label: {text: '비고'}});
	
	$('.form-group.condition').dxForm({
	    colCount: 5,
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

function createDataGridProgram() {
	var columnlist = getColumnListProgram();
	//var lectureList = getList();
	
	var lectureList = lecListJoin.filter(function(item1, idx1) {
		return lecListJoin.findIndex(function(item2, idx2) {
			return item1.LEC_SEQ == item2.LEC_SEQ;
		}) == idx1;
	});
	
	$('.gridContainerProgram').dxDataGrid({
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
	    //selection: {mode: 'multiple',showCheckBoxesMode:'always'},	
	    onToolbarPreparing(e) {
			const dataGrid = e.component;
			e.toolbarOptions.items.push({
				 location: 'after',
				 widget: 'dxButton',
				 options: {
					 	icon: 'fa fa-commenting-o',
					 	onClick() {
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
}

function createDataGridUser() {				
	var columnlist = getColumnListUser();
	//var lectureList = getList();
	
	var lectureList = lecListJoin.filter(function(item1, idx1) {
		return lecListJoin.findIndex(function(item2, idx2) {
			return item1.USER_NO == item2.USER_NO;
		}) == idx1;
	});
	
	$('.gridContainerUser').dxDataGrid({
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
}

function getColumnListProgram() {
	var resultColumn = {};
	
	resultColumn = [{
		dataField: 'LEC_SEQ',
		visible: false,
		caption: '번호',
	}, {
		dataField: 'LEC_REG_DT',
		width: 90,
		caption: '변경일자',
	}, {
		dataField: 'USER_NO',
		width: 120,
		caption: '회원번호',
	}, {
		dataField: 'USER_NAME',
		width: 90,
		caption: '회원명',	
	}, {
		dataField: 'LEC_NAME',
		caption: '강좌명',					
	}, {
		caption: '변경전 요금',
		columns: [{			
				dataField: 'PROG_NAME',
				caption: '요금명',
			}, {
				dataField: 'LEC_START_DT',
				width: 80,
				caption: '유효시작일',
			}, {
				dataField: 'LEC_END_DT',
				width: 80,
				caption: '유효종료일',
			}, {
				dataField: 'PROG_PRICE',
				width: 80,
				caption: '판매금액',
			}, 
		],
	}, {
		caption: '변경후 요금',
		columns: [{
				dataField: 'PROG_NAME',
				caption: '요금명',
			}, {		
				dataField: 'LEC_START_DT',
				width: 80,
				caption: '유효시작일',	
			}, {		
				dataField: 'LEC_END_DT',
				width: 80,
				caption: '유효종료일',	
			}, {		
				dataField: 'PROG_PRICE',
				width: 80,
				caption: '결제금액',	
			}, 
		],
	}, {		
		dataField: 'APP_DESC',
		caption: '비고',
	}, {		
		dataField: 'APP_REG_ADMIN_ID',
		width: 100,
		caption: '담당자',									
	}];
	
	resultColumn = setColumnAlignment(resultColumn);
	return resultColumn;
}	

function getColumnListUser() {
	var resultColumn = {};
	
	resultColumn = [{
		dataField: 'USER_NO',
		visible: false,
		caption: '번호',
	}, {
		dataField: 'LEC_REG_DT',
		width: 90,
		caption: '변경일자',
	}, {
		dataField: 'LEC_NAME',
		caption: '강좌명',
	}, {
		dataField: 'PROG_NAME',
		caption: '프로그램명',	
	}, {
		dataField: 'PROG_PRICE',
		width: 90,
		caption: '판매금액',	
	}, {
		dataField: 'LEC_START_DT',
		width: 90,
		caption: '이용시작일',	
	}, {
		dataField: 'LEC_END_DT',
		width: 90,
		caption: '이용종료일',									
	}, {
		caption: '변경전 회원',
		columns: [{			
				dataField: 'USER_NO',
				width: 90,
				caption: '회원번호',
			}, {
				dataField: 'USER_HP',
				width: 100,
				caption: '휴대전화',
			}, {
				dataField: 'USER_BIRTH',
				width: 80,
				caption: '생년월일',
			}, {
				dataField: 'USER_NAME',
				width: 80,
				caption: '회원명',
			}, 
		],
	}, {
		caption: '변경후 회원',
		columns: [{
				dataField: 'USER_NO',
				width: 90,
				caption: '회원번호',
			}, {		
				dataField: 'USER_HP',
				width: 100,
				caption: '휴대전화',	
			}, {		
				dataField: 'USER_BIRTH',
				width: 80,
				caption: '생년월일',	
			}, {		
				dataField: 'USER_NAME',
				width: 80,
				caption: '회원명',	
			}, 
		],
	}, {		
		dataField: 'APP_NO',
		caption: '정산번호',
	}, {		
		dataField: 'APP_REG_ADMIN_ID',
		width: 100,
		caption: '담당자',									
	}];
	
	resultColumn = setColumnAlignment(resultColumn);
	return resultColumn;
}	


