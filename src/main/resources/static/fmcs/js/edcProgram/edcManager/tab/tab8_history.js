let subMenuList8=null;
let gridHistory=null;
//변경이력
function CreateTab8Init()
{
	if(subMenuList8!=null) return;
	var menus = tabs.slice();
	menus.pop();
	subMenuList8 = $('#tab8 .tab_list').dxList({
		 dataSource: new DevExpress.data.DataSource({
		      store: new DevExpress.data.ArrayStore({
		        key: 'id',
		        data: menus,
		      }),
		    }),
		selectionMode:'single', 
	    allowItemDeleting: false,
	    onSelectionChanged(component,element) {
	    	var cur= subMenuList8.option('selectedItemKeys');
	    	DisplayGridChange($('#gridHistory'),cur);	
	      },
	}).dxList('instance');
	
	subMenuList8.selectItem(0);
	DisplayGridChange($('#gridHistory'),'0');
	const now = new Date();
	$("#tab8-conditions").dxForm({
	    showColonAfterLabel: false,
	    width:500,
	    colCount:2,
	    items: [
	    	{label: {text:'조회 시작일'},editorType:'dxDateBox',editorOptions:{
				 displayFormat: 'yyyy-MM-dd',
				value: now,
	    	}},  
	    	{label: {text:'조회 종료일'},editorType:'dxDateBox',
	    		editorOptions:{
	    				displayFormat: 'yyyy-MM-dd',value: now,}
	    	}, 
	    ],
	});
	
	$('#tab8searchBtn').dxButton({
		stylingMode: 'contained',
		icon: 'find',
		type: 'default',
		onClick() {
			var msg='';
			if(frmDetail){
				//frmDetail.itemOption("KOR_NAME", "visible", false);//OK
				//msg = frmDetail.itemOption("KOR_NAME", "value");
				//msg = frmDetail.getEditor('KOR_NAME').option('value'); 
			}
			DevExpress.ui.notify('변경이력조회 ' + msg);
			
		},
	});
	$('#tab8searchInitBtn').dxButton({
		stylingMode: 'contained',
		icon:'clear',
		type: 'default',
		elementAttr: {
			class: "btnRefresh"
		},
		onClick() {
			DevExpress.ui.notify('초기화');
			
		},
	});
	
}
function DisplayGridChange(selector,curItem){
	const historylist=[];
	if(gridHistory !=null){
		//datasource change
		return;
	}
	gridHistory =  $(selector).dxDataGrid({
		dataSource: trainclass1,
		export: {enabled: true},
		keyExpr: 'HISTORY_CD',
		width:'100%',
		showBorders: true,
		allowColumnResizing: true,
		focusedRowEnabled: true,
		focusedRowIndex: 0,
		scrolling: {rowRenderingMode: 'virtual',},
		  paging: {pageSize: 10,},
		  pager: {
			  visible: true,
		      showInfo: true,
		      infoText: "총 {2}건   {0}/{1}",
		      showNavigationButtons: true,
		  },
		  columns: createHistoryColumns(),
	    }).dxDataGrid('instance');
	
}

function createHistoryColumns(){
	var resultColumns = {};
	
	resultColumns = [
		{dataField: 'HISTROY_ID',caption: '변경일시',visible:false},
		{dataField: 'HISTROY_DT',caption: '변경일시'},
		{dataField: 'HISTROY_GBN',caption: '변경구분' , },
		{dataField: 'HISTROY_USERNM',caption: '변경자명',},
		{dataField: 'HISTROY_IP',caption: 'IP',},
		{dataField: 'HISTROY_ITEM',caption: '변경항목',},
		{dataField: 'HISTROY_PREV',caption:'변경전'},
		{dataField: 'HISTROY_AFTER',caption:'변경후'},
		];
	return resultColumns;
}
