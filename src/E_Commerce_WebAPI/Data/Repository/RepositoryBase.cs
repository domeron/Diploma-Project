using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace E_Commerce_WebAPI.Data.Repository
{
    public abstract class RepositoryBase<T> : IRepositoryBase<T> where T : class
    {
        protected AppDbContext dbContext {get;set;}
        protected RepositoryBase(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public IQueryable<T> FindAll() => dbContext.Set<T>().AsNoTracking();

        public IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression) =>
            dbContext.Set<T>().Where(expression).AsNoTracking();

        public void Create(T entity) => dbContext.Set<T>().Add(entity);

        public void Update(T entity) => dbContext.Set<T>().Update(entity);

        public void Delete(T entity) => dbContext.Set<T>().Remove(entity);
    }
}
