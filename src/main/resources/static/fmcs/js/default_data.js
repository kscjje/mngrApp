//공통 코드 설정
const print_gbn =[
	{
		value: '1', text: '출력'
	},
	{
		value: '0', text: '출력안함'
	}
]
const SM_LCKR_AMOUNT_GBN=[
	{
		value: '1001', text: '임대료'
	},
	{
		value: '2001', text: '보증금'
	}
]
                             
const SM_SMS_PROVIDER=[
	{value:'1001',text:'SK'},
	{value:'1002',text:'SKB'},
	{value:'1003',text:'(주)아이엠오'},
	{value:'2001',text:'KT'},
	{value:'3001',text:'LG'},
];
const target_opt_gbn=[
	{text: "대상", value: "Y"},
	{text: "비대상", value: "N"},
	]
const train_status_gbn=[
	{text: "이용상태(전체)", value: ""},
	{text: "사용대기", value: "0"},
	{text: "이용중", value: "1"},
	{text: "종료", value: "2"},
	{text: "중도해약", value: "3"},
	{text: "휴회(연기)", value: "4"},
];
var useMonth_gbn=[];
for(var m=1;m < 25;m++){
	if(m<10){
		useMonth_gbn.push('0'+m);
	}else{
		useMonth_gbn.push(m);
	}
}

const choiceSchedule_gbn = [
		{text: "수동추첨", value: "M"},
		{text: "자동추첨", value: "A"}
	];
	
const choiceScheduleDateType_gbn = [
		{text: "접수종료일기준(D-DAY)", value: "D"},
		{text: "일자설정", value: "S"}
];
const choiceScheduleDDay_gbn = [
	{text: "D+1", value: "1"},
	{text: "D+2", value: "2"},
	{text: "D+3", value: "3"},
	{text: "D+4", value: "4"},
];
const req_path_gbn=[{text:'온라인',value:'001'},
					{text:'방문',value:'002'},
					{text:'온라인+방문',value:'003'},
]
const wait_ass_gbn=[{text:'수동',value:'0'},
					{text:'자동(신청취소 발생시 자동배정)',value:'1'}]
const discounttype_gbn=[
	 	{Code:'0000',Name :'기준없음'},
	    {Code :'0001',Name : '장애인'},
	    {Code :'0002',Name : '국가유공자'},
	    {Code :'0003',Name : '연령'},
	    {Code :'0004',Name :'관내거주'},
	    {Code :'0005',Name :'개월수'},
	    {Code :'0006',Name :'다자녀'},
	    {Code :'0007',Name :'기초생활수급자'},
]
const attendance_gbn=[
	{text:'출석현황',value:'0'},
	{text:'출석부',value:'1'},
]
const priority_gbn=[
	{text:'사용안함',value:'0'},
	{text:'관내거주',value:'1'},
	{text:'관외거주',value:'2'},
	{text:'이전낙첨자',value:'3'},
]
const drawfailtype_gbn=[
	{text:'설정안함',value:'0'},
	{text:'전체대기순번부여',value:'1'},
	{text:'대기인원지정순번부여',value:'2'},
];
const drawtype_gbn=[
	{text:'추첨방법A',value:'0'},
	{text:'추첨방법B',value:'1'},
];
const drawstatus_gbn=[
	{text:'추첨결과(전체)',value:'0'},
	{text:'당첨(확정)',value:'1'},
	{text:'당첨',value:'2'},
	{text:'추첨후배정대기',value:'3'},
	{text:'낙첨',value:'4'},
	{text:'추첨전',value:'5'},
	{text:'예약취소',value:'6'}
];
const agereg_gbn=[
	{text:'연령등록상태(전체)',value:'0'},
	{text:'등록',value:'1'},
	{text:'미등록',value:'2'},
];

const tax_gbn=[
	{text:'비과세',value:'N'},
	{text:'과세',value:'Y'},
];
const counting_gbn=[
		{text:'운영안함',value:'0'},
		{text:'모든요일차감/법정공휴일',value:'1'},
		{text:'휴관일제외차감',value:'2'}];

//const range_gbn2=[{text:'설정안함',value:''},{text:'이상',value:'0'},{text:'이하',value:'1'},{text:'미만',value:'2'},{text:'초과',value:'3'}]
const range_gbn=[{text:'이상',value:'0'},{text:'이하',value:'1'},{text:'범위',value:'2'}]
	
const week_days=[{text:'일',value:'0'},
	{text:'월',value:'1'},
	{text:'화',value:'2'},
	{text:'수',value:'3'},
	{text:'목',value:'4'},
	{text:'금',value:'5'},
	{text:'토',value:'6'},
	{text:'공휴일',value:'7'}]
const img_ext=['.jpg', '.jpeg', '.gif', '.png']
const doc_ext=['.pdf', '.xls', '.docx', '.doc', '.hwp', '.pptx']
const age_gbn=[{text:'한국나이',value:'0'},{text:'한국나이 사용안함',value:'1'}]
const dan_gbn=[{text:'적용안함',value:'0'},{text:'상단',value:'1'},{text:'하단',value:'2'}]
const local_opt_gbn=[
	{text:'관내 전체',value:'0000'	},
	{text:'관내 행정동',value:'0',parent:'0000'},
	{text:'복수선택가능',value:'1',parent:'0000'}
	]
const gender_opt_gbn=[{text:'남여가능',value:'WM'},{text:'여성만가능',value:'W'},{text:'남성만가능',value:'M'}]
const dc_type_gbn1=[{text:'본인',value:'A'},{text:'배우자',value:'B'},
	{text:'유가족',value:'C'},{text:'본인 또는 배우자',value:'AB'},{text:'본인 또는 유가족',value:'AC'},
	{text:'배우자 또는 유가족',value:'BC'},{text:'본인 또는 배우자 또는 유가족',value:'ABC'}
]
const dc_type_gbn2=[{text:'수권자',value:'Y'},{text:'수권자 및 비수권자',value:'YN'}]
const dc_type_gbn3=[{text:'심한장애(1~3급)',value:'10'},{text:'심하지않은장애(4~6급)',value:'20'},
	{text:'장애(1~6급)',value:'1020'}]
const dc_type_gbn4=[{text:'관내 전체',value:''},{text:'봉담읍',value:'4159025300'},{text:'우정읍',value:'4159025600'}]
const dc_type_gbn5=[{text:'65세',value:'65'},{text:'70세',value:'70'}]
const dc_type_gbn6=[{text:'18세',value:'18'},{text:'19세',value:'19'},
					{text:'20세',value:'20'},{text:'21세',value:'21'},{text:'22세',value:'22'},{text:'23세',value:'23'},
					{text:'24세',value:'24'},{text:'25세',value:'25'}
					]
const discount_gbn=[{text:'할인율',value:'0'},{text:'할인금액',value:'1'},{text:'할증율',value:'2'},{text:'할증금액',value:'3'}]

const key_use_gbn=[{text:'발권안함',value:'0'},{text:'발권',value:'1'}]
const key_place_gbn=[{text:'발권위치1',value:'0'},{text:'발권위치2',value:'1'}]
const key_time_gbn=[{text:'1시간',value:'1'},{text:'2시간',value:'2'},{text:'3시간',value:'3'}]
const refund_clac_gbn=
	[{text:'계산방식 적용 안함',value:'0'},
	{text:'일할계산방식(수업일수)I',value:'1'},
	{text:'일할계산방식(계약총일수)I',value:'2'},
	{text:'일할계산방식(수업일수)II',value:'3'},
	{text:'일할계산방식(계약총일수)II',value:'4'},
	{text:'일할계산방식(계약총일수)III',value:'5'},
	{text:'월기준지정일수일할계산방식(I)',value:'6'},
	{text:'월기준지정일수일할계산방식(II)',value:'7'},
	{text:'월할계산방식',value:'8'},
	{text:'평생교육운영소비자규정적용',value:'9'},];
const restrict_gbn=[{text:'제한안함',value:'0'},{text:'제한',value:'1'}]
const apply_gbn=[{text:'적용안함',value:'0'},{text:'적용',value:'1'}]
const discount_term_gbn=[{text:'수강기간내',value:'0'},{text:'월간',value:'1'},{text:'년간',value:'2'}]
const centers=[{text:'국민체육센터',value:'0'},{text:'문화센터',value:'1'},
{text:'1체육센터',value:'2'},{text:'3체육센터',value:'3'},
{text:'2체육센터',value:'4'},{text:'4체육센터',value:'5'}];
const pay_gbn =[{text:'적용안함',value:'0'},{text:'시급제',value:'1'}]; 
const SM_GENDER_GBN = [{text:'남',value:'0'},{text:'여',value:'1'}];
const gender_gbn = [{text:'남',value:'0'},{text:'여',value:'1'}];



