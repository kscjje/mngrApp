//자유이용시간일괄설정
var batchFreeTimePopup=null;
var batchEduGrid=null;
var batchFreeTimeForm=null;
var holiday_index=-1;
//groupCount

function CreateBatchFreeTimeForm()
{
	if(batchFreeTimePopup){
		batchFreeTimePopup=null;
		$("#batchFreeTime_Popup").dxPopup("dispose");
		
	}
	batchFreeTimePopup=$("#batchFreeTime_Popup").dxPopup({
		contentTemplate: batchFreeTimeTemplate,
		visible: true,
		title: '자유이용시간일괄설정',
		width:1500,
        height:750,
		position: {
			my: 'center',
		    at: 'center',
		    of: window
		},
		dragEnabled: true,
		onShown(){
			/*$('.centerlist').dxList({
				dataSource: centers,
			    displayExpr: 'text',
			    valueExpr: 'value',
			    selectionMode: 'single',
			    scrollingEnabled:true,
			});*/
		},
		toolbarItems: [{
			widget: 'dxButton',
			toolbar: 'bottom',
		    location: 'after',
		    options: {
			    	text: '저장',
			        onClick() {
			    		/*const message = `Email is sent to ${employee.FirstName} ${employee.LastName}`;
			    		DevExpress.ui.notify({
				            message,
				            position: {
				            	my: 'center top',
				            	at: 'center top',
				            },
			    		}, 'success', 3000);*/
			    	},
			    },
		}, {
			widget: 'dxButton',
			toolbar: 'bottom',
		    location: 'after',
		    options: {
			    	text: '취소',
			        onClick() {
			    		batchFreeTimePopup.hide();
			    		batchFreeTimePopup=null;
			    		$("#batchFreeTime_Popup").dxPopup("dispose");
			    	},
			    },
		}],
	}).dxPopup('instance');
}
const batchFreeTimeTemplate = function () {
	
	 const content = $("<div />");
	 content.append(
			 $("<div id='batchFreeTimeMainForm'>").dxForm({
					colCount: 3,
				    showColonAfterLabel: false,
				    labelMode:'hidden',
				    items:[
				    	{
				    		 template: batchFreeTimeGrid
				    	},
				    	{colSpan:2,
				    		cssClass:"style3_right",
				    		 template: batchFreeTimeEditForm
				    	}				    	
				    ],
				}),
				
	  );
     return content;
};
 
