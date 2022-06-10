using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace ShobBridgeWeb.Helpers
{
    public class ConfigHelper
    {

        public static string ErrorLogPath
        {
            get
            {
                string addr = ConfigurationManager.AppSettings["ErrorLogPath"];
                if (addr.EndsWith(@"\"))
                {
                    addr = addr.TrimEnd(new char[] { '\\' });
                }
                return addr;
            }
        }

        public static string ImagePath
        {
            get
            {
                return ConfigurationManager.AppSettings["ImagePath"];
            }
        }
        
    }
}