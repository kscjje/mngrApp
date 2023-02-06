//대관예약팀관리 > 구성원 관리
//시간표및 요금정보 등록
const facilityPopupTemplate = `
<div id="facilityPopupTemplate">
	<div id="popOperationTree"></div>
	<div id="priceSearchForm"></div>
</div>`;

let tab1_form = null;
let selectedMemberRowIndex = -1;
var facilityMemberPopup = null;
var memberNewForm = null;

const join_status_gbn = [
	{text: "탈퇴", value: "N"}, 
	{text: "가입", value: "Y"}
];

let teamMemberColumnList = [
	{dataField: "CONSTNT_MEMNO", width: 150, caption: "회원번호",  alignment: "center", validationRules: [{ type: "required" }]},
	{dataField: "CONSTNT_NAME", width: 80, caption: "회원명", alignment: "center", validationRules: [{ type: "required" }]},
	{dataField: "CONSTNT_WEBID", width: 120, caption: "WEB ID", alignment: "center" },
    {dataField: "CONSTNT_HPNO", width: 120, caption: "연락처", alignment: "center"},
    {dataField: "USER_ADDRESS", caption: "주소", alignment: "center", validationRules: [{ type: "required" }]},
    {dataField: "CREATEDATE", width: 100, caption: "가입일", alignment: "center", dataType: 'date', validationRules: [{ type: "required" }]},
    {dataField: "STATUS", width: 100, caption: "가입상태", alignment: "center", lookup: {dataSource: join_status_gbn, displayExpr: "text", valueExpr: "value"}, validationRules: [{ type: "required" }]},
];

function initTeamMemberList() {
	let resultList = new DevExpress.data.ArrayStore({
		key: "TEAM_CONSTNT_NO",
		data: memberResultDataList()
	});

	tab1_form = $("#tab1 .tab_contents1").dxDataGrid({
		columns: teamMemberColumnList,
		selection: {mode: "multiple", showCheckBoxesMode: "always", deferred: true},
		allowColumnReordering: false,
		allowColumnResizing: true,
		showBorders: true,
		showRowLines: true,
		columnHidingEnabled: false,
		paging: {enabled: false},
		toolbar: {
			items: [{
				location: "after",
				widget: "dxButton",
				cssClass: "functionbtn",
				options: {
	      			text: "구성원추가",
	      			onClick() {
	      				tab1_form.option("editing.mode", "popup");
	      				setAllowEditing("#gridList",true,[]);
	      				
	      				tab1_form.addRow();
	      				tab1_form.deselectAll();
	      			}
	      		}
			},
			{
	        	location: 'after',
	        	widget: 'dxButton',
	      		cssClass:'functionbtn',
	      		options: {
	      			text: '구성원삭제',
	      			onClick() {
	      				DevExpress.ui.notify("삭제"); 
	      			}
	      		}
			}]
		},
		dataSource: resultList,
		focusedRowEnabled: true,		//선택된 행 표시 여부
		onFocusedRowChanged(e) {
		    selectedMemberRowIndex = e.rowIndex;

        	teamCd = e.row.data.TEME_CD;

        	editmode="view";
        },
		editing: {
			mode: "cell",
		 	selectTextOnEditStart: true,	//ctrl + a 효과 여부
		 	popup: {
				title: "구성원관리",
				showTitle: true,
				width: 700,
			  	height:400,
			 	onShown:function(){
			  	}
			},
			form: {
				showColonAfterLabel: false,
				elementAttr: {
			         id: "memberForm",
			   	},
//				customizeItem: memberCustomizeItem,
				colCount:1,
				items: createFacilityMember(),
				onInitialized: function(e) {
					frmPopup  = e.component;
				}
			}
		},
		onRowDblClick: function () {
			updateFacilityTeamMember();
		},
		onInitNewRow: function(){  
			if(tab1_form.option("editing.mode")=="popup"){
				tab1_form.option("editing.popup.title", "구성원 등록");
			}
		},
		onRowPrepared(){
		},
		onRowUpdated() {
	          //  alert('RowUpdated');
		},
		onEditCanceled() {
			tab1_form.option("editing.mode", "popup");
		},
		onSaved() {
			DevExpress.ui.notify("구성원저장");
			//tab1_form.option("editing.mode", "row");
		},
		onRowValidating: function (e) {
		}
	}).dxDataGrid("instance");
	
	
}



