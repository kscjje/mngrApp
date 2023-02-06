<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>입장권매표관리</title>
    <link rel="stylesheet" href="/fmcs/css/ticket/sale.css" type="text/css"/>
</head>
<body class="dx-viewport">
<div class="row row_title">
    <div class="col-12">
        <ul class="navbar-nav">
            <li class="nav-item d-sm-inline-block quick-nav">
                입장권매표관리
            </li>

        </ul>
    </div>
</div>
<!-- Toolbar -->
<div data-bind="dxToolbar : {
        onInitialized(e) {
            mainToolbarInstance = e.component;
        }
    }" class="mb10 hs-main-toolbar">
    <div data-options="dxItem : {
        location:'before',
        text :'매표일자',
        cssClass : 'hs-sale-date-text',
    }"></div>
    <div data-options="dxItem : {
        widget : 'dxDateBox',
        location :'before',
        options : {
            displayFormat : 'yyyy-MM-dd',
            value : viewOptions.saleDate(),
            applyValueMode :'useButtons',
            applyButtonText : '확인',
            openOnFieldClick : true,
            onValueChanged(e){
                viewOptions.saleDate(e.value);
            }
        }
    }"></div>
    <div data-options="dxItem : {
        widget : 'dxButton',
        location:'after',
        options:{
            text:'거래취소',
            height:38,
            stylingMode: 'contained',
            onClick(e){
                location.href='/fmcs/ticket/paymentCancel';
            }
        }
    }"></div>
    <div data-options="dxItem :{
        widget : 'dxButton',
        location:'after',
        options:{
            icon : 'preferences',
            onClick(e){
                viewOptions.operationSettingsPopupInstance.show();
            }
        }
    }"></div>
</div>
<!-- Main -->
<div class="hs-subline-nav-bar">
    <div class="hs-program-title"><h2>프로그램</h2></div>
    <div class="hs-member-container">
        <div class="hs-member-icon-container"><i class="fa-solid fa-user-large"></i></div>
        <div data-bind="dxSelectBox: {
                placeholder :'Search ...',
                stylingMode: 'outlined',
                mode: 'search',
                searchEnabled:true,
                dataSource: new DevExpress.data.ArrayStore({
                    key : 'ID',
                    data : members,
                }),
                height : 40,
                searchExpr: ['Name','MobileNumber'],
                searchTimeout: 300,
                minSearchLength: 1,
                valueExpr : 'ID',
                displayExpr :'Name',
                buttons: [
                            {
                                location:'after',
                                name:'guest-info',
                                options: {
                                    text :'비회원',
                                    height:'95%',
                                    stylingMode: 'text',
                                    onClick(){
                                        viewOptions.searchMemberAutocompleteInstance.close();
                                        viewOptions.guestInfoRegisterPopupInstance.show();
                                    }
                                }
                            },
                            {
                                location:'after',
                                name :'membership-card',
                                options : {
                                    icon : 'fa-regular fa-id-card',
                                    stylingMode : 'text',
                                    onClick(e) {
                                        e.model.wayToFindMember('Card');
                                        e.model.membershipPopupInstance.show();
                                    }
                                }
                            },
                            {
                                location:'after',
                                name :'qr-code',
                                options :{
                                    icon : 'fa-solid fa-qrcode',
                                    stylingMode : 'text',
                                    onClick(e){

                                        e.model.wayToFindMember('QRCode');
                                        e.model.membershipPopupInstance.show();

                                    }
                                }
                            }
                         ],
                itemTemplate: $('#memberSearchTemplate'),
                onSelectionChanged(e){
                    selectedMember(e.selectedItem);
                },
                onInitialized(e){
                    viewOptions.searchMemberAutocompleteInstance = e.component;
                }
            }, visible : !selectedMember()" class="w90p"></div>
        <div data-bind="visible : selectedMember(), template : {name  :'memberInfoTemplate', foreach: selectedMember}" class="hs-member-info-container"></div>
    </div>
