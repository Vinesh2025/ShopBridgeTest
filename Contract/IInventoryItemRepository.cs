using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Contract
{
    public interface IInventoryItemRepository : IRepositoryBase<InventoryItem>
    {
        PaggingResponse<InventoryItem> getInventoryItemPaginate(PagingRequest paging);
        InventoryItem GetInventoryItemById(int ID);
        InventoryItem AddInventoryItem(InventoryItem inventoryItem);
        InventoryItem EditInventoryItem(int ID, InventoryItem model);
        void DeleteInventoryItem(int ID);
    }
}
