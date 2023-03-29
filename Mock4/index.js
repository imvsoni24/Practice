function onload(){
    (document.getElementById("mainForm").style.display = "none");
}
onload()

document.getElementById("register").addEventListener("click",toggleForm)

function toggleForm(){
    document.getElementById("mainForm2").style.display = "none";
    document.getElementById("mainForm").style.display = "block";
}

document.getElementById("login").addEventListener("click", toggleForm2);

function toggleForm2() {
  document.getElementById("mainForm2").style.display = "block";
  document.getElementById("mainForm").style.display = "none";
}

document.getElementById("mainForm2").addEventListener("submit",login)
async function login(e){
    e.preventDefault()
    let loginEmail = document.getElementById("loginEmail").value
    let loginPassword = document.getElementById("loginPassword").value;
    let data ={
        email:loginEmail,
        password:loginPassword
    }
    let response = await fetch("https://reqres.in/api/login",{
        method:"POST",
        body:JSON.stringify(data),
        headers:{
            "Content-Type":"application/json"
        }
    });
    res = await response.json()
    console.log(res)
    if(res.token){
        window.location.href="admin.html"
    }else{
        let response = await fetch("https://mock4-2.onrender.com/users");
        res = await response.json();
        console.log(res)
        let found = false
        for(let i=0;i<res.length;i++){
           if (res[i].email == data.email && res[i].password == data.password) {
           found = true //  alert("Login successfull");
           }
        }
        if(found){
            alert("Login successfull")
            window.location.href="hotel.html"
        }else{
            alert("Login Failed")
        }
        
    }
}
document.getElementById("mainForm").addEventListener("submit", register);
async function register(e) {
  e.preventDefault();
  let username = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let repeatPassword = document.getElementById("repeatPassword").value;
  if(password===repeatPassword){
    let data = {
      username,
      email,
      password,
    };
    let response = await fetch("https://mock4-2.onrender.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    res = await response.json();
    console.log(res);
    if (res.token) {
      window.location.href = "admin.html";
    }
  }else{
    alert("Your password doesn't match with repeat password")
  }
  
}