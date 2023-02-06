//강좌검색분류설정
//---------------------------------
var frmContent = {NOTI_CONTEXT: '',CTGCD: '',};
let treeCategory =null;
var insertMode='current';

const tabs = [
	{
		id: 0,
	    text: '강좌검색분류설정',
	    icon: 'hierarchy',
	    content: '추가해야함',
	},
	{
		id: 1,
		text: '예약안내컨텐츠관리',
	    icon: 'comment',
	    content: 'Comment tab content',
	},
];

function formInit()
{
	createTree('#treeCategory', classCategories);//왼쪽 강좌검색 트리

	createTab($('#scrolledtabs > .tabs-container'), tabs); 	//오른쪽 탭(강좌분류검색 설정/예약안내 컨텐츠 간리)
	CreateTab1Init();
	CreateTab2Init();
	
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
	    	{dataField:'CTGNM',	caption: '분류명',},
	    	{dataField:'USE_YN',caption: '사용여부',	width:80,alignment: 'center',
	    		cellTemplate(container, options) {
		    		container.addClass(options.data.USE_YN =='N' ? 'notuseflag' : 'useflag');
		    		container.append("<div>" + (options.data.USE_YN =='N' ? '사용안함' : '사용') + "</div>");
                     //.css("color", "blue");
	            },
	        },
	    	{dataField: 'CTGDESC',caption: '분류설명', visible:false},
	    	{dataField:'PRNCTGCD_NM',	visible:false},
	    ],
	    focusedRowEnabled:true,
	    searchPanel: {
	    	visible: true,
	    	placeholder: 'Search...',
        },
	    height:'90vh',
	    rowDragging: {
	    	showDragIcons:false,
	        allowDropInsideItem: true,
	        allowReordering: true,
	        onDragChange(e) {
	          const visibleRows = treeCategory.getVisibleRows();
	          const sourceNode = treeCategory.getNodeByKey(e.itemData.CTGCD);
	          let targetNode = visibleRows[e.toIndex].node;

	          while (targetNode && targetNode.data) {
	            if (targetNode.data.CTGCD === sourceNode.data.CTGCD) {
	              e.cancel = true;
	              break;
	            }
	            targetNode = targetNode.parent;
	          }
	        },
	        onReorder(e) {
	          const visibleRows = e.component.getVisibleRows();

	          if (e.dropInsideItem) {
	            e.itemData.PRNCTGCD = visibleRows[e.toIndex].key;
	          } else {
	            const sourceData = e.itemData;
	            const toIndex = e.fromIndex > e.toIndex ? e.toIndex - 1 : e.toIndex;
	            let targetData = toIndex >= 0 ? visibleRows[toIndex].node.data : null;

	            if (targetData && e.component.isRowExpanded(targetData.CTGCD)) {
	              sourceData.PRNCTGCD = targetData.CTGCD;
	              targetData = null;
	            } else {
	              sourceData.PRNCTGCD = targetData ? targetData.PRNCTGCD : e.component.option('rootValue');
	            }

	            const sourceIndex = classCategories.indexOf(sourceData);
	            classCategories.splice(sourceIndex, 1);

	            const targetIndex = classCategories.indexOf(targetData) + 1;
	            classCategories.splice(targetIndex, 0, sourceData);
	          }

	          e.component.refresh();
	        },
	      },
	    editing: {
	    	mode: 'popup',
	        allowUpdating: true,
	        allowDeleting: true,
	        useIcons: true,
	        popup: {
	        	title: '강좌 검색 분류',
	            showTitle: true,
	            width: 500,
	            height:450,
	            onShown:function(){
	            	$('#editForm').dxForm("instance").validate();
		        }
	        },
	        form: {
	        	showColonAfterLabel: false,
	        	colcount:1,
	        	elementAttr: {id: "editForm",},
	            items:  createItemsDetailForm(),
	        },
	    },
	    onRowDblClick:function(e){
	    	e.component.editRow(e.rowIndex);
	    	e.component.deselectAll();
			
	    },
	    onEditingStart: function(e){
	    	treeCategory.option("editing.popup.title", "강좌 검색 분류 수정");
	    	var curr = selectedData();
	    	if(curr && curr.parent && curr.parent.data){
	    		e.data.PRNCTGCD_NM = curr.parent.data.CTGNM;
	    		e.data.PRNCTGCD = curr.parent.data.CTGCD;
	    	}
	     },
	     onInitNewRow: function(e){
	    	 treeCategory.option("editing.popup.title", "강좌 검색 분류 신규");
	    	 var curr = selectedData();
	    	 
	    	 if(insertMode=='down'){
	    		 e.data.PRNCTGCD_NM = curr.data.CTGNM;
	    		 e.data.PRNCTGCD = curr.data.CTGCD;
	    	 }else{
	    		if(curr && curr.parent && curr.parent.data){
	    			e.data.PRNCTGCD_NM = curr.parent.data.CTGNM;
		    		e.data.PRNCTGCD = curr.parent.data.CTGCD;
	    		}else{
	    			//e.data.PRNCTGCD_NM = '';
		    		//e.data.PRNCTGCD = '';
	    		} 
	    	 }
	    	 e.data.USE_YN ='0';
	     },
	     onFocusedRowChanged(e) {
	    	// const focusedRowKey = e.component.option('focusedRowKey');
	    	// console.log(e);
	    	 e.component.option('toolbar.items[5].options.disabled',e.row.data.CTGLVL==2);
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
	          		 {
	          			 locateInMenu: 'always',
	          		     widget: 'dxButton',
	          		     options: {
	          		    	 text: '등록',
	          		    	 onClick() {
	          		        	//var parent = getParentCategory();
	          		    		 insertMode='current';
	          		    		 treeCategory.addRow();
	          		    		 treeCategory.deselectAll();
	          		    	 },
	          		     },
	          		 }, {
	          			 locateInMenu: 'always',
	          			 widget: 'dxButton',
	          		     options: {
	          		    	 disabled:true,
	          		    	 elementAttr:{id:'regChild'},
	          		    	 text: '하위분류등록',
	          		    	 onClick() {
	          		        	var curr = selectedData();
	          		        	if(!curr){
	          		        		DevExpress.ui.dialog.alert('분류를 선택 해주세요', "하위분류등록");  
	          		        		return;
	          		        	}
	          		        	insertMode='down';
	          		        	treeCategory.addRow();
	          		        	treeCategory.deselectAll();
	          		        },
	          		     },
	          		 }, /*{
	          		      locateInMenu: 'always',
	          		      widget: 'dxButton',
	          		      options: {
	          		        text: '순서저장',
	          		        onClick() {
	          		          DevExpress.ui.notify('순서저장 option has been clicked!');
	          		        },
	          		      },
	          		    },*/
	          		  /* {
		          		      locateInMenu: 'always',
		          		      widget: 'dxButton',
		          		      options: {
		          		        text: '삭제',
		          		        onClick() {
		          		          DevExpress.ui.notify('삭제 option has been clicked!');
		          		        },
		          		      },
		          	 },*/
	          		  
	         	);
	        },//ontoolbar
	        onNodesInitialized: function(e) {
	            e.component.__root = e.root;
	        }
	  }).dxTreeList('instance');
	
	/*$(selector).dxTreeView({
	    items: classCategories,
	    dataStructure: 'plain',
	    parentIdExpr: 'PRNCTGCD',
	    keyExpr: 'CTGCD',
	    displayExpr: function(item) {
	        // "item" can be null
	        return item && ' [' + item.CTGCD + '] ' + item.CTGNM;
	    },
	    searchEnabled: true,
	    height:800,
	    onItemClick(e) {
	      const item = e.itemData;
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
	          				 		gridComplete.refresh();
	          				 	},
	          			 },
	          		 },
	          );
	        },//ontoolbar
	  }).dxTreeView('instance');
	*/
}

