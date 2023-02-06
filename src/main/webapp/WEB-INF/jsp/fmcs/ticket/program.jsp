<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>일일입장 프로그램관리</title>
    <link rel="stylesheet" href="/fmcs/css/ticket/program.css" type="text/css"/>
</head>
<body class="dx-viewport">
<div class="row row_title">
    <div class="col-12">
        <ul class="navbar-nav">
            <li class="nav-item d-sm-inline-block quick-nav">
                일일입장 프로그램관리
            </li>
        </ul>
    </div>
</div>
<div class="hs-main-container" data-bind="dxBox : {
            direction: 'col',
            width : '100%',
            height:' calc(100vh - 40px)'
        }">
    <div data-options="dxItem : {ratio :1}" class="hs-box">
        <div data-bind="dxDataGrid : $parent.programGridOptions" class="hs-program-grid-container"></div>
    </div>
    <div data-options="dxItem : {ratio :1}" class="hs-tab-box">
        <div data-bind="dxTabPanel : {
                onInitialized(e) {
                    $parent.programTabPanelInstance = e.component;
                },
                height: '100%',
            }">
            <div data-options="dxItem : {title : '요금정보'}">
                <div data-options="dxTemplate : {name : 'item'}" class="hs-box h100p">
                    <div data-bind="dxDataGrid : $parents[1].priceGridOptions"></div>
                </div>
            </div>
            <div data-options="dxItem : {title :'할인적용정보' }">
                <div data-options="dxTemplate : {name : 'item'}" class="hs-box h100p">
                    <div data-bind="dxForm : $parents[1].discountFormOptions" class="h10p"></div>
                    <div data-bind="dxDataGrid : $parents[1].discountGridOptions"></div>
                </div>
            </div>
            <div data-options="dxItem : {title :'이용회차관리'}">
                <div data-options="dxTemplate : {name :'item'}" class="hs-box h100p">
                    <div data-bind="dxDataGrid: $parents[1].roundOfUseGridOptions" class="hs-roundofuse-grid-container"></div>
                </div>
            </div>
            <div data-options="dxItem : {title :'입장권예약불가일정'}">
                <div data-options="dxTemplate : {name : 'item'}" class="hs-box h100p">
                    <div data-bind="dxToolbar : {
                        items :[
                            {
                                location:'after',
                                widget:'dxButton',
                                options :{
                                    text :'일정등록',
                                    type:'default',
                                },
                                onClick(e) {
                                    $parents[1].unavailableCreatePopupInstance.show();
                                }
                            },
                            {
                                location : 'after',
                                widget :'dxButton',
                                options : {
                                    text :'일정복사',
                                     type:'default',
                                },
                                onClick(e) {
                                    $parents[1].unavailableCopyPopupInstance.show();
                                }
                            }
                        ]
                    }" class="mb10"></div>
                    <div data-bind="dxScrollView : {}">
                        <div data-bind="dxCalendar : $parents[1].unavailableCalendarOptions" class="hs-unavailable-calendar-container"></div>
                    </div>
                </div>
            </div>
            <div data-options="dxItem : {title :'전자키발권설정정보'}">
                <div data-options="dxTemplate : {name :'item'}" class="hs-box">
                    <div data-bind="dxForm : $parents[1].keyIssueFormOptions"></div>
                </div>
            </div>
        </div>

    </div>
</div>

<div class="hs-hidden" data-bind="dxPopup : {
    title :'매표운영프로그램 복사',
    width : 680,
    height : 600,
    visible:false,
    onInitialized(e) {
        programCopyPopupInstance = e.component;
    },
    onShowing(e){

        if(!selectedProgram()) {
            DevExpress.ui.dialog.alert('복사할 프로그램을 선택하세요.', '일일입장프로그램 복사');
            return false;
        }

        e.model.programCopyFormOptions.formData({
            SourceLocationCode: selectedProgram().LocationCode,
            SourceProgramId: selectedProgram().ProgramId,
            SourceProgramName: selectedProgram().ProgramName,
        });
    },
    toolbarItems: [
        {
            widget: 'dxButton',
            toolbar: 'bottom',
            location: 'after',
            options: {
                text: '복사생성',

            },
            onClick(e) {
                console.log(programCopyFormInstance.option('formData'));
            }
        },
        {
            widget: 'dxButton',
            toolbar: 'bottom',
            location: 'after',
            options: {
                text: '취소'
            },
            onClick(e) {
                programCopyPopupInstance.hide();
            }
        },
    ],
}">
    <div data-options="dxTemplate : {name : 'content'}">
        <div data-bind="dxForm : programCopyFormOptions"></div>
    </div>
</div>

<div class="hs-hidden" data-bind="dxPopup : {
    title :'이용회차 그룹',
    width : 850,
    height : 580,
    visible :false,
    onInitialized(e) {
        roundOfUseGroupPopupInstance = e.component;
    },
    toolbarItems: [
        {
            widget: 'dxButton',
            toolbar: 'bottom',
            location: 'after',
            options: {
                text: '저장'
            }
        },
        {
            widget: 'dxButton',
            toolbar: 'bottom',
            location: 'after',
            options: {
                text: '취소'
            },
            onClick(e) {
                roundOfUseGroupPopupInstance.hide();
            }
        },
    ],
}">
    <div data-options="dxTemplate:{ name : 'content' }">
        <div data-bind="dxForm : roundOfUseGroupFormOptions"></div>
    </div>

</div>

<div class="hs-hidden" data-bind="dxPopup : {
    title :'자유수영시간표 가져오기',
    width : 1425,
    height : 580,
    visible:false,
    onInitialized(e) {
        freeSwimmingTimeTablePopupInstance = e.component;
    },
    toolbarItems: [
        {
            widget: 'dxButton',
            toolbar: 'bottom',
            location: 'after',
            options: {
                text: '저장'
            },
            onClick(){
                DevExpress.ui.dialog.confirm(`저장하시겠습니까?`, '자유수영시간표 가져오기').done(function (dialogResult) {
                    if(dialogResult) {
                        freeSwimmingGridInstance.saveEditData();
                    }
                });
            }
        },
        {
            widget: 'dxButton',
            toolbar: 'bottom',
            location: 'after',
            options: {
                text: '취소'
            },
            onClick(e) {
                freeSwimmingTimeTablePopupInstance.hide();
            }
        },
    ],
}">
    <div data-options="dxTemplate: { name:'content' }">
        <div data-bind="dxDataGrid : freeSwimmingGridOptions" class="hs-swimming-grid-container"></div>
    </div>
</div>

<div class="hs-hidden" data-bind="dxPopup : {
    title :'일정복사',
    width : 950,
    height: 695,
    visible:false,
    onInitialized(e) {
        unavailableCopyPopupInstance = e.component;
    },
    toolbarItems: [
        {
            widget: 'dxButton',
            toolbar: 'bottom',
            location: 'after',
            options: {
                text: '저장'
            },
            onClick(){
                DevExpress.ui.dialog.confirm(`저장하시겠습니까?`, '일정복사').done(function (dialogResult) {
                    if(dialogResult) {

                    }
                });
            }
        },
        {
            widget: 'dxButton',
            toolbar: 'bottom',
            location: 'after',
            options: {
                text: '취소'
            },
            onClick(e) {
                initUnavailableCopyPopup(this);
                unavailableCopyPopupInstance.hide();
            }
        },
    ],
}">
    <div data-options="dxTemplate: { name:'content' }">
        <span class="dx-field-item-label-text mr05">복사할 프로그램</span>
        <div data-bind="dxSelectBox :{
            width : '30%',
            dataSource : new DevExpress.data.ArrayStore({
                key :'ProgramId',
                data : copySchedulePrograms
            }),
            valueExpr :'ProgramId',
            displayExpr :'ProgramName',
            onValueChanged(e) {
                unavailableCopySourceListOptions.dataSource(disableCalendarDataForCopy);
                unavailableCopySourceListInstance.reload();
            },
            onInitialized(e){
                unavailableCopyProgramSelectBoxInstance = e.component;
            }
        }" class="hs-scheduler-copy-selectbox"></div>
        <div class="hs-scheduler-copy-container">
            <div class="hs-scheduler-copy-popup-list-box">
                <div><span class="dx-field-item-label-text">일정목록</span></div>
                <div data-bind="dxList : unavailableCopySourceListOptions" class="hs-scheduler-copy-popup-list"></div>
                <div class="hs-scheduler-copy-popup-bottom-box">
                    <div class="white" data-bind="dxButton: {
                        text :'전체선택',
                        stylingMode : 'text',
                        onClick(e){
                            unavailableCopySourceListInstance.selectAll();
                        },
                        onInitialized(e){
                            unavailableCopySourceAllButtonInstance = e.component;
                        }
                    }"></div>
                    <div class="hs-scheduler-copy-popup-count-box"><span
                            class="hs-scheduler-copy-popup-count-text white"
                            data-bind="text : unavailableCopySourceCount"></span></div>
                </div>
            </div>

            <div class="hs-schduler-copy-popup-button-container">
                <div data-bind="dxButton: {
                    icon : 'chevronright',
                    stylingMode : 'text',
                    onClick(e){
                        const selectedItems = unavailableCopySourceListInstance.option('selectedItems');
                        if(selectedItems) {
                            unavailableCopyTargetListOptions.dataSource(selectedItems);
                            unavailableCopyTargetListInstance.reload();
                        }
                    }
                }">
                </div>
                <div data-bind="dxButton:{
                    icon : 'chevronleft',
                    stylingMode : 'text',
                    onClick(e) {
                        const selectedKeys = unavailableCopyTargetListInstance.option('selectedItemKeys');
                        if(selectedKeys) {
                            const prevSource = unavailableCopyTargetListOptions.dataSource();
                            const filtered = prevSource.filter((element) => !selectedKeys.includes(element.Date));
                            unavailableCopyTargetListOptions.dataSource(filtered);
                            unavailableCopyTargetListInstance.reload();
                        }
                    }
                }"></div>
            </div>
            <div class="hs-scheduler-copy-popup-list-box">
                <div><span class="dx-field-item-label-text">복사할 일정</span></div>
                <div data-bind="dxList : unavailableCopyTargetListOptions" class="hs-scheduler-copy-popup-list"></div>
                <div class="hs-scheduler-copy-popup-bottom-box">
                    <div class="white" data-bind="dxButton: {
                        text :'전체선택',
                        stylingMode : 'text',
                        onClick(e){
                            unavailableCopyTargetListInstance.selectAll();
                        },
                        onInitialized(e) {
                            unavailableCopyTargetAllButtonInstance = e.component;
                        }
                    }"></div>
                    <div class="hs-scheduler-copy-popup-count-box">
                        <span class="hs-scheduler-copy-popup-count-text white" data-bind="text :unavailableCopyTargetCount"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="hs-hidden" data-bind="dxPopup : {
    title : '예약불가일정 등록',
    width : 580,
    height : 500,
    visible: false,
    toolbarItems: [
        {
            widget: 'dxButton',
            toolbar: 'bottom',
            location: 'after',
            options: {
                text: '저장',
                onClick(e){
                    DevExpress.ui.dialog.confirm(`저장하시겠습니까?`, '예약불가일정 등록').done(function(dialogResult){
                        if(dialogResult) {

                            const formData = unavailableCreateFormInstance.option('formData');

                            const staticDates = getDatesInRange(formData['startDate'], formData['endDate']);

                            staticDates.forEach((item)=> {
                                const found = unavailableCalendarData().find( x =>x.Date.toLocaleDateString() === new Date(item).toLocaleDateString());
                                if(found){
                                    return false;
                                }
                                formData['date'] =  new Date(item);
                                const disableItem = new DisableItem(formData);
                                unavailableCalendarData.push(disableItem);
                            });

                            const repeat = formData['repeat'];

                            if(repeat) {

                               const rule = rrule.RRule.fromString(formData['recurrenceRule']);
                               let disableDatesByRule = rule.all();

                               disableDatesByRule.forEach((item)=> {

                                   const found = unavailableCalendarData().find( x =>x.Date.toLocaleDateString() === new Date(item).toLocaleDateString());
                                   if(found){
                                       return false;
                                   }
                                   formData['date'] =  new Date(item);
                                   const disableItem = new DisableItem(formData);
                                   unavailableCalendarData.push(disableItem);
                               });
                            }
                            initUnavailableCreateForm();
                            unavailableCreatePopupInstance.hide();
                        }
                    });

                }
            },
        },
        {
            widget: 'dxButton',
            toolbar: 'bottom',
            location: 'after',
            options: {
                text: '취소',
                onClick(e) {
                    initUnavailableCreateForm();
                    unavailableCreatePopupInstance.hide();
                }
            },
        },
    ],
    onShowing(e){

        const today = new Date();
        e.model.unavailableCreateFormOptions.formData(
            {
                programId : e.model.selectedProgram().ProgramId,
                programName : e.model.selectedProgram().ProgramName,
                startDate : e.model.unavailableSelectedInfo() ? e.model.unavailableSelectedInfo().date : today,
                endDate : e.model.unavailableSelectedInfo() ? e.model.unavailableSelectedInfo().date : today,
            }
        );
    },
    onInitialized(e){
        unavailableCreatePopupInstance = e.component;
    },
    onHiding(e) {
        e.model.unavailableCalendarInstance.repaint();
    }
}">
    <div data-options="dxTemplate :{ name : 'content'}">
        <div data-bind="dxForm:unavailableCreateFormOptions"></div>
    </div>
</div>

<div data-bind="dxContextMenu : bookingCalendarContextMenuOptions"></div>

<div class="hs-hidden" data-bind="dxPopup : {
    width : 480,
    height: 450,
    title :'매표가능시간 일괄설정',
    visible :false,
    onInitialized(e){
        sellableTimeBatchPopupInstance = e.component;
    },
    onShowing(e) {
        let initData  = {
            SellableAfterStart : 'N',
        };
        sellableTimeBatchFormOptions.formData(initData);
    },
    onHiding(e){
        sellableTimeBatchFormInstance.resetOption('formData');
    },
    toolbarItems: [
        {
            widget: 'dxButton',
            toolbar: 'bottom',
            location: 'after',
            options: {
                text: '일괄처리',
                onClick(e){
                    DevExpress.ui.dialog.confirm(`일괄처리하시겠습니까?`, '매표가능시간 일괄설정').done(function (dialogResult) {
                        if(dialogResult) {

                        }
                    });
                }
            },
        },
        {
            widget: 'dxButton',
            toolbar: 'bottom',
            location: 'after',
            options: {
                text: '취소',
                onClick(e) {
                    sellableTimeBatchPopupInstance.hide();
                }
            },
        },
    ],
}">
    <div data-options="dxTemplate :{ name : 'content'}">
        <div data-bind="dxForm: sellableTimeBatchFormOptions"></div>
    </div>
</div>

<script type="text/html" id="unavailable-cell-template">
    <div class="hs-unavailable-calendar-cell-table" data-bind="visible : view === 'month'">
        <div class="header-row">
            <div class="header-cell-west"><span data-bind="text:holidayText(date),css : { 'hs-holiday-date' :  isHoliday(date)} "></span></div>
            <div class="header-cell-east"><span data-bind="text:text,css : { 'hs-holiday-date' :  isHoliday(date)}"></span></div>
        </div>
        <div class="hs-calendar-body">
            <div class="hs-calendar-body-cell">
                <div data-bind="with:getDisabledItem(date)" class="hs-disabled-item-container">
                    <div class="pl20 tar"><a href="#" data-bind="click:removeDisabledItem"><i class="dx-icon-remove"></i></a></div>
                    <div class="body-cell-description" data-bind="attr:{ id : 'body-cell-description-' + Date.formatDateString('yyyyMMdd')}"><span data-bind="text: Description"></span></div>
                    <div data-bind="dxTooltip : {
                                target: '#body-cell-description-'+Date.formatDateString('yyyyMMdd'),
                                showEvent: 'mouseenter',
                                hideEvent: 'mouseleave'
                        }">
                        <div data-options="dxTemplate : {name : 'content'}">
                            <div><span data-bind="text: Description"></span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div data-bind="visible : view !== 'month'" class="tac">
        <span data-bind="text:text"></span>
    </div>
</script>

<script type="text/html" id="booking-cell-template">
    <div class="hs-booking-calendar-table">
        <div class="header-row">
            <div class="header-cell-west"><span><@=holiday@></span></div>
            <div class="header-cell-east"><span><@=text@></span></div>
        </div>
    </div>
</script>

<script type="text/html" id="booking-legend-template">
    <div class="hs-booking-calendar-legend-table">
        <div class="cell">
            <div class="enable"></div>
            <div class="inline">예약일</div>
        </div>
        <div class="cell">
            <div class="disable"></div>
            <div class="inline">예약불가일</div>
        </div>
    </div>
</script>
<script type="text/html" id="application-period-template">
    <div data-bind="visible :data.AcceptancePeriodPolicyCode === '0001'"><span data-bind="text:data.RegularStartDateTime"></span> ~ <span data-bind="text:data.RegularEndDateTime"></span>
    </div>
    <div data-bind="visible: data.AcceptancePeriodPolicyCode === '0002' && data.BookingPeriodPolicyCode === '0001'">
        <span data-bind="text:data.AcceptancePeriodPolicy"></span> - 이용일 <span data-bind="text:data.ReservationOnTheDayStart"></span>일 전부터 <span data-bind="text:data.ReservationOnTheDayEnd"></span>일까지
    </div>
    <div data-bind="visible: data.AcceptancePeriodPolicyCode === '0002' && data.BookingPeriodPolicyCode === '0002'">
        <span data-bind="text:data.AcceptancePeriodPolicy"></span> - <span data-bind="text:getCalendarDate(data)"></span>
    </div>
</script>

<script type="text/html" id="weekday-buttongroup-template">
    <span><@=Text@></span>
</script>

<script type="text/html" id="label-help-tooltip-template">
    <div id='template-content'>
        <span class="dx-field-item-label-text" data-bind="text:text"></span>
        <i id="cancel-helped-info" class="dx-icon dx-icon-help vam"></i>
    </div>
    <div data-bind="dxTooltip : {
            target: '#cancel-helped-info',
            showEvent: 'mouseenter',
            hideEvent: 'mouseleave'
    }">
        <div data-options="dxTemplate : {name : 'content'}">
            <div id="tooltip-content"><span data-bind="text: editorOptions.labelHelpText"></span></div>
        </div>
    </div>
