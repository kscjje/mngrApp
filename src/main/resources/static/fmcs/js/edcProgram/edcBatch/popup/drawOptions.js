//정원 변경 팝업
var drawPopup=null;
var popupformData=null;
function createDrawExecute()
{
	//popupformData=paramData;
	if(drawPopup){
		drawPopup=null;
		$("#draw_Popup").dxPopup("dispose");
	}
	drawPopup=$("#draw_Popup").dxPopup({
		contentTemplate: drawTemplate,
		visible: true,
		title: '추첨 옵션 설정',
		width:650,
        height:400,
		position: {
			my: 'center',
		    at: 'center',
		    of: window
		},
		dragEnabled: true,
		toolbarItems: [{
			widget: 'dxButton',
			toolbar: 'bottom',
		    location: 'after',
		    options: {
			    	text: '설정',
			        onClick() {
			    		/*const message = `Email is sent to ${employee.FirstName} ${employee.LastName}`;
			    		DevExpress.ui.notify({
				            message,
				            position: {
				            	my: 'center top',
				            	at: 'center top',
				            },
			    		}, 'success', 3000);*/
			    		drawPopup.hide();
			    	},
			    },
		}, {
			widget: 'dxButton',
			toolbar: 'bottom',
		    location: 'after',
		    options: {
			    	text: '취소',
			        onClick() {
			    		//$('#drawOptionForm').dxForm('instance').resetValues()();
			    		drawPopup.hide();
			    		drawPopup=null;
			    		$("#draw_Popup").dxPopup("dispose");
			    	},
			    },
		}],
		onShown:function(){
			
        }
	}).dxPopup('instance');
}
const drawTemplate = function () {
	var myformData = {};
	 const content = $("<div />");
	 
	 content.append(
			 $("<div id='drawOptionForm' >").dxForm({
				 labelMode:'outside',
				 labelLocation: 'left',
				 formData:myformData,
				 showColonAfterLabel: false,
				 colCount:2,
				 items:[
					{dataField:'EDC_PRGMNM',label:{text:'추첨알고리즘'},editorType: 'dxSelectBox',
			    		editorOptions: {  
			    			dataSource:drawtype_gbn,
			    			valueExpr: 'value', 
			    			displayExpr: 'text',
			    			value:'0',
			    		},},
					{itemType:'empty'},
					{itemType:'group',label:{ text:'예비당첨비율'},
						items: [
							{dataField:'EDC_TRAIN_DT', label: {text: "정원의"}, editorType: "dxNumberBox", editorOptions: {showSpinButtons: true, min: 0, max: 100, value: 0, format: "##0 (%)"}}
						]
					},
					{itemType:'empty'},
					{dataField:'EDC_PCAPA',label:{text:'우선추첨순위'},editorType: 'dxSelectBox',
			    		editorOptions: {  
			    			dataSource:set_gbn,
			    			valueExpr: 'value', 
			    			displayExpr: 'text',
			    			value:'0',
			    	}},
			    	{itemType:'group',colCount:3,
							items:[
								{colSpan:2,dataField:'PRIORITY_1',label:{text:'1순위'},editorType: 'dxSelectBox',
									editorOptions: {  
						    			dataSource:priority_gbn,
						    			valueExpr: 'value', 
						    			displayExpr: 'text',
						    			value:'0',
									}
								},
								{dataField:'EDC_REG_CNT', label: {visible:false},cssClass:'margin-left-m20', editorType: "dxNumberBox", 
									editorOptions: {width:'100px',showSpinButtons: true, min: 0, max: 100, value: 0, format: "##0 ('%')"}},
								{colSpan:2,dataField:'PRIORITY_2',label:{text:'2순위'},editorType: 'dxSelectBox',
									editorOptions: {  
						    			dataSource:priority_gbn,
						    			valueExpr: 'value', 
						    			displayExpr: 'text',
						    			value:'0',

									}
								},
								{dataField:'EDC_REG_CNT', label: {visible:false},cssClass:'margin-left-m20', editorType: "dxNumberBox"
									, editorOptions: {width:'100px',showSpinButtons: true, min: 0, max: 100,value: 0, format: "##0 ('%')"}},
								{colSpan:2,dataField:'PRIORITY_3',label:{text:'3순위'},editorType: 'dxSelectBox',
									editorOptions: {  
						    			dataSource:priority_gbn,
						    			valueExpr: 'value', 
						    			displayExpr: 'text',
						    			value:'0',
									}
								},
								{dataField:'EDC_REG_CNT', label: {visible:false},cssClass:'margin-left-m20', editorType: "dxNumberBox", 
									editorOptions: {width:'100px',showSpinButtons: true, min: 0, max: 100, value: 0, format: "##0 ('%')"}},
								]
					},
					{dataField:'EDC_NOKORI',label:{text:'낙첨자선정방법'},editorType: 'dxSelectBox',
							editorOptions: {  
			    			dataSource:drawfailtype_gbn,
			    			valueExpr: 'value', 
			    			displayExpr: 'text',
			    			value:'0',
			    			onValueChanged: function(e) {
			    				//var formInstance= $("#regUsers-condition").dxForm("instance");
			    			}
			    		}
					},
					{itemType:'group',colCount:2,
						items:[
							{dataField:'EDC_REG_CNT', label: {visible:false}, editorType: "dxNumberBox", editorOptions: {showSpinButtons: true, min: 0, max: 999, value: 0, format: "##0 (명)"}},
							{itemType:'empty'},
							]
					}
				  ],
			 })
	);
	 
     return content;
};
