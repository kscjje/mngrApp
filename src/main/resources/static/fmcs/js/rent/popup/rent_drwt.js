//대관 추첨
var facilityDrawPopup=null;
function createFacilityDrawPopup(selector, subPopupSelector, callback){
	if(facilityDrawPopup){
		facilityDrawPopup=null;
		$(selector).dxPopup("dispose");
	}
	facilityDrawPopup=$(selector).dxPopup({
		 contentTemplate: drawContentTemplate,
		 visible: true,
		 title: '대관 추첨',
		 width:1500,
         height:900,
		 position: {
		    my: 'center',
		    at: 'center',
		    of: window
		 },
		 dragEnabled: true,
		 onShown(){
			  
		 },
		 toolbarItems: [ {
			  widget: 'dxButton',
		      toolbar: 'bottom',
		      location: 'after',
		      options: {
		    	  text: '취소',
		    	  onClick() {
		    		  facilityDrawPopup=null;
		    		  $(selector).dxPopup("dispose");
		    	  },
		      },
		  }],
	}).dxPopup('instance');
}
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = new Date(startDate);
    var endDate = new Date(stopDate);
    
    while (currentDate <= endDate) {
    	var date = DevExpress.localization.formatDate(currentDate,'yyyy-MM-dd')
      dateArray.push({ID:date,NAME: date});
      currentDate = currentDate.addDays(1);
    }
    return dateArray;
}
//타시설 강사 등록 테플릿
const drawContentTemplate = function () {
	const faciclityPlace = [
		{
			ID: 0,
			NAME: '대관장소전체',
	    },
		{
		  ID: 1,
		  NAME: '축구장A',
		}, {
		  ID: 2,
		  NAME: '축구장B',
		}, {
		  ID: 3,
		  NAME: '풋살장',		  
		}];		
	var frmData = {FACICLITY_TYPE_NM:'축구장',RSV_PLACE:'축구장A',USE_SDATE:'2023-01-20',USE_EDATE:'2023-01-31',
			CUCHUM_PRIORITY_YN:'0',CUCHUM_PRIORITY1:'0',CUCHUM_PRIORITY2:'0',CUCHUM_PRIORITY3:'0'};
	//이용일자전체
	const listDate=getDates(frmData.USE_SDATE, frmData.USE_EDATE);
	listDate.unshift({ID:'',NAME:'이용일자전체'});
	
	const content = $("<div />");
	content.append(
			 $("<div id='waitForm'>").dxForm({
				 	formData:frmData,
				 	//labelLocation:'top',
				    showColonAfterLabel: false,
				    onFieldDataChanged: function (e) {
						//우선순위 
				    	e.component.beginUpdate();
						if(e.dataField=='CUCHUM_PRIORITY_YN'){ 
							e.component.getEditor("CUCHUM_PRIORITY1").option('disabled',  e.value == '0' ? true:false);
							if(e.value == '0' ){
								e.component.getEditor("CUCHUM_PRIORITY2").option('disabled',  true);
								e.component.getEditor("CUCHUM_PRIORITY3").option('disabled',  true);
							}
						}
						if(e.dataField=='CUCHUM_PRIORITY1' ){ 
							e.component.getEditor("CUCHUM_PRIORITY2").option('disabled',  e.value == '0' ? true:false);
							if(e.value == '0' ){
								e.component.getEditor("CUCHUM_PRIORITY3").option('disabled', true);
							}
						}
						if(e.dataField=='CUCHUM_PRIORITY2' ){ 
							e.component.getEditor("CUCHUM_PRIORITY3").option('disabled',  e.value == '0' ? true:false);
							
						}
						if(e.value == '0' ){
							if(e.dataField=='CUCHUM_PRIORITY_YN'){
								e.component.getEditor("CUCHUM_PRIORITY1").option('value',  '0'); //사용안함
							}
							if(e.dataField=='CUCHUM_PRIORITY_YN' || e.dataField=='CUCHUM_PRIORITY1' ){
								e.component.getEditor("CUCHUM_PRIORITY2").option('value',  '0'); //사용안함
							}
							
							if(e.dataField=='CUCHUM_PRIORITY_YN' || e.dataField=='CUCHUM_PRIORITY1' || e.dataField=='CUCHUM_PRIORITY2' ){
								e.component.getEditor("CUCHUM_PRIORITY3").option('value',  '0'); //사용안함
							}
						}
						e.component.endUpdate();
					},
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
						    		template:`<span class='info-text'>${frmData.USE_SDATE} ~ ${frmData.USE_EDATE}</span>`
						    	},
						    	
						    ]
				    	},
				    	
				    	{itemType:'group',colCount:4,caption:'추첨방법',
				    		items:[
						    	{colSpan:2,dataField: 'CHUCHUM_ALG', label: {text: '추첨알고리즘',},
						    		editorType: 'dxSelectBox',
						    		editorOptions: {  
						    			dataSource:drawtype_gbn,
						    			valueExpr: 'value', 
						    			displayExpr: 'text',
						    			value:'0',
						    		},
						    	},
						    	{colSpan:2,itemType:'empty'},
						    	{dataField: 'CUCHUM_PRIORITY_YN', label: {text: '우선추첨순위',},editorType: 'dxSelectBox',
						    		editorOptions: {  
						    			dataSource:set_gbn,
						    			valueExpr: 'value', 
						    			displayExpr: 'text',
						    			value:'0',
						    		}
						    	},
						    	{dataField: 'CUCHUM_PRIORITY1', label: {text: '1순위',},editorType: 'dxSelectBox',
						    		editorOptions: {
						    			disabled:true,	
						    			dataSource:priority_gbn,
						    			valueExpr: 'value', 
						    			displayExpr: 'text',
						    			value:'0',
						    		}
						    	},
						    	{dataField: 'CUCHUM_PRIORITY2', label: {text: '2순위',},editorType: 'dxSelectBox',
						    		editorOptions: {  
							    		disabled:true,	
						    			dataSource:priority_gbn,
						    			valueExpr: 'value', 
						    			displayExpr: 'text',
						    			value:'0',
						    		}
						    	},
						    	{dataField: 'CUCHUM_PRIORITY3', label: {text: '3순위',},editorType: 'dxSelectBox',
						    		editorOptions: {  
						    			disabled:true,
						    			dataSource:priority_gbn,
						    			valueExpr: 'value', 
						    			displayExpr: 'text',
						    			value:'0',
						    		}
						    	},
						    ]
				    	},
				    	
				    	{itemType:'group',colCount:4,caption:'추첨대상 회차',
				    		items:[
				    			{dataField: 'RSV_PLACE', label: {visible:false,},
				    				editorType:"dxSelectBox", 
				    				editorOptions: {
				    					dataSource: new DevExpress.data.ArrayStore({
				    						data: faciclityPlace,
				    						key: 'ID',
				    					}),
				    					displayExpr: 'NAME',
				    					valueExpr: 'ID',
				    					value: 0,
				    					searchEnabled: true,
				    			    }
						    	},
				    			{dataField: 'RSV_USE_DATE', label: {visible:false},
				    				editorType:"dxSelectBox", 
				    				editorOptions: {
				    					dataSource: new DevExpress.data.ArrayStore({
				    						data: listDate,
				    						key: 'ID',
				    					}),
				    					displayExpr: 'NAME',
				    					valueExpr: 'ID',
				    					value: '',
				    					searchEnabled: true,
				    			    }
						    	},
					            {colSpan:2,itemType:'empty'},
				    			{colSpan:2,template: facilityWaitGrid},
				    			{colSpan:2,template: facilityReserveGrid}
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
	{LEC_SEQ: 1,RSV_TEAM_NAME:'리베로',RSV_USER_NAME:'홍길동', RSV_REG_DT:'2022-10-10',RSV_NO:'R2022101000001',RSV_USER_HP:'010-000-1234',
		RSV_USE_TIME:'1회차(07:00)',FAC_NAME:'축구경기',RSV_PURPOSE:'이용 목적 가나다 라 마바사아 자차카타 파하 에이 비 씨 디 이 에프 지 에이치 아이 제이 케이 이용 목적 가나다 라 마바사아 자차카타 파하 에이 비 씨 디 이 에프 지 에이치 아이 제이 케이',
		RSV_USE_MEM_CNT:50,RSV_FACIL_PRICE:2000,RSV_ETC_PRICE:1000,RSV_SUM_PRICE:3000,
		RSV_RESULT:'당첨',RSV_STATUS:'승인완료',},
	{LEC_SEQ: 2,RSV_TEAM_NAME:'축구A팀',RSV_USER_NAME:'가나다',RSV_REG_DT:'2022-10-10',RSV_NO:'R2022101000002',RSV_USER_HP:'010-000-1235',
		RSV_USE_TIME:'2회차(08:00)',FAC_NAME:'축구경기',RSV_PURPOSE:'체력 증진 및 친목 도모',
		RSV_USE_MEM_CNT:20,RSV_FACIL_PRICE:3000,RSV_ETC_PRICE:2000,RSV_SUM_PRICE:5000,
		RSV_RESULT:'미당첨',RSV_STATUS:'승인대기',},
	];
function facilityWaitGrid(){
	var store = new DevExpress.data.ArrayStore({
		key: 'LEC_SEQ',
	    data: reserveWaitList,
	});
	
	return $("<div id='facilityDrawGrid'>").dxDataGrid({
		height:'500px',
		dataSource: store,
		showBorders: true,
		allowColumnReordering: true,
	    allowColumnResizing: true,
	    columnChooser: {enabled: true,allowSearch: true,},
	   /* searchPanel: {
			visible: true,
	        placeholder: 'Search...',
	    },*/
	    focusedRowEnabled: true,
		focusedRowIndex: 0,
	    paging: {
	    	enabled: false,
		},
		selection: {mode: 'single',},
		//selection: {mode: 'multiple',showCheckBoxesMode:'always',},
		columns:[
			{dataField: 'FAC_NAME',width:100,caption: '대관예약장소'},
			{dataField: 'RSV_REG_DT',width:100,caption: '대관이용일자'},
			{dataField: 'RSV_USE_TIME',width:100,caption: '이용회차(시간)',},
			{dataField: 'RSV_USE_MEM_CNT',width:100,caption: '접수팀(인원)',dataType: "number", format: def_numberFormat,},
			{dataField: "LEC_SEQ",caption: '당첨자',alignment:'center',
	            calculateDisplayValue: function (rowData) { // combines display values
	                return rowData.RSV_TEAM_NAME + " (" + rowData.RSV_USER_NAME + ")";
	            }
			},
			{dataField: 'RSV_RESULT',width:100,caption: '당첨상태',},
			{dataField: 'RSV_STATUS',width:100,caption: '확정승인',}
		],
		onRowClick: function(e) {
            if(e.rowType === "data") {
            	console.log(e.data);
            	var grid = $('#facilityReserveGrid').dxDataGrid('instance');
            	grid.option('dataSource', createReserveStore(e.data.LEC_SEQ)); //key값 변경 할 것!
                //e.component.editRow(e.rowIndex);
            }
        },
		toolbar:{
	    	items:[
	    		/*{
                    location: 'after',
                    name: 'exportButton',
                },*/
                {
                    location: 'after',
                    name: 'columnChooserButton',
                },
                {
                    location:'after',
                    name :'searchPanel',
                },
	          	{
	          		location: 'after',
	          		widget: 'dxButton',
	          		options: {
	          			icon: 'refresh',
	          			onClick() {
	          				$("#facilityWaitGrid").dxDataGrid("instance").refresh();
	          			},
	          		},
	          	},
	          	{
	          		location: 'after',
	      			widget: 'dxButton',
	      			cssClass:'functionbtn',
	      			options: {
	      				text: '추첨하기',
	      				onClick() {
	      					
	      				},
	      			},
	          	},
	          	{
	          		location: 'after',
	      			widget: 'dxButton',
	      			cssClass:'functionbtn',
	      			options: {
	      				text: '추첨되돌리기',
	      				onClick() {
	      					
	      				},
	      			},
	          	},
	          	{
	          		location: 'after',
	      			widget: 'dxButton',
	      			cssClass:'functionbtn',
	      			options: {
	      				text: '당첨자확정',
	      				onClick() {
	      					
	      				},
	      			},
	          	},
	          	{
	          		location: 'after',
	      			widget: 'dxButton',
	      			cssClass:'functionbtn',
	      			options: {
	      				text: '당첨자EXCEL추출',
	      				onClick() {
	      					
	      				},
	      			},
	          	},

          	]
	    },
	});
}
function createReserveStore() {
	var url='';
	  return DevExpress.data.AspNet.createStore({
		key: 'OrderID',
		loadParams: { ProductID: productID },
		loadUrl: `${url}/GetOrdersByProduct`,
	  });
}
function facilityReserveGrid(){
/*	var store = new DevExpress.data.ArrayStore({
		key: 'LEC_SEQ',
	    data: reserveWaitList,
	});
*/	
	return $("<div id='facilityReserveGrid'>").dxDataGrid({
		height:'500px',
		showBorders: true,
		allowColumnReordering: true,
	    allowColumnResizing: true,
	    columnChooser: {enabled: true,allowSearch: true,},
	   /* searchPanel: {
			visible: true,
	        placeholder: 'Search...',
	    },*/
	    focusedRowEnabled: true,
		focusedRowIndex: 0,
	    paging: {
	    	enabled: false,
		},
		selection: {mode: 'single',},
		//selection: {mode: 'multiple',showCheckBoxesMode:'always',},
		columns:[
			{dataField: 'RSV_REG_DT',caption: '접수일시'},
			{dataField: 'RSV_NO',caption: '예약번호',},
			{dataField: "LEC_SEQ",caption: '예약팀명(예약회원명)',alignment:'center',
	            calculateDisplayValue: function (rowData) { // combines display values
	                return rowData.RSV_TEAM_NAME + " (" + rowData.RSV_USER_NAME + ")";
	            }
			},
			{dataField: 'RSV_USER_HP',width:100,caption: '휴대전화',},
			{dataField: 'RSV_USE_MEM_CNT',width:100,caption: '이용인원',dataType: "number", format: def_numberFormat,},
			{dataField: 'FAC_NAME',width:100,caption: '행사명',},
			{dataField: 'RSV_SUM_PRICE',width:100,caption: '대관료합계',dataType: "number", format: def_numberFormat,},
			{dataField: 'RSV_STATUS',width:100,caption: '예약상태',}
		],
		
		toolbar:{
	    	items:[
	    		/*{
                    location: 'after',
                    name: 'exportButton',
                },*/
	    		{
		        	location: 'before',
		        	template: $('<div style="font-weight:700;margin-left:10px;">').append("예약접수회원현황"),
		        },
                {
                    location: 'after',
                    name: 'columnChooserButton',
                },
                {
                    location:'after',
                    name :'searchPanel',
                },
	          	{
	          		location: 'after',
	          		widget: 'dxButton',
	          		options: {
	          			icon: 'refresh',
	          			onClick() {
	          				$("#facilityReserveGrid").dxDataGrid("instance").refresh();
	          			},
	          		},
	          	},
	          	{
	          		location: 'after',
	      			widget: 'dxButton',
	      			cssClass:'functionbtn',
	      			options: {
	      				text: '수동당첨처리',
	      				onClick() {
	      					
	      				},
	      			},
	          	},
	          	{
	          		location: 'after',
	      			widget: 'dxButton',
	      			cssClass:'functionbtn',
	      			options: {
	      				text: '심의승인',
	      				onClick() {
	      					
	      				},
	      			},
	          	},
          	]
	    },
	});
}
