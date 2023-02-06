<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<link rel="stylesheet" href="/fmcs/css/locker/rent.css" type="text/css"/>
<script src="/fmcs/js/locker/rent.js"></script>

<script type="text/html" id="member-template">
    <div>
        <h4>회원 정보</h4>
        <div class="hs-info-box">
            <div class="hs-unit-box">
                <div class="title">회원번호</div>
                <div data-bind="text : Member.ID"></div>
            </div>
            <div class="hs-unit-box">
                <div class="title">회원명</div>
                <div data-bind="text: Member.Name"></div>
            </div>
            <div class="hs-unit-box">
                <div class="title">핸드폰번호</div>
                <div data-bind="text: Member.MobileNumber"></div>
            </div>
        </div>
    </div>
</script>

<script type="text/html" id="locker-simple-template">
    <div class="ch05">
        <h4>사물함 정보 <span data-bind="text: Locker.ID" /></h4>
        <div class="hs-info-box">
            <div class="hs-unit-box">
                <div class="title">위치</div>
                <div data-bind="text: Locker.Location"></div>
            </div>
            <div class="hs-unit-box">
                <div class="title">상태</div>
                <div data-bind="text:Locker.Status"></div>
            </div>
            <div class="hs-unit-box">
                <div class="title">보증금</div>
                <div data-bind="text: formatCurrency(Locker.Deposit)"></div>
            </div>
        </div>
    </div>
</script>

<script type="text/html" id="locker-template">
    <div class="ch05">
        <h4>사물함 정보 <span data-bind="text: Locker.ID" /></h4>
        <div class="hs-info-box">
            <div class="hs-unit-box">
                <div class="title">위치</div>
                <div data-bind="text: Locker.Location"></div>
            </div>
            <div class="hs-unit-box">
                <div class="title">크기</div>
                <div data-bind="text: Locker.Size"></div>
            </div>
            <div class="hs-unit-box">
                <div class="title">상태</div>
                <div data-bind="text:Locker.Status"></div>
            </div>
            <div class="hs-unit-box">
                <div class="title">단구분</div>
                <div data-bind="text: Locker.Layer"></div>
            </div>
            <div class="hs-unit-box">
                <div class="title">보증금</div>
                <div data-bind="text: formatCurrency(Locker.Deposit)"></div>
            </div>
            <div class="hs-unit-box">
                <div class="title">임대료</div>
                <div data-bind="text: formatCurrency(Locker.RentalFee) + ' ('+Locker.RentalMonths+'개월)'"></div>
            </div>
        </div>
    </div>
</script>

<script type="text/html" id="locker-detail-template">
    <div>
        <h4>회원 정보</h4>
        <div class="hs-info-box">
            <div class="hs-unit-box">
                <div class="title">회원번호</div>
                <div data-bind="text : Member.ID "></div>
            </div>
            <div class="hs-unit-box">
                <div class="title">회원명</div>
                <div data-bind="text: Member.Name"></div>
            </div>
            <div class="hs-unit-box">
                <div class="title">핸드폰번호</div>
                <div data-bind="text: Member.MobileNumber"></div>
            </div>
        </div>
    </div>

    <div class="ch05">
        <h4>사물함 정보 <span data-bind="text: Locker.ID" /></h4>
        <div class="hs-info-box">
            <div class="hs-unit-box">
                <div class="title">위치</div>
                <div data-bind="text: Locker.Location"></div>
            </div>
            <div class="hs-unit-box">
                <div class="title">크기</div>
                <div data-bind="text: Locker.Size"></div>
            </div>
            <div class="hs-unit-box">
                <div class="title">상태</div>
                <div data-bind="text:Locker.Status"></div>
            </div>
            <div class="hs-unit-box">
                <div class="title">단구분</div>
                <div data-bind="text: Locker.Layer"></div>
            </div>
            <div class="hs-unit-box">
                <div class="title">보증금</div>
                <div data-bind="text: formatCurrency(Locker.Deposit)"></div>
            </div>
            <div class="hs-unit-box">
                <div class="title">임대료</div>
                <div data-bind="text: formatCurrency(Locker.RentalFee) + ' ('+Locker.RentalMonths+'개월)'"></div>
            </div>
        </div>
    </div>

    <div>
        <h4>임대 정보</h4>
        <div class="hs-info-box">
            <div class="hs-unit-box">
                <div class="title">임대기간</div>
                <div data-bind="text: formatRentalRange(Rental.RentStartDate,Rental.RentEndDate)"></div>
            </div>
            <div class="hs-unit-box">
                <div class="title">임대개월수</div>
                <div data-bind="text: Rental.RentalMonths"></div>
            </div>
            <div class="hs-unit-box">
                <div class="title">접수일</div>
                <div data-bind="text: Rental.CreationDate"></div>
            </div>
            <div class="hs-unit-box">
                <div class="title">임대료</div>
                <div data-bind="text: formatCurrency(Rental.RentalFee)"></div>
            </div>
            <div class="hs-unit-box">
                <div class="title">보증금</div>
                <div data-bind="text: formatCurrency(Rental.Deposit)"></div>
            </div>
            <div class="hs-unit-box" data-bind="visible: Locker.StatusCode === 'D' ">
                <div class="title">반납상태</div>
                <div data-bind="text: Rental.RentalStatus"></div>
            </div>
            <div class="hs-unit-box" data-bind="visible: Locker.StatusCode === 'D' ">
                <div class="title">연체일수</div>
                <div>
                    <span data-bind="text: Rental.OverdueDays" class="red"
                          style="font-weight: bold;"></span><span>일</span>
                </div>

            </div>
        </div>
    </div>
