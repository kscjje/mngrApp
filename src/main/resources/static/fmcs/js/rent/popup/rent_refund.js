const facilityCancelTemplate = `
<div id="facilityCancelTemplate">
	<div>
		<div class="refund-grid" style="height:250px;"></div>
	</div>
	<div class="popup-condition-area row mt15">
		<div class="form-group col-12">
			<div class="row">
				<div class="col-6 tab-container"></div>
			</div>
		</div>
		<div class="form-group col-12">
			<div class="row">
				<div class="col-6">
					<div class="refund-info selected-form-group"></div>
					<br>
					<div class="dx-field-item-label-text">※ 이용료, 위약금은 원단위 절사로 계산</div>
				</div>
				<div class="col-6 payment-info" style="padding-left:20px;">
		            <div class="mt15">
		                <div style="background-color:#fff">
						    <div class="locker-payment-info-box">
						        <div class="locker-payment-header">카드/계좌 결제금액</div>
						        <div class="locker-payment-body"><span>5,000</span><span class="ml05">원</span></div>
						    </div>
						    <div class="locker-payment-sub-box">
						        <div class="locker-payment-header">현금 결제금액</div>
						        <div class="locker-payment-body"><span>0</span><span class="ml05">원</span></div>
						    </div>
						    <div class="locker-payment-info-box" style="padding:1px 5px">
						        <div class="locker-payment-header" style="vertical-align: middle;">이용료</div>
						        <div class="locker-payment-body" style="float:right;"><span class="use-price"></span></div>
						    </div>
						    <div class="locker-payment-sub-box" style="padding:1px 5px">
						        <div class="locker-payment-header" style="vertical-align: middle;">위약금</div>
						        <div class="locker-payment-body" style="float:right;"><span class="panalty-price"></span></div>
						    </div>						    						    
						    <div class="locker-payment-info-box">
						        <div class="locker-payment-header">이용료+위약금</div>
						        <div class="locker-payment-body" style="color:red"><span class="sum-use-price">-1,000</span><span class="ml05">원</span></div>
						    </div>
						    <div class="locker-payment-total-box">
						        <div class="locker-payment-header">환불 총액</div>
						        <div class="locker-payment-body" style="font-weight:700;"><span>4,000</span><span class="ml05">원</span></div>
						    </div>                
		                </div>
		            </div>	
		            <div class="card-container mt15 row">
		                <div class="col-4"></div>
		                <div class="col-4"></div>
		                <div class="col-4"></div>
		            </div>
		            <div class="cash-container mt15 row" style="display:none">
		                <div class="col-12"></div>
		                <div class="col-12" style="display:none;margin-top:5px;"></div>
		            </div>		            
				</div>
			</div>
		</div>		
	</div>

</div>`;

var popFacilityCancel = null;

function createFacilityCancelPopup(selector, subPopupSelector, callback) {
	if (popFacilityCancel){
		popFacilityCancel = null;
		$(selector).dxPopup("dispose");
	}
	
	popFacilityCancel = $(selector).dxPopup({
		contentTemplate: $('<div>').append(facilityCancelTemplate),
		visible: true,
		title: '환불정산',
		width:1200,
        height:800,
		position: {
			my: 'center',
			at: 'center',
			of: window
		},
		dragEnabled: true,
		onShown() {
			createFacilityCancelGrid();
			createFacilityCancelCondition();
			createCardCashCondition(subPopupSelector);
		},
		toolbarItems: [{
			widget: 'dxButton',
		    toolbar: 'bottom',
		    location: 'after',
		    options: {
		    	text: '환불처리',
		    	onClick() {
		    		DevExpress.ui.notify('환불처리');
		    		popFacilityCancel.hide();
				},
			},
		}, {
			widget: 'dxButton',
		    toolbar: 'bottom',
		    location: 'after',
		    options: {
		    	text: '취소',
		    	onClick() {
		    		popFacilityCancel.hide();
				},
			},
		}],
	}).dxPopup('instance');
}

