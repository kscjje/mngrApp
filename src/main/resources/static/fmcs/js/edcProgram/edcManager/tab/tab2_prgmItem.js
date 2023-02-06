var tab2Form=null;
var tab2gridDropdown=null;
var gridFee=null;
//2023-01-27 
//박이사님 확인:요금은 프로그램별로 만든다. 공통은 없다. 복사해서 사용한다.
//요금 체크 박스 삭제

//요금 설정
function CreateTab2Init()
{
	if(tab2gridDropdown!=null) return;
	if(tab2Form!=null) return;
	tab2Form = $('#tab2 .tab_contents .tab_contents_form').dxForm({
		showColonAfterLabel: false,
		//formData: frmCondition,
		colCount:8,
		items: createTab2Items(),
	}).dxForm("instance");	
	
	createFeeList($("#fee_grid"));
	//$("#saveBtn2").dxButton({text: '저장하기',type: 'success',	});
}


function createTab2Items(){
	var resultItems=[];
		resultItems=[
			{colSpan:2,label: {text:'가격정책'},editorType: 'dxSelectBox',
				editorOptions: {dataSource:fee_gbn,
  	        	  valueExpr: 'value',displayExpr: 'text',value: '0',
    			},
			},		
			{	  
				colSpan:6,
			    itemType: 'button',
			    horizontalAlignment: 'right',
			    buttonOptions: {
			        text: '저장하기',
			        type: 'success',
			        useSubmitBehavior: true,
			    },
			},
					
	    			
	    			/*{itemType: 'group',colSpan:8,colCount:8,
	    				items: [
	    				{colSpan:7,label: {text: '요금선택',},template: function (data, itemElement) {gridTemplateCreate(data, itemElement);},},
	    				{itemType: 'button',horizontalAlignment: 'left',
	    						cssClass:'append-btn-refresh',
						      buttonOptions: {icon:'refresh',hint: '요금선택 다시 가져오기',},
						      
						},
					
	    				{itemType:'empty'},
	                    ],
	    			},*/
	 ];
	
	
	return resultItems;
}
const feeStore = new DevExpress.data.ArrayStore({
    key: 'ITEM_CD',
    data: FEE_ITEMS
});

function  gridTemplateCreate(data, itemElement) {
	itemElement.append( $("<div id='gridFee'>")
		.dxDropDownBox({
		    value: [0],
		    valueExpr: 'ITEM_CD',
		    placeholder: '요금 선택...',
		    displayExpr: 'ITEM_NM',
		    showClearButton: true,
		    dataSource: feeStore,
		    dropDownOptions: {
	          
	            toolbarItems: [{
	                toolbar: 'bottom',
	                location: 'after',
	                widget: "dxButton", 
	                options: {
	                    text: "선택",
	                    onClick: ()=>{  }
	                }
	            }],
		    },
		    contentTemplate(e) {
		      const v = e.component.option('value');
		      const $dataGrid = $('<div >').dxDataGrid({
		        dataSource: e.component.getDataSource(),
		        columns: createFeeColumnsDropDown(false),
		        hoverStateEnabled: true,
		        scrolling: { mode: 'virtual' },
		        height: 150,
		        selection: {mode: 'multiple',showCheckBoxesMode:'always',},
		        selectedRowKeys: v,
		        onSelectionChanged(selectedItems) {
		          const keys = selectedItems.selectedRowKeys;
		          e.component.option('value', keys);
		        },
		      });
		      
		      tab2gridDropdown = $dataGrid.dxDataGrid('instance');
		      e.component.on("valueChanged", function(args){  
           			var value = args.value;  
           			tab2gridDropdown.selectRows(value, false);  
		      });  
	  
           		return $dataGrid;
		    },
		  }));
}


//---------------------------------
//요금선택-datagrid columns 생성 
//---------------------------------
function createFeeColumnsDropDown(bedit) 
{
	var resultColumns = {};
	
	resultColumns = [
		{dataField: 'ITEM_NM',caption: '요금명'},
		{dataField: 'COST_AMT',caption: '금액' , 		dataType: "number", format: def_numberFormat,},
		{dataField: 'MONTH_CNT',caption: '개월수',	dataType: "number",	},
		/*{dataField: 'USE_YN',caption: '사용',
			showEditorAlways: bedit,
			lookup: {
				dataSource: use_gbn,
				displayExpr: 'text',
				valueExpr: 'value',
			},
		},*/
		{dataField: 'WEB_DISPYN',caption: '온라인공개',
			showEditorAlways: bedit,
			lookup: {
				dataSource: online_gbn,
				displayExpr: 'text',
				valueExpr: 'value',
			},
		},
		{dataField: 'KIOSK',caption: '키오스크노출',
			showEditorAlways: bedit,
			lookup: {
				dataSource: view_gbn,
				displayExpr: 'text',
				valueExpr: 'value',
			},
		},
		{dataField: 'VALID_COUNTYN',caption: '이용가능횟수차감운영',width:180, 
			showEditorAlways: bedit,
			lookup: {
				dataSource: counting_gbn,
				displayExpr: 'text',
				valueExpr: 'value',
			},
		},
		{dataField: 'VALID_COUNT',caption: '이용가능횟수',dataType: "number", format: def_numberFormat,
			showEditorAlways: bedit,
		},
		{dataField: 'DISCOUNT_YN',caption: '할인적용',
			showEditorAlways: bedit,
			lookup: {
				dataSource: apply_gbn,
				displayExpr: 'text',
				valueExpr: 'value',
			},
		},
		{dataField: 'TAX_YN',caption: '과세구분',
			showEditorAlways: bedit,
			lookup: {
				dataSource: tax_gbn,
				displayExpr: 'text',
				valueExpr: 'value',
			},
		},
		{dataField: 'PKGDCYN',caption: '패키지할인대상',
			showEditorAlways: bedit,
			lookup: {
				dataSource: target_opt_gbn,
				displayExpr: 'text',
				valueExpr: 'value',
			},
		},
		{dataField: 'ITEM_CD',caption:'요금코드',visible:false},
	
		];
	
	return resultColumns;
}

function createFeeList(selector){
	
	var eduWidth = 1517;//$('.edu_condition').width();
	gridFee =  $(selector).dxDataGrid({
	dataSource: FEE_ITEMS,
	keyExpr: 'ITEM_CD',
	width:'100%',
	showBorders: true,
	allowColumnResizing: true,
	focusedRowEnabled: true,
	focusedRowIndex: 0,
	paging: {
      enabled: false,
	},
	editing: {
      mode: 'batch',
      allowUpdating: true,
      allowDeleting: true,
      useIcons: true,
      selectTextOnEditStart: true,
	},
	//selection: {mode: 'multiple',showCheckBoxesMode:'always',},
	toolbar: {
		items: [
			{
				location: 'after',
				widget: 'dxButton',
				options: {
					hint: '요금신규',   
					icon:'add',
					onClick(e) {
					//const expanding = e.component.option('text') === 'Expand All';
						CreateFeeRegForm();
					},
				},
			},
			
			{
	          location: 'after',
	          widget: 'dxButton',
	          options: {
	            icon: 'refresh',
	            onClick() {
	              //dataGrid.refresh();
	            },
	          },
	        },
	        
	      ],
	},
    columns: createFeeColumnsDropDown(true),
    }).dxDataGrid('instance');
}