<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<script>window.jQuery || document.write(decodeURIComponent('%3Cscript src="js/jquery.min.js"%3E%3C/script%3E'))</script>
<link rel="stylesheet" href="/fmcs/css/fmcs_edu.css">
<script src="/fmcs/js/default_data.js"></script>

<script src="/fmcs/js/edcProgram/default.js"></script>
<script src="/fmcs/js/edcProgram/edcBatch/edcBatch.js"></script>
<script src="/fmcs/js/edcProgram/edcBatch/tab/tab1_bsis.js"></script><!-- 모집정보 -->
<script src="/fmcs/js/edcProgram/edcBatch/tab/tab2_dc.js"></script><!-- 할인/환불 -->
<script src="/fmcs/js/edcProgram/edcBatch/tab/tab3_applyLimit.js"></script><!-- 신청제한 -->
<script src="/fmcs/js/edcProgram/edcBatch/tab/tab4_elkr.js"></script><!-- 전자키발권 -->
<!-- 자유이용시간 >강좌관리 >자유시간일괄설정이 있음-->

<script src="/fmcs/js/edcProgram/edcBatch/popup/drawOptions.js"></script><!-- 추첨 옵션 설정 -->

<script>
$(document).ready(function () {
	formInit();	
});
</script>
<style>
/* .inreq_date .dx-field-item-label-content{
	width:198px !important;
} */
.label-width-60 .dx-field-item-label-content{
	width:60px !important;
}
.label-width-230 .dx-field-item-label-content{
	width:210px !important;
}
.dx-checkbox-text{
	font-weight:600;
}
.grp_low_height{
	font-size:0.8rem;
}
#helpCalc,#disCnthelpCalc,#reqCnthelpCalc{
  width: 20px;
  height: 20px;
  background-position: 0 0;
  background-size: 20px 20px;
  padding: 0;
  font-size: 20px;
  text-align: center;
  line-height: 20px;
  margin-right: 9px;
  margin-left: 0;
}
</style>
<div class="row row_title">
	<div class="col-12">
		<ul class="navbar-nav">
 			<li class="nav-item d-sm-inline-block quick-nav">
		        강좌정보일괄설정
		    </li>
		</ul>	
	</div>
</div>

<div class="row">
 	<div class="col-12 padding-lr-0" >
		<div class="fmcs_condition">
			<div class="form-group normal_condition" id='eduBatchCondition' ></div>
		</div>
 	</div>
</div>

<div class="row">
 	<div class="col-12 shadow_box" >
 		<div id="scrolledtabs">
			<div class="tabs-container"></div>
    	</div>
		<div id="tab1" class="row" style="display:none;">
			<div class="col-12 tab_contents">
				<div id="tab1_contents"></div>
				<div id="draw_Popup"></div>
			</div>
		</div>
		<div id="tab2" class="row" style="display:none;">
			<div class="col-12 tab_contents">
				<div  id='discount_form'></div>
			</div>
		</div>
		<div id="tab3" class="row" style="display:none;">
			<div class="col-12 tab_contents">
				<div  id='reg_opt_form'></div>
			</div>
		</div>
		<div id="tab4" class="row" style="display:none;">
			<div class="col-12 tab_contents">
				<div  id='Keyform'></div>
			</div>
		</div>
 	</div>
</div>

  