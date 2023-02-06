var colCondition = [];
var columns = [];
var longtabs = [];
var firstUserForm = null;
	
function formInit() {
	//dxDataList($("#SEARCH_TABS").val());
	
	$("#btn_etc").on("click", function(){
		$("#sub_menu").toggle("show");
	});

	// 조건 생성
	createCondition();
		
	// 폼 생성
	createForm();
	
	// 감면그리드 생성
	createGridDc();
	
	// 기타정보그리드 생성
	createGridEtc();
	
	// 탭 생성
	createTab();
	
	// 감면 커스텀 탭 전환
	$("#dxFormUser .custom-tab .div-btn button").on("click", function(){
		$("#dxFormUser .custom-tab .div-btn button").removeClass("selected-tab");
		$(this).addClass("selected-tab");
		
		if ($("#dxFormUser .custom-tab .div-btn button").index(this) == 0) {
			$("#gridEtc").hide();
			$("#gridDc").show();
		} else {
			$("#gridDc").hide();
			$("#gridEtc").show();
		}
	});
	
	$("#tab2 .custom-tab .div-btn button").on("click", function(){
		$("#tab2 .custom-tab .div-btn button").removeClass("selected-tab");
		$(this).addClass("selected-tab");
		
		if ($("#tab2 .custom-tab .div-btn button").index(this) == 0) {
			createTab2Init();
		} else {
			createTab2_2Init();
		}
	});	
	
	//$('#scrolledtabs > .tabs-container').dxTabs("instance").option("selectedIndex", 7);
	createTab1Init();
}

function createCondition() {
	colCondition.push({dataField: 'USER_NAME', label: {text: '회원명',}, editorOptions:{
			placeholder: '회원명 2자리 이상 입력',
		}
	});
	colCondition.push({dataField: 'USER_BIRTH', label: {text: '생년월일',}, editorOptions:{ 
			placeholder: '- 없이 전체 8자리 입력',
		}
	});
	colCondition.push({dataField: 'USER_HP', label: {text: '휴대전화',}, editorOptions:{  
			placeholder: '- 없이 전체 번호 입력',
		}
	});
	
	$('.form-group.condition').dxForm({
	    colCount: 3,
	    showColonAfterLabel: false,
	    items: colCondition,
	});
	
	$('#searchBtn').dxButton({
		stylingMode: 'contained',
		template: '<i class="nav-icon fas fa-search-plus"></i>',
		type: 'default',
		onClick() {
			createUserSearchPopup("#userPopup", $('.form-group.condition').dxForm("instance").option("formData"), setUserMainFormData);
		},
	});
	$('#searchInitBtn').dxButton({
		stylingMode: 'contained',
		icon:'clear',
		type: 'default',
		elementAttr: {
			class: "btnRefresh"
		},
		onClick() {
			$('.form-group.condition').dxForm("instance").resetValues();
		},
	});	
}

function createGridDc() {
	var resultColumn = [{
		dataField: 'DC_SEQ',
		visible:false,
		caption: '감면번호',
	}, {
		dataField: 'DC_NAME',
		caption: '감면할인명',
	}, {
		dataField: 'DC_START_DT',
		caption: '감면시작일',
		editorType: 'dxDateBox',
	}, {
		dataField: 'DC_END_DT',
		caption: '감면종료일',	
		editorType: 'dxDateBox',
	}];
	
	//var items = getList(obj);
	
	$('#gridDc').dxDataGrid({
		columns: resultColumn,
		dataSource: dcList,
		keyExpr: "DC_SEQ",
		allowColumnReordering: true,
		allowColumnResizing: true,
		showBorders: true,
		showRowLines: true,
		focusedRowEnabled: true,
	    selection: {
	        mode: 'multiple',showCheckBoxesMode:'always',
	    },	
	    editing: {
	      mode: 'row',
	      allowUpdating: true,
	      useIcons: true,   
	    },	
		onCellPrepared: function(e){  
        	if(e.rowType === 'header' && e.column.command == "select") {  
                	var commandCell = e.cellElement;  
                	var ch = commandCell.find(".dx-select-checkbox").dxCheckBox("instance");  
                	ch.option("text", "확정");
                	commandCell.find(".dx-checkbox-icon").hide();
          	}  
		},
	});
}

