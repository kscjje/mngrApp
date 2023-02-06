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
	        data: searchType,
	        key: 'ID',
	    }),
	    displayExpr: 'NAME',
	    valueExpr: 'ID',
	    value: 'T',
      }
	});	
	colCondition.push({colSpan:2,dataField: 'SEARCH_KEYWORD', label: {visible:false}, editorOptions:{ 
			placeholder: '검색할 내용을 입력해주세요',
		}
	});
	
	colCondition.push({dataField: 'REG_START_DT', label: {text: '작성일',}, editorType:"dxDateBox",});
	colCondition.push({dataField: 'REG_END_DT', label: {text: '~',}, editorType:"dxDateBox",});
	
	colCondition.push({dataField: 'DEL_YN', label: {text: '삭제글 보기',}, editorType:"dxCheckBox",
		editorOptions: {value: false},
	});
	
	
	$('.form-group.condition').dxForm({
	    colCount: 6,
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
	let isNormalBoard = true;
	let columnlist = [];
	let bbsList = [];
	
	//TODO: 구현시 템플릿 ID로 체크로직 변경
	if ($("#MN_BBS_ID").val() === "PHOTO") { // 타일형
		isNormalBoard = false;
		columnlist = getTileList();
		
		bbsList = bbsListJoin.filter(function(item1, idx1) {
			return bbsListJoin.findIndex(function(item2, idx2) {
				return item1.NTT_NO == item2.NTT_NO;
			}) == idx1;
		});
		
		//bbsList.push(...bbsList);
	} else {
		columnlist = getColumnList();
		
		bbsList = bbsListJoin.filter(function(item1, idx1) {
			return bbsListJoin.findIndex(function(item2, idx2) {
				return item1.NTT_NO == item2.NTT_NO;
			}) == idx1;
		});
	}
	
	//var lectureList = getList();
	

	
	gridInstance = $('.gridContainer').dxDataGrid({
		dataSource: bbsList,
		keyExpr: "NTT_NO",
		allowColumnReordering: isNormalBoard,
		allowColumnResizing: isNormalBoard,
		showBorders: isNormalBoard,
		showRowLines: isNormalBoard,
		//columnFixing: {enabled: true},
		loadPanel: {enabled: false},
		scrolling: {mode: "infinite"},
		export: {enabled: isNormalBoard},
		showColumnHeaders: isNormalBoard,
		columnChooser: {enabled: isNormalBoard},
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
		            title: '게시글 관리',
		            showTitle: true,
		            width: 1200,
		            height: 900,
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
			detailBbs();
		},
    	onEditingStart: function(e){
    		gridInstance.option("editing.popup.title", "게시글 수정");
    	},
    	onInitNewRow: function(e){
    		gridInstance.option("editing.popup.title", "게시글 등록");
    	},
//    	dataRowTemplate: function(container, row) {
//    		//console.log(row.data);
//    		var tmpl = `<div class="tileCell">
//    		<div class="img"><img src="${AttachFiles.photoUrl}" style="height: 150px;"></div>
//    		<div class="tit">${row.data.NTT_SJ}</div>
//    		<div class="de">${row.data.FRST_REGIST_PNTTM}</div>
//    		<div class="view"><div>${row.data.FRST_REGISTER_ID}</div><div><i class="fa fa-eye"></i> ${row.data.RDCNT}</div></div>
//    		</div>`;
//    		
//    		container.append(tmpl);    		
//    	},
    	visible: false, 
	}).dxDataGrid('instance');
	
	//TODO: 구현시 템플릿 ID로 체크로직 변경
	if ($("#MN_BBS_ID").val() === "PHOTO") { // 타일형
		gridInstance.option("dataRowTemplate", function(container, row){
    		//console.log(row.data);
    		var tmpl = `<div class="tileCell">
    		<div class="img"><img src="${AttachFiles.photoUrl}" style="height: 150px;"></div>
    		<div class="tit"><a href="javascript:detailBbs();">${row.data.NTT_SJ}</a></div>
    		<div class="de">${row.data.FRST_REGIST_PNTTM}</div>
    		<div class="view"><div>${row.data.FRST_REGISTER_ID}</div><div><i class="fa fa-eye"></i> ${row.data.RDCNT}</div></div>
    		</div>`;
    		
    		container.append(tmpl);
		});
		
		setTimeout(function() {
			gridInstance.option("visible", true);
			$('.gridContainer').addClass('tileGridContainer');
			//$('.gridContainer table.dx-datagrid-table > colgroup').remove();
			
			//var rowCnt = Math.ceil(bbsList.length / 5);
			//$('.gridContainer table.dx-datagrid-table').css({'height':`${rowCnt * 210}px`});
			//gridInstance.option("height", rowCnt * 230);
			
			gridInstance.option("height", 3 * 230);
		}, 100);
	} else {
		gridInstance.option("visible", true);
	}
}