const class_gbn = [{text:'수영',value:'0'},{text:'테니스',value:'1'},{text:'배드민턴',value:'2'}];
const place_gbn = [{text:'수영장',value:'0'},{text:'헬스장',value:'1'},{text:'댄스실',value:'2'}];
const classtype_gbn = [{text:'체육강좌',value:'0'},{text:'문화강좌',value:'1'},{text:'유아체육강좌',value:'2'}];
const online_type= [{text:'Youtube 영상',value:'0'},{text:'ZOOM 강의',value:'1'}];
//강좌 테스트 용 데이터
const use_gbn = [{text:'사용',value:'1'},{text:'사용안함',value:'0'}];
const category_gbn=[{text:'운영상품분류',value:'0'},
		{text:'강좌검색분류',value:'1'},
	];
const set_gbn = [{text:'설정안함',value:'0'},{text:'설정',value:'1'}];
const view_gbn = [{text:'노출',value:'Y'},{text:'노출안함',value:'N'}];

const week_gubn= [{text:'모든요일',value:'0'},
				  {text:'평일',value:'1'},
				  {text:'주말',value:'2'},
				  {text:'월수금',value:'3'},
				   {text:'화목',value:'4'}
				 ];

const regstatus_gbn=[{text:'강좌접수상태(전체)',value:'0'},
	{text:'접수준비',value:'1'},				
	{text:'접수중',value:'2'},
	{text:'접수종료',value:'3'},
	];
const capacitystus_gbn=[{text:'강좌상태(전체)',value:'0'},
	{text:'접수준비',value:'1'},				
	{text:'접수중',value:'2'},
	{text:'접수종료',value:'3'},
	{text:'마감',value:'4'},
	{text:'정원초과',value:'5'},
	];

const run_gbn=[{text:'운영',value:'1'},{text:'운영안함',value:'0'},];
const fee_gbn=[{text:'무료',value:'0'},{text:'유료',value:'1'},];
const auth_gbn=[{text:'권한없음',value:'0'},{text:'강사권한',value:'1'},]

const recv_gbn=[{text:'정기접수운영',value:'0'},{text:'수시접수운영',value:'1'},]
const recvcapa_gbn=[{text:'설정',value:'1'},{text:'설정안함',value:'0'},]

const online_gbn=[{text:'공개',value:'1'},{text:'공개안함',value:'0'}];

const recvType_gbn=[{text:'선착순',value:'0'},
			{text:'선착순(정원마감대기접수)',value:'1'},
			{text:'대기접수(추첨)',value:'2'},
			{text:'대기접수(기간수료)',value:'3'}
		]

const addRecv_gbn=[{text:'접수당월1일부터적용',value:'0'},{text:'접수신청일 다음일로 적용',value:'1'},{text:'다음달 1일로 적용',value:'2'}]
const addFee_gbn=[{text:'강좌시작일부터 종료일까지의 총일수 기준',value:'0'},
					{text:'강좌시작일부터 종료일까지의 실수업일수(공휴일,휴관일포함)',value:'1'},
					{text:'강좌시작일부터 종료일까지의 실수업일수(공휴일,휴관일미포함)',value:'2'},
					{text:'추가접수기간의 강좌료금액은 일할계산 적용',value:'3'}]

const payFinal_gbn=[{text:'접수(승인)일시기준',value:'0'},{text:'접수신청마감일시기준',value:'1'},
					{text:'마감일시직접설정',value:'2'}];
	
const recvterm_gbn=[{text:'기간설정',value:'0'},{text:'매월고정일적용',value:'1'}];


const recvtime_gbn=[{text:'일별기준적용',value:'0'},{text:'시작일종료일기준',value:'1'}];

const Approval_gbn=[{text:'관리자승인',value:'0'},{text:'자동승인',value:'1'}];

const newrecvType_gbn=[{text:'기존회원접수미운영',value:'0'},{text:'이전수업연장접수',value:'1'},{text:'신규강좌접수',value:'2'}];

const facilityBasic_gbn = [
	{text: "수시접수", value: "1"},
	{text: "정기접수", value: "2"},
	{text: "정기 및 수시접수", value: "3"}
];

const facilityType_gbn = [
	{text: "체육시설", value: "FT001"},
	{text: "공간시설", value: "FT002"},
	{text: "공연시설", value: "FT003"}
];

//월 select
var monthItems_gbn = [];
var strMonthItems = "";
for (i = 1; i <= 12; i++) {
	if (i < 10) {
		strMonthItems = "0"+ i +"월";
	}
	else {
		strMonthItems = i +"월";
	}

	monthItems_gbn.push({text: strMonthItems, value: i});
} 

//일자 select
var dateItems_gbn = [];
var strDateItems = "";

dateItems_gbn.push({text: "마지막 일", value: 31});
for (i = 1; i <= 30; i++) {
	if (i < 10) {
		strDateItems = "0"+ i +"일";
	}
	else {
		strDateItems = i +"일";
	}
	dateItems_gbn.push({text: strDateItems, value: i});
}
//console.log(dateItems_gbn);

//강사 테스트 용 데이터
const instructors = [ 
	{USER_SEQ: 1,
	  KOR_NAME: '강사명',
	  TEL_NO: '010-0000-0000',  
	  GENDER: '0',
	  PAY_GBN: '1',
	  EMP_CARDNO: '회원카드번호',
	  OPEN_GBN: '0',
	  INFORM: '<b style="color:red;">강사소개</b>',
	  CLASS_LST: ['0','1','2'],
	  REMARK:'',
	  PART_NM:'ABC',
	  COM_CD:'0001',
	},{USER_SEQ: 2,
	  KOR_NAME: '강사명2',
	  TEL_NO: '010-0000-0003',  
	  GENDER: '1',
	  PAY_GBN: '0',
	  EMP_CARDNO: '회원카드번호3',
	  OPEN_GBN: '1',
	  INFORM: '<b style="color:blue;">강사소개</b>',
	  CLASS_LST: ['2'],
	  REMARK:'비고2',
	  PART_NM:'BBB',
	  COM_CD:'0002',
	},
{
		USER_SEQ: 3,
  KOR_NAME: '강사명3',
  TEL_NO: '010-0000-0003',  
  GENDER: '1',
  PAY_GBN: '0',
  EMP_CARDNO: '회원카드번호3',
  OPEN_GBN: '1',
  INFORM: '',
  CLASS_LST: ['2'],
  REMARK:'비고2',
  PART_NM:'BBB',
  COM_CD:'0002',
},
];

const search_gbn=[
				  {text:'강사명',value:'KOR_NAME'},
				  {text:'계정ID',value:'ID'},
				  {text:'휴대전화',value:'TEL_NO'},];

const search_gbn2=[{text:'검색어조건선택',value:'-1'},
	  {text:'강사명',value:'KOR_NAME'},
	  {text:'휴대전화',value:'TEL_NO'},];

const searchButns = [
	  {
	    icon: 'find',
	    alignment: 'left',
	    hint: '조회',
	  },
	  {
	    icon: 'aligncenter',
	    alignment: 'center',
	    hint: 'Center',
	  },
	  
	];

//강좌 검색 분류 테스트 용 데이터
const classCategories = [ 
	{
		  COMCD: 2,
		  CTGCD: '0001',
		  CTGNM:'1.수영',
		  CTGNM_DISP:'[0001]1.수영',
		  CTGDESC: '대분류입니다',  
		  NOTI_CONTEXT: '',
		  CTGLVL: 1,
		  CTGSRTORD: 0,
		  USE_YN: '0',
		  expanded: true,
		  PRNCTGCD_NM:'',
	},
	{
	  COMCD: 2,
	  CTGCD: '0002',
	  CTGNM:'2.헬스',
	  CTGNM_DISP:'[0002]2.헬스',
	  CTGDESC: '대분류입니다.',  
	  NOTI_CONTEXT: '<b style="color:red;">강좌검색분류</b>',
	  CTGLVL: 1,
	  
	  CTGSRTORD: 1,
	  USE_YN: '0',
	  expanded: true,
	  PRNCTGCD_NM:'',
	  
	},
	  {
			  COMCD: 2,
			  CTGCD: '0003',
			  CTGNM:'2-1',
			  CTGNM_DISP:'[0003]2-1',
			  CTGDESC: '중분류입니다',
			  NOTI_CONTEXT: '',
			  CTGLVL: 2,
			  PRNCTGCD: '0002',
			  TOPCTGCD: '0002',
			  CTGSRTORD: 0,
			  USE_YN: '0',
			  expanded: true,
			  PRNCTGCD_NM:'',
	  },
	  {
		  COMCD: 2,
		  CTGCD: '0008',
		  CTGNM:'2-4',
		  CTGNM_DISP:'[0008]2-1',
		  CTGDESC: '중분류입니다',
		  NOTI_CONTEXT: '',
		  CTGLVL: 2,
		  PRNCTGCD: '0002',
		  TOPCTGCD: '0002',
		  CTGSRTORD: 1,
		  USE_YN: '0',
		  expanded: true,
		  PRNCTGCD_NM:'',
  },
  {
	  COMCD: 2,
	  CTGCD: '0009',
	  CTGNM:'2-3',
	  CTGNM_DISP:'[0009]2-1',
	  CTGDESC: '중분류입니다',
	  NOTI_CONTEXT: '',
	  CTGLVL: 2,
	  PRNCTGCD: '0002',
	  TOPCTGCD: '0002',
	  CTGSRTORD: 2,
	  USE_YN: '0',
	  expanded: true,
	  PRNCTGCD_NM:'',
},
	  
];
const classCategories2 = [ 
	{
		  COMCD: 2,
		  CTGCD: '0001',
		  CTGNM:'검색분류1',
		  CTGNM_DISP:'[0001]검색분류1',
		  CTGDESC: '대분류입니다',  
		  NOTI_CONTEXT: '',
		  CTGLVL: 1,
		  CTGSRTORD: 0,
		  USE_YN: '0',
		  expanded: true,
		  PRNCTGCD_NM:'',
	},
	{
	  COMCD: 2,
	  CTGCD: '0002',
	  CTGNM:'검색분류2',
	  CTGNM_DISP:'[0002]검색분류2',
	  CTGDESC: '대분류입니다.',  
	  NOTI_CONTEXT: '<b style="color:red;">강좌검색분류</b>',
	  CTGLVL: 1,
	  
	  CTGSRTORD: 1,
	  USE_YN: '0',
	  expanded: true,
	  PRNCTGCD_NM:'',
	  
	},
];

