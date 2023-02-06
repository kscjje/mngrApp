const masterDetailTemplate = `
<div id="masterDetailTemplate">
</div>`;

var popMasterDetail = null;

function createMasterDetailPopup(selector, rowData) {
	if (popMasterDetail){
		popMasterDetail = null;
		$(selector).dxPopup("dispose");
	}
	
	popMasterDetail = $(selector).dxPopup({
		contentTemplate: $('<div>').append(masterDetailTemplate),
		visible: true,
		title: '게시판 상세',
        width: 1200,
        height: 830,
		position: {
			my: 'center',
			at: 'center',
			of: window
		},
		dragEnabled: true,
		onShown() {
			createMasterDetailForm(rowData);
		},
		toolbarItems: [{
			widget: 'dxButton',
		    toolbar: 'bottom',
		    location: 'after',
		    options: {
		    	text: '닫기',
		    	onClick() {
		    		popMasterDetail.hide();
				},
			},
		}],
	}).dxPopup('instance');
}

function createMasterDetailForm(rowData) {
	var colCondition = [];
	
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
	
	colCondition.push({colSpan:2, dataField: "REGISTER",
		label: {text: '작성자'},
		template: function(data, itemElement) {
			console.log(data);
			return $("<div>").dxTextBox({
				value: `${rowData.FRST_REGISTER_ID} (${rowData.FRST_REGIST_PNTTM})`,
				readOnly: true,
			});
		},
	});
	colCondition.push({colSpan:2, dataField: "UPDUSR",
		label: {text: '수정자'},
		template: function(data, itemElement) {
			console.log(data);
			return $("<div>").dxTextBox({
				value: `${rowData.LAST_UPDUSR_ID} (${rowData.LAST_UPDT_PNTTM})`,
				readOnly: true,
			});
		},
	});	
	
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
			        hoverStateEnabled: true,
			        scrolling: { mode: 'virtual' },
			        height: 180,
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
			        hoverStateEnabled: true,
			        scrolling: { mode: 'virtual' },
			        height: 180,
			      }
				)
			);
		}},
	);
	
	$("#masterDetailTemplate").dxForm({
		showColonAfterLabel: false,
		items: colCondition,
		colCount: 4,
		readOnly: true,
		formData: rowData,
	});
}
