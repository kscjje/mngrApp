const reserveRequirementTemplate = `
<div id="reserveRequirementTemplate">
	<div class="popup-condition-area row">
		<div class="form-group other-condition selected-form-group col-12"></div>
	</div>
</div>`;

var popReserveRequirement = null;

function createReserveRequirementPopup(selector, conditionFormData) {
	if (popReserveRequirement){
		popReserveRequirement = null;
		$(selector).dxPopup("dispose");
	}
	
	popReserveRequirement = $(selector).dxPopup({
		contentTemplate: $('<div>').append(reserveRequirementTemplate),
		visible: true,
		title: '예약자격조건',
		width:400,
        height:400,
		position: {
			my: 'center',
			at: 'center',
			of: window
		},
		dragEnabled: true,
		onShown() {
			createReserveRequirementCondition(conditionFormData);
		},
		toolbarItems: [{
			widget: 'dxButton',
		    toolbar: 'bottom',
		    location: 'after',
		    options: {
		    	text: '닫기',
		    	onClick() {
		    		popReserveRequirement.hide();
				},
			},
		}],
	}).dxPopup('instance');
}

function createReserveRequirementCondition(conditionFormData) {

	
	var colCondition = [];
	colCondition.push({dataField: 'REQ_DAY_CNT', label: {text: '일'}, editorType:'dxNumberBox',
		editorOptions:{
			showSpinButtons: true,
			format: "#,##0 회",
			min:1,
			max:10000,
			step:10,
		},
	});
	colCondition.push({dataField: 'REQ_WEEK_CNT', label: {text: '주'}, editorType:'dxNumberBox',
		editorOptions:{
			showSpinButtons: true,
			format: "#,##0 회",
			min:1,
			max:10000,
			step:10,
		},
	});
	colCondition.push({dataField: 'REQ_MONTH_CNT', label: {text: '월'}, editorType:'dxNumberBox',
		editorOptions:{
			showSpinButtons: true,
			format: "#,##0 회",
			min:1,
			max:10000,
			step:10,
		},
	});
	colCondition.push({dataField: 'REQ_YEAR_CNT', label: {text: '년'}, editorType:'dxNumberBox',
		editorOptions:{
			showSpinButtons: true,
			format: "#,##0 회",
			min:1,
			max:10000,
			step:10,
		},
	});
	
	var colCondition2 = [];
	colCondition2.push({colSpan:2, dataField: 'REQ_DAY_CNT', label: {text: '거주지기준'}, editorType:"dxSelectBox", editorOptions: {
	    dataSource: new DevExpress.data.ArrayStore({
	        data: [{
	  		  ID: '1',
			  NAME: '관내거주',
			}, {
			  ID: '2',
			  NAME: '관외거주',
			},],
	        key: 'ID',
	    }),
	    displayExpr: 'NAME',
	    valueExpr: 'ID',
	    value: '1',
      }
	});
	
	colCondition2.push({colSpan:2, label:{
		template: (data, element) => {
			  let labelText = `<span style="position: absolute;top: 175px;font-weight:400;">감면대상</span>`;
			  element.append(labelText);
			},
		},
		template: function(data, itemElement) {
			itemElement.append($("<div>").attr("id", "dcList").dxDataGrid({
				allowColumnReordering: true,
				allowColumnResizing: true,
				columnAutoWidth: true,
				showBorders: true,
				columnFixing: {enabled: true},
				focusedRowEnabled: true,
				focusedRowIndex: 0,
				dataSource: [
					 {ID:'1',text:'국가유공자',},
					 {ID:'2',text:'장애인',},
				],
				columns: [{		
						visible:false,
						dataField: 'ID',
					}, {		
						dataField: 'text',
					}, 
				],				
				keyExpr: 'ID',
				showColumnHeaders: false,
			}));
		},
	});
	
	$('#reserveRequirementTemplate .other-condition').dxForm({
	    showColonAfterLabel: false,
	    alignItemLabels: true,
		items: [{
			colCount: 2,
			itemType: 'group',
			caption: '예약횟수',		    
		    items: colCondition,
		}, {
			colCount: 1,
			itemType: 'group',
		    items: colCondition2,
		},
		]
	});
}