function createFacilityCancelCondition() {
	$('#facilityCancelTemplate .tab-container').dxTabs({
		dataSource: [{ 
			id: 'tabCard',
			text: '카드/계좌 환불',
		}, { 
			id: 'tabCash',
			text: '현금 환불',
		}],
		scrollByContent: false,
		showNavButtons: true,
		onItemClick(e) {
			var selectedTab = (e.itemData.id);
			
			if (selectedTab == "tabCard") {
				$("#facilityCancelTemplate .cash-container").hide();
				$("#facilityCancelTemplate .card-container").show();
			}	else {
				$("#facilityCancelTemplate .card-container").hide();
				$("#facilityCancelTemplate .cash-container").show();
			}
		},
		selectedIndex: 0,
	});
	
	var colCondition = [];
	
	colCondition.push({dataField: 'LEC_PAY_DT', label: {text: '매출일자/환불수입일자',}, editorType:"dxDateBox",
		editorOptions: {
	  		displayFormat: 'yyyy-MM-dd',
	  		
		},
	});	
	colCondition.push({itemType:'empty'});
	
	colCondition.push({dataField: 'REF_REG_DT', label: {text: '온라인신청일자',}, editorType:"dxDateBox",
		editorOptions: {
	  		displayFormat: 'yyyy-MM-dd',
			readOnly: true,
		},
	});
	colCondition.push({dataField: 'LEC_CANCEL_DT', 
		label: {
			template: (data, element) => {
			  let infoIcon = `<i id="tooltip_${data.dataField}" class="dx-icon dx-icon-help" style="font-size: 1.2rem;"></i>`
			  let labelText = `환불기준일자`;
			  element.append(`<div id='template-content' style='font-weight:normal;font-size:0.8rem;'>${labelText} ${infoIcon}</div>`);
			
			  $('<div>').dxTooltip({
			    target: `#tooltip_${data.dataField}`,
			    showEvent: 'mouseenter',
			    hideEvent: 'mouseleave',
			    contentTemplate(args) {
			      args.html(`<ul style="text-align:left;">
			    		  <li>이용료 적용기준일입니다.</li>
			    		  <li>정산기준은 각 강좌별로 설정한 값이 적용됩니다.</li>
			    		  </ul>`);
			    },
			  }).appendTo(element);
			},
		}, 
		editorType:"dxDateBox",
		editorOptions: {
	  		displayFormat: 'yyyy-MM-dd',
		},
	});	

	var colCondition2 = [];	
	
	const refundType = [{
		  ID: '',
		  NAME: '선택하지않음',
		}, {
			ID: '1',
			NAME: '기타',
		}, {
			ID: '2',
			NAME: '프로그램변경',
		}, {
			ID: '3',
			NAME: '이사',	
		}, {
			ID: '4',
			NAME: '군입대',				  
		}];		
	
	colCondition2.push({colSpan:2, dataField: 'REF_APP_DESC', label: {text: '환불사유'}, editorType:"dxSelectBox", editorOptions: {
	    dataSource: new DevExpress.data.ArrayStore({
	        data: refundType,
	        key: 'ID',
	    }),
	    displayExpr: 'NAME',
	    valueExpr: 'ID',
	    value: '',
		buttons: ['dropDown', {
			name: 'addr_type',
			location: 'after',
			options: {
				template: '<i class="nav-icon fas fa-cog"></i>',
				type: 'default',
				disabled: false,
				onClick() {
					DevExpress.ui.notify('코드등록 공통호출');
				},
			},
		}],	
        
      }
	});	
	
	colCondition2.push({colSpan:2, dataField: 'REF_CONFIRM_DESC', label: {text: '처리완료내역'}, editorType:"dxTextArea", 
		editorOptions: {
        }
	});	
	
	$('#facilityCancelTemplate .refund-info').dxForm({
	    showColonAfterLabel: false,
		items: [{
			colCount: 2,
			itemType: 'group',
		    items: colCondition,
		}, {
			colCount: 2,
			itemType: 'group',
			cssClass: "tooltip-caption",
			caption: "환불계산법",
		    items: colCondition2,
		}],	    
		onContentReady: function(e) {
		    let container = e.element.find(".tooltip-caption").find(".dx-form-group-caption");
		    let infoIcon = `<i id="tooltip-caption" class="dx-icon dx-icon-help" style="font-size: 1.2rem;"></i>`;
			container.append(`<div style='font-weight:normal;font-size:0.8rem;'>&nbsp; &nbsp;${infoIcon}</div>`);

			$('<div>').dxTooltip({
			    target: '#tooltip-caption',
			    position: 'right',
			    showEvent: 'mouseenter',
			    hideEvent: 'mouseleave',
			    contentTemplate(args) {
			      args.html(`<h6>환불계산방법</h6>
			    		  	<ul style="text-align:left;">
			    		  	<strong>* 계산적용안함</strong>
			    		  	<li>일수 계산을 하지 않음.</li>
			    		  	<br>
			    		  	<strong>* 일할계산방식(수업일수)</strong>
			    		  	<li>강좌기간의 총수업일수에서 환불일자까지의 수업일을 뺀 일수를 계산한다.</li>		
			    		  	<ul><strong>I</strong> : <li>이용일수 계산시 해당강좌의 휴관일/공휴일은 일수에 포함하지 않는다.</li></ul>
			    		  	<ul><strong>II</strong> : <li>수업일수, 이용일수 계산시 해당강좌의 휴관일/공휴일을 일수에 포함하지 않는다.</li></ul>			    		  		    		  	
			    		  	<br>			      
			    		  	<strong>* 일할계산방식(계약총일수)</strong>
			    		  	<li>일반적인 스포츠센터의 일할 방식이다.</li>
			    		  	<li>실수업과 상관없이 일수로 계산한다.</li>
			    		  	<ul><strong>I</strong> : <li>수업일수, 이용일수 계산시 해당강좌의 휴관일/공휴일을 일수에 포함한다.</li></ul>
			    		  	<ul><strong>II</strong> : <li>이용일수 계산시 해당강좌의 휴관일/공휴일은 일수에 포함하지 않는다.</li></ul>
			    		  	<ul><strong>III</strong> : <li>수업일수, 이용일수 계산시 해당강좌의 휴관일/공휴일을 일수에 포함한다.</li></ul>
			    		  	<br>
			    		  	<strong>* 월할계산방식(수업일수)</strong>
			    		  	<li>해당월에서 하루라도 이용했다면 그월은 환불 미적용.</li>
			    		  	<li>예) 3개월짜리 강좌에서 2개월째 2일 수강시, 남은 1개월만 환불한다.</li>
			    		  	<br>
			    		  	<strong>* 평생교육운영소비자규정적용</strong>
			    		  	<li>1. 개시일 이전은 이용금액 전액 환불</li>
			    		  	<li>2. 개시일 이후</li>
			    		  	<ul><li><strong>가) 수강료 징수기간이 1개월 이내</strong></li></ul>
			    		  	<ul><li>- 계약기간의 1/3 경과 전(수강료의 2/3 해당 액 환급)</li></ul>
			    		  	<ul><li>- 계약기간의 1/2 경과 전(수강료의 1/2 해당 액 환급)</li></ul>
			    		  	<ul><li>- 계약기간의 1/2 이후(미환급)</li></ul>
			    		  	
			    		  	<ul><li><strong>나) 수강료 징수기간이 1개월 초과</strong></li></ul>
			    		  	<ul><li>- 반환사유가 발새안 당해 월의 반환 대상 수강료</li></ul>
			    		  	<ul><li>&nbsp; &nbsp;(수강료 징수 기간이 1개월 이내인 경우에 따라 산출된 수강료를 말한다)와</li></ul>
			    		  	<ul><li>&nbsp; &nbsp;나머지 월의 수강료 전액을 합산한 금액.</li></ul>
			    		  	
			      			<ul>`);
			    },
		    }).appendTo(container);
		},
	});
	
	$('#facilityCancelTemplate .use-price').dxNumberBox({
	    value: 1000,
	    showSpinButtons: true,
	    format: '#,##0 원',
	    width: 150,
	    onValueChanged() {
	    	var sum_use_price = $('#facilityCancelTemplate .use-price').dxNumberBox("instance").option("value") + $('#facilityCancelTemplate .panalty-price').dxNumberBox("instance").option("value");
	    	
	    	if (sum_use_price > 0) {
	    		sum_use_price = -sum_use_price;
	    	}
	    	
	    	$('#facilityCancelTemplate .sum-use-price').text(sum_use_price);
	    },
	    readOnly: true,
	});
	
	$('#facilityCancelTemplate .panalty-price').dxNumberBox({
	    value: 0,
	    showSpinButtons: true,
	    format: '#,##0 원',
	    width: 150,
	    onValueChanged() {
	    	var sum_use_price = $('#facilityCancelTemplate .use-price').dxNumberBox("instance").option("value") + $('#facilityCancelTemplate .panalty-price').dxNumberBox("instance").option("value");
	    	
	    	if (sum_use_price > 0) {
	    		sum_use_price = -sum_use_price;
	    	}
	    	
	    	$('#facilityCancelTemplate .sum-use-price').text(sum_use_price);
	    },
	    readOnly: true,
	});
	

}

