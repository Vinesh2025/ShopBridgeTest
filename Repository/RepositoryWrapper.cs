using Contract;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Repository
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        private ShopBridgeContext _repoContext;
        private IInventoryItemRepository _inventoryItem;


        public IInventoryItemRepository InventoryItem
        {
            get
            {
                if (_inventoryItem == null)
                {
                    _inventoryItem = new InventoryItemRepository(_repoContext);
                }
                return _inventoryItem;
            }
        }


        public RepositoryWrapper(ShopBridgeContext repositoryContext)
        {
            _repoContext = repositoryContext;
        }
        public void Save()
        {
            _repoContext.SaveChanges();
        }
    }
}
