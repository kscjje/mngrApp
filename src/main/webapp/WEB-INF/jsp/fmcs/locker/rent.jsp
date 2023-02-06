<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>사물함임대관리</title>
    <link rel="stylesheet" href="/fmcs/css/locker/rent.css" type="text/css"/>
</head>
<body class="dx-viewport">
<div class="row row_title">
    <div class="col-12">
        <ul class="navbar-nav">
            <li class="nav-item d-sm-inline-block quick-nav">
                사물함임대관리
            </li>
        </ul>
    </div>
</div>
<div id="main-container" data-bind="dxBox : { direction: 'row', width : '100%', height:' calc(100vh - 40px)' }" class="hs-main-container">
    <div data-options="dxItem: { ratio: 4 }" class="hs-box">
        <div data-bind="dxToolbar : $parents[0].lockerToolbarOptions" class="toolbar"></div>
        <div data-bind="dxScrollView : {}" class="pt05">
            <div data-bind="foreach: $parents[0].lockers" class="hs-locker-list-container">
                <div class="item-content" data-bind="click: $parents[1].lockerSelectionChanged, css : {selected : $parents[1].lockerSelectedItem() === $data }">
                    <div class="header">
                        <div class="agent" data-bind="css : $parents[1].selectColorByLockerStatus(StatusCode)">
                            <span data-bind="text:Size"></span>
                        </div>
                        <div class="layer" data-bind="css : $parents[1].selectColorByLockerStatus(StatusCode)">
                            <span data-bind="text:Layer"></span>
                        </div>
                        <div class="empty"></div>
                    </div>
                    <div class="body">
                        <div class="locker-number" data-bind="css : $parents[1].selectColorByLockerStatus(StatusCode)">
                            <span data-bind="text:ID"></span>
                        </div>
                        <div class="locker-status" data-bind="css : $parents[1].selectColorByLockerStatus(StatusCode)">
                            <span data-bind="text:Status"></span>
                        </div>
                        <div class="hs-member-info" data-bind="visible : StatusCode === 'B' || StatusCode === 'D' ">
                            <span data-bind="text:Name, css : $parents[1].selectColorByLockerStatus(StatusCode)"></span><br/>
                            <span data-bind="text:RentEndDate, css : $parents[1].selectColorByLockerStatus(StatusCode)"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div data-options="dxItem: { ratio: 2 }">
        <div data-bind="dxBox : { direction : 'col', width: '100%', height: '100%' }">
            <div data-options="dxItem : { ratio : 3.5 }" class="hs-box">
                <h4>사물함 임대정보</h4>
                <div data-bind="dxToolbar: {}">
                    <div data-options="dxItem : {
                        location: 'after',
                        widget: 'dxButton',
                        visible: viewOptions.showChange,
                        options: {
                            text: '변경',
                            width : 90,
                            stylingMode :'contained',
                            type:'default',
                            onClick() {
                                viewOptions.lockerChangePopupInstance.show();
                            }
                        }
                    }"></div>
                    <div data-options="dxItem : {
                        location: 'after',
                        widget: 'dxButton',
                        visible: viewOptions.showReturn,
                        options: {
                            text: '반납',
                            width : 90,
                            stylingMode :'contained',
                            type:'default',
                            onClick() {
                                viewOptions.lockerReturnPopupInstance.show();
                            }
                        }
                    }"></div>
                    <div data-options="dxItem : {
                        location: 'after',
                        widget: 'dxButton',
                        visible: viewOptions.showForcedReturn,
                        options: {
                            text: '강제회수',
                            width : 90,
                            stylingMode :'contained',
                            type:'default',
                            onClick() {
                                viewOptions.lockerForcedPopupInstance.show();
                            }
                        }
                    }"></div>
                    <div data-options="dxItem : {
                        location: 'after',
                        widget: 'dxButton',
                        visible: viewOptions.showReRent,
                        options: {
                            text: '재등록',
                            width : 90,
                            stylingMode :'contained',
                            type:'default',
                            onClick() {
                                viewOptions.lockerReRentPopupInstance.show();
                            }
                        }
                    }"></div>
                </div>
                <div data-bind="ifnot: $parents[1].lockerSelectedItem()" class="no-item"><span>사물함을 선택하세요.</span></div>
                <div class="dx-field" data-bind="template: {name: 'locker-detail-template', foreach: $parents[1].lockerDetail }"></div>
            </div>
            <div data-options="dxItem : { ratio : 2.5}" class="hs-box">
                <h4>사물함 임대이력</h4>
                <div data-bind="dxDataGrid : $parents[1].rentHistoryGridOptions"></div>
            </div>
        </div>
    </div>
</div>