function createCardCashCondition(selector) {
	$('#facilityCancelTemplate .card-container > div').eq(1).dxButton({
		stylingMode: 'contained',
		text: '카드/계좌 결제취소',
		type: 'default',
		onClick() {
			createLectureCardRefundPopup(selector);
		},
	});
	
	var colCondition = [];
	
	colCondition.push({dataField: 'USER_TYPE', label: {visible:false}, cssClass:'grp_low_height', editorType:"dxRadioGroup",
		editorOptions:{
		    valueExpr: 'ID',
		    displayExpr: 'NAME',	
		    layout: 'horizontal',		
			items: [{
				  ID: 'CASH',
				  NAME: '현금환불',
				}, {
					ID: 'ACCT',
					NAME: '계좌이체환불',
				}],
    		value: 'CASH',
			onValueChanged(data) {
				if (data.value == 'CASH') {
					$('#facilityCancelTemplate .cash-container > div').eq(1).hide();
				} else {
					$('#facilityCancelTemplate .cash-container > div').eq(1).show();
					$('#facilityCancelTemplate .cash-container > div').eq(1).dxForm("instance").repaint();
				}
			},    		
		}, 
	});	
	
	$('#facilityCancelTemplate .cash-container > div').eq(0).dxForm({
	    showColonAfterLabel: false,
		colCount: 1,
	    items: colCondition,    	
	});	
	
	colCondition = [];
	colCondition.push({colSpan:2, dataField: 'PAY_ACT_NO', label: {text: '계좌번호'}, editorType:"dxSelectBox", editorOptions: {
	    dataSource: new DevExpress.data.ArrayStore({
	        data: [{
	  		  ID: '1',
			  NAME: '311022-123666',
			}, {
				ID: '2',
				NAME: '1234567890',
			}],
	        key: 'ID',
	    }),
	    displayExpr: 'NAME',
	    valueExpr: 'ID',
	    value: '1',
		buttons: ['dropDown', {
			name: 'addr_type',
			location: 'after',
			options: {
				template: '<i class="nav-icon fas fa-cog"></i>',
				type: 'default',
				disabled: false,
				onClick() {
					DevExpress.ui.notify('코드등록 공통호출');
				},
			},
		}],	
        
      }
	});	
	
	colCondition.push({dataField: 'PAY_BANK', label: {text: '은행명'}, editorType:"dxSelectBox", editorOptions: {
	    dataSource: new DevExpress.data.ArrayStore({
	        data: [{
	  		  ID: '1',
			  NAME: '경남은행',
			}, {
				ID: '2',
				NAME: '국민은행',
			}],
	        key: 'ID',
	    }),
	    displayExpr: 'NAME',
	    valueExpr: 'ID',
	    value: '1',
      }
	});	
	
	colCondition.push({dataField: 'PAY_ACT_NAME', label: {text: '예금주'},});	

	$('#facilityCancelTemplate .cash-container > div').eq(1).dxForm({
	    showColonAfterLabel: false,
		colCount: 2,
	    items: colCondition,    	
	});	
}

