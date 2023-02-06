<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>사물함 임대현황</title>
    <link rel="stylesheet" href="/fmcs/css/locker/rentStatus.css" type="text/css"/>
</head>
<body class="dx-viewport">
<div class="row row_title">
    <div class="col-12">
        <ul class="navbar-nav">
            <li class="nav-item d-sm-inline-block quick-nav">
                사물함임대현황
            </li>

        </ul>
    </div>
</div>
<div id="main-container" class="hs-main-container">
    <div class="hs-search-container">
        <div data-bind="dxForm: rentStatusSearchFormOptions"></div>
    </div>
    <div data-bind="dxDataGrid: rentStatusGridOptions" class="hs-status-grid-container"></div>
</div>

<div data-bind="dxPopup : {
    title :'사물함 강제회수',
    width : 650,
    height: 580,
    visible:false,
    onInitialized(e) {
        lockerBulkForcedPopupInstance = e.component;
    },
    toolbarItems: [
        {
            widget: 'dxButton',
            toolbar: 'bottom',
            location: 'after',
            options: {
                text: '강제회수'
            }
        },
        {
            widget: 'dxButton',
            toolbar: 'bottom',
            location: 'after',
            options: {
                text: '취소',
                onClick(e) {
                   lockerBulkForcedPopupInstance.hide();
                }
            },

        },
    ],
}">
    <div data-options="dxTemplate : {name : 'content'}">
        <div data-bind="dxForm: lockerBulkForcedFormOptions"></div>
    </div>
</div>
<script type="text/html" id="search-button-template">
<div>
    <div data-bind="dxButton :{
        text:'검색',
        width : 80,
        stylingMode:'contained',
        type:'default',
        onClick(e) {
            let formData = e.model.component.option('formData');
            clearDynamicSearchFormDataByCondition(formData);
        }
    }" class="m05"></div>
    <div data-bind="dxButton :{
        text:'초기화',
        width : 80,
        stylingMode:'contained',
        type:'default',
        onClick(e) {
            e.model.component.resetValues();
        }
    }"></div>
</div>
</script>
<script type="text/html" id="days-until-the-end-template">
    <div><span class="dx-field-item-label-text">일 이내</span></div>
