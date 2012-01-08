var typemode = new Ext.grid.ColumnModel([
    new Ext.grid.RowNumberer(),
    {
        header:'Type No',
        width:150
    },
    {
        header:'Type Name',
        width:150
    }
    ])
var typeSearchRecord = new Ext.data.Record.create([
{
    name:'rowid',
    type:'int'
},
{
    name:'type_no',
    type:'string'
},
{
    name:'acc_type',
    type:'string'
}
])
var typeSearchStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url:'php/acc_type.php',
        method:'post'
    }),
    reader: new Ext.data.JsonReader({
        id:'typeSearchReader',
        root:'results',
    },typeSearchRecord),
    sortInfo:{
        field:'type_no',
        direction:'ASC'
    }
})
        
var txtno = new Ext.form.TriggerField({
    id:'type_no',
    name:'type_no',
    allowBlank:false,
    triggerClass:'x-form-search-trigger',
    onTriggerClick:function(){
        searchGrid(typeSearchStore,typemode,"type_no","SearchList","")
    },
    width:250,
    fieldLabel:'Type no ',
    listeners:{
        change:function(){
					
            var a = Ext.get('type_no').dom.value;
            var type_data = new Ext.data.Store({
                proxy: new Ext.data.HttpProxy({
                    url:'php/acc_type.php?task=loadForm&id='+a
                }),
                reader:new Ext.data.JsonReader({
                    root:'results'
                },['type_no','acc_type'])
            })//eo data store
					
            type_data.on('load',function(){
                if (type_data.getCount()==0)
                {
							
                    txttype_name.setValue();
                }else{
							
                    txttype_name.setValue(type_data.getAt(0).get('acc_type'))
                }//eo if 0
            })
					
            type_data.load()
        }//eo function change
    }//eo listeners
})
        
var txttype_name = new Ext.form.TextField({
    id:'type_name',
    name:'type_name',
    allowBlank:false,
    width:250,
    fieldLabel:'Account Type '
})
var type = new Ext.FormPanel({
    //xtype: 'form', // since we are not using the default 'panel' xtype, we must specify it
    id: 'type-panel',
    labelWidth: 100,
    title: 'Form Master Type',
    bodyStyle: 'padding:15px',
    width: 350,
    labelPad: 20,
    layoutConfig: {
        labelSeparator: ''
    },
    defaults: {
        width: 230,
        msgTarget: 'side'
    },
    defaultType: 'textfield',
    trackResetOnLoad:true,
    items:[txtno, txttype_name],
    buttons:[
    {
        text:'Save',
        iconCls:'icon-disk',
        handler:function(){
            if(type.getForm().isValid()){
                type.getForm().submit({
                    url:'php/acc_type.php',
                    params:{
                        task:'saveData'
                    },
                    waitMsg:'Saving Data ...',
                    waitTitle:'Process',
                    failure:function(response,action){
                        Ext.MessageBox.alert('Error',action.result.errorInfo);
                    }.createDelegate(this),
                    success:function(response,action){
                        type.getForm().reset();
                    }.createDelegate(this)
                })
            }
        }.createDelegate(this)
    },
    {
        text:'Reset',
        iconCls:'icon-undo',
        handler:function(){
            type.getForm().reset();
        }.createDelegate(this)
    }
    ]
});