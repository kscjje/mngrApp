var otherPopup=null;
var electPopup=null;

const otherTemplate = 
	`<div class="buttons">
		<div class="btn-group" id="searchOBtn"></div>
		<div class="btn-group" id="searchOInitBtn"></div>
	</div>
	<div id="otherContent" class="shadow_box" style="height:12vw;margin-top:10px;"></div>`;
const electTemplate = 
	`<div id="electTitle" style="font-size: 28px;font-weight: bold;font-family: 'Noto Sans KR';"></div>
	<div id="oldLockNo"style="margin-top: 50px;font-size: 90px;margin-left: 170px;margin-bottom:10px;">79</div>
	<div id="elect_form"></div>
	<div style="position: fixed;bottom: 150px;right:30px;">
		<div style="margin-bottom: 50px;">
			<div class="dx-field-value">
				<div id="auto-on"></div>
			</div>
			<div class="dx-field-label">자동발권</div>
		</div>
		<div id="electContent" class="shadow_box" style="height: 18vw;margin-top: 10px;width: 20vw;border-radius: 20px;padding: initial;">
			<div id="newLockNo"style="height: 130px;font-size: 90px;text-align: center;border-bottom: ridge;">81</div>
			<div style="margin-top:30px;" id="elect_form2"></div>
		</div>
	</div>`;
const otherContentTemplate = function () {
    return $('<div>').append(otherTemplate);
};
const electContentTemplate = function () {
	return $('<div>').append(electTemplate);
};

function createOther(gubun){
	if(otherPopup){
		otherPopup=null;
		$("#othercenter_popup").dxPopup("dispose");
	}
	
	otherPopup=$("#othercenter_popup").dxPopup({
		contentTemplate: otherContentTemplate,
		title: '회원카드',
		container: '#total',
		showTitle: true,
		width:600,
		height:460,
		dragEnabled: true,
	    hideOnOutsideClick: false,				//팝업창 외 클릭 시 팝업창 꺼짐여부
	    showCloseButton: true,
		visible: true,
		position: {
			my: 'center',
		    at: 'center',
		    of: window
		},
		 onShown(){
			  $('#searchOBtn').dxButton({
					stylingMode: 'contained',
					type: 'normal',
					text: '회원카드',
					elementAttr: {
						class: "btnPopup"
					},
					onClick() {
						DevExpress.ui.notify('회원카드');
						var content = "회원카드를 리더기에 읽혀주세요......";
						$("#otherContent").html(content);
					},
				});
			  $('#searchOInitBtn').dxButton({
					stylingMode: 'contained',
					type: 'normal',
					text: '네이버QR',
					elementAttr: {
						class: "btnPopup"
					},
					onClick() {
						DevExpress.ui.notify('네이버QR');
						var content = "네이버QR 코드를 리더기에 읽혀주세요......";
						$("#otherContent").html(content);
					},
				});			  
			  //export: {enabled: true},
		  },
		  toolbarItems: [{
			  widget: 'dxButton',
		      toolbar: 'bottom',
		      location: 'after',
		      options: {
		    	  text: '확인',
		    	  onClick() {
		    		  const message = '확인';
		    		  DevExpress.ui.notify({
		    			  message,
		    			  position: {
		    				  my: 'center top',
		    				  at: 'center top',
		    			  },
		    		  }, 'success', 3000);
		    		  otherPopup.hide();
		    	  },
		      },
		  }, {
			  widget: 'dxButton',
		      toolbar: 'bottom',
		      location: 'after',
		      options: {
		    	  text: '취소',
		    	  onClick() {
		    		  otherPopup.hide();
		    	  },
		      },
		  }],
	}).dxPopup('instance');
	var content = "";
	if(gubun == 1 ){
		content = "회원카드를 리더기에 읽혀주세요......";
		$("#otherContent").html(content);
	} else {
		content = "네이버QR 코드를 리더기에 읽혀주세요......";
		$("#otherContent").html(content);
	}
}
