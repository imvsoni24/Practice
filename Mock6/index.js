let form = document.querySelector("form");
form.addEventListener("submit",register)
let user = JSON.parse(localStorage.getItem("users"))
if(user==null){
 document.getElementById("protect").href="#";
}else{
  document.getElementById("protect").href="recipe.html"
}
console.log(user)

async function register(e){
    e.preventDefault()
    let data ={
        username:form.username.value,
        email:form.email.value,
        password:form.pass.value
    }
    let res =await fetch("https://mock4-2.onrender.com/mock6Users",{
        method:"POST",
        body:JSON.stringify(data),
        headers:{
            "Content-Type":"application/json"
        }
    });
    res = await res.json()
    if(res){
        window.location.href="signin.html"
    }
}