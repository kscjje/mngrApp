<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<script>window.jQuery || document.write(decodeURIComponent('%3Cscript src="js/jquery.min.js"%3E%3C/script%3E'))</script>
<link rel="stylesheet" href="/fmcs/css/fmcs_edu.css">
<!-- https://unpkg.com/devextreme-aspnet-data@2.8.6/js/dx.aspnet.data.js -->
<script src="/backOffice/DevExtreme/22.1.5/js/devextreme/dx.aspnet.data.js"></script>

<script src="/fmcs/js/default_data.js"></script>
<script src="/fmcs/js/operSetup/managerNotice/managerNotice.js"></script>
<script src="/fmcs/js/operSetup/managerNotice/popup/editForm.js"></script>
<script src="/fmcs/js/operSetup/managerNotice/popup/selectUsers.js"></script>

<script>
$(document).ready(function () {
	formInit();
});
</script>
  <div class="row row_title">
	<div class="col-12">
		<ul class="navbar-nav">
 			<li class="nav-item d-sm-inline-block quick-nav">
		        업무공지알림관리
		    </li>
		</ul>	
	</div>
</div>
<div id="selectUsersPopup"></div>

<div class="row">
 	<div class="col-12 padding-lr-0" >
		<div class="fmcs_condition">
			<div class="form-group normal_condition" id='mngNoticeCondition' ></div>
			<div class="form-group buttons" >
				<div class="btn-group" id="searchBtn"></div>
				<div class="btn-group btnRefresh" id="searchInitBtn"></div>
			</div>
							
		</div>
 	</div>
 </div>
 <div class="row margin-left-4">
 	<div class="col-6 shadow_box">
 		<div id="gridManagerNotice" class="grid_normal"></div>
 	</div>
 	<div class="col-6">
 		<div id="gridTargetManager" class="shadow_box"> </div>
 	</div>
 </div>
 

  