const userChangeTemplate = `
<div id="userChangeTemplate">
	<div class="popup-condition-area row">
		<div class="col-8" style="padding-top: 11px;"><strong>등록오류 회원 및 요금</strong></div>
		<div class="form-group src-condition col-4"></div>
	</div>
	<div>
		<div class="user-src-grid" style="max-height:250px;"></div>
	</div>
	<div class="popup-condition-area row" style="padding:20px 10px 10px;">
		<div class="form-group command-condition col-5"></div><div class="col-2"></div><div class="form-group command-condition col-5"></div>
	</div>	
	<div class="popup-condition-area row">
		<div class="col-8" style="padding-top: 11px;"><strong>변경처리 대상회원 및 요금</strong></div>
		<div class="form-group target-condition col-4"></div>
	</div>
	<div>
		<div class="user-target-grid" style="max-height:250px;"></div>
	</div>	
</div>`;

var popUserChange = null;

function createUserChangePopup(selector, callback) {
	if (popUserChange){
		popUserChange = null;
		$(selector).dxPopup("dispose");
	}
	
	popUserChange = $(selector).dxPopup({
		contentTemplate: $('<div>').append(userChangeTemplate),
		visible: true,
		title: '이용상품타회원변경',
		width:1000,
        height:800,
		position: {
			my: 'center',
			at: 'center',
			of: window
		},
		dragEnabled: true,
		onShown() {
			createUserSrcCondition();
			createUserCommandCondition();
			createUserTargetCondition();
			createUserSrcGrid();
			createUserTargetGrid();
		},
		toolbarItems: [{
			widget: 'dxButton',
		    toolbar: 'bottom',
		    location: 'after',
		    options: {
		    	text: '확인',
		    	onClick() {
		    		popUserChange.hide();
				},
			},
		}, {
			widget: 'dxButton',
		    toolbar: 'bottom',
		    location: 'after',
		    options: {
		    	text: '취소',
		    	onClick() {
		    		popUserChange.hide();
				},
			},
		}],
	}).dxPopup('instance');
}

function createUserSrcCondition() {
	var colCondition = createCommonUserSearchItem("#userPopup2", "#userChangeTemplate .src-condition", 1);
	
	$('#userChangeTemplate .src-condition').dxForm({
	    colCount: 1,
	    showColonAfterLabel: false,
	    items: colCondition,
	});
}

function createUserCommandCondition() {
	$('#userChangeTemplate .command-condition').eq(0).dxButton({
		stylingMode: 'contained',
		template: '결제 및 강좌 회원변경 처리 &nbsp;<i class="nav-icon fas fa-arrow-down"></i>',
		type: 'normal',
		onClick() {
			if (!moveRowData("#userChangeTemplate .user-src-grid", "#userChangeTemplate .user-target-grid")) {
				DevExpress.ui.notify('변경할 회원을 선택해주세요.');
			}
		},
	});
	
	$('#userChangeTemplate .command-condition').eq(1).dxButton({
		stylingMode: 'contained',
		template: '회원변경 취소 &nbsp;<i class="nav-icon fas fa-arrow-up"></i>',
		type: 'normal',
		onClick() {
			if (!moveRowData("#userChangeTemplate .user-target-grid", "#userChangeTemplate .user-src-grid")) {
				DevExpress.ui.notify('취소할 회원을 선택해주세요.');
			}
		},
	});	
}

function moveRowData(srcSelector, tarGetSelector) {
	var selectedRows = $(srcSelector).dxDataGrid("instance").getSelectedRowsData();
	
	if (selectedRows.length > 0) {
		var targetDs = $(tarGetSelector).dxDataGrid("instance").getDataSource();
		var resultDs = dsMerge(targetDs, selectedRows);
		
		// 선택row 추가
		$(tarGetSelector).dxDataGrid("instance").option("dataSource", resultDs);
		
		var srcDs = $(srcSelector).dxDataGrid("instance").getDataSource();
		resultDs = dsRemove(srcDs, selectedRows, "USER_NO");
		
		// 선택row 삭제
		$(srcSelector).dxDataGrid("instance").option({"dataSource":resultDs, "focusedRowIndex":0});
		return true;
	} else {
		return false;
	}		
}

function createUserTargetCondition() {
	var colCondition = createCommonUserSearchItem("#userPopup2", "#userChangeTemplate .target-condition", 2);
	
	$('#userChangeTemplate .target-condition').dxForm({
	    colCount: 1,
	    showColonAfterLabel: false,
	    items: colCondition,
	});
}

