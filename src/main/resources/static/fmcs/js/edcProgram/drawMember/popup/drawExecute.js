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
		title: '추첨하기',
		width:650,
        height:550,
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
			    	text: '추첨하기',
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
	myformData.EDC_PRGMNM = "정기수영 새벽1 중급 [월수반]";
	myformData.EDC_TRAIN_DT = "2022-12";
	myformData.EDC_PCAPA = 20;
	myformData.EDC_NOKORI = '0';
	myformData.EDC_REG_CNT= 50;
	myformData.EDC_REG_CNT2=0;
	
	 const content = $("<div />");
	 content.append(
			 $("<div id='drawTitleForm' class='selected-form-group'>").dxForm({
				 labelMode:'outside',
				 labelLocation: 'top',
				 formData:myformData,
				 showColonAfterLabel: false,
				 items:[
					{
							colCount: 3,
							itemType: 'group',
							caption: '강좌정보',		    
						    items: [
						    	 {colSpan:2,dataField:'EDC_PRGMNM',label:{text:'강좌명'}},
								 {dataField:'EDC_TRAIN_DT',label:{text:'강좌년월'}},
								 {dataField:'EDC_PCAPA',label:{text:'정원'}},
								 {dataField:'EDC_NOKORI',label:{text:'잔여인원'}},
								 {dataField:'EDC_REG_CNT',label:{text:'추첨가능접수인원'}},
						    ],
					 },
					 
				  ],
				  customizeItem(item) {
						if (item && item.dataField) {
							if(item.dataField=='EDC_PCAPA' || item.dataField=='EDC_NOKORI' || item.dataField=='EDC_REG_CNT'){
								item.template = $('<span>').text(toNumberFormat(myformData[item.dataField]));
							}else{
								item.template = $('<span>').text(myformData[item.dataField]);
							}
						}
			        },		
			 })
	);
	 
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
					/*{itemType:'group',label:{ text:'예비당첨비율'},
						items: [
							{dataField:'EDC_TRAIN_DT', label: {text: "정원의"}, editorType: "dxNumberBox", editorOptions: {showSpinButtons: true, min: 0, max: 100, value: 0, format: "##0 (%)"}}
						]
					},
					{itemType:'empty'},*/
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
			    			onValueChanged: function(e) {
			    				var formInstance= $("#drawOptionForm").dxForm("instance");
			    				formInstance.itemOption("EDC_REG_CNT2", "visible", e.value =='2' ? true :false);
			    				
			    			}
			    		}
					},
					//낙첨자선정방법: 대기인원 지정 순번 부여일 경우, 표시 하도록 처리 할 것!!!
					{itemType:'group',colCount:2,
						items:[
							{dataField:'EDC_REG_CNT2', label: {visible:false}, editorType: "dxNumberBox",
								visible:myformData.EDC_NOKORI =='2' ? true :false,
								editorOptions: {showSpinButtons: true, min: 0, max: 999, value: 0, format: "##0 (명)"}},
							{itemType:'empty'},
							]
					}
				  ],
			 })
	);
	 
     return content;
};
