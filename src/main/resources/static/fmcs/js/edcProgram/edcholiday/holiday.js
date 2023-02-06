//강좌휴관일관리
let storeHolidayPrgs=null;
let storeHolidaySchedule=null;
let holidayCalendar=null;
let frmholidayCondition = null;
let unavailableCalendarData= null;
let unavailableSelectedInfo=null;
var frmCondition ={
		SEARCH_TYPE_1:'0',
		SEARCH_TYPE_2:'',
		SRCH_MON: true,
		SRCH_TUE: true,
		SRCH_WED: true,
		SRCH_THU: true,
		SRCH_FRI: true,
		SRCH_SAT: true,
		SRCH_SUN: true,
		CATEGORY_DROPDOWN:[],
}
function formInit()
{
	
	createCondition(); //조회 항목 생성
	createEduPrgs();// 강좌 목록
	createHolidaySchedule();// 휴관일 달력
}
function createCondition(){
	const now = new Date();
		$('#holidayCondition').dxForm({
			width:'90vw',
			labelMode:'hidden',
			colCount:7,
		    showColonAfterLabel: false,
		    formData: frmCondition,
		    onInitialized:function(e){
		    	frmholidayCondition = e.component;
			 },
		    items: [
		    	{dataField: 'SEARCH_TYPE_1',label:{visible:false},editorType: 'dxSelectBox',
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
		       {
					dataField: 'SEARCH_TYPE_2',
					editorType: 'dxSelectBox',
					editorOptions:
					{
						dataSource:week_gubn,
						 valueExpr: 'value', displayExpr: 'text',
						 placeholder:'강좌요일',
						 onValueChanged(data) {
							 WeekSelectBoxValueChange(frmholidayCondition,data.value);
								 //var frmCondition = $('#holidayCondition').dxForm('instance');
						 }
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
				{dataField: 'SEARCH_KEYWORD',
					editorOptions:{
						inputAttr: {class: "srchkeyword"},
						width: '100%',
						placeholder:'검색할 강좌명 입력',
					}
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
		EDC_PRGMNM:'16시 아동1반 초급[월화수목]1',
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
	{COMCD: 2,
		CTGCD: '0005',
		EDC_PRGMID:'002',
		INSTRCTR_NAME:'강사명2',	
		EDC_STATUS:'접수준비',
		EDC_PRGMNM:'16시 아동1반 초급[월화수목]2',
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
	{COMCD: 2,
		CTGCD: '0005',
		EDC_PRGMID:'003',
		INSTRCTR_NAME:'강사명2',	
		EDC_STATUS:'접수준비',
		EDC_PRGMNM:'16시 아동1반 초급[월화수목]3',
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
	{COMCD: 2,
		CTGCD: '0005',
		EDC_PRGMID:'004',
		INSTRCTR_NAME:'강사명2',	
		EDC_STATUS:'접수준비',
		EDC_PRGMNM:'16시 아동1반 초급[월화수목]4',
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
	{COMCD: 2,
		CTGCD: '0005',
		EDC_PRGMID:'005',
		INSTRCTR_NAME:'강사명2',	
		EDC_STATUS:'접수준비',
		EDC_PRGMNM:'16시 아동1반 초급[월화수목]5',
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
	{COMCD: 2,
		CTGCD: '0005',
		EDC_PRGMID:'006',
		INSTRCTR_NAME:'강사명2',	
		EDC_STATUS:'접수준비',
		EDC_PRGMNM:'16시 아동1반 초급[월화수목]6',
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
	{COMCD: 2,
		CTGCD: '0005',
		EDC_PRGMID:'007',
		INSTRCTR_NAME:'강사명2',	
		EDC_STATUS:'접수준비',
		EDC_PRGMNM:'16시 아동1반 초급[월화수목]7',
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
	{COMCD: 2,
		CTGCD: '0005',
		EDC_PRGMID:'008',
		INSTRCTR_NAME:'강사명2',	
		EDC_STATUS:'접수준비',
		EDC_PRGMNM:'16시 아동1반 초급[월화수목]8',
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
	{COMCD: 2,
		CTGCD: '0005',
		EDC_PRGMID:'009',
		INSTRCTR_NAME:'강사명2',	
		EDC_STATUS:'접수준비',
		EDC_PRGMNM:'16시 아동1반 초급[월화수목]9',
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
	{COMCD: 2,
		CTGCD: '0005',
		EDC_PRGMID:'010',
		INSTRCTR_NAME:'강사명2',	
		EDC_STATUS:'접수준비',
		EDC_PRGMNM:'16시 아동1반 초급[월화수목]10',
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
	{COMCD: 2,
		CTGCD: '0005',
		EDC_PRGMID:'011',
		INSTRCTR_NAME:'강사명2',	
		EDC_STATUS:'접수준비',
		EDC_PRGMNM:'16시 아동1반 초급[월화수목]11',
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
function createEduPrgs(){
	storeWaitPrgs = new DevExpress.data.ArrayStore({
		key: 'EDC_PRGMID',
	    data: waitPrgs,
	});
	//repaintChangesOnly:true,
	$('#gridEduPrgs').dxDataGrid({
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
	    	visible: false,	
		    placeholder: 'Search...',
		    inputAttr: { 'autocomplete': 'off' }  
	    },
	    focusedRowEnabled: true,
		focusedRowIndex: 0,
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
		    selectedRowIndex = e.rowIndex;
		    $('#selectPrgNM').text(e.row.data.EDC_PRGMNM);
	    	 //editorSetRow(e.row.data);
		},
	    onToolbarPreparing(e) {
              //const dataGrid = e.component;
              e.toolbarOptions.items.unshift(
	    		  {
	                  location:'before',
	                  template:'<div class="selectHint"><i class="icon dx-icon-info"></i>[일정등록]·[일정삭제]시, 선택한 강좌의 휴관일이 일괄 적용 됩니다.</div>'
	              },
              );
             
	    },     
	});
}

//---------------------------------
//강좌 요금 목록-datagrid columns 생성 
//---------------------------------
function createColumnsList() 
{
	var resultColumns = {};
	
	resultColumns = [
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
	];
	//배정대기:예약 대기 인원으로  접수한상태
	return resultColumns;
}

 unavailableCalendarData = [
	  {
		  CALENDAR_ETC: '공사 휴관일',
		  CAL_DATE: '2023-01-30',
		  DATE_TYPE:1,
		  DATE_TYPE_STR:'휴관일',
		  EDC_PRGMID:'001',
	  },/* {
		  CALENDAR_ETC: '설날연휴',
		  CAL_DATE: '2023-01-21',
		  DATE_TYPE:1,
		  DATE_TYPE_STR:'휴관일',
		  EDC_PRGMID:'001',
	  }, {
		  CALENDAR_ETC: '설날연휴',
		  CAL_DATE: '2023-01-22',
		  DATE_TYPE:1,
		  DATE_TYPE_STR:'휴관일',
		  EDC_PRGMID:'001',
	  }, {
		CALENDAR_ETC: '설날연휴',
		CAL_DATE: '2023-01-23',
		DATE_TYPE:1,
		DATE_TYPE_STR:'휴관일',
		EDC_PRGMID:'001',
	  }*/
	];


function createHolidaySchedule(){
	//timeZone: 'Asia/Seoul',
	 /*표시 되는 일자로
	  * dataSource: DevExpress.data.AspNet.createStore({
         key: "ID",
         loadUrl: serviceUrl + "/GetAction",
         insertUrl: serviceUrl + "/InsertAction",
         updateUrl: serviceUrl + "/UpdateAction",
         deleteUrl: serviceUrl + "/DeleteAction"
    })
    dataSource: new DevExpress.data.ArrayStore({
        data: sdata,
        key: 'CAL_DATE',
    }),   
    resources: [
        {
            fieldExpr: 'holidayType',
            dataSource: holidayTypes,
            label: '휴관일구분'
        }
    ],*/
	/*unavailableCalendarData = new DevExpress.data.ArrayStore({
        data: sdata,
        key: 'CAL_DATE',
    });*/
	
	$('#holidaySchedule').dxCalendar({
        showTodayButton : true,
        minZoomLevel : 'month',
        maxZoomLevel : 'month',
        activeStateEnabled : false,
        focusStateEnabled : false,
        cellTemplate : unavailableCellTemplate,
        onCellClick(e){
            if(!isDisableDate(e.value, 'month')) {
            	unavailableSelectedInfo = e.value;
                CreateEditHolidayForm(true);
            }
        },
        onInitialized(e){
        	holidayCalendar= e.component;
        }
	});
	$('#holidayToolbar').dxToolbar({
		items :[
			{
                location:'before',
                template:'<div class="selectPrgName" style="margin-left:8px;"><i class="icon dx-icon-isnotblank"></i> 강좌명 : <span id="selectPrgNM">16시 아동1반 초급[월화수목]</span></div>'
            },
            {
                location:'after',
                widget:'dxButton',
                cssClass:'functionbtn',
                options :{
                    text :'일정등록',
                },
                onClick(e) {
                	CreateEditHolidayForm(true);
                }
            },
            {
                location:'after',
                widget:'dxButton',
                cssClass:'functionbtn',
                options :{
                    text :'일정삭제',
                },
                onClick(e) {
                	CreateEditHolidayForm(false);
                }
            },
            {
                location : 'after',
                widget :'dxButton',
                cssClass:'functionbtn',
                options : {
                    text :'일정복사',
                },
                onClick(e) {
                	CreateCopySchForm();
                }
            }
        ]
	});
/*	
	var element = $('#holidayToolbar').detach();
	$('#holidaySchedule').append(element);*/
}
function isDisableDate(date, view) {

    if(view === 'month') {
        if(unavailableCalendarData) {
            const localeDate = toDateFormat(date);
            if(unavailableCalendarData.filter((item) => item.CAL_DATE=== localeDate).length > 0){
            	return true;
        	}
        }
        return isLegalHoliday(date);
    }

}

function getDisabledItem(date){
    if(unavailableCalendarData) {
    	const localeDate = toDateFormat(date);
        const disableItem =  unavailableCalendarData.find((item) => item.CAL_DATE === localeDate);
        if(disableItem){
            return disableItem;
        }
    }
}
function getDisabledItemIndex(date){
    if(unavailableCalendarData) {
    	const localeDate = toDateFormat(date);
        const idx =  unavailableCalendarData.findIndex((item,index) => item.CAL_DATE === localeDate);
        return idx;
        
    }
}
function unavailableCellTemplate(cellData, cellIndex, cellElement) {
/*    console.log(cellData);
    console.log(cellIndex);
    console.log(cellElement);
    */
    var class1 = isDisableDate(cellData.date,cellData.view) ? 'hs-calender-disabled':'';
    var visible1 = cellData.view === 'month' ? 'table' :'none';
    var visible2 = cellData.view === 'month' ? 'block' :'none';
    var isHoliday = isLegalHoliday(cellData.date);
    var text = isHoliday? legalHolidayText(cellData.date) : '';
    var textClass = isHoliday ? 'hs-holiday-date':'';
    var dayClass = isHoliday ?  'hs-holiday-day':'';
    /*
    var isHoliday = false;
    var text ='';
    var textClass = '';
    var dayClass = '';
    */
    var itemIndex = getDisabledItemIndex(cellData.date)
    var disabledItem = itemIndex>-1 ?  unavailableCalendarData[itemIndex]:undefined;
    
    if(itemIndex >=0 ) {
        $(cellElement[0]).addClass('hs-cell-disabled');
    }
    legalHolidayText(cellData.date);
    var template=`
        <div style="display:${visible1};width :100%;height:100%;" class='${class1}'>
        	<div style="display: table-row;height:10%;" class="hs-calendar-header">
            	<div style="display:table-cell;width:50%;" class='${textClass}'><span >${text}</span></div>
            	<div style="display:table-cell;text-align:right;width:50%;"><span class='${dayClass}'>${cellData.text}</span></div>
        	</div>
        	<div style="display:table-row" class="hs-calendar-body">
            <div style="display:table-cell;width: 100%;">
            `;
        
    if(disabledItem){
    	template= template + `<div style="display:flex;justify-content: space-between;width:100%;">
        	<div>${disabledItem.CALENDAR_ETC}</div>
            <div style="padding-left:20px;"><a href="#" onClick="removeDisabledItem('${itemIndex}')" ><i class="dx-icon-remove"></i></a></div>
            </div>`;
    }
    template= template +`</div></div></div>`;
   
   return  $(template);
}
function removeDisabledItem(index) {
	//unavailableCalendarData;
	unavailableCalendarData.splice(index, 1 );
	holidayCalendar.repaint();
}
