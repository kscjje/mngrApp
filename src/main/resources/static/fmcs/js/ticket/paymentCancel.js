'use strict';
DevExpress.config({defaultCurrency: "KRW"});
DevExpress.setTemplateEngine("underscore");
Date.prototype.formatDateString = function(format){

    return DevExpress.localization.formatDate(this,format);

} ;

window.formatCurrency = new Intl.NumberFormat('ko-KR', {
    style: 'currency', currency: 'KRW', minimumFractionDigits: 0, maximumFractionDigits: 2,
}).format;

window.formatNumber = new Intl.NumberFormat('ko-KR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
}).format;

const receiptSearchData = [
    {
        ReceiptNo : '202211280000001',
        TransactionDate : '2022-11-21 17:43:12',
        PaymentMethod : 'Card',
        PaymentLocationCode : '0001',
        PaymentLocationName :'온라인',
        SaleDate : '2022-12-31',
        MemberInfo : {
            Name : '홍길동',
            MobileNumber : '010-1234-5678',
        },
        PaymentInfo : {
            MethodName : '카드',
            MethodDetail : '신한 4903-21**'
        },
        TotalAmount  : 12500,
        ProductName  :'수영장-일일수영 외...',
    },
    {
        ReceiptNo : '202211280000002',
        TransactionDate : '2022-11-21 17:43:12',
        PaymentMethod : 'Cash',
        PaymentLocationCode : '0001',
        PaymentLocationName :'온라인',
        SaleDate : '2022-11-30',
        MemberInfo : {
            Name : '홍길동',
            MobileNumber : '010-1234-5678',
        },
        PaymentInfo : {
            MethodName : '현금',
            MethodDetail : null
        },
        TotalAmount  : 12500,
        ProductName  :'수영장-일일수영 외...',
    }
];

const purchaseHistoryData = [
    {
        ID :1,
        ProgramId : 1,
        ProgramName : '야외스케이트장',
        RoundOfUseId:1,
        RoundOfUseName : '1회차',
        StartTime : '10:00',
        EndTime : '10:50',
        ProductId: 1,
        ProductName : '입장권-성인',
        Quantity : 1,
        UnitPrice : 5000,
        DiscountRate : 0.5,
        SalePrice : 2500,
        NetAmount : 2500,
        TaxAmount : 250,
        TotalAmount : 2750,
        DiscountReasonCode : '0001',
        DiscountReasonName : '국가유공자-본인',
        DiscountedPerson : '홍길동 (010-1234-5678)'
    },
    {
        ID :2,
        ProgramId : 1,
        ProgramName : '야외스케이트장',
        RoundOfUseId:1,
        RoundOfUseName : '1회차',
        StartTime : '10:00',
        EndTime : '10:50',
        ProductId: 1,
        ProductName : '입장권-성인',
        Quantity : 1,
        UnitPrice : 5000,
        DiscountRate : 0.5,
        SalePrice : 2500,
        NetAmount : 2500,
        TaxAmount : 250,
        TotalAmount : 2750,
        DiscountReasonCode : '0003',
        DiscountReasonName : '경증장애인',
        DiscountedPerson : '김길동 (010-1234-5679)'
    },
    {
        ID : 3,
        ProgramId : 1,
        ProgramName : '야외스케이트장',
        RoundOfUseId:1,
        RoundOfUseName : '1회차',
        StartTime : '10:00',
        EndTime : '10:50',
        ProductId: 1,
        ProductName : '입장권-성인',
        Quantity : 2,
        UnitPrice : 10000,
        DiscountRate : null,
        SalePrice : null,
        NetAmount : 10000,
        TaxAmount : 1000,
        TotalAmount : 11000,
        DiscountReasonCode : null,
        DiscountReasonName : null,
        DiscountedPerson : null
    },
    {
        ID:4,
        ProgramId : 1,
        ProgramName : '야외스케이트장',
        RoundOfUseId:1,
        RoundOfUseName : '1회차',
        StartTime : '10:00',
        EndTime : '10:50',
        ProductId: 2,
        ProductName : '입장권-청소년',
        Quantity : 1,
        UnitPrice : 3500,
        DiscountRate : null,
        SalePrice : null,
        NetAmount : 3500,
        TaxAmount : 350,
        TotalAmount : 3850,
        DiscountReasonCode : null,
        DiscountReasonName : null,
        DiscountedPerson : null,
    },
    {
        ID : 5,
        ProgramId : 1,
        ProgramName : '야외스케이트장',
        RoundOfUseId:1,
        RoundOfUseName : '1회차',
        StartTime : '10:00',
        EndTime : '10:50',
        ProductId: 3,
        ProductName : '입장권-어린이',
        Quantity : 1,
        UnitPrice : 1500,
        DiscountRate : null,
        SalePrice : null,
        NetAmount : 1500,
        TaxAmount : 150,
        TotalAmount : 1650,
        DiscountReasonCode : null,
        DiscountReasonName : null,
        DiscountedPerson : null
    },
    {
        ID : 6,
        ProgramId : 2,
        ProgramName : '일일수영',
        RoundOfUseId:3,
        RoundOfUseName : '3회차',
        StartTime : '14:20',
        EndTime : '15:30',
        ProductId: 1,
        ProductName : '입장권-성인',
        Quantity : 1,
        UnitPrice : 3000,
        DiscountRate : null,
        SalePrice : null,
        NetAmount : 6000,
        TaxAmount : 600,
        TotalAmount : 6600,
        DiscountReasonCode : null,
        DiscountReasonName : null,
        DiscountedPerson : null
    },
    {
        ID:7,
        ProgramId : 2,
        ProgramName : '일일수영',
        RoundOfUseId:3,
        RoundOfUseName : '3회차',
        StartTime : '14:20',
        EndTime : '15:30',
        ProductId: 2,
        ProductName : '입장권-청소년',
        Quantity : 1,
        UnitPrice : 1500,
        DiscountRate : null,
        SalePrice : null,
        NetAmount : 1500,
        TaxAmount : 150,
        TotalAmount : 1650,
        DiscountReasonCode : null,
        DiscountReasonName : null,
        DiscountedPerson : null,
    },
    {
        ID : 8,
        ProgramId : 2,
        ProgramName : '일일수영',
        RoundOfUseId:3,
        RoundOfUseName : '3회차',
        StartTime : '14:20',
        EndTime : '15:30',
        ProductId: 3,
        ProductName : '입장권-어린이',
        Quantity : 1,
        UnitPrice : 1500,
        DiscountRate : null,
        SalePrice : null,
        NetAmount : 1500,
        TaxAmount : 150,
        TotalAmount : 1650,
        DiscountReasonCode : null,
        DiscountReasonName : null,
        DiscountedPerson : null
    },
];

