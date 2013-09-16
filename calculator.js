
Ext.define("MyTestCaseCalculator", {
   extend: "Rally.data.lookback.calculator.TimeSeriesCalculator",
   
    getMetrics: function () {
        var metrics = [
           {
                field: "Blocked",
                as: "Not Blocked",
                display: "column",
                f: "filteredCount", // count, sum, filteredSum
                filterField: "Blocked",
                filterValues: [false]
           },
            {
                field: "Blocked",
                as: "Blocked",
                display: "column",
                f: "filteredCount",
                filterField: "Blocked",
                filterValues: [true]
            },
            {
                as: "Accepted",
                display: "line",
                f: "filteredCount",
                filterField: "ScheduleState",
                filterValues: ["Accepted"]
            },
            {
                field: "BlockedNotStarted",
                as: "BlockedNotStarted",
                display: "column",
                f: "sum"
            },
        ];
        return metrics;
    },
    getDerivedFieldsOnInput : function () { 
        return [ 
            {
                as: 'BlockedNotStarted', 
                f:  function(row) {
                    return  row.Blocked == true && row.ScheduleState == "Backlog" ? 1 : 0;
                }
            }
        ];
    },
    getDerivedFieldsAfterSummary : function () {
        return [
        ];
    }

});