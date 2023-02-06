<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<script>window.jQuery || document.write(decodeURIComponent('%3Cscript src="js/jquery.min.js"%3E%3C/script%3E'))</script>
<link rel="stylesheet" href="/fmcs/css/fmcs_edu.css">
<script src="/fmcs/js/default_data.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.14/jspdf.plugin.autotable.min.js"></script>
<script src="/fmcs/js/edcProgram/default.js"></script>
<script src="/fmcs/js/edcProgram/jsPDFCustom.js"></script>
<script src="/fmcs/js/edcProgram/attendance/attendance.js"></script>
<script src="/fmcs/js/edcProgram/attendance/popup/exportPdf.js"></script>
<!-- <script src="/fmcs/js/edcProgram/attendance/popup/drawExecute.js"></script> -->

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
		        강좌출석현황
		    </li>
		</ul>	
	</div>
</div>

<div id="export_Popup"></div>

<div class="row margin-left-4" id="upArea" style="margin-top:5px;">
 	<div class="col-12 shadow_box2">
 	<div class="row ">
 	<div class="col-12 padding-lr-0" >
		<div class="fmcs_condition" style="height:100px;">
			<div class="form-group normal_condition" id='attendanceCondition' ></div>
			<div class="form-group buttons" >
				<div class="btn-group" id="searchBtn"></div>
				<div class="btn-group btnRefresh" id="searchInitBtn"></div>
			</div>
			<div class="form-group buttons" >
				<div class="btn-group" id="drawBtn"></div>
				<div class="btn-group btnRefresh" id="batchConfirmBtn"></div>
			</div>
			<div class="form-group normal_condition" id='printOptions' ></div>
			<div class="form-group buttons" >
				<div class="btn-group" id="printBtn"></div>
			</div>
		</div>
 	</div>
 	</div>
 	 <div class="row ">
 		<div class="col-12 shadow_box2" >
			<div id="gridEduPrgs"></div>
		</div>
	</div>
	</div>
</div>

 <div class="row margin-left-4" id="downArea" style="margin-top:5px;">
 	<div class="col-12 shadow_box2" >
		<div id="gridUsers"></div>
	</div>
</div>


 
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