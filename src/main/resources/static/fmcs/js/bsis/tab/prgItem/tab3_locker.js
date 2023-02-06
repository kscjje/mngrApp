//사물함
var formLockerA=null;
var formLockerB=null;
var lockerAStore =null;
var lockerBStore =null; 
function CreateTab3Init()
{
	if(formLockerA !=null){
		
	}else{
		lockerAStore = new DevExpress.data.ArrayStore({
	        key: 'ItemCode',
	        data: [ {
	            ProductCategoryCode: '1_1',
	            ProductCategoryName : '사물함',
	            ItemCode: 'I000042',
	            ItemName: '사물함-소',
	            FeeCategory: '1000',
	            FeeCategoryName: '임대료',
	            RentalMonths: 2,
	            UnitFee: 2000,
	            Taxable: 'Y',
	            Enabled: '0',
	            Remark: '임대료비고',
	            Displayable: '1',
	            SortingNumber: 1
	        },]
	    });
		formLockerA = $('#formLockerA').dxForm({
			showColonAfterLabel: false,
			//formData: frmCondition,
			items: createTab3LockerA(),
		}).dxForm("instance");		
		lockerBStore = new DevExpress.data.ArrayStore({
	        key: 'ItemCode',
	        data: [ {
			 LocationName: '매점옆',
	         LocationCode: '0002',
	         Division: '0',
	         ID: '0004',
	         Size:  'L',
	         Status: '임대중' ,
	         StatusCode: 'A',
	         Layer: '상단',
	         LayerCode:  '0001',
	         ItemCode: 'I000042',
	         ItemName: '사물함-소',
	         FeeCategory: '1000',
	         FeeCategoryName: '임대료',
	         RentalMonths: 2,
	         UnitFee: 2000,
	         Taxable: 'Y',
	         Enabled: '0',
	         Remark: '임대료비고',
	         Displayable: '1',
	         SortingNumber: 1
	        	 
	        },]
	    });
		formLockerB = $('#formLockerB').dxForm({
			showColonAfterLabel: false,
			//formData: frmCondition,
			items: createTab3LockerB(),
		}).dxForm("instance");
	}
}
function createTab3LockerA(){
	var resultItems=[];
		resultItems=[
			{template:function(data, itemElement){gridLockerATemplate(data, itemElement)}},		
	 ];
	
	
	return resultItems;
}
function createTab3LockerB(){
	
	var resultItems=[];
		resultItems=[
			{template:function(data, itemElement){gridLockerBTemplate(data, itemElement)}},		
	 ];
	return resultItems;
}
function  gridLockerATemplate(data, itemElement) {
	itemElement.append( $("<div id='gridLockerA'>").dxDataGrid({
		dataSource: lockerAStore,
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
                    
                    }
                },
            ]
        },
        columns: [
            {
                dataField: 'FeeCategory',
                caption: '요금구분',
                alignment: 'center',
                lookup: {
                    dataSource: [
                        {
                            Code: '1000', Name: '임대료'
                        },
                        {
                            Code: '1001', Name: '보증금'
                        }
                    ],
                    displayExpr: 'Name',
                    valueExpr: 'Code',
                },
            },
            {
                dataField: 'ItemCode',
                caption: '품목코드',
                dataType: 'string',
                alignment: 'center',
            },
            {
                dataField: 'ItemName',
                caption: '요금명',
                dataType: 'string',
                alignment: 'left',
            },
            {
                dataField: 'RentalMonths',
                caption: '임대개월수',
                dataType: 'number',
                alignment: 'right',
            },
            {
                dataField: 'UnitFee',
                caption: '판매단가',
                dataType: 'number',
                alignment: 'right',
                format: def_numberFormat,
            },
            {
                dataField: 'Taxable',
                caption: '과세구분',
                alignment: 'center',
                lookup: {
                    dataSource: tax_gbn,
                    valueExpr: 'value',
                    displayExpr: 'text',
                },
            },
            {
                dataField: 'Enabled',
                caption: '사용여부',
                alignment: 'center',
                lookup: {
                    dataSource: use_gbn,
                    valueExpr: 'value',
                    displayExpr: 'text'
                },
            },
            {
                dataField: 'Remark',
                caption: '비고',
                dataType: 'string',
                alignment: 'left',
                editorType: 'dxTextArea',
                editorOptions: {
                    height: 140,
                },
               
            },
            {
                dataField: 'Displayable',
                caption: '온라인공개',
                alignment: 'center',
                lookup: {
                    dataSource: online_gbn,
                    valueExpr: 'value',
                    displayExpr: 'text',
                },
                
            },
            {
                dataField: 'SortingNumber',
                caption: '정렬순서',
                visible: false,
                dataType: 'number',
                
            }
        ],
       
	}));
}
function  gridLockerBTemplate(data, itemElement) {
	itemElement.append( $("<div id='gridLockerB'>").dxDataGrid({
		dataSource:lockerBStore,
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
                    
                    }
                },
            ]
        },
        columns: [
            {
                dataField: 'LocationName',
                dataType: 'string',
                alignment: 'center',
                caption: '사물함위치',
            },
            {
                dataField: 'ID',
                dataType: 'string',
                alignment: 'center',
                caption: '사물함번호',
            },
            {
                dataField: 'Status',
                dataType: 'string',
                caption: '사물함상태',
                alignment: 'center',
            },
            {
                dataField: 'Size',
                dataType: 'string',
                caption: '사물함크기',
                alignment: 'center',
            },
            {
                dataField: 'Layer',
                dataType: 'string',
                caption: '단구분',
                alignment: 'center',
            },
            {
                dataField: 'FeeCategory',
                caption: '요금구분',
                dataType: 'string',
                alignment: 'center',
                calculateDisplayValue : 'FeeCategoryName',
                setCellValue: function (newData, value) {
                    this.defaultSetCellValue(newData, value);
                },
                lookup: {
                    dataSource: [
                        {
                            Code: '1000', Name: '임대료'
                        },
                        {
                            Code: '1001', Name: '보증금'
                        }
                    ],
                    displayExpr: 'Name',
                    valueExpr: 'Code',
                    placeholder: '선택하세요.',
                },
            },
            {
                dataField: 'ItemCode',
                caption: '품목코드',
                dataType: 'string',
                alignment: 'center',
            },
            {
                dataField: 'ItemName',
                caption: '요금명',
                dataType: 'string',
                alignment: 'left',
            },
            {
                dataField: 'RentalMonths',
                caption: '임대개월수',
                dataType: 'number',
                alignment: 'right',
            },
            {
                dataField: 'UnitFee',
                caption: '판매단가',
                dataType: 'number',
                alignment: 'right',
                format: def_numberFormat,
            },
            {
                dataField: 'Taxable',
                caption: '과세구분',
                alignment: 'center',
                lookup: {
                    dataSource: tax_gbn,
                    valueExpr: 'value',
                    displayExpr: 'text',
                },
                
            },
            {
                dataField: 'Enabled',
                caption: '사용여부',
                alignment: 'center',
                lookup: {
                    dataSource: use_gbn,
                    valueExpr: 'value',
                    displayExpr: 'text'
                },
            },
            {
                dataField: 'Displayable',
                caption: '온라인공개',
                alignment: 'center',
                lookup: {
                    dataSource: online_gbn,
                    valueExpr: 'value',
                    displayExpr: 'text',
                },
                
            },
            {
                dataField: 'Remark',
                caption: '비고',
                dataType: 'string',
                alignment: 'left',
            },
        ],
	}));
}


function lockerChangeTab(btnE,chgidx)
{
	$("#tab3 .custom-tab .div-btn button").removeClass("selected-tab");
	$(btnE).addClass("selected-tab");
	
	if (chgidx == 0) {
		$("#formLockerB").hide();
		$("#formLockerA").show();
	} else {
		$("#formLockerA").hide();
		$("#formLockerB").show();
	}	
}
