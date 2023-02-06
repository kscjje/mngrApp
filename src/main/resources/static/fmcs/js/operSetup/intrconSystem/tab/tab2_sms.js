//알림(카카오,MSM)연계
var MsgTemplate = function () {
    var that = this,
        currentData = {},
        listData = {},
        editPopup= null,
        editForm={},
        isNew=false;
    var detailInited = $.Deferred(),
        listInited = $.Deferred();
     
    function showList() {
    	var orgData = {id:''};
    	$.ajax({
            url: Intcon.apiPath +"/aaa",
            type: "POST",
            dataType: "json",
            data: orgData,
            success: function (data) {
            	//that.currentData = data;
           	 	//that.editPopup.option("visible",true);
           	 	//that.customerGallery.repaint();
            	that.showListRefresh(data);
            	listInited.resolve();
            },
            error: function (xhr, textStatus, errorThrown) {
                alert('Request Status: ' + xhr.status + '; Status Text: ' + textStatus + '; Error: ' + errorThrown);
                
            }
        });
    }
    function showListRefresh(data) {
    	that.listData = [...data];
    	var cont = $('#msgTemplateList').dxScrollView('instance').content();
    	if(!cont) return;
    	$(".msg-template-list").remove();
    	var itemTemplate = '<div class="msg-template-list">';
    	$.each(data, function(index, item){
    		var MSG_DATA = item;
    		var MSG_TITLE = item.MSG_TITLE;
    		var MSG_TYPE = item.MSG_TYPE=='0'?'카카오':'문자발송';
    		var MSG_TYPE_CALSS = item.MSG_TYPE=='0'?'msg-template-type-kko':'msg-template-type-sms';
    		var MSG_CONT = item.MSG_CONT;
    		/*<a href="#" onClick="editMsgTemplate('${index}')" ><i class="dx-icon-edit"></i></a>z*/
    		itemTemplate+=`
                <div class="msg-template-content" id='msg_${item.MSG_SEQ}'>
                    <div class="msg-template-header">
                        <span class="msg-template-title" onClick='msgTemplate.edit(${index},${item.MSG_SEQ})' >${MSG_TITLE}</span>
                        <span class="${MSG_TYPE_CALSS}">${MSG_TYPE}</span>
                        <a href="#" onClick="msgTemplate.remove(${index},${item.MSG_SEQ})" ><i class="dx-icon-remove"></i></a>
                    </div>
                    <div class="msg-template-body"><textarea class='msg-template-msg-cont' readonly>${MSG_CONT}</textarea></div>
                </div>
            `;
    	});
    	itemTemplate+='</div>';
    	cont.append(itemTemplate);
    	//console.log(showListRefresh);
    }
    function showDetailInfo(msgId) {
    	var orgData = {id:msgId};
    	$.ajax({
            url: Intcon.apiPath +"/aaa",
            type: "POST",
            dataType: "json",
            data: orgData,
            success: function (data) {
            	//that.currentData = data;
           	 	//that.editPopup.option("visible",true);
           	 	//that.customerGallery.repaint();
            	//msgTemplateInited.resolve();
            },
            error: function (xhr, textStatus, errorThrown) {
                alert('Request Status: ' + xhr.status + '; Status Text: ' + textStatus + '; Error: ' + errorThrown);
            }
        });
    }
    var toolbarOptions = {
    	items :[
    		{
	        	location: 'before',
	        	template: $('<div style="color:red;font-weight:700;margin-left:10px;">').append("※발송내용 문구수정/등록 시 : bizppurio 사이트 템플릿에서도 수정/등록 후, 별도 승인처리 되어야 합니다."),
	        },
            {
                location:'after',
                widget:'dxButton',
                hint:'템플릿 등록',
                options :{
                    icon :'plus',
                },
                onClick(e) {
                	that.add();
                }
            },
            {
                location:'after',
                widget:'dxButton',
                options :{
                    icon :'refresh',
                },
                onClick(e) {
             
                }
            }
        ]
	};
    
    var popupOptions = {
    	contentTemplate: $('<div>').append("<div class='msgTemplateInfo'></div>"),
        visible: false,
        width: 630,
        height: "auto",
        onShowing: function(e) {
        	e.component.option('title', isNew ? '템플릿 등록':'템플릿 수정');
            editForm.itemOption('MSG_REG_ID','visible',!isNew);
            editForm.itemOption('MSG_REG_DT','visible',!isNew);
            editForm.itemOption('MSG_MOD_ID','visible',!isNew);
            editForm.itemOption('MSG_MOD_DT','visible',!isNew);
            detailInited.done(setDetailValues);
        },
        onContentReady: function () {
            //console.log('contentready');
        	editForm = $(".msgTemplateInfo").dxForm({
                showColonAfterLabel: false,
                showValidationSummary: false,
                onContentReady: function(e) {
                	e.component.validate();
                },
                height: 480,
                colCount:2,
                items: [{colSpan:2,dataField:'MSG_SEQ',label:{text:'템플릿코드'},editorOptions:{readOnly: true,}},
                		{colSpan:2,dataField:'MSG_TITLE',label:{text:'메시지명'}},
                		{colSpan:2,dataField:'MSG_CALL_HP',label:{text:'콜백번호'}},
                		{colSpan:2,dataField:'MSG_TYPE',label:{text:'발송방법'},
                			editorType:'dxRadioGroup',
                			editorOptions:{
                				items: [{text:'카카오',value:'0'},{text:'문자발송',value:'1'}], 
                				valueExpr: 'value',
                				displayExpr: 'text',
                				layout: 'horizontal',}
                		},
                		{colSpan:2,dataField:'MSG_KKO_TEMP_ID',label:{text:'카카오템플릿ID'}},
                		{colSpan:2,dataField:'MSG_CONT',label:{text:'발송내용'},editorType:'dxTextArea',editorOptions:{height:200}},
                		{dataField:'MSG_REG_ID',label:{text:'등록일'},editorOptions:{readOnly: true,}},
                		{dataField:'MSG_REG_DT',label:{visible:false},editorOptions:{readOnly: true}},
                		{dataField:'MSG_MOD_ID',label:{text:'수정일'},editorOptions:{readOnly: true}},
                		{dataField:'MSG_MOD_DT',label:{visible:false},editorOptions:{readOnly: true}},
               		]   
            }).dxForm("instance");
            detailInited.resolve();
        },
        toolbarItems: [{
			widget: 'dxButton',
			toolbar: 'bottom',
		    location: 'after',
		    options: {
			    	text: '저장',
			        onClick() {
			    		if(editForm.validate().isValid) {
	                        //DevAV.showDBNotice()
	                        that.editPopup.option("visible", false);
	                    }
			    	},
			    },
		}, {
			widget: 'dxButton',
			toolbar: 'bottom',
		    location: 'after',
		    options: {
			    	text: '취소',
			        onClick() {
			    		that.editPopup.option("visible", false);
			    	},
			    },
		}],
    };
    function setDetailValues() {
    	//editForm.getEditor("Customer_Store_ID").option("dataSource", customerStores || []);
    	editForm.updateData(currentData);
    }    
    that.edit = function (itemIdx,msg_seq) {
    	//console.log(itemIdx)
    	//console.log(msg_seq)
    	currentData = that.listData[itemIdx];
    	isNew = false;
    	that.editPopup.option("visible", true);
    	
    	//showDetailInfo(msg_seq);
    }
    that.add = function () {
    	currentData = {MSG_SEQ:0,MSG_CALL_HP:'',MSG_KKO_TEMP_ID:'',MSG_REG_ID:'admin',MSG_REG_DT:'',MSG_MOD_DT:'',MSG_MOD_ID:'' ,MSG_TITLE:'',MSG_TYPE:'0',MSG_CONT:''};
    	isNew = true;
    	that.editPopup.option("visible", true);
    	
    }
    that.remove= function (itemIdx,msg_seq) {
    	//that.listData.remove(itemIdx);
    	$(`#msg_${msg_seq}`).remove();
    }
    that.init = function () {
    	if(that.editPopup == null){
    		$('#msgTemplateToolbar').dxToolbar(toolbarOptions);
    	    $("#msgTemplateList").dxScrollView({
            	scrollByContent: true,
    			showScrollbar: 'always',
    			height:'80vh',
    		});
    		that.editPopup = $("#edit-sms-template-popup").dxPopup(popupOptions).dxPopup("instance");
        	showListRefresh([{MSG_SEQ:1,MSG_CALL_HP:'',MSG_KKO_TEMP_ID:'',MSG_REG_ID:'admin',MSG_REG_DT:'2022-12-02 11:23',MSG_MOD_DT:'2022-12-03 11:25',MSG_MOD_ID:'admin2' ,MSG_TITLE:'무료 교육예약 신청시',MSG_TYPE:'0',MSG_CONT:'[남양주주민자치센터통합관리시스템]\r\n안녕하세요 #{예약자명}님\r\n#{교육명} 교육프로그램\r\n예약이 완료되었습니다.\r\n▶교육명 : #{교육명}\r\n▶교육기간 : #{교육기간}\r\n▶교육일시 : #{교육요일}, #{교육시간}\r\n▶교육장소 : #{교육장소}\r\n▶문의전화 : #{문의전화}\r\n- 참석 못할 시 마이페이지에서\r\n꼭 취소해 주시기 바랍니다.'},
				 {MSG_SEQ:2,MSG_CALL_HP:'',MSG_KKO_TEMP_ID:'',MSG_REG_ID:'admin',MSG_REG_DT:'2022-12-02 11:23',MSG_MOD_DT:'2022-12-03 11:25',MSG_MOD_ID:'admin2',MSG_TITLE:'유료 교육예약 신청시',MSG_TYPE:'1',MSG_CONT:'[남양주주민자치센터통합관리시스템]\r\n안녕하세요 #{예약자명}님\r\n#{교육명} 교육프로그램\r\n예약이 완료되었습니다.\r\n▶교육명 : #{교육명}\r\n▶교육일시 : #{교육요일}, #{교육시간}\r\n▶결제마감시간 : #{결제마감시간}'},
				 {MSG_SEQ:3,MSG_CALL_HP:'',MSG_KKO_TEMP_ID:'',MSG_REG_ID:'admin',MSG_REG_DT:'2022-12-02 11:23',MSG_MOD_DT:'2022-12-03 11:25',MSG_MOD_ID:'admin2',MSG_TITLE:'유료 교육예약 신청시',MSG_TYPE:'0',MSG_CONT:'[남양주주민자치센터통합관리시스템]\r\n안녕하세요 #{예약자명}님\r\n#{교육명} 교육프로그램\r\n예약이 완료되었습니다.\r\n▶교육명 : #{교육명}\r\n▶교육일시 : #{교육요일}, #{교육시간}\r\n▶결제마감시간 : #{결제마감시간}'},
				 {MSG_SEQ:4,MSG_CALL_HP:'',MSG_KKO_TEMP_ID:'',MSG_REG_ID:'admin',MSG_REG_DT:'2022-12-02 11:23',MSG_MOD_DT:'2022-12-03 11:25',MSG_MOD_ID:'admin2',MSG_TITLE:'유료 교육예약 신청시',MSG_TYPE:'0',MSG_CONT:'[남양주주민자치센터통합관리시스템]\r\n안녕하세요 #{예약자명}님\r\n#{교육명} 교육프로그램\r\n예약이 완료되었습니다.\r\n▶교육명 : #{교육명}\r\n▶교육일시 : #{교육요일}, #{교육시간}\r\n▶결제마감시간 : #{결제마감시간}'},
				 {MSG_SEQ:5,MSG_CALL_HP:'',MSG_KKO_TEMP_ID:'',MSG_REG_ID:'admin',MSG_REG_DT:'2022-12-02 11:23',MSG_MOD_DT:'2022-12-03 11:25',MSG_MOD_ID:'admin2',MSG_TITLE:'유료 교육예약 신청시',MSG_TYPE:'0',MSG_CONT:'[남양주주민자치센터통합관리시스템]\r\n안녕하세요 #{예약자명}님\r\n#{교육명} 교육프로그램\r\n예약이 완료되었습니다.\r\n▶교육명 : #{교육명}\r\n▶교육일시 : #{교육요일}, #{교육시간}\r\n▶결제마감시간 : #{결제마감시간}'},
				 {MSG_SEQ:6,MSG_CALL_HP:'',MSG_KKO_TEMP_ID:'',MSG_REG_ID:'admin',MSG_REG_DT:'2022-12-02 11:23',MSG_MOD_DT:'2022-12-03 11:25',MSG_MOD_ID:'admin2',MSG_TITLE:'유료 교육예약 신청시',MSG_TYPE:'0',MSG_CONT:'[남양주주민자치센터통합관리시스템]\r\n안녕하세요 #{예약자명}님\r\n#{교육명} 교육프로그램\r\n예약이 완료되었습니다.\r\n▶교육명 : #{교육명}\r\n▶교육일시 : #{교육요일}, #{교육시간}\r\n▶결제마감시간 : #{결제마감시간}'},
				 {MSG_SEQ:7,MSG_CALL_HP:'',MSG_KKO_TEMP_ID:'',MSG_REG_ID:'admin',MSG_REG_DT:'2022-12-02 11:23',MSG_MOD_DT:'2022-12-03 11:25',MSG_MOD_ID:'admin2',MSG_TITLE:'유료 교육예약 신청시',MSG_TYPE:'0',MSG_CONT:'[남양주주민자치센터통합관리시스템]\r\n안녕하세요 #{예약자명}님\r\n#{교육명} 교육프로그램\r\n예약이 완료되었습니다.\r\n▶교육명 : #{교육명}\r\n▶교육일시 : #{교육요일}, #{교육시간}\r\n▶결제마감시간 : #{결제마감시간}'},
				 {MSG_SEQ:8,MSG_CALL_HP:'',MSG_KKO_TEMP_ID:'',MSG_REG_ID:'admin',MSG_REG_DT:'2022-12-02 11:23',MSG_MOD_DT:'2022-12-03 11:25',MSG_MOD_ID:'admin2',MSG_TITLE:'유료 교육예약 신청시',MSG_TYPE:'0',MSG_CONT:'[남양주주민자치센터통합관리시스템]\r\n안녕하세요 #{예약자명}님\r\n#{교육명} 교육프로그램\r\n예약이 완료되었습니다.\r\n▶교육명 : #{교육명}\r\n▶교육일시 : #{교육요일}, #{교육시간}\r\n▶결제마감시간 : #{결제마감시간}'},
				 {MSG_SEQ:9,MSG_CALL_HP:'',MSG_KKO_TEMP_ID:'',MSG_REG_ID:'admin',MSG_REG_DT:'2022-12-02 11:23',MSG_MOD_DT:'2022-12-03 11:25',MSG_MOD_ID:'admin2',MSG_TITLE:'유료 교육예약 신청시',MSG_TYPE:'0',MSG_CONT:'[남양주주민자치센터통합관리시스템]\r\n안녕하세요 #{예약자명}님\r\n#{교육명} 교육프로그램\r\n예약이 완료되었습니다.\r\n▶교육명 : #{교육명}\r\n▶교육일시 : #{교육요일}, #{교육시간}\r\n▶결제마감시간 : #{결제마감시간}'},
				 {MSG_SEQ:10,MSG_CALL_HP:'',MSG_KKO_TEMP_ID:'',MSG_REG_ID:'admin',MSG_REG_DT:'2022-12-02 11:23',MSG_MOD_DT:'2022-12-03 11:25',MSG_MOD_ID:'admin2',MSG_TITLE:'유료 교육예약 신청시',MSG_TYPE:'0',MSG_CONT:'[남양주주민자치센터통합관리시스템]\r\n안녕하세요 #{예약자명}님\r\n#{교육명} 교육프로그램\r\n예약이 완료되었습니다.\r\n▶교육명 : #{교육명}\r\n▶교육일시 : #{교육요일}, #{교육시간}\r\n▶결제마감시간 : #{결제마감시간}'},
				 {MSG_SEQ:11,MSG_CALL_HP:'',MSG_KKO_TEMP_ID:'',MSG_REG_ID:'admin',MSG_REG_DT:'2022-12-02 11:23',MSG_MOD_DT:'2022-12-03 11:25',MSG_MOD_ID:'admin2',MSG_TITLE:'유료 교육예약 신청시',MSG_TYPE:'0',MSG_CONT:'[남양주주민자치센터통합관리시스템]\r\n안녕하세요 #{예약자명}님\r\n#{교육명} 교육프로그램\r\n예약이 완료되었습니다.\r\n▶교육명 : #{교육명}\r\n▶교육일시 : #{교육요일}, #{교육시간}\r\n▶결제마감시간 : #{결제마감시간}'},
				 {MSG_SEQ:12,MSG_CALL_HP:'',MSG_KKO_TEMP_ID:'',MSG_REG_ID:'admin',MSG_REG_DT:'2022-12-02 11:23',MSG_MOD_DT:'2022-12-03 11:25',MSG_MOD_ID:'admin2',MSG_TITLE:'유료 교육예약 신청시',MSG_TYPE:'0',MSG_CONT:'[남양주주민자치센터통합관리시스템]\r\n안녕하세요 #{예약자명}님\r\n#{교육명} 교육프로그램\r\n예약이 완료되었습니다.\r\n▶교육명 : #{교육명}\r\n▶교육일시 : #{교육요일}, #{교육시간}\r\n▶결제마감시간 : #{결제마감시간}'},
				 {MSG_SEQ:13,MSG_CALL_HP:'',MSG_KKO_TEMP_ID:'',MSG_REG_ID:'admin',MSG_REG_DT:'2022-12-02 11:23',MSG_MOD_DT:'2022-12-03 11:25',MSG_MOD_ID:'admin2',MSG_TITLE:'유료 교육예약 신청시',MSG_TYPE:'0',MSG_CONT:'[남양주주민자치센터통합관리시스템]\r\n안녕하세요 #{예약자명}님\r\n#{교육명} 교육프로그램\r\n예약이 완료되었습니다.\r\n▶교육명 : #{교육명}\r\n▶교육일시 : #{교육요일}, #{교육시간}\r\n▶결제마감시간 : #{결제마감시간}'},
				 {MSG_SEQ:14,MSG_CALL_HP:'',MSG_KKO_TEMP_ID:'',MSG_REG_ID:'admin',MSG_REG_DT:'2022-12-02 11:23',MSG_MOD_DT:'2022-12-03 11:25',MSG_MOD_ID:'admin2',MSG_TITLE:'유료 교육예약 신청시',MSG_TYPE:'0',MSG_CONT:'[남양주주민자치센터통합관리시스템]\r\n안녕하세요 #{예약자명}님\r\n#{교육명} 교육프로그램\r\n예약이 완료되었습니다.\r\n▶교육명 : #{교육명}\r\n▶교육일시 : #{교육요일}, #{교육시간}\r\n▶결제마감시간 : #{결제마감시간}'},
				 {MSG_SEQ:15,MSG_CALL_HP:'',MSG_KKO_TEMP_ID:'',MSG_REG_ID:'admin',MSG_REG_DT:'2022-12-02 11:23',MSG_MOD_DT:'2022-12-03 11:25',MSG_MOD_ID:'admin2',MSG_TITLE:'유료 교육예약 신청시',MSG_TYPE:'0',MSG_CONT:'[남양주주민자치센터통합관리시스템]\r\n안녕하세요 #{예약자명}님\r\n#{교육명} 교육프로그램\r\n예약이 완료되었습니다.\r\n▶교육명 : #{교육명}\r\n▶교육일시 : #{교육요일}, #{교육시간}\r\n▶결제마감시간 : #{결제마감시간}'},
				 {MSG_SEQ:16,MSG_CALL_HP:'',MSG_KKO_TEMP_ID:'',MSG_REG_ID:'admin',MSG_REG_DT:'2022-12-02 11:23',MSG_MOD_DT:'2022-12-03 11:25',MSG_MOD_ID:'admin2',MSG_TITLE:'유료 교육예약 신청시',MSG_TYPE:'0',MSG_CONT:'[남양주주민자치센터통합관리시스템]\r\n안녕하세요 #{예약자명}님\r\n#{교육명} 교육프로그램\r\n예약이 완료되었습니다.\r\n▶교육명 : #{교육명}\r\n▶교육일시 : #{교육요일}, #{교육시간}\r\n▶결제마감시간 : #{결제마감시간}'},
				 {MSG_SEQ:17,MSG_CALL_HP:'',MSG_KKO_TEMP_ID:'',MSG_REG_ID:'admin',MSG_REG_DT:'2022-12-02 11:23',MSG_MOD_DT:'2022-12-03 11:25',MSG_MOD_ID:'admin2',MSG_TITLE:'유료 교육예약 신청시',MSG_TYPE:'0',MSG_CONT:'[남양주주민자치센터통합관리시스템]\r\n안녕하세요 #{예약자명}님\r\n#{교육명} 교육프로그램\r\n예약이 완료되었습니다.\r\n▶교육명 : #{교육명}\r\n▶교육일시 : #{교육요일}, #{교육시간}\r\n▶결제마감시간 : #{결제마감시간}'},
			]);

    	}else{
    		
    	}
    	//showList();

     
    };
};
function CreateTab2Init()
{
	if(!Intcon.msgTemplate){
		msgTemplate =  new MsgTemplate();
	}
	
	if(Intcon.formSms){
		smsformLoad();
	}else{
		CreateTab2form();
	}
}
function CreateTab2form()	
{
	$('#formSms').dxForm({
		showColonAfterLabel: false,
		colCount:9,
	    items: [
	    	{colSpan:2,dataField:'SEND_HP',label: {text:'발신자 휴대폰 번호'},
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
			        	smsformSave();
			        }
			    },
			},
			{colSpan:2,dataField:'SMS_USE_YN',label: {text:'SMS연동'},
	    		editorType: 'dxSelectBox',
				editorOptions: {  
					dataSource:use_gbn,
		        	valueExpr: 'value', 
		        	displayExpr: 'text',
		        },
	    	},
			{colSpan:2,dataField: 'SMS_PROVIDER',label: { text: 'SMS연동업체',},
				editorType: 'dxSelectBox',
				editorOptions: {  
					dataSource:SM_SMS_PROVIDER,
		        	valueExpr: 'value', 
		        	displayExpr: 'text',
		        },
  			},
  			{colSpan:2,dataField:'LMS_SVC_YN',label: {text:'LMS서비스'},
	    		editorType: 'dxSelectBox',
				editorOptions: {  
					dataSource:use_gbn,
		        	valueExpr: 'value', 
		        	displayExpr: 'text',
		        },
	    	},
	    	{colSpan:2,dataField:'MMS_SVC_YN',label: {text:'MMS서비스'},
	    		editorType: 'dxSelectBox',
				editorOptions: {  
					dataSource:use_gbn,
		        	valueExpr: 'value', 
		        	displayExpr: 'text',
		        },
	    	},
	    	{itemType:'empty'},
	    	{colSpan:2,dataField:'SMS_ID',label: {text:'SMS ID'},
	    		editorType:'dxTextBox',
	    	},
		   	{colSpan:2,dataField:'SMS_PWD',label: {text:'SMS 비밀번호'},
				editorType:'dxTextBox',
	    		editorOptions:{
	    			  mode: 'password',  
	    			  buttons:[{
	  	    			name: "SMS_PWD_VIEW",
	          	        location: 'after',
	  					options: {
	  						icon:'fa fa-fw fa-eye',
	  						onClick(e) {
  								var  iconO= e.component.option("icon");
  								if(iconO.indexOf('fa-eye-slash')>=0){
  									e.component.option('icon','fa fa-fw fa-eye');
  									Intcon.formSms.getEditor("SMS_PWD").option('mode','password');
  								}else{
  									e.component.option('icon','fa fa-fw fa-eye-slash');
  									Intcon.formSms.getEditor("SMS_PWD").option('mode','text');
  								}
	  						},
	  					},
	  				}],
	    		},
	    		
	    	},
	    	{colSpan:2,dataField:'NPT_SVR_KEY',label: {text:'SMS연계 KEY'},
	    		editorType:'dxTextBox',
	    	},
	    	{itemType:'empty',colSpan:3},
	    	{colSpan:2,dataField:'BIZ_SMS_ID',label: {text:'비즈뿌리오 ID'},
	    		editorType:'dxTextBox',
	    	},
		   	{colSpan:2,dataField:'BIZ_SMS_PWD',label: {text:'비즈뿌리오 비밀번호'},
				editorType:'dxTextBox',
	    		editorOptions:{
	    			  mode: 'password',  
	    			  buttons:[{
	  	    			name: "BIZ_SMS_PWD_VIEW",
	          	        location: 'after',
	  					options: {
	  						icon:'fa fa-fw fa-eye',
	  						onClick(e) {
  								var  iconO= e.component.option("icon");
  								if(iconO.indexOf('fa-eye-slash')>=0){
  									e.component.option('icon','fa fa-fw fa-eye');
  									Intcon.formSms.getEditor("BIZ_SMS_PWD").option('mode','password');
  								}else{
  									e.component.option('icon','fa fa-fw fa-eye-slash');
  									Intcon.formSms.getEditor("BIZ_SMS_PWD").option('mode','text');
  								}
	  						},
	  					},
	  				}],
	    		},
	    		
	    	},
	    	{colSpan:2,dataField:'BIZ_SMS_APK_KEY',label: {text:'비즈뿌리오 API KEY'},
	    		editorType:'dxTextBox',
	    	},
	    	{itemType:'empty',colSpan:3},
	    	{colSpan:2,dataField:'KAKAO_CHANNEL_ID',label: {text:'카카오 채널 ID'},
	    		editorType:'dxTextBox',
	    	},
	    	
		],
		onInitialized: function(e) {
			Intcon.formSms= e.component;
			//console.log('formSms-init');
			smsformLoad();
		}
	});
}
function smsformLoad(){
	//console.log('smsformLoad');
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
	Intcon.formSms.option('formData',defalutData);
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
function smsformSave(){
	//console.log('smsformSave');
	$.getJSON(
	    "/backOffice/menu/order"
	    , Intcon.formSms.option('formData')
	    , function (data) {
	        if (data.result == "success") {
	        		
	        }
	    }
	);
}
function smsChangeTab(btnE,chgidx)
{
	$(".custom-tab .div-btn button").removeClass("selected-tab");
	$(btnE).addClass("selected-tab");
	
	if (chgidx == 0) {
		$("#msgTemplateView").hide();
		$("#formSms").show();
	} else {
		$("#formSms").hide();
		$("#msgTemplateView").show();
		msgTemplate.init();
	}	
}



