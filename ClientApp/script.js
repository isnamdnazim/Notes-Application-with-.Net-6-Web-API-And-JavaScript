const saveButton = document.querySelector('#btnSave');
const titleInput = document.querySelector('#title');
const descriptionInput = document.querySelector('#description');
const notesContainer = document.querySelector('#notes__container');



function clearForm(){
    titleInput.value = '';
    descriptionInput.value = '';

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
                            <div class="note">
                                <h3>${note.title}</h3>
                                <p>${note.description}</p>
                            </div>
                            
                            `;
        allNotes += noteElement;

    });
    notesContainer.innerHTML = allNotes;
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