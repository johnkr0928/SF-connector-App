using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Protocols;

namespace Salesforceconnector_Core.Controllers
{
    [Produces("application/json")]
    [Route("api/Address")]
    public class AddressController : Controller
    {
        private string serviceUrl = ConfigurationManager.AppSettings["url"];
        [HttpPost]
        [Route("Save")]
        public async Task<string> Save([FromBody]AddressModel oaddressModel)
        {
            try
            {
                if(oaddressModel.IsBillingShipping)
                {
                    oaddressModel.ShippingAddress1 = oaddressModel.BillingAddress1;
                    oaddressModel.ShippingAddress2 = oaddressModel.BillingAddress2;
                    oaddressModel.ShippingCountry = oaddressModel.BillingCountry;
                    oaddressModel.ShippingState = oaddressModel.BillingState;
                    oaddressModel.ShippingCity = oaddressModel.BillingCity;
                    oaddressModel.ShippingPostalCode = oaddressModel.BillingPostalCode;
                    oaddressModel.ShippingPhoneNumber = oaddressModel.BillingPhoneNumber;
                }
                string apiBaseAddress = serviceUrl+"Address/AddressInsert";
                var client = new HttpClient();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage response = await client.PostAsJsonAsync(apiBaseAddress, oaddressModel);
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
        public async Task<string> Get(int id)
        {
            try
            {
                string apiBaseAddress = serviceUrl+"Address/EditById/" + id;
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
        [Route("Update")]
        public async Task<string> Update([FromBody]AddressModel oaddressModels)
        {
            try
            {
                string apiBaseAddress = serviceUrl+ "Address/AddressUpdate";
                var client = new HttpClient();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage response = await client.PostAsJsonAsync(apiBaseAddress, oaddressModels);
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