</script>

<script type="text/html" id="group-cell-template">
    <span data-bind="text:displayValue"></span>
</script>

<script id="address-search-icon-template" type="text/html">
    <span class='fa-stack hs-small'>
        <i class='fa fa-map fa-stack-2x'></i>
        <i class='fa fa-search fa-stack-1x dark-gray'></i>
    </span>
</script>

<script type="text/javascript" src="/webjars/rrule/2.6.8/dist/es5/rrule.min.js"></script>
<script type="text/javascript" src="/fmcs/js/ticket/disableItem.js"></script>
<script type="text/javascript" src="/fmcs/js/ticket/recurrenceRule.js"></script>
<script type="text/javascript" src="/fmcs/js/ticket/program.js"></script>
<script type="text/javascript" src="/backOffice/ckeditor/ckeditor.js"></script>
<script type="text/javascript" src="/backOffice/DevExtreme/22.1.5/js/devextreme/exceljs.min.js"></script>
<script type="text/javascript" src="/backOffice/DevExtreme/22.1.5/js/devextreme/FileSaver.min.js"></script>
<script type="text/javascript">

    const viewOptions = {
        bookingCalendarContextMenuOptions: {
            selectedDate: ko.observable(),
            enableDates: ko.observableArray([]),
            disableDates: ko.observableArray([]),
            targetComponent: ko.observable(),
            targetCellOptions: ko.observable(),
            onInitialized(e) {
                viewOptions.bookingCalendarContextMenuInstance = e.component;
            },
            target: '.hs-program-booking-calendar',
            showEvent: "mouseenter",
            onItemClick(e) {
                const obj = {
                    EnableDates: e.model.bookingCalendarContextMenuOptions.enableDates(),
                    DisableDates: e.model.bookingCalendarContextMenuOptions.disableDates(),
                }
                const selectedDate = e.model.bookingCalendarContextMenuOptions.selectedDate();
                if (e.itemData.text === '예약일삭제') {
                    e.model.bookingCalendarContextMenuOptions.enableDates.remove(selectedDate.formatDateString('yyyy-MM-dd'));
                    obj.EnableDates = e.model.bookingCalendarContextMenuOptions.enableDates();

                } else if (e.itemData.text === '예약불가일해제') {
                    e.model.bookingCalendarContextMenuOptions.disableDates.remove(selectedDate.formatDateString('yyyy-MM-dd'));
                    obj.DisableDates = e.model.bookingCalendarContextMenuOptions.disableDates();

                } else if (e.itemData.text === '예약일설정') {
                    e.model.bookingCalendarContextMenuOptions.enableDates.push(selectedDate.formatDateString('yyyy-MM-dd'));
                    obj.EnableDates = e.model.bookingCalendarContextMenuOptions.enableDates();

                } else if (e.itemData.text === '예약불가일설정') {
                    e.model.bookingCalendarContextMenuOptions.disableDates.push(selectedDate.formatDateString('yyyy-MM-dd'));
                    obj.DisableDates = e.model.bookingCalendarContextMenuOptions.disableDates();

                }

                const options = e.model.bookingCalendarContextMenuOptions.targetCellOptions();
                options.setValue(obj);
                e.model.bookingCalendarContextMenuOptions.targetComponent().repaint();

            }
        },
        bookingCalendarContextMenuInstance: {},
        selectedProgram: ko.observable(),
        programGridInstance: {},
        programGridOptions: {
            height: '100%',
            dataSource: ko.observable(null),
            columnAutoWidth: true,
            selection: {
                mode: 'single',
            },
            loadPanel: {
                enabled: true
            },
            columnChooser :{
                enabled:true,
                mode :  'select',
            },
            rowAlternationEnabled : true,
            focusedRowEnabled: true,
            showRowLines: true,
            showBorders: true,
            columns: [
                {
                    dataField: 'CategoryCode',
                    calculateDisplayValue: 'CategoryName',
                    caption: '운영상품분류',
                    setCellValue: function (newData, value) {
                        this.defaultSetCellValue(newData, value);
                    },
                    editCellTemplate: categoryEditCellTemplate
                },
                {
                    caption: '매표장소분류',
                    dataField: 'LocationCode',
                    calculateDisplayValue: 'LocationName',
                    editorType: 'dxSelectBox',
                    editorOptions: {
                        buttons: ["dropDown",
                            {
                                name: "add-location",
                                location: "after",
                                options: {
                                    icon: "",
                                    text: '추가',
                                    stylingMode: "contained",
                                    type: "default",
                                    onClick: function (e) {

                                    }
                                }
                            }],
                        dataSource: new DevExpress.data.ArrayStore({
                            key: 'Code',
                            data: locations,
                        }),
                        valueExpr: 'Code',
                        displayExpr: 'Name',
                    },
                    formItem: {
                        label: {
                            text: '장소분류',
                        },
                    }
                },
                {
                    dataField: 'ProgramName',
                    allowEditing: true,
                    caption: '운영프로그램명'
                },
                {
                    caption :'문의처',
                    dataField: 'Inquiries',
                    editorType: 'dxTextBox',
                    visible: false,
                    formItem: {
                        label: {
                            text: '문의처'
                        },
                    }
                },
                {
                    caption: '정원운영방법',
                    dataType: 'string',
                    dataField: 'SitingCapacityPolicyCode',
                    lookup: {
                        dataSource: sitingCapacityPolicy,
                        displayExpr: 'Name',
                        valueExpr: 'Code',
                    },
                    formItem: {
                        colSpan: 2,
                    }
                },
                {
                    caption: '접수기간',
                    allowSorting: false,
                    cellTemplate: $('#application-period-template')
                },
                {
                    caption: '예약가능 매표인원수',
                    columns: [
                        {
                            dataField: 'IndividualCapacityPolicy',
                            dataType:'boolean',
                            trueText :'Y',
                            falseText :'N',
                            editorType: 'dxSelectBox',
                            editorOptions: {
                                dataSource: new DevExpress.data.ArrayStore({
                                    key: 'Code',
                                    data: purchaseLimitPolicy
                                }),
                                valueExpr: 'Code',
                                displayExpr: 'Name',
                            },
                            visible: false,
                            showInColumnChooser : false,
                            setCellValue: function (newData, value) {
                                this.defaultSetCellValue(newData, value);
                            },
                            formItem : {
                                colSpan: 2,
                                label: {
                                    text: '개인',
                                },
                            }
                        },
                        {
                            caption: '개인',
                            columns: [
                                {
                                    caption: '최소',
                                    dataField: 'IndividualMin',
                                    dataType: 'number',
                                    editorType: 'dxNumberBox',
                                    editorOptions: {
                                        showSpinButtons: true,
                                        showClearButton: true,
                                        min: 0,
                                    },
                                    formItem : {
                                        label: {
                                            text: '최소인원',
                                        },
                                    }
                                },
                                {
                                    caption: '최대',
                                    dataField: 'IndividualMax',
                                    dataType: 'number',
                                    editorType: 'dxNumberBox',
                                    editorOptions: {
                                        showSpinButtons: true,
                                        showClearButton: true,
                                        min: 0,
                                    },
                                    formItem : {
                                        label: {
                                            text: '최대인원',
                                        },
                                    }
                                }
                            ]
                        },
                        {
                            dataField: 'GroupCapacityPolicy',
                            visible: false,
                            showInColumnChooser : false,
                            dataType:'boolean',
                            trueText :'Y',
                            falseText :'N',
                            editorType: 'dxSelectBox',
                            editorOptions: {
                                dataSource: new DevExpress.data.ArrayStore({
                                    key: 'Code',
                                    data: purchaseLimitPolicy
                                }),
                                valueExpr: 'Code',
                                displayExpr: 'Name',
                            },
                            setCellValue: function (newData, value) {
                                this.defaultSetCellValue(newData, value);
                            },
                            formItem : {
                                label: {
                                    text: '단체',
                                },
                                colSpan: 2,
                            }
                        },
                        {
                            caption: '단체',
                            columns: [
                                {
                                    caption: '최소',
                                    dataField: 'GroupMin',
                                    dataType: 'number',
                                    editorType: 'dxNumberBox',
                                    editorOptions: {
                                        showSpinButtons: true,
                                        showClearButton: true,
                                        min: 0,
                                    },
                                    formItem : {
                                        label: {
                                            text: '최소인원',

                                        },
                                    }
                                },
                                {
                                    caption: '최대',
                                    dataField: 'GroupMax',
                                    dataType: 'number',
                                    editorType: 'dxNumberBox',
                                    editorOptions: {
                                        showSpinButtons: true,
                                        showClearButton: true,
                                        min: 0,
                                    },
                                    formItem :{
                                        label: {
                                            text: '최대인원',
                                        },
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    caption: '운영여부',
                    dataField: 'IsRunning',
                    alignment: 'left',
                    dataType: 'boolean',
                    lookup: {
                        dataSource: runningData,
                        displayExpr: 'Name',
                        valueExpr: 'Code'
                    },
                    formItem : {
                        colSpan: 2,
                    },
                    showEditorAlways:false,
                    calculateDisplayValue: (rowData) =>{
                        const {Name} = runningData.find(({Code})=> Code === rowData.IsRunning)|| {};
                        return Name;
                    },
                },
                {
                    caption: '키오스크노출여부',
                    dataField: 'DisplayedAtKiosk',
                    dataType: 'boolean',
                    lookup: {
                        dataSource: displayedAtKioskData,
                        displayExpr: 'Name',
                        valueExpr: 'Code',
                    },
                    formItem : {
                        colSpan: 2,
                    },
                    showEditorAlways:false,
                    calculateDisplayValue: (rowData)=> {
                        const {Name} = displayedAtKioskData.find(({Code})=> Code === rowData.DisplayedAtKiosk) || {};
                        return Name;
                    },
                },
                {
                    caption: '입장발권여부',
                    dataField: 'IsTicketing',
                    dataType: 'boolean',
                    lookup: {
                        dataSource: checkInData,
                        displayExpr: 'Name',
                        valueExpr: 'Code',
                    },
                    formItem : {
                        colSpan: 2,
                    },
                    showEditorAlways:false,
                    calculateDisplayValue:(rowData) =>{
                        const {Name} = checkInData.find(({Code})=> Code === rowData.IsTicketing)||{};
                        return Name;
                    },
                },
                {
                    caption: '온라인공개여부',
                    dataField: 'IsPublic',
                    visible: false,
                    lookup: {
                        dataSource: publicData,
                        displayExpr: 'Name',
                        valueExpr: 'Code'
                    },
                    dataType: 'boolean',
                    trueText: 'Y',
                    falseText: 'N',
                    formItem: {
                        colSpan: 2,
                    }
                },
                {
                    dataField: 'AcceptancePeriodPolicyCode',
                    visible: false,
                    showInColumnChooser : false,
                    editorType: 'dxSelectBox',
                    editorOptions: {
                        dataSource: acceptancePeriodStandards,
                        displayExpr: 'Name',
                        valueExpr: 'Code',
                    },
                    setCellValue: function (newData, value) {
                        this.defaultSetCellValue(newData, value);
                    },
                    formItem: {
                        colSpan: 2,
                        label: {
                            text: '접수기간운영기준',
                        },
                    }
                },
                {
                    dataField: 'AcceptancePeriodPolicy',
                    visible: false,
                    showInColumnChooser : false,
                    setCellValue: function (newData, value) {
                        this.defaultSetCellValue(newData, value);
                    },
                },
                {
                    dataField: 'RegularStartDateTime',
                    editorType: 'dxDateBox',
                    visible: false,
                    showInColumnChooser : false,
                    editorOptions: {
                        type: 'datetime',
                        displayFormat: 'yyyy-MM-dd HH:mm',
                        showAnalogClock: false,
                    },
                    formItem: {
                        label: {
                            text: '시작일',
                        },
                        cssClass: 'hs-regular-start-date-box',
                    }
                },
                {
                    dataField: 'RegularEndDateTime',
                    visible: false,
                    showInColumnChooser : false,
                    editorType: 'dxDateBox',
                    editorOptions: {
                        type: 'datetime',
                        displayFormat: 'yyyy-MM-dd HH:mm',
                        showAnalogClock: false,
                    },
                    formItem: {
                        label: {
                            text: '종료일',
                        },
                        cssClass: 'hs-regular-end-date-box',
                    }
                },
                {
                    dataField: 'ReservationLimitPolicy',
                    visible: false,
                    caption :'예약신청횟수제한',
                    setCellValue: function (newData, value) {
                        this.defaultSetCellValue(newData, value);
                    },
                    editorType: 'dxSelectBox',
                    editorOptions: {
                        value: '',
                        dataSource: new DevExpress.data.ArrayStore({
                            key: 'Code',
                            data: limitsForReservation,
                        }),
                        valueExpr: 'Code',
                        displayExpr: 'Name',
                    },
                    formItem: {
                        colSpan: 2,
                    }
                },
                {
                    caption: '신청제한횟수',
                    dataField: 'PurchaseLimit',
                    dataType: 'number',
                    editorType: 'dxNumberBox',
                    editorOptions: {
                        showSpinButtons: true,
                        min: 0,
                        max: 20
                    },
                    formItem: {
                        label: {
                            text: '제한횟수',
                        },
                        colSpan: 2,
                        cssClass: 'hs-regular-start-date-box'
                    }
                },
                {
                    caption :'요금정책',
                    dataField: 'FarePolicy',
                    visible: false,
                    lookup: {
                        dataSource: farePolicy,
                        displayExpr: 'Name',
                        valueExpr: 'Code',
                    },
                    formItem: {
                        colSpan: 2,
                        editorType: 'dxSelectBox',
                        editorOptions: {
                            dataSource: new DevExpress.data.ArrayStore({
                                key: 'Code',
                                data: farePolicy,
                            }),
                            valueExpr: 'Code',
                            displayExpr: 'Name',
                        },
                    }
                },
                {
                    caption  :'예약결제취소제한',
                    dataField: 'CancellationPolicy',
                    visible: false,
                    setCellValue: function (newData, value) {
                        this.defaultSetCellValue(newData, value);
                    },
                    lookup: {
                        dataSource: paymentCancellationPolicy,
                        valueExpr: 'Code',
                        displayExpr: 'Name',
                    },
                    formItem : {
                        label: {
                            text: '예약결제취소제한',
                            template: $('#label-help-tooltip-template')
                        },
                        colSpan: 2,
                        editorType: 'dxSelectBox',
                        editorOptions: {
                            dataSource: new DevExpress.data.ArrayStore({
                                key: 'Code',
                                data: paymentCancellationPolicy,
                            }),
                            valueExpr: 'Code',
                            displayExpr: 'Name',
                            labelHelpText: '제한안함은 당일 이용회차 시작시간 전까지 취소가능',
                        },
                    }
                },
                {
                    dataField: 'CancellationBeforeDay',
                    visible: false,
                    showInColumnChooser : false,
                    editCellTemplate: function (container, options) {

                        $('<div></div>').addClass('hs-cancel-edit-container')
                            .append($('<div></div>').addClass('hs-cancel-editor-label').append('<span>').addClass('dx-field-item-label-text').html('이용일'))
                            .append($('<div></div>').dxSelectBox({
                                value: options.value,
                                dataSource: new DevExpress.data.ArrayStore({
                                    key: 'Code',
                                    data: paymentCancellationDays(30),
                                }),
                                valueExpr: 'Code',
                                displayExpr: 'Name',
                                onValueChanged(e) {
                                    options.setValue(e.value);
                                }
                            }))
                            .append($('<div></div>').addClass('hs-cancel-editor-label').append('<span>').addClass('dx-field-item-label-text').html('일 전'))
                            .appendTo(container);
                    },
                    formItem : {
                        label: {
                            visible: false,
                        }
                    },
                },
                {
                    dataField: 'CancellationBeforeTime',
                    visible: false,
                    showInColumnChooser : false,
                    editCellTemplate: function (container, options) {
                        $('<div></div>').addClass('hs-cancel-edit-container')
                            .append($('<div></div>').dxDateBox({
                                value: options.value,
                                type: 'time',
                                displayFormat: 'HH:mm',
                                onValueChanged(e) {
                                    options.setValue(e.value);
                                }
                            }))
                            .append($('<div></div>').addClass('hs-cancel-before-time-editor').append('<span>').addClass('dx-field-item-label-text').html('까지 취소가능'))
                            .appendTo(container);
                    },
                    formItem : {
                        label: {
                            visible: false,
                        }
                    },
                },
                {
                    caption :'결제마감시간',
                    dataField: 'PaymentClosingTimePolicy',
                    visible: false,
                    editorType: 'dxSelectBox',
                    editorOptions: {

                        dataSource: new DevExpress.data.ArrayStore({
                            key: 'Code',
                            data: paymentClosingTimePolicy,
                        }),
                        valueExpr: 'Code',
                        displayExpr: 'Name',
                    },
                    setCellValue: function (newData, value) {
                        this.defaultSetCellValue(newData, value);
                    },
                    formItem : {
                        colSpan: 2,
                    }
                },
                {
                    dataField: 'PaymentClosingTime',
                    visible: false,
                    showInColumnChooser : false,
                    editCellTemplate: function (container, options) {
                        $('<div></div>').addClass('hs-cancel-day-editor-box')
                            .append($('<div class ="dx-field-item-label-text mr05"></div>').html('신청(승인)시간 이후'))
                            .append($('<div></div>').dxNumberBox({
                                value: options.value,
                                showSpinButtons: true,
                                showClearButton: true,
                                min: 0,
                                width: 120,
                                onValueChanged: function (e) {
                                    options.setValue(e.value);
                                }
                            }))
                            .append($('<div></div>').addClass('dx-field-item-label-text').addClass('ml05').html('시간 이후 마감'))
                            .appendTo(container);
                    },
                    formItem : {
                        colSpan: 2,
                        label: {
                            visible: false,
                        },
                    }
                },
                {
                    dataField: 'BookingPeriodPolicyCode',
                    showInColumnChooser : false,
                    visible: false,
                    editorType: 'dxRadioGroup',
                    editorOptions: {
                        layout: 'horizontal',
                        valueExpr: 'Code',
                        displayExpr: 'Name',
                        items: bookingRangePolicy,
                    },
                    setCellValue: function (newData, value) {
                        this.defaultSetCellValue(newData, value);
                    },
                    formItem : {
                        colSpan: 4,
                        label: {
                            text: '예약기간'
                        },
                    },
                },
                {
                    dataField: 'ReservationOnTheDayPolicy',
                    showInColumnChooser : false,
                    trueText: 'Y',
                    falseText:'N',
                    dataType :'boolean',
                    visible:false,
                    editorType: 'dxSelectBox',
                    editorOptions: {
                        dataSource: new DevExpress.data.ArrayStore({
                            key: 'Code',
                            data: reservationOnTheDayPolicy,
                        }),
                        valueExpr: 'Code',
                        displayExpr: 'Name',
                    },
                    formItem: {
                        label: {
                            visible: false,
                        },
                    }
                },
                {
                    dataField: 'ReservationOnTheDayStart',
                    showInColumnChooser : false,
                    editorType: 'dxNumberBox',
                    editorOptions: {
                        showSpinButtons: true,
                        showClearButton: true,
                        min: 1,
                        max: 31,
                    },
                    visible:false,
                    formItem : {
                        label: {
                            text: '일 전부터',
                            location: 'right',
                            showColon: false,
                        },
                        cssClass: 'hs-cancel-middle',
                    }
                },
                {
                    dataField: 'ReservationOnTheDayEnd',
                    showInColumnChooser : false,
                    editorType: 'dxNumberBox',
                    editorOptions: {
                        showSpinButtons: true,
                        showClearButton: true,
                        min: 1,
                        max: 31,
                    },
                    visible:false,
                    formItem : {
                        label: {
                            text: '일전까지 예약',
                            location: 'right',
                            showColon: false,
                        },
                        cssClass: 'hs-cancel-suffix',
                    }
                },
                {
                    dataField: 'BookingPeriodCalender',
                    showInColumnChooser : false,
                    visible: false,
                    cssClass: 'hs-booking-calendar',
                    editCellTemplate(container, options) {

                        let obj = {
                            EnableDates: [],
                            DisableDates: [],
                        };

                        if (options.value) {
                            obj = {
                                EnableDates: options.value.EnableDates,
                                DisableDates: options.value.DisableDates,
                            };
                        }

                        let $calendar = $('<div></div>').addClass('hs-program-booking-calendar').dxCalendar({
                            minZoomLevel: 'month',
                            maxZoomLevel: 'month',
                            showTodayButton: true,
                            onCellClick(e) {

                                viewOptions.bookingCalendarContextMenuOptions.targetCellOptions(options);
                                viewOptions.bookingCalendarContextMenuOptions.targetComponent(e.component);
                                viewOptions.bookingCalendarContextMenuOptions.selectedDate(e.value);
                                viewOptions.bookingCalendarContextMenuOptions.enableDates(obj.EnableDates);
                                viewOptions.bookingCalendarContextMenuOptions.disableDates(obj.DisableDates);

                                if (includesDate(obj.EnableDates, e.value)) {
                                    const items = bookingContextMenuItems.filter(menu => menu.text === '예약일삭제');
                                    viewOptions.bookingCalendarContextMenuInstance.option('items', items);
                                } else if (includesDate(obj.DisableDates, e.value)) {
                                    const items = bookingContextMenuItems.filter(menu => menu.text === '예약불가일해제');
                                    viewOptions.bookingCalendarContextMenuInstance.option('items', items);
                                } else {
                                    const items = bookingContextMenuItems.filter(menu => menu.text === '예약불가일설정' || menu.text === '예약일설정');
                                    viewOptions.bookingCalendarContextMenuInstance.option('items', items);
                                }
                                viewOptions.bookingCalendarContextMenuInstance.option('target', e.event.currentTarget);
                                viewOptions.bookingCalendarContextMenuInstance.option('position', {
                                    at: {x: e.event.clientX, y: e.event.clientY}
                                });
                                viewOptions.bookingCalendarContextMenuInstance.show();
                            },
                            cellTemplate: function (data, weekDay, cellElement) {

                                if (includesDate(obj.EnableDates, data.date)) {
                                    cellElement[0].classList.add('hs-cell-enabled');
                                }

                                if (includesDate(obj.DisableDates, data.date)) {
                                    cellElement[0].classList.add('hs-cell-disabled');
                                }

                                if (isHoliday(data.date)) {
                                    cellElement[0].classList.add('hs-holiday-date');
                                }

                                data['holiday'] = holidayText(data.date);

                                return $('#booking-cell-template');
                            }
                        });

                        $calendar.appendTo(container.css('background-color', '#fff').append(_.template($('#booking-legend-template').html())));
                    },
                    formItem : {
                        label: {
                            visible: false,
                        },
                        colSpan: 4,
                    }
                },
                {
                    caption :'운영장소주소',
                    dataField: 'ProgramAddress',
                    editorType: 'dxTextBox',
                    editorOptions: {
                        buttons: [
                            {
                                hint: 'Clone',
                                name: "add-location",
                                options: {
                                    template: $('#address-search-icon-template'),
                                    stylingMode: "contained",
                                    type: "default",
                                }
                            }
                        ]
                    },
                    visible:false,
                    formItem : {
                        colSpan: 2,
                    }
                },
                {
                    editorType: 'dxNumberBox',
                    editorOptions: {},
                    dataField: 'latitude',
                    visible:false,
                    caption :'위도',
                },
                {
                    dataField: 'longitude',
                    editorType: 'dxNumberBox',
                    editorOptions: {},
                    visible:false,
                    caption :'경도',
                },
                {
                    caption :'대표이미지',
                    dataField: 'ImageFileUrl',
                    visible: false,
                    editCellTemplate: function (container, options) {
                        let buttonElement = document.createElement("div");
                        buttonElement.classList.add("retryButton");
                        let retryButton = $(buttonElement).dxButton({
                            text: "Retry",
                            visible: false,
                            onClick: function () {
                                // The retry UI/API is not implemented. Use a private API as shown at T611719.
                                for (let i = 0; i < fileUploader._files.length; i++) {
                                    delete fileUploader._files[i].uploadStarted;
                                }
                                fileUploader.upload();
                            }
                        }).dxButton("instance");

                        let fileUploaderElement = document.createElement("div");
                        let fileUploader = $(fileUploaderElement).dxFileUploader({
                            multiple: false,
                            accept: "image/*",
                            uploadMode: "instantly",
                            uploadUrl: "FileUpload/post",
                            onValueChanged: function (e) {
                                let reader = new FileReader();
                                reader.onload = function (args) {
                                    imageElement.setAttribute('src', args.target.result);
                                }
                                reader.readAsDataURL(e.value[0]); // convert to base64 string
                            },
                            onUploaded: function (e) {
                                options.setValue("images/employees/" + e.request.responseText);
                                retryButton.option("visible", false);
                            },
                            onUploadError: function (e) {
                                let xhttp = e.request;
                                if (xhttp.status === 400) {
                                    e.message = e.error.responseText;
                                }
                                if (xhttp.readyState === 4 && xhttp.status === 0) {
                                    e.message = "Connection refused";
                                }
                                retryButton.option("visible", true);
                            }
                        }).dxFileUploader("instance");

                        if (options.value) {
                            let imageElement = document.createElement("img");
                            imageElement.classList.add("uploadedImage");
                            imageElement.style.width = '95%';
                            imageElement.style.height = '95%';

                            imageElement.setAttribute('src', options.value);
                            container.append(imageElement);
                        }

                        container.append(fileUploaderElement);
                        container.append(buttonElement);
                    },
                    formItem : {
                        colSpan: 1,
                        label: {
                            location: 'top',
                            showColon: false,
                            text : '대표이미지',
                        },
                    }
                },
                {
                    dataField: 'Introduction',
                    visible: false,
                    showInColumnChooser : false,
                    editCellTemplate: function (container, options) {
                        $('<div>').dxTextArea({
                            value: options.value,
                            inputAttr: {
                                id: 'desc_editor'
                            },
                            autoResizeEnabled: true,
                        }).appendTo(container);

                        CKEDITOR.replace('desc_editor', {
                            height: 400,
                        });
                        CKEDITOR.instances.desc_editor.on("change",
                            function () {
                                options.setValue(CKEDITOR.instances.desc_editor.getData());
                            }
                        );
                    },
                    formItem : {
                        colSpan: 3,
                        label: {
                            location: 'top',
                            text: '운영프로그램소개',
                            showColon: false,
                        }
                    }
                },
            ],
            editing: {
                allowUpdating: true,
                allowAdding: true,
                allowDeleting: true,
                useIcons: true,
                mode: 'popup',
                popup: {
                    title: '매표운영프로그램',
                    showTitle: true,
                    showCloseButton: true,
                    width: 1035,
                    height: 900,
                    wrapperAttr: {
                        id: "program-edit-popup-container",
                        class: "hs-program-edit-popup-container"
                    }
                },
                form: {
                    customizeItem: function (item) {
                        if (item && item.itemType === "simple" && item.dataField === "PurchaseLimit") {
                            let editRowKey = viewOptions.programGridInstance.option('editing.editRowKey');
                            let index = viewOptions.programGridInstance.getRowIndexByKey(editRowKey);
                            index = index === -1 ? 0 : index;
                            let limitPolicy = viewOptions.programGridInstance.cellValue(index, "ReservationLimitPolicy");
                            item.itemType = (limitPolicy || '0000') === '0000' ? 'empty' : 'simple';
                        }

                        if (item && item.itemType === 'group' && item.name === 'cancellationBeforeDayRange') {
                            let editRowKey = viewOptions.programGridInstance.option('editing.editRowKey');
                            let index = viewOptions.programGridInstance.getRowIndexByKey(editRowKey);
                            index = index === -1 ? 0 : index;
                            let cancellationPolicy = viewOptions.programGridInstance.cellValue(index, "CancellationPolicy");
                            item.itemType = cancellationPolicy === '0001' ? 'simple' : 'empty';
                            //item.label.visible = true;

                        }

                        if (item && item.itemType === 'simple' && item.dataField === 'PaymentClosingTime') {
                            let editRowKey = viewOptions.programGridInstance.option('editing.editRowKey');
                            let index = viewOptions.programGridInstance.getRowIndexByKey(editRowKey);
                            index = index === -1 ? 0 : index;
                            let cancellationPolicy = viewOptions.programGridInstance.cellValue(index, "PaymentClosingTimePolicy");
                            item.itemType = cancellationPolicy === '0001' ? 'simple' : 'empty';
                        }

                        if (item && item.dataField === 'RegularStartDateTime' || item.dataField === 'RegularEndDateTime') {
                            let editRowKey = viewOptions.programGridInstance.option('editing.editRowKey');
                            let index = viewOptions.programGridInstance.getRowIndexByKey(editRowKey);
                            index = index === -1 ? 0 : index;
                            let acceptancePeriodPolicyCode = viewOptions.programGridInstance.cellValue(index, "AcceptancePeriodPolicyCode");
                            item.disabled = acceptancePeriodPolicyCode === '0002';
                        }


                        if (item && item.dataField === 'IndividualMin' || item.dataField === 'IndividualMax') {

                            let editRowKey = viewOptions.programGridInstance.option('editing.editRowKey');
                            let index = viewOptions.programGridInstance.getRowIndexByKey(editRowKey);
                            index = index === -1 ? 0 : index;
                            let individualCapacityPolicy = viewOptions.programGridInstance.cellValue(index, "IndividualCapacityPolicy");
                            item.disabled = individualCapacityPolicy === 'N';
                        }

                        if (item && item.dataField === 'GroupMin' || item.dataField === 'GroupMax') {
                            let editRowKey = viewOptions.programGridInstance.option('editing.editRowKey');
                            let index = viewOptions.programGridInstance.getRowIndexByKey(editRowKey);
                            index = index === -1 ? 0 : index;
                            let groupCapacityPolicy = viewOptions.programGridInstance.cellValue(index, "GroupCapacityPolicy");
                            item.disabled = groupCapacityPolicy === 'N';
                        }

                        if (item.itemType === 'group' && item.name === 'bookingPeriodDayGroup') {
                            let editRowKey = viewOptions.programGridInstance.option('editing.editRowKey');
                            let index = viewOptions.programGridInstance.getRowIndexByKey(editRowKey);
                            index = index === -1 ? 0 : index;
                            let acceptancePeriodPolicyCode = viewOptions.programGridInstance.cellValue(index, "AcceptancePeriodPolicyCode");
                            let bookingPeriodPolicyCode = viewOptions.programGridInstance.cellValue(index, "BookingPeriodPolicyCode");
                            item.visible = acceptancePeriodPolicyCode === '0002' && bookingPeriodPolicyCode === '0001';
                        }
                        if (item && item.dataField === 'BookingPeriodCalender') {
                            let editRowKey = viewOptions.programGridInstance.option('editing.editRowKey');
                            let index = viewOptions.programGridInstance.getRowIndexByKey(editRowKey);
                            index = index === -1 ? 0 : index;
                            let acceptancePeriodPolicyCode = viewOptions.programGridInstance.cellValue(index, "AcceptancePeriodPolicyCode");
                            let bookingPeriodPolicyCode = viewOptions.programGridInstance.cellValue(index, "BookingPeriodPolicyCode");
                            item.visible = acceptancePeriodPolicyCode === '0002' && bookingPeriodPolicyCode === '0002';
                        }

                        if (item && item.dataField === 'BookingPeriodPolicyCode') {
                            let editRowKey = viewOptions.programGridInstance.option('editing.editRowKey');
                            let index = viewOptions.programGridInstance.getRowIndexByKey(editRowKey);
                            index = index === -1 ? 0 : index;
                            let acceptancePeriodPolicyCode = viewOptions.programGridInstance.cellValue(index, "AcceptancePeriodPolicyCode");
                            item.disabled = acceptancePeriodPolicyCode === '0001';
                        }
                    },
                    colCount: 1,
                    showColonAfterLabel: false,
                    items: [
                        {
                            itemType: 'tabbed',
                            tabs: [
                                {
                                    title: '프로그램 정보',
                                    name: 'infoTab',
                                    items: [
                                        {
                                            itemType: 'group',
                                            name: 'mainGroup',
                                            colCount: 2,
                                            items: ['CategoryCode', 'LocationCode', 'ProgramName', 'Inquiries',]
                                        },
                                        {
                                            itemType: 'group',
                                            name: 'configGroup',
                                            colCount: 4,
                                            items: ['AcceptancePeriodPolicyCode', 'RegularStartDateTime', 'RegularEndDateTime', 'ReservationLimitPolicy', 'PurchaseLimit',
                                                'FarePolicy', {itemType: 'empty', colSpan: 2,},
                                                'SitingCapacityPolicyCode', { itemType: 'empty', colSpan: 2,},
                                                'CancellationPolicy',
                                                {
                                                    itemType: 'group',
                                                    name: 'cancellationBeforeDayRange',
                                                    colSpan: 2,
                                                    colCount: 2,
                                                    items: ['CancellationBeforeDay','CancellationBeforeTime']
                                                },
                                                'PaymentClosingTimePolicy','PaymentClosingTime',
                                                {
                                                    itemType: 'group',
                                                    name :'bookingLimitGroup',
                                                    colSpan: 4,
                                                    colCount: 4,
                                                    caption: '예약매표가능인원 제한설정',
                                                    items: ['IndividualCapacityPolicy',
                                                        {
                                                            colSpan: 2,
                                                            colCount: 2,
                                                            itemType: "group",
                                                            name: 'individualCapacityPolicyGroup',
                                                            cssClass: 'hs-regular-datetime-box',
                                                            items: ['IndividualMin','IndividualMax']
                                                        },
                                                        'GroupCapacityPolicy',
                                                        {
                                                            colSpan: 2,
                                                            colCount: 2,
                                                            cssClass: 'hs-regular-datetime-box',
                                                            name: 'groupCapacityPolicyGroup',
                                                            itemType: "group",
                                                            items: ['GroupMin','GroupMax']
                                                        }
                                                    ]
                                                },
                                                'IsPublic','IsRunning','DisplayedAtKiosk','IsTicketing',
                                                'BookingPeriodPolicyCode',
                                                {
                                                    name: 'bookingPeriodDayGroup',
                                                    itemType: 'group',
                                                    colCount: 4,
                                                    colSpan: 4,
                                                    items: ['ReservationOnTheDayPolicy',
                                                        {
                                                            colSpan: 3,
                                                            itemType: 'group',
                                                            name: 'reservationOnTheDayRange',
                                                            label: {
                                                                text: '이용일',
                                                                showColon: false,
                                                            },
                                                            cssClass: 'hs-cancel-prefix',
                                                            colCount: 2,
                                                            items: ['ReservationOnTheDayStart','ReservationOnTheDayEnd']
                                                        }
                                                    ]
                                                },
                                                'BookingPeriodCalender',
                                            ]
                                        },
                                    ]
                                },
                                {
                                    title: '컨텐츠 정보',
                                    name: 'contentTab',
                                    items: [
                                        {
                                            itemType: 'group',
                                            colCount: 4,
                                            items: [ 'ProgramAddress','latitude','longitude', 'ImageFileUrl', 'Introduction']
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
            },
            export: {
                enabled: true
            },
            toolbar: {
                items: [
                    {
                        location: 'before',
                        widget: 'dxSelectBox',
                        options: {
                            label: '매표장소분류',
                            labelMode: 'floating',
                            dataSource: new DevExpress.data.ArrayStore({
                                data: locations,
                                key: 'Code',
                            }),
                            width: '100%',
                            displayExpr: 'Name',
                            valueExpr: 'Code',
                        }
                    },
                    {
                        location: 'after',
                        name: 'addRowButton'
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            icon: 'copy',
                            onClick() {
                                viewOptions.programCopyPopupInstance.show();
                            }
                        }
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            icon: 'refresh'
                        },
                        onClick() {
                            viewOptions.programGridInstance.refresh();
                        }
                    },
                    'exportButton','columnChooserButton',
                ]
            },
            onInitialized(e) {
                viewOptions.programGridInstance = e.component;
            },
            onExporting(e) {
                const workbook = new ExcelJS.Workbook();
                const worksheet = workbook.addWorksheet('Main sheet');
                DevExpress.excelExporter.exportDataGrid({
                    worksheet: worksheet,
                    component: e.component,
                    customizeCell: function (options) {
                        const {excelCell} = options;
                        excelCell.font = {name: 'Arial', size: 12};
                        excelCell.alignment = {horizontal: 'left'};
                    }
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], {type: 'application/octet-stream'}), `일일입장프로그램-\${new Date().formatDateString('yyyyMMddHHmmss')}.xlsx`);
                    });
                });
                e.cancel = true;
            },
            onRowDblClick(e) {
                viewOptions.programGridInstance.editRow(e.rowIndex);
            },
            onContentReady(e) {
                if (!e.component.getSelectedRowKeys().length) {
                    e.component.selectRowsByIndexes(0);
                }
            },
            onSelectionChanged(selectedItems) {
                const data = selectedItems.selectedRowsData[0];
                viewOptions.selectedProgram(data);
            },
            onInitNewRow: function (e) {
                e.data.AcceptancePeriodPolicyCode = '0001';
                e.data.IsPublic = 'Y';
                e.data.IsRunning = 'Y';
                e.data.GroupCapacityPolicy = 'N';
                e.data.IndividualCapacityPolicy = 'N';
                e.data.ReservationLimitPolicy = '0000';
                e.data.CancellationPolicy = '0000';
                e.data.PaymentClosingTimePolicy = '0000';
                e.data.FarePolicy = '0001';
                e.data.SitingCapacityPolicyCode = '0002';
                e.data.DisplayedAtKiosk = 'N';
                e.data.IsTicketing = 'Y';
                e.data.ReservationOnTheDayPolicy = 'N';
                e.component.option("editing.popup.title", "매표운영프로그램 등록");
            },
            onEditingStart: function (e) {
                e.component.option("editing.popup.title", "매표운영프로그램 수정");
            },
            onEditorPreparing(e) {
                if (e.parentType === 'dataRow' && e.dataField === 'AcceptancePeriodPolicyCode') {
                    const defaultValueChangeHandler = e.editorOptions.onValueChanged;
                    e.editorOptions.onValueChanged = function (args) {
                        if (args.value) {
                            let selectedItem = args.component.option('selectedItem');
                            e.row.data.AcceptancePeriodPolicy = selectedItem.Name;
                        }
                        /*if(args.value === '0001') {
                            e.row.data.BookingPeriodPolicyCode = null;

                        } else {
                            console.log(e);
                            e.row.data.BookingPeriodPolicyCode = e.row.data.BookingPeriodPolicyCode || '0001';
                        }*/
                        defaultValueChangeHandler(args);
                    }
                }
            },
        },
        programTabPanelInstance: {},
        programCopyPopupInstance: {},
        programCopyFormInstance: {},
        programCopyFormOptions: {
            formData: ko.observable(),
            colCount: 2,
            items: [
                {
                    itemType: 'group',
                    caption: '원천 프로그램 정보',
                    colCount: 1,
                    items: [
                        {
                            dataField: 'SourceLocationCode',
                            editorType: 'dxSelectBox',
                            editorOptions: {
                                disabled: true,
                                dataSource: new DevExpress.data.ArrayStore({
                                    key: 'Code',
                                    data: locations,
                                }),
                                valueExpr: 'Code',
                                displayExpr: 'Name',
                            },
                            label: {
                                text: '장소분류',
                            },
                        },
                        {
                            dataField: 'SourceProgramName',
                            editorType: 'dxTextBox',
                            editorOptions: {
                                disabled: true,

                            },
                            label: {
                                text: '프로그램명'
                            }
                        },
                    ]
                },
                {
                    itemType: 'group',
                    caption: '복사 프로그램정보',
                    colCount: 1,
                    items: [
                        {
                            dataField: 'TargetLocationCode',
                            editorType: 'dxSelectBox',
                            label: {
                                text: '장소분류'
                            },
                            editorOptions: {
                                dataSource: new DevExpress.data.ArrayStore({
                                    key: 'Code',
                                    data: locations,
                                }),
                                valueExpr: 'Code',
                                displayExpr: 'Name',
                            }
                        },

                        {
                            colSpan: 2,
                            dataField: 'TargetProgramName',
                            editorType: 'dxTextBox',
                            label: {
                                text: '프로그램명',
                            }
                        },
                    ]
                },

                {
                    colSpan: 2,
                    label: {
                        text: '복사할 추가정보 선택',
                        location: "top",
                        showColon: false,

                    },
                    cssClass: 'mt20',
                    dataField: 'CopyAdditionalItems',
                    template: function (data, itemElement) {
                        $("<div></div>").addClass('hs-bg-white')
                            .dxList({
                                height: '100%',
                                dataSource: copyAdditionalItems,
                                keyExpr: 'Code',
                                displayExpr: 'Text',
                                selectAllText: "전체선택",
                                selectionMode: "all",
                                showScrollbar: "onHover",
                                showSelectionControls: true,
                                onSelectionChanged(e) {
                                    data.component.updateData(data.dataField, e.component.option('selectedItemKeys'));
                                },
                            }).appendTo(itemElement);
                    }
                }
            ],
            onInitialized(e) {
                viewOptions.programCopyFormInstance = e.component;
            }
        },
        priceGridInstance: {},
        priceGridOptions: {
            height: '100%',
            loadPanel: {
                enabled: true
            },
            focusedRowEnabled: true,
            rowAlternationEnabled: true,
            dataSource: ko.observable(null),
            allowColumnResizing: true,
            showBorders: true,
            showRowLines: true,
            columnChooser: {
                enabled: true,
                mode :'select',
            },
            selection: {
                mode: 'multiple'
            },
            //wordWrapEnabled : true,
            scrolling: {
                columnRenderingMode: 'virtual',
                mode: 'virtual',
            },
            editing: {
                allowUpdating: true,
                allowAdding: true,
                allowDeleting: true,
                confirmDelete: true,
                useIcons: true,
                mode: 'popup',
                popup: {
                    title: '프로그램요금',
                    showTitle: true,
                    showCloseButton: true,
                    fullScreen: false,
                    width: 980,
                    height: 680,
                },
                form: {
                    showColonAfterLabel: false,
                    customizeItem: function (item) {
                        if (item && item.itemType === "group" && item.name === "ageGroupRange") {

                            let editRowKey = viewOptions.priceGridInstance.option('editing.editRowKey');
                            let index = viewOptions.priceGridInstance.getRowIndexByKey(editRowKey);
                            index = index === -1 ? 0 : index;
                            let ageGroupPolicy = viewOptions.priceGridInstance.cellValue(index, "AgeGroupCode");
                            item.itemType = (ageGroupPolicy === '0000') ? 'empty' : 'group';
                        }

                        if (item && item.itemType === 'simple' && item.dataField === 'GroupDiscountAvailable') {

                            let editRowKey = viewOptions.priceGridInstance.option('editing.editRowKey');
                            let index = viewOptions.priceGridInstance.getRowIndexByKey(editRowKey);
                            index = index === -1 ? 0 : index;
                            let individualGroupPolicy = viewOptions.priceGridInstance.cellValue(index, "IndividualGroupPolicyCode");
                            item.itemType = (individualGroupPolicy === '0002') ? 'simple' : 'empty';
                        }

                        if ((item && item.itemType === 'simple' && item.dataField === 'Layer') || (item && item.itemType === 'empty' && item.name === 'layerEmptyItem')) {
                            let editRowKey = viewOptions.priceGridInstance.option('editing.editRowKey');
                            let index = viewOptions.priceGridInstance.getRowIndexByKey(editRowKey);
                            index = index === -1 ? 0 : index;
                            let keyIssuable = viewOptions.priceGridInstance.cellValue(index, "KeyIssuable");
                            let ageGroupCode = viewOptions.priceGridInstance.cellValue(index, "AgeGroupCode");
                            item.visible = keyIssuable === 'Y' && ageGroupCode !== '0000';
                        }
                    },
                    colCount: 2,
                    items: [
                        'CategoryCode','ProductName','UnitPrice','Taxable', 'GenderPolicyCode',
                        { itemType: 'empty'}, 'WeekendPolicy','DayOfTheWeekPolicyCode', 'KeyIssuable',
                        { itemType: 'empty'}, 'AgeGroupCode',
                        {
                            label: {
                                text: '대상연령',
                            },
                            itemType: 'group',
                            name: 'ageGroupRange',
                            colCount: 2,
                            items: ['AgeMin','AgeMax']
                        },
                        'Layer', { itemType: 'empty', name: 'layerEmptyItem', visible: false },
                        'IndividualGroupPolicyCode', 'GroupDiscountAvailable', 'IsPublic', 'Enabled', 'ResidencyCertificationCode', 'Discountable', 'DisplayedAtKiosk'
                    ]
                }
            },
            columns: [
                {
                    caption: '운영상품분류',
                    dataField: 'CategoryCode',
                    calculateDisplayValue: 'CategoryName',
                    editCellTemplate: categoryEditCellTemplate,
                    formItem : {
                        cssClass: 'hs-view-mode',
                    }
                },
                {
                    caption: '요금명',
                    dataField: 'ProductName',
                },
                {
                    caption: '판매단가',
                    dataField: 'UnitPrice',
                    dataType: 'number',
                    format: 'currency',
                    editorType: 'dxNumberBox',
                    editorOptions: {
                        format: 'currency',
                    }
                },
                {
                    caption: '비과세',
                    dataField: 'Taxable',
                    alignment: 'left',
                    editorType: 'dxSelectBox',
                    editorOptions: {
                        dataSource: new DevExpress.data.ArrayStore({
                            key: 'Code',
                            data: taxableData,
                        }),
                        valueExpr: 'Code',
                        displayExpr: 'Name',
                    },
                    showEditorAlways:false,
                    calculateDisplayValue:(rowData)=>{
                        const {Name} = taxableData.find(({Code})=> Code === rowData.Taxable)||{};
                        return Name;
                    },
                },
                {
                    caption: '판매가능성별',
                    dataType: 'string',
                    dataField: 'GenderPolicyCode',
                    calculateDisplayValue: 'GenderPolicyName',
                    editorType: 'dxSelectBox',
                    editorOptions: {
                        dataSource: new DevExpress.data.ArrayStore({
                            key: 'Code',
                            data: genderPolicy,
                        }),
                        valueExpr: 'Code',
                        displayExpr: 'Name',
                    }
                },
                {
                    caption: '판매가능요일',
                    dataType: 'object',
                    dataField: 'DayOfTheWeekPolicyCode',
                    calculateDisplayValue: 'DayOfTheWeekPolicyName',
                    setCellValue: function (newData, value) {
                        this.defaultSetCellValue(newData, value);
                    },
                    editCellTemplate: function (container, options) {

                        const getWeekdaySelectedItems = function (policyCode) {
                            if (policyCode) {
                                const selectedPolicy = weekendPolicy.find(({ID, items}) => ID === policyCode);
                                return selectedPolicy.items;
                            } else {
                                return options.value;
                            }
                        };

                        $('<div>').dxButtonGroup({
                            items: dayPolicy,
                            keyExpr: 'ID',
                            selectionMode: "multiple",
                            selectedItemKeys: getWeekdaySelectedItems(options.data.WeekendPolicy),
                            height: 30,
                            width: '100%',
                            buttonTemplate: () => $('#weekday-buttongroup-template'),
                            onSelectionChanged(e) {
                                const selectedItems = e.component.option('selectedItemKeys');
                                options.data.WeekendPolicy = getWeekendPolicyIdByItems(selectedItems);
                                options.setValue(selectedItems);
                            }
                        }).appendTo(container);
                    },
                    formItem :{
                        label: {
                            visible: false,
                        },
                    }
                },
                {
                    caption: '연령구분',
                    dataType: 'string',
                    dataField: 'AgeGroupCode',
                    calculateDisplayValue: 'AgeGroupName',
                    setCellValue: function (newData, value) {
                        this.defaultSetCellValue(newData, value);
                    },
                    editorType: 'dxSelectBox',
                    editorOptions: {
                        dataSource: new DevExpress.data.ArrayStore({
                            key: 'Code',
                            data: ageGroupPolicy,
                        }),
                        displayExpr: 'Name',
                        valueExpr: 'Code',
                    }
                },
                {
                    caption: '대상연령',
                    columns: [
                        {
                            caption: '최소',
                            dataField: 'AgeMin',
                            dataType: 'number',
                            editorType: 'dxNumberBox',
                            editorOptions: {
                                showSpinButtons: true,
                                showClearButton: true,
                                min: 0,
                                max: 999,
                            },
                            formItem : {
                                label: {
                                    text: '최소',
                                    location: 'top',
                                    showColon: false,
                                },
                            }
                        },
                        {
                            caption: '최대',
                            dataField: 'AgeMax',
                            dataType: 'number',
                            editorType: 'dxNumberBox',
                            editorOptions: {
                                showSpinButtons: true,
                                showClearButton: true,
                                min: 0,
                                max: 999,
                            },
                            formItem : {
                                label: {
                                    text: '최대',
                                    location: 'top',
                                    showColon: false,
                                },
                            }
                        }
                    ]
                },
                {
                    caption: '개인단체구분',
                    dataField: 'IndividualGroupPolicyCode',
                    dataType: 'string',
                    calculateDisplayValue: 'IndividualGroupPolicyName',
                    setCellValue: function (newData, value) {
                        this.defaultSetCellValue(newData, value);
                    },
                    editorType: 'dxSelectBox',
                    editorOptions: {
                        dataSource: new DevExpress.data.ArrayStore({
                            key: 'Code',
                            data: individualGroupPolicy,
                        }),
                        valueExpr: 'Code',
                        displayExpr: 'Name',
                    },
                },
                {
                    caption: '판매시단체할인율적용',
                    dataField: 'GroupDiscountAvailable',
                    dataType: 'boolean',
                    headerCellTemplate : '<div>판매시<br/>단체할인율적용</div>',
                    alignment: 'left',
                    trueText :'적용',
                    falseText :'적용안함',
                    formItem : {
                        label: {
                            visible: false,
                        },
                        editorOptions: {
                            text: '단체할인율로 적용'
                        }
                    },
                    showEditorAlways:false,
                    calculateDisplayValue: function(rowData) {
                        const {Name} = appliedData.find(({Code})=> Code === rowData.GroupDiscountAvailable) || {};
                        return Name;
                    },
                },
                {
                    caption: '온라인공개',
                    dataField: 'IsPublic',
                    dataType: 'boolean',
                    alignment: 'left',
                    editorType: 'dxSelectBox',
                    editorOptions: {
                        dataSource: new DevExpress.data.ArrayStore({
                            key: 'Code',
                            data: publicData,
                        }),
                        valueExpr: 'Code',
                        displayExpr: 'Name',
                    },
                    showEditorAlways:false,
                    calculateDisplayValue: (rowData)=>{
                        const {Name} = publicData.find(({Code})=> Code === rowData.IsPublic) ||{};
                        return Name;
                    },
                },
                {
                    caption: '사용여부',
                    dataField: 'Enabled',
                    dataType: 'boolean',
                    alignment: 'left',
                    editorType: 'dxSelectBox',
                    editorOptions: {
                        dataSource: new DevExpress.data.ArrayStore({
                            key: 'Code',
                            data: enabledData,
                        }),
                        valueExpr: 'Code',
                        displayExpr: 'Name',
                    },
                    showEditorAlways:false,
                    calculateDisplayValue: (rowData)=> {
                        const {Name} = enabledData.find(({Code})=> Code === rowData.Enabled) || {};
                        return Name;
                    },
                },
                {
                    caption: '예약신청거주인증',
                    dataField: 'ResidencyCertificationCode',
                    calculateDisplayValue: 'ResidencyCertificationName',
                    editorType: 'dxSelectBox',
                    editorOptions: {
                        dataSource: new DevExpress.data.ArrayStore({
                            key: 'Code',
                            data: residencyCertificationPolicy,
                        }),
                        valueExpr: 'Code',
                        displayExpr: 'Name',
                    }
                },
                {
                    caption: '할인적용여부',
                    dataField: 'Discountable',
                    dataType: 'boolean',
                    alignment: 'left',
                    editorType: 'dxSelectBox',
                    editorOptions: {
                        dataSource: new DevExpress.data.ArrayStore({
                            key: 'Code',
                            data: discountableData,
                        }),
                        valueExpr: 'Code',
                        displayExpr: 'Name',
                    },
                    showEditorAlways:false,
                    calculateDisplayValue: (rowData) => {
                        const {Name} = discountableData.find(({Code})=> Code === rowData.Discountable) ||{};
                        return Name;
                    },
                },
                {
                    caption: '전자키발권여부',
                    dataField: 'KeyIssuable',
                    dataType: 'boolean',
                    alignment: 'left',
                    showEditorAlways:false,
                    calculateDisplayValue: (rowData) =>{
                        const {Name} = keyIssuableData.find(({Code})=> Code === rowData.KeyIssuable) ||{};
                        return Name;
                    },
                    setCellValue: function (newData, value) {
                        this.defaultSetCellValue(newData, value);
                    },
                    editorType: 'dxSelectBox',
                    editorOptions: {
                        dataSource: new DevExpress.data.ArrayStore({
                            key: 'Code',
                            data: keyIssuableData
                        }),
                        valueExpr: 'Code',
                        displayExpr: 'Name',

                    }
                },
                {
                    caption: '키오스크노출여부',
                    dataField: 'DisplayedAtKiosk',
                    dataType: 'boolean',
                    alignment: 'left',
                    showEditorAlways:false,
                    calculateDisplayValue: (rowData) => {
                        const {Name} = displayedAtKioskData.find(({Code})=> Code === rowData.DisplayedAtKiosk)||{};
                        return Name;
                    },
                    lookup: {
                        dataSource: displayedAtKioskData,
                        displayExpr: 'Name',
                        valueExpr: 'Code',
                    }
                },
                {
                    caption: '단수설정',
                    dataField: 'Layer',
                    dataType: 'string',
                    alignment: 'left',
                    lookup: {
                        dataSource: layers,
                        displayExpr: 'Name',
                        valueExpr: 'Code',
                    },
                    setCellValue: function (newData, value) {
                        this.defaultSetCellValue(newData, value);
                    },
                    formItem : {
                        visible: false,
                    }
                },
                {
                    showInColumnChooser : false,
                    dataField: 'WeekendPolicy',
                    visible: false,
                    editorType: 'dxRadioGroup',
                    dataType: 'number',
                    editorOptions: {
                        layout: 'horizontal',
                        valueExpr: 'ID',
                        displayExpr: 'Text',
                        items: weekendPolicy,
                    },
                    setCellValue: function (newData, value) {
                        this.defaultSetCellValue(newData, value);
                    },
                    formItem : {
                        label: {
                            text: '판매가능일',
                        },
                    }
                }
            ],
            export: {
                enabled: true
            },
            toolbar: {
                items: [
                    'addRowButton',
                    {
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            icon: 'minus',
                            disabled: true,
                            onClick() {
                                viewOptions.priceGridInstance.getSelectedRowKeys().forEach((key) => {
                                    //employeesStore.remove(key);
                                });
                                viewOptions.priceGridInstance.refresh();
                            },
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            icon: 'refresh'
                        },
                        onClick() {
                            viewOptions.priceGridInstance.refresh();
                        }
                    },
                    'exportButton','columnChooserButton',
                ]
            },
            onInitialized(e) {
                viewOptions.priceGridInstance = e.component;
            },
            onExporting(e) {
                const workbook = new ExcelJS.Workbook();
                const worksheet = workbook.addWorksheet('Main sheet');
                DevExpress.excelExporter.exportDataGrid({
                    worksheet: worksheet,
                    component: e.component,
                    customizeCell: function (options) {
                        const {excelCell} = options;
                        excelCell.font = {name: 'Arial', size: 12};
                        excelCell.alignment = {horizontal: 'left'};
                    }
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], {type: 'application/octet-stream'}), `일일입장프로그램(요금정보)-\${new Date().formatDateString('yyyyMMddHHmmss')}.xlsx`);
                    });
                });
                e.cancel = true;
            },
            onInitNewRow: function (e) {
                e.data.CategoryCode = viewOptions.selectedProgram().CategoryCode;
                e.data.AgeGroupCode = '0000';
                e.data.IndividualGroupPolicyCode = '0000';
                e.data.Taxable = '0';
                e.data.GenderPolicyCode = '0000';
                e.data.IsPublic = 'Y';
                e.data.Enabled = 'Y';
                e.data.ResidencyCertificationCode = '0000';
                e.data.Discountable = 'Y';
                e.data.KeyIssuable = 'Y';
                e.data.GroupDiscountAvailable = 'N';
                e.data.DisplayedAtKiosk = 'N';
                e.component.option("editing.popup.title", "프로그램요금 등록");
            },
            onRowDblClick(e) {
                e.component.editRow(e.rowIndex);
            },
            onSelectionChanged(e) {

                e.component.option('toolbar.items[1].options.disabled', !e.selectedRowsData.length);
            },
            onEditingStart: function (e) {
                e.component.option("editing.popup.title", "프로그램요금 수정");
            },
            onEditorPreparing(e) {
                if (e.parentType === 'dataRow' && e.dataField === 'KeyIssuable') {
                    const defaultValueChangeHandler = e.editorOptions.onValueChanged;
                    e.editorOptions.onValueChanged = function (args) {
                        if (!args.value) {
                            e.row.data.Layer = null;
                        }
                        defaultValueChangeHandler(args);
                    }
                }

                if (e.parentType === 'dataRow' && e.dataField === 'AgeGroupCode') {
                    const defaultValueChangeHandler = e.editorOptions.onValueChanged;
                    e.editorOptions.onValueChanged = function (args) {
                        if (args.value === '0000') {
                            e.row.data.Layer = null;
                        }
                        defaultValueChangeHandler(args);
                    }
                }

                if(e.parentType ==='dataRow' && e.dataField === 'GroupDiscountAvailable') {
                    e.editorOptions.value = e.value === 'Y';
                    e.editorOptions.onValueChanged = function (args) {
                        e.setValue(args.value ? "Y" : "N");
                    }
                }
            },
        },
        discountFormInstance: {},
        discountFormOptions: {
            formData: ko.observable(),
            colCount: 8,
            showColonAfterLabel: false,
            items: [
                {
                    colSpan: 2,
                    label: {
                        text: '할인구매수량제한',
                        template: $('#label-help-tooltip-template'),
                    },
                    dataField: 'DiscountPurchaseLimitPolicy',
                    editorType: 'dxSelectBox',
                    editorOptions: {
                        labelHelpText: '할인구매수량제한입니다.',
                        dataSource: new DevExpress.data.ArrayStore({
                            key: 'Code',
                            data: discountPurchaseQuantityLimitPolicy,
                        }),
                        value: '0000',
                        valueExpr: 'Code',
                        displayExpr: 'Name',
                        onValueChanged: function (e) {
                            if (e.value === '0000') {
                                viewOptions.discountFormInstance.getEditor('PersonalDiscountPurchaseLimit').option({
                                    disabled: true,
                                    value: null,
                                })
                            } else {
                                viewOptions.discountFormInstance.getEditor('PersonalDiscountPurchaseLimit').option('disabled', false)
                            }
                        }
                    },
                },
                {
                    label: {
                        text: '개인당 제한수량',
                    },
                    colSpan: 2,
                    dataField: 'PersonalDiscountPurchaseLimit',
                    editorType: 'dxNumberBox',
                    editorOptions: {
                        showSpinButtons: true,
                        showClearButton: true,
                        min: 1,
                        max: 999,
                        disabled: true,
                        value: null,
                    },
                },
                {
                    colSpan: 3,
                    itemType: 'empty',
                },
                {
                    itemType: 'button',
                    horizontalAlignment: 'right',
                    buttonOptions: {
                        text: '저장',
                        type: 'success',
                        useSubmitBehavior: true,
                    },
                },
            ],
            onInitialized(e) {
                viewOptions.discountFormInstance = e.component;
            }
        },
        discountGridInstance: {},
        discountGridOptions: {
            height: "90%",
            focusedRowEnabled: true,
            loadPanel: {
                enabled: true
            },
            showRowLines: true,
            showBorders: true,
            editing: {
                mode: 'batch',
                allowUpdating: true,
                allowAdding: true,
                allowDeleting: true,
                useIcons: true,
            },
            allowColumnResizing: true,
            dataSource: ko.observable(null),
            scrolling: {
                mode: 'virtual',
            },
            paging: {
                enabled: false,
            },
            onInitNewRow: function (e) {
                e.data.Enabled = true;
                e.data.IsPublic = 'Y';
                e.data.DiscountUnitCode = '0001';
                e.data.DiscountType = '0000';
            },
            selection: {
                mode: 'multiple',
            },
            toolbar: {
                items: [
                    'addRowButton',
                    {
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            icon: 'minus',
                            disabled: true,
                            onClick() {
                                viewOptions.discountGridInstance.getSelectedRowKeys().forEach((key) => {
                                    //employeesStore.remove(key);
                                });
                                viewOptions.discountGridInstance.refresh();
                            },
                        },
                    },
                    'saveButton', 'revertButton',
                    {
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            icon: 'refresh'
                        },
                        onClick() {
                            viewOptions.discountGridInstance.refresh();
                        }
                    },
                ]
            },
            columns: [
                {
                    caption: '할인명',
                    dataField: 'DiscountName',
                    showEditorAlways: true,
                    editorType: 'dxTextBox',
                    editorOptions: {
                        showClearButton: true,
                        placeholder: '할인명',
                    },
                    width: '15%',
                },
                {
                    dataField: 'DiscountType',
                    visible: true,
                    caption: '감면유형',
                    setCellValue: function (newData, value) {
                        this.defaultSetCellValue(newData, value);
                    },
                    editorType: 'dxSelectBox',
                    editorOptions: {
                        dataSource: new DevExpress.data.ArrayStore({
                            key: 'Code',
                            data: discountTypes
                        }),
                        valueExpr: 'Code',
                        displayExpr: 'Name',
                    },
                    showEditorAlways: true,
                    width: '10%',
                },
                {
                    caption: '자격기준',
                    dataField: 'Qualification',
                    dataType: 'object',
                    width: '35%',
                    editCellTemplate: function (container, options) {

                        let obj = {
                            DisabledClass: null,
                            NationalMeritRelationship: null,
                            NationalMeritAuthority: null,
                            MinEstimate: null,
                            MinAge: null,
                            MaxEstimate: null,
                            MaxAge: null,
                            Residence: null,
                        }

                        if (options.value) {
                            obj = {
                                DisabledClass: options.value.DisabledClass,
                                NationalMeritRelationship: options.value.NationalMeritRelationship,
                                NationalMeritAuthority: options.value.NationalMeritAuthority,
                                MinEstimate: options.value.MinEstimate,
                                MinAge: options.value.MinAge,
                                MaxEstimate: options.value.MaxEstimate,
                                MaxAge: options.value.MaxAge,
                                Residence: options.value.Residence,
                            };
                        }

                        let $nationalMeritRelationship = $('<div>').dxTagBox({
                            width: '100%',
                            value: obj.NationalMeritRelationship,
                            showSelectionControls: true,
                            applyValueMode: 'useButtons',
                            placeholder: '관계',
                            showDataBeforeSearch: true,
                            showDropDownButton: true,
                            multiline: false,
                            dataSource: new DevExpress.data.ArrayStore({
                                data: nationalMeritRelationships,
                                key: 'Code',
                            }),
                            displayExpr: 'Name',
                            valueExpr: 'Code',
                            onValueChanged(e) {
                                obj.NationalMeritRelationship = e.value;
                                options.setValue(obj);
                            },


                        });
                        let $nationalMeritAuthority = $('<div>').dxTagBox({
                            width: '100%',
                            value: obj.NationalMeritAuthority,
                            showSelectionControls: true,
                            applyValueMode: 'useButtons',
                            placeholder: '선택하세요.',
                            showDataBeforeSearch: true,
                            showDropDownButton: true,
                            multiline: false,
                            dataSource: new DevExpress.data.ArrayStore({
                                data: nationalMeritAuthorities,
                                key: 'Code',
                            }),
                            displayExpr: 'Name',
                            valueExpr: 'Code',
                            onValueChanged(e) {
                                obj.NationalMeritAuthority = e.value;
                                options.setValue(obj);
                            },
                        });

                        const $nationalMeritContainers = $('<div>').addClass('hs-discount-multieditor-column')
                            .append($nationalMeritRelationship)
                            .append($nationalMeritAuthority);

                        let $disabledClass = $('<div>').dxTagBox({
                            width: '100%',
                            value: obj.DisabledClass,
                            showSelectionControls: true,
                            applyValueMode: 'useButtons',
                            placeholder: '선택하세요.',
                            showDataBeforeSearch: true,
                            showDropDownButton: true,
                            multiline: false,
                            dataSource: new DevExpress.data.ArrayStore({
                                data: disabledClasses(6),
                                key: 'Code',
                            }),
                            displayExpr: 'Name',
                            valueExpr: 'Code',
                            onValueChanged(e) {
                                obj.DisabledClass = e.value;
                                options.setValue(obj);
                            },
                        });

                        let $minAge = $('<div>').dxNumberBox({
                            min: 0,
                            max: 999,
                            value: obj.MinAge,
                            showClearButton: true,
                            showSpinButtons: true,
                            onValueChanged(e) {
                                obj.MinAge = e.value;
                                options.setValue(obj);
                            }
                        });
                        let $minEstmate = $('<div>').dxSelectBox({
                            dataSource: new DevExpress.data.ArrayStore({
                                key: 'Code',
                                data: estimates,
                            }),
                            displayExpr: 'Name',
                            valueExpr: 'Code',
                            value: obj.MinEstimate,
                            onValueChanged(e) {
                                obj.MinEstimate = e.value;
                                options.setValue(obj);
                            }
                        });

                        let $maxAge = $('<div>').dxNumberBox({
                            min: 0,
                            max: 999,
                            value: obj.MaxAge,
                            showClearButton: true,
                            showSpinButtons: true,
                            onValueChanged(e) {
                                obj.MaxAge = e.value;
                                options.setValue(obj);
                            }
                        });
                        let $maxEstmate = $('<div>').dxSelectBox({
                            dataSource: new DevExpress.data.ArrayStore({
                                key: 'Code',
                                data: estimates,
                            }),
                            displayExpr: 'Name',
                            valueExpr: 'Code',
                            value: obj.MaxEstimate,
                            onValueChanged(e) {
                                obj.MaxEstimate = e.value;
                                options.setValue(obj);
                            }
                        });

                        const $ageRangeContainer = $('<div>').addClass('hs-discount-multieditor-column')
                            .append($minAge)
                            .append($minEstmate)
                            .append($maxAge)
                            .append($maxEstmate);

                        let $residence = $('<div>').dxTagBox({
                            dataSource: new DevExpress.data.ArrayStore({
                                key: 'Code',
                                data: residences,
                            }),
                            multiline: false,
                            selectAllText: '행정동 전체',
                            maxDisplayedTags: 6,
                            showSelectionControls: true,
                            displayExpr: 'Name',
                            valueExpr: 'Code',
                            value: obj.Residence,
                            applyValueMode: 'useButtons',
                            placeholder: '선택하세요.',
                            showDataBeforeSearch: true,
                            showDropDownButton: true,
                            onValueChanged(e) {
                                obj.Residence = e.value;
                                options.setValue(obj);
                            }

                        });

                        if (options.data.DiscountType === '0001') {
                            container.append($disabledClass);

                        } else if (options.data.DiscountType === '0002') {
                            container.append($nationalMeritContainers);

                        } else if (options.data.DiscountType === '0003') {
                            container.append($ageRangeContainer);

                        } else if (options.data.DiscountType === '0004') {
                            container.append($residence);
                        }

                    },
                    showEditorAlways: true,
                },
                {
                    caption: '감면단위',
                    width: '10%',
                    dataField: 'DiscountUnitCode',
                    showEditorAlways: true,
                    editorType: 'dxSelectBox',
                    editorOptions: {
                        valueExpr: 'Code',
                        displayExpr: 'Name',
                        dataSource: new DevExpress.data.ArrayStore({
                            key: 'Code',
                            data: discountUnits
                        }),
                    },
                    setCellValue: function (newData, value) {
                        this.defaultSetCellValue(newData, value);
                    },
                },
                {
                    caption: '감면요율',
                    width: '10%',
                    dataField: 'DiscountRate',
                    showEditorAlways: true,
                    editCellTemplate: function (container, options) {
                        $('<div>').dxNumberBox({
                            value: options.data.DiscountUnitCode === '0002' ? null : options.value,
                            format: {
                                type: 'percent',
                            },
                            disabled: options.data.DiscountUnitCode === '0002',
                            min: 0,
                            onValueChanged(e) {
                                options.setValue(e.value);
                            }
                        }).appendTo(container);
                    }
                },
                {
                    caption: '감면금액',
                    width: '10%',
                    dataField: 'DiscountPrice',
                    showEditorAlways: true,
                    editCellTemplate: function (container, options) {
                        $('<div>').dxNumberBox({
                            value: options.data.DiscountUnitCode === '0001' ? null : options.value,
                            format: {
                                type: 'currency'
                            },
                            disabled: options.data.DiscountUnitCode === '0001',
                            min: 0,
                            onValueChanged(e) {
                                options.setValue(e.value);
                            }
                        }).appendTo(container);
                    }
                },
                {
                    caption: '사용여부',
                    dataField: 'Enabled',
                    showEditorAlways: true,
                    editorType: 'dxSelectBox',
                    width: '5%',
                    editorOptions: {
                        valueExpr: 'Code',
                        displayExpr: 'Name',
                        dataSource: new DevExpress.data.ArrayStore({
                            key: 'Code',
                            data: enabledData
                        }),

                    }
                },
                {
                    caption: '온라인공개',
                    dataField: 'IsPublic',
                    showEditorAlways: true,
                    editorType: 'dxSelectBox',
                    editorOptions: {
                        valueExpr: 'Code',
                        displayExpr: 'Name',
                        dataSource: new DevExpress.data.ArrayStore({
                            key: 'Code',
                            data: publicData
                        }),
                    },
                    width: '5%',
                }
            ],

            onSelectionChanged(e) {
                e.component.option('toolbar.items[1].options.disabled', !e.selectedRowsData.length);
            },
            onInitialized(e) {
                viewOptions.discountGridInstance = e.component;
            }

        },
        roundOfUseGridInstance: {},
        roundOfUseGridOptions: {
            loadPanel: {
                enabled: true
            },
            height: '100%',
            scrolling: {
                mode: 'virtual',
                preloadEnabled: true,
            },
            rowAlternationEnabled : true,
            focusedRowEnabled: true,
            showRowLines: true,
            onSelectionChanged(e) {
                e.component.option('toolbar.items[2].options.disabled', !e.selectedRowsData.length);
                e.component.option('toolbar.items[4].options.disabled', !e.selectedRowsData.length);
            },
            onInitialized(e) {
                viewOptions.roundOfUseGridInstance = e.component;
            },
            onEditingStart: function (e) {
                e.component.option('editing.mode', 'row');
            },
            onInitNewRow: function (e) {
                e.component.option('editing.mode', 'popup');
                e.component.option("editing.popup.title", "이용회차 등록");
                e.data.Enabled = 'Y';
                e.data.IsPublic = 'Y';
                e.data.SellableAfterStart = 'N';
                e.data.ProgramId = viewOptions.selectedProgram().ProgramId;
                e.data.ProgramName = viewOptions.selectedProgram().ProgramName;
            },
            onEditorPreparing: function (e) {
                if ((e.dataField === "MaleCapacity" || e.dataField === 'FemaleCapacity' || e.dataField === 'AdvancedMaleCapacity' || e.dataField === 'AdvancedFemaleCapacity') && e.parentType === "dataRow") {

                    const programSelectedItem = viewOptions.selectedProgram();
                    if (programSelectedItem) {
                        if (programSelectedItem.SitingCapacityPolicyCode && programSelectedItem.SitingCapacityPolicyCode === '0002') {
                            e.editorOptions.disabled = true;
                            e.editorOptions.disabled = true;
                        } else if (programSelectedItem.SitingCapacityPolicyCode && programSelectedItem.SitingCapacityPolicyCode === '0001') {
                            e.editorOptions.disabled = false;
                            e.editorOptions.disabled = false;
                        }
                    }
                }
                if (e.parentType === 'dataRow' && e.dataField === 'SellableTimeAfterStart') {
                    e.editorOptions.disabled = e.row.data.SellableAfterStart === 'N';
                    if (e.editorOptions.disabled) {
                        e.setValue(null);
                        e.editorOptions.value = null;
                    }
                }
            },
            onCellPrepared: function (e) {
                if (e.rowType === "group" && (e.column && !e.column.command)) {
                    //e.value ==> groupId,
                    e.cellElement[0].style.lineHeight = '3em';
                    $('<div></div>').addClass('hs-roundofuse-group-button')
                        .append($('<div>').dxButton({
                            icon: 'edit',
                            stylingMode: 'text',
                            elementAttr: {},
                            onClick() {
                                viewOptions.roundOfUseGroupFormOptions.formData({
                                    RoundOfUseGroupName: e.displayValue,
                                    Enabled: true,
                                    IsPublic: 'Y',
                                    WeekendPolicy: 2,
                                    DayOfTheWeekDays: ['MO', 'TU', 'WE', 'TH', 'FR'],
                                    ApplyStartMonth: 11,
                                    ApplyStartDate: 1,
                                    ApplyEndMonth: 12,
                                    ApplyEndDate: 31,
                                });

                                viewOptions.roundOfUseGroupPopupInstance.option('title', '이용회차 그룹 수정');
                                viewOptions.roundOfUseGroupPopupInstance.show();

                            }
                        }))
                        .append($('<div>').dxButton({
                            icon: 'trash',
                            stylingMode: 'text',
                            elementAttr: {},
                            onClick() {

                                DevExpress.ui.dialog.confirm(`회차 그룹 [\${e.displayValue}]을 삭제하시겠습니까?`, '회차그룹삭제').done(function (dialogResult) {
                                    DevExpress.ui.notify({
                                        message: `The "\${dialogResult ? "Confirmed" : "Canceled"}" button was clicked`,
                                        width: 320
                                    }, 'success', 1000);
                                });
                            }
                        }))
                        .appendTo(e.cellElement[0]);
                }
            },
            dataSource: ko.observable(),
            showBorders: true,
            allowColumnResizing: true,
            selection: {
                mode: 'multiple',
            },
            editing: {
                useIcons: true,
                allowAdding: true,
                allowUpdating: true,
                allowDeleting: true,
                confirmDelete: true,
                popup: {
                    title: '이용회차',
                    showTitle: true,
                    width: 860,
                    height: 650,
                    showCloseButton: true,
                    fullScreen: false,
                },
                form: {
                    showColonAfterLabel: false,
                    colCount: 2,
                    customizeItem: function (item) {

                        if (item && item.dataField === "SellableTimeAfterStart") {
                            let editRowKey = viewOptions.roundOfUseGridInstance.option('editing.editRowKey');
                            let index = viewOptions.roundOfUseGridInstance.getRowIndexByKey(editRowKey);
                            index = index === -1 ? 0 : index;
                            let sellable = viewOptions.roundOfUseGridInstance.cellValue(index, "SellableAfterStart");
                            item.disabled = sellable === 'N';
                        }
                    },
                    items: [
                        'ProgramName','RoundOfUseGroupId','RoundOfUseName', 'RoundOfStartTime', 'RoundOfEndTime',
                        {
                            caption: '시작시간 경과후 판매설정',
                            itemType: 'group',
                            colCount: 2,
                            colSpan: 2,
                            items: ['SellableAfterStart', 'SellableTimeAfterStart']
                        },
                        'TotalCapacity',
                        {
                            itemType: 'group',
                            colCount: 2,
                            name: 'totalMaleFemaleCapacityGroup',
                            cssClass: 'hs-roundofuse-capacity-box',
                            items: ['MaleCapacity','FemaleCapacity']
                        },
                        'AdvancedTotalCapacity',
                        {
                            itemType: 'group',
                            colSpan: 2,
                            colCount: 2,
                            name: 'advancedMaleFemaleCapacityGroup',
                            cssClass: 'hs-roundofuse-capacity-box',
                            items: ['AdvancedMaleCapacity','AdvancedFemaleCapacity']
                        },
                        'IsPublic','Enabled',
                    ]
                },
                mode: 'row',
            },
            allowColumnReordering: true,
            grouping: {
                autoExpandAll: true,
            },
            searchPanel: {
                visible: true,
            },
            paging: {
                enabled: false,
            },
            groupPanel: {
                visible: true,
            },
            columns: [
                {
                    dataField: 'ProgramId',
                    allowEditing: false,
                    visible: false,
                },
                {
                    dataField: 'ProgramName',
                    allowEditing: false,
                    caption: '프로그램명',
                    visible: false,
                    formItem : {
                        colSpan: 2,
                    }
                },
                {
                    dataField: 'RoundOfUseGroupId',
                    groupIndex: 0,
                    caption: '그룹명',
                    groupCellTemplate: $('#group-cell-template'),
                    lookup: {
                        dataSource: [
                            {
                                ID: 1,
                                Name: '평일'
                            },
                            {
                                ID: 2,
                                Name: '주말'
                            },
                        ],
                        displayExpr: 'Name',
                        valueExpr: 'ID'
                    },
                    formItem : {
                        colSpan: 2,
                        label: {
                            text: '회차그룹'
                        },
                        editorType: 'dxSelectBox',
                        editorOptions: {},
                    }
                },
                {
                    dataField: 'RoundOfUseId',
                    visible: false,
                },
                {
                    caption: '회차명',
                    dataField: 'RoundOfUseName',
                    editorType: 'dxTextBox',
                    editorOptions: {
                        showClearButton: true,
                    },
                    formItem: {
                        colSpan: 2,
                    }
                },
                {
                    caption: '시작시간',
                    dataField: 'RoundOfStartTime',
                    editorType: 'dxDateBox',
                    format: 'HH:mm',
                    editorOptions: {
                        type: 'time',
                        interval: 5,
                        displayFormat: 'HH:mm',
                    }
                },
                {
                    caption: '종료시간',
                    dataField: 'RoundOfEndTime',
                    editorType: 'dxDateBox',
                    format: 'HH:mm',
                    editorOptions: {
                        type: 'time',
                        interval: 5,
                        displayFormat: 'HH:mm',
                    }
                },
                {
                    caption: '시작시간경과후 판매설정',
                    columns: [
                        {
                            caption: '판매가능여부',
                            dataField: 'SellableAfterStart',
                            dataType: 'boolean',
                            trueText :'판매가능',
                            falseText :'판매불가',
                            alignment: 'left',
                            lookup: {
                                dataSource: sellableData,
                                displayExpr: 'text',
                                valueExpr: 'value',
                            },
                            setCellValue: function (newData, value) {
                                this.defaultSetCellValue(newData, value);
                            },
                        },
                        {
                            caption: '판매가능시간(분)',
                            dataField: 'SellableTimeAfterStart',
                            dataType: 'string',
                            alignment: 'left',
                            lookup: {
                                dataSource: sellableTimeData(10, 50, 10),
                                displayExpr: 'text',
                                valueExpr: 'value',
                            },
                        }
                    ]
                },
                {
                    caption: '총정원',
                    columns: [
                        {
                            caption: '전체',
                            dataField: 'TotalCapacity',
                            editorType: 'dxNumberBox',
                            editorOptions: {
                                min: 0,
                                format: '#,##0',
                                showSpinButtons: true,
                                showClearButton: true,
                            },
                            formItem : {
                                label: {
                                    text: '총정원',
                                },
                            }
                        },
                        {
                            caption: '남자',
                            dataField: 'MaleCapacity',
                            editorType: 'dxNumberBox',
                            editorOptions: {
                                min: 0,
                                format: '#,##0',
                                showSpinButtons: true,
                                showClearButton: true,
                            }
                        },
                        {
                            caption: '여자',
                            dataField: 'FemaleCapacity',
                            editorType: 'dxNumberBox',
                            editorOptions: {
                                min: 0,
                                format: '#,##0',
                                showSpinButtons: true,
                                showClearButton: true,
                            }
                        }
                    ]
                },
                {
                    caption: '사전예약정원(총정원내설정)',
                    columns: [
                        {
                            caption: '전체',
                            dataField: 'AdvancedTotalCapacity',
                            editorType: 'dxNumberBox',
                            editorOptions: {
                                min: 0,
                                format: '#,##0',
                                showSpinButtons: true,
                                showClearButton: true,
                            },
                            formItem : {
                                label: {
                                    text: '사전예약정원',
                                },
                            }
                        },
                        {
                            caption: '남자',
                            dataField: 'AdvancedMaleCapacity',
                            editorType: 'dxNumberBox',
                            editorOptions: {
                                min: 0,
                                format: '#,##0',
                                showSpinButtons: true,
                                showClearButton: true,
                            }
                        },
                        {
                            caption: '여자',
                            dataField: 'AdvancedFemaleCapacity',
                            editorType: 'dxNumberBox',
                            editorOptions: {
                                min: 0,
                                format: '#,##0',
                                showSpinButtons: true,
                                showClearButton: true,
                            }
                        }
                    ]
                },
                {
                    caption: '온라인공개',
                    dataField: 'IsPublic',
                    editorType: 'dxSelectBox',
                    dataType:'boolean',
                    alignment :'left',
                    editorOptions: {
                        dataSource: new DevExpress.data.ArrayStore({
                            key: 'Code',
                            data: publicData,
                        }),
                        displayExpr: 'Name',
                        valueExpr: 'Code'
                    },
                    showEditorAlways:false,
                    calculateDisplayValue: (rowData) =>{
                        const {Name} = publicData.find(({Code})=> Code === rowData.IsPublic) ||{};
                        return Name;
                    },
                },
                {
                    caption: '사용여부',
                    dataField: 'Enabled',
                    editorType: 'dxSelectBox',
                    alignment :'left',
                    dataType: 'boolean',
                    editorOptions: {
                        dataSource: new DevExpress.data.ArrayStore({
                            key: 'Code',
                            data: enabledData,
                        }),
                        displayExpr: 'Name',
                        valueExpr: 'Code',
                    },
                    showEditorAlways:false,
                    calculateDisplayValue: (rowData) => {
                        const {Name} = enabledData.find(({Code})=> Code === rowData.Enabled)||{};
                        return Name;
                    },
                }
            ],
            toolbar: {
                items: [
                    {
                        location: 'before',
                        widget: 'dxButton',
                        options: {
                            text: '그룹추가',
                            onClick(e) {
                                viewOptions.roundOfUseGroupFormOptions.formData({
                                    Enabled: true,
                                    WeekendPolicy: 1,
                                    DayOfTheWeekDays: ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'],
                                    ApplyStartMonth: 1,
                                    ApplyStartDate: 1,
                                    ApplyEndMonth: 12,
                                    ApplyEndDate: 31,
                                });
                                viewOptions.roundOfUseGroupPopupInstance.option('title', '이용회차 그룹 추가');
                                viewOptions.roundOfUseGroupPopupInstance.show();
                            }
                        }
                    },
                    {
                        location: 'before',
                        widget: 'dxButton',
                        options: {
                            text: '자유수영시간표 가져오기',
                            onClick() {
                                viewOptions.freeSwimmingGridOptions.dataSource(
                                    new DevExpress.data.ArrayStore({
                                        key: 'RoundOfUseId',
                                        data: freeSwimmingItems(),
                                    })
                                )
                                viewOptions.freeSwimmingTimeTablePopupInstance.show();
                            }
                        }
                    },
                    {
                        location: 'before',
                        widget: 'dxButton',
                        options: {
                            text: '매표가능시간 일괄설정',
                            disabled:true,
                            onClick() {
                                if (!viewOptions.roundOfUseGridInstance.getSelectedRowKeys().length) {
                                    DevExpress.ui.dialog.alert('일괄설정할 데이터를 선택하세요.', '매표가능시간 일괄설정');
                                    return false;
                                }
                                viewOptions.sellableTimeBatchPopupInstance.show();
                            }
                        }
                    },
                    {
                        location: 'after',
                        name: 'addRowButton'
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            icon: 'minus',
                            disabled: true,
                            onClick() {
                                viewOptions.roundOfUseGridInstance.getSelectedRowKeys().forEach((key) => {
                                    //employeesStore.remove(key);
                                });
                                viewOptions.roundOfUseGridInstance.refresh();
                            },
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            icon: 'refresh'
                        },
                        onClick() {
                            viewOptions.roundOfUseGridInstance.refresh();
                        }
                    },
                    {
                        location: 'after',
                        name: 'exportButton',
                    },
                ]
            },
        },
        roundOfUseGroupPopupInstance: {},
        freeSwimmingTimeTablePopupInstance: {},
        freeSwimmingGridInstance: {},
        freeSwimmingGridOptions: {
            height: '100%',
            dataSource: ko.observable(),
            loadPanel: {
                enabled: true
            },
            columns: [
                {
                    dataField: 'RoundOfUseGroupId',
                    lookup: {
                        dataSource: timeTableGroupData,
                        displayExpr: 'Name',
                        valueExpr: 'ID'
                    },
                    groupIndex: 0,
                    groupCellTemplate: $('#group-cell-template'),
                },
                {
                    dataField: 'RoundOfUseId',
                    visible: false,
                },
                {
                    dataField: 'RoundOfUseName',
                    caption: '회차명',
                },
                {
                    caption: '시작시간',
                    dataField: 'RoundOfStartTime',
                    editorType: 'dxDateBox',
                    editorOptions: {
                        type: 'time',
                        displayFormat: 'HH:mm',
                        interval: 10,
                    },
                },
                {
                    caption: '종료시간',
                    dataField: 'RoundOfEndTime',
                    editorType: 'dxDateBox',
                    editorOptions: {
                        type: 'time',
                        displayFormat: 'HH:mm',
                        interval: 10,
                    },
                },
                {
                    caption: '시작시간경과후 판매설정',
                    columns: [
                        {
                            caption: '판매가능여부',
                            dataField: 'SellableAfterStart',
                            dataType: 'boolean',
                            trueText :'판매가능',
                            falseText :'판매불가',
                            alignment: 'left',
                            displayFunc: 'formatSellable',
                            lookup: {
                                dataSource: sellableData,
                                displayExpr: 'text',
                                valueExpr: 'value',
                            },
                            setCellValue: function (newData, value) {
                                this.defaultSetCellValue(newData, value);
                            },
                        },
                        {
                            caption: '판매가능시간(분)',
                            dataField: 'SellableTimeAfterStart',
                            dataType: 'string',
                            alignment: 'left',
                            lookup: {
                                dataSource: sellableTimeData(10, 50, 10),
                                displayExpr: 'text',
                                valueExpr: 'value',
                            },
                        }
                    ]
                },
                {
                    caption: '총정원',
                    columns: [
                        {
                            caption: '전체',
                            dataField: 'TotalCapacity',
                            editorType: 'dxNumberBox',
                            editorOptions: {
                                min: 0,
                                max: 999,
                                format: '#,##0',
                                showSpinButtons: true,
                                showClearButton: true,
                            }
                        },
                        {
                            caption: '남자',
                            dataField: 'MaleCapacity',
                            editorType: 'dxNumberBox',
                            editorOptions: {
                                min: 0,
                                max: 999,
                                format: '#,##0',
                                showSpinButtons: true,
                                showClearButton: true,
                            }
                        },
                        {
                            caption: '여자',
                            dataField: 'FemaleCapacity',
                            editorType: 'dxNumberBox',
                            editorOptions: {
                                min: 0,
                                max: 999,
                                format: '#,##0',
                                showSpinButtons: true,
                                showClearButton: true,
                            }
                        }
                    ]
                },
                {
                    caption: '사전예약정원(총정원내설정)',
                    columns: [
                        {
                            caption: '전체',
                            dataField: 'AdvancedTotalCapacity',
                            editorType: 'dxNumberBox',
                            editorOptions: {
                                min: 0,
                                max: 999,
                                format: '#,##0',
                                showSpinButtons: true,
                                showClearButton: true,
                            }
                        },
                        {
                            caption: '남자',
                            dataField: 'AdvancedMaleCapacity',
                            editorType: 'dxNumberBox',
                            editorOptions: {
                                min: 0,
                                max: 999,
                                format: '#,##0',
                                showSpinButtons: true,
                                showClearButton: true,
                            }
                        },
                        {
                            caption: '여자',
                            dataField: 'AdvancedFemaleCapacity',
                            editorType: 'dxNumberBox',
                            editorOptions: {
                                min: 0,
                                max: 999,
                                format: '#,##0',
                                showSpinButtons: true,
                                showClearButton: true,
                            }
                        }
                    ]
                },
                {
                    caption: '온라인공개',
                    dataField: 'IsPublic',
                    lookup: {
                        dataSource: publicData,
                        displayExpr: 'Name',
                        valueExpr: 'Code'
                    },
                },
                {
                    caption: '사용여부',
                    dataField: 'Enabled',
                    lookup: {
                        dataSource: enabledData,
                        displayExpr: 'Name',
                        valueExpr: 'Code',
                    }
                }
            ],
            editing: {
                mode: 'batch',
                allowUpdating: true,
            },
            selection: {
                mode: 'multiple',
            },
            toolbar: {
                items: [
                    //'saveButton',
                    'revertButton',
                    {
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            icon: 'refresh'
                        },
                        onClick() {
                            viewOptions.freeSwimmingGridInstance.refresh();
                        }
                    },
                ]
            },
            onInitialized(e) {
                viewOptions.freeSwimmingGridInstance = e.component;
            },
            onEditorPreparing: function (e) {

                if ((e.dataField === "MaleCapacity" || e.dataField === 'FemaleCapacity' || e.dataField === 'AdvancedMaleCapacity' || e.dataField === 'AdvancedFemaleCapacity') && e.parentType === "dataRow") {

                    const programSelectedItem = viewOptions.selectedProgram();

                    if (programSelectedItem) {

                        if (programSelectedItem.SitingCapacityPolicyCode && programSelectedItem.SitingCapacityPolicyCode === '0002') {
                            e.editorOptions.disabled = true;
                            e.editorOptions.disabled = true;
                        } else if (programSelectedItem.SitingCapacityPolicyCode && programSelectedItem.SitingCapacityPolicyCode === '0001') {
                            e.editorOptions.disabled = false;
                            e.editorOptions.disabled = false;
                        }
                    }
                }

                if (e.parentType === 'dataRow' && e.dataField === 'SellableTimeAfterStart') {
                    e.editorOptions.disabled = e.row.data.SellableAfterStart === 'N';
                    if (e.editorOptions.disabled) {
                        e.setValue(null);
                        e.editorOptions.value = null;
                    }
                }
            },
        },
        roundOfUseGroupFormInstance: {},
        roundOfUseGroupFormOptions: {
            repaintChangesOnly: true,
            formData: ko.observable(),
            colCount: 1,
            onInitialized(e) {
                viewOptions.roundOfUseGroupFormInstance = e.component;
            },
            showColonAfterLabel: false,
            items: [
                {
                    itemType: 'group',
                    colCount: 2,
                    items: [
                        {
                            colSpan: 2,
                            dataField: 'RoundOfUseGroupName',
                            label: {
                                text: '그룹명',

                            },
                            editorOptions: {
                                placeholder: '그룹명을 입력하세요.',
                                showClearButton: true,
                            }
                        },
                        {
                            dataField: 'Enabled',
                            label: {
                                text: '사용여부',
                            },
                            editorType: 'dxSelectBox',
                            editorOptions: {
                                dataSource: new DevExpress.data.ArrayStore({
                                    key: 'Code',
                                    data: enabledData
                                }),
                                displayExpr: 'Name',
                                valueExpr: 'Code',
                            }
                        },
                        {
                            itemType: 'empty',
                        },
                    ]
                },
                {
                    itemType: "group",
                    colCount: 2,
                    caption: '노출설정',
                    items: [
                        {
                            label: {
                                text: '적용요일',
                            },
                            dataField: 'WeekendPolicy',
                            editorType: 'dxRadioGroup',
                            dataType: 'number',
                            editorOptions: {
                                layout: 'horizontal',
                                valueExpr: 'ID',
                                displayExpr: 'Text',
                                items: weekendPolicy,
                                onValueChanged: function (e) {
                                    e.component.option('value', e.value);

                                    if (e.value) {

                                        const getWeekdaySelectedItems = function (policyCode) {
                                            if (policyCode) {
                                                const selectedPolicy = weekendPolicy.find(({
                                                                                               ID,
                                                                                               items
                                                                                           }) => ID === policyCode);
                                                return selectedPolicy.items;

                                            } else {
                                                return null;
                                            }
                                        };

                                        viewOptions.roundOfUseGroupFormInstance.updateData('DayOfTheWeekDays', getWeekdaySelectedItems(e.value));
                                        viewOptions.roundOfUseGroupFormInstance.repaint();
                                    }
                                }
                            }
                        },
                        {
                            dataField: 'DayOfTheWeekDays',
                            label: {
                                visible: false,
                            },
                            template: function (data, itemElement) {

                                $('<div>').dxButtonGroup({
                                    items: dayPolicy,
                                    keyExpr: 'ID',
                                    selectionMode: "multiple",
                                    selectedItemKeys: data.component.option('formData')[data.dataField],
                                    height: 30,
                                    width: '100%',
                                    buttonTemplate: () => $('#weekday-buttongroup-template'),
                                    onSelectionChanged(e) {
                                        const selectedItems = e.component.option('selectedItemKeys');
                                        data.component.updateData(data.dataField, selectedItems);

                                        const policyKey = getWeekendPolicyIdByItems(selectedItems);
                                        data.component.getEditor('WeekendPolicy').option('value', policyKey);
                                        viewOptions.roundOfUseGroupFormInstance.repaint();

                                    }
                                }).appendTo(itemElement);
                            }
                        },
                        {
                            label: {
                                text: '적용기간',
                                location: 'top',
                            },
                            colSpan: 2,
                            itemType: 'group',
                            colCount: 2,
                            cssClass: 'hs-roundofusedate-box',
                            items: [
                                {
                                    label: {
                                        text: '시작일',
                                        location: 'left',
                                        showColon: false,
                                    },
                                    colCount: 2,
                                    itemType: 'group',
                                    items: [
                                        {
                                            label: {
                                                text: '월',
                                                location: 'right',
                                                showColon: false,
                                            },
                                            dataField: 'ApplyStartMonth',
                                            cssClass: 'hs-four-box',
                                            editorType: 'dxNumberBox',
                                            editorOptions: {
                                                min: 1,
                                                max: 12,
                                                showSpinButtons: true,
                                                showClearButton: true,
                                            }
                                        },
                                        {
                                            label: {
                                                text: '일',
                                                location: 'right',
                                                showColon: false,
                                            },
                                            dataField: 'ApplyStartDate',
                                            cssClass: 'hs-four-box',
                                            editorType: 'dxNumberBox',
                                            editorOptions: {
                                                min: 1,
                                                max: 31,
                                                showSpinButtons: true,
                                                showClearButton: true,
                                            }
                                        },
                                    ]
                                },
                                {
                                    label: {
                                        text: '종료일',
                                        location: 'left',
                                        showColon: false,
                                    },
                                    itemType: 'group',
                                    colCount: 2,
                                    items: [
                                        {
                                            label: {
                                                text: '월',
                                                location: 'right',
                                                showColon: false,
                                            },
                                            cssClass: 'hs-four-box',
                                            dataField: 'ApplyEndMonth',
                                            editorType: 'dxNumberBox',
                                            editorOptions: {
                                                min: 1,
                                                max: 12,
                                                showSpinButtons: true,
                                                showClearButton: true,
                                            }
                                        },
                                        {
                                            label: {
                                                text: '일',
                                                location: 'right',
                                                showColon: false,
                                            },
                                            dataField: 'ApplyEndDate',
                                            cssClass: 'hs-four-box',
                                            editorType: 'dxNumberBox',
                                            editorOptions: {
                                                min: 1,
                                                max: 31,
                                                showSpinButtons: true,
                                                showClearButton: true,
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
            ]
        },
        sellableTimeBatchPopupInstance: {},
        sellableTimeBatchFormOptions: {
            showColonAfterLabel: false,
            formData: ko.observable(),
            items: [
                {
                    itemType: 'group',
                    caption: '시작시간경과후 판매설정',
                    items: [
                        {
                            label: {
                                text: '판매가능여부',
                            },
                            dataField: 'SellableAfterStart',
                            editorType: 'dxSelectBox',
                            dataType:'boolean',
                            editorOptions: {
                                dataSource: sellableData,
                                displayExpr: 'text',
                                valueExpr: 'value',
                                value: false,
                                onValueChanged(e) {
                                    if (e.value === 'Y') {
                                        e.model.sellableTimeBatchFormInstance.getEditor('SellableTimeAfterStart').option('disabled', false)

                                    } else {
                                        e.model.sellableTimeBatchFormInstance.getEditor('SellableTimeAfterStart').option({
                                            disabled: !e.value,
                                            value: null
                                        });
                                    }
                                }
                            }
                        },
                        {
                            label: {
                                text: '판매가능시간(분)',
                            },
                            dataField: 'SellableTimeAfterStart',
                            editorType: 'dxSelectBox',
                            editorOptions: {
                                dataSource: sellableTimeData(10, 50, 10),
                                displayExpr: 'text',
                                valueExpr: 'value',
                                disabled: true,
                            }
                        }
                    ]
                }
            ],
            onInitialized(e) {
                viewOptions.sellableTimeBatchFormInstance = e.component;
            }
        },
        sellableTimeBatchFormInstance: {},
        unavailableSelectedInfo: ko.observable(),
        unavailableCalendarData: ko.observableArray(null),
        unavailableCalendarInstance: {},
        unavailableCalendarOptions: {
            showTodayButton: true,
            minZoomLevel: 'month',
            maxZoomLevel: 'month',
            activeStateEnabled: false,
            focusStateEnabled: false,
            cellTemplate: (data, weekDay, cellElement) => {
                if (isDisableDate(data.date, data.view)) {
                    cellElement[0].classList.add('hs-cell-disabled');
                }
                return $('#unavailable-cell-template');
            },
            onCellClick(e) {
                if (!isDisableDate(e.value, 'month')) {
                    viewOptions.unavailableSelectedInfo(new CalendarItem(e.value));
                    viewOptions.unavailableCreatePopupInstance.show();
                }
            },
            onInitialized(e) {
                viewOptions.unavailableCalendarInstance = e.component;
            }
        },
        unavailableCreatePopupInstance: {},
        unavailableCreateFormInstance: {},
        unavailableCreateFormOptions: {
            recurrenceRule: ko.observable(new RecurrenceRule()),
            formData: ko.observable(),
            colCount: 1,
            showColonAfterLabel: false,
            items: [
                {
                    itemType: 'group',
                    name: 'mainGroup',
                    colCount: 2,
                    items: [
                        {
                            colSpan: 2,
                            dataField: 'programName',
                            label: {
                                text: '프로그램명',
                            },
                            editorOptions: {
                                readOnly: true,
                            }
                        },
                        {
                            label: {
                                text: '시작일자'
                            },
                            dataField: 'startDate',
                            editorType: 'dxDateBox',
                            editorOptions: {
                                type: 'date',
                                displayFormat: 'yyyy-MM-dd',
                                field: 'dtstart',
                                onValueChanged(e) {

                                    if (e.value) {
                                        const form = e.model.unavailableCreateFormInstance;
                                        const recurrenceRule = e.model.unavailableCreateFormOptions.recurrenceRule();
                                        recurrenceRule.makeRule(e.component.option('field'), e.value.toUntilString());
                                        form.updateData('recurrenceRule', recurrenceRule.getRecurrenceString() || '');
                                    }
                                }
                            }
                        },
                        {
                            label: {
                                text: '종료일자',
                            },
                            dataField: 'endDate',
                            editorType: 'dxDateBox',
                            editorOptions: {
                                type: 'date',
                                displayFormat: 'yyyy-MM-dd',
                            }
                        },
                        {
                            colSpan: 2,
                            dataField: 'description',
                            editorType: 'dxTextArea',
                            label: {
                                text: '제외사유',
                            },
                            editorOptions: {
                                height: 100,
                                maxLength : 200,
                            }
                        },
                        {
                            colSpan: 2,
                            dataField: 'repeat',
                            editorType: 'dxSwitch',
                            label: {
                                text: '반복'
                            },
                            editorOptions: {
                                onValueChanged(e) {
                                    e.model.unavailableCreatePopupInstance.option('width', e.value ? 1160 : 580);
                                    e.model.unavailableCreateFormInstance.option('colCount', e.value ? 2 : 1);
                                    e.model.unavailableCreateFormInstance.itemOption('repeatGroup', 'visible', e.value);
                                    e.model.unavailableCreateFormInstance.getEditor('freq').option('value', 'WEEKLY');
                                    e.model.unavailableCreateFormInstance.getEditor('interval').option('value', 1);
                                    e.model.unavailableCreateFormInstance.getEditor('until').option('value', new Date());
                                }
                            }
                        },
                    ]
                },
                {
                    itemType: 'group',
                    name: 'repeatGroup',
                    visible: false,
                    colCount: 1,
                    items: [
                        {
                            visible: false,
                            dataField: "recurrenceRule",
                            label: {
                                text: 'Rule',
                            },
                            editorOptions: {
                                readOnly: true,
                            }
                        },
                        {
                            dataField: 'freq',
                            label: {
                                text: '반복빈도',
                            },
                            editorType: 'dxSelectBox',
                            editorOptions: {
                                dataSource: new DevExpress.data.ArrayStore({
                                    key: 'Code',
                                    data: frequency,
                                }),
                                valueExpr: 'Code',
                                displayExpr: 'Name',
                                field: 'freq',
                                onValueChanged(e) {

                                    const form = viewOptions.unavailableCreateFormInstance;
                                    const recurrenceRule = viewOptions.unavailableCreateFormOptions.recurrenceRule();

                                    if (e.value === 'WEEKLY') {
                                        form.itemOption('repeatGroup.intervalGroup.interval', {
                                            label: {
                                                text: '주마다'
                                            }
                                        });
                                        if (form.itemOption('repeatGroup.intervalGroup.repeatMonthlyCondition').visible) {
                                            form.getEditor('repeatMonthlyCondition').resetOption('value');
                                        }

                                        form.itemOption('repeatGroup.intervalGroup.repeatMonthlyCondition', 'visible', false);
                                        form.itemOption('repeatGroup.intervalGroup.repeatMonthlyConditionBlank', 'visible', true);

                                        const repeatByDay = $('.repeatByDay').dxButtonGroup('instance');
                                        if (repeatByDay) {
                                            repeatByDay.resetOption('selectedItemKeys');
                                        }
                                        form.itemOption('repeatGroup.bySetPosGroup.repeatBySetPos', 'visible', false);
                                        form.itemOption('repeatGroup.bySetPosGroup.repeatBySetPosBlank', 'visible', false);
                                        form.itemOption('repeatGroup.byDayGroup.repeatByDay', 'visible', true);
                                        form.itemOption('repeatGroup.byMonthGroup.repeatByMonth', 'visible', false);
                                        form.itemOption('repeatGroup.byMonthGroup.repeatByMonthDay', 'visible', false);
                                        form.itemOption('repeatGroup.byMonthGroup.repeatByMonthDayBlank', 'visible', false);

                                    } else if (e.value === 'MONTHLY') {

                                        form.itemOption('repeatGroup.intervalGroup.interval', {
                                            label: {
                                                text: '월마다'
                                            }
                                        });

                                        form.itemOption('repeatGroup.intervalGroup.repeatMonthlyCondition', 'visible', true);
                                        form.itemOption('repeatGroup.intervalGroup.repeatMonthlyConditionBlank', 'visible', false);
                                        form.itemOption('repeatGroup.byDayGroup.repeatByDay', 'visible', false);
                                        form.itemOption('repeatGroup.byMonthGroup.repeatByMonth', 'visible', false);
                                        form.itemOption('repeatGroup.byMonthGroup.repeatByMonthDay', 'visible', false);
                                        form.itemOption('repeatGroup.byMonthGroup.repeatByMonthDayBlank', 'visible', false);
                                        form.itemOption('repeatGroup.bySetPosGroup.repeatBySetPosBlank', 'visible', false);

                                    } else if (e.value === 'YEARLY') {

                                        form.itemOption('repeatGroup.intervalGroup.interval', {
                                            label: {
                                                text: '년마다'
                                            }
                                        });

                                        if (form.itemOption('repeatGroup.intervalGroup.repeatMonthlyCondition').visible) {
                                            form.getEditor('repeatMonthlyCondition').resetOption('value');
                                        }
                                        form.itemOption('repeatGroup.intervalGroup.repeatMonthlyCondition', 'visible', false);
                                        form.itemOption('repeatGroup.intervalGroup.repeatMonthlyConditionBlank', 'visible', true);
                                        form.itemOption('repeatGroup.byDayGroup.repeatByDay', 'visible', false);
                                        form.itemOption('repeatGroup.byMonthGroup.repeatByMonth', 'visible', true);
                                        form.itemOption('repeatGroup.byMonthGroup.repeatByMonthDay', 'visible', true);
                                        form.itemOption('repeatGroup.bySetPosGroup.repeatBySetPos', 'visible', false);
                                        form.itemOption('repeatGroup.bySetPosGroup.repeatBySetPosBlank', 'visible', false);
                                        form.itemOption('repeatGroup.byMonthGroup.repeatByMonthDayBlank', 'visible', false);

                                    }

                                    recurrenceRule.makeRule(e.component.option('field'), e.value);
                                    recurrenceRule.deleteRule('byDay');
                                    recurrenceRule.deleteRule('byMonth');
                                    recurrenceRule.deleteRule('byMonthDay');
                                    form.updateData('recurrenceRule', recurrenceRule.getRecurrenceString() || '');
                                }
                            }
                        },
                        {
                            itemType: 'group',
                            name: 'intervalGroup',
                            colCount: 2,
                            items: [
                                {
                                    label: {
                                        text: '주마다',
                                        location: 'right',
                                        showColon: false,
                                    },
                                    cssClass: 'hs-repeat-yearly-last-box',
                                    editorType: 'dxNumberBox',
                                    dataField: 'interval',
                                    editorOptions: {
                                        showSpinButtons: true,
                                        field: 'interval',
                                        min: 1,
                                        max: 12,
                                        onValueChanged(e) {
                                            const form = e.model.unavailableCreateFormInstance;
                                            const recurrenceRule = e.model.unavailableCreateFormOptions.recurrenceRule();

                                            recurrenceRule.makeRule(e.component.option('field'), e.value);
                                            form.updateData('recurrenceRule', recurrenceRule.getRecurrenceString() || '');
                                        }
                                    }
                                },
                                {
                                    dataField: 'repeatMonthlyCondition',
                                    editorType: 'dxSelectBox',
                                    visible: false,
                                    label: {
                                        visible: false,
                                    },
                                    editorOptions: {
                                        dataSource: new DevExpress.data.ArrayStore({
                                            key: 'Code',
                                            data: repeatMonthlyConditions,
                                        }),
                                        valueExpr: 'Code',
                                        displayExpr: 'Name',
                                        onValueChanged(e) {

                                            const form = e.model.unavailableCreateFormInstance;
                                            const recurrenceRule = e.model.unavailableCreateFormOptions.recurrenceRule();

                                            if (e.value === '0001') {

                                                recurrenceRule.deleteRule('byDay');
                                                const repeatByDay = $('.repeatByDay').dxButtonGroup('instance');
                                                if (repeatByDay) {
                                                    repeatByDay.resetOption('selectedItemKeys');
                                                }
                                                if (form.itemOption('repeatGroup.bySetPosGroup.repeatBySetPos').visible) {
                                                    form.getEditor('repeatBySetPos').resetOption('value');
                                                }

                                                form.itemOption('repeatGroup.bySetPosGroup.repeatBySetPos', "visible", false);

                                                form.itemOption('repeatGroup.bySetPosGroup.repeatBySetPosBlank', 'visible', false);
                                                form.itemOption('repeatGroup.byDayGroup.repeatByDay', 'visible', false);
                                                form.itemOption('repeatGroup.byMonthGroup.repeatByMonthDay', 'visible', true);
                                                form.itemOption('repeatGroup.byMonthGroup.repeatByMonthDayBlank', 'visible', true);

                                            } else {

                                                if (form.itemOption('repeatGroup.byMonthGroup.repeatByMonthDay').visible) {
                                                    form.getEditor('repeatByMonthDay').resetOption('value');
                                                }

                                                recurrenceRule.deleteRule('byMonthDay');
                                                form.itemOption('repeatGroup.bySetPosGroup.repeatBySetPos', "visible", true);
                                                form.itemOption('repeatGroup.bySetPosGroup.repeatBySetPosBlank', 'visible', true);
                                                form.itemOption('repeatGroup.byDayGroup.repeatByDay', 'visible', true);
                                                form.itemOption('repeatGroup.byMonthGroup.repeatByMonthDay', 'visible', false);
                                                form.itemOption('repeatGroup.byMonthGroup.repeatByMonthDayBlank', 'visible', false);

                                            }
                                        }
                                    }
                                },
                                {
                                    itemType: 'empty',
                                    name: 'repeatMonthlyConditionBlank',
                                    visible: false,
                                }
                            ],
                        },
                        {
                            itemType: 'group',
                            name: 'bySetPosGroup',
                            colCount: 2,
                            items: [
                                {
                                    label: {
                                        text: '반복요일',
                                    },
                                    visible: false,
                                    dataField: 'repeatBySetPos',
                                    editorType: 'dxSelectBox',
                                    editorOptions: {
                                        valueExpr: 'ID',
                                        displayExpr: 'Name',
                                        field: 'bySetPos',
                                        dataSource: new DevExpress.data.ArrayStore({
                                            key: 'ID',
                                            data: [
                                                {
                                                    ID: 1,
                                                    Name: '첫번째'
                                                },
                                                {
                                                    ID: 2,
                                                    Name: '두번째',
                                                },
                                                {
                                                    ID: 3,
                                                    Name: '세번째'
                                                },
                                                {
                                                    ID: 4,
                                                    Name: '네번째'
                                                },
                                                {
                                                    ID: -1,
                                                    Name: '마지막'
                                                }
                                            ]
                                        }),
                                        onValueChanged(e) {
                                            const form = e.model.unavailableCreateFormInstance;
                                            const recurrenceRule = e.model.unavailableCreateFormOptions.recurrenceRule();

                                            const repeatByDay = $('.repeatByDay').dxButtonGroup('instance');
                                            const selectedItems = repeatByDay.option('selectedItemKeys');
                                            if (selectedItems && !!selectedItems.length) {
                                                if (recurrenceRule.getRules().freq === 'MONTHLY' && e.value) {
                                                    const arrays = selectedItems.map((i) => e.value + i);
                                                    recurrenceRule.makeRule('byDay', arrays.join(','));
                                                } else {
                                                    recurrenceRule.makeRule('byDay', selectedItems.join(','));
                                                }
                                            }
                                            form.updateData('recurrenceRule', recurrenceRule.getRecurrenceString() || '');
                                        }
                                    }
                                },
                                {
                                    itemType: 'empty',
                                    name: 'repeatBySetPosBlank',
                                    visible: false,
                                },
                            ]
                        },
                        {
                            itemType: 'group',
                            name: 'byDayGroup',
                            cssClass: 'hs-repeat-yearly-last-box',
                            colCount: 1,
                            items: [
                                {
                                    dataField: 'repeatByDay',
                                    label: {
                                        visible: false,
                                    },
                                    visible: false,
                                    template: function (data, itemElement) {
                                        const form = data.component;
                                        const recurrenceRule = viewOptions.unavailableCreateFormOptions.recurrenceRule();

                                        $('<div class="repeatByDay">').dxButtonGroup({
                                            field: 'byDay',
                                            items: dayPolicy,
                                            keyExpr: 'ID',
                                            selectionMode: "multiple",
                                            selectedItemKeys: data.component.option('formData')[data.dataField],
                                            height: 30,
                                            width: '100%',
                                            buttonTemplate: () => $('#weekday-buttongroup-template'),
                                            onSelectionChanged(e) {
                                                const selectedItems = e.component.option('selectedItemKeys');
                                                if (selectedItems && selectedItems.length > 0) {
                                                    if (recurrenceRule.getRules().freq === 'MONTHLY' && form.option("formData")['repeatBySetPos']) {
                                                        const arrays = selectedItems.map((i) => form.option("formData")['repeatBySetPos'] + i);
                                                        recurrenceRule.makeRule(e.component.option('field'), arrays.join(','));
                                                    } else {
                                                        recurrenceRule.makeRule(e.component.option('field'), selectedItems.join(','));
                                                    }

                                                } else {
                                                    recurrenceRule.deleteRule(e.component.option('field'));
                                                }
                                                form.updateData('recurrenceRule', recurrenceRule.getRecurrenceString() || '');
                                            }
                                        }).appendTo(itemElement);
                                    }
                                }
                            ]
                        },
                        {
                            itemType: 'group',
                            name: 'byMonthGroup',
                            colCount: 2,
                            items: [
                                {
                                    label: {
                                        text: '반복일자',
                                    },
                                    dataField: 'repeatByMonth',
                                    visible: false,
                                    template: function (item, itemElement) {

                                        $('<div>').addClass("hs-repeat-bymonth")
                                            .append($('<div>').dxSelectBox({
                                                field: 'byMonth',
                                                items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                                                onValueChanged(e) {
                                                    const form = item.component;
                                                    const recurrenceRule = viewOptions.unavailableCreateFormOptions.recurrenceRule();

                                                    recurrenceRule.makeRule(e.component.option('field'), e.value);
                                                    form.updateData('recurrenceRule', recurrenceRule.getRecurrenceString() || '');
                                                }
                                            })).append($('<div>').addClass('hs-repeat-bymonth-label').html('월'))
                                            .appendTo(itemElement);
                                    },
                                },
                                {
                                    label: {
                                        location: 'right',
                                        showColon: false,
                                        text: '일'
                                    },
                                    visible: false,
                                    dataField: 'repeatByMonthDay',
                                    cssClass: 'hs-repeat-yearly-last-box',
                                    editorType: 'dxNumberBox',
                                    editorOptions: {
                                        min: 1,
                                        max: 31,
                                        format: '#',
                                        field: 'byMonthDay',
                                        showSpinButtons: true,
                                        onValueChanged(e) {
                                            const form = e.model.unavailableCreateFormInstance;
                                            const recurrenceRule = e.model.unavailableCreateFormOptions.recurrenceRule();

                                            recurrenceRule.makeRule(e.component.option('field'), e.value);
                                            form.updateData('recurrenceRule', recurrenceRule.getRecurrenceString() || '');
                                        }
                                    }
                                },
                                {
                                    name: "repeatByMonthDayBlank",
                                    itemType: 'empty',
                                    visible: false,
                                    cssClass: 'repeat-bymonthday-blank',
                                },
                            ]
                        },
                        {
                            itemType: 'group',
                            colCount: 2,
                            name: 'repeatRangeGroup',
                            items: [
                                {
                                    dataField: 'until',
                                    editorType: 'dxDateBox',
                                    editorOptions: {
                                        displayFormat: 'yyyy-MM-dd',
                                        field: 'until',
                                        onValueChanged(e) {

                                            if (e.value) {
                                                const form = e.model.unavailableCreateFormInstance;
                                                const recurrenceRule = e.model.unavailableCreateFormOptions.recurrenceRule();
                                                recurrenceRule.makeRule(e.component.option('field'), e.value.toUntilString());
                                                form.updateData('recurrenceRule', recurrenceRule.getRecurrenceString() || '');
                                            }
                                        }
                                    },
                                    label: {
                                        text: '반복종료일자',
                                    },
                                },
                                {
                                    itemType: 'empty',
                                }
                            ]
                        },
                    ]
                }
            ],
            onInitialized(e) {
                viewOptions.unavailableCreateFormInstance = e.component;
            }
        },
        unavailableCopyPopupInstance: {},
        unavailableCopyProgramSelectBoxInstance: {},
        unavailableCopySourceListInstance: {},
        unavailableCopySourceListOptions: {
            height: '85%',
            dataSource: ko.observableArray(),
            noDataText: '복사할 프로그램을 선택하세요.',
            onInitialized(e) {
                viewOptions.unavailableCopySourceListInstance = e.component;
            },
            keyExpr: 'Date',
            displayExpr(item) {
                return `\${item.Date.formatDateString('yyyy-MM-dd')} \${item.Title}`;
            },
            selectionMode: "multiple",
            showScrollbar: "onHover",
            showSelectionControls: true,
            onSelectionChanged(e) {
                const selectedItemKeys = e.component.option('selectedItemKeys');
                if (selectedItemKeys) {

                    viewOptions.unavailableCopySourceCount(selectedItemKeys.length);

                    if (selectedItemKeys.length === e.component.getDataSource().items().length) {
                        viewOptions.unavailableCopySourceAllButtonInstance.option(
                            {
                                text: '전체해제',
                                onClick() {
                                    e.component.unselectAll()();
                                }
                            }
                        );

                    } else {
                        viewOptions.unavailableCopySourceAllButtonInstance.option(
                            {
                                text: '전체선택',
                                onClick() {
                                    e.component.selectAll();
                                }
                            }
                        );
                    }
                } else {
                    viewOptions.unavailableCopySourceCount(0);
                    viewOptions.unavailableCopySourceAllButtonInstance.option(
                        {
                            text: '전체선택',
                            onClick() {
                                e.component.selectAll();
                            }
                        }
                    );
                }
            }
        },
        unavailableCopyTargetListInstance: {},
        unavailableCopyTargetListOptions: {
            height: '85%',
            dataSource: ko.observableArray(),
            keyExpr: 'Date',
            displayExpr(item) {
                return `\${item.Date.formatDateString('yyyy-MM-dd')} \${item.Title}`;
            },
            selectionMode: "multiple",
            showScrollbar: "onHover",
            showSelectionControls: true,
            noDataText: '복사할 일정을 선택하세요.',
            onInitialized(e) {
                viewOptions.unavailableCopyTargetListInstance = e.component;
            },
            onSelectionChanged(e) {
                const selectedItemKeys = e.component.option('selectedItemKeys');
                if (selectedItemKeys) {
                    viewOptions.unavailableCopyTargetCount(selectedItemKeys.length);

                    if (selectedItemKeys.length === e.component.getDataSource().items().length) {
                        viewOptions.unavailableCopyTargetAllButtonInstance.option(
                            {
                                text: '전체해제',
                                onClick() {
                                    e.component.unselectAll()();
                                }
                            }
                        );
                    } else {
                        viewOptions.unavailableCopyTargetAllButtonInstance.option(
                            {
                                text: '전체선택',
                                onClick() {
                                    e.component.selectAll();
                                }
                            }
                        );
                    }
                } else {
                    viewOptions.unavailableCopyTargetCount(0);
                    viewOptions.unavailableCopyTargetAllButtonInstance.option(
                        {
                            text: '전체선택',
                            onClick() {
                                e.component.selectAll();
                            }
                        }
                    );
                }
            }
        },
        unavailableCopySourceCount: ko.observable(0),
        unavailableCopyTargetCount: ko.observable(0),
        unavailableCopySourceAllButtonInstance: {},
        unavailableCopyTargetAllButtonInstance: {},
        keyIssueFormInstance: {},
        keyIssueFormOptions: {
            formData: ko.observable(),
            colCount: 1,
            items: [
                {
                    itemType: 'group',
                    name: 'keyIssueMainGroup',
                    colCount: 6,
                    items: [
                        {
                            label: {
                                text: '전자키발권여부',
                            },
                            dataField: 'keyIssuable',
                            editorType: 'dxSelectBox',
                            editorOptions: {
                                dataSource: new DevExpress.data.ArrayStore({
                                    key: 'Code',
                                    data: keyIssuableData,
                                }),
                                valueExpr: 'Code',
                                displayExpr: 'Name',
                                onValueChanged: function (e) {
                                    viewOptions.keyIssueFormInstance.itemOption('keyIssueDetailGroup', 'visible', e.value);
                                }
                            }
                        },
                        {
                            itemType: 'empty',
                            colSpan: 4,
                        },
                        {
                            itemType: 'button',
                            buttonOptions: {
                                text: "저장",
                                type: "success",
                                onClick: function () {
                                    console.log(viewOptions.keyIssueFormInstance.option('formData'));
                                }
                            }
                        },
                    ]
                },
                {
                    itemType: 'group',
                    name: 'keyIssueDetailGroup',
                    colCount: 6,
                    items: [
                        {
                            label: {
                                text: '발권위치',
                            },
                            dataField: 'keyIssueLocation',
                            editorType: 'dxSelectBox',
                            editorOptions: {
                                dataSource: new DevExpress.data.ArrayStore({
                                    key: 'Code',
                                    data: keyIssueLocation
                                }),
                                valueExpr: 'Code',
                                displayExpr: 'Name',
                            }
                        },
                        {
                            itemType: 'empty',
                            colSpan: 5,
                        },
                        {
                            label: {
                                text: '전자키이용타임설정',
                            },
                            dataField: 'keyUsedTime',
                            editorType: 'dxSelectBox',
                            editorOptions: {
                                dataSource: new DevExpress.data.ArrayStore({
                                    key: 'Code',
                                    data: keyUsedTime(6),
                                }),
                                valueExpr: 'Code',
                                displayExpr: 'Name',
                            }
                        },
                        {
                            itemType: 'empty',
                            colSpan: 5,
                        },
                    ]
                }
            ],
            onInitialized(e) {
                viewOptions.keyIssueFormInstance = e.component;
            }
        },
    };

    const roundOfUseStore = new DevExpress.data.ArrayStore({
        key: 'RoundOfUseId',
        data: [],
    });

    viewOptions.roundOfUseGridOptions.dataSource(roundOfUseStore);

    const programStore = new DevExpress.data.ArrayStore({
        key: 'ProgramId',
        data: programData,
    });

    viewOptions.programGridOptions.dataSource(programStore);

    viewOptions.selectedProgram.subscribe((newValue) => {

        viewOptions.priceGridOptions.dataSource(
            new DevExpress.data.ArrayStore({
                key: 'ProductId',
                data: priceItems,
            })
        );

        viewOptions.discountGridOptions.dataSource(
            new DevExpress.data.ArrayStore({
                key: 'DiscountId',
                data: discountItems,
            })
        );

        viewOptions.roundOfUseGridOptions.dataSource(
            new DevExpress.data.ArrayStore({
                key: 'RoundOfUseId',
                data: roundOfUseItems(),
            })
        );

        //전자키발권설정정보
        viewOptions.keyIssueFormOptions.items[1].visible = keyIssueFormData.keyIssuable;
        viewOptions.keyIssueFormOptions.formData(keyIssueFormData);

    });

    ko.applyBindings(viewOptions);

    function initUnavailableCopyPopup() {
        viewOptions.unavailableCopyProgramSelectBoxInstance.resetOption('value');
        viewOptions.unavailableCopySourceCount(0);
        viewOptions.unavailableCopySourceListOptions.dataSource(null);
        viewOptions.unavailableCopyTargetCount(0);
        viewOptions.unavailableCopyTargetListOptions.dataSource(null);
    }

    function initUnavailableCreateForm() {
        viewOptions.unavailableCreateFormInstance.resetOption('formData');
        viewOptions.unavailableCreateFormOptions.recurrenceRule(new RecurrenceRule());
    }

    function isDisableDate(date, view) {

        if (view === 'month') {
            const disabledDataItems = viewOptions.unavailableCalendarData();
            if (disabledDataItems) {
                const localeDate = date.toLocaleDateString();

                return disabledDataItems.filter((item) => item.Date.toLocaleDateString() === localeDate).length > 0;
            }
        }
    }

    function getDisabledItem(date) {
        const disabledDataItems = viewOptions.unavailableCalendarData();
        if (disabledDataItems) {
            const localeDate = date.toLocaleDateString();

            const disableItem = disabledDataItems.find((item) => item.Date.toLocaleDateString() === localeDate);
            if (disableItem) {
                return disableItem;
            }
        }
    }

    function removeDisabledItem(item) {
        viewOptions.unavailableCalendarData.remove(item);
        viewOptions.unavailableCalendarInstance.repaint();
    }

    function categoryEditCellTemplate(container, options) {

        const syncTreeViewSelection = function (treeViewInstance, value) {
            if (!value) {
                treeViewInstance.unselectAll();
            } else {
                treeViewInstance.selectItem(value);
            }
        };
        let $dropdownBox = $('<div id="treeBox">').dxDropDownBox({
            value: options.value,
            valueExpr: 'ID',
            displayExpr: 'name',
            placeholder: '선택…',
            showClearButton: false,
            dataSource: priceTreeData,
            displayValue: null,
            contentTemplate(e) {
                const value = e.component.option('value');
                const $treeView = $('<div>').dxTreeView({
                    dataSource: e.component.getDataSource(),
                    dataStructure: 'plain',
                    keyExpr: 'ID',
                    parentIdExpr: 'categoryId',
                    selectionMode: 'single',
                    displayExpr: 'name',
                    selectByClick: true,
                    onContentReady(args) {
                        syncTreeViewSelection(args.component, value);
                    },
                    selectNodesRecursive: false,
                    onItemSelectionChanged(args) {
                        const selectedKeys = args.component.getSelectedNodeKeys();
                        e.component.option('value', selectedKeys);
                    },
                });

                treeView = $treeView.dxTreeView('instance');

                e.component.on('valueChanged', (args) => {
                    syncTreeViewSelection(treeView, args.value);
                    options.setValue(args.value);

                    e.component.close();
                });

                return $treeView;
            },
        });
        container.append($dropdownBox);
    }
</script>
</body>
</html>
