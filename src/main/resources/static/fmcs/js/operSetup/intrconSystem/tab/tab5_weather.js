//날씨서비스 연계 설정
function CreateTab5Init()
{
	if(Intcon.formWeather){
		weatherformLoad();
	}else{
		CreateTab5form();
	}
}
function CreateTab5form()	
{
	$('#formWeather').dxForm({
		showColonAfterLabel: false,
		colCount:9,
	    items: [
	    	{colSpan:2,dataField:'WEATHER_YN',label: {text:'날씨지역여부'},
	    		editorType: 'dxSelectBox',
				editorOptions: {  
					dataSource:use_gbn,
		        	valueExpr: 'value', 
		        	displayExpr: 'text',
		        },
	    	},
	    	{
	    		itemType: 'button',colSpan:7,
			    horizontalAlignment: 'right',
			    buttonOptions: {
			    	text: '저장하기',
			        type: 'success',
			        useSubmitBehavior: true,
			        onClick(e){
			        	piscformSave();
			        }
			    },
			},
		   	{colSpan:2,dataField:'WEATHER_AREA_X',label: {text:'날씨 지역 격자 X 좌표'},
				editorType:'dxTextBox',
	    	},
	    	{colSpan:2,dataField:'WEATHER_AREA_Y',label: {text:'날씨 지역 격자 Y 좌표'},
	    		editorType:'dxTextBox',
	    		editorOptions:{
	    			
	    		}
	    	},
	    	{itemType:'empty',colSpan:5},
	    	{colSpan:2,dataField:'WEATHER_LATITUDE',label: {text:'날씨지역 위도 좌표'},
				editorType:'dxTextBox',
	    	},
	    	{colSpan:2,dataField:'WEATHER_HARDNESS',label: {text:'날씨지역 경도 좌표'},
	    		editorType:'dxTextBox',
	    		editorOptions:{
	    			
	    		}
	    	},
		],
		onInitialized: function(e) {
			Intcon.formWeather= e.component;
			console.log('formWeather-init');
			weatherformLoad();
		}
	});
}
function weatherformLoad(){
	console.log('weatherformLoad');
	var defalutData={
			WEATHER_YN:'0',
			WEATHER_AREA_X:'',
			WEATHER_AREA_Y:'',
			WEATHER_LATITUDE:'',
			WEATHER_HARDNESS:'',
	};
	Intcon.formWeather.option('formData',defalutData);
	/*$.getJSON(
	    "/backOffice/menu/order"
	    , {M_UPPER_CD: $("#M_UPPER_CD").val(), M_CD: $("#M_CD").val(), }
	    , function (data) {
	        if (data.result == "success") {
	        	Intcon.formWeather.option('formData',data);
	        }
	    }
	);*/
}
function weatherformSave(){
	console.log('weatherformSave');
	$.getJSON(
	    "/backOffice/menu/order"
	    , Intcon.formWeather.option('formData')
	    , function (data) {
	        if (data.result == "success") {
	        		
	        }
	    }
	);
}