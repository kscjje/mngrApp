let gridComplete=null;
let gridYet=null;

function CreateTab1Init()
{

	createRightGrid1('#gridTrainclass1', trainclass1);	//오른쪽 땜(강좌분류검색설정) 상단 강좌 리스트
	
	createRightGrid2('#gridTrainclass2', trainclass2);//오른쪽 탭(강좌분류검색설정) 하단 강좌리스트
	
	//createRightSelect();	//오른쪽 탭(강좌분류검색설정) 하단 운영상품분류 멀티 트리
}
function createRightGrid1(selector, trainclass){
	gridComplete =  $(selector).dxDataGrid({
		export: {enabled: true},
		allowColumnReordering: true,
		allowColumnResizing: true,
	    columnAutoWidth: true,
	    columnChooser: {
	    	enabled: true,
	    	allowSearch: true,
	    },
		focusedRowEnabled: true,
		focusedRowIndex: 0,
	    dataSource: trainclass,
	    keyExpr: 'EDC_PRGMID',
	    searchPanel: {
	    	visible: true,
	    	width: 240,
	    	placeholder: 'Search...',
	    },
	    columns: createColumnsList(true),
	    showBorders: true,
	    selection: {
	    	mode: 'multiple',
	    	showCheckBoxesMode:'always',
	    },
	    toolbar:{
	    	items:[
                {
                    location: 'after',
                    name: 'columnChooserButton',
                },
                {
                    location:'after',
                    name :'searchPanel',
                },
          	]
	    },
  }).dxDataGrid('instance');
}

function createRightGrid2(selector, trainclass){
	gridYet= $(selector).dxDataGrid({
		export: {enabled: true},
		allowColumnReordering: true,
	    allowColumnResizing: true,
	    columnAutoWidth: true,
	    showBorders: true,
	    columnChooser: {
	    	enabled: true,
	    	allowSearch: true,
	    },
		focusedRowEnabled: true,
		focusedRowIndex: 0,
	    dataSource: trainclass,
	    keyExpr: 'EDC_PRGMID',
	    searchPanel: {
	    	visible: true,
	        width: 10,
	        placeholder: 'Search...',
	    },
	    columns: createColumnsList(false),
	    showBorders: true,
	    selection: {
	    	mode: 'multiple',
	    	showCheckBoxesMode:'always',
	    },
	    onToolbarPreparing(e) {
	    	const dataGrid = e.component;
	    	e.toolbarOptions.items.unshift( {
	             location: 'after',
	             template() {
	               return createRightSelect();
	             }
	    		}
	    	);
	    	
	    	e.toolbarOptions.items.push(
        	{
        		location: 'after',
           		widget: 'dxButton',
           		options: {
           			icon: 'refresh',
           			onClick() {
           				gridYet.refresh();
           			},
           		},
           	},
          	{
           		location: 'after',
        		widget: 'dxButton',
        		cssClass:'functionbtn',
        		options: {
        			text: '선택 강좌 검색 분류에 설정',
        			onClick() {
        					  //gridYet.refresh();
        			},
        		},
          	},
          );
	    },//ontoolbar
	}).dxDataGrid('instance');
}
function createRightSelect(){
	//$('<div id="treeBox"').dxDropDownBox({
	return $("<div id='treeBox'>").dxDropDownBox({
	    value: ['0001'],
	    width:400,
	    valueExpr: 'CTGCD',
	    displayExpr: 'CTGNM_DISP',
	    placeholder: '운영상품분류 선택',
	    showClearButton: true,
	    dataSource: makeAsyncDataSource(),
	    contentTemplate(e) {
	    	const v = e.component.option('value');
	    	const $treeView = $('<div>').dxTreeView({
	    		dataSource: e.component.getDataSource(),
	    		dataStructure: 'plain',
	    		keyExpr: 'CTGCD',
	    		parentIdExpr: 'PRNCTGCD',
	    		selectionMode: 'multiple',
	    		displayExpr: 'CTGNM_DISP',
	    		selectByClick: true,
	    		onContentReady(args) {
	    			syncTreeViewSelection(args.component, v);
	    		},
	    		selectNodesRecursive: true,
	    		showCheckBoxesMode: 'normal',
	    		onItemSelectionChanged(args) {
	    			const selectedKeys = args.component.getSelectedNodeKeys();
	    			e.component.option('value', selectedKeys);
	    		},
	    	});
	    	treeView = $treeView.dxTreeView('instance');
	    	e.component.on('valueChanged', (args) => {
	    		const { value } = args;
	    		syncTreeViewSelection(treeView, value);
	    	});
	    	return $treeView;
	    },
	});
}
//---------------------------------
//강좌목록-datagrid columns 생성 
//---------------------------------
function createColumnsList(bcategory) 
{
	var resultColumns = {};
	
	resultColumns = [
		{dataField: 'EDC_PRGMNM',	caption: '강좌명'},
		{dataField: 'INSTRCTR_NAME',caption: '강사명',alignment: 'center',},
		{dataField: 'EDC_DAYS', 	caption: '강좌요일',alignment: 'center',},
		{dataField: 'EDC_STIME',	caption: '강좌시작시간',alignment: 'center',},
		{dataField: 'EDC_ETIME',	caption: '강좌종료시간',alignment: 'center',},
		{dataField: 'EDC_PNCPA',	caption: '정원', dataType: "number", format: def_numberFormat,}
	];
	//운영상품 분류 추가
	if(bcategory==false){
		resultColumns.unshift({dataField: 'CTGNM_PATH', caption: '운영상품분류'});
	}
	
	return resultColumns;
}

let treeView;
//let dataGrid;

const syncTreeViewSelection = function (treeViewInstance, value) {
	if (!value) {
		treeViewInstance.unselectAll();
		return;
	}

	value.forEach((key) => {treeViewInstance.selectItem(key);});
};

const makeAsyncDataSource = function () {
	return new DevExpress.data.CustomStore({
		loadMode: 'raw',
		key: 'COMCD',
		load() {
			return classCategories;
		},
	});
};