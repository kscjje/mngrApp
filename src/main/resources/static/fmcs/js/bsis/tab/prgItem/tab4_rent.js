//대관
var formRentA=null;
var formRentB=null;
var rentAStore=null;
var rentBStore=null;
function CreateTab4Init()
{
	if(formRentA !=null){
		
	}else{
		rentAStore = new DevExpress.data.ArrayStore({
	        key: 'ITEM_CD',
	        data:  [
				{RENT_FCLTY_TYPE:'FT001',
				 RENT_FCLTY_NAME:'수영장',
				 ITEM_CD: '0001', ADCLS_NAME: "난방", ADCLS_ITEM_UNITGBN: "T",
				 ADCLS_ITEM_COST: 10000, USE_YN: "1",
				 TAXT_GBN:'Y',ONLINE_OPENYN:'0',
				 USE_YN:'1',
				 RENT_TIME_MONTH: 1,
				 },
			]
	    });
		
		formRentA = $('#formRentA').dxForm({
			showColonAfterLabel: false,
			//formData: frmCondition,
			items: createTab4RentA(),
		}).dxForm("instance");		

		rentBStore = new DevExpress.data.ArrayStore({
	        key: 'ITEM_CODE',
	        data:  [
	        	{RENT_FCLTY_SEQ:'FG001',
	        	 RENT_PLACE_ID:'0001',
	        	 RENT_PLACENM:'수영장',
			     ITEM_TYPE:'평일(행사)요금',
			     ITEM_CODE: '0001', 
			     FIELD_TIME_GUBUN:'AD',
			     FIELD_PRICE_NAME: "대관료(평일행사)_전일",
			     FIELD_WEEK_GUBUN:'월,화,수',
			     FIELD_ONLINE_YN:'0',
			     FIELD_PRICE: "10000",
    		     FIELD_TEX_YN:'Y',
	        	},
			]
	    });
		
		formRentB = $('#formRentB').dxForm({
			showColonAfterLabel: false,
			//formData: frmCondition,
			items: createTab4RentB(),
		}).dxForm("instance");
		
	}

}
function createTab4RentA(){
	var resultItems=[];
		resultItems=[
			{template:function(data, itemElement){gridRentATemplate(data, itemElement)}},		
	 ];
	
	return resultItems;
}
function createTab4RentB(){
	var resultItems=[];
		resultItems=[
			{template:function(data, itemElement){gridRentBTemplate(data, itemElement)}},		
	 ];
	return resultItems;
}

