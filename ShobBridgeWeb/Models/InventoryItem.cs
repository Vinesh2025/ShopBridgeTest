using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace ShobBridgeWeb.Models
{
    public class InventoryItem
    {
        public int ProductId { get; set; }

        [Required(ErrorMessage = "This field is required")]
        public string ProductName { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }

        [DisplayName("Upload Image")]
        public string ProductImage { get; set; }

        //[DataType(DataType.Upload)]
        //[NotMapped]
        //public HttpPostedFileBase ImageFile { get; set; }
        public int SrNo { get; set; }
    }
}