</script>

<div id="deposit-rent-popup" data-bind="dxPopup: {
            title: '보증금 등록',
            width: 600,
            height: 860,
            visible: false,
            onInitialized: function (e) {
                depositRentPopupInstance = e.component;
            },
            toolbarItems: [
                {
                    widget: 'dxButton',
                    toolbar: 'bottom',
                    location: 'after',
                    options: {
                        text: '보증금등록'
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

                        depositRentPopupInstance.hide();
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
    <div data-bind="dxBox : {
            direction: 'row',
            width : '100%',
            height: '100%',
        }">
        <div data-options="dxItem: {ratio: 1}" class="hs-popup-box">
            <div class="dx-field" data-bind="template: {name: 'member-template', foreach: $parents[0].lockerDetail }"></div>
            <div class="dx-field" data-bind="template: {name: 'locker-template', foreach: $parents[0].lockerDetail }"></div>
            <div class="mb20">
                <h4>결제수단</h4>
                <div class="locker-payment-button-container">
                    <div data-bind="dxButton: $parent.cashButtonOptions"></div>
                    <div data-bind="dxButton: $parent.cardButtonOptions"></div>
                    <div data-bind="dxButton: $parent.payButtonOptions"></div>
                </div>
                <div data-bind="dxDataGrid : $parent.paymentMethodGridOptions" class="mt10"></div>
            </div>
            <div class="locker-payment-info-container" style="width:92%">
                <h4>결제정보</h4>
                <div data-bind="template : {name: 're-rent-payment-information-template', data : $parent.lockerReRentPayInformation}"></div>
            </div>            
        </div>
    </div>
</div>

<div id="deposit-return-popup" data-bind="dxPopup: {
            title: '보증금 반환',
            width: 700,
            height: 650,
            visible: false,
            onInitialized: function (e) {
                depositReturnPopupInstance = e.component;
            },
            toolbarItems: [
                {
                    widget: 'dxButton',
                    toolbar: 'bottom',
                    location: 'after',
                    options: {
                        text: '보증금반환'
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

                        depositReturnPopupInstance.hide();
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
    <div data-bind="dxBox : {
            direction: 'row',
            width : '100%',
            height: '100%',
        }">
        <div data-options="dxItem: {ratio: 1}" class="hs-popup-box">
            <div class="dx-field" data-bind="template: {name: 'member-template', foreach: $parents[0].lockerDetail }"></div>
            <div data-options="dxItem : { ratio : 2.5}" class="hs-popup-box">
                <div data-bind="dxDataGrid : $parent.lockerPaymentGridOptions"></div>
            </div>            
	        <div data-options="dxItem: {ratio: 3}" class="hs-popup-box">
	        	<div class="mt10" data-bind="dxForm : $parent.depositReturnFormOptions"></div>
	        	<div class="mt05" data-bind="dxForm : $parent.accountInfoFormOptions"></div>
	        </div>          
        </div>
    </div>
</div>

<div id="locker-select-popup" data-bind="dxPopup: {
            title: '임대 사물함을 선택하세요',
            width: 650,
            height: 720,
            visible: false,
            onInitialized: function (e) {
                lockerSelectPopupInstance = e.component;
            },
            toolbarItems: [
                {
                    widget: 'dxButton',
                    toolbar: 'bottom',
                    location: 'after',
                    options: {
                        text: '선택적용'
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
                        targetLockerDetail(null);
                        targetLockerSelected(false);
                        lockerSelectPopupInstance.hide();

                    }
                },
            ],
}">
    <div data-bind="dxBox : {
            direction: 'row',
            width : '100%',
            height: '100%',
        }">
        <div data-options="dxItem: {ratio: 3}" class="hs-popup-box east-box">
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
            <div class="hs-locker-button-paging"><span data-bind="text: $parent.availableLockerCountPerPage"></span> /
                <span data-bind="text: $parent.availableLockerTotalCount"></span></div>
            <div class="dx-field"
                 data-bind="template : { name :'target-locker-template', foreach:$parents[0].targetLockerDetail}"></div>
        </div>  
    </div>
</div>

<div id="locker-change-popup" data-bind="dxPopup: {
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
                        text: '취소'
                    },
                    onClick(e) {
                        targetLockerDetail(null);
                        targetLockerSelected(false);
                        lockerChangePopupInstance.hide();

                    }
                },
            ],
}">
    <div data-bind="dxBox : {
            direction: 'row',
            width : '100%',
            height: '100%',
        }">
        <div data-options="dxItem: {ratio: 3}" class="hs-popup-box west-box">
            <h4>임대중인 사물함정보</h4>
            <div class="dx-field"
                 data-bind="template: {name: 'locker-detail-template', foreach: $parents[0].lockerDetail }"></div>
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
            <div class="hs-locker-button-paging"><span data-bind="text: $parent.availableLockerCountPerPage"></span> /
                <span data-bind="text: $parent.availableLockerTotalCount"></span></div>
            <div class="dx-field"
                 data-bind="template : { name :'target-locker-template', foreach:$parents[0].targetLockerDetail}"></div>
            <div style="display: table" data-bind="visible : $parents[0].targetLockerSelected()">
                <div style="display:table-cell;width:15%;padding-top: 20px;vertical-align: middle;">임대기간</div>
                <div style="display:table-cell">

                    <div data-bind="dxForm:{ formData : {rentStartDate:'2022-11-01', rentEndDate:'2022-11-30'},
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

            }">
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
                <div class="title">번호</div>
                <div data-bind="text: ID"></div>
            </div>
            <div class="hs-unit-box">
                <div class="title">위치</div>
                <div data-bind="text: Location"></div>
            </div>
            <div class="hs-unit-box">
                <div class="title">크기</div>
                <div data-bind="text: Size"></div>
            </div>
            <div class="hs-unit-box">
                <div class="title">단구분</div>
                <div data-bind="text: Layer"></div>
            </div>
            <div class="hs-unit-box">
                <div class="title">보증금</div>
                <div data-bind="text: formatCurrency(Deposit)"></div>
            </div>
            <div class="hs-unit-box">
                <div class="title">임대료</div>
                <div data-bind="text: formatCurrency(RentalFee) + ' ('+RentalMonths+'개월)'"></div>
            </div>
        </div>
    </div>
