const userSearchTemplate = `
<div id="userSearchTemplate">
	<div class="popup-condition-area row">
		<div class="form-group other-condition col-11"></div>
		<div class="form-group buttons">
			<div class="btn-group user-search-btn"></div>
			<div class="btn-group user-refresh-btn"></div>
		</div>
	</div>
	<div>
		<div class="user-search-grid"></div>
	</div>
</div>`;

var userToolTipTemplate = `<div style="text-align:left;">
	<ul style="margin:0;padding-left:10px">
		<li>휴대전화:	<@=hp@></li>
		<li>생년월일:	<@=birth@></li>
	</ul>
</div>`;

var popUserSearch = null;
var userSearchCallback = null;

/**
 * 회원검색 공통 폼
 * 기존폼의 items에 삽입할때 spread operator 사용하여 ...createCommonUserSearchItem 와 같이 선언함
 * @param popupSelector 검색 팝업
 * @param formSelector 회원명 소유 폼
 * @param idx 두개 이상 폼 사용할때 연번
 * @returns
 */
function createCommonUserSearchItem(popupSelector, formSelector, idx) {
	if (idx) {
		selectorIdx = idx;
	} else {
		selectorIdx = 1;
	}
	
	if ($(".row_title").length > 0) {
		if ($("#userSerchTooltip" + selectorIdx).length < 1) {
			$(".row_title").eq(0).before("<div id='userSerchTooltip" + selectorIdx + "'></div>");
		} 
	}
	
	return [{dataField: 'USER_NAME', label: {text: '회원명'}, editorType:"dxTextBox", editorOptions:{
	    buttons: [{
	        name: 'btnSearchPlus' + selectorIdx,
	        location: 'after',
	        options: {
	       		template: '<i idx=' + selectorIdx + ' class="nav-icon fas fa-search-plus">',
	        	type: 'default',
	        	onClick(e) {
					var setIdx = $(e.element).find("i").attr("idx");
					
					createUserSearchPopup(popupSelector, $(formSelector).dxForm("instance").option("formData"), function(data) {
						if (data && data.USER_NO) {
							setFormData($(formSelector), data);
							$(formSelector).dxForm("instance").itemOption("USER_NAME", "visible", false);
							$(formSelector).dxForm("instance").itemOption("SEARCH_NAME", "visible", true);
							try {
								$(formSelector).dxForm("instance").getEditor("SEARCH_NAME").option("value", data.USER_NAME + "(" + data.USER_NO + ")");
							}catch(e) {}
							
							$('#userSerchTooltip' + setIdx).dxTooltip({
								target: ".common-user-search-name" + setIdx,
								showEvent: 'mouseenter',
								hideEvent: 'mouseleave',
								hideOnOutsideClick: true,
								contentTemplate(contents) {
									var result = _.template(userToolTipTemplate)({ hp: data.USER_HP, birth: data.USER_BIRTH });
									contents.html(result);
								},
							});
						}
					});
	        	},
	        },
	      }]
	 	},
	}, {
		dataField: 'SEARCH_NAME', label: { text: '회원명' }, editorType: "dxTextBox", cssClass: "common-user-search-name" + selectorIdx, editorOptions: {
			buttons: [{
				name: 'btnSearchMinus',
				location: 'after',
				options: {
					template: '<i idx=' + selectorIdx + ' class="dx-icon-small dx-icon dx-icon-clear"></i>',
					type: 'normal',
					stylingMode: 'text',
					disabled: false,
					onClick(e) {
						var setIdx = $(e.element).find("i").attr("idx");
						setFormData($(formSelector));
						$(formSelector).dxForm("instance").getEditor("SEARCH_NAME").option("value", "");
						$(formSelector).dxForm("instance").itemOption("SEARCH_NAME", "visible", false);
						$(formSelector).dxForm("instance").itemOption("USER_NAME", "visible", true);
						$("#userSerchTooltip" + setIdx).dxTooltip("dispose");
					},
				},
			}],
			readOnly: true,
		},
		visible: false,
	}];
}

/**
 * 회원검색 공통 팝업
 * @param selector 검색 팝업
 * @param conditionFormData 검색 조건 소유 폼
 * @param callback 팝업 닫기 callback 메서드
 * @returns
 */
function createUserSearchPopup(selector, conditionFormData, callback) {
	if (popUserSearch){
		popUserSearch = null;
		$(selector).dxPopup("dispose");
	}
	
	if (callback) {
		userSearchCallback = callback;		
	}
	
	popUserSearch = $(selector).dxPopup({
		contentTemplate: $('<div>').append(userSearchTemplate),
		visible: true,
		title: '회원검색',
		width:900,
        height:700,
		position: {
			my: 'center',
			at: 'center',
			of: window
		},
		dragEnabled: true,
		onShown() {
			createUserSearchCondition(conditionFormData);
			createUserSearchGrid();
		},
		toolbarItems: [{
			widget: 'dxButton',
		    toolbar: 'bottom',
		    location: 'after',
		    options: {
		    	text: '닫기',
		    	onClick() {
		    		popUserSearch.hide();
				},
			},
		}],
	}).dxPopup('instance');
}

