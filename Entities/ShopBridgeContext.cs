using System;
using System.Collections.Generic;
using System.Text;
using Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace Entities
{
    public  class ShopBridgeContext:DbContext
    {
        public ShopBridgeContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<InventoryItem> InventoryItems { get; set; }
    }
}
