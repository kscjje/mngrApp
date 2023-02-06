var	createPopup=null;
var frmPopup=null;
var textBoxInstrctr_name=null;
function createEduPrgDetailForm() 
{
	//colCount:3
	
	var resultItems = {};
	resultItems= [
		{dataField: 'USE_YN',
			label: {
				text: '강좌운영여부',
				template: function (data, labelElement) {
					labelElement.append("<div id='template-content'><span class='dx-field-item-label-text boldlabel'>" +data.text +"</span></div>");
				}
			}
		},
		{dataField: 'EDC_OPENYN',
			label: {
				text: '온라인공개여부',
				template: function (data, labelElement) {
					labelElement.append("<div id='template-content'><span class='dx-field-item-label-text boldlabel'>" +data.text +"</span></div>");
				}
			}
		},
		{itemType:'empty'},
		{colSpan:2,
			dataField:'CTGCD',label: {text:'운영상품분류'},
			template: function (cellInfo, itemElement) {
				var ctgType='0';
				var initValue = $('#gridEduPrg').dxDataGrid('instance').cellValue(selectedRowIndex, "CTGCD");
				itemElement.append( 
					createCategoryDorpdownTreeTemplateCreate('treeCtgCd','single',ctgType,initValue)
				);
			},
			validationRules: [{type: "required",message: "분류 필수 선택"}]
		},
		{itemType:'empty'},
		{colSpan:2,
			dataField:'COM_CTGCD',label: {text:'강좌검색분류'},
			template: function (cellInfo, itemElement) {
				var initValue = $('#gridEduPrg').dxDataGrid('instance').cellValue(selectedRowIndex, "COM_CTGCD");
				itemElement.append( 
					createCategoryDorpdownTreeTemplateCreate('treeComCtgcd','single','1',initValue)
				);
			},
			/*validationRules: [{type: "required",message: "분류 필수 선택"}]*/
		},
		{itemType:'empty'},
		{colSpan:2,dataField: 'EDC_PRGMNM',label: {text: '강좌명',},
			validationRules: [{type: "required",message: "강좌명 필수 입력"}]
		},
		{dataField: 'INSTRCTR_NAME',label: {text:'강사명'},editorType:'dxTextBox',
			editorOptions:{
				/*onInitialized: function (e){
			         textBoxInstrctr_name = e; // assign the instance
			    },*/
			    elementAttr: {id: 'userName'},
				buttons: [{name: 'searchInstructor',location: 'after',
					 options: {
						 template: '<i class="nav-icon fas fa-search-plus"></i>',
						 type: 'default',
								onClick(e) {
							 		createInstructorPopup(function(data) {
										if (data && data.USER_SEQ) {
											
								          var instanceUserName = $('#userName').dxTextBox("instance"); // or via elementAttr 
								          instanceUserName.option("value", data.KOR_NAME);
								          $('#gridEduPrg').dxDataGrid('instance').cellValue(selectedRowIndex, "USER_SEQ", data.USER_SEQ);
								          //visible false이면 option value값이 셋팅이 안됨.
										}
							 		});
						 },
					},
				},],
			  }
		 },
		{dataField: 'EDC_PLACENM',label: {text:'강좌장소'},editorType: 'dxTextBox',},		
  		{dataField: 'EDC_CLASS_TYPE',label: {text: '강좌구분'},editorType: 'dxSelectBox',
  			editorOptions: {
  				dataSource:classtype_gbn,
  	        	valueExpr: 'value', 
  	        	displayExpr: 'text',
  			}	
  		},
  		{dataField: 'EDC_CLASS_GBN',label: {text: '강좌종목'},editorType: 'dxSelectBox',
  			editorOptions: {
  				dataSource:class_gbn,
  	        	valueExpr: 'value', 
  	        	displayExpr: 'text',
  			}	
  		},
  		{dataField: 'EDC_DAYVISITCNT_YN',label: {text:'일일방문가능횟수'},editorType: 'dxSelectBox',
  			editorOptions: {
  				dataSource:set_gbn,
  				valueExpr: 'value', 
	        	displayExpr: 'text',
	        	onItemClick(e) {
	        		if (e.itemData.value == "0") {
	                	$("#editForm").dxForm("instance").itemOption('EDC_DAYVISITCNT', "disabled", true); 
	                } else {
	                	$("#editForm").dxForm("instance").itemOption('EDC_DAYVISITCNT', "disabled", false);
	                }
    		    },
			}
  		},
		{itemType:'group',colCount:2,
	      	items:[
	      		{
	      			dataField: 'EDC_DAYVISITCNT',
	      			label: {visible:false},editorType:'dxNumberBox',
	      			editorOptions:{showSpinButtons: true,format: "#,##0 회",}
	      		},
				{itemType:'empty'}
	      	]
      	},
      	{dataField: 'EDC_ALERT_SEND_YN',label: {text:'방문시보호자알림전송'},editorType: 'dxSelectBox',
      		editorOptions: {dataSource:use_gbn,
      			valueExpr: 'value', 
  	        	displayExpr: 'text',
  			}
  		},
  		{dataField: 'EDC_STIME',label: {text:'강좌시간'}},
  		{dataField: 'EDC_ETIME',label: {text:"~",alignment:'center'}},
  		{dataField: 'EDC_TARGETINFO',label: {text:'교육대상표시명'}},
		{
  			itemType: 'group',colSpan:3,colCount:3,
		    caption:'강좌기간설정',
		    items: [
		    	{dataField: 'EDC_TERM_YN',label: {visible:false},editorType: 'dxSelectBox',
		  			editorOptions: {
		  				dataSource:set_gbn,
			        	valueExpr: 'value', 
			        	displayExpr: 'text',
			        	onItemClick(e) {
			        		var frmInstance = $("#editForm").dxForm("instance");
			        		if (e.itemData.value == "0") {
			        			frmInstance.itemOption('강좌기간설정.EDC_SDATE', "disabled", true); 
			        			frmInstance.itemOption('강좌기간설정.EDC_EDATE', "disabled", true);
			                } else {
			                	frmInstance.itemOption('강좌기간설정.EDC_SDATE', "disabled", false);
			                	frmInstance.itemOption('강좌기간설정.EDC_EDATE', "disabled", false);
			                }
		    		    },
					}	
				},
				{dataField: 'EDC_SDATE',label: {visible:false},editorType: 'dxDateBox',disabled:true,
					editorOptions: {displayFormat: 'yyyy-MM-dd'}
				},
				{dataField: 'EDC_EDATE',label: {text:'~'},editorType: 'dxDateBox',disabled:true,
					editorOptions: {displayFormat: 'yyyy-MM-dd'}
				},
			],
		},
		{
			itemType: 'group',colSpan:3,colCount:2,
		    caption:'강좌요일',name:'week',
		    	items: [
		    		{label:{visible:false},name:'weekgroup',
		    			editorType: 'dxRadioGroup',
		        		editorOptions:{
		        			dataSource:week_gubn,
		        			layout:'horizontal', 
		        			valueExpr: 'value', 
		        			displayExpr: 'text',
		        			onValueChanged(e){
		        				weekValueChanged(e.value);	
		        		    },
		        		}
		    		},
		        	{
      		  			itemType: 'group',colCount:7,name:'day',
      		  			items:[
		        			  {name:'EDC_MON',label:{visible:false},editorType: 'dxCheckBox'
		        				  ,editorOptions: {text: '월',}},
		        			  {name:'EDC_TUE',label:{visible:false},editorType: 'dxCheckBox',editorOptions: {text: '화',}},
		        			  {name:'EDC_WED',label:{visible:false},editorType: 'dxCheckBox',editorOptions: {text: '수',}},
		        			  {name:'EDC_THU',label:{visible:false},editorType: 'dxCheckBox',editorOptions: {text: '목',}},
		        			  {name:'EDC_FRI',label:{visible:false},editorType: 'dxCheckBox',editorOptions: {text: '금',}},
		        			  {name:'EDC_SAT',label:{visible:false},editorType: 'dxCheckBox',editorOptions: {text: '토',}},
		        			  {name:'EDC_SUN',label:{visible:false},editorType: 'dxCheckBox',editorOptions: {text: '일',}},
		        			  {name:'EDC_DAYS',label: {text:'강좌요일'}, visible: false,},
		        		]
      		  		}
		    	]
		},
		{
			itemType: 'group', colSpan:3,colCount:8,
		    caption:'비대면강좌운영',
		    items: [
		    	{dataField: 'EDC_ONLINEYN',label: {visible:false},
		    		editorType: 'dxSelectBox',
		    		editorOptions: {
						dataSource:run_gbn,
				        valueExpr: 'value', 
				        displayExpr: 'text',
				        onItemClick(e) {
				        	var frmInstance = $("#editForm").dxForm("instance");
			        		if (e.itemData.value == "0") {
			        			frmInstance.itemOption('비대면강좌운영.EDC_ONLINE_TYPE', "disabled", true); 
			        			frmInstance.itemOption('비대면강좌운영.EDC_ONLINE_URL', "disabled", true);
			        			frmInstance.itemOption('비대면강좌운영.EDC_ONLINE_PWD', "disabled", true);
			                } else {
			                	frmInstance.itemOption('비대면강좌운영.EDC_ONLINE_TYPE', "disabled", false);
			                	frmInstance.itemOption('비대면강좌운영.EDC_ONLINE_URL', "disabled", false);
			                	
			                	let yn4 = gridEduPrg.cellValue(selectedRowIndex, "EDC_ONLINE_TYPE");;
			                	if(yn4 =='1'){
			                		frmInstance.itemOption('비대면강좌운영.EDC_ONLINE_PWD', "disabled", false);
			                	}else{
			                		frmInstance.itemOption('비대면강좌운영.EDC_ONLINE_PWD', "disabled", true);
			                	}
			                }
		    		    },
					}	
		        },
		        {colSpan:2,dataField: 'EDC_ONLINE_TYPE',label: {text:'강의영상운영방법'},
		        	editorType:'dxSelectBox',
		        	editorOptions:{
		        		dataSource: online_type,
		        		displayExpr: 'text',
		        		valueExpr: 'value',
		        		onItemClick(e) {
		        			var frmInstance = $("#editForm").dxForm("instance");
		        			if (e.itemData.value == "0") {
		        				frmInstance.itemOption('비대면강좌운영.EDC_ONLINE_PWD', "disabled", true);
		        			} else {
		        				frmInstance.itemOption('비대면강좌운영.EDC_ONLINE_PWD', "disabled", false);
		        			}
		        		},
		        	}
		        },
		        {colSpan:3,dataField: 'EDC_ONLINE_URL',label: {text:'강의영상 URL'}},
		        {colSpan:2,dataField: 'EDC_ONLINE_PWD',label: {text:'ZOOM 비밀번호'}},
			],
		},
		{itemType: 'group',caption:"가격 정책",colSpan:3,colCount:6,
			items:[
				{dataField: 'EDC_FEE_POLICY',label: {visible:false},editorType: 'dxSelectBox',
					editorOptions: {
						dataSource:fee_gbn,
						valueExpr: 'value', 
						displayExpr: 'text',
						
					}	
				},
				{itemType: 'empty',colSpan:5},		    	
				{colSpan:6,template: function (data, itemElement) {gridFeeTemplateCreate(data, itemElement);},},
			]
		}
	];
	
	return resultItems;
}
function  gridFeeTemplateCreate(data, itemElement) {
	itemElement.append( $("<div id='gridFee'>")
		.dxDataGrid({
			dataSource: FEE_ITEMS,
			keyExpr: 'ITEM_CD',
			showBorders: true,
			allowColumnResizing: true,
			focusedRowEnabled: true,
			focusedRowIndex: 0,
			paging: {
				enabled: false,
			},
			editing: {
			      mode: 'batch',
			      allowUpdating: true,
			      allowDeleting: true,
			      useIcons: true,
			      selectTextOnEditStart: true,
			},
			selection: {mode: 'multiple',showCheckBoxesMode:'always',},
			toolbar: {
				items: [
					{
						location: 'after',
						widget: 'dxButton',
						options: {
							hint: '요금신규',   
							icon:'add',
							onClick(e) {
							//const expanding = e.component.option('text') === 'Expand All';
								CreateFeeRegForm();
							},
						},
					},
					
					{
			          location: 'after',
			          widget: 'dxButton',
			          options: {
			            icon: 'refresh',
			            onClick() {
			              //dataGrid.refresh();
			            },
			          },
			        },
			        
			      ],
			    },
		        columns:[
			        {dataField: 'ITEM_NM',caption: '요금명'},
					{dataField: 'COST_AMT',caption: '금액' , dataType: "number", format: def_numberFormat},
					{dataField: 'MONTH_CNT',caption: '개월수',  dataType: "number"},
					{dataField: 'WEB_DISPYN',caption: '온라인공개',
									showEditorAlways: true,
									lookup: {
							          dataSource: online_gbn,
							          displayExpr: 'text',
							          valueExpr: 'value',
							        },
					},
					{dataField: 'KIOSK',caption: '키오스크노출',
			        	showEditorAlways: true,
			        	lookup: {
			        		dataSource: view_gbn,
			        		displayExpr: 'text',
			        		valueExpr: 'value',
			        	},
			        },
			        {dataField: 'VALID_COUNTYN',caption: '이용가능횟수차감운영',width:150, 
						showEditorAlways: true,
						lookup: {
							dataSource: counting_gbn,
							displayExpr: 'text',
							valueExpr: 'value',
						},
					},
					{dataField: 'VALID_COUNT',caption: '이용가능횟수',dataType: "number", format: def_numberFormat,
						showEditorAlways: true,
					},
					{dataField: 'TAX_YN',caption: '(비)과세',
						showEditorAlways: true,
						lookup: {
							dataSource: tax_gbn,
							displayExpr: 'text',
							valueExpr: 'value',
						},
					},
					{dataField: 'DISCOUNT_YN',caption: '할인적용',
						showEditorAlways: true,
						lookup: {
							dataSource: apply_gbn,
							displayExpr: 'text',
							valueExpr: 'value',
						},
					},							        
					{dataField: 'ITEM_CD',caption:'요금코드',visible:false},
				],
		        hoverStateEnabled: true,
		        scrolling: { mode: 'virtual' },
		        height: 150,
		        selection: {mode: 'multiple',showCheckBoxesMode:'always',},
		        onSelectionChanged(selectedItems) {
		          /*const keys = selectedItems.selectedRowKeys;
		          e.component.option('value', keys);*/
		        },
		      }
			)
		);
}


