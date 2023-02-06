//예약불가일정관리
let tab8_toolbar = null;
let tab8_form = null;
let unavailableCalendar = null;
let unavailableSelectedInfo = null;
let unavailableCreatePopup = null;
let unavailableNewForm = null;
let unavailableCopyPopup = null;
let unavailableOrgList = null;
let unavailableCopyList = null;
let unavailableCalendarData = null;
let recurrenceRule = null;
let unavailableForm = null;
let orgSelectedFormData = null;

var facilityUnavailableCopyForm = "<div id='facilityUnavailableCopyForm'></div>";

function initUnvailable() {
	/*
	unavailableCalendarData = new DevExpress.data.ArrayStore({
		key: "ID",
		data: unvailableResultDataList()
	});
	*/
	tab8_toolbar = $("#tab8 .tab_contents #holidayToolbar").dxToolbar({
		items :[
            {
                location:'after',
                widget:'dxButton',
                cssClass:'functionbtn',
                options :{
                    text :'일정등록',
                },
                onClick(e) {
                	unvailableCreate();
                }
            },
            /*{
                location:'after',
                widget:'dxButton',
                cssClass:'functionbtn',
                options :{
                    text :'일정삭제',
                },
                onClick(e) {
                	CreateEditHolidayForm(false);
                }
            },*/
            {
                location : 'after',
                widget :'dxButton',
                cssClass:'functionbtn',
                options : {
                    text :'일정복사',
                },
                onClick(e) {
                	schedulerCopy();
                }
            }
        ]
	})
	
	unavailableCalendarData = unvailableResultDataList();
	
	tab8_form = $("#tab8 .tab_contents #holidaySchedule").dxCalendar({
		showTodayButton : true,
        minZoomLevel : "month",
        maxZoomLevel : "month",
        activeStateEnabled : false,
        focusStateEnabled : false,
        cellTemplate : unavailableCellTemplate,
        onCellClick(e){
//            if(!isDisableDate(e.value, "month")) {
            	unavailableSelectedInfo = e.value;
            	
            	unvailableCreate();
//            }
        },
        onInitialized(e){
        	unavailableCalendar = e.component;
        }
	})
}

function unavailableCellTemplate(cellData, weekDay, cellElement) {
	var textCss = "";
	var text = "";
	var class1 = isDisableDate(cellData.date,cellData.view) ? 'hs-calender-disabled':'';
	
	if (weekDay == 0) {
		textCss = "hs-sunday-date";
	}
	else if (weekDay == 6) {
		textCss = "hs-saturday-date";
	}
	if (isHoliday(cellData.date)) {
		textCss = "hs-holiday-date";
		text = holidayText(cellData.date);
	}
	
	var itemIndex = getDisabledItemIndex(cellData.date)

    var disabledItem = itemIndex>-1 ?  unavailableCalendarData[itemIndex]:undefined;

    if(itemIndex >=0 ) {
        $(cellElement[0]).addClass('hs-cell-disabled');
    }
	
	var dateTemplate = `<div style="display:table;width :100%;height:100%;" class='${class1}'>
			<div style="display: table-row;height:10%;" class="hs-calendar-header">
				<div style="display:table-cell;width:50%;" class='${textCss}'><span>${text}</span></div>
				<div style="display:table-cell;text-align:right;width:50%;"><span class='${textCss}'>${cellData.text}</span></div>
			</div>
			<div style="display:table-row" class="hs-calendar-body">
				<div style="display:table-cell;width: 100%;">`;
	if (disabledItem) {
		dateTemplate= dateTemplate + `<div style="display:flex;justify-content: space-between;width:100%;">
        		<div>[<span> 예약불가 </span>]<p>${disabledItem.EXCL_REASONNM}</p> </div>
            	<div style="padding-left:20px;"><a href="#" onClick="removeDisabledItem('${itemIndex}')" ><i class="dx-icon-remove"></i></a></div>
            </div>`;
    }
	
	dateTemplate= dateTemplate + `</div>
			</div>
		</div>`;

	return $(dateTemplate);
}

//공휴일 Data확인
function isHoliday(date) {
    const localeDate = date.toLocaleDateString();
    return holidays.filter(({
        date, name
    }) => DevExpress.localization.parseDate(date, 'yyyy-MM-dd').toLocaleDateString() === localeDate).length > 0;
}

