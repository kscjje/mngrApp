let frmDetail=null;
var lecListJoin = [
	{USER_NO:'00001101',USER_NAME:'홍길동',USER_GENDER:'남',USER_BIRTH:'1980-01-01',USER_BIRTH_TYPE:'양력',USER_REG_DT:'2021-01-01',USER_HP:'010-1111-2222',USER_ID:'hong2',USER_PRIVACY_YN:'Y',USER_TYPE:'정회원',USER_SEND_YN:'Y',USER_PARENT_YN:'N',USER_PARENT_HP:' ',USER_LAND:'관내거주',USER_CAR_NO:'52너1122',USER_ADDRESS:'서울 영등포구 4455',USER_POST:'12345',USER_CENTER:'기장아쿠아센터',USER_REG_TYPE:'방문',CARD_NO:'1001',CARD_TYPE:'바코드',CARD_REG_DT:'2021-01-01',CARD_USE_YN:'가능',CARD_REMAKE_YN:'재발급',CARD_STATUS:'발급',CARD_CENTER:'기장아쿠아센터',RDC_NAME:'국가유공자',RDC_VALUE:'5',RDC_START_DT:'2022-03-01',RDC_END_DT:'2022-04-01',LEC_SEQ:'1',LEC_NAME:'월정기 수영',LEC_REG_DT:'2019-01-01',LEC_DEL_YN:'정상',LEC_CATEGORY:'정기수영',LEC_USE_YN:'Y',LEC_ONLINE_YN:'Y',LEC_PLACE:'수영장',LEC_TYPE:'0',TCH_NAME:'0',LEC_WEEK:'월',LEC_START_DT:'2022-01-01',LEC_END_DT:'2022-11-01',LEC_REDUCE_DESC:' ',DLY_START_DT:'2022-03-01',DLY_END_DT:'2022-04-01',DLY_DESC:' ',LEC_REMAIN_CNT:'0',LEC_FREE_CNT:'0',LEC_USE_STATUS:'종료',PROG_SEQ:'10',PROG_NAME:'월 2회 강습수영',PROG_PRICE:'60000',APP_NO:'1',APP_TYPE:'온라인',APP_STATUS:'결제완료',APP_REG_DT:'2022-05-01  12:13:01',APP_CONF_DT:'2022-05-02  12:13:01',APP_DESC:' ',APP_REG_ADMIN_ID:'admin1'},
	{USER_NO:'00001102',USER_NAME:'이순신',USER_GENDER:'남',USER_BIRTH:'1979-08-29',USER_BIRTH_TYPE:'음력',USER_REG_DT:'2021-01-02',USER_HP:'010-2143-3333',USER_ID:'comingsoon',USER_PRIVACY_YN:'N',USER_TYPE:'정회원',USER_SEND_YN:'N',USER_PARENT_YN:'N',USER_PARENT_HP:' ',USER_LAND:'관외거주',USER_CAR_NO:' ',USER_ADDRESS:'서울 양천구 9911',USER_POST:'22555',USER_CENTER:'기장아쿠아센터',USER_REG_TYPE:'온라인',CARD_NO:'1002',CARD_TYPE:'RF',CARD_REG_DT:'2021-01-02',CARD_USE_YN:'가능',CARD_REMAKE_YN:'재발급',CARD_STATUS:'발급',CARD_CENTER:'기장아쿠아센터',RDC_NAME:'기초생활수급자',RDC_VALUE:'10',RDC_START_DT:'2022-03-02',RDC_END_DT:'2022-04-02',LEC_SEQ:'2',LEC_NAME:'아동 초급',LEC_REG_DT:'2019-01-02',LEC_DEL_YN:'중도해약',LEC_CATEGORY:'어린이수영',LEC_USE_YN:'Y',LEC_ONLINE_YN:'Y',LEC_PLACE:'수영장',LEC_TYPE:'0',TCH_NAME:'0',LEC_WEEK:'화',LEC_START_DT:'2022-01-02',LEC_END_DT:'2022-11-02',LEC_REDUCE_DESC:' ',DLY_START_DT:'2022-03-02',DLY_END_DT:'2022-04-02',DLY_DESC:' ',LEC_REMAIN_CNT:'0',LEC_FREE_CNT:'0',LEC_USE_STATUS:'종료',PROG_SEQ:'20',PROG_NAME:'어린이 수영',PROG_PRICE:'4000',APP_NO:'2',APP_TYPE:'온라인',APP_STATUS:'승인대기',APP_REG_DT:'2022-08-01  17:13:02',APP_CONF_DT:'2022-08-3  17:13:02',APP_DESC:' ',APP_REG_ADMIN_ID:'admin1'},
];
//팝업용 데이터
//---------------------------------
//강사목록-datagrid columns 생성 
//---------------------------------
function createRightInstructorDetail()
{
	if(frmDetail!=null){
		$("#formDetail").dxForm("dispose");
	}
	frmDetail=$('#formDetail').dxForm({
		showColonAfterLabel: false,
	    items:createItemsDetailForm(),
	    customizeItem: function(item) {  
	    	var editItems = ["OPEN_GBN"];
	    	if (editItems.indexOf(item.dataField) !== -1) { 
	    		return;
	    	}
	    	if(!item.editorOptions) {  
	            item.editorOptions = {};  
	        }  
	        item.editorOptions.readOnly = true;
	    }
	   
	   
	}).dxForm('instance');
}
//view(오른쪽) Detail
function createItemsDetailForm(){
	var resultItems = {};
	
	resultItems= [
		{
			itemType: 'group',
			cssClass: 'first-group',
			colCount: 4,
			items: [
				{ label:{visible:false},
				  dataField: "IMAGE_PATH",  
		          template: function(data, itemElement) {
		        	  var imgsrc  =  data.editorOptions.value;
		              //console.log(imgsrc);
		              if(!imgsrc){
		            	  imgsrc = '/fmcs/images/profile.png';
		              }
		        	  var userProfileUnregTemplate = `
		        			<div class="user-profile">
		        				<div class="profile-image">
		        					<img src="${imgsrc}">
		        				</div>
		        			</div>`;
		              itemElement.append(userProfileUnregTemplate);		        	  
		            }  
				},
				{itemType: 'group',colSpan: 3,
					items: [
						{itemType: 'group',colCount: 2,
							items: [
								{itemType: 'group',
									items: [
										{dataField: 'KOR_NAME',label: {text: '강사명',},}, 
										{dataField: 'GENDER',label: { text: '성별',},editorType: 'dxSelectBox',
											editorOptions: {  
	    					  					  dataSource:SM_GENDER_GBN,
	    							        	  valueExpr: 'value', 
	    							        	  displayExpr: 'text',
	    							        	},
										},
										{dataField: 'OPEN_GBN',label: {text: '온라인공개여부', },editorType: 'dxSelectBox',
											editorOptions: {  
												elementAttr: {class: "view"},
	    			    					  	dataSource:online_gbn,
	    			    						valueExpr: 'value', 
	    			    						displayExpr: 'text',
	    			    						}
										},
									]
								},
								{itemType: 'group',
									items: [
										{dataField: 'HP_NO',editorOptions: {width: '100%',},label: {text: '휴대전화',},},
										{dataField: 'EMP_CARDNO',label: {text: '회원카드', }},
									],
								},
								{colSpan: 2,dataField: 'CLASS_LST',label: { text: '담당종목',},editorType: 'dxTagBox',
									editorOptions: 
									{
										dataSource: class_gbn,
										openOnFieldClick: true,
										searchEnabled: false,
		    		  				 	showSelectionControls: true,
		    		  				    maxDisplayedTags: 6,
		    		  				    displayExpr: 'text',
		    		  				    valueExpr: 'value',
		    		  				    onMultiTagPreparing(args) {
		    		  				    	const selectedItemsLength = args.selectedItems.length;
		    		  				    	const totalCount = 6;
		    		  				    	if (selectedItemsLength < totalCount) {
		    		  				    		args.cancel = true;
		    		  				    	} else {
		    		  				    		args.text =  `모두 선택 (${selectedItemsLength})`;
		    		  				    	}
		    		  				    },
		    		  				    elementAttr: {
					    	   				class: "tagboxclose"
					    	   			},
									}
								},
								{colSpan: 2,dataField:'INFORM',label: { text: '강사소개',},
									editorType: 'dxTextArea',
									editorOptions: { height: 380, inputAttr: {id:'inform_view',class: "txtEditor"},},
								}, 
								{colSpan: 2,dataField:'REMARK',label: { text: '비고',},editorType: 'dxTextArea',editorOptions: { height: 100},},
								/*{colSpan: 2,editorType: 'dxButton',editorOptions: {icon:'refresh',
	                			type: 'default',
	                			onClick() {
	                				var authgbn=frmDetail.itemOption("authgbn");
	                				AuthChange(frmDetail,authgbn.editorOptions.value);
	    						}},}*/
							],
						}			       		      
					],
				}
			],
		},
	];
	//mask:[{'000-0000-0000'},{'000-0000-0000'}], maskInvalidMessage: "The input value does not match the mask"
	 
	return resultItems;
}
//등록/수정 팝업
function createItemsDetailPopup()
{
	
	var resultItems = {};
	
	resultItems= [
		{
			itemType: 'group',
			cssClass: 'first-group',
			colCount: 4,
			items: [
				{label:{visible:false},
					  dataField: "IMAGE_PATH",  
			          template: function(data, itemElement) {
			        	  var imgsrc  =  data.editorOptions.value;
			              console.log(imgsrc);
			              if(!imgsrc){
			            	  imgsrc = '/fmcs/images/profile.png';
			              }
			        	  var userTemplate = `
			        			<div class="user-profile">
									<div class="profile-close">
										<div class="cst-small-button dx-button dx-button-normal dx-button-mode-contained">
											<div class="dx-button-content"><i class="dx-icon dx-icon-close"></i></div>
										</div>
									</div>
									<div class="profile-image">
										<img src="/fmcs/images/profile.png">
									</div>
									<div class="profile-camera" id='cameraBtn'></div>	
								</div>`;
			              itemElement.append(userTemplate);		        	  
			            }
				},
				{itemType: 'group',colSpan: 3,
					items: [
						{itemType: 'group',colCount: 2,
							items: [
								{itemType: 'group',
									items: [
										{dataField: 'KOR_NAME',label: {text: '강사명',},
											editorType:'dxTextBox',
											editorOptions: {
												elementAttr:{id:'INSTR_USER_NAME'},
												buttons: [{
													name: 'srchMember',
													location: 'after',
													options: {
														text: '회원검색',
														type: 'default',
														onClick(e) {
															var userName = $('#INSTR_USER_NAME').dxTextBox("instance").option("value"); // or via elementAttr 
															createUserSearchPopup("#searchMemberPopup",{USER_NAME: userName}, function(data) {
																if (data ) {
																	console.log(data)
																	var instanceUserName = $('#INSTR_USER_NAME').dxTextBox("instance"); // or via elementAttr 
														          	instanceUserName.option("value", data.USER_NAME);
														          	$('#INSTR_CARDNO').dxTextBox("instance").option("value", data.CARD_NO); // or via elementAttr 
														          	$('#INSTR_HP_NO').dxTextBox("instance").option("value", data.USER_HP); // or via elementAttr
														          	$('#INSTR_GENDER').dxSelectBox("instance").option("value", data.USER_GENDER=='남'?'0':'1'); // or via elementAttr
														          	
														          	/*gridInstructor.cellValue(selectedRowIndex, "KOR_NAME", data.USER_SEQ);
														          	gridInstructor.cellValue(selectedRowIndex, "GENDER", data.USER_GENDER);
														          	gridInstructor.cellValue(selectedRowIndex, "HP_NO", data.USER_HP);
														          	gridInstructor.cellValue(selectedRowIndex, "CARD_NO", data.CARD_NO);*/
																	//visible false이면 option value값이 셋팅이 안됨.
																}
													 		});
															
														},
													},
												}],
											},
											validationRules: [{
									        	type: 'required',
									        	message: '강사명 필수',
									    	}],
									    }, 
	    			    	  			{dataField: 'GENDER',label: { text: '성별',},editorType: 'dxSelectBox',
											editorOptions: {
												elementAttr:{id:'INSTR_GENDER'},
												dataSource:SM_GENDER_GBN,
	    							        	valueExpr: 'value', 
	    							        	displayExpr: 'text',
	    							        },
	    			    	  			},
	    			    	  			{dataField: 'OPEN_GBN',label: {text: '온라인공개여부', },editorType: 'dxSelectBox',
	    			    	  				editorOptions: {  
	    			    	  					dataSource:online_gbn,
	    			    						valueExpr: 'value', 
	    			    						displayExpr: 'text',
	    			    					}
	    			    				},
	    			    	  		]
	    			      	},
	    			      	{
	    			      		itemType: 'group',
	    			      		items: [
	    			      			{dataField: 'HP_NO',editorOptions: {width: '100%',},label: {text: '휴대전화',},
	    			      				editorType:'dxTextBox',
	    			      				editorOptions: {
											elementAttr:{id:'INSTR_HP_NO'},
	    			      				}
	    			      			},
	    			      			{dataField: 'EMP_CARDNO',label: {text: '회원카드', },
	    			      				editorType:'dxTextBox',
	    			      				editorOptions: {
	    			      					elementAttr:{id:'INSTR_CARDNO'},
	    			      				}
	    			      			},
	    			      		],
	    			      	},
	    			      	{colSpan: 2,dataField: 'CLASS_LST',label: { text: '담당종목',},editorType: 'dxTagBox',
	    			      		editorOptions: 
		    		  			{
	    			      			dataSource: class_gbn,
	    			      			openOnFieldClick: true,
	    			      			searchEnabled: false,
		    		  				showSelectionControls: true,
		    		  				showClearButton:true,
				                    showDropDownButton:true,
		    		  				maxDisplayedTags:8,
		    		  				displayExpr: 'text',
		    		  				valueExpr: 'value',
		    		  				onMultiTagPreparing(args) {
		    		  					const selectedItemsLength = args.selectedItems.length;
		    		  					const totalCount = class_gbn.length;
	
		    		  					if (selectedItemsLength < totalCount) {
		    		  						args.cancel = true;
		    		  				    } else {
		    		  				        args.text = `모두 선택 (${selectedItemsLength})`;
		    		  				    }
		    		  				},
		    		  			}
	    		        	},
	    			      	{colSpan: 2,dataField:'INFORM',label: { text: '강사소개',},}, 
	    			      	{colSpan: 2,dataField:'REMARK',label: { text: '비고',},editorType: 'dxTextArea',editorOptions: { height: 100},},
	    		        	/*{colSpan: 2,editorType: 'dxButton',editorOptions: {icon:'refresh',
	                			type: 'default',
	                			onClick() {
	                				var authgbn=frmDetail.itemOption("authgbn");
	                				AuthChange(frmDetail,authgbn.editorOptions.value);
	    						}},}*/
	    		        	
	    			      	],
						}			       		      
					],
				}
			],
		},
	];
 
	return resultItems;
}
