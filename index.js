let noteSection = document.getElementById("note-section");
let addNoteButton = document.getElementById("add-note");
let colorArray = ["#FF9999", "#FFCC99", "#FFFF999", "#CCFF99", "#99FF99", "#99FFCC", "#99FFCC", "#99CCFF", "#9999FF", "#CC99FF", "#FF99FF", "#FF99CC"]
let closeButton = document.getElementById("close-button");
let noteForm = document.getElementById("note-container");
let submitButton = document.getElementById("submit-button")
let inputTitle = document.getElementById("inputTitleBox")
let inputNote = document.getElementById("inputNoteBox")
let warningMessage = document.getElementById("warning-message")
let noteLength = document.getElementById("note-length")

noteForm.classList.add("hide")

function numberOfNotes(data) {
    noteLength.textContent = `Total Notes: ${data}`
}

let data = JSON.parse(localStorage.getItem("localNotesData"))
if (data === null) {
    localStorage.setItem("localNotesData", JSON.stringify([]))
    data = JSON.parse(localStorage.getItem("localNotesData"))
}



function addNote(id) {
    if (id) {
        submitButton.textContent = 'Save Note'
        closeButton.classList.add("hide")
        noteForm.classList.add("show")
        noteForm.classList.remove("hide")
    }
    else {
        submitButton.textContent = 'Add Note'
        closeButton.classList.remove("hide")
        noteForm.classList.add("show")
        noteForm.classList.remove("hide")
    }

}


function hide() {
    noteForm.classList.add("hide")
    noteForm.classList.remove("show")
}

function addDataToLocalStorage(dataEnteredByUser) {
    data = JSON.parse(localStorage.getItem("localNotesData"))
    data.push(dataEnteredByUser)
    localStorage.setItem("localNotesData", JSON.stringify(data))
    return null
}

submitButton.addEventListener("click", submitForm)

function submitForm(event) {
    event.preventDefault()
    let title = inputTitle.value
    let note = inputNote.value
    if (title.trim() === "" || note.trim() === "") {
        warningMessage.style.color = "red"
        warningMessage.textContent = "*Input fields can't be empty."
    } else {
        let date = new Date().toLocaleString().toString()
        warningMessage.textContent = ""
        let dataEnteredByUser = {
            id: self.crypto.randomUUID(),
            titleText: title,
            noteText: note,
            date: date,
        }
        let temp = addDataToLocalStorage(dataEnteredByUser)
        inputNote.value = ""
        inputTitle.value = ""
        hide()
        displayNotes(title, note, date, dataEnteredByUser.id)
    }
}

function deleteNoteCard(id) {
    let selectedDeletionElement = document.getElementById(id);
    noteSection.removeChild(selectedDeletionElement)
    let dataFromLocalStorageForSearching = JSON.parse(localStorage.getItem("localNotesData"))
    let filterData = dataFromLocalStorageForSearching.filter(e => e.id !== id)
    localStorage.setItem("localNotesData", JSON.stringify(filterData))
    numberOfNotes(filterData.length)
}

function editNoteCard(id) {
    let getDataForEdit = JSON.parse(localStorage.getItem("localNotesData"))

    let selectedNote = getDataForEdit.find(e => e.id === id)

    inputNote.value = selectedNote.noteText
    inputTitle.value = selectedNote.titleText

    addNote(id)
    deleteNoteCard(id)

}

function displayNotes(title, note, date, id) {
    numberOfNotes(data.length)
    let index = colorArray[Math.ceil(Math.random() * colorArray.length - 1)]
    let newDateElement = document.createElement("p")
    newDateElement.textContent = date

    let noteCard = document.createElement("div");
    noteCard.setAttribute("id", id)
    noteCard.classList.add("col-12", "col-md-4", "col-lg-3", "mt-5");
    let cardContent = document.createElement("div");
    let cardParagraph = document.createElement("p");
    let noteHeading = document.createElement("h3");

    let editDeleteButtonConainer = document.createElement("div")
    editDeleteButtonConainer.classList.add("buttonContainer")
    cardContent.appendChild(editDeleteButtonConainer)

    let editIcon = document.createElement("i");
    editIcon.classList.add("fa", "fa-edit", "edit-button");
    editIcon.style.fontSize = "25px"
    editDeleteButtonConainer.appendChild(editIcon)

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa", "fa-trash", "delete-button");
    deleteIcon.style.fontSize = "25px"
    editDeleteButtonConainer.appendChild(deleteIcon)

    cardContent.appendChild(noteHeading);
    cardContent.appendChild(newDateElement);

    noteHeading.textContent = title;
    cardParagraph.textContent = note;

    cardContent.appendChild(cardParagraph);

    cardContent.classList.add("cardContent");
    cardContent.style.backgroundColor = index;

    noteCard.appendChild(cardContent);
    noteSection.appendChild(noteCard);

    deleteIcon.onclick = function () {
        deleteNoteCard(id)
    }

    editIcon.onclick = function () {
        editNoteCard(id)
    }
}




for (let obj of data) {
    displayNotes(obj.titleText, obj.noteText, obj.date, obj.id)
}

