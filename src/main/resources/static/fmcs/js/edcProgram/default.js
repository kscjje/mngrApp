/**
 * 
 */
function editorOptionsTimePickerTemplate(orgValue) {
	var editorOpt={
		pickerType: 'list',
		type: 'time',
		interval: 10,
		value: orgValue,
		displayFormat: 'HH:mm',
	};
	
    return editorOpt;
}
function getWeektoHangul(weekdays) {
	var week = new Array('일', '월', '화', '수', '목', '금', '토','공휴일');
	var ret='';
	if(weekdays && weekdays.length>0){
		for(var i=0; i<weekdays.length; i++){
			ret = ret+ week[weekdays[i]*1]+",";
		}
		ret =ret.slice(0, -1);		
	}
	
	return ret;
}
function getWeektoArray(weekdays) {
	var week = new Array('일', '월', '화', '수', '목', '금', '토','공휴일');
	var ret=[];
	if(weekdays && weekdays.length>0){
		for(var i=0; i<weekdays.length; i++){
			if(weekdays[i]*1<7){ //공휴일은 제외
				ret.push({text:week[weekdays[i]*1],value:weekdays[i]});
			}
		}
	}
	
	return ret;
}
function createCategoryDataSource(ctgType){
///ctgType	//1 강좌검색분류	//0운영상품분류 
		return (new DevExpress.data.DataSource({
		      store: new DevExpress.data.ArrayStore({
			        key: 'CTGCD',
			        data: classCategories,
			      }),
		    })
		);
	
}

const syncTreeViewSelection = function (treeViewInstance, value) {
	if (!value) {
	  treeViewInstance.unselectAll();
	} else {
	  treeViewInstance.selectItem(value);
	}
};
function  createCategoryDorpdownTreeTemplateCreate(elementid,sMode,ctgType,initValue) {
	if(ctgType==='1'){//강좌검색분류 
		
	}else{//운영상품분류
		
	}
	if(sMode==='single'){
		return ($("<div id='"+elementid+"'>").dxDropDownBox({
			value: initValue,
			valueExpr: 'CTGCD',
			displayExpr: 'CTGNM_DISP',
			placeholder: '-선택-',
			dataSource: createCategoryDataSource(ctgType),
			showClearButton:false,
			
			contentTemplate(e) {
				const value = e.component.option('value');
			    const $treeView = $('<div id="categoryTree">').dxTreeView({
			        dataSource: e.component.getDataSource(),
			        dataStructure: 'plain',
			        keyExpr: 'CTGCD',
			        parentIdExpr: 'PRNCTGCD',
			        displayExpr: 'CTGNM_DISP',
			        selectionMode: sMode,
			        showCheckBoxesMode: "none" ,
			        selectByClick: true,
			        onContentReady(args) {
			          syncTreeViewSelection(args.component, value);
			        },
			        selectNodesRecursive: false,
			        onItemSelectionChanged(args) {
			          const selectedKeys = args.component.getSelectedNodeKeys();
			          e.component.option('value', selectedKeys);
			        },
			    });
			    treeView = $treeView.dxTreeView('instance');
			    e.component.on('valueChanged', (args) => {
			        syncTreeViewSelection(treeView, args.value);
			        e.component.close();
			    });
			    return $treeView;
			},     
		}));
	}else{
		return ($("<div id='"+elementid+"'>").dxDropDownBox({
			value: initValue,
			valueExpr: 'CTGCD',
			displayExpr: 'CTGNM_DISP',
			placeholder: '전체',
			dataSource: createCategoryDataSource(ctgType),
			showClearButton:true,
			
			contentTemplate(e) {
				const value = e.component.option('value');
			    const $treeView = $('<div id="categoryTree">').dxTreeView({
			        dataSource: e.component.getDataSource(),
			        dataStructure: 'plain',
			        keyExpr: 'CTGCD',
			        parentIdExpr: 'PRNCTGCD',
			        displayExpr: 'CTGNM_DISP',
			        selectionMode: sMode,
			        showCheckBoxesMode: 'normal',
			        selectByClick: true,
			        onContentReady(args) {
			          syncTreeViewSelection(args.component, value);
			        },
			        selectNodesRecursive: false,
			        onItemSelectionChanged(args) {
			          const selectedKeys = args.component.getSelectedNodeKeys();
			          e.component.option('value', selectedKeys);
			        },
			    });
			    treeView = $treeView.dxTreeView('instance');
			    e.component.on('valueChanged', (args) => {
			        syncTreeViewSelection(treeView, args.value);
			        e.component.close();
			    });
			    return $treeView;
			},     
		}));
	}
		
		
		
	
}

