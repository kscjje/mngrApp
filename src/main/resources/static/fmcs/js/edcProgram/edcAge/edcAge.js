//강좌대상연령설정
let gridEduPrgFee =null;	
let eduPrgFeeStore=null;
let gridOptDropdown=null;
let treeView=null;
function formInit()
{
	createCondition(); //조회 항목 생성
	createLeftEduPrgFee();//왼쪽 - 강좌 목록
	createRightAgeDetail();//오른쪽- 설정 연령 상세
}
function createCondition(){
		$('#ageCondition').dxForm({
		    colCount: 5,
		    showColonAfterLabel: false,
		    labelMode:'hidden',
		    //formData: frmCondition,
		    width:'50vw',
		    items: [
		    	{dataField: 'SEARCH_TYPE',label:{text:'분류구분'},editorType: 'dxSelectBox',
		    		editorOptions: {  
		    			dataSource:category_gbn,
		    			valueExpr: 'value', 
		    			displayExpr: 'text',
		    			value: '0',
		    			onValueChanged: function(e) {
		    				var formInstance= $("#ageCondition").dxForm("instance");
		    				var categoryDropdown = $("#ageCondition")
		    		                .dxForm("instance")
		    		                .getEditor("CATEGORY_DROPDOWN");
		    				//e.selectedItem.value == "0"

		    				//$('#treeCtgCdS').dxDropDownBox('option', 'dataSource');
		    				//$('#categoryTree').dxTreeView('option', 'dataSource');  
		    				  
		    			}
		    		},
		       },
		       {colSpan:2,dataField: 'CATEGORY_DROPDOWN',label:{text:'분류'},
		       		template: function (data, itemElement) {
					var ctgType='0';
					var initValue = data.component.option('formData')[data.dataField];
					itemElement.append( 
						createCategoryDorpdownTreeTemplateCreate('treeCtgCdS','multiple',ctgType,initValue)
					);
				},
		       },
		       {dataField: 'SEARCH_TYPE2',label:{text:'연령등록상태'},editorType: 'dxSelectBox',
		    		editorOptions: {  
		    			dataSource:agereg_gbn,
		    			valueExpr: 'value', 
		    			displayExpr: 'text',
		    			value: '0',
		    		},
		       },
		       {dataField: 'SEARCH_KEYWORD',label:{text:'강좌명'},
		    	   editorOptions:{
		    		   placeholder:'강좌명 2자리 이상 입력',
		    		   inputAttr: {class: "srchkeyword"},
		    		   width: '100%'
		       		}
		       }
		    ]
		});
	$('#searchBtn').dxButton({
		stylingMode: 'contained',
		icon: 'find',
		type: 'default',
		onClick() {
			var msg='';
			DevExpress.ui.notify('조회 ' + msg);
		},
	});
	$('#searchInitBtn').dxButton({
		stylingMode: 'contained',
		icon: 'clear',
		type: 'default',
		elementAttr: {
			class: "btnRefresh"
		},
		onClick() {
			DevExpress.ui.notify('초기화');
		},
	});
}
function createLeftEduPrgFee(){
	eduPrgFeeStore = new DevExpress.data.ArrayStore({
		key: 'EDC_PRGMID',
	    data: edu_fee_programs,
	});
	//repaintChangesOnly:true,
	gridEduPrgFee = $('#gridEdu').dxDataGrid({
		export: {enabled: true},
		allowColumnReordering: true,
	    allowColumnResizing: true,
	    columnAutoWidth: true,
	    showBorders: true,
	    columnChooser: {
	    	enabled: true,
	    	allowSearch: true,
	    	location: 'before',
	    },
		focusedRowEnabled: true,
		focusedRowIndex: 0,
	    dataSource: eduPrgFeeStore,
	    searchPanel: {
	    	visible: true,	
		    placeholder: 'Search...',
		    inputAttr: { 'autocomplete': 'off' }  
	    },
	    columns: createColumnsList(),
	    showBorders: true,
	    selection: {
	    	mode: 'multiple',showCheckBoxesMode:'always',
	    },
	    onFocusedRowChanged(e) {
	    	const focusedRowKey = e.component.option('focusedRowKey');
	    	selectedRowIndex = e.rowIndex;
	    	//frmDetail.option('formData', e.row.data);
	    },
	    onToolbarPreparing(e) {
              const dataGrid = e.component;
          
             /* e.toolbarOptions.items.push(
              		 {
              			 location: 'after',
              			 widget: 'dxButton',
              			 options: {
              				 	icon: 'refresh',
              				 	onClick() {
              				 		//gridInstructor.refresh();
              				 	},
              			 },
              		 }
              );*/
              e.toolbarOptions.items.push(
            		  {
            			  location: 'after',
            			  widget: 'dxButton',
            			  cssClass:'functionbtn',
            			  options: {
            				  text:'일괄등록',
            				  onClick() {
            					  CreateAgeBatchPopup();
            				  },
            			  },
            		  }
	          );
	    },//ontoolbar     
	}).dxDataGrid('instance');
}

