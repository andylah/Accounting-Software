Ext.onReady(function(){
    Ext.QuickTips.init();
   
    var detailEl;
  
    var start = {
        id: 'start-panel',
        title: 'Dashboard',
        layout: 'fit',
        bodyStyle: 'padding:25px',
        contentEl: 'start-div'  // pull existing content from the page
    };
   
    var contentPanel = {
        id: 'content-panel',
        region: 'center', 
        layout: 'card',
        margins: '2 5 5 0',
        activeItem: 0,
        border: false,
        items: [
        start, account, type, index, category, account_list,
            
        transaction,
            
        balancesheet, profitloss, journal
        ]
    }
   
    var treePanel = new Ext.tree.TreePanel({
        id: 'tree-panel',
        title: 'Navigation Menu',
        region:'north',
        split: true,
        height: 300,
        minSize: 150,
        autoScroll: true,
        
        // tree-specific configs:
        rootVisible: false,
        lines: false,
        //singleExpand: true,
        useArrows: true,
        
        loader: new Ext.tree.TreeLoader({
            dataUrl:'menu.json'
        }),
        
        root: new Ext.tree.AsyncTreeNode()
    });
    treePanel.on('click', function(n){
        var sn = this.selModel.selNode || {}; // selNode is null on initial selection
        if(n.leaf && n.id != sn.id){  // ignore clicks on folders and currently selected node 
            Ext.getCmp('content-panel').layout.setActiveItem(n.id + '-panel');
        //if(!detailEl){
        //	var bd = Ext.getCmp('details-panel').body;
        //	bd.update('').setStyle('background','#fff');
        //	detailEl = bd.createChild(); //create default empty div
        //}
        //detailEl.hide().update(Ext.getDom(n.id+'-details').innerHTML).slideIn('l', {stopFx:true,duration:.2});
        }
    });
    var detailsPanel = {
        id: 'details-panel',
        header:false,
        region: 'center',
        bodyStyle: 'padding-bottom:15px;background:#eee;',
        autoScroll: true,
        html: '<p class="details-info"></p>'
    };
    new Ext.Viewport({
        layout: 'border',
        title: 'Ext Layout Browser',
        items: [{
            xtype: 'box',
            region: 'north',
            applyTo: 'header',
            height: 30
        },{
            xtype:'box',
            region: 'south',
            contentEl:'footer',
            height: 30
        },{
            layout: 'border',
            id: 'layout-browser',
            region:'west',
            border: false,
            split:true,
            margins: '2 0 5 5',
            width: 275,
            minSize: 100,
            maxSize: 500,
            items: [treePanel, detailsPanel]
        },
        contentPanel
        ],
        renderTo: Ext.getBody()
    });
});