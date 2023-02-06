//---------------------------------
//조회조건
//---------------------------------
var frmCondition = {
			ID: '',
			KOR_NAME: '',
			TEL_NO: '',
};
function createCondition(){
	$('#insCondition').dxForm({
	    colCount: 2,
	    showColonAfterLabel: false,
	    labelMode:'hidden',
	    formData: frmCondition,
	    items: createItemsCondition(),
	});
}
//---------------------------------
//조회조건-form items 생성
//---------------------------------
function createItemsCondition() {
	
	var itemsCondition = [];
	/*itemsCondition.push({dataField: 'KOR_NAME', label: {text: '강사명',}, editorOptions:{
			placeholder: '강사명 2자리 이상 입력',
		}
	});
	itemsCondition.push({dataField: 'ID', label: {text: '계정ID',}, editorOptions:{ 
		placeholder: '계정 ID 2자리 이상 입력',
	}
	});
	itemsCondition.push({dataField: 'TEL_NO', label: {text: '휴대전화',}, editorOptions:{  
			placeholder: '- 없이 전체 번호 입력',
		}
	});*/
	
	itemsCondition.push({dataField: 'SEARCH_TYPE',label:{text:'검색구분 선택'},editorType: 'dxSelectBox',
		editorOptions: {  
			dataSource:search_gbn,
			valueExpr: 'value', 
			displayExpr: 'text',
			value: 'KOR_NAME',
			onValueChanged(data) {
			    const $result = $('.srchkeyword');
	
			    if (data.value !== null) {
			        // const selectedItem = data.component.option('selectedItem');
			        //(ID: ${selectedItem.ID}
			    	var tempstr='';
			        if(data.value  == 'KOR_NAME') tempstr='강사명 2자리 이상 입력';
			        if(data.value  == 'ID') tempstr='계정 ID 2자리 이상 입력';
			        if(data.value  == 'TEL_NO') tempstr='- 없이 전체 번호 입력';
			        //$result.attr('placeholder',tempstr);
			        
			        $('#insCondition').dxForm("instance").itemOption("SEARCH_KEYWORD", "editorOptions", { placeholder: tempstr});
			    } else {
			        //$result.attr('');
			    }
			},
		},
   },);
   itemsCondition.push({dataField: 'SEARCH_KEYWORD',label:{text:'검색어'},
	   editorOptions:{
		   inputAttr: {class: "srchkeyword"},
		   width: '100%',
		   placeholder:'강사명 2자리 이상 입력'
   		}
   });
   return itemsCondition;
}