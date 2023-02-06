var frmCondition = {};
var gridInstance = null;

function formInit() {
	// 조건 생성
	createCondition();
	
	// 그리드 생성
	createDataGrid();
}

function createCondition() {
	var colCondition = [];
	colCondition.push({dataField: 'SEARCH_TYPE', label: {visible:false}, editorType:"dxSelectBox", editorOptions: {
	    dataSource: new DevExpress.data.ArrayStore({
	        data: masterSearchType,
	        key: 'ID',
	    }),
	    displayExpr: 'NAME',
	    valueExpr: 'ID',
	    value: 'N',
      }
	});	
	colCondition.push({colSpan:2,dataField: 'SEARCH_KEYWORD', label: {visible:false}, editorOptions:{ 
			placeholder: '검색할 내용을 입력해주세요',
		}
	});
	
	colCondition.push({dataField: 'TMPL_TYPE', label: {visible:false}, editorType:"dxSelectBox", editorOptions: {
	    dataSource: new DevExpress.data.ArrayStore({
	        data: tmplType,
	        key: 'ID',
	    }),
	    displayExpr: 'NAME',
	    valueExpr: 'ID',
	    value: '',
      }
	});	
	
	colCondition.push({dataField: 'DEL_YN', label: {text: '미사용 게시판 보기',}, editorType:"dxCheckBox",
		editorOptions: {value: false},
	});
	
	
	$('.form-group.condition').dxForm({
	    colCount: 5,
	    showColonAfterLabel: false,
	    items: colCondition,
        alignItemLabels: true,
	});  
	
	$('#searchBtn').dxButton({
		stylingMode: 'contained',
		icon: 'find',
		type: 'default',
		onClick() {
		},
	});
	$('#searchInitBtn').dxButton({
		stylingMode: 'contained',
		icon:'clear',
		type: 'default',
		elementAttr: {
			class: "btnRefresh"
		},
		onClick() {
		},
	});		
}

function createDataGrid() {
	var columnlist = getColumnList();
	//var lectureList = getList();
	
	var masterList = masterListJoin.filter(function(item1, idx1) {
		return masterListJoin.findIndex(function(item2, idx2) {
			return item1.BBS_ID == item2.BBS_ID;
		}) == idx1;
	});
	
	gridInstance = $('.gridContainer').dxDataGrid({
		dataSource: masterList,
		keyExpr: "BBS_ID",
		allowColumnReordering: true,
		allowColumnResizing: true,
		showBorders: true,
		showRowLines: true,
		//columnFixing: {enabled: true},
		loadPanel: {enabled: false},
		scrolling: {mode: "infinite"},
		export: {enabled: true},
		columnChooser: {enabled: true},
		columns: columnlist,
		focusedRowEnabled: true,
	    //selection: {mode: 'multiple',showCheckBoxesMode:'always'},	
		paging: {
			pageSize: 20,
		},
		pager: {
			visible: true,
		    showInfo: true,
		    infoText: "총 {2}건   {0}/{1}",
		    showNavigationButtons: true,
		},
		focusedRowIndex: 0,
		editing: {
		      mode: 'popup',
		      popup: {
		            title: '게시판 관리',
		            showTitle: true,
		            width: 1200,
		            height: 870,
		            onShown:function(){
		            	var frmInstance = $("#editBbs").dxForm("instance");
	       	        	frmInstance.validate();
	       	        	//editorInit();
		            },
		            onHiding:function(){
		            }
		      },
		      form: {
		    	  showColonAfterLabel: false,
		    	  elementAttr: {id: "editBbs"},
		          items: getBoardItems(),
		          colCount: 4,
		      },
		},
		onRowDblClick(e) {
			detailMaster();
		},		
    	onEditingStart: function(e){
    		gridInstance.option("editing.popup.title", "게시판 수정");
    	},
    	onInitNewRow: function(e){
    		gridInstance.option("editing.popup.title", "게시판 등록");
    	}
	}).dxDataGrid('instance');
}

