let user = JSON.parse(localStorage.getItem("users"));
if (user == null) {
  document.getElementById("protect").href = "#";
} else {
  document.getElementById("protect").href = "recipe.html";
}
let form = document.querySelector("form");
form.addEventListener("submit", login);
let arr = JSON.parse(localStorage.getItem("users")) || [];
async function login(e) {
  e.preventDefault();
  let data = {
    email: form.email.value,
    password: form.pass.value,
  };
  let res = await fetch("https://mock4-2.onrender.com/mock6Users");
  res = await res.json();
  console.log(res)
  let found = false;
  for (let i = 0; i < res.length; i++) {
    if (res[i].email === data.email && res[i].password == data.password) {
      localStorage.setItem("users", JSON.stringify(res[i]));
      found = true;
      break;
    }
  }
  if (found) {
    alert("login successful");  
    window.location.href = "home.html";
  } else {
    alert("login failed");
  }
}
