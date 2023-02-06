<%--
  Created by IntelliJ IDEA.
  User: mkang
  Date: 2023-01-04
  Time: 오전 9:18
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>사물함 신청대기자 관리</title>
    <link rel="stylesheet" href="/fmcs/css/locker/waitingList.css" type="text/css"/>
</head>
<body class="dx-viewport">
<div class="row row_title">
    <div class="col-12">
        <ul class="navbar-nav">
            <li class="nav-item d-sm-inline-block quick-nav">
                사물함신청대기자관리
            </li>
        </ul>
    </div>
</div>
<div id="hs-main-container" data-bind="dxBox: {
        direction : 'col',
        width : '100%',
        height:'calc(100vh - 40px)'
    }">
    <div data-options="dxItem:{ ratio : 1}" class="h100p">
        <h4>사물함위치별 대기인원정보</h4>
        <div data-bind="dxDataGrid : $parents[0].lockerStatusGridOptions" class="m10"></div>
    </div>
    <div data-options="dxItem :{ ratio : 2}" class="h100p">
        <h4>사물함위치 대기자명단</h4>
        <div data-bind="dxTabPanel: {
                height: '100%',
                selectedIndex : $parents[0].selectedTabIndex()
            }" class="hs-tab-box">
            <div data-options="dxItem : { title : '전체' }">
                <div data-options="dxTemplate : {name  :'item'}" class="hs-box h100p">
                    <div data-bind="dxDataGrid : $parents[1].entireGridOptions" class="hs-entire-grid"></div>
                </div>
            </div>
            <div data-options="dxItem : { title : '신청대기' }">
                <div data-options="dxTemplate : {name  :'item'}" class="hs-box h100p">
                    <div data-bind="dxDataGrid : $parents[1].waitingGridOptions" class="hs-waiting-grid"></div>
                </div>
            </div>
            <div data-options="dxItem : { title : '배정' }">
                <div data-options="dxTemplate : {name  :'item'}" class="hs-box h100p">
                    <div data-bind="dxDataGrid : $parents[1].assignGridOptions" class="hs-assign-grid"></div>
                </div>
            </div>
            <div data-options="dxItem : { title : '신청취소' }">
                <div data-options="dxTemplate : {name  :'item'}" class="hs-box h100p">
                    <div data-bind="dxDataGrid : $parents[1].cancelGridOptions" class="hs-cancel-grid"></div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="/backOffice/DevExtreme/22.1.5/js/devextreme/exceljs.min.js"></script>
