<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>입장권매표관리-거래취소</title>
    <link rel="stylesheet" href="/fmcs/css/ticket/paymentCancel.css" type="text/css"/>
</head>
<body class="dx-viewport">
<div class="row row_title">
    <div class="col-12">
        <ul class="navbar-nav">
            <li class="nav-item d-sm-inline-block quick-nav">
                입장권매표관리
            </li>
            <li class="nav-item d-sm-inline-block quick-nav hs-last">
                <a href="/fmcs/ticket/sale"><i class="fa fa-ticket fa-lg" aria-hidden="true"></i></a>
            </li>
        </ul>
    </div>
</div>
<div data-bind="dxBox:{
    direction: 'row',
    width : '100%',
    height: '100%',
}">
    <div data-options="dxItem : { ratio : 1}" class="hs-main-west-container">
        <div class="m10">
            <div data-bind="dxDateBox:{
            width : '50%',
            height:40,
            displayFormat :'yyyy-MM-dd',
            value  : new Date(),
            showClearButton: true,
            applyValueMode :'useButtons',
            applyButtonText : '확인',
            openOnFieldClick : true,
        }"></div>
            <div data-bind="dxSelectBox: $parent.receiptSearchOptions" class="mt10 hs-receipt-search-container"></div>
        </div>
        <div class="hs-return-empty-text" data-bind="visible: !$parent.selectedReceipt()">
            <div>
                <div>
                 <span class="hs-return-empty-icon-text">
                    <i class="dx-icon-return"></i>
                </span>
                </div>
                <div><span class="hs-return-text">환불정보를 입력하세요.</span></div>
            </div>
        </div>
        <div class="hs-return-main-container" data-bind="visible : $parent.selectedReceipt(), with:$parent.selectedReceipt">
            <div data-bind="dxToolbar:{}" class="mt10 pr10">
                <div data-options="dxItem : {
                    widget : 'dxButton',
                    location:'after',
                    options:{
                        text:'거래취소',
                        stylingMode: 'contained',
                        type:'default',
                        height:38,
                        onClick(e){
                            viewOptions.cancelPopupInstance.show();
                        }
                    }
                }"></div>
                <div data-options="dxItem : {
                    widget : 'dxButton',
                    location:'after',
                    options:{
                        icon : 'print',
                        stylingMode: 'contained',
                        type:'default',
                        onClick(e){

                        }
                    }
                }"></div>
            </div>
            <div class="hs-return-main-box">
                <div class="m10"><h2 data-bind="text:receiptNumberFormat(ReceiptNo)"></h2></div>
                <div class="m10 mt20 mb20">
                    <h4>구매정보</h4>
                    <div class="hs-return-unit-box">
                        <div>
                            <div><span class="hs-return-label">상품명</span></div>
                            <div><span class="hs-return-value" data-bind="text: ProductName"></span></div>
                        </div>
                        <div>
                            <div><span class="hs-return-label">매표일자</span></div>
                            <div><span class="hs-return-value" data-bind="text:SaleDate"></span></div>
                        </div>
                        <div>
                            <div><span class="hs-return-label">이름</span></div>
                            <div><span class="hs-return-value" data-bind="text:MemberInfo.Name"></span></div>
                        </div>
                        <div>
                            <div><span class="hs-return-label">핸드폰번호</span></div>
                            <div><span class="hs-return-value" data-bind="text:MemberInfo.MobileNumber"></span></div>
                        </div>
                    </div>
                </div>
                <div class="hs-return-line"></div>
                <div class="m10 mt20">
                    <h4>결제정보</h4>
                    <div class="hs-return-unit-box">
                        <div>
                            <div><span class="hs-return-label">결제수단</span></div>
                            <div><span class="hs-return-value" data-bind="text:formatPaymentMethod(PaymentInfo)"></span></div>
                        </div>
                        <div>
                            <div><span class="hs-return-label">결제일자</span></div>
                            <div><span class="hs-return-value" data-bind="text:TransactionDate"></span></div>
                        </div>
                        <div>
                            <div><span class="hs-return-label">결제금액</span></div>
                            <div><span class="hs-return-value" data-bind="text : formatCurrency(TotalAmount)"></span></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <div data-options="dxItem : { ratio: 3}">
        <div class="hs-return-detail-empty-container" data-bind="visible: !$parent.selectedReceipt()"></div>
        <div class="hs-return-detail-container" data-bind="visible: $parent.selectedReceipt()">
            <div data-bind="dxBox:{
            direction:'col',
            width : '100%',
            height:'calc(100vh - 40px)'
        }">
                <div data-options="dxItem:{ratio:1}" class="m10">
                    <div data-bind="dxDataGrid : $parents[1].purchaseHistoryGridOptions" class="hs-purchase-grid-container"></div>
                </div>
                <div data-options="dxItem:{ratio:1}" class="m10">
                    <div data-bind="dxDataGrid : $parents[1].paymentDetailGridOptions" class="hs-payment-grid-container"></div>
                </div>
            </div>

        </div>
    </div>
