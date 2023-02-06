function createTab4Init() {
	$(".tab-contents > div").hide();
	$("#tab4").show();
	
	$("#tab4 .btn-top-area > div").eq(0).dxButton({
		stylingMode: 'contained',
		text: '영수증재출력',
		type: 'default',
		onClick() {
			DevExpress.ui.notify('The Contained button was clicked');
		},
	});
	
	$("#tab4 .btn-top-area > div").eq(1).dxButton({
		stylingMode: 'contained',
		text: '현금영수증인증',
		type: 'normal',
		onClick() {
			DevExpress.ui.notify('The Contained button was clicked');
		},
	});
	
	var columnlist = getTab4ColumnList();
	//var lectureList = getList();
	
	var lectureList = refndListJoin;
	
	$('#tab4 .gridContainer').dxDataGrid({
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
	    //selection: {mode: 'multiple'},	
	    onToolbarPreparing(e) {
			const dataGrid = e.component;
			e.toolbarOptions.items.push({
				 location: 'after',
				 widget: 'dxButton',
				 options: {
					 	icon: 'fa fa-commenting-o',
					 	onClick() {
					 		gridEduPrg.refresh();
					 	},
				 },
			});
		},
		onRowDblClick(e) {
			createLecturePaymentDetailPopup('#userPopup');
		},			
	});
}

function getTab4ColumnList() {
	var resultColumn = {};
	
	resultColumn = [{
		dataField: 'USER_NO',
		visible:false,
		caption: '회원번호',
	}, {
		dataField: 'PAY_SEQ',
		width: 80,
		caption: '정산번호',
		cellTemplate: function(element, options) {
			$('<a>' + options.value + '</a>')
       			.attr("href", "javascript:createLecturePaymentDetailPopup('#userPopup');")
       			.appendTo(element);		
		}		
	}, {
		dataField: 'PAY_REG_DT',
		width: 140,
		caption: '결제일시',		
	}, {
		dataField: 'PAY_TYPE',
		width: 110,
		caption: '결제방법',
	}, {
		dataField: 'PROG_PRICE',
		width: 80,
		caption: '판매금액',		
	}, {
		dataField: 'PAY_PRICE',
		width: 80,
		caption: '결제금액',			
	}, {
		dataField: 'PAY_USER_NAME',
		width: 110,
		caption: '수납자',
	}, {
		dataField: 'PAY_CONF_NO',
		width: 110,
		caption: '승인번호',	
	}, {
		dataField: 'PAY_ACT_NAME',
		width: 90,
		caption: '예금주명',	
	}, {
		dataField: 'PAY_BANK',
		width: 90,
		caption: '은행명',	
	}, {
		dataField: 'PAY_ACT_NO',
		width: 120,
		caption: '계좌번호',	
	}, {
		dataField: 'PAY_DESC',
		caption: '비고',											
	}];
	
	resultColumn = setColumnAlignment(resultColumn);
	return resultColumn;
}	