//---------------------------------
//강좌 요금 목록-datagrid columns 생성 
//---------------------------------
function createColumnsList() 
{
	var resultColumns = {};

	resultColumns = [
		{dataField: 'CTG_NM',caption: '분류명',width:100, fixed: true,},
		{dataField: 'EDC_PRGMNM',caption: '강좌명',width:250, fixed: true,},
		{dataField: 'ITEM_NM',caption: '요금명',width:150},
		{dataField: 'EDC_DAYS',caption: '강좌요일',width:100,alignment: 'center'},
		{dataField: 'EDC_STIME',caption: '강좌시작시간',width:100,alignment: 'center'},
		{dataField: 'EDC_ETIME',caption: '강좌종료시간',width:100,alignment: 'center'},
		{dataField: 'COST_AMT',caption: '수강료',width:100, dataType: "number", format: def_numberFormat,},
		{dataField: 'EDC_PNCPA',caption: '총정원',width:100, dataType: "number", format: def_numberFormat},
		{dataField: 'INSTRCTR_NAME',caption: '강사명',width:100,alignment: 'center'},
	];
	
	return resultColumns;
}
//---------------------------------
//강좌 연령 목록 
//---------------------------------
function createRightAgeDetail(){
	//강좌>요금별 연령 설정
	$('#formAge').dxForm({
			showColonAfterLabel: false,
			colCount:12,
		    items: [
		    	{colSpan:6,label: {text:'연령제한사용'},editorType:'dxSelectBox',
		    		editorOptions:{
		    			dataSource:restrict_gbn, valueExpr: 'value',displayExpr: 'text',value: '0',
		    	}},
		    	{colSpan:4,itemType:'empty'},
		    	{colSpan:2,itemType: 'button',
					buttonOptions: {
						text: '저장하기',
						type: 'success',
						useSubmitBehavior: true,
					},
				},
		    	
		    	/*{colSpan:11,label: {text: '연령선택',},template: function (data, itemElement) {
    				gridOrgAgeTemplateCreate('gridOptOrgAge',data, itemElement,gridOptDropdown);},
    			},
    			{itemType: 'button',horizontalAlignment: 'left',
    				cssClass:'append-btn-refresh',
    				buttonOptions: {icon:'refresh',hint: '연령선택 다시 가져오기',},
		      
    			},*/
		    	{colSpan:12,label: {visible:false}
				    ,template: function (data, itemElement){
				    	var edu_id='';//강좌 id
				    	var fee_id='';//요금 id
				    	gridAgeTemplate('gridOptAge',edu_id,fee_id,data, itemElement);
				    },
		    	},
		    	/*{
				      itemType: 'button',colSpan:2,
				      horizontalAlignment: 'right',
				      buttonOptions: {
				        text: '저장하기',
				        type: 'success',
				        useSubmitBehavior: true,
				      },
				}*/
			]
		}
		).dxForm("instance");
}
function  gridAgeTemplate(elementid,edu_id,fee_id,data, itemElement) {
	//focusedRowEnabled: true,
	//focusedRowIndex: 0,

	itemElement.append( $("<div id='"+elementid+"'>")
		.dxDataGrid({
			dataSource: createAgeOptDataSource(),
			width:'100%',
			showBorders: true,
			allowColumnResizing: true,
			paging: {
		      enabled: false,
			},
			editing: {
		      mode: 'cell',
		      allowUpdating: true,
		      allowDeleting: true,
		      useIcons: true,
		      texts: {
	    			confirmDeleteMessage: '삭제하시겠습니까?',
	    		},
			},
			columns:createAgeColumnsDropDown(),	
			selection: {
				mode: 'multiple',
				showCheckBoxesMode:'always'
			},
			toolbar: {
				items: [
					{
						location: 'after',
						widget: 'dxButton',
						options: {
							hint: '연령신규',   
							icon:'add',
							onClick(e) {
							//const expanding = e.component.option('text') === 'Expand All';
								CreateAgeRegPopup();
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
			 /*onCellPrepared(e) {
				if(e.rowType=='header' && e.columnIndex==0){
					console.log('0');
				}
			 },*/
	})); 
}
  