function createFacilityCancelGrid() {
	var userSearchList = lecListJoin.filter(function(item1, idx1) {
		return lecListJoin.findIndex(function(item2, idx2) {
			return item1.USER_NO == item2.USER_NO;
		}) == idx1;
	});
		
	$('#facilityCancelTemplate .refund-grid').dxDataGrid({
		allowColumnReordering: true,
		allowColumnResizing: true,
		columnAutoWidth: true,
		showBorders: true,
		columnFixing: {enabled: true},
		columnChooser: {
			enabled: true,
		    allowSearch: true,
		},
		focusedRowEnabled: true,
		focusedRowIndex: 0,
		dataSource: userSearchList,
		keyExpr: 'USER_NO',
		columns: getFacilityCancelColumnList(),
		scrolling: {
			rowRenderingMode: 'virtual',
		},
		onToolbarPreparing(e) {
	        e.toolbarOptions.items.push({
	        	location: 'before',
	        	template: $('<div style="font-weight:700;margin-left:10px;">').append("온라인 환불처리 신청"),
	        });
	        
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
	      mode: 'cell',
	      allowUpdating: true,
	      useIcons: true,   
		},	
	    onEditorPreparing: function(e){  
	        if(e.parentType === "dataRow" && e.editorType === "dxCheckBox") {  
	            e.editorOptions.onValueChanged = function(event){  
	                var value = event.value;  

	                if (value === true) {
	                	e.setValue("Y");  
	                } else {
	                	e.setValue("N");  
	                }
	            }  
	        }  
	    },  		
	});
}

