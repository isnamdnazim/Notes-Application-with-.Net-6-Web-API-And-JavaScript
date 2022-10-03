using Microsoft.EntityFrameworkCore;
using NotesApiAndJs.Models.Entities;

namespace NotesApiAndJs.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        public DbSet<Note> Notes { get; set; }
    }
}
