let notes = JSON.parse(localStorage.getItem('notes')) || [];

function updateSaveTime() {
    const currentTime = new Date().toLocaleTimeString();
    document.getElementById('save-time').innerText = 'Last Saved: ' + currentTime;
}

function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
    updateSaveTime();
}

function displayNotes() {
    const container = document.getElementById('notes-container');
    container.innerHTML = '';
    notes.forEach((note, index) => {
        const noteSection = document.createElement('div');
        noteSection.className = 'note-section';

        const textarea = document.createElement('textarea');
        textarea.value = note.content;
        textarea.addEventListener('input', (event) => {
            notes[index].content = event.target.value;
        });

        const removeBtn = document.createElement('button');
        removeBtn.innerText = 'Remove';
        removeBtn.addEventListener('click', () => {
            notes.splice(index, 1);
            displayNotes();
            saveNotes();
        });

        noteSection.appendChild(textarea);
        noteSection.appendChild(removeBtn);
        container.appendChild(noteSection);
    });
}

document.getElementById('add-button').addEventListener('click', () => {
    notes.push({ content: '' });
    displayNotes();
});

displayNotes();

setInterval(saveNotes, 2000);
