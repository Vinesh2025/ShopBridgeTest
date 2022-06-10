using Contract;
using Entities.Models;
using Microsoft.AspNetCore.Mvc;
using ShopBridgeAPI.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace ShopBridgeXUnitTest
{
    public class InventoryItemControllerTest
    {

        private readonly InventoryItemController _controller;
        private readonly IRepositoryWrapper _service;

        public InventoryItemControllerTest()
        {
            //_service = new InventoryItemServiceFake().;
            _controller = new InventoryItemController(_service);
        }

        [Fact]
        public void Get_WhenCalled_ReturnsOkResult()
        {
            // Act
            PagingRequest pagingRequest = new PagingRequest();
            pagingRequest.Start = 1;
            pagingRequest.Length = 10;
            var okResult = _controller.GetInventory(pagingRequest);

            // Assert
            Assert.IsType<OkObjectResult>(okResult as OkObjectResult);
        }

        [Fact]
        public void Get_WhenCalled_ReturnsAllItems()
        {
            // Act
            PagingRequest pagingRequest = new PagingRequest();
            pagingRequest.Start = 1;
            pagingRequest.Length = 10;
            var okResult = _controller.GetInventory(pagingRequest) as OkObjectResult;

            // Assert
            var items = Assert.IsType<List<InventoryItem>>(okResult.Value);
            Assert.Equal(3, items.Count);
        }

        [Fact]
        public void GetById_UnknownGuidPassed_ReturnsNotFoundResult()
        {
            // Act
            var notFoundResult = _controller.GetInventoryItemById(1);

            // Assert
            Assert.IsType<NotFoundResult>(notFoundResult);
        }

        [Fact]
        public void GetById_ExistingGuidPassed_ReturnsOkResult()
        {

            // Act
            var okResult = _controller.GetInventoryItemById(1);

            // Assert
            Assert.IsType<OkObjectResult>(okResult as OkObjectResult);
        }

        [Fact]
        public void GetById_ExistingGuidPassed_ReturnsRightItem()
        {
            // Act
            var okResult = _controller.GetInventoryItemById(1) as OkObjectResult;

            // Assert
            Assert.IsType<InventoryItem>(okResult.Value);
            Assert.Equal(1, (okResult.Value as InventoryItem).ProductId);
        }

        [Fact]
        public void Add_InvalidObjectPassed_ReturnsBadRequest()
        {
            // Arrange
            var nameMissingItem = new InventoryItem()
            {
                ProductId=10,
                Description="Description",
                ProductName="",
                ProductImage="ProductImage",
                Price = 12.00M
            };
            _controller.ModelState.AddModelError("ProductName", "Required");

            // Act
            var badResponse = _controller.AddInventoryItem(nameMissingItem);

            // Assert
            Assert.IsType<BadRequestObjectResult>(badResponse);
        }

        [Fact]
        public void Add_ValidObjectPassed_ReturnsCreatedResponse()
        {
            // Arrange
            var addItem = new InventoryItem()
            {
                ProductId = 10,
                Description = "Description",
                ProductName = "Test Product",
                ProductImage = "ProductImage",
                Price = 12.00M
            };

            // Act
            var createdResponse = _controller.AddInventoryItem(addItem);

            // Assert
            Assert.IsType<CreatedAtActionResult>(createdResponse);
        }


        [Fact]
        public void Remove_NotExistingGuidPassed_ReturnsNotFoundResponse()
        {
            // Act
            var badResponse = _controller.DeleteInventoryItemById(1);

            // Assert
            Assert.IsType<NotFoundResult>(badResponse);
        }

        [Fact]
        public void Remove_ExistingGuidPassed_ReturnsNoContentResult()
        {
            // Act
            var noContentResponse = _controller.DeleteInventoryItemById(1);

            // Assert
            Assert.IsType<NoContentResult>(noContentResponse);
        }

        [Fact]
        public void Remove_ExistingGuidPassed_RemovesOneItem()
        {
       
            // Act
            var okResponse = _controller.DeleteInventoryItemById(1);

            // Assert
            PagingRequest pagingRequest = new PagingRequest();
            pagingRequest.Start = 1;
            pagingRequest.Length = 10;
            Assert.Equal(2, _service.InventoryItem.getInventoryItemPaginate(pagingRequest).data.Count());
        }



    }
}
