const teamSearchTemplate = `
<div id="teamSearchTemplate">
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

var teamToolTipTemplate = `<div style="text-align:left;">
	<ul style="margin:0;padding-left:10px">
		<li>휴대전화:	<@=hp@></li>
		<li>생년월일:	<@=birth@></li>
	</ul>
</div>`;

var popTeamSearch = null;
var teamSearchCallback = null;

/**
 * 팀검색 공통 폼
 * 기존폼의 items에 삽입할때 spread operator 사용하여 ...createCommonTeamSearchItem 와 같이 선언함
 * @param popupSelector 검색 팝업
 * @param formSelector 팀명 소유 폼
 * @param idx 두개 이상 폼 사용할때 연번
 * @returns
 */
function createCommonTeamSearchItem(popupSelector, formSelector, idx) {
	if (idx) {
		selectorIdx = idx;
	} else {
		selectorIdx = 1;
	}
	
	if ($(".row_title").length > 0) {
		if ($("#teamSerchTooltip" + selectorIdx).length < 1) {
			$(".row_title").eq(0).before("<div id='teamSerchTooltip" + selectorIdx + "'></div>");
		} 
	}
	
	return [{dataField: 'TEAM_NAME', label: {text: '단체(팀)명'}, editorType:"dxTextBox", editorOptions:{
	    buttons: [{
	        name: 'btnSearchPlus' + selectorIdx,
	        location: 'after',
	        options: {
	       		template: '<i idx=' + selectorIdx + ' class="nav-icon fas fa-search-plus">',
	        	type: 'default',
	        	onClick(e) {
					var setIdx = $(e.element).find("i").attr("idx");
					
					createTeamSearchPopup(popupSelector, $(formSelector).dxForm("instance").option("formData"), function(data) {
						if (data && data.USER_NO) {
							setFormData($(formSelector), data);
							$(formSelector).dxForm("instance").itemOption("TEAM_NAME", "visible", false);
							$(formSelector).dxForm("instance").itemOption("SEARCH_TEAM_NAME", "visible", true);
							try {
								$(formSelector).dxForm("instance").getEditor("SEARCH_TEAM_NAME").option("value", data.TEAM_NAME + "(" + data.USER_NO + ")");
							} catch(e) {}
							
							$('#teamSerchTooltip' + setIdx).dxTooltip({
								target: ".common-user-search-name" + setIdx,
								showEvent: 'mouseenter',
								hideEvent: 'mouseleave',
								hideOnOutsideClick: true,
								contentTemplate(contents) {
									var result = _.template(teamToolTipTemplate)({ hp: data.USER_HP, birth: data.USER_BIRTH });
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
		dataField: 'SEARCH_TEAM_NAME', label: { text: '단체(팀)명' }, editorType: "dxTextBox", cssClass: "common-user-search-name" + selectorIdx, editorOptions: {
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
						$(formSelector).dxForm("instance").getEditor("SEARCH_TEAM_NAME").option("value", "");
						$(formSelector).dxForm("instance").itemOption("SEARCH_TEAM_NAME", "visible", false);
						$(formSelector).dxForm("instance").itemOption("TEAM_NAME", "visible", true);
						$("#teamSerchTooltip" + setIdx).dxTooltip("dispose");
					},
				},
			}],
			readOnly: true,
		},
		visible: false,
	}];
}

/**
 * 팀검색 공통 팝업
 * @param selector 검색 팝업
 * @param conditionFormData 검색 조건 소유 폼
 * @param callback 팝업 닫기 callback 메서드
 * @returns
 */
function createTeamSearchPopup(selector, conditionFormData, callback) {
	if (popTeamSearch){
		popTeamSearch = null;
		$(selector).dxPopup("dispose");
	}
	
	if (callback) {
		teamSearchCallback = callback;		
	}
	
	popTeamSearch = $(selector).dxPopup({
		contentTemplate: $('<div>').append(teamSearchTemplate),
		visible: true,
		title: '단체(팀)검색',
		width:900,
        height:700,
		position: {
			my: 'center',
			at: 'center',
			of: window
		},
		dragEnabled: true,
		onShown() {
			createTeamSearchCondition(conditionFormData);
			createTeamSearchGrid();
		},
		toolbarItems: [{
			widget: 'dxButton',
		    toolbar: 'bottom',
		    location: 'after',
		    options: {
		    	text: '닫기',
		    	onClick() {
		    		popTeamSearch.hide();
				},
			},
		}],
	}).dxPopup('instance');
}

function createTeamSearchCondition(conditionFormData) {

	
	var colCondition = [];
	colCondition.push({dataField: 'TEAM_NAME', label: {text: '단체(팀)명',}, editorOptions:{
			placeholder: '팀명 2자리 이상 입력',
		}
	});
	colCondition.push({dataField: 'USER_NAME', label: {text: '대표자명',}, editorOptions:{ 
			placeholder: '대표자명 2자리 이상 입력',
		}
	});
	colCondition.push({dataField: 'USER_HP', label: {text: '휴대전화',}, editorOptions:{  
			placeholder: '- 없이 전체 번호 입력',
		}
	});
	
	$('#teamSearchTemplate .other-condition').dxForm({
	    colCount: 3,
	    showColonAfterLabel: false,
	    formData: conditionFormData,
	    items: colCondition,
	});
	
	$('#teamSearchTemplate .user-search-btn').dxButton({
		stylingMode: 'contained',
		template: '<i class="nav-icon fas fa-search"></i>',
		type: 'default',
		onClick() {
			
		},
	});
	$('#teamSearchTemplate .user-refresh-btn').dxButton({
		stylingMode: 'contained',
		icon:'clear',
		type: 'default',
		elementAttr: {
			class: "btnRefresh"
		},
		onClick() {
			$('#teamSearchTemplate .other-condition').dxForm("instance").resetValues();
		},
	});	
}

function createTeamSearchGrid() {
	var teamSearchList = lecListJoin.filter(function(item1, idx1) {
		return lecListJoin.findIndex(function(item2, idx2) {
			return item1.USER_NO == item2.USER_NO;
		}) == idx1;
	});
		
	$('#teamSearchTemplate .user-search-grid').dxDataGrid({
		allowColumnReordering: true,
		allowColumnResizing: true,
		columnAutoWidth: true,
		showBorders: true,
		columnChooser: {
			enabled: true,
		    allowSearch: true,
		},
		focusedRowEnabled: true,
		focusedRowIndex: 0,
		dataSource: teamSearchList,
		keyExpr: 'USER_NAME',
		searchPanel: {
			visible: true,
		    width: 240,
		    placeholder: 'Search...',
		},
		columns: getTeamSearchColumnList(),
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

function getTeamSearchColumnList() {
	var resultColumn = {};
	
	resultColumn = [{
		dataField: 'USER_NAME',
		caption: '단체(팀)명',
		cellTemplate: function(element, options) {
			if (teamSearchCallback) {
				$('<a>' + options.value + '</a>')
	       			.attr('href', "javascript:teamSearchCallback(" + JSON.stringify(options.data) + "); popTeamSearch.hide();")
	       			.appendTo(element);				
			}
		}		
	}, {
		dataField: 'TEAM_TYPE',
		caption: '단체(팀)분류',
	}, {
		dataField: 'USER_NO',
		width: 110,
		caption: '대표회원번호',					
	}, {			
		dataField: 'USER_HP',
		width: 110,
		caption: '휴대전화',
	}, {
		dataField: 'USER_BIRTH',
		width: 80,
		caption: '창단일',
	}, {
		dataField: 'WHTHRC_YN',
		width: 80,
		caption: '관내구분',
	}, {
		dataField: 'WHTHRC_CNT',
		width: 80,
		caption: '관내자인원',
	}, {
		dataField: 'WHTHRC_ETC_CNT',
		width: 80,
		caption: '관외자인원',		
	}];
	
	resultColumn = setColumnAlignment(resultColumn);
	return resultColumn;
}	