var otherPopup=null;
function createOther(){
	if(otherPopup){
		otherPopup=null;
		$("#othercenter_popup").dxPopup("dispose");
	}
	otherPopup=$("#othercenter_popup").dxPopup({
		 contentTemplate: otherContentTemplate,
		 visible: true,
		  title: '타시설 강사 등록',
		  width:900,
          height:700,
		  position: {
		    my: 'center',
		    at: 'center',
		    of: window
		  },
		  dragEnabled: true,
		  onShown(){
			  $('.form-group.other_condition').dxForm({
				    colCount: 2,
				    showColonAfterLabel: false,
				    formData: frmCondition,
				    labelMode:'hidden',
				    items: createItemsOtherCondition(),
    		 });
			  $('#searchOBtn').dxButton({
					stylingMode: 'contained',
					type: 'default',
					template: '<i class="nav-icon fas fa-search"></i>',
					onClick() {
						DevExpress.ui.notify('강사조회');
					},
				});
			  $('#searchOInitBtn').dxButton({
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
			  //export: {enabled: true},
			  $('.instructorlist').dxDataGrid({
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
				  dataSource: instructors,
				  keyExpr: 'USER_SEQ',
				  searchPanel: {
				        visible: true,
				        width: 240,
				        placeholder: 'Search...',
				  },
				  columns: createColumnsOtherList(),
				  scrolling: {
				       rowRenderingMode: 'virtual',
				  },
				  paging: {
					  pageSize: 10,
				  },
				  pager: {
					  visible: true,
				      showInfo: true,
				      infoText: "총 {2}건   {0}/{1}",
				      showNavigationButtons: true,
				  },
			  });
		  },
		  toolbarItems: [{
			  widget: 'dxButton',
		      toolbar: 'bottom',
		      location: 'after',
		      options: {
		    	  text: '강사등록',
		    	  onClick() {
		    		  const message = `Email is sent to ${employee.FirstName} ${employee.LastName}`;
		    		  DevExpress.ui.notify({
		    			  message,
		    			  position: {
		    				  my: 'center top',
		    				  at: 'center top',
		    			  },
		    		  }, 'success', 3000);
		    	  },
		      },
		  }, {
			  widget: 'dxButton',
		      toolbar: 'bottom',
		      location: 'after',
		      options: {
		    	  text: '취소',
		    	  onClick() {
		    		  //otherPopup.hide();
		    		  otherPopup=null;
		    		  $("#othercenter_popup").dxPopup("dispose");
		    	  },
		      },
		  }],
	}).dxPopup('instance');
}
//타시설 강사 등록 테플릿
const otherTemplate = `<div class="popup_conditions">
	<div class="form-group other_condition"></div>
	<div class="form-group buttons">
	<div class="btn-group" id="searchOBtn"></div>
	<div class="btn-group" id="searchOInitBtn"></div>
	</div>
</div><div><div class="instructorlist"></div></div>`;
///<div class="subject">강사리스트</div>
const otherContentTemplate = function () {
    return $('<div>').append(otherTemplate);
};
  
//---------------------------------
//조회조건-form items 생성
//---------------------------------
function createItemsOtherCondition() {
	var itemsCondition = [];
	
	itemsCondition.push({dataField: 'SEARCH_TYPE',editorType: 'dxSelectBox',
		editorOptions: {  
			dataSource:search_gbn2,
			valueExpr: 'value', 
			displayExpr: 'text',
			value: '-1',
			onValueChanged(data) {
				const $result = $('.srchkeyword');
				if (data.value !== null) {
		        // const selectedItem = data.component.option('selectedItem');
		        //(ID: ${selectedItem.ID}
					var tempstr='';
					if(data.value  == 'KOR_NAME') tempstr='강사명 2자리 이상 입력';
					if(data.value  == 'TEL_NO') tempstr='- 없이 전체 번호 입력';
					$result.attr('placeholder',tempstr);
				} else {
					//$result.attr('');
				}
		    },
    	 },
   },);
   itemsCondition.push({dataField: 'SEARCH_KEYWORD',
	   editorOptions:{
		   inputAttr: {class: "srchkeyword"},
   		   width: '100%'
	   }
   });
   
   return itemsCondition;
}


   

