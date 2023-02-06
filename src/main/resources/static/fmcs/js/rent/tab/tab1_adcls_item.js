//부속시설
let tab1_form = null;
const use_unit_gbn = [
	{text: "개수", value: "C"},
	{text: "시간", value: "T"}
];

const accessoryColumnList = [
	{dataField: "itemCd", visible: false},
	{dataField: "adclsName", width: "20%", caption: "부속시설명", allowEditing: false},
	{dataField: "adclsItemUnitgbn", width: "9%", caption: "이용단위", alignment: "center", lookup: {dataSource: use_unit_gbn, displayExpr: "text", valueExpr: "value"}},
	{dataField: "adclsItemCost", width: "9%", caption: "이용금액", alignment: "right",
		editCellTemplate: function(cellElement, cellInfo) {
            $("<div id='txt"+cellInfo.rowIndex+"' class='cell_two_widget' />").dxNumberBox({
                value: cellInfo.value, showSpinButtons: true, min: 0, format: "#,##0",
                onValueChanged: function(e) {
                    cellInfo.setValue(e.value);
                }
            }).appendTo(cellElement);
            
           	cellElement.append( "<span id='unit"+cellInfo.rowIndex+"'> 원 </span>");
		}
	},
	{dataField: "taxtGbn", width: "9%", caption: "과세구분", alignment: "center", lookup: {dataSource: tax_gbn, displayExpr: "text", valueExpr: "value"}},
	{dataField: "onlineOpenyn", width: "9%", caption: "온라인공개여부", alignment: "center", lookup: {dataSource: online_gbn, displayExpr: "text", valueExpr: "value"}},
	{dataField: "useYn", width: "9%", caption: "사용여부", alignment: "center", lookup: {dataSource: use_gbn, displayExpr: "text", valueExpr: "value"}},
	{dataField: "regdate", width: "15%", caption: "등록일자", alignment: "center", editorType: "dxDateBox", editorOption: {width: "100%", displayFormat: 'yyyy-MM-dd', disabled: true}	}
];

function initAccessoryList() {
	let resultList = new DevExpress.data.ArrayStore({
		key: "itemCd",
		data: accessoryResultDataList()
	});
	
	tab1_form = $("#tab1 .tab_contents2").dxDataGrid({
		columns: accessoryColumnList,
		allowColumnReordering: false,
		allowColumnResizing: true,
		showBorders: true,
		columnHidingEnabled: false,
		selection: {mode: "single"},
		paging: {enabled: false},
		toolbar: {
			items: [{
				location: "after",
	        	widget: "dxButton",
	      		cssClass: "form-button",
	      		options: {
	      			text: "부속시설추가",
	      			type: "success",
	      			useSubmitBehavior: true,
	      			onClick(e) {
	      				tab1_form.option("editing.mode", "popup");
	      				setAllowEditing("#tab1 .tab_contents2",true,[]);
	      				
	      				tab1_form.addRow();
	      				tab1_form.deselectAll();
	      			}
	      		}
			}]
		},
		dataSource: resultList,
		editing: {
			mode: "popup",
		 	allowUpdating: true,
		 	allowAdding: true,
		 	allowDeleting: true,
		 	//selectTextOnEditStart: true,
		 	useIcons: true,
			// startEditAction: 'click',
		 	popup: {
				title: "부속시설 등록",
				showTitle: true,
				width: 700,
			  	height:650,
			 	onShown:function(){
			  	}
			},
			form: {
				showColonAfterLabel: false,
				elementAttr: {id: "editForm"},
				customizeItem: accessoryCustomizeItem,
				items: createAccessoryDetailForm(),
				onInitialized: function(e) {
					frmPopup  = e.component;
				},
				colCount: 1
			},
		},
		onEditorPrepared :function(e){
		},
		onEditingStart: function(e) {
		},
		onRowPrepared(e){
		},
		onRowUpdated(e) {
		},
		onEditCanceled() {
		},
		onSaved() {
			DevExpress.ui.notify("부속시설사용 저장");
		},
		onRowValidating: function (e) {
		}
	}).dxDataGrid("instance");
}

function accessoryCustomizeItem(item){
	let editRowKey = tab1_form.option('editing.editRowKey');
   	let index = tab1_form.getRowIndexByKey(editRowKey);
   	index = index === -1 ? 0 : index;
}

