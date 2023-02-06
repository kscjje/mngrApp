var popEduChange = null;
var eduChangeCallback = null;

function createEduChangePopup(selector, callback) {
	if (popEduChange){createEduChangePopup
		popEduChange = null;
		$(selector).dxPopup("dispose");
	}
	if (callback) {
		eduChangeCallback = callback;		
	}
	
	popEduChange = $(selector).dxPopup({
		contentTemplate: eduChangeTemplate,
		visible: true,
		title: '강좌 일괄 변경',
		width:1500,
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
		    	text: '닫기',
		    	onClick() {
		    		popEduChange.hide();
				},
			},
		}],
	}).dxPopup('instance');
}
//https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/DnDBetweenGrids/jQuery/Light/
const eduChangeTemplate = function () {
	var myformData1 = {};
	var myformData2 = {};
	myformData1.LEC_SEQ = -1;
	myformData1.LEC_NAME = "-";
	myformData1.LEC_TEACHER = "-";
	myformData1.LEC_WEEK = "-";
	myformData1.LEC_TIME = "-";
	
	myformData2.LEC_SEQ = -1;
	myformData2.LEC_NAME = "-";
	myformData2.LEC_TEACHER = "-";
	myformData2.LEC_WEEK = "-";
	myformData2.LEC_TIME = "-";
	/*
	myformData.LEC_SEQ = 1;
	myformData.LEC_NAME = "정기수영 새벽1 중급 [월수반]";
	myformData.LEC_TEACHER = "이순신";
	myformData.LEC_WEEK = "월,화,수,목";
	myformData.LEC_TIME = "06:00~07:00";*/
	
	 const content = $("<div class='educhange-tables'/>");
	 content.append(
		 $("<div id='eduChangeSrcForm' class='educhange-column selected-form-group'>").dxForm({
			 formData: myformData1,
			 showColonAfterLabel: false,
			 items:[
				 /*{itemType:'group',colCount:6,caption:'변경전 강좌 정보',
					 items:[
						 {colSpan:3, dataField: 'LEC_NAME', label: {text: '강좌명',},
							 template:$('<span>').text(myformData1["LEC_NAME"])},
						 {colSpan:2,dataField: 'LEC_TEACHER', label: {text: '강사명',},
							 template:$('<span>').text(myformData1["LEC_TEACHER"])},
							 {itemType: 'button',
									buttonOptions: {
										icon: 'edit',
										type: 'normal',
										onClick() {
											createLectureSearchPopup(subPopupSelector, function() {
												
											});
										},
									},
							},	 
						 {colSpan:3, dataField: 'LEC_WEEK', label: {text: '강좌요일',},
							 template:$('<span>').text(myformData1["LEC_WEEK"])
						 },
						 {colSpan:2,dataField: 'LEC_TIME', label: {text: '강좌시간',},
							 template:$('<span>').text(myformData1["LEC_TIME"])},
						{itemType:'empty'},
					]
				 },*/
		/*		 {itemType:'group',caption:'회원 선택',
					 items:[
						 {itemType:'empty'},
						 {template:"<span>-</span>"}
					 ]
				 },*/
				 {itemType:'empty'},
				 {
						template: srcUsersTemplate
				 }
				
			  ],
		 })
	 );
	 content.append(
			 $("<div id='button-group' class='educhange-button_group'>").dxForm({
				 showColonAfterLabel: false,
				 items:[
					 {itemType:'empty'},
					 {
			            itemType: "button",
			            buttonOptions: {
			            	icon : 'chevronright',
			                stylingMode : 'text',
			                onClick(e){
			                /*        const selectedItems = unavailableCopySourceListInstance.option('selectedItems');
			                        if(selectedItems) {
			                            unavailableCopyTargetListOptions.dataSource(selectedItems);
			                            unavailableCopyTargetListInstance.reload();
			                        }*/
			                }
			            }
				      },
				      
				      
					 {
			            itemType: "button",
			            buttonOptions: {
			            	icon : 'chevronleft',
			                stylingMode : 'text',
			                onClick(e){
			                /*       const selectedKeys = unavailableCopyTargetListInstance.option('selectedItemKeys');

                        if(selectedKeys) {
                            const prevSource = unavailableCopyTargetListOptions.dataSource();

                            const filtered = prevSource.filter((element) => !selectedKeys.includes(element.id));

                            unavailableCopyTargetListOptions.dataSource(filtered);
                            unavailableCopyTargetListInstance.reload();

                        }*/
			                }
			            }
					 }, 
				  ],
			 })
		 );
	 content.append(
			 $("<div id='eduChangeTargetForm' class='educhange-column selected-form-group'>").dxForm({
				 formData: myformData2,
				 showColonAfterLabel: false,
				 items:[
					 {itemType:'group',colSpan:5,colCount:6,caption:'변경후 강좌 정보',
						 items:[
							 {colSpan:3, dataField: 'LEC_NAME', label: {text: '강좌명',},
								 template:$('<span>').text(myformData2["LEC_NAME"])},
							 {colSpan:2,dataField: 'LEC_TEACHER', label: {text: '강사명',},
								 template:$('<span>').text(myformData2["LEC_TEACHER"])},
							 {itemType: 'button',
									buttonOptions: {
										icon: 'edit',
										type: 'normal',
										onClick() {
											createLectureSearchPopup("#userPopup2", function() {
											});
										},
									},
							},	 
							 {colSpan:3, dataField: 'LEC_WEEK', label: {text: '강좌요일',},
								 template:$('<span>').text(myformData2["LEC_WEEK"])
							 },
							 {colSpan:2,dataField: 'LEC_TIME', label: {text: '강좌시간',},
								 template:$('<span>').text(myformData2["LEC_TIME"])},
							 
							{itemType:'empty'},
						]
					 },
					 {
						 template: targetUsersTemplate
					},
				  ],
			 })
		 );
	 

	 return content;
}

