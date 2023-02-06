const lecturePaymentDetailTemplate = `
<div id="lecturePaymentDetailTemplate">
	<div class="popup-condition-area row">
		<div class="form-group other-condition col-12 card" style="padding: 8px 12px 0;"></div>
	</div>
	<div>
		<div class="program-grid" style="height:200px;"></div>
	</div>
	<div>
		<div class="reduce-grid" style="height:200px;"></div>
	</div>
	<div>
		<div class="payment-grid" style="height:200px;"></div>
	</div>		
</div>`;

var popLecturePaymentDetail = null;

function createLecturePaymentDetailPopup(selector, callback) {
	if (popLecturePaymentDetail){
		popLecturePaymentDetail = null;
		$(selector).dxPopup("dispose");
	}
	
	popLecturePaymentDetail = $(selector).dxPopup({
		contentTemplate: $('<div>').append(lecturePaymentDetailTemplate),
		visible: true,
		title: '결제상세',
		width:600,
        height:820,
		position: {
			my: 'center',
			at: 'center',
			of: window
		},
		dragEnabled: true,
		onShown() {
			createLecturePaymentDetailCondition();
			createLecturePaymentDetailGrid();
		},
		toolbarItems: [{
			widget: 'dxButton',
		    toolbar: 'bottom',
		    location: 'after',
		    options: {
		    	text: '닫기',
		    	onClick() {
		    		popLecturePaymentDetail.hide();
				},
			},
		}],
	}).dxPopup('instance');
}

function createLecturePaymentDetailCondition() {
	var myformData = {};
	myformData.USER_NO = "00000123";
	myformData.USER_NAME = "이순신";
	myformData.STTS_NO = "0000000081";
	myformData.PAY_PRICE = "10,000원";
	
	var colCondition = [];
	colCondition.push({dataField: 'USER_NO', label: {text: '회원번호',},});	
	colCondition.push({dataField: 'USER_NAME', label: {text: '회원명',},});	
	colCondition.push({dataField: 'STTS_NO', label: {text: '정산번호',},});	
	colCondition.push({dataField: 'PAY_PRICE', label: {text: '판매금액',},});	
	
	$('#lecturePaymentDetailTemplate .other-condition').dxForm({
		formData: myformData,
		showColonAfterLabel: false,
	    customizeItem(item) {
			if (item && item.dataField) {
        		item.template = $('<span style="float:right;height:1rem;">').text(myformData[item.dataField]);	
			}
        },				    
		items: [{
			colCount: 2, 
			itemType: 'group',
		    items: colCondition,
		}],

	});
}

function createLecturePaymentDetailGrid() {
	var userSearchList = lecListJoin.filter(function(item1, idx1) {
		return lecListJoin.findIndex(function(item2, idx2) {
			return item1.USER_NO == item2.USER_NO;
		}) == idx1;
	});
		
	$('#lecturePaymentDetailTemplate .program-grid').dxDataGrid({
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
		columns: getLecturePaymentProgramColumnList(),
		scrolling: {
			rowRenderingMode: 'virtual',
		},	
		onToolbarPreparing(e) {
			var dataGrid = e.component;
	        e.toolbarOptions.items.push({
	        	location: 'before',
	        	template: $('<div style="font-weight:700;margin-left:10px;">').append("요금내역"),
	        },);
		},				
	});
	
	$('#lecturePaymentDetailTemplate .reduce-grid').dxDataGrid({
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
		columns: getLecturePaymentReduceColumnList(),
		scrolling: {
			rowRenderingMode: 'virtual',
		},	
		onToolbarPreparing(e) {
			var dataGrid = e.component;
	        e.toolbarOptions.items.push({
	        	location: 'before',
	        	template: $('<div style="font-weight:700;margin-left:10px;">').append("감면내역"),
	        },);
		},			
	});
	
	$('#lecturePaymentDetailTemplate .payment-grid').dxDataGrid({
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
		columns: getLecturePaymentDetailColumnList(),
		scrolling: {
			rowRenderingMode: 'virtual',
		},		
		onToolbarPreparing(e) {
			var dataGrid = e.component;
	        e.toolbarOptions.items.push({
	        	location: 'before',
	        	template: $('<div style="font-weight:700;margin-left:10px;">').append("결제내역"),
	        },);
		},		
	});		
}

function getLecturePaymentProgramColumnList() {
	var resultColumn = {};
	
	resultColumn = [{
		dataField: 'USER_NO',
		caption: '카드발급번호',
		visible: false,
	}, {		
		dataField: 'PROG_NAME',
		caption: '요금명',	
	}, {		
		dataField: 'PROG_USE_MONTH',
		width:70,
		caption: '이용개월수',	
	}, {		
		dataField: 'LEC_START_DT',
		width:80,
		caption: '이용시작일',	
	}, {		
		dataField: 'LEC_END_DT',
		width:80,
		caption: '이용종료일',	
	}, {		
		dataField: 'LEC_NAME',
		caption: '강좌명',															
	}];
	
	resultColumn = setColumnAlignment(resultColumn);
	return resultColumn;
}	

function getLecturePaymentReduceColumnList() {
	var resultColumn = {};
	
	resultColumn = [{
		dataField: 'USER_NO',
		caption: '카드발급번호',
		visible: false,
	}, {		
		dataField: 'RDC_TYPE',
		width:110,
		caption: '구분',	
	}, {		
		dataField: 'RDC_DESC',
		caption: '할인할증 사유',	
	}, {		
		dataField: 'RDC_RATE',
		width:110,
		caption: '적용율',	
	}, {		
		dataField: 'RDC_PRICE',
		width:110,
		caption: '적용금액',															
	}];
	
	resultColumn = setColumnAlignment(resultColumn);
	return resultColumn;
}	

function getLecturePaymentDetailColumnList() {
	var resultColumn = {};
	
	resultColumn = [{
		dataField: 'USER_NO',
		caption: '카드발급번호',
		visible: false,
	}, {		
		dataField: 'PAY_REG_DT',
		caption: '결제시간',	
	}, {		
		dataField: 'PAY_TYPE',
		caption: '결제방법',	
	}, {		
		dataField: 'PAY_PRICE',
		caption: '결제금액',	
	}, {		
		dataField: 'PAY_USER_NAME',
		caption: '수납자',	
	}, {		
		dataField: 'PAY_INVOICE_NO',
		caption: '영수증번호',															
	}];
	
	resultColumn = setColumnAlignment(resultColumn);
	return resultColumn;
}	