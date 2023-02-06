//수강회원현황
let storeRegCapacity=null;
let treeView=null;
var frmCondition ={
		SEARCH_TYPE_TERM:'1',
		SEARCH_DATE_EDU:'',
		SEARCH_DATE_START:'',
		SEARCH_DATE_END:'',
		SEARCH_TYPE1:'0',
		SEARCH_TYPE2:'0',
		SEARCH_TYPE3:'0',
		SEARCH_TYPE4:'',
		SEARCH_TYPE5:'',
		CATEGORY_DROPDOWN:[],
}
function formInit()
{
	createCondition(); //조회 항목 생성
	createUserState();//하단 - 강좌 목록
}
function createCondition(){
	const now = new Date();
	var srchDISCOUNT_ITEMS =[...DISCOUNT_ITEMS];
	srchDISCOUNT_ITEMS.unshift({
		DC_CD:'',
		DC_NAME:'- 할인사유 선택 -',});
	$('#userStateCondition').dxForm({
		    colCount:7,
		    showColonAfterLabel: false,
		    formData: frmCondition,
		    width:'85vw',
		    items: [
		    	{dataField: 'SEARCH_TYPE_TERM',label:{visible:false},editorType: 'dxSelectBox',
		    		editorOptions: {  
		    			dataSource:[
		    				{value:'1',text:'이용시작일'},
		    				{value:'2',text:'이용종료일'},
		    				{value:'3',text:'접수기간'},
		    				{value:'4',text:'강좌기간'},
		    			],
		    			valueExpr: 'value', 
		    			displayExpr: 'text',
		    			onValueChanged: function(e) {
		    				/*var formInstance = $("#regCapacityCondition").dxForm("instance");
		    				if(e.value == '0'){
		    					formInstance.option('colCount',7);
		    					formInstance.itemOption("SEARCH_DATE_EDU", "visible", true);
		    					formInstance.itemOption("SEARCH_DATE_START", "visible", false);
		    					formInstance.itemOption("SEARCH_DATE_END", "visible", false);
		    				}else{
		    					formInstance.option('colCount',8);
		    					formInstance.itemOption("SEARCH_DATE_EDU", "visible", false);
		    					formInstance.itemOption("SEARCH_DATE_START", "visible", true);
		    					formInstance.itemOption("SEARCH_DATE_END", "visible", true);
		    				}*/
		    			}
		    		},
		    	},
		    	{dataField:'SEARCH_DATE_START', label:{visible:false},
					 editorType: 'dxDateBox',
		    		 editorOptions: {
		    			 value: now, 
		    			 displayFormat: 'yyyy-MM-dd',
		    			 /*calendarOptions:{
		    	            maxZoomLevel: 'year', 
		    	            minZoomLevel: 'century', 
		    			 }	*/
		    		}
		    		/* editorOptions: {value: now, width: "100%", displayFormat: 'yyyy-MM-dd'}*/
				},
				{dataField:'SEARCH_DATE_END', label:{text:'~'},
					editorType: 'dxDateBox', 
					editorOptions: {
						value: now, 
						displayFormat: 'yyyy-MM-dd',
		    	        /*calendarOptions:{
		    	            maxZoomLevel: 'year', 
		    	            minZoomLevel: 'century', 
		    	        }*/	
		    		}
				},
		    	{dataField: 'SEARCH_TYPE1',label:{visible:false},editorType: 'dxSelectBox',
		    		editorOptions: {  
		    			dataSource:category_gbn,
		    			valueExpr: 'value', 
		    			displayExpr: 'text',
		    			value: '0',
		    			onValueChanged: function(e) {
		    				
		    				
		    				//e.selectedItem.value == "0"

		    				//$('#treeCtgCdS').dxDropDownBox('option', 'dataSource');
		    				//$('#categoryTree').dxTreeView('option', 'dataSource');  
		    				  
		    			}
		    		},
		       },
		       {colSpan:3,dataField: 'CATEGORY_DROPDOWN',label:{visible:false},
		       		template: function (data, itemElement) {
					var ctgType='0';
					var initValue = data.component.option('formData')[data.dataField];
					itemElement.append( 
						createCategoryDorpdownTreeTemplateCreate('treeCtgCdS','multiple',ctgType,initValue)
					);
				},
		       },
		      
		       {dataField: 'SEARCH_TYPE',
					label:{visible:false},
					editorType: 'dxSelectBox',
					editorOptions:
					{
						dataSource:week_gubn,
						 valueExpr: 'value', displayExpr: 'text',value: '0',
						 onValueChanged(data) {
							 WeekSelectBoxValueChange($('#userStateCondition').dxForm('instance'),data.value);
						 },
					}, 
				},
				{itemType:'group',colSpan:2,colCount:7,cssClass:'grp_low_height',
				items:[
					{dataField:'SRCH_MON',editorType: 'dxCheckBox',label:{visible:false},editorOptions: {value: true,text: '월',}},
					{dataField:'SRCH_TUE',editorType: 'dxCheckBox',label:{visible:false},editorOptions: {value: true,text: '화',}},
					{dataField:'SRCH_WED',editorType: 'dxCheckBox',label:{visible:false},editorOptions: {value: true,text: '수',}},
					{dataField:'SRCH_THU',editorType: 'dxCheckBox',label:{visible:false},editorOptions: {value: true,text: '목',}},
					{dataField:'SRCH_FRI',editorType: 'dxCheckBox',label:{visible:false},editorOptions: {value: true,text: '금',}},
					{dataField:'SRCH_SAT',editorType: 'dxCheckBox',label:{visible:false},editorOptions: {value: true,text: '토',}},
					{dataField:'SRCH_SUN',editorType: 'dxCheckBox',label:{visible:false},editorOptions: {value: true,text: '일',}},]
				}, 
				
				{colSpan:3,dataField: 'SEARCH_KEYWORD',label:{visible:false},
					editorOptions:{
						inputAttr: {class: "srchkeyword"},
						width: '100%',
						placeholder:'강좌명',
					}
				},	
				{dataField: 'SEARCH_KEYWORD6',label:{visible:false}	,editorType: 'dxTextBox',
			    	   editorOptions:{
			    		   placeholder:'모집차수'
			    	   }
			       },
		       {dataField: 'SEARCH_TYPE4',label:{visible:false},editorType: 'dxSelectBox',
		    		editorOptions: {  
		    			dataSource:train_status_gbn,
		    			valueExpr: 'value', 
		    			displayExpr: 'text',
		    		},
		       },
		       {colSpan:2,dataField: 'SEARCH_TYPE5',label:{visible:false},editorType: 'dxSelectBox',
		    		editorOptions: {  
		    			dataSource:srchDISCOUNT_ITEMS,
		    			valueExpr: 'DC_CD', 
		    			displayExpr: 'DC_NAME',
		    		},
		       },
		       {dataField: 'SEARCH_KEYWORD2',label:{visible:false},
					editorOptions:{
						inputAttr: {class: "srchkeyword"},
						width: '100%',
						placeholder:'회원번호',
					}
				},
				{dataField: 'SEARCH_KEYWORD3',label:{visible:false},
					editorOptions:{
						inputAttr: {class: "srchkeyword"},
						width: '100%',
						placeholder:'회원성명',
					}
				},
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
const regCapacitys=[
	{COMCD: 2,
	CTGCD: '0005',
	EDC_PRGMID:'001',
	USER_NO:'00001101',
	USER_NAME:'회원명',
	USER_TEL:'010-1234-5678',
	INSTRCTR_NAME:'강사명2',	
	EDC_STATUS:'접수준비',
	EDC_PRGMNM:'16시 아동1반 초급[월화수목]',
	USE_YN:'1',
	EDC_DAYS:'월,화,수,목',
	SORT_ORDER:1,
	EDC_STIME:'16:00',
	EDC_ETIME:'17:00',
	EDC_PNCPA_YN:'0',
	EDC_PNCPA:20,
	EDC_VPNCPA:5,
	EDC_OPNCPA:15,
	TOT_VREG_CNT:5,
	TOT_OREG_CNT:12,
	TOT_REG_CNT:17,
	TOT_STOP_CNT:2,
	TOT_CUR_CNT:15,
	TOT_WAIT_CNT:2,
	RE_REG_VCNT:4,
	RE_REG_OCNT:9,
	RE_REG_CNT:13,
	NEW_REG_VCNT:1,
	NEW_REG_OCNT:3,
	NEW_REG_CNT:4,
	NOKORI_CNT:3,
	VNOKORI_CNT:0,
	ONOKORI_CNT:3,
	},
	{
		USER_NO:'00001102',
		USER_NAME:'회원명2',
		USER_TEL:'010-1234-7890',
		COMCD: 2,
		CTGCD: '0005',
		EDC_PRGMID:'002',
		INSTRCTR_NAME:'강사명2',	
		EDC_STATUS:'접수준비',
		EDC_PRGMNM:'16시 아동1반 초급[월화수목]',
		EDC_PRGMNM_CHASU:'1분기',
		USE_YN:'1',
		EDC_DAYS:'월,화,수,목',
		SORT_ORDER:1,
		EDC_STIME:'16:00',
		EDC_ETIME:'17:00',
		EDC_PNCPA_YN:'0',
		EDC_PNCPA:20,
		EDC_VPNCPA:5,
		EDC_OPNCPA:15,
		TOT_VREG_CNT:5,
		TOT_OREG_CNT:12,
		TOT_REG_CNT:17,
		TOT_STOP_CNT:2,
		TOT_CUR_CNT:15,
		TOT_WAIT_CNT:2,
		RE_REG_VCNT:4,
		RE_REG_OCNT:9,
		RE_REG_CNT:13,
		NEW_REG_VCNT:1,
		NEW_REG_OCNT:3,
		NEW_REG_CNT:4,
		NOKORI_CNT:3,
		VNOKORI_CNT:0,
		ONOKORI_CNT:3,
		},
];
function createUserState(){
	storeRegCapacity = new DevExpress.data.ArrayStore({
		key: 'EDC_PRGMID',
	    data: regCapacitys,
	});
	//repaintChangesOnly:true,
	$('#gridEduUser').dxDataGrid({
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
	    selection: {mode: 'multiple',showCheckBoxesMode:'always',},
	    dataSource: storeRegCapacity,
	    searchPanel: {
	    	visible: true,	
		    placeholder: 'Search...',
		    inputAttr: { 'autocomplete': 'off' }  
	    },
	    columns: createColumnsList(),
	    showBorders: true,
	    onToolbarPreparing(e) {
              const dataGrid = e.component;
          
              /*e.toolbarOptions.items.push(
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
              e.toolbarOptions.items.push({
 				 location: 'after',
 				 widget: 'dxButton',
 				 options: {
 					 	icon: 'fa fa-commenting-o',
 					 	onClick() {
 					 		gridEduPrg.refresh();
 					 	},
 				 },
 			});
              e.toolbarOptions.items.push(
            		  {
            			  location: 'after',
            			  widget: 'dxButton',
            			  cssClass:'functionbtn',
            			  options: {
            				  text:'강좌변경',
            				  onClick() {
            					  createLectureChangePopup('#userPopup', '#userPopup2');
            					  /*var grid = $('#gridEduUser').dxDataGrid("instance");
        			    		  var data = grid.getSelectedRowsData();
        			    		  if (data && data.length>0) {
        			    			  var cloneData = JSON.parse(JSON.stringify(data[0]));
        			    		  }*/
            					  
            				  },
            			  },
            		  }
	          );
              e.toolbarOptions.items.push(
            		  {
            			  location: 'after',
            			  widget: 'dxButton',
            			  cssClass:'functionbtn',
            			  options: {
            				  text:'강좌기간연장',
            				  onClick() {
            					  createLectureDelayPopup($('#eduDelay_popup'),null);
            					  
            					  /*
            					  var grid = $('#gridEduUser').dxDataGrid("instance");
        			    		  var data = grid.getSelectedRowsData();
        			    		  if (data && data.length>0) {
        			    			  var cloneData = JSON.parse(JSON.stringify(data[0]));
        			    		  }
*/            					  
            				  },
            			  },
            		  }
	          );
              e.toolbarOptions.items.push(
            		  {
            			  location: 'after',
            			  widget: 'dxButton',
            			  cssClass:'functionbtn',
            			  options: {
            				  text:'강좌일괄변경',
            				  onClick() {
            					  createEduChangePopup('#eduChange_popup', null);
            					  /*
            					  var grid = $('#gridEduUser').dxDataGrid("instance");
        			    		  var data = grid.getSelectedRowsData();
        			    		  if (data && data.length>0) {
        			    			  var cloneData = JSON.parse(JSON.stringify(data[0]));
        			    			 // CreateChangePopup(cloneData);
        			    			 
        			    		  }*/
            					  
            				  },
            			  },
            		  }
	          );
	    },//ontoolbar     
	});
}
//fmcs/user/mainform
//---------------------------------
//강좌 요금 목록-datagrid columns 생성 
//---------------------------------
function createColumnsList() 
{
	var resultColumns = {};
	var url='/fmcs/member/mainForm';
	resultColumns = [
		{dataField: 'USER_NO',caption: '회원번호',cssClass:'cell-highlight',
			width:73, fixed: true,
            cellTemplate: function (container, options) {
                $('<a >' + options.value + '</a>')
                    .attr('href','#')
                    .attr('onClick',`parent.fnMovePage('${url}', 'USER_NO=${options.value}')`)
                    .appendTo(container);
            }
		},
		{dataField: 'USER_NAME',caption: '회원성명',width:73, fixed: true},
		{dataField: 'USER_TEL',caption: '휴대전화',width:100, fixed: true},
		{dataField: 'USER_GENDER',caption: '성별',width:73},
		{dataField: 'USER_BIRTH',caption: '생년월일',width:73},
		{dataField: 'USER_AGE',caption: '연령',width:73, dataType: "number", format: def_numberFormat},
		{dataField: 'CTGNM',caption: '분류명',width:100},
		{dataField: 'EDC_PRGMNM',caption: '강좌명',width:200},
		{dataField: 'EDC_PRGMNM_CHASU',caption: '모집차수',width:100},
		{dataField: 'INSTRCTR_NAME',caption: '강사명',width:80,alignment: 'center'},
		{dataField: 'EDC_DAYS',caption: '강좌요일',width:100,alignment: 'center'},
		{dataField: 'EDC_STIME',caption: '시작시간',width:80,alignment: 'center'},
		{dataField: 'EDC_ETIME',caption: '종료시간',width:80,alignment: 'center'},
		{dataField: 'TRAIN_STATUS',caption: '이용상태',width:80},
		{dataField: 'TRAIN_REG_DT',caption: '접수일',width:80},
		{dataField: 'TRAIN_SDATE',caption: '이용시작일',width:80,},
		{dataField: 'TRAIN_EDATE',caption: '이용종료일',width:80,},
		{dataField: 'TRAIN_IN_TYPE',caption: '거주지구분',width:80,},
		{dataField: 'USER_ADDRESS',caption: '주소',width:80,},
		{dataField: 'DISCOUNT_TYPE',caption: '할인사유',width:80,},
		{dataField: 'SALE_AMOUNT',caption: '판매금액',width:80, dataType: "number", format: def_numberFormat},
		
	];
	
	return resultColumns;
}

  