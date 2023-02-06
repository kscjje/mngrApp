var searchType = [{
  ID: 'T',
  NAME: '제목',
}, {
  ID: 'C',
  NAME: '내용',
}, {
  ID: 'A',
  NAME: '제목+내용',
}, {
  ID: 'I',
  NAME: '작성자 아이디',
}, {
  ID: 'N',
  NAME: '작성자명',	  
}];

var masterSearchType = [{
	  ID: 'N',
	  NAME: '게시판명',
	}, {
	  ID: 'C',
	  NAME: '게시판코드',	  
	}];

var tmplType = [{
	  ID: '',
	  NAME: '템플릿타입(전체)',
	}, {
	  ID: 'C',
	  NAME: '리스트형',
	}, {
		  ID: 'C',
		  NAME: '타일형',
	}, {
		  ID: 'C',
		  NAME: '민원형',
	}];

const useType = [{
	  ID: '1',
	  NAME: '사용',
	}, {
	  ID: '2',
	  NAME: '사용안함',		  
	}];

const useYN = [{
	  ID: '1',
	  NAME: 'Y',
	}, {
	  ID: '2',
	  NAME: 'N',		  
	}];

const writeType = [{
	  ID: '1',
	  NAME: '사용자 가능',
	}, {
	  ID: '2',
	  NAME: '관리자만 가능(담당자 표시)',
	}, {
	  ID: '3',
	  NAME: '관리자만 가능(담당자 표시안함)',	  
	}];

const topType = [{
	  ID: '1',
	  NAME: '고정',
	}, {
	  ID: '2',
	  NAME: '고정안함',		  
	}];

const displayType = [{
	  ID: '1',
	  NAME: '항상표시',
	}, {
	  ID: '2',
	  NAME: '기간설정',		  
	}];

var bbsListJoin = [
	
	{BBS_ID:'FREE',NTT_NO:'1',NTT_SJ:'사이트 오픈을 축하합니다',NTT_CN:'<strong>사이트 오픈을 축하합니다</strong>',SORT_ORDR:'1',RDCNT:'10',USE_AT:'Y',NTCR_ID:'admin',NTCR_NM:'관리자',ATCH_FILE_ID:'1',CTG_ID:'A',NTCE_STAT:'Y',LINK_URL:'',FRST_REGIST_PNTTM:'2022-01-01 13:10:00',FRST_REGISTER_ID:'admin',LAST_UPDT_PNTTM:'2022-03-01',LAST_UPDUSR_ID:'admin',NTCE_BGNDE:'2022-01-01',NTCE_ENDDE:'2022-12-01',DISP_TYPE:'1'},
	{BBS_ID:'FREE',NTT_NO:'2',NTT_SJ:'변경사항',NTT_CN:'<div style="color:blue">변경사항</div><br><div style="color:green">변경사항2</div>',SORT_ORDR:'2',RDCNT:'200',USE_AT:'Y',NTCR_ID:'myname',NTCR_NM:'회원명',ATCH_FILE_ID:'2',CTG_ID:'A',NTCE_STAT:'Y',LINK_URL:'',FRST_REGIST_PNTTM:'2022-01-02 11:11:59',FRST_REGISTER_ID:'myname',LAST_UPDT_PNTTM:'2022-03-02',LAST_UPDUSR_ID:'myname',NTCE_BGNDE:'',NTCE_ENDDE:'',DISP_TYPE:'1'},
	{BBS_ID:'FREE',NTT_NO:'3',NTT_SJ:'테스트테스트',NTT_CN:'테스트테스트',SORT_ORDR:'3',RDCNT:'0',USE_AT:'Y',NTCR_ID:'hong',NTCR_NM:'홍길동',ATCH_FILE_ID:'3',CTG_ID:'A',NTCE_STAT:'Y',LINK_URL:'',FRST_REGIST_PNTTM:'2022-01-03 13:10:00',FRST_REGISTER_ID:'hong',LAST_UPDT_PNTTM:'2022-03-03',LAST_UPDUSR_ID:'hong',NTCE_BGNDE:'',NTCE_ENDDE:'',DISP_TYPE:'1'},
	{BBS_ID:'FREE',NTT_NO:'4',NTT_SJ:'자유롭게 글을 남겨볼까나',NTT_CN:'자유롭게 글을 남겨볼까나',SORT_ORDR:'4',RDCNT:'13',USE_AT:'Y',NTCR_ID:'kkk',NTCR_NM:'크크크',ATCH_FILE_ID:'4',CTG_ID:'A',NTCE_STAT:'Y',LINK_URL:'',FRST_REGIST_PNTTM:'2022-01-04 01:39:08',FRST_REGISTER_ID:'kkk',LAST_UPDT_PNTTM:'2022-03-04',LAST_UPDUSR_ID:'kkk',NTCE_BGNDE:'',NTCE_ENDDE:'',DISP_TYPE:'1'},
	{BBS_ID:'FREE',NTT_NO:'5',NTT_SJ:'test 123',NTT_CN:'test 123',SORT_ORDR:'5',RDCNT:'55',USE_AT:'Y',NTCR_ID:'hahaha',NTCR_NM:'하하하',ATCH_FILE_ID:'5',CTG_ID:'A',NTCE_STAT:'Y',LINK_URL:'',FRST_REGIST_PNTTM:'2022-01-05 13:10:00',FRST_REGISTER_ID:'hahaha',LAST_UPDT_PNTTM:'2022-03-05',LAST_UPDUSR_ID:'hahaha',NTCE_BGNDE:'',NTCE_ENDDE:'',DISP_TYPE:'1'},
	{BBS_ID:'FREE',NTT_NO:'6',NTT_SJ:'코로나 저리가',NTT_CN:'코로나 저리가',SORT_ORDR:'6',RDCNT:'3010',USE_AT:'Y',NTCR_ID:'superman',NTCR_NM:'수퍼아저씨',ATCH_FILE_ID:'6',CTG_ID:'A',NTCE_STAT:'Y',LINK_URL:'',FRST_REGIST_PNTTM:'2022-01-06 13:00:22',FRST_REGISTER_ID:'superman',LAST_UPDT_PNTTM:'2022-03-06',LAST_UPDUSR_ID:'superman',NTCE_BGNDE:'',NTCE_ENDDE:'',DISP_TYPE:'1'},
	{BBS_ID:'FREE',NTT_NO:'7',NTT_SJ:'수영은 재밌어',NTT_CN:'수영은 재밌어',SORT_ORDR:'7',RDCNT:'111',USE_AT:'Y',NTCR_ID:'bill',NTCR_NM:'빌게이츠',ATCH_FILE_ID:'7',CTG_ID:'A',NTCE_STAT:'Y',LINK_URL:'',FRST_REGIST_PNTTM:'2022-01-07 21:59:00',FRST_REGISTER_ID:'bill',LAST_UPDT_PNTTM:'2022-03-07',LAST_UPDUSR_ID:'bill',NTCE_BGNDE:'',NTCE_ENDDE:'',DISP_TYPE:'1'},

];	

