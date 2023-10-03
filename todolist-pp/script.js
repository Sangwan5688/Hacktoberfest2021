function addToDo() {
  const inputBox = document.getElementById("input-box");
  const text = inputBox.value;

  if (text === "") {
    alert("Try adding something to do!");
    return;
  }

  const items = document.createElement("li");
  items.className = "list-group-item";

  const listItem = document.createElement("div");
  listItem.className = "list-item";
  
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const p = document.createElement("p");
  p.innerText = text;

  const button = document.createElement("button");
  button.innerHTML = "<i class=\"bi bi-trash3\"></i>";
  button.className = "btn delete";
  button.onclick = () => {
    button.parentElement.parentElement.style.display = 'none';
  };

  listItem.appendChild(checkbox);
  listItem.appendChild(p);
  listItem.appendChild(button);

  items.appendChild(listItem);

  const listDiv = document.getElementById("list");
  listDiv.appendChild(items);
  inputBox.value = "";
}