function createAgeOptDataSource(){
	return (new DevExpress.data.DataSource({
	      store: new DevExpress.data.ArrayStore({
		        key: 'AGE_CD',
		        data: AGE_ITEMS,
		      }),
	    })
	);
}	
function createAgeOrgDataSource(){
	return (new DevExpress.data.DataSource({
	      store: new DevExpress.data.ArrayStore({
		        key: 'AGE_CD',
		        data: AGE_ITEMS,
		      }),
	    })
	);
}
function  gridOrgAgeTemplateCreate(elementid,data, itemElement,gridDropdown) {
	itemElement.append( $("<div id='"+elementid+"'>")
		.dxDropDownBox({
		    value: [0],
		    valueExpr: 'AGE_CD',
		    placeholder: '연령 선택...',
		    displayExpr: 'AGE_NAME',
		    showClearButton: true,
		    dataSource: createAgeOrgDataSource(),
		    dropDownOptions: {
	            toolbarItems: [{
	                toolbar: 'bottom',
	                location: 'after',
	                widget: "dxButton", 
	                options: {
	                    text: "선택",
	                    onClick: ()=>{  }
	                }
	            }],
		    },
		    contentTemplate(e) {
		      const v = e.component.option('value');
		      const $dataGrid4 = $('<div >').dxDataGrid({
		        dataSource: e.component.getDataSource(),
		        columns: createAgeColumnsDropDown(false),
		        hoverStateEnabled: true,
		        scrolling: { mode: 'virtual' },
		        height: 150,
		        selection: {mode: 'multiple',showCheckBoxesMode:'always',},
		        selectedRowKeys: v,
		        onSelectionChanged(selectedItems) {
		          const keys = selectedItems.selectedRowKeys;
		          e.component.option('value', keys);
		        },
		      });
		      
		      gridDropdown = $dataGrid4.dxDataGrid('instance');
		      e.component.on("valueChanged", function(args){  
		    	  var value = args.value;  
		    	  gridDropdown.selectRows(value, false);  
		      });  
	  
		      return $dataGrid4;
		    },
		  }));
}

//---------------------------------
//연령선택-datagrid columns 생성 
//---------------------------------
function createAgeColumnsDropDown() 
{
	var resultColumns = {};
	
	resultColumns = [
		{dataField: 'AGE_NAME',caption: '연령구분명',alignment: 'left',
			 validationRules: [{
	                type: "required"
	            }]},
		{dataField: 'AGE_START',caption: '시작나이' , dataType: "number",
	            	validationRules: [{
		                type: "required"
		            }],
	            	format: def_numberFormat},
		{dataField: 'AGE_END',caption: '종료나이',	dataType: "number", format: def_numberFormat	},
		{dataField: 'AGE_TYPE',caption: '연령산출기준',
			lookup: {
				dataSource: age_gbn,
				displayExpr: 'text',
				valueExpr: 'value',
			},
		},
		{dataField: 'AGE_CD',caption:'연령구분코드',visible:false},
	];
	
	return resultColumns;
}
//연령 구분 등록
var ageRegPopup=null;

function CreateAgeRegPopup()
{
	if(ageRegPopup){
		ageRegPopup=null;
		$("#ageReg_popup").dxPopup("dispose");
		
	}
	ageRegPopup=$("#ageReg_popup").dxPopup({
		contentTemplate: ageRegTemplate,
		visible: true,
		title: '연령 구분 등록',
		width:420,
        height:320,
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
			    	text: '저장',
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
			    		ageRegPopup.hide();
			    		ageRegPopup=null;
			    		$("#ageReg_popup").dxPopup("dispose");
			    	},
			    },
		}],
	}).dxPopup('instance');
}
const ageRegTemplate = function () {
	 const content = $("<div />");
	 content.append(
			 $("<div id='ageRegMainForm'>").dxForm({
				 showColonAfterLabel: false,
				 cssClass:"style3_right",
				 items:[
					 {label:{text:'연령구분명'},editorType: 'dxTextBox'},
					 {label:{text:'시작나이'},editorType: 'dxNumberBox',editorOptions:{min:0,max:200}},
					 {label:{text:'종료나이'},editorType: 'dxNumberBox',editorOptions:{min:0,max:200}},
					 {label:{text:'연령산출기준'},editorType: 'dxSelectBox',
						 editorOptions: {
	         	    	  dataSource:age_gbn,
			        	  valueExpr: 'value', 
			        	  displayExpr: 'text',
			        	  value: '0',
	         	       },},
					],
			 }));
	
     return content;
};
function toNumberFormat(value){
	 return DevExpress.localization.formatNumber(value,def_numberFormat);
}
function toDateMonthFormat(value){
	 return DevExpress.localization.formatDate(value,'yyyy-MM');
}
function toDateFormat(value){
	 return DevExpress.localization.formatDate(value,'yyyy-MM-dd');
}
function toTimeFormat(value){
	 return DevExpress.localization.formatDate(value,'HH:mm');
}
function toDateTimeFormat(value){
	 return DevExpress.localization.formatDate(value,'yyyy-MM-dd HH:mm:ss');
}
function isYearMonthFormat(value){
	if(value){
		var regex = RegExp(/^\d{4}-(0[1-9]|1[012])$/);
		return (regex.test(value));
	}else{
		return false;
	}
}
function setAllowEditing(gridInstance,bAllowEditing,exceptsColumns){
	var columns = gridInstance.option("columns");
	gridInstance.beginUpdate();
	columns.forEach(function (column) {
		var idx = exceptsColumns.indexOf(column.dataField);
		if( idx >=0){
			gridInstance.columnOption(column.dataField, "allowEditing", false);
		}else{
			gridInstance.columnOption(column.dataField, "allowEditing", bAllowEditing);
		}
	});
	gridInstance.endUpdate();
}
function isLegalHoliday(date) {
    const localeDate = date.toLocaleDateString();
    return legal_holiday.filter(({
                                date, name
                            }) => DevExpress.localization.parseDate(date, 'yyyy-MM-dd').toLocaleDateString() === localeDate).length > 0;
}

