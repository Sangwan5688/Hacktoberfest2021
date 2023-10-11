// Add Note button
let addBtn = document.getElementById("addBtn");
let textArea = document.getElementById("exampleFormControlTextarea1");
let title = document.getElementById("exampleFormControlInput1");
// Div containing all notes
let notes = document.getElementById("notes");

// Showing pre-existing notes
showNotes();

addBtn.addEventListener("click", function (e) {
  let storedNotes = localStorage.getItem("notes");
  let notesArr = [];

  // Obtaining pre-existing notes
  if (storedNotes != null) {
    notesArr = JSON.parse(storedNotes);
  }

  // Recording time of add note i.e. now
  let present = new Date();
  let now = `${present.getHours()}:${present.getMinutes()}:${present.getSeconds()} ${present.getDate()}/${
    present.getMonth() + 1
  }/${present.getFullYear()}`;

  // Recording title, content and time in local storage
  notesArr.push([title.value, textArea.value, now]);
  localStorage.setItem("notes", JSON.stringify(notesArr));

  // Emptying the text boxes
  textArea.value = "";
  title.value = "";

  // Displaying the notes list with the newly added note
  showNotes();
});

// Fetch all notes from local storage and update innerHTML
function showNotes() {
  let storedNotes = localStorage.getItem("notes");
  let notesArr = [];

  if (storedNotes != null) {
    notesArr = JSON.parse(storedNotes);
  }

  // Preparing innerHTML
  let html = "";

  notesArr.forEach(function (ele, idx) {
    if (ele[0] !== "" || ele[1] != "") {
      html += `<div class="noteCard mx-2 my-2 card" style="width: 18rem;">
          <div class="card-body">
              <h5 class="card-title">${ele[0] == "" ? "Note" : ele[0]}</h5>
              <p class="card-text">${ele[1]}</p>
              <p>Created at: ${ele[2]}</p>
              <a id="${idx}" onClick="deleteNote(this.id)" class="btn btn-primary">Delete Note</a>
          </div>
      </div>`;
    }
  });

  if (notesArr.length != 0) {
    notes.innerHTML = html;
  } else {
    notes.innerHTML = `<h1>Wow, so empty :')</h1>`;
  }
}

// Function to delete a note by index
function deleteNote(idx) {
  let storedNotes = localStorage.getItem("notes");
  let notesArr = [];

  if (storedNotes != null) {
    notesArr = JSON.parse(storedNotes);
  }

  // Deleting the note and updating localStorage
  notesArr.splice(idx, 1);
  localStorage.setItem("notes", JSON.stringify(notesArr));
  showNotes();
}

// Implementing search using input eventListener
let search = document.getElementById("searchTxt");
search.addEventListener("input", function (e) {
  let searchQry = search.value.toLowerCase();
  let noteCards = document.getElementsByClassName("noteCard");

  Array.from(noteCards).forEach(function (ele) {
    let cardTxt = ele.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(searchQry)) {
      ele.style.display = "block";
    } else {
      ele.style.display = "none";
    }
  });
});

/* 

1. title, date (Done)
2. mark as important
3. Global feed and user note filtering
4. Sync with server with web server

*/
