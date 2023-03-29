let currentPage = 1;
let dataPerPage = 5;



let user = JSON.parse(localStorage.getItem("users"));
if (user == null) {
  document.getElementById("protect").href = "#";
} else {
  document.getElementById("protect").href = "recipe.html";
}

let input = document.getElementById("search");
input.addEventListener("input", function(){
  getData()
});
let category = document.getElementById("category");
category.addEventListener("change",getData)


let container = document.getElementById("container");
async function getData(page){
   let search = document.getElementById("search").value.toLowerCase();
  let url = `https://mock4-2.onrender.com/recipes?_page=${page}&_limit=${dataPerPage}`;
  if(search){
    url = `https://mock4-2.onrender.com/recipes?_page=${page}&_limit=${dataPerPage}&title=${search}`;
  }
  if(category.value){
    url = `https://mock4-2.onrender.com/recipes?_page=${page}&_limit=${dataPerPage}&category=${category.value}`;
  }
  let res = await fetch(url)
   res = await res.json()
   console.log(res)
   appendData(res)
 }
 getData(currentPage)

 function appendData(data){
  container.innerHTML=null;
  data.forEach(function (el){
    let div = document.createElement("div")
    let image = document.createElement("img")
    image.src = el.image;
    let title = document.createElement("h3")
    title.innerText=el.title;
    let description = document.createElement("p")
    description.innerText=el.description;
    let category = document.createElement("h4")
    category.innerText=el.category;
    let view = document.createElement("button")
    view.innerText = "View Recipe"
    view.onclick = ()=>{
      localStorage.setItem("elementId",JSON.stringify(el.id))
      window.location.href=`details.html`
    }
    div.append(image,title,description,category,view)
    container.append(div)
  })
 }

let buttons;
let btnDiv = document.getElementById("buttons");
let prev = document.createElement("button");
let next = document.createElement("button");
function createButtons(totalData,dataPerPage){
  buttons = Math.ceil(totalData/dataPerPage)
  console.log(buttons)
  btnDiv.innerHTML=null
  prev.innerText = "Prev";
  prev.onclick=()=>{
    displayData(currentPage-1)
  }
  btnDiv.append(prev)
  for(let i=1;i<=buttons;i++){
    let btn = document.createElement("button")
    btn.innerText=i;
    btn.onclick=()=>{
      displayData(i)
    }
    btnDiv.append(btn)
  }
  next.innerText = "Next";
  next.onclick = () => {
    displayData(currentPage + 1);
  };
  btnDiv.append(next)
}

function displayData(page){
  currentPage=page
  prev.disabled=currentPage==1;
  next.disabled=currentPage==buttons
  getData(page)
}

async function getTotalData(){
  let res = await fetch(`https://mock4-2.onrender.com/recipes`);
   res = await res.json()
   console.log(res)
   createButtons(res.length,dataPerPage)
}
getTotalData()