const AttachFiles = {
	photoUrl:'https://www.incheon.go.kr/comm/getImage?srvcId=IRLctre&upperNo=29668&fileTy=IMG&fileNo=1&thumbTy=L',
	planDocs :[
		  {
		    name: 'Description.pptx',
		    isDirectory: false,
		    size: 1024,
		  },
		  {
		    name: 'Description.xls',
		    isDirectory: false,
		    size: 2048,
		  },
	]
};

function getBoardItems() {	
	var colCondition = [];
	
	colCondition.push({colSpan:4, dataField: 'NTT_SJ', label: {text: '제목',},editorType: 'dxTextBox'});
	
	//TODO: 구현시 템플릿 ID로 체크로직 변경
	if ($("#MN_BBS_ID").val() === "QNA") { // 민원형
		colCondition.push({colSpan:4, dataField: 'NTT_CN', label: {text: '질문',},editorType: 'dxTextArea',
			editorOptions: { height: 150},
		});
		
		colCondition.push({colSpan:4, dataField: 'NTT_CN2', label: {text: '답변',},editorType: 'dxTextArea',
			editorOptions: { height: 150},
		});		
	} else {
		colCondition.push({colSpan:4, dataField: 'NTT_CN', label: {text: '내용',},editorType: 'dxTextArea',
			editorOptions: { height: 300, inputAttr: {class: "txtEditor"}},
		});
	}

	
	colCondition.push({dataField: 'USE_YN', label: {text: '사용여부'}, editorType:"dxSelectBox",
		editorOptions:{
		    valueExpr: 'ID',
		    displayExpr: 'NAME',	
			items: useType,
    		value: '1', 		
		}, 
	});	
	
	//TODO: 구현시 템플릿 ID로 체크로직 변경
	if ($("#MN_BBS_ID").val() === "QNA") { // 민원형
		colCondition.push({dataField: 'TOP_YN', label: {text: '답변상태'}, editorType:"dxSelectBox",
			editorOptions:{
				valueExpr: 'ID',
				displayExpr: 'NAME',	
				items: useYN,
				value: '2', 		
			}, 
		});	

	} else {
			colCondition.push({dataField: 'TOP_YN', label: {text: '상단고정'}, editorType:"dxSelectBox",
				editorOptions:{
					valueExpr: 'ID',
					displayExpr: 'NAME',	
					items: topType,
					value: '2', 		
				}, 
			});	
	}
	
	colCondition.push({colSpan:2, itemType:'empty'});
	
	
	//TODO: 구현시 템플릿 ID로 체크로직 변경
	if ($("#MN_BBS_ID").val() === "QNA") { // 민원형
	} else {
		colCondition.push({dataField: 'DISP_TYPE', label: {text: '노출설정'}, editorType:"dxSelectBox",
			editorOptions:{
			    valueExpr: 'ID',
			    displayExpr: 'NAME',	
				items: displayType,
				value: '1',
	    		onItemClick(data) {
					if (data.itemData.ID == '1') {
						$("#editBbs").dxForm("instance").getEditor("NTCE_BGNDE").option("disabled", true);
						$("#editBbs").dxForm("instance").getEditor("NTCE_ENDDE").option("disabled", true);
					} else {
						$("#editBbs").dxForm("instance").getEditor("NTCE_BGNDE").option("disabled", false);
						$("#editBbs").dxForm("instance").getEditor("NTCE_ENDDE").option("disabled", false);
					}
				},    		
			}, 
		});
		
		colCondition.push({dataField: 'NTCE_BGNDE', label: {visible:false}, editorType:"dxDateBox",
			editorOptions: {
		  		displayFormat: 'yyyy-MM-dd',
		  		disabled: true,
			},
		});	
		colCondition.push({dataField: 'NTCE_ENDDE', label: {text: '~'}, editorType:"dxDateBox",
			editorOptions: {
		  		displayFormat: 'yyyy-MM-dd',
		  		disabled: true,
			},
		});	
		colCondition.push({colSpan:1, itemType:'empty'});
	}
	
	let fileColSpan = 2;
	
	//TODO: 구현시 템플릿 ID로 체크로직 변경
	if ($("#MN_BBS_ID").val() === "QNA") { // 민원형
		fileColSpan = 4;
	} else {
		colCondition.push(
				{colSpan:2, itemType:'group',caption:'대표이미지',colCount:2,
					items:[{dataField:"photoUrl",
						label:{visible:false},
						template: function(data, itemElement) {
							//if(data.editorOptions.value){
							var d = document.createElement("div");
							d.className ="cst-small-button-container";
							d.style.left="10px";
							d.innerHTML =`
								<div class="cst-small-button dx-widget dx-button dx-button-normal dx-button-mode-contained"><div class="dx-button-content"><i class="dx-icon dx-icon-close"></i></div></div>
								</div>
								<div style="margin-top: 1px;">
								<img src="${AttachFiles.photoUrl}" style="height: 150px;">
								</div>`;	
							
							itemElement.append(d);
							//}
						},
					},
					{
						label:{visible:false},
						template: function(data, itemElement) {
							itemElement.append("<div id='dropzone-external'>클릭하여 파일을 선택하거나<br>파일을 여기에 끌어오세요.</div>")
							.append($("<div>").attr("id", "dxfu1").dxFileUploader({
								uploadUrl: 'https://js.devexpress.com/Demos/NetCore/FileUploader/Upload',
								allowedFileExtensions: img_ext,
								maxFileSize: 4000000,
								dialogTrigger: '#dropzone-external',
								dropZone: '#dropzone-external',		
								visible: false,
							}));  
						},
					},]
				});
	}
	
	colCondition.push(
		{colSpan:fileColSpan, itemType:'group',caption:'파일첨부',
    	items:[{label:{visible:false},
			template: function(data, itemElement) {
				itemElement.append($("<div>").attr("id", "dxfu1").dxFileManager({
				    name: 'fileManager',
				    hint:'파일 최대 3개까지 업로드 가능',
				    fileSystemProvider: AttachFiles.planDocs,
				    height: 180,
				    permissions: {
				      delete: true,
				      upload: AttachFiles.planDocs.length<3,
				      download: true,
				      refresh:false,
				    },
				    allowedFileExtensions: doc_ext,
				    itemView: {
				        details: {
				          columns: [
				            'thumbnail', 'name',
				             'size',
				          ],
				        },
				        showParentFolder: false,
				      },toolbar: {
				          items: [
				              'upload',
				              {
				                name: 'separator',
				                location: 'after',
				              },
				              'switchView',
				            ],
				            fileSelectionItems: [
				               'delete', 'separator','download',
				               'clearSelection',
				            ],
				      },
				      //onContextMenuItemClick: onItemClick,
				      onFileUploaded: function(e) {
				    	  if( AttachFiles.planDocs.length>=3){
				    		  e.component.option('permissions.upload',false);
				    	  } 
				        },
				      onItemDeleted: function(e) {
				    	  if( AttachFiles.planDocs.length<3){
				    		  e.component.option('permissions.upload',true);
				    	  } 
				        },
				      contextMenu: {
				    	  items: [
				    		  'delete',
				    		  'download'
				    		  ],
				      },
				      upload: {
				            chunkSize: 500000,
				            maxFileSize: 1000000
				        },
				  }));
			}
		},]
	});
	
	
	return colCondition;
}

