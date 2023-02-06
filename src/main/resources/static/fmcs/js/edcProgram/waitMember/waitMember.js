//강좌대기자관리
let storeWaitPrgs=null;
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
	createWaitPrgs();// 강좌 목록
}
function createCondition(){
	const now = new Date();
	frmCondition.SEARCH_DATE_EDU = now;
	frmCondition.SEARCH_DATE_START = now;
	frmCondition.SEARCH_DATE_END = now;
	
	$('#waitCondition').dxForm({
			width:'60vw',
		    colCount:5,
		    showColonAfterLabel: false,
		    formData: frmCondition,
		    items: [
		    	{dataField: 'SEARCH_TYPE_TERM',label:{visible:false},editorType: 'dxSelectBox',
		    		editorOptions: {  
		    			dataSource:[{value:'0',text:'강좌년월'},{value:'1',text:'접수기간'}],
		    			valueExpr: 'value', 
		    			displayExpr: 'text',
		    			onValueChanged: function(e) {
		    				var formInstance = $("#waitCondition").dxForm("instance");
		    				if(e.value == '0'){
		    					formInstance.option('colCount',5);
		    					formInstance.itemOption("SEARCH_DATE_EDU", "visible", true);
		    					formInstance.itemOption("SEARCH_DATE_START", "visible", false);
		    					formInstance.itemOption("SEARCH_DATE_END", "visible", false);
		    				}else{
		    					formInstance.option('colCount',6);
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
		    		, editorOptions: {width: "100%", displayFormat: 'yyyy-MM-dd'}
				},
		    	
				 {dataField:'SEARCH_DATE_END', visible:false, label:{text:'~'},editorType: 'dxDateBox'
					 , editorOptions: { width: "100%", displayFormat: 'yyyy-MM-dd'}
				 },
		    	
		    	{dataField: 'SEARCH_TYPE1',label:{visible:false},editorType: 'dxSelectBox',
		    		editorOptions: {  
		    			dataSource:category_gbn,
		    			valueExpr: 'value', 
		    			displayExpr: 'text',
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
const waitPrgs=[
		{COMCD: 2,
		CTGCD: '0005',
		EDC_PRGMID:'001',
		INSTRCTR_NAME:'강사명2',	
		EDC_STATUS:'접수준비',
		EDC_PRGMNM:'16시 아동1반 초급[월화수목]',
		USE_YN:'1',
		EDC_DAYS:'월,화,수,목',
		SORT_ORDER:1,
		EDC_STIME:'16:00',
		EDC_ETIME:'17:00',
		EDC_PNCPA_YN:'0',
		EDC_PNCPA:20,
		EDC_REG_CNT:15,
		EDC_AW_CNT:2,
		EDC_PW_CNT:3,
		EDC_O_CNT:9,
		EDC_C_CNT:1,
		EDC_N_CNT:6,
	},	
];
function createWaitPrgs(){
	storeWaitPrgs = new DevExpress.data.ArrayStore({
		key: 'EDC_PRGMID',
	    data: waitPrgs,
	});
	//repaintChangesOnly:true,
	$('#gridWaitPrgs').dxDataGrid({
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
	    dataSource: storeWaitPrgs,
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
	        	{column: 'EDC_REG_CNT',summaryType: 'sum', valueFormat:def_numberFormat}, 
	        	{column: 'EDC_AW_CNT',summaryType: 'sum', valueFormat:def_numberFormat}, 
	        	{column: 'EDC_PW_CNT',summaryType: 'sum', valueFormat:def_numberFormat},
	        	{column: 'EDC_O_CNT',summaryType: 'sum', valueFormat:def_numberFormat},
	        	{column: 'EDC_C_CNT',summaryType: 'sum', valueFormat:def_numberFormat},
	        	{column: 'EDC_N_CNT',summaryType: 'sum', valueFormat:def_numberFormat},
			]  
	    },  
	    showBorders: true,
	    onContentReady(e) {
	        if (!e.component.getSelectedRowKeys().length) {
	        	e.component.selectRowsByIndexes(0); 
	        }
	    },
	   
	    /*onToolbarPreparing(e) {
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
             
	    },*///ontoolbar  
	    onCellClick: function (e) {
	    	if( e.columnIndex >=7 && e.columnIndex <=11){
	    		
		    	if(e.rowType==='data' || e.rowType==='totalFooter'){
		    		//선택한 행 대상
		    		
		    		conditionPopup =$('#waitCondition').dxForm('instance').option('formData');
		    		eduInfoPopup={
		    			EDU_ID:(e.rowType==='data'? e.key:null),
		    			EDC_PRGMNM:(e.rowType==='data'? e.data.EDC_PRGMNM:'전체'),
		    			EDU_CAPA:(e.rowType==='data'? e.data.EDC_PNCPA:0),
		    			EDU_CONFIRM:(e.rowType==='data'? e.data.EDC_O_CNT:0),
		    			SEARCH_TYPE_TERM:conditionPopup.SEARCH_TYPE_TERM,
		    			SEARCH_DATE_EDU:conditionPopup.SEARCH_DATE_EDU,
		    			SEARCH_DATE_START:conditionPopup.SEARCH_DATE_START,
		    			SEARCH_DATE_END:conditionPopup.SEARCH_DATE_END,
		    		};	
		    		columnInfoPopup={
		    				columnIdx: e.columnIndex,
			    			type: (e.rowType==='data'?'d':'t'),
			    			caption:e.column.caption
			    	};
		    		
			    	createWaitUsersPopup();	    		
		    	}
	    	}
	    }
	});
}

//---------------------------------
//강좌 요금 목록-datagrid columns 생성 
//---------------------------------
function createColumnsList() 
{
	var resultColumns = {};
	
	resultColumns = [
		{dataField: 'EDC_PLACENM',caption: '분류명',width:200, fixed: true,alignment: 'center'},
		{dataField: 'EDC_PRGMNM',caption: '강좌명',width:350, fixed: true,},
		{dataField: 'INSTRCTR_NAME',caption: '강사명',width:100,alignment: 'center'},
		{dataField: 'EDC_DAYS',caption: '강좌요일',width:150,alignment: 'center'},
		{caption: '강좌시간',
			columns: [
				{dataField: 'EDC_STIME',caption: '시작',width:100,alignment: 'center'},
				{dataField: 'EDC_ETIME',caption: '종료',width:100,alignment: 'center'},
			]	
		},
		{
			caption: '인원',
			columns: [
				{dataField: 'EDC_PNCPA',caption: '정원',width:120, dataType: "number", format: def_numberFormat},
				{dataField: 'EDC_REG_CNT',caption: '접수',width:120,cssClass:'cell-highlight-underline',alignment:'right',format: def_numberFormat},
				{dataField: 'EDC_AW_CNT',caption: '승인대기',width:120,cssClass:'cell-highlight-underline', dataType: "number", format: def_numberFormat},
				{dataField: 'EDC_PW_CNT',caption: '결제대기',width:120,cssClass:'cell-highlight-underline', dataType: "number", format: def_numberFormat},
				{dataField: 'EDC_O_CNT',caption: '배정',cssClass:'cell-highlight-underline',width:120, dataType: "number", format: def_numberFormat},
				{dataField: 'EDC_C_CNT',caption: '취소',cssClass:'cell-highlight-underline',width:120, dataType: "number", format: def_numberFormat},
				{dataField: 'EDC_N_CNT',caption: '잔여',width:120, dataType: "number", format: def_numberFormat},
			]
		},
	];
	return resultColumns;
}
