'use strict';
DevExpress.config({defaultCurrency: "KRW"});
DevExpress.setTemplateEngine("underscore");
rrule.RRule.prototype.tzid = 'Asia/Seoul';

window.formatCurrency = new Intl.NumberFormat('ko-KR', {
    style: 'currency', currency: 'KRW', minimumFractionDigits: 0, maximumFractionDigits: 2,
}).format;

const acceptancePeriodStandards = [{
    Code: '0001', Name: '정기접수',
}, {
    Code: '0002', Name: '상시접수',
}]

const locations = [{
    Code: '0001', Name: '수영장',
}, {
    Code: '0002', Name: '빙상장',
}, {
    Code: '0003', Name: '세미나실',
}];

const limitsForReservation = [{
    Code: '0000', Name: '제한안함',
}, {
    Code: '0001', Name: '예약일별',
}, {
    Code: '0002', Name: '예약월별',
}];

const farePolicy = [{
    Code: '0001', Name: '유료'
}, {
    Code: '0002', Name: '무료'
}];

const sitingCapacityPolicy = [{
    Code: '0001', Name: '(남여)정원운영',
}, {
    Code: '0002', Name: '전체정원운영',
},];

const paymentCancellationPolicy = [{
    Code: '0000', Name: '제한안함',
}, {
    Code: '0001', Name: '이용일전 D-DAY설정'

}, {
    Code: '0002', Name: '거래당일만 취소가능',

},];

const paymentCancellationDays = (days) => {

    let paymentCancellationDays = [];

    for (let i = 0; i <= days; i++) {

        let paymentCancellationDay = {

            Code: i, Name: i === 0 ? '이용당일' : i,

        };

        paymentCancellationDays.push(paymentCancellationDay);

    }

    return paymentCancellationDays;
};
const paymentClosingTimePolicy = [{
    Code: '0000', Name: '마감시간 운영안함'
}, {
    Code: '0001', Name: '신청일시기준'
},];


const reservationOnTheDayPolicy = [{
    Code: 'Y', Name: '당일예약가능'
}, {
    Code: 'N', Name: '당일예약불가'
}];

const purchaseLimitPolicy = [{
    Code: 'Y', Name: '제한함'
}, {
    Code: 'N', Name: "제한안함",
},];

const publicData = [{
    Code: 'Y', Name: '공개함'
}, {
    Code: 'N', Name: '공개안함',
},];

const runningData = [{
    Code: 'Y', Name: '운영함',
}, {
    Code: 'N', Name: '운영안함',
},];


function numberPad(n, width) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}


const copyAdditionalItems = [{
    Code: 'priceInfo', Text: '요금정보'
}, {
    Code: 'discountInfo', Text: '할인적용정보'
}, {
    Code: 'timeInfo', Text: '이용회차관리',
}, {
    Code: 'reservationUnavailable', Text: '예약불가일정',
}, {
    Code: 'keyIssueConfiguration', Text: '전자키발권설정정보'
}];


const weekendPolicy = [{
    ID: 1, Text: '모든요일', items: ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'],
}, {
    ID: 2, Text: '평일', items: ['MO', 'TU', 'WE', 'TH', 'FR'],
}, {
    ID: 3, Text: '주말', items: ['SA', 'SU'],
}];

const dayPolicy = [{
    ID: 'MO', Text: '월',
}, {
    ID: 'TU', Text: '화',
}, {
    ID: 'WE', Text: '수',
}, {
    ID: 'TH', Text: '목'
}, {
    ID: 'FR', Text: '금'
}, {
    ID: 'SA', Text: '토'
}, {
    ID: 'SU', Text: '일',
}, {
    ID: 'HO', Text: '공휴일',
}];

const genderPolicy = [{
    Code: '0000', Name: '설정안함',
}, {
    Code: '0001', Name: '남',
}, {
    Code: '0002', Name: '여'
}];

const ageGroupPolicy = [{
    Code: '0000', Name: '설정안함',
}, {
    Code: '0001', Name: '성인',
}, {
    Code: '0002', Name: '청소년',
}, {
    Code: '0003', Name: '어린이'
}, {
    Code: '0004', Name: '영/유아'
}];