function holidayText(date) {
    const localeDate = date.toLocaleDateString();
    const selectedHoliday = holidays.find(({
    	date, name
    }) => DevExpress.localization.parseDate(date, 'yyyy-MM-dd').toLocaleDateString() === localeDate);
    
    if (selectedHoliday) {
        return selectedHoliday.name;
    }
}

function isDisableDate(date, view) {

    if(view === 'month') {
        if(unavailableCalendarData) {
            const localeDate = DevExpress.localization.formatDate(date,'yyyy-MM-dd');
            return unavailableCalendarData.filter((item) => DevExpress.localization.formatDate(item.EXCL_DATE, "yyyy-MM-dd") === localeDate).length > 0;
        }
    }

}

function getDisabledItemIndex(date){
    if(unavailableCalendarData) {
    	const localeDate = DevExpress.localization.formatDate(date,'yyyy-MM-dd');;
    	const idx =  unavailableCalendarData.findIndex((item, index) => DevExpress.localization.formatDate(item.EXCL_DATE, "yyyy-MM-dd") === localeDate);
        return idx;
        
    }
}

//예약불가일정 등록 Popup
function unvailableCreate() {
	if(unavailableCreatePopup){
		unavailableCreatePopup = null;
		$("#unavailableCreate_Popup").dxPopup("dispose");
	}
	
	var selectIndex = "";
	var selectedDate = DevExpress.localization.formatDate(unavailableSelectedInfo, "yyyy-MM-dd");
	
	if (!selectedDate) {
		selectedDate = DevExpress.localization.formatDate(new Date(), "yyyy-MM-dd");
	}

	if(unavailableCalendarData) {
		selectIndex = unavailableCalendarData.findIndex((item, index) => DevExpress.localization.formatDate(item.EXCL_DATE, "yyyy-MM-dd") == selectedDate);
	}
	//console.log(selectIndex);
	var selectedFormData = null;
	if (selectIndex > -1) {
		selectedFormData = unavailableCalendarData[selectIndex];
	}
	else {
		selectedFormData = {
			RENT_FCLTY_SEQ: fcltySeq, 
			RENT_PLACE_ID: placeCd,
			EXCL_REASONNM: "",
			EXCL_DATE: DevExpress.localization.parseDate(selectedDate, "yyyy-MM-dd"),
			EXCL_EDATE: DevExpress.localization.parseDate(selectedDate, "yyyy-MM-dd"),
			recurrenceRule: "",
		    repeat: false
		}
	}
	
	/*
	if (selectedFormData) {
		orgSelectedFormData = selectedFormData;
	}
	*/
	
	unavailableCreatePopup = $("#unavailableCreate_Popup").dxPopup({
		contentTemplate: function (e) {
			unavailableTemplate(selectedFormData, e);
		},
		visible: true,
		title: selectIndex == -1 ? "예약불가일정등록" : "예약불가일정수정",
		width: 580,
		height: 420,
		position: { my: "center", at: "center", of: window },
		dragEnabled: true,
		toolbarItems: [{
			widget: "dxButton",
			toolbar: "bottom",
		    location: "after",
		    options: {
		    	text: "저장",
		        onClick() {
		    		DevExpress.ui.notify("예약불가일정 저장");
		    	},
		    },
		}, 
		{
			widget: "dxButton",
			toolbar: "bottom",
		    location: "after",
		    options: {
		    	text: "취소",
		        onClick() {
		    		unavailableForm.getEditor("repeat").option("value", false);
		    		
		    		unavailableForm.resetOption("value");
		    		unavailableForm.resetOption("formData");
		    		unavailableForm = null;

		    		unavailableCreatePopup.repaint();
		    		unavailableCreatePopup.hide();
		    		unavailableCreatePopup = null;
		    		$("#unavailableCreate_Popup").dxPopup("dispose");
		    	}
		    }
		}]
	}).dxPopup("instance");
	
}

