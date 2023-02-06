<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="egovframework.uv.util.UvUtil" %>
<%
	String myIP = UvUtil.getClientIP(request);
%>
<link rel="stylesheet" href="/fmcs/css/fmcs_member.css">
<script src="/fmcs/js/member/member.js?ver=2"></script>
<script src="/fmcs/js/member/member_form.js?ver=1"></script>
<script src="/fmcs/js/member/popup/member_search.js?ver=1"></script>
<script src="/fmcs/js/member/popup/member_form.js?ver=1"></script>
<script src="/fmcs/js/member/popup/member_profile.js?ver=1"></script>
<script src="/fmcs/js/member/popup/member_address.js?ver=1"></script>
<script src="/fmcs/js/member/popup/member_card_make.js?ver=1"></script>
<script src="/fmcs/js/member/popup/edc_payment_detail.js?ver=1"></script>
<script src="/fmcs/js/member/popup/locker_payment_detail.js?ver=1"></script>
<script src="/fmcs/js/member/popup/edc_refund.js?ver=1"></script>
<script src="/fmcs/js/default_data.js?ver=1"></script>
<script src="/fmcs/js/member/member_data.js?ver=1"></script>
<script src="/fmcs/js/member/tab/tab1_edc_rsvn.js?ver=1"></script>
<script src="/fmcs/js/member/popup/edc_payment.js?ver=1"></script>
<script src="/fmcs/js/member/popup/edc_change.js?ver=1"></script>
<script src="/fmcs/js/member/popup/edc_search.js?ver=1"></script>
<script src="/fmcs/js/member/popup/edc_recess.js?ver=1"></script>
<script src="/fmcs/js/member/popup/edc_autobilling.js?ver=1"></script>
<script src="/fmcs/js/member/popup/member_change.js?ver=1"></script>
<script src="/fmcs/js/member/tab/tab2_edc_online.js?ver=1"></script>
<script src="/fmcs/js/member/popup/locker_wait.js?ver=1"></script>
<script src="/fmcs/js/member/tab/tab3_locker.js?ver=1"></script>
<script src="/fmcs/js/member/tab/tab4_pay.js?ver=1"></script>
<script src="/fmcs/js/member/tab/tab5_edc_recess.js?ver=1"></script>
<script src="/fmcs/js/member/tab/tab6_rent.js?ver=1"></script>
<script src="/fmcs/js/member/tab/tab7_family.js?ver=1"></script>
<script src="/fmcs/js/member/popup/family_form.js?ver=1"></script>
<script src="/fmcs/js/member/tab/tab8_sns.js?ver=1"></script>
<script>
$(document).ready(function () {
	formInit(); // member_form.js
	
	$(".user-profile .profile-camera").on("click", function(){
		createUserProfilePopup('#userPopup');
	});
	
	parent.fnIframeComplete();
});

function setMember(param) {
	console.log(param);
	var paramList = param.split("&");
	var userNo = "";
	
	paramList.forEach(function(item) {
		if (item.indexOf("USER_NO") === 0) {
			userNo = item.split("=")[1];		
		}
	});
	
	var findList = _.where(lecListJoin, {USER_NO: userNo});
	
	if (findList.length >0) {
		setUserMainFormData(findList[0])
	}
}

function userRegist() {
	createUserFormPopup('#userPopup', firstUserForm);
}

function userModify() {
	var userMainformData = $('#formUser').dxForm("instance").option("formData");
	console.log(userMainformData.USER_NO);
	
	if (userMainformData.USER_NO && userMainformData.USER_NO.length > 0) {
		createUserFormPopup('#userPopup', userMainformData);
	} else {
		showAlert("회원정보가 없습니다. 회원을 검색해주세요.", "회원정보");
	}
}

function userRemove() {
	DevExpress.ui.notify('회원 삭제');
	setFormData('#formUser');
}
</script>

<div id="userPopup"></div>
<div id="userPopup2"></div>
<div class="row row_title">
	<div class="col-12">
		<ul class="navbar-nav">
 			<li class="nav-item d-sm-inline-block quick-nav">
		        회원정보관리
		    </li>
			<li>
				<ul class="common-menu">
				    <li class="nav-item d-sm-inline-block quick-nav">
				        <a href="javascript:userRegist();">신규
				        <img src="/fmcs/images/ico_new.png">
				        </a>
				    </li>
				    <li class="nav-item d-sm-inline-block quick-nav">
				        <a href="javascript:userModify();">수정
				        <img src="/fmcs/images/ico_edit.png">
				        </a>
				    </li>
				    <li class="nav-item d-sm-inline-block quick-nav">
				    	<a href="javascript:userRemove();">삭제
				        <img src="/fmcs/images/ico_delete.png">
				        </a>
				    </li>
				    <!-- <li class="nav-item d-sm-inline-block quick-nav">
				        저장
				        <img src="/fmcs/images/ico_save.png">
				    </li> 
				    <li class="nav-item d-sm-inline-block quick-nav">
				        취소
				        <img src="/fmcs/images/ico_cancel.png">
				    </li> -->
			    </ul>
		    </li>
		    <!-- <li class="nav-item d-sm-inline-block" style="position: fixed;right: 25px;margin-top:5px;font-size: 0.9rem;">
			    <div class="nav-item d-sm-inline-block"
					style="margin: -12px -10px 0 0;" id="btn_etc">
					<a href="#"> <img
						src="/fmcs/images/ico_etc.png">
					</a>
				</div>
			</li> -->
		</ul>	
	</div>