</div>
<div class="hs-main-container" data-bind="dxBox : {
     direction: 'row',
     width : '100%',
     height:' calc(100vh - 80px)'
}">
    <div data-options="dxItem : { ratio : 1, }" class="hs-main-west-container">
        <div data-bind="dxAccordion : $parent.programAccordionOptions" class="hs-accordion"></div>
    </div>
    <div data-options="dxItem : { ratio : 3, height:'100%',}">
        <div class="hs-checkbox-chips-container" data-bind="template:{name : 'priceChipsTemplate'}"></div>
        <div class="hs-product-container" data-bind="dxScrollView : {}">
            <div data-bind="foreach: $parents[0].dailyTickets" class="hs-ticket-list">
                <div class="hs-ticket-content" data-bind="dxButton:{
                    accessKey : AccessKey,
                    onClick(e){
                        $parents[1].addCartItem(this);
                    },
                }">
                    <div data-options="dxTemplate:{name: 'content'}">
                        <div class="mb05 hs-ticket-title"><span data-bind="text:$parent.ProductName"></span></div>
                        <div class="hs-ticket-policy"><span data-bind="text:pricePolicyText($parent)"></span></div>
                        <div class="hs-ticket-price"><span data-bind="text:formatCurrency($parent.UnitPrice)"></span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div data-options="dxItem : {  ratio : 1, }">
        <div class="hs-parking-container">
            <div class="label"><span class="dx-field-item-label-text">차량번호</span><span><i id="parking-helped-info" class="dx-icon dx-icon-help vam"></i></span>
                <div data-bind="dxTooltip : {
                        target: '#parking-helped-info',
                        showEvent: 'mouseenter',
                        hideEvent: 'mouseleave'
                }">
                    <div data-options="dxTemplate : {name : 'content'}">
                        <div id="tooltip-content"><span>주차정산을 위한 차량번호입니다.</span></div>
                    </div>
                </div>
            </div>
            <div class="select-box-container" data-bind="visible:!$parents[0].savedCarNumber()">
                <div data-bind="dxTextBox : $parents[0].parkingTextOptions" ></div>
            </div>
            <div class="car-number-container" data-bind="visible:$parents[0].savedCarNumber()">
                <div class="car-number"><span data-bind="text:$parents[0].savedCarNumber()"></span></div>
                <div class="clear">
                    <a href="#" data-bind="click: $parents[0].removeCarNumber()">
                        <i class="dx-icon-edit"></i>
                    </a>
                </div>
            </div>
        </div>
        <div class="hs-cart-container">
            <div data-bind="visible:$parents[0].cartItems().length == 0" class="hs-cart-empty-container">
                <div>
                    <div>
                        <span class="fa-stack fa-6x">
                            <i class="fa-regular fa-circle fa-stack-2x"></i>
                            <i class="fa-stack-1x fa-solid fa-cart-shopping"></i>
                        </span>
                    </div>
                    <div class="mt10"><span class="hs-shopping-cart-text">상품을 선택하세요.</span></div>
                </div>
            </div>
            <div data-bind="visible:$parent.cartItems().length > 0" class="h100p">
                <div data-bind="dxScrollView:{
                    height :'58.5%',
                }">
                    <div class="hs-cart-item-container" data-bind="foreach: $parents[0].cartItems">
                        <div class="hs-cart-item">
                            <div class="hs-cart-header">
                                <div><span data-bind="text:ProgramName" class="hs-cart-item-title"></span><span data-bind="text:RoundOfUseName" class="pl10"></span></div>
                                <div>
                                    <a href="#" data-bind="click: $parents[1].removeCartItem">
                                        <i class="dx-icon-close hs-icon-mid"></i>
                                    </a>
                                </div>
                            </div>
                            <div class="hs-cart-content">
                                <div class="hs-cart-subitem"><span>입장권</span> <span data-bind="text:PolicyGroupName" class="hs-policy-text"></span></div>
                                <div class="hs-cart-amount-container">
                                    <div data-bind="dxNumberBox : {
                                    height: '1.8rem',
                                    width: '6.5rem',
                                    value : Quantity,
                                    min : 0,
                                    buttons : [
                                        {
                                            location:'before',
                                            name:'minus',
                                            options: {
                                                icon : 'minus',
                                                stylingMode :'text',
                                                onClick(e){
                                                    let quantity = e.model.Quantity();
                                                    e.model.Quantity(quantity - 1);

                                                }
                                            }
                                        },
                                        {
                                            location:'after',
                                            name:'plus',
                                            options:{
                                                icon : 'plus',
                                                stylingMode :'text',
                                                onClick(e){
                                                    let quantity = e.model.Quantity();
                                                    e.model.Quantity(quantity + 1);

                                                }
                                            }
                                        },
                                    ],
                                    onValueChanged(e){
                                        e.model.ListAmount(e.model.ListPrice * e.value);
                                        e.model.SaleAmount(e.model.SalePrice() * e.value);
                                        e.model.NetAmount(e.model.NetPrice() * e.value);
                                        e.model.TaxAmount(e.model.Taxable ? e.model.NetAmount() * 0.1 : 0);
                                        if(e.value <= 0) {

                                            $parents[1].removeCartItem(e.model);
                                        }
                                    },
                                    onInitialized(e){
                                        e.model.QuantityInstance = e.component;
                                    }
                                }"></div>
                                    <div><span data-bind="text:formatCurrency(NetAmount())"></span></div>
                                </div>
                                <div class="hs-cart-non-discount-container" data-bind="visible:!Discountable"></div>
                                <div class="hs-cart-discount-container" data-bind="visible:Discountable">
                                    <div class="hs-cart-discount-title"><span>할인설정</span></div>
                                    <div class="hs-cart-discount-box">
                                        <div data-bind="dxSelectBox : {
                                            height: '2rem',
                                            items : discountItems,
                                            valueExpr : 'ID',
                                            value : DiscountId,
                                            displayExpr(item) {
                                                if(item){
                                                    if(item.Unit) {
                                                        return item.Name +'('+item.Unit.formatAsPercent()+')';
                                                    }
                                                    return item.Name;
                                                }
                                            },
                                            onValueChanged(e){

                                                e.model.DiscountId(e.value);
                                                const selectedItem = e.component.option('selectedItem');

                                                if(e.value === '0000') {
                                                    e.model.QuantityInstance.option('disabled',false);
                                                } else {

                                                    const currentQuantity = e.model.Quantity();
                                                    if(currentQuantity >= 2) {

                                                        let addableQuantity = currentQuantity - 1;

                                                        const restOfItem = {

                                                            ID : e.model.ProductId,
                                                            ProgramName : e.model.ProgramName,
                                                            UnitPrice : e.model.UnitPrice,
                                                            Quantity : addableQuantity,
                                                            Taxable : e.model.Taxable,
                                                            Discountable : e.model.Discountable,
                                                            PolicyGroupName : e.model.PolicyGroupName,
                                                        };

                                                        $parents[1].addCartItem(restOfItem);
                                                        e.model.Quantity(1);
                                                    }

                                                    e.model.QuantityInstance.option('disabled',true);
                                                }

                                                if(selectedItem) {

                                                    e.model.DiscountRate(selectedItem.Unit);
                                                    e.model.SalePrice(e.model.ListPrice * selectedItem.Unit);
                                                    e.model.NetPrice(e.model.ListPrice - e.model.SalePrice());
                                                    e.model.SaleAmount(e.model.SalePrice() * e.model.Quantity());
                                                    e.model.NetAmount(e.model.NetPrice() * e.model.Quantity());
                                                    e.model.TaxAmount(e.model.Taxable ? e.model.NetAmount() * 0.1 : 0);
                                                }
                                            },
                                            buttons : [
                                                {
                                                    location :'before',
                                                    name : 'discount-auth-button',
                                                    options : {
                                                        text :'감면인증',
                                                        height: 30,
                                                        type:'default',
                                                        stylingMode :'contained',
                                                        onClick(e){
                                                            $parents[1].selectedCartItem(e.model);
                                                            $parents[1].reductionAuthenticationPopupInstance.show();
                                                        },
                                                    }
                                                },
                                                'dropDown',
                                            ]
                                        }"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="hs-cart-payment-container">
                    <div class="hs-cart-subtotal-amount-box">
                        <div class="hs-cart-payment-header">판매금액</div>
                        <div class="hs-cart-payment-body"><span data-bind="text: formatNumber($parent.SubTotalAmount())"></span><span class="ml05">원</span></div>
                    </div>
                    <div class="hs-cart-sub-box">
                        <div class="hs-cart-payment-header">할인</div>
                        <div class="hs-cart-payment-body"><span data-bind="text: formatNumber($parent.DiscountAmount())"></span><span class="ml05">원</span></div>
                    </div>
                    <div class="hs-cart-sub-box">
                        <div class="hs-cart-payment-header">부가세</div>
                        <div class="hs-cart-payment-body"><span data-bind="text : formatNumber($parent.TaxAmount())"></span><span class="ml05">원</span></div>
                    </div>
                    <div class="hs-cart-total-box">
                        <div class="hs-cart-payment-header">합계</div>
                        <div class="hs-cart-payment-body"><span data-bind="text : formatNumber($parent.TotalAmount())"></span><span class="ml05">원</span></div>
                    </div>
                </div>
                <div class="hs-cart-payment-button-container" data-bind="visible :$parent.showPayment">
                    <div data-bind="dxButton : {
                            text :'결  제',
                            width: '45%',
                            stylingMode : 'contained',
                            type :'default',
                            template : $('#cart-payment-button-template'),
                            onClick(e){
                                viewOptions.checkoutPopupInstance.toggle(true);
                            }
                    }"></div>
                    <div data-bind="dxButton : {
                            text :'판매취소',
                            width: '45%',
                            stylingMode : 'outlined',
                            type :'default',
                            template : $('#cart-payment-button-template'),
                            onClick(e){
                                viewOptions.cartItems.removeAll();
                            }
                    }"></div>
                </div>
                <div class="hs-cart-payment-button-container" data-bind="visible : $parent.showBooking">
                    <div data-bind="dxButton : {
                            text :'예  약',
                            width: '45%',
                            template : $('#cart-payment-button-template'),
                            onClick(e){

                            }
                    }"></div>
                    <div data-bind="dxButton : {
                            text :'예약취소',
                            width: '45%',
                            template : $('#cart-payment-button-template'),
                            onClick(e){
                                viewOptions.cartItems.removeAll();
                            }
                    }"></div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="hs-operation-setting-popup hs-hidden" data-bind="dxPopup : {
    title : '매표운영설정',
    width :  680,
    height : 520,
    visible: false,
    onInitialized(e) {
        operationSettingsPopupInstance = e.component;
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
                text: '취소',
                onClick(e) {
                    operationSettingsPopupInstance.hide();
                }
            },

        },
    ],
}" >
    <div data-options="dxTemplate : {name : 'content'}">
        <div data-bind="dxList : {
            dataSource : operatingSettings,
            keyExpr: 'id',
            displayExpr: 'Name',
            selectionMode: 'all',
            showSelectionControls:true,

        }"></div>
    </div>
