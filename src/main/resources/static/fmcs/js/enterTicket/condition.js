//---------------------------------
//조회조건
//---------------------------------
function createCondition(){
	$('#insCondition').dxForm({
	    colCount: 1,
	    showColonAfterLabel: false,
	    labelMode:'hidden',
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
	
   itemsCondition.push({dataField: 'SEARCH_KEYWORD',label:{text:'검색어'},
	   editorOptions:{
		   inputAttr: {class: "srchkeyword"},
		   width: '100%',
		   placeholder:'이름 또는 핸드폰번호를 입력하세요.'
   		}
   });
   return itemsCondition;
}