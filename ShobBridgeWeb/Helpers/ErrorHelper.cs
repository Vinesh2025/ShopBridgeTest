using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace ShobBridgeWeb.Helpers
{
    public class ErrorHelper
    {
        /// <summary>
        /// To Save Log Error Exception
        /// </summary>
        /// <param name="ex"></param>
        public static void LogError(Exception ex)
        {
            try
            {
                string baseLogFolder = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, ConfigHelper.ErrorLogPath);
                string path = string.Format(@"{0}\Errors_{1}.txt", baseLogFolder, DateTime.Today.ToString("dd-MM-yyyy"));
                if (!Directory.Exists(Path.GetDirectoryName(path)))
                {
                    Directory.CreateDirectory(Path.GetDirectoryName(path));
                }
                if (!File.Exists(path))
                {
                    File.Create(path).Close();
                }
                using (StreamWriter w = File.AppendText(path))
                {
                    w.WriteLine("\r\nLog Entry : ");
                    w.WriteLine("{0}", DateTime.Now.ToString(System.Globalization.CultureInfo.InvariantCulture));
                    string err = "Error in: " + System.Web.HttpContext.Current.Request.Url.ToString() +
                                  ". Error Message: " + ex.Message;
                    w.WriteLine(err);
                    w.WriteLine("Stacktrace: ");
                    w.WriteLine(ex.StackTrace);
                    w.WriteLine("___________________________________________________________________________");
                    w.WriteLine("");
                    w.Flush();
                    w.Close();
                }
            }
            catch (Exception exc)
            {
                throw exc;
            }

        }

        /// <summary>
        /// To Save LogError Exception
        /// </summary>
        /// <param name="ex"></param>
        /// <param name="exceptionSource"></param>
        public static void LogError(Exception ex, string exceptionSource)
        {
            try
            {
                string path = string.Format(@"{0}\Errors_{1}.txt", ConfigHelper.ErrorLogPath, DateTime.Today.ToString("dd-MM-yyyy"));

                if (!File.Exists(path))
                {
                    File.Create(path).Close();
                }
                using (StreamWriter w = File.AppendText(path))
                {
                    w.WriteLine("\r\nLog Entry : ");
                    w.WriteLine("{0}", DateTime.Now.ToString(System.Globalization.CultureInfo.InvariantCulture));
                    string err = "Error in: " + exceptionSource +
                                  ". Error Message: " + ex.Message;
                    w.WriteLine(err);
                    w.WriteLine("Stacktrace: ");
                    w.WriteLine(ex.StackTrace);
                    w.WriteLine("___________________________________________________________________________");
                    w.WriteLine("");
                    w.Flush();
                    w.Close();
                }
            }
            catch (Exception exc)
            {
                throw exc;
            }
        }
    }
}