//연계시스템설정
window.Intcon = window.Intcon || {};
//---------------------------------
Intcon.apiPath = "/fmcs/msgopt";
Intcon.selectedTabIndex=0;
const tabs = [
	{
		id: 0,
	    text: '비대면자격서비스연계',
	},
	{
		id: 1,
		text: '알림(카카오,SMS)연계설정',
	},
	{
		id: 2,
	    text: '결제서비스운영설정',
	},
	{
		id: 3,
		text: '본인인증서비스 연계 설정',
	},
	{
		id: 4,
		text: '날씨서비스 연계 설정',
	},
];

function formInit()
{
	createTab($('#scrolledtabs > .tabs-container'), tabs); 	//오른쪽 탭(강좌분류검색 설정/예약안내 컨텐츠 간리)
	CreateTab1Init();
}

function  createTab(selector, items) {
	$(selector).dxTabs({
		dataSource: items,
		selectedIndex:0,
		scrollByContent: true,
		showNavButtons: true,
		onSelectionChanged(e){
			var curidx = e.component.option('selectedIndex');
			if(curidx != Intcon.selectedTabIndex){
				var tabSelector = $('#tab'+(curidx+1));
				 if ( tabSelector.css('display') === 'none' ) {
					 	$('#tab'+(Intcon.selectedTabIndex+1)).hide();
					 	tabSelector.show();
		    		 	setTimeout(function(){
		    		 		switch(curidx){
			    		 		case 0: CreateTab1Init(); break;//비대면자격서비스연계
			    		 		case 1: CreateTab2Init(); break;//알림(카카오,SMS)연계설정
			    		 		case 2: CreateTab3Init(); break;//결제서비스운영설정
			    		 		case 3: CreateTab4Init(); break;//본인인증서비스 연계 설정
			    		 		case 4: CreateTab5Init(); break;//날씨서비스 연계 설정
		    		 		}
		    		 		 		
		    		 }, 100);
				 }
				 
				  
		    }
			Intcon.selectedTabIndex=curidx;
		},
	});
}
