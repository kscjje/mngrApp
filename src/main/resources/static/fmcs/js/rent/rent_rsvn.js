const appointItemTemplate = `
<div class='appoint-item'>
	<div style='background-color:<@=myCol@>'><@=time@></div>
 	<div style='background-color:<@=myCol@>'><@=title@></div>
	<div style='background-color:<@=colCount@>'><@=cnt@></div>
</div>`;

const appointEmptyTemplate = `
<div class='appoint-empty-item'>
	<div style='background-color:<@=myCol@>;text-align:center;font-size:1rem;'><@=title@></div>
</div>`;

var colCondition = [];
var frmCondition = {};
	
function formInit() {
	// 조건 생성
	createCondition();
	
	// 탭 생성
	createTab();
	
	// 대관예약달력 탭 초기화
	createReserveCalendar();
}

function createCondition() {
	const employee = {
		  ID: '',
		  NAME: '',
		  GENDER: '',
		  HP: '',
		  REG_START_DT: '',
		  REG_END_DT: '',
		  BIRTH: '',
		  CARNO: '',
		  TYPE: '',
		  SMS_YN: '',
		  CASH_INC: '',
		  TERM_YN: '',
		  PARENT_SMS_YN: '',
		  PARENT_HP: '',
		  ADDRESS: '',
		  ADDR_TYPE: '',
		  ETC: '',
		};

	const faciclityType = [{
		  ID: 1,
		  NAME: '축구장',
		}, {
		  ID: 2,
		  NAME: '헬스장',
		}, {
		  ID: 3,
		  NAME: '수영장',	
		}, {
		  ID: 4,
		  NAME: '세미나실',			  	  
		}];
		
	const faciclityPlace = [{
		  ID: 1,
		  NAME: '축구장A',
		}, {
		  ID: 2,
		  NAME: '축구장B',
		}, {
		  ID: 3,
		  NAME: '풋살장',		  
		}];		
		
	colCondition.push({dataField: 'FACICLITY_TYPE', label: {text: '대관시설분류',}, editorType:"dxSelectBox", editorOptions: {
	    dataSource: new DevExpress.data.ArrayStore({
	        data: faciclityType,
	        key: 'ID',
	    }),
	    displayExpr: 'NAME',
	    valueExpr: 'ID',
	    value: 1,
        searchEnabled: true,
      }
	});	
	
	colCondition.push({dataField: 'FACICLITY_PLACE', label: {text: '대관장소',}, editorType:"dxSelectBox", editorOptions: {
	    dataSource: new DevExpress.data.ArrayStore({
	        data: faciclityPlace,
	        key: 'ID',
	    }),
	    displayExpr: 'NAME',
	    valueExpr: 'ID',
	    value: 1,
        searchEnabled: true,
      }
	});		

	$('.form-group.condition').dxForm({
	    colCount: 2,
	    showColonAfterLabel: false,
	    formData: employee,
	    items: colCondition,
        alignItemLabels: true,
	});  
	
//	$('#searchBtn').dxButton({
//		stylingMode: 'contained',
//		icon: 'find',
//		type: 'default',
//		onClick() {
//		},
//	});
//	$('#searchInitBtn').dxButton({
//		stylingMode: 'contained',
//		icon:'clear',
//		type: 'default',
//		elementAttr: {
//			class: "btnRefresh"
//		},
//		onClick() {
//		},
//	});		
}

function createTab() {
	var longtabs = [
		{ 
			id: 'tab1',
			text: '대관예약달력',
		}, { 
			id: 'tab2',
			text: '예약현황/차량등록',
		},
	];
		
	$('#scrolledtabs > .tabs-container').dxTabs({
		dataSource: longtabs,
		scrollByContent: false,
		showNavButtons: false,	
		onItemClick(e) {
			var idx = (e.itemData.id).replace("tab", "");

			if (idx == "1") {
				createReserveCalendar();
			} else {
				createReserveList();
			}
		},
		selectedIndex: 0,
	});
}

