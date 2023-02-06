//대기자 승인
var facilityWaitPopup=null;
function createFacilityWaitPopup(selector, subPopupSelector, callback){
	if(facilityWaitPopup){
		facilityWaitPopup=null;
		$(selector).dxPopup("dispose");
	}
	facilityWaitPopup=$(selector).dxPopup({
		 contentTemplate: waitContentTemplate,
		 visible: true,
		 title: '대기자 승인',
		 width:1500,
         height:700,
		 position: {
		    my: 'center',
		    at: 'center',
		    of: window
		 },
		 dragEnabled: true,
		 onShown(){
			  
		 },
		 toolbarItems: [{
			  widget: 'dxButton',
		      toolbar: 'bottom',
		      location: 'after',
		      options: {
		    	  text: '승인완료',
		    	  onClick() {
		    		  var grid = $('#facilityWaitGrid').dxDataGrid('instance');
		    		  
		    		  grid.getSelectedRowKeys().forEach((key) => {
		                  console.log(key);
     	              }); 
		    		  /*const message = '대기자 승인 완료';
		    		  DevExpress.ui.notify({
		    			  message,
		    			  position: {
		    				  my: 'center top',
		    				  at: 'center top',
		    			  },
		    		  }, 'success', 3000);*/
		    	  },
		      },
		  }, {
			  widget: 'dxButton',
		      toolbar: 'bottom',
		      location: 'after',
		      options: {
		    	  text: '취소',
		    	  onClick() {
		    		  facilityWaitPopup=null;
		    		  $(selector).dxPopup("dispose");
		    	  },
		      },
		  }],
	}).dxPopup('instance');
}
//타시설 강사 등록 테플릿
const waitContentTemplate = function () {
	var frmData = {FACICLITY_TYPE_NM:'축구장',RSV_PLACE:'축구장A',USE_DATE:'2023-01-20'};
	const content = $("<div />");
	content.append(
			 $("<div id='waitForm'>").dxForm({
				 	formData:frmData,
				 	labelLocation:'top',
				    showColonAfterLabel: false,
				    items:[
				    	{itemType:'group',colCount:3,cssClass:'selected-form-group bold',
				    		items:[
						    	{dataField: 'FACICLITY_TYPE_NM', label: {text: '대관시설분류',},
						    		template:`<span class='info-text'>${frmData.FACICLITY_TYPE_NM}</span>`
						    	},
						    	{dataField: 'RSV_PLACE', label: {text: '대관장소',},
						    		template:`<span class='info-text'>${frmData.RSV_PLACE}</span>`
						    	},
						    	{dataField: 'USE_DATE', label: {text: '이용일자',}, 
						    		template:`<span class='info-text'>${frmData.USE_DATE}</span>`},
						    	{colSpan:3,itemType:'empty'},
						    	{colSpan:3,template: facilityWaitGrid}
						    ]
				    	}
				    ],
				}),
				
	  );
     return content;
};
  
//---------------------------------
//조회조건-form items 생성
//---------------------------------
var reserveWaitList = [ 
	{LEC_SEQ: 1,RSV_TEAM_NAME:'리베로',RSV_USER_NAME:'홍길동', RSV_REG_DT:'2022-10-10 10:40',RSV_NO:'R2022101000001',RSV_USER_HP:'010-000-1234',
		RSV_USE_TIME:'1회차(07:00)',FAC_NAME:'축구경기',RSV_PURPOSE:'이용 목적 가나다 라 마바사아 자차카타 파하 에이 비 씨 디 이 에프 지 에이치 아이 제이 케이 이용 목적 가나다 라 마바사아 자차카타 파하 에이 비 씨 디 이 에프 지 에이치 아이 제이 케이',
		RSV_USE_MEM_CNT:50,RSV_FACIL_PRICE:2000,RSV_ETC_PRICE:1000,RSV_SUM_PRICE:3000,
		RSV_RESULT:'당첨',RSV_STATUS:'승인완료',},
	{LEC_SEQ: 2,RSV_TEAM_NAME:'축구A팀',RSV_USER_NAME:'가나다',RSV_REG_DT:'2022-10-10 10:40',RSV_NO:'R2022101000002',RSV_USER_HP:'010-000-1235',
		RSV_USE_TIME:'2회차(08:00)',FAC_NAME:'축구경기',RSV_PURPOSE:'체력 증진 및 친목 도모',
		RSV_USE_MEM_CNT:20,RSV_FACIL_PRICE:3000,RSV_ETC_PRICE:2000,RSV_SUM_PRICE:5000,
		RSV_RESULT:'미당첨',RSV_STATUS:'승인대기',},
	];
