let currentPage = 1;
let dataPerPage = 4;


async function getData(page) {
  let response = await fetch(`https://mock4-2.onrender.com/hotels?_page=${page}&_limit=${dataPerPage}`);
  res = await response.json();
  console.log(res)
  appendData(res);
}
getData(currentPage);


let mainDiv = document.getElementById("mainDiv")
function appendData(data) {
  mainDiv.innerHTML = null;
  data.forEach(function (el) {
    let div = document.createElement("div");
    let image = document.createElement("img");
    image.src = el.image_url;
    image.style.width="200px"
    let category = document.createElement("h1");
    category.innerText = el.category;
    let person = document.createElement("p");
    person.innerText = `Adults: Max Capacity ${el.no_of_persons}`;
    let capacity = document.createElement("p");
    capacity.innerText = `Capacity: ${el.capacity}`;
    let room = document.createElement("p");
    room.innerText =`Facilities: ${el.type_of_room}` ;
    let bed = document.createElement("p");
    bed.innerText = `Bed Type: ${el.bed_type} Bed` ;
    let cost = document.createElement("p");
    cost.innerText = `Price: ${el.cost}/night`;
    let editButton = document.createElement("p");
    editButton.innerText = "Book Now";
    editButton.style.padding="10px"
    editButton.addEventListener("click", function () {
      editData(el);
      editButton.disabled=true
    });
    div.append(
      image,
      category,
      person,
      capacity,
      room,
      bed,
      cost,
      editButton,
    );
    mainDiv.append(div);
  });
}

async function editData(el){
    console.log(el.booked)
    let data ={
        booked:true
    }
    let response = await fetch(`https://mock4-2.onrender.com/hotels/${el.id}`, {
       method: "PATCH",
       body: JSON.stringify(data),
       headers: {
         "Content-Type": "application/json",
       },
     });
     getData();

}

let buttons;
let btnDiv = document.getElementById("buttons");
let prevBtn= document.createElement("button")
let nextBtn = document.createElement("button");
function createButtons(totalData,dataPerPage){
    buttons = Math.ceil(totalData/dataPerPage)
    btnDiv.innerHTML=null;
    prevBtn.innerText="Prev"
    prevBtn.onclick=()=>{
        displayData(currentPage-1)
    }
    btnDiv.append(prevBtn)
    for(let i=1;i<=buttons;i++){
        let btn = document.createElement("button");
        btn.innerText=i;
        btn.onclick=()=>{
            displayData(i)
        }
        btnDiv.append(btn)
    }
    nextBtn.innerText = "Next";
    nextBtn.onclick = () => {
      displayData(currentPage + 1);
    };
    btnDiv.append(nextBtn);
}
function displayData(page){
    currentPage=page
    prevBtn.disabled=currentPage==1
    nextBtn.disabled=currentPage==buttons
    getData(page)
}
async function getTotalData() {
  let response = await fetch(
    `https://mock4-2.onrender.com/hotels`
  );
  res = await response.json();
  createButtons(res.length,dataPerPage)
}
getTotalData()

let sortA = document.getElementById("sortLtoH");
sortA.onclick=()=>{
    sortingA()
}

let sortD = document.getElementById("sortHtoL");
sortD.onclick=()=>{
    sortingD()
}

const sortingA=async()=>{
    mainDiv.innerHTML=null;
    let res = await fetch("https://mock4-2.onrender.com/hotels?_sort=price&_order=asc")
    res = await res.json()
    appendData(res)
}
const sortingD = async () => {
  mainDiv.innerHTML = null;
  let res = await fetch(
    "https://mock4-2.onrender.com/hotels?_sort=price&_order=desc"
  );
  res = await res.json();
  appendData(res);
};

document.getElementById("updatecategory").addEventListener("click",filter)
