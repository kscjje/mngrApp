<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<script>window.jQuery || document.write(decodeURIComponent('%3Cscript src="js/jquery.min.js"%3E%3C/script%3E'))</script>
<link rel="stylesheet" href="/fmcs/css/fmcs_edu.css">

<script src="/fmcs/js/default_data.js"></script>
<script src="/fmcs/js/edcProgram/default.js"></script>
<script src="/fmcs/js/edcProgram/edcAge/edcAge.js"></script>
<script src="/fmcs/js/edcProgram/edcAge/popup/ageBatchReg.js"></script>
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
		        강좌대상연령설정
		    </li>
		</ul>	
	</div>
</div>
<div id="ageBatch_Popup"></div>
<div id="ageReg_popup"></div>


<div class="row">
 	<div class="col-12 padding-lr-0" >
		<div class="fmcs_condition">
			<div class="form-group normal_condition" id='ageCondition' ></div>
			<div class="form-group buttons" >
				<div class="btn-group" id="searchBtn"></div>
				<div class="btn-group btnRefresh" id="searchInitBtn"></div>
			</div>
		</div>
 	</div>
</div>
 <div class="row">
 	<div class="col-7 shadow_box">
 		<div id="gridEdu" ></div>
 	</div>
 	<div class="col-5">
 		<div>
 		<div id="formAge" class="shadow_box"></div>
 		</div>
 	</div>
 </div>


<!--   if (e.rowType === "header") {
        console.log(e);
        e.cellElement.attr("title", "The caption is: " + e.column.caption);
    }
    toolTip:"연령계산방법 설정은 운영설정관리의 정책을 변경하세요", -->