<%@ page import="org.egovframe.rte.fdl.string.EgovStringUtil" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<%
	String error = EgovStringUtil.null2void(request.getParameter("error"));
	String errorMessage = EgovStringUtil.null2void((String) request.getAttribute("errorMessage"));

	String logout = EgovStringUtil.null2void(request.getParameter("logout"));
%>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>관리자</title>

	<!-- Google Font: Source Sans Pro -->
	<link rel="stylesheet" href="/backOffice/css/fonts-noto-sans.css">
	<!-- Font Awesome -->
	<!-- icheck bootstrap -->
	<link rel="stylesheet" href="/backOffice/AdminLTE/plugins/icheck-bootstrap/icheck-bootstrap.min.css">
	<!-- Theme style -->
	<link rel="stylesheet" href="/backOffice/AdminLTE/dist/css/adminlte.min.css">
	<link rel="stylesheet" type="text/css" href="/backOffice/DevExtreme/22.1.5/css/dx.light.css" />

	<script src="/backOffice/AdminLTE/plugins/jquery/jquery.min.js"></script>
	<script src="/backOffice/AdminLTE/plugins/jquery-ui/jquery-ui.min.js"></script>
	<!-- Bootstrap 4 -->
	<script src="/backOffice/AdminLTE/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
	<!-- AdminLTE App -->
	<script src="/backOffice/AdminLTE/dist/js/adminlte.min.js"></script>
	<script src="/backOffice/DevExtreme/22.1.5/js/devextreme/dx.all.js"></script>
	
</head>

<script language="JavaScript">

	function setCookie(cookieName, value, exdays){
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var cookieValue = escape(value) + ((exdays==null) ? "" : "; expires=" + exdate.toGMTString());
		document.cookie = cookieName + "=" + cookieValue;
	}

	function deleteCookie(cookieName){
		var expireDate = new Date();
		expireDate.setDate(expireDate.getDate() - 1);
		document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString();
	}

	function getCookie(cookieName) {
		cookieName = cookieName + '=';
		var cookieData = document.cookie;
		var start = cookieData.indexOf(cookieName);
		var cookieValue = '';
		if(start != -1){
			start += cookieName.length;
			var end = cookieData.indexOf(';', start);
			if(end == -1)end = cookieData.length;
			cookieValue = cookieData.substring(start, end);
		}
		return unescape(cookieValue);
	}
</script>

<body class="hold-transition login-page">
<div class="login-box" style="width: 400px">
	<div class="login-logo" style="    font-weight: 700;color: #666;">
<!-- 		<img src="/fmcs/images/spowise01.gif" class="mr-3" style="margin-top:-6px;margin-left: 15px;">FMCS -->
	</div>
	<!-- /.login-logo -->
	<div class="card" id="loginForm">
		<div class="card-body login-card-body">
			<p class="login-box-msg"></p>

			<%if (error.equals("true")) {%>
			<div class="alert alert-danger">
				<%=EgovStringUtil.null2string(errorMessage, "사용자 이름과 비밀번호가 잘못되었습니다.")%>
			</div>
			<script>
				window.onload = function(){
					$("#loginForm").effect("shake", {times:3}, 1000);
				};
			</script>
			<%}%>

			<%if (logout.equals("true")) {%>
			<div class="alert alert-success">
				로그아웃 되었습니다.
			</div>
			<%}%>

			<form method="post" name="form1" id="form1">
				<div class="input-group mb-3">
					<input type="text" class="form-control" name="ID" id="ID" placeholder="id" value="admin">
					<div class="input-group-append">
						<div class="input-group-text">
							<span class="fa fa-user"></span>
						</div>
					</div>
				</div>
				<div class="input-group mb-3">
					<input type="password" class="form-control" name="PWS" id="PWS" placeholder="Password" value="adminadmin1!">
					<div class="input-group-append">
						<div class="input-group-text">
							<span class="fas fa-lock"></span>
						</div>
					</div>
				</div>
				<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
				<div class="row">
					<div class="col-12">
						<a class="btn btn-block" style="background-color:#022B70;color:#fff;" onclick="jsCenterList();">로그인</a>
					</div>
				</div>
			</form>

			<!--
			<p class="mb-1">
				<a href="forgot-password.html">비빌번호 찾기</a>
			</p>
			<p class="mb-0">
				<a href="register.html" class="text-center">가입하기</a>
			</p>
			-->
		</div>
		<!-- /.login-card-body -->
	</div>
</div>
<!-- /.login-box -->

</body>
</html>
