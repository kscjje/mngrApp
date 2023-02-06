//수시대관 설정
let tab1_form = new Array(10);

var formData1 = {
	RESVE_RCEPT_PATH: "online",		//접수경로설정
	RESVE_RCEPT_MTHD: "F",				//접수방식
	APPLCNT_SLCTN_MTHD: "manager",				//신청자 선정방식
	RESVE_TIMEYN: "1",			//접수시간 운영여부
	RESVE_STIME: "00:00",		//접수시간운영 시작시간
	RESVE_ETIME: "00:00",		//접수시간운영 종료시간
	FULL_TIME_OPENYN: "1",			//전일회차노출여부
	RESVE_POSBL_MINTIME: 0,						//예약가능회차 최소
	RESVE_POSBL_MAXTIME: 0,						//예약가능회차 최대
	RENT_CTNU_TIMEYN: "1",					//연접회차유무
	RENT_PDMETHOD: "D",			//예약가능일 설정방법
	RENT_SDAYS: 0,			//이용일 시작
	RENT_EDAYS: 0,				//이용일 종료
	TODAY_RESVEYN: "0",			//당일예약유무
	RENT_MONTH_AFDAYS: 0,						//신청일기준일
	RENT_SMONTH_GBN: 0,					//신청일기준 시작월
	RENT_EMONTH_GBN: 1,					//신청일기준 종료월
	APP_LIMIT_TARGET: "0",			//신청대상설정
	GRPCONSTNT_LIMTYN: "1",				//단체구성원제한설정 유무
	GRPCONSTNT_LIMT_MINCNT: 0,						//단체구성원제한 인원
	GRPWHTHRC_LIMTYN: "1",				//관내인원제한설정 우뮤
	GRPWHTHRC_LIMT_MINCNT: 0,					//관내인원제한 인원
	APP_RESDNC_LIMTYN: "0",			//거주지역 제한설정 유무
	AREA_IDX: "0"				//거주지역 행정동
}

//하위탭설정
function initNonScheduleSubTabList() {
	//if(subMenuList != null) return;
	
	var tabClass = "";
	var states = "";
	var tabSelectedItem ='';
	
	tabClass = "#tab1 .tab_list";
	
	states = [
		{id: 1, text: "기본설정"},
		{id: 2, text: "신청제한설정"}
	]
	
	subMenuList = $(tabClass).dxList({
		dataSource: new DevExpress.data.DataSource({
			store: new DevExpress.data.ArrayStore({
				key: "id",
				data: states
			})
		}),
		selectionMode: "single", 
		allowItemDeleting: false,
		onSelectionChanged(component,element) {
	    	var cur = subMenuList.option("selectedItemKeys");
	    	
    		nonScheduleForm(cur);
    		nonScheduleDisplayFormMenuChange(cur);
		}
	}).dxList("instance");
	
	subMenuList.selectItem(0);
}

function nonScheduleDisplayFormMenuChange(curItem){
	if (tab1_form[0] && tab1_form[0].option("visible") == true) {
		tab1_form[0].option("visible", false);
	}
	if (tab1_form[1] && tab1_form[1].option("visible") == true) {
		tab1_form[1].option("visible", false);
	}
	
	if( curItem == 1 ){
		tab1_form[0].option("visible", true);
	}else if( curItem == 2 ){
		tab1_form[1].option("visible", true);
	}
	
}
	