function  createTab(selector, items) {
	$(selector).dxTabs({
		dataSource: items,
		selectedIndex: 0,
		scrollByContent: false,
		showNavButtons: true,
		onItemClick(e) {
			var curr = selectedData();
	        if(!curr){
	        		DevExpress.ui.dialog.alert('분류를 선택 해주세요','분류 선택');  
	        		return;
	        }
			if(e.itemData.id == 0){
				if ( $('#tab1').css('display') === 'none' ) {
					$('#tab1').show();
		    		$('#tab2').hide();
		    	} else {
		    		  //$('.box').hide();
		    	}
			}else{
				if ( $('#tab2').css('display') === 'none' ) {
					$('#tab2').show();
					
		    		$('#tab1').hide();
		    	} else {
		    		  //$('.box').hide();
		    	}
			}
		},
	});
}

function jsOrder(F) {
	var selectedRowKeys = treeCategory.getSelectedRowKeys();
	
	
    /*$.getJSON(
        "/backOffice/menu/order"
        , {M_UPPER_CD: $("#M_UPPER_CD").val(), M_CD: $("#M_CD").val(), M_ORD: $("#M_ORD").val(), F: F}
        , function (data) {
            if (data.result == "success") {
                location.href = document.URL;
            }
        }
    );*/
}

/*
function getParentCategory(){
	var selected = treeCategory.getSelectedRowsData();
	if(selected){
		selected.map(function (node) { 
			return node.parent; 
		});
	}
	var selectedParent = treeView.getSelectedNodes()
	.map(function (node) { return node.parent; });

	var parentValue = selectedParent[0].text;
	return null;
}*/