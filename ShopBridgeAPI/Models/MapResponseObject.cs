using AutoWrapper;

namespace ShopBridgeAPI.Models
{
    public class MapResponseObject
    {
        [AutoWrapperPropertyMap(Prop.Result)]
        public object Data { get; set; }


        /*
        [AutoWrapperPropertyMap(Prop.Version)]
        [AutoWrapperPropertyMap(Prop.StatusCode)]
        [AutoWrapperPropertyMap(Prop.Message)]
        [AutoWrapperPropertyMap(Prop.IsError)]
        [AutoWrapperPropertyMap(Prop.Result)]
        [AutoWrapperPropertyMap(Prop.ResponseException)]
        [AutoWrapperPropertyMap(Prop.ResponseException_ExceptionMessage)]
        [AutoWrapperPropertyMap(Prop.ResponseException_Details)]
        [AutoWrapperPropertyMap(Prop.ResponseException_ReferenceErrorCode)]
        [AutoWrapperPropertyMap(Prop.ResponseException_ReferenceDocumentLink)]
        [AutoWrapperPropertyMap(Prop.ResponseException_ValidationErrors)]
        [AutoWrapperPropertyMap(Prop.ResponseException_ValidationErrors_Field)]
        [AutoWrapperPropertyMap(Prop.ResponseException_ValidationErrors_Message)]
        */
    }

    public class MyCustomApiResponse
    {
        public int statusCode { get; set; }
        public string Message { get; set; }
        public object Data { get; set; }


        public MyCustomApiResponse(object payload = null, string message = "", int statusCode = 200)
        {
            this.statusCode = statusCode;
            this.Message = message == string.Empty ? "Success" : message;
            this.Data = payload;
        }
        public MyCustomApiResponse(object payload = null)
        {
            this.statusCode = 200;
            this.Message = "Success";
            this.Data = payload;
        }

    }
}
