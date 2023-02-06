var popLectureDelay = null;

function createLectureDelayPopup(selector, callback) {
	if (popLectureDelay){
		popLectureDelay = null;
		$(selector).dxPopup("dispose");
	}
	
	popLectureDelay = $(selector).dxPopup({
		contentTemplate: eduDelayTemplate,
		visible: true,
		title: '강좌연기신청',
		width:700,
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
		    	text: '강좌 연기신청',
		    	onClick() {
					DevExpress.ui.notify('강좌 연기신청');
				},
			},
		}, {
			widget: 'dxButton',
		    toolbar: 'bottom',
		    location: 'after',
		    options: {
		    	text: '취소',
		    	onClick() {
		    		popLectureDelay.hide();
				},
			},
		}],
	}).dxPopup('instance');
}
const eduDelayTemplate = function () {
	 const content = $("<div />");
	 content.append(
		 $("<div id='eduDelayMainForm'>").dxForm({
			 colCount: 5,
			 //formData:popupformData,
			 showColonAfterLabel: false,
			 items:[
				 {colSpan:2, dataField: 'DLY_REG_DT', label: {text: '연기신청일',}, 
						editorType:"dxDateBox",
						editorOptions: {
					  		displayFormat: 'yyyy-MM-dd',
						},
					},
					{colSpan:3, itemType:'empty'},
					{colSpan:2, dataField: 'DLY_START_DT', label: {text: '연기기간',}, editorType:"dxDateBox",
						editorOptions: {
					  		displayFormat: 'yyyy-MM-dd',
						},
					},
					{colSpan:2, dataField: 'DLY_END_DT', label: {text: '~',}, editorType:"dxDateBox",
						editorOptions: {
					  		displayFormat: 'yyyy-MM-dd',
							onValueChanged(data) {
								var startDt = moment($('#eduDelayMainForm').dxForm("instance").getEditor("DLY_START_DT").option("value"));
								var endDt = moment(data.value);
								var diffDays = endDt.diff(startDt, 'day') + 1;
								
								if (diffDays) {
									$('#eduDelayMainForm').dxForm("instance").itemOption("DLY_END_DT", "helpText", "(" + diffDays + " 일간)");				
								}
						    },	  		
						},
						helpText: '(0 일간)', cssClass:'item-has-helptext',
					},		
					{itemType:'empty'},
					{colSpan:5, dataField: 'CARD_NO', label: {text: '연기사유',},editorType:"dxSelectBox",},	
					{colSpan:5, dataField: 'CARD_MAKE_DESC', label: {text: '비고',},},		
			 ],
		 })
	);
	
    return content;
};
