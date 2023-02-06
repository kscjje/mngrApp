//할인정보 설정관리
let tab7_form = null;
let tab7_grid = null;

function initFacilityDiscount() {
	if(tab7_form != null) return;
	if(tab7_grid != null) return;
	
	tab7_form = $("#tab7 .tab_contents2 .tab_contents_form").dxForm({
		showColonAfterLabel: false,
		items:[
			{dataField: "RENT_RESVE_UNCERTYN", label: {text: "비대면감면인증적용"}, editorType: "dxSelectBox",
				editorOptions: {dataSource: use_gbn,
					layout: "horizontal", valueExpr: "value", displayExpr: "text",
					onInitialized: function (e) {
						if (!e.component.option("value")) {
							e.component.option("value", e.component.option("dataSource")[0].value);
						}
					}
				}
			}
		]
	}).dxForm("instance");
	
	discountGrid();
}

function discountGrid() { 
	let resultList = new DevExpress.data.ArrayStore({
		key: "ID",
		data: discountResultDataList()
	});
	
	tab7_grid = $("#tab7 .tab_contents2 .tab_contents_grid").dxDataGrid({
		dataSource: resultList,
		keyExpr: "ID",
		width: "100%",
		allowColumnReordering: false,
		allowColumnResizing: true,
		showBorders: true,
		columnHidingEnabled: false,
		selection: {mode: "single"},
		sorting: {mode: "none"},
		paging: {
	      enabled: false
		},
		editing: {
	      mode: "cell",
	      allowUpdating: true
		},
		toolbar: {
			items: [{
				location: "after",
	        	widget: "dxButton",
	      		cssClass: "form-button",
	      		options: {
	      			text: "할인정보설정",
	      			type: "default",
	      			useSubmitBehavior: true,
	      			onClick() {
	      				DevExpress.ui.notify("할인정보설정 페이지 이동");
	      				//goUrl("fcltyItem", "1");	//페이지이동 (이동명, 시설분류번호)
	      			}
	      		}
			},
			{
				location: "after",
				widget: "dxButton",
				cssClass: "form-button",
				options: {
					text: "저장하기",
					type: "success",
					useSubmitBehavior: true,
					onClick() {
						DevExpress.ui.notify("리스트 저장");
					}
				} 
			}]
		},
		columns:[
			{dataField: "DC_NAME", width: "25%", caption: "할인명", allowEditing: false},
			{dataField: "DC_TYPE", visible: false},
			{dataField: "DC_TYPE_NAME", width: "10%", caption: "할인할증그룹", alignment: "center", allowEditing: false},
			{width: "25%", caption: "범위", alignment: "center",
				calculateCellValue: function (rowData) {
					var discountTemplate = "";
					let	discountStartAge = null;
					let	discountStartLimit = null;
					let	discountEndAge = null;
					let	discountEndLimit = null;
					let	discountRelationship = null;
					let	discountAuthPerson = null;
					let	discountAreaName = null;
					let	discountdisorderLevel = null;

					if (rowData) {
						discountStartAge = rowData.FACILITY_DISCOUNT_START_AGE;
						discountStartLimit = rowData.FACILITY_DISCOUNT_START_LIMIT;
						discountEndAge = rowData.FACILITY_DISCOUNT_END_AGE;
						discountEndLimit = rowData.FACILITY_DISCOUNT_END_LIMIT;
						discountRelationship = rowData.FACILITY_DISCOUNT_RELATIONSHIP;
						discountAuthPerson = rowData.FACILITY_DISCOUNT_AUTH_PERSON;
						discountAreaName = rowData.FACILITY_DISCOUNT_AREA_NAME;
						discountdisorderLevel = rowData.FACILITY_DISCOUNT_LEVEL;
					
						switch(rowData.DC_TYPE) { 
							case "0001": 
								//장애등급
								var disorderLevel = "";
								switch(discountdisorderLevel) {
									case "10": disorderLevel = "심한장애(1~3급)"; break;
									case "20": disorderLevel = "심하지않은장애(4~6급)"; break;
									case "1020": disorderLevel = "장애(1~6급)"; break;
								}
								discountTemplate = disorderLevel;
								break;
							case "0002": 
								//국가유공
								var relationship = "";
								switch(discountRelationship) {
									case "A": relationship = "본인"; break;
									case "B": relationship = "배우자"; break;
									case "C": relationship = "유가족"; break;
									case "AB": relationship = "본인 또는 배우자"; break;
									case "AC": relationship = "본인 또는 유가족"; break;
									case "BC": relationship = "배우자 또는 유가족"; break;
									case "ABC": relationship = "본인 또는 배우자 또는 유가족"; break;
								}
								var authPerson = "";
								switch(discountAuthPerson) {
									case "Y": authPerson = "수권자"; break;
									case "YN": authPerson = "수권자 및 비수권자"; break;
								}
								discountTemplate = "관계 : "+ relationship +", 수권여부 : "+ authPerson;
								break;
							case "0003": 
								//연령
								var startLimit = "";
								if (discountStartLimit == "0") {
									startLimit = "이상";
								}
								else if (discountStartLimit == "1") {
									startLimit = "이하";
								}
								else {
									startLimit = "범위";
								}
								
								var endLimit = "";
								if (discountEndLimit == "0") {
									endLimit = "이상";
								}
								else if (discountEndLimit == "1") {
									endLimit = "이하";
								}
								else {
									endLimit = "범위";
								}
								discountTemplate = discountStartAge + " "+ startLimit +" ~ "+ discountEndAge +" "+ endLimit;
								break;
							case "0004": 
								//거주지
								discountTemplate = discountAreaName;
								break;
						}
					}
					
					return discountTemplate;
				}
			},
			{dataField: "FACILITY_DISCOUNT_UNIT", width: "10%", caption: "할인단위", alignment: "center",
				calculateCellValue: function(rowData) {
					var discountUnitTemplate = "";
					if (rowData.FACILITY_DISCOUNT_UNIT == "0") {
						discountUnitTemplate = "할인율";
					}
					else if (rowData.FACILITY_DISCOUNT_UNIT == "1") {
						discountUnitTemplate = "할인금액";
					}
					
					return discountUnitTemplate;
				}
			}, 
			{dataField: "FACILITY_DISCOUNT_PRICE", width: "10%", caption: "할인율/할인금액", alignment: "right",
				calculateCellValue: function(rowData) {
					var discountPriceTemplate = "";

		            if (rowData.FACILITY_DISCOUNT_PRICE) {
						if (rowData.FACILITY_DISCOUNT_UNIT == "0") {
			            	discountPriceTemplate = rowData.FACILITY_DISCOUNT_PRICE +" %";
			            }
			            else {
			            	discountPriceTemplate = rowData.FACILITY_DISCOUNT_PRICE +" 원";
			            }
		            }
		            
		            return discountPriceTemplate;
				}
			},
			{dataField: "DISCOUNT_USE_YN", width: "8%", caption: "사용유무", alignment: "center", showEditorAlways: true, editorType: "dxSelectBox",
				editorOptions: {dataSource: use_gbn, displayExpr: "text", valueExpr: "value"}
			}
		]
	}).dxDataGrid("instance");
}