const trainclass1=[];
const trainclass2=[];
const edu_fee_programs=[
	{
		COMCD: 2,
		CTGCD: '0005',
		CTG_NM: '분류1',
		EDC_PRGMID:'001',
		ITEM_CD:'001',
		ITEM_NM:'성인-월강습수영',
		COST_AMT:'20000',
		INSTRCTR_NAME:'강사명2',	
		EDC_STATUS:'접수준비',
		EDC_PRGMNM:'16시 아동1반 초급',
		USE_YN:'1',
		EDC_DAYS:'월,화,수,목',
		SORT_ORDER:1,
		EDC_STIME:'16:00',
		EDC_ETIME:'17:00',
		EDC_PNCPA:20,
	},
];
const edu_programs=[
	{
		EDC_SORT:1,
		COMCD: 2,
		CTGCD: '0005',
		EDC_PRGMID:'001',
		INSTRCTR_NAME:'강사명2',	
		USER_SEQ:'001',
		EDC_LIMIT:['성별제한','연령제한'],
		EDC_WARNING:'warning',
		EDC_STATUS:'접수준비',
		EDC_PRGMNM:'16시 아동1반 초급[월화수목]',
		EDC_PLACENM:'수영장',
		USE_YN:'1',
		EDC_OPENYN:'0',
		EDC_DAYS:'월,화,수,목',
		SORT_ORDER:1,
		EDC_STIME:'16:00',
		EDC_ETIME:'17:00',
		EDC_PNCPA:20,
		EDC_VPNCPA:5,
		EDC_OPNCPA:5,
		EDC_SPNCPA:'13세이하',
		EDC_ONLINE:'0',
		EDC_RSVN_SDATE:'',
		EDC_RSVN_STIME:'',
		EDC_RSVN_EDATE:'',
		EDC_RSVN_ETIME:'',
		EDC_NEW_SDATE:'',
		EDC_NEW_STIME:'',
		EDC_NEW_EDATE:'',
		EDC_NEW_ETIME:'',
		EDC_TARGETINFO:'교육대상표시명1111',
		EDC_CLASS_TYPE:'0',
		EDC_CLASS_GBN:'0',
		EDC_DAYVISITCNT_YN:'1',
		EDC_DAYVISITCNT:10,
		EDC_ALERT_SEND_YN:'0',
		EDC_FREETIME_REG_YN:'1',
		EDC_TERM_YN:'0',	
		EDC_SDATE:'2022-12-10',
		EDC_EDATE:'2022-12-10',
		EDC_ONLINEYN:'0',
		EDC_ONLINE_TYPE:'0',
		EDC_ONLINE_URL:'',
		EDC_ONLINE_PWD:'',
		EDC_FEE_POLICY:'0',
	},
	{
		EDC_SORT:2,
		COMCD: 2,
		CTGCD: '0005',
		EDC_PRGMID:'002',
		INSTRCTR_NAME:'강사명',	
		USER_SEQ:'001',
		EDC_LIMIT:[],
		EDC_WARNING:'warning',
		EDC_STATUS:'접수중',
		EDC_PRGMNM:'14시 아동1반 초급[월수]',
		EDC_PLACENM:'',
		USE_YN:'0',
		EDC_OPENYN:'1',
		EDC_DAYS:'월,수',
		SORT_ORDER:1,
		EDC_TERM_YN:'1',	
		EDC_SDATE:'2022-12-10',
		EDC_EDATE:'2022-12-10',
		EDC_STIME:'14:00',
		EDC_ETIME:'15:00',
		EDC_PNCPA:20,
		EDC_VPNCPA:5,
		EDC_OPNCPA:5,
		EDC_SPNCPA:'13세이하',
		EDC_ONLINEYN:'0',
		EDC_RSVN_SDATE:'',
		EDC_RSVN_STIME:'',
		EDC_RSVN_EDATE:'',
		EDC_RSVN_ETIME:'',
		EDC_NEW_SDATE:'',
		EDC_NEW_STIME:'',
		EDC_NEW_EDATE:'',
		EDC_NEW_ETIME:'',
		EDC_TARGETINFO:'교육대상표시명',
		EDC_CLASS_TYPE:'1',
		EDC_CLASS_GBN:'1',
		EDC_DAYVISITCNT_YN:'1',
		EDC_DAYVISITCNT:10,
		EDC_ALERT_SEND_YN:'0',
		EDC_FREETIME_REG_YN:'1',
		EDC_ONLINE_TYPE:'1',
		},
	{
		EDC_SORT:3,
		COMCD: 2,
		CTGCD: '0005',
		EDC_PRGMID:'003',
		INSTRCTR_NAME:'강사명',
		USER_SEQ:'001',
		EDC_LIMIT:[],
		EDC_WARNING:'warning',
		EDC_STATUS:'접수준비',
		EDC_PRGMNM:'14시 아동1반 초급[월수]',
		EDC_PLACENM:'',
		USE_YN:'0',
		EDC_OPENYN:'1',
		EDC_DAYS:'월,수',
		SORT_ORDER:1,
		EDC_STIME:'14:00',
		EDC_ETIME:'15:00',
		EDC_PNCPA:20,
		EDC_VPNCPA:5,
		EDC_OPNCPA:5,
		EDC_SPNCPA:'13세이하',
		EDC_ONLINEYN:'0',
		EDC_RSVN_SDATE:'',
		EDC_RSVN_STIME:'',
		EDC_RSVN_EDATE:'',
		EDC_RSVN_ETIME:'',
		EDC_NEW_SDATE:'',
		EDC_NEW_STIME:'',
		EDC_NEW_EDATE:'',
		EDC_NEW_ETIME:'',
		EDC_TARGETINFO:'교육대상표시명',
		EDC_CLASS_TYPE:'0',
		EDC_CLASS_GBN:'2',
		EDC_DAYVISITCNT_YN:'0',
		EDC_DAYVISITCNT:10,
		EDC_ALERT_SEND_YN:'0',
		EDC_FREETIME_REG_YN:'0',
		EDC_TERM_YN:'0',
		
		},
	{
		EDC_SORT:4,
		COMCD: 2,
		CTGCD: '0005',
		EDC_PRGMID:'004',
		INSTRCTR_NAME:'강사명',	
		USER_SEQ:'001',
		EDC_LIMIT:[],
		EDC_WARNING:'warning',
		EDC_STATUS:'접수준비',
		EDC_PRGMNM:'14시 아동1반 초급[월수]',
		EDC_PLACENM:'',
		USE_YN:'0',
		EDC_OPENYN:'1',
		EDC_DAYS:'월,수',
		SORT_ORDER:1,
		EDC_STIME:'14:00',
		EDC_ETIME:'15:00',
		EDC_PNCPA:20,
		EDC_VPNCPA:5,
		EDC_OPNCPA:5,
		EDC_SPNCPA:'13세이하',
		EDC_ONLINEYN:'0',
		EDC_RSVN_SDATE:'',
		EDC_RSVN_STIME:'',
		EDC_RSVN_EDATE:'',
		EDC_RSVN_ETIME:'',
		EDC_NEW_SDATE:'',
		EDC_NEW_STIME:'',
		EDC_NEW_EDATE:'',
		EDC_NEW_ETIME:'',
		EDC_TARGETINFO:'교육대상표시명',
		EDC_CLASS_TYPE:'0',
		EDC_DAYVISITCNT_YN:'0',
		EDC_DAYVISITCNT:10,
		EDC_ALERT_SEND_YN:'0',
		EDC_FREETIME_REG_YN:'0',
		EDC_TERM_YN:'0'},
	{
		EDC_SORT:5,
		COMCD: 2,
		CTGCD: '0005',
		EDC_PRGMID:'005',
		INSTRCTR_NAME:'강사명',	
		USER_SEQ:'001',
		EDC_LIMIT:[],
		EDC_WARNING:'warning',
		EDC_STATUS:'접수준비',
		EDC_PRGMNM:'14시 아동1반 초급[월수]',
		EDC_PLACENM:'',
		USE_YN:'0',
		EDC_OPENYN:'1',
		EDC_DAYS:'월,수',
		SORT_ORDER:1,
		EDC_STIME:'14:00',
		EDC_ETIME:'15:00',
		EDC_PNCPA:20,
		EDC_VPNCPA:5,
		EDC_OPNCPA:5,
		EDC_SPNCPA:'13세이하',
		EDC_ONLINEYN:'0',
		EDC_RSVN_SDATE:'',
		EDC_RSVN_STIME:'',
		EDC_RSVN_EDATE:'',
		EDC_RSVN_ETIME:'',
		EDC_NEW_SDATE:'',
		EDC_NEW_STIME:'',
		EDC_NEW_EDATE:'',
		EDC_NEW_ETIME:'',
		EDC_TARGETINFO:'교육대상표시명',
		EDC_CLASS_TYPE:'0',
		EDC_DAYVISITCNT:10,
		EDC_ALERT_SEND_YN:'0',
		EDC_FREETIME_REG_YN:'0',
		EDC_TERM_YN:'0'},
	{
		EDC_SORT:6,
		COMCD: 2,
		CTGCD: '0005',
		EDC_PRGMID:'006',
		INSTRCTR_NAME:'강사명',
		USER_SEQ:'001',
		EDC_LIMIT:[],
		EDC_WARNING:'warning',
		EDC_STATUS:'접수준비',
		EDC_PRGMNM:'14시 아동1반 초급[월수]',
		EDC_PLACENM:'',
		USE_YN:'0',
		EDC_OPENYN:'1',
		EDC_DAYS:'월,수',
		SORT_ORDER:1,
		EDC_STIME:'14:00',
		EDC_ETIME:'15:00',
		EDC_PNCPA:20,
		EDC_VPNCPA:5,
		EDC_OPNCPA:5,
		EDC_SPNCPA:'13세이하',
		EDC_ONLINEYN:'0',
		EDC_RSVN_SDATE:'',
		EDC_RSVN_STIME:'',
		EDC_RSVN_EDATE:'',
		EDC_RSVN_ETIME:'',
		EDC_NEW_SDATE:'',
		EDC_NEW_STIME:'',
		EDC_NEW_EDATE:'',
		EDC_NEW_ETIME:'',
		EDC_TARGETINFO:'교육대상표시명',
		EDC_CLASS_TYPE:'0',
		EDC_DAYVISITCNT_YN:'0',
		EDC_DAYVISITCNT:10,
		EDC_ALERT_SEND_YN:'0',
		EDC_FREETIME_REG_YN:'0',
		EDC_TERM_YN:'0'},
	{
		EDC_SORT:7,
		COMCD: 2,
		CTGCD: '0005',
		EDC_PRGMID:'007',
		INSTRCTR_NAME:'강사명',
		USER_SEQ:'001',
		EDC_LIMIT:[],
		EDC_WARNING:'warning',
		EDC_STATUS:'접수준비',
		EDC_PRGMNM:'14시 아동1반 초급[월수]',
		EDC_PLACENM:'',
		USE_YN:'0',
		EDC_OPENYN:'1',
		EDC_DAYS:'월,수',
		SORT_ORDER:1,
		EDC_STIME:'14:00',
		EDC_ETIME:'15:00',
		EDC_PNCPA:20,
		EDC_VPNCPA:5,
		EDC_OPNCPA:5,
		EDC_SPNCPA:'13세이하',
		EDC_ONLINEYN:'0',
		EDC_RSVN_SDATE:'',
		EDC_RSVN_STIME:'',
		EDC_RSVN_EDATE:'',
		EDC_RSVN_ETIME:'',
		EDC_NEW_SDATE:'',
		EDC_NEW_STIME:'',
		EDC_NEW_EDATE:'',
		EDC_NEW_ETIME:'',
		EDC_TARGETINFO:'교육대상표시명',
		EDC_DAYVISITCNT_YN:'0',
		EDC_DAYVISITCNT:10,
		EDC_ALERT_SEND_YN:'0',
		EDC_FREETIME_REG_YN:'0',
		EDC_TERM_YN:'0'},
	{
		EDC_SORT:8,
		COMCD: 2,
		CTGCD: '0005',
		EDC_PRGMID:'008',
		INSTRCTR_NAME:'강사명',
		USER_SEQ:'001',
		EDC_LIMIT:[],
		EDC_WARNING:'warning',
		EDC_STATUS:'접수준비',
		EDC_PRGMNM:'14시 아동1반 초급[월수]',
		EDC_PLACENM:'',
		USE_YN:'0',
		EDC_OPENYN:'1',
		EDC_DAYS:'월,수',
		SORT_ORDER:1,
		EDC_STIME:'14:00',
		EDC_ETIME:'15:00',
		EDC_PNCPA:20,
		EDC_VPNCPA:5,
		EDC_OPNCPA:5,
		EDC_SPNCPA:'13세이하',
		EDC_ONLINEYN:'0',
		EDC_RSVN_SDATE:'',
		EDC_RSVN_STIME:'',
		EDC_RSVN_EDATE:'',
		EDC_RSVN_ETIME:'',
		EDC_NEW_SDATE:'',
		EDC_NEW_STIME:'',
		EDC_NEW_EDATE:'',
		EDC_NEW_ETIME:'',
		EDC_TARGETINFO:'교육대상표시명',
		EDC_DAYVISITCNT_YN:'0',
		EDC_DAYVISITCNT:10,
		EDC_ALERT_SEND_YN:'0',
		EDC_FREETIME_REG_YN:'0',
		EDC_TERM_YN:'0'},
	{
		EDC_SORT:9,
		COMCD: 2,
		CTGCD: '0005',
		EDC_PRGMID:'009',
		INSTRCTR_NAME:'강사명',
		USER_SEQ:'001',
		EDC_LIMIT:[],
		EDC_WARNING:'warning',
		EDC_STATUS:'접수준비',
		EDC_PRGMNM:'14시 아동1반 초급[월수]',
		EDC_PLACENM:'',
		USE_YN:'0',
		EDC_OPENYN:'1',
		EDC_DAYS:'월,수',
		SORT_ORDER:1,
		EDC_STIME:'14:00',
		EDC_ETIME:'15:00',
		EDC_PNCPA:20,
		EDC_VPNCPA:5,
		EDC_OPNCPA:5,
		EDC_SPNCPA:'13세이하',
		EDC_ONLINEYN:'0',
		EDC_RSVN_SDATE:'',
		EDC_RSVN_STIME:'',
		EDC_RSVN_EDATE:'',
		EDC_RSVN_ETIME:'',
		EDC_NEW_SDATE:'',
		EDC_NEW_STIME:'',
		EDC_NEW_EDATE:'',
		EDC_NEW_ETIME:'',
		EDC_TARGETINFO:'교육대상표시명',
		EDC_DAYVISITCNT_YN:'0',
		EDC_DAYVISITCNT:10,
		EDC_ALERT_SEND_YN:'0',
		EDC_FREETIME_REG_YN:'0',
		EDC_TERM_YN:'0'},			
	{
		EDC_SORT:10,
		COMCD: 2,
		CTGCD: '0005',
		EDC_PRGMID:'010',
		INSTRCTR_NAME:'강사명',
		USER_SEQ:'001',
		EDC_LIMIT:[],
		EDC_WARNING:'warning',
		EDC_STATUS:'접수준비',
		EDC_PRGMNM:'14시 아동1반 초급[월수]',
		EDC_PLACENM:'',
		USE_YN:'0',
		EDC_OPENYN:'1',
		EDC_DAYS:'월,수',
		SORT_ORDER:1,
		EDC_STIME:'14:00',
		EDC_ETIME:'15:00',
		EDC_PNCPA:20,
		EDC_VPNCPA:5,
		EDC_OPNCPA:5,
		EDC_SPNCPA:'13세이하',
		EDC_ONLINEYN:'0',
		EDC_RSVN_SDATE:'',
		EDC_RSVN_STIME:'',
		EDC_RSVN_EDATE:'',
		EDC_RSVN_ETIME:'',
		EDC_NEW_SDATE:'',
		EDC_NEW_STIME:'',
		EDC_NEW_EDATE:'',
		EDC_NEW_ETIME:'',
		EDC_TARGETINFO:'교육대상표시명',
		EDC_DAYVISITCNT_YN:'0',
		EDC_DAYVISITCNT:10,
		EDC_ALERT_SEND_YN:'0',
		EDC_FREETIME_REG_YN:'0',
		EDC_TERM_YN:'0'},	
	{
		EDC_SORT:11,
		COMCD: 2,
		CTGCD: '0005',
		EDC_PRGMID:'011',
		INSTRCTR_NAME:'강사명',
		USER_SEQ:'001',
		EDC_LIMIT:[],
		EDC_WARNING:'warning',
		EDC_STATUS:'접수준비',
		EDC_PRGMNM:'14시 아동1반 초급[월수]',
		EDC_PLACENM:'',
		USE_YN:'0',
		EDC_OPENYN:'1',
		EDC_DAYS:'월,수',
		SORT_ORDER:1,
		EDC_STIME:'14:00',
		EDC_ETIME:'15:00',
		EDC_PNCPA:20,
		EDC_VPNCPA:5,
		EDC_OPNCPA:5,
		EDC_SPNCPA:'13세이하',
		EDC_ONLINEYN:'0',
		EDC_RSVN_SDATE:'',
		EDC_RSVN_STIME:'',
		EDC_RSVN_EDATE:'',
		EDC_RSVN_ETIME:'',
		EDC_NEW_SDATE:'',
		EDC_NEW_STIME:'',
		EDC_NEW_EDATE:'',
		EDC_NEW_ETIME:'',
		EDC_TARGETINFO:'교육대상표시명',
		EDC_DAYVISITCNT_YN:'0',
		EDC_DAYVISITCNT:10,
		EDC_ALERT_SEND_YN:'0',
		EDC_FREETIME_REG_YN:'0',
		EDC_TERM_YN:'0'},
	{
		EDC_SORT:12,
		COMCD: 2,
		CTGCD: '0005',
		EDC_PRGMID:'012',
		INSTRCTR_NAME:'강사명',
		USER_SEQ:'001',
		EDC_LIMIT:[],
		EDC_WARNING:'warning',
		EDC_STATUS:'접수준비',
		EDC_PRGMNM:'14시 아동1반 초급[월수]',
		EDC_PLACENM:'',
		USE_YN:'0',
		EDC_OPENYN:'1',
		EDC_DAYS:'월,수',
		SORT_ORDER:1,
		EDC_STIME:'14:00',
		EDC_ETIME:'15:00',
		EDC_PNCPA:20,
		EDC_VPNCPA:5,
		EDC_OPNCPA:5,
		EDC_SPNCPA:'13세이하',
		EDC_ONLINEYN:'0',
		EDC_RSVN_SDATE:'',
		EDC_RSVN_STIME:'',
		EDC_RSVN_EDATE:'',
		EDC_RSVN_ETIME:'',
		EDC_NEW_SDATE:'',
		EDC_NEW_STIME:'',
		EDC_NEW_EDATE:'',
		EDC_NEW_ETIME:'',
		EDC_TARGETINFO:'교육대상표시명',
		EDC_DAYVISITCNT_YN:'0',
		EDC_DAYVISITCNT:10,
		EDC_ALERT_SEND_YN:'0',
		EDC_FREETIME_REG_YN:'0',
		EDC_TERM_YN:'0'},
	{
		EDC_SORT:13,
		COMCD: 2,
		CTGCD: '0005',
		EDC_PRGMID:'013',
		INSTRCTR_NAME:'강사명',
		USER_SEQ:'001',
		EDC_LIMIT:[],
		EDC_WARNING:'warning',
		EDC_STATUS:'접수준비',
		EDC_PRGMNM:'14시 아동1반 초급[월수]',
		EDC_PLACENM:'',
		USE_YN:'0',
		EDC_OPENYN:'1',
		EDC_DAYS:'월,수',
		SORT_ORDER:1,
		EDC_STIME:'14:00',
		EDC_ETIME:'15:00',
		EDC_PNCPA:20,
		EDC_VPNCPA:5,
		EDC_OPNCPA:5,
		EDC_SPNCPA:'13세이하',
		EDC_ONLINEYN:'0',
		EDC_RSVN_SDATE:'',
		EDC_RSVN_STIME:'',
		EDC_RSVN_EDATE:'',
		EDC_RSVN_ETIME:'',
		EDC_NEW_SDATE:'',
		EDC_NEW_STIME:'',
		EDC_NEW_EDATE:'',
		EDC_NEW_ETIME:'',
		EDC_TARGETINFO:'교육대상표시명',
		EDC_DAYVISITCNT_YN:'0',
		EDC_DAYVISITCNT:10,
		EDC_ALERT_SEND_YN:'0',
		EDC_FREETIME_REG_YN:'0',
		EDC_TERM_YN:'0'},
	{
		EDC_SORT:14,
		COMCD: 2,
		CTGCD: '0005',
		EDC_PRGMID:'014',
		INSTRCTR_NAME:'강사명',
		USER_SEQ:'001',
		EDC_LIMIT:[],
		EDC_WARNING:'warning',
		EDC_STATUS:'접수준비',
		EDC_PRGMNM:'14시 아동1반 초급[월수]',
		EDC_PLACENM:'',
		USE_YN:'0',
		EDC_OPENYN:'1',
		EDC_DAYS:'월,수',
		SORT_ORDER:1,
		EDC_STIME:'14:00',
		EDC_ETIME:'15:00',
		EDC_PNCPA:20,
		EDC_VPNCPA:5,
		EDC_OPNCPA:5,
		EDC_SPNCPA:'13세이하',
		EDC_ONLINEYN:'0',
		EDC_RSVN_SDATE:'',
		EDC_RSVN_STIME:'',
		EDC_RSVN_EDATE:'',
		EDC_RSVN_ETIME:'',
		EDC_NEW_SDATE:'',
		EDC_NEW_STIME:'',
		EDC_NEW_EDATE:'',
		EDC_NEW_ETIME:'',
		EDC_TARGETINFO:'교육대상표시명',
		EDC_DAYVISITCNT_YN:'0',
		EDC_DAYVISITCNT:10,
		EDC_ALERT_SEND_YN:'0',
		EDC_FREETIME_REG_YN:'0',
		EDC_TERM_YN:'0'},			
	{
		EDC_SORT:15,
		COMCD: 2,
		CTGCD: '0005',
		EDC_PRGMID:'015',
		INSTRCTR_NAME:'강사명',
		USER_SEQ:'001',
		EDC_LIMIT:[],
		EDC_WARNING:'warning',
		EDC_STATUS:'접수준비',
		EDC_PRGMNM:'14시 아동1반 초급[월수]',
		EDC_PLACENM:'',
		USE_YN:'0',
		EDC_OPENYN:'1',
		EDC_DAYS:'월,수',
		SORT_ORDER:1,
		EDC_STIME:'14:00',
		EDC_ETIME:'15:00',
		EDC_PNCPA:20,
		EDC_VPNCPA:5,
		EDC_OPNCPA:5,
		EDC_SPNCPA:'13세이하',
		EDC_ONLINEYN:'0',
		EDC_RSVN_SDATE:'',
		EDC_RSVN_STIME:'',
		EDC_RSVN_EDATE:'',
		EDC_RSVN_ETIME:'',
		EDC_NEW_SDATE:'',
		EDC_NEW_STIME:'',
		EDC_NEW_EDATE:'',
		EDC_NEW_ETIME:'',
		EDC_TARGETINFO:'교육대상표시명',
		EDC_DAYVISITCNT_YN:'0',
		EDC_DAYVISITCNT:10,
		EDC_ALERT_SEND_YN:'0',
		EDC_FREETIME_REG_YN:'0',
		EDC_TERM_YN:'0'},			
];


