<%@ page import="org.egovframe.rte.fdl.string.EgovStringUtil" %>
<%@ page contentType="text/html; charset=utf-8" language="java" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<%
String application_name = "fmcs";
String profile = "local";
    String SUB_FIX = "";
    String SUB_CLASS = "";

    if ("local".equals(profile)) {
        SUB_FIX = " 로컬 ";
        SUB_CLASS = "info";
    } else if ("dev".equals(profile)) {
        SUB_FIX = " 개발 ";
        SUB_CLASS = "warning";
    } else if ("stg".equals(profile)) {
        SUB_FIX = "검증 ";
        SUB_CLASS = "danger";
    }

    String M_CD = EgovStringUtil.null2void((String) request.getAttribute("M_CD"));
%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <sec:csrfMetaTags/>

    <title><%=SUB_FIX%><%=application_name%> 관리자</title>

    <!-- Google Font: Source Sans Pro -->
    <link rel="stylesheet" href="/backOffice/css/fonts-noto-sans.css">

    <!-- Font Awesome -->
    <link rel="stylesheet" href="/backOffice/AdminLTE/plugins/fontawesome-free/css/all.min.css">
    <link rel="stylesheet" href="/backOffice/AdminLTE/plugins/font-awesome/css/font-awesome.min.css">
	<!-- daterange picker -->
	<!-- <link rel="stylesheet" href="/backOffice/AdminLTE/plugins/daterangepicker/daterangepicker.css"> -->

	<!-- Tempusdominus Bootstrap 4 -->
	<link rel="stylesheet" href="/backOffice/AdminLTE/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css">
    
    <!-- Select2 -->
    <link rel="stylesheet" href="/backOffice/AdminLTE/plugins/select2/css/select2.min.css">
    <link rel="stylesheet" href="/backOffice/AdminLTE/plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css">

    <!-- Theme style -->
    <link rel="stylesheet" href="/backOffice/AdminLTE/dist/css/adminlte.min.css">

    <!-- overlayScrollbars -->
    <link rel="stylesheet" href="/backOffice/AdminLTE/plugins/overlayScrollbars/css/OverlayScrollbars.min.css">

   <!-- jQuery -->
    <script src="/backOffice/AdminLTE/plugins/jquery/jquery.min.js"></script>
    <script src="/backOffice/AdminLTE/plugins/jquery-ui/jquery-ui.min.js"></script>
    <!-- moment -->
    <script src="/backOffice/AdminLTE/plugins/moment/moment.min.js"></script>
    <script src="/backOffice/AdminLTE/plugins/moment/locale/ko.js"></script>
   	<!-- date-range-picker -->
    <!-- <script src="/backOffice/AdminLTE/plugins/daterangepicker/daterangepicker.js"></script> -->
	<!-- Tempusdominus Bootstrap 4 -->
	<script src="/backOffice/AdminLTE/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js"></script>
    <!-- AdminLTE App -->
    <script src="/backOffice/AdminLTE/dist/js/adminlte.min.js"></script>

    <!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
    <script>
        $.widget.bridge('uibutton', $.ui.button)
    </script>

    <!-- DataTables  & Plugins -->
    <link rel="stylesheet" href="/backOffice/AdminLTE/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css">
    <link rel="stylesheet" href="/backOffice/AdminLTE/plugins/datatables-responsive/css/responsive.bootstrap4.min.css">
    <link rel="stylesheet" href="/backOffice/AdminLTE/plugins/datatables-buttons/css/buttons.bootstrap4.min.css">
    <link rel="stylesheet" href="/backOffice/AdminLTE/plugins/datatables-select/css/select.bootstrap4.min.css">
    <script src="/backOffice/AdminLTE/plugins/datatables/jquery.dataTables.min.js"></script>
    <script src="/backOffice/AdminLTE/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js"></script>
    <script src="/backOffice/AdminLTE/plugins/datatables-responsive/js/dataTables.responsive.min.js"></script>
    <script src="/backOffice/AdminLTE/plugins/datatables-responsive/js/responsive.bootstrap4.min.js"></script>
    <script src="/backOffice/AdminLTE/plugins/datatables-buttons/js/dataTables.buttons.min.js"></script>
    <script src="/backOffice/AdminLTE/plugins/datatables-buttons/js/buttons.bootstrap4.min.js"></script>
    <script src="/backOffice/AdminLTE/plugins/jszip/jszip.min.js"></script>
    <%--
    <script src="/backOffice/AdminLTE/plugins/pdfmake/pdfmake.min.js"></script>
    <script src="/static/backOffice/AdminLTE/plugins/pdfmake/vfs_fonts.js"></script>
    --%>
    <script src="/backOffice/component/pdfmake_kor/pdfmake.min.js"></script>
    <script src="/backOffice/component/pdfmake_kor/vfs_fonts.js"></script>
    <script src="/backOffice/AdminLTE/plugins/datatables-buttons/js/buttons.html5.min.js"></script>
    <script src="/backOffice/AdminLTE/plugins/datatables-buttons/js/buttons.print.min.js"></script>
    <script src="/backOffice/AdminLTE/plugins/datatables-buttons/js/buttons.colVis.min.js"></script>
    <script src="/backOffice/AdminLTE/plugins/datatables-select/js/dataTables.select.min.js"></script>
    <script src="/backOffice/AdminLTE/plugins/datatables-select/js/select.bootstrap4.min.js"></script>

    <!-- overlayScrollbars -->
    <script src="/backOffice/AdminLTE/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js"></script>

    <!-- jquery.validate -->
    <script src="/backOffice/AdminLTE/plugins/jquery-validation/jquery.validate.min.js"></script>
    <script src="/backOffice/AdminLTE/plugins/jquery-validation/additional-methods.min.js"></script>
    <script src="/backOffice/AdminLTE/plugins/jquery-validation/localization/messages_ko.js"></script>

    <!-- eModal -->
    <script src="/backOffice/component/eModal/dist/eModal.min.js"></script>

    <!-- pace -->
    <script src="/backOffice/AdminLTE/plugins/pace-progress/pace.js"></script>
    <link rel="stylesheet" href="/backOffice/AdminLTE/plugins/pace-progress/themes/blue/pace-theme-minimal.css">

    <!-- Ekko Lightbox -->
    <link rel="stylesheet" href="/backOffice/AdminLTE/plugins/ekko-lightbox/ekko-lightbox.css">
    <script src="/backOffice/AdminLTE/plugins/ekko-lightbox/ekko-lightbox.min.js"></script>

    <!-- blockUI -->
    <script src="/backOffice/component/blockUI/jquery.blockUI.js"></script>

    <!-- saveMyForm -->
    <script src="/backOffice/component/saveMyForm/ie8.support.min.js"></script>
    <script src="/backOffice/component/saveMyForm/saveMyForm.jquery.min.js"></script>

    <!-- bootstrap-float-label css -->
    <link rel="stylesheet" href="/backOffice/component/bootstrap-float-label/bootstrap-float-label.css"/>
 	
 	
    <!-- 관리자 css -->
    <link rel="stylesheet" href="/fmcs/css/library.css">
    