function createReserveCalendar() {
	$(".tab-contents > div").hide();
	$("#tab1").show();
	
	$("#tab1 .btn-right-area > div").eq(0).dxButton({
		stylingMode: 'contained',
		text: '예약신청',
		type: 'default',
		onClick() {
			createFacilityPaymentPopup("#userPopup", "#userPopup2", function(){
			});
		},		
	});
	$("#tab1 .btn-right-area > div").eq(1).dxButton({
		stylingMode: 'contained',
		text: '대관추첨',
		type: 'default',
		onClick() {
    		createFacilityDrawPopup("#userPopup", "#userPopup2", function(){
			});
		},		
	});	
	
	var reserveCalendar = $(".calendarContainer").dxScheduler({
	    dataSource: new DevExpress.data.ArrayStore({
	        data: reserveData,
	        key: 'ID',
	    }),   
        views: ["month"],
        currentView: "month",
        dateSerializationFormat: 'YYYY-MM-DD',
        currentDate: new Date('2022-10-01'),
        firstDayOfWeek: 0,
        startDayHour: 4,
        endDayHour: 23,
        showAllDayPanel: false,
        height: 750,
        crossScrollingEnabled: true,
        //cellDuration: 20,
        maxAppointmentsPerCell: 8,
        editing: { 
            allowAdding: false
        },
	    textExpr: 'TEXT',
	    startDateExpr: 'DATE',
	    endDateExpr: 'DATE',
		toolbar: [{
				location: 'before',
				defaultElement: 'dateNavigator',
			}, {
				location: 'before',
				widget: 'dxButton',
				options: {
					text: 'Today'
				},
				onClick(e) {
					reserveCalendar.option("currentDate", new Date());
				}
			}, {
				location: 'before',
				widget: 'dxButton',
				options: {
					icon: 'refresh'
				}
			}, {
				location: 'after',
				defaultElement: 'viewSwitcher',
				visible:false,
			}, {
				location: 'after',
				widget: 'dxSelectBox',
				options: {
			    	items: calendarSearchType,
				    displayExpr: 'NAME',
				    valueExpr: 'ID',
				    value: 'A', 
				}
			}
		],
        appointmentTemplate: function(data) { 
        	//console.log(data);
			var colCount = $("#tab1 .btn-top-area .legend .count").css("background-color");
			var col1 = $("#tab1 .btn-top-area .legend .status1").css("background-color");
			var col2 = $("#tab1 .btn-top-area .legend .status2").css("background-color");
			var col3 = $("#tab1 .btn-top-area .legend .status3").css("background-color");
			var col4 = $("#tab1 .btn-top-area .legend .status4").css("background-color");
			var col5 = $("#tab1 .btn-top-area .legend .status5").css("background-color");
			var myCol = "";
			var statusIdx = data.appointmentData.STATUS;
			var title = data.appointmentData.TEXT;
			if (statusIdx == "0") {
				var tmpl = _.template(appointEmptyTemplate);
				var param = {};
				param.myCol = myCol;
				param.title = title;
				return tmpl(param);
			} else {
				switch(statusIdx) {
					case "1":
						myCol = col1;
						title = "예약가능";
						break;
					case "2":
						myCol = col2;
						title = "추첨대기";
						break;
					case "3":
						myCol = col3;
						break;
					case "4":
						myCol = col4;
						break;
					case "5":
						myCol = col5;
						break;
				}

				var tmpl = _.template(appointItemTemplate);
				var param = {};
				param.myCol = myCol;
				param.colCount = colCount;
				param.time = data.appointmentData.TIME;
				param.cnt = data.appointmentData.CNT;
				param.title = title;
				return tmpl(param);
			}
        },
        dataCellTemplate: function(data, idx, container) {
        	let currentDate = moment(data.startDate).format('YYYY-MM-DD');
        	let findData = _.where(reserveData, {DE: currentDate});
        	
        	if (findData.length > 0) {
        		if (findData[0].STATUS === "0") { // 휴관일
        			container.append(`<span>${data.text}</span>`);
	        	} else {
	        		container.append(`<div class='appoint-menu'><i class='fa fa-bars'></i></div><span>${data.text}</span>`);
	        	}
        	} else { // 회차없음
        		container.append(`<span>${data.text}</span>`);
        	}
        }, 
        onCellClick: function(data) {
        	console.log(data);
        	$('.subContextContainer').dxList("instance").option("visible", false);
        	
        	// 메뉴 아이콘 여부 체크
        	if ($(data.cellElement[0].innerHTML).find(".fa.fa-bars").length < 1) { 
        		return;
        	}
        	
        	// 메뉴 아이콘 size 만큼만 동작
        	if (data.event.offsetX < 20 && data.event.offsetY < 20) {
        		var prevDate = $('.contextContainer').attr("selectedDate");
        		var selectedDate = moment(data.cellData.startDate).format('YYYY-MM-DD');
        		
        		if ($('.contextContainer').dxList("instance").option("visible") && prevDate == selectedDate) { // 같은날 선택하면 hide
        			$('.contextContainer').dxList("instance").option("visible", false);
        		} else {
        			$('.contextContainer').dxList("instance").option("visible", true);
        			var cssTmpl = {
        				top: $(data.cellElement).offset().top - $(data.cellElement).height() + 55,
        				left: $(data.cellElement).offset().left,
        				width: $(data.cellElement).width(),
        				height: '117',
            		};
        			
        			$('.contextContainer').css(cssTmpl);
        			$('.contextContainer').attr("selectedDate", selectedDate);
        		}
        	}
        },
        onAppointmentRendered: function(e) {  
        	if ($(e.appointmentElement[0].innerHTML).find(".appoint-empty-item").length) {
        		e.appointmentElement.height(25);  
        	} else {
        		e.appointmentElement.height(16);  
        	}
        },  
        onAppointmentClick: function(data) {
        	data.cancel = true; // default tooltip hide
        	
        	if ($(data.appointmentElement[0].innerHTML).find(".appoint-empty-item").length) {
        		return;
        	}
        	
        	//console.log(data);
			var selectedDate = data.appointmentData.DE;
			$('.contextContainer').dxList("instance").option("visible", false);
			$('.subContextContainer').dxList("instance").option("visible", true);
			var cssTmpl = {
				top: data.event.clientY - 113,
				left: data.event.clientX,
				width: $(data.appointmentElement).width(),
				height: '153',
    		};
			
			$('.subContextContainer').css(cssTmpl);
			$('.subContextContainer').attr("selectedDate", selectedDate);        	
        },
        onInitialized: function(data) {
    		$('.contextContainer').dxList({
    		    dataSource: ['예약현황보기', '대기자승인', '대관추첨'],
    		    onItemClick(data) {
    		    	var selectedDate = $('.contextContainer').attr("selectedDate");
		    		$('.contextContainer').dxList("instance").option("visible", false);
		    		if(data.itemData==='예약현황보기'){
		    			$('#scrolledtabs > .tabs-container').dxTabs("instance").option("selectedIndex", 1);	
		    			createReserveList();
		    		} else if(data.itemData==='대기자승인'){
    		    		//data.itemData,selectedDate
    		    		createFacilityWaitPopup("#userPopup", "#userPopup2", function(){
    					});
    		    	}else if(data.itemData==='대관추첨'){
    		    		createFacilityDrawPopup("#userPopup", "#userPopup2", function(){
    					});
    		    	}
    		    },
    		    visible:false,
    		});
    		
    		$('.subContextContainer').dxList({
    		    dataSource: ['상세보기(변경)', '환불', '추가이용등록', '허가서출력'],
    		    onItemClick(data) {
    		    	var selectedDate = $('.subContextContainer').attr("selectedDate");
		    		$('.subContextContainer').dxList("instance").option("visible", false);
		    		if(data.itemData==='상세보기(변경)'){
		    			createFacilityPaymentPopup("#userPopup", "#userPopup2", function(){
		    			});
		    		} else if(data.itemData==='환불'){
		    			createFacilityCancelPopup("#userPopup", "#userPopup2");
    		    	} else if(data.itemData==='추가이용등록'){
    		    		createFacilityItemPaymentPopup("#userPopup", "#userPopup2", function(){
		    			});
    		    	} else if(data.itemData==='허가서출력'){
    		    	}
    		    },
    		    visible:false,
    		});    		
        },
    }).dxScheduler("instance");	
}

