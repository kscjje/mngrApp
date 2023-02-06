//정기대관 설정
let tab2_form = new Array(10);
let reserveDateType = "";			//접수기간 운영방법
var possibleDateType = "";			//예약가능일 설정방법
let choiceDateYn = "";				//추첨기간 설정유무
let scheduleType = "";				//추첨스케줄 방법
let scheduleDateType = "";			//추첨스케줄 자동 세부방법

let tab2form1Repaint = false;
let tab2form2Repaint = false;

var formData2 = {
		FCT_RESERVATION_AREA: "online",				//접수경로설정
		FCT_RESERVATION_TYPE: "F",					//접수방식
		FCT_WINCOUNT_LIMIT_YN: "0",					//당첨횟수제한
		FCT_WINCOUNT_LIMIT: 1,						//당첨제한 횟수
		FCT_RESERVATION_DATE_TYPE: "1",				//접수기간운영방법
		FCT_APPLICANT_TYPE: "manager",				//신청자 선정방식
		FCT_RESERVATION_PERSON: "0",				//신청대상설정
		FCT_TEAM_LIMIT_YN: "0",						//단체구성원제한
		FCT_TEAM_LIMIT: 0,							//단체구성원제한 인원
		FCT_INAREA_LIMIT_YN: "1",					//관내인원제한
		FCT_INAREA_LIMIT: 0,						//관내인원제한 인원
		FCT_POSSIBLE_ALLTIME_YN: "1",				//전일회차 노출여부
		FCT_MIN_TIMES: 0,							//예약가능회차 최소
		FCT_MAX_TIMES: 0,							//예약가능회차 최대
		FCT_CONTINU_YN: "1",						//연접회차유무
		FCT_POSSIBLE_DATE_TYPE: "M",				//예약가능일 설정방법
		FCT_LIMIT_DAY: 0,							//신청일기준일
		FCT_START_USEMONTH: 0,						//신청일기준 시작월
		FCT_END_USEMONTH: 1,						//신청일기준 종료월
		FCT_RESERVE_START_DATE: "",					//신청기간 시작일자
		FCT_RESERVE_END_DATE: "",					//신청기간 종료일자
		
		FCT_INAREA_USE_YN: "1",						//관내 접수설정여부
		FCT_INAREA_AREA_LIMIT_YN: "0",				//관내 거주지역제한설정
		FCT_INAREA_AREA_LIST: "",					//관내 거주지역제한 행정동
		FCT_INAREA_RESERVE_START_DAY: 1,			//관내 접수기간 시작월
		FCT_INAREA_RESERVE_START_TIME: "00:00",		//관내 접수기간 시작시간
		FCT_INAREA_RESERVE_END_DAY: 1,				//관내 접수기간 종료월
		FCT_INAREA_RESERVE_END_TIME: "00:00",		//관내 접수기간 종료시간
		FCT_INAREA_RESERVE_START_DATE: "",			//관내 접수기간 시작일자
		FCT_INAREA_RESERVE_END_DATE: "",			//관내 접수기간 종료일자
		FCT_INAREA_CHOICE_DATE_YN: "N",				//관내 추첨기간
		FCT_INAREA_CHOICE_DDAY: 0,					//관내 추첨기간(D-DAY) 일
		FCT_INAREA_CHOICE_DAY: 1,					//관내 추첨기간(일자설정) 일
		FCT_INAREA_CHOICE_TIME: "00:00",			//관내 추첨기간(일자설정) 시간
		FCT_INAREA_CHOICE_DATE: "",					//관내 추첨기간(일자설정) 일자
		FCT_INAREA_CHOICE_SCHEDULE_TYPE: "M",		//관내 추첨스케줄설정 타입
		FCT_INAREA_SCHEDULE_TYPE: "D",				//관내 추첨스케줄설정 기준
		FCT_INAREA_SCHEDULE_DDAY: 0,				//관내 추첨스케줄설정(D-DAY) 일
		FCT_INAREA_SCHEDULE_TIME: "00:00",			//관내 추첨스케줄설정(D-DAY) 시간
		FCT_INAREA_SCHEDULE_DAY: 0,					//관내 추첨스케줄설정(일자설정) 일
		FCT_INAREA_SCHEDULE_DATE: "",				//관내 추첨스케줄설정(일자설정) 일자
		FCT_INAREA_PRESENTATION_DATE: "",			//관내 추첨기간
		
		FCT_TOTAL_USE_YN: "1",						//전체 접수설정여부
		FCT_TOTAL_AREA_LIMIT_YN: "0",				//전체 거주지역제한설정
		FCT_TOTAL_AREA_LIST: "",					//전체 거주지역제한 행정동
		FCT_TOTAL_RESERVE_START_DAY: 1,				//전체 접수기간 시작월
		FCT_TOTAL_RESERVE_START_TIME: "00:00",		//전체 접수기간 시작시간
		FCT_TOTAL_RESERVE_END_DAY: 1,				//전체 접수기간 종료월
		FCT_TOTAL_RESERVE_END_TIME: "00:00",		//전체 접수기간 종료시간
		FCT_TOTAL_RESERVE_START_DATE: "",			//전체 접수기간 시작일자
		FCT_TOTAL_RESERVE_END_DATE: "",				//전체 접수기간 종료일자
		FCT_TOTAL_CHOICE_DATE_YN: "N",				//전체 추첨기간
		FCT_TOTAL_CHOICE_DDAY: 0,					//전체 추첨기간(D-DAY) 일
		FCT_TOTAL_CHOICE_DAY: 1,					//전체 추첨기간(일자설정) 일
		FCT_TOTAL_CHOICE_TIME: "00:00",				//전체 추첨기간(일자설정) 시간
		FCT_TOTAL_CHOICE_DATE: "",					//전체 추첨기간(일자설정) 일자
		FCT_TOTAL_CHOICE_SCHEDULE_TYPE: "M",		//전체 추첨스케줄설정 타입
		FCT_TOTAL_SCHEDULE_TYPE: "D",				//전체 추첨스케줄설정 기준
		FCT_TOTAL_SCHEDULE_DDAY: 0,					//전체 추첨스케줄설정(D-DAY) 일
		FCT_TOTAL_SCHEDULE_TIME: "00:00",			//전체 추첨스케줄설정(D-DAY) 시간
		FCT_TOTAL_SCHEDULE_DAY: 0,					//전체 추첨스케줄설정(일자설정) 일
		FCT_TOTAL_SCHEDULE_DATE: "",				//전체 추첨스케줄설정(일자설정) 일자
		FCT_TOTAL_PRESENTATION_DATE: ""				//전체 추첨기간
	}

//하위탭설정
function initReqularSubTabList() {
	//if(subMenuList != null) return;
	
	var tabClass = "";
	var states = "";
	var tabSelectedItem ='';
	
	tabClass = "#tab2 .tab_list";
	
	states = [
		{id: 1, text: "기본설정"},
		{id: 2, text: "관내접수기간설정"},
		{id: 3, text: "전체접수기간설정"}
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

	    	reqularForm(cur);
	    	reqularDisplayFormMenuChange(cur);
    		
		}
	}).dxList("instance");
	
	subMenuList.selectItem(0);
}

