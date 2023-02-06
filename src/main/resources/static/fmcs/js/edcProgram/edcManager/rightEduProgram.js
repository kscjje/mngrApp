var gridEduPrg=null;
var frmEduCondition=null;
var editRowKey=null;
let selectedRowIndex = -1;
var tabsInstance=null;
let selectedTabIndex=0;
//오른쪽 상단 강좌 조회 및 목록

function createEducationPrg()
{
	createEduPrgCondition('#eduCondition');	//오른쪽 강좌 조회
	
	createRightEduProgramList('#gridEduPrg');	//오른쪽 강좌 목록
	
	createEduTab($('#scrolledtabs > .tabs-container'), tabs);	//오른쪽 강좌 tabs
	
	$('#tab1').show();
	CreateTab1Init();	
}

//---------------------------------
//조회조건
//---------------------------------
function createEduPrgCondition(selector){
	$(selector).dxForm({
		width:1200,
	    showColonAfterLabel: false,
	    labelMode:'hidden',
	    colCount:6,
	    //formData: frmCondition,
	    items: createEduPrgItemsCondition(),
	    onInitialized:function(e){
	    	frmEduCondition = e.component;
	    },
	});
	createItemsFuctionButtons();	
}
function createEduPrgItemsCondition() {
	var itemsCondition = [];
	itemsCondition=[
		{
			dataField: 'SEARCH_TYPE',
			editorType: 'dxSelectBox',
			editorOptions:
			{
				dataSource:week_gubn,
				 valueExpr: 'value', displayExpr: 'text',value: '0',
				 onValueChanged(data) {
					 WeekSelectBoxValueChange(frmEduCondition,data.value);
				 },
			}, 
		},
		{itemType:'group',colSpan:2,colCount:7,cssClass:'grp_low_height',
		items:[
			{dataField:'SRCH_MON',editorType: 'dxCheckBox',editorOptions: {value: true,text: '월',}},
			{dataField:'SRCH_TUE',editorType: 'dxCheckBox',editorOptions: {value: true,text: '화',}},
			{dataField:'SRCH_WED',editorType: 'dxCheckBox',editorOptions: {value: true,text: '수',}},
			{dataField:'SRCH_THU',editorType: 'dxCheckBox',editorOptions: {value: true,text: '목',}},
			{dataField:'SRCH_FRI',editorType: 'dxCheckBox',editorOptions: {value: true,text: '금',}},
			{dataField:'SRCH_SAT',editorType: 'dxCheckBox',editorOptions: {value: true,text: '토',}},
			{dataField:'SRCH_SUN',editorType: 'dxCheckBox',editorOptions: {value: true,text: '일',}},]
		}, 
		{dataField: 'SEARCH_REG_STATUS',editorType: 'dxSelectBox',
			editorOptions: {  
				dataSource:regstatus_gbn,
				valueExpr: 'value', 
				displayExpr: 'text',
				value: '0',
			},
		}, 
		{dataField: 'SEARCH_KEYWORD',
			editorOptions:{
				inputAttr: {class: "srchkeyword"},
				width: '100%',
				placeholder:'검색할 강좌명 입력',
			}
		},					
		{dataField:'SRCH_DEL',editorType: 'dxCheckBox',cssClass:'grp_low_height',
			editorOptions: {
				value: '',
				text: '삭제된강좌만보기',
			}
		},
	];      
	return itemsCondition;
}
function createItemsFuctionButtons() {
	$('#searchBtn').dxButton({
		stylingMode: 'contained',
		icon: 'find',
		type: 'default',
		onClick() {
			var msg='';
			if(frmDetail){
				//frmDetail.itemOption("KOR_NAME", "visible", false);//OK
				//msg = frmDetail.itemOption("KOR_NAME", "value");
				msg = frmDetail.getEditor('KOR_NAME').option('value'); 
			}
			DevExpress.ui.notify('강좌조회 ' + msg);
			
		},
	});
	$('#searchInitBtn').dxButton({
		stylingMode: 'contained',
		icon:'clear',
		type: 'default',
		elementAttr: {
			class: "btnRefresh"
		},
		onClick() {
			DevExpress.ui.notify('초기화');
			
		},
	});
	/*$('#freeTimeBatchSaveBtn').dxButton({
		stylingMode: 'contained',
		text: '자유이용시간일괄등록',
		type: 'default',
		onClick() {
			DevExpress.ui.notify('자유이용시간일괄등록');
			
		},
	});

	$('#copyEduPrgBtn').dxButton({
		stylingMode: 'contained',
		text: '강좌복사',
		type: 'default',
		onClick() {
			DevExpress.ui.notify('강좌복사');
		},
	});
*/}
const eduStore = new DevExpress.data.ArrayStore({
    key: 'EDC_PRGMID',
    data: edu_programs
});

