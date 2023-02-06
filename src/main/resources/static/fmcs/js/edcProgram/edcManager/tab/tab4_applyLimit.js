//신청제한
//할인 할증
let subMenuList4=null;
let reg_opt_form=null;
let age_opt_form=null;
var tab4gridDropdown=null;
let tab4formData=null;
let tab4formDataAge=null;
function CreateTab4Init()
{
	if(subMenuList4!=null) return;
	var menus = [
		  { id: 0, text: '신청제한', },
		  { id: 1, text: '연령제한', },
	]
	
	subMenuList4 = $('#tab4 .tab_list').dxList({
		 dataSource: new DevExpress.data.DataSource({
		      store: new DevExpress.data.ArrayStore({
		        key: 'id',
		        data: menus,
		      }),
		    }),
		selectionMode:'single', 
	    allowItemDeleting: false,
	    onSelectionChanged(component) {
	    	var cur= subMenuList4.option('selectedItemKeys');
	    	DisplayTab4Form(cur);
	    },
	      
	}).dxList('instance');
	
	setTimeout(function(){
		subMenuList4.selectItem(0);
	}, 1);
	//$("#saveBtn4").dxButton({text: '저장하기',type: 'success',	});
	
}
function DisplayTab4Form(cur)
{
	if(cur == 0){
		if(age_opt_form && age_opt_form.option("visible") == true){
			age_opt_form.option("visible",false);
		}
		DisplayTab4RegOptForm();
	}else{
		if(reg_opt_form && reg_opt_form.option("visible") == true){
			reg_opt_form.option("visible",false);
		}
		DisplayTab4AgeOptForm();
	}
}
function DisplayTab4RegOptForm(){
	if(reg_opt_form!= null){
		reg_opt_form.option("visible",true);
		return;
	}	
	tab4formData={
		EDC_GENDER_TYPE:'WM',
		EDC_ADDRESS_TYPE:'1',
		EDC_ADDRESS_ARR:['0','1'],
	}
	reg_opt_form = $('#reg_opt_form').dxForm({
		showColonAfterLabel: false,
		formData:tab4formData,
		colCount:3,
        items: [
        	{dataField:'EDC_GENDER_TYPE' ,label: {text:'신청가능 성별'},editorType:'dxSelectBox',
        		editorOptions:{
        			dataSource:gender_opt_gbn, valueExpr: 'value',displayExpr: 'text',
			    }
        	},
			{
        		colSpan:2,
				itemType: 'button',
				buttonOptions: {
					text: '저장하기',
					type: 'success',
					useSubmitBehavior: true,
				},
			},
			{dataField:'EDC_ADDRESS_TYPE' ,label: {text:'신청 거주지 인증 여부'},editorType:'dxSelectBox',
				editorOptions:{
					dataSource:use_gbn, valueExpr: 'value',displayExpr: 'text',
			    }
			},
			{colSpan:2,itemType:'empty'},
			{colSpan:3,dataField:'EDC_ADDRESS_ARR',label: {text:'거주 인증 지역 설정'},
				editorType:'dxTagBox',
				editorOptions:{
					dataSource: local_opt_gbn,
					displayExpr: 'text',
					valueExpr: 'value',
					placeholder:'- 거주 인증 지역 선택 -',
		            showSelectionControls:false,
		            showClearButton:true,
		            showDropDownButton:true,
		            //hideSelectedItems: true,
		            /*onOpened: function(e) {  
		                $('.dx-list-select-all').hide();  
		            } ,*/ 
		            onItemClick: function (e) {
		            	//console.log(e);
		            	var org_value = reg_opt_form.option("formData");
		            	var allCode = local_opt_gbn[0].value;
	        			var idx = (org_value.EDC_ADDRESS_ARR ? org_value.EDC_ADDRESS_ARR.indexOf(allCode) :-1);
	        			//console.log(idx);
	        			if(idx>=0 && e.itemData.value===allCode){
		            		reg_opt_form.updateData('EDC_ADDRESS_ARR',[e.itemData.value]);
		            		idx=-1;
		        		}
		            	if(idx >= 0){
		            		org_value.EDC_ADDRESS_ARR.splice(idx, 1); 
		        			reg_opt_form.updateData('EDC_ADDRESS_ARR',org_value.EDC_ADDRESS_ARR);
		        		}
		            }
		        }
			},
			{label: {text:'신청횟수 제한 여부',
				template: function (data, labelElement) {
					const infoIcon = '<i id="reqCnthelpCalc" class="dx-icon dx-icon-help" style="vertical-align:middle;"></i>';
					labelElement.append("<div id='template-content'><span class='dx-field-item-label-text'>" +data.text +"</span>"+infoIcon+"</div>");
					$('<div>').dxTooltip({
						target: '#reqCnthelpCalc',
						showEvent: 'dxhoverstart',
						hideEvent: 'dxhoverend',
						position: "bottom",
						contentTemplate(args) {
							var result = reqCnthelp.replace(/(\n|\r\n)/g, '<br>');
							args.html('<div id="tab3_tooltipEx" style="text-align:left;">'+ result +'</div>');
						},
					}).appendTo(labelElement);
				},},
				editorType:'dxSelectBox',
	    		editorOptions:{
	    			dataSource:restrict_gbn, valueExpr: 'value',displayExpr: 'text',value: '0',
	    		}
	    	},
	    	{colSpan:2,itemType:'empty'},
	    	//0.15IA 신청횟수제한대상 강좌범위(강습분류별,운영상품분류별,프로그램별)설정,
	    	//제한기간설정(수강월간,수강년간,수업기간내)
	    	{label: {text:'신청 제한 범위'},editorType:'dxSelectBox',
	    		editorOptions:{
	    			disabled:true,
		    		dataSource:[{value:'0',text:'운영상품분류별'},{value:'1',text:'강좌검색분류별'},{value:'2',text:'강좌별'}], valueExpr: 'value',displayExpr: 'text',value: '0',
		    	}
	    	},
	    	{label: {text:'신청 제한 기간'},editorType:'dxSelectBox',
	    		editorOptions:{
	    			disabled:true,
		    		dataSource:[{value:'0',text:'월간'},{value:'1',text:'년간'},{value:'1',text:'수업기간내'}], valueExpr: 'value',displayExpr: 'text',value: '0',
		    	}
	    	},
		    {label: {text:'신청 제한 횟수'},editorType:'dxTextBox',editorOptions:{disabled:true,}},
		],
		onInitialized: function(e) {
			var customHandlerInit = function (e) {
				var orgData = e.component.option("formData");
				var bDisabled = orgData.EDC_ADDRESS_TYPE=='0' ? true:false; 
				e.component.getEditor("EDC_ADDRESS_ARR").option("disabled", bDisabled); 
			}
			e.component.on("contentReady", customHandlerInit);
		},
		onFieldDataChanged: function (e) {
			if(e.dataField=='EDC_ADDRESS_TYPE'){
				var bDisabled = e.value=='0' ? true:false; 
				e.component.getEditor("EDC_ADDRESS_ARR").option("disabled", bDisabled); 
//				e.component.repaint();
			}
			
		}
	}
	).dxForm("instance");
}