//예약불가일정 등록 Form
function unavailableTemplate(selectedData, objPopup) {
	let unavailableContent = $("<div id='unavailableNewForm' />");
	
	recurrenceRule = new RecurrenceRule();
	//console.log(selectedData);
	unavailableNewForm = unavailableContent.dxForm({
		showColonAfterLabel: false,
	    colCount: 1,
	    formData: selectedData,
	    items: [
	    	{name: "mainGroup", itemType: "group", colCount: 2, items: [
		    	{colSpan: 2, itemType: "group", colCount: 2, caption: "대관장소정보", items: [
	        		{dataField: "RENT_FCLTY_SEQ", label: {text: "대관시설분류"}, editorType: "dxSelectBox", 
	        			editorOptions: {dataSource: facilityCategories_gbn,
	        				layout: "horizontal", valueExpr: "value", displayExpr: "text", disabled: true
	        			}
	        		},
	        		{dataField: "RENT_PLACE_ID", label: {text: "대관장소명"}, editorType: "dxSelectBox",
	        			editorOptions: {dataSource: placeList(),
	        				layout: "horizontal", valueExpr: "value", displayExpr: "text", disabled: true
	        			}
	        		}
	        	]},
	        	{colSpan: 2, itemType: "group", colCount: 2, caption: "일정정보", items: [
	        		{dataField: "EXCL_REASONNM", colSpan: 2, label: {text: "일정사유"}, validationRules: [{type: "required", message: "일정사유 필수 입력"}]},
	        		/*{itemType: "empty"},*/
	        		
	        		/*{dataField: "discription", colSpan: 2, label: {text: "설정내용"}, editorType: "dxTextArea", height: 50},*/
	        		
	        		{dataField: "EXCL_DATE", label: {text: "시작일자"}, editorType: "dxDateBox", 
	        			editorOptions: {type: "date", displayFormat: "yyyy-MM-dd",
	        				onInitialized: function (e) {
	        					if (!e.component.option("value")) {
	        						e.component.option("value", selectedDate);
	        					}
	        				}
	        			} 
	        		},
	        		{dataField: "EXCL_EDATE", label: {text: "종료일자"}, editorType: "dxDateBox",
	        			editorOptions: {type: "date", displayFormat: "yyyy-MM-dd"}
	        		},
	        		{dataField: "repeat", label: {text: "반복"}, editorType: "dxSwitch",
	        			editorOptions: {
	        				onInitialized: function (e) {
	        					//console.log(e.component.option("value"));
	        				},
	        				onValueChanged: function (e) {
	        					unavailableCreatePopup.option("width", e.value ? 1160 : 580);
	        					unavailableForm.option("colCount", e.value ? 2 : 1);
	        					unavailableForm.itemOption("repeatGroup", "visible", e.value);
	        					if (e.value) {
		        					unavailableForm.getEditor("freq").option("value", "WEEKLY");
		        					unavailableForm.itemOption("repeatGroup.repeatWeekSelect", "visible", true);
	        					}
	        				}
	        			}
	        		}
	        	]},
	        	/*
	        	{colSpan:2, dataField: "impossibleType", visible: false, editorType: "dxSelectBox",
	        		editorOptions: {dataSource: impossibleTypes,
	        			layout: "horizontal", displayExpr: "text", valueExpr: "value",
	        			onInitialized: function (e) {
	        				if (!e.component.option("value")) {
								e.component.option("value", e.component.option("dataSource")[0].value);
							}
	        			}
	        		}
	        	}
	        	*/
	    	]},
        	{name: "repeatGroup", itemType: "group", caption: "반복설정", colCount: 2, 
        		visible: false,
        		items: [
            		{dataField: "FACILITY_UNAVAILABLE_RECURRENCE_RULE", visible: false},
            		{dataField: "freq", label: {text: "반복빈도"}, editorType: "dxSelectBox",
            			editorOptions: {dataSource: frequency_gbn,
            				layout: "horizontal", displayExpr: "text", valueExpr: "value", field: "freq",
            				onValueChanged: function (e) {
            					var intervalTxt = "";
            					
            					if (unavailableForm.itemOption("repeatGroup.monthRepeatType").visible) {
            						unavailableForm.getEditor("monthRepeatType").resetOption("value");
        						}
            					
            					if (e.value == "WEEKLY") {
            						intervalTxt = "주마다";
            						
            						unavailableForm.itemOption("repeatGroup.repeatWeekSelect", "visible", true);
            						unavailableForm.itemOption("repeatGroup.monthRepeatType", "visible", false);
            						unavailableForm.itemOption("repeatGroup.repeatWeekth", "visible", false);
            						unavailableForm.itemOption("repeatGroup.repeatByDate", "visible", false);
            						unavailableForm.itemOption("repeatGroup.repeatByDate.repeatByMonth", "visible", false);
            						unavailableForm.itemOption("repeatGroup.repeatByDate.repeatByMonthDay", "visible", false);
            					}
            					else if (e.value == "MONTHLY") {
            						intervalTxt = "월마다";
            						
            						unavailableForm.itemOption("repeatGroup.repeatWeekSelect", "visible", false);
            						unavailableForm.itemOption("repeatGroup.monthRepeatType", "visible", true);
            						unavailableForm.itemOption("repeatGroup.repeatWeekth", "visible", false);
            						unavailableForm.itemOption("repeatGroup.repeatByDate", "visible", false);
            						unavailableForm.itemOption("repeatGroup.repeatByDate.repeatByMonth", "visible", false);
            						unavailableForm.itemOption("repeatGroup.repeatByDate.repeatByMonthDay", "visible", false);
            					}
            					else if (e.value == "YEARLY") {
            						intervalTxt = "년마다";
            						
            						unavailableForm.itemOption("repeatGroup.repeatWeekSelect", "visible", false);
            						unavailableForm.itemOption("repeatGroup.monthRepeatType", "visible", false);
            						unavailableForm.itemOption("repeatGroup.repeatWeekth", "visible", false);
            						unavailableForm.itemOption("repeatGroup.repeatByDate", "visible", true);
            						unavailableForm.itemOption("repeatGroup.repeatByDate.repeatByMonth", "visible", true);
            						unavailableForm.itemOption("repeatGroup.repeatByDate.repeatByMonthDay", "visible", true);
            					}
            					
            					unavailableForm.itemOption("repeatGroup.interval", {label: {text: intervalTxt}} );
            					
            					recurrenceRule.deleteRule('byDay');
            					recurrenceRule.makeRule("freq", e.value);
            					unavailableForm.updateData("recurrenceRule", recurrenceRule.getRecurrenceString() || "");
            				}
            			}
            		},
            		
            		{name: "interval", dataField: "FACILITY_UNAVAILABLE_INTERVAL", 
            			label: {location: "right", text: recurrenceRule.getRules().freq == "MONTHLY" ? "월마다" : recurrenceRule.getRules().freq == "YEARLY" ? "년마다" : "주마다"}, 
            			cssClass: "form-harf form-noLabel", editorType: "dxNumberBox",
        				editorOptions: {showSpinButtons: true, min: 1, max: 20,
        					value: recurrenceRule.getRules().interval ? recurrenceRule.getRules().interval : 1,
        					onValueChanged: function (e) {
        						recurrenceRule.makeRule("interval", e.value);
        						unavailableForm.updateData("recurrenceRule", recurrenceRule.getRecurrenceString() || "");
        					}
        				}
        			},
        			
        			{name: "monthRepeatType", dataField: "repeatMonthType", colSpan: 2, label: {visible: false}, cssClass: "form-harf form-noLabel", editorType: "dxSelectBox",
        				visible: recurrenceRule.getRules().freq == "MONTHLY",
        				editorOptions: {dataSource: repeatMonthType_gbn,
        					layout: "horizontal", displayExpr: "text", valueExpr: "value",
        					onValueChanged: function (e) {
        						if (e.value == "W") {
        							unavailableForm.itemOption("repeatGroup.repeatWeekth", "visible", true);
        							unavailableForm.itemOption("repeatGroup.repeatWeekSelect", "visible", true);
        							unavailableForm.itemOption("repeatGroup.repeatByDate", "visible", false);
        							unavailableForm.itemOption("repeatGroup.repeatByDate.repeatByMonth", "visible", false);
        							unavailableForm.itemOption("repeatGroup.repeatByDate.repeatByMonthDay", "visible", false);
        						}
        						else {
        							unavailableForm.itemOption("repeatGroup.repeatWeekth", "visible", false);
        							unavailableForm.itemOption("repeatGroup.repeatWeekSelect", "visible", false);
        							unavailableForm.itemOption("repeatGroup.repeatByDate", "visible", true);
        							unavailableForm.itemOption("repeatGroup.repeatByDate.repeatByMonth", "visible", false);
        							unavailableForm.itemOption("repeatGroup.repeatByDate.repeatByMonthDay", "visible", true);
        						}
        					}
        				}
        			},
        			
        			{name: "repeatWeekth", dataField: "repeatWeekth", colSpan: 2, label: {text: "반복요일"}, cssClass: "form-harf", editorType: "dxSelectBox",
        				visible: (recurrenceRule.getRules().freq == "MONTHLY" && recurrenceRule.hasRule("byDay")),
        				editorOptions: {dataSource: repeatmonthWeekth_gbn,
        					layout: "horizontal", displayExpr: "text", valueExpr: "value",
        					onValueChanged: function (e) {
        						const repeatByDay = $(".weekSelect").dxButtonGroup("instance");
        						const selectedItems = repeatByDay.option("selectItemKeys");
        						
        						if (selectedItems && selectedItems.length > 0) {
        							if (recurrenceRule.getRules().freq === "MONTHLY" && e.value) {
                                        const arrays = selectedItems.map((i) => e.value + i);
                                        recurrenceRule.makeRule("byDay", arrays.join(","));
                                    } 
        							else {
                                        recurrenceRule.makeRule("byDay", selectedItems.join(","));
                                    }
        						}
        						
        						unavailableForm.updateData("recurrenceRule", recurrenceRule.getRecurrenceString() || "");
        					}
        				}
        			},
        			
        			{name: "repeatWeekSelect", dataField: "repeatByDay", colSpan: 2, label: {visible: false}, cssClass: "form-noLabel", 
        				visible: recurrenceRule.getRules().freq == "WEEKLY" || (recurrenceRule.getRules().freq == "MONTHLY" && recurrenceRule.hasRule("byDay")), 
        				template: function (data, itemElement) {
        					itemElement.append($("<div class='weekSelect'>").dxButtonGroup({
            						items: weekCheck_gbn,
                					keyExpr: "value",
                					selectionMode: "multiple",
                					selectedItemKeys: data.component.option("formData")[data.dataField],
                					height: 30,
                                    width: "100%",
                                    buttonTemplate: function (itemData, $buttonContent) {
                                        $buttonContent.append("<span>"+ itemData.text +"</span>");
                                    },
                                    onSelectionChanged: function (e) {
                                    	const selectedItems = e.component.option("selectedItemKeys");

                                    	if (selectedItems && selectedItems.length > 0) {
                                    		if (recurrenceRule.getRules().freq === "MONTHLY" && unavailableForm.option("formData")["repeatWeekth"]) {
                                    			const arrays = selectedItems.map((i) => unavailableForm.option("formData")["repeatWeekth"] + i);
                                    			recurrenceRule.makeRule("byDay", arrays.join(","));
                                    		}
                                    		else {
                                    			recurrenceRule.makeRule("byDay", selectedItems.join(","));
                                    		}
                                    	}

                                    	unavailableForm.updateData("recurrenceRule", recurrenceRule.getRecurrenceString() || "");
                                    }
            					})
        					);
        				}
        			},
        			
        			{name: "repeatByDate", itemType: "group", colSpan: 2, colCount: 2, label: {text: "반복일자"}, cssClass: "form-input335", 
        				visible: recurrenceRule.getRules().freq == "YEARLY" || (recurrenceRule.getRules().freq == "MONTHLY" && recurrenceRule.hasRule("byMonthDay")), 
        				items: [
            				{dataField: "repeatByMonth", label: {visible: false}, editorType: "dxSelectBox",
            					visible: recurrenceRule.getRules().freq == "YEARLY",
                				editorOptions: {dataSource: monthItems_gbn, displayExpr: "text", valueExpr: "value", elementAttr: {class: "form-label40"},
                					onValueChanged: function (e) {
                						recurrenceRule.makeRule("byMonth", e.value);
                						unavailableForm.updateData("recurrenceRule", recurrenceRule.getRecurrenceString() || "");
                					}
                				}
                			},
                			{dataField: "repeatByMonthDay", label: {visible: false}, editorType: "dxSelectBox",
                				visible: recurrenceRule.getRules().freq == "YEARLY" || (recurrenceRule.getRules().freq == "MONTHLY" && recurrenceRule.hasRule("byMonthDay")), 
                				editorOptions: {dataSource: dateItems_gbn, displayExpr: "text", valueExpr: "value", elementAttr: {class: "form-label40"},
                					onValueChanged: function (e) {
                						recurrenceRule.makeRule("byMonthDay", e.value);
                						unavailableForm.updateData("recurrenceRule", recurrenceRule.getRecurrenceString() || "");
                					}
                				}
                			},
                		]
        			},
        			{name: "until", dataField: "until", label: {text: "반복종료일자"}, editorType: "dxDateBox",
        				editorOptions: {displayFormat: "yyyy-MM-dd", type: "date", value: recurrenceRule.getRules().until,
        					onValueChanged: function (e) {
        						recurrenceRule.makeRule("until", e.value);
        						unavailableForm.updateData("recurrenceRule", recurrenceRule.getRecurrenceString() || "");
        					}
        				}
        			},
        			{ itemType: "empty" }
        			
        			/*
        			{name: "repeatEnd", dataField: "repeatEnd", colSpan: 2, label: {text: "반복종료설정"}, editorType: "dxRadioGroup",
        				editorOptions: {items: endRepeat_tp , valueExpr: "type", layout: 'vertical',
        					itemTemplate: function (itemData) {
        						if (itemData.type == "never") {
        							return $("<div>").html("설정안함");
        						}
        						if (itemData.type == "until") {
        							const divElement = document.createElement("div");
        							$(divElement)
        								.append("<div style='float:left; padding: 6px 10px 0 0;'>반복종료일자</div>")
        								.append($("<div id='repeatEndDate' class='form-input180' style='float:left;'>").dxDateBox({
        									dataField: "repeatEndDate",
        									disabled: !recurrenceRule.getRules().until, 
        									displayFormat: "yyyy-MM-dd", type: "date",
        									value: recurrenceRule.getRules().until,
        									onValueChanged: function (e) {
        										if (e.value) {
        											recurrenceRule.makeRule("until", e.value);
        										}
        										
        										unavailableForm.updateData("recurrenceRule", recurrenceRule.getRecurrenceString() || "");
        									}
        								}));
        							
        							return divElement;
        						}
        						if (itemData.type == "count") {
        							const divElement = document.createElement("div");
        							$(divElement)
        								.append($("<div id='repeartOccurrence' class='form-input95' style='float:left;'>").dxNumberBox({
        									dataField: "repeatEndCount",
        									disabled: !recurrenceRule.getRules().count, 
        									showSpinButtons: true, min: 1, max: 20,
        									value: recurrenceRule.getRules().count,
        									onValueChanged: function (e) {
        										if (e.value) {
        											recurrenceRule.makeRule("count", e.value);
        										}
        										
        										unavailableForm.updateData("recurrenceRule", recurrenceRule.getRecurrenceString() || "");
        									}
        								}))
        								.append("<div style='float:left; padding: 6px 0 0 10px;'>회 실행 후 종료</div>");
        							
        							return divElement;
        						}
        					},
        					onValueChanged: function (e) {
            					const repeatEndDate = $("#repeatEndDate").dxDateBox("instance");
            					const repeartOccurrence = $("#repeartOccurrence").dxNumberBox("instance");
            					
            					if (e.value == "never") {
            						repeatEndDate.option("disabled", true);
            						repeartOccurrence.option("disabled", true);
            					}
            					else if (e.value == "until") {
            						repeatEndDate.option("disabled", false);
            						repeartOccurrence.option("disabled", true);
            					}
            					else if (e.value == "count") {
            						repeatEndDate.option("disabled", true);
            						repeartOccurrence.option("disabled", false);
            					}
            					
            					unavailableForm.updateData('recurrenceRule', recurrenceRule.getRecurrenceString() || '');
            				}
        				}
        			}
        			*/
        		]
        	}
	    ],
	    onInitialized: function (e) {
	    	unavailableForm = e.component;
	    }
	}).dxForm("instance");
	
	objPopup.append(unavailableContent);
}