const EDC_TAB1_ITEMS = [
	{ID:'item1',text:'기본설정',},
	{ID:'item2',text:'신규회원접수설정',	},
	{ID:'item3',text:'기존회원접수설정',	}];

const FEE_ITEMS=[
	{
		COMCD:'001',
		CTGCD:'001',
		ITEM_CD:'001',
		ITEM_NM:'성인-월강습수영',
		COST_AMT:'20000',
		MONTH_CNT:'1',
		WEB_DISPYN:'0',
		MENU_ORDER:'0',
		KIOSK:'0',
		VALID_COUNTYN:'0',
		VALID_COUNT:0,
		DISCOUNT_YN:'0',
		TAX_YN:'0',
		USE_YN:'1'
	 },
	 {
		 COMCD:'001',
		 CTGCD:'001',
		 ITEM_CD:'002',
		 ITEM_NM:'청소년-월강습수영',
		 COST_AMT:'1000',
		 MONTH_CNT:'1',
		 WEB_DISPYN:'0',
		 MENU_ORDER:'1',
		 KIOSK:'0',
		 VALID_COUNTYN:'0',
		 VALID_COUNT:0,
		 DISCOUNT_YN:'0',
		 TAX_YN:'0',
		 USE_YN:'1'
	 },
	  {
		  COMCD:'001',
		  CTGCD:'001',
		  ITEM_CD:'003',
		  ITEM_NM:'무료',
	      COST_AMT:'0',
	      MONTH_CNT:'1',
		  WEB_DISPYN:'0',
		  MENU_ORDER:'1',
		  KIOSK:'0',
		  VALID_COUNTYN:'0',
		  VALID_COUNT:0,
		  DISCOUNT_YN:'0',
		  TAX_YN:'0',
		  USE_YN:'1'
	  },
]
//[운영설정관리>업무운영정책기준설정>강좌운영설정]
const reqCnthelp=`운영정책에서 설정한 [신청횟수 제한(제한 범위,제한 기간,제한 횟수)]
적용 여부`;
const disCnthelp=`운영정책에서 설정한 [감면적용횟수 제한(제한 기간,제한 횟수)]
	적용 여부`;
