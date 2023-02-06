<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<link rel="stylesheet" href="/fmcs/css/fmcs_member.css">
<script src="/fmcs/js/member/member_merge.js?ver=1"></script>
<script src="/fmcs/js/member/popup/member_search.js?ver=1"></script>
<script src="/fmcs/js/member/member_data.js?ver=1"></script>
<script>
$(document).ready(function () {
	formInit(); // member_merge.js
});
</script>

<div id="userPopup"></div>
<div class="row row_title">
	<div class="col-12">
		<ul class="navbar-nav">
 			<li class="nav-item d-sm-inline-block quick-nav">
		        이중회원통합처리
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
						<div class="condition form-group col-2"></div>
					</div>
					<div class="card">
						<div class="card-body">
							<div class="title-form-group">기준회원</div>
							<div class="col-10" style="margin-left:2rem;">
								<div id="formUser"></div>
							</div>
						</div>
					</div>							
					<div class="shadow-row"></div>
				</div>
			</div>
		
 			<div id="mergeList" class="card-body">	
	 			<div class="row">
					<div class="form-group col-9 btn-top-area">
						<div class="form-option col-6" style="display:inline-block"></div>
						<div class="form-group buttons col-4" style="display:inline-block">
							<div class="btn-group" id="searchBtn"></div>
							<div class="btn-group btnRefresh" id="searchInitBtn"></div>
							<div class="btn-group" id="mergeBtn" style="margin-left:30px;"></div>
						</div>					
					</div>
				</div>			
				<div class="row">
					<div class="col-12">
						<div class="gridContainer"></div>
					</div>
				</div>																																											
			</div>		
			
		</div>
	</div>
</div>