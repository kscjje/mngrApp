function createFacilityItemPaymentPopup(selector, subPopupSelector, callback) {
	const facilityItemPaymentTemplate = `
		<div id="facilityItemPaymentTemplate">
			<div class="row">
				<div class="col-5">
					<div class="popup-condition-area row">
						<div class="form-group app-condition selected-form-group col-12"></div>
					</div>
					<div>
						<div class="period-title-condition selected-form-group">
						</div>											
					</div>
					<div class="popup-condition-area row">
						<div class="subitem-grid col-12" style="height:200px;"></div>
						<div class="etc-condition col-12" style="margin-top:10px;">
						</div>						
					</div>												
				</div>
				<div class="col-7" style="background-color:#AFE1FF;border-radius: 7px;">
					<h6 style="margin-top:5px;">부속시설 등록 및 결제하기</h6>
					<div style="margin-top:5px;">
						<div class="cart-subitem-grid" style="height:295px;"></div>
					</div>					
					
					<div class="row" style="margin-bottom: 9px;">
						<div class="col-6">
							<h6 class="mt15">결제방법</h6>
							<div class="form-group locker-payment-button-container">
								<div></div>
								<div></div>
								<div></div>
							</div>
							<div>
								<div class="payment-grid" style="height:175px;"></div>
							</div>						
						</div>
						<div class="col-6" style="margin-top:15px;">
			                <h6>결제정보</h6>
			                <div style="background-color:#fff">
							    <div class="locker-payment-info-box">
							        <div class="locker-payment-header">결제할금액</div>
							        <div class="locker-payment-body"><span>10,000</span><span class="ml05">원</span></div>
							    </div>
							    <div class="locker-payment-info-box">
							        <div class="locker-payment-header">할인금액</div>
							        <div class="locker-payment-body" style="color:red"><span>-5,000</span><span class="ml05">원</span></div>
							    </div>
							    <div class="locker-payment-sub-box">
							        <div class="locker-payment-header">결제금액</div>
							        <div class="locker-payment-body"><span>3,000</span><span class="ml05">원</span></div>
							    </div>
							    <div class="locker-payment-total-box">
							        <div class="locker-payment-header">남은금액</div>
							        <div class="locker-payment-body" style="font-weight:700;"><span>2,000</span><span class="ml05">원</span></div>
							    </div>                
			                </div>
						</div>						
					</div>
				</div>
			</div>
		</div>`;

	var popFacilityItemPayment = null;
	var subPopup = null;	
	subPopup = subPopupSelector;
	
	if (popFacilityItemPayment){
		popFacilityItemPayment = null;
		$(selector).dxPopup("dispose");
	}
	
	popFacilityItemPayment = $(selector).dxPopup({
		contentTemplate: $('<div>').append(facilityItemPaymentTemplate),
		visible: true,
		title: '부속시설 추가/이용후 정산',
		width:1650,
        height:835,
		position: {
			my: 'center',
			at: 'center',
			of: window
		},
		dragEnabled: true,
		onShowing() {
			createFacilityAppCondition();
			createPeriodCondition();
			createSubitemGrid();
			createCartSubitemGrid();
			createPaymentGrid();
		},
		onShown() {
			$('#facilityItemPaymentTemplate').dxScrollView({
				scrollByContent: true,
				showScrollbar: 'always',
				height:745,
			});
		},
		toolbarItems: [{
			widget: 'dxButton',
		    toolbar: 'bottom',
		    location: 'center',
		    cssClass: 'hs-center-btn',
		    options: {
		    	text: '신청정보 담기',
		    	onClick() {
		    		DevExpress.ui.notify('신청정보 담기');
				},
		    },
		}, {
			widget: 'dxButton',
		    toolbar: 'bottom',
		    location: 'after',
		    options: {
		    	text: '등록완료',
		    	onClick() {
		    		popFacilityItemPayment.hide();
				},
			},
		}, {
			widget: 'dxButton',
		    toolbar: 'bottom',
		    location: 'after',
		    options: {
		    	text: '취소',
		    	onClick() {
		    		//popFacilityItemPayment.hide();
		    		$(selector).dxPopup("dispose");
				},
			},
		}],
	}).dxPopup('instance');
	
	function createFacilityAppCondition() {
		let colCondition = [];
				
		colCondition.push({colSpan:3, dataField: 'FAC_CATE_TYPE', label: {text: '대관시설분류'}, editorType:"dxSelectBox", editorOptions: {
		    dataSource: new DevExpress.data.ArrayStore({
		        data: facilityCategories_gbn,
		        key: 'value',
		    }),
		    displayExpr: 'text',
		    valueExpr: 'value',
		    value: 'FG001',
	        searchEnabled: true,
	      }
		});	
		
		
		var myPlaceList = placeList.filter(function(item1, idx1) {
			return placeList.findIndex(function(item2, idx2) {
				return item1.PLACE_NM == item2.PLACE_NM;
			}) == idx1;
		});		
		
		colCondition.push({colSpan:3, dataField: 'FAC_NAME', label: {text: '대관장소'}, editorType:"dxSelectBox", editorOptions: {
		    dataSource: new DevExpress.data.ArrayStore({
		        data: myPlaceList,
		        key: 'PLACE_NM',
		    }),
		    displayExpr: 'PLACE_NM',
		    valueExpr: 'PLACE_NM',
		    value: '공설운동장A',
	        searchEnabled: true,
	      }
		});	
		
		colCondition.push({colSpan:3, dataField: 'RESV_DATE', label: {text: '이용일자'}, editorType:"dxDateBox"});
		colCondition.push({colSpan:3, dataField: 'FAC_NAME', label: {text: '이용회차'}, editorType:"dxSelectBox", editorOptions: {
		    dataSource: new DevExpress.data.ArrayStore({
		        data: roundDataList,
		        key: 'value',
		    }),
		    displayExpr: 'text',
		    valueExpr: 'value',
		    value: '1',
	        searchEnabled: true,
	      }
		});	
		
		let memberSearch = createCommonUserSearchItem("#userPopup2", '#facilityItemPaymentTemplate .app-condition');
		memberSearch.forEach(item => { item.colSpan = 3; });
		console.log(memberSearch);
		colCondition.push(...memberSearch);
		
		colCondition.push({colSpan:3, dataField: 'FAC_NAME', label: {text: '회원번호'}, editorOptions:{
		    buttons: [{
		        name: 'btnSearchPlus' + selectorIdx,
		        location: 'after',
		        options: {
		       		text: '예약자격조건',
		        	type: 'default',
		        	onClick(e) {
		        		createReserveRequirementPopup(subPopupSelector);
		        	},
		        },
		      }]
			}
		});
		
		let teamSearch = createCommonTeamSearchItem("#userPopup2", '#facilityItemPaymentTemplate .app-condition');
		teamSearch.forEach(item => { item.colSpan = 3; });
		console.log(teamSearch);
		colCondition.push(...teamSearch);
		
		colCondition.push({colSpan:3, dataField: 'FAC_NAME', label: {text: '연락처'},});
		
		$('#facilityItemPaymentTemplate .app-condition').dxForm({
		    showColonAfterLabel: false,
		    alignItemLabels: true,
			items: [{
				colCount: 6,
				itemType: 'group',
				caption: '신청정보',		    
			    items: colCondition,
			}, 
			],	    
		});
	}

	function createPeriodCondition() { 
		$('#facilityItemPaymentTemplate .period-title-condition').dxForm({
			items: [{
				itemType: 'group',
				caption: '부속시설정보',		    
			}],	
		});
		
		$('#facilityItemPaymentTemplate .etc-condition').dxForm({
		    showColonAfterLabel: false,
		    alignItemLabels: true,			
			items: [{dataField: 'REF_CONFIRM_DESC', label: {text: '비고'}, editorType:"dxTextArea", 
				editorOptions: {
		        }
			}],	
		});		
	}
	
	function createSubitemGrid() {
		$('#facilityItemPaymentTemplate .subitem-grid').dxDataGrid({
			allowColumnReordering: true,
			allowColumnResizing: true,
			columnAutoWidth: true,
			showBorders: true,
			columnFixing: {enabled: true},
			focusedRowEnabled: true,
			focusedRowIndex: 0,
			dataSource: [
				{ITEM_SEQ: 1, ITEM_NAME: '쿨링', ITEM_REQ_YN: 'N', ITEM_UNIT: '시간', ITEM_PRICE: 1000,},
				{ITEM_SEQ: 2, ITEM_NAME: '미니골대', ITEM_REQ_YN: 'N', ITEM_UNIT: '수량', ITEM_PRICE: 1000,},
				{ITEM_SEQ: 3, ITEM_NAME: '조명', ITEM_REQ_YN: 'Y', ITEM_UNIT: '시간', ITEM_PRICE: 6000,},
				{ITEM_SEQ: 4, ITEM_NAME: '마이크', ITEM_REQ_YN: 'N', ITEM_UNIT: '수량', ITEM_PRICE: 3000,},
			],
		    selection: {
		        mode: 'multiple',showCheckBoxesMode:'always',
		    },			
			keyExpr: 'ITEM_SEQ',
			columns: [{		
					visible:false,
					dataField: 'ITEM_SEQ',
					caption: '부속시설번호',	
				}, {		
					dataField: 'ITEM_NAME',
					caption: '부속시설 품목명',	
				}, {		
					dataField: 'ITEM_REQ_YN',
					width:70,
					caption: '필수여부',	
				}, {		
					dataField: 'ITEM_UNIT',
					width:70,
					caption: '단위',	
				}, {		
					dataField: 'ITEM_PRICE',
					width:80,
					caption: '이용단가',						
				},
			],
			scrolling: {
				rowRenderingMode: 'virtual',
			},		
		});
	}

	function createCartSubitemGrid() {
		var facList = reserveList.filter(function(item1, idx1) {
			return lecListJoin.findIndex(function(item2, idx2) {
				return item1.LEC_SEQ == item2.LEC_SEQ;
			}) == idx1;
		});
			
		$('#facilityItemPaymentTemplate .cart-subitem-grid').dxDataGrid({
			allowColumnReordering: true,
			allowColumnResizing: true,
			columnAutoWidth: true,
			showBorders: true,
			focusedRowEnabled: true,
			focusedRowIndex: 0,
			dataSource: facList,
			keyExpr: 'LEC_SEQ',
			columns: getCartSubitemColumnList2(),
			scrolling: {
				rowRenderingMode: 'virtual',
			},	
		    editing: {
		    	mode: 'cell',
		    	allowUpdating: true,
		        allowDeleting: true,
		        useIcons: true,
		        selectTextOnEditStart: true,
		    },	
		    onToolbarPreparing(e) {
	            e.toolbarOptions.items.push({
	    			location: 'after',
	    			widget: 'dxButton',
	    			options: {
		    			text: '비대면 감면자격인증',
		    			onClick() {
		    			}
	    			}
	        	});
		    },
		    summary: {  
		    	texts:{sum:"{0}"},
		        totalItems: [
		        	{column: 'LEC_PRICE',summaryType: 'sum' , valueFormat:def_numberFormat}, 
		        	{column: 'FREE_CNT',summaryType: 'sum' , valueFormat:def_numberFormat}, 
		        	{column: 'PROG_PRICE',summaryType: 'sum' , valueFormat:def_numberFormat, cssClass:'cell-highlight'}, 
				]  
		    }, 		    
		});
	}

	function createPaymentGrid() {
		$("#facilityItemPaymentTemplate .locker-payment-button-container > div").eq(0).dxButton({
	        icon: 'fa fa-credit-card',
	        method: 'card',
	        hint: '카드결제',
	        text: '카드결제',
	        template: function (itemData, $buttonContent) {
	        	var tmpl = `<div class="locker-payment-button">
	        			<i class="<@=icon@> fa-3x grey"></i>
	        			<div class="mt15"><@=text@></div>
	        		</div>`;
	            $buttonContent.append(_.template(tmpl)({icon:itemData.icon, text:itemData.text}));
	        },
	        onClick(e) {
	        },
		});
		
		$("#facilityItemPaymentTemplate .locker-payment-button-container > div").eq(1).dxButton({
	        icon: 'fa fa-money',
	        method: 'cash',
	        hint: '현금결제',
	        text: '현금결제',
	        template: function (itemData, $buttonContent) {
	        	var tmpl = `<div class="locker-payment-button">
	    			<i class="<@=icon@> fa-3x grey"></i>
	    			<div class="mt15"><@=text@></div>
	    		</div>`;
	        	$buttonContent.append(_.template(tmpl)({icon:itemData.icon, text:itemData.text}));
	        },
	        onClick(e) {
	        },
		});
		
		$("#facilityItemPaymentTemplate .locker-payment-button-container > div").eq(2).dxButton({
	        icon: 'fa fa-google-wallet',
	        method: 'simplyPay',
	        hint: '간편결제',
	        text: '간편결제',
	        template: function (itemData, $buttonContent) {
	        	var tmpl = `<div class="locker-payment-button">
	    			<i class="<@=icon@> fa-3x grey"></i>
	    			<div class="mt15"><@=text@></div>
	    		</div>`;
	        	$buttonContent.append(_.template(tmpl)({icon:itemData.icon, text:itemData.text}));
	        },
	        onClick(e) {
	        },
		});
		
		var userSearchList = payList;
			
		$('#facilityItemPaymentTemplate .payment-grid').dxDataGrid({
			allowColumnReordering: true,
			allowColumnResizing: true,
			columnAutoWidth: true,
			showBorders: true,
			columnFixing: {enabled: false},
			focusedRowEnabled: true,
			focusedRowIndex: 0,
			dataSource: userSearchList,
			keyExpr: 'PAY_SEQ',
			columns: getPaymentColumnList(),
			scrolling: {
				rowRenderingMode: 'virtual',
			},	
		    editing: {
		    	mode: 'row',
		        allowDeleting: true,
		    },
		});
	}
}

