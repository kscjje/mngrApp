//본인인증서비스 연계 설정
function CreateTab4Init()
{
	if(Intcon.formNice){
		niceformLoad();
	}else{
		CreateTab4form();
	}
}
function CreateTab4form()	
{
	$('#formNice').dxForm({
		showColonAfterLabel: false,
		colCount:9,
	    items: [
	    	{colSpan:2,dataField:'NICE_PRODUCT_ID',label: {text:'NICE 상품ID'},
	    		editorType:'dxTextBox',
	    	},
	    	{
	    		itemType: 'button',colSpan:7,
			    horizontalAlignment: 'right',
			    buttonOptions: {
			    	text: '저장하기',
			        type: 'success',
			        useSubmitBehavior: true,
			        onClick(e){
			        	niceformSave();
			        }
			    },
			},
			{colSpan:2,dataField:'NICE_CLIENT_ID',label: {text:'NICE 클라이언트ID'},
				editorType:'dxTextBox',
	    	},
	    	{itemType:'empty',colSpan:7},
			{colSpan:2,dataField: 'NICE_CLIENT_SECRET_KEY',label: { text: 'NICE 비밀키',},
	    		editorType:'dxTextBox',
  			},
  			{itemType:'empty',colSpan:7},
  			{colSpan:2,dataField:'NICE_HP_OWNER_AUTH_ID',label: {text:'NICE 휴대폰 본인 인증 ID'},
  				editorType:'dxTextBox',
	    	},
	    	{colSpan:2,dataField:'NICE_HP_OWNER_AUTH_PWD',label: {text:'NICE 휴대폰 본인 인증 비빌번호'},
	    		editorType:'dxTextBox',
	    		editorOptions:{
	    			  mode: 'password',  
	    			  buttons:[{
	    				name: "NICE_HP_PWD_VIEW",
	          	        location: 'after',
	  					options: {
	  						icon:'fa fa-fw fa-eye',
	  						onClick(e) {
  								var  iconO= e.component.option("icon");
  								if(iconO.indexOf('fa-eye-slash')>=0){
  									e.component.option('icon','fa fa-fw fa-eye');
  									Intcon.formNice.getEditor("NICE_HP_OWNER_AUTH_PWD").option('mode','password');
  								}else{
  									e.component.option('icon','fa fa-fw fa-eye-slash');
  									Intcon.formNice.getEditor("NICE_HP_OWNER_AUTH_PWD").option('mode','text');
  								}
	  						},
	  					},
	  				}],
	    		},
	    	},
	    	{itemType:'empty',colSpan:5},
	    	{colSpan:2,dataField:'NICE_IPIN_OWNER_AUTH_ID',label: {text:'NICE IPIN 본인 인증 ID'},
  				editorType:'dxTextBox',
	    	},
	    	{colSpan:2,dataField:'NICE_IPIN_OWNER_AUTH_PWD',label: {text:'NICE IPIN 본인 인증 비밀번호'},
	    		editorType:'dxTextBox',
	    		editorOptions:{
	    			  mode: 'password',  
	    			  buttons:[{
	  	    			name: "NICE_IPIN_PWD_VIEW",
	          	        location: 'after',
	  					options: {
	  						icon:'fa fa-fw fa-eye',
	  						onClick(e) {
  								var  iconO= e.component.option("icon");
  								if(iconO.indexOf('fa-eye-slash')>=0){
  									e.component.option('icon','fa fa-fw fa-eye');
  									Intcon.formNice.getEditor("NICE_IPIN_OWNER_AUTH_PWD").option('mode','password');
  								}else{
  									e.component.option('icon','fa fa-fw fa-eye-slash');
  									Intcon.formNice.getEditor("NICE_IPIN_OWNER_AUTH_PWD").option('mode','text');
  								}
	  						},
	  					},
	  				}],
	    		},
	    	},
	    	{itemType:'empty',colSpan:5},
	    	{colSpan:2,dataField:'KAKAO_CLIENT_ID',label: {text:'카카오 클라이언트 ID'},
	    		editorType:'dxTextBox',
	    	},
		   	{colSpan:2,dataField:'KAKKAO_CLIENT_PWD',label: {text:'카카오 클라이언트 비밀번호'},
				editorType:'dxTextBox',
	    		editorOptions:{
	    			  mode: 'password',  
	    			  buttons:[{
	    				name: "KAKKAO_CLIENT_PWD_VIEW",
	          	        location: 'after',
	  					options: {
	  						icon:'fa fa-fw fa-eye',
	  						onClick(e) {
  								var  iconO= e.component.option("icon");
  								if(iconO.indexOf('fa-eye-slash')>=0){
  									e.component.option('icon','fa fa-fw fa-eye');
  									Intcon.formNice.getEditor("KAKKAO_CLIENT_PWD").option('mode','password');
  								}else{
  									e.component.option('icon','fa fa-fw fa-eye-slash');
  									Intcon.formNice.getEditor("KAKKAO_CLIENT_PWD").option('mode','text');
  								}
	  						},
	  					},
	  				}],
	    		},
	    		
	    	},
	    	{colSpan:2,dataField:'KAKAO_API_KEY',label: {text:'카카오 API KEY'},
	    		editorType:'dxTextBox',
	    	},
	    	{colSpan:3,dataField:'KAKAO_JAVASCRIPT_KEY',label: {text:'카카오 자바스크립트 KEY'},
	    		editorType:'dxTextBox',
	    	},
	    	{colSpan:2,dataField:'NAVER_CLIENT_ID',label: {text:'네이버 클라이언트 ID'},
	    		editorType:'dxTextBox',
	    	},
		   	{colSpan:2,dataField:'NAVER_CLIENT_PWD',label: {text:'네이버 클라이언트 비밀번호'},
				editorType:'dxTextBox',
	    		editorOptions:{
	    			  mode: 'password',  
	    			  buttons:[{
	    				name: "'NAVER_CLIENT_PWD_VIEW",	    				  
	          	        location: 'after',
	  					options: {
	  						icon:'fa fa-fw fa-eye',
	  						onClick(e) {
  								var  iconO= e.component.option("icon");
  								if(iconO.indexOf('fa-eye-slash')>=0){
  									e.component.option('icon','fa fa-fw fa-eye');
  									Intcon.formNice.getEditor("NAVER_CLIENT_PWD").option('mode','password');
  								}else{
  									e.component.option('icon','fa fa-fw fa-eye-slash');
  									Intcon.formNice.getEditor("NAVER_CLIENT_PWD").option('mode','text');
  								}
	  						},
	  					},
	  				}],
	    		},
	    		
	    	},
	    	{colSpan:2,dataField:'NAVER_API_KEY',label: {text:'네이버 API KEY'},
	    		editorType:'dxTextBox',
	    	},
	    	{colSpan:3,dataField:'NAVER_JAVASCRIPT_KEY',label: {text:'네이버 자바스크립트 KEY'},
	    		editorType:'dxTextBox',
	    	},
		],
		onInitialized: function(e) {
			Intcon.formNice= e.component;
			//console.log('formNice-init');
			niceformLoad();
		}
	});
}
function niceformLoad(){
	//console.log('niceformLoad');
	var defalutData={
			SEND_HP:'',
			SMS_USE_YN:'0',
			SMS_PROVIDER:'1001',
			LMS_SVC_YN:'0',
			MMS_SVC_YN:'0',
			NPT_SVR_KEY:'',
			SMS_ID:'',
			SMS_PWD:'',
			BIZ_SMS_ID:'',
			BIZ_SMS_PWD:'',
			BIZ_SMS_APK_KEY:'',
			KAKAO_CHANNEL_ID:''};
	Intcon.formNice.option('formData',defalutData);
	/*
	$.getJSON(
	    "/backOffice/menu/order"
	    , {M_UPPER_CD: $("#M_UPPER_CD").val(), M_CD: $("#M_CD").val(), }
	    , function (data) {
	        if (data.result == "success") {
	        	Intcon.formSms.option('formData',data);
	        }else{
	        	Intcon.formSms.option('formData',defalutData);
	        }
	    }
	);
	*/
}
function niceformSave(){
	console.log('niceformSave');
	$.getJSON(
	    "/backOffice/menu/order"
	    , Intcon.formNice.option('formData')
	    , function (data) {
	        if (data.result == "success") {
	        		
	        }
	    }
	);
}