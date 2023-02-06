<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>입장권매표예약정보관리</title>
    <link rel="stylesheet" href="/fmcs/css/ticket/booking.css" type="text/css"/>
</head>
<body>
<div class="row row_title">
    <div class="col-12">
        <ul class="navbar-nav">
            <li class="nav-item d-sm-inline-block quick-nav">
                입장권매표예약정보관리
            </li>
        </ul>
    </div>
</div>
<div class="hs-main-container">
    <div data-bind="dxForm:bookingSearchFormOptions" class="m10"></div>
    <div data-bind="dxDataGrid:bookingGridOptions" class="m10 hs-booking-grid-container"></div>
</div>
<script type="text/html" id="booking-grid-row-template">
    <tr class="main-row">
        <td class="tac">
            <div data-bind="visible: showBookingCalendar(data)">
                <div>
                    <span class="fa-layers fa-fw fa-3x">
                        <i class="fa-regular fa-calendar fa-swap-opacity" data-bind="css: { complete : data.BookingStatusCode === '0001', cancel : data.BookingStatusCode === '0002'}"></i>
                        <i class="fa-inverse fa-solid " data-fa-transform="shrink-7 down-5 right-5" data-bind="css: { 'fa-circle-check' : data.BookingStatusCode === '0001', 'fa-circle-xmark' : data.BookingStatusCode === '0002'}"></i>
                    </span>
                </div>
                <div><span data-bind="text:data.BookingStatusName, css: { complete : data.BookingStatusCode === '0001', cancel : data.BookingStatusCode === '0002'}" class="booking-status"></span></div>
            </div>
            <div data-bind="visible : showTodayCalendar(data)">
                <div>
                    <span class="fa-fw fa-3x">
                        <i class="fa-solid fa-calendar-day"></i>
                    </span>
                </div>
                <div><span class="booking-status today">당일</span></div>
            </div>

        </td>
        <td>
            <div class="pl05"><a data-bind="attr: { href: '/fmcs/ticket/booking/'+data.BookingId }"><span data-bind="text:data.BookingNumber" class="fw600 booking-number"></span></a></div>
            <div class="mt05 pl05" data-bind="ifnot:data.CancelDate"><span data-bind="text:data.BookingDate" class="fw600 text-dark-gray"></span></div>
            <div class="mt05 pl05" data-bind="if:data.CancelDate"><span data-bind="text:data.BookingDate" class="fw600 text-dark-gray"></span> / <span data-bind="text:data.CancelDate" class="booking-status cancel"></span></div>
        </td>
        <td>
            <div data-bind="if : data.BookingPersonInfo.ID">
                <span class="person-name-text fw600" data-bind="text:data.BookingPersonInfo.Name"></span> / <span data-bind="text:data.BookingPersonInfo.ID" class="person-name-text fw600"></span>
            </div>
            <div data-bind="ifnot : data.BookingPersonInfo.ID">
                <span data-bind="text:data.BookingPersonInfo.Name" class="person-name-text fw600"></span>
            </div>
            <div class="mt05"><span data-bind="text:data.BookingPersonInfo.MobileNumber" class="fw600 text-dark-gray"></span></div>
        </td>
        <td class="hs-symbol-color">
            <div>
                <span class="fa-layers fa-fw fa-3x" data-bind="attr : {id : 'group-symbol-'+rowIndex}">
                    <i class="fa-regular fa-circle"></i>
                    <i class="fa-solid" data-fa-transform="shrink-7" data-bind="css : { 'fa-user' : data.BookingTypeCode === '0001', 'fa-users' : data.BookingTypeCode === '0002' }"></i>
                </span>
                <span class="fa-layers fa-fw fa-3x" data-bind="visible:data.Discounted">
                    <i class="fa-regular fa-circle"></i>
                    <i class="fa-solid fa-tag" data-fa-transform="shrink-3 down-1 right-1"></i>
                    <i class="fa-inverse fa-solid fa-percent" data-fa-transform="shrink-12 down-1 right-2"></i>
                </span>
            </div>
            <div data-bind="foreach: data.DiscountTypeInfo, visible : data.DiscountTypeInfo">
                <span class="fa-layers fa-fw fa-3x">
                    <i class="fa-regular fa-circle"></i>
                    <i class="fa-solid" data-fa-transform="shrink-7" data-bind="css : { 'fa-wheelchair' : Code === '0001' }"></i>
                </span>
            </div>
            <div data-bind="visible:data.TotalAmount === 0">
                <span class="fa-layers fa-fw fa-3x">
                    <i class="fa-regular fa-circle"></i>
                    <span class="fa-layers-text fw900" data-fa-transform="shrink-11">FREE</span>
                </span>
            </div>
            <div class="group-popover" data-bind="dxPopover : {
                    target : '#group-symbol-'+rowIndex,
                    showEvent: 'mouseenter',
                    hideEvent: 'mouseleave',
                    width: 80,
                }">
                <div class="tac"><span data-bind="text:data.BookingTypeName"></span></div>
            </div>
        </td>
        <td class="tac"><span data-bind="text:data.DateOfUse" class="general-text fw600"></span></td>
        <td class="tac"><span data-bind="text:data.BookingMethodName" class="general-text fw600"></span></td>
        <td class="tac"><span data-bind="text:data.PaymentStatusName" class="general-text fw600"></span></td>
        <td class="tar pr05">
            <span data-bind="text:formatCurrency(data.TotalAmount), visible:data.TotalAmount > 0" class="price-text"></span>
            <span data-bind="visible:data.TotalAmount === 0" class="price-text">무료</span>
        </td>
    </tr>
