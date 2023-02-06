<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<link rel="stylesheet" href="/fmcs/css/fmcs_edu.css">
<script src="/fmcs/js/default_data.js"></script>
<script src="/fmcs/js/edcProgram/default.js"></script>

<script src="/fmcs/js/edcProgram/regMemberCapacity/regMemberCapacity.js"></script>
<script src="/fmcs/js/edcProgram/regMemberCapacity/popup/changeCapacity.js"></script>
<style>
#chgCapaTitleForm{
	margin-bottom:10px;
}
.text-caption{
	text-align:center;
	height:30px;
	margin-top:5px;
	
}
.text-center{
	text-align:center;
	margin-top:7px;
}
/* #chgCapaMainForm .dx-box-flex{
	border:1px solid #000;
}
#chgCapaMainForm .dx-box-flex .dx-item-content.dx-box-item-content.dx-root-simple-item{ 
*/

#chgCapaMainForm .dx-item .dx-box-item{
	border-bottom:1px solid #ddd;
	padding-bottom:3px;
}
#chgCapaMainForm .dx-numberbox input[type=text]  
{  
	text-align: right;
}
.setCapaCheckBox{
	font-size: 0.9rem;
}
</style>
<script>
$(document).ready(function () {
	formInit(); // 
});
</script>
<div id='changeCapacity_popup'></div>
<div class="row row_title">
	<div class="col-12">
		<ul class="navbar-nav">
 			<li class="nav-item d-sm-inline-block quick-nav">
		        강좌접수인원현황
		    </li>
		</ul>	
	</div>
</div>
<div class="row">
 	<div class="col-12 padding-lr-0" >
		<div class="fmcs_condition">
			<div class="form-group normal_condition" id='regCapacityCondition' ></div>
			<div class="form-group buttons" >
				<div class="btn-group" id="searchBtn"></div>
				<div class="btn-group btnRefresh" id="searchInitBtn"></div>
			</div>
		</div>
 	</div>
</div>
<div class="row">
	<div class="col-12 shadow_box">
	<div id="gridEdu"></div>
	</div>
</div>

