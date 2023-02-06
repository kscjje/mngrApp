var selectHolidayTimeCallback = null;
var popSelectHolidaySearch = null;
var targetEvent =null;
/**
 * 공휴일 자유시간 선택 팝업
 * @param selector 검색 팝업
 * @param conditionFormData 검색 조건 소유 폼
 * @param callback 팝업 선택 callback 메서드
 * @returns
 */
function createSelectHolidayTimePopup(selector, event, callback) {
	
	if (popSelectHolidaySearch){
		popSelectHolidaySearch = null;
		$(selector).dxPopup("dispose");
	}
	
	if (callback) {
		selectHolidayTimeCallback = callback;		
	}
	
	if (event) {
		targetEvent = event;
	}
	popSelectHolidaySearch = $(selector).dxPopup({
		contentTemplate: selectHolidayTimeTemplate,
		visible: true,
		title: '공휴일 자유수영 시간 선택',
		width:500,
        height:300,
		position: {
			my: 'center',
			at: 'center',
			of: window
		},
		dragEnabled: true,
		toolbarItems: [
			{
				widget: 'dxButton',
			    toolbar: 'bottom',
			    location: 'after',
			    options: {
			    	text: '선택',
			    	onClick() {
			    		var selectedRows = $("#selectHolidayGrid").dxDataGrid("instance").getSelectedRowsData();
			    		if(selectedRows){
			    			if(selectHolidayTimeCallback ) selectHolidayTimeCallback(targetEvent,selectedRows[0]);
			    			popSelectHolidaySearch.hide();
			    		}else{
			    			 DevExpress.ui.dialog.alert('공휴일 시간을 선택 해주세요', "공휴일 자유수영시간표");
			    		}
					},
				},
			},	
		{
			widget: 'dxButton',
		    toolbar: 'bottom',
		    location: 'after',
		    options: {
		    	text: '닫기',
		    	onClick() {
		    		popSelectHolidaySearch.hide();
				},
			},
		}],
	}).dxPopup('instance');
}

const selectHolidayTimeTemplate = function () {
	var myformData = {};

	for (let i = 0; i < FREE_SCHEDULE2.length; i += 1) {
		var isHoliday = (FREE_SCHEDULE2[i].group_weekdays && FREE_SCHEDULE2[i].group_weekdays.find(item => item=='7')) ?true:false; //공휴일
		if(isHoliday){
			holiday_index=i;
			break;
		}
	}
	
	
	var groupId=FREE_SCHEDULE2[holiday_index].group_id;
	var strWeekdays = getWeektoHangul(FREE_SCHEDULE2[holiday_index].group_weekdays);
	var groupName=FREE_SCHEDULE2[holiday_index].group_name  + ' (' + getWeektoHangul(FREE_SCHEDULE2[holiday_index].group_weekdays)+')';
	
	 const content = $("<div />");
	 content.append(
		 $("<div id='selectHolidayTimeForm' class='selected-form-group'>").dxForm({
			 showColonAfterLabel: false,
			 items:[
				 {
					 template: function(){
				    	  return $("<div id='selectHolidayGrid'>")
				  				.dxDataGrid({
				  						dataSource: FREE_SCHEDULE2[holiday_index].times,
				  						keyExpr: 'time_id',
				  						allowColumnReordering: false,
				  						showBorders: true,
				  						paging: {
				  							enabled: false,
				  						},
				  						searchPanel: {
				  							visible: false,
				  						},
				  						groupPanel: {
				  							visible: false,
				  						},
				  						selection: {mode: 'single'},
				  						columns: [
						  			    	{
						  			    		dataField:'time_name',
						  			    		caption:'회차명',
						  			    	},
						  			    	{
						  			    		caption: '시작시간',
						  			    		dataField: 'time_start',
						  			    	},
						  			    	{
						  				  		caption: '종료시간',
						  				  		dataField: 'time_end',
						  			    	},
						  			    ],
						  			    onToolbarPreparing(e) {
						  				      const dataGrid = e.component;
						  				      e.toolbarOptions.visible = false;  
						  				      /*var toolbarItems = e.toolbarOptions.items;  
						  				      $.each(toolbarItems, function (_, item) {  
						  						        if (item.name == "saveButton" || item.name == "revertButton" ) { 
						  						            item.visible = false;  
						  						        }  
						  					  });*/
						  			    }
						  		});
					 	}
				 }
			  ],
		 })
	 );
	 return content;
}