</script>
<script type="text/javascript" src="/webjars/fortawesome__fontawesome-free/6.2.1/js/all.min.js"></script>
<script type="text/javascript" src="/fmcs/js/ticket/booking.js"></script>
<script type="text/javascript">

    const viewOptions = {
        bookingSearchFormInstance: {},
        bookingSearchFormOptions: {
            labelMode : 'floating',
            formData : ko.observable(),
            colCount: 1,
            items: [
                {
                    itemType: 'group',
                    name : 'firstLineGroup',
                    colCount : 6,
                    items :[
                        {
                            dataField :'BookingNumber',
                            label : {
                                text :'예약번호',
                            },
                            editorType :'dxTextBox',
                            editorOptions : {

                            }
                        },
                        {
                            dataField :'BookingPersonName',
                            label : {
                                text :'예약자명',
                            },
                            editorType : 'dxTextBox',
                            editorOptions: {

                            }
                        },
                        {
                            dataField :'BookingStatus',
                            label : {
                                text :'예약상태'
                            },
                            editorType: 'dxSelectBox',
                            editorOptions: {
                                dataSource : new DevExpress.data.ArrayStore({
                                    key :'Code',
                                    data :bookingStatusItems
                                }),
                                displayExpr :'Text',
                                valueExpr :'Code',
                            },
                        },
                        {
                            dataField :'BookingType',
                            label : {
                                text :'개인단체구분',
                            },
                            editorType: 'dxSelectBox',
                            editorOptions: {
                                dataSource : new DevExpress.data.ArrayStore({
                                    key : 'Code',
                                    data :bookingTypeItems,
                                }),
                                displayExpr:'Text',
                                valueExpr : 'Code',
                            }
                        },
                        {
                            itemType :'empty',
                            colSpan : 2,
                        },

                    ]
                },
                {
                    itemType: 'group',
                    name :'secondLineGroup',
                    colCount : 12,
                    items :[
                        {
                            label :{
                                visible :false,
                            },
                            dataField: 'IsRegularMember',
                            editorType: 'dxCheckBox',
                            editorOptions: {
                                enableThreeStateBehavior : false,
                                text :'정기회원',
                                height : 34,
                            }
                        },
                        {
                            label :{
                                visible :false,
                            },
                            dataField: 'IsNoneMember',
                            editorType: 'dxCheckBox',
                            editorOptions: {
                                text :'비회원',
                                height : 34,
                            }
                        },
                        {
                            dataField: 'BookingRangeType',
                            editorType: 'dxSelectBox',
                            editorOptions: {
                                dataSource : new DevExpress.data.ArrayStore({
                                    key :'Code',
                                    data : bookingRangeTypeItems,
                                }),
                                valueExpr: 'Code',
                                displayExpr: 'Text',
                                onValueChanged(e){

                                    if(e.value){

                                        const selectedItem = e.component.option('selectedItem');
                                        if(selectedItem.Unit) {

                                            e.model.bookingSearchFormInstance.getEditor('BookingStartDate').option('disabled', true);
                                            e.model.bookingSearchFormInstance.getEditor('BookingEndDate').option('disabled', true);

                                            let endDate = moment().add(selectedItem.Gap, selectedItem.Unit).format("YYYY-MM-DD");
                                            e.model.bookingSearchFormInstance.getEditor('BookingStartDate').option('value', moment().format('YYYY-MM-DD'));
                                            e.model.bookingSearchFormInstance.getEditor('BookingEndDate').option('value', endDate);
                                        } else {
                                            e.model.bookingSearchFormInstance.getEditor('BookingStartDate').option('disabled', false);
                                            e.model.bookingSearchFormInstance.getEditor('BookingEndDate').option('disabled', false);
                                        }
                                    }
                                },
                            },
                            colSpan:2,
                            label  :{
                                text :'예약기간',
                            },
                        },
                        {
                            colSpan:4,
                            colCount:4,
                            itemType :'group',
                            name : 'dateRangeGroup',
                            items:[
                                {
                                    dataField :'BookingStartDate',
                                    colSpan:2,
                                    editorType: 'dxDateBox',
                                    label : {
                                        text :'시작일',
                                    },
                                    editorOptions: {
                                        disabled: true,
                                        displayFormat : 'yyyy-MM-dd',
                                    }
                                },
                                {
                                    dataField: 'BookingEndDate',
                                    colSpan:2,
                                    editorType: 'dxDateBox',
                                    label : {
                                        text :'종료일'
                                    },
                                    cssClass :'hs-booking-date',
                                    editorOptions: {
                                        disabled: true,
                                        displayFormat : 'yyyy-MM-dd',
                                    }
                                },
                            ]
                        },
                        {
                            colSpan : 4,
                            itemType: 'button',
                            horizontalAlignment: 'right',
                            buttonOptions: {
                                text: '검색',
                                width : 80,
                                type: 'default',
                                stylingMode: 'contained',
                                onClick(e){
                                    alert('검색')
                                }
                            },
                        },
                    ]
                }
            ],
            onInitialized(e){
                viewOptions.bookingSearchFormInstance = e.component;
            }
        },
        bookingGridInstance :{},
        bookingGridOptions : {
            height : 'calc(100vh - 140px)',
            dataSource : ko.observable(null),
            showBorders: true,
            showRowLines: true,
            hoverStateEnabled: true,
            rowAlternationEnabled: true,
            dataRowTemplate : $('#booking-grid-row-template'),
            loadPanel: {enabled: true},
            toolbar : {
                items :[
                    {
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            icon: 'refresh',
                            onClick() {
                                viewOptions.bookingGridInstance.refresh();
                            }
                        },

                    },
                ]
            },
            paging: {
                pageSize: 25,
            },
            pager: {
                visible: true,
                allowedPageSizes: [25, 50, 100, 'all'],
                showPageSizeSelector: true,
                showInfo: true,
                showNavigationButtons: true,
                displayMode: 'compact',
            },
            scrolling : {
                mode : 'virtual'
            },
            columns : [
                {
                    caption :'예약상태',
                    dataField :'BookingStatusCode',
                    calculateDisplayValue : 'BookingStatusName',
                    width : '5%',
                },
                {
                    caption : '예약번호',
                    dataField: 'BookingNumber',
                    width : '15%',
                },
                {
                    caption : '예약자명',
                    dataField: 'BookingPersonInfo.Name',
                    width : '10%',
                },
                {
                    caption : '예약구분',
                    dataField : 'BookingType',
                    width : '25%',
                },
                {
                    caption :'이용일자',
                    dataField: 'DateOfUse',
                    format :'yyyy-MM-dd',
                    width : '10%',
                },
                {
                    caption :'예약방법',
                    dataField: 'BookingMethod',
                    width : '10%',
                },
                {
                    caption :'결제상태',
                    dataField :'PaymentStatusCode',
                    calculateDisplayValue: 'PaymentStatusName',
                    width : '10%',
                },
                {
                    caption :'금액',
                    dataField: 'TotalAmount',
                    format : 'currency',
                }
            ],
            onInitialized(e) {
                viewOptions.bookingGridInstance = e.component;
            },
            onRowClick(e){
                location.href=`/fmcs/ticket/booking/\${e.data.BookingId}`;
            }
        },
    };

    viewOptions.bookingSearchFormOptions.formData(initSearchFormData);

    const bookingGridStore = new DevExpress.data.ArrayStore({
        key :'BookingId',
        data : bookingData,
    })
    viewOptions.bookingGridOptions.dataSource(bookingData);

    ko.applyBindings(viewOptions);

</script>
</body>
</html>
