<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<script>window.jQuery || document.write(decodeURIComponent('%3Cscript src="js/jquery.min.js"%3E%3C/script%3E'))</script>
<!-- <link rel="stylesheet" href="/fmcs/css/fmcs.css"> -->
<link rel="stylesheet" href="/fmcs/css/fmcs_edu.css">

<script src="/fmcs/js/default_data.js"></script>
<script src="/fmcs/js/operSetup/intrconSystem/intcon.js"></script>
<script src="/fmcs/js/operSetup/intrconSystem/tab/tab1_pisc.js"></script>
<script src="/fmcs/js/operSetup/intrconSystem/tab/tab2_sms.js"></script>
<script src="/fmcs/js/operSetup/intrconSystem/tab/tab3_pos.js"></script>
<script src="/fmcs/js/operSetup/intrconSystem/tab/tab4_nice.js"></script>
<script src="/fmcs/js/operSetup/intrconSystem/tab/tab5_weather.js"></script>
<script>
$(document).ready(function () {
	formInit();
});
</script>

<style>
/* .form-horizontal button.btn {
    white-space: nowrap;
}*/
.custom-tab button.btn {
    background: #fff;
    color: #161616;
}
.custom-tab button {
    font-size: 0.9rem;
}
.custom-tab button.selected-tab {
    background: #000;
    color: #fff;
} 
/*start-  */
.msg-template-list {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    margin-top: 5px;
}

.msg-template-content {
    cursor: pointer;
    width: 16%;
    vertical-align: top;
    border: 1px solid #ccc;
    border-radius: 8px;
    background: #fff;
    padding: 5px;
    margin: 0.2rem;
   /*  height: 110px; */

}
.msg-template-content:hover {
    background: #f6f6f6;

}
.msg-template-header {
    margin-bottom: 1px;
}
.msg-template-title {
    /* font-size: 1.2rem; */
    font-weight: 600;
}
.msg-template-header a{
	float:right;
}
.msg-template-type-kko{
	font-size: 0.7rem;
    color: #fff;
    background-color: #ff0000;
    border: 1px solid #EEEEEE;
    border-radius: 5px;
    padding: 0 3px;
}
.msg-template-type-sms{
	font-size: 0.7rem;
    color: #fff;
    background-color: #0000ff;
    border: 1px solid #EEEEEE;
    border-radius: 5px;
    padding: 0 3px;
}
.msg-template-body {
    text-align: center;
    margin-top: 0.5rem;
}
.msg-template-msg-cont{
	width:100%;
	height:300px;
	background-color: aliceblue;
	font-size: 0.9rem;
}
/*-end*/
</style>

  <div class="row row_title">
	<div class="col-12" style="height:30px;background:#022B70;height:48px;">
		<ul class="navbar-nav" style="color:white;flex-direction: row;display: flex;box-sizing: border-box;margin-top: 4px;">
 			<li class="nav-item d-sm-inline-block quick-nav" style="color:white;width:280px;font-size:1.1rem;">
		        연계시스템설정
		    </li>
		</ul>	
	</div>
</div>
<div id="edit-sms-template-popup"></div>

<div class="row">
 	<div class="col-12 padding-lr-0" >
		<div class="shadow_box">
			 <div id="scrolledtabs">
		        <div class="tabs-container"></div>
		      </div>
			 <div id="tab1"><!-- 비대면자격서비스연계-->
			 	<div class="row" style="padding-top:10px;">
		 		<div class="col-12">
 					<div id="formPisc" ></div>
 				</div>
 				</div>
 			 </div>
 			 <div id="tab2" style="display:none;"><!-- 알림(카카오톡,SMS) 연계 -->
			 	<!-- <div class="row form-horizontal" style="padding-top:10px;">
			 		<div class="col-12">
					 	<div class="form-group row custom-tab">
					    	<div class="col-4 div-btn">
					        	<button class="btn selected-tab">알림(카카오톡,SMS) 연계 정보</button>
					        </div>
					        <div class="col-4 div-btn">
					        	<button class="btn">메시지 자동발송 템플릿</button>
					        </div>
				        </div>
			        </div>
		        </div> -->
		        <div class="row form-horizontal custom-tab" style="padding-top:10px;">
			 		<div class="col-2 div-btn">
						<button class="btn selected-tab" onClick="smsChangeTab(this,0)">알림(카카오톡,SMS) 연계 정보</button>
					</div>
					<div class="col-2 div-btn">
					    <button class="btn" onClick="smsChangeTab(this,1)">메시지 자동발송 템플릿</button>
				    </div>
		        </div> 
		        <div class="row" style="padding-top:10px;">
		 		<div class="col-12">
 					<div id="formSms" ></div>
 					<div id="msgTemplateView">
 					<div id="msgTemplateToolbar" class="hs-box hs-holiday-day-toolbar" > </div>
 					<div id='msgTemplateList'></div>
 					</div>
 				</div>
 				</div>
			 </div>
			 <div id="tab3" style="display:none;"><!-- 결제서비스 운영설정 -->
			 	<div class="row" style="padding-top:10px;">
		 		<!-- <div class="col-7">운영상품분류별? 시설별 ?
 					<div id="gridComItemCtg" class="tree_normal"></div>
 				</div> -->
 				<div class="col-4">
 					<div id="posGrid"></div>
 				</div>
 				<div class="col-8">
 					<div id="formPos" ></div>
 				</div>
 				
 				</div>
 			 </div>	
 			  <div id="tab4" style="display:none;"><!-- 본인인증서비스연계설정 -->
			 	<div class="row" style="padding-top:10px;">
		 		<div class="col-12">
 					<div id="formNice" ></div>
 				</div>
 				</div>
 			 </div>
 			  <div id="tab5" style="display:none;"><!-- 날씨서비스연계설정 -->
			 	<div class="row" style="padding-top:10px;">
		 		<div class="col-12">
 					<div id="formWeather" ></div>
 				</div>
 				</div>
 			 </div>
 		</div>
 	</div>
 	
 		
 	
 </div>

  