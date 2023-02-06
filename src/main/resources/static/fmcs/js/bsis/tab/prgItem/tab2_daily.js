var tab2Form=null;
var tab2Grid=null;
//일일입장권
function CreateTab2Init()
{
	if(tab2Form!=null) return;
	tab2Form = $('#tab2_form').dxForm({
		showColonAfterLabel: false,
		//formData: frmCondition,
		items: createTab2Items(),
	}).dxForm("instance");	

}
function createTab2Items(){
	var resultItems=[];
		resultItems=[
			{itemType:'group',
				template:function(data, itemElement){gridTicketItemTemplate(data, itemElement)}
	    	},		
	 ];
	
	
	return resultItems;
}

const getWeekendPolicyIdByItems = (selectedItems) => {

    const selectedWeekendPolicy = weekendPolicy.find(({
                                                          ID, items
                                                      }) => JSON.stringify(selectedItems) === JSON.stringify(items));

    return selectedWeekendPolicy ? selectedWeekendPolicy.ID : null;
};

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
    Code: true, Name: '사용'
}, {
    Code: false, Name: '사용안함'
}];
const priceItems = [{
    ProductId: 1,
    placeName:'매표장소',
    ProgramName:'매표운영프로그램',
    ProductName: '수영 - 성인',
    UnitPrice: 3000,
    Taxable: false,
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
    Enabled: true,
    IsPublic: true,
    Discountable: true,
    KeyIssuable: true,
}, {
    ProductId: 2,
    ProductName: '수영 - 성인',
    UnitPrice: 3000,
    Taxable: false,
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
    WeekendPolicy:  getWeekendPolicyIdByItems(['MO', 'TU', 'WE', 'TH', 'FR']),
    Enabled: true,
    IsPublic: true,
    Discountable: true,
    KeyIssuable: true,
    IndividualGroupPolicyCode: '0002',
    IndividualGroupPolicyName: '단체요금',
    GroupDiscountAvailable: true,
}, {
    ProductId: 3,
    ProductName: '자유수영',
    UnitPrice: 3000,
    Taxable: false,
    GenderPolicyCode: '0002',
    GenderPolicyName: '여',
    DayOfTheWeekPolicyCode: ['MO', 'TU', 'WE', 'TH', 'FR'],
    DayOfTheWeekPolicyName: ['월', '화', '수', '목', '금'],
    AgeGroupCode: '0000',
    AgeGroupName: '설정안함',
    ResidencyCertificationCode: '0002',
    ResidencyCertificationName: '비대면인증적용',
    WeekendPolicy: getWeekendPolicyIdByItems(['MO', 'TU', 'WE', 'TH', 'FR']),
    Enabled: true,
    IsPublic: true,
    Discountable: true,
    KeyIssuable: true,
    IndividualGroupPolicyCode: '0001',
    IndividualGroupPolicyName: '개인요금',
}];
const residencyCertificationPolicy = [{
    Code: '0000', Name: '사용안함'
}, {
    Code: '0001', Name: '서류확정(회원)'
}, {
    Code: '0002', Name: '비대면인증적용'
}];

const ticketItems = new DevExpress.data.ArrayStore({
        key: 'ProductId',
        data: priceItems,
})
;
const discountableData = [{
    Code: true, Name: '적용'
}, {
    Code: false, Name: '적용안함'
}];

const keyIssuableData = [{
    Code: true, Name: '발권'
}, {
    Code: false, Name: '발권안함'
}];