function batchFreeTimeGrid(){
	return $("<div id='batchEduGrid'>").dxDataGrid({
			dataSource: eduStore,
		showBorders: true,
		allowColumnReordering: true,
	    allowColumnResizing: true,
	    columnFixing: {enabled: true,},
	    columnChooser: {enabled: true,allowSearch: true,},
	    focusedRowEnabled: true,
		focusedRowIndex: 0,
	    headerFilter: { visible: true },
		searchPanel: {
			visible: true,
	        placeholder: 'Search...',
	    },
	    paging: {
	    	enabled: false,
		},
		sorting: {
			mode: 'none',
		},
		selection: {mode: 'multiple',showCheckBoxesMode:'always',},
		columns:[{dataField: 'EDC_PRGMNM',caption: '강좌명'},
				 {dataField: 'EDC_FREETIME_REG_YN',caption: '자유이용시간표설정여부',
					visible:false,
					width:100,
					lookup: {
						dataSource:[
							{text: "", value: "1"},
							{text: "설정없음", value: "0"},
						],
						displayExpr: "text",
						valueExpr: "value"
				},
			},
			{dataField: 'EDC_DAYS',width:100,caption: '요일',}
		],
		onFocusedRowChanged(e) {
			const focusedRowKey = e.component.option('focusedRowKey');
		    selectedRowIndex = e.rowIndex;
	    	 //editorSetRow(e.row.data);
		},
		onToolbarPreparing(e) {
	         const dataGrid = e.component;
	         e.toolbarOptions.items.push(
	         		 {
	         			 location: 'after',
	         			 widget: 'dxButton',
	         			 options: {
	         				 	icon: 'refresh',
	         				 	onClick() {
	         				 		treeCategory.refresh();
	         				 	},
	         			 },
	         		 },
	         		
	         );
		},
		 onRowPrepared(e){
			if (e.rowType === "data") {
				if(e.data.EDC_FREETIME_REG_YN === "0"){
					e.rowElement.css("background-color", "#ffe0e0");  
				}
			}
	    },
	});
}
function batchFreeTimeEditForm(){
	
	var customItems=[];
	
	
	customItems.push({itemType:'group',caption:'',colCount:2,
				items:[	
			    	{label: {text:'발권위치'},editorType:'dxSelectBox',
			    		editorOptions:{
			    			readOnly:true,
			    			dataSource:key_place_gbn, valueExpr: 'value',displayExpr: 'text',value: '0',}
			    	},
			    	{label: {text:'전자키이용타임설정'},editorType:'dxSelectBox',
			    		editorOptions:{
			    			readOnly:true,
			    			dataSource:key_time_gbn, valueExpr: 'value',displayExpr: 'text',value: '1',}
			    	},
		    	]
	    	}
	);
	
	
	for (let i = 0; i < FREE_SCHEDULE2.length; i += 1) {
		var isHoliday = (FREE_SCHEDULE2[i].group_weekdays && FREE_SCHEDULE2[i].group_weekdays.find(item => item=='7')) ?true:false; //공휴일
		var isWeekdays = (FREE_SCHEDULE2[i].group_weekdays &&  FREE_SCHEDULE2[i].group_weekdays.filter(item => item>='0' && item<'7')).length==0 ? false:true;	
		if(isHoliday){
			holiday_index=i;
		}
		if(isHoliday && isWeekdays==false) continue;
		customItems.push(generateGroupDataGrid(i));
	}
	return $("<div id='batchFreeTimeForm'>").dxForm({
		showColonAfterLabel: false,
		//formData: frmCondition,
		items:customItems
	});
}

