//강사관리
let gridInstructor =null;	
let selectedRowIndex = -1;
let instructorsStore =null;
let instt='instt';
let instrApiUrl=`http://211.240.5.143:8090/api/v1/fmcs/${instt}/lctr`;
function formInit()
{
	createCondition(); //조회 항목 생성
	
	createItemsFuctionButtons();//기능 버튼 생성

	createLeftInstructorList();//왼쪽 - 강사 목록
	
	//detailFormInit(true);
}
function detailFormInit(binit){
	//console.log(selectedRowIndex);
	if( selectedRowIndex==-1){
		$("#formDetail").dxForm("instance").option("readOnly",true);
	}else{
		if(binit==false){ 
			$("#formDetail").dxForm("instance").option("readOnly",false);
		}
	}
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
			
			gridInstructor.refresh()
			    .done(function() {
			        alert('done')// ...
			    })
			    .fail(function(error) {
			    	console.log('----errrr');
			    	console.log(error);
			    	console.log('errrr-----');
			    	alert('fail');
			});
			if(frmDetail){
				//frmDetail.itemOption("KOR_NAME", "visible", false);//OK
				//msg = frmDetail.itemOption("KOR_NAME", "value");
				msg = frmDetail.getEditor('KOR_NAME').option('value'); 
			}
			DevExpress.ui.notify('강사조회 ' + msg);
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
	$('#otherInsertBtn').dxButton({
		stylingMode: 'contained',
		text: '타시설강사등록',
		type: 'default',
		onClick() {
			//DevExpress.ui.notify('타시설강사등록');
			createOther();
		},
	});
	$('#changeCenterBtn').dxButton({
		stylingMode: 'contained',
		text: '소속시설변경',
		type: 'default',
		onClick() {
			createChangeCenter();
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
				frmDetail.option('disabled', false);
	  	  	}else{
	  	  		frmDetail.option('disabled', true);
	  	  	}
		}
	
	}).fail((xhr) => {
		d.reject(xhr.responseJSON ? xhr.responseJSON.Message : xhr.statusText);
	});
	
	return d.promise();
}