</div>

<div class="hs-guest-info-register-popup hs-hidden"
     data-bind="dxPopup: {
        title :'비회원 정보입력',
        width : 480,
        height: 250,
        onInitialized(e) {
            guestInfoRegisterPopupInstance = e.component;
        },
        toolbarItems: [

        {
            widget: 'dxButton',
            toolbar: 'bottom',
            location: 'after',
            options: {
                text: '저장',
                onClick:function(e){
                    let formData = guestInfoRegisterFormInstance.option('formData');
                    formData['Type']='guest';
                    viewOptions.selectedMember(formData);

                    guestInfoRegisterFormInstance.resetOption('formData');
                    guestInfoRegisterPopupInstance.hide();
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

                    guestInfoRegisterFormInstance.resetOption('formData');
                    guestInfoRegisterPopupInstance.hide();
                }
            },

        },
    ],
    }"
>
    <div data-options="dxTemplate : {name :'content'}">
        <div data-bind="dxForm : {
            colCount : 1,
            showColonAfterLabel: false,
            items : [
                {
                    dataField :'Name',
                    label : {
                        text :'이름',
                    }
                },
                {
                    dataField :'MobileNumber',
                    label : {
                        text :'핸드폰번호',
                    },
                }
            ],
            onInitialized(e){
                guestInfoRegisterFormInstance = e.component;
            }

        }"></div>
    </div>
