using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Configuration;

namespace Salesforceconnector_Core.Controllers
{
    [Produces("application/json")]
    [Route("api/FBConfiguration")]
    public class FBConfigurationController : Controller
    {
        private string serviceUrl = ConfigurationManager.AppSettings["url"];

        // GET: api/Connector
        [HttpGet]
        public async Task<string> Get()
        {
            try
            {
                string apiBaseAddress = serviceUrl + "FBConfiguration/FBConfigurationList";
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
        [Route("GetById")]
        public async Task<string> GetById(int id)
        {
            try
            {
                string apiBaseAddress = serviceUrl + "FBConfiguration/EditById/" + id;
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
        // POST: api/Connector
        [HttpPost]
        public async Task<string> Save([FromBody]FBConfigurationModels oFBConfigurationModels)
        {
            try
            {
                string apiBaseAddress = serviceUrl + "FBConfiguration/FBConfigurationInsert";
                var client = new HttpClient();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage response = await client.PostAsJsonAsync(apiBaseAddress, oFBConfigurationModels);
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

        [HttpPost]
        [Route("Update")]
        public async Task<string> Update([FromBody]FBConfigurationModels ofbconfigurationModels)
        {
            try
            {
                string apiBaseAddress = serviceUrl + "FBConfiguration/FBUpdate";
                var client = new HttpClient();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage response = await client.PostAsJsonAsync(apiBaseAddress, ofbconfigurationModels);
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

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task<string> Delete(int id)
        {
            try
            {
                string apiBaseAddress = serviceUrl + "FBConfiguration/FBConfigurationDelete/" + id;
                var client = new HttpClient();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                HttpResponseMessage response = await client.DeleteAsync(apiBaseAddress);
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
    }
}