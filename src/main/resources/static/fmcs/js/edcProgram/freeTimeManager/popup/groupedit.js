//자유이용시간표 그룹
var groupPopup=null;
var groupForm=null;
function CreateGroupPopup(newGroup)
{
	if(groupPopup){
		groupPopup=null;
		$("#groupedit_popup").dxPopup("dispose");
		
	}
	groupPopup=$("#groupedit_popup").dxPopup({
		contentTemplate: groupFreeTimeTemplate,
		visible: true,
		title: '그룹' + (newGroup ? '등록':'수정'),
		width:700,
        height:300,
		position: {
			my: 'center',
		    at: 'center',
		    of: window
		},
		dragEnabled: true,
		onShown(){
			$('#groupFreeTimeMainForm').dxForm("instance").validate();
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
			    		groupPopup.hide();
			    		groupPopup=null;
			    		$("#groupedit_popup").dxPopup("dispose");
			    	},
			    },
		}],
	}).dxPopup('instance');
}
const groupFreeTimeTemplate = function () {
	 const content = $("<div />");
	 content.append(
			 $("<div id='groupFreeTimeMainForm'>").dxForm({
				 colCount: 8,
				 showColonAfterLabel: false,
				 cssClass:"style3_right",
				 items:[
					 {colSpan:8,label:{text:'시간표그룹명'},editorType: 'dxTextBox',
						 validationRules: [{
			     	         type: 'required',
			     	         message: '시간표그룹명 필수',
			     	       }]
					 },
					 {colSpan:8,label:{text:'요일'},name:'weekgroup',editorType: 'dxRadioGroup',
						 editorOptions:{
							 dataSource:week_gubn,
							 layout:'horizontal', 
							 valueExpr: 'value', 
							 displayExpr: 'text',
							 value: '0',
							 onValueChanged(data) {
						        	//weekValueChanged(data.value);	
						     },
						 }
					 },
					 {name:'WEEK_MON',label:{visible:false},editorType: 'dxCheckBox',editorOptions: {value: true,text: '월',}},
					 {name:'WEEK_TUE',label:{visible:false},editorType: 'dxCheckBox',editorOptions: {value: true,text: '화',}},
					 {name:'WEEK_WED',label:{visible:false},editorType: 'dxCheckBox',editorOptions: {value: true,text: '수',}},
					 {name:'WEEK_THU',label:{visible:false},editorType: 'dxCheckBox',editorOptions: {value: true,text: '목',}},
					 {name:'WEEK_FRI',label:{visible:false},editorType: 'dxCheckBox',editorOptions: {value: true,text: '금',}},
        			 {name:'WEEK_SAT',label:{visible:false},editorType: 'dxCheckBox',editorOptions: {value: true,text: '토',}},
        			 {name:'WEEK_SUN',label:{visible:false},editorType: 'dxCheckBox',editorOptions: {value: true,text: '일',}},
        			 {name:'WEEK_HOLIDAY',label:{visible:false},editorType: 'dxCheckBox',editorOptions: {value: true,text: '공휴일',}},
        			 {colSpan:3,label: {text: '사용여부'},editorType: 'dxSelectBox',
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
