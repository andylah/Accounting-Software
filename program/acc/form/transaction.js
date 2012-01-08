var dt = new Date();
        
//var formReader = new Ext.data.JsonReader({
//  id:'detailReader',
//  root:'results'
//},[{name:'trans_id'}])
var id = 'T/'+dt.format("mY")+'/'+dt.format('d')+dt.format('H')+'-'+dt.format('i')+dt.format('s');
        
var transColumn = new Ext.grid.ColumnModel([
    new Ext.grid.RowNumberer(),
    {
        header:'Index',
        width:50,
        id:'index_no'
    },

    {
        header:'Account Num', 
        width: 120, 
        id:'acc_num'
    },

    {
        header:'Debet', 
        width: 100, 
        id:'debet'
    },

    {
        header:'Credit', 
        width: 100, 
        id:'credit'
    },

    {
        header:'session_id', 
        width: 100, 
        id:'session_id',
        hidden:true
    }
    ])
var transRecord = new Ext.data.Record.create([
{
    name:'rowid', 
    type:'int'
},
{
    name:'index_no', 
    type:'string'
},
{
    name:'acc_num', 
    type:'string'
},
{
    name:'debet', 
    type:'int'
},
{
    name:'credit', 
    type:'int'
},
{
    name:'session_id', 
    type:'string'
}
])
var transStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url:'php/trans.php',
        method: 'post'
    }),
    reader : new Ext.data.JsonReader({
        id: 'transReader',
        root: 'results'
    },transRecord),
    sortInfo:{
        field:'rowid', 
        direction:'ASC'
    }
})
        
var txtdate_trans = new Ext.form.DateField({
            
    name: 'trans_date',
    allowBlank: false,
    width: 150,
    value: dt.format('Y-m-d'),
    fieldLabel: 'Date ',
    format:'Y-m-d'
})
var txtinv_trans = new Ext.form.TextField({
            
    name: 'trans_inv',
    allowBlank: true,
    width: 150,
    fieldLabel: 'Inv '
})
var txtmemo_trans = new Ext.form.TextField({
            
    name: 'trans_memo',
    allowBlank:true,
    width: 335,
    fieldLabel: 'Memo '
})
var txtid_trans = new Ext.form.TextField({
    id:'trans_id',
    value:id,
    name: 'trans_id',
    allowBlank: false,
    width: 150,
    fieldLabel: 'Trans ID '
});
var grid_trans = new Ext.grid.GridPanel({
    title: 'Journal',
    width: 440,
    height: 200,
    iconCls: 'icon-grid',
    cm: transColumn,
    ds: transStore,
    border: false,
    frame: true,
    tbar: [
    {
        id:'btn_add', 
        text: 'Add', 
        iconCls: 'icon-add-col',
        handler:function(){
            detailForm(transStore,Ext.get('trans_id').dom.value);
        }
    },
{
    id:'btn_del', 
    text: 'Del', 
    iconCls: 'icon-del-col',
    handler:function(){
        var m = grid_trans.getSelectionModel().getSelections();
        if(m.length == 1)
        {
            Ext.MessageBox.confirm('Confirm','Do you really want to delete ?',
                function(btn){
                    if(btn == "yes"){
                        var jsonData = "";
                        for(var i = 0, len = m.length; i < len; i++)
                        {
                            var ss = m[i].get("index_no");
                            var aa = m[i].get("session_id");
                            var bb = m[i].get("acc_num");
                            //jsonData = jsonData + ss ;
                            transStore.remove(m[i]);
                        }
                        //jsonData = jsonData ;			
                        transStore.load({
                            params:{
                                task:'ProcessDetail',
                                phase:'deleteDetail',
                                index_no:ss,
                                session_id:aa,
                                acc_num:bb,
                                trans_id:Ext.getCmp('trans_id').getValue()
                                }
                            })
                }
            }
            )
    }else{
        Ext.MessageBox.alert("Warning","Please one at the time for deleting")
    }
}
}
]
})
var transaction = new Ext.FormPanel({
    //xtype: 'form', // since we are not using the default 'panel' xtype, we must specify it
    id: 'transaction-panel',
    labelWidth: 75,
    title: 'Form Transaction',
    bodyStyle: 'padding:15px',
    width: 500,
    labelPad: 20,
    layoutConfig: {
        labelSeparator: ''
    },         
    trackResetOnLoad: true,    
    items:[txtid_trans, txtdate_trans , txtinv_trans, txtmemo_trans, grid_trans],
    buttons:[
    {
        text:'Save',
        iconCls:'icon-disk',
        handler:function(){
                    
            if(transaction.getForm().isValid()){
                transaction.getForm().submit({
                    url:'php/trans.php',
                    params:{
                        task:'ProcessDetail',
                        phase:'SaveAllData'
                    },
                    waitMsg:'Saving Data ...',
                    waitTitle:'Process',
                    failure:function(response,action){
                        Ext.MessageBox.alert('Error',action.result.errorInfo);
                    }.createDelegate(this),
                    success:function(){
                        dt = new Date();
                        transaction.getForm().reset();
                        var id = 'T/'+dt.format("mY")+'/'+dt.format('d')+dt.format('H')+'-'+dt.format('i')+dt.format('s');
                        transStore.removeAll();
                        txtid_trans.setValue(id);
                    }.createDelegate(this)
                })
            }
        }.createDelegate(this)
        },

        {
        text:'Reset',
        iconCls:'icon-undo',
        handler:function(){
            dt = new Date();
            id ='T/'+dt.format("mY")+'/'+dt.format('d')+dt.format('H')+'-'+dt.format('i')+dt.format('s');
            transaction.getForm().reset();
            transStore.load({
                waitMsg:'Loading',
                params:{
                    task:'ProcessDetail',
                    phase:'DeleteDetailGrid'
                }
            });
        transStore.removeAll();
        txtid_trans.setValue(id);
    }.createDelegate(this)
    }
]
});