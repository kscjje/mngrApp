var selectUsersPopup=null;
let frmUCondition2={SEARCH_TYPE:'KOR_NAME',SEARCH_KEYWORD:'',SEARCH_ORG:''};
const managers = [ 
	{USER_SEQ: 1,KOR_NAME: '직원1',USER_ID:'abc1',DEPT_NM:'부서1',ORG_NM:'사원',TEL_NO: '010-0000-0000'},
	{USER_SEQ: 2,KOR_NAME: '직원2',USER_ID:'abc2',DEPT_NM:'부서1',ORG_NM:'사원',TEL_NO: '010-0000-0000'},
	{USER_SEQ: 3,KOR_NAME: '직원3',USER_ID:'abc3',DEPT_NM:'부서1',ORG_NM:'사원',TEL_NO: '010-0000-0000'},
	{USER_SEQ: 4,KOR_NAME: '직원4',USER_ID:'abc4',DEPT_NM:'부서1',ORG_NM:'사원',TEL_NO: '010-0000-0000'},
	{USER_SEQ: 5,KOR_NAME: '직원5',USER_ID:'abc5',DEPT_NM:'부서1',ORG_NM:'사원',TEL_NO: '010-0000-0000'},
	{USER_SEQ: 6,KOR_NAME: '직원6',USER_ID:'abc6',DEPT_NM:'부서1',ORG_NM:'사원',TEL_NO: '010-0000-0000'},
	{USER_SEQ: 7,KOR_NAME: '직원7',USER_ID:'abc7',DEPT_NM:'부서1',ORG_NM:'사원',TEL_NO: '010-0000-0000'},
	{USER_SEQ: 8,KOR_NAME: '직원8',USER_ID:'abc8',DEPT_NM:'부서1',ORG_NM:'사원',TEL_NO: '010-0000-0000'},
	{USER_SEQ: 9,KOR_NAME: '직원9',USER_ID:'abc9',DEPT_NM:'부서1',ORG_NM:'사원',TEL_NO: '010-0000-0000'},
	{USER_SEQ: 10,KOR_NAME: '직원10',USER_ID:'abc10',DEPT_NM:'부서1',ORG_NM:'사원',TEL_NO: '010-0000-0000'},
	{USER_SEQ: 11,KOR_NAME: '직원11',USER_ID:'abc11',DEPT_NM:'부서1',ORG_NM:'사원',TEL_NO: '010-0000-0000'},
	{USER_SEQ: 12,KOR_NAME: '직원12',USER_ID:'abc12',DEPT_NM:'부서1',ORG_NM:'사원',TEL_NO: '010-0000-0000'},
	{USER_SEQ: 13,KOR_NAME: '직원13',USER_ID:'abc13',DEPT_NM:'부서1',ORG_NM:'사원',TEL_NO: '010-0000-0000'},
	{USER_SEQ: 14,KOR_NAME: '직원14',USER_ID:'abc14',DEPT_NM:'부서1',ORG_NM:'사원',TEL_NO: '010-0000-0000'},
	{USER_SEQ: 15,KOR_NAME: '직원15',USER_ID:'abc15',DEPT_NM:'부서1',ORG_NM:'사원',TEL_NO: '010-0000-0000'},
	{USER_SEQ: 16,KOR_NAME: '직원16',USER_ID:'abc16',DEPT_NM:'부서1',ORG_NM:'사원',TEL_NO: '010-0000-0000'},
	{USER_SEQ: 17,KOR_NAME: '직원17',USER_ID:'abc17',DEPT_NM:'부서1',ORG_NM:'사원',TEL_NO: '010-0000-0000'},
	{USER_SEQ: 18,KOR_NAME: '직원18',USER_ID:'abc18',DEPT_NM:'부서1',ORG_NM:'사원',TEL_NO: '010-0000-0000'},
	{USER_SEQ: 19,KOR_NAME: '직원19',USER_ID:'abc19',DEPT_NM:'부서1',ORG_NM:'사원',TEL_NO: '010-0000-0000'},
	{USER_SEQ: 20,KOR_NAME: '직원20',USER_ID:'abc20',DEPT_NM:'부서1',ORG_NM:'사원',TEL_NO: '010-0000-0000'},
];