<script type="text/html" id="locker-detail-template">
    <div>
        <h4>회원 정보</h4>
        <div class="hs-info-box">
            <div class="hs-unit-box">
                <div class="title"><span>회원번호</span></div>
                <div><span data-bind="text : Member.ID "></span></div>
            </div>
            <div class="hs-unit-box">
                <div class="title"><span>회원명</span></div>
                <div><span data-bind="text: Member.Name"></span></div>
            </div>
            <div class="hs-unit-box">
                <div class="title"><span>핸드폰번호</span></div>
                <div><span data-bind="text: Member.MobileNumber"></span></div>
            </div>
        </div>
    </div>

    <div class="ch05">
        <h4>사물함 정보</h4>
        <div class="hs-info-box">
            <div class="hs-unit-box">
                <div class="title"><span>위치</span></div>
                <div><span data-bind="text: Locker.Location"></span></div>
            </div>
            <div class="hs-unit-box">
                <div class="title"><span>크기</span></div>
                <div><span data-bind="text: Locker.Size"></span></div>
            </div>
            <div class="hs-unit-box">
                <div class="title"><span>상태</span></div>
                <div><span data-bind="text:Locker.Status"></span></div>
            </div>
            <div class="hs-unit-box">
                <div class="title"><span>단구분</span></div>
                <div><span data-bind="text: Locker.Layer"></span></div>
            </div>
            <div class="hs-unit-box">
                <div class="title"><span>보증금</span></div>
                <div><span data-bind="text: formatCurrency(Locker.Deposit)"></span></div>
            </div>
            <div class="hs-unit-box">
                <div class="title"><span>임대료</span></div>
                <div><span data-bind="text: formatCurrency(Locker.RentalFee) + ' ('+Locker.RentalMonths+'개월)'"></span></div>
            </div>
        </div>
    </div>

    <div>
        <h4>임대 정보</h4>
        <div class="hs-info-box">
            <div class="hs-unit-box">
                <div class="title"><span>임대기간</span></div>
                <div><span data-bind="text: formatRentalRange(Rental.RentStartDate,Rental.RentEndDate)"></span></div>
            </div>
            <div class="hs-unit-box">
                <div class="title"><span>임대개월수</span></div>
                <div><span data-bind="text: Rental.RentalMonths"></span></div>
            </div>
            <div class="hs-unit-box">
                <div class="title"><span>접수일</span></div>
                <div><span data-bind="text: Rental.CreationDate"></span></div>
            </div>
            <div class="hs-unit-box">
                <div class="title"><span>임대료</span></div>
                <div><span data-bind="text: formatCurrency(Rental.RentalFee)"></span></div>
            </div>
            <div class="hs-unit-box">
                <div class="title"><span>보증금</span></div>
                <div><span data-bind="text: formatCurrency(Rental.Deposit)"></span></div>
            </div>
            <div class="hs-unit-box" data-bind="visible: Locker.StatusCode === 'D' ">
                <div class="title"><span>반납상태</span></div>
                <div><span data-bind="text: Rental.RentalStatus"></span></div>
            </div>
            <div class="hs-unit-box" data-bind="visible: Locker.StatusCode === 'D' ">
                <div class="title"><span>연체일수</span></div>
                <div><span data-bind="text: Rental.OverdueDays" class="red fb"></span><span>일</span></div>
            </div>
        </div>
    </div>
</script>

<div class="hs-hidden" id="locker-change-popup" data-bind="dxPopup: {
            title: '사물함 변경',
            width: 1200,
            height: 850,
            visible: false,
            onInitialized: function (e) {
                lockerChangePopupInstance = e.component;
            },
            toolbarItems: [
                {
                    widget: 'dxButton',
                    toolbar: 'bottom',
                    location: 'after',
                    options: {
                        text: '사물함변경'
                    }
                },
                {
                    widget: 'dxButton',
                    toolbar: 'bottom',
                    location: 'after',
                    options: {
                        text: '취소',
                        onClick(e) {
                            targetLockerDetail(null);
                            targetLockerSelected(false);
                            lockerChangePopupInstance.hide();
                        }
                    },
                },
            ],
}">
    <div data-options="dxTemplate: {name : 'content'}">
        <div data-bind="dxBox : {
            direction: 'row',
            width : '100%',
            height: '100%',
        }">
            <div data-options="dxItem: {ratio: 3}" class="hs-popup-box west-box">
                <h4>임대중인 사물함정보</h4>
                <div class="dx-field" data-bind="template: {name: 'locker-detail-template', foreach: $parents[0].lockerDetail }"></div>
            </div>
            <div data-options="dxItem: {ratio: 3}" class="hs-popup-box east-box">
                <h4>변경하고자 하는 사물함</h4>
                <div data-bind="dxToolbar: $parent.lockerChangePopupToolbarOptions" class="hs-popup-toolbar"></div>
                <div data-bind="foreach: $parent.availableLockers" class="hs-locker-button-container">
                    <div data-bind="dxButton: {
                                        text : $data,
                                        width:'12%',
                                        height:'70',
                                        onClick:function(e){
                                            $root.targetLockerSelected(true);
                                            $root.targetLockerSelectionChanged(e.component.option('text'));
                                        }
                    }" class="mb05"></div>
                </div>
                <div class="hs-locker-button-paging"><span data-bind="text: $parent.availableLockerCountPerPage"></span> / <span data-bind="text: $parent.availableLockerTotalCount"></span></div>
                <div class="dx-field" data-bind="template : { name :'target-locker-template', foreach:$parents[0].targetLockerDetail}"></div>
                <div class="change-table" data-bind="visible : $parents[0].targetLockerSelected()">
                    <div class="hs-form-label"><span>임대기간</span></div>
                    <div class="hs-form-editor">
                        <div data-bind="dxForm: $parents[0].lockerChangeFormOptions">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/html" id="target-locker-template">
    <div class="ch05">
        <h4>사물함 정보</h4>
        <div class="hs-info-box">
            <div class="hs-unit-box">
                <div class="title"><span>번호</span></div>
                <div><span data-bind="text: ID"></span></div>
            </div>
            <div class="hs-unit-box">
                <div class="title"><span>위치</span></div>
                <div><span data-bind="text: Location"></span></div>
            </div>
            <div class="hs-unit-box">
                <div class="title"><span>크기</span></div>
                <div><span data-bind="text: Size"></span></div>
            </div>
            <div class="hs-unit-box">
                <div class="title"><span>단구분</span></div>
                <div><span data-bind="text: Layer"></span></div>
            </div>
            <div class="hs-unit-box">
                <div class="title"><span>보증금</span></div>
                <div><span data-bind="text: formatCurrency(Deposit)"></span></div>
            </div>
            <div class="hs-unit-box">
                <div class="title"><span>임대료</span></div>
                <div><span data-bind="text: formatCurrency(RentalFee) + ' ('+RentalMonths+'개월)'"></span></div>
            </div>
        </div>
    </div>
