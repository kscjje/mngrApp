<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<script>window.jQuery || document.write(decodeURIComponent('%3Cscript src="js/jquery.min.js"%3E%3C/script%3E'))</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.4.0/polyfill.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/exceljs/4.1.1/exceljs.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.2/FileSaver.min.js"></script>
<link rel="stylesheet" href="/fmcs/css/fmcs_style3.css">

<style>
	//.dx-header-row td{ height: 50px; }
	
	.form-button { height: 0; z-index: 100; }
	.form-button-right { height: 0; z-index: 100; text-align: right; }
	.form-text-span .dx-texteditor-input { width: 60px; }
	.form-input95 { width: 95px; }
	.form-input100 { width: 100px; }
	.form-input110 { width: 110px; }
	.form-input120 { width: 120px; }
	.form-input140 { width: 140px; }
	.form-input150 { width: 150px; }
	.form-input160 { width: 160px; }
	.form-input180 { width: 180px; }
	.form-input200 { width: 200px; }
	.form-input240 { width: 240px; }
	.form-input335 { width: 335px; }
	
	.form-label40 label{ width: 40px; }
	.form-nolabel40 .dx-field-item-content{ padding-left: 40px; }
	
	/* 대관장소입력 FORM */
	.form-group-label95 > label:first-child span { width: 95px !important; }
	.form-label30 span.dx-field-item-label-content { width: 30px !important; }
	.form-label60 span.dx-field-item-label-content { width: 60px !important; }
	.form-label70 span.dx-field-item-label-content { width: 70px !important; }
	.form-label60 .dx-numberbox-spin-container { width: 20px !important; }
	.form-label70 .dx-numberbox-spin-container { width: 20px !important; }
	.form-label90 { width: 90px; }
	
	/* 대관장소복사등록 POPUP */
	.check-label100 label span{ width: 100px; }
	
	/* 시간표 입력 FORM */
	.form-date-temp { width: 100px; float: left; }
	.form-date-from-label label span { width: 10px !important; }
	
	.form-text-temp { margin-top: 8px; }
	.form-text-margin50 { margin-left: 50px; }
	
	.form-harf { width: 48%; }
	.form-noLabel { padding-left: 90px; }
	
	.form-left-margin { margin-left: -70px; }
	
	.dx-htmleditor-content { background-color: #fff; }
	
	.labelflex { flex-direction: column; }
	
	.add_btn .dx-icon-plus { width: 10px; height: 6px; font-size: 10px; line-height: 6px; }
	
	.hs-accessory-multieditor-column { display: flex; justify-content: space-around; }
	
	#tab7 .tab_contents_form { width: 30%; margin-bottom: -40px; position: fixed; z-index: 1; }
	
	/* 예약불가일정관리 */
	#tab8 .hs-holiday-day-toolbar { padding-right: 25px; }
	#tab8 .hs-holiday-day-toolbar .dx-toolbar-items-container { height: 0; z-index:10; }
	#tab8 .dx-scheduler-work-space-month .dx-scheduler-date-table-cell { height: 200px; }
	#tab8 .dx-scheduler-work-space { overflow: visible; height: auto; }
	.dx-calendar-cell:not(.dx-calendar-other-month) .hs-holiday-date { color: #D22B2B; }
	.dx-calendar-cell:not(.dx-calendar-other-month) .hs-holiday-date span { float: left; }
	.dx-calendar-cell:not(.dx-calendar-other-month) .hs-sunday-date { color: #D22B2B; }
	.dx-calendar-cell:not(.dx-calendar-other-month) .hs-saturday-date { color: #007bff; }
	
	#tab8 .hs-unavailable-calendar-container {
		width: 100%;
		overflow-x: hidden;
		overflow-y: inherit;
	}
	.hs-unavailable-calendar-container .dx-widget.dx-calendar-navigator {
	    display: inline-block;
	    width : 15%;
	    position: relative;
	}
	.hs-unavailable-calendar-container .dx-calendar-footer {
	    position: absolute !important;
	    text-align: left !important;
	    width: 30% !important;
	    display: inline-block !important;
	    bottom:auto !important;
	}
	.hs-unavailable-calendar-container .dx-calendar-footer .dx-button { height: 36px; border-radius: 4px; }
	.hs-unavailable-calendar-container .dx-calendar-body { overflow: visible; }
	.dx-calendar-body thead tr th:first-child { color: #D22B2B; }
	.dx-calendar-body thead tr th:last-child { color: #007bff; }
	#tab8 .dx-calendar-cell {
	    height : 100px;
	    text-align: left;
	    border-radius : 0;
	    border: 1px solid rgba(221,221,221,.6);
	} 
	.hs-unavailable-calendar-container .dx-calendar-cell.hs-cell-disabled {
	    background-image:
	            repeating-linear-gradient(
	                    135deg,
	                    rgba(244, 67, 54, 0.1),
	                    rgba(244, 67, 54, 0.1) 4px,
	                    transparent 4px,
	                    transparent 9px
	            );
	    color: #9b6467;
	}
	
	.hs-unavailable-calendar-container .dx-calendar-cell.dx-calendar-selected-date.hs-cell-disabled {
	    -webkit-box-shadow: inset 0 0;
	    box-shadow: inset 0 0;
	   
	}
	.hs-unavailable-calendar-container .dx-calendar-cell.dx-calendar-selected-date.hs-cell-disabled .dx-icon-remove, .hs-unavailable-calendar-container .dx-calendar-cell.hs-cell-disabled .dx-icon-remove{
	    color: #3d444b;
	}
	
	.hs-bg-white { background-color: #FFF; }
	.hs-list-title > div { float: left; padding-left: 10px; }
	
	.btn-noflex { padding-top: 200px; }
	.btn-right { display: flex; flex-direction: column; padding: 10px 0; }
	.btn-left { display: flex; flex-direction: column; padding: 10px 0; }
	
	.check-form-week .dx-field-item-content-location-right .dx-group-colcount-4 { width: 150%; }

}
</style>

<script src="/fmcs/js/default_data.js"></script>
<script src="/backOffice/ckeditor/ckeditor.js"></script>
<script src="/fmcs/js/rent/rent_nonschedule.js"></script>
<script src="/fmcs/js/rent/rent_reqular.js"></script>
<script src="/fmcs/js/rent/rent_contents.js"></script>
<script src="/fmcs/js/rent/rent_timetable.js"></script>
<script src="/fmcs/js/rent/rent_adcls.js"></script>
<script src="/fmcs/js/rent/rent_refund.js"></script>
<script src="/fmcs/js/rent/rent_discount.js"></script>
<script src="/fmcs/js/rent/rent_unavailable.js"></script>

<script src="/webjars/rrule/2.6.8/dist/es5/rrule.min.js"></script>
<script src="/fmcs/js/ticket/recurrenceRule.js"></script>

<script>
	var columnList = null;
	var gridFacilityPlc = null;
	var editmode="new";
	let frmInstance = null;
	
	let placeCopyPopup = null;
	let placeCopyForm = null;
	
	var selectTabId = "";
	let fcltySeq = "";
	let placeCd = "";
	let subMenuList = null;
	let selectedRowIndex = -1;
	
	const nowDate = new Date();
	
	//예약불가일정 Data
	Date.prototype.removeTime = function () {
	    return new Date(this.getFullYear(), this.getMonth(), this.getDate());
	};
	
	const holidays = [
		{name: "성탄절", date: "2022-12-25"}, 
		{name: "설날연휴", date: "2023-01-21"}, 
		{name: "설날", date: "2023-01-22"}, 
		{name: "설날연휴", date: "2023-01-23"}, 
		{name: "삼일절", date: "2023-03-01"}
	];
	
	const impossibleTypes = [
		{text: "휴관일", id: 1, color: "#fb475e"}, 
		{text: "공사기간", id: 2, color: "#019992"	},
		{text: "기타", id: 3, color: "#56ca85"}
	];
	
	const frequency_gbn = [
		{text: "매주", value: "WEEKLY"}, 
		{text: "매월", value: "MONTHLY"}, 
		{text: "매년", value: "YEARLY"}
	];
	
	const endRepeat_tp = [
		{type: "never"},
		{type: "count"},
		{type: "until"}
	];
	
	const repeatMonthType_gbn = [
		{text: "일자마다 반복", value: "D"},
		{text: "요일마다 반복", value: "W"}
	];
	
	const repeatmonthWeekth_gbn = [
		{text: "첫번째", value: 1},
		{text: "두번째", value: 2},
		{text: "세번째", value: 3},
		{text: "네번째", value: 4},
		{text: "마지막", value: 5}
	];
	
	const weekCheck_gbn = [
		{text: "월", value: "MO"},
		{text: "화", value: "TU"},
		{text: "수", value: "WE"},
		{text: "목", value: "TH"},
		{text: "금", value: "FR"},
		{text: "토", value: "SA"},
		{text: "일", value: "SU"}
	];
	
	var addMonthItems = [];
	var strMonthItems = "";
	for (i = 0; i <= 10; i++) {
		if (i == 0) {
			strMonthItems = "당월";
		}
		else if (i == 1) {
			strMonthItems = "다음월";
		}
		else {
			strMonthItems = "다음월+"+ (i - 1);
		}
		
		addMonthItems.push({text: strMonthItems, value: i});
	}
	
	var limitDateItems = [];
	var strLimitDateItems = "";
	for (i = 0; i < 30; i++) {
		if (i == 0) {
			strLimitDateItems = "이용당일";
		}
		else {
			strLimitDateItems = i +"일";
		}
		
		limitDateItems.push({text: strLimitDateItems, value: i});
	}
	
	let facilityCategories_gbn = [
		{text: "축구장", value: "1"}, 
		{text: "수영장", value: "2"}, 
		{text: "헬스장", value: "3"},
		{text: "세미나실", value: "4"}
	];
	
	const reservationType_gbn = [
		{text: "선착순접수", value: "F"},
		{text: "추첨신청접수", value: "D"}
	];
	
	const reservationPerson_gbn = [
		{text: "제한없음", value: "0"}, 
		{text: "개인회원", value: "1"}, 
		{text: "단체회원", value: "2"}
	];
	
	const facilityApplicantType_gbn = [
		{text: "관리자심의승인", value: "manager"},
		{text: "자동승인", value: "auto"},
		{text: "추첨후관리자승인", value: "choice_manager"},
		{text: "추첨후자동승인", value: "choice_auto"}
	];
	
	const livingAreaLimit_gbn = [
		{text: "제한안함", value: "0"}, 
		{text: "거주지역제한(비대면자격인증)", value: "1"}, 
		{text: "거주지역제한(서류확정)", value: "2"}
	];
	
	const facilityContinu_gbn = [
		{text: "연접회차만 가능", value: "1"}, 
		{text: "비연접회차 가능", value: "0"}
	];
	
	const possibleDateType_gbn = [
		{text: "이용일기준설정", value: "D"}, 
		{text: "월간설정", value: "M"},
		{text: "기간설정", value: "T"}
	];
	
	const dDayReservation_gbn = [
		{text: "당일예약불가", value: "0"}, 
		{text: "당일예약가능", value: "1"}
	];
	
	const weekday_gbn = [
		{text: "월", value: "1"},
		{text: "화", value: "2"},
		{text: "수", value: "3"},
		{text: "목", value: "4"},
		{text: "금", value: "5"}
	];
	
	const weekend_gbn = [
		{text: "토", value: "6"},
		{text: "일", value: "0"},
		{text: "공휴일", value: "7"}
	];
	
	const reservationLimit_gbn = [
		{text: "제한안함", value: "N"},
		{text: "예약이용 월별제한", value: "M"},
		{text: "예약이용 년별제한", value: "Y"},
		{text: "예약이용 주별제한", value: "W"}
	];
	
	const payCancelLimit_gbn = [
		{text: "제한안함", value: "N"}, 
		{text: "이용일전 D-DAY설정", value: "D"},
		{text: "거래당일만취소가능", value: "T"}
	];
	
	const depositLastTime_gbn = [
		{text: "마감시간 운영안함", value: "N"}, 
		{text: "신청일시(심의승인)기준", value: "A"}, 
		{text: "이용일전 D-DAY설정", value: "D"}
	];
	
	const reserveChannel_gbn = [
		{text: "온라인", value: "online"},
		{text: "방문", value: "visit"},
		{text: "온라인+방문", value: "all"}
	];
	
	const applySetType_gbn = [
		{text: "월별설정", value: "M"},
		{text: "기간설정", value: "D"}
	];
	
	const priceType_gbn = [
		{text: "평일(행사)요금", value: "DE"},
		{text: "평일(비행사)요금", value: "DN"},
		{text: "주말(행사)요금", value: "EE"},
		{text: "주말(비행사)요금", value: "EN"}
	];
	
	const choiceDateType_gbn = [
		{text: "설정안함", value: "N"}, 
		{text: "설정(D-DAY)", value: "D"}, 
		{text: "설정(일자설정)", value: "S"}
	];

	let resultList = new DevExpress.data.ArrayStore({
		key: "rentPlaceId",
		data: mainListData()
	});

	$(document).ready(function () {
		
		mainListColumn();
	
		//Search Form
		$("#facilitySearch").dxForm({
			showColonAfterLabel: false,
		    labelMode:'hidden',
		    colCount: 6,
		    items: [
		    	{itemType: "group", 
			    	items: [
			    		{dataField: "comItemctgcd", editorType: "dxSelectBox", editorOptions: {
			    			dataSource: facilityCategoriesList(), layout: "horizontal", valueExpr: "comItemctgcd", displayExpr: "comItemctgnm", placeholder: "운영상품분류(전체)"
			    			}
			    		}
			    	]
		    	},
		    	{itemType: "group",
		    		items: [
			    		{dataField: "useYn", editorType: "dxSelectBox", editorOptions: {
			    			dataSource: [
			    					{text: "운영", value: "1"}, 
			    					{text: "운영안함", value: "0"}
			    				],
			    				layout: "horizontal", valueExpr: "value", displayExpr: "text", placeholder: "운영여부(전체)"
			    			} 
			    		}
			    	]
		    	},
		    	{itemType: "group",
		    		items: [
		    	   		{dataField: "rentFcltySeq", editorType: "dxSelectBox", editorOptions: {
		    	   			dataSource: facilityCategories_gbn,
		    	   				layout: "horizontal", valueExpr: "value", displayExpr: "text", placeholder: "대관시설분류(전체)"
			    			}
			    		}
		    	   	]
		    	},
		    	{itemType: "group",
		    		items: [
			    		{dataField: "rentRsvnpdOptype", editorType: "dxSelectBox", editorOptions: {
			    			dataSource: facilityBasic_gbn, 
			    				layout: "horizontal", valueExpr: "value", displayExpr: "text", placeholder: "예약접수운영기준(전체)"
			    			}
		    			}
		    		]
		    	},
		    	{colSpan: 2, itemType: "group", colCount: 3,
		    		items: [
			    		{dataField: "searchColumn", editorType: "dxSelectBox", editorOptions: {
			    			dataSource: [
			    					{text: "대관장소명", value: "rentPlacenm"}
			    				],
			    				width: 120, layout: "horizontal", valueExpr: "value", displayExpr: "text", placeholder: "검색항목"
			    			}
		    			},
		    			{colSpan: 2, dataField: "searchKeyword", value: ""}
		    		]
		    	}
		    ]
		});
		
		//검색버튼
		$("#searchBtn").dxButton({
			stylingMode: "contained",
			icon: "find",
			type: "default",
			onClick() {
				var msg = "";
				if($("input[name='searchColumn']").val() == ""){
					msg = "키워드 제외 검색";
				}
				else {
					msg = $("select[name='searchColumn']").val() +" = "+ $("input[name='searchKeyword']").val() +" 검색 ";
				}
				DevExpress.ui.notify(msg);
			}
		});
		
		//리셋버튼
		$('#searchInitBtn').dxButton({
			stylingMode: 'contained',
			icon:'clear',
			type: 'default',
			elementAttr: {
				class: "btnRefresh"
			},
			onClick() {
				$("#facilitySearch").dxForm("instance").resetValues();
			},
		});
		
		//Main Grid
		gridFacilityPlc = $("#gridList").dxDataGrid({
			export: {enabled: true},
			dataSource: resultList,
			columns: columnList,
			selection: {mode: "single"},
			allowColumnReordering: true,
			allowColumnResizing: true,
			showBorders: true,
			showRowLines: true,
			columnHidingEnabled: true,
			paging: {pageSize: 10},
			pager: {
				visible: true,
			    showInfo: true,
			    infoText: "총 {2}건   {0}/{1}",
			    showNavigationButtons: true
			},
			columnChooser: {enabled: true},
			customizeColumns: function(columns){
	            columns.forEach(column => {
	                if(column.dataField == 'onlineOpenyn' ||column.dataField == 'useYn'){
	                    column.allowEditing = true;
	                }else{
	                	column.allowEditing = false;
	                }
	            })
	        },
	        //summary: {
	        //	totalItems: [{column: "rentPlacenm", summaryType: "count"}]
	        //},
	        focusedRowEnabled: true,
	        onFocusedRowChanged(e) {
	        	const focusedRowKey = e.component.option('focusedRowKey');
			    selectedRowIndex = e.rowIndex;

			    fcltySeq = e.row.data.rentFcltySeq;
			    placeCd = e.row.data.rentPlaceId;

	        	if (selectTabId == "") {
		        	initTabList(1);
		        	
		        	selectTabList(1);
	        	} 
	        	else {
					initTabList(selectTabId);
		        	
		        	selectTabList(selectTabId);
	        	}

	        	editmode="view";
	        },
	        editing: {
				mode: "cell",
			 	allowUpdating: true,
			 	//allowAdding: true,
			 	selectTextOnEditStart: true,
				// startEditAction: 'click',
			 	popup: {
					title: "대관장소관리",
					showTitle: true,
					width: 1200,
				  	height:700,
				 	onShown:function(){
				 		 frmInstance = $("#editForm").dxForm("instance");
				 		
				 		//예약결제취소제한 항목노출 기본셋팅
				 		var payCancelLimit = gridFacilityPlc.cellValue(selectedRowIndex, "rentPcncdeLimit");
						if (payCancelLimit == "D") {
					 		frmInstance.itemOption("placeForm.operation.payCancel_noSchedual", "visible", false);
							frmInstance.itemOption("placeForm.operation.payCancel_ddayTime", "visible", true);
							frmInstance.itemOption("placeForm.operation.payCancel_transection", "visible", false);
						}
						else if (payCancelLimit == "T") {
							frmInstance.itemOption("placeForm.operation.payCancel_noSchedual", "visible", false);
							frmInstance.itemOption("placeForm.operation.payCancel_ddayTime", "visible", false);
							frmInstance.itemOption("placeForm.operation.payCancel_transection", "visible", true);
						}
						else {
							frmInstance.itemOption("placeForm.operation.payCancel_noSchedual", "visible", true);
							frmInstance.itemOption("placeForm.operation.payCancel_ddayTime", "visible", false);
							frmInstance.itemOption("placeForm.operation.payCancel_transection", "visible", false);
						}
						
						//입금마감시간운영설정 항목노출 기본셋팅
						var depositLasttimeYn = gridFacilityPlc.cellValue(selectedRowIndex, "rentPayetimeOptype");
						if (depositLasttimeYn == "D") {
							frmInstance.itemOption("placeForm.operation.deposit_nonSchedual", "visible", false);
							frmInstance.itemOption("placeForm.operation.deposit_schedual", "visible", true);
							frmInstance.itemOption("placeForm.operation.deposit_schedual.approvalHour", "visible", false);
							frmInstance.itemOption("placeForm.operation.deposit_schedual.approvalMinit", "visible", false);
							frmInstance.itemOption("placeForm.operation.deposit_schedual.ddayDay", "visible", true);
							frmInstance.itemOption("placeForm.operation.deposit_schedual.ddayTime", "visible", true);
						}
						else if (depositLasttimeYn == "A") {
							frmInstance.itemOption("placeForm.operation.deposit_nonSchedual", "visible", false);
							frmInstance.itemOption("placeForm.operation.deposit_schedual", "visible", true);
							frmInstance.itemOption("placeForm.operation.deposit_schedual.approvalHour", "visible", true);
							frmInstance.itemOption("placeForm.operation.deposit_schedual.approvalMinit", "visible", true);
							frmInstance.itemOption("placeForm.operation.deposit_schedual.ddayDay", "visible", false);
							frmInstance.itemOption("placeForm.operation.deposit_schedual.ddayTime", "visible", false);
						}
						else {
							frmInstance.itemOption("placeForm.operation.deposit_nonSchedual", "visible", true);
							frmInstance.itemOption("placeForm.operation.deposit_schedual", "visible", false);
							frmInstance.itemOption("placeForm.operation.deposit_schedual.approvalHour", "visible", false);
							frmInstance.itemOption("placeForm.operation.deposit_schedual.approvalMinit", "visible", false);
							frmInstance.itemOption("placeForm.operation.deposit_schedual.ddayDay", "visible", false);
							frmInstance.itemOption("placeForm.operation.deposit_schedual.ddayTime", "visible", false);
						}
				  	}
				},
				form: {
					showColonAfterLabel: false,
					elementAttr: {id: "editForm"},
					customizeItem: placeCustomizeItem,
					colCount: 4,
					items: createPlaceDetailForm()
				}
			},
			onToolbarPreparing(e) {
				const dataGrid = e.component;
		        e.toolbarOptions.items.push(
		        	{
		        		location: 'after',
			        	widget: 'dxButton',
			      		cssClass:'functionbtn',
			      		options: {
			      			text: '대관장소복사',
			      			onClick() {
			      				if (placeCd != "") {
			      					placeCopy();
			      				}
			      				else {
			      					DevExpress.ui.notify("복사할 대관장소를 선택하세요.");
			      				}
			      				//gridComplete.refresh();
			      			},
			      		}
		        	}
		        )
			},
			onRowDblClick: function (e) {
				updateFacilityPlace();
			},
			onInitNewRow: function(e){
				if(gridFacilityPlc.option("editing.mode")=="popup"){
					gridFacilityPlc.option("editing.popup.title", "대관장소등록");
				}
			},
			onEditorPrepared :function(e){
				if(e.row && e.row.isNewRow){
					editmode='create';
				}
				//console.log(editmode);
			},
			onEditingStart: function(e) {
				editRowKey = e.key;
				if(gridFacilityPlc.option("editing.mode")=="popup"){
					gridFacilityPlc.option("editing.popup.title", "대관장소수정");
				}
			},
			onRowPrepared(e){
			},
			onRowUpdated(e) {
		          //  alert('RowUpdated');
			},
			onEditCanceled() {
				gridFacilityPlc.option("editing.mode", "cell");
			},
			onSaved() {
				gridFacilityPlc.option("editing.mode", "cell");
			}
		}).dxDataGrid("instance");
		
		initTabList("", "");
	});
	
	//Main Column
	function mainListColumn() {
		columnList = [
			{dataField: "rentFcltySeq", width: "8%", caption: "시설분류명", alignment: "center", lookup: {dataSource: facilityCategories_gbn, displayExpr: "text", valueExpr: "value"}}, 
			{dataField: "rentFcltyType", width: "8%", caption: "대관시설유형",  alignment: "center", lookup: {dataSource: facilityType_gbn, displayExpr: "text", valueExpr: "value"}},
			{dataField: "rentPlaceId", width: "5%", caption: "장소코드", alignment: "center"},
			{dataField: "rentPlacenm", width: "10%", caption: "장소명"},
			{dataField: "rentRsvnpdOptype", width: "10%", caption: "예약접수기간\n운영기준", lookup: {dataSource: facilityBasic_gbn, displayExpr: "text", valueExpr: "value"}},
			{dataField: "rentPayetimeOptype", width: "10%", caption: "입금마감시간\n운영설정", lookup: {dataSource: depositLastTime_gbn, displayExpr: "text", valueExpr: "value"}},
			{width: "10%", caption: "입금마감시간",
				calculateDisplayValue: function (rowData) {
					var depositStr = "제한없음";
					if (rowData.rentPayetimeOptype == "A") {
						depositStr = "신청(승인)시간 이후 "+ ((rowData.rentPaywaittimeHour * 60) + rowData.rentPaywaittimeMin) + "분 이내";
					} 
					else if (rowData.rentPayetimeOptype == "D") {
						depositStr = "이용일 "+ rowData.rentPaywaitDday + "일전 "+ rowData.rentPaywaitDdayEtime +"까지";
					}
					
					return depositStr;
				}
			},
			{dataField: "INFORMATION_TEL", width: "8%", caption: "대관문의연락처"},
			{dataField: "rentResveAlrmHpno", width: "8%", caption: "알림담당자연락처"},
			{dataField: "rentResveUncertyn", width: "10%", caption: "비대면인증서비스\n적용여부", alignment: "center", lookup: {dataSource: apply_gbn, displayExpr: "text", valueExpr: "value"}},
			{dataField: "rentEventFeeyn", width: "8%", caption: "행사요금운영여부", alignment: "center", lookup: {dataSource: run_gbn, displayExpr: "text", valueExpr: "value"}},
			{dataField: "onlineOpenyn", width: "8%", caption: "온라인공개여부", showEditorAlways: true, alignment: "center", lookup: {dataSource: online_gbn, displayExpr: "text", valueExpr: "value"}},
			{dataField: "useYn", width: "8%", caption: "예약장소운영여부", showEditorAlways: true, alignment: "center", lookup: {dataSource: run_gbn, displayExpr: "text", valueExpr: "value"}},
			{dataField: "rentPcncdeLimit", vislble: false},
			{dataField: "rentPcncdeDday", visible: false},
			{dataField: "rentPcncdeDdayEtime", visible: false}
		];
	}
	
	function mainListData() {
		var dataList = "";
		
		dataList = [
			{ID: 1, rentFcltySeq: "1", rentFcltyType: "FT001", rentPlaceId: "1", rentPlacenm: "공설운동장A", rentRsvnpdOptype: "3", rentPayetimeOptype: "A", rentPaywaittimeHour: 12, rentPaywaittimeMin: 10, rentPaywaitDday: 0, rentPaywaitDdayEtime: "", INFORMATION_TEL: "031-234-5678", rentResveAlrmHpno: "011-2222-9999", rentResveUncertyn: "0", rentEventFeeyn: "1", useYn: "1", onlineOpenyn: "1", rentPcncdeLimit: "D", rentPcncdeDday: "1", rentPcncdeDdayEtime: "18:00"},
			{ID: 2, rentFcltySeq: "2", rentFcltyType: "FT001", rentPlaceId: "2", rentPlacenm: "1LANE", rentRsvnpdOptype: "1", rentPayetimeOptype: "N", rentPaywaittimeHour: 0, rentPaywaittimeMin: 0, rentPaywaitDday: 0, rentPaywaitDdayEtime: "", INFORMATION_TEL: "031-112-1122", rentResveAlrmHpno: "011-123-9876", rentResveUncertyn: "1", rentEventFeeyn: "0", useYn: "0", onlineOpenyn: "0", rentPcncdeLimit: "N", rentPcncdeDday: "", rentPcncdeDdayEtime: ""},
			{ID: 3, rentFcltySeq: "2", rentFcltyType: "FT001", rentPlaceId: "3", rentPlacenm: "2LANE", rentRsvnpdOptype: "1", rentPayetimeOptype: "N", rentPaywaittimeHour: 0, rentPaywaittimeMin: 0, rentPaywaitDday: 0, rentPaywaitDdayEtime: "", INFORMATION_TEL: "031-112-1122", rentResveAlrmHpno: "011-987-1234", rentResveUncertyn: "1", rentEventFeeyn: "0", useYn: "0", onlineOpenyn: "0", rentPcncdeLimit: "N", rentPcncdeDday: "", rentPcncdeDdayEtime: ""},
			{ID: 4, rentFcltySeq: "3", rentFcltyType: "FT001", rentPlaceId: "4", rentPlacenm: "헬스PT1실", rentRsvnpdOptype: "2", rentPayetimeOptype: "N", rentPaywaittimeHour: 0, rentPaywaittimeMin: 0, rentPaywaitDday: 0, rentPaywaitDdayEtime: "", INFORMATION_TEL: "031-115-0022", rentResveAlrmHpno: "011-002-5252", rentResveUncertyn: "0", rentEventFeeyn: "0", useYn: "0", onlineOpenyn: "0", rentPcncdeLimit: "T", rentPcncdeDday: "", rentPcncdeDdayEtime: ""},
			{ID: 5, rentFcltySeq: "1", rentFcltyType: "FT001", rentPlaceId: "5", rentPlacenm: "공설운동장B", rentRsvnpdOptype: "3", rentPayetimeOptype: "A", rentPaywaittimeHour: 12, rentPaywaittimeMin: 0, rentPaywaitDday: 0, rentPaywaitDdayEtime: "", INFORMATION_TEL: "031-234-5678", rentResveAlrmHpno: "011-2222-9999", rentResveUncertyn: "1", rentEventFeeyn: "1", useYn: "1", onlineOpenyn: "1", rentPcncdeLimit: "D", rentPcncdeDday: "0", rentPcncdeDdayEtime: "19:00"},
			{ID: 6, rentFcltySeq: "4", rentFcltyType: "FT002", rentPlaceId: "6", rentPlacenm: "세미나실101호", rentRsvnpdOptype: "2", rentPayetimeOptype: "D", rentPaywaittimeHour: 0, rentPaywaittimeMin: 0, rentPaywaitDday: 3, rentPaywaitDdayEtime: "23:00", INFORMATION_TEL: "031-002-0011", rentResveAlrmHpno: "011-521-1256", rentResveUncertyn: "0", rentEventFeeyn: "0", useYn: "1", onlineOpenyn: "1", rentPcncdeLimit: "D", rentPcncdeDday: "3", rentPcncdeDdayEtime: "20:00"},
			{ID: 7, rentFcltySeq: "1", rentFcltyType: "FT001", rentPlaceId: "7", rentPlacenm: "공설운동장B", rentRsvnpdOptype: "3", rentPayetimeOptype: "A", rentPaywaittimeHour: 12, rentPaywaittimeMin: 0, rentPaywaitDday: 0, rentPaywaitDdayEtime: "", INFORMATION_TEL: "031-234-5678", rentResveAlrmHpno: "011-2222-9999", rentResveUncertyn: "1", rentEventFeeyn: "1", useYn: "1", onlineOpenyn: "1", rentPcncdeLimit: "N", rentPcncdeDday: "", rentPcncdeDdayEtime: ""},
			{ID: 8, rentFcltySeq: "1", rentFcltyType: "FT001", rentPlaceId: "8", rentPlacenm: "공설운동장B", rentRsvnpdOptype: "3", rentPayetimeOptype: "A", rentPaywaittimeHour: 10, rentPaywaittimeMin: 30, rentPaywaitDday: 0, rentPaywaitDdayEtime: "", INFORMATION_TEL: "031-234-5678", rentResveAlrmHpno: "011-2222-9999", rentResveUncertyn: "1", rentEventFeeyn: "1", useYn: "1", onlineOpenyn: "1", rentPcncdeLimit: "N", rentPcncdeDday: "", rentPcncdeDdayEtime: ""},
			{ID: 9, rentFcltySeq: "1", rentFcltyType: "FT001", rentPlaceId: "9", rentPlacenm: "공설운동장B", rentRsvnpdOptype: "3", rentPayetimeOptype: "A", rentPaywaittimeHour: 10, rentPaywaittimeMin: 10, rentPaywaitDday: 0, rentPaywaitDdayEtime: "", INFORMATION_TEL: "031-234-5678", rentResveAlrmHpno: "011-2222-9999", rentResveUncertyn: "1", rentEventFeeyn: "1", useYn: "1", onlineOpenyn: "1", rentPcncdeLimit: "N", rentPcncdeDday: "", rentPcncdeDdayEtime: ""},
			{ID: 10, rentFcltySeq: "1", rentFcltyType: "FT001", rentPlaceId: "10", rentPlacenm: "공설운동장B", rentRsvnpdOptype: "3", rentPayetimeOptype: "A", rentPaywaittimeHour: 15, rentPaywaittimeMin: 0, rentPaywaitDday: 0, rentPaywaitDdayEtime: "", INFORMATION_TEL: "031-234-5678", rentResveAlrmHpno: "011-2222-9999", rentResveUncertyn: "1", rentEventFeeyn: "1", useYn: "1", onlineOpenyn: "1", rentPcncdeLimit: "N", rentPcncdeDday: "", rentPcncdeDdayEtime: ""},
			{ID: 11, rentFcltySeq: "1", rentFcltyType: "FT001", rentPlaceId: "11", rentPlacenm: "공설운동장B", rentRsvnpdOptype: "3", rentPayetimeOptype: "A", rentPaywaittimeHour: 15, rentPaywaittimeMin: 0, rentPaywaitDday: 0, rentPaywaitDdayEtime: "", INFORMATION_TEL: "031-234-5678", rentResveAlrmHpno: "011-2222-9999", rentResveUncertyn: "1", rentEventFeeyn: "1", useYn: "1", onlineOpenyn: "1", rentPcncdeLimit: "N", rentPcncdeDday: "", rentPcncdeDdayEtime: ""},
			{ID: 12, rentFcltySeq: "1", rentFcltyType: "FT001", rentPlaceId: "12", rentPlacenm: "공설운동장B", rentRsvnpdOptype: "3", rentPayetimeOptype: "A", rentPaywaittimeHour: 18, rentPaywaittimeMin: 0, rentPaywaitDday: 0, rentPaywaitDdayEtime: "", INFORMATION_TEL: "031-234-5678", rentResveAlrmHpno: "011-2222-9999", rentResveUncertyn: "1", rentEventFeeyn: "1", useYn: "1", onlineOpenyn: "1", rentPcncdeLimit: "N", rentPcncdeDday: "", rentPcncdeDdayEtime: ""},
			{ID: 13, rentFcltySeq: "1", rentFcltyType: "FT001", rentPlaceId: "13", rentPlacenm: "공설운동장B", rentRsvnpdOptype: "3", rentPayetimeOptype: "A", rentPaywaittimeHour: 18, rentPaywaittimeMin: 0, rentPaywaitDday: 0, rentPaywaitDdayEtime: "", INFORMATION_TEL: "031-234-5678", rentResveAlrmHpno: "011-2222-9999", rentResveUncertyn: "1", rentEventFeeyn: "1", useYn: "1", onlineOpenyn: "1", rentPcncdeLimit: "N", rentPcncdeDday: "", rentPcncdeDdayEtime: ""},
			{ID: 14, rentFcltySeq: "1", rentFcltyType: "FT001", rentPlaceId: "14", rentPlacenm: "공설운동장B", rentRsvnpdOptype: "3", rentPayetimeOptype: "A", rentPaywaittimeHour: 12, rentPaywaittimeMin: 0, rentPaywaitDday: 0, rentPaywaitDdayEtime: "", INFORMATION_TEL: "031-234-5678", rentResveAlrmHpno: "011-2222-9999", rentResveUncertyn: "1", rentEventFeeyn: "1", useYn: "1", onlineOpenyn: "1", rentPcncdeLimit: "N", rentPcncdeDday: "", rentPcncdeDdayEtime: ""},
			{ID: 15, rentFcltySeq: "1", rentFcltyType: "FT001", rentPlaceId: "15", rentPlacenm: "공설운동장B", rentRsvnpdOptype: "3", rentPayetimeOptype: "A", rentPaywaittimeHour: 12, rentPaywaittimeMin: 0, rentPaywaitDday: 0, rentPaywaitDdayEtime: "", INFORMATION_TEL: "031-234-5678", rentResveAlrmHpno: "011-2222-9999", rentResveUncertyn: "1", rentEventFeeyn: "1", useYn: "1", onlineOpenyn: "1", rentPcncdeLimit: "N", rentPcncdeDday: "", rentPcncdeDdayEtime: ""},
			{ID: 16, rentFcltySeq: "1", rentFcltyType: "FT001", rentPlaceId: "16", rentPlacenm: "공설운동장B", rentRsvnpdOptype: "3", rentPayetimeOptype: "A", rentPaywaittimeHour: 12, rentPaywaittimeMin: 0, rentPaywaitDday: 0, rentPaywaitDdayEtime: "", INFORMATION_TEL: "031-234-5678", rentResveAlrmHpno: "011-2222-9999", rentResveUncertyn: "1", rentEventFeeyn: "1", useYn: "1", onlineOpenyn: "1", rentPcncdeLimit: "N", rentPcncdeDday: "", rentPcncdeDdayEtime: ""}
		];
		
		return dataList;
	}
	
	//신규 버튼
	function createFacilityPlace(){
		gridFacilityPlc.option("editing.mode", "popup");
		setAllowEditing("#gridList",true,[]);
		
		gridFacilityPlc.addRow();
		gridFacilityPlc.deselectAll();
	}
	//수정 버튼
	function updateFacilityPlace(){
		if (selectedRowIndex==-1) {
			DevExpress.ui.notify("수정할 리스트를 선택하세요."); 
			return;
		}
		
		gridFacilityPlc.option("editing.mode", "popup");
		editmode='update';
		setAllowEditing("#gridList",true,[]);
		gridFacilityPlc.editRow(selectedRowIndex);
		gridFacilityPlc.deselectAll();
	}
	//삭제 버튼
	function deleteFacilityPlace(){
		if(selectedRowIndex==-1) return;
		editmode='delete';
		if(gridFacilityPlc.getSelectedRowKeys().length ==0){
			gridFacilityPlc.deleteRow(selectedRowIndex);
			gridFacilityPlc.deselectAll();
			return;
		}
		
		if(confirm(gridFacilityPlc.getSelectedRowKeys().length+'건을 삭제하시겠습니까?')){;
		/*	gridEduPrg.getSelectedRowKeys().forEach((key) => {
		        instructorsStore.remove(key);
		     });*/
		     gridFacilityPlc.refresh();
		}
	}
	
	function setAllowEditing(selector,bAllowEditing,excepts){
		var grid =  $(selector).dxDataGrid("instance");
		
		var columns = grid.option("columns");
		grid.beginUpdate();
		columns.forEach(function (column) {
			var idx = excepts.indexOf(column.dataField);
			if( idx >=0){
				grid.columnOption(column.dataField, "allowEditing", !bAllowEditing);
			}else{
				grid.columnOption(column.dataField, "allowEditing", bAllowEditing);
			}
		});
		grid.endUpdate();
	}
	
	function placeCustomizeItem(item){
		let editRowKey = gridFacilityPlc.option('editing.editRowKey');
	   	let index = gridFacilityPlc.getRowIndexByKey(editRowKey);
	   	index = index === -1 ? 0 : index;
	}
	
	//대관장소 등록 팝업 FORM
	function createPlaceDetailForm() {
		var placeDetailItems = "";
		
		placeDetailItems = [
			{name: "operationTree", itemType: "group", items: [
				{template: function (data, itemElement) { operationTree(data, itemElement); } }
			]},
			
			{name: "placeForm", itemType: "group", colSpan: 3, items: [
				{name: "basics", itemType: "group", colCount: 4, width: "60%", caption: "기본설정", items: [
					{colSpan: 2, dataField: "rentFcltySeq", label: {text: "대관시설분류"}, editorType: "dxSelectBox",
						editorOptions: {dataSource: facilityCategories_gbn,
							layout: "horizontal", valueExpr: "value", displayExpr: "text",
							buttons: ["dropDown", {
						 		name: "my_empty_btn",
						 		location: "after",
						 		options: {
						 			text: "대관시설분류등록",
						 			onClick() {
						 				alert("대관시설분류등록으로 이동");
						 			}
						 		}
							}],
							onItemClick: function (e) {
								var arrFacilityCateData = "";
	
								if (e.itemData.value != "") { 
									arrFacilityCateData = getFacilityType(e.itemData.value);
	
									if (arrFacilityCateData) {
										frmInstance.getEditor("rentFcltyTypeView").option("value", arrFacilityCateData.rentFcltyType);
										frmInstance.getEditor("rentApplyLimitgbnView").option("value", arrFacilityCateData.rentApplyLimitgbn);
										frmInstance.getEditor("rentApplyLimitCntView").option("value", arrFacilityCateData.rentApplyLimitCnt);
										frmInstance.getEditor("dwrtPrzwinYnView").option("value", arrFacilityCateData.dwrtPrzwinYn);
										frmInstance.getEditor("przwinLimitCntView").option("value", arrFacilityCateData.przwinLimitCnt);
									}
								}
							}
						},
						validationRules: [{type: "required",message: "대관시설분류 필수 선택"}]
					},
					//대관시설분류 Data로 노출만
					{colSpan: 2, dataField: "rentFcltyTypeView", label: {text: "대관시설유형"}, editorType: "dxSelectBox", disabled: true,
						editorOptions: {dataSource: facilityType_gbn, 
							layout: "horizontal", valueExpr: "value", displayExpr: "text",
							onContentReady: function (e) {
								var indexKey = gridFacilityPlc.option("editing.editRowKey");
								//indexKey = indexKey === -1 ? 0 : indexKey;
								var facilityCategory = gridFacilityPlc.cellValue(indexKey-1, "rentFcltySeq");
								var arrFacilityCateData = "";
								
								if (facilityCategory != "") {
									arrFacilityCateData = getFacilityType(facilityCategory);
									
									if (arrFacilityCateData) {
										e.component.option("value", arrFacilityCateData.rentFcltyType);
									}
								}
							}
						}
					},
					
					{colSpan: 2, dataField: "rentPlacenm", label: {text: "대관장소명"}, validationRules: [{type: "required",message: "대관장소명 필수 입력"}]},
					{colSpan: 2, itemType: "empty"},
					
					{colSpan: 2, dataField: "rentResveAlrmHpno", label: {text: "알림담당연락처"}},
					{colSpan: 2, dataField: "INFORMATION_TEL", label: {text: "대관문의처"}}
				]},
				{name: "operation", itemType: "group", colCount: 4, caption: "운영설정", items: [
					{colSpan: 2, dataField: "rentRsvnpdOptype", label: {text: "예약접수기간운영기준"}, editorType: "dxSelectBox",
						editorOptions: {dataSource: facilityBasic_gbn,
							layout: "horizontal", valueExpr: "value", displayExpr: "text", 
							onInitialized: function (e) {
								if (!e.component.option("value")) {
									e.component.option("value", e.component.option("dataSource")[0].value);
								}
							}
						},
						validationRules: [{type: "required",message: "예약접수기간운영기준 필수 선택"}]
					},
					{colSpan: 2, dataField: "rentEventFeeyn", label: {text: "행사요금운영여부"}, editorType: "dxSelectBox",
						editorOptions: {dataSource: run_gbn,
							layout: "horizontal", valueExpr: "value", displayExpr: "text",
							onInitialized: function (e) {
								if (!e.component.option("value")) {
									e.component.option("value", e.component.option("dataSource")[0].value);
								}
							}
						},
						validationRules: [{type: "required",message: "행사요금운영여부 필수 선택"}]
					},
					
					{colSpan: 2, dataField: "rentPcncdeLimit", label: {text: "예약결제취소제한"}, editorType: "dxSelectBox",
						editorOptions: {dataSource: payCancelLimit_gbn,
							layout: "horizontal", valueExpr: "value", displayExpr: "text", 
							onInitialized: function (e) {
								if (!e.component.option("value")) {
									e.component.option("value", e.component.option("dataSource")[0].value);
								}
							},
							onItemClick: function (e) {
								//gridFacilityPlc.columnOption("payCancel_ddayTime", "formItem.visible", false);
								
								if (e.itemData.value == "D") {
									frmInstance.itemOption("placeForm.operation.payCancel_noSchedual", "visible", false);
									frmInstance.itemOption("placeForm.operation.payCancel_ddayTime", "visible", true);
									frmInstance.itemOption("placeForm.operation.payCancel_transection", "visible", false);
								}
								else if (e.itemData.value == "T") {
									frmInstance.itemOption("placeForm.operation.payCancel_noSchedual", "visible", false);
									frmInstance.itemOption("placeForm.operation.payCancel_ddayTime", "visible", false);
									frmInstance.itemOption("placeForm.operation.payCancel_transection", "visible", true);
								}
								else {
									frmInstance.itemOption("placeForm.operation.payCancel_noSchedual", "visible", true);
									frmInstance.itemOption("placeForm.operation.payCancel_ddayTime", "visible", false);
									frmInstance.itemOption("placeForm.operation.payCancel_transection", "visible", false);
								}
								
							} 
						}
					},
					{colSpan: 2, itemType: "group", cssClass: "payCancelItems", items: [
						{name: "payCancel_noSchedual", label: {visible: false}, template: "<div class='form-text-temp'>*제한안함은 당일 이용회차 시작시간전까지 취소가능</div>"},
						{name: "payCancel_ddayTime", itemType: "group", colCount: 2, label: {text: "이용일"}, cssClass: "form-group-label95", items: [
							{dataField: "rentPcncdeDday", label: {location: "right", text: "전"}, cssClass: "form-label30", editorType: "dxSelectBox", 
								editorOptions: {dataSource: limitDateItems,
									layout: "horizontal", valueExpr: "value", displayExpr: "text",
									onInitialized: function (e) {
										if (!e.component.option("value")) {
											e.component.option("value", e.component.option("dataSource")[0].value);
										}
									}
								}
							},
							{dataField: "rentPcncdeDdayEtime", label: {location: "right", text: "마감"}, cssClass: "form-label30", editorType: "dxDateBox", 
								editorOptions: {pickerType: 'rollers', type: 'time', value: nowDate, displayFormat: 'HH:mm'}
							}
						]},
						{name: "payCancel_transection", label: {visible: false}, itemType: "empty"}
					]},
					
					{colSpan: 2, dataField: "rentPayetimeOptype", label: {text: "입금마감시간운영설정"}, editorType: "dxSelectBox",
						editorOptions: {dataSource: depositLastTime_gbn,
							layout: "horizontal", valueExpr: "value", displayExpr: "text", 
							onInitialized: function (e) {
								if (!e.component.option("value")) {
									e.component.option("value", e.component.option("dataSource")[0].value);
								}
							},
							onItemClick: function (e) {
								if (e.itemData.value == "D") {
									frmInstance.itemOption("placeForm.operation.deposit_nonSchedual", "visible", false);
									frmInstance.itemOption("placeForm.operation.deposit_schedual", "visible", true);
									frmInstance.itemOption("placeForm.operation.deposit_schedual.approvalHour", "visible", false);
									frmInstance.itemOption("placeForm.operation.deposit_schedual.approvalMinit", "visible", false);
									frmInstance.itemOption("placeForm.operation.deposit_schedual.ddayDay", "visible", true);
									frmInstance.itemOption("placeForm.operation.deposit_schedual.ddayTime", "visible", true);
								}
								else if (e.itemData.value == "A") {
									frmInstance.itemOption("placeForm.operation.deposit_nonSchedual", "visible", false);
									frmInstance.itemOption("placeForm.operation.deposit_schedual", "visible", true);
									frmInstance.itemOption("placeForm.operation.deposit_schedual.approvalHour", "visible", true);
									frmInstance.itemOption("placeForm.operation.deposit_schedual.approvalMinit", "visible", true);
									frmInstance.itemOption("placeForm.operation.deposit_schedual.ddayDay", "visible", false);
									frmInstance.itemOption("placeForm.operation.deposit_schedual.ddayTime", "visible", false);
								}
								else {
									frmInstance.itemOption("placeForm.operation.deposit_nonSchedual", "visible", true);
									frmInstance.itemOption("placeForm.operation.deposit_schedual", "visible", false);
									frmInstance.itemOption("placeForm.operation.deposit_schedual.approvalHour", "visible", false);
									frmInstance.itemOption("placeForm.operation.deposit_schedual.approvalMinit", "visible", false);
									frmInstance.itemOption("placeForm.operation.deposit_schedual.ddayDay", "visible", false);
									frmInstance.itemOption("placeForm.operation.deposit_schedual.ddayTime", "visible", false);
								}
							} 
						}
					},
					{colSpan: 2, itemType: "group", cssClass: "depositItems", items: [
						{name: "deposit_nonSchedual", itemType: "empty"},
						{name: "deposit_schedual", itemType: "group", colCount: 2, label: {text: "입금마감시간"}, cssClass: "form-group-label95", items: [
							{name: "approvalHour", dataField: "rentPaywaittimeHour", label: {text: "신청(승인)시간"}, cssClass: "form-label70", editorType: "dxNumberBox",
								editorOptions: {showSpinButtons: true, min: 0, format: "#,##0시간", width: 80,
									onInitialized: function (e) {
										console.log(e.component.option("value"));
										if (!e.component.option("value")) {
											e.component.option("value", 0);
										}
									}
								}
							},
							{name: "approvalMinit", dataField: "rentPaywaittimeMin", label: {location: "right", text: "이후 마감"}, cssClass: "form-label90", editorType: "dxNumberBox",
								editorOptions: {showSpinButtons: true, min: 0, step: 10, format: "#0분", width: 80,
									onInitialized: function (e) {
										if (!e.component.option("value")) {
											e.component.option("value", 0);
										}
									}
								}
							},
							
							{name: "ddayDay", dataField: "rentPaywaitDday", label: {location: "right", text: "전"}, cssClass: "form-label30", editorType: "dxSelectBox",
								editorOptions: {dataSource: limitDateItems,
									layout: "horizontal", valueExpr: "value", displayExpr: "text",
									onInitialized: function (e) {
										if (!e.component.option("value")) {
											e.component.option("value", e.component.option("dataSource")[0].value);
										}
									}
								}
							},
							{name: "ddayTime", dataField: "rentPaywaitDdayEtime", label: {location: "right", text: "마감"}, cssClass: "form-label30", editorType: "dxDateBox",
								editorOptions: {pickerType: "rollers", type: "time", value: nowDate, displayFormat: "HH:mm"}
							}
						]}
					]},
					
					{colSpan: 2, dataField: "rentResveUncertyn", label: {text: "비대면인증서비스적용유무"}, editorType: "dxSelectBox",
						editorOptions: {dataSource: apply_gbn,
							layout: "horizontal", valueExpr: "value", displayExpr: "text", 
							onInitialized: function (e) {
								if (!e.component.option("value")) {
									e.component.option("value", e.component.option("dataSource")[1].value);
								}
							}
						}
					},
					{colSpan: 2, dataField: "onlineOpenyn", label: {text: "온라인공개여부"}, editorType: "dxSelectBox", 
						editorOptions: {dataSource: online_gbn,
							layout: "horizontal", valueExpr: "value", displayExpr: "text", 
							onInitialized: function (e) {
								if (!e.component.option("value")) {
									e.component.option("value", e.component.option("dataSource")[0].value);
								}
							}
						}
					},
					
					//대관시설분류 Data로 노출만
					{colSpan: 2, itemType: "group", colCount: 2, label: {text: "예약신청횟수제한"}, items: [
						{dataField: "rentApplyLimitgbnView", label: {visible: false}, disabled: true, editorType: "dxSelectBox",
							editorOptions: {dataSource: reservationLimit_gbn,
								layout: "horizontal", valueExpr: "value", displayExpr: "text", elementAttr: {class: "form-input150"},
								onContentReady: function (e) {
									var indexKey = gridFacilityPlc.option("editing.editRowKey");
									var facilityCategory = gridFacilityPlc.cellValue(indexKey-1, "rentFcltySeq");
									var arrFacilityCateData = "";
									
									if (facilityCategory != "") {
										arrFacilityCateData = getFacilityType(facilityCategory);
										
										if (arrFacilityCateData) {
											e.component.option("value", arrFacilityCateData.rentApplyLimitgbn);
										}
									}
									else {
										e.component.option("value", e.component.option("dataSource")[0].value);
									}
								}
							}
						},
						{dataField: "rentApplyLimitCntView", label: {visible: false}, disabled: true, editorType: "dxNumberBox", 
							editorOptions: {showSpinButtons: true, min: 0, format: "#,##0 회", elementAttr: {class: "form-input100"},
								onContentReady: function (e) {
									var indexKey = gridFacilityPlc.option("editing.editRowKey");
									var facilityCategory = gridFacilityPlc.cellValue(indexKey-1, "rentFcltySeq");
									var arrFacilityCateData = "";
									
									if (facilityCategory != "") {
										arrFacilityCateData = getFacilityType(facilityCategory);
										
										if (arrFacilityCateData) {
											e.component.option("value", arrFacilityCateData.rentApplyLimitCnt);
										}
									}
									else {
										e.component.option("value", 0);
									}
								}
							}
						},
					]},
					{ colSpan: 2, itemType: "empty"},
					
					//대관시설분류 Data로 노출만
					{colSpan: 2, itemType: "group", colCount: 2, label: {text: "추첨당첨횟수제한"}, items: [
						{dataField: "dwrtPrzwinYnView", label: {visible: false}, disabled: true, editorType: "dxSelectBox",
							editorOptions: {dataSource: restrict_gbn,
								layout: "horizontal", valueExpr: "value", displayExpr: "text", elementAttr: {class: "form-input150"},
								onContentReady: function (e) {
									var indexKey = gridFacilityPlc.option("editing.editRowKey");
									var facilityCategory = gridFacilityPlc.cellValue(indexKey-1, "rentFcltySeq");
									var arrFacilityCateData = "";
									
									if (facilityCategory != "") {
										arrFacilityCateData = getFacilityType(facilityCategory);
										
										if (arrFacilityCateData) {
											e.component.option("value", arrFacilityCateData.dwrtPrzwinYn);
										}
									}
									else {
										e.component.option("value", e.component.option("dataSource")[0].value);
									}
								}
							}
						},
						{dataField: "przwinLimitCntView", label: {visible: false}, disabled: true, editorType: "dxNumberBox", 
							editorOptions: {showSpinButtons: true, min: 0, format: "월 #,##0 회", elementAttr: {class: "form-input100"},
								onContentReady: function (e) {
									var indexKey = gridFacilityPlc.option("editing.editRowKey");
									var facilityCategory = gridFacilityPlc.cellValue(indexKey-1, "rentFcltySeq");
									var arrFacilityCateData = "";
									
									if (facilityCategory != "") {
										arrFacilityCateData = getFacilityType(facilityCategory);
										
										if (arrFacilityCateData) {
											e.component.option("value", arrFacilityCateData.przwinLimitCnt);
										}
									}
									else {
										e.component.option("value", 0);
									}
								}
							}
						},
					]},
					{colSpan: 2, itemType: "empty"},
					
					{colSpan: 2, dataField: "useYn", label: {text: "대관장소운영여부"}, editorType: "dxSelectBox",
						editorOptions: {dataSource: run_gbn,
							layout: "horizontal", valueExpr: "value", displayExpr: "text", 
							onInitialized: function (e) {
								if (!e.component.option("value")) {
									e.component.option("value", e.component.option("dataSource")[0].value);
								}
							}
						},
						validationRules: [{type: "required",message: "대관장소운영여부 필수 선택"}]
					},
					{colSpan: 2, itemType: "empty"}
				]}
			]}
		];

		return placeDetailItems;
	}
	
	function operationTree(data, itemElement) {
		itemElement.append(
			$("<div id='placeOperationTree'>").dxTreeList({
				dataSource: facilityCategoriesList(),
			    dataStructure: "plain",
			    parentIdExpr: "comPrnctgcd",
			    keyExpr: "comItemctgcd",
			    columns: [
			    	{dataField: "comItemctgnm", caption: "윤영상품분류"}
			    ],
			    focusedRowEnabled: true,
			    height: 450,
			    onItemClick(e) {
			    	const item = e.itemData;
			    },
			    onNodesInitialized: function(e) {
		           // e.component.__root = e.root;
		        }
			})
		);
	}
	
	//행정동 Data
	function getAreaList() {
		let areaList = "";
		
		areaList = [
			{text: "행정동 전체", value: "0"},
			{text: "기장읍", value: "2671025021"},
			{text: "장안읍", value: "2671025321"},
			{text: "정관읍", value: "2671032021"}
		]
		
		return areaList;
	}

	//Tab List
	function initTabList(tabId) {
		const longtabs = [
			{id: 1, text: '수시대관', content: '수시대관 등록/수정'},
			{id: 2, text: '정기대관', content: '정기대관옵션 등록/수정'},
			{id: 3, text: '컨텐츠 정보관리', content: '대관 컨텐츠 정보관리'},
			{id: 4, text: '시간표 및 요금설정', content: '대관시간표 및 요금설정 리스트'},
			{id: 5, text: '부속시설관리', content: '부속시설관리 리스트'},
			{id: 6, text: '환불위약금 설정관리', content: '환불위약금관리 리스트'},
			{id: 7, text: '할인정보 설정관리', content: '할인정보관리 리스트'},
			{id: 8, text: '예약불가 일정관리', content: '예약불가일관리 리스트'}
		];
		
		placeTab = $('#scrolledtabs > .tabs-container').dxTabs({
			dataSource: longtabs,
			tabPanelOptions: {deferRendering: false},
			onContentReady(e) {
				if (tabId != "") selectTabList(tabId);
			},
			onItemClick(e) {
				//console.log(e.itemData.id +"//"+ placeCd);
				if (placeCd == "") {
					selectTabId = e.itemData.id;
					DevExpress.ui.notify("리스트를 선택하세요."); 
					return;
				}
				
				selectTabList(e.itemData.id);
			}
		}).dxTabs("instance")
		
		if (tabId != "") placeTab.selectItem(tabId - 1);
	}
	
	function selectTabList(tabId) {
		subMenuList = null;
		
		$("div[id^='tab']").each(function (){
			$(this).hide();
		});

		switch(tabId){
			case 1 :
				$('#tab1').show();
				initNonScheduleSubTabList();
				break;
			case 2 :
				$('#tab2').show();
				initReqularSubTabList();
				break;
			case 3 :
				$('#tab3').show();
				initContentsList();
				break;
			case 4 :
				$('#tab4').show();
				initTimetable();
				break;
			case 5 :
				$('#tab5').show();
				initAccessory();
				break;
			case 6 :
				$('#tab6').show();
				initRefund();
				break;
			case 7 :
				$('#tab7').show();
				initFacilityDiscount();
				break;
			case 8 :
				$('#tab8').show();
				initUnvailable()
				break;
		}
	}
	
	//운영상품분류 Tree List
	function facilityCategoriesList() {
		var facilityCategories;
		
		facilityCategories = [
			{
				comcd: 2,
				comItemctgcd: '0001',
				comItemctgnm:'1.대관관리',
				CTGNM_DISP:'[0001]1.대관관리',
				comItemctgdesc: '대분류입니다',  
				NOTI_CONTEXT: '',
				comItemctglvl: 1,
				comctgsrtord: 0,
				comUseYn: '0',
				expanded: true,
				PRNCTGCD_NM:''
			},
			{
			  	comCd: 2,
			 	comItemctgcd: '0002',
			  	comItemctgnm:'1-1.체육시설',
			  	CTGNM_DISP:'[0002]2.체육시설',
			  	comItemctgdesc: '중분류입니다.',  
			  	NOTI_CONTEXT: '',
			  	comItemctglvl: 2,
			  	comPrnctgcd: '0001',
			  	comTopctgcd: '0001',
			  	comctgsrtord: 1,
			  	comUseYn: '0',
			  	expanded: true,
			  	PRNCTGCD_NM:''
			},
		  	{
				comCd: 2,
				comItemctgcd: '0003',
				comItemctgnm:'1-2.공간시설',
				CTGNM_DISP:'[0003]3.공간시설',
				comItemctgdesc: '중분류입니다',
				NOTI_CONTEXT: '',
				comItemctglvl: 2,
				comPrnctgcd: '0001',
				comTopctgcd: '0001',
				comctgsrtord: 2,
				comUseYn: '0',
				expanded: true,
				PRNCTGCD_NM:''
		  	},
		  	{
		  		comCd: 2,
		  		comItemctgcd: '0004',
		  		comItemctgnm:'1-1-1.축구장',
				CTGNM_DISP:'[0004]4.축구장',
				comItemctgdesc: '소분류입니다',
				NOTI_CONTEXT: '',
				comItemctglvl: 3,
				comPrnctgcd: '0002',
				comTopctgcd: '0001',
				comctgsrtord: 3,
				comUseYn: '0',
				expanded: true,
				PRNCTGCD_NM:''
		  	},
			{
		  		comCd: 2,
		  		comItemctgcd: '0005',
		  		comItemctgnm:'1-1-2.수영장',
				CTGNM_DISP:'[0005]5.수영장',
				comItemctgdesc: '소분류입니다.',
				NOTI_CONTEXT: '',
				comItemctglvl: 3,
				comPrnctgcd: '0002',
				comTopctgcd: '0001',
				comctgsrtord: 4,
				comUseYn: '0',
				expanded: true,
				PRNCTGCD_NM:''
			},
			{
				comCd: 2,
				comItemctgcd: '0006',
				comItemctgnm:'1-1-3.헬스장',
				CTGNM_DISP:'[0006]6.헰스장',
				comItemctgdesc: '소분류입니다',
				NOTI_CONTEXT: '',
				comItemctglvl: 3,
				comPrnctgcd: '0002',
				comTopctgcd: '0001',
				comctgsrtord: 5,
				comUseYn: '0',
				expanded: true,
				PRNCTGCD_NM:''
			},
			{
				comCd: 2,
				comItemctgcd: '0007',
				comItemctgnm:'1-2-1.세미나실',
				CTGNM_DISP:'[0007]7.세미나실',
				comItemctgdesc: '소분류입니다.',
				NOTI_CONTEXT: '',
				comItemctglvl: 3,
				comPrnctgcd: '0003',
				comTopctgcd: '0001',
				comctgsrtord: 6,
				comUseYn: '0',
				expanded: true,
				PRNCTGCD_NM:''
			}
		];
		
		return facilityCategories;
	}
	
	function rentList() {
		dataList = "";
		
		dataList = [
			{value: 1, text: "축구장"},
			{value: 2, text: "테니스장"},
			{value: 3, text: "농구장"}
		]
		
		return dataList;
	}
	
	function placeList() {
		dataList = "";
		
		dataList = [
			{value: 1, text: "공설운동장A"},
			{value: 2, text: "공설운동장B"}
		]
		
		return dataList;
	}
	
	//대관시설분류 선택시 기본 Data 노출
	function getFacilityType(data) {
		var facilityDataList = "";
		
		if (data == "1") {
			facilityDataList = {ID: 1, rentFcltyType: "FT001", rentApplyLimitgbn: "M", rentApplyLimitCnt: 2, dwrtPrzwinYn: "1", przwinLimitCnt: 2}
		}
		else if (data == "2") {
			facilityDataList = {ID: 2, rentFcltyType: "FT002", rentApplyLimitgbn: "N", rentApplyLimitCnt: 0, dwrtPrzwinYn: "0", przwinLimitCnt: 0}
		}
		
		return facilityDataList;
	}
	
	//페이지이동 (페이지 이동명, 시설분류번호)
	function goUrl(pageNm, fcltyId) {
		console.log(pageNm);
		//location.href="/fmcs/facilityPlaceGbn/mainlist";
		//history.pushState("", "", "/fmcs/facilityPlaceGbn/mainlist");
	}
	
	//대관장소 복사 popup
	function placeCopy() {
		if (placeCopyPopup) {
			placeCopyPopup = null;
			$("#placeCopy_Popup").dxPopup("dispose");
		}
	
		placeCopyPopup = $("#placeCopy_Popup").dxPopup({
			contentTemplate: function (e) {
				placeCopyTemplate(e);
			},
			visible: true,
			title: "대관장소 복사 등록",
			width: 600,
	        height: 750,
			position: {
				my: "center",
			    at: "center",
			    of: window
			},
			toolbarItems: [{
				widget: "dxButton",
				toolbar: "bottom",
			    location: "after",
			    options: {
			    	text: "저장",
			        onClick() {
			    		DevExpress.ui.notify("저장");
			    	},
			    },
			}, 
			{
				widget: "dxButton",
				toolbar: "bottom",
			    location: "after",
			    options: {
			    	text: "취소",
			        onClick() {
			    		placeCopyForm = null;
			    		placeCopyPopup.hide();
			    		placeCopyPopup = null;
			    		$("#placeCopy_Popup").dxPopup("dispose");
			    	}
			    }
			}]
		}).dxPopup("instance");
	}
	
	//대관장소 복사 Form
	function placeCopyTemplate(objPopup) {
		let placeCopyContent = $("<div id='placeCopyForm' />");
		
		placeCopyForm = placeCopyContent.dxForm({
			repaintChangesOnly: true,
			showColonAfterLabel: false,
		    colCount: 1,
		    items: [
		    	{dataField: "orgRentFcltySeq", label: {text: "원본 대관시설분류"}, disabled: true, editorType: "dxSelectBox",
		    		editorOptions: {dataSource: facilityCategories_gbn,
		    			layout: "horizontal", valueExpr: "value", displayExpr: "text", value: fcltySeq
		    		}
		    	},
		    	{dataField: "orgRentPlaceId", label: {text: "원본 대관장소명"}, disabled: true, editorType: "dxSelectBox",
		    		editorOptions: {dataSource: placeList(),
		    			layout: "horizontal", valueExpr: "value", displayExpr: "text", value: placeCd
		    		}
		    	},
		    	{dataField: "newRentFcltySeq", label: {text: "대상 대관시설분류"}, editorType: "dxSelectBox",
		    		editorOptions: {dataSource: facilityCategories_gbn,
		    			layout: "horizontal", valueExpr: "value", displayExpr: "text" 
		    		},
		    		validationRules: [{type: "required",message: "대관시설분류 필수 선택"}]
		    	},
		    	{dataField: "newRentPlacenm", label: {text: "대상 등록 장소명"}, validationRules: [{type: "required", message: "대관장소 필수 입력"}] },
		    	{dataField: "COPY_TABLE", label: {text: "복사 항목"}, itemType: "group", cssClass: "check-label100", items: [
		    		{name: "RENT_RSANYTM_OPT", label: {visible: false}, cssClass: "dx-htmleditor-content", editorType: "dxCheckBox", editorOptions: {text: "수시대관설정", value: true}},
		    		{name: "RENT_RSFDRM_OPT", label: {visible: false}, cssClass: "dx-htmleditor-content", editorType: "dxCheckBox", editorOptions: {text: "정기대관설정", value: true}},
		    		{name: "RENT_PLACE_CONTENTS", label: {visible: false}, cssClass: "dx-htmleditor-content", editorType: "dxCheckBox", editorOptions: {text: "대관 컨텐츠 정보", value: true}},
		    		{name: "RENT_TIME", label: {visible: false}, cssClass: "dx-htmleditor-content", editorType: "dxCheckBox", editorOptions: {text: "대관 시간표 및 요금설정", value: true}},
		    		{name: "RENT_REFUND", label: {visible: false}, cssClass: "dx-htmleditor-content", editorType: "dxCheckBox", editorOptions: {text: "환불규정 설정", value: true}},
		    		{name: "RENT_PLACE_DC_STDMNG", label: {visible: false}, cssClass: "dx-htmleditor-content", editorType: "dxCheckBox", editorOptions: {text: "할인정보 설정", value: true}},
		    		{name: "RENT_RSVN_EXCLDATE", label: {visible: false}, cssClass: "dx-htmleditor-content", editorType: "dxCheckBox", editorOptions: {text: "예약불가 일정", value: true}},
		    		{name: "RENT_AUTOSET_ADCLS", label: {visible: false}, cssClass: "dx-htmleditor-content", editorType: "dxCheckBox", editorOptions: {text: "부속시설 설정", value: false}}
		    	]}
		    ]
		}).dxForm("instance");
		
		objPopup.append(placeCopyContent);
	}
</script>

<!-- MainTitle -->
<div class="row row_title">
	<div class="col-12">
		<ul class="navbar-nav">
 			<li class="nav-item d-sm-inline-block quick-nav">
		        대관장소 관리
		    </li>
			<li>
				<ul class="common-menu">
				    <li class="nav-item d-sm-inline-block quick-nav">
				        <a href="javascript:void(0);" onclick="createFacilityPlace();">
				        신규
				        <img src="/fmcs/images/ico_new.png"></a>
				    </li>
				    <li class="nav-item d-sm-inline-block quick-nav">
				         <a href="javascript:void(0);" onclick="updateFacilityPlace();">수정 
				        <img src="/fmcs/images/ico_edit.png"></a>
				    </li>
				    <li class="nav-item d-sm-inline-block quick-nav">
				        <a href="javascript:void(0);" onclick="deleteFacilityPlace();">삭제
				        <img src="/fmcs/images/ico_delete.png"></a>
				    </li>
				    <li class="nav-item d-sm-inline-block quick-nav">
				        <a href="javascript:void(0);" onclick="cancel();">취소
				        <img src="/fmcs/images/ico_cancel.png"></a>
				    </li>
			    </ul>
		    </li>
		</ul>	
	</div>
</div>

<div class="row">
	<!--  Search Form -->
	<div class="col-12">
		<div class="card" style="background: #F2F2F2; _box-shadow: none;">
			<div class="card-body">
				<form id="searchForm1" name="searchForm" class="form-horizontal">
					<div class="form-group normal_condition" id="facilitySearch"></div>
					<div class="form-group buttons" >
						<div class="btn-group" id="searchBtn"></div>
						<div class="btn-group btnRefresh" id="searchInitBtn"></div>
					</div>
				</form>
			</div>
		</div>
	</div>
	
	<!-- Data Grid -->
	<div class="col-14" style="height: 410px;">
		<div class="card" style="background: #F2F2F2; _box-shadow: none;">
			<div class="card-body">
				<div id="gridList">
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Tab List -->
<div class="row">
	<div class="col-12" style="height: 360px;">
		<div class="card" style="background: #F2F2F2; _box-shadow: none;">
			<div id="scrolledtabs">
				<div class="tabs-container"></div>
			</div>
			
			<div id="tab1" class="row" style="display:none;">
				<div class="col-2 tab_list">
	 			</div>
				<div class="col-10 tab_contents2">
					<div class="contents1"></div>
					<div class="contents2"></div>
				</div>
			</div>
			
			<div id="tab2" class="row" style="display:none;">
				<div class="col-2 tab_list">
	 			</div>
				<div class="col-10 tab_contents2">
					<div class="contents1"></div>
					<div class="contents2"></div>
					<div class="contents3"></div>
				</div>
			</div>
			
			<div id="tab3" style="display:none;">
				<div class="tab_contents2"></div>
			</div>
			
			<div id="tab4" style="display:none;">
				<div class="tab_contents2"></div>
			</div>
			
			<div id="tab5" style="display:none;">
				<div class="tab_contents2"></div>
			</div>
			
			<div id="tab6" style="display:none;">
				<div class="tab_contents2"></div>
			</div>
			
			<div id="tab7" style="display:none;">
				<div class="tab_contents2">
					<div class="tab_contents_form"></div>
					<div class="tab_contents_grid"></div>
				</div>
			</div>
			
			<div id="tab8" style="display:none;">
				<div class="tab_contents">
					<div id="holidayToolbar" class="hs-box hs-holiday-day-toolbar" > </div>
					<div id="holidaySchedule" class="hs-unavailable-calendar-container" > </div>
				</div>
			</div>
		</div>
	</div>
</div>

<div id="placeCopy_Popup"></div>
<div id="facilityTimetable_Popup"></div>
<div id="facilityPrice_Popup"></div>
<div id="unavailableCreate_Popup"><</div>
<div id="facilityUnavailable_Popup"></div>