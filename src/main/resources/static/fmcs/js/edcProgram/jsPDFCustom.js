window.jsPDF = window.jspdf.jsPDF

//( 방향 , 단위 , 형식 , 압축 );
//portrait/landscape
//unit -pt (points), mm (default), cm, in
//"a4" (default), "a5", "letter", "legal". 
function newJsPDF(orientation,unit,format){
	if(!orientation){
		orientation='portrait';
	}
	if(!unit){
		unit='mm';
	}
	if(!format){
		format='a4';
	}
	const doc = new jsPDF(orientation,unit,format);
	doc.addFileToVFS("MyFont.ttf", NanumSquareNeo_aLt);
	doc.addFont("MyFont.ttf", "MyFont", "normal");
	doc.setFont("MyFont");
	
	//console.log(doc.getLineHeightFactor());
	//doc.setLineHeightFactor(0.5);//default:1.15
	window.jsPDF.MARGIN_TTERM = 2;
	
	return doc;
}
function jsPdfCellStyle(width,halign){
	
	var ret = {cellWidth: width,lineColor: [100, 100, 100], lineWidth: 0.1};
	if(halign){
		ret.halign=halign;
	}
	
	return ret;
}