function createInstructorStore() {
	instructorsStore = new DevExpress.data.ArrayStore({
		key: 'USER_SEQ',
	    data: instructors,
	});
	/*
	instructorsStore =  new DevExpress.data.CustomStore({
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
	/*instructorsStore =  new DevExpress.data.AspNet.createStore({
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
	return instructorsStore;
}

function createLeftInstructorList(){
	
	//repaintChangesOnly:true,
	gridInstructor = $('#gridInstructor').dxDataGrid({
		export: {enabled: true},
		allowColumnReordering: true,
	    allowColumnResizing: true,
	    rowAlternationEnabled: true,
	    showBorders: true,
	    columnChooser: {
	    	enabled: true,
	    	allowSearch: true,
	    	location: 'before',
	    },
		focusedRowEnabled: true,
		focusedRowIndex: 0,
		/*remoteOperations: true,
		repaintChangesOnly: true,*/
	    dataSource: createInstructorStore(),
	    searchPanel: {
	    	visible: true,
		    //width: 240,
		    placeholder: 'Search...',
	    },
	    showBorders: true,
	    selection: {
	    	mode: 'multiple',showCheckBoxesMode:'always',
	    },
	    columns: createColumnsList(),
	    editing: {
	    	mode: 'popup',
	    	allowUpdating: true,
	    	allowDeleting: true,
	    	useIcons: true,
	    	texts: {
	    		confirmDeleteMessage: '삭제하시겠습니까?',
	    	},
	    	popup: {
	    		title: '강사정보',
	    		showTitle: true,
	    		width: 1200,
	    		height:750,
	    		onShown:function(){
	    			$('#editForm').dxForm("instance").validate();
	    			$("#cameraBtn").on("click", function(){
	    				createUserProfilePopup('#userPopup');
	    			});
	    		}
	    	},
	    	form: {
	    		showColonAfterLabel: false,
	    		elementAttr: {id: "editForm",},
	    		items:  createItemsDetailPopup(),
	    		colCount: 1,
	    	},    
	    },
	    onEditingStart: function(e){
	    		gridInstructor.option("editing.popup.title", "강사정보 수정");
	    	},
	    	onInitNewRow: function(e){
	    		gridInstructor.option("editing.popup.title", "강사정보 신규");
			 //$(".dx-popup-content .btnhide").removeClass('btnhide');
	    		e.data={
	    			COM_CD: "0001",
	    	 		GENDER:"0",
	    	 		OPEN_GBN:"0",
	    	 		PAY_GBN:"0",
	    	 	};
	    	},
	    	onEditorPrepared(e){
	    		/*if(e.row && e.row.isNewRow){
	    			
	    		}*/
	    	} ,
	    	 onRowUpdating(data) {
	    		//alert(data);
	    	   },
	    	onRowUpdated(data){
	    		//alert(data);
	    		dispalyDetail(data.data);
	    		//console.log('onRowUpdated');
	    	}, 
	    	onFocusedRowChanged(e) {
	    		const focusedRowKey = e.component.option('focusedRowKey');
	    		selectedRowIndex = e.rowIndex;
	    		
	    		dispalyDetail(e.row.data);
	    		//console.log('onFocusedRowChanged');
	    	},
	    	/*onToolbarPreparing(e) {
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
	              
	        },*///ontoolbar     
	}).dxDataGrid('instance');
}
function dispalyDetail(srcData)
{
	createRightInstructorDetail('view');//오른쪽- 강사 상세
	frmDetail.option('formData', srcData);
	editorInit();
}
//---------------------------------
//강사목록-datagrid columns 생성 
//---------------------------------
function createColumnsList() 
{
	var resultColumns = {};

	resultColumns = [
		{dataField: 'INSTRCTR_SEQ',	caption: '강사코드',	visible:false},
		{dataField: 'KOR_NAME',	caption: '강사명'},
		{dataField: 'HP_NO',	caption: '휴대전화',	visible:false},
		{dataField: 'EMP_CARDNO',caption: '회원카드',	visible:false},
		{dataField: 'GENDER',	caption: '성별',visible:false,
			lookup: {
				dataSource: SM_GENDER_GBN,
				displayExpr: "text",
				valueExpr: "value"
			},
		},
		{dataField: 'OPEN_GBN',	caption: '온라인공개여부',visible:false},
		{dataField: 'INFORM',	caption: '강사소개',	visible:false,
			  showInColumnChooser:false,
			 editCellTemplate : function(container, cellInfo) {
              	 container.append($('<div>').dxTextArea({
              		value: cellInfo.value,
            		inputAttr: { id: 'inform_editor2' },
            	 }));
            	 CKEDITOR.replace('inform_editor2');
            	 CKEDITOR.instances.inform_editor2.on("change", 
            			function () {
            				cellInfo.setValue(CKEDITOR.instances.inform_editor2.getData());
            			}
            	 );
              },
             
		},
		{dataField: 'CLASS_LST',caption: '담당종목',	visible:false},
		{dataField: 'ETC',	caption: '비고',		visible:false},
		{dataField: 'COMCD',caption: '운영기관고유번호',	visible:false,showInColumnChooser:false,},
		{dataField: 'ORG_NO',caption: '소속시설고유번호',visible:false,showInColumnChooser:false,},
		{dataField: 'COMNM',caption: '소속시설명',	visible:false,showInColumnChooser:false,},
	];
	
	return resultColumns;
}



//신규 버튼
function createInstructor(){
	
	gridInstructor.option("editing.mode", "popup");
	gridInstructor.addRow();
	gridInstructor.deselectAll();
}
//수정 버튼
function updateInstructor(){
	if(selectedRowIndex==-1){
		DevExpress.ui.dialog.alert('수정 할 강사를 선택 해주세요', "강사관리 수정");
		return;
	}
	gridInstructor.editRow(selectedRowIndex);
	gridInstructor.deselectAll();
}
//삭제 버튼
function deleteInstructor(){
	if(selectedRowIndex==-1){
		DevExpress.ui.dialog.alert('삭제 할 강사를 선택 해주세요', "강사관리 수정");
		return;
	}
	
	if(gridInstructor.getSelectedRowKeys().length ==0){
		gridInstructor.deleteRow(selectedRowIndex);
		gridInstructor.deselectAll();
		return;
	}
	
	if(confirm(gridInstructor.getSelectedRowKeys().length+'건을 삭제하시겠습니까?')){;
		gridInstructor.getSelectedRowKeys().forEach((key) => {
	        instructorsStore.remove(key);
	     });
		gridInstructor.refresh();
	}
	
}
//메인 취소 버튼
function cancel(){
	
}



  
  
  