//상세 보기
function detailBbs(){
	let key = gridInstance.option("focusedRowKey");
	if (!key) return;
	
	let idx = gridInstance.getRowIndexByKey(key);
	let rowData = gridInstance.getDataSource().items()[idx];
	createBbsDetailPopup("#userPopup", rowData);
}
//신규 버튼
function createBbs(){
	gridInstance.addRow();
	gridInstance.deselectAll();
}
//수정 버튼
function updateBbs(){
	let key = gridInstance.option("focusedRowKey");
	if (!key) return;
	
	var idx = gridInstance.getRowIndexByKey(key);
	gridInstance.editRow(idx);
	gridInstance.deselectAll();
}
//삭제 버튼
function deleteBbs(){
	let key = gridInstance.option("focusedRowKey");
	if (!key) return;
	
//	if (gridInstance.getSelectedRowKeys().length == 0){
//		var idx = gridInstance.getRowIndexByKey(key);
//		gridInstance.deleteRow(idx);
//		gridInstance.deselectAll();
//		return;
//	}
	
	showConfirm('삭제하시겠습니까?', "게시글 삭제", 
		function(){
			var selectedRow = _.where(gridInstance.getDataSource().items(), {NTT_NO:key});
			var resultDs = dsRemove(gridInstance.getDataSource(), selectedRow, "NTT_NO");
			gridInstance.option({"dataSource":resultDs, "focusedRowIndex":0});
		}
	);
	
}

function getTileList() {
	var resultColumn = [{
		dataField: 'NTT_NO',
		visible: false,
		showInColumnChooser: false,	
	}, {
		dataField: 'NTT_SJ',
		visible: false,
		showInColumnChooser: false,			
		caption: '제목',			
	}, {
		dataField: 'FRST_REGISTER_ID',
		visible: false,
		showInColumnChooser: false,	
		caption: '작성자',
	}, {
		dataField: 'FRST_REGIST_PNTTM',
		visible: false,
		showInColumnChooser: false,	
		caption: '작성일시',	
	}, {
		dataField: 'ATCH_FILE_ID',
		caption: '이미지',		
	}, {	
		dataField: 'RDCNT',
		visible: false,
		showInColumnChooser: false,	
		caption: '조회수',
		dataType: "number", 
	}, {			
		dataField: 'DISP_TYPE',
		visible: false,
		showInColumnChooser: false,	
	}, {			
		dataField: 'NTT_CN',
		caption: '내용',
		visible: false,
		showInColumnChooser: false,
	},
	];
	
	resultColumn = setColumnAlignment(resultColumn);
	return resultColumn;
}

