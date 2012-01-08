var detailForm = function(transStore,trans_id){
	
	var accStore = new Ext.data.Store({
	proxy:new Ext.data.HttpProxy({
		url:'php/trans.php',
		method:'post'
	}),
	baseParams:{task:'getAcc'},
	reader:new Ext.data.JsonReader({
		id:'accReader',
		root:'results'
	},[{name:'acc_num'},{name:'acc_name'}]),
	sortInfo:{field:'acc_num',direction:'ASC'}
	})
	
	var indexStore = new Ext.data.Store({
	proxy:new Ext.data.HttpProxy({
		url:'php/trans.php',
		method:'post'
	}),
	baseParams:{task:'getIndex'},
	reader:new Ext.data.JsonReader({
		id:'indexReader',
		root:'results'
	},[{name:'index_no'},{name:'cash_type'}]),
	sortInfo:{field:'index_no',direction:'ASC'}
	})
	
	
	var txtdebet = new Ext.form.NumberField({name:'debet',width:150,fieldLabel:'Debet ',allowBlank:false,value:'0',allowDecimals:true ,decimalPrecision:5})
	var txtcredit = new Ext.form.NumberField({name:'credit',width:150,allowBlank:false,fieldLabel:'Credit ',value:'0',allowDecimals:true ,decimalPrecision:5})
	var txttrans_id = new Ext.form.TextField({name:'trans_id',hidden:true,value:trans_id});
	
	var cmbacc = new Ext.form.ComboBox({
		fieldLabel: 'Account Num ',
		name:'cmd_acc',
		valueField:'acc_num',
		displayField:'acc_name',
		mode:'local',
		store:accStore,
		emptyText:'Please select ...',
		triggerAction:'all',
		allowBlank:true,
		selectOnFocus:true,
		editable:false,
		width:200,
		listeners:{
			focus:function(){
				accStore.load()
			}
		}
	})
	
	var cmbindex = new Ext.form.ComboBox({
		fieldLabel: 'Index ',
		name:'cmd_index',
		valueField:'index_no',
		displayField:'cash_type',
		mode:'local',
		store:indexStore,
		emptyText:'Please select ...',
		triggerAction:'all',
		allowBlank:true,
		selectOnFocus:true,
		editable:false,
		width:200,
		listeners:{
			focus:function(){
				indexStore.load()
			}
		}
	})
	
	var detailForm = new Ext.FormPanel({
		name:'detailForm',
		bodyStyle:'padding:3px',
		baseCls: 'x-plain',
		autoWidth:true,
		autoHeight:true,
		labelWidth: 100,
		url:'php/trans.php',
		items:[
			   cmbindex,
			   cmbacc,
               txtdebet,
               txtcredit,
               txttrans_id
			  ],
		buttons:[
				 {text:'Add',iconCls:'icon-db-save',handler:function(){
				 	if(detailForm.getForm().isValid())
					{
						detailForm.getForm().submit({
							params:{task:'ProcessDetail',phase:'saveDetail'},
							waitMsg:'Saving Data ...',
							waitTitle:'Process',
							failure:function(detailForm,action){
								Ext.MessageBox.alert('Error',action.result.errorInfo)
							},
							success:function(){
								detailwindow.hide()
								transStore.load({waitMsg:'Loading',params:{task:'ProcessDetail',phase:'LoadDetailGrid',trans_id:trans_id}})
                                detailForm.getForm().reset();
								
							}
						})
					}else{
						Ext.MessageBox.alert('Warning','Please fix the error !!!')
					}
				 }},
				 {text:'Reset',iconCls:'icon-db-refresh',handler:function(){
				 	detailForm.getForm().reset()
				 }},
				 {text:'Cancel',iconCls:'icon-db-reset',handler:function(){
				 	detailwindow.hide()
				 }}
				]
	})
		
	var detailwindow = new Ext.Window({
		width:350,
		autoHeight:true,
		title:'Add Detail',
		bodyStyle:'padding:5px 3px 0',
		layout : 'fit',
		closable:false,
		plain:true,
		buttonAlign:'center',
		name:'detailwindow',
		items:detailForm
	})
	detailwindow.show();
}