const refund_calc_help=`
<div class="row">
<div class="col-4">
	○ 계산적용안함. 
	      1. 계산을 전혀 하지 않음.
	  ○ 일할계산방식(수업일수)I
	      1. 강습기간의 실 총 수업일수의 합에서
	         환불일까지의 실 수업일을 뺀 일수를 계산한다.
	      2. 이용일수 계산시 해당 강습반의 휴관일/공휴일은
	         이용일수에 포함하지 않는다.
	  ○ 일할계산방식(수업일수)II
	      1. 강습기간의 실 총 수업일수의 합에서
	         환불일까지의 실 수업일을 뺀 일수를 계산한다.
	      2. 총 수업일수와 이용일수 계산시 해당 강습반의
	         휴관일/공휴일은 일수에 포함하지 않는다.
	  ○ 일할계산방식(계약총일수)I
	      1. 일반적인 스포츠센터의 일할 방식이다.
	         실 수업과 상관없이 일수로 계산한다.
	  ○ 일할계산방식(계약총일수)II
	      1. 일반적인 스포츠센터의 일할 방식이다.
	         실 수업과 상관없이 일수로 계산한다.
	      2. 이용일수 계산시 해당 강습반의 휴관일/공휴일은
	         이용일수에 포함하지 않는다.
	  ○ 일할계산방식(계약총일수)III
	      1. 일반적인 스포츠센터의 일할 방식이다.
	         실 수업과 상관없이 일수로 계산한다.
	      2. 총 수업일수와 이용일수 계산시 해당 강습반의
	         휴관일/공휴일은 일수에 포함하지 않는다.
</div>
<div class="col-4">	         
	  ○ 월기준지정일수일할계산방식(I)
	      1. 실 수업과 상관없이 월기준지정일수로 계산한다.
	      2. 이용일수 계산시 해당 강습반의 휴관일/공휴일은 
	        일수에  포함하지 않는다.
	  ○ 월기준지정일수일할계산방식(II)
	      1. 실 수업과 상관없이 월기준지정일수로 계산한다.
	      2. 이용일수 계산시 해당 강습반의 휴관일/공휴일은 
	        일수에  포함한다.         
	  ○ 월기준지정일수일할계산방식(III)
	      1. 실 수업과 상관없이 월기준지정일수로 계산한다.
	      2. 수시접수 강습반일 경우 사용한다.
	      3. 이용일수 계산시 해당 강습반의 휴관일/공휴일은 
	        일수에  포함하지 않는다.
	  ○ 월기준지정일수일할계산방식(IV)
	      1. 실 수업과 상관없이 월기준지정일수로 계산한다.
	      2. 수시접수 강습반일 경우 사용한다.
	      3. 이용일수 계산시 해당 강습반의 휴관일/공휴일은 
	        일수에  포함한다.
	  ○ 월기준지정일수수업일수계산방식(I)
	      1. 실 수업과 상관없이 수업일수기준지정일수로 계산한다.
	      2. 총 수업일수 계산시 해당 강습반의 휴관일/공휴일은 
	        일수에  포함한다.
	  ○ 월기준지정일수수업일수계산방식(II)
	      1. 실 수업과 상관없이 수업일수기준지정일수로 계산한다.
	      2. 총 수업일수 계산시 해당 강습반의 휴관일/공휴일은 
	        일수에  포함하지 않는다.
	  ○ 월할계산방식
	      1. 해당월에서 하루라도 이용했다면 그 월은 환불 미적용됨.
	         (예: 3개월 강습에서 2개월째 2일 수강시,
	              남은 1개월만 환불한다.
</div>
<div class="col-4">	 	              
	  ○ 평생교육운영소비자규정적용
	      1. 개시일 이전은 이용금액 전액환불
	      2. 개시일 이후
	         가)수강료징수기간이 1개월 이내
	             - 계약기간의 1/3 경과 전
	               (수강료의 2/3 해당 액 환급)
	             - 계약기간의 1/2 경과 전
	               (수강료의 1/2 해당 액 환급)
	             - 계약기간의 1/2 이후      (미환급)
	         나)수강료징수기간이 1월 초과 
	             - 반환사유가 발생한 당해 월의 반환 대상 수강료 
	              (수강료 징수 기간이 1개월 이내인 경우에 따라 
	              산출된 수강료를 말한다) 와 
	               나머지 월의 수강료 전액을 합산한 금액.
</div>
</div>`;
const DISCOUNT_ITEMS=[
	{
		DC_CD:'0002',
		DC_NAME:'국가유공자',
		DC_TYPE:'0002',
		DC_TYPE1:'0',
		DC_TYPE2:'0',
		DC_TYPE3:'0',
		DC_TYPE4:'0',
		DC_START:0,
		DC_END:0,
		DC_START_GBN:'0',
		DC_END_GBN:'1',
		DC_RATE_GBN:'0',
		DC_RATE:'0',
		DC_AMOUNT:'0',
		DC_CHECKED:'Y',
	},
	{
		DC_CD:'0003',
		DC_NAME:'장애인정도',
		DC_TYPE:'0001',
		DC_TYPE1:'0',
		DC_TYPE2:'0',
		DC_TYPE3:'0',
		DC_TYPE4:'0',
		DC_START:0,
		DC_END:0,
		DC_START_GBN:'0',
		DC_END_GBN:'1',
		DC_RATE_GBN:'0',
		DC_RATE:'0',
		DC_AMOUNT:'0'		
	},
	{
		DC_CD:'0004',
		DC_NAME:'관내거주',
		DC_TYPE:'0004',
		DC_TYPE1:'0',
		DC_TYPE2:'0',
		DC_TYPE3:'0',
		DC_TYPE4:'0',
		DC_START:0,
		DC_END:0,
		DC_START_GBN:'0',
		DC_END_GBN:'1',
		DC_RATE_GBN:'0',
		DC_RATE:'0',
		DC_AMOUNT:'0'		
	},
	{
		DC_CD:'0005',
		DC_NAME:'국민기초생활수급자',
		DC_TYPE:'0007',
		DC_TYPE1:'0',
		DC_TYPE2:'0',
		DC_TYPE3:'0',
		DC_TYPE4:'0',
		DC_START:0,
		DC_END:0,
		DC_START_GBN:'0',
		DC_END_GBN:'1',
		DC_RATE_GBN:'0',
		DC_RATE:'0',
		DC_AMOUNT:'0'		
	},
	{
		DC_CD:'0006',
		DC_NAME:'국민기초생활수급자(생계,의료급여)',
		DC_TYPE:'0007',
		DC_TYPE1:'0',
		DC_TYPE2:'0',
		DC_TYPE3:'0',
		DC_TYPE4:'0',
		DC_START:0,
		DC_END:0,
		DC_START_GBN:'0',
		DC_END_GBN:'1',
		DC_RATE_GBN:'0',
		DC_RATE:'0',
		DC_AMOUNT:'0',		
	},
	{
		DC_CD:'0007',
		DC_NAME:'국민기초생활수급자(교육급여)',
		DC_TYPE:'0007',
		DC_TYPE1:'0',
		DC_TYPE2:'0',
		DC_TYPE3:'0',
		DC_TYPE4:'0',
		DC_START:0,
		DC_END:0,
		DC_START_GBN:'0',
		DC_END_GBN:'1',
		DC_RATE_GBN:'0',
		DC_RATE:'0',
		DC_AMOUNT:'0',		
	},
	{
		DC_CD:'0008',
		DC_NAME:'국민기초생활수급자(주거급여)',
		DC_TYPE:'0007',
		DC_TYPE1:'0',
		DC_TYPE2:'0',
		DC_TYPE3:'0',
		DC_TYPE4:'0',
		DC_START:0,
		DC_END:0,
		DC_START_GBN:'0',
		DC_END_GBN:'1',
		DC_RATE_GBN:'0',
		DC_RATE:'0',
		DC_AMOUNT:'0'		
	},{
		DC_CD:'0009',
		DC_NAME:'나이 범위 설정1',
		DC_TYPE:'0003',
		DC_TYPE1:'0',
		DC_TYPE2:'0',
		DC_TYPE3:'0',
		DC_TYPE4:'0',
		DC_START:0,
		DC_END:0,
		DC_START_GBN:'0',
		DC_END_GBN:'',
		DC_RATE_GBN:'0',
		DC_RATE:'0',
		DC_AMOUNT:'0'
	},
	{
		DC_CD:'0010',
		DC_NAME:'나이 범위 설정2',
		DC_TYPE:'0003',
		DC_TYPE1:'0',
		DC_TYPE2:'0',
		DC_TYPE3:'0',
		DC_TYPE4:'0',
		DC_START:0,
		DC_END:0,
		DC_START_GBN:'0',
		DC_END_GBN:'',
		DC_RATE_GBN:'0',
		DC_RATE:'0',
		DC_AMOUNT:'0'
	},
	{
		DC_CD:'0011',
		DC_NAME:'차상위본임부담금 경감대상자',
		DC_TYPE:'0003',
		DC_TYPE1:'0',
		DC_TYPE2:'0',
		DC_TYPE3:'0',
		DC_TYPE4:'0',
		DC_AGE_START:0,
		DC_AGE_END:0,
		DC_START_GBN:'0',
		DC_END_GBN:'0',
		DC_RATE_GBN:'0',
		DC_RATE:'0',
		DC_AMOUNT:'0'
	},
	{
		DC_CD:'0012',
		DC_NAME:'차상위 수혜자',
		DC_TYPE:'0000',
		DC_TYPE1:'0',
		DC_TYPE2:'0',
		DC_TYPE3:'0',
		DC_TYPE4:'0',
		DC_START:0,
		DC_END:0,
		DC_START_GBN:'0',
		DC_END_GBN:'0',
		DC_RATE_GBN:'0',
		DC_RATE:'0',
		DC_AMOUNT:'0'
	},
	{
		DC_CD:'0013',
		DC_NAME:'차상위 자활급여 대상자',
		DC_TYPE:'0000',
		DC_TYPE1:'0',
		DC_TYPE2:'0',
		DC_TYPE3:'0',
		DC_TYPE4:'0',
		DC_START:0,
		DC_END:0,
		DC_START_GBN:'0',
		DC_END_GBN:'1',
		DC_RATE_GBN:'0',
		DC_RATE:'0',
		DC_AMOUNT:'0'
	},
	{
		DC_CD:'0014',
		DC_NAME:'차상위 장애수당·장애연금',
		DC_TYPE:'0000',
		DC_TYPE1:'0',
		DC_TYPE2:'0',
		DC_TYPE3:'0',
		DC_TYPE4:'0',
		DC_START:0,
		DC_END:0,
		DC_START_GBN:'0',
		DC_END_GBN:'1',
		DC_RATE_GBN:'0',
		DC_RATE:'0',
		DC_AMOUNT:'0'
	},
	{
		DC_CD:'0015',
		DC_NAME:'다자녀감면(3자녀이상)',
		DC_TYPE:'0006',
		DC_TYPE1:'0',
		DC_TYPE2:'0',
		DC_TYPE3:'0',
		DC_TYPE4:'0',
		DC_START:0,
		DC_END:0,
		DC_START_GBN:'0',
		DC_END_GBN:'1',
		DC_RATE_GBN:'0',
		DC_RATE:'0',
		DC_AMOUNT:'0'
	},
	{
		DC_CD:'0016',
		DC_NAME:'개월수설정',
		DC_TYPE:'0005',
		DC_TYPE1:'0',
		DC_TYPE2:'0',
		DC_TYPE3:'0',
		DC_TYPE4:'0',
		DC_START:0,
		DC_END:0,
		DC_START_GBN:'0',
		DC_END_GBN:'1',
		DC_RATE_GBN:'0',
		DC_RATE:'0',
		DC_AMOUNT:'0'
	},
]
const AGE_ITEMS=[
	{
		AGE_USE:true,
		AGE_CD:'0001',
		AGE_NAME:'청소년',
		AGE_START:13,
		AGE_END:18,
		AGE_TYPE:'0',
		AGE_DAN:'0'
	 },
	 {
		 AGE_USE:false,
		 AGE_CD:'0002',
		 AGE_NAME:'성인',
		 AGE_START:19,
		 AGE_END:100,
		 AGE_TYPE:'0',
		 AGE_DAN:'0'
	 }
	]