</script>

<div id="locker-return-popup" data-bind="dxPopup: {
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
    <div data-bind="dxBox : {
            direction: 'row',
            width : '100%',
            height: '100%',
        }">
        <div data-options="dxItem: {ratio: 3}" class="hs-popup-box west-box">
            <h4>임대정보</h4>
            <div class="dx-field"
                 data-bind="template: {name: 'locker-detail-template', foreach: $parents[0].lockerDetail }"></div>
        </div>
        <div data-options="dxItem: {ratio: 3}" class="hs-popup-box east-box">
            <div class="locker-return-form-box mb20">
                <h4>반납정보</h4>
                <div data-bind="dxForm : $parent.lockerReturnFormOptions"></div>
            </div>
            <div class="mb20" data-bind="visible : $parent.lockerReturnPayAsDeposit() === 0">
                <h4>결제수단</h4>
                <div class="locker-payment-button-container">
                    <div data-bind="dxButton: $parent.cashButtonOptions"></div>
                    <div data-bind="dxButton: $parent.cardButtonOptions"></div>
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

<div id="locker-rent-popup" data-bind="dxPopup: {
            title: '사물함 등록',
            width: 1400,
            height: 900,
            visible: false,
            onInitialized: function (e) {
                lockerRentPopupInstance = e.component;
            },
            toolbarItems: [
                {
                    widget: 'dxButton',
                    toolbar: 'bottom',
                    location: 'after',
                    options: {
                        text: '사물함등록'
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

                        lockerRentPopupInstance.hide();
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
    <div data-bind="dxBox : {
            direction: 'row',
            width : '100%',
            height: '100%',
        }">
        <div data-options="dxItem: {ratio: 5}" class="hs-popup-box west-box">
	        <div data-bind="dxToolbar : $parents[0].lockerToolbarOptions" class="toolbar"></div>
	        <div data-bind="dxScrollView : {}" class="pt05">
	            <div data-bind="foreach: $parents[0].lockers" class="hs-locker-list-container">
	                <div class="item-content" data-bind="click: $parents[1].lockerSelectionChanged, css : {selected : $parents[1].lockerSelectedItem() === $data }">
	                    <div class="header" style="display: table;background: #16213E;width:100%;">
	                        <div style="display: table-cell;
	    width: 22.5%;
	    border-right: 1px solid #EEEEEE;">
	                            <div class="agent" data-bind="text:Size, css : $parents[1].selectColorByLockerStatus(StatusCode)"></div>
	                        </div>
	                        <div style="display: table-cell;
	    width: 22.5%;
	    border-right: 1px solid #EEEEEE;">
	                            <div class="layer" data-bind="text:Layer, css : $parents[1].selectColorByLockerStatus(StatusCode)"></div>
	                        </div>
	                        <div style="display: table-cell;width:50%"></div>
	                    </div>
	                    <div class="body" style="height: 120px;background: #F0F0F0">
	                        <div class="locker-number" style="text-align: center" data-bind="text:ID, css : $parents[1].selectColorByLockerStatus(StatusCode)"></div>
	                        <div class="" style="text-align: center;font-size:15px;" data-bind="text:Status, css : $parents[1].selectColorByLockerStatus(StatusCode)"></div>
	                        <div class="hs-member-info" data-bind="visible : StatusCode === 'B' || StatusCode === 'D' ">
	                            <span data-bind="text:Name, css : $parents[1].selectColorByLockerStatus(StatusCode)"></span><br/>
	                            <span data-bind="text:RentEndDate, css : $parents[1].selectColorByLockerStatus(StatusCode)"></span>
	                        </div>
	                    </div>
	                </div>
	            </div>
	        </div>
        </div>
        <div data-options="dxItem: {ratio: 3}" class="hs-popup-box east-box">
            <div class="locker-return-form-box mb10">
            	<div class="dx-field" data-bind="template: {name: 'member-template', foreach: $parents[0].lockerDetail }"></div>
            	<div class="dx-field" data-bind="template: {name: 'locker-simple-template', foreach: $parents[0].lockerDetail }"></div>                
                <div data-bind="dxForm : $parent.lockerReRentFormOptions" style="margin-top:-25px"></div>
            </div>
            <div class="mb20">
                <h4>결제수단</h4>
                <div class="locker-payment-button-container" style="height: 84px;">
                    <div data-bind="dxButton: $parent.cashButtonOptions"></div>
                    <div data-bind="dxButton: $parent.cardButtonOptions"></div>
                    <div data-bind="dxButton: $parent.payButtonOptions"></div>
                </div>
                <div data-bind="dxDataGrid : $parent.paymentMethodGridOptions" class="mt10"></div>
            </div>
            <div class="locker-payment-info-container" style="width:35%;">
                <h4>결제정보</h4>
                <div data-bind="template : {name: 're-rent-payment-information-template', data : $parent.lockerReRentPayInformation}"></div>
            </div>
        </div>
    </div>
</div>

<div id="locker-re-rent-popup" data-bind="dxPopup: {
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
    <div data-bind="dxBox : {
            direction: 'row',
            width : '100%',
            height: '100%',
        }">
        <div data-options="dxItem: {ratio: 3}" class="hs-popup-box west-box">
            <h4>임대정보</h4>
            <div class="dx-field"
                 data-bind="template: {name: 'locker-detail-template', foreach: $parents[0].lockerDetail }"></div>
        </div>
        <div data-options="dxItem: {ratio: 3}" class="hs-popup-box east-box">
            <div class="locker-return-form-box mb20">
                <h4>반납정보</h4>
                <div data-bind="dxForm : $parent.lockerReRentFormOptions"></div>
            </div>
            <div class="mb20">
                <h4>결제수단</h4>
                <div class="locker-payment-button-container">
                    <div data-bind="dxButton: $parent.cashButtonOptions"></div>
                    <div data-bind="dxButton: $parent.cardButtonOptions"></div>
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

<script type="text/html" id="return-payasdeposit-information-template">
    <div class="locker-payment-info-box">
        <div class="locker-payment-header">연체료</div>
        <div class="locker-payment-body"><span>10,000</span><span class="ml05">원</span></div>
    </div>
    <div class="locker-payment-info-box">
        <div class="locker-payment-header">보증금</div>
        <div class="locker-payment-body"><span>5,000</span><span class="ml05">원</span></div>
    </div>
    <div class="locker-payment-sub-box">
        <div class="locker-payment-header">차감금액</div>
        <div class="locker-payment-body"><span>- 2,000</span><span class="ml05">원</span></div>
    </div>
    <div class="locker-payment-total-box">
        <div class="locker-payment-header">보증금 잔여금액</div>
        <div class="locker-payment-body"><span>3,000</span><span class="ml05">원</span></div>
    </div>
</script>

<script type="text/html" id="return-paysimple-information-template">
    <div class="locker-payment-info-box">
        <div class="locker-payment-header">연체료</div>
        <div class="locker-payment-body"><span>10,000</span><span class="ml05">원</span></div>
    </div>
    <div class="locker-payment-info-box">
        <div class="locker-payment-header">받을금액</div>
        <div class="locker-payment-body"><span>5,000</span><span class="ml05">원</span></div>
    </div>
    <div class="locker-payment-sub-box">
        <div class="locker-payment-header">결제금액</div>
        <div class="locker-payment-body"><span>3,000</span><span class="ml05">원</span></div>
    </div>
    <div class="locker-payment-total-box">
        <div class="locker-payment-header">남은금액</div>
        <div class="locker-payment-body"><span>7,000</span><span class="ml05">원</span></div>
    </div>
</script>

<script type="text/html" id="re-rent-payment-information-template" >
    <div class="locker-payment-info-box">
        <div class="locker-payment-header">임대료</div>
        <div class="locker-payment-body"><span data-bind="text: formatNumber(RentalFee)"></span><span class="ml05">원</span></div>
    </div>
    <div class="locker-payment-sub-box" data-bind="visible:DiscountAmount > 0">
        <div class="locker-payment-header">할인 (<span data-bind="text: DiscountRate"></span>%) <span data-bind="text: DiscountName" class="hs-locker-discount-text"></span></div>
        <div class="locker-payment-body"><span data-bind="text: formatNumber(DiscountAmount)"></span><span class="ml05">원</span></div>
    </div>
    <div class="locker-payment-info-box">
        <div class="locker-payment-header">받을금액</div>
        <div class="locker-payment-body"><span data-bind="text:formatNumber(AmountToBePaid)"></span><span class="ml05">원</span></div>
    </div>
    <div class="locker-payment-sub-box">
        <div class="locker-payment-header">결제금액</div>
        <div class="locker-payment-body"><span data-bind="text:formatNumber(PaidAmount)"></span><span class="ml05">원</span></div>
    </div>
    <div class="locker-payment-total-box">
        <div class="locker-payment-header">남은금액</div>
        <div class="locker-payment-body"><span data-bind="text:formatNumber(RemainingAmount)"></span><span class="ml05">원</span></div>
    </div>
</script>

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
            dataSource: ko.observable(null),
            showBorders: true,
            sorting: {
                mode: 'multiple',
            },
            scrolling: {
                columnRenderingMode: "standard",
                mode: "standard",
                preloadEnabled: false,
                renderAsync: undefined,
                rowRenderingMode: "standard",
                scrollByContent: true,
                scrollByThumb: false,
                showScrollbar: "onHover",
                useNative: "auto"
            },
            columns: [
                {
                    dataField: 'ID',
                    visible: false,
                    sortOrder: 'desc',
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
                            icon: 'refresh'
                        },
                        onClick() {
                            viewOptions.rentHistoryGridInstance.refresh();
                        }
                    },
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
        lockerDetailToolbarOptions: {
            items: [
                {
                    location: 'after',
                    widget: 'dxButton',
                    visible: false,
                    options: {
                        text: '변경',

                        onClick() {
                            viewOptions.lockerChangePopupInstance.show();
                        }
                    }
                },
                {
                    location: 'after',
                    widget: 'dxButton',
                    visible: false,
                    options: {
                        text: '반납',

                        onClick() {
                            viewOptions.lockerReturnPopupInstance.show();
                        }
                    }
                },
                {
                    location: 'after',
                    widget: 'dxButton',
                    visible: false,
                    options: {
                        text: '강제회수',

                        onClick() {
                            viewOptions.lockerForcedPopupInstance.show();
                        }
                    }
                },
                {
                    location: 'after',
                    widget: 'dxButton',
                    visible: false,
                    options: {
                        text: '재등록',
                        onClick() {
                            viewOptions.lockerReRentPopupInstance.show();
                        }
                    }
                }
            ],
            onInitialized: function (e) {
                viewOptions.lockerDetailToolbarInstance = e.component;
            }
        },
        lockerSelectionChanged: function (data) {
            viewOptions.lockerDetail({
                Member: {
                    ID: '00001234',
                    Name: '홍길동',
                    MobileNumber: '010-1234-5678',
                },
                Locker: {
                    Location: '프론트뒤',
                    Size: data.Size,
                    Status: data.Status,
                    StatusCode: data.StatusCode,
                    LayerCode: data.LayerCode,
                    Layer: data.Layer,
                    Deposit: 5000,
                    RentalFee: 10000,
                    RentalMonths: 1,
                    ID: data.ID,
                },
                Rental: {
                    RentStartDate: data.RentStartDate,
                    RentEndDate: data.RentEndDate,
                    CreationDate: data.Name ? '2022-09-16' : null,
                    RentalStatus: '연체',
                    OverdueDays: 5,
                    RentalFee: data.Name ? 10000 : null,
                    RentalMonths: data.Name ? 1 : null,
                    Deposit: data.Name ? 5000 : null,
                }


            });
            viewOptions.lockerSelectedItem(data);
            viewOptions.rentHistoryGridOptions.dataSource(rentHistoryStore);
        },
        lockerSelectedItem: ko.observable(null),
        lockerSelectPopupInstance: {},
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
        lockerRentPopupInstance: {},
        lockerReRentPopupInstance: {},
        depositRentPopupInstance: {},
        depositReturnPopupInstance: {},
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
                        displayExpr : function(item){
                            return item && `\${item.Name}` + (item.DiscountRate > 0 ? ` (\${item.DiscountRate}%)` : '');
                        },
                        dataSource : new DevExpress.data.ArrayStore({
                            key : 'ID',
                            data : discountInformations
                        }),
                        onValueChanged : function(e) {


                            if(e.value === 0) {
                                const buttons = ["dropDown"];
                                viewOptions.lockerReRentFormInstance.getEditor('DiscountReason').option('buttons',buttons);

                                const selectedItem = viewOptions.lockerReRentFormInstance.getEditor('DiscountReason').option("selectedItem");
                                viewOptions.lockerReRentDiscountSelectedItem(selectedItem);
                                const oldInformation = viewOptions.lockerReRentPayInformation();
                                oldInformation.DiscountName = null;
                                oldInformation.DiscountRate = 0;
                                oldInformation.DiscountAmount = 0;
                                oldInformation.AmountToBePaid = oldInformation.RentalFee - oldInformation.DiscountAmount;
                                oldInformation.RemainingAmount = oldInformation.AmountToBePaid - oldInformation.PaidAmount;
                                viewOptions.lockerReRentPayInformation(oldInformation);

                            } else {
                                const buttons = ["dropDown",
                                    {
                                        name: "nextDate",
                                        location: "after",
                                        options: {
                                            icon: "fa fa-times-circle",
                                            text:'비대면감면 자격인증',
                                            stylingMode: "contained",
                                            type:'danger',
                                            onClick: function(e) {
                                                e.component.option({
                                                    icon : 'fa fa-check-circle',
                                                    type:'success',
                                                });


                                            }
                                        }
                                    }];

                                viewOptions.lockerReRentFormInstance.getEditor('DiscountReason').option('buttons',buttons);
                                const selectedItem = viewOptions.lockerReRentFormInstance.getEditor('DiscountReason').option("selectedItem");
                                viewOptions.lockerReRentDiscountSelectedItem(selectedItem);
                                const oldInformation = viewOptions.lockerReRentPayInformation();
                                oldInformation.DiscountName = selectedItem.Name;
                                oldInformation.DiscountRate = selectedItem.DiscountRate;
                                oldInformation.DiscountAmount = oldInformation.RentalFee * (oldInformation.DiscountRate / 100);
                                oldInformation.AmountToBePaid = oldInformation.RentalFee - oldInformation.DiscountAmount;
                                oldInformation.RemainingAmount = oldInformation.AmountToBePaid - oldInformation.PaidAmount;
                                viewOptions.lockerReRentPayInformation(oldInformation);
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
                    template: function (data, itemElement) {
                        itemElement.append(`<span>\${formatCurrency(data.component.option('formData')[data.dataField])}</span>`);
                    },
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
        depositReturnFormOptions: {
            formData: ko.observable(null),
            colCount: 2,
            items: [{
	            dataField: 'DepositPayMethod',
	            editorType: 'dxRadioGroup',
	            cssClass: 'mt05',
	            editorOptions: {
	                layout: 'horizontal',
	                items: [{
	                        ID : '0001',
	                        Text : '현금환불'
	                    }, {
	                        ID : '0002',
	                        Text:'계좌이체환불',
	                }],
	                valueExpr: 'ID',
	                displayExpr: 'Text',
	                value: '0001',
	                onValueChanged: function (e) {
	                    if (e.value === '0001') {
	                        viewOptions.accountInfoFormInstance.option("visible", false);
	                    } else {
	                        viewOptions.accountInfoFormInstance.option("visible", true);
	                    }
	                }
	            },
	            label: {
	                text: '환불처리구분',
	            }
	        }, {
	        	dataField: 'LEC_PAY_DT', label: {text: '환불수입일자',}, editorType:"dxDateBox",
	       			editorOptions: {
	       	  			displayFormat: 'yyyy-MM-dd',
	       			},
	        }],
        }, 
        accountInfoFormInstance: {},
        accountInfoFormOptions: {
        	visible: false,
            formData: ko.observable(null),
            colCount: 2,
            items: [{colSpan:2, dataField: 'PAY_ACT_NO', label: {text: '계좌번호'}, editorType:"dxSelectBox", editorOptions: {
        	    dataSource: new DevExpress.data.ArrayStore({
        	        data: [{
        	  		  ID: '1',
        			  NAME: '311022-123666',
        			}, {
        				ID: '2',
        				NAME: '1234567890',
        			}],
        	        key: 'ID',
        	    }),
        	    displayExpr: 'NAME',
        	    valueExpr: 'ID',
        	    value: '1',
        		buttons: ['dropDown', {
        			name: 'addr_type',
        			location: 'after',
        			options: {
        				template: '<i class="nav-icon fas fa-cog"></i>',
        				type: 'default',
        				disabled: false,
        				onClick() {
        					DevExpress.ui.notify('코드등록 공통호출');
        				},
        			},
        		}],	
                
              }
        	}, {dataField: 'PAY_BANK', label: {text: '은행명'}, editorType:"dxSelectBox", editorOptions: {
	    	    dataSource: new DevExpress.data.ArrayStore({
	    	        data: [{
	    	  		  ID: '1',
	    			  NAME: '경남은행',
	    			}, {
	    				ID: '2',
	    				NAME: '국민은행',
	    			}],
	    	        key: 'ID',
	    	    }),
	    	    displayExpr: 'NAME',
	    	    valueExpr: 'ID',
	    	    value: '1',
	          }
	    	}, {dataField: 'PAY_ACT_NAME', label: {text: '예금주'},},
	    	],
            onInitialized: function (e) {
                viewOptions.accountInfoFormInstance = e.component;
            }	    	
        },        
        cashButtonOptions: {
            icon: 'fa fa-money',
            method: 'cash',
            hint: '현금결제',
            text: '현금결제',
            template: function (itemData, $buttonContent) {
                $buttonContent.append($('<div class="locker-payment-button">').append(`<i class="\${itemData.icon} fa-3x grey"></i>`)
                    .append(`<div class="mt15">\${itemData.text}</div>`));
            },
            onClick(e) {
                DevExpress.ui.notify({
                    message: `The "\${e.component.option('text')}" button was clicked`,
                    width: 320
                }, 'success', 1000);
            },
        },
        cardButtonOptions: {
            icon: 'fa fa-credit-card',
            method: 'card',
            hint: '카드결제',
            text: '카드결제',
            template: function (itemData, $buttonContent) {
                $buttonContent.append($('<div class="locker-payment-button">').append(`<i class="\${itemData.icon} fa-3x grey"></i>`)
                    .append(`<div class="mt15">\${itemData.text}</div>`));
            },
            onClick(e) {
                DevExpress.ui.notify({
                    message: `The "\${e.component.option('text')}" button was clicked`,
                    width: 320
                }, 'success', 1000);
            },
        },
        payButtonOptions: {
            icon: 'fa fa-google-wallet',
            method: 'simplyPay',
            hint: '간편결제',
            text: '간편결제',
            template: function (itemData, $buttonContent) {
                $buttonContent.append($('<div class="locker-payment-button">').append(`<i class="\${itemData.icon} fa-3x grey"></i>`)
                    .append(`<div class="mt15">\${itemData.text}</div>`));
            },
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
        lockerPaymentGridOptions: {
            showBorders: true,
            height: 250,
            scrolling: {
                mode: 'virtual',
            },
            selection: {mode: 'multiple',showCheckBoxesMode:'always'},	
            dataSource: ko.observableArray(null),
    		keyExpr: "ID",
            columns: [
                {
                    dataField: 'PaymentDate',
                    dataType: 'string',
                    caption: '결제일자',
                },
                {
                    dataField: 'Location',
                    caption: '사물함위치',
                },
                {
                    dataField: 'ID',
                    caption: '사물함번호',
                },                
                {
                    dataField: 'Layer',
                    caption: '단구분',
                },
                {
                    dataField: 'Size',
                    caption: '크기',
                },
                {
                    dataField: 'PaymentMethod',
                    caption: '결제방법',
                },
                {
                    dataField: 'Deposit',
                    caption: '보증금',
                },                
            ],
            onSelectionChanged(e) {
            	e.component.refresh(true);
            },            
            summary: {
                totalItems: [{
                  name: 'SelectedRowsSummary',
                  showInColumn: 'Deposit',
                  displayFormat: '선택금액 합계: {0}',
                  valueFormat: def_numberFormat,
                  summaryType: 'custom',
                }, {
                    name: 'TotalSum',
                    column: 'Deposit',
                    displayFormat: '전체 합계: {0}',                    
                    valueFormat: def_numberFormat,
                    summaryType: 'sum',
                  },
                ],
                calculateCustomSummary(options) {
                  if (options.name === 'SelectedRowsSummary') {
                    if (options.summaryProcess === 'start') {
                      options.totalValue = 0;
                    }
                    if (options.summaryProcess === 'calculate') {
                      if (options.component.isRowSelected(options.value.ID)) {
                        options.totalValue += options.value.Deposit;
                      }
                    }
                  }
                },
             }, 
             onCellPrepared: function(e) {  
	       	     if (e.rowType == "totalFooter") {  
	       	        let item = e.summaryItems.find(i => i.column == "Deposit");  
	       	        if (item) {
	       	            e.cellElement.attr("colspan", "3");  
	       	        }  
	       	     }  
             }              
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
    
	let lockerPayList = lockers();
	
	lockerPayList.forEach(function(data, idx) {
		data.Deposit = (idx + 1) * 1000;
	});
    
    viewOptions.lockerPaymentGridOptions.dataSource(lockerPayList);

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
        DiscountReason : 0,
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

    ko.applyBindings(viewOptions);
</script>