function getCartSubitemColumnList2() {
	var resultColumn = {};
	
	resultColumn = [{
		dataField: 'LEC_SEQ',
		caption: '강좌번호',
		visible: false,
	}, {		
		dataField: 'LEC_REG_DT',
		width:90,
		caption: '대관일자',	
		allowEditing: false
	}, {		
		dataField: 'LEC_WEEK',
		width:50,
		caption: '요일',	
		allowEditing: false
	}, {		
		dataField: 'LEC_USE_CNT',
		width:80,
		caption: '이용회차',			
		allowEditing: false
	}, {		
		dataField: 'LEC_START_DT',
		width:90,
		caption: '이용기간',	
		allowEditing: false
	}, {		
		dataField: 'LEC_PROG',
		caption: '품목명',	
		allowEditing: false
	}, {		
		dataField: 'LEC_PRICE',
		width:70,
		caption: '이용단가',	
		allowEditing: false
	}, {		
		dataField: 'REMAIN_CNT',
		width:45,
		caption: '수량',
		showEditorAlways: true,
		dataType: "number",
	}, {		
		dataField: 'DC_DESC',
		width:150,
		caption: '감면적용',
		showEditorAlways: true,
		lookup: {
			dataSource: [{ID:'', NAME:'감면사유선택'}, {ID:'국가유공자', NAME:'국가유공자(10%)'}, {ID:'기초생활수급자', NAME:'기초생활수급자(70%)'}],
			displayExpr: 'NAME',
			valueExpr: 'ID',
		},
	}, {		
		dataField: 'FREE_CNT',
		width:70,
		caption: '할인금액',
		allowEditing: false
	}, {		
		dataField: 'PROG_PRICE',
		width:75,
		caption: '합계',			
		allowEditing: false
	}, {
        type: "buttons",
        width:40,
    }];
	
	resultColumn = setColumnAlignment(resultColumn);
	return resultColumn;
}

function getPaymentColumnList() {
	var resultColumn = {};
	
	resultColumn = [{
		dataField: 'PAY_SEQ',
		caption: '결제번호',
		visible: false,
	}, {		
		dataField: 'PAY_TYPE',
		caption: '결제수단',	
	}, {		
		dataField: 'PAY_PRICE',
		caption: '결제금액',			
	}, {
        type: "buttons",
        buttons: [{
            text: "결제취소",
            onClick: function (e) {
                // Execute your command here
            }
        }]
    }];
	
	resultColumn = setColumnAlignment(resultColumn);
	return resultColumn;
}

