var listColumn = new Ext.grid.ColumnModel([
    new Ext.grid.RowNumberer(),
			
    {header:'Account Num',width:100,id:'acc_num'},
    {header:'Account Name',width:200,id:'acc_name'},
    {header:'Account Type',width:175,id:'type_name'},
    {header:'Category',width:150,id:'cat_account'}
			
])
		
var listRecord = new Ext.data.Record.create([
    {name:'rowid',type:'int'},
    {name:'acc_num',type:'string'},
    {name:'acc_name',type:'string'},
    {name:'type_name',type:'string'},
    {name:'cat_account',type:'string'}
])
		
var listStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url:'php/account.php',
        method:'post'
    }),
    autoLoad:{params:{task:'processlist',phase:'loadgrid',start:0,limit:15}},
    reader: new Ext.data.JsonReader({
        id:'listReader',
        root:'results',
        totalProperty:'total'
    },listRecord),
    sortInfo:{field:'rowid',direction:'ASC'}
})
        
var listgrid = new Ext.grid.GridPanel({
    title:'Account List',
    width:530,
    frame:true,
    cm: listColumn,
    ds: listStore,
    tbar: [
        {id:'btn_delete',text:'Delete',iconCls:'icon-del-col',handler:function(){
                var m = listgrid.getSelectionModel().getSelections();
                        
                if(m.length == 1)
                {
                    Ext.MessageBox.confirm('Confirm','Do you really want to delete ?',
                    function(btn){
                        if(btn == "yes"){
                            var jsonData = "";
                            for(var i = 0, len = m.length; i < len; i++)
                            {
                                var ss = m[i].get("acc_num");
                                //jsonData = jsonData + ss ;
                                listStore.remove(m[i]);
                            }
                            //jsonData = jsonData ;			
                            listStore.load({params:{task:'processlist',phase:'del_list',id:ss}})
                        }
                    }
                )
                }else{
                    Ext.MessageBox.alert("Warning","Please one at the time for deleting")
                }
            }}	
    ],
    bbar: new Ext.PagingToolbar({
            pageSize: 15,
            store: listStore,
            displayInfo: true,
            displayMsg: 'Displaying topics {0} - {1} of {2}',
            emptyMsg: "No topics to display",
            doRefresh:function(){
                listStore.load({params:{task:'processlist',phase:'loadgrid',start:this.cursor,limit:this.pageSize}});
            },
            moveNext:function(){
               listStore.load({params:{task:'processlist',phase:'loadgrid',start:this.cursor+this.pageSize,limit:this.pageSize}}); 
            },
            moveFirst:function(){
                listStore.load({params:{task:'processlist',phase:'loadgrid',start:0,limit:this.pageSize}})
            },
            moveLast:function(){
                var total = listStore.getTotalCount();
                var extra = total % this.pageSize;
                var lastStart = extra ? (total - extra) : total-this.pageSize;
                listStore.load({params:{task:'processlist',phase:'loadgrid',start:lastStart,limit:this.pageSize}})
            },
            movePrevious:function(){
                listStore.load({params:{task:'processlist',phase:'loadgrid',start:Math.max(0, this.cursor-this.pageSize),limit:this.pageSize}})
            },
            onPagingKeyDown: function(field, e){
                var key = e.getKey();
                var d = this.getPageData();
                var pagenum = this.readPage(d);
                var total = listStore.getTotalCount();
                if (key == 13){
                   if (Math.ceil(total/this.pageSize) < pagenum){
                       pagenum = Math.ceil(total/this.pageSize);
                   }
                 var startpage = pagenum * this.pageSize - (this.pageSize);
                 listStore.load({params:{task:'processlist',phase:'loadgrid',start:startpage,limit:this.pageSize}})
                }
                
            }
        })
})

var account_list = new Ext.FormPanel({
    id: 'account_list-panel',
    labelWidth: 75,
    title: 'Table Account List',
    bodyStyle: 'padding:15px',
    width: 500,
    labelPad: 20,
    layoutConfig: {
        labelSeparator: ''
    },
    layout: 'fit',
    bodyStyle: 'padding:15px;',
    trackResetOnLoad:true,
    items:[listgrid]
})