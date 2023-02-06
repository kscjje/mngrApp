//신청제한
let tab3form=null;
var tab3gridDropdown=null;
let tab3formData=null;
function CreateTab3Init()
{
	if(tab3form!= null){
		reg_opt_form.option("visible",true);
		return;
	}	
	tab3formData={
		EDC_GENDER_TYPE:'WM',
		EDC_ADDRESS_TYPE:'1',
		EDC_ADDRESS_ARR:['0','1'],
	}
	tab3form = $('#reg_opt_form').dxForm({
		showColonAfterLabel: false,
		formData:tab3formData,
		colCount:6,
        items: [
        	{label: {visible:false},cssClass:'grp_low_height',
				editorType: 'dxCheckBox',
				editorOptions:{
					text:'신청가능 성별',
					value:false,
				}
			},
        	{dataField:'EDC_GENDER_TYPE' ,label: {visible:false},editorType:'dxSelectBox',
        		editorOptions:{
        			dataSource:gender_opt_gbn, valueExpr: 'value',displayExpr: 'text',
			    }
        	},
        	{
        		colSpan:4,
				itemType: 'button',
				buttonOptions: {
					text: '일괄적용하기',
					type: 'success',
					useSubmitBehavior: true,
				},
			},
			{label: {visible:false},cssClass:'grp_low_height',
				editorType: 'dxCheckBox',
				editorOptions:{
					text:'신청 거주지 인증 여부',
					value:false,
				}
			},
			{dataField:'EDC_ADDRESS_TYPE' ,label: {visible:false},editorType:'dxSelectBox',
				editorOptions:{
					dataSource:use_gbn, valueExpr: 'value',displayExpr: 'text',
			    }
			},
			{itemType:'empty',colSpan:4,},
			{label: {visible:false},cssClass:'grp_low_height',
				editorType: 'dxCheckBox',
				editorOptions:{
					text:'거주 인증 지역 설정',
					value:false,
				}
			},
			{colSpan:5,dataField:'EDC_ADDRESS_ARR',label: {visible:false},
				editorType:'dxTagBox',
				editorOptions:{
					dataSource: local_opt_gbn,
					displayExpr: 'text',
					valueExpr: 'value',
					placeholder:'- 거주 인증 지역 선택 -',
		            showSelectionControls:false,
		            showClearButton:true,
		            showDropDownButton:true,
		            //hideSelectedItems: true,
		            /*onOpened: function(e) {  
		                $('.dx-list-select-all').hide();  
		            } ,*/ 
		            onItemClick: function (e) {
		            	//console.log(e);
		            	var org_value = tab3form.option("formData");
		            	var allCode = local_opt_gbn[0].value;
	        			var idx = (org_value.EDC_ADDRESS_ARR ? org_value.EDC_ADDRESS_ARR.indexOf(allCode) :-1);
	        			//console.log(idx);
	        			if(idx>=0 && e.itemData.value===allCode){
	        				tab3form.updateData('EDC_ADDRESS_ARR',[e.itemData.value]);
		            		idx=-1;
		        		}
		            	if(idx >= 0){
		            		org_value.EDC_ADDRESS_ARR.splice(idx, 1); 
		            		tab3form.updateData('EDC_ADDRESS_ARR',org_value.EDC_ADDRESS_ARR);
		        		}
		            }
		        }
			},
			{label: {visible:false},cssClass:'grp_low_height',
				editorType: 'dxCheckBox',
				editorOptions:{
					text:'신청횟수 제한 여부',
					value:false,
					onContentReady: function (e) {  
				        var custcount = 1, taskcount = 1;  
				        window.setTimeout(function() {  
				        	const infoIcon = '<i id="reqCnthelpCalc" class="dx-icon dx-icon-help" style="vertical-align:middle;"></i>';
				            e.element.find(".dx-checkbox-text")  
				                .html("<div id='template-content'>신청횟수 제한 여부"+infoIcon+"</div>");
				        }, 0);  
				    }  
				}
			},
			{label: {text: '신청횟수 제한 여부',
					template: function (data, labelElement) {
						$('<div>').dxTooltip({
							target: '#reqCnthelpCalc',
							showEvent: 'dxhoverstart',
							hideEvent: 'dxhoverend',
							position: "bottom",
							contentTemplate(args) {
								var result = reqCnthelp.replace(/(\n|\r\n)/g, '<br>');
								args.html('<div id="tab3_tooltipEx" style="text-align:left;">'+ result +'</div>');
							},
						}).appendTo(labelElement);
					},
				},
				editorType:'dxSelectBox',
				editorOptions:{
					dataSource:restrict_gbn, valueExpr: 'value',displayExpr: 'text',value: '0',
					elementAttr:{
						class:'margin-left-m11'
					}
				}
			},
			{label: {text:'신청 제한 범위'},editorType:'dxSelectBox',
				editorOptions:{
					disabled:true,
					dataSource:[{value:'0',text:'운영상품분류별'},{value:'1',text:'강좌검색분류별'},{value:'2',text:'강좌별'}], valueExpr: 'value',displayExpr: 'text',value: '0',
				}
			},
			{label: {text:'신청 제한 기간'},editorType:'dxSelectBox',
	    		editorOptions:{
	    			disabled:true,
		    		dataSource:[{value:'0',text:'월간'},{value:'1',text:'년간'},{value:'1',text:'수업기간내'}], valueExpr: 'value',displayExpr: 'text',value: '0',
		    	}
	    	},
			{label: {text:'신청 제한 횟수'},editorType:'dxTextBox',editorOptions:{disabled:true,}},
			{itemType:'empty'},
			{label: {visible:false},cssClass:'grp_low_height',
				editorType: 'dxCheckBox',
				editorOptions:{
					text:'비대면감면인증 적용',
					value:false,
				}
			},
		],
		onInitialized: function(e) {
			var customHandlerInit = function (e) {
				var orgData = e.component.option("formData");
				
				/*var bDisabled = orgData.EDC_ADDRESS_TYPE=='0' ? true:false; 
				e.component.getEditor("EDC_ADDRESS_ARR").option("disabled", bDisabled);  */
				
			}
			e.component.on("contentReady", customHandlerInit);
		},
		onFieldDataChanged: function (e) {
			//온라인/방문 정원 설정 //접수경로 //추가접수운영기준 
			if(e.dataField=='EDC_ADDRESS_TYPE'){ 
				e.component.repaint();
			}
		}
	}
	).dxForm("instance");
}



