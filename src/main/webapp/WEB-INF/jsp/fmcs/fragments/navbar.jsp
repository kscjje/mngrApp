<%@ page contentType="text/html; charset=utf-8" language="java"%>

<!-- Left navbar links -->
<ul class="navbar-nav" style="color:white;">
    <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button" style="padding: 0.1rem 0.5rem;"><i class="fas fa-bars"></i></a>
    </li>
  	
    <!--
    
    <li class="nav-item d-none d-sm-inline-block">
        <a href="#" class="nav-link">Contact</a>
    </li>
    -->
    <li class="nav-item d-sm-inline-block" style="margin-top:0px;font-weight:800;">
        <!-- <a href="/fmcs/main/main" style="color:white;">FMCS</a> -->
        <img src="/fmcs/images/spowise02.png" class="mr-3" style="margin-top:-6px;margin-left: 15px;">
    </li>
    <li class="nav-item d-sm-inline-block" style="margin:0px 12px; color:#555;">
        |
    </li>    
    <li class="nav-item d-sm-inline-block" style="margin-top:0px;font-weight:400;font-size:18px;">
        아쿠아드림파크
        <img src="/fmcs/images/facil_name.svg" class="mr-3" style="margin-top:-3px;">
    </li>
    <li class="nav-item d-sm-inline-block" style="margin:0px 20px; color:#555;">
        
    </li>    
<!--     <li class="nav-item d-sm-inline-block quick-nav">
        <a href="/fmcs/user/mainform">회원정보관리</a>
    </li> 
    <li class="nav-item d-sm-inline-block quick-nav">
        <a href="/fmcs/user/mainlist">회원정보조회</a>
    </li>
    <li class="nav-item d-sm-inline-block quick-nav">
        입장권매표관리
    </li>
    <li class="nav-item d-sm-inline-block quick-nav">
        강좌접수인원현황
    </li>
    <li class="nav-item d-sm-inline-block quick-nav">
        대관예약장소관리
    </li>  -->                           
</ul>

<!-- Right navbar links -->
<ul class="navbar-nav" style="position: absolute;right: 12px;">

    
<%--     <%if (!SUB_FIX.equals("")) {%>
    <li class="nav-item">
    <div class="alert alert-<%=SUB_CLASS%>" style="margin-bottom: 0px;padding: 5px">
        <b>[<%=SUB_FIX%>서버]</b>
    </div>
    </li>
    <%}%> --%>
    <li class="nav-item d-sm-inline-block" style="margin:5px 8px;">
        <img src="/fmcs/images/f1.png" class="mr-3" style="height:22px;">
    </li>
    <li class="nav-item d-sm-inline-block" style="margin:5px 8px;">
        <img src="/fmcs/images/f2.png" class="mr-3" style="height:22px;">
    </li>
    <li class="nav-item d-sm-inline-block" style="margin:5px 8px;">
        <img src="/fmcs/images/f3.svg" class="mr-3" style="height:22px;">
    </li>
    <li class="nav-item d-sm-inline-block" style="margin:5px 8px;">
        <img src="/fmcs/images/f4.svg" class="mr-3" style="height:22px;">
    </li>
    <li class="nav-item d-sm-inline-block" style="margin:5px 15px 5px 0;">
    	<p style="height: 15px;
    width: 15px;
    border-radius: 7px;
    background: #ff0000;
    float: left;
    position: relative;
    left: 30px;
    top: -2px;
    color: white;
    font-size: 0.5rem;
    padding-left: 4px;
    ">1</p>
	    <a href="javascript:toggleAlarm();">
	        <img src="/fmcs/images/f5.png" class="mr-3" style="height:22px;">
	    </a>
    </li>

	<li class="dropdown user user-menu" style="margin-top:8px;">
		<a href="javascript:toggleAdminInfo();">
			<img src="/fmcs/images/user.png" class="user-image" alt="User Image" style="height:25px;width:25px;">
			<span class="hidden-xs"></span>
		</a>
	</li>
</ul>
<script>	
	$(document).ready(function() {
		if ($(".iframe-mode .navbar-nav > li.nav-item").length < 1) {
			for(var i=0; i<5; i++) {
			 	var fmcs_navbar = window.localStorage.getItem("fmcs_navbar_" + i);	
			 	
				if (fmcs_navbar && fmcs_navbar.length > 5) {
				 	var fmcs_panel = fmcs_navbar.replace("#panel-", "");
				 	fmcs_navbar = fmcs_panel.replace("-BBS_ID-", "?BBS_ID=");
				 	fmcs_navbar = fmcs_navbar.replace(/-/gi, "/");

		 			var title = $(".main-sidebar li.nav-item > a[href='" + fmcs_navbar + "']").eq(0).text();
		 			$('.content-wrapper').IFrame('createTab', title, fmcs_navbar, fmcs_panel, false);
			 	}			
			}
		}
		
		fnNavbarInit(".iframe-mode .navbar-nav > li.nav-item");
	});
	
	function fnMovePage(menuID, param) {
		$(".main-sidebar .nav-item.submenu a").each(function() {
			var href = $(this).attr("href");
			
			if (href == menuID) {
				$(this).trigger("click");
				$(this).attr("param", param);
				
				try {
					if (param) {
						$("iframe[src='" + href + "']").get(0).contentWindow.setMember(param); // 이미 있는 프레임 param 전달
					}
				} catch(e) {}
				
				return false;
			}
		});
	}
	
	// 새로 실핸한 프레임 param 전달
	function fnIframeComplete() {
		if ($(".main-sidebar .nav-item.submenu a.active").length > 0) {
			var href = $(".main-sidebar .nav-item.submenu a.active").attr("href");
			var param = $(".main-sidebar .nav-item.submenu a.active").attr("param");
			
			try {
				if (param) {
					$("iframe[src='" + href + "']").get(0).contentWindow.setMember(param);
				}
			} catch(e) {}
		}
	}
</script>