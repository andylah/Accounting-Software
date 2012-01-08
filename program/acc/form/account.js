var typeStore = new Ext.data.Store({
    proxy:new Ext.data.HttpProxy({
	url:'php/account.php',
	method:'post'
    }),
    baseParams:{task:'getType'},
    reader:new Ext.data.JsonReader({
	id:'typeReader',
	root:'results'
    },[{name:'type_no'},{name:'acc_type'}]),
	sortInfo:{field:'type_no',direction:'ASC'}
    })
/*var groupItems = [];

var radioRecord = new Ext.data.Record.create([
    {name:'name'},{name:'boxLabel'},{name:'inputValue'},{name:'checked'}])

var radioStore = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
        url:'php/account.php',
        method:'post'
    }),
    //baseParams:{task:'getCategory'},
    autoLoad:{params:{task:'getCategory'}},
    reader:new Ext.data.JsonReader({
        id:'catReader',
        root:'results'
    },radioRecord)
})

radioStore.each(function(radioRecord){
    groupItems.push({
        name:'name',
        boxLabel:'boxLabel',
        inputValue:'inputValue',
        checked:'checked',
        width:150
    })
})
*/
var accmode = new Ext.grid.ColumnModel([
	new Ext.grid.RowNumberer(),
	{header:'Account No',width:80},
	{header:'Account Name',width:150},
        {header:'Type Name',width:150},
        {header:'Category',width:100}
])
var accSearchRecord = new Ext.data.Record.create([
        {name:'rowid',type:'int'},
	{name:'acc_num',type:'string'},
	{name:'acc_name',type:'string'},
        {name:'type_name',type:'string'},
        {name:'cat_account',type:'string'}
])
var accSearchStore = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url:'php/account.php',
            method:'post'
        }),
        reader: new Ext.data.JsonReader({
            id:'accSearchReader',
            root:'results',
	},accSearchRecord),
        sortInfo:{field:'acc_num',direction:'ASC'}
})
var cmbtype = new Ext.form.ComboBox({
        name:'cmb_type',
	id:'cmb_type',
	fieldLabel:'Type ',
        mode:'local',
        valueField:'type_no',
        displayField:'acc_type',
	store:typeStore,
	emptyText:'Please select ...',
	triggerAction:'all',
	allowBlank:false,
	selectOnFocus:true,
	editable:false,
	width:150,
        listeners:{
		focus:function(){
			typeStore.load();
		}
	}
})
var txtacc = new Ext.form.TriggerField({
	id:'acc_no',
	name:'acc_no',
	allowBlank:false,
        triggerClass:'x-form-search-trigger',
        onTriggerClick:function(){searchGrid(accSearchStore,accmode,"acc_no","SearchList","")},
	width:250,
	fieldLabel:'Acc # ',
        listeners:{
		change:function(){
			var a = Ext.get('acc_no').dom.value;
			var acc_data = new Ext.data.Store({
			proxy: new Ext.data.HttpProxy({
				url:'php/account.php?task=loadForm&id='+a
			}),
			reader:new Ext.data.JsonReader({root:'results'},['acc_num','acc_name','type_name','cat_account'])
                        })//eo data store
					
                acc_data.on('load',function(){
			if (acc_data.getCount()==0)
			{
				txtacc_name.setValue();
				cmbtype.setValue('Please select ...');
			}else{
				txtacc.setValue(acc_data.getAt(0).get('acc_num'))
				txtacc_name.setValue(acc_data.getAt(0).get('acc_name'))
				cmbtype.setValue(acc_data.getAt(0).get('type_name'))
                                Ext.getCmp('cat_account').setValue(acc_data.getAt(0).get('cat_account'))
			}//eo if 0
                })
		acc_data.load()
		}//eo function change
	}//eo listeners
})
var txtacc_name = new Ext.form.TextField({
	id:'acc_name',
	name:'acc_name',
	allowBlank:false,
	width:250,
	fieldLabel:'Acc Name '
})
var cat_account = new Ext.form.RadioGroup({
    id:'cat_account',
    name: 'cat_account',
    allowBlank:'false',
    fieldLabel:'Category ',
    columns: 1,
    items:[
        {boxLabel:'Aktiva', width:150, name:'radio_account', inputValue:'0', checked:true},
        {boxLabel:'Pasiva', width:150, name:'radio_account', inputValue:'1'},
        {boxLabel:'Capital', width:150, name:'radio_account', inputValue:'2'},
        {boxLabel:'Pendapatan Operasional', width:150, name:'radio_account', inputValue:'3'},
        {boxLabel:'Beban Operasional', width:150, name:'radio_account', inputValue:'4'}
    ]
})
var account = new Ext.FormPanel({
    //xtype: 'form', // since we are not using the default 'panel' xtype, we must specify it
    id: 'account-panel',
    labelWidth: 100,
    title: 'Form Master Account',
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
    items:[txtacc, cmbtype, txtacc_name,cat_account],
     buttons:[
           {text:'Save',iconCls:'icon-disk',handler:function(){
           if(account.getForm().isValid()){
              account.getForm().submit({
                   url:'php/account.php',
                   params:{task:'saveData'},
                   waitMsg:'Saving Data ...',
                   waitTitle:'Process',
                   failure:function(response,action){
			Ext.MessageBox.alert('Error',action.result.errorInfo);
                    }.createDelegate(this),
                    success:function(response,action){
                         account.getForm().reset()
                    }.createDelegate(this)
              })
           }
           }.createDelegate(this)},
           {text:'Reset',iconCls:'icon-undo',handler:function(){
               account.getForm().reset()
           }.createDelegate(this)}
         ]
});