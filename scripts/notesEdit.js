'use strict'
const noteId = location.hash.substring(1);

let notes = getSavedNotes();

let note = notes.find(note => note.id === noteId)

if (!note) location.assign('/index.html');

document.querySelector('#inputBody').value = note.body;
document.querySelector('#inputTitle').value = note.title;
document.querySelector('#spanEdited').textContent = generateLastEdited(note.updatedAt);


document.querySelector('#inputBody').addEventListener('input',(e)=> {
    note.body = e.target.value;
    note.updatedAt = moment().valueOf()
    saveNotes();
    document.querySelector('#spanEdited').textContent = generateLastEdited(note.updatedAt);
});

document.querySelector('#inputTitle').addEventListener('input',(e) => {
    note.title = e.target.value;
    note.updatedAt = moment().valueOf()
    saveNotes();
    document.querySelector('#spanEdited').textContent = generateLastEdited(note.updatedAt);
});

document.querySelector('#buttonRemove').addEventListener('click', () => {
    removeNote(note.id);
    saveNotes();
    location.assign('/index.html');
});

window.addEventListener('storage',(e) =>{ 
    if(e.key === 'notes') {
        notes = JSON.parse(e.newValue)
        note = notes.find(note => note.id=== noteId)
        
        if (!note) location.assign('/index.html');

        document.querySelector('#inputBody').value = note.body;
        document.querySelector('#inputTitle').value = note.title;
        document.querySelector('#spanEdited').textContent = generateLastEdited(note.updatedAt);
    }
})