function generateGroupDataGrid(index) {
	var groupId= "group_"+FREE_SCHEDULE2[index].group_id;
	var groupName=FREE_SCHEDULE2[index].group_name  + ' (' + getWeektoHangul(FREE_SCHEDULE2[index].group_weekdays)+')';
	var isHoliday = (FREE_SCHEDULE2[index].group_weekdays && FREE_SCHEDULE2[index].group_weekdays.find(item => item=='7')) ?true:false; //공휴일
	var isWeekdays = (FREE_SCHEDULE2[index].group_weekdays &&  FREE_SCHEDULE2[index].group_weekdays.filter(item => item>='0' && item<'7')).length==0 ? false:true;	

	var tagBoxValue=getWeektoArray(FREE_SCHEDULE2[index].group_weekdays);
	
    return {
      template: function(){
    	  return $("<div id='"+groupId+"'>")
  		.dxDataGrid({
  			 dataSource: FREE_SCHEDULE2[index].times,
  			    keyExpr: 'time_id',
  			    allowColumnReordering: false,
  			    showBorders: true,
  			    sorting: {
  			      mode: 'none',
  			    },
  			    grouping: {
  			    	autoExpandAll: true,
  			    },
  			    paging: {
  				      enabled: false,
  				},
  			    searchPanel: {
  			      visible: false,
  			    },
  			    editing: {
  			      allowUpdating: true, 
  			      mode: 'cell' 
  			    },
  			    groupPanel: {
  			      visible: false,
  			    },
  			   selection: {mode: 'multiple',showCheckBoxesMode:'always',},
  			    columns: [
  			    	{
  			    		dataField:'time_name',
  			    		caption:'회차명',
  			    		allowEditing:false,
  			    	},
  			    	{
			    		dataField:'time_weekdays',
			    		caption:'요일',
			    		showEditorAlways: true,
			    		width:250,
						editCellTemplate: function(cellElement, cellInfo) {
			                $("<div />").dxTagBox({
								dataSource: tagBoxValue,
								displayExpr: 'text',
								valueExpr: 'value',
			                    value: cellInfo.value,
			                    showSelectionControls: true,
			                    //applyValueMode: 'useButtons',
			                    onValueChanged: function(e) {
			                    	 cellInfo.setValue(e.value);
			                    }
			                }).appendTo(cellElement);
			            	}
	  			    	},
  			    	{
  			    		showEditorAlways: true,
  			    		caption: '시작시간',
  			    		dataField: 'time_start',
  			    		editorType: 'dxDateBox',
  	                    editorOptions: {
  	                        type: 'time',
  	                        interval: 10,
  	                        displayFormat: 'HH:mm',
  	                        onInitialized:timePickerInitialized
  	                    },
  	                    validationRules: [{ type: "required" }]
  			    	},
  			    	{
  			    		showEditorAlways: true,
  				  		caption: '종료시간',
  				  		dataField: 'time_end',
  				  		editorType: 'dxDateBox',
  	                    editorOptions: {
  	                        type: 'time',
  	                        interval: 10,
  	                        displayFormat: 'HH:mm',
  	                        onInitialized:timePickerInitialized
  	                    },
  	                    validationRules: [{ type: "required" }]
  			    	},
  			    	,{
  			    		caption:'공휴일(대체)',visible: !isHoliday,
  			    		columns:[
  			    		{dataField: 'time_h_yn',caption: '사용',dataType: 'boolean'},
	  			    	{
	  			    		showEditorAlways: true,
	  			    		caption: '시작시간',
	  			    		dataField: 'time_hstart',
	  			    		editorType: 'dxDateBox',
	  	                    editorOptions: {
	  	                    	elementAttr:{class:'timeReadOnly'},
	  	                    	type: 'time',
	  	                        interval: 10,
	  	                        displayFormat: 'HH:mm',
		  	                    onInitialized:timePickerInitialized
	  	                    },
	  	                    /*setCellValue: function (newData, value) {
	                          this.defaultSetCellValue(newData, value);
	  	                    },*/
	  			    	},
	  			    	{
    			    		showEditorAlways: true,
	  				  		caption: '종료시간',
	  				  		dataField: 'time_hend',
	  				  		editorType: 'dxDateBox',
	  	                    editorOptions: {
	  	                    	elementAttr:{class:'timeReadOnly'},
	  	                        type: 'time',
	  	                        interval: 10,
	  	                        displayFormat: 'HH:mm',
	  	                        onInitialized:timePickerInitialized
	  	                    },
	  	                   /* setCellValue: function (newData, value) {
	                          this.defaultSetCellValue(newData, value);
	  	                    },*/
	  			    	},
	  			    	]
  			    	}
  			    	
  			    ],
  			     onEditingStart(e) {
  					if(e.column.dataField=='time_hstart' || e.column.dataField=='time_hend'){
  						e.cancel=!e.data.time_h_yn;
  					}
  				},
	  			onEditorPrepared(e) {  
	  			       if (e.parentType == 'dataRow' && e.dataField == 'time_h_yn' ) {  
	  			           e.editorElement.dxCheckBox('instance').option('onValueChanged', args => {  
	  			        	   //console.log(e);
	  			        	   //console.log(args);
	  			        	   e.setValue(args.value);
	  			        	   if(args.value){
	  			        		  if(holiday_index ==-1 ){
		  			        		   DevExpress.ui.dialog.alert('공휴일 시간표를 등록 해주세요', "자유수영시간표");
		  			        		   return;
		  			        	   }
	  			        		   createSelectHolidayTimePopup($("#batchFreeTime_Holiday_Popup"), e, setHolidayTime);
	  			        	   }
	  			           });  
	  			       } 
	  			} ,
  			    onToolbarPreparing(e) {
  				      const dataGrid = e.component;
  				      //e.toolbarOptions.visible = false;  
  				      var toolbarItems = e.toolbarOptions.items;  
  				      $.each(toolbarItems, function (_, item) {  
  						        if (item.name == "saveButton" || item.name == "revertButton" ) { 
  						            item.visible = false;  
  						        }  
  					  });
  				    e.toolbarOptions.items.push({
  			        	location: 'before',
  			        	template: $('<div style="font-weight:700;margin-left:10px;">').append(groupName),
  			        },);
  				      
  			    }
  		})
    	  
      }
      
    };
  }