function createReserveList() {
	$(".tab-contents > div").hide();
	$("#tab2").show();
	
	// 조건 생성
	createSubCondition();
	
	// 예약 그리드 생성
	createReserveDataGrid();
	// 부속 그리드 생성
	createEtcDataGrid();
	// 차량번호 그리드 생성
	createCarDataGrid();	
	// 차량번호 입력폼 생성
	createCarCondition();
}

function createSubCondition() {
	const employee = {
		  ID: '',
		  NAME: '',
		  GENDER: '',
		  HP: '',
		  REG_START_DT: '',
		  REG_END_DT: '',
		  BIRTH: '',
		  CARNO: '',
		  TYPE: '',
		  SMS_YN: '',
		  CASH_INC: '',
		  TERM_YN: '',
		  PARENT_SMS_YN: '',
		  PARENT_HP: '',
		  ADDRESS: '',
		  ADDR_TYPE: '',
		  ETC: '',
		};

	const periodType = [{
		  ID: 1,
		  NAME: '접수일자',
		}, {
		  ID: 2,
		  NAME: '이용기간',		  	  
		}];
		
	const appStatus = [{
		  ID: '',
		  NAME: '접수상태(전체)',
		}, {
		  ID: '1',
		  NAME: '신청작성중',
		}, {
		  ID: '2',
		  NAME: '승인대기',
		}, {
		  ID: '3',
		  NAME: '결제대기',
		}, {
		  ID: '4',
		  NAME: '신청완료',
		}, {
		  ID: '5',
		  NAME: '신청취소',
		}, {
		  ID: '6',
		  NAME: '환불신청',
		}, {
		  ID: '7',
		  NAME: '환불완료',
		}, {
		  ID: '8',
		  NAME: '결제마감자동취소',		  		  		  		  		  		  	  
		}];	
		
	const searchType = [{
		  ID: 1,
		  NAME: '회원명',
		}, {
		  ID: 2,
		  NAME: '팀명',		  	  
		}];			
		
	var colSubCondition = [];		
	colSubCondition.push({dataField: 'PERIOD_TYPE', label: {visible:false}, editorType:"dxSelectBox", editorOptions: {
	    dataSource: new DevExpress.data.ArrayStore({
	        data: periodType,
	        key: 'ID',
	    }),
	    displayExpr: 'NAME',
	    valueExpr: 'ID',
	    value: 1,
        searchEnabled: true,
      }
	});	
	
	colSubCondition.push({dataField: 'REG_START_DT', label: {visible:false}, editorType:"dxDateBox",});
	colSubCondition.push({dataField: 'REG_END_DT', label: {text: '~',}, editorType:"dxDateBox",});
	
	colSubCondition.push({dataField: 'APP_STATUS', label: {visible:false}, editorType:"dxSelectBox", editorOptions: {
	    dataSource: new DevExpress.data.ArrayStore({
	        data: appStatus,
	        key: 'ID',
	    }),
	    displayExpr: 'NAME',
	    valueExpr: 'ID',
	    value: '',
        searchEnabled: true,
      }
	});	
	
	colSubCondition.push({dataField: 'SEARCH_TYPE', label: {visible:false}, editorType:"dxSelectBox", editorOptions: {
	    dataSource: new DevExpress.data.ArrayStore({
	        data: searchType,
	        key: 'ID',
	    }),
	    displayExpr: 'NAME',
	    valueExpr: 'ID',
	    value: 1,
        searchEnabled: true,
      }
	});		
	
	colSubCondition.push({dataField: 'SEARCH_KEYWORD', label: {visible:false},});		

	$('.form-group.sub-condition').dxForm({
	    colCount: 6,
	    showColonAfterLabel: false,
	    formData: employee,
	    items: colSubCondition,
        alignItemLabels: true,
	});  
	
	$('#searchSubBtn').dxButton({
		stylingMode: 'contained',
		icon: 'find',
		type: 'default',
		onClick() {
		},
	});
	$('#searchSubInitBtn').dxButton({
		stylingMode: 'contained',
		icon:'clear',
		type: 'default',
		elementAttr: {
			class: "btnRefresh"
		},
		onClick() {
		},
	});		
}

