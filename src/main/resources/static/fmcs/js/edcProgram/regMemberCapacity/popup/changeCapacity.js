//정원 변경 팝업
var chgCapaPopup=null;
var popupformData=null;
function CreateChangeCapcityPopup(paramData)
{
	popupformData=paramData;
	if(chgCapaPopup){
		chgCapaPopup=null;
		$("#changeCapacity_popup").dxPopup("dispose");
	}
	chgCapaPopup=$("#changeCapacity_popup").dxPopup({
		contentTemplate: chgCapaTemplate,
		visible: true,
		title: '잔여인원조정',
		width:500,
        height:450,
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
			    		chgCapaPopup.hide();
			    		chgCapaPopup=null;
			    		$("#changeCapacity_popup").dxPopup("dispose");
			    	},
			    },
		}],
		onShown:function(){
			changeCapcityEditorDisabled(paramData.EDC_PNCPA_YN);
        }
	}).dxPopup('instance');
}
const chgCapaTemplate = function () {
	 const content = $("<div />");
	 content.append(
			 $("<div id='chgCapaTitleForm'>").dxForm({
				 labelMode:'outside',
				 formData:popupformData,
				 showColonAfterLabel: false,
				 items:[
					 {dataField:'EDC_PRGMNM',label:{text:'강좌명'},editorType: 'dxTextBox',disabled:true},
				  ],
			 })
	);
	 
	 content.append(
			 $("<div id='chgCapaMainForm'>").dxForm({
				 colCount: 4,
				 formData:popupformData,
				 labelMode:'hidden',
				 showColonAfterLabel: false,
				 items:[
					 {itemType:'empty'},
					 {itemType:'empty'},
					 {dataField:'EDC_PNCPA_YN',colSpan:2,label:{visible:false},editorType: 'dxSelectBox',
						 editorOptions: {  
				    			dataSource:recvcapa_gbn,
				    			valueExpr: 'value', 
				    			displayExpr: 'text',
				    			onValueChanged: function(e) {
				    				changeCapcityEditorDisabled(e.value);
				    			}
						 }
					 },
					 {itemType:'empty'},						 
					 {label:{visible:false},template:'총인원',cssClass:'text-caption'},
					 {template:'온라인 인원',cssClass:'text-caption'},
					 {template:'방문 인원',cssClass:'text-caption'},
					 {template:'정원',cssClass:'text-center'},
					 {dataField:'EDC_PNCPA',editorType: 'dxNumberBox',
						 editorOptions: { disabled:true}},//'총인원-정원'
					 {dataField:'EDC_OPNCPA',editorType: 'dxNumberBox',
						 editorOptions: { disabled:true}},//'온라인-정원'
					 {dataField:'EDC_VPNCPA',editorType: 'dxNumberBox',
						 editorOptions: { disabled:true}},//'방문-정원'
					 {template:'접수',cssClass:'text-center'},
					 {dataField:'TOT_REG_CNT',editorType: 'dxNumberBox',disabled:true,
						 editorOptions: { disabled:true}},//'총인원-접수'
					 {dataField:'TOT_OREG_CNT',editorType: 'dxNumberBox',disabled:true,
						 editorOptions: { disabled:true}},//온라인-접수
					 {dataField:'TOT_VREG_CNT',editorType: 'dxNumberBox',disabled:true,
						 editorOptions: { disabled:true}},//방문-접수
					 {template:'잔여',cssClass:'text-center'},
					 {dataField:'NOKORI_CNT',editorType: 'dxNumberBox',disabled:true,editorOptions: {inputAttr:{class:'text-red'}}},//총인원-잔여
					 {dataField:'ONOKORI_CNT',editorType: 'dxNumberBox',disabled:true,editorOptions: {inputAttr:{class:'text-red'}}},//온라인-잔여
					 {dataField:'VNOKORI_CNT',editorType: 'dxNumberBox',disabled:true,editorOptions: {inputAttr:{class:'text-red'}}},//방문-잔여
				  ],
			 })
	);
	
     return content;
};
function changeCapcityEditorDisabled(valueYN)
{
	var formInstance = $("#chgCapaMainForm").dxForm("instance");
	
	itemOptionsP = formInstance.itemOption("EDC_PNCPA");
	itemOptionsO = formInstance.itemOption("EDC_OPNCPA");
	itemOptionsV = formInstance.itemOption("EDC_VPNCPA");
	
	if(valueYN == '0'){//설정안함 총정원 수정가능
		itemOptionsP.editorOptions.disabled = false;
		itemOptionsO.editorOptions.disabled = true;
		itemOptionsV.editorOptions.disabled = true;
	}else{//온라인/방문 정원 수정
		itemOptionsP.editorOptions.disabled = true;
		itemOptionsO.editorOptions.disabled = false;
		itemOptionsV.editorOptions.disabled = false;
	}
	formInstance.itemOption("EDC_PNCPA", "editorOptions", itemOptionsP.editorOptions);
	formInstance.itemOption("EDC_OPNCPA", "editorOptions", itemOptionsO.editorOptions);
	formInstance.itemOption("EDC_VPNCPA", "editorOptions", itemOptionsV.editorOptions);
}