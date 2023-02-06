function createTab7Init() {
	$(".tab-contents > div").hide();
	$("#tab7").show();
	
	$("#tab7 .btn-top-area > div").eq(0).dxButton({
		stylingMode: 'contained',
		text: '가족연결등록',
		type: 'default',
		onClick() {
			createFamilyFormPopup('#userPopup', function(data) {
				if (data) {
					alert(data);					
				}
			});
		},
	});
	
	var columnlist = getTab7ColumnList();
	//var lectureList = getList();
	
	var lectureList = familyList;
	
	$('#tab7 .gridContainer').dxDataGrid({
		dataSource: lectureList,
		keyExpr: "FML_SEQ",
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
	    //selection: {mode: 'multiple'},	
	    onToolbarPreparing(e) {
			var dataGrid = e.component;
			e.toolbarOptions.items.push({
				 location: 'after',
				 widget: 'dxButton',
				 options: {
					 	icon: 'fa fa-commenting-o',
					 	onClick() {
					 	},
				 },
			});
		},
	    editing: {
	      mode: 'row',
	      allowUpdating: true,
	      allowDeleting: true,
	      useIcons: true,   
	    },
//		onCellPrepared: function(e){  
//        	if(e.rowType === 'header' && e.column.command == "edit") {  
//                	var commandCell = e.cellElement;  
//                	commandCell.text("연결해제");  
//          	}  
//		},			    		
	});
}

function getTab7ColumnList() {
	var resultColumn = {};
	
	resultColumn = [{
		caption: '주회원 정보',
		columns: [{
			dataField: 'USER_NO',
			caption: '회원번호',
			allowEditing: false,	
		}, {
			dataField: 'USER_NAME',
			caption: '회원명',	
			allowEditing: false,
		}, {
			dataField: 'USER_BIRTH',
			caption: '생년월일',	
			allowEditing: false,
		}, {
			dataField: 'USER_HP',
			caption: '휴대전화',	
			allowEditing: false,								
		}],
	}, {					
			dataField: 'FML_TYPE',
			caption: '관계',	
			lookup: {
				dataSource: familyType,
				displayExpr: 'NAME',
				valueExpr: 'ID',
			}					
	}, {
		caption: '부회원(가족) 정보',
		columns: [{
			dataField: 'FML_SEQ',
			visible:false,
			caption: '가족번호',					
		}, {		
			dataField: 'FML_APP_YN',
			caption: '온라인대리접수가능',
			lookup: {
				dataSource: availType,
				displayExpr: 'NAME',
				valueExpr: 'ID',
			}									
		}, {							
			dataField: 'FML_NAME',
			caption: '회원명',
			allowEditing: false,
		}, {
			dataField: 'FML_NO',
			caption: '회원번호',	
			allowEditing: false,	
		}, {
			dataField: 'FML_BIRTH',
			caption: '생년월일',	
			allowEditing: false,
		}, {
			dataField: 'FML_HP',
			caption: '휴대전화',	
			allowEditing: false,
		}, {
			dataField: 'FML_GENDER',
			caption: '성별',		
			allowEditing: false,									
		}],
	}];
	
	resultColumn = setColumnAlignment(resultColumn);
	return resultColumn;
}	
