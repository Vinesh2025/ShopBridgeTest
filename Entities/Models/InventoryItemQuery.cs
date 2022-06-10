using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Text;

namespace Entities.Models
{
    public class InventoryItemQuery
    {
        public readonly SqlDB Db;
        public InventoryItemQuery(SqlDB db)
        {
            Db = db;
        }

        public InventoryItem FindOne(int id)
        {
            var result = ReadAll(FindOneCmd(id).ExecuteReader());
            return result.Count > 0 ? result[0] : null;
        }


        private DbCommand FindOneCmd(int id)
        {
            var cmd = Db.Connection.CreateCommand();

            cmd.CommandText = "USP_PRODUCT_ById";
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@ProductId", id);
            return cmd as SqlCommand;
        }


        private List<InventoryItem> ReadAll(DbDataReader reader)
        {
            var lstProduct = new List<InventoryItem>();
            using (reader)
            {
                var objItem = new InventoryItem();
                while (reader.Read())
                {
                    objItem.ProductId = Convert.ToInt32(reader["ProductId"]);
                    objItem.ProductName = reader["ProductName"] != DBNull.Value ? reader["ProductName"].ToString() : "-";
                    objItem.Description = reader["Description"] != DBNull.Value ? reader["Description"].ToString() : "-";
                    objItem.Price = reader["Price"] != DBNull.Value ? Convert.ToDecimal(reader["Price"].ToString()) : 0;
                    objItem.ProductImage = reader["ProductImage"] != DBNull.Value ? reader["ProductImage"].ToString() : "-";
                }

                lstProduct.Add(objItem);
            }
            return lstProduct;
        }
    }
}
