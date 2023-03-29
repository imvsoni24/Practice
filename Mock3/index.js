let currentPage = 1;
let dataPerPage = 5
async function getData(page) {
  let response = await fetch(
    `https://api.thecatapi.com/v1/breeds?page=${page}&limit=${dataPerPage}&api_key=live_JuayxYZdQNS1tqISLtK7hIstnwZTpqPIqncLYCR0ZLJvvZtaRjFcK4R8duRG946f`
  );
  response = await response.json();
  console.log(response);
  appendData(response);
}
getData(currentPage);

let mainDiv = document.getElementById("cat");
function appendData(data) {
    mainDiv.innerHTML=null
  data.forEach(function (el, i) {
    let div = document.createElement("div");
    let img = document.createElement("img");
    img.src = el.image.url;
    console.log(el.image.url)
    let name = document.createElement("h1");
    name.innerText = el.name;
    let desc = document.createElement("p");
    desc.innerText = el.description.substring(0,250)+"..";
    let origin = document.createElement("h2");
    origin.innerText = `Origin: ${el.origin}`;
    let span = document.createElement("h2");
    span.innerText = `Life Span: ${el.life_span}`;
    let temper = document.createElement("h2");
    temper.innerText = el.temperament;
    let url = document.createElement("a");
    url.innerText=" See more on Wikipedia"
    url.target="_blank"
    url.href = el.wikipedia_url;
    let imgUrl = document.createElement("button");
    imgUrl.innerText="View Images"
    imgUrl.onclick=()=>{
        // window.location.href=`cat.html?id=${el.id}`
        localStorage.setItem("id",el.id)
        window.location.href="cat.html"
    }
    div.append(img, name, desc, origin, span, temper, url,imgUrl);
    mainDiv.append(div);
  });
}

let buttons;
let btnDiv = document.getElementById("buttons");
let prevBtn = document.createElement("button")
let nextBtn = document.createElement("button");
function createButtons(totalData,dataPerPage){
    buttons = Math.ceil(totalData/dataPerPage);
    btnDiv.innerHTML=null
    prevBtn.innerText = "Prev";
    prevBtn.onclick = () => {
      displayData(currentPage - 1);
    };
    btnDiv.append(prevBtn);
    for(let i=1;i<=buttons;i++){
        let btn = document.createElement("button");
        btn.innerText=i;
        btn.onclick=()=>{
            displayData(i)
        }
        btnDiv.append(btn);
    }
    nextBtn.innerText = "Next";
    nextBtn.onclick = () => {
      displayData(currentPage + 1);
    };
    btnDiv.append(nextBtn);
    
    
}

function displayData(page){
    currentPage=page
    prevBtn.disabled=currentPage===1
    nextBtn.disabled=currentPage===buttons
    getData(page)
}


    async function getTotalData() {
      let response = await fetch(
        "https://api.thecatapi.com/v1/breeds?api_key=live_JuayxYZdQNS1tqISLtK7hIstnwZTpqPIqncLYCR0ZLJvvZtaRjFcK4R8duRG946f"
      );
      response = await response.json();
      createButtons(response.length,dataPerPage)
    }
    getTotalData();

    
