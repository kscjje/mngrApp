//자유이용시간일괄설정
var feeRegPopup=null;
var feeRegForm=null;
var feeRegFormData=null;

function CreateFeeRegForm()
{
	if(feeRegPopup){
		feeRegPopup=null;
		$("#feeReg_popup").dxPopup("dispose");
		
	}
	feeRegPopup=$("#feeReg_popup").dxPopup({
		contentTemplate: feeRegTemplate,
		visible: true,
		title: '요금 등록',
		width:800,
        height:550,
		position: {
			my: 'center',
		    at: 'center',
		    of: window
		},
		dragEnabled: true,
		onShown(){
			//$("#feeRegForm").dxForm("instance").validate();
		},
		toolbarItems: [{
			widget: 'dxButton',
			toolbar: 'bottom',
		    location: 'after',
		    options: {
			    	text: '저장',
			        onClick() {
			    		/*const message = `Email is sent to ${employee.FirstName} ${employee.LastName}`;
			    		DevExpress.ui.notify({
				            message,
				            position: {
				            	my: 'center top',
				            	at: 'center top',
				            },
			    		}, 'success', 3000);*/
			    	},
			    },
		}, {
			widget: 'dxButton',
			toolbar: 'bottom',
		    location: 'after',
		    options: {
			    	text: '취소',
			        onClick() {
			    		feeRegPopup.hide();
			    		feeRegPopup=null;
			    		$("#feeReg_popup").dxPopup("dispose");
			    	},
			    },
		}],
	}).dxPopup('instance');
}
const feeRegTemplate = function () {
	//PROGRAM_ITEM
	feeRegFormData={
		ITEM_CD:'aaaa' ,//요금코드 
		PART_CD:'0001' ,//상품분류
		PART_CD_NM:'수영' ,//상품분류명
		ITEM_NM:'',//요금명
		SALE_AMT:0,//판매금액
		MONTH_CNT:1,//개월수
		USE_CNT_YN:'0',//이용가능횟수차감
		USE_CNT:0,//이용가능횟수
		KIOSK_YN:'0',//키오스크노출
		DISCOUNT_YN:'0',//할인적용
		TAX_YN:'0',//과세/비과세   
		WEB_DISPYN:'0',//온라인		
		USE_YN:'1',//요금사용   
		PKGDCYN:'N',//패키지대상할인여부를 기록한다.	Y : 대상		N : 비대상
		DAY_USE_CNT_YN:'0',
		DAY_USE_CNT:0,
	};
	
	 const content = $("<div />");
	 content.append(
			 $("<div id='feeRegForm'>").dxForm({
				 formData:feeRegFormData,
				 cssClass:"style3_right",
				 colCount: 2,
				 showColonAfterLabel: false,
				 onInitialized: function(e) {
					 var customHandlerInit = function (e) {
						 var orgData = e.component.option("formData");
						e.component.getEditor("USE_CNT").option('disabled',  orgData.USE_CNT_YN == '0' ? true:false);
						
					 }
					e.component.on("contentReady", customHandlerInit);
				},
				onFieldDataChanged: function (e) {
					//e.component.beginUpdate();
					//e.component.endUpdate();
					if(e.dataField=='USE_CNT_YN'){ 
						e.component.getEditor("USE_CNT").option('disabled',  e.value == '0' ? true:false);
					}
					
				},
				items:[
					{dataField:'USE_YN',label: {text: '요금사용',template: boldLabelTemplate},
						editorType:'dxSelectBox',
				    	editorOptions:{
				    		dataSource:use_gbn, valueExpr: 'value',displayExpr: 'text'}
				    },
				    {dataField:'WEB_DISPYN',label: {text: '온라인공개',template: boldLabelTemplate},
				    	editorType:'dxSelectBox',
				    	editorOptions:{
				    		dataSource:online_gbn, valueExpr: 'value',displayExpr: 'text'}
				    },
				    {itemType:'empty'},
				    {dataField:'KIOSK_YN',label: {text:'키오스크노출',template: boldLabelTemplate},
				    	editorType:'dxSelectBox',
				    	editorOptions:{
				    		dataSource:view_gbn, valueExpr: 'value',displayExpr: 'text',}
				    },
				    { dataField:'ITEM_CD', label: {text:'요금코드'},editorType:'dxTextBox',
				    	editorOptions:{
				    		disabled: true,
				    		/*elementAttr:{class:'edu-read-only'},*/
				    	}
				    },
			    	{dataField:'PART_CD_NM', label: {text:'운영상품분류'},editorType:'dxTextBox',
				    	/*template:feeRegFormData.PART_CD_NM,*/				    	
			    		editorOptions:{
			    			 disabled: true, 
			    			 /*elementAttr:{class:'edu-read-only'},*/
			    		}
			    	},
			    	{dataField:'ITEM_NM', colSpan: 2,label: {text:'요금명'},editorType:'dxTextBox',
			    		validationRules: [{type: "required",message: "분류 필수 선택"}]
			    	},
			    	{dataField:'SALE_AMT', label: {text:'판매금액'},editorType:'dxNumberBox',
			    		editorOptions:{showSpinButtons: true,format: "#,##0",}
			    	},
			    	{dataField:'MONTH_CNT', label: {text:'개월수'},editorType:'dxSelectBox',
			    		editorOptions:{
			    			dataSource:getMonths(), valueExpr: 'value',displayExpr: 'text',}
			    	},
			    	{dataField:'USE_CNT_YN', label: {text:'이용가능횟수차감운영'},editorType:'dxSelectBox',
			    		editorOptions:{
			    			dataSource:counting_gbn, valueExpr: 'value',displayExpr: 'text',}
			    	},
			    	{dataField:'USE_CNT', label: {text:'이용가능횟수'},editorType:'dxNumberBox',
			    		editorOptions:{
			    			showClearButton:false,
			    			showSpinButtons:true,
			    			min:0,
			    		}
			    	},
			    	{dataField:'DISCOUNT_YN', label: {text:'할인적용'},editorType:'dxSelectBox',
			    		editorOptions:{
			    			dataSource:apply_gbn, valueExpr: 'value',displayExpr: 'text'}
			    	},
			    	{dataField:'TAX_YN', label: {text:'과세구분'},editorType:'dxSelectBox',
			    		editorOptions:{
			    			dataSource:tax_gbn, valueExpr: 'value',displayExpr: 'text'}
			    	},
			    	{dataField:'PKGDCYN', label: {text:'패키지할인대상'},editorType:'dxSelectBox',
			    		editorOptions:{
			    			dataSource:target_opt_gbn, valueExpr: 'value',displayExpr: 'text'}
			    	},
			    ],
			}),
	  );

     return content;
 };
 //https://supportcenter.devexpress.com/ticket/details/t823636/form-validation-and-submission-scenarios
 //***https://supportcenter.devexpress.com/ticket/details/t852987/form-how-to-validate-a-form-and-submit-its-data-via-ajax
 //https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Methods/#insertRow
 function onSubmitClick(e) {
     var dxFormInstance = $("#The_form_ID_option").dxForm("instance");
     var validationResult = dxFormInstance.validate();

     if (validationResult.isValid) {
             $.ajax({
                 url: "URL_to_a_controller_method",
                 type: "POST",
                 dataType: "json",
                 data: dxFormInstance.option("formData"),
                 success: function (data) {
                     alert("Success!");
                 },
                 error: function (xhr, textStatus, errorThrown) {
                     alert('Request Status: ' + xhr.status + '; Status Text: ' + textStatus + '; Error: ' + errorThrown);
                 }
             });
     }
     else
         alert("dxForm is invalid");
 }
 //예제..https://codepen.io/markallenramirez/pen/eYGbKJw?editors=0010
function SaveData(){
	 var form = $("#myForm").dxForm("instance");
	 var formData = form.option("formData");
	 
	 if (!rowKey) {
	   var firstRowKey = grid.getKeyByRowIndex(0);
	   var newRowPendingChange = {
	     data: formData,
	     insertBeforeKey: firstRowKey,
	     key: new DevExpress.data.Guid(),
	     type: "insert"
	   };
	   
	   var changes = grid.option("editing.changes");
	   changes.push(newRowPendingChange);
	   grid.option("editing.changes", changes);
	   isNewRow = false;
	 } else {
	   var changes = grid.option("editing.changes");
	   
	   var changedData = {};
	   Object.keys(rowData).forEach(key => {
	     if (rowData[key] !== formData[key]) {
	       changedData[key] = formData[key];
	       console.log(formData[key]);
	     }
	   });
	   
	   var change = changes.find(change => change.key === rowKey);
	   
	   if (change) {
	     change.data = {
	       ...change.data,
	       ...changedData
	     };
	   } else {
	     changes.push({
	       type: "update",
	       key: rowKey,
	       data: {
	         ...changedData
	       }
	     });
	   }
	   
	   grid.option("editing.changes", changes);
	 }
	 
	 form.option("formData", {});
	 popup.hide();
 }