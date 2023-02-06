const def_numberFormat={type: "fixedPoint",precision: 0};

//function getHtmlOption(pheight,mode) {
// 	var htmloption = 
// 		{	height: pheight,
// 			imageUpload: {tabs: ['file', 'url'],fileUploadMode: 'base64',},
// 			toolbar: {
//              		    	items:  (mode=='view'?[]: [
//              		        'undo', 'redo', 'separator',
//              		        {
//              		          name: 'size',
//              		          acceptedValues: ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt'],
//              		        },
//              		        {
//              		          name: 'font',
//              		          acceptedValues: ['Arial', 'Courier New', 'Georgia', 'Impact', 'Lucida Console', 'Tahoma', 'Times New Roman', 'Verdana'],
//              		        },
//              		        'separator', 'bold', 'italic', 'strike', 'underline', 'separator',
//              		        'alignLeft', 'alignCenter', 'alignRight', 'alignJustify', 'separator',
//              		        'orderedList', 'bulletList', 'separator',
//              		        {
//              		          name: 'header',
//              		          acceptedValues: [false, 1, 2, 3, 4, 5],
//              		        }, 'separator',
//              		        'color', 'background', 'separator',
//              		        'link', 'image', 'separator',
//              		        'clear', 'codeBlock', 'blockquote', 'separator',
//              		        'insertTable', 'deleteTable',
//              		        'insertRowAbove', 'insertRowBelow', 'deleteRow',
//              		        'insertColumnLeft', 'insertColumnRight', 'deleteColumn',
//              		      ]),
//              		  },
// 				mediaResizing: {
//    		      enabled: true,
//    		    },
// 		};
//              		    
//         return htmloption;
//}

function editorInit(myHeight) {
	setTimeout(function(){
	 	$("textarea.txtEditor").each(function(idx) {
	 		if ($(this).attr("ckinit")) {
	 			return true;	 			
	 		}
	 		
	 		var editorID = $(this).attr("id");
	 		
	 		if (!editorID) {
	 			editorID = "cstEditor_" + idx;
	 			$(this).attr("id", editorID);
	 		}
	 		
	 		$(this).attr("ckinit", "true");
	 		
			if ($(this).prop("readonly")) {
				var html = $(this).val();
				if ($(this).prev().attr("class") == "previewEditor") {
					$(this).prev().html(html);
				} else {
					$(this).before("<div class='previewEditor'>" + html + "</div>");					
				}
				
				$(this).hide();
			} else {				
				if (myHeight) {
					CKEDITOR.replace(editorID, {
						height: myHeight + 'px'
					});	
				} else {
					CKEDITOR.replace(editorID);	
				}		
			}
		}); 
	}, 100);
}

function gridInit() {
	$(".dx-datagrid").parent().each(function() {
		try {
			if ($(this).dxDataGrid("instance").option("showColumnHeaders")) {
				$(this).dxDataGrid("instance").option("columnResizingMode", "widget"); 
			}
		} catch(e) {}
	});
}

//item 찾기
function getItem(items,dataFieldName){
	var item=null;
	for ( var i=0; i< items.length; i++){
		if(items[i].itemType && items[i].itemType=='group'){
			item = getItem(items[i].items,dataFieldName);
			if(item != null){
				return item;
			}
		}else
		if(items[i].dataField==dataFieldName){
			return items[i];
		}
  };
	return null;
}

function setFormData(selector, data) {
	if (data) {
		$(selector).dxForm("instance").option("formData", data);		
	} else {
		$(selector).dxForm("instance").option("formData", {});
	}
}

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

function previewUploadImage(input, selector) {
	if (input) {  
	    var reader = new FileReader();  
	    
	    reader.onload = function (e) {  
	        $(selector).attr('src', e.target.result);  
	    }  
	    reader.readAsDataURL(input);  
	}  
}

var showAlert = function(msg, title, callbackFunction) {  
    var result = DevExpress.ui.dialog.alert(msg, title, true);  
    result.done(function () {  
        if (callbackFunction)  
            callbackFunction();  
    });  
};  

var showConfirm = function(msg, title, confirmFunction, cancelCallback) {  
    var result = DevExpress.ui.dialog.confirm(msg, title, true);  
    result.done(function (result) { 
    	if (result) {
            if (confirmFunction)  
            	confirmFunction();  
    	} else {
            if (cancelCallback)  
            	cancelCallback();  
    	}
    });  
};  

jQuery.fn.serializeObject = function() {
    var obj = null;
    try {
        if (this[0].tagName && this[0].tagName.toUpperCase() == "FORM") {
            var arr = this.serializeArray();
            if (arr) {
                obj = {};
                jQuery.each(arr, function() {
                    obj[this.name] = this.value;
                });
            }
        }
    } catch (e) {
        console.log(e.message);
    } finally {
    }
 
    return obj;
};
