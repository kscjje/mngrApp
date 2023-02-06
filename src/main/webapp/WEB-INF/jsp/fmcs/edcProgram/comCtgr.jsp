<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<script>window.jQuery || document.write(decodeURIComponent('%3Cscript src="js/jquery.min.js"%3E%3C/script%3E'))</script>
<link rel="stylesheet" href="/fmcs/css/fmcs_edu.css">

<script src="/fmcs/js/default_data.js"></script>
<script src="/fmcs/js/edcProgram/comCtgr/comCtgr.js"></script>
<script src="/fmcs/js/edcProgram/comCtgr/popup/editForm.js"></script>
<script src="/fmcs/js/edcProgram/comCtgr/tab/tab1_ctgr.js"></script>
<script src="/fmcs/js/edcProgram/comCtgr/tab/tab2_contents.js"></script>
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
		        강좌검색분류관리
		    </li>
		</ul>	
	</div>
</div>

<div class="row">
 	<div class="col-3">
 		<div class="shadow_box">
 		<div id="treeCategory" class="tree_normal"></div>
 		</div>
 		<!-- <div class="float-right">
                    <div class="input-group input-group-sm">
                        <button type="button" class="btn btn-default">순서 이동</button>
                        <span class="input-group-append">
                            <button type="button" class="btn orderbtn " onclick="jsOrder('UP');">▲</button>
                            <button type="button" class="btn orderbtn" onclick="jsOrder('DOWN');">▼</button>
                        </span>
                    </div>
        </div> -->
 	</div>
 	<div class="col-9 padding-lr-0" >
		<div class="shadow_box">
			 <div id="scrolledtabs">
		        <div class="tabs-container"></div>
		      </div>
			 <div id="tab1">
		 		<div id="upArea">
		 			<div class="subject">연결된 강좌 목록</div>
		 			<div id="gridTrainclass1"></div>
		 		</div>
		 		<div id="downArea">
		 		<div class="subject">설정 안된 강좌 목록</div>
		 			<!-- 
		 			<div class="col-6 dx-field">
			            <div class="dx-field-label">운영상품분류</div>
			            <div class="dx-field-value">
			              <div id="treeBox"></div>
			            </div>
			          </div> -->
			         
		 			<div id="gridTrainclass2"></div>
		 		</div>
 			 </div>
 			 <div id="tab2" style="display:none;">
		 		<div class="cd_contents">
	
		 		</div>
		 		
			 </div>	
 		</div>
 	</div>
 	
 		
 	
 </div>

  