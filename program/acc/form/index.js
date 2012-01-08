var indexmode = new Ext.grid.ColumnModel([
    new Ext.grid.RowNumberer(),
    {
        header:'Index',
        width:150
    },

    {
        header:'Cash Type',
        width:150
    }
    ])
var indexSearchRecord = new Ext.data.Record.create([
{
    name:'rowid',
    type:'int'
},
{
    name:'index_no',
    type:'string'
},
{
    name:'cash_type',
    type:'string'
}
])
var indexSearchStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url:'php/index_list.php',
        method:'post'
    }),
    reader: new Ext.data.JsonReader({
        id:'indexSearchReader',
        root:'results',
    },indexSearchRecord),
    sortInfo:{
        field:'index_no',
        direction:'ASC'
    }
})
        
var txtindex = new Ext.form.TriggerField({
    id:'index',
    name:'index',
    allowBlank:false,
    triggerClass:'x-form-search-trigger',
    onTriggerClick:function(){
        searchGrid(indexSearchStore,indexmode,"index","SearchList","")
    },
    width:250,
    fieldLabel:'Index ',
    listeners:{
        change:function(){
					
            var a = Ext.get('index').dom.value;
            var index_data = new Ext.data.Store({
                proxy: new Ext.data.HttpProxy({
                    url:'php/index_list.php?task=loadForm&id='+a
                }),
                reader:new Ext.data.JsonReader({
                    root:'results'
                },['index_no','cash_type'])
            })//eo data store
					
            index_data.on('load',function(){
                if (index_data.getCount()==0)
                {
							
                    txtcash_type.setValue();
                }else{
							
                    txtcash_type.setValue(index_data.getAt(0).get('cash_type'))
                }//eo if 0
            })
					
            index_data.load()
        }//eo function change
    }//eo listeners
})
        
var txtcash_type = new Ext.form.TextField({
    id:'cash_type',
    name:'cash_type',
    allowBlank:false,
    width:250,
    fieldLabel:'Cash Type '
})
var index = new Ext.FormPanel({
    //xtype: 'form', // since we are not using the default 'panel' xtype, we must specify it
    id: 'index-panel',
    labelWidth: 100,
    title: 'Form Master Index',
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
    items:[txtindex, txtcash_type],
    buttons:[
    {
        text:'Save',
        iconCls:'icon-disk',
        handler:function(){
            if(index.getForm().isValid()){
                index.getForm().submit({
                    url:'php/index_list.php',
                    params:{
                        task:'saveData'
                    },
                    waitMsg:'Saving Data ...',
                    waitTitle:'Process',
                    failure:function(response,action){
                        Ext.MessageBox.alert('Error',action.result.errorInfo);
                    }.createDelegate(this),
                    success:function(response,action){
                        index.getForm().reset();
                    }.createDelegate(this)
                })
            }
        }.createDelegate(this)
        },

        {
        text:'Reset',
        iconCls:'icon-undo',
        handler:function(){
            index.getForm().reset();
        }.createDelegate(this)
        }
    ]
})
