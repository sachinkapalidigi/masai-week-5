var btnGet = document.getElementById('btnGet');
btnGet.addEventListener('click',function(){
    var inputId = document.querySelector('input').value;
    getDetails(inputId);
})


var getDetails = function (id) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET','https://api.coingecko.com/api/v3/coins/'+id);
    xhr.send();

    xhr.onload = function () {
        if (xhr.status == 200) {
            displayDetails(JSON.parse(xhr.response),getChart);           
        } else {
            console.log(xhr.status);
        }
    }
}


var displayDetails = function (data,callBack){
    var dataSection = document.getElementById('dataSection'); 
    dataSection.innerHTML = '';
    var h3 = document.createElement('h3');
    h3.setAttribute('class','text-primary');
    h3.innerHTML = data.name;
    dataSection.appendChild(h3);
    var ptag1 = document.createElement('p');
    ptag1.innerHTML = data.genesis_date;
    dataSection.appendChild(ptag1);
    var ptag2 = document.createElement('p');
    ptag2.innerHTML = data.market_data.current_price.inr;
    dataSection.appendChild(ptag2);

    callBack(data.id);
}


var getChart = function(id) {
    console.log(id);
    var xhr = new XMLHttpRequest();
    xhr.open('GET','https://api.coingecko.com/api/v3/coins/'+id+'/market_chart?vs_currency=usd&days=100');
    xhr.send();

    xhr.onload = function() {
        if (xhr.status == 200) {
            displayChart(JSON.parse(xhr.response));
        } else {
            console.log('error in chart',xhr.status);
        }
    }
}

var displayChart = function(data) {
    
    // $.jqplot('chartSection', data.prices );
    plot1 = $.jqplot('chartSection', [data.prices], { 
        series: [{ 
            renderer: $.jqplot.OHLCRenderer,
            rendererOptions: {
                candleStick: true
            } 
        }], 
        axes: { 
            xaxis: { 
                renderer:$.jqplot.DateAxisRenderer,
                rendererOptions: {
                    tickInset: 0
                },
                tickRenderer: $.jqplot.CanvasAxisTickRenderer,
                tickOptions: {
                  angle: -30
                } 
            }, 
            yaxis: {  
                renderer: $.jqplot.LogAxisRenderer,
                tickOptions:{ prefix: '$' } 
            } 
        }, 
        cursor:{
            show: true, 
            zoom: true
        } 
    });
}


