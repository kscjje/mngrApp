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
		
	const cardType = [{
		  ID: '',
		  NAME: '카드종류(전체)',
		}, {
		  ID: 'RF',
		  NAME: 'RF',	
		}, {
		  ID: 'B',
		  NAME: '바코드',			  	  
		}];	
		
	const makeType = [{
		  ID: '',
		  NAME: '재발급여부(전체)',
		}, {
		  ID: 'N',
		  NAME: '신규',	
		}, {
		  ID: 'R',
		  NAME: '재발급',			  	  
		}];			

	const cardUseYn = [{
		  ID: 'Y',
		  NAME: '카드사용가능',
		}, {
		  ID: 'S',
		  NAME: '카드사용불가',		  
		}];
		
	const makeStatus = [{
		  ID: '',
		  NAME: '발급상태(전체)',
		}, {
		  ID: 'A',
		  NAME: '발급',
		}, {
		  ID: 'W',
		  NAME: '대기',
		}, {
		  ID: 'D',
		  NAME: '미발급',		  		  		  
		}];		
		
	colCondition.push({dataField: 'SEARCH_START_DT', label: {text: '발급일자',}, editorType:"dxDateBox",});
	colCondition.push({dataField: 'SEARCH_END_DT', label: {text: '~',}, editorType:"dxDateBox",});		
	colCondition.push({dataField: 'CARD_TYPE', label: {visible:false}, editorType:"dxSelectBox",
		editorOptions:{
		    valueExpr: 'ID',
		    displayExpr: 'NAME',	
			items: cardType,
    		value: '',
			onValueChanged(data) {
			},    		
		}, 
	});	
	colCondition.push({dataField: 'MAKE_TYPE', label: {visible:false}, editorType:"dxSelectBox",
		editorOptions:{
		    valueExpr: 'ID',
		    displayExpr: 'NAME',	
			items: makeType,
    		value: '',
			onValueChanged(data) {
			},    		
		}, 
	});		

	colCondition.push({dataField: 'SEARCH_MONTH', label: {text: '기준월',}, editorType:"dxDateBox",
		editorOptions:{
			type: 'date',
			displayFormat: 'monthAndYear',
        	calendarOptions:{
            	maxZoomLevel: 'year', 
            	minZoomLevel: 'century', 
        	},
		}, 
	});
	colCondition.push({itemType: 'empty',});
	colCondition.push({dataField: 'CARD_USE_YN', label: {visible:false}, editorType:"dxSelectBox",
		editorOptions:{
		    valueExpr: 'ID',
		    displayExpr: 'NAME',	
			items: cardUseYn,
    		value: 'Y',
			onValueChanged(data) {
			},    		
		}, 
	});	
	colCondition.push({dataField: 'MAKE_STATUS', label: {visible:false}, editorType:"dxSelectBox",
		editorOptions:{
		    valueExpr: 'ID',
		    displayExpr: 'NAME',	
			items: makeStatus,
    		value: '',
			onValueChanged(data) {
			},    		
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
		dataField: 'CARD_TYPE',
		width: 80,
		caption: '카드종류',		
	}, {
		dataField: 'CARD_NO',
		width: 120,
		caption: '카드번호',	
	}, {
		dataField: 'CARD_REG_DT',
		width: 80,
		caption: '발급일',					
	}, {		
		dataField: 'CARD_USE_YN',
		width: 80,
		caption: '사용가능여부',
	}, {		
		dataField: 'CARD_REMAKE_YN',
		width: 80,
		caption: '재발급여부',	
	}, {		
		dataField: 'CARD_STATUS',
		width: 80,
		caption: '발급상태',			
	}, {		
		dataField: 'CARD_CENTER',
		caption: '발급센터',																		
	}];
	
	resultColumn = setColumnAlignment(resultColumn);
	return resultColumn;
}	
