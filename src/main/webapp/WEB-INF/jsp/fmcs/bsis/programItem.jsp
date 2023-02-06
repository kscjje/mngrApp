<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<script>window.jQuery || document.write(decodeURIComponent('%3Cscript src="js/jquery.min.js"%3E%3C/script%3E'))</script>
<link rel="stylesheet" href="/fmcs/css/fmcs_edu.css">

<script src="/fmcs/js/default_data.js"></script>
<script src="/fmcs/js/edcProgram/default.js"></script>
<script src="/fmcs/js/bsis/programItem.js"></script>
<script src="/fmcs/js/bsis/popup/programItemEditForm.js"></script>
<script src="/fmcs/js/bsis/tab/prgItem/tab1_edc.js"></script>
<script src="/fmcs/js/bsis/tab/prgItem/tab2_daily.js"></script>
<script src="/fmcs/js/bsis/tab/prgItem/tab3_locker.js"></script>
<script src="/fmcs/js/bsis/tab/prgItem/tab4_rent.js"></script>
<script src="/fmcs/js/bsis/tab/prgItem/tab5_etc.js"></script>

<script>
$(document).ready(function () {
	formInit();
});

</script>

<style>
.custom-tab button.btn {
    background: #fff;
    color: #161616;
}
.custom-tab button {
    font-size: 0.9rem;
}
.custom-tab button.selected-tab {
    background: #000;
    color: #fff;
}

/* .btn-group.dx-button {margin-left: 16px;height: 39px;} */
</style>

  <div class="row row_title">
	<div class="col-12" style="height:30px;background:#022B70;height:48px;">
		<ul class="navbar-nav" style="color:white;flex-direction: row;display: flex;box-sizing: border-box;margin-top: 4px;">
 			<li class="nav-item d-sm-inline-block quick-nav" style="color:white;width:280px;font-size:1.1rem;">
		        이용상품요금관리
		    </li>
		</ul>	
	</div>
</div>

<div class="row">
 	<div class="col-2">
 		<div class="shadow_box">
 		<div id="treeCategory" class="tree_normal"></div>
 		</div>
 		<!-- <div class="float-right">
                    <div class="input-group input-group-sm">
                        <button type="button" class="btn btn-default">순서 이동</button>
                        <span class="input-group-append">
                            <button type="button" class="btn orderbtn " onclick="jsOrder('UP');">▲</button>
                            <button type="button" class="btn orderbtn" onclick="jsOrder('DOWN');">▼</button>
                        </span>
                    </div>
        </div> -->
 	</div>
 	<div class="col-10 padding-lr-0" >
 		<div class="row">
				<div class="col-12 padding-lr-0">
					<div class="fmcs_condition" style='height:100px'>
						<div class="form-group normal_condition" id="prgItemCondition" ></div>
						<div class="form-group buttons" >
							<div class="btn-group" id="searchBtn"></div>
							<div class="btn-group btnRefresh" id="searchInitBtn"></div>
							<!-- <div class="btn-group" id="freeTimeBatchSaveBtn"> </div>
							<div class="btn-group" id="copyEduPrgBtn"> </div> -->
						</div>
					</div>
			 	</div>
		</div>
		<div class="row">
 		<div class="col-12 shadow_box">
			 <div id="scrolledtabs">
		        <div class="tabs-container"></div>
		     </div>
			 <div id="tab1"><div id="tab1_form"></div></div><!-- 정기상품 -->
 			 <div id="tab2" style="display:none;"><div id="tab2_form"></div></div><!-- 일일입장권 -->
 			 <div id="tab3" style="display:none;"><!-- 사물함 -->
 				<div class="row form-horizontal custom-tab" style="padding-top:10px;">
			 		<div class="col-2 div-btn">
						<button class="btn selected-tab" onClick="lockerChangeTab(this,0)">기본 요금</button>
					</div>
					<div class="col-2 div-btn">
					    <button class="btn" onClick="lockerChangeTab(this,1)">사물함위치별 요금</button>
				    </div>
		        </div> 				 
 			 	<div class="row" style="padding-top:10px;">
		 		<div class="col-12">
 					<div id="formLockerA" ></div>
 					<div id="formLockerB" style="display:none;"></div>
 					</div>
 				</div>
			</div>
 			<div id="tab4" style="display:none;"><!-- 대관 -->
 			 	<div class="row form-horizontal custom-tab" style="padding-top:10px;">
			 		<div class="col-2 div-btn">
						<button class="btn selected-tab" onClick="RentChangeTab(this,0)">부속시설 요금</button>
					</div>
					<div class="col-2 div-btn">
					    <button class="btn" onClick="RentChangeTab(this,1)">대관장소별 요금</button>
				    </div>
		        </div> 				 
 			 	<div class="row" style="padding-top:10px;">
		 			<div class="col-12">
 						<div id="formRentA" ></div>
 						<div id="formRentB" style="display:none;"></div>
 					</div>
 				</div>
 			</div>
			 <div id="tab5" style="display:none;"><!-- 기타 -->
			 	<div id="tab5_form"></div>
			 </div>
 		</div>
 	</div>
 </div>

  