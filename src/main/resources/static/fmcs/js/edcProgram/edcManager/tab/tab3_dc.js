//할인 할증
let subMenuList3=null;
let gridDiscount=null;
let discountform=null;
let refundform=null;
let refundformData=null;
function CreateTab3Init()
{
	if(subMenuList3!=null) return;
	var menus = [
		  { id: 0, text: '할인', },
		  { id: 1, text: '환불', },
	]
	subMenuList3 = $('#tab3 .tab_list').dxList({
		 dataSource: new DevExpress.data.DataSource({
		      store: new DevExpress.data.ArrayStore({
		        key: 'id',
		        data: menus,
		      }),
		    }),
		selectionMode:'single', 
	    allowItemDeleting: false,
	    onSelectionChanged(component) {
	    	var cur= subMenuList3.option('selectedItemKeys');
	    	DisplayTab3Form(cur);
	      },
	}).dxList('instance');
	subMenuList3.selectItem(0);
	//$("#saveBtn3").dxButton({text: '저장하기',type: 'success',	});
	
}
function DisplayTab3Form(cur)
{
	if(cur == 0){
		if(refundform && refundform.option("visible") == true){
			refundform.option("visible",false);
		}
		DisplayTab3DiscountForm();
	}else{
		if(discountform && discountform.option("visible") == true){
			discountform.option("visible",false);
		}
		DisplayTab3RefundForm();
	}
}
function DisplayTab3DiscountForm(){
	if(discountform!= null){
		discountform.option("visible",true);
		return;
	}
	discountform = $('#discount_form').dxForm({
		showColonAfterLabel: false,
		colCount:12,
	    items: [
	    	{colSpan:3,label: {text:'감면적용횟수 제한',
	    		template: function (data, labelElement) {
					const infoIcon = '<i id="disCnthelpCalc" class="dx-icon dx-icon-help" style="vertical-align:middle;"></i>';
					labelElement.append("<div id='template-content'><span class='dx-field-item-label-text'>" +data.text +"</span>"+infoIcon+"</div>");
					$('<div>').dxTooltip({
						target: '#disCnthelpCalc',
						showEvent: 'dxhoverstart',
						hideEvent: 'dxhoverend',
						position: "bottom",
						contentTemplate(args) {
							var result = disCnthelp.replace(/(\n|\r\n)/g, '<br>');
							args.html('<div id="tab3_tooltipEx" style="text-align:left;">'+ result +'</div>');
						},
					}).appendTo(labelElement);
				},},
				editorType:'dxSelectBox',
	    		editorOptions:{
	    			dataSource:restrict_gbn, valueExpr: 'value',displayExpr: 'text',value: '0',
	    		}
	    	},
	    	{colSpan:3,label: {text:'감면제한 기간'},editorType:'dxSelectBox',
	    		editorOptions:{
	    			disabled:true,
		    		dataSource:discount_term_gbn, valueExpr: 'value',displayExpr: 'text',value: '0',
		    	}
	    	},
		    {colSpan:2,label: {text:'감면제한 횟수'},editorType:'dxTextBox',editorOptions:{disabled:true,}},
		    {colSpan:3,label: {text:'비대면감면인증 적용'},editorType:'dxSelectBox',
		    	editorOptions:{
		    		dataSource:apply_gbn, valueExpr: 'value',displayExpr: 'text',value: '0',
		    	}
		    },
		    {
		    	itemType: 'button',
		    	cssClass:'margin-left-m10',
				buttonOptions: {
					text: '저장하기',
				    type: 'success',
				    useSubmitBehavior: true,
				},
			},
	    	{colSpan:12,itemType:'group',
				template:function(data, itemElement){gridDiscountTemplate(data, itemElement)}
	    	},
	    	
		]
	}
	).dxForm("instance");
}
/*
 $('<tr>').append(
$('<img>').attr('src', currentEmployee.Picture).attr('id', `image${currentEmployee.ID}`),
$('<br>'),
$('<span>').html(`<i>${currentEmployee.FirstName}</i>`),
$('<span>').html(` <i>${currentEmployee.LastName}</i>`),
$('<br>'),
$('<div>')
  .addClass('button-info')
  .dxButton({
    text: 'Details',
    onClick() {
      employee = currentEmployee;
      popup.option({
        contentTemplate: () => popupContentTemplate(),
        'position.of': `#image${employee.ID}`,
      });
      popup.show();
    },
  }),
).appendTo($('#discounts'));

*/	
/*
function groupDiscountItems_() {
	var returnItems=[{ template: '<div>aaa</div>'}];
	returnItems.push(
			{  template: `<div>${DISCOUNT_ITEMS[0].DC_NAME}</div>`}
	);
	return returnItems;
}

function groupDiscountItems() {
	var returnItems=[];
	returnItems.push(
			{cssClass:'header-caption',template: '순번'},
			{colSpan:2,cssClass:'header-caption',label:{text:'선택'},editorType:'dxCheckBox'},
			{colSpan:3,cssClass:'header-caption',template: '자격명'},
			{colSpan:2,cssClass:'header-caption',template: '자격범위'},
			{colSpan:2,cssClass:'header-caption',template: '감면단위'},
			{colSpan:2,cssClass:'header-caption',template: '요율'},
	);

	
	DISCOUNT_ITEMS.forEach((discount_item,index) => {
		returnItems.push(
				{cssClass:'text-center',label:{visible:false},template: (index+1)+''},
				{colSpan:2, name:(index+1), cssClass:'text-center',label:{visible:false},editorType:'dxCheckBox',},
				{colSpan:3,dataField:"DC_NAME",label:{visible:false},
					template: `<div>${discount_item.DC_NAME}</div>` 
				},
				{itemType:'empty'},
				{itemType:'empty'},
				{itemType:'empty'},
				{colSpan:2,itemType:'empty'},
		);
	});
	return returnItems;
}*/
//headerFilter: { visible: true },
function  gridDiscountTemplate(data, itemElement) {
	itemElement.append( $("<div id='gridDiscount'>")
		.dxDataGrid({
			dataSource: DISCOUNT_ITEMS,
			keyExpr: 'DC_CD',
			width:'100%',
			showBorders: true,
			allowColumnResizing: true,
			focusedRowEnabled: true,
			focusedRowIndex: 0,
			sorting:{mode:'none'},
		    headerFilter: {visible: true,},
			paging: {
		      enabled: false,
			},
			editing: {
		      mode: 'batch',
		      allowUpdating: true,
			},
			columns:[
				{dataField: 'DC_CD',caption: '할인코드',visible:false, allowEditing:false},
				{dataField: 'DC_NAME',caption: '할인명',width:230,allowEditing:false},
				//https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/Filtering/jQuery/Light/
				{dataField: 'DC_TYPE',caption: '감면유형',width:120,allowEditing:false,
					/*setCellValue: function (newData, value) {
	                        this.defaultSetCellValue(newData, value);
	                 },
	                editorType: 'dxSelectBox',*/
					lookup: {
						dataSource: discounttype_gbn,
						displayExpr: 'Name',
						valueExpr: 'Code',
						},
	               headerFilter: {
	                   dataSource: [{
	                     text: '기준없음',
	                     value: ['DC_TYPE', '=', '0000'],
	                   }, {
	                	   text: '장애인',
		                   value: ['DC_TYPE', '=', '0001'],
		               }, {
	                     text: '국가유공자',
	                     value: ['DC_TYPE', '=', '0002'],
	                   }, {
	                     text: '연령',
	                     value: ['DC_TYPE', '=', '0003'],
	                   }, {
	                     text: '관내거주',
	                     value: ['DC_TYPE', '=', '0004']
	                   },
	                   ],
	                },
					
				},
				{caption: '자격기준',
					columns: [
						{dataField: 'DC_START',caption: '',width:180,showEditorAlways: true,
						editCellTemplate: function(cellElement, cellInfo) {
						switch(cellInfo.data.DC_TYPE){
						case '0002'://국가유공자
							$("<div  />").dxSelectBox({
								dataSource: dc_type_gbn1,
								displayExpr: 'text',
								valueExpr: 'value',
			                    value: cellInfo.data.DC_TYPE1,
			                    placeholder:'- 관계 -',
			                    onValueChanged: function(e) {
			                    	 cellInfo.setValue(e.value);
			                    }
			                }).appendTo(cellElement);
							
							break; 
						case '0001':
							$("<div />").dxSelectBox({
								dataSource: dc_type_gbn3,
								displayExpr: 'text',
								valueExpr: 'value',
			                    value: cellInfo.data.DC_TYPE3,
			                    placeholder:'- 장애정도 -',
			                    onValueChanged: function(e) {
			                    	 cellInfo.setValue(e.value);
			                    }
			                }).appendTo(cellElement);
							break;//장애인정도
						case '0004':
							$("<div />").dxSelectBox({
								dataSource: dc_type_gbn4,
								displayExpr: 'text',
								valueExpr: 'value',
			                    value: cellInfo.data.DC_TYPE3,
			                    placeholder:'- 행정동 선택 -',
			                    onValueChanged: function(e) {
			                    	 cellInfo.setValue(e.value);
			                    }
			                }).appendTo(cellElement);
							break;//관내거주
						case '0003'://연령
							$("<div />").dxNumberBox({
								showSpinButtons: true,
								min:0,max:200,
			                    value: cellInfo.data.DC_START,
			                    placeholder:'- 나이 -',
			                    onValueChanged: function(e) {
			                    	 cellInfo.setValue(e.value);
			                    }
			                }).appendTo(cellElement);
							break;//나이1,2
						case '0005'://개월수
							$("<div />").dxNumberBox({
								showSpinButtons: true,
								min:0,max:200,
			                    value: cellInfo.data.DC_START,
			                    placeholder:'- 개월 -',
			                    onValueChanged: function(e) {
			                    	 cellInfo.setValue(e.value);
			                    }
			                }).appendTo(cellElement);
							break;//나이1,2
						case '0006':
							$("<div />").dxNumberBox({
								showSpinButtons: true,
								min:0,max:200,
			                    value: cellInfo.data.DC_START,
			                    placeholder:'- 자녀수(이상) -',
			                    onValueChanged: function(e) {
			                    	 cellInfo.setValue(e.value);
			                    }
			                }).appendTo(cellElement);
							break;//
						case '0007'://기초생활수급자
							$("<div  />").dxSelectBox({
								//dataSource: dc_type_gbn1,
								displayExpr: 'text',
								valueExpr: 'value',
			                    value: cellInfo.data.DC_TYPE1,
			                    placeholder:'-  -',
			                    onValueChanged: function(e) {
			                    	 cellInfo.setValue(e.value);
			                    }
			                }).appendTo(cellElement);
							
							break; 							
						default:
							cellElement.append( "");
							break;
						}
		            }	
					
				},
				{dataField: 'DC_START_GBN',caption: '',width:80,showEditorAlways: true,
					editCellTemplate: function(cellElement, cellInfo) {
						switch(cellInfo.data.DC_TYPE){
							case '0003':
							case '0005':
								$("<div />").dxSelectBox({
									dataSource: range_gbn,
									displayExpr: 'text',
									valueExpr: 'value',
									value: cellInfo.data.DC_START_GBN,
									placeholder:'- 범위설정 -',
									onValueChanged: function(e) {
										cellInfo.setValue(e.value);
									}
								}).appendTo(cellElement);
					
								break;//나이1,2
							case '0006':				
								cellElement.append("&nbsp;&nbsp;이상");
								break;								
							default:
								cellElement.append( "");
							break;
						}
					}	
				},
				{dataField: 'DC_END',caption: '',width:180,
					showEditorAlways: true,
					editCellTemplate: function(cellElement, cellInfo) {
						switch(cellInfo.data.DC_TYPE){
						case '0002':
							$("<div  />").dxSelectBox({
								dataSource: dc_type_gbn2,
								displayExpr: 'text',
								valueExpr: 'value',
			                    value: cellInfo.data.DC_END,
			                    placeholder:'- 수권여부 -',
			                    onValueChanged: function(e) {
			                    	 cellInfo.setValue(e.value);
			                    }
			                }).appendTo(cellElement);
							break; //국가유공자
						case '0003':
							$("<div />").dxNumberBox({
								showSpinButtons: true,
								min:0,max:200,
			                    value: cellInfo.data.DC_END,
			                    placeholder:'- 나이 -',
			                    onValueChanged: function(e) {
			                    	 cellInfo.setValue(e.value);
			                    }
			                }).appendTo(cellElement);
							break;//나이1,2
						case '0005':
							$("<div />").dxNumberBox({
								showSpinButtons: true,
								min:0,max:200,
			                    value: cellInfo.data.DC_END,
			                    placeholder:'- 개월 -',
			                    onValueChanged: function(e) {
			                    	 cellInfo.setValue(e.value);
			                    }
			                }).appendTo(cellElement);
							break;//나이1,2
													
						default:
							cellElement.append( "");
							break;
						}
		            }
				},
				]},
				{dataField: 'DC_RATE_GBN',caption: '감면단위',width:100,
					showEditorAlways: true,
					editCellTemplate: function(cellElement, cellInfo) {
		                $("<div />").dxSelectBox({
							dataSource: discount_gbn,
							displayExpr: 'text',
							valueExpr: 'value',
		                    value: cellInfo.value,
		                    onValueChanged: function(e) {
		                        cellInfo.setValue(e.value);
		                        var numberInstance =$('#txt'+cellInfo.rowIndex).dxNumberBox('instance');
	                         	//form numberInstance.option("dataField");
		                        numberInstance.option("value",'0');
		                        if(e.value==="1" ||e.value==="3"){
		                        	numberInstance.option("format",'#,##0원');
		                        	numberInstance.option("step",10);
		                        }else{
		                        	numberInstance.option("format",{style:'percent'});
		                        	numberInstance.option("step",0.01);
		                        }
		                        
		                        /*if(e.value==="1" ||e.value==="3"){
		                        	$("#unit"+cellInfo.rowIndex).text("원");
		                        }else{
		                        	$("#unit"+cellInfo.rowIndex).text("%");
		                        }*/
		                    }
		                }).appendTo(cellElement);
		            },
		            headerFilter: {
	                   dataSource: [{
	                     text: '할인율',
	                     value: ['DC_RATE_GBN', '=', '0'],
	                   }, {
	                	   text: '할인금액',
		                   value: ['DC_RATE_GBN', '=', '1'],
		               }, 
		               {
		            	   text: '할증율',
		                   value: ['DC_RATE_GBN', '=', '2'],
		               }, {
		            	   text: '할증금액',
			               value: ['DC_RATE_GBN', '=', '3'],
			           }, 
		               ],
	                },
				},
				{		
					caption: '감면요율/감면금액',
					showEditorAlways: true,
					/*headerCellTemplate: function (header, info) {
			                $("<div class='grid-header-title'>")
			                    .html(info.column.caption)
			                    .appendTo(header);
					},*/
					editCellTemplate: function(cellElement, cellInfo) {
		                if(cellInfo.data.DC_RATE_GBN && (cellInfo.data.DC_RATE_GBN==="1" ||cellInfo.data.DC_RATE_GBN==="2") ){
		                	$("<div id='txt"+cellInfo.rowIndex+"' />").dxNumberBox({
			                    value: cellInfo.value,
			                    format: '#,##0원',
			                    step: 10,
			                    onValueChanged: function(e) {
			                        cellInfo.setValue(e.value);
			                    }
			                	//
			                }).appendTo(cellElement);
		                	//cellElement.append( "<span id='unit"+cellInfo.rowIndex+"'> 원</span>");
		                }else{
		                	$("<div id='txt"+cellInfo.rowIndex+"' />").dxNumberBox({
			                    value: cellInfo.value,
			                    format: {style:'percent'},
			                    step: 0.01,
			                    onValueChanged: function(e) {
			                        cellInfo.setValue(e.value);
			                    }
			                	//
			                }).appendTo(cellElement);
		                	//cellElement.append( "<span id='unit"+cellInfo.rowIndex+"'> %</span>");
		                }
		                
		            }
					
				},
			],	
			selection: {mode: 'multiple',showCheckBoxesMode:'always',},
			onToolbarPreparing(e) {
				e.toolbarOptions.visible = false;
			}
	})); 
}


