<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>입장권매표예약상세정보</title>
    <link rel="stylesheet" href="/fmcs/css/ticket/bookingDetail.css" type="text/css"/>
</head>
<body>

<div class="hs-main-container">
    <div class="row row_title">
        <div class="col-12">
            <ul class="navbar-nav">
                <li class="nav-item d-sm-inline-block quick-nav">
                    입장권매표예약상세정보
                </li>
                <li class="nav-item d-sm-inline-block quick-nav hs-last">
                    <a href="/fmcs/ticket/booking"><i class="fa-solid fa-table-list"></i></a>
                </li>
            </ul>
        </div>
    </div>
    <div data-bind="dxToolbar :{
        height : 90,
        onInitialized(e){
            mainToolbarInstance = e.component;
        }
    }" class="p10 hs-main-toolbar">
        <div data-options="dxItem  :{
            widget : 'dxButton',
            location :'after',
            cssClass :'hs-main-button mr10',
            options : {
                text :'결 제',
                width : 140,
                height : 70,
                visible : viewOptions.bookingInfoFormOptions.formData().PaymentStatusCode === '0001',
                onClick(e) {
                    viewOptions.checkoutPopupInstance.toggle(true);
                }
            }
        }">
        </div>
        <div class="mr10" data-options="dxItem  :{
            widget : 'dxButton',
            location :'after',
            cssClass :'hs-main-button',
            options : {
                text :'예약취소',
                width : 140,
                height : 70,
                visible : viewOptions.bookingInfoFormOptions.formData().PaymentStatusCode === '0001',
                onClick(e) {

                }
            }
        }" >
        </div>
    </div>
    <div  data-bind="dxScrollView : {
            width : '100%',
            height : '100%',
    }">
        <div data-bind="dxBox : {
            direction: 'col',
            width : '100%',
            height : '100%',
        }">
            <div data-options="dxItem : { baseSize : 250}">
                <div data-bind="dxForm : $parents[0].bookingInfoFormOptions" class="hs-detail-form-container p10"></div>
            </div>
            <div data-options="dxItem : { baseSize : 800 }">
                <div data-bind="dxDataGrid : $parents[0].purchaseHistoryGridOptions" class="hs-purchase-grid-container p10"></div>
            </div>
            <div data-options="dxItem : { baseSize : 500 }">
                <div data-bind="dxDataGrid : $parents[0].paymentHistoryGridOptions" class="hs-payment-grid-container p10"></div>
            </div>
        </div>
    </div>
</div>
<div id="checkout-popup" data-bind="dxPopup:{
    wrapperAttr: {
        id: 'checkout-popup',
        class: 'hs-checkout-popup-container'
    },
    height : '100vh',
    width : '30%',
    position: {
      at: 'right top',
      my: 'top',
      collision: 'fit',
    },
    dragEnabled:false,
    visible:false,
    shading : true,
    shadingColor:'rgba(0,0,0,.8)',
    animation : {
        show: {
            type: 'slideIn',
            direction :'right',
            duration: 400,
        },
        hide: {
            type:'slideOut',
            duration: 400,
            direction : 'right',
        }
    },
    onInitialized(e){
        checkoutPopupInstance = e.component;
    }

}" class="hs-hidden">
    <div data-options="dxTemplate : {name :'content'}"></div>
    <div class="hs-checkout-container">
        <div class="hs-checkout-total-title"><span>결제금액</span></div>
        <div class="hs-checkout-total-price"><span class="hs-checkout-krw-text"><i class="fa-solid fa-won-sign"></i></span><span  class="hs-checkout-total-price-text" data-bind="text:formatNumber(TotalAmount())"></span></div>
    </div>
    <div class="hs-checkout-method-container">
        <h4>결제수단</h4>
        <div class="hs-checkout-method-button-container">
            <div data-bind="dxButton: cardButtonOptions"></div>
            <div data-bind="dxButton: cashButtonOptions"></div>
            <div data-bind="dxButton: payButtonOptions"></div>
        </div>
    </div>
    <div class="hs-checkout-receipt-container">
        <div class="hs-checkbox-receipt-row">
            <div class="hs-checkout-receipt-header">판매금액</div>
            <div class="hs-checkout-receipt-body"><span data-bind="text: formatNumber(SubTotalAmount())"></span><span class="ml05">원</span></div>
        </div>
        <div class="hs-checkbox-receipt-row">
            <div class="hs-checkout-receipt-header">할인</div>
            <div class="hs-checkout-receipt-body"><span data-bind="text: formatNumber(DiscountAmount())"></span><span class="ml05">원</span></div>
        </div>
        <div class="hs-checkbox-receipt-row">
            <div class="hs-checkout-receipt-header">부가세</div>
            <div class="hs-checkout-receipt-body"><span data-bind="text : formatNumber(TaxAmount())"></span><span class="ml05">원</span></div>
        </div>
        <div class="hs-checkbox-receipt-row">
            <div class="hs-checkout-receipt-header">합계</div>
            <div class="hs-checkout-receipt-body"><span data-bind="text : formatNumber(TotalAmount())"></span><span class="ml05">원</span></div>
        </div>
    </div>
    <div class="hs-checkout-button-container">
        <div data-bind="dxButton : {
            text :'결제하기',
            width: '45%',
            template : $('#cart-payment-button-template'),
            onClick(e){
                DevExpress.ui.notify({
                    message: '결제완료',
                    width: 320
                }, 'success', 1000);
            }
        }"></div>
        <div data-bind="dxButton : {
            text :'결제취소',
            width: '45%',
            template : $('#cart-payment-button-template'),
            onClick(e){
                viewOptions.checkoutPopupInstance.toggle(false);
            }
        }"></div>
    </div>