function getColumnList() {
	var resultColumn = [];
	
	resultColumn.push(...[{
		dataField: 'NTT_NO',
		width: 90,
		caption: '번호',
		dataType: 'number',
	}, {
		dataField: 'NTT_SJ',
		caption: '제목',
		cellTemplate: function(element, options) {
			$('<a>' + options.value + '</a>')
       			.attr("href", "javascript:detailBbs();")
       			.appendTo(element);		
		}		
	}, {
		dataField: 'FRST_REGISTER_ID',
		width: 120,
		caption: '작성자',
	}, {
		dataField: 'FRST_REGIST_PNTTM',
		width: 130,
		caption: '작성일시',	
	},]);
	
	//TODO: 구현시 템플릿 ID로 체크로직 변경
	if ($("#MN_BBS_ID").val() === "QNA") { // 민원형
		resultColumn.push(...[{
			dataField: 'NTCE_STAT',
			width: 80,
			caption: '답변여부',
		}, {
			dataField: 'LAST_UPDUSR_ID',
			width: 130,
			caption: '답변자',				
		}, {
			dataField: 'LAST_UPDT_PNTTM',
			width: 130,
			caption: '답변일시',			
		}, {
			dataField: 'ATCH_FILE_ID',
			width: 60,
			caption: '첨부',	
			cellTemplate: function(element, options) {
				if (options.value === '1') {
					element.append($('<div><i class="fas fa-file"></i></div>'));
				}
			},		
		}, {	
			dataField: 'RDCNT',
			width: 90,
			caption: '조회수',
			dataType: "number", 
		}, {			
			dataField: 'DISP_TYPE',
			visible: false,
			showInColumnChooser: false,	
		}, {			
			dataField: 'NTT_CN',
			caption: '질문',
			visible: false,
			showInColumnChooser: false,		
		}, {			
			dataField: 'NTT_CN2',
			caption: '답변',
			visible: false,
			showInColumnChooser: false,
			editCellTemplate: function(container, cellInfo) {
				
				console.log(cellInfo.value);
				container.append($('<div>').dxTextArea({
					value: cellInfo.value,
					inputAttr: { id: 'contents_editor' },
				}));
				
				CKEDITOR.replace('contents_editor');
				CKEDITOR.instances.contents_editor.config.height = 190;
				
				CKEDITOR.instances.contents_editor.on("change", function () {
					cellInfo.setValue(CKEDITOR.instances.contents_editor.getData());
				});
			},		
		}]);
	} else { // 리스트형
		resultColumn.push(...[{
			dataField: 'LAST_UPDUSR_ID',
			width: 120,
			caption: '수정자',
		}, {
			dataField: 'LAST_UPDT_PNTTM',
			width: 130,
			caption: '수정일시',			
		}, {
			dataField: 'ATCH_FILE_ID',
			width: 60,
			caption: '첨부',	
			cellTemplate: function(element, options) {
				if (options.value === '1') {
					element.append($('<div><i class="fas fa-file"></i></div>'));
				}
			},		
		}, {
			dataField: 'ATCH_FILE_ID',
			width: 60,
			caption: '이미지',
			cellTemplate: function(element, options) {
				if (options.value === '2') {
					let html =`
						<div style="text-align:center;">
							<img src="${AttachFiles.photoUrl}" style="height: 16px;">
						</div>`;	
					element.append(html);
				}
			},		
		}, {	
			dataField: 'RDCNT',
			width: 90,
			caption: '조회수',
			dataType: "number", 
		}, {			
			dataField: 'DISP_TYPE',
			visible: false,
			showInColumnChooser: false,	
		}, {			
			dataField: 'NTT_CN',
			caption: '내용',
			visible: false,
			showInColumnChooser: false,
			editCellTemplate: function(container, cellInfo) {
				
				console.log(cellInfo.value);
				container.append($('<div>').dxTextArea({
					value: cellInfo.value,
					inputAttr: { id: 'contents_editor' },
				}));
				
				CKEDITOR.replace('contents_editor');
				CKEDITOR.instances.contents_editor.config.height = 300;
				
				CKEDITOR.instances.contents_editor.on("change", function () {
					cellInfo.setValue(CKEDITOR.instances.contents_editor.getData());
				});
			},		
		},]);		
	}
	
	resultColumn = setColumnAlignment(resultColumn);
	return resultColumn;
}	

