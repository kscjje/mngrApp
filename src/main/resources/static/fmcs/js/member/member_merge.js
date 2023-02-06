var colCondition = [];
var columns = [];
var frmCondition = {};
	
function formInit() {
	// 조건 생성
	createCondition();
	
	// 폼 생성
	createForm();
	
	// 그리드 생성
	createDataGrid();
	
	// 하단 조건 생성
	createSubCondition();
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
	    colCount: 1,
	    showColonAfterLabel: false,
	    formData: employee,
	    items: colCondition,
        alignItemLabels: true,
	});  	
}

function createSubCondition() {
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
	
	var colSubCondition = [];
	colSubCondition.push({dataField: 'USER_NAME', label: {text: '회원명'}, editorType:"dxTextBox",});
	colSubCondition.push({dataField: 'USER_BIRTH', label: {text: '생년월일'}, editorType:"dxTextBox",});
	
	$(".btn-top-area .form-option")	.dxForm({
	    colCount: 2,
	    showColonAfterLabel: false,
	    formData: employee,
	    items: colSubCondition,
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
	$('#mergeBtn').dxButton({
		stylingMode: 'contained',
		text: '통합처리',
		type: 'default',
		elementAttr: {
			class: "btnRefresh"
		},
		onClick() {
		},
	});			
}

function createForm() {
	const employee = {
		USER_NO: '1234',
		USER_ID: 'test1',
		USER_NAME: '김세종',
		USER_GENDER: '',
		USER_BIRTH: '',
		USER_BIRTH_TYPE: '',
		USER_REG_DT: '',
		USER_HP: '',
		USER_TYPE: '',
		USER_PRIVACY_YN: '',
		USER_SEND_YN: '',
		USER_TERM_YN: '',
		USER_PARENT_YN: '',
		USER_PARENT_HP: '',
		USER_CAR_NO: '',
		USER_LAND: '',
		USER_ADDRESS: '',
	};

	const confirmYn = [{
		  ID: 'Y',
		  NAME: '동의함',
		}, {
		  ID: 'N',
		  NAME: '동의안함',
		}];
		
	columns.push({dataField: 'USER_NO', label: {text: '회원번호',},});			
	columns.push({
		label: {text: '회원성명',},
		colCount: 3,
        itemType: 'group',
        items: [
        	{colSpan:2, dataField: 'USER_NAME', label: {visible:false},},
        	{dataField: 'USER_GENDER', label: {visible:false}, editorType:"dxSelectBox", editorOptions: {
        	    dataSource: new DevExpress.data.ArrayStore({
        	        data: [{
        	  		  ID: '남',
        			  NAME: '남',
        			}, {
        			  ID: '여',
        			  NAME: '여',
        			}],
        	        key: 'ID',
        	    }),
        	    displayExpr: 'NAME',
        	    valueExpr: 'ID',
        	    value: '남',
                searchEnabled: true,
              }
        	},       	
        ],
	});
	
	columns.push({dataField: 'USER_HP', label: {text: '휴대전화',},});		
	columns.push({dataField: 'USERREG_DT', label: {text: '등록일자',}, editorType:"dxDateBox",
		editorOptions: {
	  		displayFormat: 'yyyy-MM-dd',
		},
	});	
	columns.push({dataField: 'USER_ID', label: {text: '웹아이디',}, editorType:"dxTextBox",});		
	columns.push({
		label: {text: '생년월일',},
		colCount: 3,
		labelLocation: "top",
        itemType: 'group',
        items: [
        	{colSpan:2, dataField: 'USER_BIRTH', label: {visible:false}, editorType:"dxDateBox"},
        	{dataField: 'USER_BIRTH_TYPE', label: {visible:false}, editorType:"dxSelectBox", editorOptions: {
        	    dataSource: new DevExpress.data.ArrayStore({
        	        data: [{
        	  		  ID: '양력',
        			  NAME: '양력',
        			}, {
        			  ID: '음력',
        			  NAME: '음력',
        			}],
        	        key: 'ID',
        	    }),
        	    displayExpr: 'NAME',
        	    valueExpr: 'ID',
        	    value: '양력',
                searchEnabled: true,
              }
        	},      	
        ],
	});		
	columns.push({dataField: 'USER_ADDRESS', label: { text: '주소', }, colSpan: 2, editorType: "dxTextBox",});	
	
	$('#formUser').dxForm({
	    colCount: 4,
	    showColonAfterLabel: false,
	    items: columns,
        alignItemLabels: true,
        readOnly:true, 
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
	    selection: {mode: 'multiple',showCheckBoxesMode:'always'},	
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
		width: 100,
		caption: '회원명',
	}, {
		dataField: 'USER_BIRTH',
		width: 110,
		caption: '생년월일',
	}, {
		dataField: 'USER_BIRTH_TYPE',
		width: 60,
		caption: '양/음',		
	}, {
		dataField: 'USER_HP',
		width: 100,
		caption: '휴대전화',	
	}, {
		dataField: 'USER_GENDER',
		width: 60,
		caption: '성별',		
	}, {
		dataField: 'USER_TYPE',
		width: 90,
		caption: '회원구분',					
	}, {		
		dataField: 'USER_ID',
		width: 120,
		caption: '웹아이디',
	}, {		
		dataField: 'USER_ADDRESS',
		caption: '주소',																				
	}];
	
	resultColumn = setColumnAlignment(resultColumn);
	return resultColumn;
}
