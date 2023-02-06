<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<script>window.jQuery || document.write(decodeURIComponent('%3Cscript src="js/jquery.min.js"%3E%3C/script%3E'))</script>
<link rel="stylesheet" href="/fmcs/css/fmcs_edu.css">

<script src="/fmcs/js/default_data.js"></script>
<script src="/fmcs/js/edcProgram/default.js"></script>
<script src="/fmcs/js/edcProgram/edcholiday/holiday.js"></script>
<script src="/fmcs/js/edcProgram/edcholiday/popup/copySchedule.js"></script>
<script src="/fmcs/js/edcProgram/edcholiday/popup/editForm.js"></script>

<script src="/webjars/rrule/2.6.8/dist/es5/rrule.min.js"></script>
<script src="/fmcs/js/ticket/recurrenceRule.js"></script>

<script>
$(document).ready(function () {
	formInit();
});
</script>

<style>
.dx-tooltip-appointment-item-content-date {
	display:none;
}
.selectPrgName {
	font-weight:600;
	font-size:1.2rem;
}
.dx-icon-isnotblank{
	font-size:17px;
}
/* c draggable="false" */ 
/* .btn-group.dx-button {margin-left: 16px;height: 39px;} */
</style>

  <div class="row row_title">
	<div class="col-12" style="height:30px;background:#022B70;height:48px;">
		<ul class="navbar-nav" style="color:white;flex-direction: row;display: flex;box-sizing: border-box;margin-top: 4px;">
 			<li class="nav-item d-sm-inline-block quick-nav" style="color:white;width:280px;font-size:1.1rem;">
		        강좌휴관일관리
		    </li>
		</ul>	
	</div>
</div>
<div id="copySch_Popup"></div>
<div id='holidayCreatePopup'></div>
<div class="row">
 	<div class="col-12 padding-lr-0" >
		<div class="fmcs_condition">
			<div class="form-group normal_condition" id='holidayCondition' ></div>
			<div class="form-group buttons" >
				<div class="btn-group" id="searchBtn"></div>
				<div class="btn-group btnRefresh" id="searchInitBtn"></div>
			</div>
		</div>
 	</div>
 </div>
 
<div class="row">
 	<div class="col-5">
 		<div class="shadow_box">
 		<div id="gridEduPrgs" class="tree_normal"></div>
 		</div>
 	</div>
 	<div class="col-7 padding-lr-0" >
		<div id="holiday" class="shadow_box" >
			<div id="holidayToolbar" class="hs-box hs-holiday-day-toolbar" > </div>
			<div id="holidaySchedule" class="hs-unavailable-calendar-container" > </div>
		</div>
 	</div>
 		
 	
 </div>

  