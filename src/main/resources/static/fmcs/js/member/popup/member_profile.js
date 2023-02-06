const userProfileTemplate = `
<div class="user-profile">
	<div class="profile-close">
		<div class="cst-small-button dx-button dx-button-normal dx-button-mode-contained">
			<div class="dx-button-content"><i class="dx-icon dx-icon-close"></i></div>
		</div>
	</div>
	<div class="profile-image">
		<img src="/fmcs/images/profile.png">
	</div>
	<div class="profile-camera"></div>	
</div>`;

const userProfileTemplate2 = `
<div class="user-profile">
	<div class="profile-image profile-image-cam" style="margin-left:5%;display:none;">
		<img src="/fmcs/images/cam.png">
	</div>
	<video id="myVideo" class="profile-image" style="margin-left:1%;width:320px;">
	</video>
</div>`;

const userProfileTemplate3 = `
<div class="user-profile">
	<div class="profile-image profile-image-capture" style="margin-left:5%;">
		<img src="/fmcs/images/profile.png">
		<canvas id="myCanvas"></canvas>
	</div>
	<div class="profile-upload" style="display:none;">
	</div>
</div>`;

const userProfileUploadTemplate = `
<div id="userProfileUploadTemplate">
</div>`;

var popUserProfile = null;
var myVideoStream = null;
var myStoredInterval = 0;
  
function getVideo(){
  navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
  navigator.getMedia({video: true, audio: false},
                     
    function(stream) {
      myVideoStream.srcObject = stream;   
      myVideoStream.play();
      popUserProfile.option("toolbarItems[0].visible", false);
      popUserProfile.option("toolbarItems[1].visible", true);
  }, 
                     
   function(error) {
     $(".profile-image-cam").show();
     popUserProfile.option("toolbarItems[0].visible", true);
  });
}
  
function takeSnapshot() {
   var myCanvasElement = document.getElementById('myCanvas');
   var myCTX = myCanvasElement.getContext('2d');
   myCTX.drawImage(myVideoStream, 0, 0, myCanvasElement.width, myCanvasElement.height);
   $(".profile-image-capture img").hide();
   $("#myCanvas").show();
}

function createUserProfilePopup(selector, editFormData, callback) {
	if (popUserProfile){
		popUserProfile = null;
		$(selector).dxPopup("dispose");
	}
	
	popUserProfile = $(selector).dxPopup({
		contentTemplate: $('<div>').append(userProfileUploadTemplate),
		visible: true,
		title: '회원사진 등록',
		width:750,
        height:400,
		position: {
			my: 'center',
			at: 'center',
			of: window
		},
		dragEnabled: true,
		onShown() {
			createUserProfileUploadForm(editFormData);
			myVideoStream = document.getElementById('myVideo');
			getVideo();
			
			$(".profile-upload").dxFileUploader({
				uploadMode: 'useButtons',
				uploadUrl: 'https://js.devexpress.com/Demos/NetCore/FileUploader/Upload',
				allowedFileExtensions: img_ext,
				maxFileSize: 4000000,
    			onValueChanged(data) {
					$("#myCanvas").hide();
					$(".profile-image-capture img").show();
					previewUploadImage(data.value[0], ".profile-image-capture img");
    			},
    		});
		},
		onHidden() {
			 myVideoStream.srcObject.getTracks().forEach(function(track) {
			 	track.stop();
			 });

  			myVideoStream.srcObject = null;
		},
		toolbarItems: [{
			widget: 'dxButton',
		    toolbar: 'bottom',
		    location: 'before',
		    visible:false, 
		    options: {
		    	text: '캠연결',
		    	onClick() {
		    		getVideo();
				},
			},
		}, {
			widget: 'dxButton',
		    toolbar: 'bottom',
		    location: 'before',
		    visible:false, 
		    options: {
		    	text: '사진캡처',
		    	onClick() {
		    		takeSnapshot();
				},
			},
		}, {
			widget: 'dxButton',
		    toolbar: 'bottom',
		    location: 'after',
		    options: {
		    	text: '내PC 업로드',
		    	onClick() {
					var fileUploader = $(".profile-upload").dxFileUploader('instance');  
		    		fileUploader._isCustomClickEvent = true;  
					fileUploader._$fileInput.click();  
				},
			},
		}, {
			widget: 'dxButton',
		    toolbar: 'bottom',
		    location: 'after',
		    options: {
		    	text: '저장',
		    	onClick() {
		    		DevExpress.ui.notify('저장');
				},
			},
		}, {
			widget: 'dxButton',
		    toolbar: 'bottom',
		    location: 'after',
		    options: {
		    	text: '취소',
		    	onClick() {
		    		popUserProfile.hide();
				},
			},
		}],
	}).dxPopup('instance');
}

function createUserProfileUploadForm(editFormData) {
	var columns = [];
	
	columns.push({template: userProfileTemplate2,});	
	columns.push({template: userProfileTemplate3,});	
		
	$('#userProfileUploadTemplate').dxForm({
	    colCount: 2,
	    showColonAfterLabel: false,
	    formData: employee,
	    items: columns,
        alignItemLabels: true,
	}); 
}
