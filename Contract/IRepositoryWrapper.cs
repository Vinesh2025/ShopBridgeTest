using System;
using System.Collections.Generic;
using System.Text;

namespace Contract
{
    public interface IRepositoryWrapper
    {
        IInventoryItemRepository InventoryItem { get; }
        void Save();
    }
}
