let tab1Form=null;
var useMonth_gbn2=[];
for(var m=0;m < 25;m++){
	useMonth_gbn2.push(m+'');
}
//모집 설정
function CreateTab1Init()
{
	createTab1Form();
}
var formData1={
		EDC_REQ_KIJUN_:false,//_접수기간운영기준
		EDC_REQ_KIJUN:'0',//접수기간운영기준
		EDC_REQ_PATH_:false,//_접수경로
		EDC_REQ_PATH:'001',//접수경로
		EDC_PNCPA_:false,//_총정원
		EDC_PNCPA:0,//총정원
		EDC_PNCPA_YN_:false,//_온라인/방문정원
		EDC_PNCPA_YN:'0',//온라인/방문정원
		EDC_ONCPA:0,//온라인
		EDC_VNCPA:0,//방문
		EDC_DATE_TYPE_:false,//_강좌기간
		EDC_DATE_TYPE:'0',//강좌기간
		EDC_SDATE:'',//시작
		EDC_EDATE:'',//종료
		EDC_REQ_WAIT_TYPE_:false,//_신청취소시대기자선정방법
		EDC_REQ_WAIT_TYPE:'0',//신청취소시대기자선정방법
		EDC_ADDREQ_YN_:false,//_추가접수운영
		EDC_ADDREQ_YN:'0',//추가접수운영
		EDC_ADDREQ_START:'0',//추가접수강좌시작일설정
		EDC_ADDREQ_PAY:'0',//추가접수강좌료산출
		EDC_REQ_TYPE_:false,//_접수방식
		EDC_REQ_TYPE:'0',//접수방식
		EDC_REQ_TEXT_:false,//_접수방식안내문구
		EDC_REQ_TEXT:'',//접수방식안내문구
		EDC_REQ_COUNT_TEXT_:false,//_신규모집
		EDC_REQ_COUNT_TEXT:'',//모집차수명
		EDC_REQ_DATE_TYPE_:false,//_접수기간설정방법
		EDC_REQ_DATE_TYPE:'0',//접수기간설정방법
		EDC_REQ_DATE_:false,//접수기간설정방법
		EDC_REQ_SDATE:'',//시작
		EDC_REQ_EDATE:'',//종료
		EDC_REQ_FIX_SDATE:'',//고정시작
		EDC_REQ_FIX_EDATE:'',//고정종료
		EDC_REQ_IN_YN_:false,//_관내회원우선접수기간
		EDC_REQ_IN_YN:'0',//관내회원우선접수기간
		EDC_REQ_IN_DATE:'',//접수시작일 
		EDC_REQ_IN_FIX_DATE:'',//접수시작일  고정
		EDC_REQ_IN_TIME_:false,//_접수시간
		EDC_REQ_IN_STIME:'00:00',//시작
		EDC_REQ_IN_ETIME:'00:00',//종료
		EDC_REQ_TIME_TYPE_:false,//_접수시간운영방법
		EDC_REQ_TIME_TYPE:'0',//접수시간운영방법
		EDC_REQ_ASS_TYPE_:false,//_선착순접수자승인방법
		EDC_REQ_ASS_TYPE:'0',//선착순접수자승인방법
		EDC_REQ_WAIT_CAPA_YN_:false,//_대기신청정원설정
		EDC_REQ_WAIT_CAPA_YN:'0',//대기신청정원설정
		EDC_REQ_WAIT_CAPA:0,//대기신청정원
		EDC_CHUCHUM_TYPE_:false,//_추첨스케줄설정
		EDC_CHUCHUM_TYPE:'M',//추첨스케줄설정
		EDC_CHUCHUM_OPEN_DT:'',//추첨발표일(수동)
		EDC_CHUCHUM_DAY_TYPE:'D',//접수종료일기준/일자설정(자동)
		EDC_CHUCHUM_DDAY:'',//접수종료일
		EDC_CHUCHUM_DATE:'',//일자설정
		EDC_CHUCHUM_FIX_DDAY:0,
		EDC_CHUCHUM_TIME:'00:00',//추첨시간
		EDC_REQ_PAYLIMIT_TYPE_:false,//_결제마감설정기준
		EDC_REQ_PAYLIMIT_TYPE:'0',//결제마감설정기준
		EDC_REQ_PAYLIMIT_HOUR:0,//시간
		EDC_REQ_PAYLIMIT_DATETIME:'',//마감일시직접설정일자
		EDC_REQ_TERM_AUTO1_:false,//_기간수료1차
		EDC_REQ_TERM_AUTO_DAY:25,//대기자자동배정일자
		EDC_REQ_TERM_AUTO_TIME:'00:00',//대기자자동배정시간
		EDC_REQ_TERMPAU_LIMT_DAY:26,//결제마감일자
		EDC_REQ_TERMPAU_LIMT_TIME:'00:',//결제마감시간
		EDC_REQ_TERM_AUTO2_:false,//_기간수료2차
		EDC_REQ_TERM_AUTO2_DAY:27,//대기자자동배정일자
		EDC_REQ_TERM_AUTO2_TIME:'00:00',//대기자자동배정시간
		EDC_REQ_TERMPAU2_LIMT_DAY:28,//결제마감일자
		EDC_REQ_TERMPAU2_LIMT_TIME:'00:',//결제마감시간
		EDC_EXIST_TYPE_:false,//기존회원접수기준
		EDC_EXIST_TYPE:'0',//기존회원접수기준
		EDC_EXIST_DATE_TYPE_:false,//접수기간설정방법
		EDC_EXIST_DATE_TYPE:'0',//
		EDC_EXIST_DATE_:false,//접수기간설정
		EDC_EXIST_SDATE:'',//시작
		EDC_EXIST_EDATE:'',//종료
		EDC_EXIST_FIX_SDATE:'',
		EDC_EXIST_FIX_EDATE:'',
		EDC_EXIST_TIME_:false,//접수시간
		EDC_EXIST_STIME:'00:00',
		EDC_EXIST_ETIME:'00:00',
		EDC_EXIST_TIME_TYPE_:false,//접수시간운영방법
		EDC_EXIST_TIME_TYPE:'0',
		EDC_EXIST_MONTH_YN_:false,//기존회원 접수제한 설정
		EDC_EXIST_MONTH_YN:'0',
		EDC_EXIST_MONTH:'0',
		EDC_EXIST_PAYLIMIT_TYPE_:false,//결제마감설정기준
		EDC_EXIST_PAYLIMIT_TYPE:'0',//
		EDC_EXIST_PAYLIMIT_HOUR:0,
		EDC_EXIST_PAYLIMIT_DATETIME:'',
};

