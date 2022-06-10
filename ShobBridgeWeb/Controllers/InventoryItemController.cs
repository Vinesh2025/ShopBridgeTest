using ShobBridgeWeb.Helpers;
using ShobBridgeWeb.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Net.Http;
using System.IO;
using System.Net;

namespace ShobBridgeWeb.Controllers
{
    public class InventoryItemController : Controller
    {


        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult GetInventory(PagingRequest paging)
        {
            JsonResult result = new JsonResult();
            try
            {
                HttpResponseMessage response = GlobalVariables.WebApiClient.PostAsJsonAsync("InventoryItem/GetInventory", paging).Result;
                var itemList = response.Content.ReadAsAsync<PaggingResponse<InventoryItem>>().Result;
                result = this.Json(new
                {
                    draw = Convert.ToInt32(paging.Draw),
                    recordsTotal = itemList.RecordsTotal,
                    recordsFiltered = itemList.RecordsFiltered,
                    data = itemList.data
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                Console.Write(ex);
            }
            return result;
        }


        [HttpGet]
        public ActionResult Create()
        {
            try
            {
                InventoryItem model = new InventoryItem();
                return View(model);
            }
            catch (Exception ex)
            {
                ErrorHelper.LogError(ex, "InventoryItemController >> Create");
                throw;
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ValidateInput(false)]
        public ActionResult Create(InventoryItem itemDto)
        {

            try
            {
                if (ModelState.IsValid)
                {
                    var ImageFile = Request.Files[0];
                    if (ImageFile == null)
                    {
                        itemDto.ProductImage = "~/Content/Images/noimage/noimage.jpg";
                    }
                    else
                    {
                        string fileName = Path.GetFileNameWithoutExtension(ImageFile.FileName);
                        string extension = Path.GetExtension(ImageFile.FileName);
                        fileName = fileName + DateTime.Now.ToString("yymmssfff") + extension;
                        itemDto.ProductImage = "~/Content/Images/" + fileName;
                        fileName = Path.Combine(Server.MapPath("~/Content/Images/"), fileName);
                        ImageFile.SaveAs(fileName);
                    }

                    HttpResponseMessage response = GlobalVariables.WebApiClient.PostAsJsonAsync("InventoryItem", itemDto).Result;
                    if (response.IsSuccessStatusCode)
                    {
                        return RedirectToAction("Index");
                    }
                }
            }
            catch (Exception ex)
            {
                ErrorHelper.LogError(ex, "InventoryItemController >> Create");
            }
            return View(itemDto);
        }


        public ActionResult Edit(int id)
        {
            try
            {
                var model = new InventoryItem();
                using (var client = new HttpClient())
                {
                    HttpResponseMessage response = GlobalVariables.WebApiClient.GetAsync("InventoryItem/" + id).Result;

                    if (response.IsSuccessStatusCode)
                    {
                        model = response.Content.ReadAsAsync<InventoryItem>().Result;
                    }
                }

                if (model == null)
                    return HttpNotFound();

                return View(model);
            }
            catch (Exception ex)
            {
                ErrorHelper.LogError(ex, "EmployeeController >> Edit");
                throw;
            }
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        [ValidateInput(false)]
        public ActionResult Edit(InventoryItem model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var ImageFile = Request.Files[0];
                    if (ImageFile == null)
                    {
                        model.ProductImage = "~/Content/Images/noimage/noimage.jpg";
                    }
                    else
                    {
                        string fileName = Path.GetFileNameWithoutExtension(ImageFile.FileName);
                        string extension = Path.GetExtension(ImageFile.FileName);
                        fileName = fileName + DateTime.Now.ToString("yymmssfff") + extension;
                        model.ProductImage = "/Content/Images/" + fileName;
                        fileName = Path.Combine(Server.MapPath("~/Content/Images/"), fileName);
                        ImageFile.SaveAs(fileName);
                    }

                    HttpResponseMessage message = GlobalVariables.WebApiClient.PutAsJsonAsync<InventoryItem>("InventoryItem/" + model.ProductId, model).Result;
                    if (message.IsSuccessStatusCode)
                    {
                        return RedirectToAction("Index");
                    }
                }
            }
            catch (Exception e)
            {
                ErrorHelper.LogError(e, "EmployeeController >> Edit");
            }

            return View(model);
        }

        public ActionResult Delete(int id)
        {
            try
            {
                if (id == null)
                    return new HttpStatusCodeResult(HttpStatusCode.BadRequest);

                HttpResponseMessage response = GlobalVariables.WebApiClient.DeleteAsync("InventoryItem/" + id).Result;
                if (response.IsSuccessStatusCode)
                {
                    return Json(data: "Deleted", behavior: JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                ErrorHelper.LogError(ex, "EmployeeController >> Delete");
            }
            return HttpNotFound();
        }

        public ActionResult Details(int id)
        {
            HttpResponseMessage response = GlobalVariables.WebApiClient.GetAsync("InventoryItem/" + id.ToString()).Result;
            return View(response.Content.ReadAsAsync<InventoryItem>().Result);
        }
    }
}