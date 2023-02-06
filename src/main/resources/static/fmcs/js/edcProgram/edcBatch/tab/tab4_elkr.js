//전자키발권
let tab4Form=null;
let tab4formData=null;
function CreateTab4Init()
{
	if(tab4Form!= null){
		return;
	}
	tab4formData={
		EDC_KEY_YN:'0',
		EDC_KEY_LOCATION:'0',
		EDC_KEY_TIME:'0',
		
	}
	tab4Form = $('#Keyform').dxForm({
		formData:tab4formData,
		showColonAfterLabel: false,
		colCount:10,
	    items: [
	    	{label: {visible:false},cssClass:'grp_low_height',
				editorType: 'dxCheckBox',
				editorOptions:{
					text:'전자키 발권 여부',
					value:false,
				}
			},
	    	{dataField:'EDC_KEY_YN', label: {visible:false},editorType:'dxSelectBox',
	    		editorOptions:{
	    			dataSource:key_use_gbn, valueExpr: 'value',displayExpr: 'text',
	    		}
	    	},
	    	{label: {visible:false},cssClass:'grp_low_height',
				editorType: 'dxCheckBox',
				editorOptions:{
					text:'발권위치',
					value:false,
				}
			},
			{dataField:'EDC_KEY_LOCATION',label: {visible:false},editorType:'dxSelectBox',
	    		editorOptions:{
	    			dataSource:key_place_gbn, valueExpr: 'value',displayExpr: 'text',
	    		}
			},
			{label: {visible:false},cssClass:'grp_low_height',
				editorType: 'dxCheckBox',
				editorOptions:{
					text:'전자키이용타임설정',
					value:false,
				}
			},
			
			{dataField:'EDC_KEY_TIME',label: {visible:false},editorType:'dxSelectBox',
				editorOptions:{
					dataSource:key_time_gbn, valueExpr: 'value',displayExpr: 'text',
				}
			 },
			 {itemType:'empty',colSpan:3},
			 {	  
				 itemType: 'button',
				 buttonOptions: {
					 text: '일괄적용하기',
				     type: 'success',
				     useSubmitBehavior: true,
				 },
			},
			{colSpan:9,template:function(data, itemElement){gridAgeDanTemplate(data, itemElement)}},
	    	
		],
		/*onInitialized: function(e) {
			var customHandlerInit = function (data) {
				
				var orgData = e.component.option("formData");
				var bDisabled = orgData.EDC_KEY_YN=='0' ? true:false; 
				e.component.getEditor("EDC_KEY_LOCATION").option("disabled", bDisabled);  
				e.component.getEditor("EDC_KEY_TIME").option("disabled", bDisabled);
				
			}
			e.component.on("contentReady", customHandlerInit);
		},
		onFieldDataChanged: function (e) {
			
			if(e.dataField=='EDC_KEY_YN'){ 
				e.component.repaint();
			}
		}*/
	}
	).dxForm("instance");
}


const orgArgStore5 = new DevExpress.data.ArrayStore({
    key: 'AGE_CD',
    data: AGE_ITEMS
});
function  gridAgeDanTemplate(data, itemElement) {
	itemElement.append( $("<div id='tab5_lockerGrid'>").dxDataGrid({
		dataSource: orgArgStore5,
		width:'100%',
		showBorders: true,
		allowColumnResizing: true,
		focusedRowEnabled: true,
		focusedRowIndex: 0,
		selection: {mode: 'multiple',showCheckBoxesMode:'always',},
		editing: {
		      mode: 'batch',
		      allowUpdating: true,
		      selectTextOnEditStart: true,
		      startEditAction: 'click',
		    },
		scrolling: {rowRenderingMode: 'virtual',},
		columns: createLockerColumns(),
		onToolbarPreparing: function (e) {  
			e.toolbarOptions.visible = false;  
			/*var toolbarItems = e.toolbarOptions.items;  
		    $.each(toolbarItems, function (_, item) {  
		        if (item.name == "saveButton" ) {//|| item.name == "revertButton"  
		            item.visible = false;  
		        }  
		    });*/  
		}  
		})
    );
}
function createLockerColumns(){
	var resultColumns = {};
	
	resultColumns = [
		{dataField: 'AGE_CD',caption: '연령구분코드',allowEditing:false,visible:false},
		{dataField: 'AGE_NAME',caption: '연령구분명',alignment: 'center',allowEditing:false,},
		{dataField: 'AGE_START',caption: '시작나이' , dataType: "number",showEditorAlways: true,
			editorOptions:{
				showSpinButtons: true,
			},
	        validationRules: [{
	        	type: "required"
		    }],
	        
	    },
		{dataField: 'AGE_END',caption: '종료나이', dataType: "number",showEditorAlways: true,
	        	editorOptions:{
					showSpinButtons: true,
				},
		        validationRules: [{
		        	type: "required"
			    }],
		    
		 },
		{dataField: 'AGE_DAN',caption: '단수설정',showEditorAlways: true,
			lookup: {
		          dataSource: dan_gbn,
		          displayExpr: 'text',
		          valueExpr: 'value',
		        },},
		
		];
	return resultColumns;
}