var dt = new Date()
var txtmonth_journal = new Ext.form.ComboBox({
    name:'filter_month_journal',
    id:'filter_month_journal',
    fieldLabel:'Month ',
    width:100,
    valueField:'val_month',
    displayField:'dis_month',
    mode:'local',
    value:dt.format('m'),
    selectOnFocus:true,
    triggerAction:'all',
    editable:false,
    allowBlank:false,
    store: new Ext.data.SimpleStore({
        fields:['val_month','dis_month'],
        data:[
        ['01','January'],
        ['02','February'],
        ['03','March'],
        ['04','April'],
        ['05','May'],
        ['06','June'],
        ['07','July'],
        ['08','August'],
        ['09','September'],
        ['10','October'],
        ['11','November'],
        ['12','December']
        ]
    })
})
var txtyear_journal = new Ext.form.ComboBox({
    name:'filter_year_journal',
    id:'filter_year_journal',
    fieldLabel:'Year ',
    width:100,
    valueField:'val_year',
    displayField:'dis_year',
    mode:'local',
    value:dt.format('Y'),
    selectOnFocus:true,
    triggerAction:'all',
    editable:false,
    allowBlank:false,
    store: new Ext.data.SimpleStore({
        fields:['val_year','dis_year'],
        data:[
        ['2011','2011'],
        ['2012','2012'],
        ['2013','2013'],
        ['2014','2014'],
        ['2015','2015'],
        ]
    })
})
var txtcat_journal = new Ext.form.ComboBox({
    name:'filter_cat_journal',
    id:'filter_cat_journal',
    fieldLabel:'Category ',
    width:100,
    valueField:'val_cat',
    displayField:'dis_cat',
    mode:'local',
    value:'All',
    selectOnFocus:true,
    triggerAction:'all',
    editable:false,
    allowBlank:false,
    store: new Ext.data.SimpleStore({
        fields:['val_cat','dis_cat'],
        data:[
        ['5','All'],
        ['0','Aktiva'],
        ['1','Pasiva'],
        ['2','Capital'],
        ['3','Pendapatan Operasional'],
        ['4','Beban Operasional'],
        ]
    })
})
var form_filter_journal = new Ext.form.FormPanel({
    id:'form_filter_journal',
    labelWidth:100,
    title:'Filter Form',
    autoHeight:75,
    Width:500,
    bodyStyle:'padding-left:15px',
    buttonAlign:'left',
    defaults:{
        width: 200
    },
    items:[txtmonth_journal, txtyear_journal, txtcat_journal],
    buttons:[
        {text:'Submit', iconCls:'icon-report',handler:function(){
                if (form_filter_journal.getForm().isValid()){
                    Ext.getCmp('report_panel_journal').expand(true);
                    Ext.getCmp('report_panel_journal').load({url:'report-php/journal.php',waitMsg:'Loading',
                    params:{month:Ext.get('filter_month_journal').dom.value, year:Ext.get('filter_year_journal').dom.value, 
                    category:Ext.get('filter_cat_journal').dom.value, phase:'journal'},scripts:true});
                }
        }}
    ]
})

journal = {
    id:'journal-panel',
    title:'Filter Journal',
    layout:'accordion',
    bodyStyle: 'background-color:#DFE8F6',
    header:false,
    activeItem:0,
    defaults:{
        frame:true
    },
    items:[
        form_filter_journal,
        {   
            id:'report_panel_journal',
            title:'Report Journal',
            autoScroll:true
        }
    ]
}