</div>
<div class=hs-hidden" id="receipt-barcode-search-popup" data-bind="dxPopup: {
    title  :'영수증의 바코드 검색',
    width : 540,
    height: 580,
    visible :false,
    onInitialized(e){
        receiptBarcodeSearchPopupInstance = e.component;
    },
    toolbarItems: [

        {
            widget: 'dxButton',
            toolbar: 'bottom',
            location: 'after',
            options: {
                text: '확인',
                onClick:function(e){

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
                    receiptBarcodeSearchPopupInstance.hide();
                }
            },

        },
    ],
}">
    <div data-options="dxTemplate : {name:'content'}">
        <div data-bind="dxForm:{
            colCount : 1,
            labelLocation : 'top',
            showColonAfterLabel:false,
            items : [
                {
                    dataField :'BarcodeNumber',
                    label : {
                        text :'영수증에 출력된 바코드를 리더기에 읽혀주세요.'
                    },
                }
            ],
            onInitialized(e){
                receiptBarcodeSearchFormInstance = e.component;
            }
        }"></div>
    </div>
</div>


<div class="hs-hidden" data-bind="dxPopup:{
    title :'거래취소',
    width : 680,
    height : 580,
    onInitialized(e){
        cancelPopupInstance = e.component;
    },
    onShowing(e){
        const selectedReceipt = e.model.selectedReceipt();
        const formData = {
            ReceiptNo :selectedReceipt.ReceiptNo,
            ProductName : selectedReceipt.ProductName,
            PaymentMethodName : selectedReceipt.PaymentMethod === 'Card' ? selectedReceipt.PaymentInfo.MethodName + '(' + selectedReceipt.PaymentInfo.MethodDetail + ')' : selectedReceipt.PaymentInfo.MethodName,
            MemberName  : selectedReceipt.MemberInfo.Name,
            TotalAmount : selectedReceipt.TotalAmount,
            CancelDate : new Date(),
        };
        e.model.cancelFormInstance.getEditor('CancelMethod').option('items[0].visible',selectedReceipt.PaymentMethod === 'Card'?true:false);
        e.model.cancelFormInstance.getEditor('CancelMethod').option('items[1].visible',selectedReceipt.PaymentMethod === 'Card'?true:false);
        e.model.cancelFormOptions.formData(formData);
    },
    onHiding(e){
        e.model.cancelFormInstance.resetOption('formData');
        e.component.hide();
    },
    toolbarItems: [

        {
            widget: 'dxButton',
            toolbar: 'bottom',
            location: 'after',
            options: {
                text: '거래취소하기',
                onClick:function(e){
                    viewOptions.cancelFormInstance.validate();
                }
            },

        },
        {
            widget: 'dxButton',
            toolbar: 'bottom',
            location: 'after',
            options: {
                text: '닫기',
                onClick(e) {
                    cancelPopupInstance.hide();
                }
            },

        },
    ],
}" id="cancel-popup">
    <div data-options="dxTemplate:{name :'content'}">
        <div data-bind="dxForm : cancelFormOptions"></div>
    </div>
</div>

