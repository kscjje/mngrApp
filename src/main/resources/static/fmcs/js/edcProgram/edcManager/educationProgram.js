//강좌검색분류설정
//---------------------------------

let treeCategory =null;

const tabs = [
	  { id: 0, text: '모집정보', },
	  { id: 1, text: '요금정보', },
	  { id: 2, text: '할인/환불정보', },
	  { id: 3, text: '신청제한', },
	  { id: 4, text: '전자키발권', },
	  { id: 5, text: '강좌컨텐츠', },
	  { id: 6, text: '자유이용시간', },
	  { id: 7, text: '변경이력', },
	];
function getDays()
{
	var days=[];
	for(var i=1 ; i<=31; i++){
		days.push(i);
	}
	return days;
}
function getMonths()
{
	var Months=[];
	for(var i=1 ; i<=12; i++){
		Months.push({text:i+'개월',value:i});
	}
	return Months;
}

function formInit()
{
	//왼쪽 뷴류 구분 트리 조회
	createTreeCondition('#tree-condition', category_gbn);
	
	//왼쪽 뷴류 구분 트리
	createTree('#treeCategory', classCategories);

	//오른쪽 영역 강좌 리스트 외
	createEducationPrg();
	  
	var itemToSelect = treeCategory.element().find('.dx-treeview-item')[0];
	
	if(itemToSelect)
		treeCategory.selectItem(itemToSelect);  	
	
}

function createTreeCondition(selector, gubuns)
{
	 $(selector).dxSelectBox({
		 	dataSource: gubuns,
	        valueExpr: "value",
	        displayExpr: "text",
		 	value: '0',
	        onValueChanged: function(e) {
	            console.log(e.value);
	            console.log(e.text);
	        },
	    });
}

var getNodeKeys = function(node) {
    var keys = [];
    keys.push(node.key);
    node.children.forEach(function(item) {              
        keys = keys.concat(getNodeKeys(item));
    });            
    return keys;
}
function selectedData(){
	return ( treeCategory.getDataSource().items()[treeCategory.getRowIndexByKey(treeCategory.option("focusedRowKey"))]);
}
function createTree(selector, items) {
	
	//사용여부 표시 방법 및 순서 저장? 
	treeCategory=$(selector).dxTreeList({
		dataSource: classCategories,
	    dataStructure: 'plain',
	    parentIdExpr: 'PRNCTGCD',
	    keyExpr: 'CTGCD',
	    columns: [
	    	{dataField: 'CTGNM',caption: '분류명',}
	      ],
	  focusedRowEnabled:true,
      searchPanel: {
          visible: true,
          placeholder: 'Search...',
          width: 120,
        },
	    height:800,
	    onCellClick(e) {
	      const item = e.data;
	      
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
	          		 {
	          			 location: 'before',
	          			 widget: 'dxButton',
	          			 options: {
	          				 	icon: 'activefolder',
	          				 	onClick() {
	          				 	   var keys = getNodeKeys(treeCategory.__root);
	          				 	   treeCategory.beginUpdate();
	          			           keys.forEach(function(key) {  
	          			        	 treeCategory.expandRow(key);
	          			           }); 
	          			           treeCategory.endUpdate();
	          			                    
	          				 	},
	          			 },
	          		 },
	          		 {
	          			 location: 'before',
	          			 widget: 'dxButton',
	          			 options: {
	          				 	icon: 'inactivefolder',
	          				 	onClick() {
 	          				 	   var keys = getNodeKeys(treeCategory.__root);
	          				 	  treeCategory.beginUpdate();
	          			           keys.forEach(function(key) {  
	          			        	 treeCategory.collapseRow(key);

	          			           }); 
	          			           treeCategory.endUpdate();            
	          				 	},
	          			 },
	          		 },
	          );
	        },//ontoolbar
	        onNodesInitialized: function(e) {
	            e.component.__root = e.root;
	        }
	  }).dxTreeList('instance');
	
	
}



