//강좌정보일괄설정
let gridOptDropdown=null;
let treeView=null;
let selectedTabIndex=0;
const tabs = [
	  { id: 0, text: '모집정보', },
	  { id: 2, text: '할인/환불정보', },
	  { id: 3, text: '신청제한', },
	  { id: 4, text: '전자키발권', },
	];
function formInit()
{
	createCondition(); //조회 항목 생성
	createEduTab($('#scrolledtabs > .tabs-container'), tabs);	//하단 tabs
	$('#tab1').show();
	CreateTab1Init();	
}
function createCondition(){
	$('#eduBatchCondition').dxForm({
	    colCount: 6,
	    showColonAfterLabel: false,
	    labelMode:'outside',
	    //formData: frmCondition,
	    width:'60vw',
	    items: [
	    	{colSpan:2,dataField: 'SEARCH_TYPE',label:{text:'일괄설정범위'},editorType: 'dxSelectBox',
	    		editorOptions: {  
	    			dataSource:category_gbn,
	    			valueExpr: 'value', 
	    			displayExpr: 'text',
	    			value: '0',
	    			onValueChanged: function(e) {
	    				var formInstance= $("#ageCondition").dxForm("instance");
	    				var categoryDropdown = $("#ageCondition")
	    		                .dxForm("instance")
	    		                .getEditor("CATEGORY_DROPDOWN");
	    				//e.selectedItem.value == "0"

	    				//$('#treeCtgCdS').dxDropDownBox('option', 'dataSource');
	    				//$('#categoryTree').dxTreeView('option', 'dataSource');  
	    				  
	    			}
	    		},
	       },
	       {colSpan:4,dataField: 'CATEGORY_DROPDOWN',label:{visible:false},
	       		template: function (data, itemElement) {
				var ctgType='0';
				var initValue = data.component.option('formData')[data.dataField];
				itemElement.append( 
					createCategoryDorpdownTreeTemplateCreate('treeCtgCdS','multiple',ctgType,initValue)
				);
			},
	       },

	    ]
	});
}

function  createEduTab(selector, items) {
	$(selector).dxTabs({
		dataSource: items,
		selectedIndex:0,
		scrollByContent: true,
		showNavButtons: true,
		onSelectionChanged(e){
			var curidx = e.component.option('selectedIndex');
			if(curidx != selectedTabIndex){
				var tabSelector = $('#tab'+(curidx+1));
				 if ( tabSelector.css('display') === 'none' ) {
					 	$('#tab'+(selectedTabIndex+1)).hide();
					 	tabSelector.show();
		    		 	setTimeout(function(){
		    		 		switch(curidx){
			    		 		case 0: CreateTab1Init(); break;//모집정보
			    		 		case 1: CreateTab2Init(); break;//할인/환불정보
			    		 		case 2: CreateTab3Init(); break;//신청제한
			    		 		case 3: CreateTab4Init(); break;//전자키발권
		    		 		}
		    		 		 		
		    		 }, 100);
				 }
				 
				  
		    }
			selectedTabIndex=curidx;
		},
	});
}