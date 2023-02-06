<%@ page import="org.egovframe.rte.fdl.string.EgovStringUtil" %>
<%@ page contentType="text/html; charset=utf-8" language="java"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<!DOCTYPE html>
<html lang="ko">
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

    <!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
    <script>
    	DevExpress.localization.locale("ko");
    	
        $(function() {
            $.widget.bridge('uibutton', $.ui.button);
        });
    </script>

    <!-- overlayScrollbars -->
    <script src="/backOffice/AdminLTE/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js"></script>
    
    <script src="/backOffice/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <!-- <script src="/fmcs/js/app_iframe.js"></script> -->
    
    <script src="/fmcs/js/default.js"></script>
    <script src="/fmcs/js/default_data.js"></script>
</head>

<script>
	var loadPanel;
	
    $(function () {
        document.addEventListener("DOMNodeRemoved", function (event) {
            try {
                $(event.target).children("iframe").each(function (index, item) {
                    var frame = item.contentWindow || item.contentDocument;

                    frame.jsRemoveCache();
                });
            } catch (e) {

            }
        }, false);
        
		loadPanel = $('.tab-loading').dxLoadPanel({
		    shadingColor: 'rgba(0,0,0,0.4)',
		    position: { of: '.fmcs-wrapper' },
		    visible: false,
		    showIndicator: true,
		    showPane: false,
		    shading: false,
		    hideOnOutsideClick: false,
		}).dxLoadPanel('instance');
     	  
      	$(".main-sidebar .nav-link").on("click", function() {
      		var linkUrl = $(this).attr("href");
      		
      		if (linkUrl && linkUrl.length > 1) {
      			loadPanel.show();
      			
      			setTimeout(function() {
      				/* try {
      					if(document.fullscreenEnabled && !document.fullscreenElement) {
      						document.documentElement.requestFullscreen();      						
      					}
      				} catch(e) {} */
      				
      				// 탭추가
      				var tabCnt = $(".iframe-mode .navbar-nav .btn-iframe-close").length;
      				
	  				if (tabCnt > 5) {
						for(var i=0; i<5; i++) {
							if ((tabCnt-i) > 5) {
								// 탭 최대개수 초과시 이전 탭 삭제
								$(".iframe-mode .navbar-nav a.nav-link:not(a.nav-fixed)").eq(0).parent().find(".btn-iframe-close").trigger("click");	
								// 탭 포커스
								setTimeout(function() {
									$('.content-wrapper').IFrame('switchTab', $(".iframe-mode .navbar-nav a.nav-link").last());
								}, 10);   
							}
						}
	  				}
      			}, 10);  
      			
      			setTimeout(function() {
      				loadPanel.hide();
      				
      				// 추가한 탭 초기화
      				$(".iframe-mode .navbar-nav a.nav-link").each(function(idx) {
      					window.localStorage.setItem("fmcs_navbar_" + idx, $(this).attr("href"));
      				});
      				
      				fnNavbarInit($(".iframe-mode .navbar-nav > li.nav-item").last());
      				
      			}, 1000);      			
      		}
      	});        
    });
    
    function fnNavbarInit(selector) {
		$(selector).each(function() {
			$(this).on("mouseenter", function() {
				$(this).find(".btn-iframe-pin").show();
			});
			
			$(this).on("mouseleave", function() {
				$(this).find(".btn-iframe-pin").hide();
			});
		});
		
		$(selector).find(".btn-iframe-close").each(function() {
			var pidx = $(".iframe-mode .navbar-nav > li.nav-item > .btn-iframe-close").index(this);
			
			$(this).on("click", function() {
				for(var i=0; i<5; i++) {
					window.localStorage.removeItem("fmcs_navbar_" + i);
					window.localStorage.removeItem("fmcs_navbar_pin_" + i);
				}
				
				setTimeout(function() {
	     			$(".iframe-mode .navbar-nav a.nav-link").each(function(idx) {
	     				window.localStorage.setItem("fmcs_navbar_" + idx, $(this).attr("href"));
	     				
	     				if ($(this).hasClass("nav-fixed")) {
	     					window.localStorage.setItem("fmcs_navbar_pin_" + idx, $(this).attr("href"));
	     				}
	     			});
 				}, 1000); 
			});
			
			$(this).after('<a href="#" class="btn-iframe-pin" style="display:none"><i class="fa fa-thumb-tack"></i></a>');
			$(this).next().on("click", function() {
				if ($(".iframe-mode .navbar-nav > li.nav-item > .nav-fixed").length >= 3) {
					DevExpress.ui.notify('메뉴 고정은 3개까지만 가능합니다.');
				} else {
					$(this).next().addClass("nav-fixed");
					var idx = $(".iframe-mode .navbar-nav > li.nav-item > .btn-iframe-pin").index(this);
					window.localStorage.setItem("fmcs_navbar_pin_" + idx, $(this).next().attr("href"));
				}
			});
			
		 	var fmcs_navbar_pin = window.localStorage.getItem("fmcs_navbar_pin_" + pidx);	
		 	
			if (fmcs_navbar_pin && fmcs_navbar_pin.length > 5) {
				$(this).parent().find("a.nav-link").addClass("nav-fixed");
		 	}				
		});
    }

    function fnHideLoadPanel() {
    	loadPanel.hide();
    } 
    
    function toggleAlarm() {
    	$(".admin-container .dropdown-menu").hide();
    	
    	if ($(".alaram-container .dropdown-menu").is(":visible")) {
    		$(".alaram-container .dropdown-menu").hide();
    	} else {
    		$(".alaram-container .dropdown-menu").show();
    	}
    }
    
    function toggleAdminInfo() {
    	$(".alaram-container .dropdown-menu").hide();
    	
    	if ($(".admin-container .dropdown-menu").is(":visible")) {
    		$(".admin-container .dropdown-menu").hide();
    	} else {
    		$(".admin-container .dropdown-menu").show();
    	}
    } 
    
	function jsToggleCenter() {
		if ($(".center-container").is(":visible")) {
			$(".center-container").hide();
			$(".logout-container").show();	
		} else {
			$(".logout-container").hide();
			$(".center-container").show();
			
			$('.centerlist').dxList({
				dataSource: centers,
			    displayExpr: 'text',
			    valueExpr: 'value',
			    selectionMode: 'single',
			    scrollingEnabled:true,
			    onSelectionChanged() {
			    	jsLogin();
			    },
			});			
		}

	}
