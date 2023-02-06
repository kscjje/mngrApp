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

	const searchType = [{
		  ID: 'D',
		  NAME: '연기시작일',
		}, {
		  ID: 'S',
		  NAME: '중도해약일',		  
		}];
		
	colCondition.push({dataField: 'USER_TYPE', label: {visible:false}, editorType:"dxSelectBox",
		editorOptions:{
		    valueExpr: 'ID',
		    displayExpr: 'NAME',	
			items: searchType,
    		value: 'D',
			onValueChanged(data) {
			},    		
		}, 
	});		
		
	colCondition.push({dataField: 'SEARCH_START_DT', label: {visible:false}, editorType:"dxDateBox",});
	colCondition.push({dataField: 'SEARCH_END_DT', label: {text: '~',}, editorType:"dxDateBox",});
	colCondition.push(...createCommonUserSearchItem("#userPopup", ".form-group.condition"));
	
	$('.form-group.condition').dxForm({
	    colCount: 4,
	    showColonAfterLabel: false,
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
	
//	$('#userTooltip').dxTooltip({
//	    target: ".search_name",
//	    showEvent: 'mouseenter',
//	    //hideEvent: 'mouseleave',
//	    hideOnOutsideClick: true,
//	    contentTemplate(data) {
//			var tooltip = `<div style="text-align:left;">
//	    			<ul style="margin:0;padding-left:10px">
//	    				<li>휴대전화:	<@=hp@></li>
//	    				<li>생년월일:	<@=birth@></li>
//	    			</ul>
//	    		</div>`;
//	    	
//	    	data.html(_.template(tooltip)({hp:"000-0000-0000", birth:"0000-00-00"}));
//	    },						    
//	});			
}

function createDataGrid() {
	var columnlist = getColumnList();
	//var lectureList = getList();
	
	var lectureList = lecListJoin.filter(function(item1, idx1) {
		return lecListJoin.findIndex(function(item2, idx2) {
			return item1.LEC_SEQ == item2.LEC_SEQ;
		}) == idx1;
	});
	
	$('.gridContainer').dxDataGrid({
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

function getColumnList() {
	var resultColumn = {};
	
	resultColumn = [{
		dataField: 'LEC_SEQ',
		visible:false,
		caption: '강좌번호',
	}, {
		dataField: 'USER_NO',
		width: 110,
		caption: '회원번호',
	}, {
		dataField: 'USER_NAME',
		width: 90,
		caption: '회원명',
	}, {
		dataField: 'APP_REG_DT',
		width: 140,
		caption: '처리일시',
	}, {
		dataField: 'LEC_NAME',
		caption: '강좌명',		
	}, {
		dataField: 'PROG_NAME',
		caption: '요금명',	
	}, {
		dataField: 'USER_REG_DT',
		width: 80,
		caption: '매출일자',					
	}, {		
		dataField: 'PROG_PRICE',
		width: 80,
		caption: '판매금액',
	}, {		
		dataField: 'LEC_REG_DT',
		width: 80,
		caption: '중도해약일',	
	}, {		
		dataField: 'DLY_START_DT',
		width: 80,
		caption: '연기시작일',	
	}, {		
		dataField: 'DLY_END_DT',
		width: 80,
		caption: '연기종료일',	
	}, {		
		dataField: 'DLY_DESC',
		caption: '연기사유',	
	}, {		
		dataField: 'USER_HP',
		width: 110,
		caption: '휴대전화',																	
	}];
	
	resultColumn = setColumnAlignment(resultColumn);
	return resultColumn;
}	
