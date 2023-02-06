var tab1Form=null;
var tab1Grid=null;
//정기상품
function CreateTab1Init()
{
	if(tab1Form!=null) return;
	tab1Form = $('#tab1_form').dxForm({
		showColonAfterLabel: false,
		//formData: frmCondition,
		items: createTab1Items(),
	}).dxForm("instance");	
	//createFeeList($("#fee_grid"));
}

function createTab1Items(){
	var resultItems=[];
		resultItems=[
			{itemType:'group',
				template:function(data, itemElement){gridTab1ItemTemplate(data, itemElement)}
	    	},		
	 ];
	
	
	return resultItems;
}
const feeStore = new DevExpress.data.ArrayStore({
	key: [ "EDC_PRGMID", "ITEM_CD" ],
    data: edu_fee_programs
});

function  gridTab1ItemTemplate(data, itemElement) {
	itemElement.append( $("<div id='tab1Grid'>").dxDataGrid({
		dataSource: feeStore,
		width:'100%',
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
        columns: createPrgFeeColumns(),
        export: {enabled: true},
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
	})
	);
}


//---------------------------------
//요금선택-datagrid columns 생성 
//---------------------------------
function createPrgFeeColumns() 
{
	var resultColumns = {};
	
	resultColumns = [
		{dataField: 'EDC_PRGMNM',caption: '강좌명',width:200},
		{dataField: 'ItemCode',caption: '품목코드',dataType: 'string',alignment: 'center',},
		{dataField: 'ITEM_NM',caption: '요금명',width:150,},
		{dataField: 'COST_AMT',caption: '금액' , 		dataType: "number", format: def_numberFormat,},
		{dataField: 'MONTH_CNT',caption: '개월수',	dataType: "number",	},
		{dataField: 'WEB_DISPYN',caption: '온라인공개',
			lookup: {
				dataSource: online_gbn,
				displayExpr: 'text',
				valueExpr: 'value',
			},
		},
		{dataField: 'KIOSK',caption: '키오스크노출',
			lookup: {
				dataSource: view_gbn,
				displayExpr: 'text',
				valueExpr: 'value',
			},
		},
		{dataField: 'VALID_COUNTYN',caption: '이용가능횟수차감운영',width:200, 
			lookup: {
				dataSource: counting_gbn,
				displayExpr: 'text',
				valueExpr: 'value',
			},
		},
		{dataField: 'VALID_COUNT',caption: '이용가능횟수',dataType: "number", format: def_numberFormat,},
		{dataField: 'DISCOUNT_YN',caption: '할인적용',
			lookup: {
				dataSource: apply_gbn,
				displayExpr: 'text',
				valueExpr: 'value',
			},
		},
		{dataField: 'TAX_YN',caption: '과세구분',
			lookup: {
				dataSource: tax_gbn,
				displayExpr: 'text',
				valueExpr: 'value',
			},
		},

		{dataField: 'PKGDCYN',caption: '패키지할인대상',
			lookup: {
				dataSource: target_opt_gbn,
				displayExpr: 'text',
				valueExpr: 'value',
			},
		},
	
		];
	
	return resultColumns;

}