function getBoardItems() {	
	var colCondition = [];
	colCondition.push({colSpan:1, dataField: 'BBS_ID', label: {text: '게시판ID',},editorType: 'dxTextBox'});
	colCondition.push({colSpan:3, dataField: 'NTT_SJ', label: {text: '게시판명',},editorType: 'dxTextBox'});
	colCondition.push({colSpan:4, dataField: 'NTT_CN', label: {text: '게시판 소개내용',},editorType: 'dxTextArea',
		editorOptions: { height: 70 },
	});

	colCondition.push({dataField: 'USE_YN', 
		label: {
			text: '사용여부',
			template: function (data, labelElement) {
				labelElement.append("<div><span class='dx-field-item-label-text boldlabel'>" +data.text +"</span></div>");
			}
		}, 
		editorType:"dxSelectBox",
		editorOptions:{
		    valueExpr: 'ID',
		    displayExpr: 'NAME',	
			items: useType,
    		value: '1', 
//    		itemTemplate(data) {
//    			if (data.ID != "1") {
//    				return `<span style="color:red">${data.NAME}</span>`;
//    			} else {
//    				return data.NAME;
//    			}
//    		},
		}, 
	});
	
	colCondition.push({dataField: 'TMPLAT_ID', label: {text: '게시판 템플릿'}, editorType:"dxSelectBox",
		editorOptions:{
		    valueExpr: 'ID',
		    displayExpr: 'NAME',	
			items: tmplType,
    		value: 'C', 		
		}, 
	});	
	
	colCondition.push({colSpan:2, dataField: 'WRITE_TYPE', label: {text: '글쓰기설정'}, editorType:"dxSelectBox",
		editorOptions:{
		    valueExpr: 'ID',
		    displayExpr: 'NAME',	
			items: writeType,
    		value: '1', 		
		}, 
	});	
	
	colCondition.push({dataField: 'TOP_YN', label: {text: '상단고정'}, editorType:"dxSelectBox",
		editorOptions:{
		    valueExpr: 'ID',
		    displayExpr: 'NAME',	
			items: useType,
    		value: '2', 		
		}, 
	});	
	
	colCondition.push({dataField: 'IMAGE_YN', label: {text: '목록에 이미지 표시'}, editorType:"dxSelectBox",
		editorOptions:{
		    valueExpr: 'ID',
		    displayExpr: 'NAME',	
			items: useType,
    		value: '2', 		
		}, 
	});
	
	colCondition.push({dataField: 'LINK_YN', label: {text: 'URL링크'}, editorType:"dxSelectBox",
		editorOptions:{
		    valueExpr: 'ID',
		    displayExpr: 'NAME',	
			items: useType,
    		value: '2', 		
		}, 
	});
	
	colCondition.push({dataField: 'DISP_YN', label: {text: '게시기간'}, editorType:"dxSelectBox",
		editorOptions:{
		    valueExpr: 'ID',
		    displayExpr: 'NAME',	
			items: useType,
    		value: '2', 		
		}, 
	});
	
	colCondition.push({dataField: 'FILE_YN', label: {text: '첨부파일설정'}, editorType:"dxSelectBox",
		editorOptions:{
		    valueExpr: 'ID',
		    displayExpr: 'NAME',	
			items: useType,
			value: '1',
    		onItemClick(data) {
				if (data.itemData.ID == '2') {
					$("#editBbs").dxForm("instance").getEditor("FILE_CNT").option("disabled", true);
					$("#editBbs").dxForm("instance").getEditor("FILE_SIZE").option("disabled", true);
					$("#editBbs").dxForm("instance").getEditor("FILE_EXT").option("disabled", true);
				} else {
					$("#editBbs").dxForm("instance").getEditor("FILE_CNT").option("disabled", false);
					$("#editBbs").dxForm("instance").getEditor("FILE_SIZE").option("disabled", false);
					$("#editBbs").dxForm("instance").getEditor("FILE_EXT").option("disabled", false);
				}
			},    		
		}, 
	});
	
	colCondition.push({dataField: 'FILE_CNT', label: {text: '첨부파일 갯수'}, editorType:"dxNumberBox",
		editorOptions: {
		    showSpinButtons: true,
		    format: '#,##0',
		},
	});
	
	colCondition.push({dataField: 'FILE_SIZE', label: {text: '첨부파일 용량(MB)'}, editorType:"dxNumberBox",
		editorOptions: {
		    showSpinButtons: true,
		    format: '#,##0',
		},
	});
	colCondition.push({colSpan:1, itemType:'empty'});
	
	colCondition.push({colSpan:3, dataField: 'FILE_EXT', label: {text: '첨부파일 확장자'},});
	colCondition.push({colSpan:1, itemType:'empty'});
	
	
	colCondition.push({colSpan:4, dataField: "ETC_LIST", label: {text: "추가입력항목"}, 
		template: function (data, itemElement) {
			itemElement.append($("<div id='gridEtc'>")
				.dxDataGrid({
					dataSource: DISCOUNT_ITEMS,
					keyExpr: 'DC_CD',
					showBorders: true,
					allowColumnResizing: true,
					focusedRowEnabled: true,
					focusedRowIndex: 0,
			        columns:[
				        {dataField: 'ID', width:100, caption: 'ID'},
				        {dataField: 'ID', caption: '항목영문고유ID'},
				        {dataField: 'ID', caption: '항목유형'},
				        {dataField: 'ID', caption: '항목명'},
				        {dataField: 'ID', width:80, caption: '순서'},
					],
					editing: {
						mode: "row",
						allowAdding: true,
						allowUpdating: true,
						allowDeleting: true,
						useIcons: true, 
					},
			        hoverStateEnabled: true,
			        scrolling: { mode: 'virtual' },
			        height: 205,
			      }
				)
			);
		}},
	);
	
	colCondition.push({colSpan:4, dataField: "CATE_LIST", label: {text: "카테고리"}, 
		template: function (data, itemElement) {
			itemElement.append($("<div id='cateEtc' style='margin-top:5px;'>")
				.dxDataGrid({
					dataSource: DISCOUNT_ITEMS,
					keyExpr: 'DC_CD',
					showBorders: true,
					allowColumnResizing: true,
					focusedRowEnabled: true,
					focusedRowIndex: 0,
			        columns:[
				        {dataField: 'ID', width:100, caption: 'ID'},
				        {dataField: 'ID', caption: '카테고리명'},
				        {dataField: 'ID', width:80, caption: '사용'},
				        {dataField: 'ID', width:80, caption: '순서'},
					],
					editing: {
						mode: "row",
						allowAdding: true,
						allowUpdating: true,
						allowDeleting: true,
						useIcons: true, 
					},
			        hoverStateEnabled: true,
			        scrolling: { mode: 'virtual' },
			        height: 205,
			      }
				)
			);
		}},
	);	

	return colCondition;
}

