'use strict';
DevExpress.config({defaultCurrency: "KRW"});
DevExpress.setTemplateEngine("underscore");

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

const locations = [
    {

        Code: '0001',
        Name: '프론트뒤',
        Enabled: 'Y',
        Contents: '비고내용',
        SortNo : 1,
    },
    {
        Code: '0002',
        Name: '매점옆',
        Enabled: 'N',
        Remark: '비고내용',
        Contents: `<div>매점옆은 사용안합니다.</div>`,
        SortNo : 2,
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

const enabledData = [
    {
        Value: 'Y',
        Name: '사용함'
    },
    {
        Value: 'N',
        Name: '사용안함'
    }
];
const taxableData = [
    {
        Value: '1',
        Name: '과세'
    },
    {
        Value: '0',
        Name: '비과세'
    }
];
const sizes = ['S','M','L'];

const fees = [
    {
        ProductCategoryCode: '1_1',
        ProductCategoryName : '사물함',
        ItemCode: 'I000042',
        ItemName: '사물함-소',
        FeeCategory: '1000',
        FeeCategoryName: '임대료',
        RentalMonths: 2,
        UnitFee: 2000,
        Taxable: '1',
        Enabled: 'Y',
        Remark: '임대료비고',
        Displayable: 'Y',
        SortingNumber: 1
    },
    {
        ProductCategoryCode: '2_1',
        ProductCategoryName : '사물함',
        ItemCode: 'I000043',
        ItemName: '보증금-소',
        FeeCategory: '1001',
        FeeCategoryName: '보증금',
        RentalMonths: null,
        UnitFee: 5000,
        Taxable: '0',
        Enabled: 'N',
        Remark: '보증금비고',
        Displayable: 'N',
        SortingNumber: 2
    }
];

const displayableData = [
    {
        Value: 'Y',
        Name: '공개함'
    },
    {
        Value: 'N',
        Name: '공개안함'
    }
];

const getLockers = (totalCount) => {
    let lockers = [];
    for (let i = 0; i < totalCount; i++) {

        lockers[i] = {
            LocationName: '매점옆',
            LocationCode: '0002',
            Division: '0',
            ID: numberPad(i + 1, 4),
            Size: i % 4 === 0 ? 'L' : i % 3 === 0 ? 'M' : 'S',
            Status: i % 2 === 0 ? '임대중' : '임대가능',
            StatusCode: i % 2 === 0 ? 'B' : 'A',
            Layer: i % 3 === 0 ? '상단' : '하단',
            LayerCode: i % 3 === 0 ? '0001' : '0002',
            Deposits: ['I000043'],
            RentalFees : ['I000042','I000044',]
        };
    }

    return lockers;
}


const rentalFees = [
    {
        ProductCategoryCode: '1_1',
        ProductCategoryName : '사물함',
        ItemCode: 'I000042',
        ItemName: '임대료-소',
        FeeCategory: '1000',
        FeeCategoryName: '임대료',
        RentalMonths: 2,
        UnitFee: 10000,
        Taxable: '1',
        Enabled: 'Y',
        Remark: '임대료',
        Displayable: 'Y',
        SortingNumber: 2
    },
    {
        ProductCategoryCode: '1_1',
        ProductCategoryName : '사물함',
        ItemCode: 'I000044',
        ItemName: '임대료-중',
        FeeCategory: '1000',
        FeeCategoryName: '임대료',
        RentalMonths: 1,
        UnitFee: 20000,
        Taxable: '0',
        Enabled: 'Y',
        Remark: '임대료',
        Displayable: 'N',
        SortingNumber: 2
    }
];

const depositFees = [
    {
        ProductCategoryCode: '1_1',
        ProductCategoryName : '사물함',
        ItemCode: 'I000043',
        ItemName: '보증금-소',
        FeeCategory: '1001',
        FeeCategoryName: '보증금',
        RentalMonths: 2,
        UnitFee: 5000,
        Taxable: '0',
        Enabled: 'Y',
        Remark: '보증금비고',
        Displayable: 'N',
        SortingNumber: 2
    },
    {
        ProductCategoryCode: '1_1',
        ProductCategoryName : '사물함',
        ItemCode: 'I000045',
        ItemName: '보증금-중',
        FeeCategory: '1001',
        FeeCategoryName: '보증금',
        RentalMonths: 3,
        UnitFee: 10000,
        Taxable: '0',
        Enabled: 'Y',
        Remark: '보증금비고',
        Displayable: 'Y',
        SortingNumber: 2
    }
];

const syncTreeViewSelection = function (treeViewInstance, value) {
    if (!value) {
        treeViewInstance.unselectAll();
    } else {
        treeViewInstance.selectItem(value);
    }
};