function createGridEtc() {
	var resultColumn = [{
		dataField: 'ETC_SEQ',
		visible:false,
		caption: '추가항목번호',
	}, {
		dataField: 'ETC_NAME',
		caption: '추가항목명',
	}, {
		dataField: 'ETC_VAL',
		caption: '설정값',
	}];
	
	//var items = getList(obj);
	
	$('#gridEtc').dxDataGrid({
		columns: resultColumn,
		dataSource: etcList,
		keyExpr: "ETC_SEQ",
		allowColumnReordering: true,
		allowColumnResizing: true,
		showBorders: true,
		showRowLines: true,
		focusedRowEnabled: true,
	    selection: {
	        mode: 'multiple',showCheckBoxesMode:'always',
	    },	
	    editing: {
	      mode: 'row',
	      allowAdding: true,
	      allowUpdating: true,
	      allowDeleting: true,
	      useIcons: true,   
	  },	    	
	});
}

const employee = {
	  USER_NO: '1234',
	  USER_ID: 'test1',
	  USER_NAME: '김세종',
	  USER_GENDER: '',
	  USER_BIRTH: '',
	  USER_BIRTH_TYPE: '',
	  USER_REG_DT: '',
	  USER_HP: '',
	  USER_TYPE: '',
	  USER_PRIVACY_YN: '',
	  USER_SEND_YN: '',
	  USER_TERM_YN: '',
	  USER_PARENT_YN: '',
	  USER_PARENT_HP: '',
	  USER_CAR_NO: '',
	  USER_LAND: '',
	  USER_ADDRESS: '',
	};

