<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<script>window.jQuery || document.write(decodeURIComponent('%3Cscript src="js/jquery.min.js"%3E%3C/script%3E'))</script>
<link rel="stylesheet" href="/fmcs/css/fmcs_enterTk.css">

<script src="/fmcs/js/enterTicket/enterTicket.js"></script><!-- 전체적인 js -->
<script src="/fmcs/js/enterTicket/dataSource.js"></script><!-- 가공데이터 -->
<script src="/fmcs/js/enterTicket/popup/editForm.js"></script><!-- 팝업 js -->
<script src="/fmcs/js/enterTicket/condition.js"></script><!-- 검색조건 js -->
<script src="/backOffice/ckeditor/ckeditor.js"></script>
<script>

$(document).ready(function () {
	formInit();
	
	const searchBox2 = $('#searchBox2').dxSelectBox({
		dataSource: reserveTicket,
		displayExpr: 'edcRsvnNo',
		searchEnabled: true,
		searchExpr: 'edcRsvnNo',
		searchTimeout:1000,
		valueExpr: 'id',
		searchMode:'startswith',
		placeholder:'예약번호를 입력하세요.',
		noDataText:'예약정보가 없습니다.',
		itemTemplate(data) {
			dataHtml = "";
			dataHtml += "<div class='custom-item' style='display:-webkit-inline-box;width:inherit;'>";
			dataHtml += 	"<span class='product-name' style='padding-left:5px;font-weight:bold;'>예약번호 "+data.edcRsvnNo;
			if(data.ticketStatus == "1002"){
				dataHtml += "(<font color='red'>발권완료 "+data.ticketTime+"</font>)";
			}
			dataHtml += 	"</span>";
			dataHtml += 	"<span style='margin-right:50px;font-weight:bold;'>"+data.memNm+"</span><br/>";
			dataHtml += 	"<span class='product-name'style='padding-left:5px;'>"+data.edcRsvnNm+" : "+data.edcReqTime+"</span>";
			dataHtml += 	"<span style='margin-right:50px;font-weight:bold;'>"+data.edcReqSdate+"</span>";
			dataHtml += "</div>";
			
			return dataHtml;
		},
		buttons: [{
			location: 'after',
			name: 'btn_enter',
			options: {
				icon: '/fmcs/images/ico_list.png',
				elementAttr: {
					class: "btnBorder"
				},				
				onClick() {
					DevExpress.ui.notify('상세검색창');
					if (!$("#detailSeachDiv").is(":visible")) { 
						$("#detailSeachDiv").show(); //display :none 일떄
					} else {
						$("#detailSeachDiv").hide();  //display :block 일떄
					}
				},
			},
		}, {
			location: 'after',
			name: 'btn_qrcode',
			options: {
				icon: '/fmcs/images/ico_qrcode.png',
				elementAttr: {
					class: "btnBorder"
				},				
				onClick() {
					DevExpress.ui.notify('qr코드');
					createOther(2);	
				},
			},
		}, 'dropDown', {
			location: 'after',
			name: 'btn_refresh',
			options: {
				icon: 'clear',
				elementAttr: {
					class: "btnRefresh"
				},				
				type: 'default',
				onClick() {
					DevExpress.ui.notify('초기화');
					searchBox2.option("value","");
					$("#searchResult2").css("display","none");
					$("#searchDefault2").css("display","");
				},
			},
		},],	
		onValueChanged(data) {
			
			if(data.event != null && "undefined" != data.event){
		 		const resultData = reserveTicket[data.value-1];
				for(var i in resultData ){
					if("undefined" != form2.getEditor(i) && form2.getEditor(i) != null){
						form2.getEditor(i).option("value",resultData[i]);
					}
				}
		 		form2.getEditor("memNm").option("value",resultData.memNm+"("+resultData.hpNo+")");
		 		form2.getEditor("appTurn").option("value",resultData.appTurn+"회차 : "+resultData.appStartTime+" - "+resultData.appEndTime);
		 		form2.getEditor("totalAmount").option("value",Number(resultData.totalAmount).toLocaleString()+"원");

		 		
		 		if("결제대기" == resultData.payStatus){
			 		form2.itemOption("twoForm.payBtn","visible",true);
			 		$("#form2").css("background-color","#D1E0FF");
			 		form2.itemOption("oneForm.edcRsvnNo","cssClass","");
			 		form2.itemOption("twoForm.print_ico","visible",false);
		 		} else {
			 		form2.itemOption("twoForm.payBtn","visible",false);
			 		form2.itemOption("oneForm.edcRsvnNo","cssClass","text-decoration");
			 		//console.log(form2.getEditor("edcRsvnNo").option("cssClass"));
			 		form2.getEditor("edcRsvnNo").option("value",form2.getEditor("edcRsvnNo").option("value")+"(발권완료)");
			 		$("#form2").css("background-color","#FFDEDA");
			 		form2.itemOption("twoForm.print_ico","visible",true);
		 		}
		 		$("#searchResult2").css("display","");
		 		$("#searchDefault2").css("display","none");
			}
		},
	}).dxSelectBox('instance');
	
	const addRecv_gbn=[{text:'예약일자',value:'0'},{text:'이용일자',value:'1'}];
	
	$('#detailSeach').dxForm({
		formData: products,
		items: [{
		    itemType: 'group',
		    cssClass: 'first-group',
		    colCount: 7,
		    items: [{
		        	dataField: 'state',
		        	label: {visible:false},
		            editorType: 'dxSelectBox',
		            editorOptions: {
		            	width: '100%',
		            	dataSource: addRecv_gbn,
						valueExpr: 'value', 
						displayExpr: 'text',
						value:'0',
		            },
		            elementAttr: {
		    			class: "detailOption"
		    		},
		        },{
			        itemType: 'group',
			        colSpan:2,
			        items: [{
			        	dataField: 'birthDate',label: {visible:false},
			            editorType: 'dxDateBox',
			            editorOptions: {
			                width: '100%',
			                displayFormat: 'yyyy-MM-dd',
			                showClearButton: true,
			                useMaskBehavior:true,
			            },
			            elementAttr: {
			    			class: "detailOption"
			    		},
			        }],
			    },{
			        itemType: 'group',
			        colSpan: 3,
			        items: [{
			        	dataField: 'searchCondition',label: {text: '예약자명',},
			        },],
				},{
			        itemType: 'group',
			        cssClass: 'detailGroupBtn',
			        items: [{
			        	editorType:'dxButton',
			        	editorOptions: {
			        		stylingMode: 'contained',
			        		icon: 'find',
			        		type: 'default',
			        		elementAttr: {
			        			class: "btnRefresh"
			        		},
			        		onClick() {
			        			DevExpress.ui.notify('상세조회');
			        		},
			            },
			        },{
			        	editorType:'dxButton',
			        	editorOptions: {
			        		stylingMode: 'contained',
			        		icon: 'clear',
			        		type: 'default',
			        		elementAttr: {
			        			class: "btnRefresh"
			        		},
			        		onClick() {
			        			DevExpress.ui.notify('초기화');
			        		},
			            },
			        },],
			}],
		}],
	});
	
	
	$('#tab2BtnRefresh').dxButton({
		stylingMode: 'contained',
		icon: 'clear',
		type: 'default',
		elementAttr: {
			class: "btnRefresh"
		},
		onClick() {
			DevExpress.ui.notify('초기화');
			searchBox2.option("value","");
			$("#searchResult2").css("display","none");
			$("#searchDefault2").css("display","");
		},
	});
	
	const form2 = $('#form2').dxForm({
		readOnly: true,
		formData: reserveTicket,
	    items: [
	    	{
	        itemType: 'group',
	        cssClass: 'first-group',
	        colCount: 3,
	        name:"oneForm",
	        items: [{
	        	itemType: 'group',
	        	colSpan:2,
	            items: [{
	                dataField: 'edcRsvnNo',label: {text: '예약번호',}
	            }, {
	                dataField: 'memNm',label: {text: '예약자명',}
	            }, ],
	        },{
	        	itemType: 'group',
	            items: [{
	            	dataField:'print_ico' ,label: {text: '',visible:false,},template: "<a href='#' style='float:right;margin-right:30px;'><i class='dx-icon-print' style='font-size: 41px'></i><br/>입장권</a>",
	            }, ],
	        }],
	    },{
	        itemType: 'group',
	        colCount: 3,
	        cssClass:'display_block',
	        name:"twoForm",
	        showColonAfterLabel:false,
	        items: [{
	        	itemType: 'group',
	            items: [{
	                dataField:'regDate',label: {text: '예약일시',},editorType: 'dxTextBox'
	            }, {
	                dataField: 'totalAmount',label: {text: '구매총액',},editorType: 'dxTextBox'
	            }, ],
	        },{
	        	itemType: 'group',
	            items: [{
	                dataField: 'edcRsvnNm',label: {text: '예약상품',},editorType: 'dxTextBox'
	            }, {
	                dataField: 'payStatus',label: {text: '결제상태',},editorType: 'dxTextBox'
	            }, ],
	        },{
	        	itemType: 'group',
	            items: [{
	                dataField: 'appTurn',label: {text: '이용회차',},editorType: 'dxTextBox'
	            }, {
	            	dataField:'payBtn',label: {text: '',visible:false,},editorType:'dxButton',
		        	editorOptions: {
		        		stylingMode: 'contained',
		        		type: 'normal',
		        		text:'결제하기',
		        		elementAttr: {
		        			class: "margin-top border_radius"
		        		},
		        		onClick() {
		        			DevExpress.ui.notify('결제');
		        		},
		            },
		        }, ],
	        }],
	    }],
	}).dxForm("instance");
	const searchBox3 = $('#searchBox3').dxTextBox({
		value: '',
		showClearButton: true,
		width:400,
		placeholder:'차량번호 한글포함 전체입력',
	}).dxTextBox("instance");
	
	$('#automobile').dxButton({
		stylingMode: 'contained',
		icon: '/fmcs/images/ico_automobile.png',
		width:42,
		onClick() {
			DevExpress.ui.notify('차량번호:'+searchBox3.option("value"));
		},
	});
	
	const selectDate3 = [
		{
			id: 0,
			text: '전체',
		},
		{
			id: 1,
			text: '정기회원',
		},
		{
			id: 2,
			text: '일일입장',
		},
	];
	const selectDate4 = [
		{
			id: 0,
			text: '전체',
		},
		{
			id: 1,
			text: '남자',
		},
		{
			id: 2,
			text: '여자',
		},
	];
	const productsDataSource3 = new DevExpress.data.DataSource({
		store: {
			data: selectDate3,
			type: 'array',
			key: 'id',
		},
	});
	const productsDataSource4 = new DevExpress.data.DataSource({
		store: {
			data: selectDate4,
			type: 'array',
			key: 'id',
		},
	});
	const now = new Date();
	const form3 = $('#form3').dxForm({
		formData: reserveTicket,
		showColonAfterLabel:false,
	    items: [{
	        itemType: 'group',
	        cssClass: 'first-group',
	        colCount: 7,
	        items: [{
	        	itemType: 'group',
	            items: [{
	                dataField: 'searchCondition1',label: {text: '입장객구분',},editorType: 'dxSelectBox',
	                editorOptions: {
	                	dataSource:productsDataSource3,
	                	value: selectDate3[0].id,
	                	displayExpr: 'text',
					},
	            }, {
	                dataField: 'searchCondition2',label: {text: '회원번호',}
	            }, ],
	        },{
	        	itemType: 'group',
	            items: [{
	                dataField: 'searchCondition3',label: {text: '성별',},editorType: 'dxSelectBox',
	                editorOptions: {
	                	dataSource:productsDataSource4,
	                	value: selectDate4[0].id,
	                	displayExpr: 'text',
					},
	            }, {
	                dataField: 'searchCondition4',label: {text: '회원명',}
	            }, ],
	        },{
	        	colCount: 2,
	        	itemType: 'group',
	        	colSpan:2,
	            items: [{
	                dataField: 'searchCondition5',label: {text: '운영상품',},editorType: 'dxSelectBox',colSpan:2
	                
	            }, {
	                dataField: 'searchCondition6',label: {text: '입장일자',},editorType: 'dxDateBox',
	                editorOptions:{
	                	displayFormat: 'yyyy-MM-dd',
	                	pickerType: 'rollers',
	                	type:'date',
	                	value: now,
	                	width:170,
	                }
	            },  {
	                dataField: 'searchCondition7',label: {text: '~',},name:'searchCondition7',editorType: 'dxDateBox',
	                
	                editorOptions:{
	                	displayFormat: 'yyyy-MM-dd',
	                	pickerType: 'rollers',
	                	type:'date',
	                	value: now,
	                }
	            },],
	        },{
	        	itemType: 'group',
	        	colSpan:3,
	            items: [{
		        	editorType:'dxButton',
		        	editorOptions: {
		        		stylingMode: 'contained',
		        		text:'검색',
		        		type: 'normal',
		        		width:100,
		        		elementAttr: {
		        			class: "btnRefresh float_right"
		        		},
		        		onClick() {
		        			DevExpress.ui.notify('검색');
		        		},
		            },
		        },
		        {
	            	dataField: 'searchCondition8',label: {text: '입장취소 인원포함',},editorType: 'dxCheckBox',colSpan:2,
					editorOptions: {
						value: false,
					},
				}],
	        }],
	    },],
	}).dxForm("instance");
	
	$('#tab2Btn1').dxButton({
		stylingMode: 'contained',
		type: 'normal',
		text:'퇴장처리',
		elementAttr: {
			class: "btnRefresh"
		},
		onClick() {
			DevExpress.ui.notify('퇴장처리');
		},
	});
	$('#tab2Btn2').dxButton({
		stylingMode: 'contained',
		type: 'normal',
		text:'입장취소',
		elementAttr: {
			class: "btnRefresh"
		},
		onClick() {
			DevExpress.ui.notify('입장취소');
		},
	});
	$('#tab2Btn3').dxButton({
		stylingMode: 'contained',
		type: 'normal',
		text:'차량등록',
		elementAttr: {
			class: "btnRefresh"
		},
		onClick() {
			DevExpress.ui.notify('차량등록');
		},
	});
	$('#tab2Btn4').dxButton({
		stylingMode: 'contained',
		type: 'normal',
		text:'입장권재발행',
		elementAttr: {
			class: "btnRefresh"
		},
		onClick() {
			DevExpress.ui.notify('입장권재발행');
		},
	});
	$('#tab2Btn5').dxButton({
		stylingMode: 'contained',
		type: 'normal',
		icon: 'refresh',
		elementAttr: {
			class: "btnRefresh"
		},
		onClick() {
			DevExpress.ui.notify('새로고침');
		},
	});
	$('#tab2Btn6').dxButton({
		stylingMode: 'contained',
		type: 'normal',
		icon: '/fmcs/images/ico_export.png',
		elementAttr: {
			class: "btnRefresh"
		},
		onClick() {
			DevExpress.ui.notify('보내기');
		},
	});
	function setColumnAlignment(columnList) {
		columnList.forEach(function(column) {
			if (column.alignment) {
			} else if (column.dataType && column.dataType === "number") {
				column.alignment = "right";
				if (!column.format) {
					column.format= def_numberFormat;
				}
			} else if (column.width && column.width < 200) {
				column.alignment = "center";
			}
		});
		
		return columnList;
	}
	function getColumnList() {
		var resultColumn = {};
		var tmpl = `<div class='lec_status-button' style="color:<@=color@>;background-color:<@=background@>;border: 1px solid #999;"><@=value@></div>`;
		
		resultColumn = [{
			dataField: 'LEC_SEQ',
			visible: false,
			caption: '강좌번호',
		}, {
			dataField: 'CANCEL_BTN',
			fixed: true,
			caption: '',	
			width: 100,
			cellTemplate: function(element, cellInfo) {
				element.append(_.template(tmpl)({value:"전자키재발권", color: "black",background: "#fff"}));
				
				element.on("click", function() {
					DevExpress.ui.notify('전자키재발권');
					electOther(cellInfo);
				});
			},
		}, {
			dataField: 'ENTER_NO',
			width: 140,
			caption: '입장번호',
		}, {
			dataField: 'ENTER_TYPE',
			width: 90,
			caption: '입장객구분',	
		}, {
			dataField: 'LEC_NAME',
			width: 150,
			caption: '강좌(상품)명',			
		}, {
			dataField: 'ENTER_TIME',
			width: 160,
			caption: '입장시간',			
		}, {			
			dataField: 'WALK_OUT_TIME',
			width: 160,
			caption: '퇴장시간',
		}, {
			dataField: 'LOCK_NO',
			width: 80,
			caption: '키번호',
		}, {
			dataField: 'USER_GENDER',
			width: 80,
			caption: '성별',
		}, {
			dataField: '',
			width: 80,
			caption: '연령구분',
		}, {
			dataField: 'USER_HP',
			width: 120,
			caption: '핸드폰번호',
		}, {		
			dataField: 'USER_CAR_NO',
			width: 80,
			caption: '차량번호',	
		}, {		
			dataField: 'USER_NAME',
			width: 80,
			caption: '이름',	
		}, {		
			dataField: 'APP_REG_ADMIN_ID',
			width: 80,
			caption: '접수자',	
		}, {		
			dataField: 'APP_REG_DT',
			width: 160,
			caption: '접수시간',	
		}, {		
			dataField: 'APP_CONF_DT',
			width: 160,
			caption: '입장취소시간',	
		} ];
		
		resultColumn = setColumnAlignment(resultColumn);
		return resultColumn;
	}	
	var columnlist = getColumnList();
	
	var lectureList = lecListJoin.filter(function(item1, idx1) {
		return lecListJoin.findIndex(function(item2, idx2) {
			return item1.USER_NO == item2.USER_NO;
		}) == idx1;
	});
	$('.gridContainer').dxDataGrid({
		dataSource: lectureList,
		keyExpr: "USER_NO",
		allowColumnReordering: true,
		allowColumnResizing: true,
		showBorders: true,
		showRowLines: true,
		//columnFixing: {enabled: true},
		loadPanel: {enabled: false},
		scrolling: {mode: "infinite"},
		//export: {enabled: true},
		//columnChooser: {enabled: true},
		columns: columnlist,
		focusedRowEnabled: true,
	    selection: {mode: 'multiple',showCheckBoxesMode:'always'},	
		paging: {
			pageSize: 15,
		},
		pager: {
			visible: true,
		    showInfo: true,
		    infoText: "총 {2}건   {0}/{1}",
		    showNavigationButtons: true,
		},
		summary: {
			texts:{sum:"{0}"},
			totalItems: [{
				name:"customSummarty1",
				showInColumn: 'APP_REG_DT',
				displayFormat: '퇴장인원수: {0}',
				summaryType: 'custom',
				cssClass:'grid_width'
			},{
				name:"customSummarty2",
				showInColumn: 'APP_REG_ADMIN_ID',
				displayFormat: '입장인원수: {0}',
				
				summaryType: 'custom',
				cssClass:'grid_width'
			},{
				name:"customSummarty3",
				showInColumn: 'USER_NAME',
				displayFormat: '일일입장: {0}',
				summaryType: 'custom',
				cssClass:'grid_width'
			},{
				name:"customSummarty4",
				showInColumn: 'USER_CAR_NO',
				displayFormat: '정기회원: {0}',
				summaryType: 'custom',
				cssClass:'grid_width'
			},{
				name:"customSummarty5",
				showInColumn: 'USER_HP',
				displayFormat: '입장권발행수: {0}',
				summaryType: 'custom',
				cssClass:'grid_width'
			}],
			calculateCustomSummary: function(options) {
				
				if(options.name =="customSummarty1"){
					if (options.summaryProcess === 'start') {
						options.totalValue = 0;
					}
					if (options.summaryProcess === 'calculate') {
						if(options.value.USER_NAME ==="홍길동"){
							options.totalValue ++
						}
					}
				} else if (options.name =="customSummarty2"){
					if (options.summaryProcess === 'start') {
						options.totalValue = 0;
					}
					if (options.summaryProcess === 'calculate') {
						if(options.value.USER_BIRTH_TYPE ==="양력"){
							options.totalValue ++
						}
					}
				} else if (options.name =="customSummarty3"){
					if (options.summaryProcess === 'start') {
						options.totalValue = 0;
					}
					if (options.summaryProcess === 'calculate') {
						if(options.value.USER_GENDER ==="남"){
							options.totalValue ++
						}
					}
				} else if (options.name =="customSummarty4"){
					if (options.summaryProcess === 'start') {
						options.totalValue = 0;
					}
					if (options.summaryProcess === 'calculate') {
						if(options.value.ENTER_TYPE ==="일일입장권"){
							options.totalValue ++
						}
					}
				} else if (options.name =="customSummarty5"){
					if (options.summaryProcess === 'start') {
						options.totalValue = 0;
					}
					if (options.summaryProcess === 'calculate') {
						if(options.value.ENTER_TYPE ==="정기회원"){
							options.totalValue ++
						}
					}
				}
			},
		},
	});
	//console.log($('span:contains("~")'))
});

