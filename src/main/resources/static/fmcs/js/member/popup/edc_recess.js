const lectureDelayTemplate = `
<div id="lectureDelayTemplate">
	<div class="popup-condition-area row">
		<div class="form-group other-lecture selected-form-group col-12"></div>
		<div class="form-group other-condition col-12" style="margin-top:10px;"></div>
	</div>
	<div>
		<div class="user-search-grid"></div>
	</div>
</div>`;

var popLectureDelay = null;

function createLectureDelayPopup(selector, callback) {
	if (popLectureDelay){
		popLectureDelay = null;
		$(selector).dxPopup("dispose");
	}
	
	popLectureDelay = $(selector).dxPopup({
		contentTemplate: $('<div>').append(lectureDelayTemplate),
		visible: true,
		title: '강좌연기신청',
		width:600,
        height:700,
		position: {
			my: 'center',
			at: 'center',
			of: window
		},
		dragEnabled: true,
		onShown() {
			createLectureInfo();
			createLectureDelayCondition();
			createLectureDelayGrid();
		},
		toolbarItems: [{
			widget: 'dxButton',
		    toolbar: 'bottom',
		    location: 'after',
		    options: {
		    	text: '강좌 연기신청',
		    	onClick() {
					DevExpress.ui.notify('강좌 연기신청');
				},
			},
		}, {
			widget: 'dxButton',
		    toolbar: 'bottom',
		    location: 'after',
		    options: {
		    	text: '취소',
		    	type: 'gray',
		    	onClick() {
		    		popLectureDelay.hide();
				},
			},
		}],
	}).dxPopup('instance');
}

function createLectureInfo() {
	var myformData = {};
	myformData.LEC_NAME = "정기수영 새벽1 중급 [월수반]";
	myformData.LEC_REG_DT = "2022-09-02";
	myformData.LEC_USE_DT = "2022-10-01 ~ 2022-11-30";
	
	var colCondition = [];
	colCondition.push({dataField: 'LEC_NAME', label: {text: '강좌명',},});	
	colCondition.push({dataField: 'LEC_REG_DT', label: {text: '등록일',},});	
	colCondition.push({dataField: 'LEC_USE_DT', label: {text: '이용일',},});	
	
	$('#lectureDelayTemplate .other-lecture').dxForm({
		formData: myformData,
		showColonAfterLabel: false,
	    labelMode: 'outside',
	    labelLocation: 'top',
	    customizeItem(item) {
			if (item && item.dataField) {
        		item.template = $('<span>').text(myformData[item.dataField]);		
        		
        		if (item.dataField == "LEC_REG_DT") {
					item.colSpan = 1;
				} else {
					item.colSpan = 2;
				}
			}
        },				    
		items: [{
			colCount: 5,
			itemType: 'group',
			caption: '강좌정보',		    
		    items: colCondition,
		}],

	});
}

function createLectureDelayCondition() {
	var colCondition = [];
	
	colCondition.push({colSpan:2, dataField: 'DLY_REG_DT', label: {text: '연기신청일',}, editorType:"dxDateBox",
		editorOptions: {
	  		displayFormat: 'yyyy-MM-dd',
		},
	});
	colCondition.push({colSpan:3, itemType:'empty'});
	
	colCondition.push({colSpan:2, dataField: 'DLY_START_DT', label: {text: '연기기간',}, editorType:"dxDateBox",
		editorOptions: {
	  		displayFormat: 'yyyy-MM-dd',
		},
	});
	colCondition.push({colSpan:2, dataField: 'DLY_END_DT', label: {text: '~',}, editorType:"dxDateBox",
		editorOptions: {
	  		displayFormat: 'yyyy-MM-dd',
			onValueChanged(data) {
				var startDt = moment($('#lectureDelayTemplate .other-condition').dxForm("instance").getEditor("DLY_START_DT").option("value"));
				var endDt = moment(data.value);
				var diffDays = endDt.diff(startDt, 'day') + 1;
				
				if (diffDays) {
					$('#lectureDelayTemplate .other-condition').dxForm("instance").itemOption("DLY_END_DT", "helpText", "(" + diffDays + " 일간)");				
				}
		    },	  		
		},
		helpText: '(0 일간)', cssClass:'item-has-helptext',
	});		
	colCondition.push({colSpan:1, itemType:'empty'});
	colCondition.push({colSpan:5, dataField: 'CARD_NO', label: {text: '연기사유',},});	
	colCondition.push({colSpan:5, dataField: 'CARD_MAKE_DESC', label: {text: '비고',},});	
	
	$('#lectureDelayTemplate .other-condition').dxForm({
	    colCount: 5,
	    showColonAfterLabel: false,
	    items: colCondition,
	});
}

function createLectureDelayGrid() {
	var userSearchList = lecListJoin.filter(function(item1, idx1) {
		return lecListJoin.findIndex(function(item2, idx2) {
			return item1.USER_NO == item2.USER_NO;
		}) == idx1;
	});
		
	$('#lectureDelayTemplate .user-search-grid').dxDataGrid({
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
		columns: getLectureDelayColumnList(),
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
	        	template: $('<div style="font-weight:700;margin-left:10px;">').append("강좌연기 이력"),
	        },);
		},		
	});
}

function getLectureDelayColumnList() {
	var resultColumn = {};
	
	resultColumn = [{
		dataField: 'USER_NO',
		caption: '연기신청번호',
		visible: false,
	}, {		
		dataField: 'USER_REG_DT',
		caption: '연기신청일자',	
	}, {		
		dataField: 'RDC_START_DT',
		caption: '연기시작일',	
	}, {		
		dataField: 'RDC_END_DT',
		caption: '연기종료일',															
	}];
	
	resultColumn = setColumnAlignment(resultColumn);
	return resultColumn;
}	