function facilityWaitGrid(){
	var store = new DevExpress.data.ArrayStore({
		key: 'LEC_SEQ',
	    data: reserveWaitList,
	});
	var doDeselection;
	return $("<div id='facilityWaitGrid'>").dxDataGrid({
		dataSource: store,
		showBorders: true,
		allowColumnReordering: true,
	    allowColumnResizing: true,
	    columnChooser: {enabled: true,allowSearch: true,},
	    focusedRowEnabled: true,
		focusedRowIndex: 0,
		searchPanel: {
			visible: true,
	        placeholder: 'Search...',
	    },
	    paging: {
	    	enabled: false,
		},
		selection: {mode: 'multiple',showCheckBoxesMode:'always',},
		columns:[
			{dataField: 'RSV_REG_DT',caption: '접수일시'},
			{dataField: 'RSV_NO',caption: '예약번호',},
			{dataField: "LEC_SEQ",caption: '팀명(예약회원명)',alignment:'center',
	            calculateDisplayValue: function (rowData) { // combines display values
	                return rowData.RSV_TEAM_NAME + " (" + rowData.RSV_USER_NAME + ")";
	            }
			},
			{dataField: 'RSV_USER_HP',width:100,caption: '연락처',},
			{dataField: 'RSV_USE_TIME',width:100,caption: '이용시간',},
			{dataField: 'FAC_NAME',width:100,caption: '행사명',},
			{dataField: 'RSV_PURPOSE',width:100,caption: '이용목적',},
			{dataField: 'RSV_USE_MEM_CNT',width:100,caption: '이용인원',dataType: "number", format: def_numberFormat,},
			{dataField: 'RSV_FACIL_PRICE',width:100,caption: '전용사용료',dataType: "number", format: def_numberFormat,},
			{dataField: 'RSV_ETC_PRICE',width:100,caption: '부속사용료',dataType: "number", format: def_numberFormat,},
			{dataField: 'RSV_SUM_PRICE',width:100,caption: '대관료합계',dataType: "number", format: def_numberFormat,},
			{dataField: 'RSV_RESULT',width:100,caption: '당첨상태',},
			{dataField: 'RSV_STATUS',width:100,caption: '예약상태',}
		],
		onCellPrepared: function(e) {
			//https://supportcenter.devexpress.com/ticket/details/t519771/dxdatagrid-how-to-prevent-disabled-rows-from-selection-when-the-select-all-check-box-is
            if (e.rowType === "data" & e.column.command === 'select' && e.data.RSV_STATUS === '승인완료') {
                e.cellElement.find('.dx-select-checkbox').dxCheckBox("instance").option("disabled", true);
                e.cellElement.off();
            }
		},
		onContentReady: function(e){
		       var selectAll = e.element.find(".dx-header-row").find(".dx-select-checkbox");
		       selectAll.dxCheckBox("instance").option("onValueChanged", null);
		       selectAll.click(function(x) {     
		    	   x.preventDefault();
		    	   x.stopPropagation();
		  
		    	   if (doDeselection)    {
		    		   e.component.deselectAll();
		    		   doDeselection = false;
		    	   }else {
		    		   var filtered = sales.filter(function(s) {
		    			   return s.country != 'United States of America';
		    		   }
		    	   );
		    		   e.component.selectRows(filtered);
		    		   doDeselection = true;
		    	   }
		       });
		       
		},
		onToolbarPreparing(e) {
	         const dataGrid = e.component;
	         e.toolbarOptions.items.push(
	         		 {
	         			 location: 'after',
	         			 widget: 'dxButton',
	         			 options: {
	         				 	icon: 'refresh',
	         				 	onClick() {
	         				 		treeCategory.refresh();
	         				 	},
	         			 },
	         		 },
	         		
	         );
		},
	});
}

   