function electOther(obj){
	
	const appReason=[{text:'키고장',value:'0'},{text:'기타입력',value:'1'}]
	
	if(electPopup){
		electPopup=null;
		$("#elect_popup").dxPopup("dispose");
	}
	
	electPopup=$("#elect_popup").dxPopup({
		contentTemplate: electContentTemplate,
		title: '전자키재발권',
		container: '#total',
		showTitle: true,
		width:900,
		height:660,
		dragEnabled: true,
	    hideOnOutsideClick: false,				//팝업창 외 클릭 시 팝업창 꺼짐여부
	    showCloseButton: true,
		visible: true,
		position: {
			my: 'center',
		    at: 'center',
		    of: window
		},
		 onShown(){
			$('#auto-on').dxSwitch({
				value: true,
				switchedOffText:"OFF",
				switchedOnText:"ON",
				width:70,
			});
			$('#elect_form').dxForm({
				formData: obj.data,
				showColonAfterLabel:false,
				items: [{
				    itemType: 'group',
				    cssClass: 'first-group',
				    colCount: 1,
				    items: [{
				        	dataField: 'LEC_PLACE',
							label: {text: '이용장소',},
							editorOptions: {
								width:180,
								readOnly: true,
							},
				        },{
				        	dataField: 'LOCK_DANGUBUN',
							label: {text: '단구분',},
							editorOptions: {
								width:180,
								readOnly: true,
							},
				        },{
				        	dataField: 'app_time',
							label: {text: '배정시간',},
							editorOptions: {
								width:180,
								readOnly: true,
							},
				        },{
				        	dataField: 'app_reason',
				        	label: {text: '재발권사유',},
				            editorType: 'dxSelectBox',
				            cssClass:'margin_top',
				            editorOptions: {
				            	width: 180,
					            dataSource: appReason,
								valueExpr: 'value', 
								displayExpr: 'text',
								value:'0',
				            },
				        }],
				}],
			});
			
			$('#elect_form2').dxForm({
				formData: obj.data,
				showColonAfterLabel:false,
				items: [{
				    itemType: 'group',
				    cssClass: 'first-group',
				    colCount: 2,
				    items: [{
				        	dataField: 'LEC_PLACE',
							label: {text: '이용장소',},
							editorOptions: {
								width:180,
								readOnly: true,
							},
				        },{
				        	dataField: 'LOCK_DANGUBUN',
							label: {text: '단구분',},
							editorOptions: {
								width:120,
								readOnly: true,
							},
				        },{
				        	dataField: 'app_time',
							label: {text: '배정시간',},
							editorType:'dxDateBox',
							cssClass:"display_inherit",
							editorOptions: {
								width:110,
								pickerType:'rollers',
								placeholder:'Hour',
								type: 'time',
								displayFormat: 'HH',
							},
				        },{
				        	dataField: 'app_time2',
							label: {text: ':',},
							editorType:'dxDateBox',
							cssClass:"display_inherit",
							editorOptions: {
								width:100,
								pickerType:'rollers',
								placeholder:'Minute',
								type: 'time',
								displayFormat: 'mm',
							},
				        }],
				}],
			});
		  },
		  toolbarItems: [{
			  widget: 'dxButton',
		      toolbar: 'bottom',
		      location: 'after',
		      options: {
		    	  text: '저장',
		    	  onClick() {
		    		  const message = '저장';
		    		  DevExpress.ui.notify({
		    			  message,
		    			  position: {
		    				  my: 'center top',
		    				  at: 'center top',
		    			  },
		    		  }, 'success', 3000);
		    		  electPopup.hide();
		    	  },
		      },
		  }, {
			  widget: 'dxButton',
		      toolbar: 'bottom',
		      location: 'after',
		      options: {
		    	  text: '취소',
		    	  onClick() {
		    		  electPopup.hide();
		    	  },
		      },
		  }],
	}).dxPopup('instance');
	$("#electTitle").html(obj.data.LEC_NAME);
	$("#oldLockNo").html(obj.data.LOCK_NO);
}
</script>