</div>
<div class="hs-membership-popup hs-hidden"
     data-bind="dxPopup : {
        title :'회원카드',
        width : 600,
        height : 680,
        onInitialized(e) {
            membershipPopupInstance = e.component;
        },
        onShowing(e){
            const way = e.model.wayToFindMember();
            e.model.membershipFormInstance.itemOption('membershipTabItem','tabPanelOptions' , {
                selectedIndex : way === 'Card' ? 0 : 1,
                height : 530,
            });
        },
        toolbarItems: [
        {
            widget: 'dxButton',
            toolbar: 'bottom',
            location: 'after',
            options: {
                text: '확인',
                onClick:function(e){
                    let formData = membershipFormInstance.option('formData');
                    console.log(formData);
                    membershipFormInstance.resetOption('formData');
                    membershipPopupInstance.hide();
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
                    membershipFormInstance.resetOption('formData');
                    membershipPopupInstance.hide();
                }
            },

        },
    ],

    }">
    <div data-options="dxTemplate : {name :'content'}">
        <div data-bind="dxForm : membershipFormOptions"></div>
    </div>
</div>
<div class="hs-reduction-authentication-popup hs-hidden" data-bind="dxPopup :{
    title :'비대면 감면인증',
    width : 750,
    height : 850,
    toolbarItems: [{
			widget: 'dxButton',
		    toolbar: 'bottom',
		    location: 'after',
		    options: {
		    	text: '적용',
		    	onClick(e) {
		    	    selectedCartItem().DiscountId(discountAuthenticationResultFormInstance.getEditor('authResult').option('value'));
		    		DevExpress.ui.notify('적용');
		    		viewOptions.reductionAuthenticationPopupInstance.hide();
				},
			},
		}, {
			widget: 'dxButton',
		    toolbar: 'bottom',
		    location: 'after',
		    options: {
		    	text: '취소',
		    	onClick() {
		    		reductionAuthenticationPopupInstance.hide();
				},
			},
		}],
		onInitialized (e){
            reductionAuthenticationPopupInstance = e.component;
		},
		onShowing(e) {
		    discountAuthenticationFormOptions.formData({
		        AgreementInformation : '동의서',
		        Name :'홍길동',
		    });
		},
		onHiding(e) {
		    e.model.discountAuthenticationFormInstance.resetOption('formData');
		    e.model.discountAuthenticationResultFormInstance.resetOption('formData');
		}
}">
    <div data-options="dxTemplate : {name :'content'}">
        <div data-bind="dxForm : discountAuthenticationFormOptions"></div>
        <div data-bind="dxForm : discountAuthenticationResultFormOptions"></div>
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
        <div class="hs-checkout-total-price"><span class="hs-checkout-krw-text"><i class="fa-solid fa-won-sign" aria-hidden="true"></i></span><span  class="hs-checkout-total-price-text" data-bind="text:formatNumber(TotalAmount())"></span></div>
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

