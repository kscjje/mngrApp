<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>사물함정보관리</title>
    <link rel="stylesheet" href="/fmcs/css/locker/info.css" type="text/css"/>
</head>
<body>
<div class="row row_title">
    <div class="col-12">
        <ul class="navbar-nav">
            <li class="nav-item d-sm-inline-block quick-nav">
                사물함정보관리
            </li>
        </ul>
    </div>
</div>
<div id="main-container" data-bind="dxBox : { direction: 'row',width : '100%',height:' calc(100vh - 40px)' }" class="hs-main-container">
    <div data-options="dxItem: {ratio: 2}">
        <div id="west-container" data-bind="dxBox : { direction : 'col', width : '100%', height: '100%' }">
            <div data-options="dxItem : {ratio: 1}" class="hs-box">
                <div data-bind="dxDataGrid : $parents[1].locationGridOptions" class="mt05"></div>
            </div>
            <div data-options="dxItem : {ratio: 1}" class="hs-box">
                <div data-bind="dxDataGrid : $parents[1].feeGridOptions" class="mt05"></div>
            </div>
        </div>
    </div>
    <div data-options="dxItem: {ratio: 3}" class="hs-box">
        <h4 class="hs-title">사물함리스트</h4>
        <div data-bind="dxToolbar: $parent.infoGridFilterToolbarOptions" class="hs-toolbar-container"></div>
        <div data-bind="dxDataGrid: $parent.infoGridOptions"></div>
    </div>
</div>

<div id="bulk-register-popup" class="hs-hidden" data-bind="dxPopup: {
            title: '사물함 일괄등록',
            visible: false,
            width: 750,
            height: 850,
            onInitialized: function (e) {
                bulkRegisterPopupInstance = e.component;
            },
            onShowing(e){
                e.model.bulkRegisterFormOptions.formData({
                    LocationCode : '0002',
                    Deposits : null,
                    RentalFees : null,
                    StatusCode : 'A'
                });
            },
            onHiding(e){

                e.model.bulkRegisterFormInstance.element().find('.hs-fee-grid-container').each((i, obj)=>{
                    DevExpress.ui.dxDataGrid.getInstance(obj).clearSelection();
                });
            },
            toolbarItems: [

                {
                    widget: 'dxButton',
                    toolbar: 'bottom',
                    location: 'after',
                    options: {
                        text: '일괄처리'
                    }
                },
                {
                    widget: 'dxButton',
                    toolbar: 'bottom',
                    location: 'after',
                    options: {
                        text: '취소',
                        onClick(e) {
                            bulkRegisterPopupInstance.hide();
                        }
                    },
                },
            ],
        }">
    <div data-options="dxTemplate :{ name : 'content'}">
        <div data-bind="dxForm: bulkRegisterFormOptions"></div>
    </div>
</div>

<div id="bulk-fee-popup" class="hs-hidden"  data-bind="dxPopup: {
            title: '사물함위치별 요금설정',
            visible: false,
            width: 750,
            height: 700,
            onInitialized: function (e) {
                bulkFeePopupInstance = e.component;
            },
            onShowing(e){
                e.model.bulkFeeFormOptions.formData({
                    LocationCode : '0002',
                    Deposits : null,
                    RentalFees : null,
                });
            },
            onHiding(e){

                e.model.bulkFeeFormInstance.element().find('.hs-fee-grid-container').each((i, obj)=>{
                    DevExpress.ui.dxDataGrid.getInstance(obj).clearSelection();
                });
            },
            toolbarItems: [
                {
                    widget: 'dxButton',
                    toolbar: 'bottom',
                    location: 'after',
                    options: {
                        text: '일괄처리',
                        onClick(e){
                            console.log(bulkFeeFormInstance.option('formData'));
                        }
                    }
                },
                {
                    widget: 'dxButton',
                    toolbar: 'bottom',
                    location: 'after',
                    options: {
                        text: '취소',
                        onClick(e) {
                            bulkFeePopupInstance.hide();
                        }
                    },
                },
            ],
        }">
    <div data-options="dxTemplate : { name : 'content' }">
        <div data-bind="dxForm: bulkFeeFormOptions"></div>
    </div>
</div>

<script type="text/html" id="deposit-multiselect-grid-template">
    <fee-multiselect-grid params="{
        dataSource : new DevExpress.data.ArrayStore({
            data :depositFees,
            key : 'ItemCode',
        }),
        parentOptions : {
            component : component,
            dataField : dataField
        }
    }"></fee-multiselect-grid>
