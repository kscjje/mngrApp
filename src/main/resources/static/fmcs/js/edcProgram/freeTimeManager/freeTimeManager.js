//자유수영시간표
//그룹등록시, 다른 그룹과 요일이 겹치지 않도록 체크 할 것!
//---------------------------------
function formInit()
{
	  const dataGrid = $('#freeTimeGrid').dxDataGrid({
		    //dataSource: FREE_SCHEDULE,
		    dataSource: new DevExpress.data.ArrayStore({
		        data: FREE_SCHEDULE,
		        key: ['group_id','time_id']
		    }),		  
		    showBorders: true,
		    grouping: {
		      autoExpandAll: true,
		    },
		    searchPanel: {
		      visible: false,
		    },
		    paging: {
		      enabled:false,
		    },
		    groupPanel: {
		      visible: false,
		    },
		    headerFilter: { visible: true },
		    selection:{mode:'single'},
		    editing: {
		    	 mode: 'row',
		    	 allowAdding: true,
		         allowUpdating: true,
		         allowDeleting: true,
		         useIcons: true,
		         texts: {
		    			confirmDeleteMessage: '삭제하시겠습니까?',
		    	 },
			},
		    columns: [
		    	{
		    		dataField:'time_id',
		    		caption:'회차코드',
		    		visible:false,
		    		allowEditing:false,
		    		
		    	},
		    	{
		    		dataField:'time_name',
		    		caption:'회차명',
		    		
		    	},
		    	{
		    		caption: '시작시간',
		    		dataField: 'time_start',alignment: 'center',
		    		editorType: 'dxDateBox',
                    editorOptions: {
                        type: 'time',
                        interval: 5,
                        displayFormat: 'HH:mm',
                    },
                    validationRules: [{ type: "required" }]
		    	},
		    	{
			  		caption: '종료시간',
			  		dataField: 'time_end',alignment: 'center',
			  		editorType: 'dxDateBox',
                    editorOptions: {
                        type: 'time',
                        interval: 5,
                        displayFormat: 'HH:mm',
                    },
                    validationRules: [{ type: "required" }]
		    	},
		    	{
			  		caption: '사용여부',
			  		dataField: 'use_yn',alignment: 'center',
			  		lookup: {
						dataSource: use_gbn,
						displayExpr: "text",
						valueExpr: "value"
					},
					setCellValue: function(newData, value) {
						this.defaultSetCellValue(newData, value)
					},
			  		
		    	},
		    	{
		    		dataField: 'group_id',
		    		sortOrder: 'asc',
		    		groupIndex: 0,
		    		groupCellTemplate:function (cellElement, cellInfo) {
		    			var groupText='';
		    			if(cellInfo.data.items &&  cellInfo.data.items.length>0){
		    				groupText = cellInfo.data.items[0].group_name + ' (' + getWeektoHangul(cellInfo.data.items[0].group_weekdays)+')';
		    			}
		    			$(cellElement).css('line-height', '3em');
		    			cellElement.append($("<span class='group-title'>").text(groupText));
		    			const buttonContainer = $('<div style="display:inline-block;float:right;">')

                        buttonContainer.append($('<div>').dxButton({
                            icon: 'edit',
                            stylingMode: 'text',
                            hint:'그룹수정',
                            elementAttr: {},
                            onClick() {
                            	CreateGroupPopup(false);
                            }
                        }))
                        .append($('<div>').dxButton({
                                icon: 'trash',
                                stylingMode: 'text',
                                hint:'그룹삭제',
                                onClick() {
                                	var info = cellInfo.data.items[0].group_name;
                                    var result = DevExpress.ui.dialog.confirm(`그룹 [`+info+`]을 삭제하시겠습니까?`, '그룹삭제');
                                    result.done(function (dialogResult) {
                                        DevExpress.ui.notify({
                                            message: `The "\${dialogResult ? "Confirmed" : "Canceled"}" button was clicked`,
                                            width: 320
                                        }, 'success', 1000);
                                    });
                                }
                            }))
                            .append($('<div>').dxButton({
                            		stylingMode: 'text',
    			 		    		//icon:'plus',
                            		elementAttr: {class:'functionbtn',},
    		 		      			text:'회차등록',
    		 		      			onClick() {
    		 		      				CreateTimeForm();
    		 		      				//gridComplete.refresh();
    		 		      			},
                            }))                            
                            .appendTo(cellElement);
		   			}  
		    	},
		    	
		    ],
		    toolbar:{
				items:[
					{
						location: 'before',
		 		        widget: 'dxButton',
		 		        cssClass:'functionbtn',
		 		      	options: {
		 		      		//icon:'newfolder',
		 		      		text:'그룹등록',
		 		      		onClick() {
		 		      			CreateGroupPopup(true);
		 		      				//gridComplete.refresh();
		 		      		},
		 		      	},
					},		        		
					/* {
						location: 'before',
		 		        widget: 'dxButton',
		 		      	options: {
		 		      		icon:'edit',
		 		      		hint:'그룹수정',
		 		      		onClick() {
		 		      			CreateGroupPopup(false);
		 		      				//gridComplete.refresh();
		 		      		},
		 		      	},
		 		    },
		 		    {
		 		    	location: 'before',
				        widget: 'dxButton',
				        options: {
				        	icon: 'trash',
				          	hint:'그룹삭제',
				          	onClick() {
				          			//gridEduPrg.refresh();
				          	},
				        },
		 		    }, */
		 		    /*{
		 		    	location: 'after',
		 		    	widget: 'dxButton',
	 		      		options: {
	 		      			icon:'plus',
	 		      			hint:'회차등록',
	 		      			onClick() {
	 		      				CreateTimeForm();
	 		      				//gridComplete.refresh();
	 		      			},
	 		      		},
	 		        },		*/        		
			        {
			        	location: 'after',
			          	widget: 'dxButton',
			          	options: {
			          		icon: 'refresh',
			          		hint:'새로고침',
			          		onClick() {
			          			
			          			//gridEduPrg.refresh();
			          		},
			          	},
			        },
			       ]
		    },
		    onContentReady(e) {
		        if (!e.component.getSelectedRowKeys().length) {
		        	e.component.selectRowsByIndexes(1); 
		        }
		      },
		  }).dxDataGrid('instance');
}
