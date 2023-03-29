let form = document.getElementById("form")
form.addEventListener("submit",sendData);

async function sendData(e){
    e.preventDefault();
    let data = {
      category: form.category.value,
      image_url: form.image.value,
    };
     let response = await fetch("https://mock4-2.onrender.com/mock", {
       method: "POST",
       body: JSON.stringify(data),
       headers: {
         "Content-Type": "application/json",
       },
     });
     res = await response.json();
     console.log(res);
}

let tbody = document.querySelector("tbody");
async function getData(){
    let response = await fetch("https://mock4-2.onrender.com/hotels")
    res = await response.json()
    appendData(res,tbody)
}
getData()

function appendData(data,tbody){
    tbody.innerHTML=null
    data.forEach(function (el){
          let row = document.createElement("tr");
         let id =  document.createElement("td");  
         id.innerText=el.id
         let category= document.createElement("td");
         category.innerText=el.category
         let room= document.createElement("td");
         room.innerText = el.type_of_room;
         let bed= document.createElement("td");
         bed.innerText=el.bed_type
         let person= document.createElement("td");
         person.innerText = el.no_of_persons;
         let capacity= document.createElement("td");
         capacity.innerText=el.capacity
         let cost = document.createElement("td");
         cost.innerText=el.cost
         let status= document.createElement("td");
         status.innerText=el.booked
         let editButton= document.createElement("td");
         editButton.innerText="Edit";
         editButton.addEventListener("click",function(){
            editData(el)
         })
         let deleteButton = document.createElement("td");
         deleteButton.innerText="Delete"
         deleteButton.addEventListener("click", function () {
           deleteData(el);
         });
         row.append(id,category,room,bed,person,capacity,cost,status,editButton,deleteButton)
         tbody.append(row)
    })
}

async function deleteData(el){
    let response = await fetch(`https://mock4-2.onrender.com/hotels/${el.id}`, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response)
    getData()

}

function openCheck(dialog) {
  if (dialog.open) {
    console.log("Dialog open");
  } else {
    console.log("Dialog closed");
  }
}
const cancelButton = document.getElementById("cancel");
const dialog = document.getElementById("dialog");
function editData(el) {
    
   dialog.showModal();
  openCheck(dialog);
  
  document.getElementById("update").addEventListener("click",function (){
    updateData(el)
    dialog.close();
    openCheck(dialog);
  })
}
cancelButton.addEventListener("click", () => {
  dialog.close();
  openCheck(dialog);
});


async function updateData(el){
     let typeOfRoom2 = document.querySelector(`input[name="updateroom"]:checked`).value
     let category=document.getElementById("updatecategory").value;
     let image_url=document.getElementById("updateimage").value;
     let bed_type=document.getElementById("updatebed").value;
     let no_of_persons=document.getElementById("updateadult").value;
     let capacity=document.getElementById("updatecapacity").value;
     let cost=document.getElementById("updatecost").value;
     let data = {
      category:category.length?category:el.category ,
      image_url:image_url.length?image_url:el.image_url ,
      type_of_room:typeOfRoom2.length?typeOfRoom2:el.type_of_room,
      bed_type:bed_type.length?bed_type:el.bed_type,
      no_of_persons:no_of_persons.length?no_of_persons:el.no_of_persons,
      capacity:capacity?capacity:el.capacity,
      cost:cost?cost:el.cost,
    };
    console.log(data)
    
     let response = await fetch(`https://mock4-2.onrender.com/hotels/${el.id}`, {
       method: "PATCH",
       body: JSON.stringify(data),
       headers: {
         "Content-Type": "application/json",
       },
     });
     res = await response.json();
     console.log(res)
     getData();
}