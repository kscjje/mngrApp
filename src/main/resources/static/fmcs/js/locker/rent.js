'use strict';

DevExpress.config({defaultCurrency: "KRW"});
DevExpress.setTemplateEngine("underscore");

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

const formatAsPercent = function(num){

    return new Intl.NumberFormat('default', {
        style: 'percent', // minimumFractionDigits: 2,
        // maximumFractionDigits: 2,
    }).format(num);
}

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
        Code: 'A',
        Name: '임대가능'
    },
    {
        Code: 'B',
        Name: '임대중'
    },
    {
        Code: 'C',
        Name: '고장'
    },
    {
        Code: 'D',
        Name: '미반납'
    }
];

const layers = [
    {
        Code : '0001',
        Name :'상단'
    },
    {
        Code:'0002',
        Name :'하단'
    }
];

const sizes = ['S','M','L'];

const rentalHistorys = [
    {
        ID : 15,
        MemberNo : '00000123',
        MemberName : '이순신',
        RentalStartDate: '2022-10-01',
        RentalEndDate : '2022-10-31',
        ReturnDate :  '2022-11-05',
        RentalFee: 10000,
        Deposit: 5000,
    }
    ,{
        ID: 16,
        MemberNo : '00000123',
        MemberName : '이순신',
        RentalStartDate: '2022-11-01',
        RentalEndDate : '2022-11-30',
        ReturnDate :  null,
        RentalFee: 10000,
        Deposit: 5000,
    }
];

const lockers = () => {
    let lockers = [];
    const totalCount = 48;

    for (let i = 0; i < totalCount; i++) {
        let index = i+1;
        let locker = {

            ID: 'A' + numberPad(index,4),
            Name:  index % 2 === 0 ? "홍길동" : index%3 === 0 ? null : index%5 ===0? null : '홍길동',
            RentStartDate: index % 2 === 0 ? "2022-09-01" : index%3 === 0 ? null : index%5 ===0? null : '2022-09-01',
            RentEndDate: index % 2 === 0 ? "2022-09-30" : index%3 === 0 ? null : index%5 ===0? null : '2022-09-30',
            StatusCode : index % 2 === 0 ? "B" : index%3 === 0 ? "A" : index%5 ===0? 'C' : 'D',
            Status : index % 2 === 0 ? "임대중" : index%3 === 0 ? "임대가능" : index%5 ===0? '고장' : '미반납',
            Size : index%3 === 1? '대': index%3 === 2 ? '중' : '소',
            Layer : index%3 === 1? 'H': 'L',
        }
        lockers[i] = locker;
    }
    return lockers;

};

function numberPad(n, width) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}


function formatRentalRange(startDate, endDate) {
    if(startDate && endDate) {
        return startDate + " ~ " + endDate;
    }
    else {
        return null;
    }
}

const availableLockers = (totalCount) => {

    let lockers = [];
    for(let i = 0; i < totalCount; i++) {
        lockers[i] = 'A' + numberPad(i,4);
    }

    return lockers;
};

const lockerLateFeeConfiguration = {

}

const lockerLateFeeDepositPayments = [
    {
        ID : '0001',
        Text : '보증금차감'
    },
    {
        ID : '0002',
        Text:'결제',
    }
];

const paymentData = [
    {
        ReceiptNo : '00000-0000-0001',
        PaymentMethod :'현금',
        PaymentAmount : 2000,
    },
    {
        ReceiptNo : '00000-0000-0002',
        PaymentMethod: '비씨카드',
        PaymentAmount: 1000
    },
    {
        ReceiptNo : '00000-0000-0002',
        PaymentMethod: '비씨카드',
        PaymentAmount: 1000
    }
    ,
    {
        ReceiptNo : '00000-0000-0002',
        PaymentMethod: '비씨카드',
        PaymentAmount: 1000
    },
    {
        ReceiptNo : '00000-0000-0002',
        PaymentMethod: '비씨카드',
        PaymentAmount: 1000
    },
    {
        ReceiptNo : '00000-0000-0002',
        PaymentMethod: '비씨카드',
        PaymentAmount: 1000
    },
];

const discountInformations = [
    {
        ID : '0000',
        DiscountRate: 0,
        Name : '할인없음'
    },
    {
        ID : '0001',
        DiscountRate : 0.5,
        Name : '국가유공자',
    },
    {
        ID : '0002',
        Name : '경증장애인',
        DiscountRate: 0.3,
    },
    {
        ID: '0003',
        Name : '장애인보호자',
        DiscountRate: 0.3,
    },
    {
        ID: '0004',
        Name :'중증장애인',
        DiscountRate: 0.5,
    }
];

const formatDisplayDiscountItem = (item) => {
    return item && `${item.Name}` + (item.DiscountRate > 0 ? ` (${formatAsPercent(item.DiscountRate)})` : '');
}