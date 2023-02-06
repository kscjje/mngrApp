<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<script>window.jQuery || document.write(decodeURIComponent('%3Cscript src="js/jquery.min.js"%3E%3C/script%3E'))</script>
<link rel="stylesheet" href="/fmcs/css/fmcs_edu.css">

<script src="/fmcs/js/default_data.js"></script>
<script src="/fmcs/js/edcProgram/default.js"></script>
<script src="/fmcs/js/edcProgram/waitMember/waitMember.js"></script>
<script src="/fmcs/js/edcProgram/waitMember/popup/waitMemberList.js"></script>

<script>
$(document).ready(function () {
	formInit();
});
</script>

<style>
/* .btn-group.dx-button {margin-left: 16px;height: 39px;} */
</style>

  <div class="row row_title">
	<div class="col-12">
		<ul class="navbar-nav">
 			<li class="nav-item d-sm-inline-block quick-nav">
		        강좌접수대기자관리
		    </li>
		</ul>	
	</div>
</div>

<div id="waitUsers_Popup"></div>
<div class="row">
 	<div class="col-12 padding-lr-0" >
		<div class="fmcs_condition">
			<div class="form-group normal_condition" id='waitCondition' ></div>
			<div class="form-group buttons" >
				<div class="btn-group" id="searchBtn"></div>
				<div class="btn-group btnRefresh" id="searchInitBtn"></div>
			</div>
		</div>
 	</div>
</div>
<div class="row margin-left-4" >
 	<div class="col-12 shadow_box" >
 		<div id="gridWaitPrgs"></div>
 	</div>
 </div>

<!-- updwon 
<div class="row margin-left-4" id="upArea">
 	<div class="col-12 shadow_box2" >
 		<div id="gridWaitPrgs"></div>
 	</div>
 </div>
 <div class="row margin-left-4" id="downArea" style="margin-top:5px;">
 	<div class="col-12 shadow_box2" >
		<div id="gridWaitUsers"></div>
	</div>
</div> -->
 
<!-- <div class="row margin-left-4">
 	<div class="col-6 shadow_box" >
 		<div id="gridWaitPrgs"></div>
 	</div>
 	<div class="col-6" >
 		<div class="shadow_box">
		<div id="gridWaitUsers"></div>
		</div>
	</div>
</div>
 -->