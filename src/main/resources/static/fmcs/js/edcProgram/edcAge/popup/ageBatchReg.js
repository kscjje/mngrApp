//연령 일괄 등록
var ageBatchPopup=null;

function CreateAgeBatchPopup()
{
	if(ageBatchPopup){
		ageBatchPopup=null;
		$("#ageBatch_Popup").dxPopup("dispose");
		
	}
	ageBatchPopup=$("#ageBatch_Popup").dxPopup({
		contentTemplate: ageBatchTemplate,
		visible: true,
		title: '연령 일괄 등록',
		width:700,
        height:400,
		position: {
			my: 'center',
		    at: 'center',
		    of: window
		},
		dragEnabled: true,
		onShown(){
			
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
			    		ageBatchPopup.hide();
			    		ageBatchPopup=null;
			    		$("#ageBatch_Popup").dxPopup("dispose");
			    	},
			    },
		}],
	}).dxPopup('instance');
}
const ageBatchTemplate = function () {
	 const content = $("<div />");
	 content.append(
			 $("<div id='ageBatchMainForm'>").dxForm({
				 showColonAfterLabel: false,
				 cssClass:"style3_right",
				 items:[
					 {label:{text:'강좌명'},editorType: 'dxTextBox',editorOptions:{readOnly:true}},
					 {colSpan:12,label: {visible:false}
					    ,template: function (data, itemElement){
					    	var edu_id='';//강좌 id
					    	var fee_id='';//요금 id
					    	gridAgeTemplate('gridBatchAge',edu_id,fee_id,data, itemElement);
					    },
			    	},
        			 ],
			 }));
	
     return content;
};
