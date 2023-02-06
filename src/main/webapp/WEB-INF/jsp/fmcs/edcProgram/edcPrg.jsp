<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<script>window.jQuery || document.write(decodeURIComponent('%3Cscript src="js/jquery.min.js"%3E%3C/script%3E'))</script>
<link rel="stylesheet" href="/fmcs/css/fmcs_style3.css">

<script src="/fmcs/js/default_data.js"></script>
<script src="/backOffice/ckeditor/ckeditor.js"></script>

<script src="/fmcs/js/edcProgram/default.js"></script>
<script src="/fmcs/js/edcProgram/edcManager/educationProgram.js"></script>
<script src="/fmcs/js/edcProgram/edcManager/rightEduProgram.js"></script>
<script src="/fmcs/js/edcProgram/edcManager/popup/editForm.js"></script>
<script src="/fmcs/js/edcProgram/edcManager/popup/batchFreeTimeSchedule.js"></script>
<script src="/fmcs/js/edcProgram/edcManager/popup/instructorSearch.js"></script>
<script src="/fmcs/js/edcProgram/edcManager/popup/feeReg.js"></script>
<!-- <script src="/fmcs/js/edcProgram/edcManager/popup/feeSelect.js"></script> -->
<script src="/fmcs/js/edcProgram/edcManager/popup/selectHolidayTime.js"></script>

<script src="/fmcs/js/edcProgram/edcManager/tab/tab1_bsis.js"></script><!-- 모집정보 -->
<script src="/fmcs/js/edcProgram/edcManager/tab/tab2_prgmItem.js"></script><!-- 요금 -->
<script src="/fmcs/js/edcProgram/edcManager/tab/tab3_dc.js"></script><!-- 할인/환불 -->
<script src="/fmcs/js/edcProgram/edcManager/tab/tab4_applyLimit.js"></script><!-- 신청제한 -->
<script src="/fmcs/js/edcProgram/edcManager/tab/tab5_elkr.js"></script><!-- 전자키발권 -->
<script src="/fmcs/js/edcProgram/edcManager/tab/tab6_contents.js"></script><!-- 강좌컨텐츠 -->
<script src="/fmcs/js/edcProgram/edcManager/tab/tab7_freetime.js"></script><!-- 자유이용시간 -->
<script src="/fmcs/js/edcProgram/edcManager/tab/tab8_history.js"></script><!-- 변경이력 -->

<script src="/fmcs/js/edcProgram/edcManager/popup/drawOptions.js"></script><!-- 추첨 옵션 설정 -->
<script>
$(document).ready(function () {
	formInit();	
});
</script>

<style>
/* .btn-group.dx-button {margin-left: 16px;height: 39px;} */
</style>

  <div class="row row_title">
	<div class="col-12">
		<ul class="navbar-nav">
 			<li class="nav-item d-sm-inline-block quick-nav">
		        강좌 관리
		    </li>
			<li>
				<ul class="common-menu">
				    <li class="nav-item d-sm-inline-block quick-nav">
				        <a href="javascript:void(0);" onclick="createEducationProgram();">
				        신규
				        <img src="/fmcs/images/ico_new.png"></a>
				    </li>
				    <li class="nav-item d-sm-inline-block quick-nav">
				         <a href="javascript:void(0);" onclick="updateEducationProgram();">수정 
				        <img src="/fmcs/images/ico_edit.png"></a>
				    </li>
				    <li class="nav-item d-sm-inline-block quick-nav">
				        <a href="javascript:void(0);" onclick="deleteEducationProgram();">삭제
				        <img src="/fmcs/images/ico_delete.png"></a>
				    </li>
				    <!-- <li class="nav-item d-sm-inline-block quick-nav">
				        <a href="javascript:void(0);" onclick="cancel();">취소
				        <img src="/fmcs/images/ico_cancel.png"></a>
				    </li> -->
			    </ul>
		    </li>
		</ul>	
	</div>
