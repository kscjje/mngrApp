//강좌출석현황
let storeAttendancePrgs=null;
let storeUsers=null;
let treeView=null;
let gridUserData=null;
var pdfExport=null;

var frmCondition ={
		SEARCH_TYPE_TERM:'0',
		SEARCH_DATE_EDU:'',
		SEARCH_TYPE_1:'0',
		CATEGORY_DROPDOWN:[],
}
var frmPrintOpts ={
	PRINT_HP:false,
	PRINT_AGE:false,
}
function formInit()
{
	createCondition(); // 조회 항목 생성
	createPrintOptions();
	
	createEduPrgs();// 강좌 목록
	createEduUsers();// 회원목록
	pdfExport = new PDFExport();
}
function createCondition(){
	const now = new Date();
		$('#attendanceCondition').dxForm({
			width:'70vw',
			height:'100px',
			colCount:6,
		    showColonAfterLabel: false,
		    formData: frmCondition,
		    items: [
		    	{dataField:'SEARCH_TYPE_1',label:{visible:false},cssClass:'grp_low_height',editorType: 'dxRadioGroup'
		    		, editorOptions: {
		    			 items:attendance_gbn ,
		    			 valueExpr: 'value',
		    			 displayExpr: 'text',
		    			 layout: 'horizontal',
		    			 value:'0',
		    			 onValueChanged: function(e) {
		    				 changeUsersGrid(e.value);
			    		 } 
		    		}
				 },
				 {dataField:'SEARCH_TYPE_2',label:{visible:false},cssClass:'grp_low_height',editorType: 'dxCheckBox',
			    		editorOptions: {
			    			text:'강좌요일만보기',
			    		}
				 },
				 {dataField:'SEARCH_TYPE_3',label:{visible:false},cssClass:'grp_low_height',editorType: 'dxCheckBox',
			    		editorOptions: {
			    			text:'등록완료회원만보기',
			    		}
				 }, 
				 {dataField:'SEARCH_TYPE_4',label:{visible:false},cssClass:'grp_low_height',editorType: 'dxCheckBox',
			    		editorOptions: {
			    			text:'중도환불자료표시',
			    		}
				 },
				 {dataField:'SEARCH_TYPE_5',label:{visible:false},cssClass:'grp_low_height',editorType: 'dxCheckBox',
			    		editorOptions: {
			    			text:'변경자료표시',
			    		}
				 },
				 {dataField:'SEARCH_TYPE_6',label:{visible:false},cssClass:'grp_low_height',editorType: 'dxCheckBox',
			    		editorOptions: {
			    			text:'휴관일표시',
			    		}
				 },
		    	{dataField:'SEARCH_DATE_EDU',label:{text:'강좌년월'},editorType: 'dxDateBox'
		    		, editorOptions: {value: now, displayFormat: 'yyyy-MM',
		    	        calendarOptions:{
		    	            maxZoomLevel: 'year', 
		    	            minZoomLevel: 'century', 
		    	        }	
		    		}
				 },
		    	{dataField: 'SEARCH_TYPE_7',label:{visible:false},editorType: 'dxSelectBox',
		    		editorOptions: {  
		    			dataSource:category_gbn,
		    			valueExpr: 'value', 
		    			displayExpr: 'text',
		    			value: '0',
		    			
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
    	       {dataField: 'SEARCH_TYPE_8',label:{visible:false},editorType: 'dxSelectBox',
		    		editorOptions: {  
		    			dataSource:[{text:'강사(전체)',value:''},{text:'미지정',value:'-1'},{text:'김쌤',value:'0001'},{text:'이쌤',value:'0002'},],
		    			valueExpr: 'value', 
		    			displayExpr: 'text',
		    			value: '',
		    		
		    		},
		       },
		       {dataField: 'SEARCH_TYPE_9',label:{visible:false},editorType: 'dxTextBox',
		    		editorOptions: {placeholder:'강좌명 2자리 이상 입력'}
		       },
		    ]
		});
	$('#searchBtn').dxButton({
		stylingMode: 'contained',
		icon: 'find',
		type: 'default',
		onClick() {
			var formSrch =  $('#attendanceCondition').dxForm('instance');
			var validationResult = formSrch.validate();
            var orgData = formSrch.option("formData");
            if (validationResult.isValid) {
    			userDataLoad(orgData);
            }
			// columns 데이터를 받아서 columns 를 만들어서 넣어줘야함.!!
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
function createPrintOptions(){
	const now = new Date();
		$('#printOptions').dxForm({
			width:'15vw',
			height:'100px',
			colCount:2,
		    showColonAfterLabel: false,
		    formData: frmPrintOpts,
		    items: [
		    	 {dataField:'PRINT_HP',label:{visible:false},cssClass:'grp_low_height',editorType: 'dxCheckBox',
			    		editorOptions: {
			    			text:'출력시연락처표시',
			    		}
				 },
				 {dataField:'PRINT_AGE',label:{visible:false},cssClass:'grp_low_height',editorType: 'dxCheckBox',
			    		editorOptions: {
			    			text:'출력시연령표시',
			    		}
				 },
				
		    ]
		});
		
	//https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/PDFExportMultipleGrids/jQuery/Light/
	//https://devlifetestcase.tistory.com/63
	//https://jsfiddle.net/tsmkqzd1/9/
	//https://devlifetestcase.tistory.com/62
	$('#printBtn').dxButton({
		stylingMode: 'contained',
		icon: 'print',
		type: 'default',
		onClick() {
			//선택된 강좌.
			var gridEdu = $('#gridEduPrgs').dxDataGrid("instance");
			var data = gridEdu.getSelectedRowsData();
			if (!data || data.length==0) {
				DevExpress.ui.dialog.alert('강좌를 선택 해주세요', "출석부 출력");
				return;
			}
			pdfExport.init(data,frmCondition.SEARCH_TYPE_1);
			pdfExport.popup('show');
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
		EDC_ETIME:'16:50',
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
	{COMCD: 2,
		CTGCD: '0005',
		EDC_PRGMID:'002',
		INSTRCTR_NAME:'강사명2',	
		EDC_STATUS:'접수준비',
		EDC_PRGMNM:'14시 아동1반 초급[월화수목]',
		USE_YN:'1',
		EDC_DAYS:'월,화,수,목',
		SORT_ORDER:1,
		EDC_STIME:'14:00',
		EDC_ETIME:'14:50',
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
function createEduPrgs(){
	storeWaitPrgs = new DevExpress.data.ArrayStore({
		key: 'EDC_PRGMID',
	    data: waitPrgs,
	});
	// repaintChangesOnly:true,
	$('#gridEduPrgs').dxDataGrid({
		export: {
			enabled: true,
		},
		allowColumnReordering: true,
	    allowColumnResizing: true,
	    focusedRowEnabled: true,
		focusedRowIndex: 0,
	    height:'100%',
	    showBorders: true,
	    columnChooser: {
	    	enabled: false,
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
	    onFocusedRowChanged(e) {
			const focusedRowKey = e.component.option('focusedRowKey');
		    //selectedRowIndex = e.rowIndex;
			//editorSetRow(e.row.data);
			userDataLoad({EDC_PRGMID:focusedRowKey});
	    }
	    
	   /*
		 * onToolbarPreparing(e) { const dataGrid = e.component;
		 * 
		 * e.toolbarOptions.items.push( { location: 'after', widget: 'dxButton',
		 * options: { icon: 'refresh', onClick() { //gridInstructor.refresh(); }, }, } );
		 *  },
		 */// ontoolbar
	});
}

const waitUsers=[
	{C_SEQ_NO:1,C_USER_NO:'00001101',C_USER_NAME:'홍길동',C_USER_GENDER:'남',C_USER_AGE:10,C_USER_BIRTH:'1980-01-01',C_USER_BIRTH_TYPE:'양력',C_USER_REG_DT:'2021-01-01',C_USER_HP:'010-2222-2222',C_USER_SEND_YN:'Y',C_EDU_START_DT:'2022-05-01',C_EDU_END_DT:'2022-05-02',D_01:true,D_02:true},
	{C_SEQ_NO:2,C_USER_NO:'00001102',C_USER_NAME:'이순신',C_USER_GENDER:'남',C_USER_AGE:10,C_USER_BIRTH:'1979-08-29',C_USER_BIRTH_TYPE:'음력',C_USER_REG_DT:'2021-01-02',C_USER_HP:'010-2143-3333',C_USER_SEND_YN:'N',C_EDU_START_DT:'2022-05-02',C_EDU_END_DT:'2022-05-02',D_01:true,D_02:false},
	{C_SEQ_NO:3,C_USER_NO:'00001103',C_USER_NAME:'고구마1',C_USER_GENDER:'여',C_USER_AGE:10,C_USER_BIRTH:'1979-08-29',C_USER_BIRTH_TYPE:'음력',C_USER_REG_DT:'2021-01-02',C_USER_HP:'010-2143-3333',C_USER_SEND_YN:'N',C_EDU_START_DT:'2022-05-02',C_EDU_END_DT:'2022-05-02',D_01:false,D_02:false},
	{C_SEQ_NO:3,C_USER_NO:'00001103',C_USER_NAME:'고구마2',C_USER_GENDER:'여',C_USER_AGE:10,C_USER_BIRTH:'1979-08-29',C_USER_BIRTH_TYPE:'음력',C_USER_REG_DT:'2021-01-02',C_USER_HP:'010-2143-3333',C_USER_SEND_YN:'N',C_EDU_START_DT:'2022-05-02',C_EDU_END_DT:'2022-05-02',D_01:false,D_02:false},
	{C_SEQ_NO:3,C_USER_NO:'00001103',C_USER_NAME:'고구마3',C_USER_GENDER:'여',C_USER_AGE:10,C_USER_BIRTH:'1979-08-29',C_USER_BIRTH_TYPE:'음력',C_USER_REG_DT:'2021-01-02',C_USER_HP:'010-2143-3333',C_USER_SEND_YN:'N',C_EDU_START_DT:'2022-05-02',C_EDU_END_DT:'2022-05-02',D_01:false,D_02:false},
	{C_SEQ_NO:3,C_USER_NO:'00001103',C_USER_NAME:'고구마4',C_USER_GENDER:'여',C_USER_AGE:10,C_USER_BIRTH:'1979-08-29',C_USER_BIRTH_TYPE:'음력',C_USER_REG_DT:'2021-01-02',C_USER_HP:'010-2143-3333',C_USER_SEND_YN:'N',C_EDU_START_DT:'2022-05-02',C_EDU_END_DT:'2022-05-02',D_01:false,D_02:false},
	{C_SEQ_NO:3,C_USER_NO:'00001103',C_USER_NAME:'고구마5',C_USER_GENDER:'여',C_USER_AGE:10,C_USER_BIRTH:'1979-08-29',C_USER_BIRTH_TYPE:'음력',C_USER_REG_DT:'2021-01-02',C_USER_HP:'010-2143-3333',C_USER_SEND_YN:'N',C_EDU_START_DT:'2022-05-02',C_EDU_END_DT:'2022-05-02',D_01:false,D_02:false},
	{C_SEQ_NO:3,C_USER_NO:'00001103',C_USER_NAME:'고구마6',C_USER_GENDER:'여',C_USER_AGE:10,C_USER_BIRTH:'1979-08-29',C_USER_BIRTH_TYPE:'음력',C_USER_REG_DT:'2021-01-02',C_USER_HP:'010-2143-3333',C_USER_SEND_YN:'N',C_EDU_START_DT:'2022-05-02',C_EDU_END_DT:'2022-05-02',D_01:false,D_02:false},
	{C_SEQ_NO:3,C_USER_NO:'00001103',C_USER_NAME:'고구마7',C_USER_GENDER:'여',C_USER_AGE:10,C_USER_BIRTH:'1979-08-29',C_USER_BIRTH_TYPE:'음력',C_USER_REG_DT:'2021-01-02',C_USER_HP:'010-2143-3333',C_USER_SEND_YN:'N',C_EDU_START_DT:'2022-05-02',C_EDU_END_DT:'2022-05-02',D_01:false,D_02:false},
	{C_SEQ_NO:3,C_USER_NO:'00001103',C_USER_NAME:'고구마8',C_USER_GENDER:'여',C_USER_AGE:10,C_USER_BIRTH:'1979-08-29',C_USER_BIRTH_TYPE:'음력',C_USER_REG_DT:'2021-01-02',C_USER_HP:'010-2143-3333',C_USER_SEND_YN:'N',C_EDU_START_DT:'2022-05-02',C_EDU_END_DT:'2022-05-02',D_01:false,D_02:false},
	{C_SEQ_NO:3,C_USER_NO:'00001103',C_USER_NAME:'고구마9',C_USER_GENDER:'여',C_USER_AGE:10,C_USER_BIRTH:'1979-08-29',C_USER_BIRTH_TYPE:'음력',C_USER_REG_DT:'2021-01-02',C_USER_HP:'010-2143-3333',C_USER_SEND_YN:'N',C_EDU_START_DT:'2022-05-02',C_EDU_END_DT:'2022-05-02',D_01:false,D_02:false},
	{C_SEQ_NO:3,C_USER_NO:'00001103',C_USER_NAME:'고구마10',C_USER_GENDER:'여',C_USER_AGE:10,C_USER_BIRTH:'1979-08-29',C_USER_BIRTH_TYPE:'음력',C_USER_REG_DT:'2021-01-02',C_USER_HP:'010-2143-3333',C_USER_SEND_YN:'N',C_EDU_START_DT:'2022-05-02',C_EDU_END_DT:'2022-05-02',D_01:false,D_02:false},
	{C_SEQ_NO:3,C_USER_NO:'00001103',C_USER_NAME:'고구마11',C_USER_GENDER:'여',C_USER_AGE:10,C_USER_BIRTH:'1979-08-29',C_USER_BIRTH_TYPE:'음력',C_USER_REG_DT:'2021-01-02',C_USER_HP:'010-2143-3333',C_USER_SEND_YN:'N',C_EDU_START_DT:'2022-05-02',C_EDU_END_DT:'2022-05-02',D_01:false,D_02:false},
	{C_SEQ_NO:3,C_USER_NO:'00001103',C_USER_NAME:'고구마12',C_USER_GENDER:'여',C_USER_AGE:10,C_USER_BIRTH:'1979-08-29',C_USER_BIRTH_TYPE:'음력',C_USER_REG_DT:'2021-01-02',C_USER_HP:'010-2143-3333',C_USER_SEND_YN:'N',C_EDU_START_DT:'2022-05-02',C_EDU_END_DT:'2022-05-02',D_01:false,D_02:false},
	{C_SEQ_NO:3,C_USER_NO:'00001103',C_USER_NAME:'고구마13',C_USER_GENDER:'여',C_USER_AGE:10,C_USER_BIRTH:'1979-08-29',C_USER_BIRTH_TYPE:'음력',C_USER_REG_DT:'2021-01-02',C_USER_HP:'010-2143-3333',C_USER_SEND_YN:'N',C_EDU_START_DT:'2022-05-02',C_EDU_END_DT:'2022-05-02',D_01:false,D_02:false},
	{C_SEQ_NO:3,C_USER_NO:'00001103',C_USER_NAME:'고구마14',C_USER_GENDER:'여',C_USER_AGE:10,C_USER_BIRTH:'1979-08-29',C_USER_BIRTH_TYPE:'음력',C_USER_REG_DT:'2021-01-02',C_USER_HP:'010-2143-3333',C_USER_SEND_YN:'N',C_EDU_START_DT:'2022-05-02',C_EDU_END_DT:'2022-05-02',D_01:false,D_02:false},
	{C_SEQ_NO:3,C_USER_NO:'00001103',C_USER_NAME:'고구마15',C_USER_GENDER:'여',C_USER_AGE:10,C_USER_BIRTH:'1979-08-29',C_USER_BIRTH_TYPE:'음력',C_USER_REG_DT:'2021-01-02',C_USER_HP:'010-2143-3333',C_USER_SEND_YN:'N',C_EDU_START_DT:'2022-05-02',C_EDU_END_DT:'2022-05-02',D_01:false,D_02:false},
	{C_SEQ_NO:3,C_USER_NO:'00001103',C_USER_NAME:'고구마16',C_USER_GENDER:'여',C_USER_AGE:10,C_USER_BIRTH:'1979-08-29',C_USER_BIRTH_TYPE:'음력',C_USER_REG_DT:'2021-01-02',C_USER_HP:'010-2143-3333',C_USER_SEND_YN:'N',C_EDU_START_DT:'2022-05-02',C_EDU_END_DT:'2022-05-02',D_01:false,D_02:false},
	{C_SEQ_NO:3,C_USER_NO:'00001103',C_USER_NAME:'고구마17',C_USER_GENDER:'여',C_USER_AGE:10,C_USER_BIRTH:'1979-08-29',C_USER_BIRTH_TYPE:'음력',C_USER_REG_DT:'2021-01-02',C_USER_HP:'010-2143-3333',C_USER_SEND_YN:'N',C_EDU_START_DT:'2022-05-02',C_EDU_END_DT:'2022-05-02',D_01:false,D_02:false},
	{C_SEQ_NO:3,C_USER_NO:'00001103',C_USER_NAME:'고구마18',C_USER_GENDER:'여',C_USER_AGE:10,C_USER_BIRTH:'1979-08-29',C_USER_BIRTH_TYPE:'음력',C_USER_REG_DT:'2021-01-02',C_USER_HP:'010-2143-3333',C_USER_SEND_YN:'N',C_EDU_START_DT:'2022-05-02',C_EDU_END_DT:'2022-05-02',D_01:false,D_02:false},
	{C_SEQ_NO:3,C_USER_NO:'00001103',C_USER_NAME:'고구마19',C_USER_GENDER:'여',C_USER_AGE:10,C_USER_BIRTH:'1979-08-29',C_USER_BIRTH_TYPE:'음력',C_USER_REG_DT:'2021-01-02',C_USER_HP:'010-2143-3333',C_USER_SEND_YN:'N',C_EDU_START_DT:'2022-05-02',C_EDU_END_DT:'2022-05-02',D_01:false,D_02:false},
	{C_SEQ_NO:3,C_USER_NO:'00001103',C_USER_NAME:'고구마20',C_USER_GENDER:'여',C_USER_AGE:10,C_USER_BIRTH:'1979-08-29',C_USER_BIRTH_TYPE:'음력',C_USER_REG_DT:'2021-01-02',C_USER_HP:'010-2143-3333',C_USER_SEND_YN:'N',C_EDU_START_DT:'2022-05-02',C_EDU_END_DT:'2022-05-02',D_01:false,D_02:false},
	{C_SEQ_NO:3,C_USER_NO:'00001103',C_USER_NAME:'고구마21',C_USER_GENDER:'여',C_USER_AGE:10,C_USER_BIRTH:'1979-08-29',C_USER_BIRTH_TYPE:'음력',C_USER_REG_DT:'2021-01-02',C_USER_HP:'010-2143-3333',C_USER_SEND_YN:'N',C_EDU_START_DT:'2022-05-02',C_EDU_END_DT:'2022-05-02',D_01:false,D_02:false},
];
const waitUsers3=[
	{C_SEQ_NO:1,C_USER_NO:'00001101',C_USER_NAME:'홍길동2',C_USER_GENDER:'남',C_USER_AGE:10,C_USER_BIRTH:'1980-01-01',C_USER_BIRTH_TYPE:'양력',C_USER_REG_DT:'2021-01-01',C_USER_HP:'010-1111-2222',C_USER_SEND_YN:'Y',C_EDU_START_DT:'2022-05-01',C_EDU_END_DT:'2022-05-02',D_01:true,D_02:true,D_03:true,D_04:true,D_05:true,D_06:true,D_07:true,D_08:true,D_09:true,D_10:true,D_11:true,D_12:true,D_13:true,D_14:true,D_15:true,D_16:true,D_17:true,D_18:true,D_19:true,D_20:true,D_21:true,D_22:true,D_23:true,D_24:true,D_25:true,D_26:true,D_27:true,D_28:true,D_29:true,D_30:true,D_31:true},
	{C_SEQ_NO:2,C_USER_NO:'00001102',C_USER_NAME:'홍길동3',C_USER_GENDER:'남',C_USER_AGE:10,C_USER_BIRTH:'1979-08-29',C_USER_BIRTH_TYPE:'음력',C_USER_REG_DT:'2021-01-02',C_USER_HP:'010-2143-3333',C_USER_SEND_YN:'N',C_EDU_START_DT:'2022-05-02',C_EDU_END_DT:'2022-05-02',D_01:true,D_02:false,D_03:true,D_04:true,D_05:true,D_06:true,D_07:true,D_08:true,D_09:true,D_10:true,D_11:true,D_12:true,D_13:true,D_14:true,D_15:true,D_16:true,D_17:true,D_18:true,D_19:true,D_20:true,D_21:true,D_22:true,D_23:true,D_24:true,D_25:true,D_26:true,D_27:true,D_28:true,D_29:true,D_30:true,D_31:true},
	{C_SEQ_NO:3,C_USER_NO:'00001103',C_USER_NAME:'홍길동4',C_USER_GENDER:'여',C_USER_AGE:10,C_USER_BIRTH:'1979-08-29',C_USER_BIRTH_TYPE:'음력',C_USER_REG_DT:'2021-01-02',C_USER_HP:'010-2143-3333',C_USER_SEND_YN:'N',C_EDU_START_DT:'2022-05-02',C_EDU_END_DT:'2022-05-02',D_01:false,D_02:false,D_03:true,D_04:true,D_05:true,D_06:true,D_07:true,D_08:true,D_09:true,D_10:true,D_11:true,D_12:true,D_13:true,D_14:true,D_15:true,D_16:true,D_17:true,D_18:true,D_19:true,D_20:true,D_21:true,D_22:true,D_23:true,D_24:true,D_25:true,D_26:true,D_27:true,D_28:true,D_29:true,D_30:true,D_31:true},
	{C_SEQ_NO:3,C_USER_NO:'00001104',C_USER_NAME:'홍길동5',C_USER_GENDER:'여',C_USER_AGE:10,C_USER_BIRTH:'1979-08-29',C_USER_BIRTH_TYPE:'음력',C_USER_REG_DT:'2021-01-02',C_USER_HP:'010-2143-3333',C_USER_SEND_YN:'N',C_EDU_START_DT:'2022-05-02',C_EDU_END_DT:'2022-05-02',D_01:false,D_02:false,D_03:true,D_04:true,D_05:true,D_06:true,D_07:true,D_08:true,D_09:true,D_10:true,D_11:true,D_12:true,D_13:true,D_14:true,D_15:true,D_16:true,D_17:true,D_18:true,D_19:true,D_20:true,D_21:true,D_22:true,D_23:true,D_24:true,D_25:true,D_26:true,D_27:true,D_28:true,D_29:true,D_30:true,D_31:true},
	{C_SEQ_NO:3,C_USER_NO:'00001105',C_USER_NAME:'홍길동6',C_USER_GENDER:'여',C_USER_AGE:10,C_USER_BIRTH:'1979-08-29',C_USER_BIRTH_TYPE:'음력',C_USER_REG_DT:'2021-01-02',C_USER_HP:'010-2143-3333',C_USER_SEND_YN:'N',C_EDU_START_DT:'2022-05-02',C_EDU_END_DT:'2022-05-02',D_01:false,D_02:false,D_03:true,D_04:true,D_05:true,D_06:true,D_07:true,D_08:true,D_09:true,D_10:true,D_11:true,D_12:true,D_13:true,D_14:true,D_15:true,D_16:true,D_17:true,D_18:true,D_19:true,D_20:true,D_21:true,D_22:true,D_23:true,D_24:true,D_25:true,D_26:true,D_27:true,D_28:true,D_29:true,D_30:true,D_31:true},
	{C_SEQ_NO:3,C_USER_NO:'00001106',C_USER_NAME:'홍길동7',C_USER_GENDER:'여',C_USER_AGE:10,C_USER_BIRTH:'1979-08-29',C_USER_BIRTH_TYPE:'음력',C_USER_REG_DT:'2021-01-02',C_USER_HP:'010-2143-3333',C_USER_SEND_YN:'N',C_EDU_START_DT:'2022-05-02',C_EDU_END_DT:'2022-05-02',D_01:false,D_02:false,D_03:true,D_04:true,D_05:true,D_06:true,D_07:true,D_08:true,D_09:true,D_10:true,D_11:true,D_12:true,D_13:true,D_14:true,D_15:true,D_16:true,D_17:true,D_18:true,D_19:true,D_20:true,D_21:true,D_22:true,D_23:true,D_24:true,D_25:true,D_26:true,D_27:true,D_28:true,D_29:true,D_30:true,D_31:true},
	{C_SEQ_NO:3,C_USER_NO:'00001107',C_USER_NAME:'홍길동8',C_USER_GENDER:'여',C_USER_AGE:10,C_USER_BIRTH:'1979-08-29',C_USER_BIRTH_TYPE:'음력',C_USER_REG_DT:'2021-01-02',C_USER_HP:'010-2143-3333',C_USER_SEND_YN:'N',C_EDU_START_DT:'2022-05-02',C_EDU_END_DT:'2022-05-02',D_01:false,D_02:false,D_03:true,D_04:true,D_05:true,D_06:true,D_07:true,D_08:true,D_09:true,D_10:true,D_11:true,D_12:true,D_13:true,D_14:true,D_15:true,D_16:true,D_17:true,D_18:true,D_19:true,D_20:true,D_21:true,D_22:true,D_23:true,D_24:true,D_25:true,D_26:true,D_27:true,D_28:true,D_29:true,D_30:true,D_31:true},
];		
function userDataLoad(loadParams){
	gridUserData = loadParams.EDC_PRGMID ==='001' ? waitUsers3:waitUsers;
	userDataSet();
}
function userDataSet(){
   	  var grid = $('#gridUsers').dxDataGrid('instance');
   	  grid.option('dataSource',gridUserData);
   	  grid.option('columns',createUserColumnsList(gridUserData));
	
}

// ---------------------------------
// 강좌 요금 목록-datagrid columns 생성
// ---------------------------------
function createColumnsList() 
{
	var resultColumns = {};
	
	resultColumns = [
		{dataField: 'EDC_PLACENM',caption: '분류명',width:150, alignment: 'center'},
		{dataField: 'EDC_PRGMNM',caption: '강좌명' },
		{dataField: 'INSTRCTR_NAME',caption: '강사명',width:150,alignment: 'center'},
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
				{dataField: 'EDC_PNCPA',caption: '정원',width:150, dataType: "number", format: def_numberFormat},
				{dataField: 'EDC_NOKORI_CNT',caption: '현원',width:150,dataType: "number", format: def_numberFormat},
			]
		},
	];
	// 배정대기:예약 대기 인원으로 접수한상태
	return resultColumns;
}
function createEduUsers(){
	
	// repaintChangesOnly:true,
	$('#gridUsers').dxDataGrid({
		export: {enabled: true},
		keyExpr:'C_USER_NO',
		height:'100%',
		allowColumnReordering: true,
	    allowColumnResizing: true,
	    columnAutoWidth: false,
	    showBorders: true,
	    focusedRowEnabled: true,
	    paging: {
	    	enabled:false,
	    },
	    columnChooser: {
	    	enabled: false,
	    	allowSearch: true,
	    	location: 'before',
	    },
	    editing:{
	    	mode: 'cell',
	    	allowUpdating: false,
	    },
	    searchPanel: {
	    	visible: true,	
		    placeholder: 'Search...',
		    inputAttr: { 'autocomplete': 'off' }  
	    },
	    selection: {mode: 'single'},
	    /*columns: createUserColumnsList(),*/
	    showBorders: true,
	    onToolbarPreparing(e) {
              const dataGrid = e.component;
             e.toolbarOptions.items.push(
              		 {
              			 location: 'after',
              			 widget: 'dxButton',
              			 options: {
              				 	icon: 'refresh',
              				 	onClick() {
              				 		// gridInstructor.refresh();
              				 	},
              			 },
              		 }
              );
             
	    },// ontoolbar
	});
}
function createUserColumnsList(resData) 
{
	var resultColumns = {};
	resultColumns = [
		{dataField: 'C_SEQ_NO',caption: '순번',width:100, dataType: "number", format: def_numberFormat},
		{dataField: 'C_USER_NAME',caption: '회원명',width:100,alignment: 'center' },
		{dataField: 'C_USER_AGE',caption: '연령',width:50,dataType: "number",visible:false },
		{dataField: 'C_USER_HP',caption: '연락처',width:150,alignment: 'center' },
		{dataField: 'C_USER_BIRTH',caption: '생년월일',width:100,alignment: 'center' },
		
	];
	/*
	 * var
	 * srchMonth=toDateMonthFormat($('#attendanceCondition').dxForm('instance').getEditor('SEARCH_DATE_EDU').option('value'));
	 * if(isYearMonthFormat(srchMonth)){ var days =
	 * moment(srchMonth).daysInMonth(); alert(days); }
	 */
	// if(storeUsers.data){
	  
	if(resData){
		var keys = Object.keys(resData[0]); // 키를 가져옵니다. 이때, keys 는 반복가능한 객체가 됩니다.
		//console.log(keys);
	    for (var i=0; i<keys.length; i++) {
	    	if( keys[i].startsWith('D_') ){
	    		var vCaption = keys[i].slice(2);
	    		moment.locale('ko');
	    		let iDays = moment("2023-01-" + vCaption).format("dd");
	    		resultColumns.push({
	    			caption:iDays,
	    			columns: [{dataField:keys[i],caption:vCaption,width:30,showEditorAlways: true,}],
	    		});
	    	}
	    }

	}
	//console.log('createUserColumnsList');
	return resultColumns; 
}

function changeUsersGrid(value){
	var gridInstance = $('#gridUsers').dxDataGrid('instance');
	// editing allowUpdating: true,
	if(value=='0'){// 출석현황
		gridInstance.option("editing.allowUpdating",false);
		setAllowEditing(gridInstance,false,[]);
	}else{// 출석부
		gridInstance.option("editing.allowUpdating",true);
		setAllowEditing(gridInstance,true,['C_SEQ_NO','C_USER_NAME','C_USER_HP','C_USER_BIRTH']);
	}
}
