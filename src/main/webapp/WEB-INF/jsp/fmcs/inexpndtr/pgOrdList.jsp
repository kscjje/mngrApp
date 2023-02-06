<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<link rel="stylesheet" href="/fmcs/css/fmcs_inexpndtr.css">
<link rel="stylesheet" href="/fmcs/css/fmcs_member.css">
<script src="/fmcs/js/inexpndtr/pg_ord_list.js?ver=1"></script>
<script src="/fmcs/js/inexpndtr/inexpndtr_data.js?ver=1"></script>
<script src="/fmcs/js/member/popup/member_search.js?ver=1"></script>

<script>
$(document).ready(function () {
	formInit(); 
});
</script>

<div class="row row_title">
	<div class="col-12">
		<ul class="navbar-nav">
 			<li class="nav-item d-sm-inline-block quick-nav">
		        PG거래내역현황
		    </li>
		</ul>	
	</div>
</div>

<div class="row">
	<div class="col-12">
		<div style="margin-top:5px;">
			<div style="padding: 0;background-color: #F4F4F4;">
				<div id="scrolledtabs row" style="border-bottom: 1px solid #A74347;">
					<div class="tabs-container col-6" style="margin-bottom: -1px;"></div>
				</div>
			</div>
		</div>	
		<div class="row tab-contents" style="margin-top:2px;">
			<div id="card" class="col-12" style="display:none;">
				<div class="card" style="box-shadow:none;">		
					<div class="card-body" style="margin: 0 -7.5px;padding-bottom: 0;">
						<div class="main-condition">
							<div class="row">
								<div class="condition form-group col-8"></div>
								<div class="form-group buttons" >
									<div class="btn-group searchBtn"></div>
									<div class="btn-group btnRefresh"></div>
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
							<div class="col-6">
								<div class="summaryContainer"></div>				
							</div>
						</div>																																											
					</div>							
				</div>
			</div>
			<div id="cash" class="col-12" style="display:none;">
				<div class="card" style="box-shadow:none;">		
					<div class="card-body" style="margin: 0 -7.5px;padding-bottom: 0;">
						<div class="main-condition">
							<div class="row">
								<div class="condition form-group col-8"></div>
								<div class="form-group buttons col-1" >
									<div class="btn-group searchBtn"></div>
									<div class="btn-group btnRefresh"></div>
								</div>
							</div>
							<div class="shadow-row"></div>
						</div>
					</div>
					
		 			<div class="card-body">	
						<div class="row">
							<div class="col-12">
								<div class="gridContainer" style="height:500px;"></div>				
							</div>
						</div>																																											
					</div>		
					
				</div>
			</div>	
		</div>			
	</div>
</div>