function createReserveDataGrid() {
	var columnlist = getReserveColumnList();
	//var lectureList = getList();
	
	var gridList = reserveList;
	
	$('#reserveList .gridContainer').dxDataGrid({
		dataSource: gridList,
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
//	    onToolbarPreparing(e) {
//			const dataGrid = e.component;
//			e.toolbarOptions.items.push({
//				 location: 'after',
//				 widget: 'dxButton',
//				 options: {
//					 	icon: 'fa fa-commenting-o',
//					 	onClick() {
//					 		gridEduPrg.refresh();
//					 	},
//				 },
//			});
//		},    		
	});	
	
	$('#reserveList .btn-top-area > div').eq(0).dxButton({
		stylingMode: 'contained',
		text: '선택예약승인',
		type: 'default',
	});	
	
	$('#reserveList .btn-top-area > div').eq(1).dxButton({
		stylingMode: 'contained',
		text: '추첨대기배정',
		type: 'default',
	});	
	
	$('#reserveList .btn-top-area > div').eq(2).dxButton({
		stylingMode: 'contained',
		text: '예약취소',
		type: 'default',
	});			
}

function getReserveColumnList() {
	var resultColumn = {};
	
	resultColumn = [{
		dataField: 'LEC_SEQ',
		visible:false,
		caption: '번호',
	}, {
		dataField: 'RSV_REG_DT',
		width: 100,
		caption: '접수일시',
	}, {
		dataField: 'RSV_NO',
		width: 110,
		caption: '예약번호',
	}, {
		dataField: 'RSV_USER_NAME',
		width: 100,
		caption: '예약회원명',	
	}, {
		dataField: 'RSV_TEAM_NAME',
		caption: '팀명',			
	}, {
		dataField: 'RSV_USER_HP',
		width: 100,
		caption: '휴대전화',			
	}, {			
		dataField: 'RSV_PLACE',
		caption: '대관장소',
	}, {
		dataField: 'RSV_USE_TIME',
		width: 130,
		caption: '이용시간',
	}, {
		dataField: 'RSV_USE_MEM_CNT',
		width: 70,
		caption: '이용인원',
	}, {
		dataField: 'RSV_FACIL_PRICE',
		width: 90,
		caption: '전용사용료',
	}, {
		dataField: 'RSV_ETC_PRICE',
		width: 90,
		caption: '부속사용료',
	}, {		
		dataField: 'RSV_SUM_PRICE',
		width: 90,
		caption: '대관료합계',	
	}, {		
		dataField: 'RSV_TYPE',
		width: 80,
		caption: '접수방식',	
	}, {		
		dataField: 'RSV_STATUS',
		width: 80,
		caption: '예약상태',							
	}];
	
	resultColumn = setColumnAlignment(resultColumn);
	return resultColumn;
}

