<%@ page import="org.egovframe.rte.fdl.string.EgovStringUtil" %>
<%@ page contentType="text/html; charset=utf-8" language="java"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<!DOCTYPE html>
<html lang="ko" style="height:initial !important">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>FMCS 관리자</title>

    <!-- Google Font: Source Sans Pro -->
    <link rel="stylesheet" href="/backOffice/css/fonts-noto-sans.css">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="/webjars/fortawesome__fontawesome-free/6.2.1/css/all.min.css" />
    <link rel="stylesheet" href="/backOffice/AdminLTE/plugins/font-awesome/css/font-awesome.min.css">
    <!-- Tempusdominus Bootstrap 4 -->
	<link rel="stylesheet" href="/backOffice/AdminLTE/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css">
    
    <!-- Theme style -->
    <link rel="stylesheet" href="/backOffice/AdminLTE/dist/css/adminlte.min.css">

    <!-- overlayScrollbars -->
    <link rel="stylesheet" href="/backOffice/AdminLTE/plugins/overlayScrollbars/css/OverlayScrollbars.min.css">
    
	<!-- <link rel="stylesheet" type="text/css" href="/backOffice/DevExtreme/22.1.5/css/dx.common.css" /> -->
	<link rel="stylesheet" type="text/css" href="/backOffice/DevExtreme/22.1.5/css/dx.light.css" />
    <!-- 관리자 css -->
    <link rel="stylesheet" type="text/css" href="/fmcs/css/library.css">	
	<link rel="stylesheet" type="text/css" href="/fmcs/css/fmcs.css" />

  	
   <!--  <link rel="stylesheet" href="/backOffice/css/admin.css"> -->
    <!-- jQuery -->
    <script src="/backOffice/AdminLTE/plugins/jquery/jquery.min.js"></script>
    <script src="/backOffice/AdminLTE/plugins/jquery-ui/jquery-ui.min.js"></script>
    <!-- Bootstrap 4 -->
    <script src="/backOffice/AdminLTE/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>    
     <!-- moment -->
    <script src="/backOffice/AdminLTE/plugins/moment/moment.min.js"></script>
    <script src="/backOffice/AdminLTE/plugins/moment/locale/ko.js"></script>
    
	<!-- Tempusdominus Bootstrap 4 -->
	<script src="/backOffice/AdminLTE/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js"></script>
   
    <!-- AdminLTE App -->
    <script src="/backOffice/AdminLTE/dist/js/adminlte.min.js"></script>
	<script>window.jQuery || document.write(decodeURIComponent('%3Cscript src="js/jquery.min.js"%3E%3C/script%3E'))</script>
    <script src="/backOffice/DevExtreme/22.1.5/js/devextreme/knockout-latest.js"></script>
	<script src="/backOffice/DevExtreme/22.1.5/js/devextreme/dx.all.js"></script>
    <script src="/backOffice/DevExtreme/22.1.5/js/devextreme/cldr.min.js"></script>
    <script src="/backOffice/DevExtreme/22.1.5/js/devextreme/cldr/event.min.js"></script>
    <script src="/backOffice/DevExtreme/22.1.5/js/devextreme/cldr/supplemental.min.js"></script>
    <script src="/backOffice/DevExtreme/22.1.5/js/devextreme/cldr/unresolved.min.js"></script>	
	<script src="/backOffice/DevExtreme/22.1.5/js/devextreme/globalize.min.js"></script>
	<script src="/backOffice/DevExtreme/22.1.5/js/devextreme/globalize/message.min.js"></script>
	<script src="/backOffice/DevExtreme/22.1.5/js/devextreme/globalize/number.min.js"></script>
	<script src="/backOffice/DevExtreme/22.1.5/js/devextreme/globalize/currency.min.js"></script>
	<script src="/backOffice/DevExtreme/22.1.5/js/devextreme/globalize/date.min.js"></script>
	<script src="/backOffice/DevExtreme/22.1.5/js/devextreme/localization/dx.messages.ko.js"></script>
	<script src="/webjars/underscore/1.13.4/underscore.js"></script>
	
	<script src="/backOffice/jspdf/2.5.1/jspdf.umd.min.js"></script>
	<script src="/backOffice/jspdf/2.5.1/NanumSquareNeo-aLt.js"></script>
	
    <!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
    <script>
    document.addEventListener("keydown", function(event) {
        if (event.keyCode == 27) { // ESC
        	event.preventDefault();
        
        	if ($(".dx-dialog").length > 0) {
        		$($(".dx-dialog").get().reverse()).each(function() {
        			$(this).find(".dx-button").eq($(".dx-dialog .dx-button").length-1).trigger("click");
        			return false;;
        		});
        	}
        
        	if ($(".dx-button.dx-closebutton").length > 0) {
        		console.log($(".dx-button.dx-closebutton").length);
        		$($(".dx-button.dx-closebutton").get().reverse()).each(function() {
        			console.log($(this).is(":visible"));
        			if ($(this).is(":visible")) {
        				console.log("trigger");
            			//$(this).trigger("click"); // 팝업 닫기
            			$(this).click();
            			return false;
            		}
        		});
        	}
        	

        } else if (event.keyCode == 116) { // F5
        	event.preventDefault();
        	var activeFrameIdx = $(".content-wrapper.iframe-mode li.nav-item", top.document).index($(".content-wrapper.iframe-mode li.active", top.document))
        	
        	if (activeFrameIdx > -1) {
        		top.frames[activeFrameIdx + 1].location.reload();   // TODO: 변경사항 iframe 추가로 인덱스 증가처리, 차후에 수정 필요함
        	}
        }
    });    
    	DevExpress.localization.locale("ko");
    	
        $(function() {
            $.widget.bridge('uibutton', $.ui.button);
        });
        
        $(document).ready(function () {
        	parent.fnHideLoadPanel();
        	
    		_.templateSettings = {
   			    interpolate: /\<\@\=(.+?)\@\>/gim,
   			    evaluate: /\<\@([\s\S]+?)\@\>/gim,
   			    escape: /\<\@\-(.+?)\@\>/gim
        	};
        	
        	if ($(".row.row_title .navbar-nav > li").length == 1) {
        		var tmpl = _.template($("#top-common-menu-tmpl").html());
        		$(".row.row_title .navbar-nav").append(tmpl);
        	}
        	
        	if ($(".row.row_title .navbar-nav .common-menu").length == 1) {
        		var tmpl = _.template($("#top-common-menu-item-tmpl").html());
        		$(".row.row_title .navbar-nav .common-menu").append(tmpl({title: "즐겨찾기", icon: "fa-star"}));
        		//$(".row.row_title .navbar-nav .common-menu").append(tmpl({title: "상단고정", icon: "fa-thumb-tack"}));
        	}
        	
			setTimeout(function() {
        		gridInit();
  			}, 2000);
        });        
    </script>

    <!-- overlayScrollbars -->
    <script src="/backOffice/AdminLTE/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js"></script>
    <script src="/fmcs/js/default.js"></script>
