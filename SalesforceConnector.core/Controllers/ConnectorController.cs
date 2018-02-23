using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Configuration;
using Newtonsoft.Json;
using System.Dynamic;
using Newtonsoft.Json.Linq;

namespace Salesforceconnector_Core.Controllers
{
    [Produces("application/json")]
    [Route("api/Connector")]
    public class ConnectorController : Controller
    {
        private string serviceUrl = ConfigurationManager.AppSettings["url"];      

        // GET: api/Connector

        [HttpGet]
        public async Task<string> Get()
        {
            try
            {                
                string apiBaseAddress = serviceUrl + "Customer/CustomerList";
                await GetCustomerName();
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
        [Route("GetAdmin")]
        public async Task<string> GetAdmin(int id)
        {
            try
            {
                string apiBaseAddress = serviceUrl + "Customer/GetUserDetail/" + id;
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
                string apiBaseAddress = serviceUrl + "Customer/GetCustomerById/" + id;
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

        [HttpPost]
        [Route("Save")]
        public async Task<string> Save([FromBody]RegisterModels oRegisterModel)
        {
            try
            {
                string apiBaseAddress = serviceUrl + "Customer/AddUser";
                var client = new HttpClient();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                HttpResponseMessage response = await client.PostAsJsonAsync(apiBaseAddress, oRegisterModel);
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
        public async Task<string> Update([FromBody]RegisterModels oRegisterModel)
        {
            try
            {
                string apiBaseAddress = serviceUrl + "Customer/Update";
                var client = new HttpClient();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                HttpResponseMessage response = await client.PostAsJsonAsync(apiBaseAddress, oRegisterModel);
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
        public async Task<string> LoginUser([FromBody]LoginModels oLoginModel)
        {
            try
            {
                string apiBaseAddress = serviceUrl + "Login/LoginUser";
                var client = new HttpClient();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                HttpResponseMessage response = await client.PostAsJsonAsync(apiBaseAddress, oLoginModel);
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
                string url = serviceUrl + "Customer/Delete/" + id;
                string apiBaseAddress = url;
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

        //dropdown
        [HttpGet]
        [Route("GetCustomerName")]
        public async Task<string> GetCustomerName()
        {
            try
            {
                string apiBaseAddress = serviceUrl + "Customer/CustomerNameList";
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
        [Route("GetApiCustomerId")]
        public async Task<string> GetApiCustomerId(int id)
        {
            try
            {
                string apiBaseAddress = serviceUrl + "Customer/GetApiByCustomerId/"+id;
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
        [Route("GetApiByAdmin")]
        public async Task<string> GetApiByAdmin()
        {
            try
            {
                string apiBaseAddress = serviceUrl + "Customer/GetApiByAdmin/";
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
    }
}
