var categorymode = new Ext.grid.ColumnModel([
    new Ext.grid.RowNumberer(),
    {
        header:'category',
        width:150
    },

    {
        header:'Cash Type',
        width:150
    }
    ])
var categorySearchRecord = new Ext.data.Record.create([
{
    name:'rowid',
    type:'int'
},
{
    name:'cat_no',
    type:'string'
},
{
    name:'cat_name',
    type:'string'
}
])
var categorySearchStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url:'php/category.php',
        method:'post'
    }),
    reader: new Ext.data.JsonReader({
        id:'categorySearchReader',
        root:'results',
    },categorySearchRecord),
    sortInfo:{
        field:'cat_no',
        direction:'ASC'
    }
})
        
var txtcategory = new Ext.form.TriggerField({
    id:'cat_no',
    name:'cat_no',
    allowBlank:false,
    triggerClass:'x-form-search-trigger',
    onTriggerClick:function(){
        searchGrid(categorySearchStore,categorymode,"category","SearchList","")
    },
    width:250,
    vType:'number',
    fieldLabel:'Category # ',
    listeners:{
        change:function(){
					
            var a = Ext.get('cat_no').dom.value;
            var category_data = new Ext.data.Store({
                proxy: new Ext.data.HttpProxy({
                    url:'php/category.php?task=loadForm&id='+a
                }),
                reader:new Ext.data.JsonReader({
                    root:'results'
                },['cat_no','cat_name'])
            })//eo data store
					
            category_data.on('load',function(){
                if (category_data.getCount()==0)
                {
							
                    txtcat_name.setValue();
                }else{
							
                    txtcat_name.setValue(category_data.getAt(0).get('cat_name'))
                }//eo if 0
            })
					
            category_data.load()
        }//eo function change
    }//eo listeners
})
        
var txtcat_name = new Ext.form.TextField({
    id:'cat_name',
    name:'cat_name',
    allowBlank:false,
    width:250,
    fieldLabel:'Category Name '
})
var category = new Ext.FormPanel({
    //xtype: 'form', // since we are not using the default 'panel' xtype, we must specify it
    id: 'category-panel',
    labelWidth: 100,
    title: 'Form Master Category',
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
    items:[txtcategory, txtcat_name],
    buttons:[
    {
        text:'Save',
        iconCls:'icon-disk',
        handler:function(){
            if(category.getForm().isValid()){
                category.getForm().submit({
                    url:'php/category.php',
                    params:{
                        task:'saveData'
                    },
                    waitMsg:'Saving Data ...',
                    waitTitle:'Process',
                    failure:function(response,action){
                        Ext.MessageBox.alert('Error',action.result.errorInfo);
                    }.createDelegate(this),
                    success:function(response,action){
                        category.getForm().reset();
                    }.createDelegate(this)
                })
            }
        }.createDelegate(this)
        },

        {
        text:'Reset',
        iconCls:'icon-undo',
        handler:function(){
            category.getForm().reset();
        }.createDelegate(this)
        }
    ]
})