//Tab 수시대관 등록
function nonScheduleForm(subTabId) {

	if (subTabId == 1) {
		tab1_form[0] = $("#tab1 .contents1").dxForm({
			showColonAfterLabel: false,
			formData: formData1,
			colcount: 2,
			items: [
				{
					itemType: "button", colSpan: 6,	horizontalAlignment: "right", cssClass: "form-button",
					buttonOptions: {
						text: "저장하기",
						type: "success",
						useSubmitBehavior: true,
						onClick: function () {
							var tabOptForm= $("#tab1 .contents1").dxForm('instance'); 
				            var validationResult = tabOptForm.validate();
				            var orgData = tabOptForm.option("formData");
				             
				            if (validationResult.isValid) {
				            	alert("기본설정 저장");
				            }
						}
					},
				},
				{name: "applyType", itemType: "group", colCount: 6, caption: "접수방법설정", items: [
					{colSpan: 2, dataField: "RESVE_RCEPT_PATH", label: {text: "접수경로설정"}, editorType: "dxSelectBox", 
						editorOptions: {dataSource: reserveChannel_gbn,
							layout: "horizontal", valueExpr: "value", displayExpr: "text",
							onInitialized: function (e) {
								var possibleChannel = e.component.option("dataSource")[0].value;
								if (e.component.option("value") == "") {
									e.component.option("value", possibleChannel);
								}
							}
						}
					},
					{colSpan: 2, dataField: "RESVE_RCEPT_MTHD", label: {text: "접수방식"}, editorType: "dxSelectBox",
						editorOptions: {dataSource: reservationType_gbn, 
							layout: "horizontal", valueExpr: "value", displayExpr: "text",
							onInitialized: function (e) {
								e.component.option("dataSource")[1].visible = false;
								
								var possibleType = e.component.option("dataSource")[0].value;
								if (e.component.option("value") == "") {
									e.component.option("value", possibleType);
								}
							}
						}
					},
					{colSpan: 2, dataField: "APPLCNT_SLCTN_MTHD", label: {text: "신청자(추첨당첨자)\선정방식"}, editorType: "dxSelectBox",
						editorOptions: {dataSource: facilityApplicantType_gbn,
							layout: "horizontal", valueExpr: "value", displayExpr: "text",
							onInitialized: function (e) {
								var applicantType = e.component.option("dataSource")[0].value;
								if (e.component.option("value") == "") {
									e.component.option("value", applicantType);
								}
							}
						}
					},
					{colSpan: 2, dataField: "RESVE_TIMEYN", label: {text: "접수시간 운영여부"}, editorType: "dxSelectBox",
						editorOptions: {dataSource: run_gbn, 
							layout: "horizontal", valueExpr: "value", displayExpr: "text",
							onInitialized: function (e) {
								var reservationTimeYn = e.component.option("dataSource")[0].value;
								if (e.component.option("value") == "") {
									e.component.option("value", reservationTimeYn);
								}
							}
						}
					},
					{name: "reservationSet", colSpan: 2, itemType: "group", colCount: 2, label: {text: "접수시간운영 시간설정"}, items: [
						{dataField: "RESVE_STIME", label: {visible: false}, editorType: "dxDateBox", 
							editorOptions: {pickerType: 'rollers', type: 'time', value: nowDate, displayFormat: 'HH:mm', elementAttr: {class: "form-input120 noflex"}}
						},
						{dataField: "RESVE_ETIME", label: {text: "~"}, editorType: "dxDateBox", 
							editorOptions: {pickerType: 'rollers', type: 'time', value: nowDate, displayFormat: 'HH:mm', elementAttr: {class: "form-input120 noflex"}}
						}
					]},
					{colSpan: 2, itemType: "empty"}
				]},
				{name: "reserveTime", itemType: "group", colCount: 6, caption: "예약시간설정", items: [
					{colSpan: 2, dataField: "FULL_TIME_OPENYN", label: {text: "예약가능 회차설정"}, editorType: "dxCheckBox",
						editorOptions: {text: "전일 회차 노출여부", value: "1"}
					},
					{colSpan: 4, itemType: "group", colCount: 4, label: {text: "최소/최대회차설정"}, items: [
						{dataField: "RESVE_POSBL_MINTIME", label: {text: "최소"}, editorType: "dxNumberBox", cssClass: "form-label40", editorOptions: {showSpinButtons: true, min: 0, max: 20, format: "#,##0 회차"}},
						{cssClass: "temp-noflex", template: "<div>~</div>"},
						{dataField: "RESVE_POSBL_MAXTIME", label: {text: "최대"}, editorType: "dxNumberBox", cssClass: "form-label40", editorOptions: {showSpinButtons: true, min: 0, max: 20, format: "#,##0 회차"}},
						{dataField: "RENT_CTNU_TIMEYN", label: {visible: false}, editorType: "dxSelectBox", 
							editorOptions: {dataSource: facilityContinu_gbn,
								layout: "horizontal", valueExpr: "value", displayExpr: "text",
								onInitialized: function (e) {
									var continuYn = e.component.option("dataSource")[0].value;
									if (e.component.option("value") == "") {
										e.component.option("value", continuYn);
									}
								}
							}
						}
					]},
					
					{name: "possibleDateType", colSpan: 2, dataField: "RENT_PDMETHOD", label: {text: "예약가능일 설정방법"}, editorType: "dxSelectBox", 
						editorOptions: {dataSource: possibleDateType_gbn,
							layout: "horizontal", valueExpr: "value", displayExpr: "text",
							onInitialized: function (e) {
								e.component.option("dataSource")[0].visible = true;
								e.component.option("dataSource")[2].visible = false;
								
								var possibleDateType = e.component.option("dataSource")[0].value;
								if (e.component.option("value") == "") {
									e.component.option("value", possibleDateType);
								}
							}
						}
					},
					{name: "depositType", colSpan: 4, itemType: "group", colCount: 4, label: {visible: false}, items: ""}
				]}
			],
			onInitialized: function (e) {
				var customHandlerInit = function (e) {
					var orgData = e.component.option("formData");
					
					if (orgData.RESVE_TIMEYN == "") {
						e.component.getEditor("RESVE_TIMEYN").option("value", "1");
					}
					if (orgData.RESVE_TIMEYN == "0"){
						e.component.getEditor("RESVE_STIME").option("disabled", true);
						e.component.getEditor("RESVE_ETIME").option("disabled", true);
					}
					else {
						e.component.getEditor("RESVE_STIME").option("disabled", false);
						e.component.getEditor("RESVE_ETIME").option("disabled", false);
					}
					
					if (orgData.RENT_PDMETHOD == "") {
						e.component.getEditor("RENT_PDMETHOD").option("value", "D");
					}
					e.component.itemOption("reserveTime.depositType", "items", reservePossibleItem("tab1", orgData.RENT_PDMETHOD));
				}
				e.component.on("contentReady", customHandlerInit);
			},
			onContentReady: function (e) {
				$(".temp-noflex").parent().css("justify-content", "space-around");
				$(".temp-noflex").parent().parent().css("flex", "");
			},
			onFieldDataChanged: function (e) {
				if (e.dataField == "RESVE_TIMEYN") {
					if (e.value == "0") {
						//e.component.itemOption("applyType.reservationSet", "visible", true);
						e.component.getEditor("RESVE_STIME").option("disabled", true);
						e.component.getEditor("RESVE_ETIME").option("disabled", true);
					}
					else {
						//e.component.itemOption("applyType.reservationSet", "visible", false);
						e.component.getEditor("RESVE_STIME").option("disabled", false);
						e.component.getEditor("RESVE_ETIME").option("disabled", false);
					}
				}
				if (e.dataField == "RENT_PDMETHOD") {
					e.component.itemOption("reserveTime.depositType", "items", reservePossibleItem("tab1", e.value));
				}
				
				$(".temp-noflex").parent().css("justify-content", "space-around");
				$(".temp-noflex").parent().parent().css("flex", "");
			}
		}).dxForm("instance");
	}
	else if (subTabId == 2) {
		tab1_form[1] = $("#tab1 .contents2").dxForm({
			showColonAfterLabel: false,
			formData: formData1,
			colcount: 2,
			items: [
				{itemType: "button", colSpan: 6, horizontalAlignment: "right", cssClass: "form-button",
					buttonOptions: {
						text: "저장하기",
						type: "success",
						useSubmitBehavior: true,
						onClick: function () {
							var tabOptForm= $("#tab1 .contents2").dxForm('instance'); 
				            var validationResult = tabOptForm.validate();
				            var orgData = tabOptForm.option("formData");
				             
				            if (validationResult.isValid) {
				            	alert("신청제한설정 저장");
				            }
						}
					}
				},
				{itemType: "group", colCount: 6, caption: "신청제한설정", items: [
					{colSpan: 2, dataField: "APP_LIMIT_TARGET", label: {text: "신청대상설정"}, editorType: "dxSelectBox", 
						editorOptions: {dataSource: reservationPerson_gbn,
							layout: "horizontal", valueExpr: "value", displayExpr: "text"
						}
					},
					{colSpan: 2, itemType: "group", colCount: 4, label: {text: "단체 구성원제한"}, items: [
						{colSpan: 2, dataField: "GRPCONSTNT_LIMTYN", label: {visible: false}, editorType: "dxSelectBox", 
							editorOptions: {dataSource: set_gbn,
								layout: "horizontal", valueExpr: "value", displayExpr: "text"
							}
						},
						{colSpan: 2, dataField: "GRPCONSTNT_LIMT_MINCNT", label: {visible: false}, editorType: "dxNumberBox", editorOptions: {showSpinButtons: true, min: 0, format: "#,##0 명 이상"}}
					]},
					{colSpan: 2, itemType: "group", colCount: 4, label: {text: "관내인원 제한"}, items: [
						{colSpan: 2, dataField: "GRPWHTHRC_LIMTYN", label: {visible: false}, editorType: "dxSelectBox", 
							editorOptions: {dataSource: set_gbn, 
								layout: "horizontal", valueExpr: "value", displayExpr: "text"
							}
						},
						{colSpan: 2, dataField: "GRPWHTHRC_LIMT_MINCNT", label: {visible: false}, editorType: "dxNumberBox", editorOptions: {showSpinButtons: true, min: 0, format: "#,##0 명 이상"}}
					]},
					{colSpan: 3, itemType: "group", colCount: 3, label: {text: "거주지역 제한설정"}, items: [
						{colSpan: 2, dataField: "APP_RESDNC_LIMTYN", label: {visible: false}, editorType: "dxSelectBox",
							editorOptions: {dataSource: livingAreaLimit_gbn,
								layout: "horizontal", valueExpr: "value", displayExpr: "text"
							}
						},
						{dataField: "AREA_IDX", label: {visible: false}, editorType: "dxSelectBox", 
							editorOptions: {dataSource: getAreaList(), 
								layout: "horizontal", valueExpr: "value", displayExpr: "text",
								onInitialized: function (e) {
									e.component.option("dataSource")[0].visible = true;
									
									//초기값 설정
									var livingAreaList = e.component.option("dataSource")[0].value;
									if (e.component.option("value") == "") {
										e.component.option("value", livingAreaList);
									}
								}
							}
						}
					]},
					{ colSpan: 3, itemType: "empty" }
				]}
			],
			onInitialized: function (e) {
				var customHandlerInit = function (e) {
					var orgData = e.component.option("formData");
					
					if (orgData.APP_LIMIT_TARGET == "") {
						e.component.getEditor("APP_LIMIT_TARGET").option("value", "0");
					}
					if (orgData.APP_LIMIT_TARGET == "1") {
						e.component.getEditor("GRPCONSTNT_LIMTYN").option("disabled", true);
						e.component.getEditor("GRPCONSTNT_LIMT_MINCNT").option("disabled", true);
					}
					else {
						e.component.getEditor("GRPCONSTNT_LIMTYN").option("disabled", false);
						e.component.getEditor("GRPCONSTNT_LIMT_MINCNT").option("disabled", false);
					}
					
					if (orgData.GRPCONSTNT_LIMTYN == "") {
						e.component.getEditor("GRPCONSTNT_LIMTYN").option("value", "0");
					}
					if (orgData.APP_LIMIT_TARGET == "1" || orgData.GRPCONSTNT_LIMTYN == "0") {
						e.component.getEditor("GRPCONSTNT_LIMT_MINCNT").option("disabled", true);
					}
					else {
						e.component.getEditor("GRPCONSTNT_LIMT_MINCNT").option("disabled", false);
					}
					
					if (orgData.GRPWHTHRC_LIMTYN == "") {
						e.component.getEditor("GRPWHTHRC_LIMTYN").option("value", "0");
					}
					if (orgData.GRPWHTHRC_LIMTYN == "0") {
						e.component.getEditor("GRPWHTHRC_LIMT_MINCNT").option("disabled", true);
					}
					else {
						e.component.getEditor("GRPWHTHRC_LIMT_MINCNT").option("disabled", false);
					}
					
					if (orgData.APP_RESDNC_LIMTYN == "") {
						e.component.getEditor("APP_RESDNC_LIMTYN").option("value", "0");
					}
					if (orgData.APP_RESDNC_LIMTYN == "1") {
						e.component.getEditor("AREA_IDX").option("disabled", false);
					}
					else {
						e.component.getEditor("AREA_IDX").option("disabled", true);
					}
				}
				e.component.on("contentReady", customHandlerInit);
			},
			onContentReady: function (e) {
				$(".temp-noflex").parent().css("justify-content", "space-around");
				$(".temp-noflex").parent().parent().css("flex", "");
			},
			onFieldDataChanged : function (e) {
				//신청대상설정
				if (e.dataField == "APP_LIMIT_TARGET") {
					if (e.value == "1") {
						e.component.getEditor("GRPCONSTNT_LIMTYN").option("disabled", true);
						e.component.getEditor("GRPCONSTNT_LIMT_MINCNT").option("disabled", true);
					}
					else {
						e.component.getEditor("GRPCONSTNT_LIMTYN").option("disabled", false);
						
						if (e.component.getEditor("GRPCONSTNT_LIMTYN").option("value") == "0") {
							e.component.getEditor("GRPCONSTNT_LIMT_MINCNT").option("disabled", true);
						}
						else {
							e.component.getEditor("GRPCONSTNT_LIMT_MINCNT").option("disabled", false);
						}
					}
				}
				
				//단체구성원제한
				if (e.dataField == "GRPCONSTNT_LIMTYN") {
					if (e.value == "0") {
						e.component.getEditor("GRPCONSTNT_LIMT_MINCNT").option("disabled", true);
					}
					else {
						e.component.getEditor("GRPCONSTNT_LIMT_MINCNT").option("disabled", false);
					}
				}
				
				//관내인원제한
				if (e.dataField == "GRPWHTHRC_LIMTYN") {
					if (e.value == "0") {
						e.component.getEditor("GRPWHTHRC_LIMT_MINCNT").option("disabled", true);
					}
					else {
						e.component.getEditor("GRPWHTHRC_LIMT_MINCNT").option("disabled", false);
					}
				}
				
				//거주지역제한설정
				if (e.dataField == "APP_RESDNC_LIMTYN") {
					if (e.value == "1") {
						e.component.getEditor("AREA_IDX").option("disabled", false);
					}
					else {
						e.component.getEditor("AREA_IDX").option("disabled", true);
					}
				}
				
				$(".temp-noflex").parent().css("justify-content", "space-around");
				$(".temp-noflex").parent().parent().css("flex", "");
			}
		}).dxForm("instance");
	}
}

