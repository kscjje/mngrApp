const familyFormTemplate = `
<div id="familyFormTemplate" class="popup-condition-area row">
	<div class="form-group other-condition col-10"></div>
	<div class="form-group buttons">
		<div class="btn-group user-search-btn"></div>
		<div class="btn-group user-refresh-btn"></div>
	</div>
</div>`;

var popFamilyForm = null;

function createFamilyFormPopup(selector, callback) {
	if (popFamilyForm){
		popFamilyForm = null;
		$(selector).dxPopup("dispose");
	}
	
	popFamilyForm = $(selector).dxPopup({
		contentTemplate: $('<div>').append(familyFormTemplate),
		visible: true,
		title: '가족회원 관리',
		width:600,
        height:350,
		position: {
			my: 'center',
			at: 'center',
			of: window
		},
		dragEnabled: true,
		onShown() {
			createFamilyFormCondition();
		},
		toolbarItems: [{
			widget: 'dxButton',
		    toolbar: 'bottom',
		    location: 'after',
		    options: {
		    	text: '확인',
		    	onClick() {
					if(callback) {
						var familyFormData = popFamilyForm.option("formData");
						callback(JSON.stringify(familyFormData));
					}
		    		popFamilyForm.hide();
				},
			},
		}, {
			widget: 'dxButton',
		    toolbar: 'bottom',
		    location: 'after',
		    options: {
		    	text: '취소',
		    	onClick() {
		    		popFamilyForm.hide();
				},
			},
		}],
	}).dxPopup('instance');
}

function createFamilyFormCondition() {
	var colCondition = [];
	
	colCondition.push({dataField: 'USER_NO', label: { text: '회원번호', },
		editorOptions: {
			readOnly: true,
		},
	});
	colCondition.push({dataField: 'USER_NAME', label: {text: '회원명',},});	
	colCondition.push({
		dataField: 'FML_TYPE', label: {text: '관계'}, editorType: "dxSelectBox", editorOptions: {
			dataSource: new DevExpress.data.ArrayStore({
				data: familyType,
				key: 'ID',
			}),
			displayExpr: 'NAME',
			valueExpr: 'ID',
			value: '자',
			searchEnabled: true,
		}
	});	
	colCondition.push({
		dataField: 'FML_APP_YN', label: {text: '온라인대리접수'}, editorType: "dxSelectBox", editorOptions: {
			dataSource: new DevExpress.data.ArrayStore({
				data: availType,
				key: 'ID',
			}),
			displayExpr: 'NAME',
			valueExpr: 'ID',
			value: '가능',
			searchEnabled: true,
		}
	});	
	
	$('#familyFormTemplate .other-condition').dxForm({
	    colCount: 2,
	    showColonAfterLabel: false,
	    items: colCondition,
	});
	
	$('#familyFormTemplate .user-search-btn').dxButton({
		stylingMode: 'contained',
		template: '<i class="nav-icon fas fa-search-plus"></i>',
		type: 'default',
		onClick() {
			createUserSearchPopup("#userPopup2", $('#familyFormTemplate .other-condition').dxForm("instance").option("formData"), function(data) {
				if (data) {
					setFormData($('#familyFormTemplate .other-condition'), data);		
				}
			});
		}
	});
	$('#familyFormTemplate .user-refresh-btn').dxButton({
		stylingMode: 'contained',
		icon:'clear',
		type: 'default',
		elementAttr: {
			class: "btnRefresh"
		},
		onClick() {
			$('#familyFormTemplate .other-condition').dxForm("instance").resetValues();
		},
	});	
}