function createEtcDataGrid() {
	var columnlist = getEtcColumnList();
	//var lectureList = getList();
	
	var gridList = reserveEtcList;
	
	$('#reserveDetail .gridContainer').dxDataGrid({
		dataSource: gridList,
		keyExpr: "LEC_SEQ",
		allowColumnReordering: true,
		allowColumnResizing: true,
		showBorders: true,
		showRowLines: true,
		//columnFixing: {enabled: true},
		loadPanel: {enabled: false},
		scrolling: {mode: "infinite"},
		//export: {enabled: true},
		columnChooser: {enabled: true},
		columns: columnlist,
		focusedRowEnabled: true,
	    //selection: {mode: 'multiple',showCheckBoxesMode:'always'},		
	});			
}

function getEtcColumnList() {
	var resultColumn = {};
	
	resultColumn = [{
		dataField: 'LEC_SEQ',
		visible:false,
		caption: '번호',
	}, {
		dataField: 'ETC_NAME',
		caption: '품목명',
	}, {
		dataField: 'ETC_USE_TIME',
		width: 120,
		caption: '이용시간',
	}, {
		dataField: 'ETC_PROD_PRICE',
		width: 90,
		caption: '단가',	
	}, {
		dataField: 'ETC_UNIT',
		width: 90,
		caption: '수량/시간',			
	}, {
		dataField: 'ETC_USE_PRICE',
		width: 90,
		caption: '금액',			
	}, {			
		dataField: 'ETC_REDUCE_DESC',
		caption: '할인내역',
	}, {
		dataField: 'ETC_REDUCE_PRICE',
		width: 90,
		caption: '할인금액',
	}, {
		dataField: 'ETC_SUM_PRICE',
		width: 90,
		caption: '합계',
	}, {
		dataField: 'ETC_PAY_STATUS',
		width: 80,
		caption: '결제상태',							
	}];
	
	resultColumn = setColumnAlignment(resultColumn);
	return resultColumn;
}

