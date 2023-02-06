const userFormTemplate = `
<div id="userFormTemplate">
</div>`;

var popUserForm = null;

function createUserFormPopup(selector, editFormData, callback) {
	if (popUserForm){
		popUserForm = null;
		$(selector).dxPopup("dispose");
	}
	
	popUserForm = $(selector).dxPopup({
		contentTemplate: $('<div>').append(userFormTemplate),
		visible: true,
		title: '회원정보',
		width:900,
        height:500,
		position: {
			my: 'center',
			at: 'center',
			of: window
		},
		dragEnabled: true,
		onShown() {
			createUserEditForm(editFormData);
			$('#userFormTemplate').dxForm("instance").validate();
		},
		toolbarItems: [{
			widget: 'dxButton',
		    toolbar: 'bottom',
		    location: 'after',
		    options: {
		    	text: '저장',
		    	onClick() {
		    		DevExpress.ui.notify('저장');
				},
			},
		}, {
			widget: 'dxButton',
		    toolbar: 'bottom',
		    location: 'after',
		    type: 'normal',
		    options: {
		    	text: '취소',
		    	onClick() {
		    		popUserForm.hide();
				},
			},
		}],
	}).dxPopup('instance');
}

function createUserEditForm(editFormData) {
	const confirmYn = [{
		  ID: 'Y',
		  NAME: '동의함',
		}, {
		  ID: 'N',
		  NAME: '동의안함',
		}];
		
	var columns = [];
	columns.push({colSpan:3, dataField: 'USER_NAME', label: {text: '회원성명'},
		validationRules: [{
        	type: 'required',
        	message: '회원명은 필수',
    	}],
	});
	columns.push({dataField: 'USER_GENDER', label: {visible:false}, editorType:"dxSelectBox", editorOptions: {
	    dataSource: new DevExpress.data.ArrayStore({
	        data: [{
	  		  ID: '남',
			  NAME: '남',
			}, {
			  ID: '여',
			  NAME: '여',
			}],
	        key: 'ID',
	    }),
	    displayExpr: 'NAME',
	    valueExpr: 'ID',
	    value: '남',
        searchEnabled: true,
      },
	});
	
	columns.push({colSpan:3, dataField: 'USER_BIRTH', label: {text: '생년월일'}, editorType:"dxDateBox",
	    validationRules: [{
        	type: 'required',
        	message: '생년월일은 필수',
    	}],
	});
	columns.push({dataField: 'USER_BIRTH_TYPE', label: {visible:false}, editorType:"dxSelectBox", editorOptions: {
	    dataSource: new DevExpress.data.ArrayStore({
	        data: [{
	  		  ID: '양력',
			  NAME: '양력',
			}, {
			  ID: '음력',
			  NAME: '음력',
			}],
	        key: 'ID',
	    }),
	    displayExpr: 'NAME',
	    valueExpr: 'ID',
	    value: '양력',
        searchEnabled: true,
      }
	});	
	
	columns.push({colSpan:4, dataField: 'USERREG_DT', label: {text: '등록일자',}, editorType:"dxDateBox",
		editorOptions: {
	  		displayFormat: 'yyyy-MM-dd',
		},	
	    validationRules: [{
        	type: 'required',
        	message: '등록일자는 필수',
    	}],		
	});	
	columns.push({colSpan:4, dataField: 'USER_HP', label: {text: '휴대전화',},
	    validationRules: [{
        	type: 'required',
        	message: '휴대전화는 필수',
    	}],	
	});	
	columns.push({colSpan:4, dataField: 'USER_ID', label: {text: '웹아이디',}, editorType:"dxTextBox",});		
	columns.push({colSpan:4, dataField: 'USER_PRIVACY_YN', label: {text: '개인정보동의',}, editorType:"dxSelectBox", editorOptions: {
	    dataSource: new DevExpress.data.ArrayStore({
	        data: confirmYn,
	        key: 'ID',
	    }),
	    displayExpr: 'NAME',
	    valueExpr: 'ID',
	    value: 'Y',
        searchEnabled: true,
      }
	});	
	columns.push({colSpan:4, dataField: 'USER_TYPE', label: {text: '회원구분',}, editorType:"dxSelectBox", editorOptions: {
	    dataSource: new DevExpress.data.ArrayStore({
	        data: [{
				  ID: '',
				  NAME: '선택안함',
				}],
	        key: 'ID',
	    }),
	    displayExpr: 'NAME',
	    valueExpr: 'ID',
	    value: '',
        searchEnabled: true,
      }
	});	
	columns.push({colSpan:4, dataField: 'USER_SEND_YN', label: {text: '알림수신동의',}, editorType:"dxSelectBox", editorOptions: {
	    dataSource: new DevExpress.data.ArrayStore({
	        data: confirmYn,
	        key: 'ID',
	    }),
	    displayExpr: 'NAME',
	    valueExpr: 'ID',
	    value: 'Y',
        searchEnabled: true,
      }
	});	
	columns.push({colSpan:4, dataField: 'USER_PARENT_YN', label: {text: '보호자발송동의',}, editorType:"dxSelectBox", editorOptions: {
	    dataSource: new DevExpress.data.ArrayStore({
	        data: confirmYn,
	        key: 'ID',
	    }),
	    displayExpr: 'NAME',
	    valueExpr: 'ID',
	    value: 'N',
        searchEnabled: true,
      }
	});	
	columns.push({colSpan:4, dataField: 'USER_PARENT_HP', label: {text: '보호자연락처',},});	
	columns.push({colSpan:4, dataField: 'USER_LAND', label: {text: '거주지구분',}, editorType:"dxSelectBox", editorOptions:{
	    dataSource: new DevExpress.data.ArrayStore({
	        data: [{
				  ID: '',
				  NAME: '선택안함',
				},{
				  ID: '관내거주',
				  NAME: '관내거주',
				},{
				  ID: '관외거주',
				  NAME: '관외거주',
				}],
	        key: 'ID',
	    }),
	    displayExpr: 'NAME',
	    valueExpr: 'ID',
	    value: '',	
		buttons: ['dropDown', {
			name: 'addr_type',
			location: 'after',
			options: {
				text: '거주인증',
				type: 'default',
				disabled: false,
				onClick() {
					DevExpress.ui.notify('거주인증');
				},
			},
		}],	    	
		}
	});
	columns.push({colSpan:4, dataField: 'USER_CAR_NO', label: {text: '차량번호',},});
	columns.push({colSpan:8, dataField: 'USER_ADDRESS', label: {text: '주소',}, editorType:"dxTextBox", editorOptions:{
	    buttons: [{
	        name: 'addr_type',
	        location: 'after',
	        options: {
	       		text: '주소검색',
	          type: 'default',
	          onClick() {
	          },
	        },
	      }],
		}
	});
		
	$('#userFormTemplate').dxForm({
	    colCount: 8,
	    showColonAfterLabel: false,
	    formData: employee,
	    items: columns,
        alignItemLabels: true,
	}); 
	
	setFormData('#userFormTemplate', editFormData);
}
