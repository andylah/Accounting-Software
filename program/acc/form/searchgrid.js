searchGrid = function(StoreGrid,ColMod,txt_code,task_param,phase_param){
	
var SearchGrid = new Ext.grid.GridPanel({
	//title:'List SalesOrder',
	id:'salesOrderSearch',
	autoWidth:true,
	cm:ColMod,
	store:StoreGrid,
	height:250,
	iconCls:'icon-grid',
	layout:'fit',
	frame:false
})

/*SearchGrid.on("rowdblclick", function(SearchGrid, rowIndex, e) {
	var rec = SearchGrid.store.getAt(rowIndex)
	Ext.get(txt_code).dom.value=rec.get(txt_code);   // column 3
	salesorderWinForm.getForm().reader = salesorderReader
	salesorderWinForm.getForm().load({waitMsg:'Loading',url:'php/salesorder.php',params:{task:'ProcessDetail',phase:'loadSalesOrder',id:Ext.get('salesorder_code').dom.value},success:LoadGrid("ProcessDetail","loadSalesOrderGrid",Ext.get('salesorder_code').dom.value)})
	searchWin.hide();
});*/


var searchWin = new Ext.Window({
	title:'Search List',
	width:525,
	height:315             ,
	closable:false,
	resizable:false,
	items:SearchGrid,
	buttons:[
			{text:'Close',iconCls:'icon-cross',handler:function(){
				searchWin.close()
			}}
		   ]
})
StoreGrid.load({waitMsg:'Loading',params:{task:task_param,phase:phase_param}})
searchWin.show();
}