function createCarDataGrid() {
	$('#reserveCar .gridContainer').dxDataGrid({
		dataSource: [
			{CAR_NO:"01나2955"},
			{CAR_NO:"51가1234"},
			{CAR_NO:"99허8888"},
			{CAR_NO:"11너7942"},
		],
		keyExpr: "CAR_NO",
		allowColumnReordering: true,
		allowColumnResizing: true,
		showBorders: true,
		showRowLines: true,
		//columnFixing: {enabled: true},
		loadPanel: {enabled: false},
		scrolling: {mode: "infinite"},
		//export: {enabled: true},
		//columnChooser: {enabled: true},
		columns: [{
			dataField: 'CAR_NO',
			caption: '차량번호',
		}, {
        	type: "buttons",
        	width:40,
    	}],
		focusedRowEnabled: true,
	    editing: {
			mode: 'row',
			allowDeleting: true,
			useIcons: true,   
		},			
	    //selection: {mode: 'multiple',showCheckBoxesMode:'always'},		
	});			
}

function createCarCondition() {
	var colCondition = [];		
	colCondition.push({dataField: 'CAR_NO', label: {visible:false}, editorType:"dxTextArea", editorOptions: {
			height: 150,
			placeholder:'여러건 입력가능 \nex) \n01가1234 \n11너6789',
		}
	});	
	
	$('#reserveCar .carContainer').dxForm({
	    colCount: 1,
	    showColonAfterLabel: false,
	    items: colCondition,
        alignItemLabels: true,
	});  
	
	$('#searchCarBtn').dxButton({
		stylingMode: 'contained',
		text: '차량등록',
		type: 'default',
		onClick() {
			let carNo = $('#reserveCar .carContainer').dxForm("instance").getEditor("CAR_NO").option("value");
			let newList = [];
			
			carNo.split("\n").forEach(function(item) {
				if (item && item.length > 0) {
					newList.push({CAR_NO:item});
				}
			});
			
			let oldList = $('#reserveCar .gridContainer').dxDataGrid("instance").option("dataSource");
			let mergeList = _.uniq(
					_.union(oldList, newList), false, function(item){ return item.CAR_NO; }
			);
			
			$('#reserveCar .gridContainer').dxDataGrid("instance").option("dataSource", mergeList);
			$('#reserveCar .carContainer').dxForm("instance").getEditor("CAR_NO").option("value", "");
		},
	});
}


