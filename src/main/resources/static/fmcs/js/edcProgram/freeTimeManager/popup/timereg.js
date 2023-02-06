//자유이용시간표 회차
var timePopup=null;
var timeForm=null;
function CreateTimeForm()
{
	if(timePopup){
		timePopup=null;
		$("#timereg_popup").dxPopup("dispose");
		
	}
	timePopup=$("#timereg_popup").dxPopup({
		contentTemplate: timeFreeTimeTemplate,
		visible: true,
		title: '회차 등록',
		width:500,
        height:350,
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
			    		timePopup.hide();
			    		timePopup=null;
			    		$("#timereg_popup").dxPopup("dispose");
			    	},
			    },
		}],
	}).dxPopup('instance');
}
const timeFreeTimeTemplate = function () {
	 const content = $("<div />");
	 var orgValue1 = '2022-01-01T09:00';
	 var orgValue2 = '2022-01-01T09:50';
	 content.append(
			 $("<div id='timeFreeTimeMainForm'>").dxForm({
				 colCount: 2,
				 showColonAfterLabel: false,
				 cssClass:"style3_right",
				 items:[
					 {colSpan:2,label:{text:'그룹명(요일)'},editorType: 'dxTextBox',disabled:true},
					 {colSpan:2,label:{text:'회차명'},editorType: 'dxTextBox'},
					 {label:{text:'시작 시간'},editorType: 'dxDateBox'
						 ,editorOptions: editorOptionsTimePickerTemplate(orgValue1)
					 },
					 {label:{text:'종료 시간'},editorType: 'dxDateBox'
						 ,editorOptions:  editorOptionsTimePickerTemplate(orgValue2)
					 },
					 {label: {text: '사용여부'},editorType: 'dxSelectBox',
        				 editorOptions: {
        					 dataSource:run_gbn,
						     valueExpr: 'value', 
						     displayExpr: 'text',
						     value: '0',
        				 }	
        			 },
        			 ],
			 }));
	
     return content;
};