function legalHolidayText(date) {
    const localeDate = date.toLocaleDateString();
    const selectedHoliday = legal_holiday.find(({
                                               date, name
                                           }) => DevExpress.localization.parseDate(date, 'yyyy-MM-dd').toLocaleDateString() === localeDate);
    if (selectedHoliday) {
        return selectedHoliday.name;
    }
}
function isWeekend(date) {
    const day = date.getDay();
    return day === 0 || day === 6;
}
function setToDayEnd(date) {
    var untilDate = date.removeTime();
    untilDate.setDate(untilDate.getDate() + 1);
    untilDate.setSeconds(untilDate.getSeconds() - 1);
    //  untilDate.setUTCHours(23);
    return untilDate;
}
Date.prototype.removeTime = function () {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate());
};
Date.prototype.toUntilString = function () {

    return DevExpress.localization.formatDate(this, 'yyyyMMddTHHmmss')+'Z';
}
/*function toUntilString(value) {
	 return DevExpress.localization.formatDate(value, 'yyyyMMddTHHmmss')+'Z';
}*/
function WeekSelectBoxValueChange(formW,selectedValue){
	if(!formW) return;
	if (selectedValue !== null) {
		 //전체, 평일,월수금,
		 if(selectedValue  == '0' || selectedValue  == '1' || selectedValue  == '3'){
			 formW.getEditor('SRCH_MON').option('value',true);
			 formW.getEditor('SRCH_WED').option('value',true);
			 formW.getEditor('SRCH_FRI').option('value',true);
		 }//전체, 평일,화목,
		if(selectedValue  == '0' || selectedValue  == '1' || selectedValue  == '4'){
			formW.getEditor('SRCH_TUE').option('value',true);
			formW.getEditor('SRCH_THU').option('value',true);
		}
		//전체, 주말
		if(selectedValue  == '0' || selectedValue  == '2' ){
			formW.getEditor('SRCH_SAT').option('value',true);
			formW.getEditor('SRCH_SUN').option('value',true);
		}
		//평일
		if(selectedValue  == '1'){
			formW.getEditor('SRCH_SAT').option('value',false);
			formW.getEditor('SRCH_SUN').option('value',false);
		}
		//주말
		if(selectedValue  == '2'){
			formW.getEditor('SRCH_MON').option('value',false);
			formW.getEditor('SRCH_TUE').option('value',false);
			formW.getEditor('SRCH_WED').option('value',false);
			formW.getEditor('SRCH_THU').option('value',false);
			formW.getEditor('SRCH_FRI').option('value',false);
		}
		//월,수,금
		if(selectedValue  == '3'){
			formW.getEditor('SRCH_TUE').option('value',false);
			formW.getEditor('SRCH_THU').option('value',false);
			formW.getEditor('SRCH_SAT').option('value',false);
			formW.getEditor('SRCH_SUN').option('value',false);
		}
		//화,목
		if(selectedValue  == '4'){
			formW.getEditor('SRCH_MON').option('value',false);
			formW.getEditor('SRCH_WED').option('value',false);
			formW.getEditor('SRCH_FRI').option('value',false);
			formW.getEditor('SRCH_SAT').option('value',false);
			formW.getEditor('SRCH_SUN').option('value',false);
		}
	}
}

const boldLabelTemplate = function (data, labelElement) {
	labelElement.append("<div id='template-content'><span class='dx-field-item-label-text boldlabel'>" +data.text +"</span></div>");
}

const timePickerInitialized =(e)=>{
  	var initValue=e.component.option("value");
  	if(initValue.length <4){//
  		initValue='2022-01-01T00:00';
  		e.component.option("value",initValue);
  	}else  	if(initValue.length == 4){//0000
  		//2,2
  		initValue='2022-01-01T'+initValue.substring(0, 2) + ":" +initValue.substring(2) ;
  		e.component.option("value",initValue);
  	}else if(initValue.length >4 && initValue.length < 6){
  		initValue='2022-01-01T'+initValue;
  		e.component.option("value",initValue);
  	}
}
function getHodidayTypeName(holidayType){
	return (holidayTypes && holidayTypes.find(item => item.value==holidayType))
}
function conditionAddAll(orgData){
	var gbnAll =[...orgData];
	gbnAll.unshift({value:'',text:'전체'});
	return gbnAll; 
} 