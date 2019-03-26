'use strict'
let notes = getSavedNotes();

const filters = {
        searchText: '',
        sortBy:'byEdited'
};


renderNotes(notes,filters);


document.querySelector('#noteText').addEventListener('input', (e) => {
    filters.searchText = e.target.value;
    renderNotes(notes, filters);
});

document.querySelector('#filterBy').addEventListener('change', (e) => {
        filters.sortBy = e.target.value
        renderNotes(notes,filters)
});

document.querySelector('#createNote').addEventListener('click', () => {
        const newId = uuidv4();
        const timestamp = moment().valueOf()
        notes.push({
                id: newId,
                title: '',
                body: '',
                createdAt: timestamp,
                updatedAt: timestamp
        });
        saveNotes();
        location.assign(`/edit.html#${newId}`);
});

window.addEventListener('storage',(e) => {
        if(e.key === 'notes'){
                notes = getSavedNotes()
                renderNotes(notes,filters)
        }
})



