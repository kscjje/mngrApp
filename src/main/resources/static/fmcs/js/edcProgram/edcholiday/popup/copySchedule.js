//휴관일 복사
let copyHolidayPopup=null;
let frmCopyPrg=null
let batchEduGrid=null;
let storeHoliday = new DevExpress.data.ArrayStore({
	key: 'EDC_PRGMID',
    data: waitPrgs,
});
let formCopyConditionData={
		EDC_PRGMNM:'',
		HOLIDAY_TYPE:0,
		HOLIDAY_LTYPE:[1],
		SRCH_SDT:toDateFormat(new Date()),
		SRCH_EDT:moment().endOf('month').format('YYYY-MM-DD'),
		SEARCH_TYPE_2:'0',
}
function CreateCopySchForm()
{
	if(copyHolidayPopup){
		copyHolidayPopup=null;
		$("#copySch_Popup").dxPopup("dispose");
		
	}
	copyHolidayPopup=$("#copySch_Popup").dxPopup({
		contentTemplate: copyHolidayTemplate,
		visible: true,
		title: '강좌휴관일일정 복사',
		width:900,
        height:900,
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
			    	text: '복사',
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
			    		copyHolidayPopup.hide();
			    		copyHolidayPopup=null;
			    		$("#copySch_Popup").dxPopup("dispose");
			    	},
			    },
		}],
	}).dxPopup('instance');
}

const copyHolidayTemplate = function () {
	
	 const content = $("<div />");
	 
	 content.append(
			 $("<div id='copyHolidayMainForm'>").dxForm({
				 formData:formCopyConditionData,
				 colCount: 1,
				 showColonAfterLabel: false,
				    //labelMode:'hidden',
				 onInitialized:function(e){
					 frmCopyPrg = e.component;
				 },
				 onFieldDataChanged: function (e) {
						if(e.dataField=='HOLIDAY_TYPE' ){ 
							//e.component.getEditor("HOLIDAY_LTYPE").option('disabled', e.value==0?true:false);
							e.component.getEditor("EDC_PRGMNM").option('disabled', e.value==0?true:false);
						}
				 },				 
				 items:[
					{itemType:'group',caption:'원본 일정 선택',colCount:3,
	    				items:[
		    			{dataField:'SRCH_SDT',label:{text:'기간'},
		    				editorType:"dxDateBox",
		    				editorOptions: { displayFormat: 'yyyy-MM-dd',},
		    			},
				    	{dataField:'SRCH_EDT',label:{text:'~'},
		    				editorType:"dxDateBox",
		    				editorOptions: {displayFormat: 'yyyy-MM-dd',},
				    	},
				    	{itemType:'empty'},
		    			
						{colSpan:3,dataField:'EDC_PRGMNM',label:{text:'강좌명'},
		    				editorOptions: {disabled:true,readOnly:true},
						}
						]
	    			},
					
	    			{itemType:'group',caption:'대상 강좌 선택',colCount:6,
	    				items:[
		    			{colSpan:2,dataField: 'SEARCH_TYPE_1',label:{visible:false},editorType: 'dxSelectBox',
				    		editorOptions: {  
				    			dataSource:category_gbn,
				    			valueExpr: 'value', 
				    			displayExpr: 'text',
				    			value: '0',
				    		},
				       },
				       {colSpan:4,dataField: 'CATEGORY_DROPDOWN',label:{visible:false},
				       		template: function (data, itemElement) {
							var ctgType='0';
							var initValue = data.component.option('formData')[data.dataField];
							itemElement.append( 
								createCategoryDorpdownTreeTemplateCreate('treeCtgCdS','multiple',ctgType,initValue)
							);
						},
				       },
				       {	colSpan:2,
							dataField: 'SEARCH_TYPE_2',
							label:{visible:false},
							editorType: 'dxSelectBox',
							editorOptions:
							{
								dataSource:week_gubn,
								 valueExpr: 'value', displayExpr: 'text',
								 placeholder:'강좌요일',
								 onValueChanged(data) {
									 WeekSelectBoxValueChange(frmCopyPrg,data.value);
								 },
							}, 
						},
						{itemType:'group',colSpan:4,colCount:7,cssClass:'grp_low_height',
						items:[
							{dataField:'SRCH_MON',label:{visible:false},editorType: 'dxCheckBox',editorOptions: {value: true,text: '월',}},
							{dataField:'SRCH_TUE',label:{visible:false},editorType: 'dxCheckBox',editorOptions: {value: true,text: '화',}},
							{dataField:'SRCH_WED',label:{visible:false},editorType: 'dxCheckBox',editorOptions: {value: true,text: '수',}},
							{dataField:'SRCH_THU',label:{visible:false},editorType: 'dxCheckBox',editorOptions: {value: true,text: '목',}},
							{dataField:'SRCH_FRI',label:{visible:false},editorType: 'dxCheckBox',editorOptions: {value: true,text: '금',}},
							{dataField:'SRCH_SAT',label:{visible:false},editorType: 'dxCheckBox',editorOptions: {value: true,text: '토',}},
							{dataField:'SRCH_SUN',label:{visible:false},editorType: 'dxCheckBox',editorOptions: {value: true,text: '일',}},]
						}, 
						{colSpan:5,dataField: 'SEARCH_KEYWORD',
							label:{visible:false},
							editorOptions:{
								inputAttr: {class: "srchkeyword"},
								width: '100%',
								placeholder:'검색할 강좌명 입력',
							}
						},	
						{
							cssClass:'text-align-right',
							template : function(cellInfo,container) {
								 container.append($('<div>').dxButton({
									 useSubmitBehavior: true,
								        stylingMode: 'contained',
										icon: 'find',
										type: 'default',
										elementAttr: {
											class: "margin-right-10"
										},
										onClick() {
											var msg='';
											DevExpress.ui.notify('조회 ' + msg);
										},
					             }));
								 
								 container.append($('<div>').dxButton({
									 useSubmitBehavior: true,
								        stylingMode: 'contained',
										icon: 'clear',
										type: 'default',
										onClick() {
											var msg='';
											DevExpress.ui.notify('refresh ' + msg);
										},
					             }));
							}
						},
						{
						   cssClass:"style3_right",
						   colSpan:6,
						   template: targetEduPrg
						}
						]}
				   ],
			 }),
	  );

     return content;
     
 };


 
