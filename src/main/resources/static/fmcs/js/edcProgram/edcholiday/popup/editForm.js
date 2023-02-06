//일정 등록
let editHolidayPopup=null;
let editHolidayform=null;
let formHolidayData={};
let recurrenceRule=null;
let addFlag= true;
function CreateEditHolidayForm(addYn)
{
	addFlag = addYn;
	if(editHolidayPopup){
		editHolidayPopup=null;
		$("#holidayCreatePopup").dxPopup("dispose");
		
	}

	editHolidayPopup=$("#holidayCreatePopup").dxPopup({
		contentTemplate: editHolidayTemplate,
		visible: true,
		title: addFlag ? '강좌휴관일 일정 등록' :  '강좌휴관일 일정 삭제' ,
		width:580,
        height:400,
		position: {
			my: 'center',
		    at: 'center',
		    of: window
		},
		dragEnabled: true,
		toolbarItems: [{
			widget: 'dxButton',
			toolbar: 'bottom',
		    location: 'after',
		    options: {
			    	text:  addFlag ? '저장' : '삭제',
			        onClick() {
			    		/*const message = `Email is sent to ${employee.FirstName} ${employee.LastName}`;
			    		DevExpress.ui.notify({
				            message,
				            position: {
				            	my: 'center top',
				            	at: 'center top',
				            },
			    		}, 'success', 3000);*/
			    	},
			    },
		}, {
			widget: 'dxButton',
			toolbar: 'bottom',
		    location: 'after',
		    options: {
			    	text: '취소',
			        onClick() {
			    		editHolidayPopup.hide();
			    		editHolidayPopup=null;
			    		$("#holidayCreatePopup").dxPopup("dispose");
			    	},
			    },
		}],
	}).dxPopup('instance');
}