function discountResultDataList() {
	var dataList = "";
	
	dataList = [
		{ID: 1, DISCOUNT_USE_YN: "1", DC_NAME: "경로할인", DC_TYPE: "0003", DC_TYPE_NAME: "연령", FACILITY_DISCOUNT_START_AGE: 60, FACILITY_DISCOUNT_START_LIMIT: "0", FACILITY_DISCOUNT_END_AGE: 100, FACILITY_DISCOUNT_END_LIMIT: "1", FACILITY_DISCOUNT_RELATIONSHIP: "", FACILITY_DISCOUNT_AUTH_PERSON: "", FACILITY_DISCOUNT_AREA_NAME: "", FACILITY_DISCOUNT_LEVEL: "", FACILITY_DISCOUNT_UNIT: "0", FACILITY_DISCOUNT_PRICE: 50},
		{ID: 2, DISCOUNT_USE_YN: "1", DC_NAME: "국가유공자", DC_TYPE: "0002", DC_TYPE_NAME: "국가유공자", FACILITY_DISCOUNT_START_AGE: null, FACILITY_DISCOUNT_START_LIMIT: "", FACILITY_DISCOUNT_END_AGE: null, FACILITY_DISCOUNT_END_LIMIT: "", FACILITY_DISCOUNT_RELATIONSHIP: "A", FACILITY_DISCOUNT_AUTH_PERSON: "Y", FACILITY_DISCOUNT_AREA_NAME: "", FACILITY_DISCOUNT_LEVEL: "", FACILITY_DISCOUNT_UNIT: "1", FACILITY_DISCOUNT_PRICE: 5000},
		{ID: 3, DISCOUNT_USE_YN: "1", DC_NAME: "기초생활수급자", DC_TYPE: "0000", DC_TYPE_NAME: "기준없음", FACILITY_DISCOUNT_START_AGE: null, FACILITY_DISCOUNT_START_LIMIT: "", FACILITY_DISCOUNT_END_AGE: null, FACILITY_DISCOUNT_END_LIMIT: "", FACILITY_DISCOUNT_RELATIONSHIP: "", FACILITY_DISCOUNT_AUTH_PERSON: "", FACILITY_DISCOUNT_AREA_NAME: "", FACILITY_DISCOUNT_LEVEL: "", FACILITY_DISCOUNT_UNIT: "0", FACILITY_DISCOUNT_PRICE: 50},
		{ID: 4, DISCOUNT_USE_YN: "0", DC_NAME: "관내거주", DC_TYPE: "0004", DC_TYPE_NAME: "거주지", FACILITY_DISCOUNT_START_AGE: null, FACILITY_DISCOUNT_START_LIMIT: "", FACILITY_DISCOUNT_END_AGE: null, FACILITY_DISCOUNT_END_LIMIT: "", FACILITY_DISCOUNT_RELATIONSHIP: "", FACILITY_DISCOUNT_AUTH_PERSON: "", FACILITY_DISCOUNT_AREA_NAME: "", FACILITY_DISCOUNT_LEVEL: "", FACILITY_DISCOUNT_UNIT: "", FACILITY_DISCOUNT_PRICE: null},
	]
	
	return dataList;
}