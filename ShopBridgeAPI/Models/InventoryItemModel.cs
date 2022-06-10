using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.ComponentModel.DataAnnotations;

namespace ShopBridgeAPI.Models
{
    public class InventoryItemModel
    {
        public int ProductId { get; set; }

        [Required]
        [BindRequired]
        public string ProductName { get; set; }
        public string Description { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "The Price field must be greater than 0")]
        public decimal Price { get; set; }
        public string ProductImage { get; set; }
    }
}
