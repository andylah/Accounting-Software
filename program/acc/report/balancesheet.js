var dt = new Date()
var txtmonth = new Ext.form.ComboBox({
    name:'filter_month',
    id:'filter_month',
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
var txtyear = new Ext.form.ComboBox({
    name:'filter_year',
    id:'filter_year',
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

var form_filter = new Ext.form.FormPanel({
    id:'form_filter',
    labelWidth:100,
    title:'Filter Form',
    autoHeight:75,
    Width:500,
    bodyStyle:'padding-left:15px',
    buttonAlign:'left',
    defaults:{
        width: 200
    },
    items:[txtmonth, txtyear],
    buttons:[
        {text:'Submit', iconCls:'icon-report',handler:function(){
                if (form_filter.getForm().isValid()){
                    Ext.getCmp('report_panel').expand(true);
                    Ext.getCmp('report_panel').load({url:'report-php/balancesheet.php',waitMsg:'Loading',
                    params:{month:Ext.get('filter_month').dom.value, year:Ext.get('filter_year').dom.value,phase:'balancesheet'},scripts:true});
                }
        }}
    ]
})

balancesheet = {
    id:'balancesheet-panel',
    title:'Filter Balance Sheet',
    layout:'accordion',
    bodyStyle: 'background-color:#DFE8F6',
    header:false,
    activeItem:0,
    defaults:{
        frame:true
    },
    items:[
        form_filter,
        {   
            id:'report_panel',
            title:'Report Balance Sheet',
            autoScroll:true
        }
    ]
}