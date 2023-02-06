function CreateTab2Init()
{
	//오른쪽 탭(예약안내 컨텐츠 간리) html editor
	//'#gridTrainclass2', classCategories[0];
	$('.cd_contents').dxForm({
		colCount: 1,
	    showColonAfterLabel: false,
	    labelMode:'hidden',
	    items:[
	    	{dataField:'NOTI_CONTEXT',
	    		template : function(cellInfo,container) {
	              	 container.append($('<div>').dxTextArea({
	              		value: cellInfo.value,
	            		inputAttr: { id: 'noti_editor' },
	            	 }));
	            	 CKEDITOR.replace('noti_editor');
	            	 CKEDITOR.on('instanceLoaded', function(e) {e.editor.resize('100%',500)} );
	            	 CKEDITOR.instances.noti_editor.on("change", 
	            		function () {
	            		 //cellInfo.setValue(CKEDITOR.instances.noti_editor.getData());
	            	 	}
	            	 );
	              },
	    		
	    		/*editorType: 'dxTextArea',
	    		editorOptions: {height:500, inputAttr: {id:'noti_editor',class: "txtEditor"},},
	    		*/
	    	},
	    	{dataField:'CTGCD',visible:false},
	    	{itemType: 'button',horizontalAlignment: 'right',
	    		buttonOptions: {
	    			text: '저장하기',
				    type: 'success',
				    useSubmitBehavior: true,
				    onClick() {
							 /* var result = DevExpress.ui.dialog.confirm("<i>Are you sure?</i>", "Confirm changes");
							    result.done(function(dialogResult) {
							        alert(dialogResult ? "Confirmed" : "Canceled");
							    });*/
				    	DevExpress.ui.notify('저장하기');
				    },
	    		}
	    	}
	    ],
	   
	});
	
	//editorInit(422);
}