<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<script>window.jQuery || document.write(decodeURIComponent('%3Cscript src="js/jquery.min.js"%3E%3C/script%3E'))</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.4.0/polyfill.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/exceljs/4.1.1/exceljs.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.2/FileSaver.min.js"></script>
<link rel="stylesheet" href="/fmcs/css/fmcs_style3.css">


<script src="/fmcs/js/default_data.js"></script>
<script src="/backOffice/ckeditor/ckeditor.js"></script>
<script src="/fmcs/js/mngr/system_manager.js?ver=1"></script>

<script>
	var columnList = null;
	var gridSysMngr = null;
	var editmode="new";
	
	let selectedRowIndex = -1;
	
	const nowDate = new Date();

	let resultList = new DevExpress.data.ArrayStore({
		key: "ID",
		data: mainListData()
	});


	
	const part_gbn = [
		{text: "부서1", value: "1"}, 
		{text: "부서2", value: "2"},
		{text: "부서3", value: "3"},
		{text: "부서4", value: "4"},
	];
	
	const workstatus_gbn = [
		{text: "재직", value: "1"}, 
		{text: "퇴직", value: "0"},
		{text: "휴직", value: "2"}
	];
	

	const comcd_gbn = [
		{text: "정관아쿠아드림파크", value: "COMCD1"},
		{text: "기장군국민체육센터", value: "COMCD2"},
		{text: "기장생활체육센터", value: "COMCD3"}
	];
	
	


	$(document).ready(function () {
		
		mainListColumn();
	
		//Search Form
		$("#SysMngrSearch").dxForm({
			showColonAfterLabel: false,
		    labelMode:'hidden',
		    colCount: 6,
		    items: [
		    	{itemType: "group", 
			    	items: [
			    		{dataField: "COMCD", editorType: "dxSelectBox", editorOptions: {
			    			dataSource: comcd_gbn, layout: "horizontal", valueExpr: "value", displayExpr: "text", placeholder: "센터선택(전체)"
			    			}
			    		}
			    	]
		    	},
		    	{itemType: "group",
		    		items: [
			    		{dataField: "PARTCD", editorType: "dxSelectBox", label:{text:"dd"}, editorOptions: {
			    			dataSource: part_gbn, layout: "horizontal", valueExpr: "value", displayExpr: "text", placeholder: "센터내부서선택(전체)"
			    			} 
			    		}
			    	]
		    	},
		    	{itemType: "group",
		    		items: [
			    		{dataField: "AUTH_TYPE", editorType: "dxSelectBox", label:{text:"dd"}, editorOptions: {
			    			dataSource: auth_gbn, layout: "horizontal", valueExpr: "value", displayExpr: "text", placeholder: "권한유형(전체)"
			    			} 
			    		}
			    	]
		    	},
		    	{itemType: "group",
		    		items: [
			    		{dataField: "USE_YN", editorType: "dxSelectBox", label:{text:"dd"}, editorOptions: {
			    			dataSource: use_gbn, layout: "horizontal", valueExpr: "value", displayExpr: "text", placeholder: "사용여부(전체)"
			    			} 
			    		}
			    	]
		    	},
		    	{colSpan: 2, itemType: "group", colCount: 3,
		    		items: [
			    		{dataField: "SEARCH_COLUMN", editorType: "dxSelectBox", editorOptions: {
			    			dataSource: [
			    					{text: "아이디", value: "COMCD"},
			    					{text: "이름", value: "PT_PERSON"}
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
				$("#SysMngrSearch").dxForm("instance").resetValues();
			},
		});
		
		//Main Grid
		gridSysMngr = $("#gridList").dxDataGrid({
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

	        	editmode="view";
	        },
	        editing: {
				mode: "cell",
				allowUpdating: true,
			 	selectTextOnEditStart: true,
				// startEditAction: 'click',
			 	popup: {
					title: "사용자관리",
					showTitle: true,
					width: 900,
				  	height:500,
				 	onShown:function(){
				  	}
				},
				form: {
					showColonAfterLabel: false,
					elementAttr: {
				         id: "editForm",
				   	},
					customizeItem: mngrCustomizeItem,
					items: createMngrDetailForm(),
					onInitialized: function(e) {
						frmPopup  = e.component;
					},
					onContentReady: function(e){

						
					},
					colCount: 2,
				},
			},
			onRowDblClick: function (e) {
				updateFacilityTeam();
			},
			onInitNewRow: function(e){
				if(gridSysMngr.option("editing.mode")=="popup"){
					gridSysMngr.option("editing.popup.title", "사용자등록");
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
				if(gridSysMngr.option("editing.mode")=="popup"){
					gridSysMngr.option("editing.popup.title", "사용자수정");
				}
			},
			onRowPrepared(e){
			},
			onRowUpdated(e) {
		          //  alert('RowUpdated');
			},
			onEditCanceled() {
				gridSysMngr.option("editing.mode", "cell");
			},
			onSaved() {
				gridSysMngr.option("editing.mode", "cell");
			},
		    export: {
		        enabled: false,
		    },
		    onExporting(e) {
		    	exportFacilityTeam();
		    	e.cancel = true;
		    }			
		}).dxDataGrid("instance");
		
	});
	
	//Main Column
	function mainListColumn() {
		columnList = [
			{dataField: "ID", width: 150, caption: "번호", alignment: "center",  visible: false}, 
			{dataField: "COMCD", width: 150, caption: "센터", alignment: "center", lookup: {dataSource: comcd_gbn, displayExpr: "text", valueExpr: "value"}}, 
			{dataField: "PARTCD", width: 150, caption: "부서",  alignment: "center", lookup: {dataSource: part_gbn, displayExpr: "text", valueExpr: "value"}},
			{dataField: "USER_ID", width: 80, caption: "ID", alignment: "center"},
			{dataField: "USER_NM", width: 200, caption: "회원명"},
			{dataField: "AUTH_TYPE", width: 160, caption: "권한유형", lookup: {dataSource: auth_gbn, displayExpr: "text", valueExpr: "value"}},
			{dataField: "USE_YN", width: 160, caption: "사용여부", lookup: {dataSource: use_gbn, displayExpr: "text", valueExpr: "value"}},
			{dataField: "WORK_STATUS", width: 120, caption: "재직상태" , lookup: {dataSource: workstatus_gbn, displayExpr: "text", valueExpr: "value"}},
		];
	}
	
	function mainListData() {
		var dataList = "";
		
		dataList = [
			{ID: 1, TEME_CD: 1, COMCD: "COMCD1", PARTCD: "1", USER_ID: "hong1", USER_NM: "홍길동1", AUTH_TYPE: "1", USE_YN: "1", WORK_STATUS: "1"},
			{ID: 2, TEME_CD: 2, COMCD: "COMCD1", PARTCD: "2", USER_ID: "hong2", USER_NM: "홍길동2", AUTH_TYPE: "0", USE_YN: "1", WORK_STATUS: "0"},
			{ID: 3, TEME_CD: 3, COMCD: "COMCD1", PARTCD: "1", USER_ID: "hong3", USER_NM: "홍길동3", AUTH_TYPE: "1", USE_YN: "1", WORK_STATUS: "2"},
			{ID: 4, TEME_CD: 4, COMCD: "COMCD2", PARTCD: "3", USER_ID: "hong4", USER_NM: "홍길동4", AUTH_TYPE: "1", USE_YN: "1", WORK_STATUS: "0"},
			{ID: 5, TEME_CD: 5, COMCD: "COMCD2", PARTCD: "4", USER_ID: "hong5", USER_NM: "홍길동5", AUTH_TYPE: "1", USE_YN: "1", WORK_STATUS: "0"},
			{ID: 6, TEME_CD: 6, COMCD: "COMCD2", PARTCD: "2", USER_ID: "hong6", USER_NM: "홍길동6", AUTH_TYPE: "1", USE_YN: "1", WORK_STATUS: "1"},
			{ID: 7, TEME_CD: 7, COMCD: "COMCD1", PARTCD: "3", USER_ID: "hong7", USER_NM: "홍길동7", AUTH_TYPE: "0", USE_YN: "1", WORK_STATUS: "1"},
			{ID: 8, TEME_CD: 8, COMCD: "COMCD3", PARTCD: "1", USER_ID: "hong8", USER_NM: "홍길동8", AUTH_TYPE: "1", USE_YN: "1", WORK_STATUS: "1"},
			{ID: 9, TEME_CD: 9, COMCD: "COMCD3", PARTCD: "4", USER_ID: "hong9", USER_NM: "홍길동9", AUTH_TYPE: "1", USE_YN: "1", WORK_STATUS: "1"},
			{ID: 10, TEME_CD: 10, COMCD: "COMCD2", PARTCD: "1", USER_ID: "hong10", USER_NM: "홍길동10", AUTH_TYPE: "0", USE_YN: "1", WORK_STATUS: "1"},
			{ID: 11, TEME_CD: 11, COMCD: "COMCD2", PARTCD: "2", USER_ID: "hong11", USER_NM: "홍길동11", AUTH_TYPE: "1", USE_YN: "1", WORK_STATUS: "2"},
			{ID: 12, TEME_CD: 12, COMCD: "COMCD2", PARTCD: "1", USER_ID: "hong12", USER_NM: "홍길동12", AUTH_TYPE: "1", USE_YN: "1", WORK_STATUS: "2"},
			{ID: 13, TEME_CD: 13, COMCD: "COMCD1", PARTCD: "3", USER_ID: "hong13", USER_NM: "홍길동13", AUTH_TYPE: "1", USE_YN: "1", WORK_STATUS: "1"},
			{ID: 14, TEME_CD: 14, COMCD: "COMCD1", PARTCD: "4", USER_ID: "hong14", USER_NM: "홍길동14", AUTH_TYPE: "1", USE_YN: "1", WORK_STATUS: "0"},
			{ID: 15, TEME_CD: 15, COMCD: "COMCD1", PARTCD: "2", USER_ID: "hong15", USER_NM: "홍길동15", AUTH_TYPE: "0", USE_YN: "1", WORK_STATUS: "1"},
			{ID: 16, TEME_CD: 16, COMCD: "COMCD1", PARTCD: "3", USER_ID: "hong16", USER_NM: "홍길동16", AUTH_TYPE: "1", USE_YN: "1", WORK_STATUS: "1"},
		];                                                                                                                            
		                                          
		return dataList;
	}
	
	//신규 버튼
	function createFacilityTeam(){
		
		gridSysMngr.option("editing.mode", "popup");
		setAllowEditing("#gridList",true,[]);
		
		gridSysMngr.addRow();
		gridSysMngr.deselectAll();
	}
	//수정 버튼
	function updateFacilityTeam(){
		if (selectedRowIndex==-1) {
			DevExpress.ui.notify("수정할 리스트를 선택하세요."); 
			return;
		}
		
		gridSysMngr.option("editing.mode", "popup");
		editmode='update';
		setAllowEditing("#gridList",true,[]);
		gridSysMngr.editRow(selectedRowIndex);
		gridSysMngr.deselectAll();
	}
	//삭제 버튼
	function deleteFacilityTeam(){
		
		
		if(selectedRowIndex==-1) return;
		editmode='delete';
		if(gridSysMngr.getSelectedRowKeys().length ==0){
			gridSysMngr.deleteRow(selectedRowIndex);
			gridSysMngr.deselectAll();
			return;
		}
		
		if(confirm(gridSysMngr.getSelectedRowKeys().length+'건을 삭제하시겠습니까?')){
		     gridSysMngr.refresh();
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
	
	function mngrCustomizeItem(item){
		let editRowKey = gridSysMngr.option('editing.editRowKey');
	   	let index = gridSysMngr.getRowIndexByKey(editRowKey);
	   	index = index === -1 ? 0 : index;
	}
	

</script>

<div id="userPopup"></div>
<!-- MainTitle -->
<div class="row row_title">
	<div class="col-12">
		<ul class="navbar-nav">
 			<li class="nav-item d-sm-inline-block quick-nav">
		        사용자관리
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
					<div class="form-group normal_condition" id="SysMngrSearch"></div>
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