//상세 보기
function detailMaster(){
	let key = gridInstance.option("focusedRowKey");
	if (!key) return;
	
	let idx = gridInstance.getRowIndexByKey(key);
	let rowData = gridInstance.getDataSource().items()[idx];
	createMasterDetailPopup("#userPopup", rowData);
}
//신규 버튼
function createMaster(){
	gridInstance.addRow();
	gridInstance.deselectAll();
}
//수정 버튼
function updateMaster(){
	let key = gridInstance.option("focusedRowKey");
	if (!key) return;
	
	var idx = gridInstance.getRowIndexByKey(key);
	gridInstance.editRow(idx);
	gridInstance.deselectAll();
}
//삭제 버튼
function deleteMaster(){
	let key = gridInstance.option("focusedRowKey");
	if (!key) return;
	
//	if (gridInstance.getSelectedRowKeys().length == 0){
//		var idx = gridInstance.getRowIndexByKey(key);
//		gridInstance.deleteRow(idx);
//		gridInstance.deselectAll();
//		return;
//	}
	
	showConfirm('삭제하시겠습니까?', "게시판 삭제", 
		function(){
			var selectedRow = _.where(gridInstance.getDataSource().items(), {BBS_ID:key});
			var resultDs = dsRemove(gridInstance.getDataSource(), selectedRow, "BBS_ID");
			gridInstance.option({"dataSource":resultDs, "focusedRowIndex":0});
		}
	);
	
}

function getColumnList() {
	var resultColumn = {};
	
	resultColumn = [{
		dataField: 'BBS_ID',
		width: 110,
		caption: '게시판 ID',
	}, {
		dataField: 'BBS_NM',
		caption: '게시판명',
		cellTemplate: function(element, options) {
			$('<a>' + options.value + '</a>')
       			.attr("href", "javascript:detailMaster();")
       			.appendTo(element);		
		}	
	}, {
		dataField: 'TMPLAT_ID',
		visible: false,
		caption: '템플릿 ID',		
	}, {
		dataField: 'TMPLAT_NM',
		width: 120,
		caption: '템플릿타입',	
	}, {
		dataField: 'FRST_REGISTER_ID',
		width: 120,
		caption: '작성자',
	}, {
		dataField: 'FRST_REGIST_PNTTM',
		width: 160,
		caption: '작성일시',
	}, {
		dataField: 'USE_AT',
		width: 80,
		caption: '사용여부',		
	}, {
		dataField: 'BBS_CNT',
		width: 80,
		caption: '게시글수',	
		dataType: 'number',
	}, {
		dataField: 'LAST_UPDT_PNTTM',
		width: 160,
		caption: '마지막 게시글 등록일시',		
	},];
	
	resultColumn = setColumnAlignment(resultColumn);
	return resultColumn;
}	

