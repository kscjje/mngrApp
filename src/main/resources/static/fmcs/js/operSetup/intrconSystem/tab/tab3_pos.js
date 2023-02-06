//결제서비스운영설정

function CreateTab3Init()
{
	if(Intcon.formPos){
		posformLoad();
	}else{
		CreatePosDetailform();
		CreatePosGrid();
	}
}
function CreatePosDetailform()	
{
	$('#formPos').dxForm({
		showColonAfterLabel: false,
		colCount:3,
	    items: [
	    	{dataField:'POS_CODE',label: {text:'POS결제연동 그룹 코드'},
	    		editorOptions:{
	    			disabled:true
	    		}
	    	},
	    	{
	    		itemType: 'button',colSpan:2,
			    horizontalAlignment: 'right',
			    buttonOptions: {
			    	text: '저장하기',
			        type: 'success',
			        useSubmitBehavior: true,
			        onClick(e){
			        	posformSave();
			        }
			    },
			},
	    	{dataField:'POS_NAME',label: {text:'POS결제연동 그룹명'},
	    		editorType:'dxTextBox',
	    		editorOptions:{
	    			
	    		}
	    	},
	    	{colSpan:2,itemType:'empty'},
	    	{dataField:'PCOMPANY',label: {text:'POS결제연동업체'},
	    		editorType:'dxSelectBox',
	    		editorOptions:{
	    			dataSource:[{text:'없음',value:'0'},{text:'토스페이먼츠',value:'1'},], //SM_PAYMENT_CORP
	    			valueExpr:'value',
	    			displayExpr: 'text',
	    		}
	    	},
	    	{colSpan:2,itemType:'empty'},
			{dataField:'PCOMPANY',label: {text:'온라인PG결제시스템연동업체'},
	    		editorType:'dxSelectBox',
	    		editorOptions:{
	    			items:[{text:'없음',value:'0'},{text:'토스페이먼츠',value:'1'},], //SM_PAYMENT_CORP
	    			valueExpr:'value',
	    			displayExpr: 'text',
	    		}
	    	},
	    	{colSpan:2,itemType:'empty'},//
	    	{dataField:'TOSS_ID',label: {text:'일반상점 토스 상점 ID'},},
	    	{dataField:'TOSS_CLIENT_KEY',label: {text:'일반상점 Client Key'},},//브라우저 SDK(Javascript)에서 사용
	    	{dataField:'TOSS_SECRET_KEY',label: {text:'일반상점 Secret Key'},},//서버 API에서 사용
	    	{dataField:'BRAND_PAY_YN',label: {text:'브랜드페이사용여부'},
	    		editorType:'dxSelectBox',
	    		editorOptions:{
	    			items:[{text:'사용안함',value:'N'},{text:'사용',value:'Y'},], //브랜드페이사용여부(브랜드 페이 : Y(둘다사용?), 일반 결제 상점:N)
	    			valueExpr:'value',
	    			displayExpr: 'text',
	    		}
	    	},
	    	{dataField:'TOSS_BRANDPAY_ID',label: {text:'브랜드페이 토스 상점 ID'},},
	    	{dataField:'TOSS_BRANDPAY_CLIENT_KEY',label: {text:'브랜드페이 Client Key'},},//브라우저 SDK(Javascript)에서 사용
	    	{dataField:'TOSS_BRANDPAY_SECRET_KEY',label: {text:'브랜드페이 Secret Key'},},//서버 API에서 사용
		],
		onInitialized: function(e) {
			Intcon.formPos= e.component;
			//console.log('formSms-init');
			//posformLoad();
		}
	});
}
function posformLoad(){
	//console.log('posformLoad');
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
	Intcon.formPos.option('formData',defalutData);
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
function posformSave(){
	//console.log('posformSave');
	$.getJSON(
	    "/backOffice/menu/order"
	    , Intcon.formPos.option('formData')
	    , function (data) {
	        if (data.result == "success") {
	        		
	        }
	    }
	);
}
function CreatePosGrid(){
	$("#posGrid").dxDataGrid({
		//dataSource: ,
		height:'80vh',
		keyExpr: 'COLUMN_ID',
		showBorders: true,
		allowColumnReordering: true,
	    allowColumnResizing: true,
		searchPanel: {
			visible: true,
	        placeholder: 'Search...',
	    },
	    paging: {
	    	enabled: false,
		},
		editing: {
		      mode: 'row',
		      allowAdding: false,
		      allowUpdating: false,
		      allowDeleting: true,
		      useIcons: true,
		},
		selection: {mode: 'single'},
		columns:[
			{dataField: 'COLUMN_ID',width:200,caption: 'POS결제연동 그룹 코드'},
			{dataField: 'COLUMN_DESC',caption: 'POS결제연동 그룹명',editorType: 'dxTextArea',editorOptions: {height: 100,},}
		],
		onInitialized(e){
			Intcon.posGrid=e.component;
		},
		onFocusedRowChanged(e) {
			const focusedRowKey = e.component.option('focusedRowKey');
		    selectedRowIndex = e.rowIndex;
	    	 //editorSetRow(e.row.data);
		},
		 toolbar:{
				items:[
					{
						location: 'after',
		 		        widget: 'dxButton',
		 		      	options: {
		 		      		icon:'plus',
		 		      		onClick() {
		 		      			
		 		      			
		 		      		},
		 		      	},
					},	'searchPanel',	        		
			        {
			        	location: 'after',
			          	widget: 'dxButton',
			          	options: {
			          		icon: 'refresh',
			          		hint:'새로고침',
			          		onClick() {
			          			//gridEduPrg.refresh();
			          		},
			          	},
			        },
			        ]
		 }
	});
}