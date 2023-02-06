<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<link rel="stylesheet" href="/fmcs/css/fmcs_rent.css">
<link rel="stylesheet" href="/fmcs/css/fmcs_cms.css">

<script src="/fmcs/js/member/popup/member_search.js?ver=1"></script>
<script src="/fmcs/js/member/popup/member_address.js?ver=1"></script>
<script src="/fmcs/js/rent/popup/team_search.js?ver=1"></script>
<script src="/fmcs/js/rent/rent_rsvn.js?ver=1"></script>
<script src="/fmcs/js/rent/popup/rent_payment.js?ver=1"></script>
<script src="/fmcs/js/rent/popup/rent_adcls_payment.js?ver=1"></script>
<script src="/fmcs/js/rent/popup/rent_wait.js?ver=1"></script>
<script src="/fmcs/js/rent/popup/rent_drwt.js?ver=1"></script>
<script src="/fmcs/js/rent/popup/rsvn_requirement.js?ver=1"></script>
<script src="/fmcs/js/rent/popup/rent_refund.js?ver=1"></script>
<script src="/fmcs/js/default_data.js?ver=1"></script>
<script src="/fmcs/js/rent/rent_data.js?ver=1"></script>
<script src="/fmcs/js/member/member_data.js?ver=1"></script>
<script>
$(document).ready(function () {
	formInit(); // rent_rsvn.js
});
</script>
<div id="userPopup"></div>
<div id="userPopup2"></div>
<div class="row row_title">
	<div class="col-12">
		<ul class="navbar-nav">
 			<li class="nav-item d-sm-inline-block quick-nav">
		        대관예약관리
		    </li>
		</ul>	
	</div>
</div>

<div class="row">
	<div class="col-12">
		<div class="card" style="box-shadow:none;">		
			<div class="card-body" style="margin: 0 -7.5px;padding-bottom: 0;">
				<form id="form1" name="form1">
					<div class="main-condition">
						<div class="row">
							<div class="condition form-group"></div>
							<div class="form-group buttons" >
								<div class="btn-group" id="searchBtn"></div>
								<div class="btn-group btnRefresh" id="searchInitBtn"></div>
							</div>
						</div>
						<div class="shadow-row"></div>
					</div>
				</form>
			</div>	
		</div>
	</div>
</div>
<div class="row">
	<div class="col-12">
		<div style="margin-top:5px;">
			<div class="card-body" style="padding: 0; margin-top:-10px;">
				<div id="scrolledtabs" class="row" style="border-bottom: 1px solid #A74347;">
					<div class="tabs-container col-6" style="margin-bottom: -1px;"></div>
				</div>
			</div>
		</div>
		
		<div class="tab-contents">
		
			<div id="tab1" style="display:none;">
				<div class="row" style="margin-top: 5px;">
					<div class="form-group col-12 btn-top-area">
						<div class="legend-group">
							<div class="legend"><span class="count" style="background-color:#DDDDDD">&nbsp;</span>신청자수</div>
							<div class="legend"><span class="status1" style="background-color:#238FDA">&nbsp;</span>예약가능</div>
							<div class="legend"><span class="status2" style="background-color:#FF7052">&nbsp;</span>추첨(승인)대기</div>
							<div class="legend"><span class="status3" style="background-color:#FFC801">&nbsp;</span>당첨확정대기</div>
							<div class="legend"><span class="status4" style="background-color:#2DC86D">&nbsp;</span>결제대기</div>
							<div class="legend"><span class="status5" style="background-color:#A7A6B6">&nbsp;</span>예약완료</div>
						</div>
						<div class="btn-right-area">
							<div></div>
							<div></div>
						</div>					
					</div>
				</div>
				<div class="row">
					<div class="contextContainer col-12"></div>
					<div class="subContextContainer col-12"></div>
					<div class="calendarContainer box-body col-12">				
					</div>
				</div>	
			</div>
			
			<div id="tab2" style="display:none;">
				<div class="card" style="box-shadow:none;">		
					<div class="card-body">
						<form id="form2" name="form2">
							<div class="main-condition">
								<div class="row">
									<div class="sub-condition form-group col-8"></div>
									<div class="form-group buttons" >
										<div class="btn-group" id="searchSubBtn"></div>
										<div class="btn-group btnRefresh" id="searchSubInitBtn"></div>
									</div>
								</div>
							</div>
						</form>
					</div>	
					
					<div class="row">
						<div class="col-10">
				 			<div class="card-body" id="reserveList">	
					 			<div class="row">
									<div class="form-group col-9 btn-top-area">
										<div></div>
										<div></div>
										<div></div>
									</div>
								</div>			
								<div class="row">
									<div class="col-12">
										<div class="gridContainer"></div>
									</div>
								</div>																																											
							</div>		
							
				 			<div class="card-body" id="reserveDetail">	
				 				<div class="row">
						 			<div class="col-12 sub-title">
						 					부속시설 이용내역
									</div>
								</div>	
								<div class="row">
									<div class="col-12">
										<div class="gridContainer"></div>
									</div>
								</div>																																											
							</div>							
						</div>
						<div class="col-2">
				 			<div id="reserveCar">	
				 				<div class="row" style="margin-top:10px;">
						 			<div class="col-12 sub-title">
									</div>
									<div class="col-12">
										<div class="carContainer"></div>
										<div id="searchCarBtn" style="width:100%;"></div>
									</div>									
								</div>	
								<div class="row" style="margin-top:10px;">
									<div class="col-12">
										<div class="gridContainer"></div>
									</div>
								</div>																																											
							</div>						
						</div>							
					</div>
				
				</div>								
			</div>	
		</div>	
	</div>
</div>