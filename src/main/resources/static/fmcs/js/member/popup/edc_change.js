function createLectureChangePopup(selector, subPopupSelector, callback) {
	const lectureChangeTemplate = `
		<style>
			#lectureChangeTemplate .form-group {margin:0;}
		</style>
		<div id="lectureChangeTemplate" style="margin-top: -20px;">
			<div class="popup-condition-area row">
				<div class="form-group user-info selected-form-group col-12"></div>
			</div>
			<div class="popup-condition-area row">
				<div class="form-group before-lecture-info selected-form-group col-6" style="padding-right:30px;"></div>
				<div class="form-group after-lecture-info selected-form-group col-6"></div>
			</div>
			<div class="popup-condition-area row">
				<div class="form-group before-program-info selected-form-group col-6" style="padding-right:30px;"></div>
				<div class="form-group col-6">
					<div class="after-program-info selected-form-group"></div>
					<div class="after-program-app selected-form-group"></div>
				</div>
			</div>		
			<div class="row">
				<div class="col-4">
					<h6 class="mt15"><strong>결제방법</strong></h6>
					<div class="form-group locker-payment-button-container">
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
				<div class="col-4" style="padding:43px 30px 0 0;">
					<div>
						<div class="payment-grid" style="height:160px;"></div>
					</div>
				</div>
				<div class="col-4">
			        <div class="mt15">
			            <h6><strong>결제정보</strong></h6>
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

	var popLectureChange = null;
	var subPopup = null;	
	subPopup = subPopupSelector;
	
	if (popLectureChange){
		popLectureChange = null;
		$(selector).dxPopup("dispose");
	}
	
	popLectureChange = $(selector).dxPopup({
		contentTemplate: $('<div>').append(lectureChangeTemplate),
		visible: true,
		title: '강좌변경',
		width:1200,
        height:900,
		position: {
			my: 'center',
			at: 'center',
			of: window
		},
		dragEnabled: true,
		onShown() {
			createUserInfo();
			createLectureInfo();
			createProgramInfo();
			createPaymentGrid();
		},
		toolbarItems: [{
			widget: 'dxButton',
		    toolbar: 'bottom',
		    location: 'after',
		    options: {
		    	text: '변경완료',
		    	onClick() {
		    		popLectureChange.hide();
				},
			},
		}, {
			widget: 'dxButton',
		    toolbar: 'bottom',
		    location: 'after',
		    options: {
		    	text: '취소',
		    	onClick() {
		    		popLectureChange.hide();
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
		
		$('#lectureChangeTemplate .user-info').dxForm({
			formData: myformData,
			showColonAfterLabel: false,
		    customizeItem(item) {
				if (item && item.dataField) {
	        		item.template = $('<span>').text(myformData[item.dataField]);		
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

	function createLectureInfo() {
		var myformData = {};
		myformData.LEC_SEQ = 1;
		myformData.LEC_NAME = "정기수영 새벽1 중급 [월수반]";
		myformData.LEC_TEACHER = "이순신";
		myformData.LEC_TIME = "06:00~07:00 (월,수)";
		
		var colCondition = [];
		colCondition.push({dataField: 'LEC_SEQ', visible:false,});	
		colCondition.push({colSpan:2, dataField: 'LEC_NAME', label: {text: '강좌명',},});	
		colCondition.push({dataField: 'LEC_TEACHER', label: {text: '강사명',},});
		colCondition.push({colSpan:2, dataField: 'LEC_TIME', label: {text: '강좌시간',},});
		
		$('#lectureChangeTemplate .before-lecture-info').dxForm({
			formData: myformData,
			showColonAfterLabel: false,
		    labelMode: 'outside',
		    labelLocation: 'top',
		    customizeItem(item) {
				if (item && item.dataField) {
	        		item.template = $('<span>').text(myformData[item.dataField]);		
				}
	        },				    
			items: [{
				colCount: 5,
				itemType: 'group',
				caption: '변경전 강좌 정보',		    
			    items: colCondition,
			}],

		});
		
		myformData = {};
		myformData.LEC_SEQ = 2;
		myformData.LEC_NAME = " 변경할 강좌를 선택해주세요.";
		myformData.LEC_TEACHER = "-";
		myformData.LEC_TIME = "-";
		
		colCondition = [];
		colCondition.push({dataField: 'LEC_SEQ', visible:false,});	
		colCondition.push({colSpan:4, dataField: 'LEC_NAME', label: {text: '강좌명',},});	
		colCondition.push({colSpan:2, dataField: 'LEC_TEACHER', label: {text: '강사명',},});
		colCondition.push({colSpan:3, dataField: 'LEC_TIME', label: {text: '강좌시간',},});
		colCondition.push({itemType: 'button',
			buttonOptions: {
				icon: 'edit',
				type: 'normal',
				onClick() {
					createLectureSearchPopup(subPopupSelector, function() {
						
					});
				},
			},
		});
		
		$('#lectureChangeTemplate .after-lecture-info').dxForm({
			formData: myformData,
			showColonAfterLabel: false,
		    labelMode: 'outside',
		    labelLocation: 'top',
		    customizeItem(item) {
				if (item && item.dataField) {
	        		item.template = $('<span>').text(myformData[item.dataField]);		
				}
	        },				    
			items: [{
				colCount: 10,
				itemType: 'group',
				caption: '변경후 강좌 정보',		    
			    items: colCondition,
			}],

		});	
	}
	
	function createProgramInfo() {
		var myformData = {};
		myformData.LEC_SEQ = 1;
		myformData.LEC_NAME = "정기수영 새벽1 중급 [월수반]";
		myformData.LEC_TEACHER = "이순신";
		myformData.LEC_TIME = "06:00~07:00 (월,수)";
		
		var colCondition = [];
		colCondition.push({colSpan:2, dataField: 'LCK_USE_MONTH', label: {text: '요금명'}, editorOptions: {readOnly: true}});	
		
		colCondition.push({colSpan:1, dataField: 'USE_START_DT', label: {text: '이용일',}, editorType:"dxDateBox", editorOptions: {readOnly: true}});
		colCondition.push({colSpan:1, dataField: 'USE_END_DT', label: {text: '~',}, editorType:"dxDateBox", editorOptions: {readOnly: true}});	
		
		colCondition.push({colSpan:1, dataField: 'LCK_USE_MONTH', label: {text: '남은횟수'}, editorOptions: {readOnly: true}});
		colCondition.push({colSpan:1,itemType:'empty'});
		
		colCondition.push({colSpan:1, dataField: 'LCK_USE_MONTH', label: {text: '판매원가'}, editorOptions: {readOnly: true}});	
		colCondition.push({colSpan:1, dataField: 'LCK_USE_MONTH', label: {text: '할인금액'}, editorOptions: {readOnly: true}});
		
		colCondition.push({colSpan:1, dataField: 'LCK_USE_MONTH', label: {text: '적용금액'}, editorOptions: {readOnly: true}});	
		colCondition.push({colSpan:1, dataField: 'LCK_USE_MONTH', label: {text: '적용금액사용'}, editorType:"dxCheckBox",});
		
		colCondition.push({colSpan:1, dataField: 'LCK_USE_MONTH', label: {text: '총일수'}, editorType:"dxNumberBox",});	
		colCondition.push({colSpan:1, dataField: 'LCK_USE_MONTH', label: {text: '사용일수'}, editorType:"dxNumberBox",});	
		
		colCondition.push({colSpan:1, dataField: 'LCK_USE_MONTH', label: {text: '일할금액'}, editorOptions: {readOnly: true}});	
		colCondition.push({colSpan:1, dataField: 'LCK_USE_MONTH', label: {text: '일할금액사용'}, editorType:"dxCheckBox",});		
		
		colCondition.push({colSpan:2, dataField: 'LCK_USE_MONTH', label: {text: '비고'}, editorOptions: {readOnly: true}});	
		
		$('#lectureChangeTemplate .before-program-info').dxForm({
			//formData: myformData,
			showColonAfterLabel: false,
			items: [{
				colCount: 2,
				itemType: 'group',
				caption: '변경전 요금 정보',		    
			    items: colCondition,
			}],
		});
		
		myformData = {};
		myformData.LEC_SEQ = 2;
		myformData.LEC_NAME = " 변경할 강좌를 선택해주세요.";
		myformData.LEC_TEACHER = "-";
		myformData.LEC_TIME = "-";
		
		colCondition = [];
		colCondition.push({colSpan:4, dataField: 'LCK_USE_MONTH', label: {text: '요금명'},});	
		
		colCondition.push({colSpan:2, dataField: 'USE_START_DT', label: {text: '이용일',}, editorType:"dxDateBox",});
		colCondition.push({colSpan:2, dataField: 'USE_END_DT', label: {text: '~',}, editorType:"dxDateBox",});	
		
		colCondition.push({colSpan:2, dataField: 'LCK_USE_MONTH', label: {text: '이용기간내횟수'},});
		colCondition.push({colSpan:2, dataField: 'LCK_USE_MONTH', label: {text: '무료횟수'},});
		
		colCondition.push({colSpan:2, dataField: 'LCK_USE_MONTH', label: {text: '판매원가'},});	
		colCondition.push({colSpan:2, dataField: 'LCK_USE_MONTH', label: {text: '할인제외금액'},});
		
		colCondition.push({colSpan:2, dataField: 'LCK_USE_MONTH', label: {text: '할인금액'},});	
		colCondition.push({colSpan:2, dataField: 'LCK_USE_MONTH', label: {text: '또는 할인율'},});		
		
		colCondition.push({colSpan:2, dataField: 'LCK_USE_MONTH', label: {text: '판매금액'},});
		colCondition.push({colSpan:2,itemType:'empty'});
		
		colCondition.push({colSpan:4, dataField: 'LCK_USE_MONTH', label: {text: '비고'},});	
		
		$('#lectureChangeTemplate .after-program-info').dxForm({
			//formData: myformData,
			showColonAfterLabel: false,			    
			items: [{
				colCount: 4,
				itemType: 'group',
				caption: '변경후 요금 정보',		    
			    items: colCondition,
			}],
			readOnly: true,
		});	
		
		var colCondition = [];
		colCondition.push({colSpan:1, dataField: 'LCK_USE_MONTH', label: {text: '정원 　'},});
		colCondition.push({colSpan:1, dataField: 'LCK_USE_MONTH', label: {text: '등록수'},});
		colCondition.push({colSpan:1, dataField: 'LCK_USE_MONTH', label: {text: '온라인'},});
		colCondition.push({colSpan:1, dataField: 'LCK_USE_MONTH', label: {text: '방문 　'},});
		
		$('#lectureChangeTemplate .after-program-app').dxForm({
			//formData: myformData,
			showColonAfterLabel: false,			    
			items: [{
				colCount: 4,
				itemType: 'group',
				caption: '강좌신청 정보',		    
			    items: colCondition,
			    readOnly: true,
			}],
		});			
	}	

	function createPaymentGrid() {
		$("#lectureChangeTemplate .locker-payment-button-container > div").eq(0).dxButton({
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
		
		$("#lectureChangeTemplate .locker-payment-button-container > div").eq(1).dxButton({
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
		
		$("#lectureChangeTemplate .locker-payment-button-container > div").eq(2).dxButton({
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
			
		$('#lectureChangeTemplate .payment-grid').dxDataGrid({
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