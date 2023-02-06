//시설공통휴관일 test
let storeHolidaySchedule=null;
let holidayCalendar=null;
let unavailableCalendarData= null;
let unavailableSelectedInfo=null;

function formInit()
{
	createHolidaySchedule();// 휴관일 달력
}
 unavailableCalendarData = [
	 {
		 CALENDAR_ETC: '성탄절',
		 CAL_DATE: '2022-12-25',
		 DATE_TYPE:2,
		 DATE_TYPE_STR:'법정공휴일',
	 },
	 {
		 CALENDAR_ETC: '설날연휴',
		 CAL_DATE: '2023-01-21',
		 DATE_TYPE:2,
		 DATE_TYPE_STR:'법정공휴일',
	 },
	 {
		 CALENDAR_ETC: '설날연휴',
		 CAL_DATE: '2023-01-22',
		 DATE_TYPE:2,
		 DATE_TYPE_STR:'법정공휴일',
	 },
	 {
		 CALENDAR_ETC: '설날연휴',
		 CAL_DATE: '2023-01-23',
		 DATE_TYPE:2,
		 DATE_TYPE_STR:'법정공휴일',
	 },
	 {
		 CALENDAR_ETC: '삼일절',
		 CAL_DATE: '2023-03-01',
		 DATE_TYPE:2,
		 DATE_TYPE_STR:'법정공휴일',
	 },
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
                    text :'법정공휴일가져오기',
                },
                onClick(e) {
                	//CreateCopySchForm();
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
            return unavailableCalendarData.filter((item) => item.CAL_DATE=== localeDate).length > 0;
        }
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
	var class1 = isDisableDate(cellData.date,cellData.view) ? 'hs-calender-disabled':'';
    var visible1 = cellData.view === 'month' ? 'table' :'none';
    var visible2 = cellData.view === 'month' ? 'block' :'none';
    var isHoliday = isLegalHoliday(cellData.date);
    var text = '';//isHoliday? legalHolidayText(cellData.date) : '';
    var text = '';//isHoliday? legalHolidayText(cellData.date) : '';
    var textClass = '';//isHoliday ? 'hs-holiday-date':'';
    var dayClass =  '';//isHoliday ?  'hs-holiday-day':'';
    var itemIndex = getDisabledItemIndex(cellData.date)
    var disabledItem = itemIndex>-1 ?  unavailableCalendarData[itemIndex]:undefined;
    
    if(itemIndex >=0 ) {
        $(cellElement[0]).addClass('hs-cell-disabled');
    }
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
