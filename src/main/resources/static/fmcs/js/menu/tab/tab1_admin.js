let adminDetailForm=null;
let adminMenuTree =null;
var insertMode='current';
let adminDetailData=null;
let adminDetailHelpData=null;
let adminDetailHelpStore=null;
let adminDetailHelpGrid=null;
const COMTNMENUINFO=[
	{	MENU_NO:1,			//메뉴 ID decimal(20,0)
		SITE_GUBUN:'ADMIN',	//사이트 구분 VARCHAR(20) /USER
		MENU_NM:'abcd',		//메뉴명 VARCHAR(60)
		MENU_URL:'url',		// URL VARCHAR(100)
		UPPER_MENU_NO :null, //상위메뉴번호	 decimal(20,0)
		UPPER_MENU_NM :null, //상위메뉴번호	 decimal(20,0)
		MENU_ORDR :0,		//메뉴순서	 decimal(5,0)
		MENU_DESC :'abcd',			//메뉴설명	 VARCHAR(250)
		FRONT_GNBMENUYN:'N', //FRONT메인GNB메뉴여부	VARCHAR(1)
		MENU_DEPTH:0,		//메뉴레벨 decimal(10,0)
		USE_YN:'1',			//사용여부	 VARCHAR(1)
		DEL_YN:'N',			//삭제여부	 VARCHAR(1)
		MENU_ICON:'',
	},
	{	MENU_NO:2,			//메뉴 ID decimal(20,0)
		SITE_GUBUN:'ADMIN',	//사이트 구분 VARCHAR(20) /USER
		MENU_NM:'abcd2',		//메뉴명 VARCHAR(60)
		MENU_URL:'url2',		// URL VARCHAR(100)
		UPPER_MENU_NO :1, //상위메뉴번호	 decimal(20,0)
		UPPER_MENU_NM :'abcd', //상위메뉴번호	 decimal(20,0)
		MENU_ORDR :0,		//메뉴순서	 decimal(5,0)
		MENU_DESC :'abcd2',			//메뉴설명	 VARCHAR(250)
		FRONT_GNBMENUYN:'N', //FRONT메인GNB메뉴여부	VARCHAR(1)
		MENU_DEPTH:1,		//메뉴레벨 decimal(10,0)
		USE_YN:'0',			//사용여부	 VARCHAR(1)
		DEL_YN:'N',			//삭제여부	 VARCHAR(1)
		MENU_ICON:'',
	}
]
const comtn_menu_item=[
	{	MENU_NO:1, 		//메뉴ID decimal(20,0)
		COMCD:'000' ,	//시설코드	 varchar(20)
		ORG_NO:1,		//기관의 고유번호	decimal(10,0)
		COLUMN_ID:'abc',//컬럼아이디	varchar(100)
		COLUMN_DESC:'abc',//컬럼설명	text
	}
]	