function createUserSrcGrid() {
	var userSearchList = lecListJoin.filter(function(item1, idx1) {
		return lecListJoin.findIndex(function(item2, idx2) {
			return item1.USER_NO == item2.USER_NO;
		}) == idx1;
	});
		
	$('#userChangeTemplate .user-src-grid').dxDataGrid({
		allowColumnReordering: true,
		allowColumnResizing: true,
		columnAutoWidth: true,
		showBorders: true,
		columnFixing: {enabled: true},
		columnChooser: {
			enabled: true,
		    allowSearch: true,
		},		
		focusedRowEnabled: true,
		focusedRowIndex: 0,
		dataSource: userSearchList,
		keyExpr: 'USER_NO',
		columns: getUserSrcColumnList(),
		scrolling: {
			rowRenderingMode: 'virtual',
		},	
	    selection: {
	        mode: 'multiple',showCheckBoxesMode:'always',
	    },			
	});
}

function createUserTargetGrid() {
	var userSearchList = lecListJoin.filter(function(item1, idx1) {
		return lecListJoin.findIndex(function(item2, idx2) {
			return item1.USER_NO == item2.USER_NO;
		}) == idx1;
	});
		
	$('#userChangeTemplate .user-target-grid').dxDataGrid({
		allowColumnReordering: true,
		allowColumnResizing: true,
		columnAutoWidth: true,
		showBorders: true,
		columnFixing: {enabled: true},
		columnChooser: {
			enabled: true,
		    allowSearch: true,
		},
		focusedRowEnabled: true,
		focusedRowIndex: 0,
		//dataSource: userSearchList,
		keyExpr: 'USER_NO',
		columns: getUserTargetColumnList(),
		scrolling: {
			rowRenderingMode: 'virtual',
		},
	    selection: {
	        mode: 'multiple',showCheckBoxesMode:'always',
	    },			
	});
}

function getUserSrcColumnList() {
	var resultColumn = {};
	
	resultColumn = [{
		dataField: 'USER_NO',
		caption: '카드발급번호',
		visible: false,
	}, {		
		dataField: 'LEC_REG_DT',
		width:100,
		caption: '판매일자',	
	}, {		
		dataField: 'LEC_NAME',
		width:250,
		caption: '강좌명',	
	}, {		
		dataField: 'PROG_NAME',
		width:250,
		caption: '요금명',	
	}, {		
		dataField: 'LEC_STATUS',
		width:70,
		caption: '이용상태',	
	}, {		
		dataField: 'LEC_START_DT',
		width:100,
		caption: '이용시작일',	
	}, {		
		dataField: 'LEC_END_DT',
		width:100,
		caption: '이용종료일',	
	}, {		
		dataField: 'LEC_REMAIN_CNT',
		width:70,
		caption: '남은횟수',	
	}, {		
		dataField: 'PROD_PRICE',
		width:80,
		caption: '판매금액',	
	}, {		
		dataField: 'DLY_START_DT',
		width:100,
		caption: '연기시작일',	
	}, {		
		dataField: 'DLY_END_DT',
		width:100,
		caption: '연기종료일',	
	}, {		
		dataField: 'LEC_DEL_YN',
		width:70,
		caption: '해약여부',	
	}, {		
		dataField: 'LEC_CHANGE_YN',
		width:70,
		caption: '변경여부',
	}, {		
		dataField: 'PAY_REG_DT',
		width:130,
		caption: '결제일시',
	}, {		
		dataField: 'PAY_TYPE',
		width:80,
		caption: '결제방법',
	}, {		
		dataField: 'PAY_STATUS',
		width:80,
		caption: '결제구분',
	}, {		
		dataField: 'PAY_PRICE',
		width:90,
		caption: '결제금액',								
	}];
	
	resultColumn = setColumnAlignment(resultColumn);
	return resultColumn;
}	

function getUserTargetColumnList() {
	var resultColumn = {};
	
	resultColumn = [{
		dataField: 'USER_NO',
		caption: '카드발급번호',
		visible: false,
	}, {		
		dataField: 'LEC_REG_DT',
		width:100,
		caption: '판매일자',	
	}, {		
		dataField: 'LEC_NAME',
		width:250,
		caption: '강좌명',	
	}, {		
		dataField: 'PROG_NAME',
		width:250,
		caption: '요금명',	
	}, {		
		dataField: 'LEC_STATUS',
		width:70,
		caption: '이용상태',	
	}, {		
		dataField: 'LEC_START_DT',
		width:100,
		caption: '이용시작일',	
	}, {		
		dataField: 'LEC_END_DT',
		width:100,
		caption: '이용종료일',	
	}, {		
		dataField: 'LEC_REMAIN_CNT',
		width:70,
		caption: '남은횟수',	
	}, {		
		dataField: 'PAY_PRICE',
		width:80,
		caption: '판매금액',	
	}, {		
		dataField: 'DLY_START_DT',
		width:100,
		caption: '연기시작일',	
	}, {		
		dataField: 'DLY_END_DT',
		width:100,
		caption: '연기종료일',	
	}, {		
		dataField: 'LEC_DEL_YN',
		width:70,
		caption: '해약여부',	
	}, {		
		dataField: 'LEC_CHANGE_YN',
		width:70,
		caption: '변경여부',																													
	}];
	
	resultColumn = setColumnAlignment(resultColumn);
	return resultColumn;
}	