function createTab1Form(){
	if(!formData1.EDC_REQ_SDATE){
		var today= moment().format('YYYY-MM-DD');
		formData1.EDC_REQ_SDATE= today.slice(0,10);
		formData1.EDC_REQ_EDATE= today.slice(0,10);
		formData1.EDC_REQ_FIX_SDATE=today.slice(8,10)*1;
		formData1.EDC_REQ_FIX_EDATE=today.slice(8,10)*1;
		formData1.EDC_REQ_IN_STIME='09:00';
		formData1.EDC_REQ_IN_ETIME='23:59';
	}
	if(formData1.EDC_REQ_IN_STIME.length < 6){
		formData1.EDC_REQ_IN_STIME='2022-01-01T'+formData1.EDC_REQ_IN_STIME;
		formData1.EDC_REQ_IN_ETIME='2022-01-01T'+formData1.EDC_REQ_IN_ETIME;
	}
	if(tab1Form != null) return;
	$('#tab1_contents').dxForm({
			showColonAfterLabel: false,
			formData: formData1,
			colCount:4,
			items: createTab1Items(),
		/*	customizeItem:function(item){
				if(item.dataField=='EDC_REQ_KIJUN_'){
					if(tab1Form==null) return;
					var orgData = tab1Form.option('formData');
				}
				console.log(item);
			},*/
			onInitialized: function(e) {
				tab1Form = e.component;
				//console.log('onInitialized');
				var customHandlerInit = function (e) {
					//console.log('contentReady');
					
				}
				e.component.on("contentReady", customHandlerInit);
			},
			onFieldDataChanged: function (e) {
				var orgData = e.component.option("formData");
				e.component.beginUpdate();
				if(e.dataField=='EDC_CHUCHUM_TYPE'){
					var edcChuchumType = e.value;
					var bAuto=false;
					if(edcChuchumType =='A'){ //자동
						bAuto=true;
					}
					//e.component.itemOption("EDC_CHUCHUM_TYPE",'visible',true);//추첨자동/수동설정
					e.component.itemOption("newReq.EDC_CHUCHUM_OPEN_DT",'visible',!bAuto);//추첨발표일
					e.component.itemOption("newReq.empty_chuhum",'visible',!bAuto);//수동/빈항목
					e.component.itemOption("newReq.EDC_CHUCHUM_DAY_TYPE",'visible',bAuto);//접수종료일기준(D-DAY)/일자설정(S)
					e.component.itemOption("newReq.EDC_CHUCHUM_DDAY",'visible',bAuto && orgData.EDC_CHUCHUM_DAY_TYPE=='D'? true:false);//DDAY	
					e.component.itemOption("newReq.EDC_CHUCHUM_DATE",'visible',bAuto && orgData.EDC_CHUCHUM_DAY_TYPE=='S' && orgData.EDC_REQ_DATE_TYPE=='0'? true:false);//DDAY//일자설정(직접설정) 추첨 지정일
					e.component.itemOption("newReq.EDC_CHUCHUM_FIX_DDAY",'visible',bAuto&& orgData.EDC_CHUCHUM_DAY_TYPE=='S' && orgData.EDC_REQ_DATE_TYPE=='1');//일자설정(매월고정) 추첨 지정일	
					e.component.itemOption("newReq.EDC_CHUCHUM_TIME",'visible',bAuto);//일자설정(매월고정) 추첨 지정일
					e.component.itemOption("newReq.optCuchum",'visible',bAuto);//일자설정(매월고정) 추첨 지정일
	    		}
				if(e.dataField=='EDC_CHUCHUM_DAY_TYPE'){
					e.component.itemOption("newReq.EDC_CHUCHUM_DDAY",'visible',orgData.EDC_CHUCHUM_TYPE=='A' && e.value=='D'? true:false);//DDAY	
					e.component.itemOption("newReq.EDC_CHUCHUM_DATE",'visible',orgData.EDC_CHUCHUM_TYPE=='A' && e.value=='S' && orgData.EDC_REQ_DATE_TYPE=='0'? true:false);//DDAY//일자설정(직접설정) 추첨 지정일
					e.component.itemOption("newReq.EDC_CHUCHUM_FIX_DDAY",'visible',orgData.EDC_CHUCHUM_TYPE=='A'&& e.value=='S' && orgData.EDC_REQ_DATE_TYPE=='1');//일자설정(매월고정) 추첨 지정일	
				
				}
				if(e.dataField=='EDC_REQ_PAYLIMIT_TYPE'){ //결제마감설정기준
					if(e.value=='0' || e.value=='1' ){
						e.component.itemOption("newReq.EDC_REQ_PAYLIMIT",'visible',true);
						 //e.component.itemOption("newReq.EDC_REQ_PAYLIMIT_HOUR",'visible',true);
						 //e.component.itemOption("newReq.EDC_REQ_PAYLIMIT_MINUTE",'visible',true);
						 e.component.itemOption("newReq.EDC_REQ_PAYLIMIT_DATETIME",'visible',false);
						 
					}else {
						e.component.itemOption("newReq.EDC_REQ_PAYLIMIT",'visible',false);
						 //e.component.itemOption("newReq.EDC_REQ_PAYLIMIT_HOUR",'visible',false);
						 //e.component.itemOption("newReq.EDC_REQ_PAYLIMIT_MINUTE",'visible',false);
						 e.component.itemOption("newReq.EDC_REQ_PAYLIMIT_DATETIME",'visible',true);
					}
				}
				if(e.dataField=='EDC_EXIST_PAYLIMIT_TYPE'){ //결제마감설정기준
					if(e.value=='0' || e.value=='1' ){
						 e.component.itemOption("newReq.EDC_EXIST_PAYLIMIT",'visible',true);
						 //e.component.itemOption("existReq.EDC_EXIST_PAYLIMIT_HOUR",'visible',true);
						 //e.component.itemOption("existReq.EDC_EXIST_PAYLIMIT_MINUTE",'visible',true);
						 e.component.itemOption("existReq.EDC_EXIST_PAYLIMIT_DATETIME",'visible',false);
						 
					}else {
						e.component.itemOption("newReq.EDC_EXIST_PAYLIMIT",'visible',false);
						 //e.component.itemOption("existReq.EDC_EXIST_PAYLIMIT_HOUR",'visible',false);
						 //e.component.itemOption("existReq.EDC_EXIST_PAYLIMIT_MINUTE",'visible',false);
						 e.component.itemOption("existReq.EDC_EXIST_PAYLIMIT_DATETIME",'visible',true);
					}
				}
				if(e.dataField=='EDC_REQ_DATE_TYPE' ){ //접수기간 설정방법
					var bVisible=true;
					if(e.value=='1'){//매월고정
				 		bVisible = false;
				 	}
					e.component.itemOption("newReq.EDC_REQ_FIX_SDATE",'visible',!bVisible);
					e.component.itemOption("newReq.EDC_REQ_FIX_EDATE",'visible',!bVisible);
					e.component.itemOption("newReq.EDC_REQ_SDATE",'visible',bVisible);
					e.component.itemOption("newReq.EDC_REQ_EDATE",'visible',bVisible);
					
					e.component.itemOption("newReq.EDC_REQ_IN_DATE",'visible',bVisible);
					e.component.itemOption("newReq.EDC_REQ_IN_FIX_DATE",'visible',!bVisible);
					
				}
				if(e.dataField=='EDC_EXIST_DATE_TYPE' ){ //접수기간 설정방법
					var bVisible=true;
					if(e.value=='1'){//매월고정
				 		bVisible = false;
				 	}
					e.component.itemOption("EDC_EXIST_SDATE",'visible',bVisible);
					e.component.itemOption("EDC_EXIST_EDATE",'visible',bVisible);
					e.component.itemOption("EDC_EXIST_FIX_SDATE",'visible',!bVisible);
					e.component.itemOption("EDC_EXIST_FIX_EDATE",'visible',!bVisible);
				}
				e.component.endUpdate();
			}
	});			
	
}

