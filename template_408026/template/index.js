let form = document.querySelector("form");
form.addEventListener("submit",send)
let tbody = document.querySelector("tbody");
let arr =[]
function send(e){
    e.preventDefault()
    let data = {
      name: form.compName.value,
      market: form.listedExchange.value,
      industry: form.industry.value,
      price: form.stockPrice.value,
      quantity: form.quantity.value,
      type:form.type.value,
    };
    arr.push(data)
    printData(arr);
}


function printData(arr){
    stock(arr);
    tbody.innerHTML=null
    arr.forEach(function (el,i) {
      let row = document.createElement("tr");
      let name = document.createElement("td");
      name.innerText = el.name;
      let market = document.createElement("td");
      market.innerText = el.market;
      let industry = document.createElement("td");
      industry.innerText = el.industry;
      let price = document.createElement("td");
      price.innerText = el.price;
      let quantity = document.createElement("td");
      quantity.innerText = el.quantity;
      let type = document.createElement("td");
      type.innerText = el.type;
      let total = document.createElement("td");
      total.innerText = Number(el.price*el.quantity);
      document.getElementById("totalPortfolio").innerText =  total
      let date = document.createElement("td");
      date.innerText = new Date().getDate()+"/"+(new Date().getMonth()+1)+"/"+new Date().getFullYear();
      let sell = document.createElement("td");
      sell.innerText = "Sell";
      sell.addEventListener("click",function(e){
        remove(e)
      })
      row.append(
        name,
        market,
        industry,
        price,
        quantity,
        type,
        total,
        date,
        sell
      );
      tbody.append(row);
    });
}

function stock(arr){
    document.getElementById("noOfStock").innerText=arr.length;
}
function remove(e){
    e.target.parentNode.remove()
    document.getElementById("noOfStock").innerText = arr.length;
    
}


// function value(){
//     document.getElementById("totalPortfolio").innerText =  ;
// }