function DisplayTab4AgeOptForm(){
	if(age_opt_form!= null){
		age_opt_form.option("visible",true);
		return;
	}
	tab4formDataAge ={
		EDC_AGE_TYPE:'0',		
	}
	age_opt_form = $('#age_opt_form').dxForm({
		formData:tab4formDataAge,
		showColonAfterLabel: false,
		colCount:9,
	    items: [
	    	{colSpan:3,dataField:'EDC_AGE_TYPE',label: {text:'연령제한사용'},editorType:'dxSelectBox',
	    		editorOptions:{
	    			dataSource:restrict_gbn, valueExpr: 'value',displayExpr: 'text',
	    		}
	    	},
	    	/*{itemType:'empty',colSpan:6,},*/
	    	{
	    		itemType: 'button',colSpan:6,
			    horizontalAlignment: 'right',
			    buttonOptions: {
			    	text: '저장하기',
			        type: 'success',
			        useSubmitBehavior: true,
			    },
			},
	    	{itemType:'group',colSpan:9,
	    		items:[
	    			{
			    		label: {visible:false}
			    		,template: function (data, itemElement){
			    			gridAgeTemplate('gridAge',data, itemElement);
			    		},
			    	},
			    ]
	    	}
		],
		onInitialized: function(e) {
			var customHandlerInit = function (e) {
				var orgData = e.component.option("formData");
				var bDisabled = orgData.EDC_AGE_TYPE=='0' ? true:false; 
				//$('#tab4_gridFee').dxDataGrid('instance').option('disabled',bDisabled);
				$('#gridAge').dxDataGrid('instance').option('disabled',bDisabled);
			}
			e.component.on("contentReady", customHandlerInit);
		},
		onFieldDataChanged: function (e) {
			// 연령제한사용
			if(e.dataField=='EDC_AGE_TYPE'){ 
				e.component.repaint();
			}
		}
	}
	).dxForm("instance");
}
function createFeeAgeOptDataSource(){
	return (new DevExpress.data.DataSource({
	      store: new DevExpress.data.ArrayStore({
		        key: 'FEE_AGE_ITEM_ID',
		        data: FEE_AGE_ITEMS,
		      }),
	    })
	);
}	