function reqularDisplayFormMenuChange(curItem){
	if (tab2_form[0] && tab2_form[0].option("visible") == true) {
		tab2_form[0].option("visible", false);
	}
	if (tab2_form[1] && tab2_form[1].option("visible") == true) {
		tab2_form[1].option("visible", false);
	}
	if (tab2_form[2] && tab2_form[2].option("visible") == true) {
		tab2_form[2].option("visible", false);
	}
	
	if( curItem == 1 ){
		tab2_form[0].option("visible", true);
	}else if( curItem == 2 ){
		tab2_form[1].option("visible", true);
	}else if( curItem == 3 ){
		tab2_form[2].option("visible",true);
	}
	
}

function reqularForm(subTabId) {
	
	if (subTabId == 1) {
		tab2_form[0] = $("#tab2 .contents1").dxForm({
			showColonAfterLabel: false,
			formData: formData2,
			colcount: 2,
			items: [
				{itemType: "button", colSpan: 6, horizontalAlignment: "right", cssClass: "form-button",
					buttonOptions: {
						text: "저장하기",
						type: "success",
						useSubmitBehavior: true
					}
				},
				{itemType: "group", colCount: 6, caption: "접수방법설정", items: [
					{colSpan: 2, dataField: "FCT_RESERVATION_AREA", label: {text: "접수경로설정"}, editorType: "dxSelectBox", 
						editorOptions: {dataSource: reserveChannel_gbn,
							layout: "horizontal", valueExpr: "value", displayExpr: "text",
							onInitialized: function (e) {
								//초기값 설정
								var reserveArea = e.component.option("dataSource")[0].value;
								if (e.component.option("value") == null) {
									e.component.option("value", reserveArea);
								}
							}
						}
					},
					{colSpan: 2, dataField: "FCT_RESERVATION_TYPE", label: {text: "접수방식"}, editorType: "dxSelectBox",
						editorOptions: {dataSource: reservationType_gbn, 
							layout: "horizontal", valueExpr: "value", displayExpr: "text",
							onInitialized: function (e) {
								e.component.option("dataSource")[1].visible = true;
								
								//초기값 설정
								var reserveType = e.component.option("dataSource")[0].value;
								if (e.component.option("value") == null) {
									e.component.option("value", reserveType);
								}
							}
						}
					},
					{colSpan: 2, itemType: "group", colCount: 2, label: {text: "당첨횟수제한"}, items: [
						{dataField: "FCT_WINCOUNT_LIMIT_YN", label: {visible: false}, editorType: "dxSelectBox", disabled: true,
							editorOptions: {dataSource: restrict_gbn,
								layout: "horizontal", valueExpr: "value", displayExpr: "text",
								onInitialized: function (e) {
									//초기값 설정
									var wincountLimitYn = e.component.option("dataSource")[0].value;
									if (e.component.option("value") == null) {
										e.component.option("value", wincountLimitYn);
									}
								}
							}
						},
						{dataField: "FCT_WINCOUNT_LIMIT", label: {visible: false}, editorType: "dxNumberBox", disabled: true,
							editorOptions: {showSpinButtons: true, min: 0, max: 10, format: "월 #,##0 회까지", elementAttr: {class: "form-input120 noflex"}}
						}
					]},
					
					{colSpan: 2, dataField: "FCT_RESERVATION_DATE_TYPE", label: {text: "접수기간 운영방법"}, editorType: "dxSelectBox",
						editorOptions: {dataSource: recvterm_gbn, 
							layout: "horizontal", valueExpr: "value", displayExpr: "text"
						}
					},
					{colSpan: 2, dataField: "FCT_APPLICANT_TYPE", label: {text: "신청자(추첨당첨자)\선정방식"}, editorType: "dxSelectBox",
						editorOptions: {dataSource: facilityApplicantType_gbn,
							layout: "horizontal", valueExpr: "value", displayExpr: "text",
							onInitialized: function (e) {
								//초기값 설정
								var applicantType = e.component.option("dataSource")[0].value;
								if (e.component.option("value") == null) {
									e.component.option("value", applicantType);
								}
							}
						}
					},
					{colSpan: 2, itemType: "empty"}
				]},
				
				{name: "applyReserveTime", itemType: "group", colCount: 6, caption: "신청/예약시간제한설정", items: [
					{colSpan: 2, dataField: "FCT_RESERVATION_PERSON", label: {text: "신청대상설정"}, editorType: "dxSelectBox",
						editorOptions: {dataSource: reservationPerson_gbn,
							layout: "horizontal", valueExpr: "value", displayExpr: "text",
							onInitialized: function (e) {
								//초기값 설정
								var applicantMember = e.component.option("dataSource")[0].value;
								if (e.component.option("value") == null) {
									e.component.option("value", applicantMember);
								}
							}
						}
					},
					{colSpan: 2, itemType: "group", colCount: 2, label: {text: "단체구성원제한"}, items: [
						{dataField: "FCT_TEAM_LIMIT_YN", label: {visible: false}, editorType: "dxSelectBox",
							editorOptions: {dataSource: set_gbn,
								layout: "horizontal", valueExpr: "value", displayExpr: "text",
								onInitialized: function (e) {
									//초기값 설정
									var teamLimitYn = e.component.option("dataSource")[0].value;
									if (e.component.option("value") == null) {
										e.component.option("value", teamLimitYn);
									}
								}
							}
						},
						{dataField: "FCT_TEAM_LIMIT", label: {visible: false}, editorType: "dxNumberBox",
							editorOptions: {showSpinButtons: true, min: 0, max: 100, format: "#,##0 명 이상", elementAttr: {class: "form-input120 noflex"}}
						}
					]},
					{colSpan: 2, itemType: "group", colCount: 2, label: {text: "관내인원제한"}, items: [
						{dataField: "FCT_INAREA_LIMIT_YN", label: {visible: false}, editorType: "dxSelectBox",
							editorOptions: {dataSource: set_gbn,
								layout: "horizontal", valueExpr: "value", displayExpr: "text",
								onInitialized: function (e) {
									//초기값 설정
									var limitYn = e.component.option("dataSource")[0].value;
									if (e.component.option("value") == null) {
										e.component.option("value", limitYn);
									}
								}
							}
						},
						{dataField: "FCT_INAREA_LIMIT", label: {visible: false}, editorType: "dxNumberBox",
							editorOptions: {showSpinButtons: true, min: 0, max: 100, format: "#,##0 명 이상", elementAttr: {class: "form-input120 noflex"}}
						}
					]},
					
					{colSpan: 2, dataField: "FCT_POSSIBLE_ALLTIME_YN", label: {text: "예약가능 회차설정"}, editorType: "dxCheckBox",
						editorOptions: {text: "전일 회차 노출여부", value: "1"}
					},
					{colSpan: 4, itemType: "group", colCount: 4, label: {text: "최소/최대회차설정"}, items: [
						{dataField: "FCT_MIN_TIMES", label: {text: "최소"}, editorType: "dxNumberBox", cssClass: "form-label40", editorOptions: {showSpinButtons: true, min: 0, max: 20, format: "#,##0 회차"}},
						{cssClass: "temp-noflex", template: "<div>~</div>"},
						{dataField: "FCT_MAX_TIMES", label: {text: "최대"}, editorType: "dxNumberBox", cssClass: "form-label40", editorOptions: {showSpinButtons: true, min: 0, max: 20, format: "#,##0 회차"}},
						{dataField: "FCT_CONTINU_YN", label: {visible: false}, editorType: "dxSelectBox", 
							editorOptions: {dataSource: facilityContinu_gbn,
								layout: "horizontal", valueExpr: "value", displayExpr: "text",
								onInitialized: function (e) {
									//초기값 설정
									var continuYn = e.component.option("dataSource")[0].value;
									if (e.component.option("value") == null) {
										e.component.option("value", continuYn);
									}
								}
							}
						},
					]},
					
					{colSpan: 2, dataField: "FCT_POSSIBLE_DATE_TYPE", label: {text: "예약가능일 설정방법"}, editorType: "dxSelectBox", 
						editorOptions: {dataSource: possibleDateType_gbn,
							layout: "horizontal", valueExpr: "value", displayExpr: "text",
							onInitialized: function (e) {
								e.component.option("dataSource")[0].visible = false;
								e.component.option("dataSource")[2].visible = true;
								
								possibleDateType = e.component.option("dataSource")[0].value;
								if (e.component.option("value") == null) {
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
					
					//접수방식
					if (orgData.FCT_RESERVATION_TYPE == "") {
						e.component.getEditor("FCT_RESERVATION_TYPE").option("value", "F");
					}
					/*
					if (orgData.FCT_RESERVATION_TYPE == "D") {
						e.component.getEditor("FCT_WINCOUNT_LIMIT_YN").option("disabled", false);
						e.component.getEditor("FCT_WINCOUNT_LIMIT").option("disabled", false);
					}
					else {
						e.component.getEditor("FCT_WINCOUNT_LIMIT_YN").option("disabled", true);
						e.component.getEditor("FCT_WINCOUNT_LIMIT").option("disabled", true);
					}
					*/
					
					//접수기간 운영방법
					if (orgData.FCT_RESERVATION_DATE_TYPE == "") {
						e.component.getEditor("FCT_RESERVATION_DATE_TYPE").option("value", "1"); 
					}
					reserveDateType = e.component.getEditor("FCT_RESERVATION_DATE_TYPE").option("value");
					
					//신청대상설정
					if (orgData.FCT_RESERVATION_PERSON == "") {
						e.component.getEditor("FCT_RESERVATION_PERSON").option("value", "0");
					}
					if (orgData.FCT_RESERVATION_PERSON == "1") {
						e.component.getEditor("FCT_TEAM_LIMIT_YN").option("disabled", true);
						e.component.getEditor("FCT_TEAM_LIMIT").option("disabled", true);
					}
					else {
						e.component.getEditor("FCT_TEAM_LIMIT_YN").option("disabled", false);
						e.component.getEditor("FCT_TEAM_LIMIT").option("disabled", false);
					}
					
					//단체구성원제한
					if (orgData.FCT_TEAM_LIMIT_YN == "") {
						e.component.getEditor("FCT_TEAM_LIMIT_YN").option("value", "0");
					}
					if (orgData.FCT_RESERVATION_PERSON == "1" || orgData.FCT_TEAM_LIMIT_YN == "0") {
						e.component.getEditor("FCT_TEAM_LIMIT").option("disabled", true);
					}
					else {
						e.component.getEditor("FCT_TEAM_LIMIT").option("disabled", false);
					}
					
					//관내인원제한
					if (orgData.FCT_INAREA_LIMIT_YN == "") {
						e.component.getEditor("FCT_INAREA_LIMIT_YN").option("value", "0");
					}
					if (orgData.FCT_INAREA_LIMIT_YN == "0") {
						e.component.getEditor("FCT_INAREA_LIMIT").option("disabled", true);
					}
					else {
						e.component.getEditor("FCT_INAREA_LIMIT").option("disabled", false);
					}
					
					//예약가능일 설정방법
					if (orgData.FCT_POSSIBLE_DATE_TYPE == "") {
						e.component.getEditor("FCT_POSSIBLE_DATE_TYPE").option("value", reserveDateType);
					}
					e.component.itemOption("applyReserveTime.depositType", "items", reservePossibleItem("tab2", orgData.FCT_POSSIBLE_DATE_TYPE));

				}
				e.component.on("contentReady", customHandlerInit);
			},
			onContentReady: function (e) {
				$(".temp-noflex").parent().css("justify-content", "space-around");
				$(".temp-noflex").parent().parent().css("flex", "");
			},
			onFieldDataChanged: function (e) {
				//접수방식
				/*
				if (e.dataField == "FCT_RESERVATION_TYPE") {
					if (e.value == "D") {
						e.component.getEditor("FCT_WINCOUNT_LIMIT_YN").option("disabled", false);
						if (e.component.getEditor("FCT_WINCOUNT_LIMIT_YN").option("value") == "0") {
							e.component.getEditor("FCT_WINCOUNT_LIMIT").option("disabled", true);
						}
						else {
							e.component.getEditor("FCT_WINCOUNT_LIMIT").option("disabled", false);
						}
					}
					else {
						e.component.getEditor("FCT_WINCOUNT_LIMIT_YN").option("disabled", true);
						e.component.getEditor("FCT_WINCOUNT_LIMIT").option("disabled", true);
					}
				}
				if (e.dataField == "FCT_WINCOUNT_LIMIT_YN") {
					if (e.value == "1") {
						e.component.getEditor("FCT_WINCOUNT_LIMIT").option("disabled", false);
					}
					else {
						e.component.getEditor("FCT_WINCOUNT_LIMIT").option("disabled", true);
					}
				}
				*/
				
				//접수기간 운영방법
				if (e.dataField == "FCT_RESERVATION_DATE_TYPE") {
					reserveDateType = e.value;
					
					tab2form1Repaint = true;
					tab2form2Repaint = true;
				}
				
				//신청대상설정
				if (e.dataField == "FCT_RESERVATION_PERSON") {
					if (e.value == "1") {
						e.component.getEditor("FCT_TEAM_LIMIT_YN").option("disabled", true);
						e.component.getEditor("FCT_TEAM_LIMIT").option("disabled", true);
					}
					else {
						e.component.getEditor("FCT_TEAM_LIMIT_YN").option("disabled", false);
						
						if (e.component.getEditor("FCT_TEAM_LIMIT_YN").option("value") == "0") {
							e.component.getEditor("FCT_TEAM_LIMIT").option("disabled", true);
						}
						else {
							e.component.getEditor("FCT_TEAM_LIMIT").option("disabled", false);
						}
					}
				}
				
				//단체구성원제한
				if (e.dataField == "FCT_TEAM_LIMIT_YN") {
					if (e.value == "0") {
						e.component.getEditor("FCT_TEAM_LIMIT").option("disabled", true);
					}
					else {
						e.component.getEditor("FCT_TEAM_LIMIT").option("disabled", false);
					}
				}
				
				//관내인원제한
				if (e.dataField == "FCT_INAREA_LIMIT_YN") {
					if (e.value == "0") {
						e.component.getEditor("FCT_INAREA_LIMIT").option("disabled", true);
					}
					else {
						e.component.getEditor("FCT_INAREA_LIMIT").option("disabled", false);
					}
				}
				
				//예약가능일 설정방법
				if (e.dataField == "FCT_POSSIBLE_DATE_TYPE") {
					e.component.itemOption("reserveTime.depositType", "items", reservePossibleItem("tab2", e.value));
				}
				
				$(".temp-noflex").parent().css("justify-content", "space-around");
				$(".temp-noflex").parent().parent().css("flex", "");
			}
		}).dxForm("instance");
	}
	else if (subTabId == 2) {
		if (tab2_form[1] != null) {
			if (tab2form1Repaint) {
				tab2_form[1].repaint();
			}
			tab2form1Repaint = false;
			return;
		}
		tab2form1Repaint = false;
		
		tab2_form[1] = $("#tab2 .contents2").dxForm({
			showColonAfterLabel: false,
			formData: formData2,
			items: [
				{itemType: "button", colSpan: 6, horizontalAlignment: "right", cssClass: "form-button",
					buttonOptions: {
						text: "저장하기",
						type: "success",
						useSubmitBehavior: true
					}
				},
				{name: "inArea", itemType: "group", colCount: 6, caption: "관내접수 기간설정", items: [
					{colSpan:2, dataField: "FCT_INAREA_USE_YN", label: {text: "접수설정여부"}, editorType: "dxSelectBox",
						editorOptions: {dataSource: run_gbn,
							layout: "horizontal", valueExpr: "value", displayExpr: "text",
							onInitialized: function (e) {
								var inAreaUseYn = e.component.option("dataSource")[0].value;
								if (e.component.option("value") == null) {
									e.component.option("value", inAreaUseYn);
								}
							}
						}
					},
					{ colSpan: 4, itemType: "empty"},
					
					{colSpan: 2, dataField: "FCT_INAREA_AREA_LIMIT_YN", label: {text: "거주지역 제한설정"}, editorType: "dxSelectBox",
						editorOptions: {dataSource: livingAreaLimit_gbn,
							layout: "horizontal", valueExpr: "value", displayExpr: "text"
						}
					},
					{dataField: "FCT_INAREA_AREA_LIST", label: {visible: false}, editorType: "dxSelectBox",
						editorOptions: {dataSource: getAreaList(),
							layout: "horizontal", valueExpr: "value", displayExpr: "text"
						}
					},
					{colSpan: 3, itemType: "empty" },
					
					{name: "reserveDate", colSpan: 4, itemType: "group", colCount: 5, label: {text: "접수기간"}, items: ""},
					{ colSpan: 2, itemType: "empty" },
					
					{colSpan: 2, dataField: "FCT_INAREA_CHOICE_DATE_YN", label: {text: "추첨기간"}, editorType: "dxSelectBox",
						editorOptions: {dataSource: choiceDateType_gbn,
							layout: "horizontal", valueExpr: "value", displayExpr: "text"
						}
					},
					{name: "choiceType", colSpan: 3, itemType: "group", colCount: 4, lable: {visible: false}, items: ""},
					{ itemType: "empty" },
					
					{colSpan: 2, dataField: "FCT_INAREA_CHOICE_SCHEDULE_TYPE", label: {text: "추첨스케줄설정"}, editorType: "dxSelectBox",
						editorOptions: {dataSource: choiceSchedule_gbn,
							layout: "horizontal", valueExpr: "value", displayExpr: "text"
						}
					},
					{name: "scheduleType", colSpan: 3, itemType: "group", colCount: 5, lable: {visible: false}, items: ""},
					{ itemType: "empty" }
				]}
			],
			onInitialized: function (e) {
				var customHandlerInit = function (e) {
					var orgData = e.component.option("formData");
					
					var blnDisabled = true;
					//접수설정여부
					if (orgData.FCT_INAREA_USE_YN == "") {
						e.component.getEditor("FCT_INAREA_USE_YN").option("value", "1");
					}
					if (orgData.FCT_INAREA_USE_YN == "0") {
						blnDisabled = true;
					}
					else {
						blnDisabled = false;
					}
					
					//거주지역 제한설정
					if (orgData.FCT_INAREA_AREA_LIMIT_YN == "") {
						e.component.getEditor("FCT_INAREA_AREA_LIMIT_YN").option("value", "0");
					}
					if (orgData.FCT_INAREA_AREA_LIST == "") {
						e.component.getEditor("FCT_INAREA_AREA_LIST").option("value", "0");
					}
					e.component.getEditor("FCT_INAREA_AREA_LIMIT_YN").option("disabled", blnDisabled);
					e.component.getEditor("FCT_INAREA_AREA_LIST").option("disabled", !blnDisabled && orgData.FCT_INAREA_AREA_LIMIT_YN == "1" ? false : true);

					//접수기간
					e.component.itemOption("inArea.reserveDate", "items", reserveDateItem(subTabId, reserveDateType));
					if (reserveDateType == "1") {
						e.component.getEditor("FCT_INAREA_RESERVE_START_MONTH").option("disabled", blnDisabled);
						e.component.getEditor("FCT_INAREA_RESERVE_END_MONTH").option("disabled", blnDisabled);
					}
					else {
						e.component.getEditor("FCT_INAREA_RESERVE_START_DATE").option("disabled", blnDisabled);
						e.component.getEditor("FCT_INAREA_RESERVE_END_DATE").option("disabled", blnDisabled);
					}
					e.component.getEditor("FCT_INAREA_RESERVE_START_TIME").option("disabled", blnDisabled);
					e.component.getEditor("FCT_INAREA_RESERVE_END_TIME").option("disabled", blnDisabled);
					
					//추첨기간
					if (orgData.FCT_INAREA_CHOICE_DATE_YN == "") {
						e.component.getEditor("FCT_INAREA_CHOICE_DATE_YN").option("value", "N");
					}
					e.component.itemOption("inArea.choiceType", "items", choiceDateItem(subTabId, orgData.FCT_INAREA_CHOICE_DATE_YN));
					e.component.getEditor("FCT_INAREA_CHOICE_DATE_YN").option("disabled", blnDisabled);
					if (orgData.FCT_INAREA_CHOICE_DATE_YN == "D") {
						e.component.getEditor("FCT_INAREA_CHOICE_DDAY").option("disabled", blnDisabled);
					}
					else if (orgData.FCT_INAREA_CHOICE_DATE_YN == "S") { 
						if (reserveDateType == "1") {
							e.component.getEditor("FCT_INAREA_CHOICE_DAY").option("disabled", blnDisabled);
						}
						else {
							e.component.getEditor("FCT_INAREA_CHOICE_DATE").option("disabled", blnDisabled);
						}
						e.component.getEditor("FCT_INAREA_CHOICE_TIME").option("disabled", blnDisabled);
					}
					
					
					//추첨스케줄설정
					if (orgData.FCT_INAREA_CHOICE_SCHEDULE_TYPE == "") {
						e.component.getEditor("FCT_INAREA_CHOICE_SCHEDULE_TYPE").option("value", "M");
					}
					e.component.itemOption("inArea.scheduleType", "items", scheduleDateItem(subTabId, orgData.FCT_INAREA_CHOICE_SCHEDULE_TYPE));
					e.component.getEditor("FCT_INAREA_CHOICE_SCHEDULE_TYPE").option("disabled", blnDisabled);
					if (orgData.FCT_INAREA_CHOICE_SCHEDULE_TYPE == "A") {
						e.component.getEditor("FCT_INAREA_SCHEDULE_TYPE").option("disabled", blnDisabled);
						if (orgData.FCT_INAREA_SCHEDULE_TYPE == "D") {
							e.component.getEditor("FCT_INAREA_SCHEDULE_DDAY").option("disabled", blnDisabled);
						}
						else {
							if (reserveDateType == "1") {
								e.component.getEditor("FCT_INAREA_SCHEDULE_DAY").option("disabled", blnDisabled);
							}
							else {
								e.component.getEditor("FCT_INAREA_SCHEDULE_DATE").option("disabled", blnDisabled);
							}
						}
						e.component.getEditor("FCT_INAREA_SCHEDULE_TIME").option("disabled", blnDisabled);
					}
					else {
						e.component.getEditor("FCT_INAREA_PRESENTATION_DATE").option("disabled", blnDisabled);
					}
				}
				e.component.on("contentReady", customHandlerInit);
			},
			onContentReady: function (e) {
				$(".temp-noflex").parent().css("justify-content", "space-around");
				$(".temp-noflex").parent().parent().css("flex", "");
			},
			onFieldDataChanged: function (e) {
				var orgData = e.component.option("formData");
				
				//접수설정여부
				if (e.dataField == "FCT_INAREA_USE_YN") {
					var blnDisabled = true;
					if (e.value == "0") {
						blnDisabled = true;
					}
					else {
						blnDisabled = false;
					}
					
					//거주지역 제한설정
					e.component.getEditor("FCT_INAREA_AREA_LIMIT_YN").option("disabled", blnDisabled);
					e.component.getEditor("FCT_INAREA_AREA_LIST").option("disabled", !blnDisabled && orgData.FCT_INAREA_AREA_LIMIT_YN == "1" ? false : true);
					
					//접수기간
					if (reserveDateType == "1") {
						e.component.getEditor("FCT_INAREA_RESERVE_START_MONTH").option("disabled", blnDisabled);
						e.component.getEditor("FCT_INAREA_RESERVE_END_MONTH").option("disabled", blnDisabled);
					}
					else {
						e.component.getEditor("FCT_INAREA_RESERVE_START_DATE").option("disabled", blnDisabled);
						e.component.getEditor("FCT_INAREA_RESERVE_END_DATE").option("disabled", blnDisabled);
					}
					e.component.getEditor("FCT_INAREA_RESERVE_START_TIME").option("disabled", blnDisabled);
					e.component.getEditor("FCT_INAREA_RESERVE_END_TIME").option("disabled", blnDisabled);
					
					//추첨기간
					e.component.getEditor("FCT_INAREA_CHOICE_DATE_YN").option("disabled", blnDisabled);
					if (orgData.FCT_INAREA_CHOICE_DATE_YN == "D") {
						e.component.getEditor("FCT_INAREA_CHOICE_DDAY").option("disabled", blnDisabled);
					}
					else if (orgData.FCT_INAREA_CHOICE_DATE_YN == "S") { 
						if (reserveDateType == "1") {
							e.component.getEditor("FCT_INAREA_CHOICE_DAY").option("disabled", blnDisabled);
						}
						else {
							e.component.getEditor("FCT_INAREA_CHOICE_DATE").option("disabled", blnDisabled);
						}
						e.component.getEditor("FCT_INAREA_CHOICE_TIME").option("disabled", blnDisabled);
					}
					
					//추첨스케줄설정
					e.component.getEditor("FCT_INAREA_CHOICE_SCHEDULE_TYPE").option("disabled", blnDisabled);
					if (orgData.FCT_INAREA_CHOICE_SCHEDULE_TYPE == "A") {
						e.component.getEditor("FCT_INAREA_SCHEDULE_TYPE").option("disabled", blnDisabled);
						if (orgData.FCT_INAREA_SCHEDULE_TYPE == "D") {
							e.component.getEditor("FCT_INAREA_SCHEDULE_DDAY").option("disabled", blnDisabled);
						}
						else {
							if (reserveDateType == "1") {
								e.component.getEditor("FCT_INAREA_SCHEDULE_DAY").option("disabled", blnDisabled);
							}
							else {
								e.component.getEditor("FCT_INAREA_SCHEDULE_DATE").option("disabled", blnDisabled);
							}
						}
						e.component.getEditor("FCT_INAREA_SCHEDULE_TIME").option("disabled", blnDisabled);
					}
					else {
						e.component.getEditor("FCT_INAREA_PRESENTATION_DATE").option("disabled", blnDisabled);
					}
				}
				
				//거주지역제한설정 
				if (e.dataField == "FCT_INAREA_AREA_LIMIT_YN") {
					if (e.value == "1") {
						e.component.getEditor("FCT_INAREA_AREA_LIST").option("disabled", false);
					}
					else {
						e.component.getEditor("FCT_INAREA_AREA_LIST").option("disabled", true);
					}
				}
				
				//추첨기간
				if (e.dataField == "FCT_INAREA_CHOICE_DATE_YN") {
					e.component.itemOption("inArea.choiceType", "items", choiceDateItem(subTabId, e.value));
				}
				
				//추첨스케줄설정
				if (e.dataField == "FCT_INAREA_CHOICE_SCHEDULE_TYPE") {
					e.component.itemOption("inArea.scheduleType", "items", scheduleDateItem(subTabId, e.value));
				}
				
				$(".temp-noflex").parent().css("justify-content", "space-around");
				$(".temp-noflex").parent().parent().css("flex", "");
			}
		}).dxForm("instance");
	}
	else if (subTabId == 3) {
		if (tab2_form[2] != null) {
			if (tab2form2Repaint) {
				tab2_form[2].repaint();
			}
			tab2form2Repaint = false;
			return;
		}
		tab2form2Repaint = false;
		
		tab2_form[2] = $("#tab2 .contents3").dxForm({
			showColonAfterLabel: false,
			formData: formData2,
			items: [
				{itemType: "button", colSpan: 6, horizontalAlignment: "right", cssClass: "form-button",
					buttonOptions: {
						text: "저장하기",
						type: "success",
						useSubmitBehavior: true
					}
				},
				{name: "totalReserve", itemType: "group", colCount: 6, caption: "전체접수 기간설정", items: [
					{colSpan: 2, dataField: "FCT_TOTAL_USE_YN", label: {text: "접수설정여부"}, editorType: "dxSelectBox",
						editorOptions: {dataSource: run_gbn,
							layout: "horizontal", valueExpr: "value", displayExpr: "text",
							onInitialized: function (e) {
								//초기값 설정
								var totalUseYn = e.component.option("dataSource")[0].value;
								if (e.component.option("value") == null) {
									e.component.option("value", totalUseYn);
								}
							}
						}
					},
					{ colSpan: 4, itemType: "empty"},
					
					{colSpan: 2, dataField: "FCT_TOTAL_AREA_LIMIT_YN", label: {text: "거주지역 제한설정"}, editorType: "dxSelectBox",
						editorOptions: {dataSource: livingAreaLimit_gbn,
							layout: "horizontal", valueExpr: "value", displayExpr: "text"
						}
					},
					{dataField: "FCT_TOTAL_AREA_LIST", label: {visible: false}, editorType: "dxSelectBox",
						editorOptions: {dataSource: getAreaList(),
							layout: "horizontal", valueExpr: "value", displayExpr: "text"
						}
					},
					{ colSpan: 3, itemType: "empty" },
					
					{name: "reserveDate", colSpan: 4, itemType: "group", colCount: 5, label: {text: "접수기간"}, items: ""},
					{ colSpan: 2, itemType: "empty" },
					
					{colSpan: 2, dataField: "FCT_TOTAL_CHOICE_DATE_YN", label: {text: "추첨기간"}, editorType: "dxSelectBox",
						editorOptions: {dataSource: choiceDateType_gbn,
							layout: "horizontal", valueExpr: "value", displayExpr: "text"
						}
					},
					
					{name: "choiceType", colSpan: 3, itemType: "group", colCount: 4, lable: {visible: false}, items: ""},
					{ itemType: "empty" },
					
					{colSpan: 2, dataField: "FCT_TOTAL_CHOICE_SCHEDULE_TYPE", label: {text: "추첨스케줄설정"}, editorType: "dxSelectBox",
						editorOptions: {dataSource: choiceSchedule_gbn,
							layout: "horizontal", valueExpr: "value", displayExpr: "text"
						}
					},
					{name: "scheduleType", colSpan: 3, itemType: "group", colCount: 5, lable: {visible: false}, items: ""},
					{ itemType: "empty" }
				]}
			],
			onInitialized: function (e) {
				var customHandlerInit = function (e) {
					var orgData = e.component.option("formData");
					
					var blnDisabled = true;
					//접수설정여부
					if (orgData.FCT_TOTAL_USE_YN == "") {
						e.component.getEditor("FCT_TOTAL_USE_YN").option("value", "1");
					}
					if (orgData.FCT_TOTAL_USE_YN == "0") {
						blnDisabled = true;
					}
					else {
						blnDisabled = false;
					}
					
					//거주지역 제한설정
					if (orgData.FCT_TOTAL_AREA_LIMIT_YN == "") {
						e.component.getEditor("FCT_TOTAL_AREA_LIMIT_YN").option("value", "0");
					}
					if (orgData.FCT_TOTAL_AREA_LIST == "") {
						e.component.getEditor("FCT_TOTAL_AREA_LIST").option("value", "0");
					}
					e.component.getEditor("FCT_TOTAL_AREA_LIMIT_YN").option("disabled", blnDisabled);
					e.component.getEditor("FCT_TOTAL_AREA_LIST").option("disabled", !blnDisabled && (orgData.FCT_TOTAL_AREA_LIMIT_YN == "1") ? false : true);

					//접수기간
					e.component.itemOption("totalReserve.reserveDate", "items", reserveDateItem(subTabId, reserveDateType));
					if (reserveDateType == "1") {
						e.component.getEditor("FCT_TOTAL_RESERVE_START_MONTH").option("disabled", blnDisabled);
						e.component.getEditor("FCT_TOTAL_RESERVE_END_MONTH").option("disabled", blnDisabled);
					}
					else {
						e.component.getEditor("FCT_TOTAL_RESERVE_START_DATE").option("disabled", blnDisabled);
						e.component.getEditor("FCT_TOTAL_RESERVE_END_DATE").option("disabled", blnDisabled);
					}
					e.component.getEditor("FCT_TOTAL_RESERVE_START_TIME").option("disabled", blnDisabled);
					e.component.getEditor("FCT_TOTAL_RESERVE_END_TIME").option("disabled", blnDisabled);
					
					//추첨기간
					if (orgData.FCT_TOTAL_CHOICE_DATE_YN == "") {
						e.component.getEditor("FCT_TOTAL_CHOICE_DATE_YN").option("value", "N");
					}
					e.component.itemOption("totalReserve.choiceType", "items", choiceDateItem(subTabId, orgData.FCT_TOTAL_CHOICE_DATE_YN));
					e.component.getEditor("FCT_TOTAL_CHOICE_DATE_YN").option("disabled", blnDisabled);
					if (orgData.FCT_TOTAL_CHOICE_DATE_YN == "D") {
						e.component.getEditor("FCT_TOTAL_CHOICE_DDAY").option("disabled", blnDisabled);
					}
					else if (orgData.FCT_TOTAL_CHOICE_DATE_YN == "S") { 
						if (reserveDateType == "1") {
							e.component.getEditor("FCT_TOTAL_CHOICE_DAY").option("disabled", blnDisabled);
						}
						else {
							e.component.getEditor("FCT_TOTAL_CHOICE_DATE").option("disabled", blnDisabled);
						}
						e.component.getEditor("FCT_TOTAL_CHOICE_TIME").option("disabled", blnDisabled);
					}
					
					
					//추첨스케줄설정
					if (orgData.FCT_TOTAL_CHOICE_SCHEDULE_TYPE == "") {
						e.component.getEditor("FCT_TOTAL_CHOICE_SCHEDULE_TYPE").option("value", "M");
					}
					e.component.itemOption("totalReserve.scheduleType", "items", scheduleDateItem(subTabId, orgData.FCT_TOTAL_CHOICE_SCHEDULE_TYPE));
					e.component.getEditor("FCT_TOTAL_CHOICE_SCHEDULE_TYPE").option("disabled", blnDisabled);
					if (orgData.FCT_TOTAL_CHOICE_SCHEDULE_TYPE == "A") {
						e.component.getEditor("FCT_TOTAL_SCHEDULE_TYPE").option("disabled", blnDisabled);
						if (orgData.FCT_TOTAL_SCHEDULE_TYPE == "D") {
							e.component.getEditor("FCT_TOTAL_SCHEDULE_DDAY").option("disabled", blnDisabled);
						}
						else {
							if (reserveDateType == "1") {
								e.component.getEditor("FCT_TOTAL_SCHEDULE_DAY").option("disabled", blnDisabled);
							}
							else {
								e.component.getEditor("FCT_TOTAL_SCHEDULE_DATE").option("disabled", blnDisabled);
							}
						}
						e.component.getEditor("FCT_TOTAL_SCHEDULE_TIME").option("disabled", blnDisabled);
					}
					else {
						e.component.getEditor("FCT_TOTAL_PRESENTATION_DATE").option("disabled", blnDisabled);
					}
				}
				e.component.on("contentReady", customHandlerInit);
			},
			onContentReady: function (e) {
				$(".temp-noflex").parent().css("justify-content", "space-around");
				$(".temp-noflex").parent().parent().css("flex", "");
			},
			onFieldDataChanged: function (e) {
				var orgData = e.component.option("formData");
				
				//접수설정여부
				if (e.dataField == "FCT_TOTAL_USE_YN") {
					var blnDisabled = true;
					if (e.value == "0") {
						blnDisabled = true;
					}
					else {
						blnDisabled = false;
					}
					
					//거주지역 제한설정
					e.component.getEditor("FCT_TOTAL_AREA_LIMIT_YN").option("disabled", blnDisabled);
					e.component.getEditor("FCT_TOTAL_AREA_LIST").option("disabled", !blnDisabled && orgData.FCT_TOTAL_AREA_LIMIT_YN == "1" ? false : true);
					
					//접수기간
					if (reserveDateType == "1") {
						e.component.getEditor("FCT_TOTAL_RESERVE_START_MONTH").option("disabled", blnDisabled);
						e.component.getEditor("FCT_TOTAL_RESERVE_END_MONTH").option("disabled", blnDisabled);
					}
					else {
						e.component.getEditor("FCT_TOTAL_RESERVE_START_DATE").option("disabled", blnDisabled);
						e.component.getEditor("FCT_TOTAL_RESERVE_END_DATE").option("disabled", blnDisabled);
					}
					e.component.getEditor("FCT_TOTAL_RESERVE_START_TIME").option("disabled", blnDisabled);
					e.component.getEditor("FCT_TOTAL_RESERVE_END_TIME").option("disabled", blnDisabled);
					
					//추첨기간
					e.component.getEditor("FCT_TOTAL_CHOICE_DATE_YN").option("disabled", blnDisabled);
					if (orgData.FCT_TOTAL_CHOICE_DATE_YN == "D") {
						e.component.getEditor("FCT_TOTAL_CHOICE_DDAY").option("disabled", blnDisabled);
					}
					else if (orgData.FCT_TOTAL_CHOICE_DATE_YN == "S") { 
						if (reserveDateType == "1") {
							e.component.getEditor("FCT_TOTAL_CHOICE_DAY").option("disabled", blnDisabled);
						}
						else {
							e.component.getEditor("FCT_TOTAL_CHOICE_DATE").option("disabled", blnDisabled);
						}
						e.component.getEditor("FCT_TOTAL_CHOICE_TIME").option("disabled", blnDisabled);
					}
					
					//추첨스케줄설정
					e.component.getEditor("FCT_TOTAL_CHOICE_SCHEDULE_TYPE").option("disabled", blnDisabled);
					if (orgData.FCT_TOTAL_CHOICE_SCHEDULE_TYPE == "A") {
						e.component.getEditor("FCT_TOTAL_SCHEDULE_TYPE").option("disabled", blnDisabled);
						if (orgData.FCT_TOTAL_SCHEDULE_TYPE == "D") {
							e.component.getEditor("FCT_TOTAL_SCHEDULE_DDAY").option("disabled", blnDisabled);
						}
						else {
							if (reserveDateType == "1") {
								e.component.getEditor("FCT_TOTAL_SCHEDULE_DAY").option("disabled", blnDisabled);
							}
							else {
								e.component.getEditor("FCT_TOTAL_SCHEDULE_DATE").option("disabled", blnDisabled);
							}
						}
						e.component.getEditor("FCT_TOTAL_SCHEDULE_TIME").option("disabled", blnDisabled);
					}
					else {
						e.component.getEditor("FCT_TOTAL_PRESENTATION_DATE").option("disabled", blnDisabled);
					}
				}
				
				//거주지역제한설정 
				if (e.dataField == "FCT_TOTAL_AREA_LIMIT_YN") {
					if (e.value == "1") {
						e.component.getEditor("FCT_TOTAL_AREA_LIST").option("disabled", false);
					}
					else {
						e.component.getEditor("FCT_TOTAL_AREA_LIST").option("disabled", true);
					}
				}
				
				//추첨기간
				if (e.dataField == "FCT_TOTAL_CHOICE_DATE_YN") {
					e.component.itemOption("totalReserve.choiceType", "items", choiceDateItem(subTabId, e.value));
				}
				
				//추첨스케줄설정
				if (e.dataField == "FCT_TOTAL_CHOICE_SCHEDULE_TYPE") {
					e.component.itemOption("totalReserve.scheduleType", "items", scheduleDateItem(subTabId, e.value));
				}
				
				$(".temp-noflex").parent().css("justify-content", "space-around");
				$(".temp-noflex").parent().parent().css("flex", "");
			}
		}).dxForm("instance");
	}
}

//접수기간 설정
function reserveDateItem(subTabId, data) {
	var dateItems = [];
	var strColumnName = "";
	
	if (subTabId == "2") {
		strColumnName = "FCT_INAREA_";
	}
	else if (subTabId == "3") {
		strColumnName = "FCT_TOTAL_";
	}
	
	if (reserveDateType == "1") {
		dateItems.push(
			{ cssClass: "temp-noflex", template: "<div style='font-size: 12px;'>매월</div>" },
			{dataField: strColumnName +"RESERVE_START_MONTH", label: {visible: false}, editorType: "dxSelectBox",
				editorOptions: {dataSource: dateItems_gbn,
					layout: "horizontal", valueExpr: "value", displayExpr: "text", value: 1
				}
			},
			{dataField: strColumnName +"RESERVE_START_TIME", label: {visible: false}, editorType: "dxDateBox",
				editorOptions: {pickerType: 'rollers', type: 'time', value: nowDate, displayFormat: 'HH:mm', elementAttr: {class: "form-input120 noflex"}}
			},
			{dataField: strColumnName +"RESERVE_END_MONTH", label: {text: "~"}, editorType: "dxSelectBox",
				editorOptions: {dataSource: dateItems_gbn,
					layout: "horizontal", valueExpr: "value", displayExpr: "text", value: 1
				}
			},
			{dataField: strColumnName +"RESERVE_END_TIME", label: {visible: false}, editorType: "dxDateBox",
				editorOptions: {pickerType: 'rollers', type: 'time', value: nowDate, displayFormat: 'HH:mm', elementAttr: {class: "form-input120 noflex"}}
			}
		);
	}
	else if (reserveDateType == "0") {
		dateItems.push(
			{dataField: strColumnName +"RESERVE_START_DATE", label: {visible: false}, editorType: "dxDateBox",
				editorOptions: {value: nowDate, width: "100%", displayFormat: 'yyyy-MM-dd'}
			},
			{dataField: strColumnName +"RESERVE_START_TIME", label: {visible: false}, editorType: "dxDateBox",
				editorOptions: {pickerType: 'rollers', type: 'time', value: nowDate, displayFormat: 'HH:mm', elementAttr: {class: "form-input120 noflex"}}
			},
			{ cssClass: "temp-noflex",  template: "<div>~</div>"},
			{dataField: strColumnName +"RESERVE_END_DATE", label: {visible: false}, editorType: "dxDateBox",
				editorOptions: {value: nowDate, width: "100%", displayFormat: 'yyyy-MM-dd'}
			},
			{dataField: strColumnName +"RESERVE_END_TIME", label: {visible: false}, editorType: "dxDateBox",
				editorOptions: {pickerType: 'rollers', type: 'time', value: nowDate, displayFormat: 'HH:mm', elementAttr: {class: "form-input120 noflex"}}
			}
		);
	}
	
	return dateItems;
}

//추첨기간 세부설정
function choiceDateItem(subTabId, data) {
	var choiceItems = [];
	var strColumnName = "";
	
	if (subTabId == "2") {
		strColumnName = "FCT_INAREA_";
	}
	else if (subTabId == "3") {
		strColumnName = "FCT_TOTAL_";
	}
	
	if (reserveDateType == "1") {
		if (data == "D") {
			choiceItems.push(
				{ cssClass: "temp-noflex", template: "<div style='font-size: 12px;'>접수기간종료 후</div>" },
				{dataField: strColumnName +"CHOICE_DDAY", label: {location: "right", text: "까지"}, editorType: "dxNumberBox",
					editorOptions: {showSpinButtons: true, min: 0, max: 20, value: 1, format: "D+#,##일"} 
				},
				{ colSpan: 2, itemType: "empty" }
			);
		}
		else if (data == "S") {
			choiceItems.push(
				{ cssClass: "temp-noflex", template: "<div style='font-size: 12px;'>매월</div>" },
				{dataField: strColumnName +"CHOICE_DAY", label: {visible: false}, editorType: "dxSelectBox",
					editorOptions: {dataSource: dateItems_gbn,
						layout: "horizontal", valueExpr: "value", displayExpr: "text", value: 1, elementAttr: {class: "form-input120 noflex"}
					}
				},
				{dataField: strColumnName +"CHOICE_TIME", label: {location: "right", text: "까지"}, editorType: "dxDateBox",
					editorOptions: {pickerType: 'rollers', type: 'time', value: nowDate, displayFormat: 'HH:mm', elementAttr: {class: "form-input120 noflex"}}
				},
				{ itemType: "empty" }
			);
		}
		else if (data == "N") {
			choiceItems.push(
				{colSpan: 4, itemType: "empty" }
			);
		}
	}
	else if (reserveDateType == "0") {
		if (data == "D") {
			choiceItems.push(
				{ cssClass: "temp-noflex", template: "<div style='font-size: 12px;'>접수기간종료 후</div>" },
				{dataField: strColumnName +"CHOICE_DDAY", label: {location: "right", text: "까지"}, editorType: "dxNumberBox",
					editorOptions: {showSpinButtons: true, min: 0, max: 20, value: 1, format: "D+#,##일"} 
				},
				{ colSpan: 2, itemType: "empty" }
			);
		}
		else if (data == "S") {
			choiceItems.push(
				{dataField: strColumnName +"CHOICE_DATE", label: {visible: false}, editorType: "dxDateBox",
					editorOptions: {value: nowDate, width: "100%", displayFormat: 'yyyy-MM-dd'}
				},
				{dataField: strColumnName +"CHOICE_TIME", label: {location: "right", text: "까지"}, editorType: "dxDateBox",
					editorOptions: {pickerType: 'rollers', type: 'time', value: nowDate, displayFormat: 'HH:mm', elementAttr: {class: "form-input120 noflex"}}
				},
				{ colSpan: 2, itemType: "empty" }
			);
		}
		else if (data == "N") {
			choiceItems.push(
				{colSpan: 4, itemType: "empty" }
			);
		}
	}
	
	return choiceItems;
}

//추첨스케줄기간 세부설정
function scheduleDateItem(subTabId, data) {
	var scheduleItems = [];
	var strColumnName = "";
	var strGroupName = "";
	var sLoaded = false;
	
	if (subTabId == "2") {
		strColumnName = "FCT_INAREA_";
		strGroupName = "inArea";
	}
	else if (subTabId == "3") {
		strColumnName = "FCT_TOTAL_";
		strGroupName = "totalReserve";
	}

	if (reserveDateType == "1") {
		if (data == "A") {
			scheduleItems.push(
				{colSpan: 2, dataField: strColumnName +"SCHEDULE_TYPE", label: {visible: false}, editorType: "dxSelectBox",
					editorOptions: {dataSource: choiceScheduleDateType_gbn,
						layout: "horizontal", valueExpr: "value", displayExpr: "text", elementAttr: {class: "form-input180 noflex"},
						onInitialized: function (e) {
							if (e.component.option("value") == null) {
								scheduleDateType = e.component.option("dataSource")[0].value;
								e.component.option("value", scheduleDateType);
							}
						},
						onValueChanged: function (e) {
							scheduleDateType = e.value;

							if (scheduleDateType == "D") {
								tab2_form[subTabId - 1].itemOption(strGroupName +".scheduleType.scheduleDday", "visible", true);
								tab2_form[subTabId - 1].itemOption(strGroupName +".scheduleType.scheduleDateSet", "visible", false);
							}
							else if (scheduleDateType == "S") {
								tab2_form[subTabId - 1].itemOption(strGroupName +".scheduleType.scheduleDday", "visible", false);
								tab2_form[subTabId - 1].itemOption(strGroupName +".scheduleType.scheduleDateSet", "visible", true);
							}
						}
					}
				},
				{name: "scheduleDday", colSpan: 3, itemType: "group", colCount: 3, label: {visible: false}, items: [
					{dataField: strColumnName +"SCHEDULE_DDAY", label: {visible: false}, editorType: "dxNumberBox",
						editorOptions: {showSpinButtons: true, min: 0, max: 20, value: 1, format: "D+#,##일"} 
					},
					{dataField: strColumnName +"SCHEDULE_TIME", label: {visible: false}, editorType: "dxDateBox",
						editorOptions: {pickerType: 'rollers', type: 'time', value: nowDate, displayFormat: 'HH:mm', elementAttr: {class: "form-input120"}}
					},
					{ itemType: "empty" }
				]},
				
				{name: "scheduleDateSet", visible: false, colSpan: 3, itemType: "group", colCount: 4, label: {visible: false}, items: [
					{ template: "<div class='form-text-temp noflex' style='font-size: 12px;'>매월</div>" },
					{dataField: strColumnName +"SCHEDULE_DAY", label: {visible: false}, editorType: "dxSelectBox",
						editorOptions: {dataSource: dateItems_gbn,
							layout: "horizontal", valueExpr: "value", displayExpr: "text", value: 1, elementAttr: {class: "form-input120 noflex"}
						}
					},
					{dataField: strColumnName +"SCHEDULE_TIME", label: {visible: false}, editorType: "dxDateBox",
						editorOptions: {pickerType: 'rollers', type: 'time', value: nowDate, displayFormat: 'HH:mm', elementAttr: {class: "form-input120"}}
					},
					{ itemType: "empty" }
				]}

			);
		}
		else if (data == "M") {
			scheduleItems.push(
				{colSpan: 2, dataField: strColumnName +"PRESENTATION_DATE", label: {text: "추첨발표일"}, editorType: "dxDateBox",
					editorOptions: {value: nowDate, width: "100%", displayFormat: 'yyyy-MM-dd'}
				},
				{colSpan: 3, itemType: "empty" }
			);
		}
	}
	else if (reserveDateType == "0") {
		if (data == "A") {
			scheduleItems.push(
				{colSpan: 2, dataField: strColumnName +"SCHEDULE_TYPE", label: {visible: false}, editorType: "dxSelectBox",
					editorOptions: {dataSource: choiceScheduleDateType_gbn,
						layout: "horizontal", valueExpr: "value", displayExpr: "text", elementAttr: {class: "form-input180 noflex"},
						onInitialized: function (e) {
							if (e.component.option("value") == null) {
								scheduleDateType = e.component.option("dataSource")[0].value;
								e.component.option("value", scheduleDateType);
							}
						},
						onValueChanged: function (e) {
							scheduleDateType = e.value;

							if (scheduleDateType == "D") {
								tab2_form[subTabId - 1].itemOption(strGroupName +".scheduleType.scheduleDday", "visible", true);
								tab2_form[subTabId - 1].itemOption(strGroupName +".scheduleType.scheduleDateSet", "visible", false);
							}
							else if (scheduleDateType == "S") {
								tab2_form[subTabId - 1].itemOption(strGroupName +".scheduleType.scheduleDday", "visible", false);
								tab2_form[subTabId - 1].itemOption(strGroupName +".scheduleType.scheduleDateSet", "visible", true);
							}
						}
					}
				},
				{name: "scheduleDday", colSpan: 3, itemType: "group", colCount: 3, label: {visible: false}, items: [
					{dataField: strColumnName +"SCHEDULE_DDAY", label: {visible: false}, editorType: "dxNumberBox",
						editorOptions: {showSpinButtons: true, min: 0, max: 20, value: 1, format: "D+#,##일"} 
					},
					{dataField: strColumnName +"SCHEDULE_TIME", label: {visible: false}, editorType: "dxDateBox",
						editorOptions: {pickerType: 'rollers', type: 'time', value: nowDate, displayFormat: 'HH:mm', elementAttr: {class: "form-input120"}}
					},
					{ itemType: "empty" }
				]},
				
				{name: "scheduleDateSet", visible: false, colSpan: 3, itemType: "group", colCount: 3, label: {visible: false}, items: [
					{dataField: strColumnName +"SCHEDULE_DATE", label: {visible: false}, editorType: "dxDateBox",
						editorOptions: {value: nowDate, width: "100%", displayFormat: 'yyyy-MM-dd'}
					},
					{dataField: strColumnName +"SCHEDULE_TIME", label: {visible: false}, editorType: "dxDateBox",
						editorOptions: {pickerType: 'rollers', type: 'time', value: nowDate, displayFormat: 'HH:mm', elementAttr: {class: "form-input120"}}
					},
					{ itemType: "empty" }
				]}

			);
		}
		else if (data == "M") {
			scheduleItems.push(
				{colSpan: 2, dataField: strColumnName +"PRESENTATION_DATE", label: {text: "추첨발표일"}, editorType: "dxDateBox",
					editorOptions: {value: nowDate, width: "100%", displayFormat: 'yyyy-MM-dd'}
				},
				{colSpan: 3, itemType: "empty" }
			);
		}
	}
	
	return scheduleItems;
}