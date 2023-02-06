function formInit() {
	
	//입장발권관리
	//---------------------------------
	const tabs = [
		{
			id: 0,
		    text: '입장발권관리',
		},
		{
			id: 1,
			text: '입장객현황',
		},
	];
//	const tabs2 = [
//		{
//			id: 0,
//		    text: '정기회원입장(단축키)',
//		    icon: 'card',
//		},
//		{
//			id: 1,
//			text: '예약티켓발권(단축키)',
//		    icon: 'event',
//		},
//	];
	const selectDate = [
		{
			id: 0,
		    text: '발권안함',
		},
		{
			id: 1,
			text: '발권함',
		},
	];
	const selectDate2 = [
		{
			id: 0,
			text: '매수별 출력',
		},
		{
			id: 1,
			text: '묶음출력',
		},
		];
	
	createTab($('#mainTabs > .tabs-container'), tabs);	//맨위(입장발권관리/입장객현황)
	//createTab2($('#mainTabs_sub > .tabs-container'), tabs2); 	//두번째탭(정기회원입장[단축키]/예약티켓발권[단축키])
	
	// 두번째탭(정기회원입장[단축키]/예약티켓발권[단축키]) 디자인 변경
	$("#mainTabs_sub .custom-tab .div-btn button").on("click", function(){
		$("#mainTabs_sub .custom-tab .div-btn button").removeClass("selected-tab");
		$(this).addClass("selected-tab");
		
		if ($("#mainTabs_sub .custom-tab .div-btn button").index(this) == 0) {
			$('#tab1').show();
			$('#tab2').hide();
		} else {
			$('#tab1').hide();
			$('#tab2').css("display","inline-block");
		}
	});

	createItemsFuctionButtons();
	
	$('#first-on').dxSwitch({
		value: true,
		switchedOffText:"OFF",
		switchedOnText:"ON",
	});
	
	$('#second-on').dxSwitch({
		value: true,
		switchedOffText:"OFF",
		switchedOnText:"ON",
	});
	
	$('#third-on').dxSwitch({
		value: true,
		switchedOffText:"OFF",
		switchedOnText:"ON",
	});
	
	const form = $('#form').dxForm({
		readOnly: true,
	    items: [
	    	{
	        itemType: 'group',
	        cssClass: 'first-group fmText',
	        colCount: 5,
	        items: [
	        	{
	            template: "<div class='form-avatar'></div>",
	            colSpan: 2,
	        }, {
	            
	            itemType: 'group',
	            colSpan: 3,
	            items: [{
	                dataField: 'memNo',label: {text: '회원번호',}
	            }, {
	                dataField: 'birthDate',label: {text: '생년월일',}
	            },  {
	                dataField: 'hpNo',label: {text: '핸드폰번호',}
	            },  {
	                dataField: 'carNo',label: {text: '차량번호',}
	            }, ],
	        }
	        ],
	    }],
	}).dxForm("instance");
	
	const searchBox = $('#searchBox').dxSelectBox({
		dataSource: products,
		displayExpr: 'name',
		searchEnabled: true,
		searchExpr: ["name", "hpNo"],
		searchTimeout:1000,
		valueExpr: 'id',
		searchMode:'startswith',
		placeholder:'이름 또는 핸드폰번호를 입력하세요.',
		noDataText:'회원정보가 없습니다.',
		itemTemplate(data) {
			const sex = data.sex == "1" ? "남자" : "여자";
			return "<div class='custom-item' style='display:-webkit-inline-box;'><img src="+data.imageSrc+" width=50px; /><span class='product-name'>"+data.name+"("+sex+") &nbsp;&nbsp;&nbsp;&nbsp;"+data.birthDate+" (만 "+data.age+"세)</span><br/><span class='product-name'>"+data.hpNo+"</span></div>";
		},
		buttons: [{
			location: 'after',
			name: 'btn_enter',
			options: {
				icon: '/fmcs/images/ico_identity02.png',
				elementAttr: {
					class: "btnBorder"
				},				
				onClick() {
					DevExpress.ui.notify('identity');
					createOther(1);
				},
			},
		}, {
			location: 'after',
			name: 'btn_qrcode',
			options: {
				icon: '/fmcs/images/ico_qrcode.png',
				elementAttr: {
					class: "btnBorder"
				},				
				onClick() {
					DevExpress.ui.notify('qr코드');
					createOther(2);
				},
			},
		}, 'dropDown', {
			location: 'after',
			name: 'btn_refresh',
			options: {
				icon: 'clear',
				elementAttr: {
					class: "btnRefresh"
				},				
				type: 'default',
				onClick() {
					DevExpress.ui.notify('초기화');
					searchBox.option("value","");
					$("#searchResult").css("display","none");
					$("#searchDefault").css("display","");
				},
			},
		},],			
		onValueChanged(data) {
			if(data.event != null && "undefined" != data.event){
				const resultData = products[data.value-1];
				const lockData = resultData.useLockerInfo;
				const sex = resultData.sex == "1" ? "남자" : "여자";
				$("#profileNm").text(resultData.name+"("+sex+")");
				$("input[name=memNo]").val(resultData.id);
				$("input[name=birthDate]").val(resultData.birthDate);
				$("input[name=hpNo]").val(resultData.hpNo);
				$("input[name=carNo]").val(resultData.carNo);
				
				$("#lectureUse").text(resultData.lectureUseCnt);
				$("#lectureReRegist").text(resultData.lectureReRegistCnt);
				var useLocker = "";
				for(var i in lockData){
					useLocker +="<span>"+lockData[i].locationNm+"&nbsp;&nbsp;"+lockData[i].locationCd+"&nbsp;&nbsp;"+lockData[i].expirationDate+"</span>";
					useLocker +="<br/>";
				}
				$("#useLockerInfo").html(useLocker);
				$("#memo").text(resultData.memo);
				$("#searchResult").css("display","");
				$("#searchDefault").css("display","none");
			}
		},
	}).dxSelectBox('instance');
	
	$(".check-box").dxCheckBox({
		value: false,
		elementAttr: {
			class: "css_checkbox"
		},
	});
	$('.normal-01').dxButton({
		stylingMode: 'contained',
		text: '입장발권',
		type: 'normal',
		elementAttr: {
			class: "normal_btn_01"
		},
		width: 120,
		onClick() {
			DevExpress.ui.notify('The 입장발권 button was clicked');
		},
	});
	$('.normal-02').dxButton({
		stylingMode: 'contained',
		text: '퇴장',
		type: 'normal',
		elementAttr: {
			class: "normal_btn_01"
		},
		width: 120,
		onClick() {
			DevExpress.ui.notify('The 퇴장 button was clicked');
		},
	});
	$('.normal-03').dxButton({
		stylingMode: 'contained',
		text: '전체입장발권',
		type: 'normal',
		elementAttr: {
			class: "normal_btn_02"
		},
		width: 165,
		onClick() {
			DevExpress.ui.notify('The 전체입장발권 button was clicked');
		},
	});
	$('.normal-04').dxButton({
		stylingMode: 'contained',
		text: '입장발권',
		type: 'normal',
		elementAttr: {
			class: "normal_btn_02"
		},
		width: 165,
		onClick() {
			DevExpress.ui.notify('The 입장발권 button was clicked');
		},
	});
	const productsDataSource = new DevExpress.data.DataSource({
		store: {
			data: selectDate,
			type: 'array',
			key: 'id',
		},
	});
	const productsDataSource2 = new DevExpress.data.DataSource({
		store: {
			data: selectDate2,
			type: 'array',
			key: 'id',
		},
	});
	$('#elect_selectBox').dxSelectBox({
		dataSource:productsDataSource,
		width: '200',
		value: selectDate[0].id,
		displayExpr: 'text',
		searchEnabled: false,
	}).dxValidator({
		validationRules: [{
			type: 'required',
		}],
	}).dxSelectBox('instance');
	
	$('#elect_selectBox2').dxSelectBox({
		dataSource:productsDataSource,
		width: '200',
		value: selectDate[0].id,
		displayExpr: 'text',
		searchEnabled: false,
	}).dxValidator({
		validationRules: [{
			type: 'required',
		}],
	}).dxSelectBox('instance');
	$('#elect_selectBox3').dxSelectBox({
		dataSource:productsDataSource2,
		width: '200',
		value: selectDate[0].id,
		displayExpr: 'text',
		searchEnabled: false,
	}).dxValidator({
		validationRules: [{
			type: 'required',
		}],
	}).dxSelectBox('instance');
}

