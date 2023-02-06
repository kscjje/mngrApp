'use strict';
DevExpress.config({defaultCurrency: "KRW"});
window.formatCurrency = new Intl.NumberFormat('ko-KR', {
    style: 'currency', currency: 'KRW', minimumFractionDigits: 0, maximumFractionDigits: 2,
}).format;
String.prototype.parseDate = function(format) {
    return DevExpress.localization.parseDate(this, format);
}
Date.prototype.formatDateString = function (format) {
    return DevExpress.localization.formatDate(this, format);
};
const SMSReceivedData = [
    {
        Value : 'Y',
        Name :'동의'
    },
    {
        Value : 'N',
        Name :'동의안함',
    }
]

const groupingItems =[
    {
        ID : '0000',
        Name :'그룹화해제'
    },
    {
        ID :'MemberId',
        Name :'회원별로 그룹화',
    },
    {
        ID : 'RecipientId',
        Name :'수납자별로 그룹화'
    },
    {
        ID :'TransDate',
        Name : '수납일자(년/월)별로 그룹화'
    }
];

const depositGridData = (totalCount = 0) => {
    let gridData = [];
    for(let i =0; i<totalCount; i++) {

        let data = {
            TransId : i + 1,
            TransDate : i%2 === 0 ? '2022-10-11 15:02:21' : '2022-12-09 13:09:28',
            MemberId :i%2 === 0 ? '0001233' :'0001256',
            MemberName  :i%2 === 0 ? '홍길동' :'이순신',
            MobileNumber : '010-2345-2312',
            SMSReceived : 'Y',
            RecipientId: i%4 === 0 ? 'ADMIN' : 'ADMIN2',
            RecipientName : i%4 === 0 ? '관리자' : '관리자2',
            IncomeAmount : i%3===0 ? 1000 : 0,
            RefundAmount : i%3 ===0 ? 0 : -1000,
        }

        gridData.push(data);
    }

    return gridData;
}