const FEE_AGE_ITEMS=[
	{
		FEE_AGE_ITEM_ID:1,
		FEE_ID:'001',
		FEE_NM:'월정기 수영 성인',
		AGE_CD:'0001',
		AGE_NAME:'성인',
		AGE_START:20,
		AGE_END:100,
		AGE_TYPE:'0',
		AGE_USE:true
	},
	{
		FEE_AGE_ITEM_ID:2,
		FEE_ID:'001',
		FEE_NM:'월정기 수영 성인',
		AGE_CD:'0002',
		AGE_NAME:'청소년',
		AGE_START:14,
		AGE_END:19,
		AGE_TYPE:'0',
		AGE_USE:true
	},
	{
		FEE_AGE_ITEM_ID:3,
		FEE_ID:'001',
		FEE_NM:'월정기 수영 성인',
		AGE_CD:'0001',
		AGE_NAME:'어린이',
		AGE_START:8,
		AGE_END:13,
		AGE_TYPE:'0',
		AGE_USE:false
	},
	{
		FEE_AGE_ITEM_ID:4,
		FEE_ID:'002',
		FEE_NM:'월정기 수영 어린이',
		AGE_CD:'0001',
		AGE_NAME:'성인',
		AGE_START:20,
		AGE_END:100,
		AGE_TYPE:'0',
		AGE_USE:false
	},
	{
		FEE_AGE_ITEM_ID:5,
		FEE_ID:'002',
		FEE_NM:'월정기 수영 어린이',
		AGE_CD:'0002',
		AGE_NAME:'청소년',
		AGE_START:14,
		AGE_END:19,
		AGE_TYPE:'0',
		AGE_USE:false
	},
	{
		FEE_AGE_ITEM_ID:6,
		FEE_ID:'002',
		FEE_NM:'월정기 수영 어린이',
		AGE_CD:'0001',
		AGE_NAME:'어린이',
		AGE_START:8,
		AGE_END:13,
		AGE_TYPE:'0',
		AGE_USE:true
	},
	
]
const FREE_SCHEDULE=[
	{
		group_id:'001',
		group_name:'평일',
		group_weekdays:['2','3','4','5'],
		time_id:'0001',
		time_name:'1회차',
		time_weekdays:['2','3','4','5'],
		time_start:'08:00',
		time_end:'08:50',
		use_yn:'0',
	},
	{
		group_id:'001',
		group_name:'평일',
		group_weekdays:['2','3','4','5'],
		time_id:'0002',
		time_name:'2회차',
		time_weekdays:['1','2'],
		time_start:'09:00',
		time_end:'09:50',
		use_yn:'0',
	},
	{
		group_id:'001',
		group_name:'평일',
		group_weekdays:['2','3','4','5'],
		time_id:'0003',
		time_name:'3회차',
		time_weekdays:['1','3'],
		time_start:'12:00',
		time_end:'12:50',
		use_yn:'0',
	},
	{
		group_id:'002',
		group_name:'주말및공휴일',
		group_weekdays:['6','0','7'],
		time_id:'0004',
		time_name:'1회차',
		time_weekdays:['6','0','7'],
		time_start:'08:00',
		time_end:'08:50',
		use_yn:'0',
	},
	{
		group_id:'002',
		group_name:'주말및공휴일',
		group_weekdays:['6','0','7'],
		time_id:'0005',
		time_name:'2회차',
		time_weekdays:['7'],
		time_start:'09:00',
		time_end:'09:50',
		use_yn:'1',
	},
	{
		group_id:'002',
		group_name:'주말및공휴일',
		group_weekdays:['6','0','7'],
		time_id:'0006',
		time_name:'3회차',
		time_weekdays:['7'],
		time_start:'13:00',
		time_end:'13:50',
		use_yn:'1',
	},
	{
		group_id:'002',
		group_name:'주말및공휴일',
		group_weekdays:['6','0','7'],
		time_id:'0007',
		time_name:'4회차',
		time_weekdays:['7'],
		time_start:'15:00',
		time_end:'15:50',
		use_yn:'1',
	}
];
const FREE_SCHEDULE5=[
	{
		group_id:'001',
		group_name:'평일',
		group_weekdays:['1','2','3','4','5'],
		times:[
			{
				time_id:'0001',
				time_name:'1회차',
				time_weekdays:['1','2','3','4','5'],
				time_start:'08:00',
				time_end:'08:50',
				time_h_yn:false,
				time_hstart:'08:00',
				time_hend:'00:00',
				use_yn:'0',
			},{
				time_id:'0002',
				time_name:'2회차',
				time_weekdays:['1','2','3','4','5'],
				time_start:'09:00',
				time_end:'09:50',
				time_h_yn:false,
				time_hstart:'00:00',
				time_hend:'00:00',
				use_yn:'0',
			},
			{
				time_id:'0003',
				time_name:'3회차',
				time_weekdays:['1','2','3','4','5'],
				time_start:'15:00',
				time_end:'15:50',
				time_h_yn:false,
				time_hstart:'00:00',
				time_hend:'00:00',
				use_yn:'0',
			},{
				time_id:'0008',
				time_name:'4회차',
				time_weekdays:['1','2','3','4','5'],
				time_start:'17:00',
				time_end:'17:50',
				time_h_yn:false,
				time_hstart:'00:00',
				time_hend:'00:00',
				use_yn:'0',
			},
		]
	},
	{
		group_id:'002',
		group_name:'주말',
		group_weekdays:['6','0'],
		times:[
			{
				time_id:'0004',
				time_name:'1회차',
				time_weekdays:['6','0'],
				time_start:'08:00',
				time_end:'08:50',
				time_h_yn:false,
				time_hstart:'00:00',
				time_hend:'00:00',
				use_yn:'0',
			},{
				time_id:'0005',
				time_name:'2회차',
				time_weekdays:['6','0'],
				time_start:'09:00',
				time_end:'09:50',
				time_h_yn:false,
				time_hstart:'00:00',
				time_hend:'00:00',
				use_yn:'1',
			},{
				time_id:'0006',
				time_name:'3회차',
				time_weekdays:['6','0'],
				time_start:'13:00',
				time_end:'13:50',
				time_h_yn:false,
				time_hstart:'',
				time_hend:'',
				use_yn:'1',
			},
		]
	},
	{
		group_id:'003',
		group_name:'공휴일',
		group_weekdays:['7'],
		times:[
		{
			time_id:'0007',
			time_name:'4회차',
			time_weekdays:['7'],
			time_start:'15:00',
			time_end:'15:50',
			time_hstart:'',
			time_hend:'',
			use_yn:'1',
		}]
		
	},
	
]
const FREE_SCHEDULE3=[
	{
		EDC_PRGMID:'0001',
		APP_SEQ:'0001',
		EDC_DAYGBN:'1',
		STIME:'08:00',
		ETIME:'08:50',
		HLDY_STIME:'09:00',
		HLDY_ETIME:'10:00',
		HLDY_USE_YN:true,
		USEYN:'0',
	},
	{
		EDC_PRGMID:'0001',
		APP_SEQ:'0002',
		EDC_DAYGBN:'6',
		STIME:'08:00',
		ETIME:'08:50',
		HLDY_STIME:'',
		HLDY_ETIME:'',
		HLDY_USE_YN:false,
		USEYN:'0',
	},
	
];
const FREE_SCHEDULE2=[
	{
		group_id:'001',
		group_name:'평일',
		group_weekdays:['1','2','3','4','5'],
		times:[
			{
				time_id:'0001',
				time_name:'1회차',
				time_weekdays:['1','2','3','4','5'],
				time_start:'08:00',
				time_end:'08:50',
				time_h_yn:false,
				time_hstart:'08:00',
				time_hend:'00:00',
				use_yn:'0',
			},{
				time_id:'0002',
				time_name:'2회차',
				time_weekdays:['1','2','3','4','5'],
				time_start:'09:00',
				time_end:'09:50',
				time_h_yn:false,
				time_hstart:'00:00',
				time_hend:'00:00',
				use_yn:'0',
			},
		]
	},
	{
		group_id:'002',
		group_name:'주말및공휴일',
		group_weekdays:['6','0','7'],
		times:[
			{
				time_id:'0004',
				time_name:'1회차',
				time_weekdays:['6','0','7'],
				time_start:'08:00',
				time_end:'08:50',
				time_h_yn:false,
				time_hstart:'00:00',
				time_hend:'00:00',
				use_yn:'0',
			},{
				time_id:'0005',
				time_name:'2회차',
				time_weekdays:['6','0','7'],
				time_start:'09:00',
				time_end:'09:50',
				time_h_yn:false,
				time_hstart:'00:00',
				time_hend:'00:00',
				use_yn:'1',
			},{
				time_id:'0006',
				time_name:'3회차',
				time_weekdays:['6','0','7'],
				time_start:'13:00',
				time_end:'13:50',
				time_h_yn:false,
				time_hstart:'',
				time_hend:'',
				use_yn:'1',
			},{
				time_id:'0007',
				time_name:'4회차',
				time_weekdays:['6','0','7'],
				time_start:'15:00',
				time_end:'15:50',
				time_hstart:'',
				time_hend:'',
				time_h_yn:false,
				use_yn:'1',
			}
		]
	},
	
]
const legal_holiday = [{
    name: '성탄절', date: '2022-12-25'
}, {
    name: '설날연휴', date: '2023-01-21',
}, {
    name: '설날', date: '2023-01-22'
}, {
    name: '설날연휴', date: '2023-01-23'
}, {
    name: '삼일절', date: '2023-03-01',
}];
const holidaykind = [
	{text: '시설공휴일', value: 0,}, 
	{text: '강좌전용휴관일',value: 1,},
];

