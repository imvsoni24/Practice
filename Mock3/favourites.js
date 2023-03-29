let arr = JSON.parse(localStorage.getItem("cat")) || [];
let mainDiv = document.getElementById("mainDiv");
function appendData(data) {
  mainDiv.innerHTML = null;
  data.forEach(function (el,i) {
    let innerDivDiv = document.createElement("div");
    let img = document.createElement("img");
    img.src = el.url;
    let btn = document.createElement("button");
    btn.innerText = "Remove";
    btn.onclick = () => {
      removeItem(arr,i)
    };
    innerDivDiv.append(img, btn);
    mainDiv.append(innerDivDiv);
  });
}
appendData(arr);

function removeItem(data,index){
    arr=data.filter(function (el,i){
        return i!==index
    })
    localStorage.setItem("cat",JSON.stringify(arr))
    appendData(arr)
}
