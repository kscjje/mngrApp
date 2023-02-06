const bbsDetailTemplate = `
<div id="bbsDetailTemplate">
</div>`;

var popBbsDetail = null;

function createBbsDetailPopup(selector, rowData) {
	if (popBbsDetail){
		popBbsDetail = null;
		$(selector).dxPopup("dispose");
	}
	
	popBbsDetail = $(selector).dxPopup({
		contentTemplate: $('<div>').append(bbsDetailTemplate),
		visible: true,
		title: '게시글 상세',
        width: 1200,
        height: 900,
		position: {
			my: 'center',
			at: 'center',
			of: window
		},
		dragEnabled: true,
		onShown() {
			createBbsDetailForm(rowData);
			editorInit();
		},
		toolbarItems: [{
			widget: 'dxButton',
		    toolbar: 'bottom',
		    location: 'after',
		    options: {
		    	text: '닫기',
		    	onClick() {
		    		popBbsDetail.hide();
				},
			},
		}],
	}).dxPopup('instance');
}

function createBbsDetailForm(rowData) {
	var colCondition = [];
	
	colCondition.push({colSpan:4, dataField: 'NTT_SJ', label: {text: '제목',},editorType: 'dxTextBox'});
	
	//TODO: 구현시 템플릿 ID로 체크로직 변경
	if ($("#MN_BBS_ID").val() === "QNA") { // 민원형
		colCondition.push({colSpan:4, dataField: 'NTT_CN', label: {text: '질문',},editorType: 'dxTextArea',
			editorOptions: { height: 200, inputAttr: {class: "txtEditor"}},
		});
		
		colCondition.push({colSpan:4, dataField: 'NTT_CN', label: {text: '답변',},editorType: 'dxTextArea',
			editorOptions: { height: 230, inputAttr: {class: "txtEditor"}},
		});		
	} else {
		colCondition.push({colSpan:4, dataField: 'NTT_CN', label: {text: '내용',},editorType: 'dxTextArea',
			editorOptions: { height: 430, inputAttr: {class: "txtEditor"}},
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
	
	colCondition.push({dataField: "REGISTER",
		label: {text: '작성자'},
		template: function(data, itemElement) {
			console.log(data);
			return $("<div>").dxTextBox({
				value: `${rowData.FRST_REGISTER_ID} (${rowData.FRST_REGIST_PNTTM})`,
				readOnly: true,
			});
		},
	});
	
	colCondition.push({dataField: "UPDUSR",
		label: {text: '수정자'},
		template: function(data, itemElement) {
			console.log(data);
			return $("<div>").dxTextBox({
				value: `${rowData.LAST_UPDUSR_ID} (${rowData.LAST_UPDT_PNTTM})`,
				readOnly: true,
			});
		},
	});	
	
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
	
	let fileColSpan = 3;
	
	//TODO: 구현시 템플릿 ID로 체크로직 변경
	if ($("#MN_BBS_ID").val() === "QNA") { // 민원형
		fileColSpan = 4;
	} else {
		colCondition.push(
			{colSpan:1, itemType:'group',caption:'대표이미지',
				items:[{dataField:"photoUrl",
						label:{visible:false},
						template: function(data, itemElement) {
						//if(data.editorOptions.value){
		    					let html =`
								<div style="text-align:center;">
									<img src="${AttachFiles.photoUrl}" style="height: 150px;">
								</div>`;	
		    					itemElement.append(html);
							//}
						},
					}]
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
				    height: 150,
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
				       permissions: {
				    	   	copy: false,
				            create: false,
				            remove: false,
				            download: true,
				            move: false,
				            rename: false,
				            upload: false,
				        },
				  }));
			}
		},]
	});
	
	$("#bbsDetailTemplate").dxForm({
		showColonAfterLabel: false,
		items: colCondition,
		colCount: 4,
		readOnly: true,
		formData: rowData,
	});
}
