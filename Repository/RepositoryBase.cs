using Contract;
using Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace Repository
{
    public abstract class RepositoryBase<T> : IRepositoryBase<T> where T : class
    {
        protected ShopBridgeContext ShopBridgeContext { get; set; }

        public RepositoryBase(ShopBridgeContext shopBridgeContext)
        {
            ShopBridgeContext = shopBridgeContext;
        }

        public IQueryable<T> FindAll()
        {
            return ShopBridgeContext.Set<T>().AsNoTracking();
        }

        public IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression)
        {
            return ShopBridgeContext.Set<T>().Where(expression).AsNoTracking();
        }

        public void Create(T entity)
        {
            ShopBridgeContext.Set<T>().Add(entity);
        }

        public void Update(T entity)
        {
            ShopBridgeContext.Set<T>().Update(entity);
        }

        public void Delete(T entity)
        {
            ShopBridgeContext.Set<T>().Remove(entity);
        }
    }
}
