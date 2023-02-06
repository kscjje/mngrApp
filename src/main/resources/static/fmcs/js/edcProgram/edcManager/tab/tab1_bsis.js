let subMenuList1=null;
let tab1selectedItem ='';
let tabForm1=null;
let tabForm2=null;
let tabForm3=null;
let tabForm2Repaint=false;
let tabForm3Repaint=false;
//모집 설정
function CreateTab1Init()
{
	if(subMenuList1!=null) return;
	subMenuList1 = $('#tab1 .tab_list').dxList({
		 dataSource: new DevExpress.data.DataSource({
		      store: new DevExpress.data.ArrayStore({
		        key: 'ID',
		        data: EDC_TAB1_ITEMS,
		      }),
		    }),
		selectionMode:'single', 
	    allowItemDeleting: false,
	    onSelectionChanged(component,element) {
	    	var cur= subMenuList1.option('selectedItemKeys');
	    	if(tab1selectedItem!=cur){
	    		hideFormMenuChange(tab1selectedItem,cur);
	    		createTab1Form(cur);
	    		showFormMenuChange(tab1selectedItem,cur);
	    		tab1selectedItem=cur;
	        }
	      },
	}).dxList('instance');
	
	//subMenuList1.selectItem(0);
	//tab1selectedItem='item1';
	
	setTimeout(function(){
		subMenuList1.selectItem(0);
	}, 1);
	
}
function hideFormMenuChange(itemID,curItem){
	if(itemID=='') return;
	var form=null;
	if( itemID == 'item1' ){
		form=tabForm1;
	}else if( itemID == 'item2' ){
		form=tabForm2;
	}else if( itemID == 'item3' ){
		form=tabForm3;
	}
	form.option("visible",false);
}

function showFormMenuChange(itemID,curItem){
	if(itemID=='') return;
	var form=null;
	if( curItem == 'item1' ){
		form=tabForm1;
	}else if( curItem == 'item2' ){
		form=tabForm2;
	}else if( curItem == 'item3' ){
		form=tabForm3;
	}
	form.option("visible",true);
	//form.repaint();
}
var formData1={
		EDC_REQ_KIJUN:'0',//운영기준
		EDC_PNCPA:1,
		EDC_REQ_PATH:'001',
		EDC_PNCPA_YN:'1',
		EDC_ONCPA:0,
		EDC_VNCPA:0,
		EDC_ADDREQ_YN:'0',
		EDC_ADDREQ_START:'0',
		EDC_ADDREQ_PAY:'0',
		EDC_REQ_TYPE:'1',//접수방식
		EDC_REQ_TEXT:'',//접수방식안내문구
		EDC_REQ_COUNT_TEXT:'',//모집차수명
		EDC_REQ_DATE_TYPE:'0',//접수기간설정방법
		EDC_REQ_SDATE:'',//접수시작일
		EDC_REQ_EDATE:'',//접수종료일
		EDC_REQ_FIX_SDATE:1,//매월 고정 접수시작일
		EDC_REQ_FIX_EDATE:1,//매월 고정 접수종료일
		EDC_REQ_IN_YN:'1',//관내회원우선접수기간
		EDC_REQ_IN_DATE:'2022-02-02',//접수시작일부터 'yyyy-MM-dd 까지'
		EDC_REQ_IN_FIX_DATE:'01',//접수시작일부터 고정
		EDC_REQ_IN_STIME:'00:00',//접수시작시간 
		EDC_REQ_IN_ETIME:'00:00',//접수종료시간 
		EDC_REQ_TIME_TYPE:'0',//접수시간운영방법
		EDC_REQ_ASS_TYPE:'0',//선착순접수자승인방법
		EDC_REQ_PAYLIMIT_TYPE:'0',//결제마감설정기준
		EDC_REQ_PAYLIMIT_HOUR:0,//분 이후 결제자동 취소
		EDC_REQ_PAYLIMIT_DATETIME:'',//직접 설정
		EDC_REQ_WAIT_TYPE:'0',//신청쉬소시대기자선정방법
		EDC_REQ_WAIT_CAPA_YN:'0',//대기신청정설정
		EDC_REQ_WAIT_CAPA:0,//대기신청정원수
		EDC_CHUCHUM_TYPE:'A',//추첨자동/수동설정
		EDC_CHUCHUM_OPEN_DT:'',//(수동)추첨발표일
		EDC_CHUCHUM_DAY_TYPE:'D',//접수종료일기준(D-DAY)/일자설정(S)
		EDC_CHUCHUM_DATE:'2022-02-02',//일자설정(직접설정) 추첨 지정일
		EDC_CHUCHUM_FIX_DDAY:'02',//일자설정(매월고정) 추첨 지정일
		EDC_CHUCHUM_DDAY:'1',//접수종료일기준(D-DAY) 추첨 지정일
		EDC_CHUCHUM_TIME:'00:00',//추첨시간
		EDC_EXIST_TYPE:'0', //기존회원접수기준
		EDC_EXIST_DATE_TYPE:'0', //접수기간설정방법
		EDC_EXIST_SDATE:'', //접수시작일
		EDC_EXIST_EDATE:'', //접수종료일
		EDC_EXIST_FIX_SDATE:1, //접수시작일(고정)
		EDC_EXIST_FIX_EDATE:1, //접수종료일(고정)
		EDC_EXIST_STIME:'', //접수시작시간
		EDC_EXIST_ETIME:'', //접수종료시간
		EDC_EXIST_TIME_TYPE:'0', //접수시간운영방법
		EDC_EXIST_MONTH_YN:'0',//기존회원 접수제한 설정
		EDC_EXIST_MONTH:0 ,//이용 개월수
		EDC_EXIST_PAYLIMIT_TYPE:'0',//결제마감설정기준
		EDC_REQ_PAYLIMIT_HOUR:0 ,//분 이후 결제자동 취소
		EDC_REQ_PAYLIMIT_DATETIME: '',//직접입력
};

