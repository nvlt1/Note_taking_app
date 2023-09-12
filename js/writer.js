// const { json } = require("express");

// gets item called 'notes' from browser local storage. If theres nothing, it'll return null
let notes = JSON.parse(localStorage.getItem('notes')) || [];

function updateSaveTime(){
    // new Date creates a new date obj representing current date and time
    // toLocaleTimeString converts this date to a localized time string
    const currentTime = new Date().toLocaleTimeString();
    // gets element with id save-time and updates the text to show the last saved time
    document.getElementById('save-time').innerText = 'Last Saved: ' + currentTime;
}

function saveNotes() {
    // stores notes array into local storage as a JSON string
    localStorage.setItem('notes', JSON.stringify(notes));
    // update save time function is called to refresh the displayed last saved time
    updateSaveTime();
}


function displayNotes(){
    // gets the HTML element with id notes-container where all notes are displayed
    const container = document.getElementById('notes-container');
    // clear any existing content inside the container
    container.innerHTML = '';
    // loop through each note in the notes array
    notes.forEach((note, index) => {
        // create a new div element for each note
        const noteSection = document.createElement('div');
        // assign a class name 'note-section' to the div created above
        noteSection.className = 'note-section';
        
        //create a new element where notes can be written or edited
        const textarea = document.createElement('textarea');
        //set the value of the textarea to the content of the current note
        textarea.value = note.content;

        // adds an event listner to the textarea
        // when a user types inside it, it'll update the corresponding notes content in the notes array
        textarea.addEventListener('input', (event) => {
            notes[index].content = event.target.value;
        });

        // create a new button element
        const removeBtn = document.createElement('button');
        // setting the button text to 'remove'
        removeBtn.innerText = 'Remove';
        // adding event listener to the button. Removes current note from the array,
        // re-display the notes, and save them to local storage
        removeBtn.addEventListener('click', () => {
            notes.splice(index, 1);
            displayNotes();
            saveNotes();
        });
        // appends the textarea and button to the note section,
        // then note section to the main container
        noteSection.appendChild(textarea);
        noteSection.appendChild(removeBtn);
        container.appendChild(noteSection);


    });
}

// adds event listener to the element with id 'add-button'. When clicked, it'll add
// a new empty note to the array and re-display the notes
document.getElementById('add-button').addEventListener('click',
notes.push({content: ''}));

// Calls displayNotes function initially to show any existing notes when the script runs
displayNotes();

setInterval(saveNotes, 2000);