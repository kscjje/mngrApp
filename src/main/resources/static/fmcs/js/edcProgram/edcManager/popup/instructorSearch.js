var instructorPopup=null;
var searchCallback = null;
function createInstructorPopup(callback){
	if(instructorPopup){
		instructorPopup=null;
		$("#instructor_popup").dxPopup("dispose");
	}
	if (callback) {
		searchCallback = callback;		
	}
	instructorPopup=$("#instructor_popup").dxPopup({
		 contentTemplate: otherContentTemplate,
		 visible: true,
		  title: '강사 조회',
		  width:900,
          height:700,
		  position: {
		    my: 'center',
		    at: 'center',
		    of: window
		  },
		  dragEnabled: true,
		  onShown(){
			  $('.form-group.condition').dxForm({
				    colCount: 2,
				    showColonAfterLabel: false,
				    //formData: frmCondition,
				    labelMode:'hidden',
				    items:[
					    {dataField: 'SEARCH_TYPE',editorType: 'dxSelectBox',
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
				    	 },
				    	 {dataField: 'SEARCH_KEYWORD',
				    		 editorOptions:{
				    			 inputAttr: {class: "srchkeyword"},
				    			 width: '100%'
				    		 }
				    	 },]
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
				  selection: {mode:'single'},
				  showBorders: true,
				  columnChooser: {
				      enabled: true,
				      allowSearch: true,
				  },
				  dataSource: instructors,
				  keyExpr: 'USER_SEQ',
				  searchPanel: {
				        visible: true,
				        width: 240,
				        placeholder: 'Search...',
				  },
				  columns: [
						 {dataField: 'KOR_NAME',caption: '강사명',
							 cellTemplate: function(element, options) {
									if (searchCallback) {
										$('<a>' + options.value + '</a>')
							       			.attr('href', "javascript:searchCallback(" + JSON.stringify(options.data) + "); instructorPopup.hide();")
							       			.appendTo(element);				
									}
								}		
						  },
						 {dataField: 'TEL_NO',caption: '휴대전화'}],
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
		  toolbarItems: [
			  {
				  widget: 'dxButton',
				  toolbar: 'bottom',
				  location: 'after',
				  options: {
					  text: '확인',
					  onClick() {
			    		  var grid = $('.instructorlist').dxDataGrid("instance");
			    		  var data = grid.getSelectedRowsData();
			    		  if (data && data.length>0) {
			    			  //frmPopup =$("#editForm").dxForm("instance");	
			    				//frmPopup.itemOption('INSTRCTR_NAME','value',data.KOR_NAME);
			    		  }
					  }
				  }
			  }, {
				  widget: 'dxButton',
				  toolbar: 'bottom',
				  location: 'after',
				  options: {
					  text: '취소',
					  onClick() {
						  instructorPopup=null;
						  $("#instructor_popup").dxPopup("dispose");
					  },
				  },
			  }
		  ],
	}).dxPopup('instance');
	
}
//타시설 강사 등록 테플릿
const otherTemplate = `<div class="popup_conditions">
	<div class="form-group condition"></div>
	<div class="form-group buttons">
	<div class="btn-group" id="searchOBtn"></div>
	<div class="btn-group" id="searchOInitBtn"></div>
	</div>
</div><div><div class="instructorlist"></div></div>`;
///<div class="subject">강사리스트</div>
const otherContentTemplate = function () {
    return $('<div>').append(otherTemplate);
};
 