</script>

<div class="hs-hidden" id="locker-return-popup" data-bind="dxPopup: {
    title: '사물함 반납',
    width: 1200,
    height: 850,
    visible: false,
    onInitialized: function (e) {
        lockerReturnPopupInstance = e.component;
    },
    toolbarItems: [
        {
            widget: 'dxButton',
            toolbar: 'bottom',
            location: 'after',
            options: {
                text: '사물함반납'
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

                lockerReturnPopupInstance.hide();
                lockerReturnFormOptions.formData({
                        ReturnDate : new Date(),
                        Deposit : 5000,
                        OverdueDays: 5,
                        LateFee : 2000,
                        DepositPayMethod : '0001',
                    });
            }
        },
    ],
}">
    <div data-options="dxTemplate : {name : 'content' }">
        <div data-bind="dxBox : { direction: 'row', width : '100%', height: '100%' }">
            <div data-options="dxItem: {ratio: 3}" class="hs-popup-box west-box">
                <h4>임대정보</h4>
                <div class="dx-field" data-bind="template: {name: 'locker-detail-template', foreach: $parents[0].lockerDetail }"></div>
            </div>
            <div data-options="dxItem: {ratio: 3}" class="hs-popup-box east-box">
                <div class="locker-return-form-box mb20">
                    <h4>반납정보</h4>
                    <div data-bind="dxForm : $parent.lockerReturnFormOptions"></div>
                </div>
                <div class="mb20" data-bind="visible : $parent.lockerReturnPayAsDeposit() === 0">
                    <h4>결제수단</h4>
                    <div class="locker-payment-button-container">
                        <div data-bind="dxButton: $parent.cardButtonOptions"></div>
                        <div data-bind="dxButton: $parent.cashButtonOptions"></div>
                        <div data-bind="dxButton: $parent.payButtonOptions"></div>
                    </div>
                    <div data-bind="dxDataGrid : $parent.paymentMethodGridOptions" class="mt10"></div>
                </div>
                <div class="locker-payment-info-container">
                    <h4>결제정보</h4>
                    <div data-bind="template : {name: $parent.paymentInformationTemplateToUse}"></div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="hs-hidden" id="locker-forced-popup-container" data-bind="dxPopup: {
    title: '사물함 강제회수',
    width: 1200,
    height: 800,
    visible: false,
    onInitialized: function (e) {
        lockerForcedPopupInstance = e.component;
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
                text: '취소'
            },
            onClick(e) {

                lockerForcedPopupInstance.hide();
                lockerForcedFormOptions.formData({
                        ReturnDate : new Date(),
                        ReturnNote : null
                    });
            }
        },
    ],
}">
    <div data-options="dxTemplate : {name : 'content' }">
        <div data-bind="dxBox : { direction: 'row', width : '100%', height: '100%' }">
            <div data-options="dxItem: {ratio: 3}" class="hs-popup-box west-box">
                <h4>임대정보</h4>
                <div class="dx-field" data-bind="template: {name: 'locker-detail-template', foreach: $parents[0].lockerDetail }"></div>
            </div>
            <div data-options="dxItem: {ratio: 3}" class="hs-popup-box east-box">
                <div class="locker-return-form-box mb20">
                    <h4>반납정보</h4>
                    <div data-bind="dxForm : $parent.lockerForcedFormOptions"></div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="hs-hidden" id="locker-re-rent-popup" data-bind="dxPopup: {
    title: '사물함 재등록',
    width: 1200,
    height: 850,
    visible: false,
    onInitialized: function (e) {
        lockerReRentPopupInstance = e.component;
    },
    toolbarItems: [
        {
            widget: 'dxButton',
            toolbar: 'bottom',
            location: 'after',
            options: {
                text: '재등록'
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

                lockerReRentPopupInstance.hide();
                lockerReRentFormOptions.formData({
                        ReturnDate : new Date(),
                        Deposit : 5000,
                        OverdueDays: 5,
                        LateFee : 2000,
                        DepositPayMethod : '0001',
                    });
            }
        },
    ],
}">
    <div data-options="dxTemplate : {name : 'content' }">
        <div data-bind="dxBox : { direction: 'row', width : '100%', height: '100%' }">
            <div data-options="dxItem: {ratio: 3}" class="hs-popup-box west-box">
                <h4>임대정보</h4>
                <div class="dx-field" data-bind="template: {name: 'locker-detail-template', foreach: $parents[0].lockerDetail }"></div>
            </div>
            <div data-options="dxItem: {ratio: 3}" class="hs-popup-box east-box">
                <div class="locker-return-form-box mb20">
                    <h4>반납정보</h4>
                    <div data-bind="dxForm : $parent.lockerReRentFormOptions"></div>
                </div>
                <div class="mb20">
                    <h4>결제수단</h4>
                    <div class="locker-payment-button-container">
                        <div data-bind="dxButton: $parent.cardButtonOptions"></div>
                        <div data-bind="dxButton: $parent.cashButtonOptions"></div>
                        <div data-bind="dxButton: $parent.payButtonOptions"></div>
                    </div>
                    <div data-bind="dxDataGrid : $parent.paymentMethodGridOptions" class="mt10"></div>
                </div>
                <div class="locker-payment-info-container">
                    <h4>결제정보</h4>
                    <div data-bind="template : {name: 're-rent-payment-information-template', data : $parent.lockerReRentPayInformation}"></div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/html" id="return-payasdeposit-information-template">
    <div class="locker-payment-info-box">
        <div class="locker-payment-header"><span>연체료</span></div>
        <div class="locker-payment-body"><span>10,000</span><span class="ml05">원</span></div>
    </div>
    <div class="locker-payment-info-box">
        <div class="locker-payment-header"><span>보증금</span></div>
        <div class="locker-payment-body"><span>5,000</span><span class="ml05">원</span></div>
    </div>
    <div class="locker-payment-sub-box">
        <div class="locker-payment-header"><span>차감금액</span></div>
        <div class="locker-payment-body"><span>- 2,000</span><span class="ml05">원</span></div>
    </div>
    <div class="locker-payment-total-box">
        <div class="locker-payment-header"><span>보증금 잔여금액</span></div>
        <div class="locker-payment-body"><span>3,000</span><span class="ml05">원</span></div>
    </div>
