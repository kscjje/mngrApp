const lectureSearchTemplate = `
<div id="lectureSearchTemplate">
	<div class="popup-condition-area row">
		<div class="form-group lecture-condition col-10"></div>
		<div class="form-group buttons">
			<div class="btn-group user-search-btn"></div>
			<div class="btn-group user-refresh-btn"></div>
		</div>		
	</div>
	<div>
		<div class="lecture-grid"></div>
	</div>
</div>`;

var popLectureSearch = null;
var lectureSearchCallback = null;

/**
 * 강좌검색 공통 팝업
 * @param selector 검색 팝업
 * @param conditionFormData 검색 조건 소유 폼
 * @param callback 팝업 닫기 callback 메서드
 * @returns
 */
function createLectureSearchPopup(selector, conditionFormData, callback) {
	if (popLectureSearch){
		popLectureSearch = null;
		$(selector).dxPopup("dispose");
	}
	
	if (callback) {
		lectureSearchCallback = callback;		
	}
	
	popLectureSearch = $(selector).dxPopup({
		contentTemplate: $('<div>').append(lectureSearchTemplate),
		visible: true,
		title: '강좌검색',
		width:800,
        height:600,
		position: {
			my: 'center',
			at: 'center',
			of: window
		},
		dragEnabled: true,
		onShown() {
			createLecturePaymentCondition();
			createLectureGrid();
		},
		toolbarItems: [{
			widget: 'dxButton',
		    toolbar: 'bottom',
		    location: 'after',
		    options: {
		    	text: '닫기',
		    	onClick() {
		    		popLectureSearch.hide();
				},
			},
		}],
	}).dxPopup('instance');
	
	function createLecturePaymentCondition() {
		var colCondition = [];
		
		colCondition.push({colSpan:1, dataField: 'LEC_CATE_TYPE', label: {visible:false}, editorType:"dxSelectBox", editorOptions: {
		    dataSource: new DevExpress.data.ArrayStore({
		        data: [{
		  		  ID: '1',
				  NAME: '분류선택안함',
				}, {
				  ID: '2',
				  NAME: '운영상품분류',
				}, {
				  ID: '3',
				  NAME: '강좌분류',			  
				}],
		        key: 'ID',
		    }),
		    displayExpr: 'NAME',
		    valueExpr: 'ID',
		    value: '3',
	        searchEnabled: true,
	      }
		});	
		colCondition.push({colSpan:2, dataField: 'CATE_NAMES', label: {visible: false}, editorType:"dxTagBox", editorOptions: {
		    dataSource: new DevExpress.data.ArrayStore({
		        data: [{
		  		  ID: '',
				  NAME: '검색어선택',
				}, {
		  		  ID: '2',
				  NAME: '강좌명',
				}, {
		  		  ID: '3',
				  NAME: '강사명',			  
				}],
		        key: 'ID',
		    }),
		    displayExpr: 'NAME',
		    valueExpr: 'ID',
		    value: '',
	        searchEnabled: true,
	      }
		});	
		colCondition.push({colSpan:1, dataField: 'SEARCH_TYPE', label: {visible:false}, editorType:"dxSelectBox", editorOptions: {
		    dataSource: new DevExpress.data.ArrayStore({
		        data: [{
		  		  ID: '',
				  NAME: '검색어선택',
				}, {
		  		  ID: '2',
				  NAME: '강좌명',
				}, {
		  		  ID: '3',
				  NAME: '강사명',			  
				}],
		        key: 'ID',
		    }),
		    displayExpr: 'NAME',
		    valueExpr: 'ID',
		    value: '',
	        searchEnabled: true,
	      }
		});	
		colCondition.push({colSpan:2, dataField: 'SEARCH_KEYWORD', label: {visible: false},});
		colCondition.push({colSpan:1, dataField: 'LEC_OLD', label: {visible:false}, editorType:"dxSelectBox", editorOptions: {
		    dataSource: new DevExpress.data.ArrayStore({
		        data: [{
		  		  ID: '',
				  NAME: '연령선택',
				}, {
				  ID: '2',
				  NAME: '성인',
				}, {
				  ID: '3',
				  NAME: '청소년',			  
				}],
		        key: 'ID',
		    }),
		    displayExpr: 'NAME',
		    valueExpr: 'ID',
		    value: '',
	        searchEnabled: true,
	      }
		});
		colCondition.push({colSpan:1, dataField: 'LEC_WEEK', label: {visible:false}, editorType:"dxSelectBox", editorOptions: {
		    dataSource: new DevExpress.data.ArrayStore({
		        data: [{
		  		  ID: '',
				  NAME: '수업요일선택',
				}, {
				  ID: '1',
				  NAME: '월요일',
				}, {
				  ID: '2',
				  NAME: '화요일',
				}, {
				  ID: '3',
				  NAME: '수요일',
				}, {
				  ID: '4',
				  NAME: '목요일',
				}, {
				  ID: '5',
				  NAME: '금요일',
				}, {
				  ID: '6',
				  NAME: '토요일',				  
				}],
		        key: 'ID',
		    }),
		    displayExpr: 'NAME',
		    valueExpr: 'ID',
		    value: '',
	        searchEnabled: true,
	      }
		});
		
		var lectureTimes = [{
		  ID: '',
		  NAME: '수업시간선택',
		}];
		
		for (var i=5; i<24; i++) {
			var lectureTime = {};
			lectureTime.ID = i;
			
			if (i > 9) {
				lectureTime.NAME = i + "시";
			} else {
				lectureTime.NAME = "0" + i + "시";
			}
			
			lectureTimes.push(lectureTime);
		}
		
		colCondition.push({colSpan:1, dataField: 'LEC_TIME', label: {visible:false}, editorType:"dxSelectBox", editorOptions: {
		    dataSource: new DevExpress.data.ArrayStore({
		        data: lectureTimes,
		        key: 'ID',
		    }),
		    displayExpr: 'NAME',
		    valueExpr: 'ID',
		    value: '',
	        searchEnabled: true,
	      }
		});	
		colCondition.push({colSpan:2,itemType:'empty'});
		
		$('#lectureSearchTemplate .lecture-condition').dxForm({
		    showColonAfterLabel: false,
		    items: colCondition,  
		    colCount: 3,
		});
		
		$('#lectureSearchTemplate .user-search-btn').dxButton({
			stylingMode: 'contained',
			template: '<i class="nav-icon fas fa-search"></i>',
			type: 'default',
			onClick() {
			  	DevExpress.ui.notify('검색');
			  	
			  	var dataGrid = $('#lectureSearchTemplate .lecture-grid').dxDataGrid("instance");
			  	dataGrid.focus();				
			},
		});
		$('#lectureSearchTemplate .user-refresh-btn').dxButton({
			stylingMode: 'contained',
			icon:'clear',
			type: 'default',
			elementAttr: {
				class: "btnRefresh"
			},
			onClick() {
				$('#lectureSearchTemplate .lecture-condition').dxForm("instance").resetValues();
			},
		});			
	}	
	
	function createLectureGrid() {
		var userSearchList = (lecturePayList2 ? lecturePayList2:lecturePayList);
			
		$('#lectureSearchTemplate .lecture-grid').dxDataGrid({
			allowColumnReordering: true,
			allowColumnResizing: true,
			columnAutoWidth: true,
			showBorders: true,
			columnFixing: {enabled: true},
			focusedRowEnabled: true,
			focusedRowIndex: 0,
			dataSource: userSearchList,
			keyExpr: 'LEC_SEQ',
			columns: getLectureColumnList(),
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
	
	function getLectureColumnList() {
		var resultColumn = {};
		
		resultColumn = [{
			dataField: 'LEC_SEQ',
			caption: '강좌번호',
			visible: false,
		}, {		
			dataField: 'LEC_STATUS',
			width:90,
			caption: '상태',	
			cellTemplate: function(element, info) {
				var tmpl = `<div class='lec_status-tag' style="color:<@=color@>;background-color:<@=background@>;border: 1px solid <@=color@>;"><@=value@></div>`;
				if(info && info.value){
					if (info.value == "접수준비") {
						element.append(_.template(tmpl)({value:info.value, color: "black",background: "#fff"}));
					} else if (info.value == "접수중") {
						element.append(_.template(tmpl)({value:info.value, color: "blue",background: "#fff"}));
					} else {
						element.append(_.template(tmpl)({value:info.value, color: "red",background: "#fff"}));
					}
				}
			}		
		}, {		
			dataField: 'LEC_NAME',
			caption: '강좌명',	
		},
		{		
			dataField: 'INSTR_NAME',
			caption: '강사명',	
		}, 
		{		
			dataField: 'LEC_WEEK',
			width:70,
			caption: '수업요일',	
		}, {		
			dataField: 'LEC_TIME',
			width:90,
			caption: '수업시간',	
		}, {		
			dataField: 'LEC_APP_CNT',
			width:60,
			dataType: "number",
			format: def_numberFormat,
			caption: '정원',	
		}, {		
			dataField: 'LEC_REMAIN_CNT',
			width:130,
			caption: '잔여정원',	
		}];
		
		resultColumn = setColumnAlignment(resultColumn);
		
		return resultColumn;
	}	
}
