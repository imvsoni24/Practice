let user = JSON.parse(localStorage.getItem("users"));
if (user == null) {
  document.getElementById("protect").href = "#";
} else {
  document.getElementById("protect").href = "recipe.html";
}

let button = document.getElementById("add");
button.addEventListener("click", openPrompt);
let form = document.querySelector("form")
form.style.display = "none";
function openPrompt() {
    form.style.display="block"
}

form.addEventListener("submit",addRecipe)

async function addRecipe(e){
    e.preventDefault()
    let item = document.getElementById("items");
    let itemArr = item.value.split(",")
    e.preventDefault()
    let data = {
        username:user.username,
        title:form.title.value,
        image:form.img.value,
        description:form.desc.value,
        category:form.category.value,
        instruction:form.instruction.value,
        item:itemArr
    }
    let res = await fetch("https://mock4-2.onrender.com/recipes", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    res = await res.json()
    if(res){
        alert("Item has been added")
        getData()
    }
    console.log(res)
}

let container = document.getElementById("container");
async function getData() {
  let res = await fetch(
    `https://mock4-2.onrender.com/recipes?username=${user.username}`
  );
  res = await res.json();
  
  console.log(res);
  appendData(res);
}
getData();

function appendData(data) {
  container.innerHTML = null;
  data.forEach(function (el) {
    let div = document.createElement("div");
    let image = document.createElement("img");
    image.src = el.image;
    let title = document.createElement("h3");
    title.innerText = el.title;
    let description = document.createElement("p");
    description.innerText = el.description;
    let category = document.createElement("h4");
    category.innerText = el.category;
    let view = document.createElement("button");
    view.innerText = "Delete Recipe";
    view.onclick = () => {
      deleteR(el.id)
    };
    let edit = document.createElement("button");
    edit.innerText = "Edit Recipe";
    edit.onclick = () => {
      localStorage.setItem("edit", JSON.stringify(el));
      window.location.href = `edit.html`;
    };
    div.append(image, title, description, category, view,edit);
    container.append(div);
  });
}

 async function deleteR(id){
   let res = await fetch(`https://mock4-2.onrender.com/recipes/${id}`, {
     method: "DELETE",
     headers: {
       "Content-Type": "application/json",
     },
   });
   await res.json();
   getData()
}