</head>
<style>
	html, body {height:100% !important;}
	.dropdown-menu.show {left:auto; right:0;top:30px;}
	.navbar-nav .quick-nav {margin: -5px 0;
	    height: 40px;
	    padding: 8px 20px;
    }
    nav.navbar .navbar-nav .quick-nav {color: #C6C6C6;font-size:0.9em;}
    .row_title .navbar-nav .quick-nav {color: #fff;}    
    nav.navbar .navbar-nav .quick-nav a{color: #bbb;}
    .row_title .navbar-nav .quick-nav a{color: #fff;}
	.navbar-nav .quick-nav a:hover{color:#fff;}
	.navbar-nav .quick-nav:hover {background-color:rgba(255, 255, 255, 0.25);}
	nav.navbar .navbar-nav .quick-nav:hover {color: #fff;}
	nav.navbar .navbar-nav .quick-nav a:hover{color: #fff;}
	.navbar-nav .quick-nav i {margin-left:5px;}
</style>
<script id="top-common-menu-tmpl" type="text/template">
	<li>
		<ul class="common-menu">
		</ul>
	</li>
</script>
<script id="top-common-menu-item-tmpl" type="text/template">
	<li class="nav-item d-sm-inline-block quick-nav">
		<@=title@>
		<i class="nav-icon fa <@=icon@>"></i>
	</li>
</script>
<body style="overflow:hidden;">
	<tiles:insertAttribute name="bodybody"/>
</body>
</html>