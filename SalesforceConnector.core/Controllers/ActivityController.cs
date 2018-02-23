using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Configuration;

namespace Salesforceconnector_Core.Controllers
{
    [Produces("application/json")]
    [Route("api/Activity")]
    public class ActivityController : Controller
    {
        private string serviceUrl = ConfigurationManager.AppSettings["url"];
        // GET: api/Connector

        public async Task<string> Get()
        {
            try
            {
                string apiBaseAddress = serviceUrl + "ActivityLog/ActivityList";
                var client = new HttpClient();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));


                HttpResponseMessage response = await client.GetAsync(apiBaseAddress);
                if (response.IsSuccessStatusCode)
                {
                    string responseString = await response.Content.ReadAsStringAsync();
                    return responseString;
                }
                else
                {
                    string error = "0";
                    return error;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        [HttpGet]
        [Route("GetByResponse")]
        public async Task<string> GetByResponse()
        {
            try
            {
                string apiBaseAddress = serviceUrl + "ActivityLog/RequestResponceList";
                var client = new HttpClient();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));


                HttpResponseMessage response = await client.GetAsync(apiBaseAddress);
                if (response.IsSuccessStatusCode)
                {
                    string responseString = await response.Content.ReadAsStringAsync();
                    return responseString;
                }
                else
                {
                    string error = "0";
                    return error;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }


        // PUT: api/Connector/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }        
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