function createUserSearchCondition(conditionFormData) {

	
	var colCondition = [];
	colCondition.push({dataField: 'USER_NAME', label: {text: '회원명',}, editorOptions:{
			placeholder: '회원명 2자리 이상 입력',
		}
	});
	colCondition.push({dataField: 'USER_BIRTH', label: {text: '생년월일',}, editorOptions:{ 
			placeholder: '- 없이 전체 8자리 입력',
		}
	});
	colCondition.push({dataField: 'USER_HP', label: {text: '휴대전화',}, editorOptions:{  
			placeholder: '- 없이 전체 번호 입력',
		}
	});
	
	$('#userSearchTemplate .other-condition').dxForm({
	    colCount: 3,
	    showColonAfterLabel: false,
	    formData: conditionFormData,
	    items: colCondition,
	});
	
	$('#userSearchTemplate .user-search-btn').dxButton({
		stylingMode: 'contained',
		template: '<i class="nav-icon fas fa-search"></i>',
		type: 'default',
		onClick() {
			
		},
	});
	$('#userSearchTemplate .user-refresh-btn').dxButton({
		stylingMode: 'contained',
		icon:'clear',
		type: 'default',
		elementAttr: {
			class: "btnRefresh"
		},
		onClick() {
			$('#userSearchTemplate .other-condition').dxForm("instance").resetValues();
		},
	});	
}

function createUserSearchGrid() {
	var userSearchList = lecListJoin.filter(function(item1, idx1) {
		return lecListJoin.findIndex(function(item2, idx2) {
			return item1.USER_NO == item2.USER_NO;
		}) == idx1;
	});
		
	$('#userSearchTemplate .user-search-grid').dxDataGrid({
		allowColumnReordering: true,
		allowColumnResizing: true,
		columnAutoWidth: true,
		showBorders: true,
		columnFixing: {enabled: true},
		columnChooser: {
			enabled: true,
		    allowSearch: true,
		},
		focusedRowEnabled: true,
		focusedRowIndex: 0,
		dataSource: userSearchList,
		keyExpr: 'USER_NO',
		searchPanel: {
			visible: true,
		    width: 240,
		    placeholder: 'Search...',
		},
		columns: getUserSearchColumnList(),
		scrolling: {
			rowRenderingMode: 'virtual',
		},
		paging: {
			pageSize: 20,
		},
		pager: {
			visible: true,
		    showInfo: true,
		    infoText: "총 {2}건   {0}/{1}",
		    showNavigationButtons: true,
		},
	});
}

function getUserSearchColumnList() {
	var resultColumn = {};
	
	resultColumn = [{
		dataField: 'USER_NO',
		width: 110,
		caption: '회원번호',
		fixed: true,
		cellTemplate: function(element, options) {
			if (userSearchCallback) {
				$('<a>' + options.value + '</a>')
	       			.attr('href', "javascript:userSearchCallback(" + JSON.stringify(options.data) + "); popUserSearch.hide();")
	       			.appendTo(element);				
			}
		}		
	}, {
		dataField: 'USER_NAME',
		width: 90,
		caption: '회원명',
		fixed: true,	
	}, {
		dataField: 'USER_GENDER',
		width: 90,
		caption: '성별',					
	}, {			
		dataField: 'USER_HP',
		width: 110,
		caption: '휴대전화',
	}, {
		dataField: 'USER_BIRTH',
		width: 80,
		caption: '생년월일',
	}, {
		dataField: 'USER_REG_DT',
		width: 80,
		caption: '가입일',		
	}, {
		dataField: 'USER_ID',
		width: 90,
		caption: '웹아이디',			
	}, {
		dataField: 'USER_POST',
		width: 80,
		caption: '우편번호',
	}, {
		dataField: 'USER_ADDRESS',
		width: 140,
		caption: '주소',
	}, {
		dataField: 'USER_CAR_NO',
		width: 80,
		caption: '차량번호',		
	}, {		
		dataField: 'USER_PRIVACY_YN',
		width: 80,
		caption: '개인정보동의',	
	}, {		
		dataField: 'USER_SEND_YN',
		width: 80,
		caption: '알림수신동의',	
	}, {		
		dataField: 'USER_REG_TYPE',
		width: 80,
		caption: '가입경로',	
	}, {		
		dataField: 'USER_TYPE',
		width: 80,
		caption: '회원구분',							
	}];
	
	resultColumn = setColumnAlignment(resultColumn);
	return resultColumn;
}	