</script>

<script type="text/html" id="return-paysimple-information-template">
    <div class="locker-payment-info-box">
        <div class="locker-payment-header"><span>연체료</span></div>
        <div class="locker-payment-body"><span>10,000</span><span class="ml05">원</span></div>
    </div>
    <div class="locker-payment-info-box">
        <div class="locker-payment-header"><span>받을금액</span></div>
        <div class="locker-payment-body"><span>5,000</span><span class="ml05">원</span></div>
    </div>
    <div class="locker-payment-sub-box">
        <div class="locker-payment-header"><span>결제금액</span></div>
        <div class="locker-payment-body"><span>3,000</span><span class="ml05">원</span></div>
    </div>
    <div class="locker-payment-total-box">
        <div class="locker-payment-header"><span>남은금액</span></div>
        <div class="locker-payment-body"><span>7,000</span><span class="ml05">원</span></div>
    </div>
</script>


<script type="text/html" id="re-rent-payment-information-template" >
    <div class="locker-payment-info-box">
        <div class="locker-payment-header"><span>임대료</span></div>
        <div class="locker-payment-body"><span data-bind="text: formatNumber(RentalFee)"></span><span class="ml05">원</span></div>
    </div>
    <div class="locker-payment-sub-box" data-bind="visible:DiscountAmount > 0">
        <div class="locker-payment-header"><span>할인 (</span><span data-bind="text: formatAsPercent(DiscountRate)"></span>) <span data-bind="text: DiscountName" class="hs-locker-discount-text"></span></div>
        <div class="locker-payment-body"><span data-bind="text: formatNumber(DiscountAmount)"></span><span class="ml05">원</span></div>
    </div>
    <div class="locker-payment-info-box">
        <div class="locker-payment-header"><span>받을금액</span></div>
        <div class="locker-payment-body"><span data-bind="text:formatNumber(AmountToBePaid)"></span><span class="ml05">원</span></div>
    </div>
    <div class="locker-payment-sub-box">
        <div class="locker-payment-header"><span>결제금액</span></div>
        <div class="locker-payment-body"><span data-bind="text:formatNumber(PaidAmount)"></span><span class="ml05">원</span></div>
    </div>
    <div class="locker-payment-total-box">
        <div class="locker-payment-header"><span>남은금액</span></div>
        <div class="locker-payment-body"><span data-bind="text:formatNumber(RemainingAmount)"></span><span class="ml05">원</span></div>
    </div>