function schedulerCopy() {
	if (unavailableCopyPopup) {
		unavailableCopyPopup = null;
		$("#facilityUnavailable_Popup").dxPopup("dispose");
	}
	
	unavailableOrgList = {};
	unavailableCopyList = {};
	
	unavailableCopyPopup = $("#facilityUnavailable_Popup").dxPopup({
		contentTemplate: $("<div>").append(facilityUnavailableCopyForm),
		visible: true,
		title: "예약불가일정 복사",
		width: 800,
        height: 700,
		position: { my: "center", at: "center", of: window },
		dragEnabled: true,
		onShown: function (e) {
			unavailableCopyTemplate();
			$('#facilityUnavailableCopyForm').dxForm("instance");
		},
		toolbarItems: [{
			widget: "dxButton",
			toolbar: "bottom",
		    location: "after",
		    options: {
		    	text: "저장",
		        onClick() {
		    		DevExpress.ui.notify("일정복사");
		    	},
		    },
		}, 
		{
			widget: "dxButton",
			toolbar: "bottom",
		    location: "after",
		    options: {
		    	text: "취소",
		        onClick() {
		    		unavailableCopyPopup.hide();
		    		unavailableCopyPopup = null;
		    		$("#facilityUnavailable_Popup").dxPopup("dispose");
		    	}
		    }
		}]
	}).dxPopup("instance");
}