</script>
<script src="/fmcs/js/locker/rentStatus.js"></script>
<script type="text/javascript" src="/backOffice/DevExtreme/22.1.5/js/devextreme/exceljs.min.js"></script>
<script type="text/javascript" src="/backOffice/DevExtreme/22.1.5/js/devextreme/FileSaver.min.js"></script>
<script type="text/javascript">
    const viewOptions = {
        rentStatusSearchFormInstance: {},
        rentStatusSearchFormOptions: {
            formData: ko.observable(null),
            colCount : 3,
            labelMode: 'floating',
            items:[
                {
                    colSpan : 3,
                    label  :{
                        text:'사물함위치',
                    },
                    dataField :'LocationCode',
                    editorType:'dxTagBox',
                    editorOptions : {
                        showSelectionControls: true,
                        applyValueMode: 'useButtons',
                        placeholder: '선택하세요.',
                        dataSource: new DevExpress.data.ArrayStore({
                            data: locations,
                            key: 'Code',
                        }),
                        displayExpr: 'Name',
                        valueExpr: 'Code',
                    }
                },
                {
                    colSpan: 1,
                    editorType: 'dxTagBox',
                    label :{
                        text:'상태',
                    },
                    dataField : 'RentStatusCode',
                    editorOptions: {
                        showSelectionControls: true,
                        applyValueMode: 'useButtons',
                        placeholder: '선택하세요.',
                        dataSource: new DevExpress.data.ArrayStore({
                            data: status,
                            key: 'Code',
                        }),
                        displayExpr: 'Name',
                        valueExpr: 'Code',
                    }
                },
                {
                    colSpan:2,
                    itemType:'group',
                    name :'dynamic-search-group',
                    colCount : 4,
                    items :[
                        {
                            colspan:1,
                            dataField :'dynamicSearchType',
                            editorType:'dxSelectBox',
                            label : {
                                visible:false,
                                text : '검색조건',
                            },
                            editorOptions : {
                                placeholder:'검색조건선택',
                                height : 42,
                                dataSource : new DevExpress.data.ArrayStore({
                                    key: 'Code',
                                    data :dynamicSearchConditions
                                }),
                                valueExpr : 'Code',
                                displayExpr : 'Name',
                                onValueChanged : function(e) {
                                    const dynamicSearchItem = e.model.rentStatusSearchFormInstance.itemOption('dynamic-search-group').items[1];

                                    if(e.value === 'RentDateRange') {
                                        dynamicSearchItem.itemType = 'group';
                                        dynamicSearchItem.colCount = 2;
                                        dynamicSearchItem.items = [
                                            {
                                                dataField :'RentStartDate',
                                                editorType:'dxDateBox',
                                                editorOptions : {
                                                    displayFormat :'yyyy-MM-dd',
                                                    height : 42,
                                                },
                                                label : {
                                                    text : '시작일'
                                                },
                                            },
                                            {
                                                dataField : 'RentEndDate',
                                                editorType :'dxDateBox',
                                                editorOptions : {
                                                    displayFormat : 'yyyy-MM-dd',
                                                    height : 42,
                                                },
                                                label : {
                                                    text :'종료일'
                                                }
                                            }
                                        ];
                                    }
                                    else if(e.value === 'MemberName') {
                                        dynamicSearchItem.itemType = 'simple';
                                        dynamicSearchItem.editorType = 'dxTextBox';
                                        dynamicSearchItem.dataField = 'MemberName';
                                        dynamicSearchItem.label  = {
                                            visible:false,
                                            text : '회원명',
                                        }
                                        dynamicSearchItem.editorOptions = {
                                            placeholder : '회원명을 두글자 이상 입력하세요.',
                                            width : '60%',
                                            height : 42,
                                        };
                                    }
                                    else if(e.value === 'LockerNumber') {
                                        dynamicSearchItem.itemType = 'group';
                                        dynamicSearchItem.colCount = 2;
                                        dynamicSearchItem.items = [
                                            {
                                                dataField :'StartLockerNumber',
                                                editorType:'dxTextBox',
                                                editorOptions : {
                                                    height : 42,
                                                },
                                                label : {
                                                    text : '시작번호'
                                                },
                                            },
                                            {
                                                dataField : 'EndLockerNumber',
                                                editorType :'dxTextBox',
                                                editorOptions : {
                                                    height : 42,
                                                },
                                                label : {
                                                    text :'종료번호'
                                                }
                                            }
                                        ];
                                    }
                                    else if(e.value === 'DaysUntilTheEnd') {
                                        dynamicSearchItem.itemType = 'group';
                                        dynamicSearchItem.colCount = 2;
                                        dynamicSearchItem.items = [
                                            {
                                                dataField :'DayUtilTheEnd',
                                                editorType:'dxNumberBox',
                                                editorOptions : {
                                                    showSpinButtons: true,
                                                    showClearButton: true,
                                                    height : 42,
                                                },
                                                label : {
                                                    visible : false,
                                                    text :"이용종료일수",
                                                    showColon: false,
                                                },
                                            },
                                            {
                                                template: $('#days-until-the-end-template'),
                                                cssClass :'hs-day-until-the-end',
                                            }
                                        ];
                                    }
                                    else {
                                        dynamicSearchItem.itemType = 'empty';
                                    }

                                    e.model.rentStatusSearchFormInstance.repaint();
                                }
                            }
                        },
                        {
                            colSpan:2,
                            itemType : 'empty',
                        },
                        {
                            colSpan: 3,
                            itemType: 'simple',
                            cssClass :'hs-search-buttom-container',
                            template : $('#search-button-template')
                        }
                    ]
                },


            ],
            onInitialized(e) {
                viewOptions.rentStatusSearchFormInstance = e.component;
            }
        },
        rentStatusGridInstance: {},
        rentStatusGridOptions: {
            rowAlternationEnabled : true,
            focusedRowEnabled: true,
            showRowLines: true,
            height: '100%',
            dataSource: ko.observable(null),
            selection: {
                mode: 'multiple',
            },
            export: {
                enabled: true
            },
            showBorders: true,
            scrolling: {
                columnRenderingMode: 'virtual',
            },
            columnChooser :{
                enabled:true,
                mode :  'select',
            },
            columns: [
                {
                    dataField: 'LocationName',
                    alignment: 'left',
                    caption: '사물함위치',
                },
                {
                    dataField: 'ID',
                    alignment: 'center',
                    caption: '사물함번호'
                },
                {
                    dataField: 'MemberNo',
                    alignment: 'center',
                    caption: '회원번호'
                },
                {
                    dataField: 'MemberName',
                    alignment: 'left',
                    caption: '회원명'
                },
                {
                    dataField: 'MobileNumber',
                    alignment: 'left',
                    caption: '핸드폰번호',
                },
                {
                    dataField: 'LockerStatus',
                    alignment: 'left',
                    caption: '사물함상태'

                },
                {
                    dataField: 'CreationDate',
                    alignment: 'center',
                    caption: '접수일자',
                    format: 'yyyy-MM-dd',
                    dataType: 'date',
                },
                {
                    dataField: 'RentalMonths',
                    alignment: 'center',
                    caption: '임대개월수',
                    dataType: 'number',
                },
                {
                    dataField: 'RentStartDate',
                    alignment: 'center',
                    caption: '임대시작일',
                    dataType: 'date',
                    format: 'yyyy-MM-dd'
                },
                {
                    dataField: 'RentEndDate',
                    alignment: 'center',
                    caption: '임대종료일',
                    dataType: 'date',
                    format: 'yyyy-MM-dd'
                },
                {
                    dataField: 'RentalFee',
                    dataType: 'number',
                    format: 'currency',
                    caption :'임대료',
                },
                {
                    caption: '결제금액',
                    columns: [
                        {
                            caption: '현금',
                            dataField: 'PaidAmountForCash',
                            dataType: 'number',
                            format: 'currency'
                        },
                        {
                            caption: '카드',
                            dataField: 'PaidAmountForCredit',
                            dataType: 'number',
                            format: 'currency'
                        },
                    ]
                },
                {
                    caption: '반납여부',
                    dataType: 'boolean',
                    dataField: 'IsReturned'
                },
                {
                    caption: '반납일자',
                    dataType: 'date',
                    dataField: 'ReturnedDate',
                },
                {
                    caption: '연체일수',
                    dataType: 'number',
                    dataField: 'overdueDays',

                },
            ],
            searchPanel: {
                visible: true,
                width: 240,
                placeholder: 'Search...',
            },
            paging: {
                pageSize: 10,
            },
            pager: {
                visible: true,
                allowedPageSizes: [10, 20, 50, 100, 'all'],
                showPageSizeSelector: true,
                showInfo: true,
                showNavigationButtons: true,
                displayMode: 'compact',
            },
            columnsAuthWidth:true,
            toolbar: {
                items: [
                    {
                        location:'after',
                        name :'searchPanel',
                    },
                    {
                        widget: 'dxButton',
                        options : {
                            text: '강제회수',
                            disabled:true,
                            onClick(e) {

                                const selectedItems = viewOptions.rentStatusGridInstance.getSelectedRowsData();

                                if(selectedItems.length === 0) {
                                    DevExpress.ui.dialog.alert('강제발송할 대상을 선택하세요.', "강제회수");
                                    return false;
                                }

                                viewOptions.lockerBulkForcedPopupInstance.show();
                            }
                        }
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            icon: 'refresh',
                            onClick() {
                                viewOptions.rentStatusGridInstance.refresh();
                            }
                        },
                    },
                    'exportButton','columnChooserButton',
                    {
                        widget: 'dxButton',
                        options : {
                            disabled:true,
                            icon :'fa-regular fa-comment-dots',
                            onClick(e) {

                            }
                        }
                    },
                ]
            },
            onInitialized(e) {
                viewOptions.rentStatusGridInstance = e.component;
            },
            onExporting : rentStatusGridExportingToExcel,
            onSelectionChanged(e) {
                e.component.option('toolbar.items[1].options.disabled', !e.selectedRowsData.length);
                e.component.option('toolbar.items[5].options.disabled', !e.selectedRowsData.length);
            },
        },
        lockerBulkForcedPopupInstance: {},
        lockerBulkForcedFormInstance : {},
        lockerBulkForcedFormOptions : {
            formData: ko.observable(),
            colCount: 2,
            items: [
                {
                    editorType: 'dxDateBox',
                    dataField: 'ReturnDate',
                    editorOptions: {
                        displayFormat: 'yyyy-MM-dd'
                    },
                    label: {
                        text: '반납일자',
                    }
                },
                {
                    itemType: 'empty'
                },
                {
                    colSpan: 2,
                    dataField: 'ReturnNote',
                    editorType: 'dxTextArea',
                    editorOptions: {
                        height: 150,
                    },
                    label: {
                        text: '반납처리메모',
                    }
                }

            ],
            onInitialized(e) {
                viewOptions.lockerBulkForcedFormInstance = e.component;
            }
        }

    };

    ko.applyBindings(viewOptions);

    const rentStatusStore = new DevExpress.data.ArrayStore({
        key : 'ID',
        data : lockerStatusData(200),
    });

    viewOptions.rentStatusGridOptions.dataSource(rentStatusStore);
    viewOptions.lockerBulkForcedFormOptions.formData({
        ReturnDate : new Date(),
        ReturnNote: null,
    })
    function rentStatusGridExportingToExcel(e) {

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Main sheet');
        DevExpress.excelExporter.exportDataGrid({
            worksheet: worksheet,
            component: e.component,
            customizeCell: function (options) {
                const { excelCell } = options;
                excelCell.font = {name: 'Arial', size: 12};
                excelCell.alignment = {horizontal: 'left'};
            }
        }).then(function () {
            workbook.xlsx.writeBuffer().then(function (buffer) {
                saveAs(new Blob([buffer], {type: 'application/octet-stream'}), `사물함임대현황-\${new Date().formatDateString('yyyyMMddHHmmss')}.xlsx`);
            });
        });
        e.cancel = true;
    }

    function clearDynamicSearchFormDataByCondition(formData) {

        if(formData && formData.dynamicSearchType) {

            dynamicSearchConditions.forEach( ({Code, Children }) => {
                if(Code === formData.dynamicSearchType) {
                    return false;
                }
                Children.forEach(function(child){
                    delete formData[child];
                });
            });
        }
    }
</script>
</body>
</html>