const individualGroupPolicy = [{
    Code: '0000', Name: '구분안함',
}, {
    Code: '0001', Name: '개인요금',
}, {
    Code: '0002', Name: '단체요금'
},];

const enabledData = [{
    Code: 'Y', Name: '사용함'
}, {
    Code: 'N', Name: '사용안함'
}];

const residencyCertificationPolicy = [{
    Code: '0000', Name: '사용안함'
}, {
    Code: '0001', Name: '서류확정(회원)'
}, {
    Code: '0002', Name: '비대면인증적용'
}];

const discountableData = [{
    Code: 'Y', Name: '적용'
}, {
    Code: 'N', Name: '적용안함'
}];
const appliedData = [{
    Code: 'Y', Name: '적용'
}, {
    Code: 'N', Name: '적용안함'
}];
const keyIssuableData = [{
    Code: 'Y', Name: '발권'
}, {
    Code: 'N', Name: '발권안함',
}];

const taxableData = [{
    Code: '1', Name: '과세'
}, {
    Code: '0', Name: '비과세'
}];

const getWeekendPolicyIdByItems = (selectedItems) => {

    const selectedWeekendPolicy = weekendPolicy.find(({
                                                          ID, items
                                                      }) => JSON.stringify(selectedItems) === JSON.stringify(items));

    return selectedWeekendPolicy ? selectedWeekendPolicy.ID : null;
};

const discountItems = [{
    DiscountId: 1,
    DiscountName: '경로우대',
    Qualification: {
        MinAge: 65, MinEstimate: '0001', MaxAge: null, MaxEstimate: null
    },
    DiscountType: '0003',
    DiscountUnitCode: '0001',
    DiscountUnitName: '할인감면',
    DiscountRate: 0.25,
    DiscountPrice: null,
    Enabled: 'Y',
    IsPublic: 'Y'
}, {
    DiscountId: 2,
    DiscountName: '경증-장애인',
    Qualification: {
        DisabledClass: ['0001', '0002', '0003']
    },
    DiscountType: '0001',
    DiscountUnitCode: '0001',
    DiscountUnitName: '할인감면',
    DiscountRate: 0.5,
    DiscountPrice: null,
    Enabled: 'Y',
    IsPublic: 'Y'
}, {
    DiscountId: 3,
    DiscountName: '국가유공자',
    Qualification: {
        NationalMeritRelationship: ['0001'], NationalMeritAuthority: ['0001', '0002'],
    },
    DiscountType: '0002',
    DiscountUnitCode: '0001',
    DiscountRate: 0.5,
    DiscountPrice: null,
    Enabled: 'Y',
    IsPublic: 'Y'

}];

const discountTypes = [{
    Code: '0000', Name: '기준없음'
}, {
    Code: '0001', Name: '장애인',
}, {
    Code: '0002', Name: '국가유공자',
}, {
    Code: '0003', Name: '연령',
}, {
    Code: '0004', Name: '관내거주',
},]

const discountUnits = [{
    Code: '0001', Name: '할인감면'
}, {
    Code: '0002', Name: '정액감면'
}];

const nationalMeritRelationships = [{
    Code: '0001', Name: "본인",
}, {
    Code: '0002', Name: '배우자',
}, {
    Code: '0003', Name: '유가족',
},];

const nationalMeritAuthorities = [{
    Code: '0001', Name: '수권자',
}, {
    Code: '0002', Name: '비수권자'
}];

const disabledClasses = (totalCount) => {

    let disabledClasses = [];

    for (let i = 1; i <= totalCount; i++) {
        let disabledClass = {
            Code: numberPad(i, 4), Name: `${i}급`,
        };

        disabledClasses.push(disabledClass);

    }
    return disabledClasses;
};

const estimates = [{
    Code: '0000', Name: '설정안함',
}, {
    Code: '0001', Name: '이상',
}, {
    Code: '0002', Name: '이하',
}]

const residences = [{
    Code: '0001', Name: '문래동',
}, {
    Code: '0002', Name: '여의도동'
}];

const discountPurchaseQuantityLimitPolicy = [{
    Code: '0000', Name: '설정안함',
}, {
    Code: '0001', Name: '구매일별수량제한'
},];

