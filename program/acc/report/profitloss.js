var dt = new Date()
var txtmonth_profit = new Ext.form.ComboBox({
    name:'filter_month_profit',
    id:'filter_month_profit',
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
var txtyear_profit = new Ext.form.ComboBox({
    name:'filter_year_profit',
    id:'filter_year_profit',
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

var form_filter_profit = new Ext.form.FormPanel({
    id:'form_filter_profit',
    labelWidth:100,
    title:'Filter Form',
    autoHeight:75,
    Width:500,
    bodyStyle:'padding-left:15px',
    buttonAlign:'left',
    defaults:{
        width: 200
    },
    items:[txtmonth_profit, txtyear_profit],
    buttons:[
        {text:'Submit', iconCls:'icon-report',handler:function(){
                if (form_filter_profit.getForm().isValid()){
                    Ext.getCmp('report_panel_profit').expand(true);
                    Ext.getCmp('report_panel_profit').load({url:'report-php/profitloss.php',waitMsg:'Loading',
                    params:{month:Ext.get('filter_month_profit').dom.value, year:Ext.get('filter_year_profit').dom.value,phase:'profitloss'},scripts:true});
                }
        }}
    ]
})

profitloss = {
    id:'profitloss-panel',
    title:'Filter Profit Loss',
    layout:'accordion',
    bodyStyle: 'background-color:#DFE8F6',
    header:false,
    activeItem:0,
    defaults:{
        frame:true
    },
    items:[
        form_filter_profit,
        {   
            id:'report_panel_profit',
            title:'Report Profit Loss',
            autoScroll:true
        }
    ]
}