function createTab3Init() {
	$(".tab-contents > div").hide();
	$("#tab3").show();
	
	$("#tab3 .btn-top-area > div").eq(0).dxButton({
		stylingMode: 'contained',
		text: '임대신청',
		type: 'default',
		onClick() {
			viewOptions.lockerRentPopupInstance.show();
		},
	});
	
	$("#tab3 .btn-top-area > div").eq(1).dxButton({
		stylingMode: 'contained',
		text: '반납',
		type: 'default',
		onClick() {
			viewOptions.lockerReturnPopupInstance.show();
		},
	});
	
	$("#tab3 .btn-top-area > div").eq(2).dxButton({
		stylingMode: 'contained',
		text: '재등록',
		type: 'default',
		onClick() {
			viewOptions.lockerReRentPopupInstance.show();
		},
	});
	
	$("#tab3 .btn-top-area > div").eq(3).dxButton({
		stylingMode: 'contained',
		text: '변경',
		type: 'normal',
		onClick() {
			viewOptions.lockerChangePopupInstance.show();
		},
	});
	
	$("#tab3 .btn-top-area > div").eq(4).dxButton({
		stylingMode: 'contained',
		text: '보증금반환',
		type: 'normal',
		onClick() {
			viewOptions.depositReturnPopupInstance.show();
		},
	});
	
	$("#tab3 .btn-top-area > div").eq(5).dxButton({
		stylingMode: 'contained',
		text: '보증금등록',
		type: 'normal',
		onClick() {
			viewOptions.depositRentPopupInstance.show();
		},
	});	
	
	var columnlist = getTab3ColumnList();
	var lectureList = lockers();
	
	lectureList.forEach(function(data, idx) {
		if (idx % 2 == 0) {
			data.Location = "프론트뒤";			
		} else {
			data.Location = "매점옆";
		}
	});
	
	$('#tab3 .gridContainer').dxDataGrid({
		dataSource: lectureList,
		keyExpr: "ID",
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
			//e.rowIndex;
			createLockerPaymentDetailPopup('#userPopup');
		},	
	    onFocusedRowChanged(e) {
			var data = e.row.data;
			
            viewOptions.lockerDetail({
                Member: {
                    ID: data.Name ? '00001234' : null,
                    Name: data.Name,
                    MobileNumber: data.Name ? '010-1234-5678' : null,
                },
                Locker: {
                    Location: '프론트뒤',
                    Size: data.Size,
                    Status: data.Status,
                    StatusCode: data.StatusCode,
                    LayerCode: data.LayerCode,
                    Layer: data.Layer,
                    Deposit: 5000,
                    RentalFee: 10000,
                    RentalMonths: 1,
                    ID: data.ID,
                },
                Rental: {
                    RentStartDate: data.RentStartDate,
                    RentEndDate: data.RentEndDate,
                    CreationDate: data.Name ? '2022-09-16' : null,
                    RentalStatus: '연체',
                    OverdueDays: 5,
                    RentalFee: data.Name ? 10000 : null,
                    RentalMonths: data.Name ? 1 : null,
                    Deposit: data.Name ? 5000 : null,
                }


            });			
	    },
	    focusedRowIndex: 0,
	});
}

function getTab3ColumnList() {
	var resultColumn = {};
	var tmpl = `<div class='lec_status-button' style="color:<@=color@>;background-color:<@=background@>;border: 1px solid #999;"><@=value@></div>`;	
	
	resultColumn = [{
		dataField: 'APP_NO',
		visible: false,
		caption: '강좌번호',
	}, {
		dataField: 'CANCEL_BTN',
		fixed: true,
		caption: '취소',	
		width: 70,
		cellTemplate: function(element, cellInfo) {
			if (cellInfo.data.Status === "반납") {
				element.append(_.template(tmpl)({value:"반납취소", color: "red",background: "#fff"}));
				
				element.on("click", function() {
					DevExpress.ui.notify('반납취소');
				});
			} else if (cellInfo.data.Status === "임대중") {
				element.append(_.template(tmpl)({value:"등록취소", color: "red",background: "#fff"}));
				
				element.on("click", function() {
					DevExpress.ui.notify('등록취소');
				});
			}
		},				
	}, {
		dataField: 'LCK_PAY_DT',
		width: 80,
		caption: '판매일자',
	}, {
		dataField: 'Location',
		caption: '사물함위치',	
	}, {
		dataField: 'ID',
		width: 110,
		caption: '사물함번호',	
		cellTemplate: function(element, options) {
			$(`<a>${options.value}</a>`)
       			.attr("href", "javascript:createLockerPaymentDetailPopup('#userPopup');")
       			.appendTo(element);
		},
	}, {							
		dataField: 'RentStartDate',
		width: 80,
		caption: '임대시작일',
	}, {
		dataField: 'RentEndDate',
		width: 80,
		caption: '임대종료일',		
	}, {
		dataField: 'LCK_PRICE',
		width: 80,
		caption: '임대료',			
	}, {
		dataField: 'Status',
		width: 110,
		caption: '임대상태',	
	}, {
		dataField: 'LCK_TAX_YN',
		width: 80,
		caption: '과세여부',					
	}];
	
	resultColumn = setColumnAlignment(resultColumn);
	return resultColumn;
}	