var city2SelectBox, selectedValue = 1;

function createRightEduProgramList(selector){
	var eduWidth = 1517;//$('.edu_condition').width();
			//edu_programs

	gridEduPrg =  $(selector).dxDataGrid({
		dataSource: eduStore,
		showBorders: true,
		export: {enabled: true},
		allowColumnReordering: true,
	    allowColumnResizing: true,
	    columnFixing: {enabled: true,},
	    columnChooser: {enabled: true,allowSearch: true,},
	    focusedRowEnabled: true,
		focusedRowIndex: 0,
		searchPanel: {
			visible: true,
	        placeholder: 'Search...',
	    },
	    paging: {
	    	enabled: false,
		},
	    rowDragging: {
	    	allowReordering: true,
	    	showDragIcons: false,
	    	onReorder(e) {
		        const visibleRows = e.component.getVisibleRows();
		        const toIndex = edu_programs.findIndex((item) => item.EDC_PRGMID === visibleRows[e.toIndex].data.EDC_PRGMID);
		        const fromIndex = edu_programs.findIndex((item) => item.EDC_PRGMID === e.itemData.EDC_PRGMID);
		
		        edu_programs.splice(fromIndex, 1);
		        edu_programs.splice(toIndex, 0, e.itemData);
		
		        e.component.refresh();
		        
		        /*remote reorder
		        const newOrderIndex = visibleRows[e.toIndex].data.OrderIndex;
		        const d = $.Deferred();

		        tasksStore.update(e.itemData.ID, { OrderIndex: newOrderIndex }).then(() => {
		          e.component.refresh().then(d.resolve, d.reject);
		        }, d.reject);

		        e.promise = d.promise();
		        */
		        
		        
		        
		        
		        
		        
		        
		        
	    	},
	    },	
		editing: {
		      mode: 'cell',
		      allowUpdating: true,
		      selectTextOnEditStart: true,
		     // startEditAction: 'click',
		      popup: {
		            title: '강좌관리',
		            showTitle: true,
		            width: 1200,
		            height:910,
		            onShown:function(){
		            	var frmInstance = $("#editForm").dxForm("instance");
		            	//일일방문 가능횟수
		                let yn1 = gridEduPrg.cellValue(selectedRowIndex, "EDC_DAYVISITCNT_YN");
	       	        	if (yn1=='0'){
	       	        		frmInstance.itemOption('EDC_DAYVISITCNT', "disabled", true); 
	       	        	}else{
	       	        		frmInstance.itemOption('EDC_DAYVISITCNT', "disabled", false); 
	       	        	}
	       	        	
	       	        	//강좌기간
	       	        	let yn2 = gridEduPrg.cellValue(selectedRowIndex, "EDC_TERM_YN");
	       	        	
	       	        	if (yn2=='0'){
	       	        		frmInstance.itemOption('강좌기간설정.EDC_SDATE', "disabled", true); 
	       	        		frmInstance.itemOption('강좌기간설정.EDC_EDATE', "disabled", true);
	       	        	}else{
	       	        		frmInstance.itemOption('강좌기간설정.EDC_SDATE', "disabled", false); 
	       	        		frmInstance.itemOption('강좌기간설정.EDC_EDATE', "disabled", false); 
	       	        	}
	       	        	//비대면
	       	        	let yn3 = gridEduPrg.cellValue(selectedRowIndex, "EDC_ONLINEYN");
	       	        	if (yn3 == "0") {
	       	        		frmInstance.itemOption('비대면강좌운영.EDC_ONLINE_TYPE', "disabled", true); 
	       	        		frmInstance.itemOption('비대면강좌운영.EDC_ONLINE_URL', "disabled", true);
	       	        		frmInstance.itemOption('비대면강좌운영.EDC_ONLINE_PWD', "disabled", true);
		                } else {
		                	let yn4 = gridEduPrg.cellValue(selectedRowIndex, "EDC_ONLINE_TYPE");
		                	frmInstance.itemOption('비대면강좌운영.EDC_ONLINE_TYPE', "disabled", false);
		                	frmInstance.itemOption('비대면강좌운영.EDC_ONLINE_URL', "disabled", false);
		                	if(yn4 =='1'){
		                		frmInstance.itemOption('비대면강좌운영.EDC_ONLINE_PWD', "disabled", false);
		                	}else{
		                		frmInstance.itemOption('비대면강좌운영.EDC_ONLINE_PWD', "disabled", true);
		                	}
		                }
		            	
	       	        	frmInstance.validate();
		            },
		            onHiding:function(){
		            	gridEduPrg.option("editing.mode", "cell");
		            }
		      },
		      form: {
		    	  showColonAfterLabel: false,
		    	  elementAttr: {id: "editForm"},
		    	  colCount: 3,
		    	  items:createEduPrgDetailForm(),
		          onFieldDataChanged: function (e) {
						console.log('popup-onFieldDataChanged');
		          }
		      },
		},
		selection: {mode: 'multiple',showCheckBoxesMode:'always',},
		onToolbarPreparing(e) {
			const dataGrid = e.component;
	        e.toolbarOptions.items.push(
	          		 /* {
	          			 location: 'after',
	          			 widget: 'dxButton',
	          			 options: {
	          				 	icon: 'refresh',
	          				 	onClick() {
	          				 		gridEduPrg.refresh();
	          				 	},
	          			 },
	          		 }, */
	        {
	        	location: 'after',
	        	widget: 'dxButton',
	      		cssClass:'functionbtn',
	      		options: {
	      			text: '자유이용시간일괄등록',
	      			onClick() {
	      				CreateBatchFreeTimeForm();
	      				//gridComplete.refresh();
	      			},
	      		},
	        },
	        {
	        	location: 'after',
		      	widget: 'dxButton',
		      	cssClass:'functionbtn',
		      	options: {
		      		text: '강좌복사',
		      		onClick() {
		      					  //gridComplete.refresh();
		      		},
		      	},
	        },
	        );
		},//ontoolbar
		columns: createColumnsList(true),
		onCellDblClick(e){
			selectedRowIndex = e.rowIndex;
			if(!(e.column.dataField=='USE_YN'||e.column.dataField=='EDC_OPENYN')){
				updateEducationProgram();
			}
		},
	    onRowPrepared(e){
			if (e.rowType === "data") {
				if(e.data.EDC_STATUS === "접수중"){
					e.rowElement.css("background-color", "#ffe0e0");  
				}
			}
	    },
	    onInitNewRow: function(e){
	    	if(gridEduPrg.option("editing.mode")=="popup"){
	    		gridEduPrg.option("editing.popup.title", "강좌정보 신규");
	    	}
	    	
	    	var categoryData = selectedData();
	    	var today= moment().format('YYYY-MM-DD');
			e.data={
					CTGCD: (categoryData ? categoryData.data.CTGCD:''),
					EDC_STIME:"09:00",
					EDC_ETIME:"09:50",
					USE_YN : '1',
					EDC_OPENYN:'1',
					EDC_CLASS_TYPE:'0',					
					INSTRCTR_NAME:'',
					USER_SEQ:'',
					EDC_TERM_YN:'0',
					EDC_SDATE:today,
					EDC_EDATE:today,
					EDC_DAYVISITCNT_YN:'0',
					EDC_DAYVISITCNT:0,
					EDC_ALERT_SEND_YN:'0',
					EDC_ONLINEYN:'0',
					EDC_FEE_POLICY:'1',
					EDC_LIMIT:'',
		    };
			//default
			//운영여부 :USE_YN > 운영 >'1' 
			//온라인공개여부:EDC_OPENYN>공개 >'1'
			//강좌구분 :EDC_CLASS_TYPE>체육강좌>'0'
			//강사명:INSTRCTR_NAME >미지정 > ''
			//강좌기간설정:EDC_TERM_YN >설정안함>'0'
			//강좌시작일/종료일:TODAY
			//일일방문가능횟수:EDC_DAYVISITCNT > 0
			//방문시보호자SMS전송:EDC_ALERT_SEND_YN>사용안함>'0'
			//비대면 강좌 운영여부:EDC_ONLINEYN > 운영안함> '0'
			//가격정책:EDC_FEE_POLICY > 유료 > '1'
	    },
	    onRowInserted(e) {
	        e.component.navigateToRow(e.key);
	    },
	    onEditorPreparing(e) {
	    	/*if (e.parentType === 'dataRow' && e.dataField === 'EDC_STIME' || e.dataField === 'EDC_ETIME') {
	    			
	    	}*/
	    },
	    onEditingStart: function(e) {
			editRowKey = e.key;
		    if(gridEduPrg.option("editing.mode")=="popup"){
		    	gridEduPrg.option("editing.popup.title", "강좌정보 수정");
		    }

		},
		onRowUpdated(e) {
			//  alert('RowUpdated');
		},
		onEditCanceled() {
			
		},
		onSaved() {
			
		},
		onFocusedRowChanged(e) {
			const focusedRowKey = e.component.option('focusedRowKey');
		    selectedRowIndex = e.rowIndex;
			
	    	 //editorSetRow(e.row.data);
		},
		customizeColumns: function(columns){
			var popmode = gridEduPrg.option("editing.mode");
			if(popmode=='cell'){//수정(팝업모드)시 강좌시간 반영이 안됨
				columns.forEach(column => {
					if(column.dataField == 'EDC_OPENYN' ||column.dataField == 'USE_YN'){
						column.allowEditing = true;
			        }else{
			        	column.allowEditing = false;
			        }
				});
			}
		},
	}).dxDataGrid('instance');
	
}
//---------------------------------
//강좌목록-datagrid columns 생성 
//---------------------------------
function createColumnsList() 
{
	var resultColumns = {};
	
	resultColumns = [
		{dataField: 'EDC_SORT',caption: '정렬순서',showInColumnChooser:false,visible:false,sortOrder: 'asc',},
		{dataField: 'CTGCD',caption: '카테고리',visible:false,},
		{
			dataField: 'EDC_LIMIT',caption: '신청제한',
			fixed: true,
			width:180,
			cellTemplate: function(element, info) {
				var template='';
				if(info && info.value){
					info.value.forEach(function (item, index, array) {
						template+= "<div class='limt-tag'>" + item + "</div>";
									/*if(index==1){
										template+= "<br>";	
									}*/
								})
					element.append(template);
				}
			}
		},
		{dataField: 'EDC_WARNING',caption: '경고알림',width:100, fixed: true,},
		{dataField: 'EDC_STATUS',caption: '상태',width:100, fixed: true, alignment:'center'},
		{dataField: 'EDC_PRGMNM',caption: '강좌명',width:300, fixed: true,},
		{dataField: 'USE_YN',caption: '강좌운영여부',width:150, alignment:'center',
			showEditorAlways: true,
			lookup: {
				dataSource: run_gbn,
				displayExpr: 'text',
				valueExpr: 'value',
			},
		},
		{dataField: 'EDC_OPENYN',caption: '온라인공개여부',width:150, alignment:'center',
			showEditorAlways: true,
			lookup: {
				dataSource: online_gbn,
				displayExpr: 'text',
				valueExpr: 'value',
			},
		},
		{dataField: 'USER_SEQ',width:100,showInColumnChooser:false,visible:false},
		{dataField: 'INSTRCTR_NAME',caption: '강사명',width:100},
		{dataField: 'EDC_DAYS',caption: '강좌요일',width:100, alignment:'center'},
		{caption:'강좌시간',
			columns:[
			{dataField: 'EDC_STIME',
				caption:'시작',
				width:60, alignment:'center',dataType: "datetime",  
	             format: "HH:mm", // set the default format for the value to be displayed on the data cell. This is not applied when editing.  
	             editorOptions: { // set DateBox options here  
	                 displayFormat: "HH:mm",  
	                 useMaskBehavior: true,  
	                 type: "time",
	                 pickerType: 'list',
	                 type: 'time',
	                 interval: 10,
	             }  
			},
			
			{dataField: 'EDC_ETIME',
				caption:'종료',
				 width:60, alignment:'center',dataType: "datetime",  
	             format: "HH:mm", // set the default format for the value to be displayed on the data cell. This is not applied when editing.  
	             editorOptions: { // set DateBox options here  
	                 displayFormat: "HH:mm",  
	                 useMaskBehavior: true,  
	                 type: "time",
	                 pickerType: 'list',
	                 type: 'time',
	                 interval: 10,
	             }  
			},
		]},		
		{caption:'정원',
			columns:[
				{dataField: 'EDC_PNCPA',caption: '총정원',width:60, format: def_numberFormat},
				{dataField: 'EDC_VPNCPA',caption: '방문',width:60, format: def_numberFormat},
				{dataField: 'EDC_OPNCPA',caption: '온라인',width:60, format: def_numberFormat},
			]
		},
		{dataField: 'EDC_SPNCPA',caption: '강좌대상',width:80},
		{dataField: 'EDC_ONLINEYN',caption: '비대면강좌운영여부',width:150, alignment:'center',
			lookup: {
				dataSource: run_gbn,
				displayExpr: 'text',
				valueExpr: 'value',
				},
				
		},
		{caption: '재등록접수시작일시',width:200, alignment:'center',
			calculateCellValue: function (rowData) {
				return rowData.EDC_RSVN_SDATE + " " + rowData.EDC_RSVN_STIME;
			}
		},
		{caption: '재등록접수종료일시',width:200, alignment:'center',
			calculateCellValue: function (rowData) {
				return rowData.EDC_RSVN_EDATE + " " + rowData.EDC_RSVN_ETIME;
			}
		},
		{caption: '신규접시작일시',width:200, alignment:'center',
			calculateCellValue: function (rowData) {
				return rowData.EDC_NEW_SDATE + " " + rowData.EDC_NEW_STIME;
			}
		},
		{caption: '신규접종료일시',width:200, alignment:'center',
			calculateCellValue: function (rowData) {
				return rowData.EDC_NEW_EDATE + " " + rowData.EDC_NEW_ETIME;
			}
		},
		{dataField: 'EDC_DAYVISITCNT_YN',showInColumnChooser:false,visible:false,
			lookup: {
				dataSource: set_gbn,
				displayExpr: 'text',
				valueExpr: 'value'
			},
		},
		{dataField: 'EDC_DAYVISITCNT',dataType:"number",visible:false},
		{dataField: 'EDC_PLACENM',showInColumnChooser:false,visible:false},
		{dataField: 'EDC_TARGETINFO',showInColumnChooser:false,visible:false},
		{dataField: 'EDC_CLASS_TYPE',showInColumnChooser:false,visible:false},
		{dataField: 'EDC_CLASS_GBN',showInColumnChooser:false,visible:false},
		{dataField: 'EDC_ALERT_SEND_YN',showInColumnChooser:false,visible:false},
		{dataField: 'EDC_TERM_YN',showInColumnChooser:false,visible:false},
		{dataField: 'EDC_SDATE',showInColumnChooser:false,visible:false,},
		{dataField: 'EDC_EDATE',showInColumnChooser:false,visible:false},
		{dataField: 'EDC_ONLINE_TYPE',showInColumnChooser:false,visible:false,},	
		{dataField: 'EDC_ONLINE_URL',showInColumnChooser:false,visible:false},
		{dataField: 'EDC_ONLINE_PWD',showInColumnChooser:false,visible:false},
		{dataField: 'EDC_FEE_POLICY',showInColumnChooser:false,visible:false}
		
		      
	];
	
	return resultColumns;
}