<script type="text/html" id="receipt-search-item-template">
<div class="hs-receipt-search-item-container">
    <div>
        <div class="hs-receipt-search-no-container">
            <span>영수증번호</span> <span data-bind="text: ReceiptNo"></span>
        </div>
        <div>
            <span data-bind="text:TransactionDate" class="hs-receipt-search-date-text"></span>
            <span class="fa-stack fa-md hs-receipt-search-payment-method-text">
                <i class="fa-solid fa-circle fa-stack-2x"></i>
                <i class="fa-stack-1x fa-inverse" data-bind="css : {'fa fa-credit-card':PaymentMethod == 'Card', 'fa-solid fa-won-sign':PaymentMethod =='Cash'}"></i>
            </span>
            <span data-bind="text:PaymentLocationName" class="hs-receipt-search-payment-location-text"></span>
        </div>
    </div>
    <div>
        <div class="hs-receipt-search-member-container"><span data-bind="text:MemberInfo.Name"></span> / <span data-bind="text:MemberInfo.MobileNumber"></span></div>
        <div class="hs-receipt-search-price-container">
            <span data-bind="text:formatCurrency(TotalAmount)"></span>
        </div>
    </div>
    <div class="hs-receipt-search-button-container">
        <div class="hs-cancel-button-container">
            <div data-bind="dxButton:{
            text :'거래취소',
            height :30,
            stylingMode: 'outlined',
            type:'default',
            onClick(e){
                viewOptions.selectedReceipt($data);
                viewOptions.cancelPopupInstance.show();
            }
        }" class="hs-receipt-search-button"></div>
            <div data-bind="dxButton:{
            icon :'print',
            height :30,
            stylingMode: 'text',
            type:'default',
        }" class="hs-receipt-search-button"></div>
        </div>
    </div>

</div>
</script>
<script type="text/html" id="cancel-date-help-text">
    <div class="hs-cancel-date-box"><span>카드취소의 경우에는 거래취소일 변경이 불가합니다.</span></div>
</script>
<script type="text/html" id="group-cell-template">
    <span data-bind="text:displayValue"></span>