let treeView;


const makeAsyncDataSource = function (jsonFile) {
	return new DevExpress.data.CustomStore({
		loadMode: 'raw',
		key: 'ID',
		load() {
			return jsonFile;//$.getJSON(`data/${jsonFile}`);
		},
	});
};
function weekValueChanged(value) {
	  frmPopup =$("#editForm").dxForm("instance");
	  if(frmPopup ==null) return;
	  if (value == null) return
	  //전체, 평일,월수금,
		if(value  == '0' || value  == '1' || value  == '3'){
			frmPopup.getEditor('EDC_MON').option('value',true);
			frmPopup.getEditor('EDC_WED').option('value',true);
			frmPopup.getEditor('EDC_FRI').option('value',true);
		}//전체, 평일,화목,
		if(value  == '0' || value  == '1' || value  == '4'){
			frmPopup.getEditor('EDC_TUE').option('value',true);
			frmPopup.getEditor('EDC_THU').option('value',true);
		}
		//전체, 주말
		if(value  == '0' || value  == '2' ){
			frmPopup.getEditor('EDC_SAT').option('value',true);
			frmPopup.getEditor('EDC_SUN').option('value',true);
		}
		//평일
		if(value  == '1'){
			frmPopup.getEditor('EDC_SAT').option('value',false);
			frmPopup.getEditor('EDC_SUN').option('value',false);
		}
		//주말
		if(value  == '2'){
			frmPopup.getEditor('EDC_MON').option('value',false);
			frmPopup.getEditor('EDC_TUE').option('value',false);
			frmPopup.getEditor('EDC_WED').option('value',false);
			frmPopup.getEditor('EDC_THU').option('value',false);
			frmPopup.getEditor('EDC_FRI').option('value',false);
		}
		//월,수,금
		if(value  == '3'){
			frmPopup.getEditor('EDC_TUE').option('value',false);
			frmPopup.getEditor('EDC_THU').option('value',false);
			frmPopup.getEditor('EDC_SAT').option('value',false);
			frmPopup.getEditor('EDC_SUN').option('value',false);
		}
		//화,목
		if(value  == '4'){
			frmPopup.getEditor('EDC_MON').option('value',false);
			frmPopup.getEditor('EDC_WED').option('value',false);
			frmPopup.getEditor('EDC_FRI').option('value',false);
			frmPopup.getEditor('EDC_SAT').option('value',false);
			frmPopup.getEditor('EDC_SUN').option('value',false);
		}
	  
}

function AddFeeRegPopup(e) {
	CreateFeeRegForm();
	
    /*var changes = e.component.option("editing.changes");
    e.component.cancelEditData();
    e.component.option("editing.mode", "popup");
    e.component.option("editing.changes", changes);

    if (e.row.isNewRow == true) {
        e.component.addRow();
    }
    else {
        e.component.editRow(e.row.rowIndex);
    }
  
	e.component.option("editing.popup.onShown", function() {
		var rowChange = changes.find(c => c.key === e.row.key);
	    if (rowChange) {
	    	Object.keys(rowChange.data).forEach(key => {
	        e.component.cellValue(e.row.rowIndex, key, rowChange.data[key]);
	      });
	     }
	     changes.splice(changes.indexOf(rowChange), 1);
	  });
  
      e.component.option("editing.popup.onHiding", function () {
      e.component.option("editing.mode", "batch");
      e.component.option("editing.changes", changes);
    });      */

}
