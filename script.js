// window.onload = function(){
//     console.log('this')
// }

document.onreadystatechange = function(){
    fetchData();
}

var fetchData = function(){

    var xhr = new XMLHttpRequest();
    xhr.open('GET','https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
    xhr.send();
    xhr.onload = function(){
        if(xhr.status == 200){
            showTable(JSON.parse(xhr.response));
        } else {
            //add modal
            console.log(xhr.status);
        }
    }
}

var showTable = function(data){
    var displayTable = document.getElementById('displayTable');
    
    displayTable.firstElementChild.innerHTML = '<th scope="col">#</th><th scope="col">Coin</th><th scope="col">Price</th><th scope="col">Volume</th><th scope="col">Market Cap</th><th scope="col">24hr</th><th scope="col">Circulating Supply</th>';
    // globalData = data;
    var rows = data.map((el,i)=>{        
        toolTip = "Symbol : "+ el.symbol+" Market Cap Rank :"+el.market_cap_rank ;
        var tr = document.createElement('tr');        
        td1 = document.createElement('td');        
        td1.innerHTML = '<img data-toggle="tooltip" data-html="true" data-placement="left" class="img-fluid w-25 h-25" src="'+el.image+'" title="'+toolTip+'">';
        tr.appendChild(td1);
        td2 = document.createElement('td');
        td2.setAttribute('class','align-middle');
        td2.innerHTML = el.name;
        tr.appendChild(td2);
        td3 = document.createElement('td');
        td3.innerHTML = el.current_price;
        tr.appendChild(td3);
        td4 = document.createElement('td');
        td4.innerHTML = el.total_volume;
        tr.appendChild(td4);
        td5 = document.createElement('td');
        td5.innerHTML = el.market_cap;
        tr.appendChild(td5);
        td6 = document.createElement('td');
        td6.innerHTML = el.price_change_percentage_24h;
        tr.appendChild(td6);
        td7 = document.createElement('td');
        td7.innerHTML = el.circulating_supply;
        tr.appendChild(td7);
        if (i>10) {
            tr.setAttribute('class','d-none');
                        
        }
        return tr;        
    }).forEach(element => {
       displayTable.children[1].appendChild(element); 
    });
    
}