<div id="othercenter_popup"></div>
<div id="elect_popup"></div>
<div class="row row_title">
	<div class="col-12" style="height:30px;background:#022B70;height:48px;">
		<ul class="navbar-nav" style="color:white;flex-direction: row;display: flex;box-sizing: border-box;margin-top: 4px;">
 			<li class="nav-item d-sm-inline-block quick-nav" style="color:white;width:280px;font-size:1.1rem;">
		        입장발권관리
		    </li>
		</ul>	
	</div>
</div>

<div class="row">
 	<div class="col-12 padding-lr-0" >
		<div id="total" class="shadow_box">
		
			<!-- 입장발권관리/입장객현황 Tab -->
			<div id="mainTabs" style="border-bottom:1px solid #A74347;">
				<div class="tabs-container" style="display:inline-table;width:50%;margin-bottom: -1px;"></div>
				<div id="setting" style="float:right;display:flex;">
					<a href="#" class="nav-link">
						<i class="nav-icon fas fa-cog"></i>
					</a>
				</div>
			</div>
			
			<div id="mainTabs_sub">
				<div class="tabs-container custom-tab">
				    <div class="div-btn">
                       	<button class="btn selected-tab"><i class="dx-icon dx-icon-card"></i> 정기회원입장(단축키)</button>
                       </div>
                       <div class="div-btn">
                       	<button class="btn"><i class="dx-icon dx-icon-event"></i> 예약티켓발권(단축키)</button>
                    </div>
				</div>
				<div style="float:right;display:flex;">
					<div class="dx-field" style="display:flex;">
						<i class="dx-icon-help" style="font-size: 25px;padding-top: 6px;"></i>
						<div class="dx-field-label">회원카드 읽기모드</div>
						<div class="dx-field-value">
							<div id="first-on"></div>
						</div>
					</div>
					<div class="dx-field" style="display:flex;">
						<div class="dx-field-label">입장권출력</div>
						<div class="dx-field-value">
							<div id="second-on"></div>
						</div>
					</div>
					<div class="dx-field" style="display:flex;">
						<div class="dx-field-label">자동입장</div>
						<div class="dx-field-value">
							<div id="third-on"></div>
						</div>
					</div>
				</div>
				<!-- 정기회원입장(단축키) [id=tab1] / 예약티켓발권(단축키) Tab [id=tab2] -->
				<div id="tab1" style="width:100%">
			 		<div id="leftArea" style="width: 50%;float:left;">
			 		
			 			<div class="dx-field-value" style="width:100%;">
			 				<div id="searchBox"></div>
			 			</div>
						
						<div id="searchDefault">
						
							<div style="text-align: center;padding-top: 100px;">
								<img src="/fmcs/images/ico_identity.png" width="200px"><br/><br/>
								<font color="#A6A6A6">정기입장 회원을 검색하세요.</font>
							</div>
							
						</div>
						
						<div id="searchResult" style="display:none;">
						
							<div id="formDetail" class="shadow_box" style="height: 35vh;margin-top:60px;">
								<div class="dx-fieldset-header" id="profileNm" style="margin:5px 10px 10px 20px;float: left;">홍길동(성별)</div>
								<div class="form-group buttons">
									<div class="btn-group" id="memDetailBtn"></div>
								</div>
								<div id="form"></div>
							</div>
							<div style="margin:15px 0px 0px 30px;">
								<i class="dx-icon-product" style="font-size: 25px;margin-top: 8px;float: left;"></i>
								
								<div class="dx-field-label">이용중인 강좌</div>
								
								<div class="dx-field-value" style="margin-top:5px;float:left;font-size: 20px;width:15px;">
									<div id="lectureUse"></div>
								</div>
								
								<i class="dx-icon-product" style="font-size: 25px;margin-top: 8px;margin-left:40px;float: left;"></i>
								
								<div class="dx-field-label">재등록대상강좌</div>
								
								<div class="dx-field-value" style="margin-top:5px;float:left;font-size: 20px;width:15px;">
									<div id="lectureReRegist"></div>
								</div>
								
								<div class="form-group buttons">
									<div class="btn-group" id="lectureDetailBtn" style="margin-top: 5px;margin-left: 20px;"></div>
								</div>
							</div>
							
							<h5 style="margin-top:30px;">이용 사물함정보</h5>
							
							<div id="useLockerInfo" class="shadow_box" style="max-height: 100px;overflow-y: auto;"></div>
							
							<h5 style="margin-top:30px;">비고사항</h5>
							
							<div id="memo" class="shadow_box" style="max-height: 100px;overflow-y: auto;"></div>
						</div>
			 		</div>
			 		<div id="rightArea" style="margin-left:50%">
			 			<div class="shadow_box subArea">
			 				<div style="max-height: 74vh;overflow-y: auto;height: inherit;">
				 				<div class="shadow_box subShadow">
				 					<div style="display:inline-table;">
				 						<span class="check-box"></span>
					 					<span class="rightAreaSpan">성인수영 (월, 수, 금) 22.12.01 - 22.12.30</span><br/>
					 					<span class="rightAreaSpan2">06:00 ~ 06:50</span>
				 					</div>
									<div class="normal-01"></div>
				 				</div>
				 				<div class="shadow_box subShadow">
				 					<div style="display:inline-table;">
				 						<span class="check-box"></span>
					 					<span class="rightAreaSpan">자유수영 (월, 수, 금) 22.12.01 - 22.12.30</span><br/>
					 					<span class="rightAreaSpan2">06:00 ~ 06:50</span>
				 					</div>
									<div class="normal-02"></div>
									<div style="float: right;margin-right: 15px;margin-top: 15px;">
				 						<a href="#">
				 							<i class="dx-icon-print" style="font-size: 41px"></i><br/>입장권
				 						</a>
				 					</div>
				 				</div>
				 			</div>
			 			</div>
			 			<div>
			 				<div class="normal-03"></div>
			 				<div class="bottom_area">
								전자키발권<div id="elect_selectBox"></div>
			 				</div>
		 				</div>
			 		</div><!-- rightArea -->
				</div><!-- tab1 -->
				
				<div id="tab2" style="display:none;height: 85vh;width:100%"">
			 		<div id="leftArea2" style="float:left;width: 50%;">
			 			
			 			<div class="dx-field-value" style="width:100%;">
			 				<div id="searchBox2"></div>
			 				
							<div class="shadow_box" id="detailSeachDiv" style="position:absolute;height: 45px;width:50%;padding: 5px;display:none;">
								<div id="detailSeach"></div>
							</div> 			 				
			 			</div>
						
		 				<div id="searchDefault2">
							<div style="text-align: center;padding-top: 100px;">
								<img src="/fmcs/images/ico_ticket.png" width="200px"><br/><br/>
								<font color="#A6A6A6">예약바코드 스캔 또는 예약번호를 입력하세요.</font>
							</div>
						</div>
						<div id="searchResult2" style="display:none;">
						
							<div id="form2" class="shadow_box" style="height: 35vh;margin-top:60px;"></div>
							<div style="margin-top: 50px;">
								<span>주차정산을 위한 차량번호를 입력하세요</span><br>
								<div class="dx-field-value" style="margin-top:5px;">
			 						<div id="searchBox3"></div>
			 					</div>
			 					<div class="buttons" style="margin-top:5px;">
									<div class="btn-group" id="automobile"></div>
								</div>
							</div>
						</div>
			 		</div>
			 		<div id="rightArea2" style="margin-left:50%;">
			 			<div class="shadow_box subArea">
			 				<div style="max-height: 71vh;overflow-y: auto;height: inherit;">
				 				<div class="shadow_box subShadow2">
				 					<div style="display:inline-table;">
					 					<span class="rightAreaSpan3">일일수영</span><br/>
					 					<span class="rightAreaSpan4">개인/성인/남자</span>
				 					</div>
				 					<div style="display:inline-table;float: right;">
				 						<div class="margin-bottom">
				 							<span class="rightAreaSpan5">구매수량:</span>
				 							<span class="rightAreaSpan6">1매</span><br>
				 						</div>
				 						<div class="margin-bottom">
				 							<span class="rightAreaSpan5">감면적용:</span>
				 							<span class="rightAreaSpan6">국가유공자(30%) <font color="red">-1,500</font></span><br>
				 						</div>
				 						<span class="rightAreaSpan5">구매금액:</span>
				 						<span class="rightAreaSpan6">3,000</span>
				 					</div>
				 				</div>
				 				<div class="shadow_box subShadow2">
				 					<div style="display:inline-table;">
					 					<span class="rightAreaSpan3">일일수영</span><br/>
					 					<span class="rightAreaSpan4">개인/성인/청소년</span>
				 					</div>
				 					<div style="display:inline-table;float: right;">
				 						<div class="margin-bottom">
				 							<span class="rightAreaSpan5">구매수량:</span>
				 							<span class="rightAreaSpan6">1매</span><br>
				 						</div>
				 						<div class="margin-bottom">
				 							<span class="rightAreaSpan5">감면적용:</span>
				 							<span class="rightAreaSpan6">국가유공자(30%) <font color="red">-1,500</font></span><br>
				 						</div>
				 						<span class="rightAreaSpan5">구매금액:</span>
				 						<span class="rightAreaSpan6">3,000</span>
				 					</div>
				 				</div>
				 				<div class="shadow_box subShadow2">
				 					<div style="display:inline-table;">
					 					<span class="rightAreaSpan3">일일수영</span><br/>
					 					<span class="rightAreaSpan4">개인/성인/청소년</span>
				 					</div>
				 					<div style="display:inline-table;float: right;">
				 						<div class="margin-bottom">
				 							<span class="rightAreaSpan5">구매수량:</span>
				 							<span class="rightAreaSpan6">1매</span><br>
				 						</div>
				 						<div class="margin-bottom">
				 							<span class="rightAreaSpan5">감면적용:</span>
				 							<span class="rightAreaSpan6">국가유공자(30%) <font color="red">-1,500</font></span><br>
				 						</div>
				 						<span class="rightAreaSpan5">구매금액:</span>
				 						<span class="rightAreaSpan6">3,000</span>
				 					</div>
				 				</div>
				 				<div class="shadow_box subShadow2">
				 					<div style="display:inline-table;">
					 					<span class="rightAreaSpan3">일일수영</span><br/>
					 					<span class="rightAreaSpan4">개인/성인/청소년</span>
				 					</div>
				 					<div style="display:inline-table;float: right;">
				 						<div class="margin-bottom">
				 							<span class="rightAreaSpan5">구매수량:</span>
				 							<span class="rightAreaSpan6">1매</span><br>
				 						</div>
				 						<div class="margin-bottom">
				 							<span class="rightAreaSpan5">감면적용:</span>
				 							<span class="rightAreaSpan6">국가유공자(30%) <font color="red">-1,500</font></span><br>
				 						</div>
				 						<span class="rightAreaSpan5">구매금액:</span>
				 						<span class="rightAreaSpan6">3,000</span>
				 					</div>
				 				</div>
				 			</div>
			 			</div>
			 			<div style="bottom: 15px;position: fixed;right: 30px;">
			 				<div class="normal-04"></div>
			 				<div class="bottom_area">
								전자키발권<div id="elect_selectBox2"></div>
			 				</div>
			 				<div class="bottom_area">
								입장권 출력방법<div id="elect_selectBox3"></div>
			 				</div>
		 				</div>
			 		</div><!-- rightArea -->
			 	</div>
			</div><!-- mainTabs_sub -->
			
			<div id="mainTabs_sub2" style="display:none;">
				<div id="tab3">
					<div id="form3"></div>
					<div class="buttons" style="float:right">
						<div class="btn-group btnRefresh" id="tab2Btn1" style="height:38px;"></div>
						<div class="btn-group btnRefresh" id="tab2Btn2" style="height:38px;"></div>
						<div class="btn-group btnRefresh" id="tab2Btn3" style="height:38px;"></div>
						<div class="btn-group btnRefresh" id="tab2Btn4" style="height:38px;"></div>
						<div class="btn-group btnRefresh" id="tab2Btn5" style="height:38px;"></div>
						<div class="btn-group btnRefresh" id="tab2Btn6" style="height:38px;"></div>
					</div>
					<div class="gridContainer" style="display: inline-block; margin-top: 5px;"></div>
				</div>		
			</div>
		</div>
	</div>
</div>

  