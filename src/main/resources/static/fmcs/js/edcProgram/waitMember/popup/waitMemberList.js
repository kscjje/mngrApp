//
var waitUsersPopup=null;
var storeWaitUsers=null;
var eduInfoPopup=null;
var conditionPopup=null;
var columnInfoPopup=null;
function createWaitUsersPopup()
{
	
	if(waitUsersPopup){
		waitUsersPopup=null;
		$("#waitUsers_Popup").dxPopup("dispose");
		
	}
	var titleParam = '대기자회원목록 - '+ columnInfoPopup.caption;
	
	waitUsersPopup=$("#waitUsers_Popup").dxPopup({
		contentTemplate: batchFreeTimeTemplate,
		visible: true,
		title: titleParam,
		width:1600,
        height:900,
		position: {
			my: 'center',
		    at: 'center',
		    of: window
		},
		dragEnabled: true,
		onShown(){
			/*$('.centerlist').dxList({
				dataSource: centers,
			    displayExpr: 'text',
			    valueExpr: 'value',
			    selectionMode: 'single',
			    scrollingEnabled:true,
			});*/
		},
		toolbarItems: [{
			widget: 'dxButton',
			toolbar: 'bottom',
		    location: 'after',
		    options: {
			    	text: '취소',
			        onClick() {
			    		waitUsersPopup.hide();
			    		waitUsersPopup=null;
			    		$("#waitUsers_Popup").dxPopup("dispose");
			    	},
			    },
		}],
	}).dxPopup('instance');
}
const batchFreeTimeTemplate = function () {
	
	 const content = $("<div />");
	 content.append(
			 $("<div id='waitUsersMainForm'>").dxForm({
				    showColonAfterLabel: false,
				    labelMode:'hidden',
				    items:[
				    	{
				    		template: waitUserConditionForm
				    	},
				    	{
				    		template: batchFreeTimeGrid
				    	}			    	
				    ],
				}),
				
	  );

	
     return content;
	
	
     
 };
 const waitUsers=[
		{EDC_PRGMNM:'16시 아동1반 초급[월화수목]',WAIT_NO:null,USER_NO:'00001101',USER_NAME:'홍길동',USER_GENDER:'남',USER_BIRTH:'1980-01-01',USER_BIRTH_TYPE:'양력',USER_REG_DT:'2021-01-01',USER_HP:'010-1111-2222',USER_SEND_YN:'Y',USER_ADDRESS:'서울 영등포구 4455',USER_CENTER:'기장아쿠아센터',APP_STATUS:'결제완료',APP_REG_DT:'2022-05-01  12:13:01',APP_TYPE:'선착순(정원마감대기접수)-승인없음',APP_ASS_DT:'2022-05-02  12:13:01'},
		{EDC_PRGMNM:'16시 아동1반 초급[월화수목]',WAIT_NO:null,USER_NO:'00001102',USER_NAME:'이순신',USER_GENDER:'남',USER_BIRTH:'1979-08-29',USER_BIRTH_TYPE:'음력',USER_REG_DT:'2021-01-02',USER_HP:'010-2143-3333',USER_SEND_YN:'N',USER_ADDRESS:'서울 양천구 9911',USER_CENTER:'기장아쿠아센터',APP_STATUS:'승인대기',APP_REG_DT:'2022-05-02  12:13:09',APP_TYPE:'선착순(정원마감대기접수)-관리자승인',APP_ASS_DT:'2022-05-02  12:13:02'},
		{EDC_PRGMNM:'16시 아동1반 초급[월화수목]',WAIT_NO:null,USER_NO:'00001103',USER_NAME:'고구마',USER_GENDER:'여',USER_BIRTH:'1979-08-29',USER_BIRTH_TYPE:'음력',USER_REG_DT:'2021-01-02',USER_HP:'010-2143-3333',USER_SEND_YN:'N',USER_ADDRESS:'서울 양천구 9911',USER_CENTER:'기장아쿠아센터',APP_STATUS:'승인대기',APP_REG_DT:'2022-05-02  12:13:09',APP_TYPE:'선착순(정원마감대기접수)-관리자승인',APP_ASS_DT:'2022-05-02  12:13:02'},
	];