function createTab(selector, items) {
	$(selector).dxTabs({
		dataSource: items,
		selectedIndex: 0,
		scrollByContent: false,
		showNavButtons: true,
		onItemClick(e) {
			if(e.itemData.id == 0){
		    	$('#mainTabs_sub').show();
		    	$('#mainTabs_sub2').hide();
		    	$("#setting").show();
			}else{
				$('#mainTabs_sub').hide();
				$('#mainTabs_sub2').show();
				$("#setting").hide();
			}
		},
	});
}
//function createTab2(selector, items) {
//	$(selector).dxTabs({
//		dataSource: items,
//		selectedIndex: 0,
//		scrollByContent: false,
//		showNavButtons: true,
//		onItemClick(e) {
//			if(e.itemData.id == 0){
//				$('#tab1').show();
//				$('#tab2').hide();
//			}else{
//				$('#tab1').hide();
//				$('#tab2').css("display","inline-block");
//			}
//		},
//	});
//}
function createItemsFuctionButtons() {
	$('#memDetailBtn').dxButton({
		stylingMode: 'contained',
		text: '상세보기',
		type: 'default',
		onClick() {
			DevExpress.ui.notify('상세보기');
		},
	});
	$('#lectureDetailBtn').dxButton({
		stylingMode: 'contained',
		text: '상세보기',
		type: 'default',
		onClick() {
			DevExpress.ui.notify('상세보기');
		},
	});
}