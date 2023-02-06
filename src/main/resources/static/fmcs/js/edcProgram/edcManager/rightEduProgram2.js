var gridEduPrg=null;
var frmEduCondition=null;
var editRowKey=null;
var editmode="new";
let selectedRowIndex = -1;
var frmPopup=null;

//오른쪽 상단 강좌 조회 및 목록
//---------------------------------
//조회조건
//---------------------------------

function createEduPrgCondition(selector){
	frmEduCondition=$(selector).dxForm({
		width:1200,
	    showColonAfterLabel: false,
	    labelMode:'hidden',
	    colCount:6,
	    //formData: frmCondition,
	    items: createEduPrgItemsCondition(),
	}).dxForm("instance");
	createItemsFuctionButtons();	
}
//---------------------------------
//조회조건-form items 생성
//---------------------------------
//---------------------------------
//조회조건-form items 생성
//---------------------------------
function createEduPrgItemsCondition_tworow() {
	var itemsCondition = [];
	 
	itemsCondition=[
		{itemType:'group',
			items:[
				{itemType:'group',colCount:7,
					items:[
						{colSpan:7, dataField: 'SEARCH_TYPE',editorType: 'dxSelectBox',
							editorOptions: {dataSource:week_gubn,layout:'horizontal', valueExpr: 'value', displayExpr: 'text',value: '0',
								onValueChanged(data) {
								  if (data.value !== null) {
									//전체, 평일,월수금,
									if(data.value  == '0' || data.value  == '1' || data.value  == '3'){
										frmEduCondition.getEditor('SRCH_MON').option('value','1');
										frmEduCondition.getEditor('SRCH_WED').option('value','1');
										frmEduCondition.getEditor('SRCH_FRI').option('value','1');
									}//전체, 평일,화목,
									if(data.value  == '0' || data.value  == '1' || data.value  == '4'){
										frmEduCondition.getEditor('SRCH_TUE').option('value','1');
										frmEduCondition.getEditor('SRCH_THU').option('value','1');
									}
									//전체, 주말
									if(data.value  == '0' || data.value  == '2' ){
										frmEduCondition.getEditor('SRCH_SAT').option('value','1');
										frmEduCondition.getEditor('SRCH_SUN').option('value','1');
									}
									//평일
									if(data.value  == '1'){
										frmEduCondition.getEditor('SRCH_SAT').option('value','');
										frmEduCondition.getEditor('SRCH_SUN').option('value','');
									}
									//주말
									if(data.value  == '2'){
										frmEduCondition.getEditor('SRCH_MON').option('value','');
										frmEduCondition.getEditor('SRCH_TUE').option('value','');
										frmEduCondition.getEditor('SRCH_WED').option('value','');
										frmEduCondition.getEditor('SRCH_THU').option('value','');
										frmEduCondition.getEditor('SRCH_FRI').option('value','');
									}
									//월,수,금
									if(data.value  == '3'){
										frmEduCondition.getEditor('SRCH_TUE').option('value','');
										frmEduCondition.getEditor('SRCH_THU').option('value','');
										frmEduCondition.getEditor('SRCH_SAT').option('value','');
										frmEduCondition.getEditor('SRCH_SUN').option('value','');
									}
									//화,목
									if(data.value  == '4'){
										frmEduCondition.getEditor('SRCH_MON').option('value','');
										frmEduCondition.getEditor('SRCH_WED').option('value','');
										frmEduCondition.getEditor('SRCH_FRI').option('value','');
										frmEduCondition.getEditor('SRCH_SAT').option('value','');
										frmEduCondition.getEditor('SRCH_SUN').option('value','');

									}
								  }
								},
							  }
						},
						{dataField:'SRCH_MON',editorType: 'dxCheckBox',editorOptions: {value: '1',text: '월',}},
						{dataField:'SRCH_TUE',editorType: 'dxCheckBox',editorOptions: {value: '2',text: '화',}},
						{dataField:'SRCH_WED',editorType: 'dxCheckBox',editorOptions: {value: '3',text: '수',}},
						{dataField:'SRCH_THU',editorType: 'dxCheckBox',editorOptions: {value: '4',text: '목',}},
						{dataField:'SRCH_FRI',editorType: 'dxCheckBox',editorOptions: {value: '5',text: '금',}},
						{dataField:'SRCH_SAT',editorType: 'dxCheckBox',editorOptions: {value: '6',text: '토',}},
						{dataField:'SRCH_SUN',editorType: 'dxCheckBox',editorOptions: {value: '0',text: '일',}},
					]
				},
	      

			]
		},
	  	{itemType:'group',
			items:[
				{itemType:'group',colCount:2,
					items:[
						{itemType:'group',
							items:[
								{itemType:'group',colCount:7,
										items:[
											{colSpan:7, dataField: 'SEARCH_REG_STATUS',editorType: 'dxSelectBox',
												editorOptions: {  
													dataSource:regstatus_gbn,
													layout:'horizontal', 
													valueExpr: 'value', 
													displayExpr: 'text',
													value: '0',
												},
											}
											]
								},
								]
						},
						{itemType:'group',
							items:[
								{itemType:'group',
									items:[{dataField:'SRCH_DEL',editorType: 'dxCheckBox',
										editorOptions: {value: 'DEL',text: '삭제된강좌만보기',}
									},
									]
								},
							]
						},
						{dataField: 'SEARCH_KEYWORD',colSpan:2,
						  	 editorOptions:{
						  		 inputAttr: {class: "srchkeyword"},
						   		 width: '100%',
						   		 placeholder:'검색할 강좌명 입력',
						   		}
						   },
					]
				},
	      
				
			]
		},    
	      
	   
	];
	return itemsCondition;
}
function createEduPrgItemsCondition() {
	
	var itemsCondition = [];
	 
	itemsCondition=
		[
		      {dataField: 'SEARCH_TYPE',editorType: 'dxSelectBox',
		    		editorOptions: {dataSource:week_gubn,layout:'horizontal', valueExpr: 'value', displayExpr: 'text',value: '0',
						onValueChanged(data) {
						  if (data.value !== null) {
							//전체, 평일,월수금,
							if(data.value  == '0' || data.value  == '1' || data.value  == '3'){
								frmEduCondition.getEditor('SRCH_MON').option('value','1');
								frmEduCondition.getEditor('SRCH_WED').option('value','1');
								frmEduCondition.getEditor('SRCH_FRI').option('value','1');
							}//전체, 평일,화목,
							if(data.value  == '0' || data.value  == '1' || data.value  == '4'){
								frmEduCondition.getEditor('SRCH_TUE').option('value','1');
								frmEduCondition.getEditor('SRCH_THU').option('value','1');
							}
							//전체, 주말
							if(data.value  == '0' || data.value  == '2' ){
								frmEduCondition.getEditor('SRCH_SAT').option('value','1');
								frmEduCondition.getEditor('SRCH_SUN').option('value','1');
							}
							//평일
							if(data.value  == '1'){
								frmEduCondition.getEditor('SRCH_SAT').option('value','');
								frmEduCondition.getEditor('SRCH_SUN').option('value','');
							}
							//주말
							if(data.value  == '2'){
								frmEduCondition.getEditor('SRCH_MON').option('value','');
								frmEduCondition.getEditor('SRCH_TUE').option('value','');
								frmEduCondition.getEditor('SRCH_WED').option('value','');
								frmEduCondition.getEditor('SRCH_THU').option('value','');
								frmEduCondition.getEditor('SRCH_FRI').option('value','');
							}
							//월,수,금
							if(data.value  == '3'){
								frmEduCondition.getEditor('SRCH_TUE').option('value','');
								frmEduCondition.getEditor('SRCH_THU').option('value','');
								frmEduCondition.getEditor('SRCH_SAT').option('value','');
								frmEduCondition.getEditor('SRCH_SUN').option('value','');
							}
							//화,목
							if(data.value  == '4'){
								frmEduCondition.getEditor('SRCH_MON').option('value','');
								frmEduCondition.getEditor('SRCH_WED').option('value','');
								frmEduCondition.getEditor('SRCH_FRI').option('value','');
								frmEduCondition.getEditor('SRCH_SAT').option('value','');
								frmEduCondition.getEditor('SRCH_SUN').option('value','');

							}
						  }
						},
					  }, },
				{itemType:'group',colSpan:2,colCount:7,
		      items:[{dataField:'SRCH_MON',editorType: 'dxCheckBox',editorOptions: {value: '1',text: '월',}},
							{dataField:'SRCH_TUE',editorType: 'dxCheckBox',editorOptions: {value: '2',text: '화',}},
							{dataField:'SRCH_WED',editorType: 'dxCheckBox',editorOptions: {value: '3',text: '수',}},
							{dataField:'SRCH_THU',editorType: 'dxCheckBox',editorOptions: {value: '4',text: '목',}},
							{dataField:'SRCH_FRI',editorType: 'dxCheckBox',editorOptions: {value: '5',text: '금',}},
							{dataField:'SRCH_SAT',editorType: 'dxCheckBox',editorOptions: {value: '6',text: '토',}},
							{dataField:'SRCH_SUN',editorType: 'dxCheckBox',editorOptions: {value: '0',text: '일',}},]
		    }, 
		   {dataField: 'SEARCH_REG_STATUS',editorType: 'dxSelectBox',
									editorOptions: {  
									dataSource:regstatus_gbn,
									layout:'horizontal', 
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
		    {dataField:'SRCH_DEL',editorType: 'dxCheckBox',
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


function createRightEduProgramList(selector){
	var eduWidth = 1517;//$('.edu_condition').width();
			//edu_programs

	gridEduPrg =  $(selector).dxDataGrid({
		dataSource: edu_programs,
		keyExpr: 'EDC_PRGMID',
		width:eduWidth,
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
	        width: 240,
	        placeholder: 'Search...',
	      },
		paging: {
		      enabled: false,
		},
		editing: {
		      mode: 'cell',
		      allowUpdating: true,
		      selectTextOnEditStart: true,
		     // startEditAction: 'click',
		      popup: {
		            title: '강좌관리',
		            showTitle: true,
		            width: 900,
		            height:900,
		            onShown:function(){
		            }
		          },
		          form:{
						showColonAfterLabel: false,
						elementAttr: {
					          id: "editForm",
					    },
					    items:createEduPrgDetailForm(),
					    colCount: 2,
					  },
		},
		selection: {mode: 'multiple',showCheckBoxesMode:'always',},
	
	     onToolbarPreparing(e) {
	          const dataGrid = e.component;
	          e.toolbarOptions.items.push(
	          		 {
	          			 location: 'after',
	          			 widget: 'dxButton',
	          			 options: {
	          				 	icon: 'refresh',
	          				 	onClick() {
	          				 		gridEduPrg.refresh();
	          				 	},
	          			 },
	          		 },
	          		{location: 'after',
	      			  widget: 'dxButton',
	      			cssClass:'functionbtn',
	      			  options: {
	      				  text: '자유이용시간일괄등록',
	      				  onClick() {
	      					  //gridComplete.refresh();
	      				  },
	      			  },
	        		 },
	        		 {location: 'after',
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
	        onInitNewRow: function(e){
	        	if(gridEduPrg.option("editing.mode")=="popup"){
	        		gridEduPrg.option("editing.popup.title", "강좌정보 신규");
	        		
	        	}
	        	
				 e.data={
						 CTGCD: "0005",
						 EDC_STIME:"00:00",
						 EDC_ETIME:"00:00",
						 EDC_OPENYN:1,
		    	 		};
		     },
		     onEditorPreparing(e) {
		    	 	 /*if(!(e.dataField == "EDC_OPENYN"|| e.dataField == "USE_YN")  && e.parentType == "dataRow" && !e.row.isNewRow){  
		    			 e.editorOptions.disabled = true;
		    	         
		    	      }*/
		    	 //}
		      },
		      onEditorPrepared(e){
		    	  if(e.row && e.row.isNewRow){
		    		  	editmode='create';
		    	  }
		    	  
			      /*if( e.parentType == "dataRow" && e.dataField == "EDC_OPENYN"){
		    			 editmode='';  
		    		  }*/  
		    	  
		      } ,   
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
		    	 gridEduPrg.option("editing.mode", "cell");
		     },
		        onSaved() {
		        	gridEduPrg.option("editing.mode", "cell");
		     },
		 	onFocusedRowChanged(e) {
		    	 const focusedRowKey = e.component.option('focusedRowKey');
		    	 selectedRowIndex = e.rowIndex;
			     editmode="view";
		    	 
		    	 //editorSetRow(e.row.data);
		     },
		     customizeColumns: function(columns){
		            columns.forEach(column => {
		                if(column.dataField == 'EDC_OPENYN' ||column.dataField == 'USE_YN'){
		                    column.allowEditing = true;
		                }else{
		                	column.allowEditing = false;
		                }
		            })
		            
	        },
	        /*
            customizeItem: function(item) {
                if(item && item.itemType === "group" && item.caption === "Home Address") {
                    var index = dataGrid.getRowIndexByKey(rowKey) || 0;
                    item.visible = dataGrid.cellValue(index, "AddressRequired");      
                }
            }*/

		
	  }).dxDataGrid('instance');

		  
	
	/*	
	 }else if(!(e.dataField == "EDC_OPENYN"|| e.dataField == "USE_YN")  && e.parentType == "dataRow" && !e.row.isNewRow){  
          e.editorOptions.disabled = true;
          //e.allowEditing = true;
      }*/
}
function createPopupForm(){
	frmPopup = $("<div id='popupform'>").dxForm(
			{
				showColonAfterLabel: false,
				elementAttr: {
			          id: "editForm",
			    },
			    items:createEduPrgDetailForm(),
			    colCount: 2,
			  }
	).dxForm("instance");
	
	return frmPopup;
}
/*
var editRowIndex = dataGridInstance.getRowIndexByKey(editRowKey);
var cellValue = dataGridInstance.cellValue(editRowIndex, "EmployeeName");
*/
//---------------------------------
//강좌목록-datagrid columns 생성 
//---------------------------------
function createColumnsList() 
{
	var resultColumns = {};
	
	resultColumns = [
					{dataField: 'EDC_LIMIT',caption: '신청제한',width:100, fixed: true,
						width:180,
						cellTemplate: function(element, info) {
							var template='';
							info.value.forEach(function (item, index, array) {
								template+= "<div class='limt-tag'>" + item + "</div>";
								/*if(index==1){
									template+= "<br>";	
								}*/
								
							})
							
							element.append(template);
						}
					
					},
					{dataField: 'EDC_WARNING',caption: '경고알림',width:100, fixed: true,},
					{dataField: 'EDC_STATUS',caption: '상태',width:100, fixed: true,},
					{dataField: 'EDC_PRGMNM',caption: '강좌명',width:300, fixed: true,},
					{dataField: 'USE_YN',caption: '강좌운영여부',width:150,
						showEditorAlways: true,
						lookup: {
				          dataSource: run_gbn,
				          displayExpr: 'text',
				          valueExpr: 'value',
				        },},
					{dataField: 'EDC_OPENYN',caption: '온라인공개여부',width:150,
				        showEditorAlways: true,
						lookup: {
				          dataSource: online_gbn,
				          displayExpr: 'text',
				          valueExpr: 'value',
				        },},
					{dataField: 'INSTRCTR_NAME',caption: '강사명,width:100'},
					{dataField: 'EDC_DAYS',caption: '강좌요일',width:100},
					{dataField: 'EDC_STIME',caption: '강좌시작시간',width:150},
					{dataField: 'EDC_ETIME',caption: '강좌종료시간',width:150},
					{dataField: 'EDC_PNCPA',caption: '총정원',width:100},
					{dataField: 'EDC_VPNCPA',caption: '방문정원',width:100},
					{dataField: 'EDC_OPNCPA',caption: '온라인정원',width:100},
					{dataField: 'EDC_SPNCPA',caption: '강좌대상',width:100},
					{dataField: 'EDC_ONLINEYN',caption: '비대면강좌운영여부',width:150,
						lookup: {
					          dataSource: run_gbn,
					          displayExpr: 'text',
					          valueExpr: 'value',
					        },},
					{caption: '재등록접수시작일시',width:200
						 ,calculateCellValue: function (rowData) {
							 	return rowData.EDC_RSVN_SDATE + " " + rowData.EDC_RSVN_STIME;
						 	 
				            }},
					 {caption: '재등록접수종료일시',width:200
				            	,calculateCellValue: function (rowData) {
						 	return rowData.EDC_RSVN_EDATE + " " + rowData.EDC_RSVN_ETIME;
			            }},
					 {caption: '신규접시작일시',width:200
						 ,calculateCellValue: function (rowData) {
							 	return rowData.EDC_NEW_SDATE + " " + rowData.EDC_NEW_STIME;
							 	 
				            }},
					 {caption: '신규접종료일시',width:200
						 ,calculateCellValue: function (rowData) {
							 	return rowData.EDC_NEW_EDATE + " " + rowData.EDC_NEW_ETIME;
				            }},
					 ];
	
	return resultColumns;
}
function  createTab(selector, items) {
	  $(selector).dxTabs({
		dataSource: items,
		selectedIndex: 0,
		scrollByContent: false,
		showNavButtons: true,
		onItemClick(e) {
		     if(e.itemData.id == 0){
		    	 if ( $('#tab1').css('display') === 'none' ) {
		    		 	$('#tab1').show();
		    		 	$('#tab2').hide();
		    	} else {
		    		  //$('.box').hide();
		    	}
		     }else{
		    	 if ( $('#tab2').css('display') === 'none' ) {
		    	 	 	$('#tab2').show();
		    		 	$('#tab1').hide();
		    	 } else {
		    		  //$('.box').hide();
		    	 }
		     }
		},
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

//item 찾기
function getItem(items,dataFieldName){
	var item=null;
	for ( var i=0; i< items.length; i++){
		if(items[i].itemType && items[i].itemType=='group'){
			item = getItem(items[i].items,dataFieldName);
			if(item != null){
				return item;
			}
		}else
		if(items[i].dataField==dataFieldName){
			return items[i];
		}
    };
	return null;
}
//신규 버튼
function createEducationProgram(){
	gridEduPrg.option("editing.mode", "popup");
	var popupform = gridEduPrg.option("editing.form");
	var testform = $("#editForm").dxForm('instance');
	//분류구분 변경
	var ctgKind = $('#tree-condition').dxSelectBox('instance');
	//ctgKind.option('value');
	var ctgText=ctgKind.option('text');
	var item = getItem(popupform.items,'CTGCD');
	if(item!= null) {
		item.label.text=ctgText;
	}
	//setAllowEditing("#gridEduPrg",true,["EDC_STIME"]);
	setAllowEditing("#gridEduPrg",true,[]);
	
	gridEduPrg.addRow();
	gridEduPrg.deselectAll();
}
//수정 버튼
function updateEducationProgram(){
	if(selectedRowIndex==-1) return;
	gridEduPrg.option("editing.mode", "popup");
	editmode='update';
	setAllowEditing("#gridEduPrg",true,[]);
	gridEduPrg.editRow(selectedRowIndex);
	gridEduPrg.deselectAll();
}
//삭제 버튼
function deleteEducationProgram(){
	if(selectedRowIndex==-1) return;
	editmode='delete';
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