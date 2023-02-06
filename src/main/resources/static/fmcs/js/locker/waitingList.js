'use strict';

Date.prototype.formatDateString = function (format) {
    return DevExpress.localization.formatDate(this, format);
};

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

const lockerStatusData = [
    {
        LocationCode : '0001',
        LocationName : '프론트뒤',
        LayerCode : '0001',
        LayerName : '상단',
        Size : 'L',
        TotalCount : 23,
        Available : 2,
        Occupied : 0,
        Waiting : 124,
        InClass : 20,
        Received : 10,
    },
    {
        LocationCode : '0001',
        LocationName : '프론트뒤',
        LayerCode : '0001',
        LayerName : '상단',
        Size : 'M',
        TotalCount : 23,
        Available : 2,
        Occupied : 0,
        Waiting : 124,
        InClass : 20,
        Received : 10,
    },
    {
        LocationCode : '0001',
        LocationName : '프론트뒤',
        LayerCode : '0002',
        LayerName : '하단',
        Size : 'M',
        TotalCount : 23,
        Available : 2,
        Occupied : 0,
        Waiting : 124,
        InClass : 20,
        Received : 10,
    }
];

const entireData = [
    {
        RequestId : 1,
        rowNumber : 1,
        ID : 'A0001',
        MemberId : '00001234',
        MemberName :'홍길동',
        MobileNumber : '010-1234-5678',
        SMSReceived : 'Y',
        ReceptionStatusCode : '0001',
        ReceptionStatusName :'신청대기',
        RequestDate : '2022-12-31 12:54:32',
        ApprovedDate : null,
        CancelTypeCode : null,
        CancelTypeName : null,
        InClass : 'N',
    },
    {
        RequestId : 2,
        rowNumber : 2,
        ID : 'A0001',
        MemberId : '00001237',
        MemberName :'이방원',
        MobileNumber : '010-1234-7890',
        SMSReceived : 'Y',
        ReceptionStatusCode : '0001',
        ReceptionStatusName :'신청대기',
        RequestDate : '2022-12-31 14:23:25',
        ApprovedDate : null,
        CancelTypeCode : null,
        CancelTypeName : null,
        InClass : 'Y',
    }
];

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

const waitingData = [
    {
        RequestId : 1,
        rowNumber : 1,
        ID : null,
        MemberId : '00001234',
        MemberName :'홍길동',
        MobileNumber : '010-1234-5678',
        SMSReceived : 'Y',
        ReceptionStatusCode : '0001',
        ReceptionStatusName :'신청대기',
        RequestDate : '2022-12-31 12:54:32',
        ApprovedDate : null,
        CancelTypeCode : null,
        CancelTypeName : null,
        CanceledDate : null,
        InClass : 'Y',
    },
    {
        RequestId : 2,
        rowNumber : 2,
        ID : null,
        MemberId : '00001237',
        MemberName :'이방원',
        MobileNumber : '010-1234-7890',
        SMSReceived : 'N',
        ReceptionStatusCode : '0001',
        ReceptionStatusName :'신청대기',
        RequestDate : '2022-12-31 14:23:25',
        ApprovedDate : null,
        CancelTypeCode : null,
        CancelTypeName : null,
        CanceledDate : null,
        InClass : 'Y',
    },
    {
        RequestId : 3,
        rowNumber : 3,
        ID : null,
        MemberId : '00001239',
        MemberName :'이방자',
        MobileNumber : '010-2345-7890',
        SMSReceived : 'Y',
        ReceptionStatusCode : '0001',
        ReceptionStatusName :'신청대기',
        RequestDate : '2022-12-31 14:23:25',
        ApprovedDate : null,
        CancelTypeCode : null,
        CancelTypeName : null,
        CanceledDate : null,
        InClass : 'Y',
    },
    {
        RequestId : 4,
        rowNumber : 4,
        ID : null,
        MemberId : '00001239',
        MemberName :'이방자',
        MobileNumber : '010-2345-7890',
        SMSReceived : 'Y',
        ReceptionStatusCode : '0001',
        ReceptionStatusName :'신청대기',
        RequestDate : '2022-12-31 14:23:25',
        ApprovedDate : null,
        CancelTypeCode : null,
        CancelTypeName : null,
        CanceledDate : null,
        InClass : 'Y',
    },
    {
        RequestId : 5,
        rowNumber : 5,
        ID : null,
        MemberId : '00001239',
        MemberName :'이방자',
        MobileNumber : '010-2345-7890',
        SMSReceived : 'Y',
        ReceptionStatusCode : '0001',
        ReceptionStatusName :'신청대기',
        RequestDate : '2022-12-31 14:23:25',
        ApprovedDate : null,
        CancelTypeCode : null,
        CancelTypeName : null,
        CanceledDate : null,
        InClass : 'Y',
    },
    {
        RequestId : 6,
        rowNumber : 6,
        ID : null,
        MemberId : '00001239',
        MemberName :'이방자',
        MobileNumber : '010-2345-7890',
        SMSReceived : 'Y',
        ReceptionStatusCode : '0001',
        ReceptionStatusName :'신청대기',
        RequestDate : '2022-12-31 14:23:25',
        ApprovedDate : null,
        CancelTypeCode : null,
        CancelTypeName : null,
        CanceledDate : null,
        InClass : 'Y',
    }
];

