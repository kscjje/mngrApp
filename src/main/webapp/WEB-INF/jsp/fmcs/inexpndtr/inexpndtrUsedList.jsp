<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<link rel="stylesheet" href="/fmcs/css/fmcs_inexpndtr.css">
<link rel="stylesheet" href="/fmcs/css/fmcs_member.css">
<script src="/fmcs/js/inexpndtr/inexpndtr_used_list.js?ver=1"></script>
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
		        수입금정산일지
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
			<div class="row" style="margin-top:5px;">
				<div class="col-12" style="padding: 0;">
					<div id="scrolledtabs">
						<div class="tabs-container"></div>
					</div>
				</div>
			</div>			
 			<div class="card-body">	
				<div class="row tab-contents">
					<div id="pay" class="col-12" style="display:none;">
						<div class="gridContainer" style="height:400px;"></div>				
					</div>
					<div id="income" class="col-12" style="display:none;">
						<div class="gridContainer" style="height:400px;"></div>				
					</div>
					<div id="detail" class="col-12" style="display:none;">
						<div class="gridContainer" style="height:400px;"></div>				
					</div>										
				</div>																																											
			</div>		
		</div>	
	</div>
</div>

