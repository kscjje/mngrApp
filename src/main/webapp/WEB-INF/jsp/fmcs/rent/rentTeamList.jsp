<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<script>window.jQuery || document.write(decodeURIComponent('%3Cscript src="js/jquery.min.js"%3E%3C/script%3E'))</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.4.0/polyfill.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/exceljs/4.1.1/exceljs.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.2/FileSaver.min.js"></script>
<link rel="stylesheet" href="/fmcs/css/fmcs_style3.css">

<style>
	//.dx-header-row td{ height: 50px; }
	
	.form-button { height: 0; z-index: 9999; }
	.form-text-span .dx-texteditor-input { width: 60px; }
	.form-input95 { width: 95px; }
	.form-input110 { width: 110px; }
	.form-input120 { width: 120px; }
	.form-input140 { width: 140px; }
	.form-input180 { width: 180px; }
	
	.dx-htmleditor-content { background-color: #fff; }
	
	.labelflex { flex-direction: column; }
	
	.add_btn .dx-icon-plus { width: 10px; height: 6px; font-size: 10px; line-height: 6px; }
	
	.hs-accessory-multieditor-column { display: flex; justify-content: space-around; }
}
</style>

<script src="/fmcs/js/default_data.js"></script>
<script src="/backOffice/ckeditor/ckeditor.js"></script>
<script src="/fmcs/js/rent/rent_team.js"></script>
<script src="/fmcs/js/member/popup/member_address.js?ver=1"></script>
<script src="/fmcs/js/member/popup/member_search.js?ver=1"></script>
<script src="/fmcs/js/member/member_data.js?ver=1"></script>