const cancelTypes = [
    {
        Code :'0001',
        Name :'자동취소',
    },
    {
        Code :'0002',
        Name :'사용자취소'
    },
    {
        Code :'0003',
        Name : '관리자취소'
    }
];

const assignData = [
    {
        RequestId : 1,
        rowNumber : 1,
        ID : 'A0001',
        MemberId : '00001234',
        MemberName :'홍길동',
        MobileNumber : '010-1234-5678',
        SMSReceived : 'Y',
        ReceptionStatusCode : '2000',
        ReceptionStatusName :'배정',
        RequestDate : '2022-12-31 12:54:32',
        ApprovedDate : '2023-01-01 14:22:12',
        CancelTypeCode : null,
        CancelTypeName : null,
        InClass : 'Y',
    },
    {
        RequestId : 2,
        rowNumber : 2,
        ID : 'A0001',
        MemberId : '00001237',
        MemberName :'이방원',
        MobileNumber : '010-1234-7890',
        SMSReceived : 'Y',
        ReceptionStatusCode : '2000',
        ReceptionStatusName :'배정',
        RequestDate : '2022-12-31 14:23:25',
        ApprovedDate : '2023-01-01 14:22:12',
        CancelTypeCode : null,
        CancelTypeName : null,
        InClass : 'Y',
    }
];

const canceledData = [
    {
        RequestId : 1,
        rowNumber : 1,
        ID : 'A0001',
        MemberId : '00001234',
        MemberName :'홍길동',
        MobileNumber : '010-1234-5678',
        SMSReceived : 'Y',
        ReceptionStatusCode : '3000',
        ReceptionStatusName :'신청취소',
        RequestDate : '2022-12-31 12:54:32',
        ApprovedDate : '2023-01-01 14:22:12',
        CancelTypeCode : '0001',
        CancelTypeName : '자동취소',
        CanceledDate : '2023-01-03 11:53:12',
        InClass : 'Y',
    },
    {
        RequestId : 2,
        rowNumber : 2,
        ID : 'A0001',
        MemberId : '00001237',
        MemberName :'이방원',
        MobileNumber : '010-1234-7890',
        SMSReceived : 'Y',
        ReceptionStatusCode : '3000',
        ReceptionStatusName :'신청취소',
        RequestDate : '2022-12-31 14:23:25',
        ApprovedDate : '2023-01-01 14:22:12',
        CancelTypeCode : '0003',
        CancelTypeName : '관리자취소',
        CanceledDate : '2023-01-03 11:53:12',
        InClass : 'Y',
    }
]