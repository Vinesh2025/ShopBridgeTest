using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Models
{
    public class InventoryItem
    {
        [Key]
        public int ProductId { get; set; }

        [Required(ErrorMessage = "This field is required")]
        public string ProductName { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string ProductImage { get; set; }

        //[DataType(DataType.Upload)]
        //[NotMapped]
        //public HttpPostedFileBase ImageFile { get; set; }

        [NotMapped]
        public int SrNo { get; set; }
    }
}