<script>
	var columnList = null;
	var gridFacilityTeam = null;
	var editmode="new";
	
	var selectTabId = "";
	let teamCd = "";
	let subMenuList = null;
	let selectedRowIndex = -1;
	
	let teamDiscountPopupForm = null;
	let teamDiscountChoiceForm = null;
	
	const nowDate = new Date();

	
	let facilityTeam_gbn = [
		{text: "축구팀", value: "10"}, 
		{text: "야구팀", value: "20"}, 
		{text: "족구팀", value: "30"}
	];
	
	const residence_gbn = [
		{text: "관내거주", value: "1"}, 
		{text: "관외거주", value: "2"}
	];
	
	const status_gbn = [
		{text: "대기", value: "N"}, 
		{text: "승인", value: "Y"}
	];
	

	const comcd_gbn = [
		{text: "정관아쿠아드림파크", value: "COMCD1"},
		{text: "기장군국민체육센터", value: "COMCD2"},
		{text: "기장생활체육센터", value: "COMCD3"}
	];
	
	const member_list = [
		{text: "홍길동", value: "00000001"},
		{text: "에이", value: "00000002"},
		{text: "비", value: "00000003"},
		{text: "씨", value: "00000004"},
		{text: "디", value: "00000005"}
	];
	
	const submit_gbn = [
		{text: "미제출", value: "N"},
		{text: "제출", value: "Y"}
	];


	let resultList = new DevExpress.data.ArrayStore({
		key: "RENT_TEAMID",
		data: mainListData()
	});

	$(document).ready(function () {
		
		mainListColumn();
	
		//Search Form
		$("#facilityTeamSearch").dxForm({
			showColonAfterLabel: false,
		    labelMode:'hidden',
		    colCount: 4,
		    items: [
		    	{itemType: "group", 
			    	items: [
			    		{dataField: "RESIDENCE_GBN", editorType: "dxSelectBox", editorOptions: {
			    			dataSource: residence_gbn, layout: "horizontal", valueExpr: "value", displayExpr: "text", placeholder: "관내구분선택(전체)"
			    			}
			    		}
			    	]
		    	},
		    	{itemType: "group",
		    		items: [
			    		{dataField: "RENT_TEAM_GBN", editorType: "dxSelectBox", label:{text:"dd"}, editorOptions: {
			    			dataSource: facilityTeam_gbn, layout: "horizontal", valueExpr: "value", displayExpr: "text", placeholder: "단체팀분류선택(전체)"
			    			} 
			    		}
			    	]
		    	},
		    	{colSpan: 2, itemType: "group", colCount: 3,
		    		items: [
			    		{dataField: "SEARCH_COLUMN", editorType: "dxSelectBox", editorOptions: {
			    			dataSource: [
			    					{text: "단체명", value: "RENT_TEAM_NAME"},
			    					{text: "대표자명", value: "MEM_NAME"}
			    				],
			    				width: 150, layout: "horizontal", valueExpr: "value", displayExpr: "text", placeholder: "검색항목"
			    			}
		    			},
		    			{colSpan: 2, dataField: "SEARCH_KEYWORD", value: ""}
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
				if($("input[name='SEARCH_COLUMN']").val() == ""){
					msg = "키워드 제외 검색";
				}
				else {
					msg = $("input[name='SEARCH_COLUMN']").val() +" = "+ $("input[name='SEARCH_KEYWORD']").val() +" 검색 ";
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
				$("#facilityTeamSearch").dxForm("instance").resetValues();
			},
		});
		
		//Main Grid
		gridFacilityTeam = $("#gridList").dxDataGrid({
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
	                if(column.dataField == 'STATUS'){
	                    column.allowEditing = true;
	                }else{
	                	column.allowEditing = false;
	                }
	            })
	        },
	        focusedRowEnabled: true,
	        onFocusedRowChanged(e) {
	        	const focusedRowKey = e.component.option('focusedRowKey');
			    selectedRowIndex = e.rowIndex;

	        	teamCd = e.row.data.RENT_TEAMID;

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
			 	selectTextOnEditStart: true,
				// startEditAction: 'click',
			 	popup: {
					title: "대관팀관리",
					showTitle: true,
					width: 1200,
				  	height:700,
				 	onShown:function(){
				  	}
				},
				form: {
					showColonAfterLabel: false,
					elementAttr: {
				         id: "editForm",
				   	},
					customizeItem: teamCustomizeItem,
					items: createTeamDetailForm(),
					onInitialized: function(e) {
						frmPopup  = e.component;
					},
					onContentReady: function(e){

						
					},
					colCount: 1,
				},
			},
			onRowDblClick: function (e) {
				updateFacilityTeam();
			},
			onInitNewRow: function(e){
				if(gridFacilityTeam.option("editing.mode")=="popup"){
					gridFacilityTeam.option("editing.popup.title", "대관팀등록");
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
				if(gridFacilityTeam.option("editing.mode")=="popup"){
					gridFacilityTeam.option("editing.popup.title", "대관팀수정");
				}
			},
			onRowPrepared(e){
			},
			onRowUpdated(e) {
		          //  alert('RowUpdated');
			},
			onEditCanceled() {
				gridFacilityTeam.option("editing.mode", "cell");
			},
			onSaved() {
				gridFacilityTeam.option("editing.mode", "cell");
			},
		    export: {
		        enabled: true,
		    },
		    onExporting(e) {
		    	exportFacilityTeam();
		    	e.cancel = true;
		    },
		    focusedRowIndex: 0,
		}).dxDataGrid("instance");
		
		initTabList("");
	});
	
	//Main Column
	function mainListColumn() {
		columnList = [
			{dataField: "RENT_TEAMID", width: 150, caption: "단체명", alignment: "center",  visible: false}, 
			{dataField: "RENT_TEAM_NAME", width: 150, caption: "단체명", alignment: "center"}, 
			{dataField: "RENT_TEAM_GBN", width: 150, caption: "단체(팀)분류",  alignment: "center", lookup: {dataSource: facilityTeam_gbn, displayExpr: "text", valueExpr: "value"}},
			{dataField: "MEM_NO", width: 80, caption: "대표회원번호", alignment: "center"},
			{dataField: "RENT_TEAM_HP", width: 200, caption: "연락처"},
			{dataField: "MAKE_DATE", width: 160, caption: "창단일", dataType: 'date'},
			{dataField: "PT_PERSON", width: 160, caption: "신청자명"},
			{dataField: "RESIDENCE_GBN", width: 120, caption: "관내구분" , lookup: {dataSource: residence_gbn, displayExpr: "text", valueExpr: "value"}},
			{dataField: "DC_STATUS", width: 120, caption: "감면확정여부"},
			{dataField: "DC_REASON", caption: "감면사유", alignment: "center"},
			{dataField: "STATUS", width: 150, caption: "처리상태", showEditorAlways: true, alignment: "center", lookup: {dataSource: status_gbn, displayExpr: "text", valueExpr: "value"}},
			{dataField: "RENT_RSPOSBL_CTG", visible: false}
		];
	}
	
	function mainListData() {
		var dataList = "";
		
		dataList = [
			{RENT_TEAMID: 1, RENT_TEAM_NAME: "팀01", RENT_TEAM_GBN: "10", MEM_NO: "00001101", RENT_TEAM_HP: "010-1111-2222", MAKE_DATE: "20221219", PT_PERSON: "홍길동", RESIDENCE_GBN: "1", DC_STATUS: "미확정", DC_REASON: "", STATUS: "Y", USE_YN: "1", RENT_RSPOSBL_CTG: ["1","2","3"]},
			{RENT_TEAMID: 2, RENT_TEAM_NAME: "팀02", RENT_TEAM_GBN: "10", MEM_NO: "00001101", RENT_TEAM_HP: "010-1111-2222", MAKE_DATE: "20221219", PT_PERSON: "홍길동", RESIDENCE_GBN: "1", DC_STATUS: "미확정", DC_REASON: "", STATUS: "Y", USE_YN: "1", RENT_RSPOSBL_CTG: ["1","2"]},
			{RENT_TEAMID: 3, RENT_TEAM_NAME: "팀03", RENT_TEAM_GBN: "10", MEM_NO: "00001101", RENT_TEAM_HP: "010-1111-2222", MAKE_DATE: "20221219", PT_PERSON: "홍길동", RESIDENCE_GBN: "1", DC_STATUS: "미확정", DC_REASON: "", STATUS: "Y", USE_YN: "1", RENT_RSPOSBL_CTG: null},
			{RENT_TEAMID: 4, RENT_TEAM_NAME: "팀04", RENT_TEAM_GBN: "10", MEM_NO: "00001101", RENT_TEAM_HP: "010-1111-2222", MAKE_DATE: "20221219", PT_PERSON: "홍길동", RESIDENCE_GBN: "1", DC_STATUS: "확정", DC_REASON: "관내거주자포함", STATUS: "Y", USE_YN: "1", RENT_RSPOSBL_CTG: ["1","2","3"]},
			{RENT_TEAMID: 5, RENT_TEAM_NAME: "팀05", RENT_TEAM_GBN: "20", MEM_NO: "00001101", RENT_TEAM_HP: "010-1111-2222", MAKE_DATE: "20221219", PT_PERSON: "홍길동", RESIDENCE_GBN: "1", DC_STATUS: "미확정", DC_REASON: "", STATUS: "Y", USE_YN: "1", RENT_RSPOSBL_CTG: ["1","2","3"]},
			{RENT_TEAMID: 6, RENT_TEAM_NAME: "팀06", RENT_TEAM_GBN: "10", MEM_NO: "00001101", RENT_TEAM_HP: "010-1111-2222", MAKE_DATE: "20221219", PT_PERSON: "홍길동", RESIDENCE_GBN: "2", DC_STATUS: "미확정", DC_REASON: "", STATUS: "Y", USE_YN: "1", RENT_RSPOSBL_CTG: ["1","2","3"]},
			{RENT_TEAMID: 7, RENT_TEAM_NAME: "팀07", RENT_TEAM_GBN: "10", MEM_NO: "00001101", RENT_TEAM_HP: "010-1111-2222", MAKE_DATE: "20221219", PT_PERSON: "홍길동", RESIDENCE_GBN: "2", DC_STATUS: "확정", DC_REASON: "관내거주자포함", STATUS: "Y", USE_YN: "1", RENT_RSPOSBL_CTG: null},
			{RENT_TEAMID: 8, RENT_TEAM_NAME: "팀08", RENT_TEAM_GBN: "10", MEM_NO: "00001101", RENT_TEAM_HP: "010-1111-2222", MAKE_DATE: "20221219", PT_PERSON: "홍길동", RESIDENCE_GBN: "2", DC_STATUS: "확정", DC_REASON: "관내거주자포함", STATUS: "Y", USE_YN: "1", RENT_RSPOSBL_CTG: null},
			{RENT_TEAMID: 9, RENT_TEAM_NAME: "팀09", RENT_TEAM_GBN: "10", MEM_NO: "00001101", RENT_TEAM_HP: "010-1111-2222", MAKE_DATE: "20221219", PT_PERSON: "홍길동", RESIDENCE_GBN: "2", DC_STATUS: "미확정", DC_REASON: "", STATUS: "Y", USE_YN: "1", RENT_RSPOSBL_CTG: null},
			{RENT_TEAMID: 10, RENT_TEAM_NAME: "팀10", RENT_TEAM_GBN: "20", MEM_NO: "00001101", RENT_TEAM_HP: "010-1111-2222", MAKE_DATE: "20221219", PT_PERSON: "홍길동", RESIDENCE_GBN: "1", DC_STATUS: "미확정", DC_REASON: "", STATUS: "N", USE_YN: "1", RENT_RSPOSBL_CTG: null},
			{RENT_TEAMID: 11, RENT_TEAM_NAME: "팀11", RENT_TEAM_GBN: "20", MEM_NO: "00001101", RENT_TEAM_HP: "010-1111-2222", MAKE_DATE: "20221219", PT_PERSON: "홍길동", RESIDENCE_GBN: "1", DC_STATUS: "확정", DC_REASON: "관내거주자포함", STATUS: "N", USE_YN: "1", RENT_RSPOSBL_CTG: null},
			{RENT_TEAMID: 12, RENT_TEAM_NAME: "팀12", RENT_TEAM_GBN: "20", MEM_NO: "00001101", RENT_TEAM_HP: "010-1111-2222", MAKE_DATE: "20221219", PT_PERSON: "홍길동", RESIDENCE_GBN: "1", DC_STATUS: "확정", DC_REASON: "관내거주자포함", STATUS: "N", USE_YN: "1", RENT_RSPOSBL_CTG: null},
			{RENT_TEAMID: 13, RENT_TEAM_NAME: "팀13", RENT_TEAM_GBN: "10", MEM_NO: "00001101", RENT_TEAM_HP: "010-1111-2222", MAKE_DATE: "20221219", PT_PERSON: "홍길동", RESIDENCE_GBN: "1", DC_STATUS: "확정", DC_REASON: "관내거주자포함", STATUS: "N", USE_YN: "1", RENT_RSPOSBL_CTG: null},
			{RENT_TEAMID: 14, RENT_TEAM_NAME: "팀14", RENT_TEAM_GBN: "20", MEM_NO: "00001101", RENT_TEAM_HP: "010-1111-2222", MAKE_DATE: "20221219", PT_PERSON: "홍길동", RESIDENCE_GBN: "2", DC_STATUS: "미확정", DC_REASON: "", STATUS: "N", USE_YN: "1", RENT_RSPOSBL_CTG: null},
			{RENT_TEAMID: 15, RENT_TEAM_NAME: "팀15", RENT_TEAM_GBN: "20", MEM_NO: "00001101", RENT_TEAM_HP: "010-1111-2222", MAKE_DATE: "20221219", PT_PERSON: "홍길동", RESIDENCE_GBN: "2", DC_STATUS: "확정", DC_REASON: "관내거주자포함", STATUS: "N", USE_YN: "1", RENT_RSPOSBL_CTG: null},
			{RENT_TEAMID: 16, RENT_TEAM_NAME: "팀16", RENT_TEAM_GBN: "20", MEM_NO: "00001101", RENT_TEAM_HP: "010-1111-2222", MAKE_DATE: "20221219", PT_PERSON: "홍길동", RESIDENCE_GBN: "2", DC_STATUS: "미확정", DC_REASON: "", STATUS: "N", USE_YN: "1", RENT_RSPOSBL_CTG: null},
		];
		
		return dataList;
	}
	
	//신규 버튼
	function createFacilityTeam(){
		
		gridFacilityTeam.option("editing.mode", "popup");
		setAllowEditing("#gridList",true,[]);
		
		gridFacilityTeam.addRow();
		gridFacilityTeam.deselectAll();
	}
	//수정 버튼
	function updateFacilityTeam(){
		if (selectedRowIndex==-1) {
			DevExpress.ui.notify("수정할 리스트를 선택하세요."); 
			return;
		}
		
		gridFacilityTeam.option("editing.mode", "popup");
		editmode='update';
		setAllowEditing("#gridList",true,[]);
		gridFacilityTeam.editRow(selectedRowIndex);
		gridFacilityTeam.deselectAll();
	}
	//삭제 버튼
	function deleteFacilityTeam(){
		
		
		if(selectedRowIndex==-1) return;
		editmode='delete';
		if(gridFacilityTeam.getSelectedRowKeys().length ==0){
			gridFacilityTeam.deleteRow(selectedRowIndex);
			gridFacilityTeam.deselectAll();
			return;
		}
		
		if(confirm(gridFacilityTeam.getSelectedRowKeys().length+'건을 삭제하시겠습니까?')){
		     gridFacilityTeam.refresh();
		}
	}
	//엑셀버튼
	function exportFacilityTeam() {
	    const dataGrid1 = $('#gridList').dxDataGrid('instance');
	
	    const workbook = new ExcelJS.Workbook();
	    const worksheet = workbook.addWorksheet('Main sheet');
	
	    DevExpress.excelExporter.exportDataGrid({
	        worksheet: worksheet,
	        component: dataGrid1
	    }).then(function() {
	        workbook.xlsx.writeBuffer().then(function(buffer) {
	            saveAs(new Blob([buffer], {
	                type: 'application/octet-stream'
	            }), 'DataGrid.xlsx');
	        });
	    });
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
	
	function teamCustomizeItem(item){
		let editRowKey = gridFacilityTeam.option('editing.editRowKey');
	   	let index = gridFacilityTeam.getRowIndexByKey(editRowKey);
	   	index = index === -1 ? 0 : index;
	}
	
	//대관장소 등록 팝업 FORM
	function createTeamDetailForm() {
		var teamDetailItems = "";
		
		teamDetailItems = [
			{name: "basics", itemType: "group", colCount: 6, caption: "팀 기본정보", items: [
				{colSpan: 2, dataField: "COMCD", label: {text: "센터"}, editorType: "dxSelectBox", 
					editorOptions: {dataSource: comcd_gbn,
						layout: "horizontal", valueExpr: "value", displayExpr: "text", value: "0"
					}
				},
				{colSpan: 2, dataField: "RENT_TEAM_NAME", label: {text: "단체명"}},
				{colSpan: 2, dataField: "RENT_TEAM_GBN", label: {text: "단체(팀)분류"}, editorType: "dxSelectBox",
					editorOptions: {dataSource: facilityTeam_gbn, 
						layout: "horizontal", valueExpr: "value", displayExpr: "text",
						onInitialized: function (e) {
							if($("#gridList").dxDataGrid("instance").getSelectedRowsData()[0] != undefined)
								e.component.option("value", $("#gridList").dxDataGrid("instance").getSelectedRowsData()[0].RENT_TEAM_GBN);
							else
								e.component.option("value", e.component.option("dataSource")[0].value);
							
						}
					}
				}
			]},
			{itemType: "group", colCount: 6, caption: "대표자 선택", items: [
				{colSpan: 2, dataField: "MEM_NAME", label: {text: "대표자이름"}, 
					editorOptions: {
						readOnly: true,
						buttons: [{
							name: 'member_search',
							location: 'after',
							options: {
								text: '검색',
								type: 'default',
								disabled: false,
								onClick() {
									createUserSearchPopup("#userPopup", null, setUserFormData);
								},
							},
						}],
					},
					validationRules: [{type: "required",message: "대표자 필수 입력"}]
				},
				{colSpan: 2, dataField: "MEM_NO", label: {text: "회원번호"}, editorOptions: { readOnly: true }},
				{colSpan: 2, dataField: "ID", label: {text: "회원아이디"}, editorOptions: { readOnly: true } },
				{colSpan: 2, dataField: "RENT_TEAM_TEL", label: {text: "전화번호"}},
				{colSpan: 4, dataField: "RENT_TEAM_HP", label: {text: "휴대폰번호"}}
			]},
			{itemType: "group", colCount: 6, caption: "단체팀 상세정보", items: [
				{colSpan: 2, dataField: "MAKE_DATE", label: {text: "창단일자"}, editorType:"dxDateBox",
					editorOptions: {
						onInitialized: function (e) {
							if($("#gridList").dxDataGrid("instance").getSelectedRowsData()[0] != undefined)
								e.component.option("value", $("#gridList").dxDataGrid("instance").getSelectedRowsData()[0].MAKE_DATE);
							else
								e.component.option("value", nowDate);
						}}	
				},
				{colSpan: 4, dataField: "LEAQUE", label: {text: "소속연합회"} },
				{colSpan: 2, dataField: "RESIDENCE_GBN", label: {text: "관내구분"}, editorType: "dxSelectBox",
					editorOptions: {dataSource: residence_gbn, 
						layout: "horizontal", valueExpr: "value", displayExpr: "text", value: "FT001"
					}	
				},
				{colSpan: 2, dataField: "WHTHRC_NMPR", label: {text: "관내자인원"}, editorType:"dxNumberBox"	},
				{colSpan: 2, dataField: "EXTRL_NMPR", label: {text: "관외자인원"}, editorType:"dxNumberBox"	},
				{colSpan: 2, dataField: "REFUND_BANK", label: {text: "환불 은행명"}},
				{colSpan: 2, dataField: "REFUND_NAME", label: {text: "예금주"}},
				{colSpan: 2, dataField: "REFUND_ACCOUNT", label: {text: "계좌번호"}},
				{colSpan: 6, dataField: "ACTION_FIXED", label: {text: "정기 활동상황"}},
				{colSpan: 6, dataField: "ACTION_TIME", label: {text: "수기 활동상황"}},
				{colSpan: 6, dataField: "HISTORY", label: {text: "주요경력"}, editorType:"dxTextArea"  },
				{colSpan: 2, itemType: "group", colCount:1, 
					items: [

						{ dataField: "DOC_RULE", label: {text: "회칙 제출여부"} , editorType: "dxSelectBox",
							editorOptions: {dataSource: submit_gbn, 
								layout: "horizontal", valueExpr: "value", displayExpr: "text", value: "N"
							}		
						},
						{dataField: "DOC_LIST", label: {text: "회원명부 제출여부"} , editorType: "dxSelectBox",
							editorOptions: {dataSource: submit_gbn, 
								layout: "horizontal", valueExpr: "value", displayExpr: "text", value: "N"
							}		
						},
						{dataField: "DOC_PLEDGE", label: {text: "이용자서약 제출여부"} , editorType: "dxSelectBox",
							editorOptions: {dataSource: submit_gbn, 
								layout: "horizontal", valueExpr: "value", displayExpr: "text", value: "N"
							}		
						},
						{dataField: "DOC_JUMIN", label: {text: "관내등본 제출여부"} , editorType: "dxSelectBox",
							editorOptions: {dataSource: submit_gbn, 
								layout: "horizontal", valueExpr: "value", displayExpr: "text", value: "N"
							}		
						},
						{dataField: "DOC_COMPANY", label: {text: "사업자등록증 제출여부"} , editorType: "dxSelectBox",
							editorOptions: {dataSource: submit_gbn, 
								layout: "horizontal", valueExpr: "value", displayExpr: "text", value: "N"
							}		
						}
					]
				},
				{colSpan: 4, dataField: "DC_LIST", 
					label: {template: (data, element) => {
							element.append("<div><span class='dx-field-item-label-text'>감면정보</span></div>");
							$("<div>").dxButton({
								text: "감면확정",
								type: "default",
								onClick(data, element) {
									teamDiscountPopup()
								}
							}).appendTo(element);
						}
					},
					itemType: "group", colCount: 1, items: [
						{template: function (data, itemElement) { gridFeeTemplateCreate(data, itemElement); } }
					]
				}
				/*
				{colSpan: 4, dataField: "DC_LIST", label: {text: "감면정보"}, itemType: "group", colCount:1, 
					items: [
						{template: function (data, itemElement) {gridFeeTemplateCreate(data, itemElement);}},
					]
				}
				*/
			]},
			{itemType: "group", colCount: 2, caption: "신청가능 대관시설분류", items: [
				{dataField: "RENT_RSPOSBL_CTG_YN", label: {text: "운영설정"} , editorType: "dxSelectBox",
					editorOptions: {dataSource: set_gbn, 
						layout: "horizontal", valueExpr: "value", displayExpr: "text",
						onInitialized: function (e) {
							if (gridFacilityTeam.cellValue(selectedRowIndex, "RENT_RSPOSBL_CTG")) {
								e.component.option("value", "1");
							}
							else {
								e.component.option("value", "0");
							}
						}
					}		
				},
				{ itemType: "empty" },
				
				{name: "facilitygbn", colSpan: 2, itemType: "group", dataField: "RENT_RSPOSBL_CTG", label: {visible: false},  alignment: "center", items: [
	    			{template: function (data, itemElement) { rentFcltyListTemplate(data, itemElement); } }
	    		]}
			]},
			{itemType: "group", colCount: 2, caption: "비고사항", items: [
				{colSpan: 2, dataField: "ETC", label: {visible: false}, editorType:"dxTextArea"  },
	    		
			]},
			{name: "basics", itemType: "group", colCount: 6, caption: "신청정보", items: [
				{colSpan: 3, dataField: "PT_PERSON", label: {text: "신청자"}},
				{colSpan: 3, dataField: "STATUS", label: {text: "처리상태"}, editorType: "dxSelectBox",
					editorOptions: {dataSource: status_gbn, 
						layout: "horizontal", valueExpr: "value", displayExpr: "text", 
						onInitialized: function (e) {
							if($("#gridList").dxDataGrid("instance").getSelectedRowsData()[0] != undefined)
								e.component.option("value", $("#gridList").dxDataGrid("instance").getSelectedRowsData()[0].STATUS);
							else
								e.component.option("value", e.component.option("dataSource")[0].value);
						}
					}
				}
			]},
			{ colCount: 6 , itemType: "empty" },
		];

		return teamDetailItems;
	}

	//Tab List
	function initTabList(tabId) {
		const longtabs = [
			{id: 1, text: '구성원 관리', content: '구성원 등록/수정'}
		];
		
		memberTab = $('#scrolledtabs > .tabs-container').dxTabs({
			dataSource: longtabs,
			width: 300,
			tabPanelOptions: {deferRendering: false},
			onContentReady(e) {
				if (tabId != "") selectTabList(tabId);
			},
			onItemClick(e) {
				//console.log(e.itemData.id +"//"+ placeCd);
				if (teamCd == "") {
					selectTabId = e.itemData.id;
					DevExpress.ui.notify("리스트를 선택하세요."); 
					return;
				}
				
				selectTabList(e.itemData.id);
			}
		}).dxTabs("instance")
		
		if (tabId != "") memberTab.selectItem(tabId - 1);
	}
	
	function selectTabList(tabId) {
		subMenuList = null;
		
		$("div[id^='tab']").each(function (){
			$(this).hide();
		});

		switch(tabId){
			case 1 :
				$('#tab1').show();
				initTeamMemberList();
				break;
			
		}
	}
	
	function  gridFeeTemplateCreate(data, itemElement) {
		itemElement.append( $("<div id='gridFee'>")
			.dxDataGrid({
				dataSource: teamDiscountResultDataList(),
				keyExpr: 'DISCOUNT_SEQ',
				showBorders: true,
				allowColumnResizing: true,
				focusedRowEnabled: true,
				focusedRowIndex: 0,
				paging: {
					enabled: false,
				},
				selection: {mode: 'multiple',showCheckBoxesMode:'always',},
		        columns:[
			        {dataField: 'DC_NAME', width:200, caption: '감면할인명', allowEditing: false},
					{dataField: 'DC_PRICE', caption: '할인율/금액', width:100,  dataType: "number", format: def_numberFormat, allowEditing: false},
					{dataField: 'DC_CONF_SDATE',caption: '감면시작일',  dataType: "date"},
					{dataField: 'DC_CONF_EDATE',caption: '감면종료일',  dataType: "date"},
// 					{dataField: 'DC_CHECKED',caption:'기간설정'},
				],
				editing: {
					mode: "cell",
					allowUpdating: true,
				},
		        hoverStateEnabled: true,
		        scrolling: { mode: 'virtual' },
		        height: 250,
		        selection: {mode: 'multiple',showCheckBoxesMode:'always',},
		        onSelectionChanged(selectedItems) {
		          /*const keys = selectedItems.selectedRowKeys;
		          e.component.option('value', keys);*/
		        },
		      }
			)
		);
	}
	
	function teamDiscountPopup() {
		if(teamDiscountPopupForm){
			teamDiscountPopupForm = null;
			$("#team_discount_Popup").dxPopup("dispose");
		}
		
		teamDiscountPopupForm = $("#team_discount_Popup").dxPopup({
			contentTemplate: function (e) {
				teamDiscountTemplate(e)
			},
			visible: true,
			title: "감면확정 항목선택",
			width: 600,
	        height: 700,
			position: { my: "center", at: "center", of: window },
			dragEnabled: true,
			toolbarItems: [{
				widget: "dxButton",
				toolbar: "bottom",
			    location: "after",
			    options: {
			    	text: "저장",
			        onClick() {
			    		DevExpress.ui.notify("감면확정");
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
			    		teamDiscountPopupForm.hide();
			    		teamDiscountPopupForm = null;
			    		$("#teamDiscount_Popup").dxPopup("dispose");
			    	}
			    }
			}]
		}).dxPopup("instance");
	}

	function teamDiscountTemplate(objPopup) {
		let teamDiscountContent = $("<div id='teamDiscountChoiceForm' />");
		
		teamDiscountChoiceForm = teamDiscountContent.dxForm({
			showColonAfterLabel: false,
		    formData: teamDiscountFormData(),
		    colCount: 2,
		    items: [
		    	{dataField: "RENT_TEAMID", label: {text: "대관팀명"}, visible: editmode == "update" ? true : false, editorType: "dxSelectBox",
		    		editorOptions: {dataSource: teamList(),
		    			disabled: true, layout: "horizontal", valueExpr: "value", displayExpr: "text", value: teamCd
		    		}
		    	},
		    	{ itemType: "empty", visible: editmode == "update" ? true : false },
		    	
		    	{colSpan: 2, itemType: "group", caption: "감면목록", items: [
		    		{dataField: "DC_REASON_CD", label: {visible: false}, cssClass: "hs-bg-white", editorType: "dxList",
		    			editorOptions: {
		    				dataSource: DISCOUNT_ITEMS,
		    				keyExpr: "DC_CD",
		    				displayExpr: "DC_NAME",
		    				height: 400,
							showSelectionControls: true,
							selectionAllMode: "allPages",
							selectionMode: "all",
							onSelectionChanged: function (e) {
							}
		    			}
		    		}
		    	]}
		    ],
		    onInitialized: function (e) {
		    	var customHandlerInit = function (e) {
					var orgData = e.component.option("formData");
					
					if (orgData.DC_REASON_CD) {
						var selectedItems = e.component.getEditor("DC_REASON_CD").option("dataSource").filter((items) => orgData.DC_REASON_CD.includes(items.DC_CD));
						e.component.getEditor("DC_REASON_CD").option("selectedItems", selectedItems);
					}
		    	}
		    	
		    	e.component.on("contentReady", customHandlerInit);
		    }
		}).dxForm("instance");
		
		objPopup.append(teamDiscountContent);
	}

	function teamDiscountFormData() {
		var formData = {};
		
		if (editmode == "update") {
			formData = {ID: 1, RENT_FCLTY_SEQ: "FG001", DC_REASON_CD: ["0002","0003","0004","0005"]}
		}
		
		return formData;
	}
	
	function teamDiscountResultDataList() {
		var dataList = "";
		
		if (editmode == "update") {
			dataList = [
				{DISCOUNT_SEQ: 1, DC_CONFYN: "1", DC_NAME: "경로할인", DC_TYPE: "0003", DC_TYPE_NAME: "연령", DC_CONF_SDATE: "2023-01-02", DC_CONF_EDATE: "2023-02-28", DC_AMT_TYPE: "0", DC_PRICE: 50},
				{DISCOUNT_SEQ: 2, DC_CONFYN: "1", DC_NAME: "국가유공자", DC_TYPE: "0002", DC_TYPE_NAME: "국가유공자", DC_CONF_SDATE: "2023-01-02", DC_CONF_EDATE: "2023-02-28", DC_AMT_TYPE: "1", DC_PRICE: 5000},
				{DISCOUNT_SEQ: 3, DC_CONFYN: "1", DC_NAME: "기초생활수급자", DC_TYPE: "0000", DC_TYPE_NAME: "기준없음", DC_CONF_SDATE: "2023-01-02", DC_CONF_EDATE: "2023-02-28", DC_AMT_TYPE: "0", DC_PRICE: 50},
				{DISCOUNT_SEQ: 4, DC_CONFYN: "0", DC_NAME: "관내거주", DC_TYPE: "0004", DC_TYPE_NAME: "거주지", DC_CONF_SDATE: "", DC_CONF_EDATE: "", DC_AMT_TYPE: "", DC_PRICE: null},
			]
		}
		
		return dataList;
	}
	
	function teamList() {
		dataList = "";
		
		dataList = [
			{value: 1, text: "팀01"},
			{value: 2, text: "팀02"},
			{value: 3, text: "팀03"}
		]
		
		return dataList;
	}
	
	function rentFcltyListTemplate(data, itemElement) {
		let $rentFcltyListContainer = document.createElement("div");
		let $rentFcltyList = null;
		var rentRsposblData = gridFacilityTeam.cellValue(selectedRowIndex, "RENT_RSPOSBL_CTG");
		var fcltyName = "";
		var fcltyText = "";
		for (i = 0; i < 5; i++) {
			switch(i) {
				case 0: fcltyName = "1"; fcltyText = "축구장"; break;
				case 1: fcltyName = "2"; fcltyText = "헬스장"; break;
				case 2: fcltyName = "3"; fcltyText = "수영장"; break;
				case 3: fcltyName = "4"; fcltyText = "테니스장"; break;
				case 4: fcltyName = "5"; fcltyText = "세미나실"; break;
			} 

			$rentFcltyList = $("<div>").dxCheckBox({
				width: "10%",
				name: fcltyName,
				text: fcltyText,
				value: (rentRsposblData) ? rentRsposblData.filter((data) => data == fcltyName).length > 0 : false
			});
			
			$($rentFcltyListContainer).append($rentFcltyList);
		}
		
		itemElement.append($rentFcltyListContainer);
	}

</script>

<div id="userPopup"></div>
<!-- MainTitle -->
<div class="row row_title">
	<div class="col-12">
		<ul class="navbar-nav">
 			<li class="nav-item d-sm-inline-block quick-nav">
		        대관 팀관리
		    </li>
			<li>
				<ul class="common-menu">
				    <li class="nav-item d-sm-inline-block quick-nav">
				        <a href="javascript:void(0);" onclick="createFacilityTeam();">신규
				        <img src="/fmcs/images/ico_new.png"></a>
				    </li>
				    <li class="nav-item d-sm-inline-block quick-nav">
				         <a href="javascript:void(0);" onclick="updateFacilityTeam();">수정 
				        <img src="/fmcs/images/ico_edit.png"></a>
				    </li>
				    <li class="nav-item d-sm-inline-block quick-nav">
				        <a href="javascript:void(0);" onclick="deleteFacilityTeam();">삭제
				        <img src="/fmcs/images/ico_delete.png"></a>
				    </li>
<!-- 				    <li class="nav-item d-sm-inline-block quick-nav"> -->
<!-- 				        <a href="javascript:void(0);" onclick="exportFacilityTeam();">엑셀 -->
<!-- 				        <img src="/fmcs/images/ico_save.png"></a> -->
<!-- 				    </li> -->
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
					<div class="form-group normal_condition" id="facilityTeamSearch"></div>
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
				<div class="tab_contents1"></div>
			</div>
			
			
		</div>
	</div>
</div>

<div id="team_discount_Popup"></div>
