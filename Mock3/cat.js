// const params = new URLSearchParams(window.location.search)
// const id = params.get("id")
// console.log(id)
let id = localStorage.getItem("id")
console.log(id)

async function totalData(id) {
  let response = await fetch(
    `https://api.thecatapi.com/v1/images/search?id=${id}&api_key=live_JuayxYZdQNS1tqISLtK7hIstnwZTpqPIqncLYCR0ZLJvvZtaRjFcK4R8duRG946f&limit=10`
  );

  response = await response.json();
  console.log(response)
  appendData(response)
}
totalData()

let arr = JSON.parse(localStorage.getItem("cat")) || []
let mainDiv = document.getElementById("mainDiv")
function appendData(data){
    mainDiv.innerHTML=null
    data.forEach(function (el){
        let innerDivDiv = document.createElement("div")
        let img = document.createElement("img")
        img.src=el.url
        let btn = document.createElement("button");
        btn.innerText = "Favourites"
        btn.onclick=()=>{
           arr.push(el)
           localStorage.setItem("cat",JSON.stringify(arr))
        }
        innerDivDiv.append(img,btn)
        mainDiv.append(innerDivDiv)
    })
}

