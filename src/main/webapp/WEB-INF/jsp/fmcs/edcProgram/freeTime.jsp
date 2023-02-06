<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<script>window.jQuery || document.write(decodeURIComponent('%3Cscript src="js/jquery.min.js"%3E%3C/script%3E'))</script>
<link rel="stylesheet" href="/fmcs/css/fmcs_edu.css">

<script src="/fmcs/js/default_data.js"></script>
<script src="/fmcs/js/edcProgram/default.js"></script>
<script src="/fmcs/js/edcProgram/freeTimeManager/popup/groupedit.js"></script>
<script src="/fmcs/js/edcProgram/freeTimeManager/popup/timereg.js"></script>
<script src="/fmcs/js/edcProgram/freeTimeManager/freeTimeManager.js"></script>
<script src="/backOffice/ckeditor/ckeditor.js"></script>
<script>
$(document).ready(function () {
	formInit();
});
</script>

<style>
/* .btn-group.dx-button {margin-left: 16px;height: 39px;} */
</style>

  <div class="row row_title">
	<div class="col-12" style="height:30px;background:#022B70;height:48px;">
		<ul class="navbar-nav" style="color:white;flex-direction: row;display: flex;box-sizing: border-box;margin-top: 4px;">
 			<li class="nav-item d-sm-inline-block quick-nav" style="color:white;width:280px;font-size:1.1rem;">
		        자유수영시간표
		    </li>
		</ul>	
	</div>
</div>
<div id="groupedit_popup"></div>
<div id="timereg_popup"></div>
<div class="row shadow_box">
 	<div class="col-6 ">
 			<div id='freeTimeGrid' class="noneheight-shadowbox"></div>

 	</div>
 </div>

  