const editHolidayTemplate = function () {
	
	const content = $("<div />");
	
	if( !unavailableSelectedInfo){
		unavailableSelectedInfo = toDateFormat(new Date());
	}
	formHolidayData={
			EDC_PRGMNM:'',
			CALENDAR_ETC:'',
			DATE_TYPE:1,
			startDate:unavailableSelectedInfo,
			endDate:moment(unavailableSelectedInfo).endOf('month').format('YYYY-MM-DD'),
			repeat:false,
	}
	recurrenceRule = new RecurrenceRule();
	content.append(
			 $("<div id='copyHolidayMainForm'>").dxForm({
				 formData:formHolidayData,
				 colCount: 1,
				 showColonAfterLabel: false,
				 onInitialized:function(e){
					 editHolidayform = e.component;
				 },
					 
				 items:[
		                {
		                    itemType :'group',
		                    name : 'mainGroup',
		                    colCount:2,
		                    items : [
		                        {
		                            colSpan : 2,
		                            dataField :'EDC_PRGMNM',
		                            label : {
		                                text:'강좌명',
		                            },
		                            editorOptions : {
		                                readOnly: true,
		                            }
		                        },
		                        {
		                            colSpan : 2,
		                            dataField: 'CALENDAR_ETC',
		                            visible:addFlag,
		                            label : {
		                                text :'휴관사유명',
		                            },
		                            
		                        },
		                        {
		                            label : {
		                                text: '시작일자'
		                            },
		                            dataField :'startDate',
		                            editorType :'dxDateBox',
		                            editorOptions : {
		                                type: 'date',
		                                displayFormat : 'yyyy-MM-dd',
		                                field :'dtstart',
		                                onValueChanged(e){
		                                    if(e.value){
		                                        recurrenceRule.makeRule(e.component.option('field'), e.value.toUntilString());
		                                        editHolidayform.updateData('recurrenceRule', recurrenceRule.getRecurrenceString() || '');
		                                    }
		                                }
		                            }
		                        },
		                        {
		                            label : {
		                                text:'종료일자',
		                            },
		                            dataField: 'endDate',
		                            editorType :'dxDateBox',
		                            editorOptions : {
		                                type: 'date',
		                                displayFormat :'yyyy-MM-dd',
		                            }
		                        },
		                        /*{
		                            colSpan: 2,
		                            dataField: 'description',
		                            editorType: 'dxTextArea',
		                            label: {
		                                text: '설정내용',
		                            },
		                            editorOptions: {
		                                height: 100,
		                            }
		                        },*/
		                        {
		                            colSpan: 2,
		                            dataField: 'repeat',
		                            editorType: 'dxSwitch',
		                            label: {
		                                text: '반복'
		                            },
		                            editorOptions: {
		                                onValueChanged(e) {
		                                	editHolidayPopup.option('width', e.value ? 1160 : 580);
		                                	editHolidayform.option('colCount', e.value ? 2 : 1);
		                                	editHolidayform.itemOption('repeatGroup', 'visible', e.value);
		                                	editHolidayform.getEditor('freq').option('value', 'WEEKLY');
		                                	editHolidayform.getEditor('interval').option('value', 1);
		                                	editHolidayform.getEditor('until').option('value', editHolidayform.getEditor('endDate').option('value'));
		                                }
		                            }
		                        },
		                    ]
		                },
		                {
		                    itemType: 'group',
		                    name :'repeatGroup',
		                    visible:false,
		                    colCount:1,
		                    items :[
		                        {
		                            visible:false,
		                            dataField: "recurrenceRule",
		                            label : {
		                                text : 'Rule',
		                            },
		                            editorOptions :{
		                                readOnly : true,
		                            }
		                        },
		                        {
		                            dataField: 'freq',
		                            label : {
		                                text:'반복빈도',
		                            },
		                            editorType :'dxSelectBox',
		                            editorOptions : {
		                                dataSource : new DevExpress.data.ArrayStore({
		                                    key : 'Code',
		                                    data: frequency,
		                                }),
		                                valueExpr : 'Code',
		                                displayExpr: 'Name',
		                                field : 'freq',
		                                onValueChanged(e){

		                                    const form  = editHolidayform;
		                                 
		                                    if(e.value === 'WEEKLY') {
		                                        form.itemOption('repeatGroup.intervalGroup.interval', {
		                                            label: {
		                                                text: '주마다'
		                                            }
		                                        });
		                                        if(form.itemOption('repeatGroup.intervalGroup.repeatMonthlyCondition').visible) {
		                                            form.getEditor('repeatMonthlyCondition').resetOption('value');
		                                        }

		                                        form.itemOption('repeatGroup.intervalGroup.repeatMonthlyCondition', 'visible', false);
		                                        form.itemOption('repeatGroup.intervalGroup.repeatMonthlyConditionBlank', 'visible', true);

		                                        const repeatByDay = $('.repeatByDay').dxButtonGroup('instance');
		                                        if (repeatByDay) {
		                                            repeatByDay.resetOption('selectedItemKeys');
		                                        }
		                                        form.itemOption('repeatGroup.bySetPosGroup.repeatBySetPos', 'visible', false);
		                                        form.itemOption('repeatGroup.bySetPosGroup.repeatBySetPosBlank', 'visible', false);
		                                        form.itemOption('repeatGroup.byDayGroup.repeatByDay', 'visible', true);
		                                        form.itemOption('repeatGroup.byMonthGroup.repeatByMonth', 'visible', false);
		                                        form.itemOption('repeatGroup.byMonthGroup.repeatByMonthDay', 'visible', false);
		                                        form.itemOption('repeatGroup.byMonthGroup.repeatByMonthDayBlank', 'visible', false);

		                                    } else if( e.value === 'MONTHLY') {

		                                        form.itemOption('repeatGroup.intervalGroup.interval', {
		                                            label: {
		                                                text: '월마다'
		                                            }
		                                        });

		                                        form.itemOption('repeatGroup.intervalGroup.repeatMonthlyCondition', 'visible', true);
		                                        form.itemOption('repeatGroup.intervalGroup.repeatMonthlyConditionBlank', 'visible', false);
		                                        form.itemOption('repeatGroup.byDayGroup.repeatByDay', 'visible', false);
		                                        form.itemOption('repeatGroup.byMonthGroup.repeatByMonth', 'visible', false);
		                                        form.itemOption('repeatGroup.byMonthGroup.repeatByMonthDay', 'visible', false);
		                                        form.itemOption('repeatGroup.byMonthGroup.repeatByMonthDayBlank', 'visible', false);
		                                        form.itemOption('repeatGroup.bySetPosGroup.repeatBySetPosBlank', 'visible', false);

		                                    } else if(e.value === 'YEARLY') {

		                                        form.itemOption('repeatGroup.intervalGroup.interval', {
		                                            label: {
		                                                text: '년마다'
		                                            }
		                                        });

		                                        if (form.itemOption('repeatGroup.intervalGroup.repeatMonthlyCondition').visible) {
		                                            form.getEditor('repeatMonthlyCondition').resetOption('value');
		                                        }
		                                        form.itemOption('repeatGroup.intervalGroup.repeatMonthlyCondition', 'visible', false);
		                                        form.itemOption('repeatGroup.intervalGroup.repeatMonthlyConditionBlank', 'visible', true);
		                                        form.itemOption('repeatGroup.byDayGroup.repeatByDay', 'visible', false);
		                                        form.itemOption('repeatGroup.byMonthGroup.repeatByMonth', 'visible', true);
		                                        form.itemOption('repeatGroup.byMonthGroup.repeatByMonthDay', 'visible', true);
		                                        form.itemOption('repeatGroup.bySetPosGroup.repeatBySetPos', 'visible', false);
		                                        form.itemOption('repeatGroup.bySetPosGroup.repeatBySetPosBlank', 'visible', false);
		                                        form.itemOption('repeatGroup.byMonthGroup.repeatByMonthDayBlank', 'visible', false);

		                                    }

		                                    recurrenceRule.makeRule(e.component.option('field'), e.value);
		                                    recurrenceRule.deleteRule('byDay');
		                                    recurrenceRule.deleteRule('byMonth');
		                                    recurrenceRule.deleteRule('byMonthDay');
		                                    form.updateData('recurrenceRule', recurrenceRule.getRecurrenceString() || '');
		                                }
		                            }
		                        },
		                        {
		                            itemType: 'group',
		                            name : 'intervalGroup',
		                            colCount:2,
		                            items : [
		                                {
		                                    label : {
		                                        text :'주마다',
		                                        location :'right',
		                                        showColon : false,
		                                    },
		                                    cssClass: 'hs-repeat-yearly-last-box',
		                                    editorType :'dxNumberBox',
		                                    dataField : 'interval',
		                                    editorOptions : {
		                                        showSpinButtons: true,
		                                        field :'interval',
		                                        min : 1,
		                                        max : 12,
		                                        onValueChanged(e){
		                                            const form  = editHolidayform;
		                                           
		                                            recurrenceRule.makeRule(e.component.option('field'), e.value);
		                                            form.updateData('recurrenceRule', recurrenceRule.getRecurrenceString() || '');
		                                        }
		                                    }
		                                },
		                                {
		                                    dataField: 'repeatMonthlyCondition',
		                                    editorType: 'dxSelectBox',
		                                    visible:false,
		                                    label : {
		                                        visible:false,
		                                    },
		                                    editorOptions: {
		                                        dataSource: new DevExpress.data.ArrayStore({
		                                            key: 'Code',
		                                            data: repeatMonthlyConditions,
		                                        }),
		                                        valueExpr: 'Code',
		                                        displayExpr: 'Name',
		                                        onValueChanged(e) {

		                                            const form  = editHolidayform;
		                                           
		                                            if (e.value === '0001') {

		                                                recurrenceRule.deleteRule('byDay');
		                                                const repeatByDay = $('.repeatByDay').dxButtonGroup('instance');
		                                                if (repeatByDay) {
		                                                    repeatByDay.resetOption('selectedItemKeys');
		                                                }
		                                                if (form.itemOption('repeatGroup.bySetPosGroup.repeatBySetPos').visible) {
		                                                    form.getEditor('repeatBySetPos').resetOption('value');
		                                                }

		                                                form.itemOption('repeatGroup.bySetPosGroup.repeatBySetPos', "visible", false);

		                                                form.itemOption('repeatGroup.bySetPosGroup.repeatBySetPosBlank', 'visible', false);
		                                                form.itemOption('repeatGroup.byDayGroup.repeatByDay', 'visible', false);
		                                                form.itemOption('repeatGroup.byMonthGroup.repeatByMonthDay', 'visible', true);
		                                                form.itemOption('repeatGroup.byMonthGroup.repeatByMonthDayBlank', 'visible', true);

		                                            } else {

		                                                if (form.itemOption('repeatGroup.byMonthGroup.repeatByMonthDay').visible) {
		                                                    form.getEditor('repeatByMonthDay').resetOption('value');
		                                                }

		                                                recurrenceRule.deleteRule('byMonthDay');
		                                                form.itemOption('repeatGroup.bySetPosGroup.repeatBySetPos', "visible", true);
		                                                form.itemOption('repeatGroup.bySetPosGroup.repeatBySetPosBlank', 'visible', true);
		                                                form.itemOption('repeatGroup.byDayGroup.repeatByDay', 'visible', true);
		                                                form.itemOption('repeatGroup.byMonthGroup.repeatByMonthDay', 'visible', false);
		                                                form.itemOption('repeatGroup.byMonthGroup.repeatByMonthDayBlank', 'visible', false);

		                                            }
		                                        }
		                                    }
		                                },
		                                {
		                                    itemType :'empty',
		                                    name :'repeatMonthlyConditionBlank',
		                                    visible:false,
		                                }
		                            ],
		                        },
		                        {
		                            itemType :'group',
		                            name : 'bySetPosGroup',
		                            colCount:2,
		                            items : [
		                                {
		                                    label: {
		                                        text: '반복요일',
		                                    },
		                                    visible:false,
		                                    dataField: 'repeatBySetPos',
		                                    editorType: 'dxSelectBox',
		                                    editorOptions: {
		                                        valueExpr: 'ID',
		                                        displayExpr: 'Name',
		                                        field: 'bySetPos',
		                                        dataSource: new DevExpress.data.ArrayStore({
		                                            key: 'ID',
		                                            data: [
		                                                {
		                                                    ID: 1,
		                                                    Name: '첫번째'
		                                                },
		                                                {
		                                                    ID: 2,
		                                                    Name: '두번째',
		                                                },
		                                                {
		                                                    ID: 3,
		                                                    Name: '세번째'
		                                                },
		                                                {
		                                                    ID: 4,
		                                                    Name: '네번째'
		                                                },
		                                                {
		                                                    ID: -1,
		                                                    Name: '마지막'
		                                                }
		                                            ]
		                                        }),
		                                        onValueChanged(e) {
		                                            const form  = editHolidayform;
		                                          
		                                            const repeatByDay = $('.repeatByDay').dxButtonGroup('instance');
		                                            const selectedItems = repeatByDay.option('selectedItemKeys');
		                                            if (selectedItems && !!selectedItems.length) {
		                                                if (recurrenceRule.getRules().freq === 'MONTHLY' && e.value) {
		                                                    const arrays = selectedItems.map((i) => e.value + i);
		                                                    recurrenceRule.makeRule('byDay', arrays.join(','));
		                                                } else {
		                                                    recurrenceRule.makeRule('byDay', selectedItems.join(','));
		                                                }
		                                            }
		                                            form.updateData('recurrenceRule', recurrenceRule.getRecurrenceString() || '');
		                                        }
		                                    }

		                                },
		                                {
		                                    itemType :'empty',
		                                    name :'repeatBySetPosBlank',
		                                    visible:false,
		                                },
		                            ]
		                        },
		                        {
		                            itemType :'group',
		                            name :'byDayGroup',
		                            cssClass: 'hs-repeat-yearly-last-box',
		                            colCount :1,
		                            items : [
		                                {
		                                    dataField: 'repeatByDay',
		                                    label : {
		                                        visible : false,
		                                    },
		                                    visible:false,
		                                    template: function (data, itemElement) {
		                                        const form = data.component;
		                                        itemElement.append($('<div class="repeatByDay">').dxButtonGroup({
		                                            field: 'byDay',
		                                            items: dayPolicy,
		                                            keyExpr: 'ID',
		                                            selectionMode: "multiple",
		                                            selectedItemKeys: data.component.option('formData')[data.dataField],
		                                            height: 30,
		                                            width: '100%',
		                                            buttonTemplate: function (itemData, $buttonContent) {
		                                                $buttonContent.append(`<span>${itemData.Text}</span>`);

		                                            },
		                                            onSelectionChanged(e) {

		                                                const selectedItems = e.component.option('selectedItemKeys');
		                                                if (selectedItems && selectedItems.length > 0) {
		                                                    if (recurrenceRule.getRules().freq === 'MONTHLY' && form.option("formData")['repeatBySetPos']) {
		                                                        const arrays = selectedItems.map((i) => form.option("formData")['repeatBySetPos'] + i);
		                                                        recurrenceRule.makeRule(e.component.option('field'), arrays.join(','));
		                                                    } else {
		                                                        recurrenceRule.makeRule(e.component.option('field'), selectedItems.join(','));
		                                                    }

		                                                } else {
		                                                    recurrenceRule.deleteRule(e.component.option('field'));
		                                                }
		                                                form.updateData('recurrenceRule', recurrenceRule.getRecurrenceString() || '');
		                                            }
		                                        }));
		                                    }
		                                }
		                            ]

		                        },
		                        {
		                            itemType : 'group',
		                            name : 'byMonthGroup',
		                            colCount :2,
		                            items : [
		                                {
		                                    label: {
		                                        text: '반복일자',

		                                    },
		                                    dataField: 'repeatByMonth',
		                                    visible: false,
		                                    template: function (item, itemElement) {

		                                        $('<div style="display:flex;">').append($('<div>').dxSelectBox({
		                                            field: 'byMonth',
		                                            items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
		                                            onValueChanged(e) {
		                                                const form = item.component;
		                                                
		                                                recurrenceRule.makeRule(e.component.option('field'), e.value);
		                                                form.updateData('recurrenceRule', recurrenceRule.getRecurrenceString() || '');
		                                            }
		                                        })).append(`<div style="width: 54px;margin-left: 5px;line-height: 2.5em;">월</div>`)
		                                            .appendTo(itemElement);
		                                    },
		                                },
		                                {
		                                    label: {
		                                        location: 'right',
		                                        showColon: false,
		                                        text: '일'
		                                    },
		                                    visible: false,
		                                    dataField: 'repeatByMonthDay',
		                                    cssClass: 'hs-repeat-yearly-last-box',
		                                    editorType: 'dxNumberBox',
		                                    editorOptions: {
		                                        min: 1,
		                                        max: 31,
		                                        format: '#',
		                                        field: 'byMonthDay',
		                                        showSpinButtons: true,
		                                        onValueChanged(e) {
		                                            const form = editHolidayform;
		                                            
		                                            recurrenceRule.makeRule(e.component.option('field'), e.value);
		                                            form.updateData('recurrenceRule', recurrenceRule.getRecurrenceString() || '');
		                                        }
		                                    }
		                                },
		                                {
		                                    name: "repeatByMonthDayBlank",
		                                    itemType: 'empty',
		                                    visible: false,
		                                    cssClass : 'repeat-bymonthday-blank',
		                                },
		                            ]
		                        },
		                        {
		                            itemType :'group',
		                            colCount : 2,
		                            name :'repeatRangeGroup',
		                            items :[
		                                {
		                                    dataField :'until',
		                                    editorType :'dxDateBox',
		                                    editorOptions :{
		                                        displayFormat :'yyyy-MM-dd',
		                                        field :'until',
		                                        onValueChanged(e){
		                                            if(e.value){
		                                                const form = editHolidayform;
		                                                var dateValue = e.value+'Z'
		                                                recurrenceRule.makeRule('until',dateValue);
		                                                form.updateData('recurrenceRule', recurrenceRule.getRecurrenceString() || '');
		                                            }
		                                        }
		                                    },
		                                    label:{
		                                        text :'반복종료일자',
		                                    },
		                                },
		                                {
		                                    itemType :'empty',
		                                }

		                            ]
		                        },
		                    ]
		                }

				 ],
			 }),
	  );

     return content;
     
 };


