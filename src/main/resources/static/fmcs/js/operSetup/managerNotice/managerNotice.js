//업무공지알림관리
let instt='instt';
let instrApiUrl=`http://211.240.5.143:8090/api/v1/fmcs/${instt}/lctr`;
let gridNotice=null;
let gridTargetManager=null;
let noticeStore=null;
var noticeMgr=[];
function formInit()
{
	createCondition(); //조회 항목 생성
	createItemsFuctionButtons();//기능 버튼 생성
	createNoticeList();//왼쪽 - 공지사항 목록 

}
//---------------------------------
//조회조건
//---------------------------------
var frmCondition = {
	SEARCH_TYPE: 'TITLE',
	SEARCH_KEYWORD: '',
	POP_YN: '',
	SEARCH_DATE: '',
};
function createCondition(){
	$('#mngNoticeCondition').dxForm({
	    colCount: 4,
	    showColonAfterLabel: false,
	    //labelMode:'hidden',
	    formData: frmCondition,
	    items: createItemsCondition(),
	});
}
//---------------------------------
//조회조건-form items 생성
//---------------------------------
function createItemsCondition() {
	
	var itemsCondition = [
		{dataField: 'SEARCH_TYPE',label:{text:'검색구분'},
			editorType: 'dxSelectBox',
			editorOptions: {  
				dataSource:[{text:'제목',value:'TITLE'},{text:'내용',value:'CNTS'},],
				valueExpr: 'value', 
				displayExpr: 'text',
				onValueChanged(data) {
				},
			},
		},
		{dataField: 'SEARCH_KEYWORD',label:{text:'검색어'},
			editorType: 'dxTextBox',
			editorOptions:{
				inputAttr: {class: "srchkeyword"},
				width: '100%',
				placeholder:'2자리 이상 입력'
			}
		},
		{dataField: 'SEARCH_DATE',label:{text:'공지기준일'},
			editorType: 'dxDateBox',
			editorOptions:{displayFormat: 'yyyy-MM-dd'}		
		},
		{dataField: 'POP_YN',label:{text:'공지여부'},
			editorType: 'dxSelectBox',
			editorOptions: {  
				dataSource:[{text:'전체',value:''},{text:'공지',value:'Y'},{text:'공지안함',value:'N'}],
				valueExpr: 'value', 
				displayExpr: 'text',
				onValueChanged(data) {
				},
			},
		},
	];
	
 return itemsCondition;
}
function createItemsFuctionButtons() {
	$('#searchBtn').dxButton({
		stylingMode: 'contained',
		icon: 'find',
		type: 'default',
		onClick() {
			var msg='';
			//gridInstructor.option('dataSource', createOrderHistoryStore(productID));
			//var dataGrid = $("#dataGridContainer").dxDataGrid("instance");
			
			gridNotice.refresh()
			    .done(function() {
			        alert('done')// ...
			    })
			    .fail(function(error) {
			    	console.log('----errrr');
			    	console.log(error);
			    	console.log('errrr-----');
			    	alert('fail');
			});
			
			DevExpress.ui.notify('공지사항 조회 ' + msg);
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
			//DevExpress.ui.notify('초기화');
			//$("#insCondition").dxForm("instance").resetValues();
			
		},
	});
	
}

function sendRequest(url, method = 'GET', data) {
	//https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/CRUDOperations/jQuery/Light/
	const d = $.Deferred();
	//logRequest(method, url, data);
	$.ajax(url, 
		{
			method,
			data,
			cache: false,
			xhrFields: { withCredentials: true },
		/*beforeSend : function(xhr){
				xhr.setRequestHeader("ApiKey", "asdfasxdfasdfasdf"); 
				xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
				xhr.setRequestHeader("Content-type","application/json");
            	xhr.setRequestHeader("Authorization","JWT " + token);
			},*/
		}
	).done((result) => {
		d.resolve(method === 'GET' ? result.data : result);
		if(method === 'GET'){
			if(result.data){
				gridTargetManager.option('disabled', false);
	  	  	}else{
	  	  		gridTargetManager.option('disabled', true);
	  	  	}
		}
	
	}).fail((xhr) => {
		d.reject(xhr.responseJSON ? xhr.responseJSON.Message : xhr.statusText);
	});
	
	return d.promise();
}

