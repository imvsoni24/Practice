let id = JSON.parse(localStorage.getItem("elementId")) || null;
console.log(id);

let user = JSON.parse(localStorage.getItem("users"));
if (user == null) {
  document.getElementById("protect").href = "#";
} else {
  document.getElementById("protect").href = "recipe.html";
}

let container = document.getElementById("container");
async function getData() {
  let res = await fetch(`https://mock4-2.onrender.com/recipes?id=${id}`);
     res = await res.json();
  console.log(res)
  appendData(res);
}
getData();

function appendData(data) {
  container.innerHTML = null;
  data.forEach(function (el) {
    let div = document.createElement("div");
    let image = document.createElement("img");
    image.src = el.image;
    image.style.width="200px"
    let title = document.createElement("h3");
    title.innerText = el.title;
    let description = document.createElement("p");
    description.innerText = el.description;
    let category = document.createElement("h4");
    category.innerText = el.category;
    let item = document.createElement("p")
    item.innerText = `Item is ${el.item}`
    let instruction = document.createElement("p")
    instruction.innerText=`Instruction is ${el.instruction}`
    let user = document.createElement("h3");
    user.innerHTML = `Created By ${el.username}`
    div.append(image, title, description, category,item,instruction,user);
    container.append(div);
  });
}
