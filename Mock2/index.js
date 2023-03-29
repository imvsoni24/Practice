let form = document.querySelector("form");
form.addEventListener("submit",sendData);
let arr = JSON.parse(localStorage.getItem("data")) || [];



function sendData(e){
    e.preventDefault();
    let designation = document.querySelector(`input[name="designation"]:checked`).value
    let data = {
        id:form.unique.value,
        name:form.name.value,
        reason:form.reason.value,
        designation:designation,
        startDate:form.startDate.value,
        endDate:form.endDate.value,
        overseer:form.overseer.value,
    }
    console.log(data)
    let check = false;
    for(let i=0;i<arr.length;i++){
        if(arr[i].id==data.id){
            check=true;
            break;
        }
    }
    if(check){
        alert("Id must be unique");
    }else{
        arr.push(data);
        localStorage.setItem("data", JSON.stringify(arr));
    }
    
}