<script type="text/html" id="memberInfoTemplate">
    <div class="hs-member-info-table">
        <div class="title">
            <div><span data-bind="text:formatMemberNameInfo($data)"></span></div>
            <div><span data-bind="text:formatMemberInfo($data)"></span></div>
        </div>
        <div class="clear">
            <a href="#" data-bind="click: $parents[0].clearMember">
                <i class="dx-icon-trash"></i>
            </a>
        </div>
    </div>
</script>

<script type="text/html" id="memberSearchTemplate">
    <div class="hs-member-search-element-table">
        <div class="hs-member-picture-cell"><div data-bind="style: { 'background-image': ImageUrl ? 'url(\'' + ImageUrl + '\')' : 'url(\'' + '/fmcs/images/profile.png' + '\')'  }"></div></div>
        <div class="hs-member-info-cell">
            <div class="hs-member-info-table">
                <div class="hs-name-cell">
                    <span data-bind="text:Name"></span>
                </div>
                <div class="hs-additional-info-cell">
                    <span data-bind="text: Birthday"></span> (<span data-bind="text : Age"></span>세)
                </div>
            </div>
            <div class="hs-member-mobile-info">
                <div class="hs-member-mobile-info-cell">
                    <div><span data-bind="text : MobileNumber"></span></div>
                </div>
            </div>
        </div>
    </div>
</script>

<script type="text/html" id="programTitle">
    <h4 data-bind="text:LocationName +' - ' + ProgramName"></h4>
</script>

<script type="text/html" id="roundOfUseItemTemplate">
    <div data-bind="dxList :{
        dataSource : new DevExpress.data.DataSource({
            load:function(loadOptions) {

                const now = new Date();
                const startTime = viewOptions.saleDate();

                RoundOfUseItems.forEach((item)=>{
                    startTime.setHours(item.StartTime.substring(0,2),item.StartTime.substring(2,4), 0);
                    item.disabled = startTime < now ;
                });

                return RoundOfUseItems;
            }
        }),
        keyExpr : 'Id',
        selectionMode:'single',
        onSelectionChanged(e){
            $parents[1].selectedRoundOfUseItem(e.addedItems[0]);
        },
        onContentReady(e){
            const enabledData = e.model.RoundOfUseItems.filter(({disabled}) => !disabled);
            const selectedItems = enabledData ? [enabledData[0]] : null;
            e.component.option('selectedItems', selectedItems);
        },
    }">
        <div data-options="dxTemplate: { name:'item' }" class="hs-roundofuse-list-container">
            <div class="title-container">
                <div><span data-bind="text : Name" class="title"></span></div>
                <div><span data-bind="text : StartTime.formatTime()"></span> ~ <span data-bind="text : EndTime.formatTime()"></span>
                </div>
            </div>
            <div class="leftover-container">
                <div data-bind="if: SitingCapacityPolicyCode == '0001'">
                    <div class="total-policy-container">
                        <span class="total-policy-text">
                            <span data-bind="text :SitingCapacity.LeftOver"></span>/<span
                                data-bind="text: SitingCapacity.Total"></span>
                        </span>
                    </div>
                </div>
                <div data-bind="if: SitingCapacityPolicyCode == '0002'">
                    <div class="male-policy-container">
                        <span>남자</span>
                        <span class="male-policy-text">
                            <span data-bind="text: SitingCapacity.Male.LeftOver"></span>/<span
                                data-bind="text : SitingCapacity.Male.Total"></span>
                        </span>
                    </div>
                    <div class="female-policy-container">
                        <span>여자</span>
                        <span class="female-policy-text">
                            <span data-bind="text: SitingCapacity.Female.LeftOver"></span>/<span
                                data-bind="text : SitingCapacity.Female.Total"></span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</script>

