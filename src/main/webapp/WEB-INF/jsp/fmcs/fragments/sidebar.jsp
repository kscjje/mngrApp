<%@ page contentType="text/html; charset=utf-8" language="java"%>
<style>
.nav-sidebar .menu-open > .nav-link i.right,
.nav-sidebar .menu-is-opening > .nav-link i.right {
  -webkit-transform: rotate(-180deg);
  transform: rotate(-180deg);
}
ul.nav-treeview li span{padding-left:23px;}
[class*=sidebar-light-] .sidebar a {color: #161616;}
.submenu {
    text-indent: 0.8em;
}
.nav-sidebar .nav-link>.right, .nav-sidebar .nav-link>span>.right {
    position: absolute;
    right: 1rem;
    top: 0.7rem;
}
.sidebar-mini.sidebar-collapse .nav-sidebar > .nav-item > .nav-link > span {
    display:none;
}
</style>

<div class="sidebar">
     <nav class="mt-2" style="color:#161616 !important;">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
			<li class="nav-item">
				<a href="#" class="nav-link"><i class="nav-icon fas fa-star"></i>
					<span>
						즐겨찾는 메뉴<i class="fas"></i>
					</span>
				</a>
			</li>
			<li class="nav-item">
				<a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vQkJHLsuonS3BKsWtJDqesagmtyevcXPd9FwNLG0J8N1pva0aZcx2hF9cijsY-vEgMPQS0yWn8PumKZ/pubhtml?gid=1386834576&amp;single=true&amp;widget=true&amp;headers=false" class="nav-link"><i class="nav-icon fa fa-bookmark-o"></i>
					<span>
						변경사항<i class="fas"></i>
					</span>
				</a>
			</li>
			<li class="nav-item" style="border-bottom: 1px solid #000;
    			margin-bottom: 10px;
    			margin-left: -8px;
    			margin-right: -7px;"></li>											
			<li class="nav-item">
				<a href="#" class="nav-link"><i class="nav-icon fas fa-cog"></i>
					<span>
						기초관리<i class="fas fa-angle-down right"></i>
					</span>
				</a>
				<ul class="nav nav-treeview">
					<!-- <li class="nav-item submenu">
						<a href="/fmcs/code/codeGroup" class="nav-link">
							<span style="color:darkred">공통코드 그룹관리</span>
						</a>
					</li> -->
					<li class="nav-item submenu">
						<a href="/fmcs/code/codeChild" class="nav-link">
							<span style="color:darkgreen">공통코드관리</span>
						</a>
					</li>
					<li class="nav-item submenu">
						<a href="/fmcs/bsis/comItemCtg" class="nav-link">
						<span style="color:darkgreen">운영상품분류</span>
						</a>
					</li>
					<li class="nav-item submenu">
						<a href="/fmcs/bsis/programItem" class="nav-link">
						<span style="color:darkred">이용상품요금관리</span>
						</a>
					</li>
					<li class="nav-item submenu">
						<a href="/fmcs/bsis/calendar" class="nav-link">
						<span style="color:darkgreen">법정공휴일관리</span>
						</a>
					</li>
					<li class="nav-item submenu">
						<a href="/fmcs/bsis/payMethod" class="nav-link">
						<span style="color:darkgreen">결제수단관리</span>
						</a>
					</li>										
				</ul>
			</li>
			<li class="nav-item">
				<a href="#" class="nav-link"><i class="nav-icon fas fa-user"></i>
					<span>
						회원관리<i class="fas fa-angle-down right"></i>
					</span>
				</a>
				<ul class="nav nav-treeview">
					<li class="nav-item submenu">
						<a href="/fmcs/member/memberMain" class="nav-link">
						<span style="color:darkgreen">회원정보관리</span>
						</a>
					</li>
					<li class="nav-item submenu">
						<a href="/fmcs/member/memberSearch" class="nav-link">
						<span style="color:darkgreen">회원정보조회</span>
						</a>
					</li>
					<li class="nav-item submenu">
						<a href="/fmcs/member/edcChange" class="nav-link">
						<span style="color:darkgreen">회원별강좌변경현황</span>
						</a>
					</li>
					<li class="nav-item submenu">
						<a href="/fmcs/member/edcRecess" class="nav-link">
						<span style="color:darkgreen">회원별강좌연기현황</span>
						</a>
					</li>
					<li class="nav-item submenu">
						<a href="/fmcs/member/cardMake" class="nav-link">
						<span style="color:darkgreen">회원카드발급현황</span>
						</a>
					</li>
					<li class="nav-item submenu">
						<a href="/fmcs/member/memberDiscount" class="nav-link">
						<span style="color:darkgreen">감면대상회원현황</span>
						</a>
					</li>
					<li class="nav-item submenu">
						<a href="/fmcs/member/memberMerge" class="nav-link">
						<span style="color:darkgreen">이중회원통합처리</span>
						</a>
					</li>
					<li class="nav-item submenu">
						<a href="/fmcs/member/edcRefund" class="nav-link">
						<span style="color:darkgreen">강좌환불요청관리(온라인)</span>
						</a>
					</li>															
				</ul>
			</li>			
			<li class="nav-item">
				<a href="" class="nav-link"><i class="nav-icon fas fa-pencil-square-o"></i>
					<span>
						강좌관리<i class="fas fa-angle-down right"></i>
					</span>
				</a>
				<ul class="nav nav-treeview">
					<li class="nav-item submenu">
						<a href="/fmcs/edcProgram/instructor" class="nav-link">
						<span style="color:darkgreen">강사관리</span>
						</a>
					</li>
					
					<li class="nav-item submenu">
						<a  href="/fmcs/edcProgram/comCtgr" class="nav-link">
						<span style="color:darkgreen">강좌검색분류설정</span>
						</a>
					</li>
					<li class="nav-item submenu">
						<a href="/fmcs/edcProgram/freeTimeManager"  class="nav-link">
						<span style="color:darkgreen">자유수영시간표</span>
						</a>
					</li>					
					<li class="nav-item submenu">
						<a href="/fmcs/edcProgram/edcManager" class="nav-link">
						<span style="color:darkgreen">강좌관리</span>
						</a>
					</li>
					<li class="nav-item submenu">
						<a href="/fmcs/edcProgram/edcAge" class="nav-link">
						<span style="color:darkgreen">강좌대상연령설정</span>
						</a>
					</li>
					<li class="nav-item submenu">
						<a href="/fmcs/edcProgram/holiday" class="nav-link">
						<span style="color:darkred">강좌휴관일관리</span>
						</a>
					</li>					
					<li class="nav-item submenu">
						<a href="/fmcs/edcProgram/edcbatch" class="nav-link">
						<span style="color:darkgreen">강좌정보일괄설정</span>
						</a>
					</li>	
					<li class="nav-item submenu">
						<a href="/fmcs/edcProgram/regMemberCapacity" class="nav-link">
						<span style="color:darkgreen">강좌접수인원현황</span>
						</a>
					</li>
					<li class="nav-item submenu">
						<a href="/fmcs/edcProgram/waitMember" class="nav-link">
						<span style="color:darkgreen">강좌접수대기자관리</span>
						</a>
					</li>
					<li class="nav-item submenu">
						<a href="/fmcs/edcProgram/drawMember" class="nav-link">
						<span style="color:darkgreen">강좌추첨관리</span>
						</a>
					</li>
					<li class="nav-item submenu">
						<a href="/fmcs/edcProgram/memberState" class="nav-link">
						<span style="color:darkred">수강회원현황</span>
						</a>
					</li>	
					<li class="nav-item submenu">
						<a href="/fmcs/edcProgram/attendance" class="nav-link">
						<span style="color:darkgreen">강좌출석현황</span>
						</a>
					</li>
					<li class="nav-item submenu">
						<a href="/fmcs/edcProgram/instructorPay" class="nav-link">
						<span style="color:darkred">강사료집계현황</span>
						</a>
					</li>
					<li class="nav-item submenu">
						<a href="#" class="nav-link">
						<span>수강회원통계현황</span>
						</a>
					</li>	
				</ul>
			</li>
			<li class="nav-item">
				<a href="#" class="nav-link"><i class="nav-icon fas fa-archive"></i>
					<span>
						사물함관리<i class="fas fa-angle-down right"></i>
					</span>
				</a>
				<ul class="nav nav-treeview">
					<li class="nav-item submenu">
						<a href="/fmcs/locker/info" class="nav-link">
						<span style="color:darkgreen">사물함정보관리</span>
						</a>
					</li>
					<li class="nav-item submenu">
						<a href="/fmcs/locker/rent" class="nav-link">
						<span style="color:darkgreen">사물함임대관리</span>
						</a>
					</li>
					<li class="nav-item submenu">
						<a href="/fmcs/locker/waitingList" class="nav-link">
							<span style="color:darkgreen">사물함신청대기자관리</span>
						</a>
					</li>
					<li class="nav-item submenu">
						<a href="/fmcs/locker/rentStatus" class="nav-link">
						<span style="color:darkgreen">사물함임대현황</span>
						</a>
					</li>
					<li class="nav-item submenu">
						<a href="/fmcs/locker/depositStatus" class="nav-link">
						<span style="color:darkgreen">사물함보증금현황</span>
						</a>
					</li>															
				</ul>
			</li>
			<li class="nav-item">
				<a href="#" class="nav-link"><i class="nav-icon fas fa-calendar-check-o"></i>
					<span>
						대관관리<i class="fas fa-angle-down right"></i>
					</span>
				</a>
				<ul class="nav nav-treeview">
					<li class="nav-item submenu">
						<a href="/fmcs/rent/fcltyCtg" class="nav-link">
						<span style="color:darkgreen">대관시설분류관리</span>
						</a>
					</li>				
					<li class="nav-item submenu">
						<a href="/fmcs/rent/fcltyPlace" class="nav-link">
						<span style="color:darkred">대관예약장소관리</span>
						</a>
					</li>
					<li class="nav-item submenu">
						<a href="/fmcs/rent/rentTeam" class="nav-link">
						<span style="color:darkgreen">대관예약팀관리</span>
						</a>
					</li>
					<li class="nav-item submenu">
						<a href="/fmcs/rent/rentRsvn" class="nav-link">
						<span style="color:darkgreen">대관예약관리</span>
						</a>
					</li>
					<li class="nav-item submenu">
						<a href="/fmcs/rent/rentRefund" class="nav-link">
						<span style="color:darkgreen">예약환불요청관리</span>
						</a>
					</li>
					<li class="nav-item submenu">
						<a href="#" class="nav-link">
						<span>대관수입통계</span>
						</a>
					</li>																									
				</ul>
			</li>
			<li class="nav-item">
				<a href="#" class="nav-link"><i class="nav-icon fa fa-exchange"></i>
					<span>
						입장관리<i class="fas fa-angle-down right"></i>
					</span>
				</a>
				<ul class="nav nav-treeview">
					<li class="nav-item submenu">
						<a href="/fmcs/enterTicket/enterTicketList" class="nav-link">
							<span style="color:darkgreen">입장발권관리</span>
						</a>
					</li>
				</ul>
			</li>
			<li class="nav-item">
				<a href="#" class="nav-link"><i class="nav-icon fas fa-barcode"></i>
					<span>
						매표관리<i class="fas fa-angle-down right"></i>
					</span>
				</a>
				<ul class="nav nav-treeview">
					<li class="nav-item submenu">
						<a href="/fmcs/ticket/program" class="nav-link">
						<span style="color:darkgreen">일일입장프로그램관리</span>
						</a>
					</li>
					<li class="nav-item submenu">
						<a href="/fmcs/ticket/sale" class="nav-link">
						<span style="color:darkgreen">입장권매표관리</span>
						</a>
					</li>
					<li class="nav-item submenu">
						<a href="/fmcs/ticket/booking" class="nav-link">
						<span style="color: darkgreen">입장권매표예약정보관리</span>
						</a>
					</li>										
				</ul>
			</li>			
			<li class="nav-item">
				<a href="#" class="nav-link"><i class="nav-icon fas fa-won"></i>
					<span>
						수입정산관리<i class="fas fa-angle-down right"></i>
					</span>
				</a>
				<ul class="nav nav-treeview">
					<li class="nav-item submenu">
						<a href="/fmcs/inexpndtr/etcInexpndtrForm" class="nav-link">
						<span style="color:darkgreen">기타수입매출관리</span>
						</a>
					</li>
					<li class="nav-item submenu">
						<a href="/fmcs/inexpndtr/pgOrdList" class="nav-link">
						<span style="color:darkgreen">PG거래내역현황</span>
						</a>
					</li>
					<li class="nav-item submenu">
						<a href="/fmcs/inexpndtr/cancelInexpndtrList" class="nav-link">
						<span style="color:darkgreen">환불수입현황</span>
						</a>
					</li>
					<li class="nav-item submenu">
						<a href="/fmcs/inexpndtr/cashierInexpndtrList" class="nav-link">
						<span style="color:darkgreen">수납자별입금현황</span>
						</a>
					</li>
					<li class="nav-item submenu">
						<a href="/fmcs/inexpndtr/inexpndtrSlipList" class="nav-link">
						<span style="color:darkgreen">수입금전표현황</span>
						</a>
					</li>
					<li class="nav-item submenu">
						<a href="/fmcs/inexpndtr/inexpndtrUsedList" class="nav-link">
						<span style="color:darkgreen">수입금정산일지</span>
						</a>
					</li>
					<li class="nav-item submenu">
						<a href="/fmcs/inexpndtr/dcKindInexpndtrList" class="nav-link">
						<span style="color:darkgreen">할인사유별수입금현황</span>
						</a>
					</li>																														
				</ul>				
			</li>
			<li class="nav-item">
				<a href="#" class="nav-link"><i class="nav-icon fas fa-bar-chart"></i>
					<span>
						분석통계<i class="fas"></i>
					</span>
				</a>
			</li>
			<li class="nav-item">
				<a href="#" class="nav-link"><i class="nav-icon fas fa-television"></i>
					<span>
						운영설정관리<i class="fas fa-angle-down right"></i>
					</span>
				</a>
				<ul class="nav nav-treeview">
					<li class="nav-item submenu">
						<a href="/fmcs/oper/managerNotice" class="nav-link">
						<span style="color:darkred">업무공지알림관리</span>
						</a>
					</li>
					<li class="nav-item submenu">
						<a href="#" class="nav-link">
						<span>업무운영정책기준설정</span>
						</a>
					</li>
					<li class="nav-item submenu">
						<a href="#" class="nav-link">
						<span>자동화시스템운영설정</span>
						</a>
					</li>
					<li class="nav-item submenu">
						<a href="/fmcs/oper/intrconList" class="nav-link">
						<span style="color:darkred">연계시스템설정</span>
						</a>
					</li>										
				</ul>
			</li>
			<li class="nav-item">
				<a href="#" class="nav-link"><i class="nav-icon fas fa-th-list"></i>
					<span>
						컨텐츠관리(CMS)<i class="fas fa-angle-down right"></i>
					</span>
				</a>
				<ul class="nav nav-treeview">
					<li class="nav-item submenu">
						<a href="/fmcs/bbs/bbsList?BBS_ID=FREE" class="nav-link">
						<span style="color:darkgreen">자유게시판 관리</span>
						</a>
					</li>
					<li class="nav-item submenu">
						<a href="/fmcs/bbs/bbsList?BBS_ID=PHOTO" class="nav-link">
						<span style="color:darkgreen">포토갤러리 관리</span>
						</a>
					</li>
					<li class="nav-item submenu">
						<a href="/fmcs/bbs/bbsList?BBS_ID=QNA" class="nav-link">
						<span style="color:darkgreen">QNA 관리</span>
						</a>
					</li>										
					<li class="nav-item submenu">
						<a href="/fmcs/bbs/bbsMaster" class="nav-link">
						<span style="color:darkgreen">게시판생성관리</span>
						</a>
					</li>
					<li class="nav-item submenu">
						<a href="/fmcs/menu/menuList" class="nav-link">
						<span style="color:darkred">사이트메뉴관리</span>
						</a>
					</li>
					<li class="nav-item submenu">
						<a href="#" class="nav-link">
						<span>컨텐츠관리</span>
						</a>
					</li>
					<li class="nav-item submenu">
						<a href="/fmcs/cms/stplatList" class="nav-link">
						<span style="color:darkgreen">약관정보관리</span>
						</a>
					</li>
					<li class="nav-item submenu">
						<a href="#" class="nav-link">
						<span>접속통계</span>
						</a>
					</li>															
				</ul>
			</li>			
			<li class="nav-item">
				<a href="#" class="nav-link"><i class="nav-icon fas fa-wrench"></i>
					<span>
						시스템관리<i class="fas fa-angle-down right"></i>
					</span>
				</a>
				<ul class="nav nav-treeview">
					<li class="nav-item submenu">
						<a href="#" class="nav-link">
						<span>시스템코드</span>
						</a>
					</li>
					<li class="nav-item submenu">
						<a href="/fmcs/mngr/mngrList" class="nav-link">
						<span style="color:darkgreen">사용자관리</span>
						</a>
					</li>
					<li class="nav-item submenu">
						<a href="/fmcs/mngr/mngGroupList" class="nav-link">
						<span style="color:darkgreen">권한그룹관리</span>
						</a>
					</li>
					<li class="nav-item submenu">
						<a href="#" class="nav-link">
						<span>운영정보LOG관리</span>
						</a>
					</li>
					<li class="nav-item submenu">
						<a href="#" class="nav-link">
						<span>시스템연계LOG관리</span>
						</a>
					</li>										
				</ul>
			</li>
		</ul>																											
    </nav>
    <!-- /.sidebar-menu -->
</div>
<!-- /.sidebar -->