function createForm() {
	const confirmYn = [{
		  ID: 'Y',
		  NAME: '동의함',
		}, {
		  ID: 'N',
		  NAME: '동의안함',
		}];
		
	columns.push({colSpan:4, dataField: 'USER_NO', label: {text: '회원번호',},});	
	columns.push({colSpan:4, dataField: 'USER_STATUS', label: {text: '회원상태',}, editorOptions: {
			buttons: [{
				name: 'addr_type',
				location: 'after',
				options: {
					text: '회원탈퇴',
					type: 'default',
					disabled: false,
					onClick() {
						DevExpress.ui.notify('탈퇴');
					},
				},
			}],
		},
	});			
		
	columns.push({colSpan:3, dataField: 'USER_NAME', label: {text: '회원성명'},});
	columns.push({dataField: 'USER_GENDER', label: {visible:false}, editorType:"dxSelectBox", editorOptions: {
	    dataSource: new DevExpress.data.ArrayStore({
	        data: [{
	  		  ID: '남',
			  NAME: '남',
			}, {
			  ID: '여',
			  NAME: '여',
			}],
	        key: 'ID',
	    }),
	    displayExpr: 'NAME',
	    valueExpr: 'ID',
	    value: '남',
        searchEnabled: true,
      }
	});
	
	columns.push({colSpan:3, dataField: 'USER_BIRTH', label: {text: '생년월일'}, editorType:"dxDateBox"});
	columns.push({dataField: 'USER_BIRTH_TYPE', label: {visible:false}, editorType:"dxSelectBox", editorOptions: {
	    dataSource: new DevExpress.data.ArrayStore({
	        data: [{
	  		  ID: '양력',
			  NAME: '양력',
			}, {
			  ID: '음력',
			  NAME: '음력',
			}],
	        key: 'ID',
	    }),
	    displayExpr: 'NAME',
	    valueExpr: 'ID',
	    value: '양력',
        searchEnabled: true,
      }
	});	
	
	columns.push({colSpan:4, dataField: 'USERREG_DT', label: {text: '등록일자',}, editorType:"dxDateBox",
		editorOptions: {
	  		displayFormat: 'yyyy-MM-dd',
		},
	});	
	columns.push({colSpan:4, dataField: 'USER_HP', label: {text: '휴대전화',},});		
	columns.push({colSpan:4, dataField: 'USER_ID', label: {text: '웹아이디',}, editorType:"dxTextBox", editorOptions:{
	    buttons: [{
	        name: 'btn_reset',
	        location: 'after',
	        options: {
	       	  template: '<i class="nav-icon fas fa-unlock"></i>',
	          type: 'default',
	          onClick() {
			  	DevExpress.ui.notify('아이디 잠금해제');
	          },
	          disabled:false,
	        },
	      },{
	        name: 'btn_id',
	        location: 'after',
	        options: {
	       		template: '<i class="nav-icon fas fa-cog"></i>',
	          type: 'default',
	          onClick() {
				DevExpress.ui.notify('패스워드 초기화');
	          },
	          disabled:false,
	        },
	      }
	      ],
		}
	});		
	columns.push({colSpan:4, dataField: 'USER_PRIVACY_YN', label: {text: '개인정보동의',}, editorType:"dxSelectBox", editorOptions: {
	    dataSource: new DevExpress.data.ArrayStore({
	        data: confirmYn,
	        key: 'ID',
	    }),
	    displayExpr: 'NAME',
	    valueExpr: 'ID',
	    value: 'Y',
        searchEnabled: true,
      }
	});	
	columns.push({colSpan:4, dataField: 'USER_TYPE', label: {text: '회원구분',}, editorType:"dxSelectBox", editorOptions: {
	    dataSource: new DevExpress.data.ArrayStore({
	        data: [{
				  ID: '',
				  NAME: '선택안함',
				}],
	        key: 'ID',
	    }),
	    displayExpr: 'NAME',
	    valueExpr: 'ID',
	    value: '',
        searchEnabled: true,
      }
	});	
	columns.push({colSpan:4, dataField: 'USER_SEND_YN', label: {text: '알림수신동의',}, editorType:"dxSelectBox", editorOptions: {
	    dataSource: new DevExpress.data.ArrayStore({
	        data: confirmYn,
	        key: 'ID',
	    }),
	    displayExpr: 'NAME',
	    valueExpr: 'ID',
	    value: 'Y',
        searchEnabled: true,
      }
	});	
	columns.push({colSpan:4, dataField: 'USER_PARENT_YN', label: {text: '보호자발송동의',}, editorType:"dxSelectBox", editorOptions: {
	    dataSource: new DevExpress.data.ArrayStore({
	        data: confirmYn,
	        key: 'ID',
	    }),
	    displayExpr: 'NAME',
	    valueExpr: 'ID',
	    value: 'N',
        searchEnabled: true,
      }
	});
	columns.push({colSpan:4, dataField: 'USER_PARENT_HP', label: {text: '보호자연락처',},});	
	columns.push({colSpan:4, 
		dataField: 'USER_LAND', label: { text: '거주지구분', }, editorType: "dxSelectBox", editorOptions: {
			dataSource: new DevExpress.data.ArrayStore({
				data: [{
					ID: '',
					NAME: '선택안함',
				}, {
					ID: '관내거주',
					NAME: '관내거주',
				}, {
					ID: '관외거주',
					NAME: '관외거주',
				}],
				key: 'ID',
			}),
			displayExpr: 'NAME',
			valueExpr: 'ID',
			value: '',
			buttons: ['dropDown', {
				name: 'addr_type',
				location: 'after',
				options: {
					text: '거주인증',
					type: 'default',
					disabled: false,
					onClick() {
						DevExpress.ui.notify('거주인증');
					},
				},
			}],
		}
	});	
	columns.push({colSpan:4, dataField: 'USER_CAR_NO', label: { text: '차량번호', }, });
	columns.push({
		colSpan:8, dataField: 'USER_ADDRESS', label: { text: '주소', }, editorType: "dxTextBox", editorOptions: {
			buttons: [{
				name: 'addr_type',
				location: 'after',
				options: {
					text: '주소검색',
					type: 'default',
					disabled: false,
					onClick() {
						createUserAddressPopup('#userPopup', function(data) {
							alert(JSON.stringify(data));
						});
					},
				},
			}],
		}
	});	
	
	$('#formUser').dxForm({
	    colCount: 8,
	    showColonAfterLabel: false,
	    //formData: employee,
	    items: columns,
        alignItemLabels: true,
        readOnly:true,   
	});  
	
	if(!firstUserForm) {
		firstUserForm = Object.freeze($('#formUser').dxForm("instance").option("formData"));
	}
	
	$('.desc-card').dxScrollView({
		scrollByContent: true,
		showScrollbar: 'always',
	});	
	
	addCardDesc("비고 테스트1", "admin1", "2022-10-01 12:30:11");
	addCardDesc("비고 테스트2", "admin2", "2022-10-02 12:30:11");
	addCardDesc("비고 테스트3", "admin3", "2022-10-03 12:30:11");
	
	$('.desc-register .desc-text-area').dxTextArea({
	    value: "",
	    height: 50,
	});
	
	$('.desc-register .desc-btn-area').dxButton({
		stylingMode: 'contained',
		text: '등록',
		type: 'default',
		onClick() {
			var descVal = $('.desc-register .desc-text-area').dxTextArea("instance").option("value");
			addCardDesc(descVal, "관리자", "2022-10-03 12:30:11");
		},
	});	
	
	$(".profile-image .user-info.nomember").dxButton({
		stylingMode: 'contained',
		template: '카드 미발급',
		type: 'normal',
		onClick() {
			createUserCardMakePopup("#userPopup", $('.form-group.condition').dxForm("instance").option("formData"), setUserMainFormData);
		},
	});
}