var masterListJoin = [

	{BBS_ID:'FREE',BBS_NM:'자유게시판',BBS_INTRCN:'자유롭게 글을 남겨요',BBS_TY_CODE:'N',REPLY_POSBL_AT:'N',BBS_STATMNGYN:'N',FILE_ATCH_POSBL_AT:'Y',ATCH_POSBL_FILE_NUMBER:'3',ATCH_POSBL_FILE_SIZE:'50',ATCH_POSBL_FILE_EXT:'PPT,PPTX,XLS,XLSX',USE_AT:'Y',TMPLAT_ID:'1',TMPLAT_NM:'리스트형',FRST_REGISTER_ID:'admin',FRST_REGIST_PNTTM:'2022-01-01 13:10:00',LAST_UPDUSR_ID:'admin',LAST_UPDT_PNTTM:'2022-03-01 13:10:00',ANSWER_AT:'N',MANAGER_AT:'Y',URL_LNIKYN:'N',BBS_CNT:'1005'},
	{BBS_ID:'PHOTO',BBS_NM:'포토갤러리',BBS_INTRCN:'사진을 올려보세요',BBS_TY_CODE:'N',REPLY_POSBL_AT:'N',BBS_STATMNGYN:'N',FILE_ATCH_POSBL_AT:'Y',ATCH_POSBL_FILE_NUMBER:'3',ATCH_POSBL_FILE_SIZE:'50',ATCH_POSBL_FILE_EXT:'PPT,PPTX,XLS,XLSX',USE_AT:'Y',TMPLAT_ID:'2',TMPLAT_NM:'타일형',FRST_REGISTER_ID:'webadm',FRST_REGIST_PNTTM:'2022-01-02 11:11:59',LAST_UPDUSR_ID:'webadm',LAST_UPDT_PNTTM:'2022-03-02 11:11:59',ANSWER_AT:'N',MANAGER_AT:'Y',URL_LNIKYN:'N',BBS_CNT:'10'},
	{BBS_ID:'QNA',BBS_NM:'QNA',BBS_INTRCN:'질문을 올리면 관리자가 답변해줍니다',BBS_TY_CODE:'N',REPLY_POSBL_AT:'N',BBS_STATMNGYN:'N',FILE_ATCH_POSBL_AT:'Y',ATCH_POSBL_FILE_NUMBER:'3',ATCH_POSBL_FILE_SIZE:'50',ATCH_POSBL_FILE_EXT:'PPT,PPTX,XLS,XLSX',USE_AT:'Y',TMPLAT_ID:'3',TMPLAT_NM:'민원형',FRST_REGISTER_ID:'manager',FRST_REGIST_PNTTM:'2022-01-03 13:10:00',LAST_UPDUSR_ID:'manager',LAST_UPDT_PNTTM:'2022-03-03 13:10:00',ANSWER_AT:'N',MANAGER_AT:'Y',URL_LNIKYN:'N',BBS_CNT:'33'},	
	
];

var termsListJoin = [
	{RNUM:1, TERMS_NO: "1008", TERMS_SJ: "개인정보 수집 이용 관한 동의(필수)", TERMS_VERSION:"1.0", USE_YN: "1", TERMS_CN:"개인정보 수집 이용 관한 동의 내용",FRST_REGIST_PNTTM:'2022-01-03 13:10:00',FRST_REGISTER_ID:'hong',LAST_UPDT_PNTTM:'2022-03-03',LAST_UPDUSR_ID:'hong' },
	{RNUM:2, TERMS_NO: "3001", TERMS_SJ: "교육 프로그램 예약 유의사항", TERMS_VERSION:"1.0", USE_YN: "1", TERMS_CN:"교육 프로그램 예약 유의사항 내용",FRST_REGIST_PNTTM:'2022-01-03 13:10:00',FRST_REGISTER_ID:'hong',LAST_UPDT_PNTTM:'2022-03-03',LAST_UPDUSR_ID:'hong' },
	
];