//예약가능일 설정
function reservePossibleItem(objForm, data) {
	var possibleItems = [];
	
	if (data == "M") {
		if (objForm == "tab1") {
			possibleItems.push(
				{dataField: "RENT_MONTH_AFDAYS", label: {text: "신청일기준"}, editorType: "dxNumberBox", editorOptions: {showSpinButtons: true, min: 0, format: "#,##0 일 후", elementAttr: {class: "form-input120 noflex"}}},
			);
		}
		
		possibleItems.push(
			{dataField: "RENT_SMONTH_GBN", label: {visible: false}, cssClass: "form-nolabel40", editorType: "dxSelectBox", 
				editorOptions: {dataSource: addMonthItems,
					layout: "horizontal", valueExpr: "value", displayExpr: "text"
				}
			},
			{dataField: "RENT_EMONTH_GBN", label: {text: " ~ "}, cssClass: "form-label40", editorType: "dxSelectBox", 
				editorOptions: {dataSource: addMonthItems,
					layout: "horizontal", valueExpr: "value", displayExpr: "text"
				}
			},
		);
		
		if (objForm == "tab1") {
			possibleItems.push(
				{dataField: "TODAY_RESVEYN", label: {visible: false}, editorType: "dxSelectBox", 
					editorOptions: {dataSource: dDayReservation_gbn,
						layout: "horizontal", valueExpr: "value", displayExpr: "text"
					}
				}
			);
		}
	}
	else if(data == "D") {
		possibleItems.push(
			{dataField: "RENT_SDAYS", label: {text: "이용일"}, editorType: "dxNumberBox", editorOptions: {showSpinButtons: true, min: 0, format: "#,##0 일전", elementAttr: {class: "form-input120 noflex"}}},
			{ cssClass: "temp-noflex", template: "<div>~</div>"},
			{dataField: "RENT_EDAYS", label: {location: "right", text: "까지 예약 "}, editorType: "dxNumberBox", editorOptions: {showSpinButtons: true, min: 0, format: "#,##0 일전", elementAttr: {class: "form-input120 noflex"}}},
			{dataField: "TODAY_RESVEYN", label: {visible: false}, editorType: "dxSelectBox", 
				editorOptions: {dataSource: dDayReservation_gbn,
					layout: "horizontal", valueExpr: "value", displayExpr: "text"
				}
			}
		);
		
	}
	else if (data == "T") {
		possibleItems.push(
			{dataField: "FCT_RESERVE_START_DATE", label: {visible: false}, editorType: "dxDateBox", editorOptions: {value: nowDate, width: "100%", displayFormat: 'yyyy-MM-dd'}},
			{dataField: "FCT_RESERVE_END_DATE", label: {visible: false}, editorType: "dxDateBox", editorOptions: {value: nowDate, width: "100%", displayFormat: 'yyyy-MM-dd'}}
		);
	}
	
	return possibleItems;
}