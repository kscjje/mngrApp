function createTab8Init() {
	$(".tab-contents > div").hide();
	$("#tab8").show();
	
	var columnlist = getTab8ColumnList();
	//var lectureList = getList();
	
	var lectureList = snsList;
	
	$('#tab8 .gridContainer').dxDataGrid({
		dataSource: lectureList,
		keyExpr: "SNS_SEQ",
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
			const dataGrid = e.component;
			e.toolbarOptions.items.push({
				 location: 'after',
				 widget: 'dxButton',
				 options: {
					 	icon: 'fa fa-commenting-o',
					 	onClick() {
					 		gridEduPrg.refresh();
					 	},
				 },
			});
		},
	    editing: {
	      mode: 'row',
	      allowDeleting: true,
	      useIcons: true,   
	    },
		onCellPrepared: function(e){  
        	if(e.rowType === 'header' && e.column.command == "edit") {  
                	var commandCell = e.cellElement;  
                	commandCell.text("연계해제");  
          	}  
		},			    		
	});
}

function getTab8ColumnList() {
	var resultColumn = {};
	
	resultColumn = [{
		dataField: 'SNS_SEQ',
		visible: false,
		caption: '번호',
	}, {
		dataField: 'SNS_TYPE',
		caption: 'SNS 구분',
	}, {
		dataField: 'SNS_ID',
		caption: 'SNS 아이디',		
	}, {							
		dataField: 'SNS_FIRST_DT',
		caption: '가입일시',
	}, {
		dataField: 'SNS_REG_DT',
		caption: 'SNS 연계일시',		
	}];
	
	resultColumn = setColumnAlignment(resultColumn);
	return resultColumn;
}	
