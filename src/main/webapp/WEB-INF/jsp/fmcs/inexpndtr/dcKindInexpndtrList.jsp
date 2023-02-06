<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<link rel="stylesheet" href="/fmcs/css/fmcs_inexpndtr.css">
<link rel="stylesheet" href="/fmcs/css/fmcs_member.css">
<script src="/fmcs/js/inexpndtr/dc_kind_inexpndtr_list.js?ver=1"></script>
<script src="/fmcs/js/default_data.js?ver=1"></script>
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
		        할인사유별수입금현황
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
						<div class="condition form-group col-7"></div>
						<div class="form-group buttons" >
							<div class="btn-group" id="searchBtn"></div>
							<div class="btn-group btnRefresh" id="searchInitBtn"></div>
						</div>
						<div class="dx-field-item-label-text col-12" style="margin-bottom:7px;">
							※ 복수감면이 있는 경우 내역에 차이가 있을 수 있습니다. 보증금은 수입에서 제외합니다.
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
			
 			<div class="card-body">	
				<div class="row">
					<div class="col-12">
						<div class="gridDetailContainer"></div>				
					</div>
				</div>																																											
			</div>					
			
		</div>
	</div>
</div>