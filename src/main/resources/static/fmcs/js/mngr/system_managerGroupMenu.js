// 시스템관리 > 권한그룹메뉴관리

var columnList = null;
var gridMngrGroup = null;
var editmode="new";

const mngrGroup = [
	{id: "ROLE_SUPER", text: "수퍼 관리자"},
	{id: "ROLE_USER", text: "일반 사용자"},
];


let resultList = new DevExpress.data.ArrayStore({
	key: "MENU_ID",
	data: mainListData()
});


function formInit() {
	//검색조건
	createCondition();
	// 그리드 생성
	createDataGrid();
}

function createCondition() {
	//Search Form
	$("#searchForm1").dxForm({
		showColonAfterLabel: false,
	    labelMode:'hidden',
	    colCount: 2,
	    items: [
	    	{dataField: "AUTHOR_NM", editorType: "dxSelectBox", editorOptions: {	dataSource: mngrGroup, layout: "horizontal", valueExpr: "id", displayExpr: "text", placeholder: "권한그룹(선택)"}},
	    ]
	});
	
	//검색버튼
	$("#searchBtn").dxButton({
		stylingMode: "contained",
		icon: "find",
		type: "default",
		onClick() {
			var msg = "";
			if($("input[name='SEARCH_COLUMN']").val() == ""){
				msg = "키워드 제외 검색";
			}
			else {
				msg = $("select[name='SEARCH_COLUMN']").val() +" = "+ $("input[name='SEARCH_KEYWORD']").val() +" 검색 ";
			}
			DevExpress.ui.notify(msg);
		}
	});
	
}


function createDataGrid() {
	mainListColumn();
	
	
	//Main Grid
	gridMngrGroup = $("#gridList").dxDataGrid({
		export: {enabled:false},
		dataSource:  resultList,
		columns: columnList,
		selection: {mode: "single"},
		allowColumnReordering: true,
		allowColumnResizing: true,
		showBorders: true,
		showRowLines: true,
		columnHidingEnabled: true,
		paging: {pageSize: 10},
        editing: {
	      allowUpdating: true, 
	      useIcons: true,
	      mode: 'cell' 
	    },
		onCellPrepared: function(e) {
			
			if(e.column.dataField == "MENU_NM"){
				if(e.data != undefined) {
					if(e.data.DEPTH == "2") e.cellElement.css("text-indent" , "5%"); // e.data.MENU_NM = "      " + e.data.MENU_NM;
				}
			} else if(e.column.dataField == "R_YN"){
				if(e.data != undefined) {
					if(e.data.DEPTH == "1") e.cellElement.html(""); // e.data.MENU_NM = "      " + e.data.MENU_NM;
				}
			} else if(e.column.dataField == "CU_YN"){
				if(e.data != undefined) {
					if(e.data.DEPTH == "1") e.cellElement.html(""); // e.data.MENU_NM = "      " + e.data.MENU_NM;
				}
			} else if(e.column.dataField == "D_YN"){
				if(e.data != undefined) {
					if(e.data.DEPTH == "1") e.cellElement.html(""); // e.data.MENU_NM = "      " + e.data.MENU_NM;
				}
			} else if(e.column.dataField == "P_YN"){
				if(e.data != undefined) {
					if(e.data.DEPTH == "1") e.cellElement.html(""); // e.data.MENU_NM = "      " + e.data.MENU_NM;
				}
			}
			
			
//			console.log(e.rowType);
//			console.log(e.column.dataField);
//			console.log(e.data);
				
    	},
		onRowDblClick: function (e) {
		},
		onEditorPrepared :function(e){
			if(e.row && e.row.isNewRow){
				editmode='create';
			}
			//console.log(editmode);
		},
		onRowPrepared(e){
		},
		onRowUpdated(e) {
	          //  alert('RowUpdated');
		},
		onToolbarPreparing(e) {
			e.toolbarOptions.items.push(
					{
						location: 'after',
						widget: 'dxButton',
						cssClass:'functionbtn',
						options: {
							text:'저장',
							onClick() {
								alert("저장");
							},
						},
					}
			);
		},
	}).dxDataGrid("instance");
}


//Main Column
function mainListColumn() {
	columnList = [
		{dataField: "MENU_ID", width: 150, caption: "번호",  alignment: "center",allowEditing: false,},
		{dataField: "MENU_NM", width: 300, caption: "메뉴명",allowEditing: false,},
		{dataField: "R_YN", width: 150, caption: "관리(조회)", alignment: "center", dataType: 'boolean',},
		{dataField: "CU_YN", width: 150, caption: "등록/수정", alignment: "center", dataType: 'boolean',},
		{dataField: "D_YN", width: 150, caption: "삭제", alignment: "center", dataType: 'boolean',},
		{dataField: "P_YN", width: 150, caption: "출력/엑셀", alignment: "center", dataType: 'boolean'	},
		{dataField: "MENU_URL", width: 150, caption: "URL", alignment: "center",allowEditing: false,},
		{dataField: "DEPTH", width: 150, caption: "DEPTH", alignment: "center",allowEditing: false, visible: false},
	];
}

function mainListData() {
	var dataList = "";
	
	dataList = [
		{MENU_ID: "1", MENU_NM: "매표관리", R_YN:"", CU_YN:"", D_YN:"", P_YN:"",MENU_URL:"/fmcs/sys/mngGroupList", DEPTH: "1"},
		{MENU_ID: "2", MENU_NM: "일일입장프로그램관리", R_YN:"Y", CU_YN:"Y", D_YN:"Y", P_YN:"Y",MENU_URL:"/fmcs/sys/mngGroupList", DEPTH: "2"},
		{MENU_ID: "3", MENU_NM: "입장권매표관리", R_YN:"Y", CU_YN:"Y", D_YN:"Y", P_YN:"Y",MENU_URL:"/fmcs/sys/mngGroupList", DEPTH: "2"},
		{MENU_ID: "4", MENU_NM: "입장권매쵸예약정보관리", R_YN:"Y", CU_YN:"Y", D_YN:"Y", P_YN:"Y",MENU_URL:"/fmcs/sys/mngGroupList", DEPTH: "2"},
		{MENU_ID: "5", MENU_NM: "시스템관리", R_YN:"", CU_YN:"", D_YN:"", P_YN:"",MENU_URL:"/fmcs/sys/mngGroupList", DEPTH: "1"},
		{MENU_ID: "6", MENU_NM: "시스템코드", R_YN:"Y", CU_YN:"Y", D_YN:"Y", P_YN:"Y",MENU_URL:"/fmcs/sys/mngGroupList", DEPTH: "2"},
		{MENU_ID: "7", MENU_NM: "사용자관리", R_YN:"Y", CU_YN:"Y", D_YN:"Y", P_YN:"Y",MENU_URL:"/fmcs/sys/mngGroupList", DEPTH: "2"},
		{MENU_ID: "8", MENU_NM: "권한그룹관리", R_YN:"Y", CU_YN:"Y", D_YN:"Y", P_YN:"Y",MENU_URL:"/fmcs/sys/mngGroupList", DEPTH: "2"},
		{MENU_ID: "9", MENU_NM: "운영정보LOG관리", R_YN:"Y", CU_YN:"Y", D_YN:"Y", P_YN:"Y",MENU_URL:"/fmcs/sys/mngGroupList", DEPTH: "2"},
		{MENU_ID: "10", MENU_NM: "시스템연계LOG관리", R_YN:"Y", CU_YN:"Y", D_YN:"Y", P_YN:"Y",MENU_URL:"/fmcs/sys/mngGroupList", DEPTH: "2"},
	];
	
	return dataList;
}



