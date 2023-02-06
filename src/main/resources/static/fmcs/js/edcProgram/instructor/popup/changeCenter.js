var centerPopup=null;
//---------------------------------
//타시설강사목록-datagrid columns 생성 
//---------------------------------
function createColumnsOtherList() 
{
	var resultColumns = {};

	resultColumns = [{dataField: 'PART_NM',caption: '소속시설'},
					 {dataField: 'KOR_NAME',caption: '강사명'},
					 {dataField: 'TEL_NO',caption: '휴대전화'}];
	
	return resultColumns;
}
function createChangeCenter()
{
	
	if(centerPopup){
		centerPopup=null;
		$("#changecenter_popup").dxPopup("dispose");
		
	}
	centerPopup=$("#changecenter_popup").dxPopup({
		contentTemplate: popupContentTemplate,
		visible: true,
		title: '소속시설변경',
		width:500,
        height:500,
		position: {
			my: 'center',
		    at: 'center',
		    of: window
		},
		dragEnabled: true,
		onShown(){
			$('.centerlist').dxList({
				dataSource: centers,
			    displayExpr: 'text',
			    valueExpr: 'value',
			    selectionMode: 'single',
			    scrollingEnabled:true,
			});
		},
		toolbarItems: [{
			widget: 'dxButton',
			toolbar: 'bottom',
		    location: 'after',
		    options: {
			    	text: '소속시설변경',
			        onClick() {
			    		const message = `Email is sent to ${employee.FirstName} ${employee.LastName}`;
			    		DevExpress.ui.notify({
				            message,
				            position: {
				            	my: 'center top',
				            	at: 'center top',
				            },
			    		}, 'success', 3000);
			    	},
			    },
		}, {
			widget: 'dxButton',
			toolbar: 'bottom',
		    location: 'after',
		    options: {
			    	text: '취소',
			        onClick() {
			    		centerPopup.hide();
			    	},
			    },
		}],
	}).dxPopup('instance');
}
//소속시설변경
const popupContentTemplate = function () {
    return $('<div>').append('<div class="subject">타시설리스트</div><div><div class="centerlist"></div></div>');
 };

