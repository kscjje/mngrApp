<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<script>window.jQuery || document.write(decodeURIComponent('%3Cscript src="js/jquery.min.js"%3E%3C/script%3E'))</script>
<script>
var employee = { ID: 1, Position: "E", "EmployeeList ": "" };
var positions = [{value:"C",text:'CEO' }, {value:"E",text:"Employee" }];


$(function() {
  var formInstance = $("#form")
    .dxForm({
      colCount: 2,
      formData: employee,
      items: [
        "ID",
        {
          dataField: "Position",
          editorType: "dxSelectBox",
          editorOptions: {
        	  dataSource: positions,
        	    displayExpr: 'text',
        	    valueExpr: 'value',
            onValueChanged: function(e) {
              // to reload sub types when there is a change in type
              var EmpSelectBox = $("#form")
                .dxForm("instance")
                .getEditor("Employee");
              if (e.value == "C") {
            	  
                formInstance.itemOption("Employee", "editorType", "dxTextBox");
                formInstance.updateData("Employee", "NAME of CEO");
              } else {
                formInstance.itemOption(
                  "Employee",
                  "editorType",
                  "dxSelectBox"
                );
                formInstance.itemOption("Employee", "editorOptions", {
                  items: ["name1", "name2"]
                });
              }
            }
          }
        },
        {
          dataField: "Employee",
          editorType: employee.Position === "CEO" ? "dxTextBox" : "dxSelectBox",
          editorOptions: employee.Position === "CEO" ? undefined : {
            items: ["name1", "name2"]
          }
        }
      ]
    })
    .dxForm("instance");
});
</script>
 <div id="form"></div>