function createNoticeStore() {
	noticeStore = new DevExpress.data.ArrayStore({
		key: 'NOTICE_NO',
	    data: [{COMCD:'0001',ORG_NO:1,NOTICE_NO:1,NOTICE_DATE:'2023-01-18',TITLE:'제목',CNTS:'내용1\n내용2\n내용3',SDATE:'2023-02-01',EDATE:'2023-02-02',POP_YN:'Y'}],
	});
	/*
	noticeStore =  new DevExpress.data.CustomStore({
	    key: 'INSTRCTR_SEQ',
	    load() {
	      return sendRequest(`${instrApiUrl}/instrctr`,'GET',frmCondition);
	    },
	    insert(values) {
	      return sendRequest(`${URL}/InsertOrder`, 'POST', {
	        values: JSON.stringify(values),
	      });
	    },
	    update(key, values) {
	      return sendRequest(`${URL}/UpdateOrder`, 'PUT', {
	        key,
	        values: JSON.stringify(values),
	      });
	    },
	    remove(key) {
	      return sendRequest(`${URL}/DeleteOrder`, 'DELETE', {
	        key,
	      });
	    },
	  });
	*/
	/*noticeStore =  new DevExpress.data.AspNet.createStore({
	      key: 'INSTRCTR_SEQ',
	      loadUrl: `${instrApiUrl}/instrctr`,
	  	  //loadParams: { ProductID: productID },
	      loadParams: frmCondition,
	      onBeforeSend(method, ajaxOptions) {
		   if(method==='load'){
	          //ajaxOptions.data.addparam='abc';
	        }
	        console.log(ajaxOptions);
	        console.log('----');
	        ajaxOptions.xhrFields = { withCredentials: true};
	      },
	      onLoaded(result) {
	    	  console.log(result);
	    	  if(result){
	    		  frmDetail.option('disabled', false);
	    		  //$('#formDetail').dxForm('instance')
	    	  }else{
	    		  frmDetail.option('disabled', true);
	    	  }
	      }
	});*/
	return noticeStore;
}

function createNoticeList(){
	//repaintChangesOnly:true,
	gridNotice = $('#gridManagerNotice').dxDataGrid({
		allowColumnReordering: true,
	    allowColumnResizing: true,
	    //rowAlternationEnabled: true,
	    showBorders: true,
	    columnChooser: {
	    	enabled: true,
	    	allowSearch: true,
	    	location: 'before',
	    },
		/*remoteOperations: true,
		repaintChangesOnly: true,*/
	    dataSource: createNoticeStore(),
	    searchPanel: {
	    	visible: true,
		    //width: 240,
		    placeholder: 'Search...',
	    },
	    showBorders: true,
	    selection: {
	    	mode: 'single'
	    },
	    columns: createColumnsList(),
	    editing: {
	    	mode: 'popup',
	    	allowAdding: true,
	    	allowUpdating: true,
	    	allowDeleting: true,
	    	useIcons: true,
	    	texts: {
	    		confirmDeleteMessage: '삭제하시겠습니까?',
	    	},
	    	popup: {
	    		title: '공지사항',
	    		showTitle: true,
	    		width: 500,
	    		height:390,
	    		onShown:function(){
	    			$('#editForm').dxForm("instance").validate();
	    		}
	    	},
	    	form: {
	    		showColonAfterLabel: false,
	    		elementAttr: {id: "editForm",},
	    		customizeItem: function(item){
	    			//console.log(item.dataField + ":"+ item.name)
	    		},
	    		items:  createItemsDetailPopup(),
	    		colCount: 2,
	    	},    
	    },
	    onEditingStart: function(e){
	    	gridNotice.option("editing.popup.title", "공지사항 수정");
	    },
	    onInitNewRow: function(e){
	    	gridNotice.option("editing.popup.title", "공지사항 신규");
			 //$(".dx-popup-content .btnhide").removeClass('btnhide');
	    	var today = moment().format('YYYY-MM-DD');
    		e.data={
    				NOTICE_NO:0,
    				TITLE:'',
    				CNTS:'',
    				SDATE:today,
    				EDATE:today,
    				POP_YN:'N',
    				COMCD:'0001',
    				ORG_NO:1,
    				COMNM:'',
    	 	};
	    },
	    onSelectionChanged: function () {
            if(gridNotice.getSelectedRowsData()[0]) {
            	//console.log(gridNotice.getSelectedRowsData()[0]);
            	targetManager(gridNotice.getSelectedRowsData()[0]);
            }
        },
        onRowDblClick: function (rowInfo) {  
        	  rowInfo.component.editRow(rowInfo.rowIndex);
        }, 
        onToolbarPreparing(e) {
            e.toolbarOptions.items.push(
             		 {
             			 location: 'after',
             			 widget: 'dxButton',
             			 options: {
             				 	icon: 'refresh',
             				 	onClick() {
             				 		//gridNotice.refresh();
             				 	},
             			 },
             		 }
             );
             
       },
       onContentReady(e) {
	        if (!e.component.getSelectedRowKeys().length) {
	        	e.component.selectRowsByIndexes(0); 
	        }
	    },
	}).dxDataGrid('instance');
}

