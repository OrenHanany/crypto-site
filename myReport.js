let reportsData= [];
let reportURL=""


/*<script defer src="https://canvasjs.com/assets/script/jquery-1.11.1.min.js"></script>
    <script defer src="https://canvasjs.com/assets/script/jquery.canvasjs.min.js"></script>*/
const liveReport = () => {
    $("#chartContainer").empty()
    $("#chartContainer").show();
    graph();
};

const graph = () => {
    $("#mainPage").html("");

    let yValue= Number;
    let updateInterval = 2000;
    let dataPoints1 = [];
    let dataPoints2 = [];
    let dataPoints3 = [];
    let dataPoints4 = [];
    let dataPoints5 = [];
    let allDAtaPoints=[
        dataPoints1,
        dataPoints2,
        dataPoints3,
        dataPoints4,
        dataPoints5,
    ]
    
    const options = {
        title: {
            text: "Live Report"
        },
        axisX: {
            title: "chart updates every 2 secs"
        },
        axisY: {
            suffix: "$"
        },
        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer",
            verticalAlign: "top",
            fontSize: 22,
            fontColor: "dimGrey",
            itemclick: toggleDataSeries
        },
        data: [
        {
        type: "line",
        xValueType: "dateTime",
        yValueFormatString: "###.00$",
        xValueFormatString: "hh:mm:ss TT",
        showInLegend: true,
        name: "",
        dataPoints: dataPoints1
        },
        {
            type: "line",
            xValueType: "dateTime",
            yValueFormatString: "###.00$",
            xValueFormatString: "hh:mm:ss TT",
            showInLegend: true,
            name: "",
            dataPoints: dataPoints2
        },
        {
            type: "line",
            xValueType: "dateTime",
            yValueFormatString: "###.00$",
            xValueFormatString: "hh:mm:ss TT",
            showInLegend: true,
            name: "",
            dataPoints: dataPoints3
        },
        {
            type: "line",
            xValueType: "dateTime",
            yValueFormatString: "###.00$",
            xValueFormatString: "hh:mm:ss TT",
            showInLegend: true,
            name: "",
            dataPoints: dataPoints4
        },
        {
            type: "line",
            xValueType: "dateTime",
            yValueFormatString: "###.00$",
            xValueFormatString: "hh:mm:ss TT",
            showInLegend: true,
            name: "",
            dataPoints: dataPoints5
        },
    ]
    };
    
    $("#chartContainer").CanvasJSChart(options);
    
    function toggleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else {
            e.dataSeries.visible = true;
        }
        e.chart.render();
    }
    
    
       
    var time = new Date;
    
    function updateChart(count) {
        
        count = count || 1;
        var deltaY1, deltaY2, deltaY3;
            time.setTime(time.getTime() + updateInterval);
            deltaY1 = -1 + Math.random() * (1 + 1);
            deltaY2 = -1 + Math.random() * (1 + 1);
            deltaY3 = -1 + Math.random() * (1 + 1);
            let list=`${userList.join(",")}`
            list= list.toUpperCase();
            reportURL=`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${list}&tsyms=BTC,USD,EUR&api_key=7bc61fa9355e64aee32b09e47e38dcd6e2b60c8a22a80ef3ce54be752bb2244a`
            
                $.ajax({
                    url: reportURL,
                    type: "GET",
                    success: (Data) => {
                    reportsData = Data;
                    userList.map((item,index)=>{
                        item= item.toUpperCase();
                        let price = (reportsData[item].USD);
                        options.data[index].name=item + ": $" + price;
                        (allDAtaPoints[index]).push({
                            x: time.getTime(),
                            y: price,
                        })
                    })
                    },
                    error: (error) => {
                    console.log(error);
                    },
                })
        
        // updating legend text with  updated with y Value 
        options.data.map((data) =>{
            data.legendText= data.name ;
        })
        $("#chartContainer").CanvasJSChart().render();
        
    }
    // generates first set of dataPoints 
    updateChart(100);
    setInterval(function () { updateChart() }, updateInterval);
    
    
}
