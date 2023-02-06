<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<link rel="stylesheet" href="/fmcs/css/fmcs_member.css">
<script src="/fmcs/js/default_data.js"></script>
<script src="/fmcs/js/member/member_data.js?ver=1"></script>
<script src="/fmcs/js/rent/popup/rent_refund.js"></script>
<script src="/fmcs/js/rent/popup/rent_card_refund.js"></script>
<script>
	let resultList = new DevExpress.data.ArrayStore({
		key: "TEME_CD",
		data: [
			{FAC_USE_TIME:"07:00", FAC_CATE:"축구장", FAC_PLACE:"공설운동장A", CHANGE_GBN:"환불", CHANGE_DT:"", STATUS_GBN:"신청취소", ID: 1, TEME_CD: 1, TEAM_NAME: "팀01", TEAM_GBN: "10", MEM_NO: "00001101", TEAM_HP: "010-1111-2222", MAKE_DATE: "20221219", PT_PERSON: "홍길동", RESIDENCE_GBN: "1", DC_STATUS: "미확정", DC_REASON: "", STATUS: "Y", USE_YN: "1"},
			{FAC_USE_TIME:"07:00", FAC_CATE:"수영장", FAC_PLACE:"1LANE", CHANGE_GBN:"환불", CHANGE_DT:"", STATUS_GBN:"승인완료", ID: 2, TEME_CD: 2, TEAM_NAME: "팀02", TEAM_GBN: "10", MEM_NO: "00001101", TEAM_HP: "010-1111-2222", MAKE_DATE: "20221219", PT_PERSON: "홍길동", RESIDENCE_GBN: "1", DC_STATUS: "미확정", DC_REASON: "", STATUS: "Y", USE_YN: "1"},
			{FAC_USE_TIME:"07:00", FAC_CATE:"헬스장", FAC_PLACE:"2LANE", CHANGE_GBN:"환불", CHANGE_DT:"", STATUS_GBN:"신청등록", ID: 3, TEME_CD: 3, TEAM_NAME: "팀03", TEAM_GBN: "10", MEM_NO: "00001101", TEAM_HP: "010-1111-2222", MAKE_DATE: "20221219", PT_PERSON: "홍길동", RESIDENCE_GBN: "1", DC_STATUS: "미확정", DC_REASON: "", STATUS: "Y", USE_YN: "1"},
			{FAC_USE_TIME:"08:00", FAC_CATE:"축구장", FAC_PLACE:"헬스PT1실", CHANGE_GBN:"환불", CHANGE_DT:"", STATUS_GBN:"신청등록", ID: 4, TEME_CD: 4, TEAM_NAME: "팀04", TEAM_GBN: "10", MEM_NO: "00001101", TEAM_HP: "010-1111-2222", MAKE_DATE: "20221219", PT_PERSON: "홍길동", RESIDENCE_GBN: "1", DC_STATUS: "확정", DC_REASON: "관내거주자포함", STATUS: "Y", USE_YN: "1"},
			{FAC_USE_TIME:"08:00", FAC_CATE:"수영장", FAC_PLACE:"세미나실101호", CHANGE_GBN:"환불", CHANGE_DT:"", STATUS_GBN:"신청등록", ID: 5, TEME_CD: 5, TEAM_NAME: "팀05", TEAM_GBN: "20", MEM_NO: "00001101", TEAM_HP: "010-1111-2222", MAKE_DATE: "20221219", PT_PERSON: "홍길동", RESIDENCE_GBN: "1", DC_STATUS: "미확정", DC_REASON: "", STATUS: "Y", USE_YN: "1"},
			{FAC_USE_TIME:"08:00", FAC_CATE:"헬스장", FAC_PLACE:"공설운동장B", CHANGE_GBN:"환불", CHANGE_DT:"", STATUS_GBN:"신청등록", ID: 6, TEME_CD: 6, TEAM_NAME: "팀06", TEAM_GBN: "10", MEM_NO: "00001101", TEAM_HP: "010-1111-2222", MAKE_DATE: "20221219", PT_PERSON: "홍길동", RESIDENCE_GBN: "2", DC_STATUS: "미확정", DC_REASON: "", STATUS: "Y", USE_YN: "1"},
			{FAC_USE_TIME:"09:00", FAC_CATE:"축구장", FAC_PLACE:"공설운동장A", CHANGE_GBN:"연기", CHANGE_DT:"2023-01-01", STATUS_GBN:"신청등록", ID: 7, TEME_CD: 7, TEAM_NAME: "팀07", TEAM_GBN: "10", MEM_NO: "00001101", TEAM_HP: "010-1111-2222", MAKE_DATE: "20221219", PT_PERSON: "홍길동", RESIDENCE_GBN: "2", DC_STATUS: "확정", DC_REASON: "관내거주자포함", STATUS: "Y", USE_YN: "1"},
			{FAC_USE_TIME:"14:00", FAC_CATE:"수영장", FAC_PLACE:"1LANE", CHANGE_GBN:"환불", CHANGE_DT:"", STATUS_GBN:"신청등록", ID: 8, TEME_CD: 8, TEAM_NAME: "팀08", TEAM_GBN: "10", MEM_NO: "00001101", TEAM_HP: "010-1111-2222", MAKE_DATE: "20221219", PT_PERSON: "홍길동", RESIDENCE_GBN: "2", DC_STATUS: "확정", DC_REASON: "관내거주자포함", STATUS: "Y", USE_YN: "1"},
			{FAC_USE_TIME:"14:00", FAC_CATE:"헬스장", FAC_PLACE:"2LANE", CHANGE_GBN:"연기", CHANGE_DT:"2023-01-20", STATUS_GBN:"신청등록", ID: 9, TEME_CD: 9, TEAM_NAME: "팀09", TEAM_GBN: "10", MEM_NO: "00001101", TEAM_HP: "010-1111-2222", MAKE_DATE: "20221219", PT_PERSON: "홍길동", RESIDENCE_GBN: "2", DC_STATUS: "미확정", DC_REASON: "", STATUS: "Y", USE_YN: "1"},
			{FAC_USE_TIME:"14:00", FAC_CATE:"축구장", FAC_PLACE:"헬스PT1실", CHANGE_GBN:"환불", CHANGE_DT:"", STATUS_GBN:"신청등록", ID: 10, TEME_CD: 10, TEAM_NAME: "팀10", TEAM_GBN: "20", MEM_NO: "00001101", TEAM_HP: "010-1111-2222", MAKE_DATE: "20221219", PT_PERSON: "홍길동", RESIDENCE_GBN: "1", DC_STATUS: "미확정", DC_REASON: "", STATUS: "N", USE_YN: "1"},
			{FAC_USE_TIME:"14:00", FAC_CATE:"수영장", FAC_PLACE:"세미나실101호", CHANGE_GBN:"환불", CHANGE_DT:"", STATUS_GBN:"신청등록", ID: 11, TEME_CD: 11, TEAM_NAME: "팀11", TEAM_GBN: "20", MEM_NO: "00001101", TEAM_HP: "010-1111-2222", MAKE_DATE: "20221219", PT_PERSON: "홍길동", RESIDENCE_GBN: "1", DC_STATUS: "확정", DC_REASON: "관내거주자포함", STATUS: "N", USE_YN: "1"},
			{FAC_USE_TIME:"14:00", FAC_CATE:"헬스장", FAC_PLACE:"공설운동장B", CHANGE_GBN:"환불", CHANGE_DT:"", STATUS_GBN:"신청등록", ID: 12, TEME_CD: 12, TEAM_NAME: "팀12", TEAM_GBN: "20", MEM_NO: "00001101", TEAM_HP: "010-1111-2222", MAKE_DATE: "20221219", PT_PERSON: "홍길동", RESIDENCE_GBN: "1", DC_STATUS: "확정", DC_REASON: "관내거주자포함", STATUS: "N", USE_YN: "1"},
			{FAC_USE_TIME:"15:00", FAC_CATE:"축구장", FAC_PLACE:"공설운동장A", CHANGE_GBN:"환불", CHANGE_DT:"", STATUS_GBN:"신청등록", ID: 13, TEME_CD: 13, TEAM_NAME: "팀13", TEAM_GBN: "10", MEM_NO: "00001101", TEAM_HP: "010-1111-2222", MAKE_DATE: "20221219", PT_PERSON: "홍길동", RESIDENCE_GBN: "1", DC_STATUS: "확정", DC_REASON: "관내거주자포함", STATUS: "N", USE_YN: "1"},
			{FAC_USE_TIME:"16:00", FAC_CATE:"축구장", FAC_PLACE:"1LANE", CHANGE_GBN:"환불", CHANGE_DT:"", STATUS_GBN:"신청등록", ID: 14, TEME_CD: 14, TEAM_NAME: "팀14", TEAM_GBN: "20", MEM_NO: "00001101", TEAM_HP: "010-1111-2222", MAKE_DATE: "20221219", PT_PERSON: "홍길동", RESIDENCE_GBN: "2", DC_STATUS: "미확정", DC_REASON: "", STATUS: "N", USE_YN: "1"},
			{FAC_USE_TIME:"16:00", FAC_CATE:"수영장", FAC_PLACE:"2LANE", CHANGE_GBN:"환불", CHANGE_DT:"", STATUS_GBN:"신청등록", ID: 15, TEME_CD: 15, TEAM_NAME: "팀15", TEAM_GBN: "20", MEM_NO: "00001101", TEAM_HP: "010-1111-2222", MAKE_DATE: "20221219", PT_PERSON: "홍길동", RESIDENCE_GBN: "2", DC_STATUS: "확정", DC_REASON: "관내거주자포함", STATUS: "N", USE_YN: "1"},
			{FAC_USE_TIME:"16:00", FAC_CATE:"헬스장", FAC_PLACE:"헬스PT1실", CHANGE_GBN:"환불", CHANGE_DT:"", STATUS_GBN:"승인완료", ID: 16, TEME_CD: 16, TEAM_NAME: "팀16", TEAM_GBN: "20", MEM_NO: "00001101", TEAM_HP: "010-1111-2222", MAKE_DATE: "20221219", PT_PERSON: "홍길동", RESIDENCE_GBN: "2", DC_STATUS: "미확정", DC_REASON: "", STATUS: "N", USE_YN: "1"},
		]			
	});

	$(document).ready(function () {
		let columnList = [
			{dataField: "TEAM_CD", caption: "단체명", alignment: "center",  visible: false}, 
			{dataField: "TEAM_NAME", width: 150, caption: "단체명", alignment: "center"}, 
			{dataField: "MEM_NO", width: 80, caption: "대표회원번호", alignment: "center"},
			{dataField: "PT_PERSON", width: 90, caption: "회원명"},
			{dataField: "TEAM_HP", width: 120, caption: "연락처"},
			{dataField: "FAC_CATE", width: 120, caption: "단체(팀)분류",  alignment: "center"},
			{dataField: "MAKE_DATE", width: 100, caption: "변경신청일", alignment: "center"},
			{dataField: "CHANGE_GBN", width: 90, caption: "변경요청구분", alignment: "center"},
			{dataField: "CHANGE_DT", width: 100, caption: "연기일자", alignment: "center"},
			{dataField: "STATUS1", caption: "변경요청내역", alignment: "center"},
			{dataField: "STATUS2", caption: "처리완료내역", alignment: "center"},
			{dataField: "MAKE_DATE", width: 100, caption: "허가일시", alignment: "center"},
			{dataField: "MAKE_DATE", width: 100, caption: "대관일", alignment: "center"},
			{dataField: "FAC_PLACE", width: 120, caption: "대관장소", alignment: "center"},
			{dataField: "FAC_USE_TIME", width: 100, caption: "이용시간", alignment: "center"},
			{dataField: "TEAM_GBN", width: 90, caption: "납부금액", alignment: "center"},
			{dataField: "STATUS_GBN", width: 90, caption: "요청상태", alignment: "center"}
		];
	
		//Search Form
		$("#cancelSearch").dxForm({
			showColonAfterLabel: false,
		    colCount: 4,
		    items: [
		    	{dataField: 'APP_START_DT', label: {text: '신청일자',}, editorType:"dxDateBox",
		    		editorOptions: {
		    	  		displayFormat: 'yyyy-MM-dd',
		    		},
		    	},
		    	{dataField: 'APP_END_DT', label: {text: '~',}, editorType:"dxDateBox",
		    		editorOptions: {
		    	  		displayFormat: 'yyyy-MM-dd',
		    		},
		    	},		    	
	    		{dataField: "CHANGE_GBN", editorType: "dxSelectBox", label: {visible:false}, editorOptions: {
    					dataSource: [
    						{text: "변경요청구분(전체)", value: ""},
    						{text: "환불", value: "1"},
    						{text: "연기", value: "2"},
    					], valueExpr: "value", displayExpr: "text", value: "",
    				}
    			},
	    		{dataField: "STATUS_GBN", editorType: "dxSelectBox", label: {visible:false}, editorOptions: {
    					dataSource: [
    						{text: "요청상태구분(전체)", value: ""},
    						{text: "신청등록", value: "1"},
    						{text: "신청취소", value: "2"},   	
    						{text: "승인완료", value: "3"},
    						{text: "승인거부", value: "4"},     						
    					], valueExpr: "value", displayExpr: "text", value: "",
    				}
    			},    			
		    ]
		});
		
		//검색버튼
		$("#searchBtn").dxButton({
			stylingMode: "contained",
			icon: "find",
			type: "default",
			onClick() {
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
				$("#cancelSearch").dxForm("instance").resetValues();
			},
		});
		
		//Main Grid
		var gridFacilityTeam = $("#gridList").dxDataGrid({
			dataSource: resultList,
			columns: columnList,
			allowColumnReordering: true,
			allowColumnResizing: true,
			showBorders: true,
			showRowLines: true,
			paging: {pageSize: 20},
			columnChooser: {enabled: true},
	        focusedRowEnabled: true,
			scrolling: {
				rowRenderingMode: 'virtual',
			},
		    export: {
		        enabled: true,
		    },
		    onToolbarPreparing(e) {
				const dataGrid = e.component;
				e.toolbarOptions.items.push({
					 location: 'before',
					 widget: 'dxButton',
					 options: {
						 	text: '환불정산',
						 	type: 'default',
						 	onClick() {
						 		createFacilityCancelPopup("#userPopup", "#userPopup2");
						 	},
					 },
				});
			},		    
		    focusedRowIndex: 0,
		}).dxDataGrid("instance");
		
		$('#cancelDetail').dxForm({
		    colCount: 4,
		    showColonAfterLabel: false,
		    items: [{
					colCount: 2,
					itemType: 'group',
				    items: [
				    	{dataField: 'FAC_NAME', label: {text: '단체명'},},
				    	{dataField: 'FAC_NAME', label: {text: '연락처'},},
				    	{dataField: 'FAC_NAME', label: {text: '변경요청구분'},},
				    	{dataField: 'FAC_NAME', label: {text: '연기일자'},},
				    ],
				}, {
					colCount: 1,
					itemType: 'group',
				    items: [
				    	{dataField: 'FAC_NAME', label: {text: '변경요청내역'}, editorType: 'dxTextArea', editorOptions: {height: 78}},
				    ],
				}, {
					colCount: 1,
					itemType: 'group',
				    items: [
				    	{dataField: 'FAC_NAME', label: {text: '처리완료내역'}, editorType: 'dxTextArea', editorOptions: {height: 78}},
				    ],
				}, {
					colCount: 2,
					itemType: 'group',
				    items: [
				    	{dataField: 'FAC_NAME', label: {text: '환불은행'},},
				    	{dataField: 'FAC_NAME', label: {text: '예금주'},},
				    	{colSpan:2, dataField: 'FAC_NAME', label: {text: '환불계좌'},},
				    ],
				},
		    ],
	        alignItemLabels: true,
	        readOnly:true,   
		}); 
		
	});
	

</script>

<div id="userPopup"></div>
<div id="userPopup2"></div>
<!-- MainTitle -->
<div class="row row_title">
	<div class="col-12">
		<ul class="navbar-nav">
 			<li class="nav-item d-sm-inline-block quick-nav">
		        예약환불요청관리
		    </li>
		</ul>	
	</div>
</div>

<div class="row">
	<!--  Search Form -->
	<div class="col-12">
		<div class="card" style="background: #F2F2F2; _box-shadow: none;">
			<div class="card-body row">
				<div class="form-group normal_condition" id="cancelSearch"></div>
				<div class="form-group buttons" >
					<div class="btn-group" id="searchBtn"></div>
					<div class="btn-group btnRefresh" id="searchInitBtn"></div>
				</div>
			</div>
		</div>
	</div>
	
	<!-- Data Grid -->
	<div class="col-12">
		<div class="card" style="background: #F2F2F2;box-shadow: none;">
			<div class="card-body">
				<div id="gridList"></div>				
			</div>
 			<div class="card-body">	
				<div class="row">
					<div class="col-12">
						<div id="cancelDetail"></div>				
					</div>
				</div>																																											
			</div>									
		</div>
	</div>
</div>
