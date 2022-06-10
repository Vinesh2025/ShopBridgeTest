using Contract;
using Entities.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShopBridgeAPI.Helper;
using ShopBridgeAPI.Models;
using System.Net;

namespace ShopBridgeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryItemController : ControllerBase
    {
        private IRepositoryWrapper _repository;
        public InventoryItemController(IRepositoryWrapper repository)
        {
            _repository = repository;
        }

        [HttpPost]
        [Route("[action]")]
        public IActionResult GetInventory([FromBody] PagingRequest paging)
        {
            var pagingResponse = _repository.InventoryItem.getInventoryItemPaginate(paging);
            return Ok(pagingResponse);
        }


        [HttpGet("{id}")]
        public IActionResult GetInventoryItemById(int id)
        {
            var result = _repository.InventoryItem.GetInventoryItemById(id);
            return Ok(result);
        }

        [HttpPost, DisableRequestSizeLimit]
        public MyCustomApiResponse AddInventoryItem([FromBody] InventoryItem body)
        {
            var model = _repository.InventoryItem.AddInventoryItem(body);
            if (model.ProductId != 0)
                return new MyCustomApiResponse(model, Constant.INSERT_DATA.Replace("#TableName", "Inventory"), (int)HttpStatusCode.OK);
            else

                return new MyCustomApiResponse(model, "Duplicate record found.", (int)HttpStatusCode.Ambiguous);

        }

        [HttpPut("{id}"), DisableRequestSizeLimit]
        public MyCustomApiResponse EditInventoryItem(int id, [FromBody] InventoryItem body)
        {
            var model = _repository.InventoryItem.EditInventoryItem(id, body);
            if (model.ProductId == 0)
                return new MyCustomApiResponse(model, "Duplicate record found.", (int)HttpStatusCode.Ambiguous);
            else
                return new MyCustomApiResponse(model, Constant.UPDATE_DATA.Replace("#TableName", "Inventory"), (int)HttpStatusCode.OK);
        }

        [HttpDelete("{id}")]
        public MyCustomApiResponse DeleteInventoryItemById(int id)
        {
            _repository.InventoryItem.DeleteInventoryItem(id);
            return new MyCustomApiResponse(null, Constant.DELETED_DATA, (int)HttpStatusCode.OK);
        }

    }
}