</script>
<script type="text/html" id="locker-payment-button-template">
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

<script type="text/javascript" src="/fmcs/js/locker/rent.js"></script>
<script type="text/javascript">

    const rentHistoryStore = new DevExpress.data.ArrayStore({
        key: 'ID',
        data: rentalHistorys
    });

    const viewOptions = {
        lockerDetail: ko.observable(),
        lockers: ko.observableArray(null),
        rentHistoryGridInstance: {},
        rentHistoryGridOptions: {
            height : '100%',
            dataSource: ko.observable(null),
            rowAlternationEnabled : true,
            focusedRowEnabled: true,
            showBorders: true,
            showRowLines: true,
            sorting: {
                mode: 'multiple',
            },
            columnChooser :{
                enabled:true,
                mode :  'select',
            },
            scrolling: {
                mode: "virtual",
            },
            columns: [
                {
                    dataField: 'ID',
                    visible: false,
                    sortOrder: 'desc',
                    showInColumnChooser : false,
                },
                {
                    dataField: 'MemberNo',
                    dataType: 'string',
                    caption: '회원번호',
                    alignment: 'center',
                },
                {
                    dataField: 'MemberName',
                    dataType: 'string',
                    caption: '회원명',
                    alignment: 'left',
                },
                {
                    dataField: 'RentalStartDate',
                    dataType: 'date',
                    caption: '임대시작일',
                    format: 'yyyy-MM-dd',
                    alignment: 'center',
                },
                {
                    dataField: 'RentalEndDate',
                    dataType: 'date',
                    caption: '임대종료일',
                    format: 'yyyy-MM-dd',
                    alignment: 'center',
                },
                {
                    dataField: 'ReturnDate',
                    dataType: 'date',
                    caption: '반납일',
                    format: 'yyyy-MM-dd',
                    alignment: 'center',
                },
                {
                    dataField: 'RentalFee',
                    dataType: 'number',
                    caption: '임대료',
                    format: 'currency',
                },
                {
                    dataField: 'Deposit',
                    dataType: 'number',
                    caption: '보증금',
                    format: 'currency',
                }
            ],
            toolbar: {
                items: [
                    {
                        location: 'after',
                        widget: 'dxButton',
                        options: {
                            icon: 'refresh',
                            onClick() {
                                viewOptions.rentHistoryGridInstance.refresh();
                            }
                        },
                    },
                    'columnChooserButton',
                ]
            },
            onInitialized(e) {
                viewOptions.rentHistoryGridInstance = e.component;
            }
        },
        lockerToolbarInstance: {},
        lockerToolbarOptions: {
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
                    location: 'before',
                    widget: 'dxSelectBox',
                    options: {
                        label: '사물함크기',
                        labelMode: 'floating',
                        dataSource: sizes
                    },
                },
                {
                    location: 'before',
                    widget: 'dxSelectBox',
                    options: {
                        label: '단수',
                        labelMode: 'floating',
                        dataSource: new DevExpress.data.ArrayStore({
                            key: 'Code',
                            data: layers
                        }),
                        displayExpr: 'Name',
                        valueExpr: 'Code',
                    }
                },
                {
                    location: 'after',
                },
                {
                    location: 'after',
                    widget: 'dxButton',
                    options: {
                        icon: 'chevronprev'
                    }
                },
                {
                    location: 'after',
                    widget: 'dxButton',
                    options: {
                        icon: 'chevronnext'
                    }
                },
                {
                    location: 'after',
                    widget: 'dxButton',
                    options: {
                        icon: 'refresh'
                    }
                }

            ],
            onInitialized(e) {
                viewOptions.lockerToolbarInstance = e.component;
            }
        },
        lockerDetailToolbarInstance: {},
        lockerSelectionChanged: function (data) {
            viewOptions.lockerSelectedItem(data);
        },
        lockerSelectedItem: ko.observable(null),
        lockerChangePopupInstance: {},
        lockerChangePopupToolbarInstance: {},
        lockerChangePopupToolbarOptions: {
            items: [
                {
                    location: 'before',
                    widget: 'dxSelectBox',
                    options: {
                        width: 120,
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
                        width: 120,
                        label: '사물함크기',
                        labelMode: 'floating',
                        dataSource: sizes
                    },
                },
                {
                    location: 'before',
                    widget: 'dxSelectBox',
                    options: {
                        width: 100,
                        label: '단수',
                        labelMode: 'floating',
                        dataSource: new DevExpress.data.ArrayStore({
                            key: 'Code',
                            data: layers
                        }),
                        displayExpr: 'Name',
                        valueExpr: 'Code',
                    }
                },
                {
                    location: 'after',
                    widget: 'dxButton',
                    options: {
                        icon: 'chevronprev'
                    }
                },
                {
                    location: 'after',
                    widget: 'dxButton',
                    options: {
                        icon: 'chevronnext'
                    }
                },
                {
                    location: 'after',
                    widget: 'dxButton',
                    options: {
                        icon: 'refresh'
                    }
                }
            ],
            onInitialized(e) {
                viewOptions.lockerChangePopupToolbarInstance = e.component;
            }
        },
        lockerChangeFormOptions : {
            formData : ko.observable(),
            visible : true,
            labelLocation:'top',
            showColonAfterLabel: false,
            items:[{
                itemType:'group',
                colCount:2,
                items:[
                    {
                        dataField:'rentStartDate',
                        editorType:'dxDateBox',
                        label : {
                            text:'시작일',
                        },
                        editorOptions : {
                            displayFormat: 'yyyy-MM-dd',
                        }
                    },
                    {
                        dataField:'rentEndDate',
                        editorType:'dxDateBox',
                        label : {
                            text:'종료일',
                        },
                        editorOptions : {
                            displayFormat: 'yyyy-MM-dd',
                        }
                    }]
            }]
        },
        availableLockers: ko.observableArray(null),
        availableLockerTotalCount: ko.observable(0),
        availableLockerCountPerPage: ko.observable(0),
        targetLockerDetail: ko.observable(),
        targetLockerSelected: ko.observable(false),
        targetLockerSelectionChanged: function (data) {
            if (data) {
                viewOptions.targetLockerDetail({
                    ID: data,
                    Location: '프론트뒤',
                    Size: '대',
                    Layer: 'H',
                    Deposit: 5000,
                    RentalFee: 10000,
                    RentalMonths: 1,
                });

                const  date = new Date(), y = date.getFullYear(), m = date.getMonth()+1;
                const firstDay = new Date(y, m, 1);
                const lastDay = new Date(y, m + 1, 0);
                viewOptions.lockerChangeFormOptions.formData({rentStartDate:firstDay, rentEndDate:lastDay});
            }
        },
        lockerReturnPopupInstance: {},
        lockerForcedPopupInstance: {},
        lockerForcedFormOptions : {
            formData : ko.observable(),
            colCount : 2,
            items : [
                {
                    dataField:'ReturnDate',
                    dataType: 'date',
                    editorType:'dxDateBox',
                    editorOptions : {
                        displayFormat :'yyyy-MM-dd'
                    },
                    label : {
                        text :'반납일자'
                    }
                },
                {
                    itemType: 'empty',
                },
                {
                    colSpan:2,
                    dataField: 'ReturnNote',
                    dataType:'string',
                    editorType: 'dxTextArea',
                    editorOptions : {
                        height : 100
                    },
                    label : {
                        text :'반납메모사항'
                    }
                }
            ]
        },
        lockerForcedFormInstance: {},
        lockerReRentPopupInstance: {},
        lockerReRentFormInstance : {},
        lockerReRentFormOptions : {
            formData : ko.observable(),
            colCount: 2,
            items :[
                {
                    dataField :'RentalMonths',
                    editorType :'dxSelectBox',
                    label : {
                        text:'이용개월수'
                    },
                    editorOptions : {
                        items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                    },
                    disabled:true,
                },
                {
                    dataField :'RentalFee',
                    editorType:'dxSelectBox',
                    label : {
                        text :'임대료',
                    },
                    editorOptions : {
                        dataSource :[2000, 5000, 10000],
                        displayExpr : function(item) {
                            return item && formatCurrency(item);
                        },
                        onValueChanged: function(e) {

                        }
                    }
                },
                {
                    colSpan: 2,
                    itemType :'group',
                    colCount:2,
                    items :[
                        {
                            cssClass: 'hs-child-editor-box',
                            dataField :'RentStartDate',
                            editorType:'dxDateBox',
                            label : {
                                text:'시작일',
                            },
                            editorOptions : {
                                displayFormat : 'yyyy-MM-dd'
                            }
                        },
                        {
                            cssClass: 'hs-child-editor-box',
                            dataField: 'RentEndDate',
                            editorType:'dxDateBox',
                            label : {
                                text:'종료일'
                            },
                            editorOptions : {
                                displayFormat : 'yyyy-MM-dd'
                            }
                        },
                    ],
                    label : {
                        text : '임대기간'
                    }
                },
                {
                    dataField:'DiscountReason',
                    editorType:'dxSelectBox',
                    colSpan:2,
                    label : {
                        text:'할인사유',
                    },
                    editorOptions: {
                        valueExpr :'ID',
                        displayExpr : formatDisplayDiscountItem,
                        dataSource : new DevExpress.data.ArrayStore({
                            key : 'ID',
                            data : discountInformations
                        }),
                        onValueChanged : function(e) {

                            if(e.value === '0000') {
                                viewOptions.lockerReRentFormInstance.getEditor('DiscountReason').option('buttons',["dropDown"]);

                                const selectedItem = viewOptions.lockerReRentFormInstance.getEditor('DiscountReason').option("selectedItem");
                                viewOptions.lockerReRentDiscountSelectedItem(selectedItem);
                                if(selectedItem) {
                                    const oldInformation = viewOptions.lockerReRentPayInformation();
                                    oldInformation.DiscountName = null;
                                    oldInformation.DiscountRate = 0;
                                    oldInformation.DiscountAmount = 0;
                                    oldInformation.AmountToBePaid = oldInformation.RentalFee - oldInformation.DiscountAmount;
                                    oldInformation.RemainingAmount = oldInformation.AmountToBePaid - oldInformation.PaidAmount;
                                    viewOptions.lockerReRentPayInformation(oldInformation);

                                }
                            } else {
                                const buttons = ["dropDown",
                                    {
                                        name: "certificatedButton",
                                        location: "after",
                                        options: {
                                            icon: "fa-solid fa-circle-xmark",
                                            text:'비대면감면 자격인증',
                                            stylingMode: "contained",
                                            type:'danger',
                                            onClick: function(e) {
                                                e.component.option({
                                                    icon : 'fa-solid fa-circle-check',
                                                    type:'success',
                                                });
                                            }
                                        }
                                    }];

                                viewOptions.lockerReRentFormInstance.getEditor('DiscountReason').option('buttons',buttons);
                                const selectedItem = viewOptions.lockerReRentFormInstance.getEditor('DiscountReason').option("selectedItem");
                                viewOptions.lockerReRentDiscountSelectedItem(selectedItem);
                                if(selectedItem) {
                                    const oldInformation = viewOptions.lockerReRentPayInformation();
                                    oldInformation.DiscountName = selectedItem.Name;
                                    oldInformation.DiscountRate = selectedItem.DiscountRate;
                                    oldInformation.DiscountAmount = oldInformation.RentalFee * oldInformation.DiscountRate;
                                    oldInformation.AmountToBePaid = oldInformation.RentalFee - oldInformation.DiscountAmount;
                                    oldInformation.RemainingAmount = oldInformation.AmountToBePaid - oldInformation.PaidAmount;
                                    viewOptions.lockerReRentPayInformation(oldInformation);
                                }
                            }
                        }
                    }
                },
            ],
            onInitialized(e) {
                viewOptions.lockerReRentFormInstance = e.component;
            }
        },
        lockerLateFeeConfiguration: ko.observable(null),
        lockerReturnFormInstance: {},
        lockerReturnFormOptions: {
            formData: ko.observable(null),
            colCount: 2,
            items: [
                {
                    dataField: 'ReturnDate',
                    editorType: 'dxDateBox',
                    editorOptions: {
                        displayFormat: 'yyyy-MM-dd',
                    },
                    label: {
                        text: '반납일자',
                    }
                },
                {
                    dataField: 'Deposit',
                    dataType: 'number',
                    editorOptions: {
                        format : 'currency',
                    },
                    cssClass: 'hs-view-mode',
                    label: {
                        text: '보증금'
                    },
                },
                {
                    dataField: 'OverdueDays',
                    dataType: 'number',
                    label: {
                        text: '연체일수'
                    },
                },
                {
                    dataField: 'LateFee',
                    dataType: 'number',
                    editorOptions: {
                        format: 'currency',
                        onValueChanged: function (e) {

                            if (e.value > viewOptions.lockerReturnFormInstance.option('formData')['Deposit']) {

                                viewOptions.lockerReturnFormInstance.getEditor('DepositPayMethod').option('value', '0002');
                                viewOptions.lockerReturnFormInstance.getEditor('DepositPayMethod').option('items[0].disabled', true);

                            } else {

                                viewOptions.lockerReturnFormInstance.getEditor('DepositPayMethod').option('items[0].disabled', false);
                            }
                        }
                    },
                    label: {
                        text: '연체료'
                    },
                },
                {
                    dataField: 'remark',
                    dataType: 'string',
                    label: {
                        text: '비고'
                    },
                    editorType: 'dxTextArea',
                    editorOptions : {
                        height:60,
                    },
                    colSpan: 2,
                },
                {
                    colSpan: 2,
                    dataField: 'DepositPayMethod',
                    editorType: 'dxRadioGroup',
                    cssClass: 'mt05',
                    editorOptions: {
                        layout: 'horizontal',
                        items: lockerLateFeeDepositPayments,
                        valueExpr: 'ID',
                        displayExpr: 'Text',
                        onValueChanged: function (e) {
                            if (e.value === '0001') {
                                viewOptions.lockerReturnPayAsDeposit(1);
                            } else {
                                viewOptions.lockerReturnPayAsDeposit(0);
                            }
                        }
                    },
                    label: {
                        text: '결제방법',
                    }
                }
            ],
            onInitialized: function (e) {
                viewOptions.lockerReturnFormInstance = e.component;
            }
        },
        cardButtonOptions: {
            icon: 'fa-regular fa-credit-card',
            method: 'card',
            hint: '카드결제',
            text: '카드결제',
            template: $('#locker-payment-button-template'),
            onClick(e) {
                DevExpress.ui.notify({
                    message: `The "\${e.component.option('text')}" button was clicked`,
                    width: 320
                }, 'success', 1000);
            },
        },
        cashButtonOptions: {
            method: 'cash',
            hint: '현금결제',
            text: '현금결제',
            icon : 'fa-solid fa-won-sign',
            template: $('#stack-icon-button-template'),
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
            template: $('#locker-payment-button-template'),
            onClick(e) {
                DevExpress.ui.notify({
                    message: `The "\${e.component.option('text')}" button was clicked`,
                    width: 320
                }, 'success', 1000);
            },
        },
        paymentMethodGridOptions: {
            showBorders: true,
            height: 150,
            scrolling: {
                mode: 'virtual',
            },
            dataSource: ko.observableArray(null),
            columns: [
                {
                    dataField: 'PaymentMethod',
                    dataType: 'string',
                    caption: '결제수단',
                },
                {
                    dataField: 'PaymentAmount',
                    dataType: 'number',
                    format: 'currency',
                    caption: '결제금액',
                },
                {
                    type: "buttons",
                    buttons: [{
                        text: "결제취소",
                        onClick: function (e) {
                            // Execute your command here
                        }
                    }]
                }
            ]
        },
        lockerReturnPayAsDeposit: ko.observable(1),
        lockerReturnPayAsDepositInformation: ko.observable(null),
        lockerReturnPaySimpleInformation: ko.observable(null),
        lockerReRentDiscountSelectedItem : ko.observable(null),
        lockerReRentPayInformation : ko.observable(),
    };

    viewOptions.lockers(lockers());
    viewOptions.availableLockers(availableLockers(40));
    viewOptions.availableLockerCountPerPage(40);
    viewOptions.availableLockerTotalCount(100);
    viewOptions.lockerLateFeeConfiguration();
    viewOptions.lockerReturnFormOptions.formData({
        ReturnDate: new Date(),
        Deposit: 5000,
        OverdueDays: 5,
        LateFee: 2000,
        DepositPayMethod: '0001',
    });
    viewOptions.paymentMethodGridOptions.dataSource(paymentData);

    viewOptions.paymentInformationTemplateToUse = function (item) {
        return viewOptions.lockerReturnPayAsDeposit() > 0 ? 'return-payasdeposit-information-template' : 'return-paysimple-information-template';
    }.bind(viewOptions);

    viewOptions.selectColorByLockerStatus = function (statusCode) {
        return statusCode === 'A' ? 'blue' : statusCode === 'B' ? 'grey' : 'red';

    }.bind(viewOptions);

    viewOptions.lockerForcedFormOptions.formData({
       ReturnDate: new Date(),
       ReturnNote : null,
    });

    viewOptions.lockerReRentFormOptions.formData({
        RentalMonths : 1,
        RentalFee : 10000,
        RentStartDate: '2022-12-01',
        RentEndDate: '2022-12-31',
        DiscountReason : '0000',
    })
    viewOptions.lockerReRentPayInformation({
        RentalFee : 10000,
        DiscountRate : null,
        DiscountName : null,
        DiscountAmount : null,
        AmountToBePaid : 10000,
        PaidAmount : 0,
        RemainingAmount:10000
    });

    viewOptions.lockerSelectedItem.subscribe(function(newData){

        this.lockerToolbarInstance.option('items[4]', {
            location: 'after',
            template : `<div><span>사물함번호 : \${newData.ID}</span></div>`
        });

        this.lockerDetail({
            Member: {
                ID: newData.Name ? '00001234' : null,
                Name: newData.Name,
                MobileNumber: newData.Name ? '010-1234-5678' : null,
            },
            Locker: {
                Location: '프론트뒤',
                Size: newData.Size,
                Status: newData.Status,
                StatusCode: newData.StatusCode,
                LayerCode: newData.LayerCode,
                Layer: newData.Layer,
                Deposit: 5000,
                RentalFee: 10000,
                RentalMonths: 1,
            },
            Rental: {
                RentStartDate: newData.RentStartDate,
                RentEndDate: newData.RentEndDate,
                CreationDate: newData.Name ? '2022-09-16' : null,
                RentalStatus: '연체',
                OverdueDays: 5,
                RentalFee: newData.Name ? 10000 : null,
                RentalMonths: newData.Name ? 1 : null,
                Deposit: newData.Name ? 5000 : null,
            }
        });

        this.rentHistoryGridOptions.dataSource(rentHistoryStore);

    }, viewOptions);

    viewOptions.showChange = ko.computed(function(){
       if(this.lockerSelectedItem()) {
           return this.lockerSelectedItem().StatusCode === 'B';
       }
       return false;
    },viewOptions);

    viewOptions.showReturn = ko.computed(function() {
        if(this.lockerSelectedItem()) {
            return this.lockerSelectedItem().StatusCode === 'B' || this.lockerSelectedItem().StatusCode === 'D';
        }
        return false;
    }, viewOptions);

    viewOptions.showForcedReturn = ko.computed(function(){
        if(this.lockerSelectedItem()) {
            return this.lockerSelectedItem().StatusCode === 'D';
        }
        return false;
    }, viewOptions);

    viewOptions.showReRent = ko.computed(function() {
        if(this.lockerSelectedItem()) {
            return this.lockerSelectedItem().StatusCode === 'B';
        }
        return false;
    }, viewOptions);

    ko.applyBindings(viewOptions);
</script>
</body>
</html>