</script>
<script type="text/html" id="rentfee-multiselect-grid-template">
    <fee-multiselect-grid params="{
        dataSource : new DevExpress.data.ArrayStore({
            data :rentalFees,
            key : 'ItemCode',
        }),
        parentOptions : {
            component : component,
            dataField : dataField
        }
    }"></fee-multiselect-grid>
</script>
<script src="/fmcs/js/locker/info.js"></script>
<script type="text/javascript" src="/backOffice/ckeditor/ckeditor.js"></script>
<script type="text/javascript" src="/backOffice/DevExtreme/22.1.5/js/devextreme/exceljs.min.js"></script>
<script type="text/javascript" src="/backOffice/DevExtreme/22.1.5/js/devextreme/FileSaver.min.js"></script>
<script type="text/javascript">

    const viewOptions = {
        locationGridInstance: {},
        feeGridInstance: {},
        infoGridInstance: {},
        bulkRegisterPopupInstance: {},
        bulkFeePopupInstance: {},
        bulkRegisterFormInstance: {},
        bulkFeeFormInstance: {},
        locationGridOptions: {
            rowAlternationEnabled : true,
            focusedRowEnabled: true,
            showRowLines: true,
            height: '100%',
            showBorders: true,
            dataSource: ko.observable(null),
            columns: [
                {
                    dataField: 'Code',
                    caption: '코드',
                    dataType: 'string',
                    alignment: 'left',
                    allowEditing: false,
                },
                {
                    dataField: 'Name',
                    caption: '명칭',
                    dataType: 'string',
                    alignment: 'left',
                    formItem :{
                       colSpan : 2,
                    }
                },
                {
                    dataField: 'Enabled',
                    caption: '사용여부',
                    dataType: 'boolean',
                    alignment: 'left',
                    showEditorAlways : false,
                    editorType: 'dxSelectBox',
                    editorOptions: {
                        dataSource: enabledData,
                        valueExpr: 'Value',
                        displayExpr: 'Name'
                    },
                    calculateDisplayValue: (rowData) =>{
                        const {Name} = enabledData.find(({Value})=> Value === rowData.Enabled) || {};
                        return Name;
                    },
                },
                {
                    dataField: 'Contents',
                    caption: '안내 컨텐츠',
                    dataType: 'string',
                    alignment: 'left',
                    visible : false,
                    formItem : {
                        colSpan: 2,
                        label : {
                            text : '안내 컨텐츠',
                            location : 'top',
                        }
                    },
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
                        CKEDITOR.instances.desc_editor.on("change", ()=>{
                                options.setValue(CKEDITOR.instances.desc_editor.getData());
                        });
                    },
                },
                {
                    caption : '정렬순서',
                    dataField :'SortNo',
                    dataType:'number',
                    visible:false,
                    editorType :'dxNumberBox',
                    editorOptions :{
                        showSpinButtons: true,
                        showClearButton: true,
                        min: 1,
                    }
                },
                {
                    type: 'buttons',
                    alignment: 'left',
                    buttons: ['edit', 'delete'],
                }
            ],
            onEditingStart: function(e){
                viewOptions.locationGridInstance.option("editing.popup.title", "사물함 위치정보 수정");
            },
            onInitNewRow: function(e){
                viewOptions.locationGridInstance.option("editing.popup.title", "사물함 위치정보 등록");
                e.data.Enabled = 'Y';
            },
            editing: {
                allowAdding: true,
                allowUpdating: true,
                allowDeleting: true,
                confirmDelete: true,
                useIcons: true,
                mode: 'popup',
                popup: {
                    title: '사물함 위치정보',
                    showTitle: true,
                    width: 980,
                    height: 780,
                    showCloseButton: true,
                    fullScreen: false,
                },
                form: {
                    showColonAfterLabel:false,
                    colCount: 2,
                    items: ['Name','Enabled','SortNo','Contents']
                }
            },
            toolbar: {
                items: [
                    {
                        location : 'before',
                        text : '사물함 위치',
                        cssClass : 'hs-title',
                    },'addRowButton',
                    {
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            icon: 'minus',
                            disabled: true,
                            onClick() {
                                viewOptions.locationGridInstance.getSelectedRowKeys().forEach((key) => {
                                    let index = locations.findIndex((element) => element.Code === key);
                                    locations.splice(index, 1);

                                });
                                viewOptions.locationGridInstance.refresh();
                            },
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            icon: 'refresh',
                            onClick() {
                                viewOptions.locationGridInstance.refresh();
                            }
                        },

                    },
                ]
            },
            selection: {
                mode: 'multiple',
                showCheckBoxesMode: 'always'
            },
            onInitialized(e) {
                viewOptions.locationGridInstance = e.component;
            },
            onRowDblClick(e) {
                e.component.editRow(e.rowIndex);
            },
            onSelectionChanged(e) {
                e.component.option('toolbar.items[2].options.disabled', !e.selectedRowsData.length);
            },
        },
        feeGridOptions: {
            height: '100%',
            focusedRowEnabled: true,
            showBorders: true,
            dataSource: ko.observable(null),
            rowAlternationEnabled : true,
            showRowLines: true,
            columnChooser :{
                enabled:true,
                mode :  'select',
            },
            columns: [
                {
                    dataField: 'ProductCategoryCode',
                    caption:'운영상품분류',
                    calculateDisplayValue: 'ProductCategoryName',
                    editCellTemplate:productCategoryTemplate,
                    formItem : {
                        label : {
                            visible :false,
                        },
                    }
                },
                {
                    dataField: 'FeeCategory',
                    caption: '요금구분',
                    dataType: 'string',
                    alignment: 'center',
                    calculateDisplayValue : 'FeeCategoryName',
                    setCellValue: function (newData, value) {
                        this.defaultSetCellValue(newData, value);
                    },
                    editorType: 'dxSelectBox',
                    editorOptions: {
                        dataSource: [
                            {
                                Code: '1000', Name: '임대료'
                            },
                            {
                                Code: '1001', Name: '보증금'
                            }
                        ],
                        displayExpr: 'Name',
                        valueExpr: 'Code',
                        placeholder: '선택하세요.',
                    },
                },
                {
                    dataField: 'ItemCode',
                    caption: '품목코드',
                    dataType: 'string',
                    alignment: 'center',
                    allowEditing: false,
                },
                {
                    dataField: 'ItemName',
                    caption: '요금명',
                    dataType: 'string',
                    alignment: 'left',
                    formItem: {
                        colSpan : 2,
                    }
                },
                {
                    dataField: 'RentalMonths',
                    caption: '임대개월수',
                    dataType: 'number',
                    alignment: 'right',
                    editorType: 'dxSelectBox',
                    editorOptions: {
                        items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                        visible: true,
                        placeholder: '선택하세요.'
                    }
                },
                {
                    dataField: 'UnitFee',
                    caption: '판매단가',
                    dataType: 'number',
                    alignment: 'right',
                    format: 'currency',
                    editorType: 'dxNumberBox',
                    editorOptions: {
                        min: 0,
                        format: 'currency',
                    }
                },
                {
                    dataField: 'Taxable',
                    caption: '과세구분',
                    dataType: 'boolean',
                    alignment: 'left',
                    editorType: 'dxSelectBox',
                    editorOptions: {
                        dataSource: taxableData,
                        valueExpr: 'Value',
                        displayExpr: 'Name',
                        placeholder: '선택하세요.'
                    },
                    showEditorAlways : false,
                    calculateDisplayValue: (rowData) =>{
                        const {Name} = taxableData.find(({Value})=> Value === rowData.Taxable) || {};
                        return Name;
                    },
                },
                {
                    dataField: 'Enabled',
                    caption: '사용여부',
                    dataType: 'boolean',
                    alignment: 'left',
                    editorType: 'dxSelectBox',
                    editorOptions: {
                        dataSource: enabledData,
                        valueExpr: 'Value',
                        displayExpr: 'Name'
                    },
                    showEditorAlways : false,
                    calculateDisplayValue: (rowData) =>{
                        const {Name} = enabledData.find(({Value})=> Value === rowData.Enabled) || {};
                        return Name;
                    },
                },
                {
                    dataField: 'Remark',
                    caption: '비고',
                    dataType: 'string',
                    alignment: 'left',
                    editorType: 'dxTextArea',
                    editorOptions: {
                        height: 140,
                    },
                    formItem : {
                        colSpan: 2,
                    }
                },
                {
                    dataField: 'Displayable',
                    caption: '온라인공개',
                    visible: false,
                    dataType: 'boolean',
                    editorType: 'dxSelectBox',
                    editorOptions: {
                        dataSource: displayableData,
                        valueExpr: 'Value',
                        displayExpr: 'Name',
                    },
                    showEditorAlways : false,
                    calculateDisplayValue: (rowData) =>{
                        const {Name} = displayableData.find(({Value})=> Value === rowData.Displayable) || {};
                        return Name;
                    },
                    formItem : {
                        label : {
                            text:'온라인공개',
                        }
                    }
                },
                {
                    dataField: 'SortingNumber',
                    caption: '정렬순서',
                    visible: false,
                    dataType: 'number',
                    editorType: 'dxNumberBox',
                }
            ],
            toolbar: {
                items: [
                    {
                        location : 'before',
                        text : '사물함 요금관리',
                        cssClass : 'hs-title',
                    }, 'addRowButton',
                    {
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            icon: 'refresh',
                            onClick() {
                                viewOptions.feeGridInstance.refresh();
                            }
                        },
                    }, 'columnChooserButton',
                ]
            },
            selection: {
                mode: 'single',
                deferred: false
            },
            onEditingStart: function(e){
                viewOptions.feeGridInstance.option("editing.popup.title", "사물함 요금정보 수정");
            },
            onInitNewRow: function(e){
                viewOptions.feeGridInstance.option("editing.popup.title", "사물함 요금정보 등록");
                e.data.FeeCategory = '1000';
                e.data.RentalMonths = 1;
                e.data.Taxable = '1';
                e.data.Enabled = 'Y';
                e.data.Displayable = 'Y';
            },
            editing: {
                allowAdding: true,
                allowUpdating: true,
                allowDeleting: true,
                confirmDelete: true,
                useIcons: true,
                mode: 'popup',
                popup: {
                    title: '사물함요금정보',
                    showTitle: true,
                    width: 900,
                    height: 600,
                    showCloseButton: true,
                    fullScreen: false,
                },
                form: {
                    showColonAfterLabel: false,
                    customizeItem:function(item) {
                        if (item && item.itemType === 'simple' && item.dataField === 'RentalMonths') {
                            let editRowKey = viewOptions.feeGridInstance.option('editing.editRowKey');
                            let index = viewOptions.feeGridInstance.getRowIndexByKey(editRowKey);
                            index = index === -1 ? 0 : index;
                            item.itemType = viewOptions.feeGridInstance.cellValue(index, 'FeeCategory') !== '1001' ? 'simple' : 'empty';
                        }
                    },
                    colCount: 3,
                    items: [
                        {
                            itemType: 'group',
                            name: 'productTree',
                            items :['ProductCategoryCode']
                        },
                        {
                            colSpan: 2,
                            colCount: 2,
                            itemType: 'group',
                            name: 'feeForm',
                            items: [
                                'ItemName',
                                'FeeCategory',
                                'RentalMonths',
                                'UnitFee',
                                'Taxable',
                                'Enabled',
                                'Displayable',
                                'SortingNumber',
                                {
                                    itemType: 'empty'
                                },
                                'Remark',
                            ]
                        }
                    ],
                }
            },
            onInitialized: function (e) {
                viewOptions.feeGridInstance = e.component;
            },
            onRowDblClick(e) {
                viewOptions.feeGridInstance.editRow(e.rowIndex);
            },
        },
        bulkRegisterFormOptions: {
            formData: ko.observable(null),
            colCount: 1,
            showColonAfterLabel: false,
            items: [
                {
                    dataField: 'LocationCode',
                    editorType: 'dxSelectBox',
                    label: {
                        text: '사물함위치'
                    },
                    editorOptions: {
                        displayExpr: 'Name',
                        valueExpr: 'Code',
                        dataSource: new DevExpress.data.ArrayStore({
                            key: 'Code',
                            data: locations
                        })
                    }
                },
                {
                    dataField: 'DivisionCode',
                    editorType: 'dxTextBox',
                    label: {
                        text: '사물함구분자'
                    }
                },
                {
                    label: {
                        text: '사물함번호'
                    },
                    colCount: 2,
                    itemType: 'group',
                    items: [
                        {
                            cssClass: 'hs-child-editor-box',
                            dataField: 'FromID',
                            label: {
                                text: '시작번호',
                                location: "top",
                            }
                        },
                        {
                            cssClass: 'hs-child-editor-box',
                            dataField: 'ToID',
                            label: {
                                text: '끝번호',
                                location: "top",
                            }
                        },
                    ]
                },
                {
                    dataField: 'StatusCode',
                    editorType: 'dxSelectBox',
                    label: {
                        text: '사물함상태'
                    },
                    editorOptions: {
                        dataSource: new DevExpress.data.ArrayStore({
                            key: 'Code',
                            data: status
                        }),
                        displayExpr: 'Name',
                        valueExpr: 'Code',
                    }
                },
                {
                    dataField: 'Size',
                    label: {
                        text: '사물함크기'
                    },
                    editorType: 'dxSelectBox',
                    editorOptions: {
                        items: sizes,
                    }
                },
                {
                    dataField: 'Layer',
                    label: {
                        text: '단구분'
                    },
                    editorType: 'dxSelectBox',
                    editorOptions: {
                        dataSource: new DevExpress.data.ArrayStore({
                            key: 'Code',
                            data: layers
                        }),
                        displayExpr: 'Name',
                        valueExpr: 'Code',
                    }
                },
                {
                    dataField: 'Deposits',
                    label: {
                        text: '보증금',
                        location : 'top',
                    },
                    template : $('#deposit-multiselect-grid-template')
                },
                {
                    dataField: 'RentalFees',
                    label: {
                        text: '임대료',
                        location : 'top',
                    },
                    template : $('#rentfee-multiselect-grid-template')
                },
            ],
            onInitialized(e) {
                viewOptions.bulkRegisterFormInstance = e.component;
            }
        },
        bulkFeeFormOptions: {
            formData: ko.observable(null),
            colCount: 1,
            showColonAfterLabel: false,
            items: [
                {
                    dataField: 'LocationCode',
                    editorType: 'dxSelectBox',
                    label: {
                        text: '사물함위치'
                    },
                    editorOptions: {
                        dataSource: new DevExpress.data.ArrayStore({
                            key: 'Code',
                            data: locations
                        }),
                        displayExpr: 'Name',
                        valueExpr: 'Code',
                    }
                },
                {
                    dataField: 'Size',
                    label: {
                        text: '사물함크기'
                    },
                    editorType: 'dxSelectBox',
                    editorOptions: {
                        items: sizes,
                    }
                },
                {
                    dataField: 'Deposits',
                    label: {
                        text: '보증금',
                        location : 'top',
                    },
                    template : $('#deposit-multiselect-grid-template')
                },
                {
                    dataField: 'RentalFees',
                    label: {
                        text: '임대료',
                        location : 'top',
                    },
                    template : $('#rentfee-multiselect-grid-template')
                },
            ],
            onInitialized(e){
                viewOptions.bulkFeeFormInstance = e.component;
            }
        },
        infoGridOptions: {
            height: '92%',
            focusedRowEnabled: true,
            showBorders: true,
            dataSource: ko.observable(null),
            cellHintEnabled: true,
            columnAutoWidth: true,
            showRowLines: true,
            rowAlternationEnabled : true,
            scrolling: {
                rowRenderingMode: 'virtual',
            },
            paging: {
                pageSize: 25,
            },
            pager: {
                visible: true,
                allowedPageSizes: [ 25, 50, 100, 'all'],
                showPageSizeSelector: true,
                showInfo: true,
                showNavigationButtons: true,
                displayMode: 'compact',
            },
            columnChooser :{
                enabled:true,
                mode :  'select',
            },
            columns: [
                {
                    dataField: 'LocationCode',
                    dataType: 'string',
                    caption: '사물함위치',
                    calculateDisplayValue : 'LocationName',
                    editorType: 'dxSelectBox',
                    editorOptions: {
                        dataSource: new DevExpress.data.ArrayStore({
                            key: 'Code',
                            data: locations
                        }),
                        displayExpr: 'Name',
                        valueExpr: 'Code',
                    },
                    formItem : {
                        colSpan: 2,
                    }
                },
                {
                    dataField: 'Division',
                    dataType: 'string',
                    caption: '사물함구분자',
                    visible: false,
                    showInColumnChooser : false,
                    editCellTemplate: function (container, options) {
                        $('<div></div>').dxTextBox({
                            value: options.value,
                            readOnly: !!options.value,
                            onValueChanged(e){
                                options.setValue(e.value);
                            }
                        }).appendTo(container);
                    },
                },
                {
                    dataField: 'ID',
                    dataType: 'string',
                    caption: '사물함번호',
                    visible: false,
                    showInColumnChooser : false,
                    editCellTemplate: function (container, options) {
                        $('<div></div>').dxTextBox({
                            value: options.value,
                            readOnly: !!options.value,
                            onValueChanged(e){
                                options.setValue(e.value);
                            }
                        }).appendTo(container);
                    }
                },
                {
                    caption: '사물함번호',
                    alignment: 'center',
                    calculateCellValue: function (rowData) {
                        return rowData.Division + rowData.ID;
                    }
                },
                {
                    dataField: 'StatusCode',
                    dataType: 'string',
                    caption: '사물함상태',
                    alignment: 'left',
                    calculateDisplayValue : 'Status',
                    editorType: 'dxSelectBox',
                    editorOptions: {
                        dataSource: new DevExpress.data.ArrayStore({
                            key: 'Code',
                            data: status
                        }),
                        displayExpr: 'Name',
                        valueExpr: 'Code',
                    }
                },
                {
                    dataField: 'Size',
                    dataType: 'string',
                    caption: '사물함크기',
                    alignment: 'center',
                    editorType: 'dxSelectBox',
                    editorOptions: {
                        items: sizes,
                    }
                },
                {
                    dataField: 'LayerCode',
                    dataType: 'string',
                    caption: '단구분',
                    alignment: 'center',
                    calculateDisplayValue : 'Layer',
                    editorType: 'dxSelectBox',
                    editorOptions: {
                        dataSource: new DevExpress.data.ArrayStore({
                            key: 'Code',
                            data: layers
                        }),
                        displayExpr: 'Name',
                        valueExpr: 'Code',
                    }
                },
                {
                    dataField : 'Deposits',
                    dataType :'object',
                    formItem : {
                        label : {
                            location :'top',
                            text  :'보증금',
                        },
                        colSpan: 2,
                    },
                    visible:false,
                    showInColumnChooser : false,
                    editCellTemplate:function(container, options){
                        const $grid = $('<div>').addClass('hs-fee-grid-container').dxDataGrid({
                            width : '100%',
                            height : 200,
                            rowAlternationEnabled : true,
                            focusedRowEnabled: true,
                            showRowLines: true,
                            selectedRowKeys : options.value,
                            selection: {
                                mode :'multiple',
                                allowSelectAll: true,
                            },
                            dataSource : new DevExpress.data.ArrayStore({
                                key: 'ItemCode',
                                data: depositFees
                            }),
                            loadPanel: {
                                enabled: true
                            },
                            toolbar : {
                              items :[
                                  {
                                      location: 'after',
                                      widget: 'dxButton',
                                      options: {
                                          icon: 'refresh',
                                          onClick(e) {
                                              $grid.dxDataGrid('instance').refresh();
                                          }
                                      }
                                  },
                              ]
                            },
                            columns : [
                                {
                                    caption : '요금구분',
                                    dataField: 'FeeCategory',
                                    calculateDisplayValue : 'FeeCategoryName'
                                },
                                {
                                    dataField: 'ItemCode',
                                    caption: '품목코드',
                                },
                                {
                                    dataField: 'ItemName',
                                    caption: '요금명',
                                },
                                {
                                    dataField: 'RentalMonths',
                                    caption: '임대개월수',
                                    dataType: 'number',
                                },
                                {
                                    dataField: 'UnitFee',
                                    caption: '금액',
                                    format: 'currency'

                                },
                                {
                                    dataField: 'Taxable',
                                    dataType:'boolean',
                                    caption: '과세구분',
                                    alignment:'left',
                                    showEditorAlways :false,
                                    calculateDisplayValue: (rowData) =>{
                                        const {Name} = taxableData.find(({Value})=> Value === rowData.Taxable) || {};
                                        return Name;
                                    },
                                },
                                {
                                    dataField: 'Remark',
                                    caption: '비고'
                                }
                            ],
                            onSelectionChanged(selectedItems) {
                                const keys = selectedItems.selectedRowKeys;
                                options.setValue(keys);
                            },
                        });
                        container.append($grid);
                    }
                },
                {
                    dataField : 'RentalFees',
                    dataType :'object',
                    formItem : {
                        label : {
                            location :'top',
                            text  :'임대료',
                        },
                        colSpan: 2,
                    },
                    visible:false,
                    showInColumnChooser : false,
                    editCellTemplate:function(container, options){
                        const $grid = $('<div>').addClass('hs-fee-grid-container').dxDataGrid({
                            width : '100%',
                            height : 200,
                            rowAlternationEnabled : true,
                            focusedRowEnabled: true,
                            showRowLines: true,
                            selectedRowKeys : options.value,
                            selection: {
                                mode :'multiple',
                                allowSelectAll: true,
                            },
                            dataSource : new DevExpress.data.ArrayStore({
                                key: 'ItemCode',
                                data: rentalFees
                            }),
                            loadPanel: {
                                enabled: true
                            },
                            toolbar : {
                                items :[
                                    {
                                        location: 'after',
                                        widget: 'dxButton',
                                        options: {
                                            icon: 'refresh',
                                            onClick(e) {
                                                $grid.dxDataGrid('instance').refresh();
                                            }
                                        }
                                    },
                                ]
                            },
                            columns : [
                                {
                                    caption : '요금구분',
                                    dataField: 'FeeCategory',
                                    calculateDisplayValue : 'FeeCategoryName'
                                },
                                {
                                    dataField: 'ItemCode',
                                    caption: '품목코드',
                                },
                                {
                                    dataField: 'ItemName',
                                    caption: '요금명',
                                },
                                {
                                    dataField: 'RentalMonths',
                                    caption: '임대개월수',
                                    dataType: 'number',
                                },
                                {
                                    dataField: 'UnitFee',
                                    caption: '금액',
                                    format: 'currency'
                                },
                                {
                                    dataField: 'Taxable',
                                    caption: '과세구분',
                                    alignment:'left',
                                    showEditorAlways :false,
                                    calculateDisplayValue: (rowData) =>{
                                        const {Name} = taxableData.find(({Value})=> Value === rowData.Taxable) || {};
                                        return Name;
                                    },
                                },
                                {
                                    dataField: 'Remark',
                                    caption: '비고'
                                }
                            ],
                            onSelectionChanged(selectedItems) {
                                const keys = selectedItems.selectedRowKeys;
                                options.setValue(keys);
                            },
                        });
                        container.append($grid);
                    }
                }
            ],
            selection: {
                mode: 'multiple',
                showCheckBoxesMode: 'always',
            },
            onEditingStart: function(e){
                viewOptions.infoGridInstance.option("editing.popup.title", "사물함 수정");
            },
            onInitNewRow: function(e){
                viewOptions.infoGridInstance.option("editing.popup.title", "사물함 등록");
            },
            editing: {
                mode: 'popup',
                allowAdding: true,
                allowUpdating: true,
                allowDeleting: true,
                useIcons: true,
                popup: {
                    title: '사물함등록',
                    showTitle: true,
                    width: 750,
                    height: 800,
                    showCloseButton: true,
                    fullScreen: false,
                },
                form: {
                    showColonAfterLabel: false,
                    colCount: 2,
                    items: ['LocationCode', 'Division', 'ID', 'StatusCode', 'Size', 'LayerCode', { itemType :'empty'}, 'Deposits', 'RentalFees']
                }
            },
            export: {
                enabled: true
            },
            toolbar: {
                items: [
                    {
                        location: 'before',
                        widget: 'dxButton',
                        options: {
                            text: '일괄등록',
                            onClick(e) {
                                viewOptions.bulkRegisterPopupInstance.show();
                            }
                        }
                    },
                    {
                        location: 'before',
                        widget: 'dxButton',
                        options: {
                            text: '사물함위치별 요금설정',
                            onClick(e) {
                                viewOptions.bulkFeePopupInstance.show();
                            }
                        }
                    },
                    'addRowButton',
                    {
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            icon: 'minus',
                            disabled: true,
                            onClick() {
                                viewOptions.infoGridInstance.getSelectedRowKeys().forEach((key) => {
                                    //employeesStore.remove(key);
                                });
                                viewOptions.infoGridInstance.refresh();
                            },
                        },
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            icon: 'refresh',
                            onClick() {
                                viewOptions.infoGridInstance.refresh();
                            }
                        },

                    },
                    'exportButton','columnChooserButton',
                ]
            },
            onInitialized(e) {
                viewOptions.infoGridInstance = e.component;
            },
            onExporting: infoGridExportingToExcel,
            onRowDblClick(e) {
                viewOptions.infoGridInstance.editRow(e.rowIndex);
            },
            onSelectionChanged(e) {
                e.component.option('toolbar.items[3].options.disabled', !e.selectedRowsData.length);
            },
        },
        infoGridFilterToolbarOptions: {
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
                    }
                },
                {
                    location: 'before',
                    widget: 'dxSelectBox',
                    options: {
                        label: '사물함상태',
                        labelMode: 'floating',
                        dataSource: new DevExpress.data.ArrayStore({
                            key: 'Code',
                            data: status
                        }),
                        displayExpr: 'Name',
                        valueExpr: 'Code',
                    }
                },
                {
                    location: 'after',
                    widget: 'dxButton',
                    options: {
                        text: '검색',
                        stylingMode:'contained',
                        type:'default',
                        width : 80,
                    }
                }
            ]
        },
    };

    ko.components.register('fee-multiselect-grid', {
        viewModel: function (params) {
            const feeMultiselectGridOptions = function(){
                const toolbars = {
                    items :[
                        {
                            location: 'after',
                            widget: 'dxButton',
                            options: {
                                icon: 'refresh',
                                onClick(e) {
                                    DevExpress.ui.dxDataGrid.getInstance(e.element.closest('.hs-fee-grid-container')).refresh();
                                }
                            },
                        },
                    ]
                };
                const columns = [
                    {
                      dataField: 'FeeCategory',
                      caption :'요금구분',
                      calculateDisplayValue : 'FeeCategoryName'
                    },
                    {
                        dataField :'ItemCode',
                        caption : '품목코드',
                    },
                    {
                        dataField: 'ItemName',
                        caption:'요금명'
                    },
                    {
                        dataField :'RentalMonths',
                        caption :'임대개월수',
                        dataType :'number',
                    },
                    {
                        dataField: 'UnitFee',
                        caption : '금액',
                        format : 'currency',
                        dataType: 'number',
                    },
                    {
                        dataField: 'Taxable',
                        caption: '과세구분',
                        dataType: 'boolean',
                        alignment: 'left',
                        showEditorAlways : false,
                        calculateDisplayValue: (rowData) =>{
                            const {Name} = taxableData.find(({Value})=> Value === rowData.Taxable) || {};
                            return Name;
                        },
                    },
                    {
                        dataField :'Remark',
                        caption :'비고',
                    }
                ];

                const onSelectionChanged=(e)=>{
                    const selectedItemKeys = e.component.getSelectedRowKeys();
                    params.parentOptions.component.updateData(params.parentOptions.dataField, selectedItemKeys);
                }

                return {
                    columns : columns,
                    toolbar : toolbars,
                    rowAlternationEnabled : true,
                    focusedRowEnabled: true,
                    showRowLines: true,
                    height :200,
                    selection : {
                        mode: 'multiple',
                    },
                    loadPanel: {enabled: true},
                    dataSource : params.dataSource,
                    onSelectionChanged : params.onSelectionChanged || onSelectionChanged,
                    parentOptions : params.parentOptions,
                };
            };

            this.gridOptions = new feeMultiselectGridOptions();
        },
        template: `<div data-bind="dxDataGrid: gridOptions" class="hs-fee-grid-container"></div>`
    });

    ko.applyBindings(viewOptions);

    const feeStore = new DevExpress.data.ArrayStore({
        key: 'ItemCode',
        data: fees
    });

    const lockerStore = new DevExpress.data.ArrayStore({
        key: 'ID',
        data: getLockers(200)
    })

    const locationStore = new DevExpress.data.ArrayStore({
        key: 'Code',
        data: locations
    })

    viewOptions.locationGridOptions.dataSource(locationStore);
    viewOptions.feeGridOptions.dataSource(feeStore);
    viewOptions.infoGridOptions.dataSource(lockerStore);

    function infoGridExportingToExcel(e) {

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
        }).then(()=>{
            workbook.xlsx.writeBuffer().then(function (buffer) {
                saveAs(new Blob([buffer], {type: 'application/octet-stream'}), `사물함목록-\${new Date().formatDateString('yyyyMMddHHmmss')}.xlsx`);
            });
        });
        e.cancel = true;
    }

    function productCategoryTemplate(container, options) {
        const dataSource = [
            {
                "id": "1",
                "text": "체육시설",
                "expanded": true,
                "items": [
                    {
                        "id": "1_1",
                        "text": "사물함",
                    },
                ]
            },
            {
                "id": "2",
                "text": "문화시설",
                "expanded": true,
                "items": [
                    {
                        "id": "2_1",
                        "text": "사물함",
                    },
                ]
            }
        ];

        $('<div>').dxTreeView({
            dataSource: dataSource,
            selectionMode: 'single',
            focusStateEnabled : false,
            selectByClick: true,
            onContentReady(args) {
                syncTreeViewSelection(args.component, options.value);
            },
            onItemSelectionChanged(args) {
                const selectedKeys = args.component.getSelectedNodeKeys();
                options.setValue(selectedKeys[0]);
            },
        }).appendTo(container);
    }

</script>
</body>

</html>
