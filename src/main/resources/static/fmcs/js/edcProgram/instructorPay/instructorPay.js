//강좌대기자관리
let storeWaitPrgs=null;
let treeView=null;
var frmCondition ={
		SEARCH_TYPE_TERM:'0',
		SEARCH_DATE_EDU:'',
		SEARCH_DATE_START:'',
		SEARCH_DATE_END:'',
		SEARCH_TYPE1:'0',
		SEARCH_TYPE2:'',
		SEARCH_TYPE3:0,
		CATEGORY_DROPDOWN:[],
}
function formInit()
{
	createCondition(); //조회 항목 생성
	createWaitPrgs();// 강좌 목록
}
function createCondition(){
	const now = new Date();
	frmCondition.SEARCH_DATE_EDU = now;
	frmCondition.SEARCH_DATE_START = now;
	frmCondition.SEARCH_DATE_END = now;
	
	var  instructors_gbn = [...instructors];
	instructors_gbn.unshift({  USER_SEQ: 0, KOR_NAME: '전체',});
	
	$('#waitCondition').dxForm({
			width:'90vw',
		    colCount:8,
		    showColonAfterLabel: false,
		    formData: frmCondition,
		    items: [
		    	{dataField: 'SEARCH_TYPE_TERM',label:{visible:false},editorType: 'dxSelectBox',
		    		editorOptions: {  
		    			dataSource:[{value:'0',text:'강좌일'},{value:'1',text:'접수일'}],
		    			valueExpr: 'value', 
		    			displayExpr: 'text',
		    		},
		    	},
		    	{dataField:'SEARCH_DATE_START',  label:{visible:false},editorType: 'dxDateBox'
		    		, editorOptions: {width: "100%", displayFormat: 'yyyy-MM-dd'}
				},
		    	
				 {dataField:'SEARCH_DATE_END', label:{text:'~'},editorType: 'dxDateBox'
					 , editorOptions: { width: "100%", displayFormat: 'yyyy-MM-dd'}
				 },
		    	{dataField: 'SEARCH_TYPE1',label:{visible:false},editorType: 'dxSelectBox',
		    		editorOptions: {  
		    			dataSource:category_gbn,
		    			valueExpr: 'value', 
		    			displayExpr: 'text',
		    		},
		       },
		       {colSpan:2,dataField: 'CATEGORY_DROPDOWN',label:{visible:false},
		       		template: function (data, itemElement) {
						var ctgType='0';
						var initValue = data.component.option('formData')[data.dataField];
						itemElement.append( 
							createCategoryDorpdownTreeTemplateCreate('treeCtgCdS','multiple',ctgType,initValue)
						);
		       		},
		       },
		       {dataField: 'SEARCH_TYPE2',label:{visible:false}	,editorType: 'dxTextBox',
		    	   editorOptions:{
		    		   placeholder:'모집차수 2자리 이상 입력'
		    	   }
		       },
   	    	   {dataField: 'SEARCH_TYPE3',label:{visible:false},editorType: 'dxSelectBox',
		    		editorOptions: {  
		    			dataSource:instructors_gbn,
		    			valueExpr: 'USER_SEQ', 
		    			displayExpr: 'KOR_NAME',
		    		},
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
const waitPrgs=[
	{
		COMCD: 2,
		CTGCD: '0005',
		EDC_PRGMID:'001',
		INSTRCTR_NAME:'강사명2',
		NEW_NAME:'1차',
		INSTRCTR_SEQ:2,
		USER_SEQ:'0001234',
		USER_NAME:'홍일',
		EDC_STATUS:'등록',
		EDC_PRGMNM:'16시 아동1반 초급',
		EDC_STIME:'16:00',
		EDC_ETIME:'17:00',
		EDC_SDATE:'2022-03-05',
		EDC_EDATE:'2022-10-31',
		EDC_REQ_DATE:'2022-03-01',
		EDC_PAY:150000,
		EDC_REFUND:-5000,
	},	
	{
		COMCD: 2,
		CTGCD: '0005',
		EDC_PRGMID:'001',
		NEW_NAME:'1차차',
		INSTRCTR_NAME:'강사명2',
		INSTRCTR_SEQ:2,
		USER_SEQ:'0000001',
		USER_NAME:'홍이',
		EDC_STATUS:'등록',
		EDC_PRGMNM:'16시 아동1반 초급',
		EDC_STIME:'16:00',
		EDC_ETIME:'17:00',
		EDC_SDATE:'2022-03-05',
		EDC_EDATE:'2022-10-31',
		EDC_REQ_DATE:'2022-03-01',
		EDC_PAY:150000,
		EDC_REFUND:0,
	},
	{
		COMCD: 2,
		CTGCD: '0005',
		EDC_PRGMID:'002',
		NEW_NAME:'',
		INSTRCTR_NAME:'강사명2',
		INSTRCTR_SEQ:2,
		USER_SEQ:'0000001',
		USER_NAME:'테스트',
		EDC_STATUS:'등록',
		EDC_PRGMNM:'16시 아동1반 중급',
		EDC_STIME:'16:00',
		EDC_ETIME:'17:00',
		EDC_SDATE:'2022-03-05',
		EDC_EDATE:'2022-10-31',
		EDC_REQ_DATE:'2022-03-01',
		EDC_PAY:50000,
		EDC_REFUND:0,
	},
];
function createWaitPrgs(){
	storeWaitPrgs = new DevExpress.data.ArrayStore({
		key: 'EDC_PRGMID',
	    data: waitPrgs,
	});
	//repaintChangesOnly:true,
	$('#gridPay').dxDataGrid({
		export: {enabled: true},
		allowColumnReordering: true,
	    allowColumnResizing: true,
	    columnAutoWidth: true,
	    showBorders: true,
	    columnChooser: {
	    	enabled: false,
	    	allowSearch: true,
	    	location: 'before',
	    },
	    dataSource: storeWaitPrgs,
	    columns: createColumnsList(),
	    summary: {  
	    	texts:{sum:"{0}"},
	        totalItems: [
	        	{column: 'USER_SEQ',summaryType: 'count', valueFormat:def_numberFormat,displayFormat: '{0} 명',},
	        	{column: 'EDC_PAY',summaryType: 'sum' , valueFormat:def_numberFormat}, 
	        	{column: 'EDC_REFUND',summaryType: 'sum', valueFormat:def_numberFormat}, 
			],
			groupItems: [
	    	  	{column: 'USER_SEQ',summaryType: 'count',showInGroupFooter: true, alignByColumn: true, valueFormat:def_numberFormat,displayFormat: '{0} 명',},
	    	  	{column: 'EDC_PAY',summaryType: 'sum' ,showInGroupFooter: true, alignByColumn: true, valueFormat:def_numberFormat}, 
	    	  	{column: 'EDC_REFUND',summaryType: 'sum',showInGroupFooter: true, alignByColumn: true, valueFormat:def_numberFormat},
	    	]
	    	
	    },  
	    showBorders: true,
	    onExporting(e) {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('강사료집계현황');
            DevExpress.excelExporter.exportDataGrid({
                worksheet: worksheet,
                component: e.component,
                customizeCell: function (options) {
                    const { excelCell } = options;
                    excelCell.font = {name: 'Arial', size: 12};
                    excelCell.alignment = {horizontal: 'left'};
                }
            }).then(function () {
                workbook.xlsx.writeBuffer().then(function (buffer) {
                    saveAs(new Blob([buffer], {type: 'application/octet-stream'}), `강사료집계현황-${moment(new Date()).format('YYYYMMDDHHmmss')}.xlsx`);
                });
            });
            e.cancel = true;
        },
	    /*onContentReady(e) {
	        if (!e.component.getSelectedRowKeys().length) {
	        	e.component.selectRowsByIndexes(0); 
	        }
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
              				 		//gridInstructor.refresh();
              				 	},
              			 },
              		 }
              );
             
	    },
	    onCellClick: function (e) {
	    }*/
	});
}

//---------------------------------
//강좌 요금 목록-datagrid columns 생성 
//---------------------------------
function createColumnsList() 
{
	var resultColumns = {};
	
	resultColumns = [
		{dataField: 'EDC_STATUS',caption: '상태', alignment: 'center'},
		{dataField: 'USER_SEQ',caption: '회원번호',alignment: 'center' },
		{dataField: 'USER_NAME',caption: '회원명',alignment: 'center'},
		{dataField: 'EDC_REQ_DATE',caption: '접수일',alignment: 'center'},
		{dataField: 'EDC_PRGMID',caption: '강좌명',
			groupIndex: 0,
			groupCellTemplate:function (cellElement, cellInfo) {
				var groupText='';
				if(cellInfo.data.items &&  cellInfo.data.items.length>0){
					groupText = cellInfo.data.items[0].EDC_PRGMNM;
					if(cellInfo.data.items[0].NEW_NAME){
						groupText += " [" + cellInfo.data.items[0].NEW_NAME +"]";  
					}
				}
				$(cellElement).css('line-height', '3em');
				cellElement.append($("<span class='group-title'>").text(groupText));
			}
		},
		{dataField: 'INSTRCTR_NAME',caption: '강사명',alignment: 'center'},
		{caption: '강좌시간',
			columns: [
				{dataField: 'EDC_STIME',caption: '시작',alignment: 'center'},
				{dataField: 'EDC_ETIME',caption: '종료',alignment: 'center'},
			]	
		},
		{dataField: 'EDC_PAY',caption: '결제금액', dataType: "number", format: def_numberFormat},
		{dataField: 'EDC_REFUND',caption: '환불금액',dataType: "number", format: def_numberFormat},
		{caption: '강좌기간',
			columns: [
				{dataField: 'EDC_SDATE',caption: '시작',alignment: 'center'},
				{dataField: 'EDC_EDATE',caption: '종료',alignment: 'center'},
			]	
		},
	];
	return resultColumns;
}
