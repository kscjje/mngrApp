var colCondition = [];
var frmCondition = {};
	
function formInit() {
	// 조건 생성
	createCondition();
	
	// 그리드 생성
	createDataGrid();
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
		
	const reduceType = [{
		  ID: '',
		  NAME: '감면구분(전체)',
		}, {
		  ID: '1',
		  NAME: '국가유공자',
		}, {
		  ID: '2',
		  NAME: '기초생활수급자',
		}, {
		  ID: '3',
		  NAME: '장애인',	
		}, {
		  ID: '4',
		  NAME: '다자녀',			  	  		  		  
		}];		
		
	colCondition.push({dataField: 'CARD_TYPE', label: {visible:false}, editorType:"dxSelectBox",
		editorOptions:{
		    valueExpr: 'ID',
		    displayExpr: 'NAME',	
			items: reduceType,
    		value: '',
			onValueChanged(data) {
			},    		
		}, 
	});	
	
	
	$('.form-group.condition').dxForm({
	    colCount: 1,
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

function getColumnList() {
	var resultColumn = {};
	
	resultColumn = [{
		dataField: 'USER_NO',
		width: 110,
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
		dataField: 'RDC_NAME',
		caption: '감면구분',		
	}, {
		dataField: 'RDC_VALUE',
		width: 80,
		caption: '할인율',	
	}, {
		caption: '감면확정기간',
		columns: [{
			dataField: 'RDC_END_DT',
			width: 90,
			caption: '종료일',
		}, {
			dataField: 'RDC_START_DT',
			width: 90,
			caption: '시작일',	
		}],				
	}, {
		dataField: 'USER_BIRTH',
		width: 90,
		caption: '생년월일',					
	}, {		
		dataField: 'USER_ADDRESS',
		caption: '주소',																	
	}];
	
	resultColumn = setColumnAlignment(resultColumn);
	return resultColumn;
}	
