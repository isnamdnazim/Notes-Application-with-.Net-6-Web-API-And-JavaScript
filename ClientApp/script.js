const saveButton = document.querySelector('#btnSave');
const titleInput = document.querySelector('#title');
const descriptionInput = document.querySelector('#description');
const notesContainer = document.querySelector('#notes__container');



function clearForm(){
    titleInput.value = '';
    descriptionInput.value = '';

}

function displayNoteInForm(note){
    titleInput.value = note.title;
    descriptionInput.value = note.description;
}

function getNoteById(id){
    fetch(`https://localhost:7203/api/Notes/${id}`)
    .then(data => data.json())
    .then(res => displayNoteInForm(res));
}

function populateForm(id){
    getNoteById(id)
}

function addNote(title, descriptoin){
    const body = {
        title: title,
        description: descriptoin,
        isVisible: true
    };

    fetch('https://localhost:7203/api/Notes',{
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            "content-type": "application/json"
        }
    })
    .then(data => data.json())
    .then(res => {
        clearForm();
        getAllNotes();
    });

}

function displayNotes(notes){
    let allNotes = '';
    notes.forEach(note => {
       const noteElement = `
                            <div class="note" data-id="${note.id}">
                                <h3>${note.title}</h3>
                                <p>${note.description}</p>
                            </div>
                            
                            `;
        allNotes += noteElement;

    });
    notesContainer.innerHTML = allNotes;

    // add event listheners
    document.querySelectorAll('.note').forEach(note =>{
        note.addEventListener('click',function(){
            populateForm(note.dataset.id)
        });
    });
}

function getAllNotes(){
    fetch('https://localhost:7203/api/Notes')
    .then(data => data.json())
    .then(res => displayNotes(res));
}

getAllNotes();

saveButton.addEventListener('click', function(){
    addNote(titleInput.value , descriptionInput.value);
});