//---------------------------------
//강사목록-datagrid columns 생성 
//---------------------------------
function createColumnsList() 
{
	var resultColumns = {};

	resultColumns = [
		{dataField: 'NOTICE_NO',width:'100px',caption: '공지사항 순번',	visible:false},
		{dataField: 'TITLE',width:'200px',caption: '제목'},
		{dataField: 'CNTS',caption: '내용',
			cellTemplate: function (container, options) {  
				//container.addClass("product-cell");  
				$("<span>" + options.data.CNTS.replaceAll("\n", "<br/>") + "</span>").appendTo(container);  
			}  
		},
		{dataField: 'SDATE',width:'100px',caption: '공지시작일',
			dataType: "datetime",  
			format:"yyyy-MM-dd",
            editorOptions: { // set DateBox options here
            	type:"date",
                displayFormat: "yyyy-MM-dd",  
            }  
		},
		{dataField: 'EDATE',width:'100px',caption: '공지종료일',
			dataType: "datetime",
			format:"yyyy-MM-dd",
            editorOptions: { // set DateBox options here
            	type:"date",
                displayFormat: "yyyy-MM-dd",  
            }  
		},
		{dataField: 'POP_YN',width:'100px',caption: '공지여부',alignment:'center',
			lookup: {
				dataSource: [{text:'공지안함',value:'N'},{text:'공지',value:'Y'}],
				displayExpr: "text",
				valueExpr: "value"
			},
		},
		{dataField: 'COMCD',caption: '운영기관고유번호',	visible:false,showInColumnChooser:false,},
		{dataField: 'ORG_NO',caption: '소속시설고유번호',visible:false,showInColumnChooser:false,},
		{dataField: 'COMNM',caption: '소속시설명',	visible:false,showInColumnChooser:false,},
	];
	
	return resultColumns;
}
function createNoticeMgrStore(srcData) {
	
	return (new DevExpress.data.ArrayStore({
		key: 'USER_SEQ',
		data:noticeMgr, 
	}));
	
	
	
}
function targetManager(srcData){
	
	 $("#gridTargetManager").dxDataGrid({
			height:'90vh',
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
		    	allowDeleting: true,
		    	useIcons: true,
		    	texts: {
		    		confirmDeleteMessage: '삭제하시겠습니까?',
		    	},
			},
			selection: {mode: 'multiple',showCheckBoxesMode:'always',},
			columns:[
				{dataField: 'USER_SEQ',caption: '사용자',visible:false},
				{dataField: 'USER_ID',width:'100px',caption: '사용자ID'},
				{dataField: 'KOR_NAME',caption: '사용자성명',},
				{dataField: 'CHECK_YN',width:'100px',caption: '확인여부',alignment:'center',
					lookup: {
						dataSource: [{text:'확인안함',value:'N'},{text:'확인',value:'Y'}],
						displayExpr: "text",
						valueExpr: "value"
					},
				},
			],
			onRowPrepared: function(e) {
			     if (e.rowType === "data" && e.data.CHECK_YN === "N") {
			         e.rowElement.css("background-color", "rgb(255 0 0 / 12%)");
			     }
			},
			onToolbarPreparing(e) {
	            e.toolbarOptions.items.unshift({
	            	location: 'before',
	            	template: $('<div style="font-weight:700;margin-left:10px;">').append("공지대상"),
	            });
	            
	            e.toolbarOptions.items.push(
		            {
		          		location: 'after',
		      			widget: 'dxButton',
		      			//cssClass:'functionbtn',
		      			options: {
		      				hint:'공지 대상 추가',
		      				icon: 'plus',
		      				onClick() {
		      					createSelectUsers();
		      				},
		      			},
		          	},);
	            e.toolbarOptions.items.push(
	             		 {
	             			 location: 'after',
	             			 widget: 'dxButton',
	             			 options: {
	             				hint:'선택 삭제',
	             				 icon: 'trash',
	             				 onClick() {
	             				 		//선택 삭제
	             				 		//gridNotice.refresh();
	             				 },
	             			 },
	             		 }
	            );
	            e.toolbarOptions.items.push(
	             		 {
	             			 location: 'after',
	             			 widget: 'dxButton',
	             			 options: {
	             				 	icon: 'refresh',
	             				 	onClick() {
	             				 		//gridNotice.refresh();
	             				 	},
	             			 },
	             		 }
	             );
	       },
	      
			
	 });
}
function addTargetManagers(selectedManagers)
{
	var grid=$("#gridTargetManager").dxDataGrid('instance')
//	var ds = grid.option("dataSource");
	selectedManagers.forEach(function(user) {
		user.CHECK_YN='N';
		noticeMgr.unshift(user);
	});
	grid.option("dataSource",noticeMgr);
    //grid.refresh();
}

  
  
  