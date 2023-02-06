//전자키발권
let keyForm=null;
let tab5formData=null;
function CreateTab5Init()
{
	DisplayTab5KeyForm();
	//$("#saveBtn5").dxButton({text: '저장하기',type: 'success',	});
}
function DisplayTab5KeyForm(){
	if(keyForm!= null){
		return;
	}

	tab5formData={
		EDC_KEY_YN:'0',
		EDC_KEY_LOCATION:'0',
		EDC_KEY_TIME:'0',
		
	}
	keyForm = $('#tab5_Keyform').dxForm({
		formData:tab5formData,
		showColonAfterLabel: false,
		colCount:4,
	    items: [
	    	{dataField:'EDC_KEY_YN', label: {text:'전자키 발권 여부'},editorType:'dxSelectBox',
	    		editorOptions:{
	    			dataSource:key_use_gbn, valueExpr: 'value',displayExpr: 'text',
	    		}
	    	},
			{dataField:'EDC_KEY_LOCATION',label: {text:'발권위치'},editorType:'dxSelectBox',
	    		editorOptions:{
	    			dataSource:key_place_gbn, valueExpr: 'value',displayExpr: 'text',
	    		}
			},
			{dataField:'EDC_KEY_TIME',label: {text:'전자키이용타임설정'},editorType:'dxSelectBox',
				editorOptions:{
					dataSource:key_time_gbn, valueExpr: 'value',displayExpr: 'text',
				}
			 },
			 {	  
				 itemType: 'button',
				 buttonOptions: {
					 text: '저장하기',
				     type: 'success',
				     useSubmitBehavior: true,
				 },
			},
			{colSpan:4,template:function(data, itemElement){gridAgeDanTemplate(data, itemElement)}},
	    	
		],
		/*custmizeItem: function(e) {
			if(e.dataField=='EDC_KEY_YN'){ 
				var orgData = e.component.option("formData");
				var bDisabled = orgData.EDC_KEY_YN=='0' ? true:false; 
				e.component.getEditor("EDC_KEY_LOCATION").option("disabled", bDisabled);  
				e.component.getEditor("EDC_KEY_TIME").option("disabled", bDisabled);
			}
		}*/
		onInitialized: function(e) {
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
		}
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
	/*onEditingStart(e) {
		if(e.column.dataField!='AGE_USE'){
			e.cancel=!e.data.AGE_USE;
		}
	},*/
}
function createLockerColumns(){
	var resultColumns = {};
	
	resultColumns = [
		{dataField: 'AGE_USE',width:60,caption: '선택',dataType: 'boolean',},
		{dataField: 'AGE_CD',width:100,caption: '연령구분코드',allowEditing:false,visible:false},
		{dataField: 'AGE_NAME',caption: '연령구분명',alignment: 'center',allowEditing:false,},
		{dataField: 'AGE_START',width:200,caption: '시작나이' , dataType: "number",showEditorAlways: true,
			editorOptions:{
				showSpinButtons: true,
			},
	        validationRules: [{
	        	type: "required"
		    }],	
		},
		{dataField: 'AGE_END',width:200,caption: '종료나이', dataType: "number",showEditorAlways: true,
			editorOptions:{
				showSpinButtons: true,
			},
	        validationRules: [{
	        	type: "required"
		    }],
		},
		{dataField: 'AGE_DAN',width:200,caption: '단수설정',showEditorAlways: true,
			lookup: {
		          dataSource: dan_gbn,
		          displayExpr: 'text',
		          valueExpr: 'value',
		        },},
		
		];
	return resultColumns;
}