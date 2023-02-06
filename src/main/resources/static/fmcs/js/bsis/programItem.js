//이용상품요금관리
DevExpress.config({defaultCurrency: "KRW"});
var frmContent = {NOTI_CONTEXT: '',CTGCD: '',};
let treeCategory =null;
let selectedTabIndex=0;
let frmPrgItemCondition=null;
var conditionData = null;
const tabs = [
	{
		id: 0,
	    text: '강좌',
	},
	{
		id: 1,
		text: '일일입장권',
	},
	{
		id: 2,
		text: '사물함',
	},
	{
		id: 3,
		text: '대관료',
	},
	{
		id: 4,
		text: '기타',
	},
	
];

function formInit()
{
	createCondition();
	createTree('#treeCategory', classCategories);//왼쪽 강좌검색 트리
	createTab($('#scrolledtabs > .tabs-container'), tabs); 	//오른쪽 탭(강좌분류검색 설정/예약안내 컨텐츠 간리)
	$('#tab1').show();
	CreateTab1Init();	
	conditionOptionChange(0);
	
}
function createCondition(){
		
	$('#prgItemCondition').dxForm({
		width:1200,
	    showColonAfterLabel: false,
	   // labelMode:'hidden',
	    colCount:5,
	    formData: conditionData,
	    //요금명/개월수/키오스크노출 여부/온라인공개 여부/할인적용여부/과세구분/패키지할인대상 구분/사용여부
	    items: [
			{
				dataField: 'ITEM_NM',
				label:{text:'요금명'},
				editorType: 'dxTextBox',
			},
			{
				dataField: 'MONTH_CNT',
				label:{text:'개월수'},
				editorType: 'dxNumberBox',
				editorOptions: {  
					value: '',
					showSpinButtons: true,
					showClearButton: true,
					min: 0, 
				},
			},
			{
				dataField: 'WEB_DISPYN',
				label:{text:'온라인공개 여부'},
				editorType: 'dxSelectBox',
				editorOptions: {  
					dataSource:conditionAddAll(online_gbn),
					valueExpr: 'value', 
					displayExpr: 'text',
					value: '',
				},
			},
			{dataField: 'TAXT_GBN',
				label:{text:'과세구분'},
				editorType: 'dxSelectBox',
				editorOptions: {  
					dataSource:conditionAddAll(tax_gbn),
					valueExpr: 'value', 
					displayExpr: 'text',
					value: '',
				},
			},
			{
				dataField: 'KIOSK_DISPYN',
				label:{text:'키오스크노출 여부'},
				editorType: 'dxSelectBox',
				editorOptions: {  
					dataSource:conditionAddAll(view_gbn),
					valueExpr: 'value', 
					displayExpr: 'text',
					value: '',
				},
			},
			{
				dataField: 'DISCOUNT_YN',
				label:{text:'할인적용여부'},
				editorType: 'dxSelectBox',
				editorOptions: {  
					dataSource:conditionAddAll(apply_gbn),
					valueExpr: 'value', 
					displayExpr: 'text',
					value: '',
				},
			},
			{
				dataField: 'PKGDCYN',
				label:{text:'패키지할인대상구분'},
				editorType: 'dxSelectBox',
				editorOptions: {  
					dataSource:conditionAddAll(target_opt_gbn),
					valueExpr: 'value', 
					displayExpr: 'text',
					value: '',
				},
			},
			{
				dataField: 'USE_YN',
				label:{text:'사용여부'},
				editorType: 'dxSelectBox',
				editorOptions: {  
					dataSource:conditionAddAll(use_gbn),
					valueExpr: 'value', 
					displayExpr: 'text',
					value: '1',
				},
			},
			{
				dataField: 'LCKR_AMT_GBN',
				label:{text:'사물함이용료구분'},
				editorType: 'dxSelectBox',
				editorOptions: {  
					dataSource:conditionAddAll(SM_LCKR_AMOUNT_GBN),
					valueExpr: 'value', 
					displayExpr: 'text',
					value: '',
				},
			},
		],
	    onInitialized:function(e){
	    	frmPrgItemCondition = e.component;
	    },
	});
	createItemsFuctionButtons();	
	
}
function createItemsFuctionButtons() {
	$('#searchBtn').dxButton({
		stylingMode: 'contained',
		icon: 'find',
		type: 'default',
		onClick() {
			var msg='';
			
			DevExpress.ui.notify('요금조회 ' + msg);
			
		},
	});
	$('#searchInitBtn').dxButton({
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
	    	{dataField:'USE_YN',caption: '사용여부',
	    		visible:false,
	    		width:80,
	    		alignment: 'center',
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
	    
	    editing: {
	        allowUpdating: false,
	        allowDeleting: false,
	    },
	     onFocusedRowChanged(e) {
	    	// const focusedRowKey = e.component.option('focusedRowKey');
	    	// console.log(e);
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

function  createTab(selector, items) {
	$(selector).dxTabs({
		dataSource: items,
		selectedIndex: 0,
		scrollByContent: true,
		showNavButtons: true,
		onItemClick(e) {
			//console.log(e);
			var curidx =e.itemIndex;
		/*	var curr = selectedData();
	        if(!curr){
	        		DevExpress.ui.dialog.alert('분류를 선택 해주세요','분류 선택');  
	        		return;
	        }*/
			
			if(curidx != selectedTabIndex){
				var tabSelector = $('#tab'+(curidx+1));
				 if ( tabSelector.css('display') === 'none' ) {
					 	tabSelector.show();
					 	$('#tab'+(selectedTabIndex+1)).hide();
		    		 	setTimeout(function(){
		    		 		switch(curidx){
			    		 		case 0: CreateTab1Init(); break;
			    		 		case 1: CreateTab2Init(); break;
			    		 		case 2: CreateTab3Init(); break;
			    		 		case 3: CreateTab4Init(); break;
			    		 		case 4: CreateTab5Init(); break;
		    		 		}
		    		 	}, 100);

				 }
		    }
			selectedTabIndex=curidx;
			conditionOptionChange(selectedTabIndex);
		},
	});
}
function conditionOptionChange(tabIdx)
{
	//강좌 0-패키지할인대상 구분/할인적용여부
	//일일 1- 할인적용여부
	//사물함2 - 이용료구분
	//대관 3 - ??
	//기타 4 - ??
	var dcFlag= true,
		pkgFlag=true,
		lckrFlag=true,
		monthFlag=true,
		kioskFlag=true;
	
	if(tabIdx == 0 || tabIdx == 1){
		dcFlag = false;
		kioskFlag=false;
	}
	if(tabIdx == 0 ){
		pkgFlag =false;
	}
	if(tabIdx == 2 ){
		lckrFlag =false;
	}
	if(tabIdx == 0 || tabIdx == 2){
		monthFlag = false;
	}
    frmPrgItemCondition.getEditor("DISCOUNT_YN").option("disabled",dcFlag);
    frmPrgItemCondition.getEditor("PKGDCYN").option("disabled",pkgFlag);
    frmPrgItemCondition.getEditor("LCKR_AMT_GBN").option("disabled",lckrFlag);
    frmPrgItemCondition.getEditor("MONTH_CNT").option("disabled",monthFlag);
    frmPrgItemCondition.getEditor("KIOSK_DISPYN").option("disabled",kioskFlag);
    
    if(dcFlag) frmPrgItemCondition.updateData("DISCOUNT_YN",'');
    if(pkgFlag) frmPrgItemCondition.updateData("PKGDCYN",'');
    if(lckrFlag) frmPrgItemCondition.updateData("LCKR_AMT_GBN",'');
    if(monthFlag) frmPrgItemCondition.updateData("MONTH_CNT",'');
    if(kioskFlag) frmPrgItemCondition.updateData("KIOSK_DISPYN",'');
	
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