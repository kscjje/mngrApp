<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<link rel="stylesheet" href="/fmcs/css/fmcs_cms.css">
<script src="/fmcs/js/bbs/master_list.js?ver=1"></script>
<script src="/fmcs/js/bbs/popup/master_detail.js?ver=1"></script>
<script src="/fmcs/js/default_data.js?ver=1"></script>
<script src="/fmcs/js/bbs/bbs_data.js?ver=1"></script>
<script>
$(document).ready(function () {
	formInit();
});
</script>

<div id="userPopup"></div>
<div class="row row_title">
	<div class="col-12">
		<ul class="navbar-nav">
 			<li class="nav-item d-sm-inline-block quick-nav">
		        게시판생성관리
		    </li>
			<li>
				<ul class="common-menu">
				    <li class="nav-item d-sm-inline-block quick-nav">
				        <a href="javascript:createMaster();">신규
				        <img src="/fmcs/images/ico_new.png">
				        </a>
				    </li>
				    <li class="nav-item d-sm-inline-block quick-nav">
				        <a href="javascript:updateMaster();">수정
				        <img src="/fmcs/images/ico_edit.png">
				        </a>
				    </li>
				    <li class="nav-item d-sm-inline-block quick-nav">
				    	<a href="javascript:deleteMaster();">삭제
				        <img src="/fmcs/images/ico_delete.png">
				        </a>
				    </li>
			    </ul>
		    </li>	    
		</ul>	
	</div>
</div>

<div class="row">
	<div class="col-12">
		<div class="card" style="box-shadow:none;">		
			<div class="card-body" style="margin: 0 -7.5px;padding-bottom: 0;">
				<div class="main-condition">
					<div class="row">
						<div class="condition form-group col-9"></div>
						<div class="form-group buttons" >
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