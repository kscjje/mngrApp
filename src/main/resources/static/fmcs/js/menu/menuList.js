//사이트메뉴관리
//---------------------------------
var frmContent = {NOTI_CONTEXT: '',CTGCD: '',};

const tabs = [
	{
		id: 0,
	    text: '관리자',
	},
	{
		id: 1,
		text: '사용자',
	},
];

function formInit()
{
	createTab($('#scrolledtabs > .tabs-container'), tabs); 	//오른쪽 탭(강좌분류검색 설정/예약안내 컨텐츠 간리)
	CreateTab1Init();
	//CreateTab2Init();
	
}

function  createTab(selector, items) {
	$(selector).dxTabs({
		dataSource: items,
		selectedIndex: 0,
		scrollByContent: false,
		showNavButtons: true,
		onItemClick(e) {
			if(e.itemData.id == 0){
				if ( $('#tab1').css('display') === 'none' ) {
					$('#tab1').show();
		    		$('#tab2').hide();
		    	} else {
		    		  //$('.box').hide();
		    	}
			}else{
				if ( $('#tab2').css('display') === 'none' ) {
					$('#tab2').show();
					
		    		$('#tab1').hide();
		    	} else {
		    		  //$('.box').hide();
		    	}
			}
		},
	});
}

function jsOrder(F) {
	var selectedRowKeys = treeCategory.getSelectedRowKeys();
	
	
    /*$.getJSON(
        "/backOffice/menu/order"
        , {M_UPPER_CD: $("#M_UPPER_CD").val(), M_CD: $("#M_CD").val(), M_ORD: $("#M_ORD").val(), F: F}
        , function (data) {
            if (data.result == "success") {
                location.href = document.URL;
            }
        }
    );*/
}