//구성원 등록 POPUP
function createFacilityMember () {
	var memberItems = ""; 
		
	memberItems = [
    	{dataField: "CONSTNT_NAME", name: "NAME", editorType:"dxTextBox",label: {text: "회원명"},
			editorOptions: {
				readOnly: true  ,
				buttons: [{
					name: 'member_search',
					location: 'after',
					options: {
						text: '가입회원 검색',
						type: 'default',
						disabled: false,
						onClick() {
							memberPlusReadOnlySettin(true);
							createUserSearchPopup("#userPopup", null, setUserFormData);
						},
					},
				},{
					name: 'notmember_search',
					location: 'after',
					options: {
						text: '비회원등록',
						type: 'default',
						disabled: false,
						onClick() {
							memberPlusReadOnlySettin(false);
						},
					},
				}],
			}
		},
		{dataField: "CONSTNT_MEMNO", name: "NO", label: {text: "회원번호"}, editorOptions: { readOnly: true }},
		{dataField: "CONSTNT_WEBID", name: "ID", label: {text: "WEB ID"}, editorOptions: { readOnly: true }},
		{dataField: "CONSTNT_HPNO", name: "HP", label: {text: "연락처"}, editorOptions: { readOnly: true }},
		{dataField: "USER_DESC", name: "DESC", label: {text: "비고"},},
	];
	
	
	return memberItems;
}

function memberResultDataList() {
	var memberDataList = "";
	
	memberDataList = [
		{TEAM_CONSTNT_NO: 1, CONSTNT_MEMNO: "00000001", CONSTNT_NAME: "홍길동", CONSTNT_WEBID: "hong1", CONSTNT_HPNO: "010-1234-5678", USER_ADDRESS: "영등포구 경인로 775(문래동3가)", CREATEDATE: "20221201", STATUS: "N"},
		{TEAM_CONSTNT_NO: 2, CONSTNT_MEMNO: "00000002", CONSTNT_NAME: "고길동", CONSTNT_WEBID: "go1", CONSTNT_HPNO: "010-0000-1111", USER_ADDRESS: "영등포구 경인로 775(문래동3가)", CREATEDATE: "20221201", STATUS: "N"},
		{TEAM_CONSTNT_NO: 3, CONSTNT_MEMNO: "00000003", CONSTNT_NAME: "에이", CONSTNT_WEBID: "a1", CONSTNT_HPNO: "010-1234-2222", USER_ADDRESS: "영등포구 경인로 775(문래동3가)", CREATEDATE: "20221201", STATUS: "Y"},
		{TEAM_CONSTNT_NO: 4, CONSTNT_MEMNO: "00000004", CONSTNT_NAME: "비", CONSTNT_WEBID: "b1", CONSTNT_HPNO: "010-1482-3333", USER_ADDRESS: "영등포구 경인로 775(문래동3가)", CREATEDATE: "20221201", STATUS: "Y"},
		{TEAM_CONSTNT_NO: 5, CONSTNT_MEMNO: "00000005", CONSTNT_NAME: "씨", CONSTNT_WEBID: "c1", CONSTNT_HPNO: "010-1548-4444", USER_ADDRESS: "영등포구 경인로 775(문래동3가)", CREATEDATE: "20221201", STATUS: "N"}

	]
	
	return memberDataList;
}



function setUserFormData(data) {	
	setFormData("#memberForm", data)
}


function memberPlusReadOnlySettin(status){
	var grid =  $("#memberForm").dxForm("instance");
	var columns = grid.option("items");
	
	grid.resetValues();
	
	columns.forEach(function (column) {
		if(column.dataField != "CONSTNT_MEMNO" && column.dataField != "CONSTNT_WEBID") column.editorOptions.readOnly = status;
		
		if(column.dataField == "USER_ADDRESS"){
			console.log(column.editorOptions.buttons[0].options.disabled);
			column.editorOptions.buttons[0].options.disabled = status ;
			console.log(column.editorOptions.buttons[0].options.disabled);
		}
		
	});
	
	grid.repaint();
	
}