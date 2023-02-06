<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<script>window.jQuery || document.write(decodeURIComponent('%3Cscript src="js/jquery.min.js"%3E%3C/script%3E'))</script>
<script src="/backOffice/ckeditor/ckeditor.js"></script>
<script src="/fmcs/js/code/dataSource.js"></script><!-- 가공데이터 -->
<style>
.shadow_box{
	height: 80vh;
    width: 48.92%;
    float: left;
    padding: 10px;
    margin: 10px;
    margin-bottom: 10px;
    background: #F4F4F4;
	box-shadow: 0 1px 4px 0 rgba(0,0,0,0.25);
}
.dx-datagrid-rowsview .dx-row {
    
    height: 35px;
}
</style>
<script>
$(document).ready(function () {
	const URL = 'http://localhost:8090/api/v1/fmcs/gijang/bsis/';

	const loadPanel = $('#loadPanel').dxLoadPanel({
		position: {
			my: 'center',
			at: 'center',
		},
		visible: false,
	}).dxLoadPanel('instance');
	const selectOption = [
		{
			id: 1,
			text: '그룹명',
		},
		{
			id: 2,
			text: '그룹코드',
		},
	];
	const searchCondition = new DevExpress.data.DataSource({
		store: {
			data: selectOption,
			type: 'array',
			key: 'id',
		},
	});
	
	
	//var frmInstance = $("#editForm").dxForm("instance");
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
	function getColumnList() {
		var resultColumn = {};
		
		resultColumn = [{
			dataField: 'grpCd',
			width: 250,
			caption: '그룹코드',
			sortOrder: 'asc',
		}, {
			dataField: 'grpNm',
			caption: '그룹명',	
		}, {
			dataField: 'useYnNm',
			width: 150,
			caption: '사용여부',
		}, {
			dataField: 'useYn',
			width: 120,
			caption: '사용여부',
			visible:false,
			editorOptions: {
				dataSource: [{
					value : 'Y',
					NAME : '사용함'
				},{
					value : 'N',
					NAME : '사용안함'
				}],
				valueExpr: "value", 
				displayExpr: "NAME"
			},
		}];
		
		resultColumn = setColumnAlignment(resultColumn);
		return resultColumn;
	}
	function getColumnList2() {
		var resultColumn = {};
		
		resultColumn = [{
			dataField: 'grpCd',
			width: 250,
			caption: '그룹코드',
			visible:false,
		}, {
			dataField: 'cd',
			width: 250,
			caption: '코드',	
		}, {
			dataField: 'cdNm',
			width: 300,
			caption: '코드명',	
		}, {
			dataField: 'sortOrder',
			width: 120,
			caption: '정렬순서',
			dataType:"number",
			sortOrder: 'asc',
			
		}, {
			dataField: 'useYnNm',
			width: 120,
			caption: '사용여부',
		},{
			dataField: 'remark',
			caption: '비고',
			visible: false,
		}, {
			dataField: 'useYn',
			caption: '사용여부',
			visible:false,
			editorOptions: {
				dataSource: [{
					value : 'Y',
					NAME : '사용함'
				},{
					value : 'N',
					NAME : '사용안함'
				}],
				valueExpr: "value", 
				displayExpr: "NAME"
			},
		}];
		
		resultColumn = setColumnAlignment(resultColumn);
		return resultColumn;
	}
	var columnlist = getColumnList();
	var columnlist2 = getColumnList2();
	
	var codeGrpList = codeGrpItem.filter(function(item1, idx1) {
		return codeGrpItem.findIndex(function(item2, idx2) {
			return item1.grpCd == item2.grpCd;
		}) == idx1;
	});
	var codeList = codeItem.filter(function(item1, idx1) {
		return codeItem.findIndex(function(item2, idx2) {
			return item1.grpCd == item2.grpCd && item1.cd == item2.cd;
		}) == idx1;
	});
	
	const store = new DevExpress.data.CustomStore({
		key: ['grpCd'],
		load(loadOptions) {
			const deferred = $.Deferred();
			$.ajax({
				url: URL+"cotGrp/list",
				dataType: 'json',
				success(result) {
					//console.log(result)
					deferred.resolve(result.data.list, {
						
					});
				},
				error() {
					deferred.reject('Data Loading Error');
				},
				timeout: 5000,
			});
			
			return deferred.promise();
		},
	});
	let editRowData = "";
	var dataGrid = $('.gridContainer').dxDataGrid({
		dataSource:store,
		showBorders: true,
		showRowLines: true,
		loadPanel: {enabled: false},
		columns: columnlist,
		focusedRowEnabled: true,
		editing: {
			mode: 'popup',
			/* 오픈 시 주석처리해야함 START*/
			allowAdding: true,
			allowUpdating: function(e) {
				return true;
			},
			allowDeleting: function(e) {
				return true;
			},
			/* 오픈 시 주석처리해야함 END*/
			popup: {
				title: '공통그룹코드 수정',
				showTitle: true,
				width: 400,
				height: 525,
			},
			
			form: {
				showColonAfterLabel: false,
				colCount: 1,
				
				items: [{
					itemType: 'group',
					items: [{
						dataField:'grpCd',
					},{
						dataField:'grpNm',
					},{
						dataField: 'useYn',
						label:{text:'사용여부',},
						editorType: "dxSelectBox",
						editorOptions: {
							dataSource: [{
								value : 'Y',
								text : '사용함'
							},{
								value : 'N',
								text : '사용안함'
							}],
							valueExpr: "value", 
							displayExpr: "text"
						},
						
					}],
				}],
				onInitialized: function(e) {
					frmPopup  = e.component;
				},
			},
			
		},
		onEditingStart: function(e) {
			editRowKey = e.key;
			if(dataGrid.option("editing.mode")=="popup"){
				dataGrid.option("editing.popup.title", "공통 그룹코드 수정");
				dataGrid.option("editing.form.items[0].items[0].editorOptions.readOnly",true);
			}
			editRowData = e.data;
		},
		onInitNewRow: function(e){  
			if(dataGrid.option("editing.mode")=="popup"){
				dataGrid.option("editing.popup.title", "공통 그룹코드 등록");
				dataGrid.option("editing.form.items[0].items[0].editorOptions.readOnly",false);
				e.data.useYn = "Y";
			}
		},
		onFocusedRowChanged(e){
			if(e.row.rowType =="data") {
				chooseCd(e.row.data.grpCd);
			}
		},
		onSaving(e) {
	    	const change = e.changes[0];

	    	if (change != null) {
				var flag = saveChange(URL, change,"grpcd");
				if(!flag){
					e.cancel = true;
					return false;
				}
		    	if (change) {
		    		e.cancel = true;
		    		loadPanel.show();
		    		e.promise = flag
		    		.always(() => { loadPanel.hide(); })
		    		.then((data) => {
		    			alert(data.message)
		    			dataGrid.cancelEditData();
		    			dataGrid.refresh();
		    		});
		        }
	    	}
	    },
		paging: {
			pageSize: 20,
		},
		pager: {
			visible: true,
		    showInfo: true,
		    infoText: "총 {2}건   {0}/{1}",
		    showNavigationButtons: true,
		},
		searchPanel: {
	    	visible: true,
	    	placeholder: 'Search...',
	    	showClearButton: true,
	    	width:200,
	    },
	}).dxDataGrid('instance');
	function chooseCd(grpCd){
		const store2 = new DevExpress.data.CustomStore({
			key: ['grpCd','cd'],
			load(loadOptions) {
				const deferred = $.Deferred();
				$.get({
					url: URL+"cotGrpCd/list",
					data:{
						"grpCd" : grpCd,
						"comcd" : "GIJANG",
						"searchOrderDir" : "DESC",
						"searchOrder" : grpCd
					},
					dataType: 'json',
					success(result) {
						console.log()
						deferred.resolve(result.data.list);
					},
					error() {
						deferred.reject('Data Loading Error');
					},
					timeout: 5000,
				});
				return deferred.promise();
			},
		});
		dataGrid2.option("dataSource",store2);
	}
	
	let editRowData2 = "";
	var dataGrid2 = $('.gridContainer2').dxDataGrid({
		allowColumnReordering: true,
		allowColumnResizing: true,
		showBorders: true,
		showRowLines: true,
		columnMinWidth: 50,
		loadPanel: {enabled: false},
		columns: columnlist2,
		focusedRowEnabled: true,
		
		editing: {
			mode: 'popup',
			allowAdding: true,
			allowUpdating: function(e) {
				return true;
			},
			allowDeleting: function(e) {
				return true;
			},
			popup: {
				title: '공통코드 수정',
				showTitle: true,
				width: 400,
				height: 525,
			},
			
			form: {
				showColonAfterLabel: false,
				colCount: 1,
				
				items: [{
					itemType: 'group',
					items: [{
						dataField:'grpCd',
						editorOptions: {
							readOnly: true,
						}
					},{
						dataField:'cd',
						editorOptions: {
							readOnly: true,
						}
					} , 'cdNm', 
					{
						dataField: 'useYn',
						label:{text:'사용여부',},
						editorType: "dxSelectBox",
						editorOptions: {
							dataSource: [{
								value : 'Y',
								text : '사용함'
							},{
								value : 'N',
								text : '사용안함'
							}],
							valueExpr: "value", 
							displayExpr: "text"
						},
						
					}, {
						dataField:'sortOrder',
						dataType:'number',
					}, 'remark'],
				}],
				onInitialized: function(e) {
					frmPopup  = e.component;
				},
			},
			
		},
		onEditingStart: function(e) {
			editRowKey = e.key;
			if(dataGrid2.option("editing.mode")=="popup"){
				dataGrid2.option("editing.popup.title", "공통코드 수정");
				dataGrid2.option("editing.form.items[0].items[1].editorOptions.readOnly",true);
				dataGrid2.option("editing.form.items[0].items[0].visible",true);
			}
			editRowData2 = e.data;
		},
		onInitNewRow: function(e){  
			if(dataGrid2.option("editing.mode")=="popup"){
				dataGrid2.option("editing.popup.title", "공통코드 등록");
				dataGrid2.option("editing.form.items[0].items[1].editorOptions.readOnly",false);
				dataGrid2.option("editing.form.items[0].items[0].visible",false);
				e.data.useYn = "Y";
			}
		},
// 	    onRowUpdated() {
// 	      console.log('RowUpdated');
// 	    },
// 	    onRowRemoving() {
// 	      console.log('RowRemoving');
// 	    },
// 	    onRowRemoved() {
// 	      console.log('RowRemoved');
// 	    },
		onSaving(e) {
	    	const change = e.changes[0];
			
	    	if (change != null) {
				var flag = saveChange(URL, change,"cd");
				if(!flag){
					e.cancel = true;
					return false;
				}
		    	if (change) {
		    		e.cancel = true;
		    		loadPanel.show();
		    		e.promise = flag
		    		.always(() => { loadPanel.hide(); })
		    		.then((data) => {
		    			alert(data.message)
		    			dataGrid2.cancelEditData();
		    			dataGrid2.refresh();
		    		});
		        }
	    	}
	    },
	    onSaved() {
	      console.log('Saved');
	    },
// 	    onEditCanceling() {
// 	      console.log('EditCanceling');
// 	    },
// 	    onEditCanceled() {
// 	      console.log('EditCanceled');
// 	    },
		paging: {
			pageSize: 20,
		},
		pager: {
			visible: true,
		    showInfo: true,
		    infoText: "총 {2}건   {0}/{1}",
		    showNavigationButtons: true,
		},
	}).dxDataGrid('instance');
	
	function saveChange(url, change,gubun) {
		var jsonData = {};
		let ds = "";
		let dataKey = {};
		let pk = change.key;
		let dk = change.data;
		
		switch (change.type) {
			case 'insert':
				if(gubun == "grpcd") {		//그룹코드
					dataKey = {
							"comcd" : "GIJANG",
							"prodUser" : "admin",
							"delYn" : "N",
						}
					if (!dk.grpCd){
						alert("그룹코드를 입력해주세요");
						return null;
					} else if(!dk.grpNm) {
						alert("그룹코드명을 입력해주세요");
						return null;
					}
					url += "cotGrp/insert"
				} else if(gubun == "cd"){		//코드
					dataKey = {
							"comcd" : "GIJANG",
							"grpCd" : editRowData.grpCd,
							"prodUser" : "admin",
							"delYn" : "N",
						}
					if (!dk.cd){
						alert("코드를 입력해주세요");
						return null;
					} else if(!dk.cdNm) {
						alert("코드명을 입력해주세요");
						return null;
					} else if(!dk.sortOrder) {
						alert("정렬순서를 입력해주세요");
						return null;
					}
					url += "cotGrpCd/insert"
				}
				jsonData = $.extend({}, dk, dataKey);
				return sendRequest(url, 'POST', jsonData);
			case 'update':
				if(gubun == "grpcd") {		//그룹코드
					jsonData = $.extend({}, editRowData,dk);
					url += "cotGrp/update";
					if(!jsonData.grpNm) {
						alert("코드명을 입력해주세요");
						return null;
					}
				} else if(gubun == "cd"){//코드
					jsonData = $.extend({}, editRowData2,dk);
					url += "cotGrpCd/update";
					if(!jsonData.cdNm) {
						alert("코드명을 입력해주세요");
						return null;
					} else if(!jsonData.sortOrder) {
						alert("정렬순서를 입력해주세요");
						return null;
					}
				}
				jsonData.prodUser = "admin";
				return sendRequest(url, 'POST', jsonData);
			case 'remove':
				if(gubun == "grpcd") {		//그룹코드
					url += "cotGrp/delete"
				} else {
					url += "cotGrpCd/delete"
					
				}
				jsonData = pk;
				jsonData.prodUser = "admin";
				return sendRequest(url, 'POST', jsonData);
			default:
				return null;
		}
	}
	function toCamelCase(str) {
		return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
	}
	function sendRequest(url, method = 'GET', data) {
		const d = $.Deferred();
		console.log(method)
		$.ajax(url, {
			method,
			data,
			cache: false,
			xhrFields: { withCredentials: false },
		}).then((result) => {
			d.resolve(method === 'GET' ? result.data : result);
		}, (xhr) => {
			d.reject(xhr.responseJSON ? xhr.responseJSON.Message : xhr.statusText);
		});

		return d.promise();
	}
});
</script>
<div class="row row_title">
	<div class="col-12" style="height:30px;background:#022B70;height:48px;">
		<ul class="navbar-nav" style="color:white;flex-direction: row;display: flex;box-sizing: border-box;margin-top: 4px;">
			<li class="nav-item d-sm-inline-block quick-nav" style="color:white;width:280px;font-size:1.1rem;">
				공통코드관리
			</li>
		</ul>	
	</div>
</div>

<div class="row">
	<div class="col-12">
		<div class="card" style="box-shadow:none;">		
			<div class="card-body" style="margin: 0 -7.5px;padding-bottom: 0;">
				<div class="main-condition">
					<div style="display:flex">
						<div class="gridContainer" style="margin: 10px;width:48%;"></div>
						<div id="loadPanel"></div>
						<div class="gridContainer2" style="margin: 10px;width:48%;"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>