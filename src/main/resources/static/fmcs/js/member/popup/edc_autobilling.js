const lectureAutobilingTemplate = `
<div id="lectureAutobilingTemplate">
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

var popLectureAutobilling = null;

function createLectureAutobillingPopup(selector, callback) {
	if (popLectureAutobilling){
		popLectureAutobilling = null;
		$(selector).dxPopup("dispose");
	}
	
	popLectureAutobilling = $(selector).dxPopup({
		contentTemplate: $('<div>').append(lectureAutobilingTemplate),
		visible: true,
		title: '재등록자동청구',
		width:1200,
        height:800,
		position: {
			my: 'center',
			at: 'center',
			of: window
		},
		dragEnabled: true,
		onShown() {
			createLectureAutobillingCondition();
			createLectureAutobillingGrid();
		},
		toolbarItems: [{
			widget: 'dxButton',
		    toolbar: 'bottom',
		    location: 'after',
		    options: {
		    	text: '닫기',
		    	onClick() {
		    		popLectureAutobilling.hide();
				},
			},
		}],
	}).dxPopup('instance');
}

function createLectureAutobillingCondition() {
	var colCondition = [];
	
	colCondition.push({dataField: 'CARD_REG_DT', label: {text: '발급일자',}, editorType:"dxDateBox",
		editorOptions: {
	  		displayFormat: 'yyyy-MM-dd',
		},
	});	
	colCondition.push({dataField: 'CARD_NO', label: {text: '카드번호',},});	
	colCondition.push({colSpan:2, dataField: 'CARD_MAKE_DESC', label: {text: '발급사유',},});	
	
	$('#lectureAutobilingTemplate .other-condition').dxForm({
	    colCount: 2,
	    showColonAfterLabel: false,
	    items: colCondition,
	});
	
	$('#lectureAutobilingTemplate .user-search-btn').dxButton({
		stylingMode: 'contained',
		template: '카드발급',
		type: 'default',
		onClick() {
			
		},
	});
	$('#lectureAutobilingTemplate .user-refresh-btn').dxButton({
		stylingMode: 'contained',
		icon:'clear',
		type: 'default',
		elementAttr: {
			class: "btnRefresh"
		},
		onClick() {
			$('#lectureAutobilingTemplate .other-condition').dxForm("instance").resetValues();
		},
	});	
}

function createLectureAutobillingGrid() {
	var userSearchList = lecListJoin.filter(function(item1, idx1) {
		return lecListJoin.findIndex(function(item2, idx2) {
			return item1.USER_NO == item2.USER_NO;
		}) == idx1;
	});
		
	$('#lectureAutobilingTemplate .user-search-grid').dxDataGrid({
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
		columns: getLectureAutobillingColumnList(),
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
	        	template: $('<div style="font-weight:700;margin-left:10px;">').append("카드발급내역"),
	        }, {
	        	location: 'after',
	        	widget: 'dxButton',
	      		cssClass:'functionbtn',
	      		options: {
	      			text: '카드발급 요금등록',
	      			onClick() {
	      			},
	      		},
	        },);
		},		
	});
}

function getLectureAutobillingColumnList() {
	var resultColumn = {};
	
	resultColumn = [{
		dataField: 'USER_NO',
		caption: '카드발급번호',
		visible: false,
	}, {		
		dataField: 'USER_REG_DT',
		width:90,
		caption: '발급일자',	
	}, {		
		dataField: 'CARD_NO',
		width:120,
		caption: '카드번호',	
	}, {		
		dataField: 'POST_ADDRESS',
		width:70,
		caption: '카드구분',	
	}, {		
		dataField: 'POST_ADDRESS',
		width:70,
		caption: '사용여부',	
	}, {		
		dataField: 'POST_ADDRESS',
		caption: '재발급사유',															
	}];
	
	resultColumn = setColumnAlignment(resultColumn);
	return resultColumn;
}	