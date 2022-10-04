using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NotesApiAndJs.Data;
using NotesApiAndJs.Models.Entities;

namespace NotesApiAndJs.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotesController : Controller
    {
        private readonly DataContext _dataContext;

        public NotesController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }


        [HttpGet]
        public async Task<IActionResult> GetAllNotes()
        {
            //Get the all notes from the database
           
            return Ok(await _dataContext.Notes.ToListAsync());
        }

        [HttpGet]
        [Route("{id:Guid}")]
        [ActionName("GetNoteById")]
        public async Task<IActionResult> GetNoteById([FromRoute] Guid id)
        {
            //Get the single notes from the database

            //await _dataContext.Notes.FirstOrDefaultAsync(x => x.Id == id);
            //another way

            var note = await _dataContext.Notes.FindAsync(id);
            if(note == null)
            {
                return NotFound();
            }

            return Ok(note);
            
        }


        [HttpPost]
        public async Task<IActionResult> AddNote(Note note)
        {
            note.Id = Guid.NewGuid();
            await _dataContext.Notes.AddAsync(note);
            await _dataContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetNoteById), new {id = note.Id}, note);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateNote([FromRoute] Guid id, [FromBody] Note updatedNote)
        {
            var existingNote = await _dataContext.Notes.FindAsync(id);

            if(existingNote == null)
            {
                return NotFound();
            }

            existingNote.Title = updatedNote.Title;
            existingNote.Description = updatedNote.Description;
            existingNote.IsVisible = updatedNote.IsVisible;

            await _dataContext.SaveChangesAsync();
            return Ok(existingNote);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteNote([FromRoute] Guid id)
        {
            var existingNote = await _dataContext.Notes.FindAsync(id);
            if(existingNote == null)
            {
                return NotFound();
            }

            _dataContext.Notes.Remove(existingNote);
            await _dataContext.SaveChangesAsync();

            return Ok();
        }


    }
}
