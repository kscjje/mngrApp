const termsDetailTemplate = `
<div id="termsDetailTemplate">
</div>`;

var popTermsDetail = null;

function createTermsDetailPopup(selector, rowData) {
	if (popTermsDetail){
		popTermsDetail = null;
		$(selector).dxPopup("dispose");
	}
	
	popTermsDetail = $(selector).dxPopup({
		contentTemplate: $('<div>').append(termsDetailTemplate),
		visible: true,
		title: '약관정보 상세',
        width: 1200,
        height: 700,
		position: {
			my: 'center',
			at: 'center',
			of: window
		},
		dragEnabled: true,
		onShown() {
			createBbsDetailForm(rowData);
			editorInit();
		},
		toolbarItems: [{
			widget: 'dxButton',
		    toolbar: 'bottom',
		    location: 'after',
		    options: {
		    	text: '닫기',
		    	onClick() {
		    		popTermsDetail.hide();
				},
			},
		}],
	}).dxPopup('instance');
}

function createBbsDetailForm(rowData) {
	var colCondition = [];
	
	colCondition.push({colSpan:4, dataField: 'TERMS_SJ', label: {text: '제목',},editorType: 'dxTextBox'});
	colCondition.push({colSpan:4, dataField: 'TERMS_VERSION', label: {text: '버전',},editorType: 'dxTextBox'});
	colCondition.push({colSpan:4, dataField: 'TERMS_CN', label: {text: '내용',},editorType: 'dxTextArea',
		editorOptions: { height: 430, inputAttr: {class: "txtEditor"}},
	});
	
	colCondition.push({dataField: 'USE_YN', label: {text: '사용여부'}, editorType:"dxSelectBox",
		editorOptions:{
		    valueExpr: 'ID',
		    displayExpr: 'NAME',	
			items: useType,
    		value: '1', 		
		}, 
	});	
	
	
	
	colCondition.push({dataField: "REGISTER",
		label: {text: '작성자'},
		template: function(data) {
			console.log(data);
			return $("<div>").dxTextBox({
				value: `${rowData.FRST_REGISTER_ID} (${rowData.FRST_REGIST_PNTTM})`,
				readOnly: true,
			});
		},
	});
	
	colCondition.push({dataField: "UPDUSR",
		label: {text: '수정자'},
		template: function(data) {
			console.log(data);
			return $("<div>").dxTextBox({
				value: `${rowData.LAST_UPDUSR_ID} (${rowData.LAST_UPDT_PNTTM})`,
				readOnly: true,
			});
		},
	});	
	
	
	$("#termsDetailTemplate").dxForm({
		showColonAfterLabel: false,
		items: colCondition,
		colCount: 4,
		readOnly: true,
		formData: rowData,
	});
}
