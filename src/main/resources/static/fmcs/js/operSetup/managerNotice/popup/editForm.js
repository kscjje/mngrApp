//팝업용 데이터
//등록/수정 팝업
function createItemsDetailPopup()
{
	var resultItems= [
		{colSpan:2,dataField: 'TITLE',label: {text: '제목',},
			validationRules: [{type: 'required',message: '제목 필수',}],
		}, 
		{colSpan:2,dataField: 'CNTS',label: {text: '내용',},
			editorType: 'dxTextArea',
            editorOptions: {
                height: 100,
            },
			validationRules: [{type: 'required',message: '내용 필수',}],
		},
		{dataField: 'SDATE',label: {text:'공지일'}},
		{dataField: 'EDATE',label: {text: '~',},},
	    {dataField: 'POP_YN',label: {text: '공지여부', },},
	];
 
	return resultItems;
}