function createTab1Form(itemID){
	
	if( itemID == 'item1' ){
		if(tabForm1 != null) return;
		tabForm1=$('#tab1_contents1').dxForm({
			showColonAfterLabel: false,
			formData: formData1,
			colCount:3,
			items: createTab1Items(itemID),
			onInitialized: function(e) {
				var customHandlerInit = function (e) {
					//console.log("form1 custom contentReady");
					//console.log(e.component.option("formData"));
					var orgData = e.component.option("formData");
					
					var editor1 = e.component.getEditor("EDC_ADDREQ_START");
					var editor2 = e.component.getEditor("EDC_ADDREQ_PAY");
					if(orgData.EDC_ADDREQ_YN =='1'){ //추가접수운영기준
						editor1.option("disabled", false);  
				 		editor2.option("disabled", false);
					}else {
						editor1.option("disabled", true);
					 	editor2.option("disabled", true);
					}
					editor1 = e.component.getEditor("EDC_PNCPA_YN");			
					if(orgData.EDC_REQ_PATH == '003'){//접수경로 //온라인+방문
						editor1.option('disabled', false);
					}else{
						editor1.option('disabled', true);
					}
					//온라인/방문 정원 설정:
					editor1 = e.component.getEditor("EDC_ONCPA");
					editor2 = e.component.getEditor("EDC_VNCPA");
					
					editor1.option('disabled', orgData.EDC_PNCPA_YN=='1' && orgData.EDC_REQ_PATH=='003' ? false: true);
					editor2.option('disabled', orgData.EDC_PNCPA_YN=='1' && orgData.EDC_REQ_PATH=='003'  ? false: true);
				}
				e.component.on("contentReady", customHandlerInit);
			},
			onFieldDataChanged: function (e) {
				//온라인/방문 정원 설정 //접수경로 //추가접수운영기준 
				if(e.dataField=='EDC_PNCPA_YN' || e.dataField=='EDC_REQ_PATH' || e.dataField=='EDC_ADDREQ_YN' ){ 
					e.component.repaint();
				}
				if(e.dataField=='EDC_REQ_KIJUN' ){
					tabForm2Repaint= true;					
					tabForm3Repaint= true;
				}
			}
			
		}).dxForm("instance");			
	}else if( itemID == 'item2' ){
				
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
		if(tabForm2 !=null){
			if(tabForm2Repaint) {
				var orgData = tabForm2.option("formData");
				if(orgData.EDC_REQ_KIJUN == '1'){
					tabForm2.getEditor('EDC_REQ_TYPE').option("value", '0');//선착
				}
				tabForm2.repaint();
			}
			tabForm2Repaint=false;
			return;
		}
		tabForm2Repaint=false;
		tabForm2 = $('#tab1_contents2').dxForm({
			showColonAfterLabel: false,
			colCount:12,
			formData: formData1,
			items: createTab1Items(itemID),
			onInitialized: function(e) {
				//console.log("form2-onInitialized");
				var customHandlerInit = function (data) {
					//console.log("form2 custom contentReady");
					var orgData = e.component.option("formData");
					var bDisabled=orgData.EDC_REQ_KIJUN == '1' ?true:false;
					//정기, 수시인 경우.
					e.component.getEditor("EDC_REQ_IN_YN").option('disabled', bDisabled);
					e.component.getEditor("EDC_REQ_COUNT_TEXT").option('disabled', bDisabled);
					e.component.getEditor("EDC_REQ_DATE_TYPE").option('disabled', bDisabled);
					e.component.getEditor('EDC_REQ_TYPE').option('disabled', bDisabled);
					if(orgData.EDC_REQ_DATE_TYPE=="0"){ //기간설정
						e.component.getEditor("EDC_REQ_SDATE").option('disabled', bDisabled);
						e.component.getEditor("EDC_REQ_EDATE").option('disabled', bDisabled);
					}else{//고정인경우.
						e.component.getEditor("EDC_REQ_FIX_SDATE").option('disabled', bDisabled);
						e.component.getEditor("EDC_REQ_FIX_EDATE").option('disabled', bDisabled);
						
					}
		/*			//관내 우선 접수 설정
					if(orgData.DC_REQ_IN_YN=='1'){//설정함
						if(orgData.EDC_REQ_DATE_TYPE=="0"){ //기간설정
							e.component.getEditor("EDC_REQ_IN_DATE").option('disabled', orgData.EDC_REQ_KIJUN == '1' ? true:false);
						}else{//고정인경우.
							e.component.getEditor("EDC_REQ_IN_FIX_DATE").option('disabled', orgData.EDC_REQ_KIJUN == '1' ? true: false);
						}
					}else{
						if(orgData.EDC_REQ_DATE_TYPE=="0"){ //기간설정
							e.component.getEditor("EDC_REQ_IN_DATE").option('disabled', true);
						}else{
							e.component.getEditor("EDC_REQ_IN_FIX_DATE").option('disabled', true);
						}
					}*/
					//대기신청정원수 설정 
					if(orgData.EDC_REQ_TYPE=='1' || orgData.EDC_REQ_TYPE=='3'){
						e.component.getEditor("EDC_REQ_WAIT_CAPA").option('disabled',orgData.EDC_REQ_WAIT_CAPA_YN=='0'? true:false); //대기신청정원수
					}
					
					//접수기간 설정방법   //접수방식 설정방법
					var EDC_REQ_DATE_TYPE = orgData.EDC_REQ_DATE_TYPE;
					var EDC_REQ_IN_YN= orgData.EDC_REQ_IN_YN;
						
					if(EDC_REQ_DATE_TYPE =='0'){//접수기간 설정방법(기간)
						e.component.getEditor("EDC_REQ_IN_DATE").option('disabled',(bDisabled || EDC_REQ_IN_YN=="0")? true:false); //관내우선접수 설정안함+직접입력	
					}else{
						e.component.getEditor("EDC_REQ_IN_FIX_DATE").option('disabled',(bDisabled || EDC_REQ_IN_YN=="0") ? true:false);//관내우선접수 설정+매월고정
					}
				}
				e.component.on("contentReady", customHandlerInit);
			},
			onFieldDataChanged: function (e) {
				e.component.beginUpdate();
				var orgData = e.component.option("formData");
				if(e.dataField=='EDC_REQ_TYPE' ){ //접수방식 설정방법
					var bAssType = e.component.itemOption("EDC_REQ_ASS_TYPE").visible;//선착순접수자승인방법
					if(bAssType && !(e.value=='0' || e.value=='1')){
						e.component.itemOption("EDC_REQ_ASS_TYPE",'visible',false);
					}
					if(!bAssType && e.value=='0' || e.value=='1'){//선착순/선착순(대기)
						e.component.itemOption("EDC_REQ_ASS_TYPE",'visible',true);
					}
					
					

					e.component.itemOption("empty_item",'visible',e.value=='2' ? false:true);
					if(e.value=='0'){//선착순
						e.component.itemOption("empty_item",'colSpan',9);
					}else if(e.value=='1'){//선착순(대기)
						e.component.itemOption("empty_item",'colSpan',4);
					}else if(e.value=='3'){//대기(기간수료)
						e.component.itemOption("empty_item",'colSpan',7);
					}
					var bWaitType = e.component.itemOption("EDC_REQ_WAIT_CAPA_YN").visible;
					if(bWaitType){
						//대기(추첨)인경우,visible:false
						if(!(e.value=='1' || e.value=='3')){
							e.component.itemOption("EDC_REQ_WAIT_CAPA_YN",'visible',false);//대기신청정원수 설정
							e.component.itemOption("EDC_REQ_WAIT_CAPA",'visible',false);//대기신청정원수
						}
					}
					if(!bWaitType && e.value=='1' || e.value=='3'){//선착순(대기)/대기(기간수료)
						e.component.itemOption("EDC_REQ_WAIT_CAPA_YN",'visible',true);//신청쉬소시대기자선정방법
						e.component.itemOption("EDC_REQ_WAIT_CAPA",'visible',true);//대기신청정원수
					}
					
					
					var bPayLimit = e.component.itemOption("paylimit").visible;//결제마감
					if(bPayLimit && e.value=='3'){
							e.component.itemOption("paylimit",'visible',false);
					}
					if(!bPayLimit && e.value!='3'){
						e.component.itemOption("paylimit",'visible',true);
					}
					//대기(기간수료)
					var bTermLimit = e.component.itemOption("termlimit1").visible;//기간수료
					if(bTermLimit && e.value!='3'){
							e.component.itemOption("termlimit1",'visible',false);//
							e.component.itemOption("termlimit2",'visible',false);//
					}
					if(!bTermLimit &&e.value=='3'){//대기 기간 수료 배정/결제마감
						e.component.itemOption("termlimit1",'visible',true);
						e.component.itemOption("termlimit2",'visible',true);
					}
				}
				if(e.dataField=='EDC_REQ_DATE_TYPE' ){ //접수기간 설정방법
					var bVisible=true;
					if(e.value=='1'){//매월고정
				 		bVisible = false;
				 	}
					e.component.itemOption("EDC_REQ_FIX_SDATE",'visible',!bVisible);
					e.component.itemOption("EDC_REQ_FIX_EDATE",'visible',!bVisible);
					e.component.itemOption("EDC_REQ_SDATE",'visible',bVisible);
					e.component.itemOption("EDC_REQ_EDATE",'visible',bVisible);
					
					e.component.itemOption("EDC_REQ_IN_DATE",'visible',bVisible);
					e.component.itemOption("EDC_REQ_IN_FIX_DATE",'visible',!bVisible);
					
				}
				if(e.dataField=='EDC_REQ_IN_YN' ){ //관내 우선 접수 설정
					if(e.value=='1'){//설정함
						if(orgData.EDC_REQ_DATE_TYPE=="0"){ //기간설정
							e.component.getEditor("EDC_REQ_IN_DATE").option('disabled', false);
							/*if(!orgData.EDC_REQ_IN_DATE){
								editor1.option('value', orgData.EDC_REQ_SDATE);
								editor1.option('min', orgData.EDC_REQ_SDATE);
								editor1.option('max', orgData.EDC_REQ_EDATE);
							}*/
						}else{//고정인경우.
							e.component.getEditor("EDC_REQ_IN_FIX_DATE").option('disabled', false);
						}
					}else{
						if(orgData.EDC_REQ_DATE_TYPE=="0"){ //기간설정
							e.component.getEditor("EDC_REQ_IN_DATE").option('disabled', true);
						}else{
							e.component.getEditor("EDC_REQ_IN_FIX_DATE").option('disabled', true);
						}
					}
				}
				if(e.dataField=='EDC_REQ_WAIT_CAPA_YN'){ ////대기신청정원수 설정
					e.component.getEditor("EDC_REQ_WAIT_CAPA").option('disabled',e.value=='0'? true:false); //대기신청정원수
				}
				if(e.dataField=='EDC_REQ_PAYLIMIT_TYPE'){ //결제마감설정기준
					if(e.value=='0' || e.value=='1' ){
						 e.component.itemOption("paylimit.EDC_REQ_PAYLIMIT_HOUR",'visible',true);
						 e.component.itemOption("paylimit.EDC_REQ_PAYLIMIT_MINUTE",'visible',true);
						 e.component.itemOption("paylimit.EDC_REQ_PAYLIMIT_DATETIME",'visible',false);
						 
					}else {
						 e.component.itemOption("paylimit.EDC_REQ_PAYLIMIT_HOUR",'visible',false);
						 e.component.itemOption("paylimit.EDC_REQ_PAYLIMIT_MINUTE",'visible',false);
						 e.component.itemOption("paylimit.EDC_REQ_PAYLIMIT_DATETIME",'visible',true);
					}
				}
				//접수방식 대기(추첨) 항목
				if(e.dataField=='EDC_REQ_TYPE' || e.dataField=='EDC_CHUCHUM_TYPE'){
					var edcReqType='0';
					var edcChuchumType='M';
					if(e.dataField=='EDC_REQ_TYPE'){
						edcReqType = e.value;
						edcChuchumType = orgData.EDC_CHUCHUM_TYPE;
					}
					if(e.dataField=='EDC_CHUCHUM_TYPE'){
						edcChuchumType = e.value;
						edcReqType = orgData.EDC_REQ_TYPE;
					}
					
					var bchuchum = e.component.itemOption("EDC_CHUCHUM_TYPE").visible;
					if(bchuchum && edcReqType !='2'){
						e.component.itemOption("EDC_CHUCHUM_TYPE",'visible',false);//추첨자동/수동설정
						e.component.itemOption("EDC_CHUCHUM_OPEN_DT",'visible',false);//추첨발표일
						e.component.itemOption("empty_chuhum",'visible',false);//수동/빈항목
						e.component.itemOption("EDC_CHUCHUM_DAY_TYPE",'visible',false);//접수종료일기준(D-DAY)/일자설정(S)
						e.component.itemOption("EDC_CHUCHUM_DDAY",'visible',false);//DDAY
						e.component.itemOption("EDC_CHUCHUM_DATE",'visible',false);//일자설정(직접설정) 추첨 지정일	
						e.component.itemOption("EDC_CHUCHUM_FIX_DDAY",'visible',false);//일자설정(매월고정) 추첨 지정일
						e.component.itemOption("EDC_CHUCHUM_TIME",'visible',false);//일자설정(매월고정) 추첨 지정일
						e.component.itemOption("optCuchum",'visible',false);//추첨 설정
					}
					if(edcReqType=='2'){
						var bAuto=false;
						if(edcChuchumType =='A'){ //자동
							bAuto=true;
						}
						e.component.itemOption("EDC_CHUCHUM_TYPE",'visible',true);//추첨자동/수동설정
						e.component.itemOption("EDC_CHUCHUM_OPEN_DT",'visible',!bAuto);//추첨발표일
						e.component.itemOption("empty_chuhum",'visible',!bAuto);//수동/빈항목
						e.component.itemOption("EDC_CHUCHUM_DAY_TYPE",'visible',bAuto);//접수종료일기준(D-DAY)/일자설정(S)
						
						e.component.itemOption("EDC_CHUCHUM_DDAY",'visible',bAuto && orgData.EDC_CHUCHUM_DAY_TYPE=='D'? true:false);//DDAY	
						e.component.itemOption("EDC_CHUCHUM_DATE",'visible',bAuto && orgData.EDC_CHUCHUM_DAY_TYPE=='S' && orgData.EDC_REQ_DATE_TYPE=='0'? true:false);//DDAY//일자설정(직접설정) 추첨 지정일
						e.component.itemOption("EDC_CHUCHUM_FIX_DDAY",'visible',bAuto&& orgData.EDC_CHUCHUM_DAY_TYPE=='S' && orgData.EDC_REQ_DATE_TYPE=='1');//일자설정(매월고정) 추첨 지정일	
						e.component.itemOption("EDC_CHUCHUM_TIME",'visible',bAuto);//일자설정(매월고정) 추첨 지정일
						e.component.itemOption("optCuchum",'visible',bAuto);//일자설정(매월고정) 추첨 지정일
					}
					
	    		}
				if(e.dataField=='EDC_CHUCHUM_DAY_TYPE'){
					e.component.itemOption("EDC_CHUCHUM_DDAY",'visible',orgData.EDC_CHUCHUM_TYPE=='A' && e.value=='D'? true:false);//DDAY	
					e.component.itemOption("EDC_CHUCHUM_DATE",'visible',orgData.EDC_CHUCHUM_TYPE=='A' && e.value=='S' && orgData.EDC_REQ_DATE_TYPE=='0'? true:false);//DDAY//일자설정(직접설정) 추첨 지정일
					e.component.itemOption("EDC_CHUCHUM_FIX_DDAY",'visible',orgData.EDC_CHUCHUM_TYPE=='A'&& e.value=='S' && orgData.EDC_REQ_DATE_TYPE=='1');//일자설정(매월고정) 추첨 지정일	
				
				}
				e.component.endUpdate();
			
			}	
		}).dxForm("instance");			
	}else if( itemID == 'item3' ){
		if(tabForm3 !=null){
			if(tabForm3Repaint) {
				tabForm3.repaint();
			}
			return;
		}
		tabForm3Repaint=false;
		
		tabForm3 = $('#tab1_contents3').dxForm({
			showColonAfterLabel: false,
			colCount:10,
			formData: formData1,
			items: createTab1Items(itemID),
			onInitialized: function(e) {
				//console.log("form3-onInitialized");
				var customHandlerInit = function (e) {
					//if(e.component == null) return;
					//console.log("form3 custom contentReady");
					var orgData = e.component.option("formData");
					//기존회원접수기준
					var bDisabled = (orgData.EDC_EXIST_TYPE=='0') ? true:false;
					e.component.getEditor("EDC_EXIST_DATE_TYPE").option('disabled',  orgData.EDC_REQ_KIJUN == '1' ? true:bDisabled);
					if(orgData.EDC_EXIST_DATE_TYPE=='0'){
						//수시인 경우.
						e.component.getEditor("EDC_EXIST_SDATE").option('disabled', orgData.EDC_REQ_KIJUN == '1' ?true :bDisabled);
						e.component.getEditor("EDC_EXIST_EDATE").option('disabled', orgData.EDC_REQ_KIJUN == '1' ?true :bDisabled);
					}else{
						e.component.getEditor("EDC_EXIST_FIX_SDATE").option('disabled', orgData.EDC_REQ_KIJUN == '1' ?true :bDisabled);
						e.component.getEditor("EDC_EXIST_FIX_EDATE").option('disabled', orgData.EDC_REQ_KIJUN == '1' ?true :bDisabled);
					}
					e.component.getEditor("EDC_EXIST_STIME").option('disabled', bDisabled);
					e.component.getEditor("EDC_EXIST_ETIME").option('disabled', bDisabled);
					e.component.getEditor("EDC_EXIST_TIME_TYPE").option('disabled', bDisabled);
					e.component.getEditor("EDC_EXIST_MONTH_YN").option('disabled', bDisabled);
					if(orgData.EDC_EXIST_MONTH_YN=='0'){
						e.component.getEditor("EDC_EXIST_MONTH").option('disabled', true);
					}else{
						e.component.getEditor("EDC_EXIST_MONTH").option('disabled', bDisabled);
					}
					
					
					e.component.getEditor("EDC_EXIST_PAYLIMIT_TYPE").option('disabled', bDisabled);
					if(orgData.EDC_EXIST_PAYLIMIT_TYPE=='0' || orgData.EDC_EXIST_PAYLIMIT_TYPE=='1' ){
						e.component.getEditor("EDC_EXIST_PAYLIMIT_HOUR").option('disabled', bDisabled);
						e.component.getEditor("EDC_EXIST_PAYLIMIT_MINUTE").option('disabled', bDisabled);
					}else{
						e.component.getEditor("EDC_EXIST_PAYLIMIT_DATETIME").option('disabled', bDisabled);
					}
					
					//기존회원 접수제한 설정 //이용 개월수
					e.component.getEditor("EDC_EXIST_MONTH").option('disabled',orgData.EDC_EXIST_MONTH_YN=='0'? true:false); 
					//기존회원접수기준
					if(tabForm3Repaint)	tabForm3Repaint=false;
				}
				e.component.on("contentReady", customHandlerInit);
			},
			onFieldDataChanged: function (e) {
				//console.log("form3 onFieldDataChanged");
				if(e.dataField=='EDC_EXIST_TYPE'){ //결제마감설정기준
					e.component.repaint();
				}
				
				//var orgData = e.component.option("formData");
				e.component.beginUpdate();
				if(e.dataField=='EDC_EXIST_PAYLIMIT_TYPE'){ //결제마감설정기준
					if(e.value=='0' || e.value=='1' ){
						 e.component.itemOption("paylimitExist.EDC_EXIST_PAYLIMIT_HOUR",'visible',true);
						 e.component.itemOption("paylimitExist.EDC_EXIST_PAYLIMIT_MINUTE",'visible',true);
						 e.component.itemOption("paylimitExist.EDC_EXIST_PAYLIMIT_DATETIME",'visible',false);
					}else {
						 e.component.itemOption("paylimitExist.EDC_EXIST_PAYLIMIT_HOUR",'visible',false);
						 e.component.itemOption("paylimitExist.EDC_EXIST_PAYLIMIT_MINUTE",'visible',false);
						 e.component.itemOption("paylimitExist.EDC_EXIST_PAYLIMIT_DATETIME",'visible',true);
					}
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
				if(e.dataField=='EDC_EXIST_MONTH_YN'){ //기존회원 접수제한 설정
					e.component.getEditor("EDC_EXIST_MONTH").option('disabled',e.value=='0'? true:false); //이용 개월수
				}
			}
			
		}).dxForm("instance");		
	}
}

function createTab1Items(itemID){
	var resultItems=[];
	if( itemID == 'item1' ){ 
		resultItems=[
			{dataField:'EDC_REQ_KIJUN' ,label: {text:'정기접수운영기준'},editorType: 'dxSelectBox',
				editorOptions: {
					dataSource:recv_gbn,
					valueExpr: 'value',displayExpr: 'text',
				},
			},
			{dataField:'EDC_REQ_PATH',label:{text:'접수경로'},editorType: 'dxSelectBox',
				editorOptions: {
		    		dataSource:req_path_gbn,
		    		valueExpr: 'value',
		    		displayExpr: 'text',
		    	}
			},
			{itemType: 'button',
			      horizontalAlignment: 'right',
			      buttonOptions: {
			        text: '저장하기',
			        type: 'success',
			        useSubmitBehavior: true,
			        onClick(){
			        	var tabOptForm= $("#tab1_contents1").dxForm('instance'); 
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
			        }
			      },
			},
			//정기접수운영기준 end
			{dataField:'EDC_PNCPA',label: {text: '총정원',},editorType:'dxNumberBox',
				editorOptions:{
					showSpinButtons: true,
					format: "#,##0 명",
					min:1,
					max:10000,
					step:10,
				},
				validationRules: [{type: "required",message: "총정원 필수 입력"}]
			},
			{itemType:'empty',colSpan:2,},
			{dataField:'EDC_PNCPA_YN',label: {text:'온라인/방문 정원'},editorType: 'dxSelectBox',
				 editorOptions: {
					 dataSource:recvcapa_gbn,
					 valueExpr: 'value', 
					 displayExpr: 'text',
					 
				 },
			 }, 
			 {itemType:'group',colCount:2,
					items:[
						{dataField:'EDC_ONCPA',label:{text:"온라인"},editorType:'dxNumberBox'
							,editorOptions:{
								showSpinButtons: true,
								format: "#,##0 명"
							},
						},
						{dataField:'EDC_VNCPA',label:{text:"방문"},
							editorType:'dxNumberBox',
							editorOptions:{
								showSpinButtons: true,
								format: "#,##0 명"
							},
						},
					]
			 },
			 {itemType:'empty'},
			 {dataField:'EDC_REQ_WAIT_TYPE', label:{text:'신청쉬소시대기자선정방법'},
			    	//visible:formData1.EDC_REQ_TYPE=='1'|| formData1.EDC_REQ_TYPE=='3'? true:false,
			    	editorType: 'dxSelectBox',
			    	editorOptions: {dataSource:wait_ass_gbn,valueExpr: 'value',displayExpr: 'text',},
			 },
			 {itemType:'empty',colSpan:2,name:'empty_waittype'
				 //visible:formData1.EDC_REQ_TYPE=='1'|| formData1.EDC_REQ_TYPE=='3'? true:false,
			 },
			//접수,경로group
			 {dataField:'EDC_ADDREQ_YN',label: {text:'추가접수운영기준'},editorType: 'dxSelectBox',
				 editorOptions: {
					 dataSource:run_gbn,
					 valueExpr: 'value',
					 displayExpr: 'text',
				},
			 }, 
			 {dataField:'EDC_ADDREQ_START',label: {text:'추가접수강좌시작일설정'},editorType: 'dxSelectBox',
				 editorOptions: {
					 dataSource:addRecv_gbn,
					 valueExpr: 'value', 
					 displayExpr: 'text',
					 
				 },
			 }, 
			 {itemType:'empty'},
			 {colSpan:2,dataField:'EDC_ADDREQ_PAY',label: {text:'추가접수강좌료산출'},editorType: 'dxSelectBox',
					editorOptions: {
						dataSource:addFee_gbn,
						valueExpr: 'value',
						displayExpr: 'text',
					},
			 },
			//추가접수 운영group
		];
	}else if (itemID == 'item2') {
		//12
		resultItems=[
			{colSpan:3,dataField:'EDC_REQ_TYPE',label: {text:'접수방식'},editorType: 'dxSelectBox',
				editorOptions: {
					dataSource:recvType_gbn,
					valueExpr: 'value',
					displayExpr: 'text',
				},
			}, //접수방식
			{colSpan:7,dataField:'EDC_REQ_TEXT',label:{text:'접수방식안내문구'},editorType: 'dxTextBox',},//--
			{itemType: 'empty'},
			{itemType: 'button',
				buttonOptions: {
					text: '저장하기',
					type: 'success',
					useSubmitBehavior: true,
				},
			},
			{colSpan:3,dataField:'EDC_REQ_DATE_TYPE' , label: {text:'접수기간설정방법'},editorType: 'dxSelectBox',
				editorOptions: {
					dataSource:recvterm_gbn,
					valueExpr: 'value',
					displayExpr: 'text',
					
				
				}
			}, //접수기간설정방법,
			{colSpan:7,dataField:'EDC_REQ_COUNT_TEXT',label:{text:'모집차수명'},editorType: 'dxTextBox',
				editorOptions:{
					buttons: [
						{name: 'searchInstructor',location: 'after',
							options: {text:'신규모집',type: 'default',
								onClick() {
									DevExpress.ui.notify('신규모집처리');},
								},
							},
					],//buttons end
				}
			},
			{colSpan:2,itemType: 'empty'},
			{colSpan:3,dataField:'EDC_REQ_SDATE',label: {text:'접수시작일'},
				visible:formData1.EDC_REQ_DATE_TYPE=='1'?false:true,
    			editorType:'dxDateBox',editorOptions:{
    				displayFormat: 'yyyy-MM-dd'}
	    	}, //접수기간 
	    	{colSpan:3,dataField:'EDC_REQ_EDATE',label: {text:'접수종료일'},
	    		visible:formData1.EDC_REQ_DATE_TYPE=='1'?false:true,
	    		editorType: "dxDateBox",
	    		editorOptions: {displayFormat: 'yyyy-MM-dd'} 
	    	}, //접수기간
	    	//매월 고정인 경우.
	    	{colSpan:3,dataField:'EDC_REQ_FIX_SDATE',visible:false,label: {text:'접수시작일'},
	    		visible:formData1.EDC_REQ_DATE_TYPE=='1'?true:false,
	    		editorType: 'dxSelectBox',
	    		editorOptions: {items:dateItems_gbn,valueExpr: 'value',displayExpr:'text',},
	    	},
	    	{colSpan:3,dataField:'EDC_REQ_FIX_EDATE',visible:false,label: {text:'접수종료일'},
	    		visible:formData1.EDC_REQ_DATE_TYPE=='1'?true:false,
	    		editorType: 'dxSelectBox',
	    		editorOptions: {dataSource:dateItems_gbn,valueExpr: 'value',displayExpr:'text',},
	    	},
	    	{colSpan:3,dataField:'EDC_REQ_IN_YN',label: {text:'관내회원우선접수기간'},editorType: 'dxSelectBox',
	    		editorOptions: {dataSource:set_gbn,valueExpr: 'value',displayExpr: 'text',}
			},
			{colSpan:3,dataField:'EDC_REQ_IN_DATE',label: {text:'접수시작일부터'},editorType:'dxDateBox',
				visible:formData1.EDC_REQ_DATE_TYPE=='0'? true:false,
				editorOptions:{pickerType: 'list',displayFormat: 'yyyy-MM-dd 까지'}
			},
			{colSpan:3,dataField:'EDC_REQ_IN_FIX_DATE',visible:false,label: {text:'접수시작일부터'},
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
		    {colSpan:3,dataField:'EDC_REQ_IN_STIME',label: {text:'접수시작시간'},editorType:'dxDateBox',
				editorOptions:{
					pickerType: 'list',
					type: 'time',
					interval: 10,
					displayFormat: 'HH:mm',
				}
			}, 
			{colSpan:3,dataField:'EDC_REQ_IN_ETIME',label: {text:'접수종료시간'},editorType:'dxDateBox',
				editorOptions:{
					pickerType: 'list',
					type: 'time',
					interval: 10,
					displayFormat: 'HH:mm',
				}
			}, 
	    	{colSpan:5,dataField:'EDC_REQ_TIME_TYPE',label: {text:'접수시간운영방법'},editorType: 'dxSelectBox',
				editorOptions: {dataSource:recvtime_gbn,valueExpr: 'value',displayExpr: 'text',},
	    	}, 
		    {itemType:'empty'},	
		    {colSpan:3,dataField:'EDC_REQ_ASS_TYPE', label:{text:'선착순접수자승인방법'},editorType: 'dxSelectBox',
		    	visible:formData1.EDC_REQ_TYPE=='0' || formData1.EDC_REQ_TYPE=='1'? true:false,
		    	editorOptions: {dataSource:Approval_gbn,valueExpr: 'value',displayExpr: 'text',},
		    }, 
		    {colSpan:3,dataField:'EDC_REQ_WAIT_CAPA_YN', label:{text:'대기신청정원설정'},
		    	visible:formData1.EDC_REQ_TYPE=='1'|| formData1.EDC_REQ_TYPE=='3'? true:false,
		    	editorType: 'dxSelectBox',
		    	editorOptions: {dataSource:set_gbn,valueExpr: 'value',displayExpr: 'text',},
		    }, 
		    {colSpan:2,dataField:'EDC_REQ_WAIT_CAPA', label:{visible:false},
		    	visible:formData1.EDC_REQ_TYPE=='1'|| formData1.EDC_REQ_TYPE=='3'? true:false,
		    	editorType:'dxNumberBox',
				editorOptions:{
					showSpinButtons: true,
					format: "#,##0 명"
				},
		    }, 
		    {colSpan:formData1.EDC_REQ_TYPE=='0'? 9:(formData1.EDC_REQ_TYPE=='3'? 7:4),
		    		name:'empty_item',visible:formData1.EDC_REQ_TYPE!='2'? true:false,itemType:'empty'},

		    {colSpan:3,dataField:'EDC_CHUCHUM_TYPE',label:{text:'추첨스케줄설정'},
		    	visible:formData1.EDC_REQ_TYPE=='2'? true:false,
		    	editorType: 'dxSelectBox',
    			editorOptions: {dataSource:choiceSchedule_gbn,valueExpr: 'value',displayExpr: 'text'},
    		},	//추첨자동/수동설정
    		//--수동인경우.
    		{colSpan:3,dataField:'EDC_CHUCHUM_OPEN_DT',label:{text:'추첨발표일'},
    			visible:formData1.EDC_REQ_TYPE=='2' && formData1.EDC_CHUCHUM_TYPE=='M' ? true:false,
    			editorType: 'dxDateBox',
    			editorOptions: {displayFormat: 'yyyy-MM-dd'},
    		},
    		{colSpan:6,itemType:'empty',name:'empty_chuhum',
    			visible:formData1.EDC_REQ_TYPE=='2'&& formData1.EDC_CHUCHUM_TYPE=='M' ? true:false,
    		},
    		//---
    		{colSpan:3,dataField:'EDC_CHUCHUM_DAY_TYPE',label:{visible:false},editorType: 'dxSelectBox',
    			visible:formData1.EDC_REQ_TYPE=='2'&& formData1.EDC_CHUCHUM_TYPE=='A' ? true:false,
    			editorOptions: {dataSource:choiceScheduleDateType_gbn,valueExpr: 'value',displayExpr: 'text'},
    		},//접수종료일기준(D-DAY)/일자설정(S)
    		{colSpan:2,dataField: "EDC_CHUCHUM_DDAY", label: {visible: false},
    			visible:formData1.EDC_REQ_TYPE=='2'&& formData1.EDC_CHUCHUM_TYPE=='A' && formData1.EDC_CHUCHUM_DAY_TYPE=='D'? true:false,
    			editorType: "dxSelectBox",
    			editorOptions: {dataSource:choiceScheduleDDay_gbn,valueExpr: 'value',displayExpr: 'text'},
			},
			{colSpan:2,dataField:'EDC_CHUCHUM_DATE',label:{visible:false},
				visible:formData1.EDC_REQ_TYPE=='2'&& formData1.EDC_CHUCHUM_TYPE=='A' && formData1.EDC_CHUCHUM_DAY_TYPE=='S' && formData1.EDC_REQ_DATE_TYPE=='0'? true:false,
				editorType: 'dxDateBox',
				editorOptions: {displayFormat: 'yyyy-MM-dd'},
    		},	//일자설정(직접설정) 추첨 지정일
    		{colSpan:3,dataField:'EDC_CHUCHUM_FIX_DDAY',label:{visible:false},
    			visible:formData1.EDC_REQ_TYPE=='2'&& formData1.EDC_CHUCHUM_TYPE=='A' && formData1.EDC_CHUCHUM_DAY_TYPE=='S' && formData1.EDC_REQ_DATE_TYPE=='1'? true:false,
    	    	editorType: 'dxSelectBox',
    	    	editorOptions: {items:dateItems_gbn,valueExpr: 'value',displayExpr:'text',},
    		},	//일자설정(매월고정) 추첨 지정일
			{colSpan:2,dataField:'EDC_CHUCHUM_TIME',label: {visible:false},
    			visible:formData1.EDC_REQ_TYPE=='2'&& formData1.EDC_CHUCHUM_TYPE=='A' ? true:false,
    			editorType:'dxDateBox',
				editorOptions:{
					pickerType: 'list',
					type: 'time',
					interval: 10,
					displayFormat: 'HH:mm',
				}
			},
			{colSpan:2,itemType: 'button',name:'optCuchum',
				visible:formData1.EDC_REQ_TYPE=='2'&& formData1.EDC_CHUCHUM_TYPE=='A' ? true:false,
			    buttonOptions: {
			        text: '옵션설정',
			        type: 'default',
			        onClick(e){
			        	createDrawExecute();
			        }
			    },
			},
		    {
		    	itemType: 'group',colSpan:12,colCount:10,name:'paylimit',
		    	visible: formData1.EDC_REQ_TYPE=='3'? false: true,
		    	caption: '',
		    	items: [ 
		    		{colSpan:3,dataField:'EDC_REQ_PAYLIMIT_TYPE',label:{text:'결제마감설정기준'},editorType: 'dxSelectBox',
		    			editorOptions: {dataSource:payFinal_gbn,valueExpr: 'value',displayExpr: 'text'},
		    		},
		    		{colSpan:2,dataField:'EDC_REQ_PAYLIMIT_HOUR',label:{location:'right',text:'시'},
		    			visible:formData1.EDC_REQ_PAYLIMIT_TYPE=='0' ||formData1.EDC_REQ_PAYLIMIT_TYPE=='1' ? true:false,
		    			editorType:'dxNumberBox',
		    			editorOptions:{
		    				min:0,
		    				step:1,
		    				showSpinButtons: true,
		    			},
		    		},
		    		{colSpan:3,dataField:'EDC_REQ_PAYLIMIT_MINUTE',label:{location:'right',text:'분 이후 결제자동 취소'},
		    			visible:formData1.EDC_REQ_PAYLIMIT_TYPE=='0' ||formData1.EDC_REQ_PAYLIMIT_TYPE=='1' ? true:false,
		    			editorType:'dxNumberBox',
		    			editorOptions:{
		    				min:0,
		    				step:10,
		    				showSpinButtons: true,
		    			},
		    		},	
		    		{colSpan:3,dataField:'EDC_REQ_PAYLIMIT_DATETIME',label:{location:'right',text:'이후 결제자동 취소'},
		    			visible:formData1.EDC_REQ_PAYLIMIT_TYPE=='2'?true:false,
		    			editorType:'dxDateBox',
		    			editorOptions: {
                             type: 'datetime',
                             displayFormat: 'yyyy-MM-dd HH:mm',
                             showAnalogClock: false,
                         },
		    		}
		    	],
		    },//결제마감group
		    {
		    	itemType: 'group',colSpan:6,colCount:3,name:'termlimit1',
		    	visible:formData1.EDC_REQ_TYPE=='3' ? true:false,
		    	caption: '기간수료1차',
		    	items: [ 
		    		{colSpan:2,dataField:'EDC_REQ_TERM_AUTO_DAY',label:{text:'대기자자동배정일시'},editorType: 'dxSelectBox',
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
					
					{colSpan:2,dataField:'EDC_REQ_TERMPAU_LIMT_DAY',label:{text:'결제마감일시'},editorType: 'dxSelectBox',
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
					
		    	],
		    },
		    {
		    	itemType: 'group',colSpan:6,colCount:3,name:'termlimit2',
		    	visible:formData1.EDC_REQ_TYPE=='3' ? true:false,
		    	caption: '기간수료2차',
		    	items: [ 
		    		{colSpan:2,dataField:'EDC_REQ_TERM_AUTO_DAY',label:{text:'대기자자동배정일시'},editorType: 'dxSelectBox',
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
					{colSpan:2,dataField:'EDC_REQ_TERMPAU_LIMT_DAY',label:{text:'결제마감일시'},editorType: 'dxSelectBox',
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
		    	],
		    },
		];
			
	}else if (itemID == 'item3') {//4
		const now = new Date();
		
		resultItems=[
			{colSpan:3,dataField:'EDC_EXIST_TYPE', label: {text:'기존회원접수기준'},editorType: 'dxSelectBox',
				editorOptions: {
					dataSource:newrecvType_gbn,
					valueExpr: 'value',
					displayExpr: 'text',
				},
			}, 
			{colSpan:6,itemType:'empty'},
			{
				itemType: 'button',
				buttonOptions: {
					text: '저장하기',
					type: 'success',
			        useSubmitBehavior: true,
				},
			},
			{colSpan:3,dataField:'EDC_EXIST_DATE_TYPE',label:{text:'접수기간설정방법'},editorType: 'dxSelectBox',
				editorOptions: {
					dataSource:recvterm_gbn,
					valueExpr: 'value',
					displayExpr: 'text',
				},
			}, //--e
			{colSpan:7,itemType:'empty'},
			{colSpan:3,dataField:'EDC_EXIST_SDATE',label: {text:'접수시작일'},editorType:'dxDateBox',
				visible:formData1.EDC_EXIST_DATE_TYPE=='0'? true:false,
				editorOptions:{
					displayFormat: 'yyyy-MM-dd',
				}
			},  
			{colSpan:3,dataField:'EDC_EXIST_EDATE',label: {text:'접수종료일'},editorType:'dxDateBox',
				visible:formData1.EDC_EXIST_DATE_TYPE=='0'? true:false,
				editorOptions:{
					displayFormat: 'yyyy-MM-dd',
				}
			}, 
			{colSpan:3,dataField:'EDC_EXIST_FIX_SDATE',label: {text:'접수시작일'},
				visible:formData1.EDC_EXIST_DATE_TYPE=='1'? true:false,
				editorType: 'dxSelectBox',
			    editorOptions: {
			    	dataSource:dateItems_gbn,
			    	valueExpr: 'value',
			    	displayExpr:'text',
			    },
			},  
			{colSpan:3,dataField:'EDC_EXIST_FIX_EDATE',label: {text:'접수종료일'},
				visible:formData1.EDC_EXIST_DATE_TYPE=='1'? true:false,
				editorType: 'dxSelectBox',
				editorOptions: {
					dataSource:dateItems_gbn,
					valueExpr: 'value',
					displayExpr:'text',
				},
			},
			{colSpan:4,itemType:'empty',},
			{colSpan:3,dataField:'EDC_EXIST_STIME',label: {text:'접수시작시간'},editorType:'dxDateBox',
				editorOptions:{
					pickerType: 'list',
					type: 'time',
					interval: 10,
					displayFormat: 'HH:mm',
				}
			},
			{colSpan:3,dataField:'EDC_EXIST_ETIME',label: {text:'접수종료시간'},editorType:'dxDateBox',
				editorOptions:{
					pickerType: 'list',
					type: 'time',
					interval: 10,
					displayFormat: 'HH:mm',
				}
			},
			{colSpan:3,dataField:'EDC_EXIST_TIME_TYPE',label: {text:'접수시간운영방법'},editorType: 'dxSelectBox',
				editorOptions: {
					dataSource:recvtime_gbn,
					valueExpr: 'value',
					displayExpr: 'text',
				},
			}, 
			{itemType:'empty',},
			{colSpan:3,dataField:'EDC_EXIST_MONTH_YN',label:{text:'기존회원 접수제한 설정'},editorType: 'dxSelectBox',
				editorOptions: {
					dataSource:set_gbn,
					valueExpr: 'value',
					displayExpr: 'text',
				},
			},
			{colSpan:3,dataField:'EDC_EXIST_MONTH',label:{text:'접수제한 이용 개월수'},editorType: 'dxSelectBox',
				editorOptions: {			    					  
					items: useMonth_gbn,
				},
			}, // end
			/*{colSpan:2,label:{visible:false},cssClass:'paddingTop-15',template:'(0은 재접수 제한 없음)'},*/
			//선착순접수자승인방법 end
			{colSpan:4,itemType:'empty'},
			{
		    	itemType: 'group',colSpan:10,colCount:10,name:'paylimitExist',
		    	visible: formData1.EDC_REQ_TYPE=='3'? false: true,
		    	caption: '',
		    	items: [ 
		    		{colSpan:3,dataField:'EDC_EXIST_PAYLIMIT_TYPE',label:{text:'결제마감설정기준'},editorType: 'dxSelectBox',
		    			editorOptions: {
		    				dataSource:payFinal_gbn,
		    				valueExpr: 'value',
		    				displayExpr: 'text'
		    			},
		    		},
		    		{colSpan:2,dataField:'EDC_EXIST_PAYLIMIT_HOUR',label:{location:'right',text:'시'},
		    			visible:formData1.EDC_EXIST_PAYLIMIT_TYPE=='0' ||formData1.EDC_EXIST_PAYLIMIT_TYPE=='1' ? true:false,
		    			editorType:'dxNumberBox',
		    			editorOptions:{
		    				min:0,
		    				step:1,
		    				showSpinButtons: true,
		    			},
		    		},	
		    		{colSpan:3,dataField:'EDC_EXIST_PAYLIMIT_MINUTE',label:{location:'right',text:'분 이후 결제자동 취소'},
		    			visible:formData1.EDC_EXIST_PAYLIMIT_TYPE=='0' ||formData1.EDC_EXIST_PAYLIMIT_TYPE=='1' ? true:false,
		    			editorType:'dxNumberBox',
		    			editorOptions:{
		    				min:0,
		    				step:10,
		    				showSpinButtons: true,
		    			},
		    		},	
		    		{colSpan:3,dataField:'EDC_EXIST_PAYLIMIT_DATETIME',label:{location:'right',text:'이후 결제자동 취소'},
		    			visible:formData1.EDC_EXIST_PAYLIMIT_TYPE=='2'?true:false,
		    			editorType:'dxDateBox',
		    			editorOptions: {
                            type: 'datetime',
                            displayFormat: 'yyyy-MM-dd HH:mm',
                            showAnalogClock: false,
		    			},
		    		}
		    	],
		    },//결제마감group
			];
	}
	return resultItems;
}