function  gridAgeTemplate(elementid,data, itemElement) {
	//focusedRowEnabled: true,
	//focusedRowIndex: 0,

	itemElement.append( $("<div id='"+elementid+"'>")
		.dxDataGrid({
			dataSource: createFeeAgeOptDataSource(),
			width:'100%',
			showBorders: true,
			allowColumnResizing: true,
			grouping: {
		    	autoExpandAll: true,
		    },
		    groupPanel: {
			      visible: false,
			},
			paging: {
		      enabled: false,
			},
			editing: {
		      mode: 'cell',
		      allowUpdating: true,
		      //allowDeleting: true,
		      useIcons: true,
		      texts: {
	    			confirmDeleteMessage: '삭제하시겠습니까?',
	    		},
			},
			//columns:createAgeColumnsDropDown(),
			columns:[
				{dataField: 'AGE_USE',caption: '선택',dataType: 'boolean',},
				{dataField: 'AGE_NAME',caption: '연령구분명',alignment: 'left',
					allowEditing:false,
				},
				{dataField: 'AGE_START',caption: '시작나이' , dataType: "number",
					showEditorAlways: true,
					editorOptions:{
						showSpinButtons: true,
					},
			        validationRules: [{
			        	type: "required"
				    }],
			        format: def_numberFormat},
				{dataField: 'AGE_END',caption: '종료나이',	dataType: "number",
					showEditorAlways: true,
					editorOptions:{
						showSpinButtons: true,
					},
					validationRules: [{
			        	type: "required"
				    }],
					format: def_numberFormat	},
				{dataField: 'AGE_TYPE',caption: '연령산출기준',
					showEditorAlways: true,
					lookup: {
						dataSource: age_gbn,
						displayExpr: 'text',
						valueExpr: 'value',
					},
				},
				{dataField: 'AGE_CD',caption:'연령구분코드',visible:false},
		    	{
		    		dataField: 'FEE_NM',
		    		groupIndex: 0,
		    		groupCellTemplate:function (cellElement, cellInfo) {  
		    			cellElement.append($("<span class='group-title'>").text(cellInfo.data.key));  
		   			}  
		    	},
		    ],
			/*selection: {
				mode: 'multiple',
				showCheckBoxesMode:'always'
			},*/
			toolbar: {
				items: [
					{
						location: 'after',
						widget: 'dxButton',
						options: {
							hint: '연령신규',   
							icon:'add',
							onClick(e) {
							//const expanding = e.component.option('text') === 'Expand All';
								CreateAgeRegPopup();
							},
						},
					},
					'save',
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
			/*onEditorPreparing(e) {
				let dataGrid = e.component;
				if (e.parentType === "dataRow" && e.row) {
					e.editorOptions.disabled = !e.row.data.AGE_USE;
		        }
			}*/
			onEditingStart(e) {
				if(e.column.dataField!='AGE_USE'){
					e.cancel=!e.data.AGE_USE;
				}
			}
			
			 /*onCellPrepared(e) {
				if(e.rowType=='header' && e.columnIndex==0){
					console.log('0');
				}
			 },*/
	})); 
}



