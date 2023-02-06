<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<link rel="stylesheet" href="/fmcs/css/fmcs_edu.css">
<link rel="stylesheet" href="/fmcs/css/fmcs_member.css">
<script src="/fmcs/js/default_data.js"></script>
<script src="/fmcs/js/edcProgram/default.js"></script>

<script src="/fmcs/js/edcProgram/memberState/memberState.js"></script>
<script src="/fmcs/js/edcProgram/memberState/popup/edcDelay.js"></script>
<script src="/fmcs/js/edcProgram/memberState/popup/edcChange.js"></script>
<script src="/fmcs/js/member/popup/edc_change.js"></script>
<script src="/fmcs/js/member/popup/edc_search.js"></script>
<script>
$(document).ready(function () {
	formInit(); // 
});
var payList = [
	{PAY_SEQ:'1',PAY_TYPE:'현금',PAY_PRICE:1000},
	{PAY_SEQ:'2',PAY_TYPE:'KB카드',PAY_PRICE:2000},
	{PAY_SEQ:'3',PAY_TYPE:'비씨카드',PAY_PRICE:1200},
];	
function getPaymentColumnList() {
	var resultColumn = {};
	
	resultColumn = [{
		dataField: 'PAY_SEQ',
		caption: '결제번호',
		visible: false,
	}, {		
		dataField: 'PAY_TYPE',
		caption: '결제수단',	
	}, {		
		dataField: 'PAY_PRICE',
		caption: '결제금액',			
	}, {
        type: "buttons",
        buttons: [{
            text: "결제취소",
            onClick: function (e) {
                // Execute your command here
            }
        }]
    }];
	
	resultColumn = setColumnAlignment(resultColumn);
	return resultColumn;
}
</script>
<style>
.item-has-helptext{width:200px;}
</style>
<div id='eduChange_popup'></div>
<div id='eduDelay_popup'></div>
<div id='userPopup'></div>
<div id='userPopup2'></div>

<div class="row row_title">
	<div class="col-12">
		<ul class="navbar-nav">
 			<li class="nav-item d-sm-inline-block quick-nav">
		        수강회원현황
		    </li>
		</ul>	
	</div>
</div>
<div class="row">
 	<div class="col-12 padding-lr-0" >
		<div class="fmcs_condition" style="height:140px;">
			<div class="form-group normal_condition" id='userStateCondition' ></div>
			<div class="form-group buttons" >
				<div class="btn-group" id="searchBtn"></div>
				<div class="btn-group btnRefresh" id="searchInitBtn"></div>
			</div>
		</div>
 	</div>
</div>
<div class="row">
	<div class="col-12 shadow_box">
	<div id="gridEduUser"></div>
	</div>
</div>