function unavailableCopyTemplate() {
	$("#facilityUnavailableCopyForm").dxForm({
		showColonAfterLabel: false,
	    colCount: 1,
	    formData: {ORG_ID: 1, ORG_RENT_FCLTY_SEQ: "1", ORG_RENT_PLACE_ID: "1"},
	    items: [
	    	{itemType: "group", colCount: 5, caption: "", items: [
	    		{itemType: "group", colSpan: 2, colCount: 2, caption: "원본대관장소", items: [
	    			{colSpan: 2, dataField: "ORG_RENT_FCLTY_SEQ", label: {text: "대관시설분류"}, editorType: "dxSelectBox",
	    				editorOptions: {dataSource: facilityCategories_gbn,
	    					layout: "horizontal", displayExpr: "text", valueExpr: "value", disabled: true
	    				}
	    			},
	    			{colSpan: 2, dataField: "ORG_RENT_PLACE_ID", label: {text: "대관장소명"}, editorType: "dxSelectBox",
	    				editorOptions: {dataSource: placeList(),
	    					layout: "horizontal", displayExpr: "text", valueExpr: "value", disabled: true
	    				}
	    			},
	    			{colSpan: 2, dataField: "ORG_UNAVAILABLE_LIST", label: {visible: false}, cssClass: "hs-bg-white",
	    				template: function (data, itemElement) {
	    					itemElement.append($("<div id='orgList' class='copyListSelect'>").dxList({
	    						dataSource: unvailableOrgDataList(),
	    						keyExpr: "EXCL_DATE",
	    						height: 400,
	    						showSelectionControls: true,
	    						selectionAllMode: "allPages",
	    						selectionMode: "all",
	    						itemTemplate: function (data) {
	    							const result = $("<div>").addClass("hs-list-title");
	    							$("<div>").text(data.EXCL_DATE).appendTo(result);
	    							$("<div>").text(data.EXCL_REASONNM).appendTo(result);
	    							
	    							return result;
	    						},
	    						onInitialized: function (e) {
	    							unavailableOrgList = e.component;
	    						},
	    						onSelectionChanged: function (e) {
	    							
	    						}
	    					}));
	    				}
	    			}
	    		]},
	    		{cssClass: "btn-noflex", 
	    			template: function(data, itemElement) {
		    			let btnContainer = document.createElement("div");
		    			
		    			let rightContainer = $("<div class='btn-right'>").dxButton({
		    				icon: "chevronright",
		    				height: 100,
		    				onClick: function () {
		    					const copyListTemplate = $("#copyList").dxList("instance");
		    					const selectedItems = unavailableOrgList.option("selectedItems");
		    					const selectedItemKeys = unavailableOrgList.option("selectedItemKeys");
		    					const copyListItems = copyListTemplate.option("dataSource");

		    					if (selectedItems) {
		    						/*
		    						console.log(selectedItems);
		    						
		    						var arrFiltered = {};
		    						copyListItems.forEach((element) => {
		    							selectedItems.forEach((key) => {
		    								if (element.EXCL_DATE != key.EXCL_DATE) {
		    									arrFiltered.push(key);
		    								} else {
		    									arrFiltered.push(element);
		    								}
		    							});
									});
		    						console.log(arrFiltered);
		    						*/
/*
		    						for (var i = 0; i < copyListItems.length; i++) {
										var filtered = selectedItems.filter((element) => (element.EXCL_DATE != copyListItems[i].EXCL_DATE));
										if (filtered != "") {
											console.log(filtered);
											//copyListTemplate.option("dataSource").push(filtered);
										}
									}
*/									
		    						const filtered = selectedItems.filter((element) => !copyListItems.includes(element.EXCL_DATE));
//console.log(filtered);

//		    						if (!removeArrayValues(filtered)) {
		    							copyListTemplate.option("dataSource").push(selectedItems);
		//    						}
		    					}
		    				}
		    			});
		    			
		    			let leftContainer = $("<div class='btn-left'>").dxButton({
		    				icon: "chevronleft",
		    				height: 100,
		    				onClick: function() {
		    					const orgListTemplate = $("#orgList").dxList("instance");
		    					const copyListTemplate = $("#copyList").dxList("instance");
		    					const selectedItemKeys = unavailableCopyList.option("selectedItemKeys");

		    					if (selectedItemKeys) {
		    						const filtered = copyListTemplate.option("dataSource").filter((element) => !selectedItemKeys.includes(element.EXCL_DATE));

		    						copyListTemplate.option("dataSource", filtered);
		    					}
		    				}
		    			});
		    			
		    			$(btnContainer)
		    				.append(rightContainer)
		    				.append(leftContainer);
		    			
		    			itemElement.append(btnContainer);
	    			}
	    		},
	    		{itemType: "group", colSpan:2, colCount: 2, caption: "대상대관장소", items: [
	    			{colSpan: 2, dataField: "COPY_RENT_FCLTY_SEQ", label: {text: "대관시설분류"}, editorType: "dxSelectBox",
	    				editorOptions: {dataSource: facilityCategories_gbn,
	    					layout: "horizontal", displayExpr: "text", valueExpr: "value",
	    					onContentReady: function (e) {
	    						//console.log(unavailableContent);
	    					}
	    				}
	    			},
	    			{colSpan: 2, dataField: "COPY_RENT_PLACE_ID", label: {text: "대관장소명"}, editorType: "dxSelectBox",
	    				editorOptions: {dataSource: placeList(),
	    					layout: "horizontal", displayExpr: "text", valueExpr: "value"
	    				}
	    			},
	    			{colSpan: 2, dataField: "ORG_UNAVAILABLE_LIST", label: {visible: false}, cssClass: "hs-bg-white",
	    				template: function (data, itemElement) {
	    					itemElement.append($("<div id='copyList' class='copyListSelect'>").dxList({
	    						dataSource: unvailableCopyDataList(),
	    						keyExpr: "EXCL_DATE",
	    						height: 400,
	    						showSelectionControls: true,
	    						selectionAllMode: "allPages",
	    						selectionMode: "multiple",
	    						itemTemplate: function (data) {
	    							const result = $("<div>").addClass("hs-list-title");
	    							$("<div>").text(data.EXCL_DATE).appendTo(result);
	    							$("<div>").text(data.EXCL_REASONNM).appendTo(result);
	    							
	    							return result;
	    						},
	    						onInitialized: function (e) {
	    							unavailableCopyList = e.component;
	    						},
	    						onSelectionChanged: function (e) {
	    							
	    						}
	    					}));
	    				}
	    			}
		    	]}
	    	]}
	    ],
		onContentReady: function (e) {
			$(".btn-noflex").parent().parent().css("flex", "none");
		}
	});
}

