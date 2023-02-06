//자유이용시간
var tab7Form=null;
var tab7Grid=null;
function CreateTab7Init()
{
	for (let i = 0; i < FREE_SCHEDULE2.length; i += 1) {
		var isHoliday = (FREE_SCHEDULE2[i].group_weekdays.find(item => item==7)) ?true:false; //공휴일
		if(isHoliday){
			holiday_index=i;
			break;
		}
	}
	
	if(tab7Form!=null) return;
	tab7Form = $('#tab7 .tab_contents').dxForm({
		showColonAfterLabel: false,
		//formData: frmCondition,
		colCount:10,
		items: [
			{itemType:'group',colSpan:2,items:[
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
			]},
			{
	    		colSpan:7,
	    		label: {visible:false},
	    		template: function (data, itemElement){gridFreeScheduleTemplate(data, itemElement);},
	    	},
			{	  
			
			    itemType: 'button',
			    buttonOptions: {
			        text: '저장하기',
			        type: 'success',
			        useSubmitBehavior: true,
			    },
			},
	    	
		],
	}).dxForm("instance");	

	//$("#saveBtn7").dxButton({text: '저장하기',type: 'success',	});
}

function  gridFreeScheduleTemplate(data, itemElement) {
	itemElement.append( $("<div id='gridFreeSchedule'>")
		.dxDataGrid({
			 dataSource: FREE_SCHEDULE3,
			    keyExpr: 'APP_SEQ',
			    allowColumnReordering: false,
			    showBorders: true,
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
			      allowDeleting: true,
			      useIcons: true,
			      mode: 'cell' 
			    },
			    groupPanel: {
			      visible: false,
			    },
			   selection: {mode: 'single'},
			    columns: [
			    	{
			    		dataField:'EDC_DAYGBN',
			    		caption:'요일',
			    		showEditorAlways: true,
			    		width:150,
			    		editorType: 'dxSelectBox',
			    		editorOptions: {
			    			dataSource:[{text:'일',value:'0'},
			    				{text:'월',value:'1'},
			    				{text:'화',value:'2'},
			    				{text:'수',value:'3'},
			    				{text:'목',value:'4'},
			    				{text:'금',value:'5'},
			    				{text:'토',value:'6'},
			    				],
			    			valueExpr: 'value',
			    			displayExpr: 'text',},
			    	},
			    	{
  			    		showEditorAlways: true,
  			    		caption: '시작시간',
  			    		dataField: 'STIME',
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
  				  		dataField: 'ETIME',
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
  			    		caption:'공휴일(대체)',
  			    		columns:[
  			    		{dataField: 'HLDY_USE_YN',caption: '사용',dataType: 'boolean',},
	  			    	{
	  			    		showEditorAlways: true,
	  			    		caption: '시작시간',
	  			    		dataField: 'HLDY_STIME',
	  			    		editorType: 'dxDateBox',
	  	                    editorOptions: {
	  	                    	elementAttr:{class:'timeReadOnly'},
	  	                    	type: 'time',
	  	                        interval: 10,
	  	                        displayFormat: 'HH:mm',
		  	                    onInitialized:timePickerInitialized
	  	                    },
	  			    	},
	  			    	{
    			    		showEditorAlways: true,
	  				  		caption: '종료시간',
	  				  		dataField: 'HLDY_ETIME',
	  				  		editorType: 'dxDateBox',
	  	                    editorOptions: {
	  	                    	elementAttr:{class:'timeReadOnly'},
	  	                        type: 'time',
	  	                        interval: 10,
	  	                        displayFormat: 'HH:mm',
	  	                        onInitialized:timePickerInitialized
	  	                    },
	  			    	},
	  			    	]
  			    	}
			    ],
			    onEditingStart(e) {
			    	/*if(e.data.EDC_DAYGBN=='0'||e.data.EDC_DAYGBN=='6'||e.data.EDC_DAYGBN=='7'){
			    		if(e.column.dataField=='HLDY_USE_YN' || e.column.dataField=='HLDY_STIME' || e.column.dataField=='HLDY_ETIME'){
			    			e.cancel=true;
			    		}
						return;
			    	}*/
  					if(e.column.dataField=='HLDY_STIME' || e.column.dataField=='HLDY_ETIME'){
  						e.cancel=!e.data.HLDY_USE_YN;
  						//console.log('editing');
  						//console.log(e);
  					}
  				},
	  			onEditorPrepared(e) {  
	  			       if (e.parentType == 'dataRow' && e.dataField == 'HLDY_USE_YN' ) {  
	  			           e.editorElement.dxCheckBox('instance').option('onValueChanged', args => {  
	  			        	   //console.log('change');
	  			        	   //console.log(e);
	  			        	   //console.log(args);
	  			        	   e.setValue(args.value);
	  			        	   
	  			        	   if(args.value){
	  			        		 if(holiday_index ==-1 ){
		  			        		   DevExpress.ui.dialog.alert('공휴일 시간표를 등록 해주세요', "자유수영시간표");
		  			        		   return;
		  			        	   }
	  			        		 createSelectHolidayTimePopup($("#batchFreeTime_Holiday_Popup"), e, setHolidayTime2);
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
				      e.toolbarOptions.items.push(
	              		 {
	              			location: 'after',
	            			  widget: 'dxButton',
	            			  cssClass:'functionbtn',
	            			  options: {
	            				  text:'자유이용시간표 선택',
	            				  onClick() {
	            					  CreateSelectFreeTime();
	            					  /*var grid = $('#gridEduUser').dxDataGrid("instance");
	        			    		  var data = grid.getSelectedRowsData();
	        			    		  if (data && data.length>0) {
	        			    			  var cloneData = JSON.parse(JSON.stringify(data[0]));
	        			    		  }*/
	            					  
	            				  },
	            			  },
	              		 }
			          );
			    }
	})); 
}
function setHolidayTime2(target,selectedRow){
	target.component.cellValue(target.row.rowIndex, "HLDY_STIME", selectedRow.time_start);  
	target.component.cellValue(target.row.rowIndex, "HLDY_ETIME", selectedRow.time_end);
}