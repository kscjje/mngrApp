// 시스템관리 > 사용자관리
//사용자 등록/수정 팝업 FORM
function createMngrDetailForm() {
	var mngrDetailItems = "";
	
	mngrDetailItems = [
		{colSpan: 1, dataField: "AUTH_TYPE", label: {text: "권한그룹"}, editorType: "dxSelectBox",
			editorOptions: {dataSource: auth_gbn,
				layout: "horizontal", valueExpr: "value", displayExpr: "text",
				onInitialized: function (e) {
					if(editmode == "update" && $("#gridList").dxDataGrid("instance").getSelectedRowsData()[0] != undefined)
						e.component.option("value", $("#gridList").dxDataGrid("instance").getSelectedRowsData()[0].AUTH_TYPE);
					else
						e.component.option("value", e.component.option("dataSource")[0].value);
				}
			},
			validationRules: [{
	        	type: 'required',
	        	message: '권한그룹 필수',
	    	}],
		},
		{colSpan: 1, dataField: "USER_CARD", editorType: "dxTextBox", label: {text: "직원카드"},
			validationRules: [{
	        	type: 'required',
	        	message: '직원카드 필수',
	    	}],
	    },
		{colSpan: 1, dataField: "USER_ID", editorType: "dxTextBox", label: {text: "아이디"}, editorOptions:{
		    buttons: [{
		        name: 'addr_type',
		        location: 'after',
		        options: {
		       		text: '중복체크',
		          type: 'default',
		          onClick() {
		          },
		        },
		      }],
			},
			validationRules: [{
	        	type: 'required',
	        	message: '아이디 필수',
	    	}],
	    },
		{colSpan: 1 ,dataField: "USER_NM", label: {text: "이름"},
			validationRules: [{
	        	type: 'required',
	        	message: '이름 필수',
	    	}],
	    },
		{colSpan: 1, dataField: "USER_PW", label: {text: "비밀번호"},
			validationRules: [{
	        	type: 'required',
	        	message: '비밀번호 필수',
	    	}],
	    },
		{colSpan: 1, dataField: "USER_PW2", label: {text: "비밀번호 확인"},
			validationRules: [{
	        	type: 'required',
	        	message: '비밀번호 확인 필수',
	    	}],
	    },
		{colSpan: 1, dataField: "COMCD", label: {text: "소속센터"}, editorType: "dxSelectBox",
			editorOptions: {dataSource: comcd_gbn,
				layout: "horizontal", valueExpr: "value", displayExpr: "text",
				onInitialized: function (e) {
						if(editmode == "update" && $("#gridList").dxDataGrid("instance").getSelectedRowsData()[0] != undefined)
							e.component.option("value", $("#gridList").dxDataGrid("instance").getSelectedRowsData()[0].COMCD);
						else
							e.component.option("value", e.component.option("dataSource")[0].value);
					
					}
			},
			validationRules: [{
	        	type: 'required',
	        	message: '소속센터 필수',
	    	}],
		},
		{colSpan: 1, dataField: "PARTCD", label: {text: "부서"}, editorType: "dxSelectBox",
			editorOptions: {dataSource: part_gbn,
				layout: "horizontal", valueExpr: "value", displayExpr: "text",
				onInitialized: function (e) {
						if(editmode == "update" && $("#gridList").dxDataGrid("instance").getSelectedRowsData()[0] != undefined)
							e.component.option("value", $("#gridList").dxDataGrid("instance").getSelectedRowsData()[0].PARTCD);
						else
							e.component.option("value", e.component.option("dataSource")[0].value);
					
					}
			}
		},
		{colSpan: 1, dataField: "USER_HP", label: {text: "휴대폰번호"}},
		{colSpan: 1, dataField: "USER_TEL", label: {text: "사무실 전화"}},
		{colSpan: 1, dataField: "JOIN_SDATE", label: {text: "입사일"}, editorType: "dxDateBox",},
		{colSpan: 1, dataField: "JOIN_EDATE", label: {text: "퇴사일"}, editorType: "dxDateBox", },
		{colSpan: 1, dataField: "USER_EMAIL", label: {text: "이메일"}},
		{colSpan: 1, dataField: "WORK_STATUS", label: {text: "재직상태"}, editorType: "dxRadioGroup", editorOptions: { layout: "horizontal"}},
		{colSpan: 2, dataField: "BIGO", label: {text: "비고"}},
	]

	return mngrDetailItems;
}