const priceItems = [{
    CategoryCode: '1_1_1',
    CategoryName: '수영장',
    ProductId: 1,
    ProductName: '수영 - 성인',
    UnitPrice: 3000,
    Taxable: '0',
    GenderPolicyCode: '0001',
    GenderPolicyName: '남',
    DayOfTheWeekPolicyCode: ['MO', 'TU', 'WE'],
    DayOfTheWeekPolicyName: ['월', '화', '수'],
    AgeGroupCode: '0001',
    AgeGroupName: '성인',
    WeekendPolicy: null,
    AgeMin: 18,
    AgeMax: 999,
    ResidencyCertificationCode: '0000',
    ResidencyCertificationName: '사용안함',
    IndividualGroupPolicyCode: '0000',
    IndividualGroupPolicyName: '사용안함',
    Enabled: 'Y',
    IsPublic: 'Y',
    Discountable: 'Y',
    KeyIssuable: 'Y',
    DisplayedAtKiosk : 'Y',
}, {
    CategoryCode: '1_1_1',
    CategoryName: '수영장',
    ProductId: 2,
    ProductName: '수영 - 성인',
    UnitPrice: 3000,
    Taxable: '0',
    GenderPolicyCode: '0002',
    GenderPolicyName: '여',
    DayOfTheWeekPolicyCode: ['MO', 'TU', 'WE', 'TH', 'FR'],
    DayOfTheWeekPolicyName: ['월', '화', '수', '목', '금'],
    AgeGroupCode: '0001',
    AgeGroupName: '성인',
    AgeMin: 18,
    AgeMax: 999,
    ResidencyCertificationCode: '0002',
    ResidencyCertificationName: '비대면인증적용',
    WeekendPolicy: getWeekendPolicyIdByItems(['MO', 'TU', 'WE', 'TH', 'FR']),
    Enabled: 'Y',
    IsPublic: 'Y',
    Discountable: 'Y',
    KeyIssuable: 'Y',
    IndividualGroupPolicyCode: '0002',
    IndividualGroupPolicyName: '단체요금',
    GroupDiscountAvailable: 'Y',
}, {
    CategoryCode: '1_1_1',
    CategoryName: '수영장',
    ProductId: 3,
    ProductName: '자유수영',
    UnitPrice: 3000,
    Taxable: '0',
    GenderPolicyCode: '0002',
    GenderPolicyName: '여',
    DayOfTheWeekPolicyCode: ['MO', 'TU', 'WE', 'TH', 'FR'],
    DayOfTheWeekPolicyName: ['월', '화', '수', '목', '금'],
    AgeGroupCode: '0000',
    AgeGroupName: '설정안함',
    ResidencyCertificationCode: '0002',
    ResidencyCertificationName: '비대면인증적용',
    WeekendPolicy: getWeekendPolicyIdByItems(['MO', 'TU', 'WE', 'TH', 'FR']),
    Enabled: 'Y',
    IsPublic: 'Y',
    Discountable: 'Y',
    KeyIssuable: 'Y',
    IndividualGroupPolicyCode: '0001',
    IndividualGroupPolicyName: '개인요금',
}];

