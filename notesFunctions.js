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
    const divNote = document.createElement('div');
    const aText = document.createElement('a');
    const buttonDelete = document.createElement('button');

    aText.textContent = note.title.length > 0 ? note.title : 'Nota sin nombre';
    buttonDelete.textContent = 'X';
    aText.setAttribute('href',`/edit.html#${note.id}`);

   
    buttonDelete.addEventListener('click',() =>{
        removeNote(note.id);
        saveNotes();
        renderNotes(notes,filters);
    });

    divNote.appendChild(buttonDelete);
    divNote.appendChild(aText);

    return divNote;
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

    notes = sortNotes(notes,filters.sortBy)

    const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))
    

    document.querySelectorAll('div').forEach(p => p.remove())
    
    filteredNotes.forEach((note) => {
        const noteElement = generateNoteDOM(note);
        document.querySelector('body').appendChild(noteElement);
    });

}

const generateLastEdited = timestamp => `Updated ${moment(timestamp).fromNow()}`