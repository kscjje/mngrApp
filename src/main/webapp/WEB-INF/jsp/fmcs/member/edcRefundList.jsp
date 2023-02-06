<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<link rel="stylesheet" href="/fmcs/css/fmcs_member.css">
<script src="/fmcs/js/member/edc_refund.js?ver=1"></script>
<script src="/fmcs/js/member/popup/edc_refund.js?ver=1"></script>
<script src="/fmcs/js/member/popup/edc_card_refund.js?ver=1"></script>
<script src="/fmcs/js/member/member_data.js?ver=1"></script>
<script src="/fmcs/js/default_data.js?ver=1"></script>
<script>
$(document).ready(function () {
	formInit(); // edc_refund.js
});
</script>

<div id="userPopup"></div>
<div id="userPopup2"></div>
<div class="row row_title">
	<div class="col-12">
		<ul class="navbar-nav">
 			<li class="nav-item d-sm-inline-block quick-nav">
		        강좌환불요청관리(온라인)
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
			
 			<div class="card-body" id="refundList">	
	 			<div class="row">
					<div class="form-group col-9 btn-top-area">
						<div></div>
					</div>
				</div>			
				<div class="row">
					<div class="col-12">
						<div class="gridContainer"></div>
					</div>
				</div>																																											
			</div>		
			
 			<div class="card-body" id="refundDetail">	
 				<div class="row">
		 			<div class="col-10">
						<div class="form-group col-9 btn-top-area">
							<div></div>
							<div></div>				
						</div>
					</div>
					<div class="col-2">
						<div id="descViewSection" class="row">
								<div style="background: white;width:100%">
									<label style="margin: 15px 0 0 18px; font-size: 0.9rem;font-weight: normal;">처리완료내역</label>
									<div class="desc-view" style="
									    padding: 13px;
									    font-size: 0.9rem;">
										<div style="margin: 0 15px 0 15px;">
											<div class="desc-text-area" style="height:calc(100vh - 750px);"></div>
											<div class="desc-writer-area">
												<span>admin2</span>
												<span>2022-10-02 12:30:11</span>
											</div>
										</div>
									</div>
								</div>
						</div>					
					</div>
				</div>	
				<div class="row col-10">
					<div class="col-12">
						<div class="gridContainer"></div>
					</div>
				</div>																																											
			</div>				
			
		</div>
	</div>
</div>