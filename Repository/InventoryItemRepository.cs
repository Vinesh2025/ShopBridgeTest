using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using Contract;
using Entities;
using Entities.Models;

namespace Repository
{
    public class InventoryItemRepository : RepositoryBase<InventoryItem>, IInventoryItemRepository
    {
        private readonly ShopBridgeContext _shopBridgeContext;

        public InventoryItemRepository(ShopBridgeContext shopBridgeContext) : base(shopBridgeContext)
        {
            _shopBridgeContext = shopBridgeContext;
            
        }


        public PaggingResponse<InventoryItem> getInventoryItemPaginate(PagingRequest paging)
        {
            var pagingResponse = new PaggingResponse<InventoryItem>()
            {
                Draw = paging.Draw
            };

            var colOrder = paging.Order[0];

            using (var db = new SqlDB(SqlDB._strConnection))
            {
                db.Connection.Open();

                var cmd = db.Connection.CreateCommand();
                cmd.CommandText = "USP_PRODUCT_List";
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@p_SearchTerm", paging.Search.Value==null?"": paging.Search.Value);
                cmd.Parameters.AddWithValue("@p_SortColumn", colOrder.Column);
                cmd.Parameters.AddWithValue("@p_SortOrder", colOrder.Dir);
                cmd.Parameters.AddWithValue("@p_PageNumber", (paging.Start + 1));
                cmd.Parameters.AddWithValue("@p_PageSize", paging.Length);


                DbDataReader reader = cmd.ExecuteReader();
                var lstInventory = new List<InventoryItem>();
                var recordsTotal = 0;
                using (reader)
                {
                    while (reader.Read())
                    {
                        recordsTotal = reader["TotalCount"] != DBNull.Value ? Convert.ToInt32(reader["TotalCount"]) : 0;
                        var objInventory = new InventoryItem();


                        objInventory.SrNo = reader["RowNumber"] != DBNull.Value ? Convert.ToInt32(reader["RowNumber"]) : 0;
                        objInventory.ProductId = reader["ProductId"] != DBNull.Value ? Convert.ToInt32(reader["ProductId"]) : 0;
                        objInventory.ProductName = reader["ProductName"] != DBNull.Value ? Convert.ToString(reader["ProductName"]) : "-";
                        objInventory.Description = reader["Description"] != DBNull.Value ? Convert.ToString(reader["Description"]) : "-";
                        objInventory.Price = reader["Price"] != DBNull.Value ? Convert.ToDecimal(reader["Price"]) : 0;
                        objInventory.ProductImage = reader["ProductImage"] != DBNull.Value ? Convert.ToString(reader["ProductImage"]) : "-";
                        lstInventory.Add(objInventory);

                    }
                }
                pagingResponse.RecordsTotal = recordsTotal;
                pagingResponse.RecordsFiltered = recordsTotal;
                pagingResponse.data = lstInventory;

            }

            return pagingResponse;

        }

        public InventoryItem GetInventoryItemById(int ID)
        {

            //return  _shopBridgeContext.InventoryItems.Find(ID);
            using (var db = new SqlDB(SqlDB._strConnection))
            {
                db.Connection.Open();
                var query = new InventoryItemQuery(db);
                var result = query.FindOne(ID);

                if (result == null)
                    return null;

                return result;
            }
        }

        public InventoryItem AddInventoryItem(InventoryItem model)
        {

            //_shopBridgeContext.InventoryItems.Add(model);
            //_shopBridgeContext.SaveChanges();

            using (var db = new SqlDB(SqlDB._strConnection))
            {
                db.Connection.Open();

                var cmd = db.Connection.CreateCommand();
                cmd.CommandText = "USP_PRODUCT_Add";
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@ProductName", model.ProductName);
                cmd.Parameters.AddWithValue("@Description", model.Description);
                cmd.Parameters.AddWithValue("@Price", model.Price);
                cmd.Parameters.AddWithValue("@ProductImage", model.ProductImage);

                cmd.Parameters.Add("@ProductId", SqlDbType.Int, 500);
                cmd.Parameters["@ProductId"].Direction = ParameterDirection.Output;

                cmd.ExecuteNonQuery();
                model.ProductId = Convert.ToInt32(cmd.Parameters["@ProductId"].Value);

                return model;
            }
        }

        public InventoryItem EditInventoryItem(int id, InventoryItem model)
        {
            using (var db = new SqlDB(SqlDB._strConnection))
            {
                db.Connection.Open();

                var cmd = db.Connection.CreateCommand();
                cmd.CommandText = "USP_PRODUCT_Update";
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@ProductName", model.ProductName);
                cmd.Parameters.AddWithValue("@Description", model.Description);
                cmd.Parameters.AddWithValue("@Price", model.Price);
                cmd.Parameters.AddWithValue("@ProductImage", model.ProductImage);
                cmd.Parameters.AddWithValue("@ProductId", id);

                cmd.ExecuteNonQuery();

                return model;
            }
        }
        public void DeleteInventoryItem(int ID)
        {

            //var item = _shopBridgeContext.InventoryItems.Find(ID);
            //_shopBridgeContext.InventoryItems.Remove(item);
            //_shopBridgeContext.SaveChanges();
            //return item;

            using (var db = new SqlDB(SqlDB._strConnection))
            {
                db.Connection.Open();
                var query = new InventoryItemQuery(db);
                var result = query.FindOne(ID);
                if (result != null)
                {
                    var cmd = db.Connection.CreateCommand();
                    cmd.CommandText = "USP_PRODUCT_Delete";
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ProductId", ID);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
