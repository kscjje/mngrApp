<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<script>window.jQuery || document.write(decodeURIComponent('%3Cscript src="js/jquery.min.js"%3E%3C/script%3E'))</script>
<link rel="stylesheet" href="/fmcs/css/fmcs_edu.css">
<script src="/backOffice/DevExtreme/22.1.5/js/devextreme/exceljs.min.js"></script>
<script src="/backOffice/DevExtreme/22.1.5/js/devextreme/FileSaver.min.js"></script>

<script src="/fmcs/js/default_data.js"></script>
<script src="/fmcs/js/edcProgram/default.js"></script>
<script src="/fmcs/js/edcProgram/instructorPay/instructorPay.js"></script>

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
		        강사료집계현황
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
 		<div id="gridPay"></div>
 	</div>
 </div>
