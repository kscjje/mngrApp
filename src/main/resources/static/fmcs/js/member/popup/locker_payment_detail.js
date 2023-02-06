const lockerPaymentDetailTemplate = `
<div id="lockerPaymentDetailTemplate">
	<div class="popup-condition-area row">
		<div class="grid-header-title" style="margin: 10px;font-size:1.2rem;"><span>사물함 &nbsp;</span><span class="locker-no" style="font-weight:700;"></span></div>
		<div class="form-group other-condition col-12 card" style="padding: 8px 12px 0;"></div>
	</div>
	<div class="popup-condition-area row">
		<div class="grid-header-title" style="margin: 10px;font-weight:700;">결제내역</div>
		<div class="form-group pay-condition col-12 card" style="padding: 8px 12px 0;"></div>
	</div>	
	<div>
		<div class="payment-grid" style="height:200px;"></div>
	</div>	
</div>`;

var popLockerPaymentDetail = null;

function createLockerPaymentDetailPopup(selector, callback) {
	if (popLockerPaymentDetail){
		popLockerPaymentDetail = null;
		$(selector).dxPopup("dispose");
	}
	
	popLockerPaymentDetail = $(selector).dxPopup({
		contentTemplate: $('<div>').append(lockerPaymentDetailTemplate),
		visible: true,
		title: '결제상세',
		width:600,
        height:720,
		position: {
			my: 'center',
			at: 'center',
			of: window
		},
		dragEnabled: true,
		onShown() {
			createLockerPaymentDetailCondition();
			createLockerPaymentDetailGrid();
		},
		toolbarItems: [{
			widget: 'dxButton',
		    toolbar: 'bottom',
		    location: 'after',
		    options: {
		    	text: '닫기',
		    	onClick() {
		    		popLockerPaymentDetail.hide();
				},
			},
		}],
	}).dxPopup('instance');
}

function createLockerPaymentDetailCondition() {
	var myformData = {};
	myformData.USER_NO = "00000123";
	myformData.USER_NAME = "이순신";
	myformData.LCK_LOCATION = "프론트뒤";
	myformData.LCK_USE_PERIOD = "2022-10-01 ~ 2022.12.29";
	myformData.LCK_FLOOR = "상단";
	myformData.LCK_SIZE = "중형";	
	myformData.LCK_NO = "A0001";	
	
	var colCondition = [];
	colCondition.push({dataField: 'USER_NO', label: {text: '회원번호',},});	
	colCondition.push({dataField: 'USER_NAME', label: {text: '회원명',},});	
	colCondition.push({dataField: 'LCK_LOCATION', label: {text: '사물함위치',},});	
	colCondition.push({dataField: 'LCK_USE_PERIOD', label: {text: '임대기간',},});	
	colCondition.push({dataField: 'LCK_FLOOR', label: {text: '사물함 단구분',},});	
	colCondition.push({dataField: 'LCK_SIZE', label: {text: '사물함 크기',},});		
	
	$('#lockerPaymentDetailTemplate .other-condition').dxForm({
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
	
	$("#lockerPaymentDetailTemplate .locker-no").text(myformData.LCK_NO);
	
	myformData.STTS_NO = "0000000058854";
	myformData.PAY_REG_DT = "2022-10-12 11:04:18";
	myformData.PAY_USER_NAME = "관리자";
	myformData.PROD_PRICE = "4,000원";
	myformData.PAY_REDUCE_PRICE = "-1,000원";
	myformData.PAY_PRICE = "3,000원";	
	
	colCondition = [];
	colCondition.push({dataField: 'STTS_NO', label: {text: '정산번호',},});	
	colCondition.push({dataField: 'PAY_USER_NAME', label: {text: '수납자',},});	
	colCondition.push({colSpan:2, dataField: 'PAY_REG_DT', label: {text: '결제일시',},});	
	colCondition.push({colSpan:2, dataField: 'PROD_PRICE', label: {text: '대여료',},});	
	colCondition.push({colSpan:2, dataField: 'PAY_REDUCE_PRICE', label: {text: '경로할인(30%)',},});	
	colCondition.push({colSpan:2, dataField: 'PAY_PRICE', label: {text: '결제금액',},});		
	
	$('#lockerPaymentDetailTemplate .pay-condition').dxForm({
		formData: myformData,
		showColonAfterLabel: false,
	    customizeItem(item) {
			if (item && item.dataField) {
				if (item.dataField == "PAY_PRICE") {
					item.template = $('<span style="float:right;height:1rem;font-weight:700;">').text(myformData[item.dataField]);	
				} else {
					item.template = $('<span style="float:right;height:1rem;">').text(myformData[item.dataField]);						
				}
			}
        },				    
		items: [{
			colCount: 2, 
			itemType: 'group',
		    items: colCondition,
		}],

	});	
}

function createLockerPaymentDetailGrid() {
	var userSearchList = lecListJoin.filter(function(item1, idx1) {
		return lecListJoin.findIndex(function(item2, idx2) {
			return item1.USER_NO == item2.USER_NO;
		}) == idx1;
	});
		
	$('#lockerPaymentDetailTemplate .payment-grid').dxDataGrid({
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
		columns: getLockerPaymentDetailColumnList(),
		scrolling: {
			rowRenderingMode: 'virtual',
		},	
		onToolbarPreparing(e) {
			var dataGrid = e.component;
	        e.toolbarOptions.items.push({
	        	location: 'before',
	        	template: $('<div style="font-weight:700;margin-left:10px;">').append("결제 세부내역"),
	        },);
		},				
	});
}

function getLockerPaymentDetailColumnList() {
	var resultColumn = {};
	
	resultColumn = [{
		dataField: 'USER_NO',
		caption: '카드발급번호',
		visible: false,
	}, {		
		dataField: 'PAY_TYPE',
		caption: '결제방법',	
	}, {		
		dataField: 'PAY_PRICE',
		width:70,
		caption: '결제금액',	
	}, {		
		dataField: 'PAY_REG_DT',
		width:80,
		caption: '결제일시',	
	}, {		
		dataField: 'PAY_STATUS',
		width:80,
		caption: '상태',	
	}, {		
		dataField: 'PAY_INVOICE_NO',
		caption: '영수증번호',															
	}];
	
	resultColumn = setColumnAlignment(resultColumn);
	return resultColumn;
}	