const lectureCardRefundTemplate = `
<div id="lectureCardRefundTemplate">
	<div>
		<div class="card-refund-grid" style="height:180px;"></div>
	</div>
	
    <div class="mt15">
        <div style="background-color:#fff">
		    <div class="locker-payment-info-box">
		        <div class="locker-payment-header">결제한 금액</div>
		        <div class="locker-payment-body"><span>5,000</span><span class="ml05">원</span></div>
		    </div>
		    <div class="locker-payment-total-box">
		        <div class="locker-payment-header">취소할 금액</div>
		        <div class="locker-payment-body"><span>2,000</span><span class="ml05">원</span></div>
		    </div>            
        </div>
    </div>
	
	<div>
		<div class="card-payment-grid mt15" style="height:180px;"></div>
	</div>	
</div>`;

var popLectureCardRefund = null;
var subPopup = null;	

function createLectureCardRefundPopup(selector, subPopupSelector, callback) {
	subPopup = subPopupSelector;
	
	if (popLectureCardRefund){
		popLectureCardRefund = null;
		$(selector).dxPopup("dispose");
	}
	
	popLectureCardRefund = $(selector).dxPopup({
		contentTemplate: $('<div>').append(lectureCardRefundTemplate),
		visible: true,
		title: '신용카드 합산취소',
		width:600,
        height:595,
		position: {
			my: 'center',
			at: 'center',
			of: window
		},
		dragEnabled: true,
		onShown() {
			createLectureCardRefundGrid();
			createLectureCardPaymentGrid();
		},
		toolbarItems: [{
			widget: 'dxButton',
		    toolbar: 'bottom',
		    location: 'after',
		    options: {
		    	text: '카드취소완료',
		    	onClick() {
		    		DevExpress.ui.notify('카드취소완료');
		    		popLectureCardRefund.hide();
				},
			},
//		}, {
//			widget: 'dxButton',
//		    toolbar: 'bottom',
//		    location: 'after',
//		    options: {
//		    	template: '<div style="color:#FF2424">온라인결제 강제취소</div>',
//		    	onClick() {
//		    		DevExpress.ui.notify('온라인결제 강제취소');
//		    		popLectureCardRefund.hide();
//				},
//			},
			
		}, {
			widget: 'dxButton',
		    toolbar: 'bottom',
		    location: 'after',
		    options: {
		    	text: '닫기',
		    	onClick() {
		    		popLectureCardRefund.hide();
				},
			},
		}],
	}).dxPopup('instance');
}

function createLectureCardRefundGrid() {
	var userSearchList = lecListJoin.filter(function(item1, idx1) {
		return lecListJoin.findIndex(function(item2, idx2) {
			return item1.USER_NO == item2.USER_NO;
		}) == idx1;
	});
		
	$('#lectureCardRefundTemplate .card-refund-grid').dxDataGrid({
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
		columns: getLectureCardRefundColumnList(),
		scrolling: {
			rowRenderingMode: 'virtual',
		},	
	});
}

function getLectureCardRefundColumnList() {
	var resultColumn = {};
	
	resultColumn = [{
		dataField: 'USER_NO',
		caption: '카드발급번호',
		visible: false,
	}, {		
		dataField: 'USER_REG_DT',
		width:90,
		caption: '판매일자',	
	}, {		
		dataField: 'LEC_NAME',
		caption: '품목명',	
	}, {		
		dataField: 'PROG_PRICE',
		width:90,
		caption: '판매금액',	
		dataType: 'number',
	}, {		
		dataField: 'PAY_PRICE',
		width:100,
		caption: '정산번호',	
	}];
	
	resultColumn = setColumnAlignment(resultColumn);
	
	return resultColumn;
}	

function createLectureCardPaymentGrid() {
	var userSearchList = lecListJoin.filter(function(item1, idx1) {
		return lecListJoin.findIndex(function(item2, idx2) {
			return item1.USER_NO == item2.USER_NO;
		}) == idx1;
	});
		
	$('#lectureCardRefundTemplate .card-payment-grid').dxDataGrid({
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
		columns: getLectureCardPaymentColumnList(),
		scrolling: {
			rowRenderingMode: 'virtual',
		},	
	});
}

function getLectureCardPaymentColumnList() {
	var resultColumn = {};
	
	resultColumn = [{
		dataField: 'USER_NO',
		caption: '카드발급번호',
		visible: false,
	}, {
        type: "buttons",
        width:80,
        buttons: [{
            text: "결제취소",
            onClick: function (e) {
            	createLecturePaymentProgramPopup();
            }
        }]
	}, {		
		dataField: 'USER_REG_DT',
		caption: '결제일시',	
	}, {		
		dataField: 'LEC_NAME',
		caption: '결제방법',	
	}, {		
		dataField: 'PROG_NAME',
		caption: '결제금액',	
	}];
	
	resultColumn = setColumnAlignment(resultColumn);
	return resultColumn;
}	