//강좌접수인원현황
let storeRegCapacity=null;
let treeView=null;
var frmCondition ={
		SEARCH_TYPE_TERM:'0',
		SEARCH_DATE_EDU:'',
		SEARCH_DATE_START:'',
		SEARCH_DATE_END:'',
		SEARCH_TYPE1:'0',
		SEARCH_TYPE2:'0',
		SEARCH_TYPE3:'0',
		CATEGORY_DROPDOWN:[],
}
function formInit()
{
	createCondition(); //조회 항목 생성
	createRegUserCapacity();//하단 - 강좌 목록
}
function createCondition(){
	const now = new Date();
		$('#regCapacityCondition').dxForm({
		    colCount:7,
		    showColonAfterLabel: false,
		    formData: frmCondition,
		    width:'80vw',
		    items: [
		    	{dataField: 'SEARCH_TYPE_TERM',label:{visible:false},editorType: 'dxSelectBox',
		    		editorOptions: {  
		    			dataSource:[{value:'0',text:'강좌년월'},{value:'1',text:'접수기간'}],
		    			valueExpr: 'value', 
		    			displayExpr: 'text',
		    			onValueChanged: function(e) {
		    				var formInstance = $("#regCapacityCondition").dxForm("instance");
		    				if(e.value == '0'){
		    					formInstance.option('colCount',7);
		    					formInstance.itemOption("SEARCH_DATE_EDU", "visible", true);
		    					formInstance.itemOption("SEARCH_DATE_START", "visible", false);
		    					formInstance.itemOption("SEARCH_DATE_END", "visible", false);
		    				}else{
		    					formInstance.option('colCount',8);
		    					formInstance.itemOption("SEARCH_DATE_EDU", "visible", false);
		    					formInstance.itemOption("SEARCH_DATE_START", "visible", true);
		    					formInstance.itemOption("SEARCH_DATE_END", "visible", true);
		    				}
		    			}
		    		},
		    	},
		    	{dataField:'SEARCH_DATE_EDU',label:{visible:false},editorType: 'dxDateBox'
		    		, editorOptions: {value: now, displayFormat: 'yyyy-MM',
		    	        calendarOptions:{
		    	            maxZoomLevel: 'year', 
		    	            minZoomLevel: 'century', 
		    	        }	
		    		}
				 },
		    	{dataField:'SEARCH_DATE_START', visible:false, label:{visible:false},editorType: 'dxDateBox'
		    		, editorOptions: {value: now, width: "100%", displayFormat: 'yyyy-MM-dd'}
				},
		    	
				 {dataField:'SEARCH_DATE_END', visible:false, label:{text:'~'},editorType: 'dxDateBox'
					 , editorOptions: {value: now, width: "100%", displayFormat: 'yyyy-MM-dd'}
				 },
		    	
		    	{dataField: 'SEARCH_TYPE1',label:{visible:false},editorType: 'dxSelectBox',
		    		editorOptions: {  
		    			dataSource:category_gbn,
		    			valueExpr: 'value', 
		    			displayExpr: 'text',
		    			value: '0',
		    			onValueChanged: function(e) {
		    				var formInstance= $("#regUsers-condition").dxForm("instance");
		    				
		    				//e.selectedItem.value == "0"

		    				//$('#treeCtgCdS').dxDropDownBox('option', 'dataSource');
		    				//$('#categoryTree').dxTreeView('option', 'dataSource');  
		    				  
		    			}
		    		},
		       },
		       {colSpan:2,dataField: 'CATEGORY_DROPDOWN',label:{visible:false},
		       		template: function (data, itemElement) {
					var ctgType='0';
					var initValue = data.component.option('formData')[data.dataField];
					itemElement.append( 
						createCategoryDorpdownTreeTemplateCreate('treeCtgCdS','multiple',ctgType,initValue)
					);
				},
		       },
		       {dataField: 'SEARCH_TYPE2',label:{text:'강좌운영여부'},editorType: 'dxSelectBox',
		    		editorOptions: {  
		    			dataSource:run_gbn,
		    			valueExpr: 'value', 
		    			displayExpr: 'text',
		    			value: '1',
		    			onValueChanged(data) {
		    			},
		    		},
		       },
		       {dataField: 'SEARCH_TYPE3',label:{visible:false},editorType: 'dxSelectBox',
		    		editorOptions: {  
		    			dataSource:capacitystus_gbn,
		    			valueExpr: 'value', 
		    			displayExpr: 'text',
		    			value: '0',
		    			onValueChanged(data) {
		    			},
		    		},
		       },
		    ]
		});
	$('#searchBtn').dxButton({
		stylingMode: 'contained',
		icon: 'find',
		type: 'default',
		onClick() {
			var msg='';
			DevExpress.ui.notify('조회 ' + msg);
		},
	});
	$('#searchInitBtn').dxButton({
		stylingMode: 'contained',
		icon: 'clear',
		type: 'default',
		elementAttr: {
			class: "btnRefresh"
		},
		onClick() {
			DevExpress.ui.notify('초기화');
		},
	});
}
const regCapacitys=[
	{COMCD: 2,
	CTGCD: '0005',
	EDC_PRGMID:'001',
	INSTRCTR_NAME:'강사명2',	
	EDC_STATUS:'접수준비',
	EDC_PRGMNM:'16시 아동1반 초급[월화수목]',
	EDC_PRGMNM_CHASU:'1분기',
	USE_YN:'1',
	EDC_DAYS:'월,화,수,목',
	SORT_ORDER:1,
	EDC_STIME:'16:00',
	EDC_ETIME:'17:00',
	EDC_PNCPA_YN:'0',
	EDC_PNCPA:20,
	EDC_VPNCPA:5,
	EDC_OPNCPA:15,
	TOT_VREG_CNT:5,
	TOT_OREG_CNT:12,
	TOT_REG_CNT:17,
	TOT_STOP_CNT:2,
	TOT_CUR_CNT:15,
	TOT_WAIT_CNT:2,
	RE_REG_VCNT:4,
	RE_REG_OCNT:9,
	RE_REG_CNT:13,
	NEW_REG_VCNT:1,
	NEW_REG_OCNT:3,
	NEW_REG_CNT:4,
	NOKORI_CNT:3,
	VNOKORI_CNT:0,
	ONOKORI_CNT:3,
	},
	{COMCD: 2,
		CTGCD: '0005',
		EDC_PRGMID:'002',
		INSTRCTR_NAME:'강사명2',	
		EDC_STATUS:'접수준비',
		EDC_PRGMNM:'16시 아동1반 초급[월화수목]',
		EDC_PRGMNM_CHASU:'',
		USE_YN:'1',
		EDC_DAYS:'월,화,수,목',
		SORT_ORDER:1,
		EDC_STIME:'16:00',
		EDC_ETIME:'17:00',
		EDC_PNCPA_YN:'0',
		EDC_PNCPA:20,
		EDC_VPNCPA:5,
		EDC_OPNCPA:15,
		TOT_VREG_CNT:5,
		TOT_OREG_CNT:12,
		TOT_REG_CNT:17,
		TOT_STOP_CNT:2,
		TOT_CUR_CNT:15,
		TOT_WAIT_CNT:2,
		RE_REG_VCNT:4,
		RE_REG_OCNT:9,
		RE_REG_CNT:13,
		NEW_REG_VCNT:1,
		NEW_REG_OCNT:3,
		NEW_REG_CNT:4,
		NOKORI_CNT:3,
		VNOKORI_CNT:0,
		ONOKORI_CNT:3,
		},
];
function createRegUserCapacity(){
	storeRegCapacity = new DevExpress.data.ArrayStore({
		key: 'EDC_PRGMID',
	    data: regCapacitys,
	});
	//repaintChangesOnly:true,
	$('#gridEdu').dxDataGrid({
		export: {enabled: true},
		allowColumnReordering: true,
	    allowColumnResizing: true,
	    columnAutoWidth: true,
	    showBorders: true,
	    columnChooser: {
	    	enabled: true,
	    	allowSearch: true,
	    	location: 'before',
	    },
		/*focusedRowEnabled: true,
		focusedRowIndex: 0,*/
	    dataSource: storeRegCapacity,
	    searchPanel: {
	    	visible: true,	
		    placeholder: 'Search...',
		    inputAttr: { 'autocomplete': 'off' }  
	    },
	    columns: createColumnsList(),
	    summary: {  
	    	texts:{sum:"{0}"},
	        totalItems: [
	        	{column: 'EDC_PNCPA',summaryType: 'sum' , valueFormat:def_numberFormat}, 
	        	{column: 'EDC_VPNCPA',summaryType: 'sum'}, 
	        	{column: 'EDC_OPNCPA',summaryType: 'sum'}, 
	        	{column: 'TOT_REG_CNT',cssClass:'cell-highlight',summaryType: 'sum'},
	        	{column: 'TOT_STOP_CNT',summaryType: 'sum'},
	        	{column: 'TOT_CUR_CNT',summaryType: 'sum'},
	        	{column: 'TOT_WAIT_CNT',summaryType: 'sum'},
	        	{column: 'RE_REG_VCNT',summaryType: 'sum'},
	        	{column: 'RE_REG_OCNT',summaryType: 'sum'},
	        	{column: 'RE_REG_CNT',cssClass:'cell-highlight',summaryType: 'sum'},
	        	{column: 'NEW_REG_VCNT',summaryType: 'sum'},
	        	{column: 'NEW_REG_OCNT',summaryType: 'sum'},
	        	{column: 'NEW_REG_CNT',cssClass:'cell-highlight',summaryType: 'sum'},
	        	{column: 'NOKORI_CNT' ,cssClass:'cell-highlight',summaryType: 'sum',valueFormat:def_numberFormat},
			]  
	    },  
	    showBorders: true,
	    onContentReady(e) {
	        if (!e.component.getSelectedRowKeys().length) {
	        	e.component.selectRowsByIndexes(0); 
	        }
	    },
	   
	    onToolbarPreparing(e) {
              const dataGrid = e.component;
          
             /* e.toolbarOptions.items.push(
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
              );*/
              e.toolbarOptions.items.push(
            		  {
            			  location: 'after',
            			  widget: 'dxButton',
            			  cssClass:'functionbtn',
            			  options: {
            				  text:'잔여인원변경',
            				  onClick() {
            					  var grid = $('#gridEdu').dxDataGrid("instance");
        			    		  var data = grid.getSelectedRowsData();
        			    		  if (data && data.length>0) {
        			    			  var cloneData = JSON.parse(JSON.stringify(data[0]));
        			    			  CreateChangeCapcityPopup(cloneData);
        			    		  }
            					  
            				  },
            			  },
            		  }
	          );
	    },//ontoolbar     
	});
}

