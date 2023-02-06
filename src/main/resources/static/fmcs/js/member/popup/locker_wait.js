const lockerWaitTemplate = `
<div id="lockerWaitTemplate">
	<div class="popup-condition-area row">
		<div class="form-group other-lecture selected-form-group col-12"></div>
		<div class="form-group other-condition col-12" style="margin-top:10px;"></div>
	</div>
	<div>
		<div class="user-search-grid"></div>
	</div>
</div>`;

var popLockerWait = null;

function createLockerWaitPopup(selector, callback) {
	if (popLockerWait){
		popLockerWait = null;
		$(selector).dxPopup("dispose");
	}
	
	popLockerWait = $(selector).dxPopup({
		contentTemplate: $('<div>').append(lockerWaitTemplate),
		visible: true,
		title: '사물함 대기신청',
		width:700,
        height:650,
		position: {
			my: 'center',
			at: 'center',
			of: window
		},
		dragEnabled: true,
		onShown() {
			createLockerWaitUserInfo();
			createLockerWaitGrid();
		},
		toolbarItems: [{
			widget: 'dxButton',
		    toolbar: 'bottom',
		    location: 'after',
		    options: {
		    	text: '대기신청',
		    	onClick() {
					DevExpress.ui.notify('대기신청');
				},
			},
		}, {
			widget: 'dxButton',
		    toolbar: 'bottom',
		    location: 'after',
		    options: {
		    	text: '취소',
		    	onClick() {
		    		popLockerWait.hide();
				},
			},
		}],
	}).dxPopup('instance');
}

function createLockerWaitUserInfo() {
	var myformData = {};
	myformData.USER_NO = "00000123";
	myformData.USER_NAME = "이순신";
	myformData.USER_BIRTH = "1990-12-31";
	myformData.USER_HP = "010-1234-5678";
	
	var colCondition = [];
	colCondition.push({dataField: 'USER_NO', label: {text: '회원번호',},});	
	colCondition.push({dataField: 'USER_NAME', label: {text: '회원명',},});	
	colCondition.push({dataField: 'USER_BIRTH', label: {text: '생년월일',},});	
	colCondition.push({dataField: 'USER_HP', label: {text: '휴대전화',},});	
	
	$('#lockerWaitTemplate .other-lecture').dxForm({
		formData: myformData,
		showColonAfterLabel: false,
	    labelMode: 'outside',
	    labelLocation: 'top',
	    customizeItem(item) {
			if (item && item.dataField) {
        		item.template = $('<span>').text(myformData[item.dataField]);		
			}
        },				    
		items: [{
			colCount: 4,
			itemType: 'group',
			caption: '회원정보',		    
		    items: colCondition,
		}],

	});
}

function createLockerWaitGrid() {
	var userSearchList = lecListJoin.filter(function(item1, idx1) {
		return lecListJoin.findIndex(function(item2, idx2) {
			return item1.USER_NO == item2.USER_NO;
		}) == idx1;
	});
	
	const lockerLocation = [{
		  ID: '',
		  NAME: '사물함위치(전체)',
		}, {
		  ID: '1',
		  NAME: '수영장',
		}, {
		  ID: '2',
		  NAME: '매점옆',		  
		}];
		
	const lockerSize = [{
		  ID: '',
		  NAME: '크기(전체)',
		}, {
		  ID: '1',
		  NAME: '대형',
		}, {
		  ID: '2',
		  NAME: '중형',	
		}, {
		  ID: '3',
		  NAME: '소형',			  	  
		}];
		
	const lockerFloor = [{
		  ID: '',
		  NAME: '단수(전체)',
		}, {
		  ID: '1',
		  NAME: '상단',
		}, {
		  ID: '2',
		  NAME: '하단',		  
		}];					
		
	$('#lockerWaitTemplate .user-search-grid').dxDataGrid({
		allowColumnReordering: true,
		allowColumnResizing: true,
		columnAutoWidth: true,
		showBorders: true,
		columnFixing: {enabled: true},
		columnChooser: {
			enabled: false,
		    allowSearch: true,
		},
		focusedRowEnabled: true,
		focusedRowIndex: 0,
		dataSource: userSearchList,
		keyExpr: 'USER_NO',
		searchPanel: {
			visible: false,
		    width: 277,
		    placeholder: 'Search...',
		},
		columns: getLockerWaitColumnList(),
		scrolling: {
			rowRenderingMode: 'virtual',
		},
		paging: {
			pageSize: 10,
		},
		pager: {
			visible: true,
		    showInfo: true,
		    infoText: "총 {2}건   {0}/{1}",
		    showNavigationButtons: true,
		},	
		onToolbarPreparing(e) {
			var dataGrid = e.component;
			e.toolbarOptions.items.push({
				location: 'before',
				widget: 'dxSelectBox',
				options: {
					dataSource: new DevExpress.data.ArrayStore({
						data: lockerLocation,
						key: 'ID',
					}),
					displayExpr: 'NAME',
					valueExpr: 'ID',
					value: '',
				}
			});
			e.toolbarOptions.items.push({
				location: 'before',
				widget: 'dxSelectBox',
				options: {
					dataSource: new DevExpress.data.ArrayStore({
						data: lockerSize,
						key: 'ID',
					}),
					displayExpr: 'NAME',
					valueExpr: 'ID',
					value: '',
				}
			});
			e.toolbarOptions.items.push({
				location: 'before',
				widget: 'dxSelectBox',
				options: {
					dataSource: new DevExpress.data.ArrayStore({
						data: lockerFloor,
						key: 'ID',
					}),
					displayExpr: 'NAME',
					valueExpr: 'ID',
					value: '',
				}
			});							        
			e.toolbarOptions.items.push({
				location: 'after',
				widget: 'dxButton',
				options: {icon: 'refresh'}
			});	        
		},		
	});
}

function getLockerWaitColumnList() {
	var resultColumn = {};
	
	resultColumn = [{
		dataField: 'USER_NO',
		caption: '연기신청번호',
		visible: false,
	}, {		
		dataField: 'LCK_LOCATION',
		caption: '사물함위치',	
	}, {		
		dataField: 'LCK_FLOOR',
		width: 70,
		caption: '단수',	
	}, {		
		dataField: 'LCK_SIZE',
		width: 70,
		caption: '크기',	
	}, {		
		dataField: 'LCK_TOTAL_CNT',
		width: 70,
		caption: '총개수',	
	}, {		
		dataField: 'PROG_SEQ',
		width: 70,
		caption: '신청정원',	
	}, {		
		dataField: 'RDC_VALUE',
		width: 70,
		caption: '신청가능',	
		cssClass:'cell-highlight',
	}, {		
		dataField: 'LCK_APP_CNT',
		width: 70,
		caption: '신청자수',																							
	}];
	
	resultColumn = setColumnAlignment(resultColumn);
	return resultColumn;
}	