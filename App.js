Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',

    launch: function() {
        //Write app code here
        console.log("running!");
        // Ext.create("Rally.data.lookback.SnapshotStore",storeConfig);
        var TIME_PERIOD_IN_MONTHS = 1,
         TIME_PERIOD_IN_MILLIS = 1000 * 60 * 60 * 24 * 30 * TIME_PERIOD_IN_MONTHS;
        
        // calculate time period
        var today = new Date(),
            timePeriod = new Date(today - TIME_PERIOD_IN_MILLIS);

        // get the current project
        var project = this.getContext().getProject().ObjectID;
        console.log("project",project);

        var storeConfig = this.createStoreConfig(project,timePeriod);

        // Ext.create("Rally.data.lookback.SnapshotStore",storeConfig);
        this.chartConfig.calculatorConfig.startDate = timePeriod;
        this.chartConfig.calculatorConfig.endDate = today;
        this.chartConfig.storeConfig = storeConfig;
        this.add(this.chartConfig);

    }, 

    createStoreConfig : function(project, validFrom ) {

        // store config goes here
        return {
            
            listeners : { 
                load : function(store,data) {
                    console.log("data",data.length);
                }
            },

            filters: [
                {
                    property: '_ProjectHierarchy',
                    operator : 'in',
                    value : [project] // 5970178727
                },
                {
                    property: '_TypeHierarchy',
                    operator: 'in',
                    value: ['HierarchicalRequirement']
                },
                {
                    property: '_ValidFrom',
                    operator: '>',
                    value: validFrom
                }
            ],
            autoLoad : true,
            limit: Infinity,
            fetch: ['ObjectID','Name', '_TypeHierarchy','_ItemHierarchy','Blocked','ScheduleState','Feature','Parent'],
            hydrate: ['_TypeHierarchy','ScheduleState']
        };

    },
    
        chartConfig: {
        xtype: 'rallychart',
        itemId : 'myChart',
        chartColors: ['Green', 'Red','LightGreen'],
        
        storeConfig: { },
        calculatorType: 'MyTestCaseCalculator',
        
        calculatorConfig: {
        },

        chartConfig: {
            plotOptions: {
                column: { stacking: 'normal'}
            },
            chart: { },
            title: { text: 'Blocking History' },
            xAxis: {
                tickInterval: 1,
                labels: {
                    formatter: function() {
                        var d = new Date(this.value);
                        return ""+(d.getMonth()+1)+"/"+d.getDate();
                    }
                },
                title: {
                    text: 'Date'
                }
            },
            yAxis: [
                {
                    title: {
                        text: 'Count'
                    }
                }
            ]
        }
    }    

    
});