<script type="text/html" id="priceChipsTemplate">
    <div data-bind="dxCheckBox: {
                text : '성인',
                value : true,
                onValueChanged(e){
                }
            }" class="mr05"></div>
    <div data-bind="dxCheckBox: {
                text : '청소년',
                value : true,
            }" class="mr05"></div>
    <div data-bind="dxCheckBox: {
                text : '어린이',
                value : true,
            }" class="mr05"></div>
    <div data-bind="dxCheckBox: {
                text : '남자',
                value : true,
            }" class="mr05"></div>
    <div data-bind="dxCheckBox: {
                text : '여자',
                value : true,
            }" class="mr05"></div>
    <div data-bind="dxCheckBox: {
                text : '단체',
                value : true,
            }" class="mr05"></div>
    <div data-bind="dxCheckBox: {
                text : '개인',
                value : true,
            }" class="mr05"></div>
</script>

<script type="text/html" id="cart-payment-button-template">
    <div class="hs-cart-payment-button">
        <span data-bind="text: text"></span>
    </div>
</script>

<script type="text/html" id="agreement-description-template">
    <div><p>* 상기 개인정보 제공동의하며  동의가 없는경우 감면자격조회 가 불가합니다.</p></div>
</script>

<script type="text/html" id="authentication-empty-text">
    <div><p>인증된 감면 자격이 없습니다.</p></div>
</script>

<script type="text/html" id="authentication-success-text">
    <div><p>정상인증 되었습니다.</p></div>
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