function DisplayTab3RefundForm(){
	if(refundform!= null){
		refundform.option("visible",true);
		return;
	}
	refundformData={
			REFUND_CALC_TYPE:'0',
			REFUND_CALC_DAYS:0,
	};
	var result = refund_calc_help.replace(/(\n|\r\n)/g, '<br>');
	result = '<div id="tab3_tooltipEx" style="text-align:left;">'+ result +'</div>';
	refundform = $('#refund_form').dxForm({
		 showColonAfterLabel: false,
		 formData:refundformData,
		 colCount:10,
		 items: [
        	
        		{itemType:'group',colSpan:5,colCount:1,
        			items:[
			    	{dataField:'REFUND_CALC_TYPE',
			    		 label: {
                             text: '환불 계산방식',
                             template: function (data, labelElement) {
                                 const infoIcon = '<i id="helpCalc" class="dx-icon dx-icon-help" style="vertical-align:middle;"></i>';
                                 
                                 labelElement.append("<div id='template-content'><span class='dx-field-item-label-text'>" +data.text +"</span>"+infoIcon+"</div>");
                                 $('<div>').dxTooltip({
                                     target: '#helpCalc',
                                     showEvent: 'dxhoverstart',
                                     hideEvent: 'dxhoverend',
                                     position: "right",
                                     contentTemplate(args) {
                                    	 var result = refund_calc_help.replace(/(\n|\r\n)/g, '<br>');
                                         args.html('<div id="tab3_tooltipEx" style="text-align:left;">'+ result +'</div>');
                                     },
                                 }).appendTo(labelElement);
                             },
                         },
			    		editorType: 'dxSelectBox',
			    		editorOptions: {
			    			dataSource:refund_clac_gbn, valueExpr: 'value',displayExpr: 'text',
			    			hint:result//test
			    		}
			    	},
			    	
			    	{dataField:'REFUND_CALC_DAYS',label: {text:'환불계산월기준 지정일수'},editorType:'dxNumberBox',
	                    editorOptions:{showSpinButtons: true,format: "#,##0"},
			    	},
			    	]
        		},
		    	{colSpan:4,itemType:'empty'},
		    	{
				      itemType: 'button',
				      horizontalAlignment: 'right',
				      buttonOptions: {
				        text: '저장하기',
				        type: 'success',
				        useSubmitBehavior: true,
				      },
				},
				
		    ],
		    onInitialized: function(e) {
				var customHandlerInit = function (data) {
					var orgData = e.component.option("formData");
					var bDisabled = orgData.REFUND_CALC_TYPE=='0' ? true:false; 
					e.component.getEditor("REFUND_CALC_DAYS").option("disabled", bDisabled);
					
				}
				e.component.on("contentReady", customHandlerInit);
			},
			onFieldDataChanged: function (e) {
				if(e.dataField=='REFUND_CALC_TYPE'){
					var bDisabled = e.value=='0' ? true:false; 
					e.component.getEditor("REFUND_CALC_DAYS").option("disabled", bDisabled); 
				}
			}
	}
	).dxForm("instance");
	
	/*$('#tab3_tooltipEx').dxTooltip({
	    target: '.helpCalc',
	    showEvent: 'mouseenter',
	    hideEvent: 'mouseleave',
	    hideOnOutsideClick: false,
	    contentTemplate(data) {
	    	var result = refund_calc_help.replace(/(\n|\r\n)/g, '<br>');
	        data.html("<div id='helpCalcTooltip'>"+ result + "<div>");
	        
	    },
	});	*/
}