function unvailableResultDataList() {
	let dataList = "";
	
	dataList = [
		{
			ID: 1,
			RENT_FCLTY_SEQ: "1", 
			RENT_PLACE_ID: "1",
			EXCL_REASONNM: "Testing",
			EXCL_DATE: DevExpress.localization.parseDate("2023-01-10", "yyyy-MM-dd"),
			EXCL_EDATE: DevExpress.localization.parseDate("2023-01-11", "yyyy-MM-dd"),
			recurrenceRule: "FREQ=MONTHLY;BYDAY=1SA;INTERVAL=1",
		    repeat: false
		},
		{
			ID: 2,
			RENT_FCLTY_SEQ: "1", 
			RENT_PLACE_ID: "1",
			EXCL_REASONNM: "Testing2",
			EXCL_DATE: DevExpress.localization.parseDate("2023-01-13", "yyyy-MM-dd"),
			EXCL_EDATE: DevExpress.localization.parseDate("2023-01-13", "yyyy-MM-dd"),
			recurrenceRule: "FREQ=MONTHLY;BYDAY=1SA;INTERVAL=1",
		    repeat: false
		}
	];
	
	return dataList;
}

function unvailableOrgDataList() {
	let dataList = "";
	
	dataList = [
		{ID: 1, EXCL_DATE: "2023-01-10", EXCL_REASONNM: "Testing"},
		{ID: 2, EXCL_DATE: "2023-01-13", EXCL_REASONNM: "공사기간"}
		
	]
	
	return dataList;
}

function unvailableCopyDataList() {
	let dataList = "";
	
	dataList = [
		{ID: 1, EXCL_DATE: "2023-01-10", EXCL_REASONNM: "Testing"},
		//{ID: 2, EXCL_DATE: "2022-12-13", EXCL_REASONNM: "공사기간"}
		
	]
	
	
	return dataList;
}

function removeArrayValues(obj) {
	for (let key in obj) {
		if (Array.isArray(obj[key]) == true) {
			delete obj[key];
		}
		return obj;
	}
}
