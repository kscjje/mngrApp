//Export PDF
var PDFExport = function (){
	var that=this;
	
	var popupOptions = {
	    	contentTemplate: $('<div>').append("<div class='exportPdfForm'></div>"),
	        visible: false,
	        width: 1000,
	        height: "auto",
	        onShowing: function(e) {
	        	//console.log(that.printType);
	        	e.component.option('title', that.printType==='0' ? '출석현황':'출석부');
	        	that.curIndex = 0;
	        	that.docPdf = newJsPDF('landscape');
	        	pdfDataLoad({EDC_PRGMID:that.selectedEdus[0].EDC_PRGMID});
	        	
	        },
	        onContentReady: function () {
	        	exportForm = $(".exportPdfForm").dxForm({
	                showColonAfterLabel: false,
	                showValidationSummary: false,
	                height: 480,
	                items: [{template: exportPdfGrid},]   
	            }).dxForm("instance");
	        },
	};
	function exportPdfGrid(){
		return $("<div id='exportPdfGrid'>").dxDataGrid({
			//dataSource: eduStore,
			width: '100%',
			height: '100%',
			showBorders: true,
			onContentReady:function(e){
				if(that.processIndex != that.curIndex && that.curIndex >= 0){
					that.processIndex = that.curIndex;
					//console.log("onContentReady:"+that.curIndex);
					exportPdf(that.docPdf);
				}
			}
		});
	}
	that.init = function (selEdus,printType) {
    	if(that.pdfPopup == null){
    		that.pdfPopup = $("#export_Popup").dxPopup(popupOptions).dxPopup("instance");
    	}
    	that.selectedEdus = [...selEdus];
    	that.curIndex = -1;
    	that.printType=printType;
    	that.processIndex=null;
    }
	that.popup = function (visible) {
    	that.pdfPopup.option("visible", visible==='show' ? true:false);
    }
	function createStore(loadParams){
        var d = new $.Deferred();
        d.resolve(loadParams.EDC_PRGMID ==='001' ? waitUsers3:waitUsers);  
        return d.promise();
		/*that.exportStore = new DevExpress.data.CustomStore({  
		    load: function(loadOptions) {  
		        var d = new $.Deferred();  
		        $.getJSON("URL", {...}).done(function (dat) {
		        	userDataSet();  
		            d.resolve(dat["Properties"], {totalCount: dat["Properties"].length});  
		         });
		         d.resolve(loadParams.EDC_PRGMID ==='001' ? waitUsers3:waitUsers);  
		         return d.promise();  
		     }  
		});*/
	}
	
	function pdfDataLoad(loadParams){
		createStore(loadParams).then(function(res) {
			pdfDataSet(res);
		});
		
	}
	function pdfDataSet(res){
		var grid = $('#exportPdfGrid').dxDataGrid('instance');
	   	res.push({C_SEQ_NO:'',C_USER_NO:'',C_USER_NAME:'출석인원',C_USER_GENDER:'',C_USER_AGE:'',C_USER_BIRTH:'',C_USER_BIRTH_TYPE:'',C_USER_REG_DT:'',C_USER_HP:'',C_USER_SEND_YN:'',C_EDU_START_DT:'',C_EDU_END_DT:'',D_01:false,D_02:false,D_03:false,D_04:false,D_05:false,D_06:false,D_07:false,D_08:false,D_09:false,D_10:false,D_11:false,D_12:false,D_13:false,D_14:false,D_15:false,D_16:false,D_17:false,D_18:false,D_19:false,D_20:false,D_21:false,D_22:false,D_23:false,D_24:false,D_25:false,D_26:false,D_27:false,D_28:false,D_29:false,D_30:false,D_31:false});
	   	res.push({C_SEQ_NO:'',C_USER_NO:'',C_USER_NAME:'강사확인',C_USER_GENDER:'',C_USER_AGE:'',C_USER_BIRTH:'',C_USER_BIRTH_TYPE:'',C_USER_REG_DT:'',C_USER_HP:'',C_USER_SEND_YN:'',C_EDU_START_DT:'',C_EDU_END_DT:'',D_01:false,D_02:false,D_03:false,D_04:false,D_05:false,D_06:false,D_07:false,D_08:false,D_09:false,D_10:false,D_11:false,D_12:false,D_13:false,D_14:false,D_15:false,D_16:false,D_17:false,D_18:false,D_19:false,D_20:false,D_21:false,D_22:false,D_23:false,D_24:false,D_25:false,D_26:false,D_27:false,D_28:false,D_29:false,D_30:false,D_31:false});
	   	res.push({C_SEQ_NO:'',C_USER_NO:'',C_USER_NAME:'점검확인',C_USER_GENDER:'',C_USER_AGE:'',C_USER_BIRTH:'',C_USER_BIRTH_TYPE:'',C_USER_REG_DT:'',C_USER_HP:'',C_USER_SEND_YN:'',C_EDU_START_DT:'',C_EDU_END_DT:'',D_01:false,D_02:false,D_03:false,D_04:false,D_05:false,D_06:false,D_07:false,D_08:false,D_09:false,D_10:false,D_11:false,D_12:false,D_13:false,D_14:false,D_15:false,D_16:false,D_17:false,D_18:false,D_19:false,D_20:false,D_21:false,D_22:false,D_23:false,D_24:false,D_25:false,D_26:false,D_27:false,D_28:false,D_29:false,D_30:false,D_31:false});
	   	res.push({C_SEQ_NO:'',C_USER_NO:'',C_USER_NAME:'특이사항',C_USER_GENDER:'',C_USER_AGE:'',C_USER_BIRTH:'',C_USER_BIRTH_TYPE:'',C_USER_REG_DT:'',C_USER_HP:'',C_USER_SEND_YN:'',C_EDU_START_DT:'',C_EDU_END_DT:'',D_01:false,D_02:false,D_03:false,D_04:false,D_05:false,D_06:false,D_07:false,D_08:false,D_09:false,D_10:false,D_11:false,D_12:false,D_13:false,D_14:false,D_15:false,D_16:false,D_17:false,D_18:false,D_19:false,D_20:false,D_21:false,D_22:false,D_23:false,D_24:false,D_25:false,D_26:false,D_27:false,D_28:false,D_29:false,D_30:false,D_31:false});
	   	grid.option('dataSource',res);
	   	grid.option('columns',createPdfColumnsList(res));
	   	//console.log("pdfDataSet:"+that.curIndex);
	}
	function exportPdf(docPdf){ 			
		var grid = $('#exportPdfGrid').dxDataGrid('instance');
		grid.beginUpdate();
		var dayCnt = grid.columnCount()-5;
		//console.log(grid);
		//https://lts0606.tistory.com/421
		grid.columnOption('C_USER_BIRTH', 'visible', false);			//생년월일
		grid.columnOption('C_USER_HP', 'visible', frmPrintOpts.PRINT_HP);//연락처
		grid.columnOption('C_USER_AGE', 'visible', frmPrintOpts.PRINT_AGE);//연령
		var py = pdfHeader(docPdf);
		//순번		    //회원명		//연령    //연락처	    		    //일자1~31
		var colWidths= [9];
		
		if(frmPrintOpts.PRINT_AGE && frmPrintOpts.PRINT_HP){
			colWidths.push(15);
			colWidths.push(10);
			colWidths.push(22);
		} else if(frmPrintOpts.PRINT_AGE){
			colWidths.push(26);
			colWidths.push(21);
		} else if(frmPrintOpts.PRINT_HP){
			colWidths.push(20);
			colWidths.push(27);
		} else {
			colWidths.push(47);
		}
		
		for(var d= 0; d < dayCnt; d++){
			colWidths.push(7);
		}
		
		DevExpress.pdfExporter.exportDataGrid({
			 topLeft: {x:14,y: py-window.jsPDF.MARGIN_TTERM},
			 margin: {top: 5,bottom:5},
		     jsPDFDocument: docPdf,
		     component: grid,
		     format: "A4",
			 landscape: true,
		     loadPanel: {
	                enabled: true,
	                shading: true,
	                shadingColor: "#808080"
	         },
	         columnWidths:colWidths,
		     customizeCell({ gridCell, pdfCell }) {
	        	 //console.log(pdfCell);
	        	 pdfCell.font.size=7; 
	        	 pdfCell.padding.left=0.6;
	        	 pdfCell.padding.right=0.6;
	        	 pdfCell.textColor="#000";
	        	 if(gridCell.rowType === 'header'){
	        		 pdfCell.horizontalAlign='center';
	        	 }else if (gridCell.rowType === 'data' && gridCell.column.dataField.startsWith('D_')) {
		        	 pdfCell.text = ( pdfCell.text==='true' ? 'V' :'');
		         }
		      },
		      // https://js.devexpress.com/Demos/WidgetsGallery/Demo/DataGrid/PDFCellCustomization/jQuery/Light/
		 }).then(function() {
				grid.columnOption('C_USER_HP', 'visible', true);
				grid.columnOption('C_USER_AGE', 'visible', false);
				grid.columnOption('C_USER_BIRTH', 'visible', true);		//생년월일
				grid.endUpdate();
				//console.log("exprotthe:"+that.curIndex);
				if(that.curIndex == that.selectedEdus.length-1){
					docPdf.output('dataurlnewwindow',that.printType='0'?'출석현황.pdf':'출석부.pdf');
					that.popup('hide');
				}else{
					docPdf.addPage();
					that.curIndex++;
					pdfDataLoad({EDC_PRGMID:that.selectedEdus[that.curIndex].EDC_PRGMID});
				}
				/*if(docPdf.internal.getNumberOfPages() > 1){
					docPdf.addPage();
				}*/
		 });
	}
	//헤더
	//제목//결재란(지도강사,관리자)
	//센터명//기준월
	//강좌명//강좌시작일//강좌종료일//강좌시간//정원//현원//지도강사
	function pdfHeader(doc){
		 var   tableH=null;
		 const header = '회원 출석 관리부';
		 const pageWidth = doc.internal.pageSize.getWidth();
		 
		 doc.setFontSize(15);
	     var  dimension = doc.getTextDimensions(header);
	     const headerWidth = dimension.w;
	     const headerHeight = dimension.h;
	     var x = (pageWidth - headerWidth) / 2;
	     var y = 20;
	     doc.text(header,x, y);
	     doc.line(x-5, y+headerHeight, x + headerWidth+5, y+headerHeight);
		 y = y+headerHeight;
		 //console.log(headerHeight);
		 
		 //결재란
		 doc.autoTable({
			 theme: 'plain',
			 styles: { font: "MyFont", fontStyle: "normal" }, //폰트적용
			 tableLineColor: [0, 0, 0],
			 headStyles:  { halign: 'center', valign: 'middle',  lineColor: [100, 100, 100], lineWidth: 0.1 },
			 startY: y,
		     margin: { top:0,bottom:0,left: pageWidth-60,}, //여백
		     tableWidth : 50,
		     styles: { font: "MyFont", fontStyle: "normal", fontSize: 8 }, //폰트적용
		     head: [["지도강사", "관리자"]],
		     body: [[
		                { content: "", styles: { minCellHeight: 10,cellWidth: 25,lineColor: [100, 100, 100], lineWidth: 0.1} },
		                { content: "", styles: { minCellHeight: 10,cellWidth: 25,lineColor: [100, 100, 100], lineWidth: 0.1}},
		            ],],
		 });
		
		 y = doc.lastAutoTable.finalY;
		 //시설정보
		 doc.autoTable({
			 theme: 'plain',
			 startY: y,
		     tableWidth : 195,
		     styles: { font: "MyFont", fontStyle: "normal", fontSize: 8 }, //폰트적용
		     body: [[
		    	 { content: "정관아쿠아드림파크 ", styles: {cellWidth: 145,} },
		    	 { content: "기준월 ", styles: {cellWidth: 25,} },
		    	 { content: "2023-01 ", styles: {cellWidth: 25,} },
		      ]],
		     columnWidths: [160,10,10],
		 });
		 y = doc.lastAutoTable.finalY;
		 //강좌정보
		 doc.autoTable({
			 theme: 'plain',
			 styles: { font: "MyFont", fontStyle: "normal" }, //폰트적용
			 startY: y,
			 tableWidth : 273,
			 tableLineColor: [0, 0, 0],
			 tableLineWidth: 0.1,
			 headStyles:  { halign: 'center', valign: 'middle', fillColor: [234, 234, 234], lineColor: [0, 0, 0], lineWidth: 0.1 },	
		     styles: { font: "MyFont", fontStyle: "normal", fontSize: 8 }, //폰트적용
		     head: [["강좌명",'강좌기간','강좌시간','정원','인원', '지도강사']],
		     body: [[
	             { content: that.selectedEdus[that.curIndex].EDC_PRGMNM, styles: jsPdfCellStyle(145) }, //강좌명
	             { content: "2023-01", styles: jsPdfCellStyle(25,'center')},							//강좌기간
	             { content: that.selectedEdus[that.curIndex].EDC_STIME +' ~ ' +that.selectedEdus[that.curIndex].EDC_ETIME, styles: jsPdfCellStyle(25,'center')},						//강좌시간	
	             { content: that.selectedEdus[that.curIndex].EDC_PNCPA + " 명", styles: jsPdfCellStyle(25,'right')},									//정원
	             { content: that.selectedEdus[that.curIndex].EDC_NOKORI_CNT + " 명", styles: jsPdfCellStyle(25,'right')},									//인원
	             { content: that.selectedEdus[that.curIndex].INSTRCTR_NAME, styles: jsPdfCellStyle(28,'center')},								//강사명
	         ],],
	         didDrawCell: function(hookData) {
		    	 tableH=hookData.table;
		     }
		 });
		 y = doc.lastAutoTable.finalY;
	 
		 return y;
	} 
	function createPdfColumnsList(resData) 
	{
		var resultColumns = {};
		resultColumns = [
			{dataField: 'C_SEQ_NO',caption: '순번',width:100, dataType: "number", format: def_numberFormat},
			{dataField: 'C_USER_NAME',caption: '회원명',width:100,alignment: 'center' },
			{dataField: 'C_USER_AGE',caption: '연령',width:50,dataType: "number",visible:false },
			{dataField: 'C_USER_HP',caption: '연락처',width:150,alignment: 'center' },
			{dataField: 'C_USER_BIRTH',caption: '생년월일',width:100,alignment: 'center' },
			
		];
		/*
		 * var
		 * srchMonth=toDateMonthFormat($('#attendanceCondition').dxForm('instance').getEditor('SEARCH_DATE_EDU').option('value'));
		 * if(isYearMonthFormat(srchMonth)){ var days =
		 * moment(srchMonth).daysInMonth(); alert(days); }
		 */
		// if(storeUsers.data){
		  
		if(resData){
			var keys = Object.keys(resData[0]); // 키를 가져옵니다. 이때, keys 는 반복가능한 객체가 됩니다.
			//console.log(keys);
		    for (var i=0; i<keys.length; i++) {
		    	if( keys[i].startsWith('D_') ){
		    		var vCaption = keys[i].slice(2);
		    		moment.locale('ko');
		    		let iDays = moment("2023-01-" + vCaption).format("dd");
		    		resultColumns.push({
		    			caption:iDays,
		    			columns: [{dataField:keys[i],caption:vCaption,width:30,showEditorAlways: true,}],
		    		});
		    	}
		    }

		}
		//console.log('createPdfColumnsList');
		return resultColumns; 
	}
	
}
