'use strict';

DevExpress.config({defaultCurrency: "KRW"});

Date.prototype.formatDateString = function(format){

    return DevExpress.localization.formatDate(this,format);

} ;


function numberPad(n, width) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

window.formatCurrency = new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
}).format;


window.formatNumber = new Intl.NumberFormat('ko-KR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
}).format;

const locations = [
    {

        Code: '0001',
        Name: '프론트뒤',
        Enabled: true,
        Remark: '비고내용',
        FileLink: 'https://thumbs.dreamstime.com/z/wall-lockers-6201164.jpg',
    },
    {
        Code: '0002',
        Name: '매점옆',
        Enabled: true,
        Remark: '비고내용',
        FileLink: null

    }
];

const status = [
    {
        Code: 'B',
        Name: '임대중'
    },
    {
        Code: 'D',
        Name: '미반납'
    }
];

const dynamicSearchConditions = [
    {
        Code : 'RentDateRange',
        Name : '임대기간',
        Children :[ 'RentStartDate', 'RentEndDate']
    },
    {
        Code :'MemberName',
        Name : '회원명',
        Children: ['MemberName']
    },
    {
        Code :'LockerNumber',
        Name :'사물함번호',
        Children: ['StartLockerNumber', 'EndLockerNumber']
    },
    {
        Code :'DaysUntilTheEnd',
        Name:'이용종료일수',
        Children: ['DayUtilTheEnd']
    }
];

const lockerStatusData = (totalCount) => {

    let lockerStatusList = [];
    for(let i = 0; i < totalCount; i++) {

        let lockerStatus = {
            LocationCode : '0001',
            LocationName :'프론트뒤',
            ID :'A' + numberPad(i,4),
            MemberNo : numberPad(i,6),
            MemberName : '홍길동' + i,
            MobileNumber : '010-1234-5678',
            LockerStatus : i%2 === 0 ? '임대중' : '미반납',
            CreationDate : '2022-10-22',
            RentalMonths : 1,
            RentStartDate : '2022-12-01',
            RentEndDate : '2022-12-31',
            RentalFee : 10000,
            PaidAmountForCash : i%3 === 1 ? 10000 : i%3 === 0 ? 5000 : 0,
            PaidAmountForCredit : i%3 === 1 ? 0 : i%3 === 0 ? 5000 : 10000,
            IsReturned : false,
            ReturnedDate : null,
            overdueDays : i%2 === 0 ? 0 : 10,


        };

        lockerStatusList.push(lockerStatus);
    }
    return lockerStatusList;
};