</script>
<script type="text/javascript" src="/fmcs/js/ticket/paymentCancel.js"></script>
<script type="text/javascript" src="/backOffice/DevExtreme/22.1.5/js/devextreme/exceljs.min.js"></script>
<script type="text/javascript" src="/backOffice/DevExtreme/22.1.5/js/devextreme/FileSaver.min.js"></script>
<script type="text/javascript">
    const viewOptions = {
        receiptBarcodeSearchPopupInstance : {},
        receiptBarcodeSearchFormInstance : {},
        receiptSearchOptions : {
            dataSource : new DevExpress.data.ArrayStore({
                key : 'ReceiptNo',
                data :receiptSearchData,
            }),
            searchExpr: ['ReceiptNo','MemberInfo.Name', 'MemberInfo.MobileNumber'],
            valueExpr:'ReceiptNo',
            displayExpr :'ReceiptNo',
            searchTimeout: 300,
            placeholder : '영수증번호 또는 회원정보를 입력하세요.',
            mode: 'search',
            searchEnabled:true,
            showClearButton: true,
            minSearchLength: 1,
            itemTemplate : $('#receipt-search-item-template'),
            dropDownOptions: {
                minWidth: 560,
            },
            buttons :[
                'clear',
                {
                    name: 'barcode-reader',
                    location: 'after',
                    options: {
                        icon : 'fa-solid fa-barcode',
                        stylingMode :'text',
                        onClick() {
                            viewOptions.receiptBarcodeSearchPopupInstance.show();
                        }
                    }
                }
            ],
            onValueChanged(e){
                const selectedItem = e.component.option('selectedItem');
                viewOptions.selectedReceipt(selectedItem);
            },

        },
        selectedReceipt : ko.observable(),
        purchaseHistoryGridInstance : {},
        purchaseHistoryGridOptions : {
            dataSource : ko.observable(),
            paging : {
                enabled: false,
            },
            showBorders: true,
            selection: {
                mode: 'single',
            },
            showRowLines: true,
            rowAlternationEnabled : true,
            focusedRowEnabled: true,
            allowColumnResizing: true,
            height : '100%',
            scrolling: {
                useNative: false,
                scrollByContent: true,
                scrollByThumb: true,
                showScrollbar: "onHover"
            },
            columnChooser :{
                enabled:true,
                mode :  'select',
            },
            columns : [
                {
                    dataField :'ProgramId',
                    caption : '프로그램명',
                    calculateDisplayValue: 'ProgramName',
                    groupIndex: 0,
                    groupCellTemplate: $('#group-cell-template'),
                },
                {
                    dataField:'RoundOfUseId',
                    calculateDisplayValue : 'RoundOfUseName',
                    caption:'회차',
                    dataType: 'string',
                },
                {
                    dataField: 'StartTime',
                    caption :'시작시간'
                },
                {
                    dataField: 'EndTime',
                    caption: '종료시간'
                },
                {
                    caption : '상품명',
                    dataField: 'ProductId',
                    calculateDisplayValue: 'ProductName',
                    dataType: 'string',
                },
                {
                    dataField: 'Quantity',
                    caption: '수량',
                    dataType :'number'
                },
                {
                    dataField: 'UnitPrice',
                    caption: '판매단가',
                    dataType :'number',
                    format: 'currency'
                },
                {
                    dataField: 'DiscountRate',
                    caption :'할인율',
                    dataType: 'number',
                    format :'percent'
                },
                {
                    dataField: 'SalePrice',
                    caption :'할인금액',
                    dataType: 'number',
                    format :'currency',
                },
                {
                    dataField: 'NetAmount',
                    caption : '판매금액',
                    dataType: 'number',
                    format :'currency',
                },
                {
                    dataField: 'TaxAmount',
                    caption :'부가세',
                    dataType: 'number',
                    format :'currency',
                },
                {
                    dataField: 'TotalAmount',
                    visible:false,
                    dataType:'number',
                    format:'currency',
                    showInColumnChooser : false,
                },
                {
                    dataField: 'DiscountReasonCode',
                    calculateDisplayValue: 'DiscountReasonName',
                    caption :'할인사유'
                },
                {
                    dataField: 'DiscountedPerson',
                    caption :'감면자정보'
                }
            ],
            toolbar : {
                items : [
                    {
                        location : 'before',
                        text :'구매내역',
                        cssClass : 'hs-sale-date-text',
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            icon: 'refresh',
                            onClick() {
                                viewOptions.purchaseHistoryGridInstance.refresh();
                            }
                        },
                    },
                    'exportButton','columnChooserButton',
                ]
            },
            export: {
                enabled: true
            },
            summary: {
                groupItems: [{
                    column: 'Quantity',
                    summaryType: 'sum',
                    displayFormat: '수량 : {0}',
                    showInGroupFooter: true,
                    alignByColumn: true,
                }, {
                    column: 'NetAmount',
                    summaryType: 'sum',
                    valueFormat: 'currency',
                    displayFormat: 'SubTotal: {0}',
                    showInGroupFooter: true,
                    alignByColumn: true,
                }, {
                    column: 'TaxAmount',
                    summaryType: 'sum',
                    valueFormat: 'currency',
                    showInGroupFooter: true,
                    alignByColumn: true,
                    displayFormat: 'VAT: {0}',
                }, {
                    column: 'TotalAmount',
                    summaryType: 'sum',
                    valueFormat: 'currency',
                    displayFormat: 'Total: {0}',
                    showInGroupFooter: true,
                    showInColumn: 'DiscountedPerson'
                }],
                totalItems: [{
                    column: 'TotalAmount',
                    summaryType: 'sum',
                    valueFormat: 'currency',
                    displayFormat: 'Total: {0}',
                    showInColumn: 'DiscountedPerson',
                }],

            },
            onExporting(e) {
                const workbook = new ExcelJS.Workbook();
                const purchaseSheet = workbook.addWorksheet('구매내역');
                const paymentSheet = workbook.addWorksheet('결제내역');

                DevExpress.excelExporter.exportDataGrid({
                    worksheet: purchaseSheet,
                    component: e.component,
                    customizeCell: function (options) {
                        const { excelCell } = options;
                        excelCell.font = {name: 'Arial', size: 12};
                        excelCell.alignment = {horizontal: 'left'};
                    }
                }).then(() => DevExpress.excelExporter.exportDataGrid({
                        worksheet: paymentSheet,
                        component: viewOptions.paymentDetailGridInstance,
                        customizeCell: function (options) {
                            const { excelCell } = options;
                            excelCell.font = {name: 'Arial', size: 12};
                            excelCell.alignment = {horizontal: 'left'};

                        }
                    })).then(()=> {
                    workbook.xlsx.writeBuffer().then((buffer) => {
                        saveAs(new Blob([buffer], {type: 'application/octet-stream'}), `\${viewOptions.selectedReceipt().MemberInfo.Name} (\${viewOptions.selectedReceipt().ReceiptNo}).xlsx`);
                    });
                });
                e.cancel = true;
            },
            onInitialized(e){
                viewOptions.purchaseHistoryGridInstance = e.component;
            }
        },
        paymentDetailGridInstance :{},
        paymentDetailGridOptions : {
            dataSource : ko.observable(),
            paging : {
                enabled: false,
            },
            showBorders: true,
            selection: {
                mode: 'single',
            },
            rowAlternationEnabled : true,
            focusedRowEnabled: true,
            showRowLines: true,
            allowColumnResizing: true,
            height : '100%',
            columnChooser :{
                enabled:true,
                mode :  'select',
            },
            columns : [
                {
                    caption: '결제순번',
                    dataType:'number',
                    dataField: 'Seq',
                },
                {
                    caption :'결제방식',
                    dataType: 'string',
                    dataField :'PaymentLocationCode',
                    calculateDisplayValue : 'PaymentLocationName',

                },
                {
                    caption : '결제수단',
                    dataType: 'string',
                    dataField: 'PaymentMethodCode',
                    calculateDisplayValue: 'PaymentMethodName'
                },
                {
                    caption : '결제상세',
                    dataType: 'string',
                    dataField: 'PaymentMethodDetailCode',
                    calculateDisplayValue: 'PaymentMethodDetailName',
                },
                {
                    caption : '결제금액',
                    dataType: 'number',
                    format:'currency',
                    dataField: 'PaidAmount',
                },
                {
                    caption: '결제일자',
                    dataType : 'date',
                    format :'yyyy-MM-dd HH:mm:ss',
                    dataField: 'PaidDate',
                    alignment:'center',
                },
                {
                    caption: '취소일자',
                    dataType:'date',
                    alignment:'center',
                    format : 'yyyy-MM-dd HH:mm:ss',
                    dataField: 'PaidCancelDate'
                },
                {
                    caption:'상태',
                    dataType: 'string',
                    dataField :'PaidStatusCode',
                    calculateDisplayValue: 'PaidStatusName',
                }
            ],
            toolbar : {
                items : [
                    {
                        location : 'before',
                        text :'결제내역',
                        cssClass : 'hs-sale-date-text',
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            icon: 'refresh',
                            onClick() {
                                viewOptions.paymentDetailGridInstance.refresh();
                            }
                        },
                    },'columnChooserButton',
                ]
            },
            onInitialized(e){
                viewOptions.paymentDetailGridInstance = e.component;
            },
            summary : {
                totalItems: [
                    {
                        name: 'ApprovedCount',
                        summaryType: 'custom',
                        displayFormat: '승인: {0}건',
                        showInColumn: 'Seq',
                    },
                    {
                        name: 'CanceledCount',
                        summaryType: 'custom',
                        displayFormat: '취소: {0}건',
                        showInColumn: 'PaymentLocationCode'

                    },
                    {
                        column : 'PaidAmount',
                        summaryType: 'sum',
                        displayFormat: 'Total: {0}',
                        valueFormat: 'currency',
                    }
                ],
                calculateCustomSummary(options) {

                    if (options.name === 'ApprovedCount') {
                        if (options.summaryProcess === 'start') {
                            options.totalValue = 0;
                        }
                        if (options.summaryProcess === 'calculate') {

                            if(options.value) {
                                if(options.value.PaidStatusCode === '0001') {
                                    options.totalValue = options.totalValue + 1;
                                }
                            }
                        }
                    }

                    if(options.name ==='CanceledCount') {
                        if (options.summaryProcess === 'start') {
                            options.totalValue = 0;
                        }
                        if (options.summaryProcess === 'calculate') {

                            if(options.value) {
                                if(options.value.PaidStatusCode === '0002') {
                                    options.totalValue = options.totalValue + 1;
                                }
                            }
                        }
                    }
                },
            }
        },
        removeReceipt : function(){
            viewOptions.selectedReceipt(null);
        },
        cancelPopupInstance : {},
        cancelFormInstance: {},
        cancelFormOptions : {
            formData : ko.observable(),
            colCount:2,
            items :[
                {
                    colSpan:2,
                    label : {
                        text :'영수증번호',

                    },
                    cssClass: 'hs-view-mode',
                    dataField :'ReceiptNo',
                    editorOptions : {
                        readOnly:true,
                    }
                },
                {
                    dataField :'ProductName',
                    label : {
                        text:'구매상품명',
                    },
                    cssClass: 'hs-view-mode',
                    editorOptions : {
                        readOnly:true,
                    }
                },
                {
                    dataField :'MemberName',
                    label : {
                        text :'구매자명'
                    },
                    cssClass: 'hs-view-mode',
                    editorOptions : {
                        readOnly:true,
                    }
                },
                {
                    dataField :'PaymentMethodName',
                    label  :{
                        text :'결제수단'
                    },
                    cssClass: 'hs-view-mode',
                    editorOptions : {
                        readOnly:true,
                    }
                },
                {
                    dataField :'TotalAmount',
                    label : {
                        text :'결제금액'
                    },
                    editorType:'dxNumberBox',
                    editorOptions : {
                        format : '#,##0원',
                        readOnly: true
                    },
                    cssClass: 'hs-view-mode'
                },
                {
                    colSpan: 2,
                    dataField: 'CancelMethod',
                    editorType:'dxRadioGroup',
                    cssClass : 'hs-cancel-method-box',
                    helpText :'(* 카드 수동취소는  PG/ VAN   수동으로 최소한경우 선택합니다!!)',
                    label : {
                        text:'거래취소방법',
                        location :'top',
                        showColon: false,
                    },
                    isRequired : true,
                    editorOptions : {
                        items :[
                            {
                                ID : '0001',
                                Text :'카드취소',
                            },
                            {
                                ID : '0002',
                                Text :'카드 수동취소',
                            },
                            {
                                ID : '0003',
                                Text :'계좌환불',
                            },
                            {
                                ID :'0004',
                                Text : '현금환불',
                            }
                        ],
                        displayExpr :'Text',
                        valueExpr :'ID',
                        layout :'horizontal',
                        onValueChanged(e){
                            if(e.value === '0003') {
                                viewOptions.cancelFormInstance.itemOption('BankAccountGroup', 'visible',true);
                            } else {
                                viewOptions.cancelFormInstance.itemOption('BankAccountGroup', 'visible',false);

                                if(e.value === '0001') {
                                    viewOptions.cancelFormInstance.getEditor('CancelDate').option('value',new Date());
                                    viewOptions.cancelFormInstance.getEditor('CancelDate').option('disabled',true);
                                } else {
                                    viewOptions.cancelFormInstance.getEditor('CancelDate').option('disabled',false);
                                }
                            }
                        }
                    }
                },
                {
                    label : {
                        text :'거래취소일',
                        showColon: false,
                    },
                    dataField: 'CancelDate',
                    editorType : 'dxDateBox',
                    editorOptions : {
                        displayFormat : 'yyyy-MM-dd',
                        applyValueMode: 'useButtons',
                        applyButtonText : '확인',
                        openOnFieldClick : true,
                    }
                },
                {
                    itemType :'group',
                    template : $('#cancel-date-help-text')
                },
                {
                    colSpan: 2,
                    itemType :'group',
                    name :'BankAccountGroup',
                    caption :'계좌정보',
                    visible:false,
                    items :[
                        {
                            label : {
                                text :'계좌번호' ,
                                showColon : false,
                            },
                            editorType: 'dxTextBox',
                            dataField :'BackAccountNo'
                        },
                        {
                            label : {
                                text :'은행명',
                                showColon : false,
                            },
                            editorType :'dxSelectBox',
                            dataField :'BankCode',
                            editorOptions : {
                                dataSource : new DevExpress.data.ArrayStore({
                                    key : 'ID',
                                    data : bankingData
                                }),
                                valueExpr : 'ID',
                                displayExpr :'Text',
                            }
                        },
                        {
                            label : {
                                text :'예금주',
                                showColon : false,
                            },
                            editorType: 'dxTextBox',
                            dataField: 'BankOwnerName',
                        }
                    ]
                }

            ],
            onInitialized(e){
                viewOptions.cancelFormInstance = e.component;
            }
        },

    };

    viewOptions.selectedReceipt.subscribe(function (newValue) {

            const historyStore = new DevExpress.data.ArrayStore({
                key : 'ID',
                data :purchaseHistoryData,
            });
            viewOptions.purchaseHistoryGridOptions.dataSource(historyStore);

            const paymentDetailStore = new DevExpress.data.ArrayStore({
                key :'ID',
                data : paymentDetailData,
            });

            viewOptions.paymentDetailGridOptions.dataSource(paymentDetailStore);

    });
    ko.applyBindings(viewOptions);

</script>
</body>
</html>
