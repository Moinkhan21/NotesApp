// Selecting elements
let notesContainer = document.querySelector(".notes-container");
let createBtn = document.querySelector(".btn");

// Load and display notes from localStorage
function showNotes() {
    const notes = localStorage.getItem("notes");
    if (notes && notes.trim() !== "") {
        notesContainer.innerHTML = notes;
    } else {
        notesContainer.innerHTML = ""; // Clear if empty or whitespace
    }
}
showNotes(); // Display existing notes at load

// Update localStorage with current notes HTML
function updateStorage() {
    const notesHTML = notesContainer.innerHTML.trim();
    if (notesHTML === "") {
        localStorage.removeItem("notes"); // Clear storage if empty
    } else {
        localStorage.setItem("notes", notesHTML);
    }
}

// Event listener for "Create Notes" button
createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "images/delete.png";
    img.alt = "Delete Note"; // Accessibility
    img.className = "delete-btn";
    inputBox.appendChild(img);
    notesContainer.appendChild(inputBox);
    updateStorage(); // Update storage after adding new note
});

// Event delegation for delete functionality and input keyup
notesContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "IMG" && e.target.classList.contains("delete-btn")) {
        e.target.parentElement.remove();
        updateStorage(); // Update storage after deletion
    } else if (e.target.classList.contains("input-box")) {
        e.target.onkeyup = function() {
            updateStorage(); // Save changes on keyup
        };
    }
});

// Prevent 'Enter' key from creating new lines and insert line break instead
document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
});

// Optional "Clear All" Button Implementation
const clearAllBtn = document.createElement("button");
clearAllBtn.innerText = "Clear All Notes";
clearAllBtn.className = "clear-all-btn";
document.querySelector(".container").appendChild(clearAllBtn);

// Event listener for clearing all notes
clearAllBtn.addEventListener("click", () => {
    notesContainer.innerHTML = "";
    localStorage.removeItem("notes"); // Remove all notes from localStorage
});
