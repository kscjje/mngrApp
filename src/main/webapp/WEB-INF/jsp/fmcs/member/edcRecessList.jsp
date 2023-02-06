<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<link rel="stylesheet" href="/fmcs/css/fmcs_member.css">
<script src="/fmcs/js/member/edc_recess.js?ver=1"></script>
<script src="/fmcs/js/member/popup/member_search.js?ver=1"></script>
<script src="/fmcs/js/member/member_data.js?ver=1"></script>
<script>
$(document).ready(function () {
	formInit(); // edc_recess.js
});
</script>

<div id="userPopup"></div>
<div class="row row_title">
	<div class="col-12">
		<ul class="navbar-nav">
 			<li class="nav-item d-sm-inline-block quick-nav">
		        회원별강좌연기현황
		    </li>
		</ul>	
	</div>
</div>
<div class="row">
	<div class="col-12">
		<div class="card" style="box-shadow:none;">		
			<div class="card-body" style="margin: 0 -7.5px;padding-bottom: 0;">
				<div class="main-condition">
					<div class="row col-12">
						<div class="condition form-group col-7"></div>
						<div class="form-group buttons col-1">
							<div class="btn-group" id="searchBtn"></div>
							<div class="btn-group btnRefresh" id="searchInitBtn"></div>
						</div>
					</div>
					<div class="shadow-row"></div>
				</div>
			</div>
			
 			<div class="card-body">	
				<div class="row">
					<div class="col-12">
						<div class="gridContainer"></div>
					</div>
				</div>																																											
			</div>		
			
		</div>
	</div>
</div>