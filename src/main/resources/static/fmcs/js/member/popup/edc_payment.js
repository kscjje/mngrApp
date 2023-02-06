function createLecturePaymentPopup(selector, subPopupSelector, callback) {
	const lecturePaymentTemplate = `
		<div id="lecturePaymentTemplate">
			<div class="row">
				<div class="col-6">
					<div class="popup-condition-area row">
						<div class="form-group user-info selected-form-group col-12"></div>
					</div>
					<div class="popup-condition-area row">
						<div class="form-group lecture-condition selected-form-group col-12"></div>
					</div>
					<div>
						<div class="lecture-grid" style="height:270px;"></div>
					</div>
					<div class="popup-condition-area row">
						<div class="form-group locker-condition selected-form-group col-12"></div>
					</div>			
				</div>
				<div class="col-6" style="background-color:#AFE1FF;border-radius: 7px;">
					<h6 style="margin-top:5px;">등록 및 결제하기</h6>
					<div>
						<div class="cart-grid" style="height:250px;"></div>
					</div>
					<h6 class="mt15">결제방법</h6>
					<div class="form-group locker-payment-button-container">
						<div></div>
						<div></div>
						<div></div>
					</div>
					<div>
						<div class="payment-grid" style="height:175px;"></div>
					</div>
		            <div class="mt15">
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
		</div>`;

	var popLecturePayment = null;
	var subPopup = null;	
	subPopup = subPopupSelector;
	
	if (popLecturePayment){
		popLecturePayment = null;
		$(selector).dxPopup("dispose");
	}
	
	popLecturePayment = $(selector).dxPopup({
		contentTemplate: $('<div>').append(lecturePaymentTemplate),
		visible: true,
		title: '강좌등록 및 결제',
		width:1500,
        height:900,
		position: {
			my: 'center',
			at: 'center',
			of: window
		},
		dragEnabled: true,
		onShowing() {
			createUserInfo();
			createLecturePaymentCondition();
			createLectureGrid();
			createLockerPaymentCondition();
			createCartGrid();
			createPaymentGrid();
		},
		onShown() {
			setTimeout(function() {
				$('#lecturePaymentTemplate .lecture-condition').dxForm("instance").getEditor("SEARCH_KEYWORD").focus();				
			}, 100);
		},
		toolbarItems: [{
			widget: 'dxButton',
		    toolbar: 'bottom',
		    location: 'after',
		    options: {
		    	text: '등록완료',
		    	onClick() {
		    		popLecturePayment.hide();
				},
			},
		}, {
			widget: 'dxButton',
		    toolbar: 'bottom',
		    location: 'after',
		    options: {
		    	text: '취소',
		    	onClick() {
		    		popLecturePayment.hide();
				},
			},
		}],
	}).dxPopup('instance');
	
	function createUserInfo() {
		var myformData = {};
		myformData.USER_NO = "1000001";
		myformData.USER_NAME = "홍길동";
		myformData.USER_BIRTH = "1960-01-01";
		myformData.USER_OLD = "70세";
		myformData.USER_HP = "010-0011-2223";
		
		var colCondition = [];
		colCondition.push({dataField: 'USER_NO', label: {text: '회원번호',},});	
		colCondition.push({dataField: 'USER_NAME', label: {text: '회원명',},});	
		colCondition.push({dataField: 'USER_BIRTH', label: {text: '감면생년월일',},});
		colCondition.push({dataField: 'USER_OLD', label: {text: '연령(만)',},});
		colCondition.push({dataField: 'USER_HP', label: {text: '휴대전화',},});
		
		$('#lecturePaymentTemplate .user-info').dxForm({
			formData: myformData,
			showColonAfterLabel: false,
		    labelMode: 'outside',
		    labelLocation: 'top',
		    customizeItem(item) {
				if (item && item.dataField) {
	        		item.template = $('<span>').text(myformData[item.dataField]);		
	        		
	        		if (item.dataField == "LEC_REG_DT") {
						//item.colSpan = 1;
					} else {
						//item.colSpan = 2;
					}
				}
	        },				    
			items: [{
				colCount: 5,
				itemType: 'group',
				caption: '회원정보',		    
			    items: colCondition,
			}],

		});
	}

	function createLecturePaymentCondition() {
		var colCondition = [];
		
		colCondition.push({colSpan:2, dataField: 'LEC_CATE_TYPE', label: {visible:false}, editorType:"dxSelectBox", editorOptions: {
		    dataSource: new DevExpress.data.ArrayStore({
		        data: [{
		  		  ID: '1',
				  NAME: '분류선택안함',
				}, {
				  ID: '2',
				  NAME: '운영상품분류',
				}, {
				  ID: '3',
				  NAME: '강좌분류',			  
				}],
		        key: 'ID',
		    }),
		    displayExpr: 'NAME',
		    valueExpr: 'ID',
		    value: '3',
	        searchEnabled: true,
	      }
		});	
		colCondition.push({colSpan:3, dataField: 'CATE_NAMES', label: {visible: false}, editorType:"dxTagBox", editorOptions: {
		    dataSource: new DevExpress.data.ArrayStore({
		        data: [{
		  		  ID: '',
				  NAME: '검색어선택',
				}, {
		  		  ID: '2',
				  NAME: '강좌명',
				}, {
		  		  ID: '3',
				  NAME: '강사명',			  
				}],
		        key: 'ID',
		    }),
		    displayExpr: 'NAME',
		    valueExpr: 'ID',
		    value: '',
	        searchEnabled: true,
	      }
		});	
		colCondition.push({colSpan:2, dataField: 'SEARCH_TYPE', label: {visible:false}, editorType:"dxSelectBox", editorOptions: {
		    dataSource: new DevExpress.data.ArrayStore({
		        data: [{
		  		  ID: '',
				  NAME: '검색어선택',
				}, {
		  		  ID: '2',
				  NAME: '강좌명',
				}, {
		  		  ID: '3',
				  NAME: '강사명',			  
				}],
		        key: 'ID',
		    }),
		    displayExpr: 'NAME',
		    valueExpr: 'ID',
		    value: '',
	        searchEnabled: true,
	      }
		});	
		colCondition.push({colSpan:3, dataField: 'SEARCH_KEYWORD', label: {visible: false}, editorOptions: {
		    buttons: [{
		        name: 'btn_reset',
		        location: 'after',
		        options: {
		          template: '<i class="nav-icon fas fa-search"></i>',
		          type: 'default',
		          onClick() {
				  	DevExpress.ui.notify('검색');
				  	
				  	var dataGrid = $('#lecturePaymentTemplate .lecture-grid').dxDataGrid("instance");
				  	//dataGrid.__focused = true;  
				  	dataGrid.focus();
		          },
		          disabled:false,
		        },
		      },{
		        name: 'btn_id',
		        location: 'after',
		        options: {
		        	template: '<i class="nav-icon fas fa-remove"></i>',
		          type: 'default',
		          onClick() {
		        	  $('#lecturePaymentTemplate .lecture-condition').dxForm("instance").resetValues();
		          },
		          disabled:false,
		        },
		      }],
			},
		});
		colCondition.push({colSpan:2, dataField: 'LEC_OLD', label: {visible:false}, editorType:"dxSelectBox", editorOptions: {
		    dataSource: new DevExpress.data.ArrayStore({
		        data: [{
		  		  ID: '',
				  NAME: '연령선택',
				}, {
				  ID: '2',
				  NAME: '성인',
				}, {
				  ID: '3',
				  NAME: '청소년',			  
				}],
		        key: 'ID',
		    }),
		    displayExpr: 'NAME',
		    valueExpr: 'ID',
		    value: '',
	        searchEnabled: true,
	      }
		});
		colCondition.push({colSpan:3, dataField: 'LEC_WEEK', label: {visible:false}, editorType:"dxSelectBox", editorOptions: {
		    dataSource: new DevExpress.data.ArrayStore({
		        data: [{
		  		  ID: '',
				  NAME: '수업요일선택',
				}, {
				  ID: '1',
				  NAME: '월요일',
				}, {
				  ID: '2',
				  NAME: '화요일',
				}, {
				  ID: '3',
				  NAME: '수요일',
				}, {
				  ID: '4',
				  NAME: '목요일',
				}, {
				  ID: '5',
				  NAME: '금요일',
				}, {
				  ID: '6',
				  NAME: '토요일',				  
				}],
		        key: 'ID',
		    }),
		    displayExpr: 'NAME',
		    valueExpr: 'ID',
		    value: '',
	        searchEnabled: true,
	      }
		});
		
		var lectureTimes = [{
		  ID: '',
		  NAME: '수업시간선택',
		}];
		
		for (var i=5; i<24; i++) {
			var lectureTime = {};
			lectureTime.ID = i;
			
			if (i > 9) {
				lectureTime.NAME = i + "시";
			} else {
				lectureTime.NAME = "0" + i + "시";
			}
			
			lectureTimes.push(lectureTime);
		}
		
		colCondition.push({colSpan:3, dataField: 'LEC_TIME', label: {visible:false}, editorType:"dxSelectBox", editorOptions: {
		    dataSource: new DevExpress.data.ArrayStore({
		        data: lectureTimes,
		        key: 'ID',
		    }),
		    displayExpr: 'NAME',
		    valueExpr: 'ID',
		    value: '',
	        searchEnabled: true,
	      }
		});	
		colCondition.push({colSpan:2,itemType:'empty'});
		
		$('#lecturePaymentTemplate .lecture-condition').dxForm({
		    showColonAfterLabel: false,
			items: [{
				colCount: 10,
				itemType: 'group',
				caption: '강좌등록',		    
			    items: colCondition,
			}],	    
		});
	}

	function createLockerPaymentCondition() {
		var colCondition = [];
		
		colCondition.push({colSpan:4, dataField: 'LCK_REREG_INFO', label: {text:'재등록 사물함'}, editorType:"dxSelectBox", editorOptions: {
		    dataSource: new DevExpress.data.ArrayStore({
		        data: [{
		  		  ID: '',
				  NAME: '재등록 가능한 사물함이 없습니다.',
				}, {
				  ID: '2',
				  NAME: '수영장입구(A003) 3개월(2022.10.31만료)  5,0000원',
				}, {
				  ID: '3',
				  NAME: '헬스장입구(A003) 3개월(2022.10.31만료)  5,0000원',			  
				}],
		        key: 'ID',
		    }),
		    displayExpr: 'NAME',
		    valueExpr: 'ID',
		    value: '',
	        searchEnabled: true,
	      }
		});	
		colCondition.push({
			itemType: 'button',
			//horizontalAlignment: 'right',
			buttonOptions: {
				text: '등록담기',
				type: 'normal',
				onClick() {
					viewOptions.lockerSelectPopupInstance.show();
				},
			},
		});
		
		colCondition.push({colSpan:2, dataField: 'LCK_NO', label: {text: '사물함번호'}, editorOptions: {
			buttons: [{
		        name: 'btn_reset',
		        location: 'after',
		        options: {
		          text: '신규임대',
		          type: 'default',
		          onClick() {
				  	DevExpress.ui.notify('검색');
		          },
		          disabled:false,
		        },
		      }],
			},
		});	
		colCondition.push({colSpan:2, dataField: 'LCK_USE_MONTH', label: {text: '이용개월',}, editorType:"dxNumberBox",
			editorOptions: {
			    showSpinButtons: true,
			    format: '#,##0',
			},		
		});	
		colCondition.push({colSpan:1,itemType:'empty'});
		
		colCondition.push({colSpan:2, dataField: 'USE_START_DT', label: {text: '임대기간',}, editorType:"dxDateBox",});
		colCondition.push({colSpan:2, dataField: 'USE_END_DT', label: {text: '~',}, editorType:"dxDateBox",});	
		colCondition.push({colSpan:1,itemType:'empty'});
		
		colCondition.push({colSpan:3, dataField: 'LCK_PRICE', label: {text: '임대료'}, editorType:"dxSelectBox", editorOptions: {
		    dataSource: new DevExpress.data.ArrayStore({
		        data: [{
		  		  ID: '1',
				  NAME: '사물함임대료(5,000원)',
				}, {
		  		  ID: '2',
				  NAME: '사물함임대료(10,000원)',
				}],
		        key: 'ID',
		    }),
		    displayExpr: 'NAME',
		    valueExpr: 'ID',
		    value: '1',
	        searchEnabled: true,
	      }
		});	
		colCondition.push({colSpan:2,itemType:'empty'});
		
		colCondition.push({colSpan:3, dataField: 'LEC_OLD', label: {text: '보증금'}, editorType:"dxSelectBox", editorOptions: {
		    dataSource: new DevExpress.data.ArrayStore({
		        data: [{
		  		  ID: '1',
				  NAME: '보증금(10,000원)',	  
				}],
		        key: 'ID',
		    }),
		    displayExpr: 'NAME',
		    valueExpr: 'ID',
		    value: '1',
	        searchEnabled: true,
	      }
		});
		colCondition.push({colSpan:2,itemType:'empty'});
		
		$('#lecturePaymentTemplate .locker-condition').dxForm({
		    showColonAfterLabel: false,
			items: [{
				colCount: 5,
				itemType: 'group',
				caption: '사물함등록',		    
			    items: colCondition,
			}],	
		});
	}

	function createLectureGrid() {
		var userSearchList = lecturePayList;
			
		$('#lecturePaymentTemplate .lecture-grid').dxDataGrid({
			allowColumnReordering: true,
			allowColumnResizing: true,
			columnAutoWidth: true,
			showBorders: true,
			columnFixing: {enabled: true},
			focusedRowEnabled: true,
			focusedRowIndex: 0,
			dataSource: userSearchList,
			keyExpr: 'LEC_SEQ',
			columns: getLectureColumnList(),
			scrolling: {
				rowRenderingMode: 'virtual',
			},	
			onKeyDown(e) {
				if (e.event.keyCode == 32) { // space
					createLecturePaymentProgramPopup();
				}
			}
		});
	}

	function createCartGrid() {
		var userSearchList = lecListJoin.filter(function(item1, idx1) {
			return lecListJoin.findIndex(function(item2, idx2) {
				return item1.LEC_SEQ == item2.LEC_SEQ;
			}) == idx1;
		});
			
		$('#lecturePaymentTemplate .cart-grid').dxDataGrid({
			allowColumnReordering: true,
			allowColumnResizing: true,
			columnAutoWidth: true,
			showBorders: true,
			focusedRowEnabled: true,
			focusedRowIndex: 0,
			dataSource: userSearchList,
			keyExpr: 'LEC_SEQ',
			columns: getCartColumnList(),
			scrolling: {
				rowRenderingMode: 'virtual',
			},	
		    editing: {
		    	mode: 'row',
		        allowDeleting: true,
		        useIcons: true,
		    },	
		    onToolbarPreparing(e) {
	            e.toolbarOptions.items.push({
	    			 location: 'before',
	    			 widget: 'dxButton',
	    			 options: {
	    				 	text: '비대면 감면자격인증',
	    				 	onClick() {
	    				 	},
	    			 },
	    		});
		    },
		});
	}

	function getLectureColumnList() {
		var resultColumn = {};
		
		resultColumn = [{
			dataField: 'LEC_SEQ',
			caption: '강좌번호',
			visible: false,
		}, {		
			dataField: 'LEC_STATUS',
			width:90,
			caption: '상태',	
			cellTemplate: function(element, info) {
				var tmpl = `<div class='lec_status-tag' style="color:<@=color@>;background-color:<@=background@>;border: 1px solid <@=color@>;"><@=value@></div>`;
				if(info && info.value){
					if (info.value == "접수준비") {
						element.append(_.template(tmpl)({value:info.value, color: "black",background: "#fff"}));
					} else if (info.value == "접수중") {
						element.append(_.template(tmpl)({value:info.value, color: "blue",background: "#fff"}));
					} else {
						element.append(_.template(tmpl)({value:info.value, color: "red",background: "#fff"}));
					}
				}
			}		
		}, {		
			dataField: 'LEC_NAME',
			caption: '강좌명',	
		}, {		
			dataField: 'LEC_WEEK',
			width:70,
			caption: '수업요일',	
		}, {		
			dataField: 'LEC_TIME',
			width:90,
			caption: '수업시간',	
		}, {		
			dataField: 'LEC_APP_CNT',
			width:60,
			dataType: "number",
			format: def_numberFormat,
			caption: '정원',	
		}, {		
			dataField: 'LEC_REMAIN_CNT',
			width:130,
			caption: '잔여정원',	
		}, {
	        type: "buttons",
	        width:80,
	        buttons: [{
	            text: "등록담기",
	            onClick: function (e) {
	            	createLecturePaymentProgramPopup();
	            }
	        }]		
		}];
		
		resultColumn = setColumnAlignment(resultColumn);
		
		return resultColumn;
	}	

	function createPaymentGrid() {
		$("#lecturePaymentTemplate .locker-payment-button-container > div").eq(0).dxButton({
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
		
		$("#lecturePaymentTemplate .locker-payment-button-container > div").eq(1).dxButton({
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
		
		$("#lecturePaymentTemplate .locker-payment-button-container > div").eq(2).dxButton({
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
			
		$('#lecturePaymentTemplate .payment-grid').dxDataGrid({
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

	function createLecturePaymentProgramPopup() {
		var dataGrid = $('#lecturePaymentTemplate .lecture-grid').dxDataGrid("instance");
		var key = dataGrid.option("focusedRowKey");
		var idx = dataGrid.option("focusedRowIndex");
		var item = dataGrid.getDataSource().items()[idx];
		console.log(key);
		console.log(item);
		
		$(subPopup).dxPopup({
			contentTemplate: function() {
				var subTmpl = `
				<div id="lecturePaymentProgTemplate" class="row">
					<div class="col-12">
						<div class="prog-grid" style="height:150px;"></div>
					</div>
				</div>`;
					
				return subTmpl;
			},
			visible: true,
			title: '강좌요금을 선택하세요',
			width:500,
	        height:250,
			position: {
				my: 'center',
				at: 'center',
				of: '#lecturePaymentTemplate .lecture-grid'
			},
			dragEnabled: false,
			hideOnOutsideClick: true,
			onShown() {
				var userSearchList = lecListJoin.filter(function(item1, idx1) {
					return lecListJoin.findIndex(function(item2, idx2) {
						return item1.PROG_SEQ == item2.PROG_SEQ;
					}) == idx1;
				});
				
				$('#lecturePaymentProgTemplate .prog-grid').dxDataGrid({
					allowColumnReordering: true,
					allowColumnResizing: true,
					columnAutoWidth: true,
					showBorders: true,
					columnFixing: {enabled: false},
					focusedRowEnabled: true,
					focusedRowIndex: 0,
					dataSource: userSearchList,
					keyExpr: 'PROG_SEQ',
					columns: [{
						dataField: 'PROG_SEQ',
						caption: '요금번호',
						visible: false,
					}, {		
						dataField: 'PROG_NAME',
						caption: '요금명',	
					}, {		
						dataField: 'PROG_PRICE',
						width: 80,
						caption: '금액',			
					}, {
				        type: "buttons",
				        width: 90,
				        buttons: [{
				            text: "요금선택",
				            onClick: function (e) {
				            	var dataGrid = $('#lecturePaymentProgTemplate .prog-grid').dxDataGrid("instance");
				            	var key = dataGrid.option("focusedRowKey");
				            	var idx = dataGrid.option("focusedRowIndex");
				            	var item = dataGrid.getDataSource().items()[idx];
				            	console.log(key);
				            	console.log(item);
				            	DevExpress.ui.notify('등록담기');
				            	$(subPopup).dxPopup("instance").hide();
				            }
				        }]
				    }],
					scrolling: {
						rowRenderingMode: 'virtual',
					},
					onContentReady(e) {  
						e.component.focus();
					},
					onKeyDown(e) {
						if (e.event.keyCode == 32) { // space
			            	var dataGrid = $('#lecturePaymentProgTemplate .prog-grid').dxDataGrid("instance");
			            	var key = dataGrid.option("focusedRowKey");
			            	var idx = dataGrid.option("focusedRowIndex");
			            	var item = dataGrid.getDataSource().items()[idx];
			            	console.log(key);
			            	console.log(item);
							DevExpress.ui.notify('등록담기');
							$(subPopup).dxPopup("instance").hide();
						}
					},
				});
			},
			onHidden() {
			  	$('#lecturePaymentTemplate .lecture-grid').dxDataGrid("instance").focus();
			},		
		});	
	}	
}

function getCartColumnList() {
	var resultColumn = {};
	
	resultColumn = [{
		dataField: 'LEC_SEQ',
		caption: '강좌번호',
		visible: false,
	}, {		
		dataField: 'LEC_NAME',
		caption: '강좌/사물함',	
	}, {		
		dataField: 'APP_REG_DT',
		width:140,
		caption: '이용기간',	
	}, {		
		dataField: 'PROG_PRICE',
		width:80,
		caption: '단가',	
	}, {		
		dataField: 'LEC_REDUCE_DESC',
		caption: '감면사유',	
	}, {		
		dataField: 'LEC_REMAIN_CNT',
		width:80,
		caption: '할인금액',	
	}, {		
		dataField: 'PROG_PRICE',
		width:80,
		caption: '이용료',			
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