/*const holidayTypes = [{
    text: '휴관일', id: 1, color: '#fb475e',
}, {
    text: '평일', id: 2, color: '#019992',
}, {
    text: '공휴일', id: 3, color: '#56ca85'
}];*/
const holidayTypes = [{
    text: '휴관일', id: 1,
}, {
    text: '법정공휴일', id: 3,
}];
const frequency = [{
    Code: 'WEEKLY', Name: '매주',
}, {
    Code: 'MONTHLY', Name: '매월',
}, {
    Code: 'YEARLY', Name: '매년'
}]
const repeatMonthlyConditions = [{
    Code: '0001', Name: '일자마다 반복',
}, {
    Code: '0002', Name: '요일마다 반복'
}];

//const repeatEndTypes = [{type: 'never'}, {type: 'until'}, {type: 'count'}];
const repeatEndTypes = [{type: 'until'}, {type: 'count'}];

const days = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
const weekendPolicy = [{
    ID: 1, Text: '모든요일', items: ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'],
}, {
    ID: 2, Text: '평일', items: ['MO', 'TU', 'WE', 'TH', 'FR'],
}, {
    ID: 3, Text: '주말', items: ['SA', 'SU'],
}];

const dayPolicy = [{
    ID: 'MO', Text: '월',
}, {
    ID: 'TU', Text: '화',
}, {
    ID: 'WE', Text: '수',
}, {
    ID: 'TH', Text: '목'
}, {
    ID: 'FR', Text: '금'
}, {
    ID: 'SA', Text: '토'
}, {
    ID: 'SU', Text: '일',
},];

