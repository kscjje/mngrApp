<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<script>window.jQuery || document.write(decodeURIComponent('%3Cscript src="js/jquery.min.js"%3E%3C/script%3E'))</script>
<link rel="stylesheet" href="/fmcs/css/fmcs_edu.css">

<script src="/fmcs/js/default_data.js"></script>
<script src="/fmcs/js/menu/menuList.js"></script>
<script src="/fmcs/js/menu/tab/tab1_admin.js"></script>
<script src="/fmcs/js/menu/tab/tab2_front.js"></script>
<script src="/backOffice/ckeditor/ckeditor.js"></script>
<script>
$(document).ready(function () {
	formInit();
});
</script>

<style>
/* .dx-treelist-rowsview .dx-treelist-collapsed span::before {  
   content: "\f00b"; 
}  
.dx-treelist-rowsview .dx-treelist-expanded span::before {  
    content: "\f074";
} */

</style>

  <div class="row row_title">
	<div class="col-12" style="height:30px;background:#022B70;height:48px;">
		<ul class="navbar-nav" style="color:white;flex-direction: row;display: flex;box-sizing: border-box;margin-top: 4px;">
 			<li class="nav-item d-sm-inline-block quick-nav" style="color:white;width:280px;font-size:1.1rem;">
		        사이트메뉴관리
		    </li>
		</ul>	
	</div>
</div>

<div class="row">
 	<div class="col-12 padding-lr-0" >
		<div class="shadow_box">
			 <div id="scrolledtabs">
		        <div class="tabs-container"></div>
		      </div>
			 <div id="tab1">
			 	<div class="row" style="padding-top:10px;">
		 		<div class="col-7">
 					<div id="treeAdminMenu" class="tree_normal"></div>
 				</div>
 				<div class="col-5">
 					<div id="formAdminMenu" ></div>
 				</div>
 				
 				</div>
 			 </div>
 			 <div id="tab2" style="display:none;">
		 		
			 </div>	
 		</div>
 	</div>
 	
 		
 	
 </div>

  