<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<script>window.jQuery || document.write(decodeURIComponent('%3Cscript src="js/jquery.min.js"%3E%3C/script%3E'))</script>
<script src="/backOffice/ckeditor/ckeditor.js"></script>
<style>
.searchConditionForm {
	margin-bottom:5px;
}
.searchOptions{
	display:block;
}
.btnRefresh{
	width:100px;
}
</style>
<script>
$(document).ready(function () {
	
	const selectOption = [
		{
			id: 1,
			text: '그룹명',
		},
		{
			id: 2,
			text: '그룹코드',
		},
	];
	const selectOption2 = [
		{
			id: 1,
			text: '공통코드',
		},
		{
			id: 2,
			text: '기관별코드',
		},
	];
	const searchCondition = new DevExpress.data.DataSource({
		store: {
			data: selectOption,
			type: 'array',
			key: 'id',
		},
	});
	
	const searchCondition2 = new DevExpress.data.DataSource({
		store: {
			data: selectOption2,
			type: 'array',
			key: 'id',
		},
	});
	
	const form = $('#form').dxForm({
		//formData: reserveTicket,
		showColonAfterLabel:false,
	    items: [{
	        itemType: 'group',
	        cssClass: 'searchConditionForm',
	        colCount:3,
	        items: [{
	        	itemType: 'group',
	            items: [{
	                dataField: 'searchCondition1',label: {visible:false},editorType: 'dxSelectBox',
	                editorOptions: {
	                	dataSource:searchCondition,
	                	value: selectOption[0].id,
	                	displayExpr: 'text',
	                	valueExpr:'id',
	                	placeholder: '전체',
	                	showClearButton: true,
	                	value:'',
					},
	            }],
	        },{
	        	itemType: 'group',
	            items: [{
	                dataField: 'searchCondition2',label: {visible:false},
	            }],
	        },{
	        	itemType: 'group',
	            items: [{
	            	dataField: 'searchCondition3',label: {visible:false},editorType: 'dxSelectBox',
	            	editorOptions: {
	                	dataSource:searchCondition2,
	                	value: selectOption2[0].id,
	                	displayExpr: 'text',
	                	valueExpr:'id',
	                	placeholder: '전체',
	                	showClearButton: true,
	                	value:'',
					},
	            }],
	        }],
	    },],
	}).dxForm("instance");
	
	
	$('#searchBtn').dxButton({
		stylingMode: 'contained',
		icon: 'find',
		type: 'default',
		onClick() {
			DevExpress.ui.notify('조회');
		},
	});
	
	$('#searchRefresh').dxButton({
		stylingMode: 'contained',
		icon: 'clear',
		type: 'default',
		onClick() {
			DevExpress.ui.notify('초기화');
			//var frmInstance = $("#editForm").dxForm("instance");
			form.getEditor("searchCondition1").option("value","1");
			form.getEditor("searchCondition2").option("value","");
			form.getEditor("searchCondition3").option("value","0");
			//searchBox.option("value","");
			//$("#searchResult").css("display","none");
			//$("#searchDefault").css("display","");
		},
	});
	
	//var frmInstance = $("#editForm").dxForm("instance");
});
</script>
<div class="row row_title">
	<div class="col-12" style="height:30px;background:#022B70;height:48px;">
		<ul class="navbar-nav" style="color:white;flex-direction: row;display: flex;box-sizing: border-box;margin-top: 4px;">
			<li class="nav-item d-sm-inline-block quick-nav" style="color:white;width:280px;font-size:1.1rem;">
				공통코드 그룹관리
			</li>
			<li>
				<ul class="common-menu">
				    <li class="nav-item d-sm-inline-block quick-nav">
						<a href="javascript:codeRegist();">신규
							<img src="/fmcs/images/ico_new.png">
						</a>
					</li>
				    <li class="nav-item d-sm-inline-block quick-nav">
				    	<a href="javascript:codeModify();">수정
				    		<img src="/fmcs/images/ico_edit.png">
				    	</a>
				    </li>
				    <li class="nav-item d-sm-inline-block quick-nav">
				    	<a href="javascript:codeRemove();">삭제
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
		</ul>	
	</div>
</div>

<div class="row">
	<div class="col-12">
		<div class="card" style="box-shadow:none;">		
			<div class="card-body" style="margin: 0 -7.5px;padding-bottom: 0;">
				<div class="main-condition">
					<div class="row">
						<div id="form" style="width:90%;margin-right:5px;"></div>
						<div class="buttons">
							<div class="btn-group" id="searchBtn"></div>
							<div class="btn-group" id="searchRefresh"></div>
						</div>
					</div>
					<div class="shadow-row"></div>
				</div>
			</div>
		</div>
	</div>
</div>