function setHolidayTime(target,selectedRow){
	target.component.cellValue(target.row.rowIndex, "time_hstart", selectedRow.time_start);  
	target.component.cellValue(target.row.rowIndex, "time_hend", selectedRow.time_end);

}
//자유수영시간표 선택
function CreateSelectFreeTime()
{
	if(batchFreeTimePopup){
		batchFreeTimePopup=null;
		$("#batchFreeTime_Popup").dxPopup("dispose");
		
	}
	batchFreeTimePopup=$("#batchFreeTime_Popup").dxPopup({
		contentTemplate: selectFreeTimeTemplate,
		visible: true,
		title: '자유이용시간 설정',
		width:900,
        height:650,
		position: {
			my: 'center',
		    at: 'center',
		    of: window
		},
		dragEnabled: true,
		onShown(){
			/*$('.centerlist').dxList({
				dataSource: centers,
			    displayExpr: 'text',
			    valueExpr: 'value',
			    selectionMode: 'single',
			    scrollingEnabled:true,
			});*/
		},
		toolbarItems: [{
			widget: 'dxButton',
			toolbar: 'bottom',
		    location: 'after',
		    options: {
			    	text: '저장',
			        onClick() {
			    		//****공휴일은 안됨! 
			    		/*const message = `Email is sent to ${employee.FirstName} ${employee.LastName}`;
			    		DevExpress.ui.notify({
				            message,
				            position: {
				            	my: 'center top',
				            	at: 'center top',
				            },
			    		}, 'success', 3000);*/
			    	},
			    },
		}, {
			widget: 'dxButton',
			toolbar: 'bottom',
		    location: 'after',
		    options: {
			    	text: '취소',
			        onClick() {
			    		batchFreeTimePopup.hide();
			    		batchFreeTimePopup=null;
			    		$("#batchFreeTime_Popup").dxPopup("dispose");
			    	},
			    },
		}],
	}).dxPopup('instance');
}
const selectFreeTimeTemplate = function () {
	
	 const content = $("<div />");
	 content.append(
			 $("<div id='batchFreeTimeMainForm'>").dxForm({
				    showColonAfterLabel: false,
				    labelMode:'hidden',
				    items:[
				    	{
				    		cssClass:"style3_right",
				    		template: batchFreeTimeEditForm2
				    	}				    	
				    ],
				}),
				
	  );
    return content;
};

function batchFreeTimeEditForm2(){
	
	var customItems=[];
	
	for (let i = 0; i < FREE_SCHEDULE2.length; i += 1) {
		var isHoliday = (FREE_SCHEDULE2[i].group_weekdays && FREE_SCHEDULE2[i].group_weekdays.find(item => item=='7')) ?true:false; //공휴일
		var isWeekdays = (FREE_SCHEDULE2[i].group_weekdays &&  FREE_SCHEDULE2[i].group_weekdays.filter(item => item>='0' && item<'7')).length==0 ? false:true;	
		if(isHoliday){
			holiday_index=i;
		}
		if(isHoliday && isWeekdays==false) continue;
		customItems.push(generateGroupDataGrid(i));
	}
	return $("<div id='batchFreeTimeForm'>").dxForm({
		showColonAfterLabel: false,
		//formData: frmCondition,
		items:customItems
	});
}