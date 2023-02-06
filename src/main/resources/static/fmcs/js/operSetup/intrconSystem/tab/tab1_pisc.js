//비대면자격서비스연계
function CreateTab1Init()
{
	if(Intcon.formPisc){
		piscformLoad();
	}else{
		CreateTab1form();
	}
}
function CreateTab1form()	
{
	$('#formPisc').dxForm({
		showColonAfterLabel: false,
		colCount:9,
	    items: [
	    	{colSpan:3,dataField:'PISC_CERT_ID',label: {text:'비대면 자격확인 서비스 인증서 아이디'},
	    		editorType:'dxTextBox',
	    	},
	    	{
	    		itemType: 'button',colSpan:6,
			    horizontalAlignment: 'right',
			    buttonOptions: {
			    	text: '저장하기',
			        type: 'success',
			        useSubmitBehavior: true,
			        onClick(e){
			        	piscformSave();
			        }
			    },
			},
		   	{colSpan:3,dataField:'PISC_CERT_PWD',label: {text:'비대면 자격확인 서비스 인증서 비밀번호'},
				editorType:'dxTextBox',
	    		editorOptions:{
	    			  mode: 'password',  
	    			  buttons:[{
	  	    			name: "PWD_VIEW",
	          	        location: 'after',
	  					options: {
	  						icon:'fa fa-fw fa-eye',
	  						//text:'test',
	  						//type: 'default',
	  						elementAttr: {id: "pwdView"},
	  						onClick(e) {
  								var  iconO= e.component.option("icon");
  								if(iconO.indexOf('fa-eye-slash')>=0){
  									e.component.option('icon','fa fa-fw fa-eye');
  									Intcon.formPisc.getEditor("PISC_CERT_PWD").option('mode','password');
  								}else{
  									e.component.option('icon','fa fa-fw fa-eye-slash');
  									Intcon.formPisc.getEditor("PISC_CERT_PWD").option('mode','text');
  								}
	  						},
	  					},
	  				}],
	    		},
	    		
	    	},
	    	{itemType:'empty',colSpan:6},
	    	{colSpan:6,dataField:'PISC_CERT_PATH',label: {text:'비대면 자격확인 서비스 인증서 파일경로및 파일명'},
	    		editorType:'dxTextBox',
	    		editorOptions:{
	    			
	    		}
	    	},
		],
		onInitialized: function(e) {
			Intcon.formPisc= e.component;
			//console.log('formPisc-init');
			piscformLoad();
		}
	});
}
function piscformLoad(){
	//console.log('piscformLoad');
	$.getJSON(
	    "/backOffice/menu/order"
	    , {M_UPPER_CD: $("#M_UPPER_CD").val(), M_CD: $("#M_CD").val(), }
	    , function (data) {
	        if (data.result == "success") {
	        	Intcon.formPisc.option('formData',data);
	        }
	    }
	);
}
function piscformSave(){
	//console.log('piscformSave');
	$.getJSON(
	    "/backOffice/menu/order"
	    , Intcon.formPisc.option('formData')
	    , function (data) {
	        if (data.result == "success") {
	        		
	        }
	    }
	);
}