</div>
<!-- <div class="row" >
	<div class="col-12">
		<div class="dropdown-menu" id="sub_menu" style="display:none;right: 0;left: initial;top:-2px;line-height: 2rem;">
			<a class="dt-button dropdown-item buttons-columnVisibility"
				tabindex="0" aria-controls="list" href="#" data-cv-idx="0"><span>회원카드발급</span></a>		
			<a class="dt-button dropdown-item buttons-columnVisibility"
				tabindex="0" aria-controls="list" href="#" data-cv-idx="1"><span>회원탈퇴</span></a>
		</div>
	</div>
</div> -->

<div class="row">
	<div class="col-12">
		<div class="card" style="box-shadow:none;">		
			<div class="card-body" style="margin: 0 -7.5px;padding-bottom: 0;">
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
			</div>
			
			<div id="descSection" class="row" style="margin-top: 56px; right: 8px; position: absolute;">
				<div>
					<div style="z-index: 100;width:250px;background: white;height: 349px;">
						<label style="margin: 0 0 0 18px; font-size: 0.9rem;font-weight: normal;">비고</label>
						<div class="desc-card" style="
						    padding: 13px 13px 0;
						    font-size: 0.9rem;
						    height: 255px;overflow: auto;">
						</div>	
						<div class="desc-register" style="margin: 0 15px 0 15px;">
							<div class="desc-text-area"></div>
							<div class="desc-btn-area"></div>
						</div>
					</div>
				</div>
			</div>
			
 			<div class="card-body form-horizontal" id="dxFormUser">	
					<div class="form-group row">
						<div class="col-2">
							<div class="user-profile">
								<div class="profile-close">
									<div class="cst-small-button dx-button dx-button-normal dx-button-mode-contained">
										<div class="dx-button-content"><i class="dx-icon dx-icon-close"></i></div>
									</div>
								</div>
								<div class="profile-image">
									<img src="/fmcs/images/profile.png">
									<div class="user-info member" style="display:none;"></div>
									<div class="user-info nomember"></div>
								</div>
								<div class="profile-camera"></div>	
							</div>											
						</div>
						<div class="col-4" id="formUser">
						</div>
						<div class="col-4" style="padding-left:30px;">
							<div class="form-group row custom-tab">
			                        <div class="col-4 div-btn">
			                        	<button class="btn selected-tab">감면정보</button>
			                        </div>
			                        <div class="col-4 div-btn">
			                        	<button class="btn">추가관리정보</button>
			                        </div>
		                     </div>
							<div id="gridDc"></div>
							<div id="gridEtc" style="display:none;"></div>
						</div>						
					</div>																																											
			</div>		
			
		</div>
	</div>
</div>
<div class="row">
	<div class="col-12">
		<div class="row" style="margin-top:5px;">
			<div class="card-body col-12" style="padding: 0; margin-top:-10px;">
				<div id="scrolledtabs">
					<div class="tabs-container"></div>
				</div>
			</div>
		</div>
		<div class="tab-contents">
		
		<div id="tab1" style="display:none;">
			<div class="row">
				<div class="form-group col-12 btn-top-area">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div class="form-option"></div>
					<div class="form-help" style="display:inline-block;font-size:1.2rem;vertical-align: middle;"><i class="dx-icon dx-icon-help" style="font-size:1.2rem;"></i></div>
					<div class="tooltipEx">체크하면 마이너스 매출 강좌도 함께 표시</div>					
				</div>
			</div>
			<div class="row">
				<div class="gridContainer box-body">				
				</div>
			</div>	
		</div>
		
		<div id="tab2" style="display:none;">
			<div class="row form-horizontal">
				<div class="form-group row col-3 custom-tab">
	                 <div class="col-6 div-btn">
	                 	<button class="btn selected-tab">강좌신청현황</button>
	                 </div>
	                 <div class="col-6 div-btn">
	                 	<button class="btn">사물함신청현황</button>
	                 </div>
                 </div>	

			</div>
			<div class="row tab2_1" style="display:none;">
				<div class="form-group col-12 btn-top-area">
					<div></div>
					<div></div>
				</div>			
				<div class="gridContainer box-body">				
				</div>
			</div>
			<div class="row tab2_2" style="display:none;">
				<div class="form-group col-12 btn-top-area">
					<div></div>
					<div></div>
				</div>			
				<div class="gridContainer box-body">				
				</div>
			</div>				
		</div>	
		
		<div id="tab3" style="display:none;">
			<div class="row">
				<div class="form-group col-12 btn-top-area">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
			<div class="row">
				<div class="gridContainer box-body">				
				</div>
			</div>	
		</div>
		
		<div id="tab4" style="display:none;">
			<div class="row">
				<div class="form-group col-12 btn-top-area">
					<div></div>
					<div></div>
				</div>
			</div>
			<div class="row">
				<div class="gridContainer box-body">				
				</div>
			</div>	
		</div>
		
		<div id="tab5" style="display:none;">
			<div class="row">
				<div class="form-group col-12 btn-top-area">
				</div>
			</div>
			<div class="row">
				<div class="gridContainer box-body">				
				</div>
			</div>	
		</div>
		
		<div id="tab6" style="display:none;">
			<div class="row">
				<div class="form-group col-12 btn-top-area">
				</div>
			</div>
			<div class="row">
				<div class="gridContainer box-body">				
				</div>
			</div>	
		</div>
		
		<div id="tab7" style="display:none;">
			<div class="row">
				<div class="form-group col-12 btn-top-area">
					<div></div>
				</div>
			</div>
			<div class="row">
				<div class="gridContainer box-body">				
				</div>
			</div>	
		</div>
		
		<div id="tab8" style="display:none;">
			<div class="row">
				<div class="form-group col-12 btn-top-area">
				</div>
			</div>
			<div class="row">
				<div class="gridContainer box-body">				
				</div>
			</div>	
		</div>												
		
		</div>	
	</div>
</div>
<%@ include file="/WEB-INF/jsp/fmcs/locker/popup/lockerUtil.jsp"%>
