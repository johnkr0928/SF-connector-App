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
    [Route("api/SfConfiguration")]
    public class SfConfigurationController : Controller
    {
        private string serviceUrl =ConfigurationManager.AppSettings["url"];
        // GET: api/Connector
        [HttpGet]
        public async Task<string> Get()
        {
            try
            {
                string apiBaseAddress = serviceUrl + "Configuration/SFConfigurationList";
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


        [HttpGet("{id}")]
        [Route("GetById")]
        public async Task<string> GetById(int id)
        {
            try
            {
                string apiBaseAddress = serviceUrl + "Configuration/EditById/" + id;
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

        [HttpGet("{id}")]
        [Route("GetByCustomerId")]
        public async Task<string> GetByCustomerId(int id)
        {
            try
            {
                string apiBaseAddress = serviceUrl + "Configuration/EditByCustomerId/" + id;
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
        public async Task<string> Save([FromBody]SfConfigurationModels oSfConfigurationModel)
        {
            try
            {               
                string apiBaseAddress = serviceUrl + "Configuration/ConfigurationInsert";
                var client = new HttpClient();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                HttpResponseMessage response = await client.PostAsJsonAsync(apiBaseAddress, oSfConfigurationModel);
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
        public async Task<string> Update([FromBody]SfConfigurationModels osfconfigurationModels)
        {
            try
            {
                string apiBaseAddress = serviceUrl + "Configuration/SFUpdate";
                var client = new HttpClient();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                HttpResponseMessage response = await client.PostAsJsonAsync(apiBaseAddress, osfconfigurationModels);
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
                string apiBaseAddress = serviceUrl + "Configuration/Delete/"+id;
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