function setAllowEditingExcepts(selector,bAllowEditing,excepts){
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
function setPopupEduCategoryTitle(){
	var popupform = gridEduPrg.option("editing.form");
	//분류구분 변경
	/*var ctgKind = $('#tree-condition').dxSelectBox('instance');
	//ctgKind.option('value');
	var ctgText=ctgKind.option('text');
	var item = getItem(popupform.items,'CTGCD');
	if(item!= null) {
		item.label.text=ctgText;
	}
	*/
}

//신규 버튼
function createEducationProgram(){
	gridEduPrg.option("editing.mode", "popup");
	setPopupEduCategoryTitle();
	setAllowEditingExcepts("#gridEduPrg",true,[]);
	
	gridEduPrg.addRow();
	gridEduPrg.deselectAll();
}
//수정 버튼
function updateEducationProgram(){
	if(selectedRowIndex==-1) return;
	gridEduPrg.option("editing.mode", "popup");
	setPopupEduCategoryTitle();
	setAllowEditingExcepts("#gridEduPrg",true,[]);
	gridEduPrg.editRow(selectedRowIndex);
	gridEduPrg.deselectAll();
}
//삭제 버튼
function deleteEducationProgram(){
	if(selectedRowIndex==-1) return;
	
	if(gridEduPrg.getSelectedRowKeys().length ==0){
		gridEduPrg.deleteRow(selectedRowIndex);
		gridEduPrg.deselectAll();
		return;
	}
	
	if(confirm(gridEduPrg.getSelectedRowKeys().length+'건을 삭제하시겠습니까?')){;
	/*	gridEduPrg.getSelectedRowKeys().forEach((key) => {
	        instructorsStore.remove(key);
	     });*/
		gridEduPrg.refresh();
	}
	
}
function  createEduTab(selector, items) {
	tabsInstance = $(selector).dxTabs({
		dataSource: items,
		selectedIndex: 0,
		scrollByContent: true,
		showNavButtons: true,
		onSelectionChanged(e){
			var curidx =e.component.option('selectedIndex');
			if(curidx != selectedTabIndex){
				var tabSelector = $('#tab'+(curidx+1));
				 if ( tabSelector.css('display') === 'none' ) {
					 	tabSelector.show();
					 	$('#tab'+(selectedTabIndex+1)).hide();
		    		 	setTimeout(function(){
		    		 		switch(curidx){
			    		 		case 0: CreateTab1Init(); break;
			    		 		case 1: CreateTab2Init(); break;
			    		 		case 2: CreateTab3Init(); break;
			    		 		case 3: CreateTab4Init(); break;
			    		 		case 4: CreateTab5Init(); break;
			    		 		case 5: CreateTab6Init(); break;
			    		 		case 6: CreateTab7Init(); break;
			    		 		case 7: CreateTab8Init(); break;
		    		 		}
		    		 	}, 100);

				 }
		    }
			selectedTabIndex=curidx;
		},
	});
}
function getRowIndex(){
	let editRowKey = gridEduPrg.option('editing.editRowKey');
	let index = gridEduPrg.getRowIndexByKey(editRowKey);
	return index;
}