const srcUsersTemplate = function(){
	const srcUsers=[
		{EDC_PRGMNM:'16시 아동1반 초급[월화수목]',USER_NO:'00001101',USER_NAME:'홍길동',USER_GENDER:'남',USER_BIRTH:'1980-01-01',USER_BIRTH_TYPE:'양력',USER_REG_DT:'2021-01-01',USER_HP:'010-1111-2222',USER_SEND_YN:'Y',EDU_ITEM_NM:'월정기수영[성인]',TRAIN_SDATE:'2022-05-01',TRAIN_EDATE:'2022-06-01'},
		{EDC_PRGMNM:'16시 아동1반 초급[월화수목]',USER_NO:'00001102',USER_NAME:'이순신',USER_GENDER:'남',USER_BIRTH:'1979-08-29',USER_BIRTH_TYPE:'음력',USER_REG_DT:'2021-01-02',USER_HP:'010-2143-3333',USER_SEND_YN:'N',EDU_ITEM_NM:'월정기수영[성인]',TRAIN_SDATE:'2022-05-02',TRAIN_EDATE:'2022-06-01'},
		{EDC_PRGMNM:'16시 아동1반 초급[월화수목]',USER_NO:'00001103',USER_NAME:'고구마',USER_GENDER:'여',USER_BIRTH:'1979-08-29',USER_BIRTH_TYPE:'음력',USER_REG_DT:'2021-01-02',USER_HP:'010-2143-3333',USER_SEND_YN:'N',EDU_ITEM_NM:'월정기수영[어린이]',TRAIN_SDATE:'2022-05-02',TRAIN_EDATE:'2022-06-01'},
	];
	 return $("<div id='srcUserGrid'>")
		.dxDataGrid({
				dataSource: srcUsers,
				keyExpr: 'USER_NO',
				height:'450px',
				allowColumnResizing: true,
				allowColumnReordering: true,
				columnAutoWidth: true,
				showBorders: true,
				paging: {
					enabled: false,
				},
			    searchPanel: {
			    	visible: true,	
				    placeholder: 'Search...',
			    },
				columnChooser: {
				    	enabled: true,
				    	allowSearch: true,
				    	location: 'before',
				},
				selection: {mode: 'multiple',showCheckBoxesMode:'always',},
				columns: chgUsersColumns,
			    onToolbarPreparing(e) {
				      const dataGrid = e.component;
				      /* e.toolbarOptions.visible = false;  
				      var toolbarItems = e.toolbarOptions.items;  
				      $.each(toolbarItems, function (_, item) {  
						        if (item.name == "saveButton" || item.name == "revertButton" ) { 
						            item.visible = false;  
						        }  
					  });*/
			    }
		});
}

const chgUsersColumns=
	[
    	{
    		dataField:'USER_NAME',
    		caption:'회원명',
    	},
    	{
    		dataField: 'USER_BIRTH',
    		caption: '생년월일',
    	},
    	{
	  		caption: '휴대전화',
	  		dataField: 'USER_HP',
    	},
    	{
	  		caption: '강좌시작일',
	  		dataField: 'TRAIN_SDATE',
    	},
    	{
	  		caption: '강좌종료일',
	  		dataField: 'TRAIN_EDATE',
    	},
    	{
	  		caption: '강좌명',
	  		dataField: 'EDC_PRGMNM',
    	},
    	{
	  		caption: '요금명',
	  		dataField: 'EDU_ITEM_NM',
    	},
    	{
	  		caption: '회원번호',
	  		dataField: 'USER_NO',
	  		visible:false,
    	},
    ];

const targetUsersTemplate = function(){
	 return $("<div id='targetUserGrid'>")
	 .dxDataGrid({
			//dataSource: srcUsers,
			keyExpr: 'USER_NO',
			height:'450px',
			allowColumnResizing: true,
			allowColumnReordering: true,
			columnAutoWidth: true,
			showBorders: true,
			paging: {
				enabled: false,
			},
			searchPanel: {
		    	visible: true,	
			    placeholder: 'Search...',
		    },
			columnChooser: {
			    	enabled: true,
			    	allowSearch: true,
			    	location: 'before',
			},
			selection: {mode: 'multiple',showCheckBoxesMode:'always',},
			columns: chgUsersColumns,
		    onToolbarPreparing(e) {
			      const dataGrid = e.component;
			      /* e.toolbarOptions.visible = false;  
			     var toolbarItems = e.toolbarOptions.items;  
			      $.each(toolbarItems, function (_, item) {  
					        if (item.name == "saveButton" || item.name == "revertButton" ) { 
					            item.visible = false;  
					        }  
				  });*/
		    }
	});
}