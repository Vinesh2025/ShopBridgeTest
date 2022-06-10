using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using Contract;
using Entities;
using Entities.Models;
using Repository;

namespace ShopBridgeXUnitTest
{
    public  class InventoryItemServiceFake : IRepositoryBase<InventoryItem>
    {
        private readonly List<InventoryItem> _inventoryItem;
        private readonly InventoryItemRepository _repoContext;

        public InventoryItemServiceFake(ShopBridgeContext repositoryContext)
        {
      
            _inventoryItem = new List<InventoryItem>()
            {
                    new InventoryItem {ProductId=1,ProductName="TestItem1",Description="TestDesc1",Price=10,ProductImage="~/Content/Images/test1.jpg" },
                    new InventoryItem {ProductId=2,ProductName="TestItem2",Description="TestDesc2",Price=20,ProductImage="~/Content/Images/test2.jpg" },
                    new InventoryItem {ProductId=3,ProductName="TestItem3",Description="TestDesc3",Price=30,ProductImage="~/Content/Images/test3.jpg" }
            };
        }


        public PaggingResponse<InventoryItem> getInventoryItemPaginate(PagingRequest paging)
        {
            PaggingResponse<InventoryItem> paggingResponse = new PaggingResponse<InventoryItem>();
            paggingResponse.data = _inventoryItem;
            paggingResponse.RecordsTotal = _inventoryItem.Count;
            paggingResponse.RecordsFiltered = _inventoryItem.Count;
            return paggingResponse;
        }

        public InventoryItem GetInventoryItemById(int ID)
        {
            return _inventoryItem.Where(a => a.ProductId == ID).FirstOrDefault();
        }
            
        public InventoryItem AddInventoryItem(InventoryItem inventoryItem)
        {
            _inventoryItem.Add(inventoryItem);
            return inventoryItem;
        }

        public InventoryItem EditInventoryItem(int ID, InventoryItem model)
        {
            var existing = _inventoryItem.First(a => a.ProductId == ID);
            if (existing != null) {
                _inventoryItem.Remove(existing);

                _inventoryItem.Add(model);
            }
            return model; 
        }


        public void DeleteInventoryItem(int ID)
        {
            var existing = _inventoryItem.First(a => a.ProductId == ID);
            _inventoryItem.Remove(existing);
        }

        IQueryable<InventoryItem> IRepositoryBase<InventoryItem>.FindAll()
        {
            throw new NotImplementedException();
        }

        IQueryable<InventoryItem> IRepositoryBase<InventoryItem>.FindByCondition(Expression<Func<InventoryItem, bool>> expression)
        {
            throw new NotImplementedException();
        }

        void IRepositoryBase<InventoryItem>.Create(InventoryItem entity)
        {
            throw new NotImplementedException();
        }

        void IRepositoryBase<InventoryItem>.Update(InventoryItem entity)
        {
            throw new NotImplementedException();
        }

        void IRepositoryBase<InventoryItem>.Delete(InventoryItem entity)
        {
            throw new NotImplementedException();
        }
    }

}
