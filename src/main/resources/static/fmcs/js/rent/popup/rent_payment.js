function createFacilityPaymentPopup(selector, subPopupSelector, callback) {
	const facilityPaymentTemplate = `
		<div id="facilityPaymentTemplate">
			<div class="row">
				<div class="col-5">
					<div class="popup-condition-area row">
						<div class="form-group app-condition selected-form-group col-12"></div>
					</div>
					<div>
						<div class="period-title-condition selected-form-group">
						</div>
						<div class="row">
							<div class="col-6 tab-container" style="margin-bottom:10px;"></div>
						</div>
						<div class="period-condition" style="height:240px;">
							<div class="period-calendar-container" style="display:none;width:100%;height: 235px;min-height: initial;">
							</div>
							<div class="period-datebox-container selected-form-group" style="display:none;">
							</div>							
						</div>												
					</div>
					<div class="popup-condition-area row" style="margin-top:10px;">
						<div class="time-grid col-4" style="height:175px;padding-right:10px;"></div>
						<div class="subitem-grid col-8" style="height:175px;"></div>
					</div>												
				</div>
				<div class="col-7" style="background-color:#AFE1FF;border-radius: 7px;">
					<h6 style="margin-top:5px;">등록 및 결제하기</h6>
					<div>
						<div class="cart-facility-grid" style="height:440px;"></div>
					</div>
					<div style="margin-top:5px;">
						<div class="cart-subitem-grid" style="height:260px;"></div>
					</div>					
					
					<div class="row">
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

	var popFacilityPayment = null;
	var subPopup = null;	
	subPopup = subPopupSelector;
	
	if (popFacilityPayment){
		popFacilityPayment = null;
		$(selector).dxPopup("dispose");
	}
	
	popFacilityPayment = $(selector).dxPopup({
		contentTemplate: $('<div>').append(facilityPaymentTemplate),
		visible: true,
		title: '대관예약신청',
		width:1650,
        height:900,
		position: {
			my: 'center',
			at: 'center',
			of: window
		},
		dragEnabled: true,
		onShowing() {
			createFacilityAppCondition();
			createPeriodCondition();
			createTimeGrid();
			createSubitemGrid();
			createCartFacilityGrid();
			createCartSubitemGrid();
			createPaymentGrid();
		},
		onShown() {
			$('#facilityPaymentTemplate').dxScrollView({
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
		    		popFacilityPayment.hide();
				},
			},
		}, {
			widget: 'dxButton',
		    toolbar: 'bottom',
		    location: 'after',
		    options: {
		    	text: '취소',
		    	onClick() {
		    		//popFacilityPayment.hide();
		    		$(selector).dxPopup("dispose");
				},
			},
		}],
	}).dxPopup('instance');
	
	function createFacilityAppCondition() {
		let colCondition = [];
		
		colCondition.push({colSpan:3, dataField: 'RESV_DATE', label: {text: '예약신청일'}, editorType:"dxDateBox"});
		//colCondition.push({colSpan:3, itemType: 'empty',});
		colCondition.push({colSpan:3, dataField: 'FAC_USE_CNT', label: {text: '예상이용인원'}, editorType:"dxNumberBox"});
		
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
		
		colCondition.push({colSpan:3, dataField: 'FAC_PLACE', label: {text: '대관장소'}, editorType:"dxSelectBox", editorOptions: {
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
		
		let memberSearch = createCommonUserSearchItem("#userPopup2", '#facilityPaymentTemplate .app-condition');
		memberSearch.forEach(item => { item.colSpan = 3; });
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
		
		let teamSearch = createCommonTeamSearchItem("#userPopup2", '#facilityPaymentTemplate .app-condition');
		teamSearch.forEach(item => { item.colSpan = 3; });
		colCondition.push(...teamSearch);
		
		colCondition.push({colSpan:3, dataField: 'FAC_NAME', label: {text: '연락처'},});
		
		colCondition.push({colSpan:6, dataField: 'FAC_NAME', label: {text: '주소'}, editorOptions:{
		    buttons: [{
		        name: 'btnSearchPlus' + selectorIdx,
		        location: 'after',
		        options: {
		       		text: '주소검색',
		        	type: 'default',
		        	onClick(e) {
						createUserAddressPopup('#userPopup', function(data) {
							alert(JSON.stringify(data));
						});
		        	},
		        },
		      }]
			}
		});
		
		colCondition.push({colSpan:3, dataField: 'SEARCH_TYPE', label: {text: '행사구분'}, editorType:"dxSelectBox", editorOptions: {
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
		colCondition.push({colSpan:3, dataField: 'FAC_NAME', label: {text: '행사명'},});
		
		colCondition.push({colSpan:6, dataField: 'FAC_NAME', label: {text: '사용목적'}, editorType: 'dxTextArea', editorOptions: {height: 34}});
		
		colCondition.push({colSpan:6, label:{visible:false},
			template: function(data, itemElement) {
				itemElement.append($("<div>").attr("id", "dxfu1").dxFileManager({
				    name: 'fileManager',
				    hint:'파일 최대 3개까지 업로드 가능',
				    fileSystemProvider: AttachFiles.planDocs,
				    height: 180,
				    permissions: {
				      delete: true,
				      upload: AttachFiles.planDocs.length<3,
				      download: true,
				      refresh:false,
				    },
				    allowedFileExtensions: doc_ext,
				    itemView: {
				        details: {
				          columns: [
				            'thumbnail', 'name',
				             'size',
				          ],
				        },
				        showParentFolder: false,
				      },toolbar: {
				          items: [
				              'upload',
				              {
				                name: 'separator',
				                location: 'after',
				              },
				              'switchView',
				            ],
				            fileSelectionItems: [
				               'delete', 'separator','download',
				               'clearSelection',
				            ],
				      },
				      //onContextMenuItemClick: onItemClick,
				      onFileUploaded: function(e) {
				    	  if( AttachFiles.planDocs.length>=3){
				    		  e.component.option('permissions.upload',false);
				    	  } 
				        },
				      onItemDeleted: function(e) {
				    	  if( AttachFiles.planDocs.length<3){
				    		  e.component.option('permissions.upload',true);
				    	  } 
				        },
				      contextMenu: {
				    	  items: [
				    		  'delete',
				    		  'download'
				    		  ],
				      },
				      upload: {
				            chunkSize: 500000,
				            maxFileSize: 1000000
				        },
				  }));
			}
		});
		
		let colCondition2 = [];
		colCondition2.push({colSpan:1, itemType: 'empty',});
		colCondition2.push({colSpan:3, dataField: 'FAC_NAME', label: {visible:false}, editorType:"dxCheckBox", editorOptions: {text: "개인정보수집동의여부", value: false},});
		colCondition2.push({colSpan:3, dataField: 'FAC_NAME', label: {visible:false}, editorType:"dxCheckBox", editorOptions: {text: "시설이용약관동의여부", value: false},});
		colCondition2.push({colSpan:3, dataField: 'FAC_NAME', label: {visible:false}, editorType:"dxCheckBox", editorOptions: {text: "이용료환불약관동의여부", value: false},});
		
		
		$('#facilityPaymentTemplate .app-condition').dxForm({
		    showColonAfterLabel: false,
		    alignItemLabels: true,
			items: [{
				colCount: 6,
				itemType: 'group',
				caption: '신청정보',		    
			    items: colCondition,
			}, {
				colCount: 10,
				itemType: 'group',
			    items: colCondition2,
			},
			],	    
		});
	}

	function createPeriodCondition() { 
		$('#facilityPaymentTemplate .period-title-condition').dxForm({
			items: [{
				itemType: 'group',
				caption: '예약기간정보',		    
			}],	
		});
		
		$('#facilityPaymentTemplate .tab-container').dxTabs({
			dataSource: [{ 
				id: 'tabCalendar',
				text: '대관일자 캘린더설정',
			}, { 
				id: 'tabDatebox',
				text: '대관일자 기간설정',
			}],
			scrollByContent: true,
			showNavButtons: false,
			focusStateEnabled: false,
			focusStateEnabled: false,
			onItemClick(e) {
				
				var selectedTab = (e.itemData.id);
				
				if (selectedTab == "tabCalendar") {
					createTabPeriodCalendar();
				}	else {
					createTabPeriodDatebox();
				}
			},
			selectedIndex: 0,
		});		
		
		createTabPeriodCalendar();
	}
	
	function createTabPeriodCalendar() {
		$("#facilityPaymentTemplate .period-datebox-container").hide();
		$("#facilityPaymentTemplate .period-calendar-container").show();
		
		var reserveCalendar = $('#facilityPaymentTemplate .period-calendar-container').dxCalendar({
            showTodayButton : false,
            minZoomLevel : 'month',
            maxZoomLevel : 'month',
            activeStateEnabled : false,
            focusStateEnabled : false,
            dateSerializationFormat: 'yyyy-MM-dd',
            //cellTemplate : unavailableCellTemplate,
            onCellClick(e){
            	//console.log(e);
            	let selectedCell = e.event.target;
            	
            	if ($(e.event.target).prop('tagName') == "SPAN") {
            		selectedCell = $(e.event.target).parent();
            	}
            	
            	if ($(selectedCell).attr("hs-selected")) {
            		$(selectedCell).removeAttr("hs-selected");
            		$(selectedCell).css("background-color", "#fff");
            	} else {
            		$(selectedCell).attr("hs-selected", "true");
            		$(selectedCell).css("background-color", "lightblue");
            	}
            	
            	// 멀티 선택 처리
            	$('#facilityPaymentTemplate .period-calendar-container .dx-calendar-views-wrapper .dx-widget .dx-calendar-cell[hs-selected="true"]').each(function(){
            		console.log($(this).attr("data-value"));            		
            	})
            },
            onInitialized(e){
            },
            onOptionChanged(e) {
            	
            	if (e.name == "currentDate") {
            		let previousMonth = moment(e.previousValue).format('MM');
            		let currentMonth = moment(e.value).format('MM');
            		
            		//currentDate = moment(e.value).format('YYYYMMDD');
            		//console.log(currentDate);
            		
            		//reserveCalendar.option("min", firstDay);
            		//reserveCalendar.option("max", moment(firstDay).add(1, "months").add(-1, "days"));
            		
            		if (previousMonth != currentMonth) { // month change
            			// 이전달, 다음달 이동 안되게 처리
            			$('#facilityPaymentTemplate .period-calendar-container .dx-calendar-views-wrapper .dx-widget .dx-calendar-cell.dx-calendar-other-month').each(function() {
            				//console.log($(this).find("span").text());
            				$(this).removeClass("dx-calendar-empty-cell").addClass("dx-calendar-empty-cell");
            				$(this).css("background", "initial");
            			});
            		}
            	}
            }, 
//            disabledDates(data) {
//        		let srcMonth = moment(data.date).format('MM');
//        		let currentMonth = moment(currentDate).format('MM');
//        		console.log(srcMonth + "/" + currentMonth);
//        		return srcMonth != currentMonth;
//            }            
		}).dxCalendar("instance");	
		
		setTimeout(function() {
			// 이전달, 다음달 이동 안되게 처리
			$('#facilityPaymentTemplate .period-calendar-container .dx-calendar-views-wrapper .dx-widget .dx-calendar-cell.dx-calendar-other-month').each(function() {
				//console.log($(this).find("span").text());
				$(this).removeClass("dx-calendar-empty-cell").addClass("dx-calendar-empty-cell");
				$(this).css("background", "initial");
			});
		}, 1000);
	}
	
	function createTabPeriodDatebox() {
		$("#facilityPaymentTemplate .period-calendar-container").hide();
		$("#facilityPaymentTemplate .period-datebox-container").show();
		
		let colCondition = [];
		colCondition.push();
		colCondition.push({colSpan:2, dataField: 'USE_END_DT', label: {text: '~',}, editorType:"dxDateBox",});
		
		$('#facilityPaymentTemplate .period-datebox-container').dxForm({
		    showColonAfterLabel: false,
		    alignItemLabels: true,
			items: [{
				colCount: 2,
				itemType: 'group',
				caption: '빈도설정',		    
			    items: [
			    	{colSpan:1, dataField: 'USE_START_DT', label: {text: '대관일자',}, editorType:"dxDateBox",},
			    	{colSpan:1, dataField: 'USE_END_DT', label: {text: '~',}, editorType:"dxDateBox",},
			    ],
			}, {
				colCount: 17,
				itemType: 'group',
				caption: '주간빈도',
			    items: [
			    	{colSpan:2, dataField: 'FAC_NAME', label: {visible:false}, editorType:"dxCheckBox", editorOptions: {text: "매주", value: false},},
			    	{colSpan:3, dataField: 'FAC_NAME', label: {visible:false}, editorType:"dxCheckBox", editorOptions: {text: "첫번째주", value: false},},
			    	{colSpan:3, dataField: 'FAC_NAME', label: {visible:false}, editorType:"dxCheckBox", editorOptions: {text: "두번째주", value: false},},
			    	{colSpan:3, dataField: 'FAC_NAME', label: {visible:false}, editorType:"dxCheckBox", editorOptions: {text: "세번째주", value: false},},
			    	{colSpan:3, dataField: 'FAC_NAME', label: {visible:false}, editorType:"dxCheckBox", editorOptions: {text: "네번째주", value: false},},
			    	{colSpan:3, dataField: 'FAC_NAME', label: {visible:false}, editorType:"dxCheckBox", editorOptions: {text: "마지막주", value: false},},
			    ],
			}, {
				colCount: 10,
				itemType: 'group',
				caption: '요일빈도',
			    items: [
			    	{colSpan:1, dataField: 'FAC_NAME', label: {visible:false}, editorType:"dxCheckBox", editorOptions: {text: "전체", value: false},},
			    	{colSpan:1, dataField: 'FAC_NAME', label: {visible:false}, editorType:"dxCheckBox", editorOptions: {text: "월", value: false},},
			    	{colSpan:1, dataField: 'FAC_NAME', label: {visible:false}, editorType:"dxCheckBox", editorOptions: {text: "화", value: false},},
			    	{colSpan:1, dataField: 'FAC_NAME', label: {visible:false}, editorType:"dxCheckBox", editorOptions: {text: "수", value: false},},
			    	{colSpan:1, dataField: 'FAC_NAME', label: {visible:false}, editorType:"dxCheckBox", editorOptions: {text: "목", value: false},},
			    	{colSpan:1, dataField: 'FAC_NAME', label: {visible:false}, editorType:"dxCheckBox", editorOptions: {text: "금", value: false},},
			    	{colSpan:1, dataField: 'FAC_NAME', label: {visible:false}, editorType:"dxCheckBox", editorOptions: {text: "토", value: false},},
			    	{colSpan:1, dataField: 'FAC_NAME', label: {visible:false}, editorType:"dxCheckBox", editorOptions: {text: "일", value: false},},
			    	{colSpan:2, dataField: 'FAC_NAME', label: {visible:false}, editorType:"dxCheckBox", editorOptions: {text: "법정공휴일제외", value: false},},
			    ],
			},
			],
		});			
	}

	function createTimeGrid() {
		$('#facilityPaymentTemplate .time-grid').dxDataGrid({
			allowColumnReordering: true,
			allowColumnResizing: true,
			columnAutoWidth: true,
			showBorders: true,
			columnFixing: {enabled: true},
			focusedRowEnabled: true,
			focusedRowIndex: 0,
			dataSource: [
				{TIME_SEQ: 1, RSV_YN: 'N', RENT_TIME: '06:00'},
				{TIME_SEQ: 2, RSV_YN: 'Y', RENT_TIME: '07:00'},
				{TIME_SEQ: 3, RSV_YN: 'Y', RENT_TIME: '08:00'},
				{TIME_SEQ: 4, RSV_YN: 'Y', RENT_TIME: '09:00'},
			],
		    selection: {
		        mode: 'multiple',showCheckBoxesMode:'always',
		    },			
			keyExpr: 'TIME_SEQ',
			columns: [{		
					visible:false,
					dataField: 'TIME_SEQ',
					caption: '시간표번호',	
				}, {		
					visible:false,
					dataField: 'RSV_YN',
					caption: '예약가능여부',	
				}, {		
					dataField: 'RENT_TIME',
					caption: '이용시간',	
				},
			],
			scrolling: {
				rowRenderingMode: 'virtual',
			},
			onToolbarPreparing(e) {
	            e.toolbarOptions.items.push({
		    			location: 'before',
						widget: 'dxSelectBox',
						options: {
					    	items: [{ID:'1',NAME:'하절기(평일시간표)'}, {ID:'2',NAME:'하절기(주말시간표)'}, {ID:'1',NAME:'동절기(평일시간표)'}, {ID:'1',NAME:'동절기(주말시간표)'}],
						    displayExpr: 'NAME',
						    valueExpr: 'ID',
						    value: '1', 
						}  		        	
	    			},
	    		);
		    },			
		});
	}
	
	function createSubitemGrid() {
		$('#facilityPaymentTemplate .subitem-grid').dxDataGrid({
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
			onToolbarPreparing(e) {
	            e.toolbarOptions.items.push({
		    			location: 'before',
		    			widget: 'dxCheckBox',
		    			options: {
			    			text: '무료대관',
		    			}
		        	},
	    		);
		    },		
		});
	}

	function createCartFacilityGrid() {
		var facList = reserveList.filter(function(item1, idx1) {
			return lecListJoin.findIndex(function(item2, idx2) {
				return item1.LEC_SEQ == item2.LEC_SEQ;
			}) == idx1;
		});
			
		$('#facilityPaymentTemplate .cart-facility-grid').dxDataGrid({
			allowColumnReordering: true,
			allowColumnResizing: true,
			columnAutoWidth: true,
			showBorders: true,
			focusedRowEnabled: true,
			focusedRowIndex: 0,
			dataSource: facList,
			keyExpr: 'LEC_SEQ',
			columns: getCartFacilityColumnList(),
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
		        		location: 'before',
		        		template: $('<div style="font-weight:700;margin-left:10px;">').append("대관예약정보"),
		        	}, {
		    			location: 'after',
		    			widget: 'dxButton',
		    			options: {
			    			text: '비대면 감면자격인증',
			    			onClick() {
			    			}
		    			}
		        	}, {
		        		location: 'after',
		        		template: $('<div style="margin-left:10px;">').append("이용일자"),
		        	}, {
		    			location: 'after',
						widget: 'dxSelectBox',
						options: {
					    	items: [{ID:'',NAME:'전체'}, {ID:'2022-10-01',NAME:'2022-10-01'}, {ID:'2022-10-02',NAME:'2022-10-02'}],
						    displayExpr: 'NAME',
						    valueExpr: 'ID',
						    value: '', 
						}   
		        	}, {
		        		location: 'after',
		        		template: $('<div style="margin-left:10px;">').append("예약상태"),
		        	}, {
		    			location: 'after',
						widget: 'dxSelectBox',
						options: {
					    	items: [{ID:'1',NAME:'신청작성중'}, {ID:'2',NAME:'승인대기'}, {ID:'3',NAME:'결제대기'}],
						    displayExpr: 'NAME',
						    valueExpr: 'ID',
						    value: '1', 
						}   		        	
	    			}, {
		    			location: 'after',
						widget: 'dxButton',
					    options: {
					    	text: '일괄변경',
					    	type: 'default',
					    	onClick() {
					    		popTeamSearch.hide();
							},
						},  		        	
	    			},
	    		);
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
	
	function createCartSubitemGrid() {
		var facList = reserveList.filter(function(item1, idx1) {
			return lecListJoin.findIndex(function(item2, idx2) {
				return item1.LEC_SEQ == item2.LEC_SEQ;
			}) == idx1;
		});
			
		$('#facilityPaymentTemplate .cart-subitem-grid').dxDataGrid({
			allowColumnReordering: true,
			allowColumnResizing: true,
			columnAutoWidth: true,
			showBorders: true,
			focusedRowEnabled: true,
			focusedRowIndex: 0,
			dataSource: facList,
			keyExpr: 'LEC_SEQ',
			columns: getCartSubitemColumnList(),
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
		        	location: 'before',
		        	template: $('<div style="font-weight:700;margin-left:10px;">').append("부속시설정보"),
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
		$("#facilityPaymentTemplate .locker-payment-button-container > div").eq(0).dxButton({
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
		
		$("#facilityPaymentTemplate .locker-payment-button-container > div").eq(1).dxButton({
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
		
		$("#facilityPaymentTemplate .locker-payment-button-container > div").eq(2).dxButton({
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
			
		$('#facilityPaymentTemplate .payment-grid').dxDataGrid({
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

function getCartFacilityColumnList() {
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
		dataField: 'LEC_START_DT',
		width:100,
		caption: '이용시간',	
		allowEditing: false
	}, {		
		dataField: 'LEC_PROG',
		caption: '품목명',
		showEditorAlways: true,
		lookup: {
			dataSource: [{ID:'프로그램1', NAME:'프로그램1'}, {ID:'프로그램2', NAME:'프로그램2'}],
			displayExpr: 'NAME',
			valueExpr: 'ID',
		},		
	}, {		
		dataField: 'LEC_PRICE',
		width:70,
		caption: '이용단가',	
		dataType: 'number',
		allowEditing: false
	}, {		
		dataField: 'REMAIN_CNT',
		width:45,
		caption: '수량',
		allowEditing: false,
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
		dataType: 'number',
		allowEditing: false
	}, {		
		dataField: 'LEC_STATUS',
		width:90,
		caption: '예약상태',
		showEditorAlways: true,
		lookup: {
			dataSource: [{ID:'1',NAME:'신청작성중'}, {ID:'2',NAME:'승인대기'}, {ID:'3',NAME:'결제대기'}],
			displayExpr: 'NAME',
			valueExpr: 'ID',
		},		
	}, {		
		dataField: 'PROG_PRICE',
		width:75,
		caption: '합계',		
		dataType: 'number',
		allowEditing: false
	}, {
        type: "buttons",
        width:40,
    }];
	
	resultColumn = setColumnAlignment(resultColumn);
	return resultColumn;
}

function getCartSubitemColumnList() {
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
		dataType: 'number',
		allowEditing: false
	}, {		
		dataField: 'REMAIN_CNT',
		width:45,
		caption: '수량',
		showEditorAlways: true,
		dataType: 'number',
	}, {		
		dataField: 'DC_DESC',
		width:150,
		caption: '감면적용',
		showEditorAlways: true,
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
		dataType: 'number',
		allowEditing: false
	}, {		
		dataField: 'PROG_PRICE',
		width:75,
		caption: '합계',			
		dataType: 'number',
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

