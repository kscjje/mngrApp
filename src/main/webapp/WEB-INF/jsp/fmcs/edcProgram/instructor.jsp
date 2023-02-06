<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<script>window.jQuery || document.write(decodeURIComponent('%3Cscript src="js/jquery.min.js"%3E%3C/script%3E'))</script>
<link rel="stylesheet" href="/fmcs/css/fmcs_edu.css">
<!-- https://unpkg.com/devextreme-aspnet-data@2.8.6/js/dx.aspnet.data.js -->
<script src="/backOffice/DevExtreme/22.1.5/js/devextreme/dx.aspnet.data.js"></script>

<script src="/fmcs/js/default_data.js"></script>
<script src="/fmcs/js/member/popup/member_search.js?ver=1"></script>
<script src="/fmcs/js/member/popup/member_profile.js"></script>
<script src="/fmcs/js/edcProgram/default.js"></script>
<script src="/fmcs/js/edcProgram/instructor/instructor.js"></script>
<script src="/fmcs/js/edcProgram/instructor/condition.js"></script>
<script src="/fmcs/js/edcProgram/instructor/popup/editForm.js"></script>
<script src="/fmcs/js/edcProgram/instructor/popup/otherInstrReg.js"></script>
<script src="/fmcs/js/edcProgram/instructor/popup/changeCenter.js"></script>
<script src="/backOffice/ckeditor/ckeditor.js"></script>
<script>
$(document).ready(function () {
	formInit();
	editorInit();
});
</script>

<style>
/* .btn-group.dx-button {margin-left: 16px;height: 39px;} */
</style>

  <div class="row row_title">
	<div class="col-12">
		<ul class="navbar-nav">
 			<li class="nav-item d-sm-inline-block quick-nav">
		        강사정보관리
		    </li>
			<li>
				<ul class="common-menu">
				    <li class="nav-item d-sm-inline-block quick-nav">
				        <a href="javascript:void(0);" onclick="createInstructor();">
				        신규
				        <img src="/fmcs/images/ico_new.png"></a>
				    </li>
				    <li class="nav-item d-sm-inline-block quick-nav">
				         <a href="javascript:void(0);" onclick="updateInstructor();">수정 
				        <img src="/fmcs/images/ico_edit.png"></a>
				    </li>
				    <li class="nav-item d-sm-inline-block quick-nav">
				        <a href="javascript:void(0);" onclick="deleteInstructor();">삭제
				        <img src="/fmcs/images/ico_delete.png"></a>
				    </li>
				    <!-- <li class="nav-item d-sm-inline-block quick-nav">
				        <a href="javascript:void(0);" onclick="cancel();">취소
				        <img src="/fmcs/images/ico_cancel.png"></a>
				    </li> -->
			    </ul>
		    </li>
		</ul>	
	</div>
</div>
<div id="userPopup"></div>
<div id="searchMemberPopup"></div>
<div id="changecenter_popup"></div>
<div id="othercenter_popup"></div>

<div class="row">
 	<div class="col-12 padding-lr-0" >
		<div class="fmcs_condition">
			<div class="form-group normal_condition" id='insCondition' ></div>
			<div class="form-group buttons" >
				<div class="btn-group" id="searchBtn"></div>
				<div class="btn-group btnRefresh" id="searchInitBtn"></div>
			</div>
			<div class="form-group buttons" >
			<div class="btn-group" id="otherInsertBtn"> </div>
				<div class="btn-group" id="changeCenterBtn"> </div>
			</div>				
		</div>
 	</div>
 </div>
 <div class="row margin-left-4">
 	<div class="col-3 shadow_box">
 		<div id="gridInstructor" class="grid_normal"></div>
 	</div>
 	<div class="col-9">
 		<div id="formDetail" class="shadow_box"> </div>
 	</div>
 </div>
 

  