</div>
<div id="batchFreeTime_Popup"></div>
<div id="batchFreeTime_Holiday_Popup"></div>
<div id="instructor_popup"></div>
<div id="feeReg_popup"></div>
<div id="ageReg_popup"></div>
<div class="row style3_body">
 	<div class="col-2 style3_left">
 		<div class="style3-container">
			<div class="dx-fieldset">
          		<div class="dx-field">
            		<!-- <div class="dx-field-label"></div> -->
            		<!-- <div class="dx-field-value"></div> -->
            		<div id="tree-condition"></div>
		          </div>
	 		</div>
 		<div id="treeCategory" class="tree_normal"></div>
 		</div>
 	</div>
 	<div class="col-10" style="padding-right: 0px;" >
		<div class="style3_right">
			<div class="row" id="upArea">
				<div class="col-12">
					<div class="fmcs_condition edu_condition">
						<div class="form-group normal_condition" id="eduCondition" ></div>
						<div class="form-group buttons" >
							<div class="btn-group" id="searchBtn"></div>
							<div class="btn-group btnRefresh" id="searchInitBtn"></div>
							<!-- <div class="btn-group" id="freeTimeBatchSaveBtn"> </div>
							<div class="btn-group" id="copyEduPrgBtn"> </div> -->
						</div>
					</div>
					<!-- <div class="subject">강좌목록</div> -->
				 	<div id="gridEduPrg" style="height:360px;"></div>
			 	</div>
			</div>
			<div class="row" id="downArea" >
		 		<!-- <div class="subject edcprgnm"><span class='' id='EDC_PRGMNM'></span></div> -->
		 		<div class="col-12">
		 		 <div id="scrolledtabs">
			        <div class="tabs-container"></div>
	            </div>
	 			<div id="tab1" class="row" style="display:none;">
	 				<div class="col-2 tab_list">
	 				</div>
	 				<div class="col-10 tab_contents">
	 					<div id="tab1_contents1"></div>
			 			<div id="tab1_contents2"></div>
			 			<div id="tab1_contents3"></div>
			 		</div>
			 		<div id="draw_Popup"></div>
				 </div>
	            <div id="tab2" style="display:none;">
	            	<div class="tab_contents">
	            		<!-- <div style="width:70%"> -->
		            		<div class="tab_contents_form"></div>
		            		<div id="fee_grid" class="set-price-grid margintop-10"></div>
	    	        		<!-- <div class="row tab_footer"  >
	        	    		<div id="saveBtn2"></div>
	            			</div> -->
	            		<!-- </div>  -->
			 		</div>
				 </div>
				 <div id="tab3" class="row" style="display:none;">
				 	<div class="col-2 tab_list">
	 				</div>
	 				<div class="col-10 tab_contents">
	 					<div id='discount_form'></div>
	 					<div id='refund_form' ></div>
	 				</div>
	 				<!-- <div class="row tab_footer"  >
	        	    		<div id="saveBtn3"></div>
	            	</div> -->
				 </div>
				 <div id="tab4" class="row" style="display:none;">
			 		<div class="col-2 tab_list">
	 				</div>
	 				<div class="col-10 tab_contents">
	 					<div  id='reg_opt_form'></div>
	 					<div  id='age_opt_form' ></div>
	 				</div>
	 			<!-- 	<div class="row tab_footer"  >
	        	    		<div id="saveBtn4"></div>
	            	</div> -->
				 </div>
				 <!--<div id="tab5" style="display:none;">
				     <div class="row tab_header" style="padding-right:21px;" >
				    	<div class="col-8"><div id="saveBtn5"></div></div>
				    	<div class="col-4"></div>
	            	</div>
			 		<div class="row tab_contents">
				 		<div id="saveBtn5"></div>
			        	<div id="tab5_Keyform" class="col-4"></div>
				 		<div id="tab5_lockerGrid" class="col-4"></div>
			 		</div> 
				 </div>-->
				 <div id="tab5" class="row" style="display:none;">
	 				<div class="col-12 tab_contents">
	 					<div  id='tab5_Keyform'></div>
	 				</div>
				 </div>
				 <div id="tab6"  class="row" style="display:none;">
			 		<div class="col-2 tab_list">
	 				</div>
	 				<div class="col-10 tab_contents">
	 					<div  id='info_opt_form'></div>
	 					<div  id='caution_opt_form' ></div>
	 					<div  id='detailInfo_opt_form' ></div>
	 					<div  id='file_opt_form' ></div>
	 					<div  id='notice_opt_form' ></div>
	 				</div>
	 				<!-- <div class="row tab_footer"  >
	        	    		<div id="saveBtn6"></div>
	            	</div> -->
				 </div>
				 <div id="tab7" style="display:none;">
			 		 <!-- <div class="row tab_header" style="padding-right:15px;" >
				    	<div class="col-8"><div id="saveBtn7"></div></div> 
				    	<div class="col-12"></div>
	            	</div>
			 		 -->
			 		<div class="tab_contents">
			 		
			 		</div>
			 		<!-- <div class="row tab_footer"  >
	        	    		<div id="saveBtn7"></div>
	            	</div> -->
				 </div>
				 
				 <div id="tab8" class="row" style="display:none;">
			 		<div class="col-2 tab_list">
	 				</div>
	 				<div class="col-10 tab_contents">
	 					<div class="fmcs_condition edu_condition">
							<div class="form-group normal_condition" id="tab8-conditions" ></div>
							<div class="form-group buttons" >
								<div class="btn-group" id="tab8searchBtn"></div>
								<div class="btn-group btnRefresh" id="tab8searchInitBtn"></div>
							</div>
						</div>
	 					<div id="gridHistory"></div>
	 				</div>
				 </div>
			</div>
			</div>
 		</div>
 	</div>
 </div>

  