function createTab1Init() {
	$(".tab-contents > div").hide();
	$("#tab1").show();
	
	$("#tab1 .btn-top-area > div").eq(0).dxButton({
		stylingMode: 'contained',
		text: '강좌등록',
		type: 'default',
		onClick() {
			createLecturePaymentPopup('#userPopup', '#userPopup2');
		},
	});
	
	$("#tab1 .btn-top-area > div").eq(1).dxButton({
		stylingMode: 'contained',
		text: '재등록',
		type: 'default',
		onClick() {
			createLecturePaymentPopup('#userPopup', '#userPopup2');
		},
		disabled: true,
	});
	
	$("#tab1 .btn-top-area > div").eq(2).dxButton({
		stylingMode: 'contained',
		text: '강좌변경',
		type: 'normal',
		onClick() {
			createLectureChangePopup('#userPopup', '#userPopup2');
		},
	});

	$("#tab1 .btn-top-area > div").eq(3).dxButton({
		stylingMode: 'contained',
		text: '강좌연기',
		type: 'normal',
		onClick() {
			createLectureDelayPopup('#userPopup');
		},
	});	
	
	$("#tab1 .btn-top-area > div").eq(4).dxButton({
		stylingMode: 'contained',
		text: '재등록 자동청구',
		type: 'normal',
		onClick() {
			createLectureAutobillingPopup('#userPopup');
		},
	});
	
	$("#tab1 .btn-top-area > div").eq(5).dxButton({
		stylingMode: 'contained',
		text: '이용상품 타회원변경',
		type: 'normal',
		onClick() {
			createUserChangePopup('#userPopup');
		},
	});
	
	$("#tab1 .btn-top-area > div").eq(6).dxCheckBox({
		value: false,
		text: '환불취소금액 보기',
	});	
	
	$('#tab1 .tooltipEx').dxTooltip({
	    target: '#tab1 .form-help',
	    showEvent: 'mouseenter',
	    hideEvent: 'mouseleave',
	    hideOnOutsideClick: false,
	});								
	
	var columnlist = getTab1ColumnList();
	//var lectureList = getList();
	
	var lectureList = lecListJoin.filter(function(item1, idx1) {
		return lecListJoin.findIndex(function(item2, idx2) {
			return item1.LEC_SEQ == item2.LEC_SEQ;
		}) == idx1;
	});
	
	$('#tab1 .gridContainer').dxDataGrid({
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
	    selection: {mode: 'multiple',showCheckBoxesMode:'always'},	
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
//	    stateStoring: {
//	      enabled: true,
//	      type: 'localStorage',
//	      storageKey: 'fmcs_grid_#tab1 .gridContainer',
//	    },
		onCellPrepared: function(e){  
        	if(e.rowType === 'header' && e.column.command == "select") {  
                	var commandCell = e.cellElement;  
                	var ch = commandCell.find(".dx-select-checkbox").dxCheckBox("instance");  
                	ch.option("text", "재등록");
                	commandCell.find(".dx-checkbox-icon").hide();
          	}  
		},
		onSelectionChanged: function(e) {
			if (e.selectedRowsData.length > 0) {
				$("#tab1 .btn-top-area > div").eq(1).dxButton("instance").option("disabled", false);
			} else {
				$("#tab1 .btn-top-area > div").eq(1).dxButton("instance").option("disabled", true);
			}
			
		},
	});
}

function getTab1ColumnList() {
	var resultColumn = {};
	var tmpl = `<div class='lec_status-button' style="color:<@=color@>;background-color:<@=background@>;border: 1px solid #999;"><@=value@></div>`;	
	
	resultColumn = [{
		dataField: 'LEC_SEQ',
		visible: false,
		caption: '강좌번호',
	}, {
		dataField: 'CANCEL_BTN',
		fixed: true,
		caption: '취소',	
		width: 70,
		cellTemplate: function(element, cellInfo) {
			if (cellInfo.data.LEC_USE_STATUS === "연기") {
				element.append(_.template(tmpl)({value:"변경취소", color: "red",background: "#fff"}));
				
				element.on("click", function() {
					DevExpress.ui.notify('변경취소');
				});
			} else if (cellInfo.data.LEC_USE_STATUS === "등록") {
				element.append(_.template(tmpl)({value:"등록취소", color: "red",background: "#fff"}));
				
				element.on("click", function() {
					DevExpress.ui.notify('등록취소');
				});
			}
		},
	}, {
		dataField: 'LEC_REG_DT',
		width: 80,
		caption: '강좌등록일자',
	}, {
		dataField: 'LEC_DEL_YN',
		width: 80,
		caption: '상태',
	}, {
		dataField: 'LEC_NAME',
		caption: '강좌명',	
	}, {
		dataField: 'PROG_NAME',
		caption: '요금명',			
	}, {
		dataField: 'LEC_WEEK',
		width: 50,
		caption: '요일',			
	}, {			
		dataField: 'LEC_USE_STATUS',
		width: 80,
		caption: '이용상태',
	}, {
		dataField: 'LEC_START_DT',
		width: 80,
		caption: '이용시작일',
	}, {
		dataField: 'LEC_END_DT',
		width: 80,
		caption: '이용종료일',
	}, {
		dataField: 'LEC_REDUCE_DESC',
		caption: '감면사유',
	}, {
		dataField: 'PROG_PRICE',
		width: 80,
		caption: '판매금액',
	}, {
		dataField: 'LEC_REMAIN_CNT',
		width: 80,
		caption: '남은이용횟수',
	}, {		
		dataField: 'LEC_FREE_CNT',
		width: 80,
		caption: '무료입장횟수',			
	}];
	
	resultColumn = setColumnAlignment(resultColumn);
	return resultColumn;
}	

function getList() {
	var ajaxUrl = "/fmcs/user/getMainList";
	var resultData = {};
	
	$.ajax({
		url: ajaxUrl,
		type: "get",
		data: $("#form1").serialize(),
		async: false,
		success: function (data) {
			console.log(data.body);
			if (data.resultCnt != 0) {
				resultData = data.body;
			}
		},
		error: function () {
		}
	});

	return resultData;
} 