</head>

<script>
    $(function () {
        $(document).on('click', '[data-toggle="lightbox"]', function(event) {
            event.preventDefault();
            $(this).ekkoLightbox({
                alwaysShowClose: true
            });
        });
    })
</script>

<!-- validator 설정 -->
<script>
    /*$.validator.setDefaults({
        onkeyup: false,
        onclick: false,
        onfocusout: false,
        showErrors: function (errorMap, errorList) {
            if (this.numberOfInvalids()) {
                alert(errorList[0].message);
            }
        }
    });

    $.validator.addMethod(
        "extraMethod",
        function (value, element) {
            if (value != "") {
                reutrn
                true;
            } else {
                return false;
            }
        },
        "값이 없습니다."
    );*/
    $(function () {
        $.validator.setDefaults({
            errorElement: 'span',
            errorPlacement: function (error, element) {
                error.addClass('invalid-feedback');
                //element.closest('.form-group').append(error);
                if (element.attr("type") == "checkbox" || element.attr("type") == "radio") {
                    error.css("display", "block");
                    $(element).parent().parent().append(error);
                } else {
                    error.insertAfter(element);
                }
            },
            highlight: function (element, errorClass, validClass) {
                $(element).addClass('is-invalid');
            },
            unhighlight: function (element, errorClass, validClass) {
                $(element).removeClass('is-invalid');
            }
        });
    });
</script>

<script>
    $(document).ready(function () {
        //iframe이 아니면 로그인 화면으로 이동
        if ( self == top ) {
            //top.location.href = "/library/auth/logout";
        }

        moment.locale('ko'); //언어를 한국어로 설정함!


        $.saveMyForm.defaults.resetOnSubmit = false;

        var title = parent.$('.content-wrapper').find('.active').first().text();

        if (title != "") {
            $('#HEADER-TEXT').text(title);
            $('#HEADER-NAV-TEXT').text(title);

            $('.content-header').show();
        }

        <%if (!M_CD.equals("")) {%>
        var m_advice = parent.$('.<%=M_CD%>').data("m-advice");

        if (m_advice != "") {
            m_advice = '<i class="icon fas fa-info-circle"></i>' + m_advice;

            $("#m_advice").html(m_advice);
            $("#m_advice").show();
        }
        <%}%>

        $.saveMyForm.defaults.addPathToName = true;
    });
</script>

<script>
    function jsRemoveCache() {
        $("form").saveMyForm("clearStorage");
        $("table").DataTable().state.clear();
    }
    
    function jsOnOverlay() {
    	  $('.overlay_100').css('display','block');
    }

    function jsOffOverlay() {
    	$('.overlay_100').css('display','none');
    }
</script>

<body class="hold-transition sidebar-collapse">
<div class="wrapper">
    <!-- Main content -->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header" style="display: none">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-12">
                        <h1 id="HEADER-TEXT" style="font-size: 1.5em;color:white;background-color: #6c757d;border-bottom:2px solid rgba(0,0,0,.125); border-top-left-radius:.25em;  border-top-right-radius:.25em; padding:.25em;">Title</h1>
                    </div>
                    <!--
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item active" id="HEADER-NAV-TEXT">Nav</li>
                        </ol>
                    </div>
                    -->
                </div>
            </div><!-- /.container-fluid -->

        </section>

        <!-- Main content -->
        <section class="content">
            <%if (!M_CD.equals("")) {%>
            <div id="m_advice" class="alert bg-light" style="border-color: #a9a9a9; display: none">
                <i class="icon fas fa-info-circle"></i>Info
            </div>
            <%}%>
            <tiles:insertAttribute name="bodybody"/>
            <div id="overlay" class="overlay_100"  style="display:none;">
			  <div class="overlay_text ">
			  	<div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
			    	<span class="sr-only">Loading...</span>
			  	</div>
			   </div>
			</div>
			
        </section>
    </div>
</div>
<!-- ./wrapper -->

</body>
</html>