</script>

<style>
.sidebar-mini.sidebar-collapse .main-sidebar, .sidebar-mini.sidebar-collapse .main-sidebar::before {
	width: 48px;
}
.nav-link {
    padding: 0.5rem 0.2rem;
}
.navbar-expand .navbar-nav .nav-link {
	padding-left: 0.5rem;
}
@media (min-width: 992px) {
  .sidebar-mini.sidebar-collapse .content-wrapper,
  .sidebar-mini.sidebar-collapse .main-footer,
  .sidebar-mini.sidebar-collapse .main-header {
    margin-left: 48px !important;
  }
}
.iframe-mode .navbar-nav .nav-item {
	padding-left:10px;
}
</style>

<body class="hold-transition sidebar-mini layout-fixed sidebar-collapse iframe-mode-fullscreen" style="overflow:hidden">
<div class="wrapper" style="overflow:hidden">

    <!-- Navbar -->
    <nav class="navbar navbar-expand navbar-white navbar-dark" style="background:black;left: 0;
    position: fixed;
    top: 0;
    right: 0;
    height: 40px;
    z-index: 0;">
        <tiles:insertAttribute name="libnavbar" />
    </nav>
    <!-- /.navbar -->

	    <aside class="main-sidebar sidebar-light-primary" style="float:left;position: fixed;top: 40px;border-right:1px solid #393939; font-size:0.9em;">
	        <tiles:insertAttribute name="libsidebar" />
	    </aside>
	    <div class="fmcs-wrapper" style="display:block;">
			   <div class="content-wrapper iframe-mode" data-widget="iframe" data-loading-screen="400">
			        <div class="nav navbar navbar-expand navbar-white navbar-dark p-0" style="position: fixed;
					    top: 0;
					    left: 370px;
					    width: calc(100vw - 750px);
					    background-color: #000;
					    height: 40px;					    
					    z-index: 10;">
			            <!-- <a class="nav-link bg-dark" href="#" data-widget="iframe-scrollleft"><i class="fas fa-angle-double-left"></i></a> -->
			            <ul class="navbar-nav overflow-hidden" role="tablist"></ul>
			            <!-- <a class="nav-link bg-dark" href="#" data-widget="iframe-scrollright"><i class="fas fa-angle-double-right"></i></a> -->
			        </div>
			        <div class="tab-content">
			            <div class="tab-empty">