<script type="text/javascript" src="/fmcs/js/ticket/html5-qrcode.min.js"></script>
<script type="text/javascript" src="/fmcs/js/ticket/cartItem.js"></script>
<script type="text/javascript" src="/fmcs/js/ticket/sale.js"></script>
<script type="text/javascript">

    const viewOptions = {
        parkingTextInstance : {},
        parkingTextOptions : {
            placeholder : '차량번호 한글포함 전체입력',
            height :40,
            showClearButton: true,
            buttons :[ 'clear',
                {
                    location:'after',
                    name : 'parking',
                    options : {
                        icon : 'fa-solid fa-car-side',
                        stylingMode : 'contained',
                        type:'default',
                        onClick(){
                           if(viewOptions.parkingTextInstance.option('value').trim() === '') {
                               DevExpress.ui.dialog.alert('차량번호를 입력하세요.', '차량번호 등록');
                               return false;
                           }
                           viewOptions.savedCarNumber(viewOptions.parkingTextInstance.option('value'));
                        }
                    }
                }
            ],
            onInitialized(e){
                viewOptions.parkingTextInstance = e.component;
            }
        },
        removeCarNumber :  function(){
            this.savedCarNumber(null);
        },
        savedCarNumber : ko.observable(),
        selectedOperations : ko.observableArray([]),
        operationSettingsPopupInstance: {},
        saleDate : ko.observable(new Date()),
        mainToolbarInstance: {},
        programAccordionInstance: {},
        programAccordionOptions: {
            dataSource: ko.observable(),
            animationDuration: 300,
            collapsible: false,
            multiple: false,
            itemTitleTemplate: $('#programTitle'),
            itemTemplate: $('#roundOfUseItemTemplate'),
            onInitialized(e) {
                viewOptions.programAccordionInstance = e.component;
            },
        },
        selectedRoundOfUseItem: ko.observable(),
        dailyTickets: ko.observableArray(),
        addCartItem: function (data) {
            data['RoundOfUseId'] = viewOptions.selectedRoundOfUseItem().ID;
            data['RoundOfUseName'] = viewOptions.selectedRoundOfUseItem().Name;
            const totalCount = viewOptions.totalCartCount();
            const cartItem = new CartItem(viewOptions.totalCartCount(totalCount + 1), data);
            viewOptions.cartItems.push(cartItem);

        },
        cartItems: ko.observableArray([]),
        totalCartCount: ko.observable(0),
        selectedMember: ko.observable(),
        clearMember: function () {
            viewOptions.searchMemberAutocompleteInstance.reset();
            viewOptions.selectedMember(null);
        },
        searchMemberAutocompleteInstance: {},
        guestInfoRegisterPopupInstance: {},
        guestInfoRegisterFormInstance: {},
        membershipPopupInstance: {},
        membershipFormInstance: {},
        membershipFormOptions : {
            height :'100%',
            items : [
                {
                    itemType :'tabbed',
                    name : 'membershipTabItem',
                    tabPanelOptions : {
                        height : 530,
                        selectedIndex : 0,
                    },
                    tabs : [
                        {
                            title  :'회원카드',
                            name : 'membershipCardTab',
                            items :[
                                {
                                    label : {
                                        text :'회원카드를 리더기에 읽혀주세요.....',
                                        location : 'top',
                                        showColon : false,

                                    },
                                    dataField :'CardNumber',
                                }
                            ]
                        },
                        {
                            title :'네이버QR',
                            name  :'membershipQRTab',
                            items :[
                                {
                                    label : {
                                        text : '네이버 QR 코드를 리더기에 읽혀주세요.....',
                                        location : 'top',
                                        showColon: false,
                                    },
                                    template : function(data, itemElement) {
                                        $('<div></div').attr('id', 'reader').addClass('w600').appendTo(itemElement);

                                        const html5QrcodeScanner = new Html5QrcodeScanner("reader", {fps: 10, qrbox: 250});

                                        function onScanSuccess(decodedText, decodedResult) {
                                            // Handle on success condition with the decoded text or result.
                                            console.log(`Scan result: \${decodedText}`, decodedResult);
                                            // ...
                                            html5QrcodeScanner.clear();
                                            // ^ this will stop the scanner (video feed) and clear the scan area.
                                        }
                                        html5QrcodeScanner.render(onScanSuccess);
                                    }
                                }
                            ]
                        }
                    ]
                }
            ],
            onInitialized(e) {
                viewOptions.membershipFormInstance = e.component;
            }

        },
        removeCartItem: function (item) {
            const totalCount = viewOptions.totalCartCount();
            viewOptions.cartItems.remove(item);
            viewOptions.totalCartCount(totalCount - 1);
        },
        reductionAuthenticationPopupInstance : {},
        selectedCartItem : ko.observable(),
        discountAuthenticationFormInstance : {},
        discountAuthenticationFormOptions : {
            formData : ko.observable(null),
            onInitialized(e){
                viewOptions.discountAuthenticationFormInstance = e.component;
            },
            items :[
                {
                    itemType :'group',
                    caption :'감면대상자 정보를 입력하고 조회 방법을 선택하세요.',
                    items : [
                        {
                            label : {
                                text : '성 명',

                            },
                            dataField :'Name',
                            editorOptions : {

                            }
                        },
                        {
                            itemType :'group',
                            colCount:2,
                            items :[
                                {
                                    label : {
                                        text:'주민번호',
                                    },
                                    cssClass: 'hs-registration-first-number',
                                    dataField :'RegistrationFirstNumber',
                                },
                                {
                                    label : {
                                        visible :false,
                                    },
                                    cssClass :'hs-registration-last-number',
                                    dataField: 'RegistrationLastNumber',
                                },
                            ],

                        },
                        {
                            label : {
                                text :'감면자격선택',
                            },
                            editorType :'dxSelectBox',
                            editorOptions : {
                                dataSource : new DevExpress.data.ArrayStore({
                                    key : 'ID',
                                    data :discountAuthItems,
                                }),
                                valueExpr :'ID',
                                displayExpr(item) {

                                    if(item){

                                        if(item.Unit){
                                            return `\${item.Name} (\${item.Unit.formatAsPercent()})`;
                                        }else  {
                                            return item.Name;
                                        }

                                    }
                                }

                            }
                        }
                    ]
                },
                {
                    itemType: 'group',
                    caption :'개인정보 제공 동의(필수)',
                    items :[
                        {
                            dataField :'AgreementInformation',
                            label : {
                                visible:false,
                            },
                            editorType: 'dxTextArea',
                            editorOptions : {
                                readOnly:true,
                                height : 220,
                            }

                        }
                    ]
                },
                {
                    itemType:'group',
                    colCount:6,
                    items : [
                        {
                            colSpan:4,
                            template : $('#agreement-description-template'),
                            cssClass :'hs-agreement-description-container',
                        },
                        {
                            editorType:'dxCheckBox',
                            cssClass : 'hs-agreement-checkbox-container',
                            editorOptions : {
                                text :'동의합니다.',
                                value :false,
                            }
                        },
                        {
                            itemType :'button',
                            cssClass :'hs-agreement-button-container',
                            buttonOptions: {
                                text: "자격인증조회",
                                type: "default",
                                onClick: function (e) {
                                    const data = [
                                        {
                                            ID : '0001',
                                            Text : '국가유공자-본인',
                                            DiscountRate : 0.5,
                                        },
                                        {
                                            ID : '0005',
                                            Text : '기초생활수급자',
                                            DiscountRate: 0.3
                                        },
                                        {
                                            ID : '0006',
                                            Text : '관내거주',
                                            DiscountRate: 0.1
                                        }
                                    ];

                                    if(data && data.length > 0) {
                                        const store = new DevExpress.data.ArrayStore({
                                            key : 'ID',
                                            data : data,
                                        });

                                        e.model.discountAuthenticationResultFormInstance.itemOption('resultGroup.successItemGroup','visible',true);
                                        e.model.discountAuthenticationResultFormInstance.getEditor('authResult').option('dataSource',store);
                                        e.model.discountAuthenticationResultFormInstance.itemOption('resultGroup.emptyItemGroup','visible', false);

                                    } else {
                                        e.model.discountAuthenticationResultFormInstance.itemOption('resultGroup.successItemGroup','visible',false);
                                        e.model.discountAuthenticationResultFormInstance.itemOption('resultGroup.emptyItemGroup','visible', true);
                                    }

                                }
                            }
                        }
                    ]
                }
            ]
        },
        discountAuthenticationResultFormInstance : {},
        discountAuthenticationResultFormOptions : {
            colCount:1,
            height:200,
            items :[
                {
                    caption(){
                        return '자격인증결과';
                    },
                    itemType :'group',
                    name : 'resultGroup',
                    cssClass : 'hs-authentication-result-container',
                    items:[
                        {
                            itemType :'group',
                            name :'successItemGroup',
                            visible:false,
                            items :[
                                {
                                    label :{
                                        visible:false,
                                    },
                                    cssClass :'hs-auth-result-radiogroup-container',
                                    dataField :'authResult',
                                    editorType: 'dxRadioGroup',
                                    editorOptions : {
                                        layout : 'horizontal',
                                        valueExpr: 'ID',
                                        displayExpr(item){
                                            return `\${item.Text} (\${item.DiscountRate.formatAsPercent()})`;
                                        }
                                    }
                                },
                                {
                                    itemType:'group',
                                    name : 'success-text',
                                    template : $('#authentication-success-text'),
                                    cssClass: 'hs-auth-result-text-container'
                                },
                            ]
                        },
                        {
                            itemType:'group',
                            name : 'emptyItemGroup',
                            visible:false,
                            template : $('#authentication-empty-text'),
                            cssClass: 'hs-auth-result-text-container'
                        }
                    ]
                }
            ],
            onInitialized(e){
                viewOptions.discountAuthenticationResultFormInstance = e.component;
            }

        },
        checkoutPopupInstance : {},
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
        wayToFindMember: ko.observable('Card')
    };

    viewOptions.SubTotalAmount= ko.computed(function() {
        let total = 0;
        ko.utils.arrayForEach(this.cartItems(), function(item) {

            let value = item.ListAmount();
            if (isNaN(value)) {
                return false;
            }
            total += value;
        });

        return total;
    }, viewOptions);

    viewOptions.DiscountAmount= ko.computed(function() {
        let total = 0;
        ko.utils.arrayForEach(this.cartItems(), function(item) {

            let value = item.SaleAmount();
            if (isNaN(value)) {
                return false;
            }
            total += value;
        });

        return total;
    }, viewOptions);

    viewOptions.TaxAmount= ko.computed(function() {
        let total = 0;
        ko.utils.arrayForEach(this.cartItems(), function(item) {

            let value = item.TaxAmount();
            if (isNaN(value)) {
                return false;
            }
            total += value;
        });

        return total;
    }, viewOptions);

    viewOptions.TotalAmount= ko.computed(function() {
        let total = 0;
        ko.utils.arrayForEach(this.cartItems(), function(item) {

            let value = item.NetAmount() + item.TaxAmount();
            if (isNaN(value)) {
                return false;
            }
            total += value;
        });
        return total;
    }, viewOptions);

    const programStore = new DevExpress.data.ArrayStore({
        key: 'ID',
        data: programs,
    })
    viewOptions.programAccordionOptions.dataSource(programStore);
    viewOptions.selectedRoundOfUseItem.subscribe((newValue)=>{

        // checkbox chips control

        // tickets control
        viewOptions.dailyTickets(dailyTickets);

    });

    viewOptions.saleDate.subscribe((newValue)=>{
        viewOptions.programAccordionOptions.dataSource(programStore);
        viewOptions.cartItems.removeAll();
    });

    viewOptions.showPayment = ko.computed(()=> {
        const today = new Date();
        return viewOptions.saleDate().formatDateString('yyyy-MM-dd') === today.formatDateString('yyyy-MM-dd');
    }, viewOptions);

    viewOptions.showBooking = ko.computed(()=> {
        const today = new Date();
        return viewOptions.saleDate().formatDateString('yyyy-MM-dd') > today.formatDateString('yyyy-MM-dd');
    });


    ko.applyBindings(viewOptions);


    function formatMemberInfo(data) {

        if (data.Type === 'guest') {

            return data.MobileNumber;
        } else {
            return `\${data.ID}/\${data.MobileNumber}`;
        }
    }

    function formatMemberNameInfo(data) {
        if (data.Type === 'guest') {

            return `\${data.Name} (비회원)`;
        } else {
            return data.Name;
        }
    }
</script>
</body>
</html>