function CreateTab1Init()
{
	createAdminDetailForm('#formAdminMenu');//오른쪽 상세화면
	createAdminMenuTree('#treeAdminMenu', COMTNMENUINFO);//왼쪽
	
}
function createAdminMenuTree(selector, items) {
	//사용여부 표시 방법 및 순서 저장?
	/*const store = new DevExpress.data.CustomStore({
	    key: 'OrderNumber',
	    load(loadOptions) {
	      const deferred = $.Deferred();
	      const args = {};

	      [
	        'skip',
	        'take',
	        'requireTotalCount',
	        'requireGroupCount',
	        'sort',
	        'filter',
	        'totalSummary',
	        'group',
	        'groupSummary',
	      ].forEach((i) => {
	        if (i in loadOptions && isNotEmpty(loadOptions[i])) {
	          args[i] = JSON.stringify(loadOptions[i]);
	        }
	      });
	      $.ajax({
	        url: 'https://js.devexpress.com/Demos/WidgetsGalleryDataService/api/orders',
	        dataType: 'json',
	        data: args,
	        success(result) {
	          deferred.resolve(result.data, {
	            totalCount: result.totalCount,
	            summary: result.summary,
	            groupCount: result.groupCount,
	          });
	        },
	        error() {
	          deferred.reject('Data Loading Error');
	        },
	        timeout: 5000,
	      });

	      return deferred.promise();
	    },
	  });
	*/
	
	
	adminMenuTree=$(selector).dxTreeList({
		dataSource: COMTNMENUINFO,
	    dataStructure: 'plain',
	    parentIdExpr: 'UPPER_MENU_NO',
	    keyExpr: 'MENU_NO',
	    columns: [
	    	{dataField:'MENU_NM',	caption: '메뉴명',
	    		cellTemplate(container, options) {
		    		container.append(`<div>${options.data.MENU_NM}(${options.data.MENU_NO})</div>`);
	                 //.css("color", "blue");
            	},
            },
	    	{dataField:'MENU_URL',	caption: 'URL',},
	    	{dataField:'USE_YN',caption: '사용여부',	width:80,alignment: 'center',
	    		cellTemplate(container, options) {
		    		container.addClass(options.data.USE_YN =='N' ? 'notuseflag' : 'useflag');
		    		container.append("<div>" + (options.data.USE_YN =='N' ? '사용안함' : '사용') + "</div>");
                     //.css("color", "blue");
	            },
	        },
	    	{dataField:'MENU_DESC',caption: '메뉴설명', visible:false},
	    	{dataField:'UPPER_MENU_NM',	visible:false},
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
	          const visibleRows = adminMenuTree.getVisibleRows();
	          const sourceNode = adminMenuTree.getNodeByKey(e.itemData.MENU_NO);
	          let targetNode = visibleRows[e.toIndex].node;

	          while (targetNode && targetNode.data) {
	            if (targetNode.data.MENU_NO === sourceNode.data.MENU_NO) {
	              e.cancel = true;
	              break;
	            }
	            targetNode = targetNode.parent;
	          }
	        },
	        onReorder(e) {
	          const visibleRows = e.component.getVisibleRows();

	          if (e.dropInsideItem) {
	            e.itemData.UPPER_MENU_NO = visibleRows[e.toIndex].key;
	          } else {
	            const sourceData = e.itemData;
	            const toIndex = e.fromIndex > e.toIndex ? e.toIndex - 1 : e.toIndex;
	            let targetData = toIndex >= 0 ? visibleRows[toIndex].node.data : null;

	            if (targetData && e.component.isRowExpanded(targetData.MENU_NO)) {
	              sourceData.UPPER_MENU_NO = targetData.MENU_NO;
	              targetData = null;
	            } else {
	              sourceData.UPPER_MENU_NO = targetData ? targetData.UPPER_MENU_NO : e.component.option('rootValue');
	            }

	            const sourceIndex = COMTNMENUINFO.indexOf(sourceData);
	            COMTNMENUINFO.splice(sourceIndex, 1);

	            const targetIndex = COMTNMENUINFO.indexOf(targetData) + 1;
	            COMTNMENUINFO.splice(targetIndex, 0, sourceData);
	          }

	          e.component.refresh();
	        },
	      },
	    editing: {
	    	mode: 'row',
	        allowUpdating: false,
	        allowDeleting: true,
	        useIcons: true,
	    },
	    onRowDblClick:function(e){
	    	//e.component.editRow(e.rowIndex);
	    	//e.component.deselectAll();
	    	editMenu(e.data);			
	    },
	    onEditingStart: function(e){
	    	/*adminMenuTree.option("editing.popup.title", "검색 메뉴 수정");
	    	var curr = selectedData();
	    	if(curr && curr.parent && curr.parent.data){
	    		e.data.PRNCTGCD_NM = curr.parent.data.CTGNM;
	    		e.data.PRNCTGCD = curr.parent.data.CTGCD;
	    	}*/
	     },
	     onInitNewRow: function(e){
	    	 /*adminMenuTree.option("editing.popup.title", "강좌 검색 메뉴 신규");
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
	    	 e.data.USE_YN ='0';*/
	     },
	     onFocusedRowChanged(e) {
	    	// const focusedRowKey = e.component.option('focusedRowKey');
	    	// console.log(e);
	    	 e.component.option('toolbar.items[5].options.disabled',false);//e.row.data.MENU_DEPTH==3
	    	 editMenu(e.row.data);
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
	          					 adminMenuTree.refresh();
	          				 },
	          			 },
	          		 },
	          		 {
	          			 location: 'before',
	          			 widget: 'dxButton',
	          			 options: {
	          				 icon: 'activefolder',
	          				 onClick() {
	          					 var keys = getNodeKeys(adminMenuTree.__root);
	          				 	 adminMenuTree.beginUpdate();
	          			         keys.forEach(function(key) {  
	          			        	 adminMenuTree.expandRow(key);
	          			         }); 
	          			         adminMenuTree.endUpdate();            
	          				 },
	          			 },
	          		 },
	          		 {
	          			 location: 'before',
	          			 widget: 'dxButton',
	          			 options: {
	          				 icon: 'inactivefolder',
	          				 onClick() {
	          					 var keys = getNodeKeys(adminMenuTree.__root);
	          				 	 adminMenuTree.beginUpdate();
	          			         keys.forEach(function(key) {  
	          			        	 adminMenuTree.collapseRow(key);
	          			         }); 
	          			         adminMenuTree.endUpdate();            
	          				 },
	          			 },
	          		 },
	          		 {
	          			location: 'after',
	          		     widget: 'dxButton',
	          		     cssClass:'functionbtn',
	          		     options: {
	          		    	 text: '등록',
	          		    	 onClick() {
	          		    		 addMenu(0);
	          		    		 /*adminMenuTree.addRow();
	          		    		 */
	          		    	 },
	          		     },
	          		 }, {
	          			location: 'after',
	          		     widget: 'dxButton',
	          		     cssClass:'functionbtn',
	          		     options: {
	          		    	 disabled:true,
	          		    	 elementAttr:{id:'regChild'},
	          		    	 text: '하위메뉴등록',
	          		    	 onClick() {
	          		    		 addMenu(1);
	          		        	/*adminMenuTree.addRow();
	          		        	adminMenuTree.deselectAll();//모두 선택 해제*/
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
	
}
function editMenu(data){
	 adminDetailData=data;
	 adminDetailData.editMode='update';
	 adminDetailForm.option('readOnly', false);
	 adminDetailForm.option('formData', adminDetailData);
	 
	 adminDetailHelpStore = new DevExpress.data.ArrayStore({
		    key: 'COLUMN_ID',
		    data: adminDetailHelpData
		});
	 adminDetailHelpGrid.option('dataSource', adminDetailHelpStore);
	 adminDetailHelpGrid.option('disabled', false);
	 let button = adminDetailForm.getButton("btnSave");
     button.option("disabled", false);
}
function addMenu(addFlag){
	adminDetailData=
		 {	MENU_NO:0,			//메뉴 ID decimal(20,0)
			SITE_GUBUN:'ADMIN',	//사이트 구분 VARCHAR(20) /USER
			MENU_NM:'',		//메뉴명 VARCHAR(60)
			MENU_URL:'',		// URL VARCHAR(100)
			UPPER_MENU_NO :null, //상위메뉴번호	 decimal(20,0)
			UPPER_MENU_NM :null, //상위메뉴번호	 decimal(20,0)
			MENU_ORDR :0,		//메뉴순서	 decimal(5,0)
			MENU_DESC :'',			//메뉴설명	 VARCHAR(250)
			FRONT_GNBMENUYN:'N', //FRONT메인GNB메뉴여부	VARCHAR(1)
			MENU_DEPTH:0,		//메뉴레벨 decimal(10,0)
			USE_YN:'0',			//사용여부	 VARCHAR(1)
			DEL_YN:'N',			//삭제여부	 VARCHAR(1)
			MENU_ICON:'',
			editMode:'insert',
		 };
		 adminDetailForm.option('readOnly', false);
		 var curr = selectedData();
		 if(!curr && addFlag == 1){
			 DevExpress.ui.dialog.alert('메뉴를 선택 해주세요', "하위메뉴등록");  
			 return;
	     }
		 if(curr){
			adminDetailData.UPPER_MENU_NO = addFlag == 0 ? curr.data.UPPER_MENU_NO:curr.data.MENU_NO;
			adminDetailData.UPPER_MENU_NM = addFlag == 0 ? curr.data.UPPER_MENU_NM:curr.data.MENU_NM;
		 }
		 adminDetailForm.option('formData', adminDetailData);
		 adminDetailHelpGrid.option('dataSource', null);
		 adminDetailHelpGrid.option('disabled', true);
		 let button = adminDetailForm.getButton("btnSave");
	     button.option("disabled", false);
		 adminMenuTree.deselectAll();
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
	return ( adminMenuTree.getDataSource().items()[adminMenuTree.getRowIndexByKey(adminMenuTree.option("focusedRowKey"))]);
}
function createAdminDetailForm(selector){
	
	adminDetailForm=$(selector).dxForm({
			showColonAfterLabel: false,
	    	readOnly:true,
			items:[
				{itemType: 'button',name:'btnSave',
					horizontalAlignment: 'right',
					buttonOptions: {
						disabled:true,
						text: '저장하기',
						type: 'success',
						useSubmitBehavior: true,
						onClick(){
				        	var adminForm= $("#formAdminMenu").dxForm('instance'); 
				            var validationResult = adminForm.validate();
				            var orgData = adminForm.option("formData");
				            var dataSource = adminMenuTree.getDataSource(); 
				            if (validationResult.isValid) {
				            	if(orgData.editmode==='insert'){
				            	    store.insert(orgData)
				            	        .done(function (dataObj, key) {
				            	            dataSource.reload();
				            	        })
				            	        .fail(function (error) { /* ... */ });
				            	}else{
				            		store.update(orgData.MENU_NO,orgData)
				                    .done(function (dataObj, key) {
				                        dataSource.reload();
				                    }) 
				            	}
				            	  
				            }
				             else
				                 alert("dxForm is invalid");
						}
			      },
				},
				{dataField:'UPPER_MENU_NM',label: {text: '상위메뉴명',},
					editorOptions: {
						readOnly: true,
				    	inputAttr: {class: "readOnly"}
					}
				 },
			     {dataField: 'MENU_NM',label: {text: '메뉴명',},
		        	validationRules: [{
		     	         type: 'required',
		     	         message: '메뉴명 필수',
		     	 }]
		        },
		        {dataField:'MENU_ICON',label: {text: '메뉴ICON',},
/*		        	editorType:'dxSelectBox',
		        	editorOptions:{
		        		dataSource: [
				               {name: "Profile", icon: "user"},
				               {name: "Messages", icon: "email"},
				               {name: "Friends", icon: "group"},
				               {name: "Exit", icon: "runner"}
				           ],
				        displayExpr: "name",
				        valueExpr: "icon",
		        	}
*/		        },
		        {dataField: 'USE_YN',label: {text: '사용여부',},
		     	    	  editorType: 'dxSelectBox',
		         	      editorOptions: {
		         	    	  width:200,
		         	    	  dataSource:use_gbn,
				        	  valueExpr: 'value', 
				        	  displayExpr: 'text',
		         	       },
		         	       validationRules: [{
		         	         type: 'required',
		         	         message: 'Position is required',
		         	       }],
		        },
		        {dataField: 'MENU_URL',label: {text: 'URL',},},
		        {dataField: 'MENU_DESC',label: {text: '메뉴 설명',},editorType: 'dxTextArea',editorOptions: {height: 100,},},
		        {
		        	label:{text:'입력화면도움말관리',},
		    		 template: helpGridtemplate
		    	},
			
		]
	}).dxForm('instance');
	
}

function helpGridtemplate(){
	adminDetailHelpData=[];
	adminDetailHelpStore = new DevExpress.data.ArrayStore({
	    key: 'COLUMN_ID',
	    data: adminDetailHelpData
	});
		
	return $("<div id='helpGrid'>").dxDataGrid({
		disabled:true,
		dataSource: adminDetailHelpStore,
		keyExpr: 'COLUMN_ID',
		showBorders: true,
		allowColumnReordering: true,
	    allowColumnResizing: true,
		searchPanel: {
			visible: true,
	        placeholder: 'Search...',
	    },
	    paging: {
	    	enabled: false,
		},
		editing: {
		      mode: 'row',
		      allowAdding: true,
		      allowUpdating: true,
		      allowDeleting: true,
		      useIcons: true,
		      selectTextOnEditStart: true,
		},
		selection: {mode: 'single'},
		columns:[
			{dataField: 'COLUMN_ID',width:100,caption: '컬럼ID'},
			{dataField: 'COLUMN_DESC',caption: '컬럼설명',editorType: 'dxTextArea',editorOptions: {height: 100,},}
		],
		onInitialized(e){
			adminDetailHelpGrid=e.component;
		},
		onFocusedRowChanged(e) {
			const focusedRowKey = e.component.option('focusedRowKey');
		    selectedRowIndex = e.rowIndex;
	    	 //editorSetRow(e.row.data);
		},
		onToolbarPreparing(e) {
	         const dataGrid = e.component;
	         e.toolbarOptions.items.unshift({
		        	location: 'before',
		        	template: $('<div style="margin-left:10px;">').append("*수정시 편집 가능"),
		        }
	         );
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
