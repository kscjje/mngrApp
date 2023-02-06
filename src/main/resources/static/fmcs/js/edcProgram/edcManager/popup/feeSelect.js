//자유이용시간일괄설정
var feeSelectPopup=null;

function CreateFeeSlectForm()
{
	if(feeSelectPopup){
		feeSelectPopup=null;
		$("#feeReg_popup").dxPopup("dispose");
		
	}
	feeSelectPopup=$("#feeReg_popup").dxPopup({
		contentTemplate: feeSelectTemplate,
		visible: true,
		title: '요금 선택',
		width:800,
        height:500,
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
			    	text: '선택',
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
			    		feeSelectPopup.hide();
			    		feeSelectPopup=null;
			    		$("#feeReg_popup").dxPopup("dispose");
			    	},
			    },
		}],
	}).dxPopup('instance');
}
const feeSelectTemplate = function () {
	//PROGRAM_ITEM
	feeRegFormData={
			
	}
	const content = $("<div />");
	 content.append(
			 $("<div id='feeRegForm'>").dxForm({
				 formData:feeRegFormData,
				 cssClass:"style3_right",
				 showColonAfterLabel: false,
				 items:[
				 {
		    		 template: feeSelectGrid
				 },
		    	]
			}),
	  );

     return content;
};
function feeSelectGrid(){
	return $("<div id='feeSelectGrid'>").dxDataGrid({
		dataSource: FEE_ITEMS,
		keyExpr: 'ITEM_CD',
		width:'100%',
		showBorders: true,
		allowColumnResizing: true,
		focusedRowEnabled: true,
		focusedRowIndex: 0,
		paging: {
	      enabled: false,
		},
		editing: {
	      mode: 'batch',
	      allowUpdating: true,
	      allowDeleting: true,
	      useIcons: true,
	      selectTextOnEditStart: true,
		},
		selection: {mode: 'multiple',showCheckBoxesMode:'always',},
		toolbar: {
			items: [
				{
		          location: 'after',
		          widget: 'dxButton',
		          options: {
		            icon: 'refresh',
		            onClick() {
		              //dataGrid.refresh();
		            },
		          },
		        },
		        
		      ],
		},
	    columns: createFeeColumnsDropDown(false),
	});
}