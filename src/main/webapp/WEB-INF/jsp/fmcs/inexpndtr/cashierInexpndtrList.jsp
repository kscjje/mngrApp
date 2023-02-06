<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<link rel="stylesheet" href="/fmcs/css/fmcs_inexpndtr.css">
<link rel="stylesheet" href="/fmcs/css/fmcs_member.css">
<script src="/fmcs/js/inexpndtr/cashier_inexpndtr_list.js?ver=1"></script>
<script src="/fmcs/js/default_data.js?ver=1"></script>
<script src="/fmcs/js/inexpndtr/inexpndtr_data.js?ver=1"></script>

<script>
$(document).ready(function () {
	formInit(); 
});
</script>

<div class="row row_title">
	<div class="col-12">
		<ul class="navbar-nav">
 			<li class="nav-item d-sm-inline-block quick-nav">
		        수납자별입금현황
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
						<div class="condition form-group col-8"></div>
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
						<div class="gridContainer" style="height:400px;"></div>				
					</div>
				</div>																																											
			</div>		
 			<div class="card-body">	
				<div class="row">
					<div class="col-10">
						<div class="summaryContainer"></div>				
					</div>
				</div>																																											
			</div>			
		</div>
	</div>
</div>