function addCardDesc(desc, writer, dt) {
	$('.desc-card').dxScrollView("instance").content().prepend("<div class='desc-btn-area'><div></div><div class='desc-text-area'></div><div class='desc-writer-area'></div></div>");
	
	$('.desc-card .desc-text-area').first().dxTextArea({
	    value: desc,
	    height: 80,
	});	
	  
	$('.desc-card .desc-writer-area').first().html("<span>" + writer + "</span><span>" + dt + "</span>");
	
	// close 버튼 생성
	$('.desc-card .desc-btn-area > div:first-child').first().append($(".user-profile .profile-close").html());
	$('.desc-card .desc-btn-area > div:first-child').first().on("click", function() {
		$(this).parent().remove();
	});
}

function createTab() {
	longtabs = [
		{ 
			id: 'tab1',
			text: '강좌등록현황',
		}, { 
			id: 'tab2',
			text: '온라인신청현황',
		}, {
			id: 'tab3',
			text: '사물함임대현황',
		}, {
			id: 'tab4',
			text: '결제이력보기',
		}, {
			id: 'tab5',
			text: '강좌연기내역',
		}, {
			id: 'tab6',
			text: '대관이용현황',
		}, {
			id: 'tab7',
			text: '가족관리',
		}, {
			id: 'tab8',
			text: 'SNS로그인연결정보',
		},
	];
		
	$('#scrolledtabs > .tabs-container').dxTabs({
		dataSource: longtabs,
		scrollByContent: false,
		showNavButtons: true,
		onItemClick(e) {
			var idx = parseInt((e.itemData.id).replace("tab", ""));
			
			switch(idx) {
				case 1 :
					createTab1Init();
					break;
				case 2 :
					createTab2Init();
					break;
				case 3 :
					createTab3Init();
					break;
				case 4 :
					createTab4Init();
					break;
				case 5 :
					createTab5Init();
					break;
				case 6 :
					createTab6Init();
					break;
				case 7 :
					createTab7Init();
					break;
				case 8 :
					createTab8Init();
					break;
			}			
		},
		selectedIndex: 0,
	});
}

function setUserMainFormData(data) {
	if (data.CARD_NO && data.CARD_NO.length > 0) {
		$(".profile-image .user-info.nomember").hide();
		$(".profile-image .user-info.member").show();		
		
		$(".profile-image .user-info.member").dxButton({
			stylingMode: 'contained',
			template: `카드발급 (${data.CARD_NO})`,
			type: 'normal',
		});		
	}
	
	setFormData($('#formUser'), data);
}
