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

	const confirm_yn = [{
		  ID: '',
		  NAME: '전체',
		}, {
		  ID: 'Y',
		  NAME: '동의함',
		}, {
		  ID: 'N',
		  NAME: '동의안함',		  
		}];
		
	colCondition.push({dataField: 'NAME', label: {text: '회원명'}});
	colCondition.push({dataField: 'TERM_YN', label: {text: '개인정보동의',}, editorType:"dxSelectBox", editorOptions: {
	    dataSource: new DevExpress.data.ArrayStore({
	        data: confirm_yn,
	        key: 'ID',
	    }),
	    displayExpr: 'NAME',
	    valueExpr: 'ID',
	    value: '',
        searchEnabled: true,
      }
	});	
	
	colCondition.push({dataField: 'REG_START_DT', label: {text: '가입기간',}, editorType:"dxDateBox",});
	colCondition.push({dataField: 'REG_END_DT', label: {text: '~',}, editorType:"dxDateBox",});
	colCondition.push({colSpan:2,dataField: 'ID', label: {text: '웹아이디',},});
	
	colCondition.push({dataField: 'NAME', label: {text: '카드번호'}});
	colCondition.push({dataField: 'TERM_YN', label: {text: '알림발송동의',}, editorType:"dxSelectBox", editorOptions: {
	    dataSource: new DevExpress.data.ArrayStore({
	        data: confirm_yn,
	        key: 'ID',
	    }),
	    displayExpr: 'NAME',
	    valueExpr: 'ID',
	    value: '',
        searchEnabled: true,
      }
	});	
	
	colCondition.push({dataField: 'BIRTH_START_DT', label: {text: '생년월일',}, editorType:"dxDateBox",});
	colCondition.push({dataField: 'BIRTH_END_DT', label: {text: '~',}, editorType:"dxDateBox",});
	colCondition.push({colSpan:2,dataField: 'ID', label: {text: '주소',},});
	
	colCondition.push({dataField: 'NAME', label: {text: '휴대전화'}});
	colCondition.push({elementAttr: {class: "testclass"}, dataField: 'TERM_YN', label: {text: '회원구분',}, editorType:"dxSelectBox", editorOptions: {
	    dataSource: new DevExpress.data.ArrayStore({
	        data: confirm_yn,
	        key: 'ID',
	    }),
	    displayExpr: 'NAME',
	    valueExpr: 'ID',
	    value: '',
        searchEnabled: true,
      }
	});		
	
	colCondition.push({itemType: 'empty',});
	
	$('.form-group.condition').dxForm({
	    colCount: 6,
	    showColonAfterLabel: false,
	    formData: employee,
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
		caption: '번호',
	}, {
		dataField: 'USER_CENTER',
		caption: '이용센터',
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
		width: 90,
		caption: '성별',			
	}, {
		dataField: 'USER_ID',
		width: 90,
		caption: '웹아이디',			
	}, {			
		dataField: 'USER_HP',
		width: 90,
		caption: '휴대전화',
	}, {
		dataField: 'USER_BIRTH',
		width: 80,
		caption: '생년월일',
	}, {
		dataField: 'USER_CAR_NO',
		width: 80,
		caption: '차량번호',
	}, {
		dataField: 'USER_POST',
		width: 80,
		caption: '우편번호',
	}, {
		dataField: 'USER_ADDRESS',
		caption: '주소',
	}, {		
		dataField: 'USER_PRIVACY_YN',
		width: 80,
		caption: '개인정보동의',	
	}, {		
		dataField: 'USER_SEND_YN',
		width: 80,
		caption: '알림수신동의',	
	}, {		
		dataField: 'USER_REG_TYPE',
		width: 80,
		caption: '가입경로',	
	}, {		
		dataField: 'USER_TYPE',
		width: 80,
		caption: '회원구분',							
	}];
	
	resultColumn = setColumnAlignment(resultColumn);
	return resultColumn;
}	