function  gridTicketItemTemplate(data, itemElement) {
	itemElement.append( $("<div id='tab2Grid'>").dxDataGrid({
		dataSource: ticketItems,
		//width:'100%',
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
        	{
                caption: '매표장소',
                dataField: 'PlaceName',
                width:100,
                headerCellTemplate(container) {
                    container.append($('<div>매표장소<br/>분류</div>'));
                },
                fixed: true,
            },
            {
                caption: '매표운영프로그램',
                dataField: 'ProgramName',
                width:200,
                fixed: true,
            },
            {dataField: 'ItemCode',caption: '품목코드',dataType: 'string',alignment: 'center',},
            {
                caption: '요금명',
                dataField: 'ProductName',
                width:150,
            },
            {
                caption: '판매단가',
                dataField: 'UnitPrice',
                dataType: 'number',
                //format: 'currency',
                format: def_numberFormat,
            },
            {
                caption: '비과세',
                dataField: 'Taxable',
                alignment: 'center',
                cellTemplate: function (container, options) {
                    const customTexts = options.value ? "과세" : "비과세";
                    container.html(customTexts);
                }
            },
            {
                caption: '판매가능성별',
                dataType: 'string',
                dataField: 'GenderPolicyCode',
                alignment: 'center',
                headerCellTemplate(container) {
                    container.append($('<div>판매가능<br/>성별</div>'));
                },
                calculateDisplayValue: 'GenderPolicyName',
            },
            {
                caption: '판매가능요일',
                dataType: 'object',
                dataField: 'DayOfTheWeekPolicyCode',
                width:100,
                headerCellTemplate(container) {
                    container.append($('<div>판매가능<br/>요일</div>'));
                },
                calculateDisplayValue: 'DayOfTheWeekPolicyName',
                setCellValue: function (newData, value, currentRowData) {
                    this.defaultSetCellValue(newData, value);
                },
                editCellTemplate: function (container, options) {

                    const getWeekdaySelectedItems = function (policyCode) {
                        if (policyCode) {
                            const selectedPolicy = weekendPolicy.find(({ID, items}) => ID === policyCode);
                            return selectedPolicy.items;
                        } else {
                            return options.value;
                        }
                    };

                    container.append($('<div>').dxButtonGroup({
                        items: dayPolicy,
                        keyExpr: 'ID',
                        selectionMode: "multiple",
                        selectedItemKeys: getWeekdaySelectedItems(options.data.WeekendPolicy),
                        // selectedItemKeys : options.value,
                        height: 30,
                        width: '100%',
                        buttonTemplate: function (itemData, $buttonContent) {
                            $buttonContent.append(`<span>\${itemData.Text}</span>`);

                        },
                        onSelectionChanged(e) {
                            const selectedItems = e.component.option('selectedItemKeys');

                            options.data.WeekendPolicy = getWeekendPolicyIdByItems(selectedItems);

                            options.setValue(selectedItems);
                        }
                    }));
                }
            },
            {
                caption: '연령구분',
                dataType: 'string',
                dataField: 'AgeGroupCode',
                alignment: 'center',
                calculateDisplayValue: 'AgeGroupName',
                setCellValue: function (newData, value, currentRowData) {
                    this.defaultSetCellValue(newData, value);
                },
            },
            {
                caption: '대상연령',
                columns: [
                    {
                        caption: '최소',
                        dataField: 'AgeMin',
                        dataType: 'number',
                    },
                    {
                        caption: '최대',
                        dataField: 'AgeMax',
                        dataType: 'number',
                    }
                ]
            },
            {
                caption: '개인단체구분',
                dataField: 'IndividualGroupPolicyCode',
                alignment: 'center',
                dataType: 'string',
                headerCellTemplate(container) {
                    container.append($('<div>개인단체<br/>구분</div>'));
                },
                calculateDisplayValue: 'IndividualGroupPolicyName',
                setCellValue: function (newData, value) {
                    this.defaultSetCellValue(newData, value);
                },
            },
            {
                caption: '판매시단체할인율적용',
                dataField: 'GroupDiscountAvailable',
                dataType: 'boolean',
                width:100,
                headerCellTemplate(container) {
                    container.append($('<div>판매시<br/>단체할인율적용</div>'));
                },
                alignment: 'center',
                cellTemplate: function (container, options) {
                    const customTexts = options.value ? "적용" : "적용안함";
                    container.html(customTexts);
                }

            },
            {
                caption: '온라인공개',
                dataField: 'IsPublic',
                dataType: 'boolean',
                alignment: 'center',
                headerCellTemplate(container) {
                    container.append($('<div>온라인<br/>공개</div>'));
                },
                cellTemplate: function (container, options) {
                    const customTexts = options.value ? "공개" : "공개안함";
                    container.html(customTexts);
                }
            },
            {
                caption: '사용여부',
                dataField: 'Enabled',
                dataType: 'boolean',
                alignment: 'center',
                cellTemplate: function (container, options) {
                    const customTexts = options.value ? "사용" : "사용안함";
                    container.html(customTexts);
                }
            },
            {
                caption: '예약신청거주인증',
                dataField: 'ResidencyCertificationCode',
                width:100,
                headerCellTemplate(container) {
                    container.append($('<div>예약신청<br/>거주인증</div>'));
                },
                alignment: 'center',
                calculateDisplayValue: 'ResidencyCertificationName',
            },
            {
                caption: '할인적용',
                dataField: 'Discountable',
                width:100,
                dataType: 'boolean',
                alignment: 'center',
                cellTemplate: function (container, options) {
                    const customTexts = options.value ? "적용" : "적용안함";
                    container.html(customTexts);
                }
            },
            {
                caption: '전자키발권',
                dataField: 'KeyIssuable',
                dataType: 'boolean',
                alignment: 'center',
                headerCellTemplate(container) {
                    container.append($('<div>전자키<br/>발권</div>'));
                },
                cellTemplate: function (container, options) {
                    const customTexts = options.value ? "발권" : "발권안함";
                    container.html(customTexts);
                }
            },
            {
                dataField: 'WeekendPolicy',
                visible: false,
                setCellValue: function (newData, value, currentRowData) {
                    this.defaultSetCellValue(newData, value);
                },
            }


        ],
        export: {
            enabled: true
        },
        toolbar: {
            items: [
                {
                    location: 'after',
                    name: 'exportButton',
                },
                {
                    location: 'after',
                    widget: 'dxButton',
                    options: {
                        icon: 'refresh'
                    },
                    onClick() {
                    	tab2Grid.refresh();
                    }
                },
            ]
        },
        onInitialized(e){
        	tab2Grid=e.component;
        },
	
	}));
}



			