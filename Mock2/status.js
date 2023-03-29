let arr2 = JSON.parse(localStorage.getItem("verified")) || [];
let tbody = document.getElementById("tbody");
display(arr2);

function display(data) {
  tbody.innerHTML = null;
  data.forEach(function (el, i) {
    let row = document.createElement("tr");
    let id = document.createElement("td");
    id.innerText = el.id;
    let name = document.createElement("td");
    name.innerText = el.name;
    let overseer = document.createElement("td");
    overseer.innerText = el.overseer;
    let status = document.createElement("td");
    status.innerText = "Granted";
    row.append(
      id,
      name,
      overseer,
      status
    );
    tbody.append(row);
  });
}