function  gridRentATemplate(data, itemElement) {
	itemElement.append( $("<div id='gridRentA'>").dxDataGrid({
		dataSource:rentAStore,
		height: '80%',
        loadPanel: {
            enabled: true
        },
        rowAlternationEnabled: true,//약간 음영 처리된 행과 번갈아 표시
        allowColumnResizing: true,
        showBorders: true,
        showRowLines: true,
        allowColumnResizing: true,
        paging: {
        	pageSize: 10,
		},
		pager: {
			visible: true,
		    showInfo: true,
		    infoText: "총 {2}건   {0}/{1}",
		    showNavigationButtons: true,
		},
        editing: {
            allowUpdating: false,
            allowAdding: false,
            allowDeleting: false,
        },
        columns: [
        	{dataField: "RENT_FCLTY_TYPE", width: 150, caption: "대관시설유형", alignment: "center", lookup: {dataSource: facilityType_gbn, displayExpr: "text", valueExpr: "value"}}, 
			{dataField: "RENT_FCLTY_NAME", width: 150, caption: "시설분류명",  alignment: "center"},
			{dataField: "ITEM_CD",caption : '폼목코드', dataType: 'string',alignment: 'center',},
			{dataField: "ADCLS_NAME", width: "20%", caption: "부속시설명", allowEditing: false},
			{dataField: "ADCLS_ITEM_UNITGBN", width: "9%", caption: "이용단위", alignment: "center",
				lookup: {dataSource: [{text: "개수", value: "C"},{text: "시간", value: "T"}], displayExpr: "text", valueExpr: "value"}},
			{dataField: "ADCLS_ITEM_COST", width: "9%", caption: "금액", alignment: "right",
					dataType: "number", format: def_numberFormat,
			},
			{dataField: "TAXT_GBN", width: "9%", caption: "과세구분", alignment: "center", lookup: {dataSource: tax_gbn, displayExpr: "text", valueExpr: "value"}},
			{dataField: "ONLINE_OPENYN", width: "9%", caption: "온라인공개여부", alignment: "center", lookup: {dataSource: online_gbn, displayExpr: "text", valueExpr: "value"}},
			{dataField: "USE_YN", width: "9%", caption: "사용여부", alignment: "center", lookup: {dataSource: use_gbn, displayExpr: "text", valueExpr: "value"}},
            ]
	}));
}
function  gridRentBTemplate(data, itemElement) {
	itemElement.append( $("<div id='gridRentB'>").dxDataGrid({
		dataSource:rentBStore,
		height: '80%',
        loadPanel: {
            enabled: true
        },
        rowAlternationEnabled: true,//약간 음영 처리된 행과 번갈아 표시
        allowColumnResizing: true,
        showBorders: true,
        showRowLines: true,
        allowColumnResizing: true,
        paging: {
        	pageSize: 10,
		},
		pager: {
			visible: true,
		    showInfo: true,
		    infoText: "총 {2}건   {0}/{1}",
		    showNavigationButtons: true,
		},
        editing: {
            allowUpdating: false,
            allowAdding: false,
            allowDeleting: false,
        },
        columns: [
        	{dataField: "RENT_FCLTY_SEQ", width: "8%", caption: "시설분류명", alignment: "center", 
        		lookup: {dataSource:  [
        			{text: "축구장", value: "FG001"}, 
        			{text: "수영장", value: "FG002"}, 
        			{text: "헬스장", value: "FG003"},
        			{text: "세미나실", value: "FG004"}],
        			displayExpr: "text", valueExpr: "value"}}, 
			{dataField: "RENT_PLACE_ID", width: "5%", caption: "장소코드", alignment: "center"},
			{dataField: "RENT_PLACENM", width: "10%", caption: "장소명"},
			{dataField: "ITEM_TYPE", width: "10%", caption: "요금구분",alignment: 'center'},
			{dataField: "ITEM_CODE", width: "8%", caption: "품목코드",alignment: 'center'},
            {dataField: "FIELD_TIME_GUBUN", width: "10%", caption: "대상적용시간", alignment: "center", 
				lookup:{dataSource: [
    						{text: "전일", value: "AD"},
    						{text: "새벽", value: "SR"},
    						{text: "오전", value: "AM"},
    						{text: "오후", value: "PM"},
    						{text: "야간", value: "NT"}
    					],	displayExpr: "text", valueExpr: "value",
				},
    		},
    		{dataField: "FIELD_PRICE_NAME", width: "20%", caption: "항목명(요금)"},
    		{dataField: "FIELD_WEEK_GUBUN", width: "25%", caption: "대상적용요일",},
    		{dataField: "FIELD_PRICE", width: "10%", caption: "금액", dataType: "number", format: def_numberFormat,},
    		{dataField: "FIELD_ONLINE_YN", width: "15%", caption: "온라인공개여부", alignment: "center", 
    			lookup: {dataSource: online_gbn, displayExpr: "text", valueExpr: "value",}
    		},
    		{dataField: "FIELD_TEX_YN", width: "10%", caption: "과세여부", alignment: "center", 
    			lookup: {dataSource: tax_gbn, displayExpr: "text", valueExpr: "value",}
    		}
            ]
		
	}));
}

function RentChangeTab(btnE,chgidx)
{
	$("#tab4 .custom-tab .div-btn button").removeClass("selected-tab");
	$(btnE).addClass("selected-tab");
	
	if (chgidx == 0) {
		$("#formRentB").hide();
		$("#formRentA").show();
	} else {
		$("#formRentA").hide();
		$("#formRentB").show();
	}	
}