const roundOfUseItems = () => {

    return [

        {
            RoundOfUseId: 1,
            RoundOfUseName: `1회차`,
            RoundOfUseGroupId: 1,
            RoundOfUseGroupName: '평일',
            RoundOfStartTime: '09:00',
            RoundOfEndTime: '09:50',
            TotalCapacity: 100,
            MaleCapacity: 50,
            FemaleCapacity: 50,
            AdvancedTotalCapacity: 30,
            AdvancedMaleCapacity: 15,
            AdvancedFemaleCapacity: 15,
            IsPublic: 'Y',
            Enabled: 'Y',
            SellableAfterStart: 'N',
        }, {
            RoundOfUseId: 2,
            RoundOfUseName: `2회차`,
            RoundOfUseGroupId: 1,
            RoundOfUseGroupName: '평일',
            RoundOfStartTime: '10:00',
            RoundOfEndTime: '10:50',
            TotalCapacity: 100,
            MaleCapacity: 50,
            FemaleCapacity: 50,
            AdvancedTotalCapacity: 30,
            AdvancedMaleCapacity: 15,
            AdvancedFemaleCapacity: 15,
            IsPublic: 'Y',
            Enabled: 'Y',
        }, {
            RoundOfUseId: 3,
            RoundOfUseName: `3회차`,
            RoundOfUseGroupId: 1,
            RoundOfUseGroupName: '평일',
            RoundOfStartTime: '11:00',
            RoundOfEndTime: '11:50',
            TotalCapacity: 100,
            MaleCapacity: 50,
            FemaleCapacity: 50,
            AdvancedTotalCapacity: 30,
            AdvancedMaleCapacity: 15,
            AdvancedFemaleCapacity: 15,
            IsPublic: 'Y',
            Enabled: 'Y',
        }, {
            RoundOfUseId: 4,
            RoundOfUseName: `4회차`,
            RoundOfUseGroupId: 1,
            RoundOfUseGroupName: '평일',
            RoundOfStartTime: '14:00',
            RoundOfEndTime: '14:50',
            TotalCapacity: 100,
            MaleCapacity: 50,
            FemaleCapacity: 50,
            AdvancedTotalCapacity: 30,
            AdvancedMaleCapacity: 15,
            AdvancedFemaleCapacity: 15,
            IsPublic: 'Y',
            Enabled: 'Y',
        }, {
            RoundOfUseId: 5,
            RoundOfUseName: `1회차`,
            RoundOfUseGroupId: 2,
            RoundOfUseGroupName: '주말',
            RoundOfStartTime: '09:00',
            RoundOfEndTime: '09:50',
            TotalCapacity: 100,
            MaleCapacity: 50,
            FemaleCapacity: 50,
            AdvancedTotalCapacity: 30,
            AdvancedMaleCapacity: 15,
            AdvancedFemaleCapacity: 15,
            IsPublic: 'Y',
            Enabled: 'Y',
        }, {
            RoundOfUseId: 6,
            RoundOfUseName: `2회차`,
            RoundOfUseGroupId: 2,
            RoundOfUseGroupName: '주말',
            RoundOfStartTime: '10:00',
            RoundOfEndTime: '10:50',
            TotalCapacity: 100,
            MaleCapacity: 50,
            FemaleCapacity: 50,
            AdvancedTotalCapacity: 30,
            AdvancedMaleCapacity: 15,
            AdvancedFemaleCapacity: 15,
            IsPublic: 'Y',
            Enabled: 'Y',
        }, {
            RoundOfUseId: 7,
            RoundOfUseName: `3회차`,
            RoundOfUseGroupId: 2,
            RoundOfUseGroupName: '주말',
            RoundOfStartTime: '11:00',
            RoundOfEndTime: '11:50',
            TotalCapacity: 100,
            MaleCapacity: 50,
            FemaleCapacity: 50,
            AdvancedTotalCapacity: 30,
            AdvancedMaleCapacity: 15,
            AdvancedFemaleCapacity: 15,
            IsPublic: 'Y',
            Enabled: 'Y',
        },];

};


const freeSwimmingItems = () => {

    return [

        {
            RoundOfUseId: 1,
            RoundOfUseName: `1회차`,
            RoundOfUseGroupId: 1,
            RoundOfUseGroupName: '평일',
            RoundOfStartTime: '09:00',
            RoundOfEndTime: '09:50',
        }, {
            RoundOfUseId: 2,
            RoundOfUseName: `2회차`,
            RoundOfUseGroupId: 1,
            RoundOfUseGroupName: '평일',
            RoundOfStartTime: '10:00',
            RoundOfEndTime: '10:50',
        }, {
            RoundOfUseId: 3,
            RoundOfUseName: `3회차`,
            RoundOfUseGroupId: 1,
            RoundOfUseGroupName: '평일',
            RoundOfStartTime: '11:00',
            RoundOfEndTime: '11:50',
        },

        {
            RoundOfUseId: 4,
            RoundOfUseName: `1회차`,
            RoundOfUseGroupId: 2,
            RoundOfUseGroupName: '주말',
            RoundOfStartTime: '09:00',
            RoundOfEndTime: '09:50',

        }, {
            RoundOfUseId: 5,
            RoundOfUseName: `2회차`,
            RoundOfUseGroupId: 2,
            RoundOfUseGroupName: '주말',
            RoundOfStartTime: '10:00',
            RoundOfEndTime: '10:50',

        }, {
            RoundOfUseId: 6,
            RoundOfUseName: `3회차`,
            RoundOfUseGroupId: 2,
            RoundOfUseGroupName: '주말',
            RoundOfStartTime: '11:00',
            RoundOfEndTime: '11:50',

        },];

};
const holidays = [{
    name: '성탄절', date: '2022-12-25'
}, {
    name: '설날연휴', date: '2023-01-21',
}, {
    name: '설날', date: '2023-01-22'
}, {
    name: '설날연휴', date: '2023-01-23'
}, {
    name: '삼일절', date: '2023-03-01',
}];


