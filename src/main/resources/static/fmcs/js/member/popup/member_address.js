const userAddressTemplate = `
<div id="userAddressTemplate">
	<div class="popup-condition-area row">
		<div class="form-group other-condition col-10"></div>
		<div class="form-group buttons">
			<div class="btn-group user-search-btn"></div>
			<div class="btn-group user-refresh-btn"></div>
		</div>
	</div>
	<div>
		<div class="user-search-grid"></div>
	</div>
</div>`;

var popUserAddress = null;
var userAddressCallback = null;

function createUserAddressPopup(selector, callback) {
	if (popUserAddress){
		popUserAddress = null;
		$(selector).dxPopup("dispose");
	}
	
	if (callback) {
		userAddressCallback = callback;		
	}
	
	popUserAddress = $(selector).dxPopup({
		contentTemplate: $('<div>').append(userAddressTemplate),
		visible: true,
		title: '주소검색',
		width:800,
        height:650,
		position: {
			my: 'center',
			at: 'center',
			of: window
		},
		dragEnabled: true,
		onShown() {
			createUserAddressCondition();
			createUserAddressGrid();
		},
		toolbarItems: [{
			widget: 'dxButton',
		    toolbar: 'bottom',
		    location: 'after',
		    options: {
		    	text: '닫기',
		    	onClick() {
		    		popUserAddress.hide();
				},
			},
		}],
	}).dxPopup('instance');
}

function createUserAddressCondition() {
	var colCondition = [];
	colCondition.push({dataField: 'USER_NAME', label: {text: '시/도',}, editorType:"dxSelectBox", editorOptions:{
		    dataSource: new DevExpress.data.ArrayStore({
		        data: [{
		  		  ID: '',
				  NAME: '전체',
				}, {
				  ID: '1',
				  NAME: '강원도',
				}, {
				  ID: '2',
				  NAME: '경기도',				  
				}],
		        key: 'ID',
		    }),
		    displayExpr: 'NAME',
		    valueExpr: 'ID',
		    value: '',
	        searchEnabled: true,
		}
	});
	colCondition.push({dataField: 'USER_BIRTH', label: {text: '시/군/구',}, editorType:"dxSelectBox", editorOptions:{ 
		    dataSource: new DevExpress.data.ArrayStore({
		        data: [{
		  		  ID: '',
				  NAME: '전체',		  
				}],
		        key: 'ID',
		    }),
		    displayExpr: 'NAME',
		    valueExpr: 'ID',
		    value: '',
	        searchEnabled: true,
		}
	});
	colCondition.push({dataField: 'USER_HP', label: {text: '도로명',}, editorOptions:{  
			placeholder: '',
		}
	});
	
	$('#userAddressTemplate .other-condition').dxForm({
	    colCount: 3,
	    showColonAfterLabel: false,
	    items: colCondition,
	});
	
	$('#userAddressTemplate .user-search-btn').dxButton({
		stylingMode: 'contained',
		template: '<i class="nav-icon fas fa-search"></i>',
		type: 'default',
		onClick() {
			
		},
	});
	$('#userAddressTemplate .user-refresh-btn').dxButton({
		stylingMode: 'contained',
		icon:'clear',
		type: 'default',
		elementAttr: {
			class: "btnRefresh"
		},
		onClick() {
			$('#userAddressTemplate .other-condition').dxForm("instance").resetValues();
		},
	});	
}

function createUserAddressGrid() {
	var userSearchList = lecListJoin.filter(function(item1, idx1) {
		return lecListJoin.findIndex(function(item2, idx2) {
			return item1.USER_NO == item2.USER_NO;
		}) == idx1;
	});
		
	$('#userAddressTemplate .user-search-grid').dxDataGrid({
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
			visible: true,
		    width: 277,
		    placeholder: 'Search...',
		},
		columns: getUserAddressColumnList(),
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
	});
}

function getUserAddressColumnList() {
	var resultColumn = {};
	
	resultColumn = [{
		dataField: 'USER_NO',
		width: 110,
		caption: '우편번호',
		fixed: true,
		cellTemplate: function(element, options) {
			if (userAddressCallback) {
				$('<a>' + options.value + '</a>')
	       			.attr('href', "javascript:userAddressCallback(" + JSON.stringify(options.data) + "); popUserAddress.hide();")
	       			.appendTo(element);				
			}
		}		
	}, {		
		dataField: 'POST_ADDRESS',
		caption: '주소',							
	}];
	
	resultColumn = setColumnAlignment(resultColumn);
	return resultColumn;
}	