function batchFreeTimeGrid(){
	storeWaitUsers = new DevExpress.data.ArrayStore({
		key: 'USER_NO',
	    data: waitUsers,
	});
	//repaintChangesOnly:true,
	return  $("<div id='gridWaitUsers'>").dxDataGrid({
		export: {enabled: true},
		allowColumnReordering: true,
	    allowColumnResizing: true,
	    columnAutoWidth: true,
	    showBorders: true,
	    focusedRowEnabled: true,
	    columnChooser: {
	    	enabled: true,
	    	allowSearch: true,
	    	location: 'before',
	    },
	    dataSource: storeWaitUsers,
	    searchPanel: {
	    	visible: true,	
		    placeholder: 'Search...',
		    inputAttr: { 'autocomplete': 'off' }  
	    },
	     selection: {mode: 'multiple',showCheckBoxesMode:'always',},   
	    columns: [
	    	
	    	{dataField: 'WAIT_NO',caption: '대기순번',width:100, dataType: "number", format: def_numberFormat},
	    	{dataField: 'USER_NO',caption: '회원번호',width:100, },
	    	{dataField: 'USER_GENDER',caption: '성별',width:60,alignment: 'center' },
	    	{dataField: 'USER_NAME',caption: '회원명',width:100,alignment: 'center' },
	    	{dataField: 'USER_BIRTH',caption: '생년월일',width:100,alignment: 'center' },
	    	{dataField: 'USER_HP',caption: '연락처',width:150,alignment: 'center' },
	    	{dataField: 'APP_REG_DT',caption: '접수일시',width:150,alignment: 'center' },
	    	{dataField: 'APP_STATUS',caption: '접수상태',width:100,alignment: 'center' },
	    	{dataField: 'APP_DRAW_STATUS',caption: '추첨상태',width:100,alignment: 'center' },
	    	{dataField: 'APP_ASS_DT',caption: '승인일시',width:150,alignment: 'center' },
	    	{dataField: 'APP_TYPE',caption: '접수승인방식',width:210, },
	    	{dataField: 'EDC_PRGMNM',caption: '강좌명',width:200, },
	    	{dataField: 'USER_ADDRESS',caption: '주소',width:300, },

	    ],
	    showBorders: true,
	    onToolbarPreparing(e) {
              const dataGrid = e.component;
          
              e.toolbarOptions.items.push(
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
              );
              e.toolbarOptions.items.push(
               		  {
               			  location: 'after',
               			  widget: 'dxButton',
               			  cssClass:'functionbtn',
               			  options: {
               				  visible:(columnInfoPopup.columnIdx==8? true:false),
               				  elementAttr:{id:'assConfirm'},
               				  text:'배정 처리',
               				  onClick() {
               					  
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
               				  visible:(columnInfoPopup.columnIdx==8? true:false),
               				  elementAttr:{id:'assCancel'},
               				  text:'승인대기 취소',
               				  onClick() {
               					  
               				  },
               			  },
               		  }
                 );
             
	    },//ontoolbar     
	    
	});
}
function waitUserConditionForm(){
	return $("<div id='waitEduForm'>").dxForm({
		 labelMode:'outside',
		 formData:eduInfoPopup,
		 showColonAfterLabel: false,
		 colCount:4,
		 items:[
			 {colSpan:4,dataField:'EDC_PRGMNM',label:{text:'강좌명'},editorType: 'dxTextBox',disabled:true},
			 {dataField:'EDU_CAPA',label:{text:'정원'},editorType: 'dxNumberBox',disabled:true,visible:(columnInfoPopup.type =='d' ? true:false)},
			 {dataField:'EDU_CONFIRM',label:{text:'배정'},editorType: 'dxNumberBox',disabled:true,visible:(columnInfoPopup.type =='d' ? true:false)},
			 {colSpan:(columnInfoPopup.type =='d' ? 2:4),itemType:'empty'},
			 {colSpan:4,itemType:'empty', visible:(columnInfoPopup.type =='d' ? true:false)},
			 {colSpan:4,dataField:'SEARCH_TYPE_TERM',label:{text:eduInfoPopup.SEARCH_TYPE_TERM =='0' ?'강좌년월': '접수기간'},
				 template: function (data, itemElement) {
					var initValue = data.component.option('formData')[data.dataField];
					var SEARCH_DATE_EDU = data.component.option('formData')['SEARCH_DATE_EDU'];
					var SEARCH_DATE_START = data.component.option('formData')['SEARCH_DATE_START'];
					var SEARCH_DATE_END = data.component.option('formData')['SEARCH_DATE_END'];
					
					if(initValue =='0'){ 
						itemElement.append( toDateMonthFormat(SEARCH_DATE_EDU));
					
					}else{
						itemElement.append( toDateFormat(SEARCH_DATE_START) + "~" + toDateFormat(SEARCH_DATE_END));
					
					}
			 	}
			},
		  ],
	 });
}