String.prototype.parseDate = function (format) {
    return DevExpress.localization.parseDate(this, format);
}

function isHoliday(date) {
    const localeDate = date.toLocaleDateString();
    return holidays.filter(({
                                date, name
                            }) => DevExpress.localization.parseDate(date, 'yyyy-MM-dd').toLocaleDateString() === localeDate).length > 0;
}

function holidayText(date) {
    const localeDate = date.toLocaleDateString();
    const selectedHoliday = holidays.find(({
                                               date, name
                                           }) => DevExpress.localization.parseDate(date, 'yyyy-MM-dd').toLocaleDateString() === localeDate);
    if (selectedHoliday) {
        return selectedHoliday.name;
    }
}


function getDatesInRange(startDate, endDate) {
    const date = new Date(startDate.getTime());

    const dates = [];

    while (date <= endDate) {
        dates.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }

    return dates;
}

function isSunday(date) {
    const day = date.getDay();
    return day === 0;
}

const frequency = [{
    Code: 'WEEKLY', Name: '매주',
}, {
    Code: 'MONTHLY', Name: '매월',
}, {
    Code: 'YEARLY', Name: '매년'
}]

const repeatMonthlyConditions = [{
    Code: '0001', Name: '일자마다 반복',
}, {
    Code: '0002', Name: '요일마다 반복'
}];

const days = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];

Date.prototype.removeTime = function () {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate());
};

Date.prototype.toUntilString = function () {

    return DevExpress.localization.formatDate(this, 'yyyyMMddTHHmmss') + 'Z';
}

Date.prototype.formatDateTime = function () {
    return DevExpress.localization.formatDate(this, 'yyyy-MM-dd HH:mm')
}

Date.prototype.formatDateString = function (format) {

    return DevExpress.localization.formatDate(this, format);

};

const priceTreeData = [{
    "ID": 1, "name": "체육시설", "expanded": true
}, {
    "ID": "1_1", "categoryId": 1, "name": "야외물놀이장", "expanded": true
}, {
    "ID": "1_1_1", "categoryId": "1_1", "name": "수영장"
},

    {
        "ID": "1_1_2", "categoryId": "1_1", "name": "빙상장",
    },]

const copySchedulePrograms = [{
    ProgramId: 2, ProgramName: '겨울방학-일일수영'
},]


const keyIssueLocation = [{
    Code: 1, Name: '수영장탈의실'
}, {
    Code: 2, Name: '복도신발장'
},];

const keyUsedTime = (totalCount) => {

    let keyUsedTimes = [];
    for (let i = 1; i <= totalCount; i++) {
        let keyUsedTime = {
            Code: i, Name: `${i}시간`
        };
        keyUsedTimes.push(keyUsedTime);
    }

    return keyUsedTimes;

}

const layers = [{
    Code: '0000', Name: "적용안함",
}, {
    Code: '0001', Name: '상단'
}, {
    Code: '0002', Name: '하단'
}];


const keyIssueFormData = {
    keyIssuable: 'Y', keyIssueLocation: 1, keyUsedTime: 2,

};