function createTab1Items(){
	var resultItems=[];
	//colcount 4 cssClass:'item_height_0',
	resultItems=[
		{colSpan:4,itemType: 'button',
			cssClass:'item_height_0',
			horizontalAlignment: 'right',
			buttonOptions: {
		        text: '일괄적용하기',
		        type:'success',
		        useSubmitBehavior: true,
		        onClick(){
		        	/*var tabOptForm= $("#tab1_contents").dxForm('instance'); 
		            var validationResult = tabOptForm.validate();
		            var orgData = tabOptForm.option("formData");
		             
		            if (validationResult.isValid) {
		            	 	
		                     $.ajax({
		                         url: "URL_to_a_controller_method",
		                         type: "POST",
		                         dataType: "json",
		                         data: orgData,
		                         success: function (data) {
		                             alert("Success!");
		                         },
		                         error: function (xhr, textStatus, errorThrown) {
		                             alert('Request Status: ' + xhr.status + '; Status Text: ' + textStatus + '; Error: ' + errorThrown);
		                         }
		                     });
		             }
		             else
		                 alert("dxForm is invalid");
		                 */
		        }
		      },
		},
		{itemType:'group',colCount:2,caption:'기본설정',
			items:[
			{dataField:'EDC_REQ_KIJUN_' ,label: {visible:false},cssClass:'grp_low_height',
				editorType: 'dxCheckBox',
				editorOptions:{
					text:'접수기간운영기준',
				}
			},
			{dataField:'EDC_REQ_KIJUN' ,label: {visible:false},
				editorType: 'dxSelectBox',
				editorOptions: {
					dataSource:recv_gbn,
					valueExpr: 'value',displayExpr: 'text',
				},
			},
			{dataField:'EDC_REQ_PATH_',label: {visible:false},cssClass:'grp_low_height',
				editorType: 'dxCheckBox',
				editorOptions:{
					text:'접수경로',
				}
			},
			{dataField:'EDC_REQ_PATH',label: {visible:false},
				editorType: 'dxSelectBox',
				editorOptions: {
		    		dataSource:req_path_gbn,
		    		valueExpr: 'value',
		    		displayExpr: 'text',
		    	}
			},
			{dataField:'EDC_PNCPA_',label: {visible:false},cssClass:'grp_low_height',
				editorType: 'dxCheckBox',
				editorOptions:{
					text:'총정원',
				}
			},
			{dataField:'EDC_PNCPA',label:{visible:false},
				editorType:'dxNumberBox',
				editorOptions:{
					showSpinButtons: true,
					format: "#,##0 명",
					min:1,
					max:10000,
					step:10,
				},
			},
			{dataField:'EDC_PNCPA_YN_',label: {visible:false},cssClass:'grp_low_height',
				editorType: 'dxCheckBox',
				editorOptions:{
					text:'온라인/방문 정원',
				}
			},
			{dataField:'EDC_PNCPA_YN',label: {visible:false},
				editorType: 'dxSelectBox',
				editorOptions: {
					 dataSource:recvcapa_gbn,
					 valueExpr: 'value', 
					 displayExpr: 'text',
					 
				},
			 }, 
			{dataField:'EDC_ONCPA',label:{text:"온라인"},
				 editorType:'dxNumberBox',
				 editorOptions:{
					width:'150px',
					showSpinButtons: true,
					format: "#,##0 명",
					elementAttr:{
						class:'margin-left-m100'
					}
				},
			},
			{dataField:'EDC_VNCPA',label:{text:"방문"},
				editorType:'dxNumberBox',
				editorOptions:{
					showSpinButtons: true,
					format: "#,##0 명"
				},
			},
			{dataField:'EDC_DATE_TYPE_',label: {visible:false},cssClass:'grp_low_height',
				editorType: 'dxCheckBox',
				editorOptions:{
					text:'강좌기간',
				}
			},
			{dataField:'EDC_DATE_TYPE' ,label: {visible:false},editorType: 'dxSelectBox',
				editorOptions: {
					dataSource:set_gbn,
					valueExpr: 'value',
					displayExpr: 'text',
				}
			}, 
			{dataField:'EDC_SDATE',label: {visible:false},
				visible:formData1.EDC_REQ_DATE_TYPE=='1'?false:true,
				editorType:'dxDateBox',
				editorOptions:{
					displayFormat: 'yyyy-MM-dd'
				}
	    	},  
	    	{dataField:'EDC_EDATE',label: {text:'~'},
	    		visible:formData1.EDC_REQ_DATE_TYPE=='1'?false:true,
	    		editorType: "dxDateBox",
	    		editorOptions: {
	    			displayFormat: 'yyyy-MM-dd'
	    		} 
	    	}, 
	    	{dataField:'EDC_REQ_WAIT_TYPE_',label: {visible:false},cssClass:'grp_low_height',
				editorType: 'dxCheckBox',
				editorOptions:{
					text:'신청취소시대기자선정방법',
				}
			},
			{dataField:'EDC_REQ_WAIT_TYPE', label:{visible:false},
		    	editorType: 'dxSelectBox',
		    	editorOptions: {dataSource:wait_ass_gbn,valueExpr: 'value',displayExpr: 'text',},
		    },
			{dataField:'EDC_ADDREQ_YN_',label: {visible:false},cssClass:'grp_low_height',
				editorType: 'dxCheckBox',
				editorOptions:{
					text:'추가접수운영',
				}
			},
			{colSpan:2,dataField:'EDC_ADDREQ_YN',label:{visible:false},
				editorType: 'dxSelectBox',
				editorOptions: {
					 dataSource:run_gbn,
					 valueExpr: 'value',
					 displayExpr: 'text',
				},
			 }, 
			 {colSpan:2,dataField:'EDC_ADDREQ_START',label: {text:'추가접수강좌시작일설정'},
				 editorType: 'dxSelectBox',
				 editorOptions: {
					 dataSource:addRecv_gbn,
					 valueExpr: 'value', 
					 displayExpr: 'text',
					 
				 },
			 },
			 {colSpan:2,label:{text:'추가접수강좌료산출'}},
			 {colSpan:2,dataField:'EDC_ADDREQ_PAY',label: {visible:false},
				editorType: 'dxSelectBox',
				editorOptions: {
						dataSource:addFee_gbn,
						valueExpr: 'value',
						displayExpr: 'text',
					},
			 },
		]
	},
	{itemType:'group',colSpan:3,items:[
		{itemType:'group',colCount:6,caption:'신규회원접수설정',name:'newReq',
			items:[
				{dataField:'EDC_REQ_TYPE_',label: {visible:false},cssClass:'grp_low_height',
					editorType: 'dxCheckBox',
					editorOptions:{
						text:'접수방식',
					}
				}, //접수방식			 
				{dataField:'EDC_REQ_TYPE',label: {visible:false},editorType: 'dxSelectBox',
					editorOptions: {
						dataSource:recvType_gbn,
						valueExpr: 'value',
						displayExpr: 'text',
					},
				},
				{dataField:'EDC_REQ_TEXT_',label: {visible:false},cssClass:'grp_low_height',
					editorType: 'dxCheckBox',
					editorOptions:{
						text:'접수방식안내문구',
					}
				},
				{dataField:'EDC_REQ_TEXT',label: {visible:false},editorType: 'dxTextBox',},
				{dataField:'EDC_REQ_COUNT_TEXT_',label: {visible:false},cssClass:'grp_low_height',
					editorType: 'dxCheckBox',
					editorOptions:{
						text:'신규 모집',
					}
				},
				{dataField:'EDC_REQ_COUNT_TEXT',label: {text:'모집차수명'},cssClass:'margin-left-m100',
					editorType: 'dxTextBox',
					editorOptions:{
						placeholder:'미입력시 자동생성'
					}
				},
				{colSpan:2,itemType:'empty',name:'empty_01',visible:false},
				{dataField:'EDC_REQ_DATE_TYPE_',label: {visible:false},cssClass:'grp_low_height',
					editorType: 'dxCheckBox',
					editorOptions:{
						text:'접수기간설정방법',
					}
				},
				{dataField:'EDC_REQ_DATE_TYPE' ,label: {visible:false},editorType: 'dxSelectBox',
					editorOptions: {
						dataSource:recvterm_gbn,
						valueExpr: 'value',
						displayExpr: 'text',
						
					
					}
				}, //접수기간설정방법,
				{dataField:'EDC_REQ_DATE_',label: {visible:false},cssClass:'grp_low_height',
					editorType: 'dxCheckBox',
					editorOptions:{
						text:'접수기간설정',
					}
				},
				{dataField:'EDC_REQ_SDATE',label: {visible:false},
					visible:formData1.EDC_REQ_DATE_TYPE=='1'?false:true,
					editorType:'dxDateBox',
					editorOptions:{
						displayFormat: 'yyyy-MM-dd'
					}
		    	}, //접수기간 
		    	{dataField:'EDC_REQ_EDATE',cssClass:'to-date',
		    		label: {text:'~',
		    			template(data) {
		    				return `${data.text}`;
		    			}
		    		},
		    		visible:formData1.EDC_REQ_DATE_TYPE=='1'?false:true,
		    		editorType: "dxDateBox",
		    		editorOptions: {
		    			displayFormat: 'yyyy-MM-dd'
		    		} 
		    	}, //접수기간
		    	//매월 고정인 경우.
		    	{dataField:'EDC_REQ_FIX_SDATE',visible:false,label: {text:'접수시작일'},
		    		visible:formData1.EDC_REQ_DATE_TYPE=='1'?true:false,
		    		editorType: 'dxSelectBox',
		    		editorOptions: {items:dateItems_gbn,valueExpr: 'value',displayExpr:'text',},
		    	},
		    	{dataField:'EDC_REQ_FIX_EDATE',visible:false,label: {text:'접수종료일'},
		    		visible:formData1.EDC_REQ_DATE_TYPE=='1'?true:false,
		    		editorType: 'dxSelectBox',
		    		editorOptions: {dataSource:dateItems_gbn,valueExpr: 'value',displayExpr:'text',},
		    	},
		    	{colSpan:2,itemType:'empty',name:'empty_01'},
		    	{dataField:'EDC_REQ_IN_YN_',label: {visible:false},cssClass:'grp_low_height',
					editorType: 'dxCheckBox',
					editorOptions:{
						text:'관내회원우선접수기간',
					}
				},
		    	{dataField:'EDC_REQ_IN_YN',label: {visible:false},
		    		editorType: 'dxSelectBox',
		    		editorOptions: {dataSource:set_gbn,valueExpr: 'value',displayExpr: 'text',}
				},
				{colSpan:2,dataField:'EDC_REQ_IN_DATE',cssClass:'inreq_date',label: {text:'접수시작일부터'},
					editorType:'dxDateBox',
					visible:formData1.EDC_REQ_DATE_TYPE=='0'? true:false,
					editorOptions:{
						pickerType: 'list',
						displayFormat: 'yyyy-MM-dd 까지',
						
					}
				},
				{colSpan:2,dataField:'EDC_REQ_IN_FIX_DATE',cssClass:'inreq_date',visible:false,label: {text:'접수시작일부터'},
					visible:formData1.EDC_REQ_DATE_TYPE=='1'? true:false,
			    	editorType: 'dxSelectBox',
			    	editorOptions: {dataSource:dateItems_gbn,valueExpr: 'value',displayExpr:'text',
			    		buttons:[{
			    		      name: 'today',
			    		      location: 'after',
			    		      options: {
			    		        text: '까지',
			    		        elementAttr: {
			    		            class: 'non-button',
			    		          },
			    		      },
			    		    },'dropDown']
			    	}
			    },
			    {colSpan:2,itemType:'empty',name:'empty_01'},
			    {dataField:'EDC_REQ_IN_TIME_',label: {visible:false},cssClass:'grp_low_height',
					editorType: 'dxCheckBox',
					editorOptions:{
						text:'접수시간',
					}
				},
			    {dataField:'EDC_REQ_IN_STIME',label: {visible:false},editorType:'dxDateBox',
					editorOptions:{
						pickerType: 'list',
						type: 'time',
						interval: 10,
						displayFormat: 'HH:mm',
					}
				}, 
				{dataField:'EDC_REQ_IN_ETIME',cssClass:'to-date',label: {text:'~'},editorType:'dxDateBox',
					editorOptions:{
						
						pickerType: 'list',
						type: 'time',
						interval: 10,
						displayFormat: 'HH:mm',
					}
				}, 
				
				{dataField:'EDC_REQ_TIME_TYPE_',label: {visible:false},cssClass:'grp_low_height',
					editorType: 'dxCheckBox',
					editorOptions:{
						text:'접수시간운영방법',
					}
				},
		    	{dataField:'EDC_REQ_TIME_TYPE',label: {visible:false}
					,editorType: 'dxSelectBox',
					editorOptions: {dataSource:recvtime_gbn,valueExpr: 'value',displayExpr: 'text',},
		    	},
		    	{itemTyp:'empty'},
		    	{dataField:'EDC_REQ_ASS_TYPE_',label: {visible:false},cssClass:'grp_low_height',
					editorType: 'dxCheckBox',
					editorOptions:{
						text:'선착순접수자승인방법',
					}
				},
			    {dataField:'EDC_REQ_ASS_TYPE', label:{visible:false},
					editorType: 'dxSelectBox',
			    	editorOptions: {dataSource:Approval_gbn,valueExpr: 'value',displayExpr: 'text',},
			    },
			    {dataField:'EDC_REQ_WAIT_CAPA_YN_',label: {visible:false},cssClass:'grp_low_height',
					editorType: 'dxCheckBox',
					editorOptions:{
						text:'대기신청정원설정',
					}
				},
			    {dataField:'EDC_REQ_WAIT_CAPA_YN', label:{visible:false},
			    	editorType: 'dxSelectBox',
			    	editorOptions: {dataSource:set_gbn,valueExpr: 'value',displayExpr: 'text',},
			    },		   
			    {dataField:'EDC_REQ_WAIT_CAPA', label:{visible:false},
			    	editorType:'dxNumberBox',
					editorOptions:{
						showSpinButtons: true,
						format: "#,##0 명"
					},
			    }, 
			    {colSpan:3,itemTyp:'empty',name:'empty_waitcapa'},
			    {dataField:'EDC_CHUCHUM_TYPE_',label: {visible:false},cssClass:'grp_low_height',
					editorType: 'dxCheckBox',
					editorOptions:{
						text:'추첨스케줄설정',
					}
				},
			    {dataField:'EDC_CHUCHUM_TYPE',label: {visible:false},
			    	editorType: 'dxSelectBox',
					editorOptions: {dataSource:choiceSchedule_gbn,valueExpr: 'value',displayExpr: 'text'},
				},	//추첨자동/수동설정
				//--수동인경우.
				
				{colSpan:2,dataField:'EDC_CHUCHUM_OPEN_DT',cssClass:'inreq_date',label: {text:'추첨발표일'},
					editorType: 'dxDateBox',
					editorOptions: {displayFormat: 'yyyy-MM-dd'},
				},
				{colSpan:2,itemType:'empty',name:'empty_chuhum',},
				{dataField:'EDC_CHUCHUM_DAY_TYPE',label:{visible:false},
	    			visible:false,
	    			editorType: 'dxSelectBox',
					editorOptions: {dataSource:choiceScheduleDateType_gbn,valueExpr: 'value',displayExpr: 'text'},
				},//접수종료일기준(D-DAY)/일자설정(S)
				{dataField: "EDC_CHUCHUM_DDAY", label: {visible: false},
					visible:false,
					editorType: "dxNumberBox",
					editorOptions: {showSpinButtons: true, min: 0, max: 20, value: 1, format: "D+#,##일", elementAttr: {class: "form-label40"}} 
				},
				{dataField:'EDC_CHUCHUM_DATE',label:{visible:false},
					visible:false,
					editorType: 'dxDateBox',
					editorOptions: {displayFormat: 'yyyy-MM-dd'},
				},	//일자설정(직접설정) 추첨 지정일
				{dataField:'EDC_CHUCHUM_FIX_DDAY',label:{visible:false},
					visible:false,
			    	editorType: 'dxSelectBox',
			    	editorOptions: {items:dateItems_gbn,valueExpr: 'value',displayExpr:'text',},
				},	//일자설정(매월고정) 추첨 지정일
				{dataField:'EDC_CHUCHUM_TIME',label: {visible:false},
					visible:false,
					editorType:'dxDateBox',
					editorOptions:{
						pickerType: 'list',
						type: 'time',
						interval: 10,
						displayFormat: 'HH:mm',
					}
				},
				{colSpan:2,itemType: 'button',name:'optCuchum',
					visible:false,
				    buttonOptions: {
				        text: '옵션설정',
				        type: 'default',
				        onClick(e){
				        	createDrawExecute();
				        }
				    },
				},
				{dataField:'EDC_REQ_PAYLIMIT_TYPE_',label: {visible:false},cssClass:'grp_low_height',
					editorType: 'dxCheckBox',
					editorOptions:{
						text:'결제마감설정기준',
					}
				},
	    		{dataField:'EDC_REQ_PAYLIMIT_TYPE',label: {visible:false},editorType: 'dxSelectBox',
	    			editorOptions: {dataSource:payFinal_gbn,valueExpr: 'value',displayExpr: 'text'},
	    		},
	    		{itemType:'group',colSpan:2,colCount:2,name:'EDC_REQ_PAYLIMIT',
	    			items:[
			    		{dataField:'EDC_REQ_PAYLIMIT_HOUR',label:{location:'right',text:'시'},
			    			editorType:'dxNumberBox',
			    			editorOptions:{
			    				min:0,
			    				step:1,
			    				showSpinButtons: true,
			    			},
			    		},	
			    		{dataField:'EDC_REQ_PAYLIMIT_MINUTE',cssClass:'label-width-60',label:{location:'right',text:'분 이후 결제자동 취소'},
			    			editorType:'dxNumberBox',
			    			editorOptions:{
			    				min:0,
			    				step:10,
			    				showSpinButtons: true,
			    			},
			    		},
			    		]
	    		},
	    		
	    		{colSpan:2,dataField:'EDC_REQ_PAYLIMIT_DATETIME',cssClass:'label-width-230',label:{location:'right',text:'이후 결제자동 취소'},
	    			visible:false,
	    			editorType:'dxDateBox',
	    			editorOptions: {
	                     type: 'datetime',
	                     displayFormat: 'yyyy-MM-dd HH:mm',
	                     showAnalogClock: false,
	                 },
	    		},
	    		//{template:'분 이후 결제자동 취소',cssClass:'grp_low_height'},
	    		//{itemType:'empty'},
	    		{colSpan:2,itemType:'empty',name:'empty_paylimit'},
	    		{dataField:'EDC_REQ_TERM_AUTO1_',label: {visible:false},cssClass:'grp_low_height',
					editorType: 'dxCheckBox',
					editorOptions:{
						text:'기간수료1차',
					}
				},
				{itemType:'group',colSpan:5,colCount:6,items:[
		    		{colSpan:2,dataField:'EDC_REQ_TERM_AUTO_DAY',label:{text:'대기자자동배정일시'},
		    			editorType: 'dxSelectBox',
		    			editorOptions: {dataSource:dateItems_gbn,valueExpr: 'value',displayExpr: 'text'},
		    		},
		    		{dataField:'EDC_REQ_TERM_AUTO_TIME',label:{visible:false},
		    			editorType:'dxDateBox',
						editorOptions:{
							pickerType: 'list',
							useMaskBehavior: true,  
							type: 'time',
							interval: 10,
							displayFormat: 'HH:mm',
							value:'00:00'
						}
					},
					{colSpan:2,dataField:'EDC_REQ_TERMPAU_LIMT_DAY',label:{text:'결제마감일시'},
						editorType: 'dxSelectBox',
		    			editorOptions: {dataSource:dateItems_gbn,valueExpr: 'value',displayExpr: 'text'},
		    		},
		    		{dataField:'EDC_REQ_TERMPAU_LIMT_TIME',label:{visible:false},
		    			editorType:'dxDateBox',
						editorOptions:{
							pickerType: 'list',
							useMaskBehavior: true,  
							type: 'time',
							interval: 10,
							displayFormat: 'HH:mm',
							value:'00:00'
						}
					},
				]},
				{dataField:'EDC_REQ_TERM_AUTO2_',label: {visible:false},cssClass:'grp_low_height',
					editorType: 'dxCheckBox',
					editorOptions:{
						text:'기간수료2차',
					}
				},
				{itemType:'group',colSpan:5,colCount:6,items:[
		    		{colSpan:2,dataField:'EDC_REQ_TERM_AUTO2_DAY',label:{text:'대기자자동배정일시'},
		    			editorType: 'dxSelectBox',
		    			editorOptions: {dataSource:dateItems_gbn,valueExpr: 'value',displayExpr: 'text'},
		    		},
		    		{dataField:'EDC_REQ_TERM_AUTO2_TIME',label:{visible:false},
		    			editorType:'dxDateBox',
						editorOptions:{
							pickerType: 'list',
							useMaskBehavior: true,  
							type: 'time',
							interval: 10,
							displayFormat: 'HH:mm',
							value:'00:00'
						}
					},
					{colSpan:2,dataField:'EDC_REQ_TERMPAU2_LIMT_DAY',label:{text:'결제마감일시'},
						editorType: 'dxSelectBox',
		    			editorOptions: {dataSource:dateItems_gbn,valueExpr: 'value',displayExpr: 'text'},
		    		},
		    		{dataField:'EDC_REQ_TERMPAU2_LIMT_TIME',label:{visible:false},
		    			editorType:'dxDateBox',
						editorOptions:{
							pickerType: 'list',
							useMaskBehavior: true,  
							type: 'time',
							interval: 10,
							displayFormat: 'HH:mm',
							value:'00:00'
						}
					},
					]
				}
			]
		 },
	 
		 {itemType:'group',colCount:6,caption:'기존회원접수설정',name:'existReq',
			 items:[
				 {dataField:'EDC_EXIST_TYPE_',label: {visible:false},cssClass:'grp_low_height',
						editorType: 'dxCheckBox',
						editorOptions:{
							text:'기존회원접수기준',
						}
				},
				{dataField:'EDC_EXIST_TYPE', label: {visible:false},editorType: 'dxSelectBox',
					editorOptions: {
						dataSource:newrecvType_gbn,
						valueExpr: 'value',
						displayExpr: 'text',
					},
				},
				{itemType:'empty',colSpan:4},
				{dataField:'EDC_EXIST_DATE_TYPE_',label: {visible:false},cssClass:'grp_low_height',
					editorType: 'dxCheckBox',
					editorOptions:{
						text:'접수기간설정방법',
					}
				},
				{dataField:'EDC_EXIST_DATE_TYPE',label:{visible:false},editorType: 'dxSelectBox',
					editorOptions: {
						dataSource:recvterm_gbn,
						valueExpr: 'value',
						displayExpr: 'text',
					},
				},
				
				{dataField:'EDC_EXIST_DATE_',label: {visible:false},cssClass:'grp_low_height',
					editorType: 'dxCheckBox',
					editorOptions:{
						text:'접수기간설정',
					}
				},
				{dataField:'EDC_EXIST_SDATE',label: {visible:false},editorType:'dxDateBox',
					visible:formData1.EDC_EXIST_DATE_TYPE=='0'? true:false,
					editorOptions:{
						displayFormat: 'yyyy-MM-dd',
					}
				},  
				{dataField:'EDC_EXIST_EDATE',label: {text:'~'},cssClass:'to-date',
					editorType:'dxDateBox',
					visible:formData1.EDC_EXIST_DATE_TYPE=='0'? true:false,
					editorOptions:{
						displayFormat: 'yyyy-MM-dd',
					}
				}, 
				{dataField:'EDC_EXIST_FIX_SDATE',label:  {visible:false},
					visible:formData1.EDC_EXIST_DATE_TYPE=='1'? true:false,
					editorType: 'dxSelectBox',
				    editorOptions: {
				    	dataSource:dateItems_gbn,
				    	valueExpr: 'value',
				    	displayExpr:'text',
				    },
				},  
				{dataField:'EDC_EXIST_FIX_EDATE',label: {text:'~'},
					visible:formData1.EDC_EXIST_DATE_TYPE=='1'? true:false,
					editorType: 'dxSelectBox',
					editorOptions: {
						dataSource:dateItems_gbn,
						valueExpr: 'value',
						displayExpr:'text',
					},
				},
				{itemType:'empty',colSpan:3},
				{dataField:'EDC_EXIST_TIME_',label: {visible:false},cssClass:'grp_low_height',
					editorType: 'dxCheckBox',
					editorOptions:{
						text:'접수시간',
					}
				},
				{dataField:'EDC_EXIST_STIME',label: {visible:false},editorType:'dxDateBox',
					editorOptions:{
						pickerType: 'list',
						type: 'time',
						interval: 10,
						displayFormat: 'HH:mm',
					}
				},
				{dataField:'EDC_EXIST_ETIME',label: {text:'~'},cssClass:'to-date',
					editorType:'dxDateBox',
					editorOptions:{
						pickerType: 'list',
						type: 'time',
						interval: 10,
						displayFormat: 'HH:mm',
					}
				},
				{dataField:'EDC_EXIST_TIME_TYPE_',label: {visible:false},cssClass:'grp_low_height',
					editorType: 'dxCheckBox',
					editorOptions:{
						text:'접수시간운영방법',
					}
				},
				{dataField:'EDC_EXIST_TIME_TYPE',label: {visible:false},editorType: 'dxSelectBox',
					editorOptions: {
						dataSource:recvtime_gbn,
						valueExpr: 'value',
						displayExpr: 'text',
					},
				}, 
				{itemType:'empty'},
				{dataField:'EDC_EXIST_MONTH_YN_',label: {visible:false},cssClass:'grp_low_height',
					editorType: 'dxCheckBox',
					editorOptions:{
						text:'기존회원 접수제한 설정',
					}
				},
				{dataField:'EDC_EXIST_MONTH_YN',label:{visible:false},editorType: 'dxSelectBox',
					editorOptions: {
						dataSource:set_gbn,
						valueExpr: 'value',
						displayExpr: 'text',
					},
				},
				{dataField:'EDC_EXIST_MONTH',cssClass:'label-width-100',label:{text:'접수제한 이용개월수'},
					editorType: 'dxSelectBox',
					editorOptions: {			    					  
						items: useMonth_gbn2,
					},
				}, 
				/*{label:{visible:false},cssClass:'grp_low_height',template:'(0은 재접수 제한 없음)'},*/
				{itemType:'empty',colSpan:3},
				{dataField:'EDC_EXIST_PAYLIMIT_TYPE_',label: {visible:false},cssClass:'grp_low_height',
					editorType: 'dxCheckBox',
					editorOptions:{
						text:'결제마감설정기준',
					}
				},
	    		{dataField:'EDC_EXIST_PAYLIMIT_TYPE',label: {visible:false},editorType: 'dxSelectBox',
	    			editorOptions: {dataSource:payFinal_gbn,valueExpr: 'value',displayExpr: 'text'},
	    		},
	    		{itemType:'group',colSpan:2,colCount:2,name:'EDC_EXIST_PAYLIMIT',
	    			items:[
			    		{dataField:'EDC_EXIST_PAYLIMIT_HOUR',label:{location:'right',text:'시'},
			    			editorType:'dxNumberBox',
			    			editorOptions:{
			    				min:0,
			    				step:1,
			    				showSpinButtons: true,
			    			},
			    		},	
			    		{dataField:'EDC_EXIST_PAYLIMIT_MINUTE',cssClass:'label-width-60',label:{location:'right',text:'분 이후 결제자동 취소'},
			    			editorType:'dxNumberBox',
			    			editorOptions:{
			    				min:0,
			    				step:10,
			    				showSpinButtons: true,
			    			},
			    		},
			    		]
	    		},
	    		{colSpan:2,dataField:'EDC_EXIST_PAYLIMIT_DATETIME',cssClass:'label-width-230',label:{location:'right',text:'이후 결제자동 취소'},
	    			visible:false,
	    			editorType:'dxDateBox',
	    			editorOptions: {
	                     type: 'datetime',
	                     displayFormat: 'yyyy-MM-dd HH:mm',
	                     showAnalogClock: false,
	                 },
	    		},
	    		{colSpan:2,itemType:'empty',name:'empty_paylimitExist'},
			    ]
			 }
		 ]
	}
	];
	
	return resultItems;
}
