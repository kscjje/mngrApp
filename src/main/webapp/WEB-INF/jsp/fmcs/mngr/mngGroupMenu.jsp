<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<script>window.jQuery || document.write(decodeURIComponent('%3Cscript src="js/jquery.min.js"%3E%3C/script%3E'))</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.4.0/polyfill.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/exceljs/4.1.1/exceljs.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.2/FileSaver.min.js"></script>
<link rel="stylesheet" href="/fmcs/css/fmcs_style3.css">



<script src="/fmcs/js/default_data.js"></script>
<script src="/backOffice/ckeditor/ckeditor.js"></script>
<script src="/fmcs/js/mngr/system_managerGroupMenu.js"></script>

<script>

$(document).ready(function () {
	formInit();
});

</script>


<div id="userPopup"></div>
<!-- MainTitle -->
<div class="row row_title">
	<div class="col-12">
		<ul class="navbar-nav">
 			<li class="nav-item d-sm-inline-block quick-nav">
		        권한그룹별 메뉴관리
		    </li>
			 <li class="nav-item d-sm-inline-block quick-nav" style="position: fixed;right: 0;" onclick="location.href='/fmcs/mngr/mngGroupList'">
                <i class="fa fa-users" aria-hidden="true"></i>
            </li>
		</ul>	
	</div>
</div>

<div class="row">
	<!--  Search Form -->
	<div class="col-12">
		<div class="card" style="background: #F2F2F2; _box-shadow: none;">
			<div class="card-body">
				<form id="searchForm1" name="searchForm" class="form-horizontal">
					<div class="form-group normal_condition" id="payMethodSearch"></div>
					<div class="form-group buttons" >
						<div class="btn-group" id="searchBtn"></div>
						<div class="btn-group btnRefresh" id="searchInitBtn"></div>
					</div>
				</form>
			</div>
		</div>
	</div>
	
	<!-- Data Grid -->
	<div class="col-14" style="height: 410px;">
		<div class="card" style="background: #F2F2F2; _box-shadow: none;">
			<div class="card-body">
				<div id="gridList">
				</div>
			</div>
		</div>
	</div>
</div>
