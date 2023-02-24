using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace ECommerceApp.Data.Repository
{
    public abstract class RepositoryBase<T> : IRepositoryBase<T> where T : class
    {
        protected ApplicationDbContext dbContext {get;set;}
        protected RepositoryBase(ApplicationDbContext dbContext)
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