function targetEduPrg(){
	return $("<div id='batchEduGrid'>").dxDataGrid({
		dataSource: storeWaitPrgs,
		height:380,
		showBorders: true,
		allowColumnReordering: true,
	    allowColumnResizing: true,
	    columnFixing: {enabled: true,},
	    columnChooser: {enabled: true,allowSearch: true,},
	    focusedRowEnabled: true,
		focusedRowIndex: 0,
		searchPanel: {
			visible: false,
	        placeholder: 'Search...',
	    },
	    paging: {
	    	enabled: false,
		},
		selection: {mode: 'multiple',showCheckBoxesMode:'always',},
		columns:[
			{dataField: 'EDC_PLACENM',caption: '분류명',width:100, fixed: true,alignment: 'center'},
			{dataField: 'EDC_PRGMNM',caption: '강좌명', fixed: true,},
			{dataField: 'EDC_DAYS',caption: '강좌요일',width:110,alignment: 'center'},
			{caption: '강좌시간',
				columns: [
					{dataField: 'EDC_STIME',caption: '시작',width:60,alignment: 'center'},
					{dataField: 'EDC_ETIME',caption: '종료',width:60,alignment: 'center'},
				]	
			},
			{dataField: 'INSTRCTR_NAME',caption: '강사명',width:80, fixed: true,},
		],
		onFocusedRowChanged(e) {
			const focusedRowKey = e.component.option('focusedRowKey');
		    selectedRowIndex = e.rowIndex;
	    	 //editorSetRow(e.row.data);
		},
	/*	onToolbarPreparing(e) {
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
		},*/
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
	return $("<div id='gridTarget'>").dxDataGrid({
		allowColumnResizing: true,
	    columnAutoWidth: true,
	    showBorders: true,
	    columnChooser: {
	    	enabled: true,
	    	allowSearch: true,
	    	location: 'before',
	    },
	    dataSource: storeWaitPrgs,
	    searchPanel: {
	    	visible: true,	
		    placeholder: 'Search...',
		    inputAttr: { 'autocomplete': 'off' }  
	    },
	    selection: {mode: 'multiple',showCheckBoxesMode:'always',},
	    columns: createColumnsList(),
	    showBorders: true,
	    onContentReady(e) {
	        if (!e.component.getSelectedRowKeys().length) {
	        	e.component.selectRowsByIndexes(0); 
	        }
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
              				 		//gridInstructor.refresh();
              				 	},
              			 },
              		 }
              );
             
	    },//ontoolbar     	
	}
	);
}