function createSelectUsers(){
	if(selectUsersPopup){
		selectUsersPopup=null;
		$("#selectUsersPopup").dxPopup("dispose");
	}
	selectUsersPopup=$("#selectUsersPopup").dxPopup({
		 contentTemplate: searchContentTemplate,
		 visible: true,
		  title: '공지 대상 선택',
		  width:900,
          height:700,
		  position: {
		    my: 'center',
		    at: 'center',
		    of: window
		  },
		  dragEnabled: true,
		  onShown(){
			  $('#searchUForm').dxForm({
				    colCount: 3,
				    showColonAfterLabel: false,
				    formData: frmUCondition2,
				    labelMode:'hidden',
				    items: createItemsSearchCondition(),
    		 });
			  $('#searchUBtn').dxButton({
					stylingMode: 'contained',
					type: 'default',
					template: '<i class="nav-icon fas fa-search"></i>',
					onClick() {
						DevExpress.ui.notify('조회');
					},
				});
			  $('#searchUInitBtn').dxButton({
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
			  $('#userlist').dxDataGrid({
				  allowColumnReordering: true,
				  allowColumnResizing: true,
				  columnAutoWidth: true,
				  showBorders: true,
				  dataSource: managers,
				  keyExpr: 'USER_SEQ',
				  searchPanel: {
				        visible: true,
				        width: 240,
				        placeholder: 'Search...',
				  },
				  selection: {mode: 'multiple',showCheckBoxesMode:'always',},
				  columns: createColumnsUserList(),
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
		    	  text: '확인',
		    	  onClick() {
		    		  var selectedText='';
		    		  var selectedcount=0;
		    		  var grid = $('#userlist').dxDataGrid('instance');
		    		  if(grid.getSelectedRowsData()){
		    			  selectedText = grid.getSelectedRowsData()[0].KOR_NAME;
		    			  selectedcount = grid.getSelectedRowsData().length-1;
		    		  }else{
		    			  
		    			  return;
		    		  }
		    		  const message = `[${selectedText}] 외 ${selectedcount}명을 추가하시겠습니까?`;
		    		  
		    		  var result = DevExpress.ui.dialog.confirm(message, "공지 대상 추가");
		    		  result.done(function(dialogResult) {
		    		        if(dialogResult){
		    		        	addTargetManagers(grid.getSelectedRowsData());
		    		        }
		    		        selectUsersPopup=null;
		    		        $("#selectUsersPopup").dxPopup("dispose");
		    		  });
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
		    		  selectUsersPopup=null;
		    		  $("#selectUsersPopup").dxPopup("dispose");
		    	  },
		      },
		  }],
	}).dxPopup('instance');
}
//공지 대상 선택
const searchTemplate = `<div class="popup_conditions">
	<div class="form-group other_condition" id="searchUForm"></div>
	<div class="form-group buttons">
	<div class="btn-group" id="searchUBtn"></div>
	<div class="btn-group" id="searchUInitBtn"></div>
	</div>
</div><div style="margin-top:5px"><div id="userlist"></div></div>`;
///<div class="subject">강사리스트</div>
const searchContentTemplate = function () {
    return $('<div>').append(searchTemplate);
};
  
//---------------------------------
//조회조건-form items 생성
//---------------------------------
function createItemsSearchCondition() {
	var itemsCondition = [
		{dataField: 'SEARCH_TYPE',editorType: 'dxSelectBox',
			editorOptions: {  
			dataSource:[{text:'사용자명',value:'KOR_NAME'},{text:'사용자ID',value:'USER_ID'}],
			valueExpr: 'value', 
			displayExpr: 'text', 
    	 },
		},
		{dataField: 'SEARCH_KEYWORD',
			editorOptions:{
				placeholder:'2자리 이상 입력',
				inputAttr: {class: "srchkeyword"},
				width: '100%'
			}
	
		},
		{dataField: 'SEARCH_ORG',editorType: 'dxSelectBox',
			editorOptions: {  
				dataSource:[{text:'전체 부서',value:''},{text:'부서1',value:'org1'},{text:'부서2',value:'org2'}],
				valueExpr: 'value', 
				displayExpr: 'text', 
			},
		},
		
		];
   
   return itemsCondition;
}

function createColumnsUserList() 
{
	var resultColumns = {};

	resultColumns = [{dataField: 'USER_ID',caption: '사용자ID'},
					 {dataField: 'KOR_NAME',caption: '사용자명'},
					 {dataField: 'DEPT_NM',caption: '부서명'},
					 {dataField: 'ORG_NM',caption: '직급'},
					 {dataField: 'TEL_NO',caption: '휴대전화'}];
	
	return resultColumns;
}
   

