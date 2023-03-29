let arr = JSON.parse(localStorage.getItem("data")) || [];
let tbody = document.getElementById("tbody");
let dialog = document.getElementById("userDialog")
let filter = document.getElementById("filter")
display(arr)

function display(data){
    tbody.innerHTML=null;
    data.forEach(function(el,i){
        let row = document.createElement("tr");
        let id = document.createElement("td");
        id.innerText = el.id;
        let name = document.createElement("td")
        name.innerText=el.name
        let reason = document.createElement("td");
        reason.innerText = el.reason;
        let designation = document.createElement("td");
        designation.innerText = el.designation;
        let startDate = document.createElement("td");
        startDate.innerText = el.startDate;
        let endDate = document.createElement("td");
        endDate.innerText = el.endDate;
        let overseer = document.createElement("td");
        overseer.innerText = el.overseer;
        let otp = document.createElement("td");
        otp.innerText=Math.floor(Math.random()*(9999-1000+1)+1000)
        let rejectButton = document.createElement("td");
        rejectButton.innerText="Reject Leave";
        rejectButton.addEventListener("click",function(){
            alert("Application has been deleted")
            remove(arr,i)
        })
        let grantButton = document.createElement("td");
        grantButton.innerText = "Grant Leave";
        grantButton.addEventListener("click",function(){
            seeDetails(el,otp,arr,i)
            dialog.showModal();
            openCheck(dialog)

        })
        row.append(id,name,reason,designation,startDate,endDate,overseer,otp,rejectButton,grantButton)
        tbody.append(row)
    })
}
function remove(data,index){
    arr=data.filter(function(el,i){
        return i!=index
    })
    localStorage.setItem("data",JSON.stringify(arr));
    display(arr)
}

function openCheck(dialog){
    if(dialog.open){
        console.log("dialog is open")
    }else{
        console.log("dialog is closed");
    }
}



function seeDetails(el,otp,data,index){
    console.log(otp.innerText)
    dialog.innerHTML=null
    let img = document.createElement("img");
    img.src = "https://cdn-icons-png.flaticon.com/512/2997/2997911.png";
    img.style.width="20px"
    img.addEventListener("click", function () {
      dialog.close();
      openCheck(dialog);
    });
    let applicant = document.createElement("h1")
    applicant.innerText="Applicant"
    applicant.append((document.createElement("p").innerText = "--"+el.name));
    let overseer = document.createElement("h1");
    overseer.innerText = "Overseer";
    overseer.append((document.createElement("p").innerText = "--" + el.overseer));
    let from = document.createElement("h1");
    from.innerText = "From";
    from.append((document.createElement("p").innerText = "--" + el.startDate));
    let to = document.createElement("h1");
    to.innerText = "To";
    to.append((document.createElement("p").innerText = "--" + el.endDate));
    let input1 = document.createElement("input");
     let verify = document.createElement("button");
     verify.innerText="Verify OTP"
     verify.addEventListener("click",function(){
        if(input1.value==otp.innerText){
            let arr2 = JSON.parse(localStorage.getItem("verified")) || []
            arr2.push(el)
            localStorage.setItem("verified",JSON.stringify(arr2))
             arr = data.filter(function (el, i) {
               return i != index;
             });
             localStorage.setItem("data", JSON.stringify(arr));
             display(arr);
        }else{
            alert("OTP is wrong")
        }
     })
    dialog.append(img,applicant,overseer,from,to,input1,verify)
}

filter.addEventListener("change",function(){
    if(filter.value=="" || filter.value=="all"){
        display(arr)
    }else{
        let filteredData = arr.filter(function(el){
            return el.designation==filter.value
        })
        display(filteredData)

    }
})

function search(){
    let search = document.getElementById("search").value.toLowerCase()
    let filteredData = arr.filter(function(el){
        return el.name.toLowerCase().includes(search)
    })
    display(filteredData)
}