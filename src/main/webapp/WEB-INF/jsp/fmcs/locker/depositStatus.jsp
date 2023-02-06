<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>사물함보증금현황</title>
    <link rel="stylesheet" href="/fmcs/css/locker/depositStatus.css" type="text/css"/>
</head>
<body class="dx-viewport">
    <div class="row row_title">
        <div class="col-12">
            <ul class="navbar-nav">
                <li class="nav-item d-sm-inline-block quick-nav">
                    사물함보증금현황
                </li>
            </ul>
        </div>
    </div>
    <div class="hs-main-container">
        <div data-bind="dxForm : depositSearchFormOptions" style="margin:10px;">

        </div>
        <div data-bind="dxDataGrid: depositGridOptions" style="margin:10px;" class="hs-deposit-grid-container"></div>
    </div>
<script type="text/javascript" src="/backOffice/DevExtreme/22.1.5/js/devextreme/exceljs.min.js"></script>
<script type="text/javascript" src="/backOffice/DevExtreme/22.1.5/js/devextreme/FileSaver.min.js"></script>
    <script type="text/javascript" src="/fmcs/js/locker/depositStatus.js"></script>
    <script type="text/javascript">
        const viewOptions = {
            depositSearchFormOptions  : {
                formData : ko.observable(),
                colCount: 6,
                labelMode: 'floating',
                items : [
                    {
                        editorType :'dxTextBox',
                        dataField: 'MemberId',
                        label : {
                            text : '회원번호',
                        },
                    },
                    {
                        editorType :'dxTextBox',
                        dataField :'MemberName',
                        label  :{
                            text :'회원명',
                        }
                    },
                    {
                        colSpan:2,
                        itemType :'group',
                        label : {
                          text :'수납일자'
                        },
                        colCount: 2,
                        items :[
                            {
                                editorType :'dxDateBox',
                                dataField :'ReceivedFromDate',
                                editorOptions : {
                                  displayFormat : 'yyyy-MM-dd',
                                },
                                label : {
                                    visible :false,
                                    text : '수납기간-시작일자'
                                }
                            },
                            {
                                editorType: 'dxDateBox',
                                dataField: 'ReceivedToDate',
                                label : {
                                    visible :false,
                                    text : '수납기간-종료일자'
                                },
                                editorOptions : {
                                    displayFormat : 'yyyy-MM-dd',
                                },
                            },
                        ]
                    },
                    {
                        colSpan: 2,
                        itemType :'button',
                        horizontalAlignment: 'right',
                        buttonOptions: {
                            text: '검색',
                            type: 'default',
                            width : 80,
                            useSubmitBehavior: false,
                        },
                    }
                ]
            },
            depositGridInstance : {},
            depositGridOptions : {
                height : 'calc(100vh - 105px)',
                dataSource : ko.observable(),
                selection : {
                    mode :'multiple',
                },
                allowColumnReordering: true,
                allowColumnResizing: true,
                rowAlternationEnabled : true,
                focusedRowEnabled: true,
                showBorders: true,
                showRowLines: true,
                groupPanel: {
                    visible:true,
                    allowColumnDragging: false,
                },
                columnChooser :{
                    enabled:true,
                    mode :  'select',
                },
                columns :[
                    {
                        dataField :'TransDate',
                        dataType :'date',
                        alignment :'center',
                        caption :'수납일자',
                        showWhenGrouped: true,
                        calculateGroupValue:function(rowData){
                            const date = rowData.TransDate.parseDate('yyyy-MM-dd HH:mm:ss');
                            return date.formatDateString('yyyy-MM');
                        },
                        calculateDisplayValue: function(rowData){
                            return rowData.TransDate;
                        }
                    },
                    {
                        dataField: 'MemberId',
                        dataType: 'string',
                        caption : '회원번호',
                        showWhenGrouped: true,
                        calculateGroupValue : function(rowData){
                            return `\${rowData.MemberName} (\${rowData.MemberId})`;
                        }
                    },
                    {
                        caption :'회원명',
                        dataType: 'string',
                        dataField: 'MemberName',
                    },
                    {
                        caption: '핸드폰번호',
                        dataField: 'MobileNumber',
                    },
                    {
                        caption: 'SMS수신',
                        dataField: 'SMSReceived',
                        dataType: 'boolean',
                        alignment: 'left',
                        allowGrouping:false,
                        showEditorAlways:false,
                        calculateDisplayValue: (rowData) =>{
                            const {Name}  = SMSReceivedData.find(({Value})=> Value === rowData.SMSReceived) || {};
                            return Name;
                        },
                    },
                    {
                        caption :'수납자',
                        dataField :'RecipientId',
                        calculateDisplayValue : 'RecipientName',
                        showWhenGrouped: true,
                    },
                    {
                        caption  :'보증금',
                        columns :[
                            {
                                caption :'입금',
                                dataField :'IncomeAmount',
                                dataType :'number',
                                format : 'currency',
                                allowGrouping:false,
                            },
                            {
                                caption : '환불',
                                dataField: 'RefundAmount',
                                dataType :'number',
                                format : 'currency',
                                allowGrouping:false,
                            }
                        ]
                    }
                ],
                paging: {enabled: false},
                scrolling: {mode: 'virtual'},
                toolbar : {
                    items : [
                        {
                            location :'before',
                            name :'groupPanel',
                            visible:false,
                        },
                        {
                            location : 'after',
                            widget : 'dxSelectBox',
                            options: {
                                dataSource: new DevExpress.data.ArrayStore({
                                    data: groupingItems,
                                    key: 'ID',
                                }),
                                displayExpr: 'Name',
                                valueExpr: 'ID',
                                value: '0000',
                                width : 200,
                                onValueChanged(e){

                                    if(e.previousValue !== '0000'){
                                        const columns = viewOptions.depositGridInstance.option('columns');
                                        let index=columns.findIndex(({dataField}) => dataField === e.previousValue);
                                        viewOptions.depositGridInstance.option(`columns[\${index}].groupIndex`,null);
                                    }
                                    if(e.value !== '0000') {
                                        viewOptions.depositGridInstance.option('toolbar.items[0].visible', true);
                                        const columns = viewOptions.depositGridInstance.option('columns');
                                        let index=columns.findIndex(({dataField}) => dataField === e.value);
                                        viewOptions.depositGridInstance.option(`columns[\${index}].groupIndex`,0);

                                    } else {
                                        viewOptions.depositGridInstance.option('toolbar.items[0].visible', false);
                                    }
                                }
                            }
                        },
                        {
                            location : 'after',
                            widget: 'dxButton',
                            options : {
                                icon : 'refresh',
                                onClick(e) {
                                    viewOptions.depositGridInstance.refresh();
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
                loadPanel: {enabled: true},
                export: {enabled: true},
                summary: {
                    groupItems: [{
                        column: 'TransDate',
                        summaryType: 'count',
                        displayFormat: '건수: {0}',
                        showInColumn: 'dxCheckBox',
                        showInGroupFooter: true,
                    },
                        {
                            column : 'IncomeAmount',
                            summaryType: 'sum',
                            displayFormat: '입금합계 : {0}',
                            valueFormat : 'currency',
                            showInGroupFooter: true,
                        },
                        {
                            column : 'RefundAmount',
                            summaryType: 'sum',
                            displayFormat: '환불합계 : {0}',
                            valueFormat : 'currency',
                            showInGroupFooter: true,
                        },
                        {
                            name: 'SubTotalAmount',
                            summaryType: 'custom',
                            displayFormat: '전체합계: {0}',
                            valueFormat : 'currency',
                            showInColumn: 'RecipientId',
                            showInGroupFooter: true,
                            cssClass : 'tar',
                        },],
                    totalItems: [
                        {
                            column: 'TransDate',
                            summaryType: 'count',
                            displayFormat: '건수: {0}',
                            showInColumn: 'dxCheckBox',
                        },
                        {
                            column : 'IncomeAmount',
                            summaryType: 'sum',
                            displayFormat: '입금합계 : {0}',
                            valueFormat : 'currency',
                        },
                        {
                            column : 'RefundAmount',
                            summaryType: 'sum',
                            displayFormat: '환불합계 : {0}',
                            valueFormat : 'currency',
                        },
                        {
                            name: 'TotalAmount',
                            summaryType: 'custom',
                            displayFormat: '전체합계: {0}',
                            valueFormat : 'currency',
                            showInColumn: 'RecipientId',
                            cssClass : 'tar',
                        },
                    ],
                    calculateCustomSummary(options) {

                        if (options.name === 'TotalAmount') {
                            if (options.summaryProcess === 'start') {
                                options.totalValue = 0;
                            }
                            if (options.summaryProcess === 'calculate') {
                                if(options.value) {
                                    options.totalValue += options.value.RefundAmount + options.value.IncomeAmount;
                                }
                            }
                        }

                        if (options.name === 'SubTotalAmount') {
                            if (options.summaryProcess === 'start') {
                                options.totalValue = 0;
                            }
                            if (options.summaryProcess === 'calculate') {
                                if(options.value) {
                                    options.totalValue += options.value.RefundAmount + options.value.IncomeAmount;
                                }
                            }
                        }
                    },
                },
                onInitialized(e){
                    viewOptions.depositGridInstance = e.component;
                },
                onExporting(e) {
                    const workbook = new ExcelJS.Workbook();
                    const worksheet = workbook.addWorksheet('Main sheet');
                    DevExpress.excelExporter.exportDataGrid({
                        worksheet: worksheet,
                        component: e.component,
                        customizeCell: function (options) {
                            const {gridCell, excelCell} = options;
                            excelCell.font = {name: 'Arial', size: 12};
                            excelCell.alignment = {horizontal: 'left'};

                            if (gridCell.rowType === 'data' && gridCell.column.dataField === 'SMSReceived') {
                                excelCell.value = gridCell.value ? '수신' : '수신안함';
                            }
                        }
                    }).then(function () {
                        workbook.xlsx.writeBuffer().then(function (buffer) {
                            saveAs(new Blob([buffer], {type: 'application/octet-stream'}), `사물함보증금현황-\${new Date().formatDateString('yyyyMMddHHmmss')}.xlsx`);
                        });
                    });
                    e.cancel = true;
                },
                onSelectionChanged(e) {
                    e.component.option('toolbar.items[5].options.disabled', !e.selectedRowsData.length);
                },
            }
        };

        const gridStore = new DevExpress.data.ArrayStore({
            key : 'TransId',
            data :depositGridData(100),
        });

        viewOptions.depositGridOptions.dataSource(gridStore);
        ko.applyBindings(viewOptions);
    </script>

</body>
</html>
