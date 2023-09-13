// let btn = document.createElement('button');
// btn.innerHTML = 'YES';
// document.body.appendChild(btn);

function retrieveNotes(){
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const container = document.getElementById('notes-display');
    container.innerHTML = '';

    notes.forEach(note => {
        const noteSection = document.createElement('div');
        noteSection.className = 'note-section';
        noteSection.innerText = note.content;
        container.appendChild(noteSection);
    });
    const currentTime = new Date().toLocaleTimeString();
    document.getElementById('retrieve-time').innerText = 'Last Retrieved ' + currentTime;
}

setInterval(retrieveNotes, 2000);
