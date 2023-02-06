//강좌대기자관리
let storeDrawPrgs=null;
let storeDrawUsers=null;
let treeView=null;
var frmCondition ={
		SEARCH_TYPE_TERM:'0',
		SEARCH_DATE_EDU:'',
		SEARCH_TYPE1:'0',
		CATEGORY_DROPDOWN:[],
}
function formInit()
{
	createCondition(); //조회 항목 생성
	createDrawPrgs();// 강좌 목록
	
	createCondition2(); //조회 항목 생성
	createDrawUsers();// 회원목록
}
function createCondition(){
	const now = new Date();
		$('#drawCondition').dxForm({
			width:'60vw',
			colCount:4,
		    showColonAfterLabel: false,
		    formData: frmCondition,
		    items: [
		    	{dataField:'SEARCH_DATE_EDU',label:{text:'강좌시작년월'},editorType: 'dxDateBox'
		    		, editorOptions: {value: now, displayFormat: 'yyyy-MM',
		    	        calendarOptions:{
		    	            maxZoomLevel: 'year', 
		    	            minZoomLevel: 'century', 
		    	        }	
		    		}
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
	$('#drawBtn').dxButton({
		stylingMode: 'contained',
		type: 'default',
		text:'추첨하기',
		onClick() {
			createDrawExecute();
		},
	});
	$('#batchConfirmBtn').dxButton({
		stylingMode: 'contained',
		text:'당첨일괄확정',
		type: 'default',
		elementAttr: {
			class: "btnRefresh"
		},
		onClick() {
			DevExpress.ui.notify('당첨일괄확정');
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
		EDC_CHUCHUM_TYPE:'M',
		USE_YN:'1',
		EDC_DAYS:'월,화,수,목',
		SORT_ORDER:1,
		EDC_STIME:'16:00',
		EDC_ETIME:'17:00',
		EDC_PNCPA_YN:'0',
		EDC_PNCPA:20,
		EDC_REG_CNT:15,
		EDC_NOKORI_CNT:5,
		EDC_REQ_CNT:6,
		DRAW_REQ_CNT:7,
		DRAW_O_CNT:8,
		DRAW_C_CNT:9,
		REG_WAIT_CNT:10
	},	
];
function createDrawPrgs(){
	storeWaitPrgs = new DevExpress.data.ArrayStore({
		key: 'EDC_PRGMID',
	    data: waitPrgs,
	});
	//repaintChangesOnly:true,
	$('#gridDrawPrgs').dxDataGrid({
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
	    selection: {mode: 'multiple',showCheckBoxesMode:'always',},
	    columns: createColumnsList(),
	    showBorders: true,
	    onContentReady(e) {
	        if (!e.component.getSelectedRowKeys().length) {
	        	e.component.selectRowsByIndexes(0); 
	        }
	    },
	   
	   /* onToolbarPreparing(e) {
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
	});
}

//---------------------------------
//강좌 요금 목록-datagrid columns 생성 
//---------------------------------
function createColumnsList() 
{
	var resultColumns = {};
	
	resultColumns = [
		{dataField: 'EDC_PLACENM',caption: '분류명',width:150, fixed: true,alignment: 'center'},
		{dataField: 'EDC_PRGMNM',caption: '강좌명',width:250, fixed: true,},
		{dataField: 'EDC_CHUCHUM_TYPE',caption: '추첨방법',width:80,alignment: 'center',
			lookup: {
				dataSource: choiceSchedule_gbn,
				displayExpr: 'text',
				valueExpr: 'value',
			},
		},

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
				{dataField: 'EDC_PNCPA',caption: '정원',width:100, dataType: "number", format: def_numberFormat},
				{dataField: 'EDC_REG_CNT',caption: '등록',width:100,dataType: "number", format: def_numberFormat},
				{dataField: 'EDC_NOKORI_CNT',caption: '잔여',width:100,dataType: "number", format: def_numberFormat},
				{dataField: 'DRAW_STATUS',caption: '추첨상태',visible:false},
				{dataField: 'EDC_REQ_CNT',caption: '총접수',width:100,dataType: "number", format: def_numberFormat},
				{dataField: 'DRAW_REQ_CNT',caption: '추첨접수',width:100, dataType: "number", format: def_numberFormat},
				{dataField: 'DRAW_O_CNT',caption: '추첨당첨',width:100, dataType: "number", format: def_numberFormat},
				{dataField: 'DRAW_C_CNT',caption: '추첨당첨확정',width:100, dataType: "number", format: def_numberFormat},
				{dataField: 'REG_WAIT_CNT',caption: '배정대기',width:100, dataType: "number", format: def_numberFormat},
			]
		},
	];
	//배정대기:예약 대기 인원으로  접수한상태
	return resultColumns;
}
const waitUsers=[
	{EDC_PRGMNM:'16시 아동1반 초급[월화수목]',WAIT_NO:null,USER_NO:'00001101',USER_NAME:'홍길동',USER_GENDER:'남',USER_BIRTH:'1980-01-01',USER_BIRTH_TYPE:'양력',USER_REG_DT:'2021-01-01',USER_HP:'010-1111-2222',USER_SEND_YN:'Y',USER_ADDRESS:'서울 영등포구 4455',USER_CENTER:'기장아쿠아센터',APP_STATUS:'결제완료',APP_REG_DT:'2022-05-01',APP_REG_TIME:'12:13:01',APP_TYPE:'온라인',APP_ASS_DT:'2022-05-02',APP_ASS_TIME:'12:13:01'},
	{EDC_PRGMNM:'16시 아동1반 초급[월화수목]',WAIT_NO:null,USER_NO:'00001102',USER_NAME:'이순신',USER_GENDER:'남',USER_BIRTH:'1979-08-29',USER_BIRTH_TYPE:'음력',USER_REG_DT:'2021-01-02',USER_HP:'010-2143-3333',USER_SEND_YN:'N',USER_ADDRESS:'서울 양천구 9911',USER_CENTER:'기장아쿠아센터',APP_STATUS:'승인대기',APP_REG_DT:'2022-05-02',APP_REG_TIME:'12:13:09',APP_TYPE:'온라인',APP_ASS_DT:'2022-05-02',APP_ASS_TIME:'12:13:02'},
	{EDC_PRGMNM:'16시 아동1반 초급[월화수목]',WAIT_NO:null,USER_NO:'00001103',USER_NAME:'고구마',USER_GENDER:'여',USER_BIRTH:'1979-08-29',USER_BIRTH_TYPE:'음력',USER_REG_DT:'2021-01-02',USER_HP:'010-2143-3333',USER_SEND_YN:'N',USER_ADDRESS:'서울 양천구 9911',USER_CENTER:'기장아쿠아센터',APP_STATUS:'승인대기',APP_REG_DT:'2022-05-02',APP_REG_TIME:'12:13:09',APP_TYPE:'방문',APP_ASS_DT:'2022-05-02',APP_ASS_TIME:'12:13:02'},
];
function createCondition2(){
	const now = new Date();
		$('#drawCondition2').dxForm({
		    colCount:5,
		    labelMode:'hidden',
		    showColonAfterLabel: false,
		    items: [
		    	{dataField: 'USER_SEARCH_TYPE1',editorType: 'dxSelectBox',
		    		editorOptions: {  
		    			dataSource:drawstatus_gbn,
		    			valueExpr: 'value', 
		    			displayExpr: 'text',
		    			value:'0',
		    		},
		       },
		       {dataField:'SEARCH_DATE_CONFIRM',cssClass:'grp_low_height',editorType: 'dxCheckBox',
		    		editorOptions: {
		    			text:'추첨확정일',
		    		}
				 },
		       {dataField:'SEARCH_DATE_CONFIRM_DT',cssClass:'margin-left-m45',editorType: 'dxDateBox'
		    		, editorOptions: {value: now, displayFormat: 'yyyy-MM-dd',}
				 },
				 {colSpan:2,dataField:'SEARCH_INVALID_HP',cssClass:'grp_low_height',editorType: 'dxCheckBox',
			    		editorOptions: {
			    			text:'비정상 연락처만 검색',
			    		}
				},
		    ]
		});
	$('#searchBtn2').dxButton({
		stylingMode: 'contained',
		icon: 'find',
		type: 'default',
		onClick() {
			var msg='';
			DevExpress.ui.notify('조회 ' + msg);
		},
	});
	$('#searchInitBtn2').dxButton({
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
	$('#drawConfirmBtn').dxButton({
		stylingMode: 'contained',
		type: 'default',
		text:'당첨자확정',
		onClick() {
			DevExpress.ui.notify('당첨자확정');
		},
	});
	$('#drawCancelmBtn').dxButton({
		stylingMode: 'contained',
		text:'당첨취소',
		type: 'default',
		elementAttr: {
			class: "btnRefresh"
		},
		onClick() {
			DevExpress.ui.notify('당첨취소');
		},
	});
}
function createDrawUsers(){
	storeWaitUsers = new DevExpress.data.ArrayStore({
		key: 'USER_NO',
	    data: waitUsers,
	});
	//repaintChangesOnly:true,
	$('#gridDrawUsers').dxDataGrid({
		export: {enabled: true},
		allowColumnReordering: true,
	    allowColumnResizing: true,
	    columnAutoWidth: true,
	    showBorders: true,
	    focusedRowEnabled: true,
	    columnChooser: {
	    	enabled: true,
	    	allowSearch: true,
	    	location: 'before',
	    },
	    dataSource: storeWaitUsers,
	    searchPanel: {
	    	visible: true,	
		    placeholder: 'Search...',
		    inputAttr: { 'autocomplete': 'off' }  
	    },
	    selection: {mode: 'multiple',showCheckBoxesMode:'always',},
	    columns: [
	    	{dataField: 'WAIT_NO',caption: '대기순번',width:100, dataType: "number", format: def_numberFormat},
	    	{dataField: 'APP_DRAW_STATUS',caption: '추첨결과',width:100,alignment: 'center' },
	    	{
	    		caption: '추첨확정',
				columns: [
	    		{dataField: 'APP_REG_DT',caption: '일자',width:150,alignment: 'center' },
	    		{dataField: 'APP_REG_TIME',caption: '시간',width:150,alignment: 'center' },
	    		]
	    	},
	    	{dataField: 'APP_STATUS',caption: '접수상태',width:100,alignment: 'center' },
	    	{dataField: 'USER_NO',caption: '회원번호',width:100, },
	    	{dataField: 'USER_NAME',caption: '회원명',width:100,alignment: 'center' },
	    	{dataField: 'USER_HP',caption: '연락처',width:150,alignment: 'center' },
	    	{dataField: 'USER_BIRTH',caption: '생년월일',width:100,alignment: 'center' },
	    	{dataField: 'USER_GENDER',caption: '성별',width:150,alignment: 'center' },
	    	{
	    		caption: '접수',
				columns: [
					{dataField: 'APP_ASS_DT',caption: '일자',width:100,alignment: 'center' },
					{dataField: 'APP_ASS_TIME',caption: '시간',width:100,alignment: 'center' },
					{dataField: 'APP_TYPE',caption: '경로',width:100, },
				]
	    	},
	    	
	    ],
	    showBorders: true,
	   /* onToolbarPreparing(e) {
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
	});
}
