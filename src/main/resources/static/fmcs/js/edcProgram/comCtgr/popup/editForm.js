function createItemsDetailForm() 
{
	var resultItems = {};
	
	resultItems= [
		 {
		      itemType: 'group',
		      colCount: 1,
		      colSpan: 2,
		      items: [{dataField:'PRNCTGCD_NM',label: {text: '상위분류명',},
		    	  editorOptions: {
		    	     readOnly: true,
		    	     inputAttr: {class: "readOnly"}
		      }}],
		    }
		,{
        itemType: 'group',
        colCount: 1,
        colSpan: 2,
        items: [
        	{dataField: 'CTGNM',
         		 validationRules: [{
     	         type: 'required',
     	         message: '분류명 필수',
     	       }]},
        	 {dataField: 'USE_YN', editorType: 'dxSelectBox',
         	      editorOptions: {
         	    	  width:200,
         	    	  dataSource:use_gbn,
		        	  valueExpr: 'value', 
		        	  displayExpr: 'text',
		        	  value: 'Y',
         	       },
         	       validationRules: [{
         	         type: 'required',
         	         message: 'Position is required',
         	       }],
         	 },{dataField: 'CTGDESC',editorType: 'dxTextArea',editorOptions: {height: 100,},}],
      }, ];
	
	return resultItems;
}