function getFacilityCancelColumnList() {
	var resultColumn = {};
	
	resultColumn = [{
		dataField: 'USER_NO',
		caption: '카드발급번호',
		visible: false,
	}, {
        type: "buttons",
        width:50,
        buttons: [{
            icon: 'edit',
            onClick: function (e) {
                let selectedElement =  e.row.cells[e.row.cells.length - 1].cellElement;
                
                if (selectedElement.find(".dx-icon-edit").length > 0) {
                	selectedElement.find(".dx-icon-edit").removeClass("dx-icon-edit").addClass("dx-icon-save");
                	
                	$('#facilityCancelTemplate .refund-info').dxForm("instance").getEditor("TOTAL_DAYS_CNT").option("readOnly", false);
                	$('#facilityCancelTemplate .refund-info').dxForm("instance").getEditor("USE_DAYS_CNT").option("readOnly", false);
                	$('#facilityCancelTemplate .use-price').dxNumberBox("instance").option("readOnly", false);
                	$('#facilityCancelTemplate .panalty-price').dxNumberBox("instance").option("readOnly", false);
                } else {
                	selectedElement.find(".dx-icon-save").removeClass("dx-icon-save").addClass("dx-icon-edit");
                	
                	$('#facilityCancelTemplate .refund-info').dxForm("instance").getEditor("TOTAL_DAYS_CNT").option("readOnly", true);
                	$('#facilityCancelTemplate .refund-info').dxForm("instance").getEditor("USE_DAYS_CNT").option("readOnly", true);
                	$('#facilityCancelTemplate .use-price').dxNumberBox("instance").option("readOnly", true);
                	$('#facilityCancelTemplate .panalty-price').dxNumberBox("instance").option("readOnly", true);
                }
            }
        }],		
	}, {		
		dataField: 'USER_REG_DT',
		width:90,
		caption: '판매일자',	
	}, {		
		dataField: 'RDC_WEEK',
		width:60,
		caption: '요일',		
	}, {		
		dataField: 'RDC_END_DT',
		width:100,
		caption: '이용회차',	
	}, {		
		dataField: 'RDC_START_DT',
		width:90,
		caption: '이용일자',		
	}, {		
		dataField: 'PROG_NAME',
		width:200,
		caption: '품목명',	
	}, {		
		dataField: 'PROG_PRICE',
		width:90,
		caption: '판매금액',	
	}, {		
		dataField: 'PAY_PRICE',
		width:90,
		caption: '결제금액',	
	}, {		
		dataField: 'CARD_PRICE',
		width:90,
		caption: '카드결제',	
	}, {		
		dataField: 'CASH_PRICE',
		width:90,
		caption: '현금결제',	
	}, {		
		dataField: 'PANALTY_PRICE',
		width:90,
		caption: '위약금',	
	}, {		
		dataField: 'LEC_USE_STATUS',
		width:80,
		caption: '상태',		
	}];
	
	resultColumn = setColumnAlignment(resultColumn);
	
	resultColumn.forEach(function(column) {
		if (column.allowEditing) {
		} else {
			column.allowEditing = false;
		}
	});	
	
	resultColumn = setColumnAlignment(resultColumn);
	return resultColumn;
}	