//---------------------------------
//강좌 요금 목록-datagrid columns 생성 
//---------------------------------
function createColumnsList() 
{
	var resultColumns = {};
	
	resultColumns = [
		{dataField: 'EDC_PLACENM',caption: '종목',width:150, fixed: true,alignment: 'center'},
		{dataField: 'EDC_STATUS',caption: '상태',width:90, fixed: true,alignment: 'center'},
		{dataField: 'EDC_PRGMNM',caption: '강좌명',width:200, fixed: true,},
		{dataField: 'EDC_PRGMNM_CHASU',caption: '모집차수',width:100, fixed: true,},
		{dataField: 'INSTRCTR_NAME',caption: '강사명',width:80,alignment: 'center'},
		{dataField: 'EDC_DAYS',caption: '강좌요일',width:100,alignment: 'center'},
		{dataField: 'EDC_STIME',caption: '강좌시작시간',width:80,alignment: 'center'},
		{dataField: 'EDC_ETIME',caption: '강좌종료시간',width:80,alignment: 'center'},
		{
			caption: '정원',
			columns: [
				{dataField: 'EDC_VPNCPA',caption: '방문',width:73, dataType: "number", format: def_numberFormat},
				{dataField: 'EDC_OPNCPA',caption: '온라인',width:73, dataType: "number", format: def_numberFormat},
				{dataField: 'EDC_PNCPA',caption: '총정원',width:73, dataType: "number", format: def_numberFormat},
			]
		},
		{dataField: 'TOT_REG_CNT',caption: '총접수인원',cssClass:'cell-highlight',width:73, dataType: "number", format: def_numberFormat},
		{dataField: 'TOT_STOP_CNT',caption: '휴회인원',width:73, dataType: "number", format: def_numberFormat},
		{dataField: 'TOT_CUR_CNT',caption: '현재원',width:73, dataType: "number", format: def_numberFormat},
		{dataField: 'TOT_WAIT_CNT',caption: '등록대기인원',width:80, dataType: "number", format: def_numberFormat},
		{
			caption: '재등록',
			columns: [
				{dataField: 'RE_REG_VCNT',caption: '방문',width:73, dataType: "number", format: def_numberFormat},
				{dataField: 'RE_REG_OCNT',caption: '온라인',width:73, dataType: "number", format: def_numberFormat},
				{dataField: 'RE_REG_CNT',caption: '소계',cssClass:'cell-highlight',width:70, dataType: "number", format: def_numberFormat},
			]
		},
		{
			caption: '신규등록',
			columns: [
				{dataField: 'NEW_REG_VCNT',caption: '방문',width:73, dataType: "number", format: def_numberFormat},
				{dataField: 'NEW_REG_OCNT',caption: '온라인',width:73, dataType: "number", format: def_numberFormat},
				{dataField: 'NEW_REG_CNT',caption: '소계',cssClass:'cell-highlight',width:73, dataType: "number", format: def_numberFormat},
			]
		},
		{dataField: 'NOKORI_CNT',caption: '잔여인원',cssClass:'cell-highlight',width:73, dataType: "number", format: def_numberFormat},
	];
	
	return resultColumns;
}

  