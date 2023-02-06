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
	
	.hs-bg-white { background-color: #FFF; }
	.hs-list-title > div { float: left; padding-left: 10px; }
	
	/* 대관시설분류 등록 Form > 공연시설예약종류 Grid */
	#pblprfrGrid .dx-datagrid-header-panel .dx-toolbar { margin-bottom: 0; }
	#pblprfrGrid .dx-toolbar .dx-toolbar-items-container {height: 21px; }
	.form-button-small .dx-button-content { padding: 2px 4px; }
}
</style>

<script src="/fmcs/js/default_data.js"></script>
<script src="/backOffice/ckeditor/ckeditor.js"></script>
<script src="/fmcs/js/rent/tab/tab1_adcls_item.js"></script>
<script src="/fmcs/js/rent/tab/tab2_stplat.js"></script>
<script src="/fmcs/js/rent/tab/tab3_refund_set.js"></script>
<script src="/fmcs/js/rent/tab/tab4_dc_std.js"></script>

<script>
	var columnList = null;
	var gridFacilityPlcGbn = null;
	var editmode="new";
	
	let frmfcltyCtgInstance = null;
	
	var selectTabId = "";
	let rentFcltySeq = "";
	let subMenuList = null;
	let selectedRowIndex = -1;
	var updateStatus = false;
	
	const nowDate = new Date();
	
	let facilityCategories_gbn = [
		{text: "축구장", value: "FG001"}, 
		{text: "수영장", value: "FG002"}, 
		{text: "헬스장", value: "FG003"},
		{text: "세미나실", value: "FG004"}
	];

	let reservation_kind = [
		{text: "예약종류1", value: "1"}, 
		{text: "예약종류2", value: "2"}, 
		{text: "예약종류3", value: "3"},
		{text: "예약종류4", value: "4"}
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
	
	const reservationLimit_gbn = [
		{text: "제한안함", value: "N"},
		{text: "예약이용 월별제한", value: "M"},
		{text: "예약이용 년별제한", value: "Y"},
		{text: "예약이용 주별제한", value: "W"}
	];

	

	let resultList = new DevExpress.data.ArrayStore({
		key: "RENT_FCLTY_SEQ",
		data: mainListData()
	});

	$(document).ready(function () {
		
		mainListColumn();
	
		//Search Form
		$("#facilityPlaceGbnSearch").dxForm({
			showColonAfterLabel: false,
		    labelMode:'hidden',
		    items: [
		    	{itemType: "group", 
			    	items: [
			    		{dataField: "USE_GBN", editorType: "dxSelectBox", editorOptions: {
			    			dataSource: use_gbn, layout: "horizontal", valueExpr: "value", displayExpr: "text", placeholder: "사용여부"
			    			}
			    		}
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
				
				DevExpress.ui.notify("검색");
			}
		});
		
		
		//Main Grid
		gridFacilityPlcGbn = $("#gridList").dxDataGrid({
			dataSource: resultList,
			columns: columnList,
			selection: {mode: "single"},
			allowColumnReordering: true,
			allowColumnResizing: true,
			showBorders: true,
			showRowLines: true,
			columnHidingEnabled: true,
			paging: {pageSize: 10},
			columnChooser: {enabled: true},
			customizeColumns: function(columns){
	            columns.forEach(column => {
	                if(column.dataField == 'USE_YN'){
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
			    
			    rentFcltySeq = e.row.data.RENT_FCLTY_SEQ;
			    
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
					title: "대관시설분류관리",
					showTitle: true,
					width: 800,
				  	height:400,
				  	toolbarItems:[{  
			           toolbar:'bottom',  
			          location: 'after',  
			          widget: "dxButton",  
			          options: {  
			            text: "저장",  
			            onClick: function(args){  
			            	if(updateStatus){
				            	if(confirm("추첨당첨제한설정이 변경되면  현재 대관시설분류 하위의 모든장소의 추첨당첨제한설정이 해제 됩니다 계속하시겠습니까?")) {
				            		DevExpress.ui.notify("저장"); 
				            		gridFacilityPlcGbn.cancelEditData();
						  		}else{
						  			return;
						  		}
			            	}else{
			            		DevExpress.ui.notify("저장"); 
			            		gridFacilityPlcGbn.cancelEditData();
			            	}
			            }  
			          }  
			        },{  
			           toolbar:'bottom',  
			          location: 'after',  
			          widget: "dxButton",  
			          options: {  
			            text: "취소",  
			            onClick: function(args){  
			            	gridFacilityPlcGbn.cancelEditData();
			            }  
			          }  
			        }],
				 	onShown:function(){
				 		frmfcltyCtgInstance = $("#editForm").dxForm("instance");
				 		
				 		var rentApplyLimit = gridFacilityPlcGbn.cellValue(selectedRowIndex, "RENT_APPLY_LIMITGBN");
				 		if (rentApplyLimit) {
					 		if (rentApplyLimit == "N") {
					 			frmfcltyCtgInstance.getEditor("RENT_APPLY_LIMIT_CNT").option("disabled", true);
							}
							else {
								frmfcltyCtgInstance.getEditor("RENT_APPLY_LIMIT_CNT").option("disabled", false);
							}
				 		}
				 		else {
				 			frmfcltyCtgInstance.getEditor("RENT_APPLY_LIMIT_CNT").option("disabled", true);
				 		}
				 		
				 		var dwrtPrzwinLimit = gridFacilityPlcGbn.cellValue(selectedRowIndex, "DWRT_PRZWIN_YN");
				 		if (dwrtPrzwinLimit == "1") {
				 			frmfcltyCtgInstance.getEditor("PRIZE_LIMIT_CNT").option("disabled", false);
				 		}
				 		else {
				 			frmfcltyCtgInstance.getEditor("PRIZE_LIMIT_CNT").option("disabled", true);
				 		}
				  	}
				},
				form: {
					showColonAfterLabel: false,
					elementAttr: {
				         id: "editForm",
				   	},
					items: createPlcGbnDetailForm(),
					onInitialized: function(e) {
						frmPopup  = e.component;
					},
					onContentReady: function(e){

					},
					colCount: 2,
				}
			},
			onRowDblClick: function (e) {
				updateFacilityTeam();
			},
			onInitNewRow: function(e){
				if(gridFacilityPlcGbn.option("editing.mode")=="popup"){
					gridFacilityPlcGbn.option("editing.popup.title", "대관시설분류 등록");
				}
			},
			onEditorPrepared :function(e){
				if(e.row && e.row.isNewRow){
					editmode='create';
				}
			},
			onEditingStart: function(e) {
				editRowKey = e.key;
				if(gridFacilityPlcGbn.option("editing.mode")=="popup"){
					gridFacilityPlcGbn.option("editing.popup.title", "대관시설분류 수정");
				}
			},
			onRowPrepared(e){
			},
			onRowUpdated(e) {
		          //  alert('RowUpdated');
			},
			onEditCanceled() {
				gridFacilityPlcGbn.option("editing.mode", "cell");
			},
			onSaved() {
				gridFacilityPlcGbn.option("editing.mode", "cell");
			},
		    export: {
		        enabled: true,
		    },
		    onExporting(e) {
		    	exportFacilityTeam();
		    	e.cancel = true;
		    }
		}).dxDataGrid("instance");
		
		initTabList("", "");
		
	});
	
	//Main Column
	function mainListColumn() {
		columnList = [
			{dataField: "RENT_FCLTY_SEQ", width: 150, caption: "시설분류코드", alignment: "center"}, 
			{dataField: "RENT_FCLTY_TYPE", width: 150, caption: "대관시설유형", alignment: "center", lookup: {dataSource: facilityType_gbn, displayExpr: "text", valueExpr: "value"}}, 
			{dataField: "RENT_FCLTY_NAME", width: 150, caption: "시설분류명",  alignment: "center"},
			{dataField: "RENT_APPLY_LIMITGBN", width: 200, caption: "예약횟수제한설정", alignment: "center", lookup: {dataSource: reservationLimit_gbn, displayExpr: "text", valueExpr: "value"},
				calculateDisplayValue: function(rowData) {
					var text = "";
					
					if (reservationLimit_gbn.filter(item => item.value == rowData.RENT_APPLY_LIMITGBN)[0] != undefined )
						text = reservationLimit_gbn.filter(item => item.value == rowData.RENT_APPLY_LIMITGBN)[0].text;
					
					//제한
					if(rowData.RENT_APPLY_LIMITGBN == "N"){
						return  text
					}else{ //제한안함
						return  text + "(" + rowData.RENT_APPLY_LIMIT_CNT + "회)"; 
					}
					
					//return  rowData.RENT_APPLY_LIMITGBN + "(월간 " + rowData.RENT_APPLY_LIMIT_CNT + "회)"; 
            	}
			},
			{dataField: "RENT_APPLY_LIMIT_CNT", visible: false, dataType:"number", format: "#,##0 회"}, 
			{dataField: "DWRT_PRZWIN_YN", width: 200, caption: "추첨당첨제한설정", alignment: "center",
				calculateDisplayValue: function(rowData) {
					var text = "";
					
					if (restrict_gbn.filter(item => item.value == rowData.DWRT_PRZWIN_YN)[0] != undefined )
						text = restrict_gbn.filter(item => item.value == rowData.DWRT_PRZWIN_YN)[0].text;

					//제한
					if(rowData.DWRT_PRZWIN_YN == "1"){
						return  text + "(월간 " + rowData.PRIZE_LIMIT_CNT + "회)"; 
					}else{ //제한안함
						return  text
					}
					
                	
            	}
			},
			{dataField: "PRIZE_LIMIT_CNT", visible: false, dataType:"number", format: "월 #,##0 회"}, 
			{dataField: "USE_YN", width: 160, caption: "사용여부", showEditorAlways: true, lookup: {dataSource: use_gbn, displayExpr: "text", valueExpr: "value"}},
			{dataField: "MODUSER", width: 160, caption: "최종수정자ID",
				calculateCellValue: function(rowData) {
                	return rowData.MODUSER + "(" + rowData.MODUSER_NAME + ")";
            	}
			},
			{dataField: "MODDATE", width: 160, caption: "최종수정일시", dataType: 'datetime'},
		];
		
		return columnList;
	}
	
	function mainListData() {
		var dataList = "";
		
		dataList = [
			{ID: 1, RENT_FCLTY_SEQ: 1, RENT_FCLTY_TYPE: "FT002", RENT_FCLTY_NAME: "축구장", RENT_APPLY_LIMITGBN: "N", RENT_APPLY_LIMIT_CNT: "0", DWRT_PRZWIN_YN: "1", PRIZE_LIMIT_CNT: 3, USE_YN: "1", MODUSER: "hong1", MODUSER_NAME: "홍길동", MODDATE: "20221226"},
			{ID: 2, RENT_FCLTY_SEQ: 2, RENT_FCLTY_TYPE: "FT001", RENT_FCLTY_NAME: "야구장", RENT_APPLY_LIMITGBN: "M", RENT_APPLY_LIMIT_CNT: "4", DWRT_PRZWIN_YN: "0", PRIZE_LIMIT_CNT: 0, USE_YN: "0", MODUSER: "hong1", MODUSER_NAME: "홍길동", MODDATE: "20221226"},
			{ID: 3, RENT_FCLTY_SEQ: 3, RENT_FCLTY_TYPE: "FT003", RENT_FCLTY_NAME: "족구장", RENT_APPLY_LIMITGBN: "Y", RENT_APPLY_LIMIT_CNT: "10", DWRT_PRZWIN_YN: "1", PRIZE_LIMIT_CNT: 2, USE_YN: "1", MODUSER: "hong1", MODUSER_NAME: "홍길동", MODDATE: "20221226"},
			{ID: 4, RENT_FCLTY_SEQ: 4, RENT_FCLTY_TYPE: "FT001", RENT_FCLTY_NAME: "축구장", RENT_APPLY_LIMITGBN: "W", RENT_APPLY_LIMIT_CNT: "1", DWRT_PRZWIN_YN: "1", PRIZE_LIMIT_CNT: 1, USE_YN: "1", MODUSER: "hong1", MODUSER_NAME: "홍길동", MODDATE: "20221226"},
		];
		
		return dataList;
	}
	
	//신규 버튼
	function createFacilityTeam(){
		updateStatus = false;
		gridFacilityPlcGbn.option("editing.mode", "popup");
		setAllowEditing("#gridList",true,[]);
		editmode='create';
		gridFacilityPlcGbn.addRow();
		gridFacilityPlcGbn.deselectAll();
	}
	//수정 버튼
	function updateFacilityTeam(){
		if (selectedRowIndex==-1) {
			DevExpress.ui.notify("수정할 리스트를 선택하세요."); 
			return;
		}
		
		gridFacilityPlcGbn.option("editing.mode", "popup");
		editmode='update';
		setAllowEditing("#gridList",true,[]);
		gridFacilityPlcGbn.editRow(selectedRowIndex);
		gridFacilityPlcGbn.deselectAll();
	}
	//삭제 버튼
	function deleteFacilityTeam(){
		
		
		if(selectedRowIndex==-1) return;
		editmode='delete';
		if(gridFacilityPlcGbn.getSelectedRowKeys().length ==0){
			gridFacilityPlcGbn.deleteRow(selectedRowIndex);
			gridFacilityPlcGbn.deselectAll();
			return;
		}
		
		if(confirm(gridFacilityPlcGbn.getSelectedRowKeys().length+'건을 삭제하시겠습니까?')){
		     gridFacilityPlcGbn.refresh();
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
		let editRowKey = gridFacilityPlcGbn.option('editing.editRowKey');
	   	let index = gridFacilityPlcGbn.getRowIndexByKey(editRowKey);
	   	index = index === -1 ? 0 : index;
	}
	
	//대관시설분류 등록 팝업 FORM
	function createPlcGbnDetailForm() {
		var teamDetailItems = "";
		
		teamDetailItems = [
			{colSpan: 1, dataField: "RENT_FCLTY_TYPE", name:"ranttype", label: {text: "대관시설유형"}, editorType: "dxSelectBox",
				editorOptions: {dataSource: facilityType_gbn,
					layout: "horizontal", valueExpr: "value", displayExpr: "text",
					onInitialized: function (e) {
							if(editmode == "update" && $("#gridList").dxDataGrid("instance").getSelectedRowsData()[0] != undefined)
								e.component.option("value", $("#gridList").dxDataGrid("instance").getSelectedRowsData()[0].RENT_FCLTY_TYPE);
							else
								e.component.option("value", e.component.option("dataSource")[0].value);
						
						}
				}
			},
			{colSpan: 1, dataField: "RENT_FCLTY_NAME", editorType: "dxTextBox", label: {text: "대관시설분류명"} },
			{name: "rentLimitGroup", itemType: "group", items: [
				{name: "rentApplyLimit", itemType: "group", colCount: 2, label: {text: "예약신청횟수제한"}, items: [
					{ name:"rentApplyLimitGbn", dataField: "RENT_APPLY_LIMITGBN", label: {visible: false}, editorType: "dxSelectBox",
						editorOptions: {dataSource: reservationLimit_gbn,
							layout: "horizontal", valueExpr: "value", displayExpr: "text", width: 140,
							onInitialized: function (e) {
								
	 							if(editmode == "update" && $("#gridList").dxDataGrid("instance").getSelectedRowsData()[0] != undefined)
	 								e.component.option("value", $("#gridList").dxDataGrid("instance").getSelectedRowsData()[0].RENT_APPLY_LIMITGBN);
	 							else
	 								e.component.option("value", e.component.option("dataSource")[0].value);
	 						},
	 						onItemClick: function(data){
								if(editmode == "update"){
									updateStatus = true;
								}

								if (data.itemData.value == "N") {
									frmfcltyCtgInstance.getEditor("RENT_APPLY_LIMIT_CNT").option("disabled", true);
	 							}
	 							else {
	 								frmfcltyCtgInstance.getEditor("RENT_APPLY_LIMIT_CNT").option("disabled", false);
	 							}
							}
						}
					},
					{ name: "rentApplyLimitCnt", dataField: "RENT_APPLY_LIMIT_CNT", label: {visible: false}, editorType: "dxNumberBox",
						editorOptions: {
							showSpinButtons: true, min: 0, value: 0, format: "#,##0 회", 
							onValueChanged: function(data){
								if(editmode == "update"){
									//console.log(data);
									updateStatus = true;
								}
							}
						}
					},
				]},
				{name: "dwrtPrzwinLimit", itemType: "group", colCount: 2, label: {text: "추첨당첨횟수제한"}, items: [
					{ name: "dwrtPrzwinYn", dataField: "DWRT_PRZWIN_YN", label: {visible: false}, editorType: "dxSelectBox",
						editorOptions: {dataSource: restrict_gbn,
							layout: "horizontal", valueExpr: "value", displayExpr: "text", width: 140,
							onInitialized: function (e) {
	 							if(editmode == "update" && $("#gridList").dxDataGrid("instance").getSelectedRowsData()[0] != undefined)
	 								e.component.option("value", $("#gridList").dxDataGrid("instance").getSelectedRowsData()[0].DWRT_PRZWIN_YN);
	 							else
	 								e.component.option("value", e.component.option("dataSource")[0].value);
								
	 						},
							onItemClick: function(data){
								if(editmode == "update"){
									//console.log(data);
									updateStatus = true;
								}
								
								if (data.itemData.value == "0") {
									frmfcltyCtgInstance.getEditor("PRIZE_LIMIT_CNT").option("disabled", true);
								}
								else {
									frmfcltyCtgInstance.getEditor("PRIZE_LIMIT_CNT").option("disabled", false);
								}
							}
						}
					},
					{ name: "prizeLimitCnt", dataField: "PRIZE_LIMIT_CNT", label: {visible: false}, editorType: "dxNumberBox", 
						editorOptions: {
							showSpinButtons: true, min: 0, value: 0, format: "월 #,##0 회",
							onValueChanged: function(data){
								if(editmode == "update"){
									//console.log(data);
									updateStatus = true;
								}
									
							}}
					},
				]},
				{ colSpan: 1, dataField: "USE_YN", name: "useyn", label: {text: "사용여부"}, editorType: "dxSelectBox",
					editorOptions: {
						dataSource: use_gbn, 
						layout: "horizontal", valueExpr: "value", displayExpr: "text",
						onInitialized: function (e) {
							if(editmode == "update" && $("#gridList").dxDataGrid("instance").getSelectedRowsData()[0] != undefined)
								e.component.option("value", $("#gridList").dxDataGrid("instance").getSelectedRowsData()[0].USE_YN);
							else
								e.component.option("value", e.component.option("dataSource")[0].value);
							
						}
					}
				},
			]},
			{dataField: "RENT_PBLPRFR_RSVN_KIND", label: {text: "공연시설 예약종류"}, template: function (cellInfo, container) { pblprfrGridTemplate(cellInfo, container); } },
			{ colSpan: 1 , dataField: "MODUSER", width: 160, label: {text: "최종수정자ID"},
				editorOptions: {	
					disabled: true ,
					onInitialized: function(e) {
						if(editmode == "create") e.component.option("value", "")
	            	}
				}
			},
			{ colSpan: 1 , dataField: "MODDATE", width: 160, label: {text: "최종수정일시"}, editorType: "dxDateBox", editorOptions: {	disabled: true }}			 
		]

		return teamDetailItems;
	}
	
	//Tab List
	function initTabList(tabId) {
		const longtabs = [
			{id: 1, text: '부속시설관리', content: '부속시설관리 리스트'},
			{id: 2, text: '약관 관리', content: '대관 약관 관리'},
			{id: 3, text: '환불위약금 설정관리', content: '환불위약금관리 리스트'},
			{id: 4, text: '할인정보 설정관리', content: '할인정보관리 리스트'}
		];
		
		placeTab = $('#scrolledtabs > .tabs-container').dxTabs({
			dataSource: longtabs,
			tabPanelOptions: {deferRendering: false},
			onContentReady(e) {
				if (tabId != "") selectTabList(tabId);
			},
			onItemClick(e) {
				//console.log(e.itemData.id +"//"+ rentFcltySeq);
				if (rentFcltySeq == "") {
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
				initAccessoryList();
				break;
			case 2 :
				$('#tab2').show();
				initContents();
				break;
			case 3 :
				$('#tab3').show();
				initRefundList();
				break;
			case 4 :
				$('#tab4').show();
				initDiscountList();
				break;
		}
	}
	
	//공연시설 예약종류 Grid
	function pblprfrGridTemplate(cellInfo, container) {
		let $pblprfrTemplate = $("<div id='pblprfrGrid'>").dxDataGrid({
			columns: [
				{dataField: "PBLPRFR_NAME", width: "90%", caption: "공연예약종류명"}
			],
			dataSource: [],
			keyExpr: "PBLPRFR_KINDNO",
			allowColumnReordering: false,
			allowColumnResizing: true,
			showBorders: true,
			selection: {mode: "single"},
			paging: {enabled: false},
			height: 118,
			editing: {
				mode: "row",
				allowAdding: true,
			 	allowUpdating: true,
			 	allowDeleting: true,
			 	useIcons: true
			},
			toolbar: {
				items: [{
					location: "after",
		        	widget: "dxButton",
		      		cssClass: "form-button-small",
		      		options: {
		      			text: "추가",
		      			type: "normal",
		      			useSubmitBehavior: true,
		      			onClick(e) {
		      				$("#pblprfrGrid").dxDataGrid("instance").addRow();
		      				$("#pblprfrGrid").dxDataGrid("instance").deselectAll();
		      			}
		      		}
				}]
			},
			onEditorPrepared :function(e){
			},
			onEditingStart: function(e) {
			},
			onRowPrepared(e){
			},
			onRowUpdated(e) {
			},
			onEditCanceled() {
			},
		})
		
		container.append($pblprfrTemplate);
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
	
	//시설분류 리스트
	function rentList() {
		dataList = "";
		
		dataList = [
			{value: 1, text: "축구장"},
			{value: 2, text: "테니스장"},
			{value: 3, text: "농구장"}
		]
		
		return dataList;
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

</script>

<div id="userPopup"></div>
<!-- MainTitle -->
<div class="row row_title">
	<div class="col-12">
		<ul class="navbar-nav">
 			<li class="nav-item d-sm-inline-block quick-nav">
		        대관시설분류
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
<!-- 				    <li class="nav-item d-sm-inline-block quick-nav"> -->
<!-- 				        <a href="javascript:void(0);" onclick="deleteFacilityTeam();">삭제 -->
<!-- 				        <img src="/fmcs/images/ico_delete.png"></a> -->
<!-- 				    </li> -->
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
					<div class="form-group normal_condition" id="facilityPlaceGbnSearch"></div>
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
			
			<!-- 부속시설관리 -->
			<div id="tab1" style="display:none;">
				<div class="tab_contents2"></div>
			</div>
			
			<!-- 이용약관 -->
			<div id="tab2" class="row" style="display:none;">
				<div class="col-2 tab_list">
	 			</div>
				<div class="col-10 tab_contents2">
					<div class="contents1"></div>
					<div class="contents2"></div>
					<div class="contents3"></div>
					<div class="contents4"></div>
				</div>
			</div>
			
			<!-- 환불위약금 설정관리 -->
			<div id="tab3" style="display:none;">
				<div class="tab_contents2"></div>
			</div>
			
			<!-- 할인정보 설정관리 -->
			<div id="tab4" style="display:none;">
				<div class="tab_contents2"></div>
			</div>
		</div>
	</div>
</div>

<div id="discount_Popup"></div>