<!-- 			                <h2 class="display-4">메뉴를 선택해 주세요</h2> -->
			                <iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQkJHLsuonS3BKsWtJDqesagmtyevcXPd9FwNLG0J8N1pva0aZcx2hF9cijsY-vEgMPQS0yWn8PumKZ/pubhtml?gid=1386834576&amp;single=true&amp;widget=true&amp;headers=false"></iframe>
			            </div>
			            <div class="tab-loading">
			            </div>
			        </div>
			    </div>
			    <%-- <tiles:insertAttribute name="libbody" /> --%>
	    </div>
	<div>
	
    </div>
    <!-- /.content-wrapper -->
<%--     <footer class="main-footer">
        <tiles:insertAttribute name="libfooter" />
    </footer> --%>

    <!-- Control Sidebar -->
    <aside class="alaram-container">
        <div class="dropdown-menu" style="display:none;position:fixed;bottom:0;width:320px;background:#000;color:#fff;top:38px;border-top: 1px solid #333;left:initial;right:0;">
			<ul style="list-style: none;padding:0 20px;">
				<li style="margin-top:5px;font-size:1rem;">
			    	업무알림
			    </li>
			</ul>
			<ul class="alaram-item" style="list-style: none;padding:20px;margin:0;">
			    <li style="font-size:0.8rem;text-align:right">
			    	   2022-09-14 15:59
			    	   &nbsp;<a href="#" style="color: #fff;"><i class="fa fa-close"></i></a>
			    </li>
			    <li style="margin-top:0px;font-size:0.8rem;font-weight:800;">
			    	   환불신청
			    </li>
			    <li style="margin-top:5px;font-size:0.8rem;">
			    	   환불신청이 접수되었습니다. 수강환불 현황을 확인하세요.
			    </li>
		    </ul>
			<ul class="alaram-item" style="list-style: none;padding:20px;margin:0;">
			    <li style="font-size:0.8rem;text-align:right">
			    	   2022-09-13 12:31
			    	   &nbsp;<a href="#" style="color: #fff;"><i class="fa fa-close"></i></a>
			    </li>
			    <li style="margin-top:0px;font-size:0.8rem;font-weight:800;">
			    	   대관예약
			    </li>
			    <li style="margin-top:5px;font-size:0.8rem;">
			    	   대관예약 신청건이 있습니다. 대관예약 현황을 확인하세요.
			    </li>
		    </ul>		    		    		    		    
		</div>
    </aside>
    <aside class="admin-container">
		<ul class="dropdown-menu" style="display:none;position:fixed;width:320px;height:282px;top:38px;border-top: 1px solid #333;padding:20px;left:initial;right:0;">
			<!-- The user image in the menu -->
			<li class="user-header" style="text-align:center;">
				<img src="/fmcs/images/user.png" class="img-circle" alt="User Image" style="height: 100px;">
				<p></p>
			</li>
			<li class="user-footer row" style="margin-top:20px;">
<!-- 				<div class="col-4" style="padding:0 6px 0 0;"> -->
<!-- 					<a href="#" class="btn btn-default btn-flat" style="width:100%;font-size:0.8rem;">센터변경</a> -->
<!-- 				</div>			 -->
<!-- 				<div class="col-4" style="padding:0;"> -->
<!-- 					<a href="/fmcs/auth/login" class="btn btn-default btn-flat" style="width:100%;font-size:0.8rem;padding-left: 6px;padding-right: 6px;">비밀번호변경</a> -->
<!-- 				</div> -->
<!-- 				<div class="col-4" style="padding:0 0 0 6px;"> -->
<!-- 					<a href="/fmcs/auth/login" class="btn btn-default btn-flat" style="width:100%;font-size:0.8rem;">로그아웃</a> -->
<!-- 				</div>			 -->
				<div class="col-12" style="margin-top:5px;">
					<a href="javascript:jsToggleCenter();" class="btn btn-default btn-flat" style="width:100%;font-size:0.8rem;">센터변경</a>
				</div>
				<div class="center-container col-12" style="display:none;
					background-color: #fff;
					border: 1px solid rgb(221, 221, 221);
					margin-top: -1px;
				    margin-left: 8px;
				    max-width: calc(100% - 16px);">
					<div class="centerlist"></div>
				</div>	
				<div class="logout-container col-12">
					<div style="margin-top:5px;">
						<a href="#" class="btn btn-default btn-flat" style="width:100%;font-size:0.8rem;">비밀번호변경</a>
					</div>
					<div style="margin-top:5px;">
						<a href="/fmcs/auth/login" class="btn btn-default btn-flat" style="width:100%;font-size:0.8rem;">로그아웃</a>
					</div>					
				</div>						
			
			</li>
		</ul>		
    </aside>    
    <!-- /.control-sidebar -->
</div>
<!-- ./wrapper -->

</body>
</html>