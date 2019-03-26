'use strict'


//Read existing notes from localStorage
const getSavedNotes = () => {
    const notesJSON = localStorage.getItem('notes');

    try{
        return notesJSON ? JSON.parse(notesJSON) : [];
    }catch(e){
        return [];
    }

   
}

//Save notes in local storage
const saveNotes = () =>{
    localStorage.setItem('notes', JSON.stringify(notes));
}

//Generate the DOM structure for a note
const generateNoteDOM = (note) => {
    //Creacion elementos
    const noteEl = document.createElement('a');
    const textEl = document.createElement('p');
    const statusEl = document.createElement('p');

    //Agregando contenido a elementos
    textEl.textContent = note.title.length > 0 ? note.title : 'Nota sin nombre';
    textEl.classList.add('list-item__title');
    statusEl.textContent = generateLastEdited(note.updatedAt);
    statusEl.classList.add('list-item__subtitle');
    noteEl.setAttribute('href',`/edit.html#${note.id}`);
    noteEl.classList.add('list-item');

    //Agregando elementos
    noteEl.appendChild(textEl);
    noteEl.appendChild(statusEl);

    return noteEl;
}

//Remove note 
const removeNote = (noteId) => {
    const noteIndex = notes.findIndex(note => note.id === noteId)
    console.log(noteIndex)
    if (noteIndex > -1) notes.splice(noteIndex,1)
}

//sort your notes by one of three ways
const sortNotes = (notes,sortBy) => {
    if(sortBy === 'byEdited') return sortByEdited(notes) 
    else if(sortBy === 'byCreated') return sortByCreated(notes)
    else return sortByAlphabetical(notes)
}


const sortByEdited = (notes) => {
    return notes.sort((a,b)=>{
        if(a.updatedAt > b.updatedAt) return -1
        else if(a.updatedAt < b.updatedAt) return 1
        else return 0
    })
}
const sortByCreated = (notes) => {
    return notes.sort((a,b)=>{
        if(a.createdAt > b.createdAt) return -1
        else if(a.createdAt < b.createdAt) return 1
        else return 0
    })
}
const sortByAlphabetical = (notes) => {
    return notes.sort((a,b)=>{
        if(a.title < b.title) return -1
        else if(a.title > b.title) return 1
        else return 0
    })
}


//Render application notes
const renderNotes = (notes, filters) => {
    const divNotes = document.querySelector('#divNotes');
    notes = sortNotes(notes,filters.sortBy);
    const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))
    
    divNotes.innerHTML = '';

    if(filteredNotes.length > 0){
        filteredNotes.forEach((note) => {
            const noteElement = generateNoteDOM(note);
            divNotes.appendChild(noteElement);
        });
    }else{
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'No hay notas.';
        emptyMessage.classList.add('empty-message');
        divNotes.appendChild(emptyMessage);
    }

   
    

}

const generateLastEdited = timestamp => `Updated ${moment(timestamp).fromNow()}`