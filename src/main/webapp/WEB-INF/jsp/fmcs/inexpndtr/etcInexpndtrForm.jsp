<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<link rel="stylesheet" href="/fmcs/css/fmcs_inexpndtr.css">
<link rel="stylesheet" href="/fmcs/css/fmcs_member.css">
<script src="/fmcs/js/inexpndtr/etc_inexpndtr_form.js?ver=1"></script>
<script src="/fmcs/js/default_data.js?ver=1"></script>
<script src="/fmcs/js/inexpndtr/inexpndtr_data.js?ver=1"></script>
<script src="/fmcs/js/member/popup/member_search.js?ver=1"></script>

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
		        기타수입매출관리
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
						<div class="condition form-group col-3"></div>
						<div class="form-group buttons" style="margin: 1px 0 0 15px;">
							<div class="btn-group" id="addDailyChinMember"></div>
						</div>						
					</div>
					<div class="card">
						<div class="card-body">
							<div class="col-8" style="margin-left:2rem;">
								<div id="formUser"></div>
							</div>
						</div>
					</div>							
					<div class="shadow-row"></div>
				</div>
			</div>
			
 			<div class="card-body">	
				<div id="lecturePaymentTemplate">
					<div class="row">
						<div class="col-6">
							<div class="popup-condition-area row">
								<div class="form-group lecture-condition selected-form-group col-12"></div>
							</div>
							<div>
								<div class="lecture-grid" style="max-height:calc(100vh - 223px);"></div>
							</div>			
						</div>
						<div class="col-6" style="background-color:#AFE1FF;border-radius: 7px;">
							<h6 style="margin-top:5px;">품목 결제하기</h6>
							<div>
								<div class="cart-grid" style="height:207px;"></div>
							</div>
							<h6 class="mt15">결제방법</h6>
							<div class="form-group locker-payment-button-container">
								<div></div>
								<div></div>
								<div></div>
							</div>
							<div>
								<div class="payment-grid" style="height:150px;"></div>
							</div>
							<div class="row">
					            <div class="mt15 col-9">
					                <h6>결제정보</h6>
					                <div style="background-color:#fff">
									    <div class="locker-payment-info-box">
									        <div class="locker-payment-header">결제할금액</div>
									        <div class="locker-payment-body"><span>10,000</span><span class="ml05">원</span></div>
									    </div>
									    <div class="locker-payment-info-box">
									        <div class="locker-payment-header">할인금액</div>
									        <div class="locker-payment-body" style="color:red"><span>-5,000</span><span class="ml05">원</span></div>
									    </div>
									    <div class="locker-payment-sub-box">
									        <div class="locker-payment-header">결제금액</div>
									        <div class="locker-payment-body"><span>3,000</span><span class="ml05">원</span></div>
									    </div>
									    <div class="locker-payment-total-box">
									        <div class="locker-payment-header">남은금액</div>
									        <div class="locker-payment-body" style="font-weight:700;"><span>2,000</span><span class="ml05">원</span></div>
									    </div>                
					                </div>
					            </div>
					            <div class="col-3">
					            	<div class="btn-top-area" style="margin-top: 44px;text-align: right;">
										<div></div>
										<div class="mt15"></div>
									</div>
					            </div>
							</div>
				            <br>								
						</div>
					</div>
				</div>			
			</div>		
			
		</div>
	</div>
</div>