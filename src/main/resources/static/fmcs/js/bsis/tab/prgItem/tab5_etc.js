var tab5Form=null;
var tab5Grid=null;
//기타
function CreateTab5Init()
{
	if(tab5Form!=null) return;
	tab5Form = $('#tab5_form').dxForm({
		showColonAfterLabel: false,
		//formData: frmCondition,
		items: createTab5Items(),
	}).dxForm("instance");	
	//createFeeList($("#fee_grid"));

}


function createTab5Items(){
	var resultItems=[];
		resultItems=[
			{
				template:function(data, itemElement){gridTab5ItemTemplate(data, itemElement)}
	    	},		
	 ];
	
	
	return resultItems;
}
const tab5feeStore = new DevExpress.data.ArrayStore({
	key: [ "ITEM_CD" ],
    data: []
});

function  gridTab5ItemTemplate(data, itemElement) {
	itemElement.append( $("<div id='tab5Grid'>").dxDataGrid({
		dataSource: tab5feeStore,
		width:'100%',
		height: '74vh',
		showBorders: true,
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
		export: {enabled: true},
		editing: {
	      mode: 'popup',
	      allowAdding: true,
	      allowUpdating: true,
	      allowDeleting: true,
	      useIcons:true,
	      popup: {
	            showTitle: true,
	            width: 'auto',
	            height:'auto',
	            onShown:function(){
	            	var frmInstance = $("#editForm").dxForm("instance");
     	        	frmInstance.validate();
	            },
	            onHiding:function(){
	            	//tab5Grid.option("editing.mode", "cell");
	            }
	      },
	      form: {
	    	  showColonAfterLabel: false,
	    	  elementAttr: {id: "editForm"},
	    	  colCount: 2,
	    	  //items:createEduPrgDetailForm(),
	          onFieldDataChanged: function (e) {
					console.log('popup-onFieldDataChanged');
	          }
	      },
		},
		onToolbarPreparing(e) {
			const dataGrid = e.component;
	        e.toolbarOptions.items.push({
				location: 'after',
				widget: 'dxButton',
				options: {
					icon: 'refresh',
					onClick() {
						tab5Grid.refresh();
					},
				},
	        },);
		},
		columns: createTab5Columns() ,
		onInitNewRow: function(e){
		    	if(e.component.option("editing.mode")=="popup"){
		    		e.component.option("editing.popup.title", "기타 요금 신규");
		    	}
		    	//var categoryData = selectedData();
				e.data={
						ITEM_CD:'',
						ITEM_NM:'',
						COST_AMT:0,
						MONTH_CNT:1,
						USE_YN:'0',	
						WEB_DISPYN:'1',
						KIOSK:'Y',
						TAX_YN:'Y',
						DISCOUNT_YN:'1',
			    };
				
		 },
		 onInitialized: function(e){
			 tab5Grid = e.component;
		 }
		 
		    
	})
	);
}


//---------------------------------
//요금선택-datagrid columns 생성 
//---------------------------------
function createTab5Columns() 
{
	var resultColumns = {};
	
	resultColumns = [
		{	dataField:'CTGCD',caption: '운영상품분류',
			formItem:{
				colSpan:2,
			},
		 	validationRules: [{ type: 'required' }],
		 	editCellTemplate: dropDownBoxEditorTemplate,
		},
		{dataField: 'ITEM_CD',caption:'요금코드', dataType: "String",allowEditing:false},
		{dataField: 'ITEM_NM',caption: '요금명', dataType: "String",},
		{dataField: 'COST_AMT',caption: '금액', dataType: "number", format: def_numberFormat,},
		{
            caption : '개월수',
            dataField :'MONTH_CNT',
            dataType:'number',
            visible:false,
            editorType :'dxNumberBox',
            editorOptions :{
                showSpinButtons: true,
                showClearButton: true,
                min: 1,
            }
        },
		{
            caption: '개인단체구분',
            dataField: 'IndividualGroupPolicyCode',
            dataType: 'string',
            calculateDisplayValue: 'IndividualGroupPolicyName',
            setCellValue: function (newData, value) {
                this.defaultSetCellValue(newData, value);
            },
            editorType: 'dxSelectBox',
            editorOptions: {
                dataSource: new DevExpress.data.ArrayStore({
                    key: 'Code',
                    data: individualGroupPolicy,
                }),
                valueExpr: 'Code',
                displayExpr: 'Name',
            },
        },
		{
            caption: '연령구분',
            dataType: 'string',
            dataField: 'AgeGroupCode',
            calculateDisplayValue: 'AgeGroupName',
            setCellValue: function (newData, value) {
                this.defaultSetCellValue(newData, value);
            },
            editorType: 'dxSelectBox',
            editorOptions: {
                dataSource: new DevExpress.data.ArrayStore({
                    key: 'Code',
                    data: ageGroupPolicy,
                }),
                displayExpr: 'Name',
                valueExpr: 'Code',
            }
        },
        {
            caption: '대상연령',
            columns: [
                {
                    caption: '최소',
                    dataField: 'AgeMin',
                    dataType: 'number',
                    editorType: 'dxNumberBox',
                    editorOptions: {
                        showSpinButtons: true,
                        showClearButton: true,
                        min: 0,
                        max: 999,
                    },
                    formItem : {
                        label: {
                            text: '최소',
                            showColon: false,
                        },
                    }
                },
                {
                    caption: '최대',
                    dataField: 'AgeMax',
                    dataType: 'number',
                    editorType: 'dxNumberBox',
                    editorOptions: {
                        showSpinButtons: true,
                        showClearButton: true,
                        min: 0,
                        max: 999,
                    },
                    formItem : {
                        label: {
                            text: '최대',
                            showColon: false,
                        },
                    }
                }
            ]
        },
		{dataField: 'USE_YN',caption: '사용',	
			lookup: {
				dataSource: use_gbn,
				displayExpr: 'text',
				valueExpr: 'value',
			},
		},
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
		{dataField: 'TAX_YN',caption: '과세구분',
			lookup: {
				dataSource: tax_gbn,
				displayExpr: 'text',
				valueExpr: 'value',
			},
		},
		{
            caption : '정렬순서',
            dataField :'SortNo',
            dataType:'number',
            visible:false,
            editorType :'dxNumberBox',
            editorOptions :{
                showSpinButtons: true,
                showClearButton: true,
                min: 1,
            }
        },
        {dataField: 'PRINT_YN',caption: '이용권춮력',
			lookup: {
				dataSource: print_gbn,
				displayExpr: 'text',
				valueExpr: 'value',
			},
		},
		];
	
	return resultColumns;
}
function dropDownBoxEditorTemplate(cellElement, cellInfo) {
	var ctgType='0';
	var selectedRowIndex=0;
	var initValue = cellInfo.value;//tab5Grid.cellValue(selectedRowIndex, "CTGCD");
	cellElement.append( 
		createCategoryDorpdownTreeTemplateCreate('treeCtgCd','single',ctgType,initValue)
	);
}
//cellInfo.setValue(selectionChangedArgs.selectedRowKeys[0]);