//부속시설 등록 팝업 FORM
function createAccessoryDetailForm() {
	var accessoryDetailItems = "";
	
	accessoryDetailItems = [
		{itemType: "group", colCount: 3, items: [
			{template: function (data, itemElement) { categoriesTree(data, itemElement); } },
			{colSpan: 2, name: "basics", itemType: "group", caption: "기본설정", items: [
				{dataField: "rentFcltySeq", label: {text: "대관시설분류"}, editorType: "dxSelectBox", 
					editorOptions: {dataSource: rentList(),
						disabled: true, layout: "horizontal", valueExpr: "value", displayExpr: "text", value: rentFcltySeq
					}
				},
				{dataField: "adclsName", label: {text: "부속시설명"}, width: 100, validationRules: [{type: "required",message: "부속시설명 필수 입력"}]},
				{dataField: "adclsItemUnitgbn", label: {text: "이용단위"}, validationRules: [{type: "required",message: "이용단위 필수 선택"}], editorType: "dxSelectBox",
					editorOptions: {dataSource: use_unit_gbn,
						layout: "horizontal", valueExpr: "value", displayExpr: "text",
						onContentReady: function (e) {
							if (!e.component.option("value")) {
								e.component.option("value", e.component.option("dataSource")[0].value);
							}
						}
					}
				},
				{dataField: "adclsItemCost", label: {text: "이용금액"}, editorType: "dxNumberBox", validationRules: [{type: "required",message: "이용금액 필수 입력"}], editorOptions: {showSpinButtons: true, min: 0, format: "#,##0"}},
				{dataField: "taxtGbn", label: {text: "과세구분"}, validationRules: [{type: "required",message: "과세구분 필수 선택"}], editorType: "dxSelectBox",
					editorOptions: {dataSource: tax_gbn,
						layout: "horizontal", valueExpr: "value", displayExpr: "text",
						onContentReady: function (e) {
							if (!e.component.option("value")) {
								e.component.option("value", e.component.option("dataSource")[0].value);
							}
						}
					}
				},
				{dataField: "onlineOpenyn", label: {text: "온라인공개여부"}, validationRules: [{type: "required",message: "온라인공개여부 필수 선택"}], editorType: "dxSelectBox",
					editorOptions: {dataSource: online_gbn,
						layout: "horizontal", valueExpr: "value", displayExpr: "text",
						onContentReady: function (e) {
							if (!e.component.option("value")) {
								e.component.option("value", e.component.option("dataSource")[0].value);
							}
						}
					}
				},
				{dataField: "useYn", label: {text: "사용여부"}, validationRules: [{type: "required",message: "사용여부 필수 선택"}], editorType: "dxSelectBox",
					editorOptions: {dataSource: use_gbn,
						layout: "horizontal", valueExpr: "value", displayExpr: "text",
						onContentReady: function (e) {
							if (!e.component.option("value")) {
								e.component.option("value", e.component.option("dataSource")[0].value);
							}
						}
					}
				},
				{dataField: "moduser", label: {text: "최종수정자"}, 
					editorOptions: { disabled: true,
						onContentReady: function (e) {
							if (!e.component.option("value")) {
								e.component.option("value", "admin"); // Login SessionID 값 삽입
							}
						}
					}
				},
				{dataField: "moddate", label: {text: "최종수정일시"}, editorType: "dxDateBox", 
					editorOptions: {disabled: true, displayFormat: "yyyy-MM-dd",
						onContentReady: function (e) {
							if (!e.component.option("value")) {
								e.component.option("value", nowDate)
							}
						}
					}
				}
			]}
		]}
		
	];
	
	return accessoryDetailItems;
}

function categoriesTree(data, itemElement) {
	itemElement.append(
		$("<div id='categoriesTree'>").dxTreeList({
			dataSource: facilityCategoriesList(),
		    dataStructure: "plain",
		    parentIdExpr: "comPrnctgcd",
		    keyExpr: "comItemctgcd",
		    columns: [
		    	{dataField: "comItemctgnm", caption: "윤영상품분류"}
		    ],
		    focusedRowEnabled: true,
		    height: 450,
		    onItemClick(e) {
		    	const item = e.itemData;
		    },
		    onNodesInitialized: function(e) {
	           // e.component.__root = e.root;
	        }
		})
	);
}

function accessoryResultDataList() {
	var dataList = "";
	
	dataList = [
		{itemCd: 1, adclsName: "난방", adclsItemUnitgbn: "T", adclsItemCost: "10000", taxtGbn: "1", onlineOpenyn: "1", useYn: "1", regdate: "2023-01-02"},
		{itemCd: 2, adclsName: "미니골대", adclsItemUnitgbn: "T", adclsItemCost: "2000", taxtGbn: "0", onlineOpenyn: "1", useYn: "1", regdate: "2023-01-02"}
	]
	
	return dataList;
}