</div>
<script type="text/html" id="cart-payment-button-template">
    <div class="hs-cart-payment-button">
        <div><span data-bind="text: text"></span></div>
    </div>
</script>
<script type="text/html" id="simple-icon-button-template">
    <div class="locker-payment-button">
        <i class="fa-2x" data-bind="css: icon"></i>
        <div class="mt15"><span data-bind="text : text"></span></div>
    </div>
</script>
<script type="text/html" id="stack-icon-button-template">
    <div class="locker-payment-button">
        <div>
            <span class="fa-stack fa-1x">
            <i class="fa-regular fa-circle fa-stack-2x"></i>
            <i class=fa-stack-1x" data-bind="css : icon"></i>
          </span>
        </div>
        <div class="mt15"><span data-bind="text : text"></span></div>
    </div>
</script>
<script type="text/javascript" src="/backOffice/DevExtreme/22.1.5/js/devextreme/exceljs.min.js"></script>
<script type="text/javascript" src="/backOffice/DevExtreme/22.1.5/js/devextreme/FileSaver.min.js"></script>
<script type="text/javascript" src="/fmcs/js/ticket/bookingDetail.js"></script>
<script type="text/javascript">
    const viewOptions = {
        mainToolbarInstance: {},
        bookingInfoFormInstance : {},
        bookingInfoFormOptions : {
            formData  : ko.observable(null),
            colCount : 2,
            width : '100%',
            showColonAfterLabel: false,
            items : [
                {
                    itemType :'group',
                    colCount : 2,
                    caption :'예약정보',
                    items : [
                        {
                            label : {
                                text :'예약번호',
                            },
                            cssClass: 'hs-view-mode',
                            dataField :'BookingNumber',
                            editorType :'dxTextBox',
                        },
                        {
                            label : {
                                text :'예약일자',
                            },
                            dataField: 'BookingDate',
                            cssClass: 'hs-view-mode',
                        },
                        {
                            label : {
                                text :'예약자',
                            },
                            dataField: 'BookingPersonInfo.Name',
                            cssClass: 'hs-view-mode',
                        },
                        {
                            label : {
                                text :'핸드폰번호',
                            },
                            dataField: 'BookingPersonInfo.MobileNumber',
                            cssClass: 'hs-view-mode',
                        },
                        {
                            label : {
                                text :'예약상태'
                            },
                            dataField: 'BookingStatusName',
                            cssClass: 'hs-view-mode',
                        },
                        {
                            label : {
                                text :'결제상태',
                            },
                            dataField: 'PaymentStatusName',
                            cssClass: 'hs-view-mode',
                        },
                        {
                            label : {
                                text :'이용일자',
                            },
                            dataField: 'DateOfUse',
                            cssClass: 'hs-view-mode',
                        },
                        {
                            label : {
                                text :'결제금액',
                            },
                            dataField: 'TotalAmount',
                            cssClass: 'hs-view-mode',
                            editorType : 'dxNumberBox',
                            editorOptions : {
                                format :'currency',
                            }
                        }
                    ]
                },
                {
                    itemType :'group',
                    colCount : 2,
                    caption :'판매정보',
                    items : [
                        {
                            label : {
                                text :'판매자',
                            },
                            dataField :'RecipientUserName',
                            cssClass: 'hs-view-mode',
                            editorOptions : {
                                readOnly:true,
                            }
                        },
                        {
                            label : {
                                text :'판매일자',
                            },
                            dataField: 'SaleDate',
                            cssClass: 'hs-view-mode',
                            editorOptions : {
                                readOnly:true,
                            }

                        },
                        {
                            label : {
                                text :'판매장소',
                            },
                            dataField: 'SalePlace',
                            cssClass: 'hs-view-mode',
                            editorOptions : {
                                readOnly:true,
                            }
                        },
                        {
                            label : {
                                text :'담당자',
                            },
                            dataField: 'PersonInCharge',
                            cssClass: 'hs-view-mode',
                            editorOptions : {
                                readOnly:true,
                            }
                        },
                        {
                            itemType : 'empty',
                            cssClass : 'hs-empty-item',

                        },
                        {
                            itemType : 'empty',
                            cssClass : 'hs-empty-item'
                        },
                        {
                            itemType : 'empty',
                            cssClass : 'hs-empty-item'
                        },
                        {
                            itemType : 'empty',
                            cssClass : 'hs-empty-item'
                        }
                    ]
                }
            ]
        },
        purchaseHistoryGridOptions : {
            loadPanel: {enabled: true},
            rowAlternationEnabled : true,
            height: '100%',
            dataSource: ko.observable(null),
            export: {
                enabled: true
            },
            paging : {
                enabled: false,
            },
            showBorders: true,
            selection: {
                mode: 'single',
            },
            showRowLines: true,
            allowColumnResizing: true,
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
                    calculateDisplayValue : 'ProgramName',
                    caption : '프로그램명',
                    groupIndex : 0,
                },
                {
                    caption : '회차',
                    dataField: 'RoundOfUseId',
                    calculateDisplayValue: 'RoundOfUseName',
                    alignment:'center',
                },
                {
                    caption : '시작시간',
                    dataField: 'RoundOfStartTime',
                },
                {
                    caption : '종료시간',
                    dataField: 'RoundOfEndTime',
                },
                {
                    caption : '상품명',
                    dataField: 'ProductId',
                    calculateDisplayValue: 'ProductName',
                    dataType: 'string',
                },
                {
                    caption : '요금구분',
                    dataField: 'RoundOfUseGroupId',
                    calculateDisplayValue: 'RoundOfUseGroupName',
                },
                {
                    caption: '연령구분',
                    dataType: 'string',
                    dataField: 'AgeGroupCode',
                    calculateDisplayValue: 'AgeGroupName',
                },
                {
                    caption :'수량',
                    dataType :'number',
                    dataField: 'Quantity',
                },
                {
                    caption: '개인단체구분',
                    dataField: 'IndividualGroupPolicyCode',
                    dataType: 'string',
                    calculateDisplayValue: 'IndividualGroupPolicyName',
                },
                {
                    caption :'판매단가',
                    dataType: 'number',
                    format : 'currency',
                    dataField: 'UnitPrice',
                },
                {
                    caption :'할인율',
                    dataType: 'number',
                    format : 'percent',
                    dataField: 'DiscountRate',
                },
                {
                    caption : '할인금액',
                    dataType: 'number',
                    format: 'currency',
                    dataField: 'DiscountAmount',
                },
                {
                    caption : '판매금액',
                    dataType: 'number',
                    format: 'currency',
                    dataField: 'NetAmount',
                },
                {
                    caption : '부가세',
                    dataType: 'number',
                    format: 'currency',
                    dataField: 'TaxAmount',
                },
                {
                    caption : '할인사유',
                    dataType: 'string',
                    dataField: 'DiscountReasonCode',
                    calculateDisplayValue: 'DiscountReasonName',
                },
            ],
            toolbar : {
                items : [
                    {
                        location : 'before',
                        text :'구매내역',
                        cssClass : 'hs-title',
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
                    showInColumn: 'DiscountReasonCode',
                    alignByColumn: false,
                    cssClass : 'tar'

                }],
                totalItems: [{
                    column: 'TotalAmount',
                    summaryType: 'sum',
                    valueFormat: 'currency',
                    displayFormat: 'Total: {0}',
                    showInColumn: 'DiscountReasonCode',
                    cssClass : 'tar'
                }],

            },
            onInitialized(e){
                viewOptions.purchaseHistoryGridInstance = e.component;
            },
            onExporting(e) {
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
                        saveAs(new Blob([buffer], {type: 'application/octet-stream'}), `예약상세정보(구매내역)-\${new Date().formatDateString('yyyyMMddHHmmss')}.xlsx`);
                    });
                });
                e.cancel = true;
            },
        },
        purchaseHistoryGridInstance :{},
        paymentHistoryGridOptions : {
            loadPanel: {enabled: true},
            rowAlternationEnabled : true,
            height: '72%',
            dataSource: ko.observable(null),
            export: {
                enabled: true
            },
            paging : {
                enabled: false,
            },
            columnChooser :{
                enabled:true,
                mode :  'select',
            },
            showBorders: true,
            selection: {
                mode: 'single',
            },
            showRowLines: true,
            allowColumnResizing: true,
            scrolling: {
                useNative: false,
                scrollByContent: true,
                scrollByThumb: true,
                showScrollbar: "onHover"
            },
            toolbar :{
                items :[
                    {
                        location : 'before',
                        text :'결제내역',
                        cssClass : 'hs-title',
                    },
                    {
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            icon: 'refresh',
                            onClick() {
                                viewOptions.paymentHistoryGridInstance.refresh();
                            }
                        },
                    },
                    'columnChooserButton',
                ]
            },
            columns : [
                {
                    caption : '결제번호',
                    dataField :'TransactionId',
                },
                {
                    caption : '결제방식',
                    dataField: 'PaymentMethodCode',
                    calculateDisplayValue : 'PaymentMethodName'
                },
                {
                    caption: '결제상세',
                    dataField: 'PaymentDetailMethodCode',
                    calculateDisplayValue : 'PaymentDetailMethodName',
                },
                {
                    caption: '결제금액',
                    dataField: 'TotalAmount',
                    dataType: 'number',
                    format :'currency'
                },
                {
                    caption: '결제일자',
                    dataField: 'TransactionDate',
                    dataType :'date',
                    format : 'yyyy-MM-dd HH:mm:ss',
                    alignment : 'center',
                },
                {
                    caption: '취소일자',
                    dataField :'CancelDate',
                    dataType :'date',
                    format : 'yyyy-MM-dd HH:mm:ss',
                    alignment: 'center',
                },
                {
                    caption: '상태',
                    dataField: 'StatusCode',
                    calculateDisplayValue: 'StatusName',
                    alignment: 'center',
                },
                {
                    caption : '영수증',
                    type : 'buttons',
                    buttons :[
                        {
                            icon :'print',
                            onClick(e){
                                DevExpress.ui.notify(`receipt Number : \${e.row.data.ReceiptId}`);
                            }
                        }
                    ]
                },
                {
                    dataField: 'ReceiptId',
                    visible:false,
                    caption: '영수증번호',
                    showInColumnChooser : false,
                }
            ],
            onInitialized(e) {
                viewOptions.paymentHistoryGridInstance = e.component;
            }
        },
        paymentHistoryGridInstance : {},
        checkoutPopupInstance : {},
        SubTotalAmount : ko.observable(0),
        DiscountAmount : ko.observable(0),
        TaxAmount : ko.observable(0),
        TotalAmount : ko.observable(0),
        cashButtonOptions: {
            icon : 'fa-solid fa-won-sign',
            method: 'cash',
            hint: '현금결제',
            text: '현금결제',
            template: $('#stack-icon-button-template'),
            onClick(e) {
                DevExpress.ui.notify({
                    message: `The "\${e.component.option('text')}" button was clicked`,
                    width: 320
                }, 'success', 1000);
            },
        },
        cardButtonOptions: {
            icon: 'fa-regular fa-credit-card',
            method: 'card',
            hint: '카드결제',
            text: '카드결제',
            template: $('#simple-icon-button-template'),
            onClick(e) {
                DevExpress.ui.notify({
                    message: `The "\${e.component.option('text')}" button was clicked`,
                    width: 320
                }, 'success', 1000);
            },
        },
        payButtonOptions: {
            icon: 'fa-solid fa-mobile-screen-button',
            method: 'simplyPay',
            hint: '간편결제',
            text: '간편결제',
            template: $('#simple-icon-button-template'),
            onClick(e) {
                DevExpress.ui.notify({
                    message: `The "\${e.component.option('text')}" button was clicked`,
                    width: 320
                }, 'success', 1000);
            },
        },
    };

    viewOptions.TotalAmount(bookingDetailFormData.TotalAmount);
    viewOptions.SubTotalAmount(bookingDetailFormData.SubTotalAmount);
    viewOptions.DiscountAmount(bookingDetailFormData.DiscountAmount);
    viewOptions.TaxAmount(bookingDetailFormData.TaxAmount);
    viewOptions.bookingInfoFormOptions.formData(bookingDetailFormData);

    const purchaseHistoryStore = new DevExpress.data.ArrayStore({
        key : 'OrderId',
        data : purchaseHistoryData
    });
    viewOptions.purchaseHistoryGridOptions.dataSource(purchaseHistoryStore);


    const paymentHistoryStore = new DevExpress.data.ArrayStore({
        key  :'TransactionId',
        data : paymentHistoryData,
    });
    viewOptions.paymentHistoryGridOptions.dataSource(paymentHistoryStore);
    ko.applyBindings(viewOptions);
</script>
</body>
</html>