const programData = [{
    CategoryCode: '1_1',
    CategoryName: '야외물놀이장',
    ProgramId: 1,
    ProgramName: '여름방학-일일수영',
    LocationCode: '0001',
    LocationName: '수영장',
    Introduction: '<div>112333456788900</div>',
    SitingCapacityPolicyCode: '0001',
    SitingCapacityPolicy: '(남여)정원운영',
    AcceptancePeriodPolicyCode: '0001',
    AcceptancePeriodPolicy: '정기접수',
    RegularStartDateTime: '2022-08-01 09:00',
    RegularEndDateTime: '2022-08-31 20:00',
    IsRunning : 'Y',
    DisplayedAtKiosk : 'N',
    IsTicketing : 'Y',
}, {
    CategoryCode: '1_1_1',
    CategoryName: '수영장',
    ProgramId: 2,
    ProgramName: '겨울방학-일일수영',
    LocationCode: '0001',
    LocationName: '수영장',
    Introduction: '<div>112333456788900</div>',
    SitingCapacityPolicyCode: '0002',
    SitingCapacityPolicy: '전체정원운영',
    AcceptancePeriodPolicyCode: '0002',
    AcceptancePeriodPolicy: '상시접수',
    ReservationOnTheDayStart: 2,
    ReservationOnTheDayEnd: 10,
    BookingPeriodPolicyCode: '0001',
    IsRunning : 'Y',
    DisplayedAtKiosk : 'Y',
    IsTicketing : 'Y',
}, {
    CategoryCode: '1_1_2',
    CategoryName: '빙상장',
    ProgramId: 3,
    ProgramName: '겨울방학-야외썰매장',
    LocationCode: '0002',
    LocationName: '빙상장',
    Introduction: '<div>112333456788900</div>',
    SitingCapacityPolicyCode: '0002',
    SitingCapacityPolicy: '전체정원운영',
    AcceptancePeriodPolicyCode: '0002',
    AcceptancePeriodPolicy: '상시접수',
    BookingPeriodCalender: {
        EnableDates: ['2023-01-10', '2023-01-14'], DisableDates: ['2023-01-09', '2023-01-20'],
    },
    BookingPeriodPolicyCode: '0002',
    IsRunning : 'Y',
    DisplayedAtKiosk : 'Y',
    IsTicketing : 'Y',
}];


const bookingRangePolicy = [{
    Code: '0001', Name: '이용일기준설정'
}, {
    Code: '0002', Name: '캘린더설정'
}]


function CalendarItem(date) {
    this.date = date;
}

const disableCalendarDataForCopy = [{
    ProgramId: 2, ProgramName: '일일수영', Date: new Date(2022, 2, 1), Title: '공휴일', Description: '삼일절 정기휴관일'
}

];

const bookingContextMenuItems = [{
    text: '예약일설정',
}, {
    text: '예약일삭제',
}, {
    text: '예약불가일설정',
}, {
    text: '예약불가일해제',
}];
const includesDate = (list, date) => {

    if (list) {
        const localeDate = date.toLocaleDateString();
        return list.filter(item => item.parseDate('yyyy-MM-dd').toLocaleDateString() === localeDate).length > 0;
    }
}

const getCalendarDate = (data) => {

    if (data.BookingPeriodCalender && data.BookingPeriodCalender.EnableDates && !!data.BookingPeriodCalender.EnableDates.length) {
        const min = data.BookingPeriodCalender.EnableDates.reduce(function (a, b) {
            return a < b ? a : b;
        });
        const max = data.BookingPeriodCalender.EnableDates.reduce(function (a, b) {
            return a > b ? a : b;
        });
        return `${min} ~ ${max}`;
    }
    return null;
};

const sellableTimeData = (start, end, unit) => {

    let arr = [];

    for (let i = start; i <= end; i += unit) {
        let obj = {
            value: i, text: `${i}분`,
        }
        arr.push(obj);
    }
    return arr;
}

const displayedAtKioskData = [{
    Code: 'Y', Name: '노출',
}, {
    Code: 'N', Name: '노출안함',
}]

const sellableData = [{
    value: 'Y', text: '판매가능'
}, {
    value: 'N', text: '판매불가'
}];

const timeTableGroupData = [{
    ID: 1, Name: '평일'
}, {
    ID: 2, Name: '주말'
},];
const checkInData = [{
    Code: 'Y', Name: '입장발권하기'
}, {
    Code: 'N', Name: '입장발권안함'
}]