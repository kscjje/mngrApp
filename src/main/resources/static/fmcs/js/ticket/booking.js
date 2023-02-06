'use strict';
DevExpress.config({defaultCurrency: "KRW"});

String.prototype.parseDate = function(format) {
    return DevExpress.localization.parseDate(this, format);
}

window.formatCurrency = new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
}).format;

const bookingStatusItems = [
    {
        Code :'',
        Text :'전체',
    },
    {
        Code :'0001',
        Text :'예약완료',
    },
    {
        Code :'0002',
        Text :'예약취소',
    }
];

const bookingTypeItems = [
    {
        Code :'',
        Text :'전체',
    },
    {
        Code :'0001',
        Text :'개인예약',
    },
    {
        Code :'0002',
        Text :'단체예약',
    }
];

const bookingRangeTypeItems = [
    {
        Code :'0001',
        Text :'오늘',
        Gap : 0,
        Unit : 'days',
    },
    {
        Code :'0002',
        Text :'1주일',
        Gap : 1,
        Unit : 'weeks',
    },
    {
        Code :'0003',
        Text :'1개월',
        Gap : 1,
        Unit : 'months',
    },
    {
        Code :'0004',
        Text :'3개월',
        Gap : 3,
        Unit : 'months',
    },
    {
        Code : '0005',
        Text : '직접입력',
    }
];

const initSearchFormData = {
    BookingStatus : '',
    BookingType : '',
    IsRegularMember : true,
    IsNoneMember : true,
    BookingRangeType : '0001',
    BookingStartDate : moment().format('YYYY-MM-DD'),
    BookingEndDate : moment().format('YYYY-MM-DD'),
};


const bookingData = [
    {
        BookingId : 1,
        BookingNumber : 'CU-20221108-123456678',
        BookingDate : '2022-10-13',
        BookingPersonInfo : {
            Name : '홍길동',
            ID : '00001234',
            MobileNumber : '010-2345-1234',
        },
        BookingTypeCode : '0001',
        BookingTypeName : '개인',
        Discounted : true,
        DiscountTypeInfo : [
            {
                Code :'0001',
                Type :'Disabled',
            }
        ],
        DateOfUse : '2022-11-08',
        BookingMethodCode : '0001',
        BookingMethodName : '온라인',
        PaymentStatusCode : '0001',
        PaymentStatusName : '결제대기',
        TotalAmount : 36850,
        BookingStatusCode : '0001',
        BookingStatusName : '예약완료'
    },
    {
        BookingId : 2,
        BookingNumber : 'CU-20221108-123456679',
        BookingDate : '2022-10-13',
        BookingPersonInfo : {
            Name : '홍길동',
            MobileNumber : '010-2345-1234',
        },
        BookingTypeCode : '0001',
        BookingTypeName : '개인',
        Discounted : true,
        DiscountTypeInfo : [
            {
                Code :'0001',
                Type :'Disabled',
            }
        ],
        DateOfUse : '2022-11-08',
        BookingMethodCode : '0001',
        BookingMethodName : '온라인',
        PaymentStatusCode : '0001',
        PaymentStatusName : '결제대기',
        TotalAmount : 13250,
        BookingStatusCode : '0002',
        BookingStatusName : '예약취소',
        CancelDate : '2022-11-07',
    },
    {
        BookingId : 3,
        BookingNumber : 'CU-20221108-123456680',
        BookingDate : '2022-10-13',
        BookingPersonInfo : {
            Name : '홍길동',
            ID : '00001234',
            MobileNumber : '010-2345-1234',
        },
        BookingTypeCode : '0002',
        BookingTypeName : '단체',
        DateOfUse : '2023-01-11',
        BookingMethodCode : '0001',
        BookingMethodName : '온라인',
        PaymentStatusCode : '0001',
        PaymentStatusName : '결제대기',
        TotalAmount : 0,
        BookingStatusCode : '0001',
        BookingStatusName : '예약완료'
    },
];

const isToday = (targetDate) => {

   return targetDate === moment().format('YYYY-MM-DD');

};

const showTodayCalendar = (data) => {
    return data.BookingStatusCode  === '0001' &&  isToday(data.DateOfUse);
};

const showBookingCalendar = (data) => {
  return (data.BookingStatusCode === '0001' && !isToday(data.DateOfUse)) || data.BookingStatusCode === '0002';
};