<script type="text/javascript" src="/backOffice/DevExtreme/22.1.5/js/devextreme/FileSaver.min.js"></script>
<script type="text/javascript" src="/fmcs/js/locker/waitingList.js"></script>
<script type="text/javascript">
    const viewOptions = {
        lockerStatusGridInstance: {},
        lockerStatusGridOptions: {
            height: '100%',
            dataSource: ko.observable(),
            selection: {
                mode: 'single',
            },
            paging: {
                enabled: false,
            },
            loadPanel: {
                enabled: true
            },
            focusedRowEnabled: true,
            allowColumnResizing: true,
            showBorders: true,
            showRowLines: true,
            rowAlternationEnabled : true,
            columnChooser :{
                enabled:true,
                mode :  'select',
            },
            columns: [
                {
                    dataField: 'LocationCode',
                    calculateDisplayValue: 'LocationName',
                    caption: '사물함위치',
                    dataType: 'string',
                },
                {
                    dataField: 'LayerCode',
                    calculateDisplayValue: 'LayerName',
                    caption: '단구분',
                    dataType: 'string',

                },
                {
                    caption: '크기',
                    dataField: 'Size',
                    dataType: 'string',
                    alignment: 'center'
                },
                {
                    caption: '총 갯수',
                    dataField: 'TotalCount',
                    dataType: 'number',
                },
                {
                    caption: '배정가능 인원',
                    dataField: 'Available',
                    dataType: 'number'
                },
                {
                    caption: '배정인원',
                    dataField: 'Occupied',
                    dataType: 'number'
                },
                {
                    caption: '대기인원',
                    dataField: 'Waiting',
                    dataType: 'number'
                },
                {
                    caption: '수강중',
                    dataField: 'InClass',
                    dataType: 'number'

                },
                {
                    caption: '접수',
                    dataField: 'Received',
                    dataType: 'number'
                }
            ],
            toolbar: {
                items: [
                    {
                        location: 'before',
                        widget: 'dxSelectBox',
                        options: {
                            label: '사물함위치',
                            labelMode: 'floating',
                            dataSource: new DevExpress.data.ArrayStore({
                                data: locations,
                                key: 'Code',
                            }),
                            displayExpr: 'Name',
                            valueExpr: 'Code',
                            value: locations[0].Code,

                        }
                    },
                    {
                        location: 'before',
                        widget: 'dxSelectBox',
                        options: {
                            label: '단구분',
                            labelMode: 'floating',
                            dataSource: new DevExpress.data.ArrayStore({
                                data: layers,
                                key: 'Code',
                            }),
                            displayExpr: 'Name',
                            valueExpr: 'Code',
                            value: layers[0].Code
                        }
                    },
                    {
                        location: 'before',
                        widget: 'dxSelectBox',
                        options: {
                            label: '사물함크기',
                            labelMode: 'floating',
                            items: sizes,
                            value: sizes[0],
                        }
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            icon: 'refresh',
                            onClick(e) {
                                viewOptions.lockerStatusGridInstance.refresh().done(function(item){
                                    viewOptions.selectedLockerStatus(item[0]);
                                });
                            }
                        }
                    },
                    'columnChooserButton',
                ]
            },
            onInitialized(e) {
                viewOptions.lockerStatusGridInstance = e.component;
            },
            onContentReady(e) {
                if (!e.component.getSelectedRowKeys().length) {
                    e.component.selectRowsByIndexes(0);
                }
            },
            onSelectionChanged(selectedItems) {
                const data = selectedItems.selectedRowsData[0];
                viewOptions.selectedLockerStatus(data);
            },

        },
        selectedLockerStatus: ko.observable(null),
        entireGridInstance: {},
        entireGridOptions: {
            height: '100%',
            showBorders: true,
            rowAlternationEnabled : true,
            focusedRowEnabled: true,
            showRowLines: true,
            dataSource: ko.observable(),
            selection: {
                mode: 'single',
            },
            paging: {
                pageSize: 20,
            },
            columnChooser :{
                enabled:true,
                mode :  'select',
            },
            columns: [
                {
                    caption: '순번',
                    dataField: 'rowNumber',
                    dataType: 'number',
                    width: '5%',
                },
                {
                    caption: '사물함번호',
                    dataField: 'ID',
                    dataType: 'string',
                },
                {
                    caption: '회원번호',
                    dataField: 'MemberId',
                    dataType: 'string'
                },
                {
                    caption: '회원명',
                    dataField: 'MemberName',
                    dataType: 'string',
                },
                {
                    caption: '핸드폰번호',
                    dataField: 'MobileNumber',
                    dataType: 'string'
                },
                {
                    caption: 'SMS수신',
                    dataField: 'SMSReceived',
                    dataType: 'boolean',
                    alignment: 'left',
                    showEditorAlways:false,
                    calculateDisplayValue: (rowData) =>{
                        const {Name}  = SMSReceivedData.find(({Value})=> Value === rowData.SMSReceived) || {};
                        return Name;
                    },
                },
                {
                    caption: '접수상태',
                    dataField: 'ReceptionStatusCode',
                    calculateDisplayValue: 'ReceptionStatusName',
                    dataType: 'string'
                },
                {
                    caption: '신청일자',
                    dataField: 'RequestDate',
                    dataType: 'date',
                    format: 'yyyy-MM-dd HH:mm:ss',
                    alignment: 'center',
                },
                {
                    caption: '승인일자',
                    dataField: 'ApprovedDate',
                    dataType: 'date',
                    format: 'yyyy-MM-dd HH:mm:ss',
                    alignment: 'center',
                },
                {
                    caption: '취소구분',
                    dataField: 'CancelTypeCode',
                    dataType: 'string',
                    calculateDisplayValue: 'CancelTypeName'
                },
                {
                    caption: '취소일자',
                    dataField: 'CanceledDate',
                    dataType: 'date',
                    format: 'yyyy-MM-dd HH:mm:ss',
                    alignment: 'center',
                },
                {
                    caption: '수강여부',
                    alignment: 'center',
                    dataType: 'boolean',
                    trueText :'Y',
                    falseText :'N',
                    showEditorAlways: false,
                    calculateCellValue: function(rowData){
                        return rowData.InClass === 'Y';
                    }
                }
            ],
            toolbar: {
                items: [
                    {
                        widget: 'dxTextBox',
                        location: 'before',
                        options: {
                            placeholder: '회원정보를 입력하세요.',
                            width: 400,
                            stylingMode: 'outlined',
                            mode: 'search',
                        }
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            icon: 'refresh',
                            onClick() {
                                viewOptions.entireGridInstance.refresh();
                            }
                        },

                    },
                    'exportButton','columnChooserButton',
                ]
            },
            export: {
                enabled: true
            },
            onInitialized(e) {
                viewOptions.entireGridInstance = e.component;
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
                            const {Name} = SMSReceivedData.find(({Value})=> Value === gridCell.value)||{};
                            excelCell.value = Name;
                        }
                    }
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], {type: 'application/octet-stream'}), `사물함위치대기자명단-\${new Date().formatDateString('yyyyMMddHHmmss')}.xlsx`);
                    });
                });
                e.cancel = true;
            },
        },
        waitingGridInstance: {},
        waitingGridOptions: {
            dataSource: ko.observable(),
            height: '100%',
            showBorders: true,
            rowAlternationEnabled : true,
            focusedRowEnabled: true,
            showRowLines: true,
            selection: {
                mode: 'multiple',
            },
            loadPanel: {
                enabled: true
            },
            editing: {
                mode: 'batch',
                allowUpdating: true,
                allowAdding: false,
                allowDeleting: false,
            },
            columnChooser :{
                enabled:true,
                mode :  'select',
            },
            columns: [
                {
                    caption: '순번',
                    dataField: 'rowNumber',
                    dataType: 'number',
                    allowEditing: false,
                    width: '5%',
                },
                {
                    caption: '사물함번호',
                    dataField: 'ID',
                    dataType: 'string',
                    allowEditing: true,
                    editorType: 'dxSelectBox',
                    editorOptions: {
                        dataSource: [],
                        placeholder : '선택하세요.',
                    },
                },
                {
                    caption: '회원번호',
                    dataField: 'MemberId',
                    dataType: 'string',
                    allowEditing: false,
                },
                {
                    caption: '회원명',
                    dataField: 'MemberName',
                    dataType: 'string',
                    allowEditing: false,
                },
                {
                    caption: '핸드폰번호',
                    dataField: 'MobileNumber',
                    dataType: 'string',
                    allowEditing: false,
                },
                {
                    caption: 'SMS수신',
                    dataField: 'SMSReceived',
                    dataType: 'boolean',
                    alignment: 'left',
                    showEditorAlways:false,
                    calculateDisplayValue: (rowData) =>{
                        const {Name}  = SMSReceivedData.find(({Value})=> Value === rowData.SMSReceived) || {};
                        return Name;
                    },
                    allowEditing: false,
                },
                {
                    caption: '접수상태',
                    dataField: 'ReceptionStatusCode',
                    calculateDisplayValue: 'ReceptionStatusName',
                    dataType: 'string',
                    allowEditing: false,
                },
                {
                    caption: '신청일자',
                    dataField: 'RequestDate',
                    dataType: 'date',
                    format: 'yyyy-MM-dd HH:mm:ss',
                    allowEditing: false,
                    alignment: 'center',
                },
                {
                    caption: '수강여부',
                    alignment: 'center',
                    dataType: 'boolean',
                    allowEditing: false,
                    showEditorAlways: false,
                    trueText :'Y',
                    falseText :'N',
                    calculateCellValue: function(rowData){
                        return rowData.InClass === 'Y';
                    }
                }
            ],
            toolbar: {
                items: [
                    {
                        widget: 'dxTextBox',
                        location: 'before',
                        options: {
                            placeholder: '회원정보를 입력하세요.',
                            width: 400,
                            stylingMode: 'outlined',
                            mode: 'search',
                        }
                    },
                    {
                        name : 'saveButton',
                        showText  :'always',
                        options: {
                            icon  :'',
                            text: '배정처리',
                        }
                    },
                    {
                        location: 'always',
                        widget: 'dxButton',
                        options: {
                            text: '신청취소',
                            disabled:true,
                        }
                    },
                    {
                        name : 'revertButton',
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            icon: 'refresh',
                            onClick() {
                                viewOptions.waitingGridInstance.refresh().done(function(){
                                    console.log('done');
                                });
                            }
                        },
                    },
                    'exportButton','columnChooserButton',
                ]
            },
            export: {
                enabled: true
            },
            onInitialized(e) {
                viewOptions.waitingGridInstance = e.component;
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
                            const {Name} = SMSReceivedData.find(({Value})=> Value === gridCell.value)||{};
                            excelCell.value = Name;
                        }
                    }
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], {type: 'application/octet-stream'}), `사물함위치대기자명단(신청취소)-\${new Date().formatDateString('yyyyMMddHHmmss')}.xlsx`);
                    });
                });
                e.cancel = true;
            },
            onEditorPreparing: function (e) {
                if (e.dataField === 'ID') {
                    const changes = e.component.option('editing.changes');
                    let dataSource = ['A0002', 'A0005', 'A0023', 'A0049'];

                    if (changes && !!changes.length) {
                        changes.forEach(({data}) => {
                            if (!(e.value && e.value === data.ID)) {
                                dataSource = _.without(dataSource, data.ID);
                            }
                        });
                    }
                    e.editorOptions.dataSource =dataSource;
                    const defaultValueChangeHandler = e.editorOptions.onValueChanged;
                    e.editorOptions.onValueChanged = function(args) { // Override the default handler
                        defaultValueChangeHandler(args);
                        e.component.selectRows(e.row.key,true);
                    }

                }
            },
            onSelectionChanged(e) {
                e.component.option('toolbar.items[2].options.disabled', !e.selectedRowsData.length);
            },
        },
        assignGridInstance: {},
        assignGridOptions: {
            height: '100%',
            showBorders: true,
            showRowLines: true,
            rowAlternationEnabled : true,
            focusedRowEnabled: true,
            dataSource: ko.observable(),
            selection: {
                mode: 'multiple',
            },
            loadPanel: {
                enabled: true
            },
            paging: {
                pageSize: 20,
            },
            columnChooser :{
                enabled:true,
                mode :  'select',
            },
            columns: [
                {
                    caption: '순번',
                    dataField: 'rowNumber',
                    dataType: 'number',
                    width: '5%',
                },
                {
                    caption: '사물함번호',
                    dataField: 'ID',
                    dataType: 'string',
                },
                {
                    caption: '회원번호',
                    dataField: 'MemberId',
                    dataType: 'string'
                },
                {
                    caption: '회원명',
                    dataField: 'MemberName',
                    dataType: 'string',
                },
                {
                    caption: '핸드폰번호',
                    dataField: 'MobileNumber',
                    dataType: 'string'
                },
                {
                    caption: 'SMS수신',
                    dataField: 'SMSReceived',
                    dataType: 'boolean',
                    alignment: 'left',
                    showEditorAlways:false,
                    calculateDisplayValue: (rowData) =>{
                        const {Name}  = SMSReceivedData.find(({Value})=> Value === rowData.SMSReceived) || {};
                        return Name;
                    },
                },
                {
                    caption: '접수상태',
                    dataField: 'ReceptionStatusCode',
                    calculateDisplayValue: 'ReceptionStatusName',
                    dataType: 'string'
                },
                {
                    caption: '신청일자',
                    dataField: 'RequestDate',
                    dataType: 'date',
                    format: 'yyyy-MM-dd HH:mm:ss',
                    alignment: 'center',
                },
                {
                    caption: '승인일자',
                    dataField: 'ApprovedDate',
                    dataType: 'date',
                    format: 'yyyy-MM-dd HH:mm:ss',
                    alignment: 'center',
                },
                {
                    caption: '수강여부',
                    alignment: 'center',
                    dataType: 'boolean',
                    trueText :'Y',
                    falseText :'N',
                    showEditorAlways: false,
                    calculateCellValue: function(rowData){
                        return rowData.InClass === 'Y';
                    }
                }

            ],
            toolbar: {
                items: [
                    {
                        widget: 'dxTextBox',
                        location: 'before',
                        options: {
                            placeholder: '회원정보를 입력하세요.',
                            width: 400,
                            stylingMode: 'outlined',
                            mode: 'search',
                        }
                    },
                    {
                        location: 'always',
                        widget: 'dxButton',
                        options: {
                            text: '배정취소',
                            disabled:true,
                            onClick() {

                            }
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            icon: 'refresh',
                            onClick() {
                                viewOptions.assignGridInstance.refresh();
                            }
                        },
                    },
                    'exportButton','columnChooserButton',
                ]
            },
            export: {
                enabled: true
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
                            const {Name} = SMSReceivedData.find(({Value})=> Value === gridCell.value)||{};
                            excelCell.value = Name;
                        }
                    }
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], {type: 'application/octet-stream'}), `사물함위치대기자명단-\${new Date().formatDateString('yyyyMMddHHmmss')}.xlsx`);
                    });
                });
                e.cancel = true;
            },
            onInitialized(e) {
                viewOptions.assignGridInstance = e.component;
            },
            onSelectionChanged(e) {

                e.component.option('toolbar.items[1].options.disabled', !e.selectedRowsData.length);
            },
        },
        cancelGridInstance: {},
        cancelGridOptions: {
            height: '100%',
            showBorders: true,
            showRowLines: true,
            rowAlternationEnabled : true,
            focusedRowEnabled: true,
            dataSource: ko.observable(),
            selection: {
                mode: 'single',
            },
            loadPanel: {
                enabled: true
            },
            paging: {
                pageSize: 20,
            },
            columnChooser :{
                enabled:true,
                mode :  'select',
            },
            columns: [
                {
                    caption: '순번',
                    dataField: 'rowNumber',
                    dataType: 'number',
                    width: '5%',
                },
                {
                    caption: '사물함번호',
                    dataField: 'ID',
                    dataType: 'string',
                },
                {
                    caption: '회원번호',
                    dataField: 'MemberId',
                    dataType: 'string'
                },
                {
                    caption: '회원명',
                    dataField: 'MemberName',
                    dataType: 'string',
                },
                {
                    caption: '핸드폰번호',
                    dataField: 'MobileNumber',
                    dataType: 'string'
                },
                {
                    caption: 'SMS수신',
                    dataField: 'SMSReceived',
                    dataType: 'boolean',
                    alignment: 'left',
                    showEditorAlways:false,
                    calculateDisplayValue: (rowData) =>{
                        const {Name}  = SMSReceivedData.find(({Value})=> Value === rowData.SMSReceived) || {};
                        return Name;
                    },
                },
                {
                    caption: '접수상태',
                    dataField: 'ReceptionStatusCode',
                    calculateDisplayValue: 'ReceptionStatusName',
                    dataType: 'string'
                },
                {
                    caption: '취소구분',
                    dataField: 'CancelTypeCode',
                    dataType: 'string',
                    calculateDisplayValue: 'CancelTypeName'
                },
                {
                    caption: '신청일자',
                    dataField: 'RequestDate',
                    dataType: 'date',
                    format: 'yyyy-MM-dd HH:mm:ss',
                    alignment: 'center',
                },
                {
                    caption: '취소일자',
                    dataField: 'CanceledDate',
                    dataType: 'date',
                    format: 'yyyy-MM-dd HH:mm:ss',
                    alignment: 'center',
                },
                {
                    caption: '수강여부',
                    alignment: 'center',
                    dataType: 'boolean',
                    trueText :'Y',
                    falseText :'N',
                    showEditorAlways: false,
                    calculateCellValue: function(rowData){
                        return rowData.InClass === 'Y';
                    }
                }
            ],
            toolbar: {
                items: [
                    {
                        widget: 'dxTextBox',
                        location: 'before',
                        options: {
                            placeholder: '회원정보를 입력하세요.',
                            width: 400,
                            stylingMode: 'outlined',
                            mode: 'search',
                        }
                    },
                    {
                        widget: 'dxSelectBox',
                        location: 'before',
                        options: {
                            label: '취소구분',
                            labelMode: 'floating',
                            dataSource: new DevExpress.data.ArrayStore({
                                key: 'Code',
                                data: cancelTypes,
                            }),
                            valueExpr: 'Code',
                            displayExpr: 'Name',
                            showClearButton: true,
                        }
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            icon: 'refresh',
                            onClick() {
                                viewOptions.cancelGridInstance.refresh();
                            }
                        },
                    },
                    'exportButton','columnChooserButton',
                ]
            },
            export: {
                enabled: true
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
                            const {Name} = SMSReceivedData.find(({Value})=> Value === gridCell.value)||{};
                            excelCell.value = Name;
                        }
                    }
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], {type: 'application/octet-stream'}), `사물함위치대기자명단-\${new Date().formatDateString('yyyyMMddHHmmss')}.xlsx`);
                    });
                });
                e.cancel = true;
            },
            onInitialized(e) {
                viewOptions.cancelGridInstance = e.component;
            }
        },
        selectedTabIndex: ko.observable(0),
    };

    viewOptions.lockerStatusGridOptions.dataSource(new DevExpress.data.ArrayStore({
        key: ['LocationCode', 'LayerCode', 'Size'],
        data: lockerStatusData,
    }));

    viewOptions.selectedLockerStatus.subscribe((newValue) => {

        viewOptions.entireGridOptions.dataSource(new DevExpress.data.ArrayStore({
            key: ['RequestId'],
            data: entireData,
        }));

        viewOptions.waitingGridOptions.dataSource(new DevExpress.data.ArrayStore({
            key: ['RequestId'],
            data: waitingData,
        }));

        viewOptions.assignGridOptions.dataSource(new DevExpress.data.ArrayStore({
            key: ['RequestId'],
            data: assignData,
        }));

        viewOptions.cancelGridOptions.dataSource(new DevExpress.data.ArrayStore({
            key: ['RequestId'],
            data: canceledData,
        }));
    });

    ko.applyBindings(viewOptions);
</script>
</body>
</html>
