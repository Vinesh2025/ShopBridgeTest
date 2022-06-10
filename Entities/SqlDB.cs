using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using Microsoft.Data.SqlClient;

namespace Entities
{
    public class SqlDB : IDisposable
    {

        public SqlConnection Connection;
        public static string _strConnection;

        public SqlDB(string connectionString)
        {
            _strConnection = connectionString;
            Connection = new SqlConnection(_strConnection);
        }

        public void Dispose()
        {
            Connection.Close();
        }
    }
}
