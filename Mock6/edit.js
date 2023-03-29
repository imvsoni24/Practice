let editdata = JSON.parse(localStorage.getItem("edit")) || null;
let user = JSON.parse(localStorage.getItem("users"));
if (user == null) {
  document.getElementById("protect").href = "#";
} else {
  document.getElementById("protect").href = "recipe.html";
}

let form = document.querySelector("form");

form.addEventListener("submit", editRecipe);

async function editRecipe(e) {
  e.preventDefault();
  let item = document.getElementById("items");
  let itemArr = item.value.split(",");
  e.preventDefault();
  let data = {
    username: editdata.username,
    title: form.title.value || editdata.title,
    image: form.img.value || editdata.image,
    description: form.desc.value || editdata.description,
    category: form.category.value || editdata.category,
    instruction: form.instruction.value || editdata.instruction,
    item: itemArr || editdata.item,
  };
  console.log(data)
  let res = await fetch(`https://mock4-2.onrender.com/recipes/${editdata.id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  res = await res.json();
  if (res) {
    alert("Item has been updated");
    window.location.href="recipe.html"
    
  }
  console.log(res);
}