var lecturePayList2 = [
	{LEC_SEQ:'1',LEC_WEEK:'월,수,금',INSTR_NAME:'김강사' ,LEC_TIME:'06:00~08:00',LEC_APP_CNT:'1000',LEC_REMAIN_CNT:'온라인:30 / 방문:20',LEC_NAME:'정기수영 새벽1 중급 [월수반]',LEC_STATUS:'접수중',},
	{LEC_SEQ:'2',LEC_WEEK:'월,수,금',INSTR_NAME:'이강사' ,LEC_TIME:'06:00~08:00',LEC_APP_CNT:'50',LEC_REMAIN_CNT:'온라인:30 / 방문:20',LEC_NAME:'정기수영 새벽1 중급 [월수반]',LEC_STATUS:'접수준비',},
	{LEC_SEQ:'3',LEC_WEEK:'월,수,금',INSTR_NAME:'박강사' ,LEC_TIME:'06:00~08:00',LEC_APP_CNT:'50',LEC_REMAIN_CNT:'온라인:30 / 방문:20',LEC_NAME:'정기수영 새벽1 중급 [월수반]',LEC_STATUS:'정원마감',},
	{LEC_SEQ:'4',LEC_WEEK:'월,수,금',INSTR_NAME:'미지정' ,LEC_TIME:'06:00~08:00',LEC_APP_CNT:'50',LEC_REMAIN_CNT:'온라인:30 / 방문:20',LEC_NAME:'정기수영 새벽1 중급 [월수반]',LEC_STATUS:'접수종료',},
	{LEC_SEQ:'5',LEC_WEEK:'월,수,금',INSTR_NAME:'김강사1' ,LEC_TIME:'06:00~08:00',LEC_APP_CNT:'50',LEC_REMAIN_CNT:'온라인:30 / 방문:20',LEC_NAME:'정기수영 새벽1 중급 [월수반]',LEC_STATUS:'접수중',},
	{LEC_SEQ:'6',LEC_WEEK:'월,수,금',INSTR_NAME:'김강사2' ,LEC_TIME:'06:00~08:00',LEC_APP_CNT:'50',LEC_REMAIN_CNT:'온라인:30 / 방문:20',LEC_NAME:'정기수영 새벽1 중급 [월수반]',LEC_STATUS:'접수중',},
	{LEC_SEQ:'7',LEC_WEEK:'월,수,금',INSTR_NAME:'김강사3' ,LEC_TIME:'06:00~08:00',LEC_APP_CNT:'50',LEC_REMAIN_CNT:'온라인:30 / 방문:20',LEC_NAME:'정기수영 새벽1 중급 [월수반]',LEC_STATUS:'접수중',},
	{LEC_SEQ:'8',LEC_WEEK:'월,수,금',INSTR_NAME:'김강사4' ,LEC_TIME:'06:00~08:00',LEC_APP_CNT:'50',LEC_REMAIN_CNT:'온라인:30 / 방문:20',LEC_NAME:'정기수영 새벽1 중급 [월수반]',LEC_STATUS:'접수중',},
	{LEC_SEQ:'9',LEC_WEEK:'월,수,금',INSTR_NAME:'김강사5' ,LEC_TIME:'06:00~08:00',LEC_APP_CNT:'50',LEC_REMAIN_CNT:'온라인:30 / 방문:20',LEC_NAME:'정기수영 새벽1 중급 [월수반]',LEC_STATUS:'접수중',},
	{LEC_SEQ:'10',LEC_WEEK:'월,수,금',INSTR_NAME:'김강사6' ,LEC_TIME:'06:00~08:00',LEC_APP_CNT:'50',LEC_REMAIN_CNT:'온라인:30 / 방문:20',LEC_NAME:'정기수영 새벽1 중급 [월수반]',LEC_STATUS:'접수중',},
];	