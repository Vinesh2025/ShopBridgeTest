using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShobBridgeWeb.Models
{
    public class InventoryItemDTO
    {
        public InventoryItem InvItem { get; set; }
        public List<InventoryItem> InventoryItemList { get; set; }
    }
}