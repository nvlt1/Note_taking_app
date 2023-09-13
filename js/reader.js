// let btn = document.createElement('button');
// btn.innerHTML = 'YES';
// document.body.appendChild(btn);

function retrieveNotes(){
    // fetches item with the key 'notes' from the browsers local storage
    // the json.parse parses the fetched item as JSON. the array is a just in case 
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    // fetches HTML element with the id 'notes-display' and assigns it to the const containers
    const container = document.getElementById('notes-display');
    // clears any existing content in container 
    container.innerHTML = '';


    // for each note in the note array
    notes.forEach(note => {
        // create a new div for each note and assign it to the const noteSection
        const noteSection = document.createElement('div');
        // set the class name of the div to note-section
        noteSection.className = 'note-section';
        // assign the content of the current note to be visible text inside the noteSection div
        noteSection.innerText = note.content;
        // appends noteSection as a child to container displaying it on the page
        container.appendChild(noteSection);
    });
    // new date object, toLocale... converts date object into localized time string
    const currentTime = new Date().toLocaleTimeString();

    document.getElementById('retrieve-time').innerText = 'Last Retrieved ' + currentTime;
}

// sets interval for time
setInterval(retrieveNotes, 2000);