const paymentDetailData = [
    {
        ID : 1,
        PaymentLocationCode : '0001',
        PaymentLocationName : '현장결제',
        PaymentMethodCode : '0002',
        PaymentMethodName : '카드',
        PaymentMethodDetailCode : '0001',
        PaymentMethodDetailName : '국민카드',
        PaidAmount : 31900,
        PaidDate : '2022-11-01 10:50:11',
        PaidCancelDate : null,
        PaidStatusCode : '0001',
        PaidStatusName : '승인',
        Seq : 1,
    },
    {
        ID : 2,
        PaymentLocationCode : '0001',
        PaymentLocationName : '현장결제',
        PaymentMethodCode : '0002',
        PaymentMethodName : '카드',
        PaymentMethodDetailCode : '0001',
        PaymentMethodDetailName : '국민카드',
        PaidAmount : -31900,
        PaidDate : null,
        PaidCancelDate : '2022-11-01 10:51:05',
        PaidStatusCode : '0002',
        PaidStatusName : '취소',
        Seq : 2,
    },
    {
        ID : 3,
        PaymentLocationCode : '0001',
        PaymentLocationName : '현장결제',
        PaymentMethodCode : '0001',
        PaymentMethodName : '현금',
        PaymentMethodDetailCode : null,
        PaymentMethodDetailName : null,
        PaidAmount : 31900,
        PaidDate : '2022-11-01 10:54:51',
        PaidCancelDate : null,
        PaidStatusCode : '0001',
        PaidStatusName : '승인',
        Seq : 3,
    },
];


const receiptNumberFormat = (receiptNo) => {

    return `No. ${receiptNo}`;
};

const formatPaymentMethod = (paymentInfo) => {
    if(paymentInfo.MethodDetail) {
        return `${paymentInfo.MethodName} (${paymentInfo.MethodDetail})`;
    } else {
        return `${paymentInfo.MethodName}`;
    }
}

const bankingData = [
    {
        ID : '0001',
        Text :'신한은행'
    },
    {
        ID : '0002',
        Text : '국민은행'
    },
    {
        ID : '0003',
        Text : '농협'
    }
]