using Salesforce.Common;
using Salesforce.Force;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Dynamic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

using SalesforceConnector.BusinessObjects;
using SalesforceCon.DataAccessLayer;
using SalesforceCon.BusinessAccessLayer;
using SalesforceCon.Models;
using System.Threading;
using System.Web;
using Salesforce.Common.Models;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Web.Script.Serialization;
using Newtonsoft.Json.Linq;
using SalesforceCon.Helper;

namespace SalesforceCon.Controllers.api
{
    public class salesforceleadController : ApiController
    {
        #region Declarations

        // Consumer Secret from SFDC account  
        private string clientId = string.Empty;
        // Consumer Secret from SFDC account  
        private string clientSecretKey = string.Empty;
        // Redirect URL configured in SFDC account  
        private string redirectURL = string.Empty;
        private string salesforceUserName = string.Empty;
        private string salesforcePassword = string.Empty;
        private string securityToken = string.Empty;
        private string SalesforceTokenURL = string.Empty;
        private bool LeadSetting = false;
        private bool CampaignSetting = false;
        private string AbandonedCart = string.Empty;
        string orderId = string.Empty;
        string errorMessage = string.Empty;
        dynamic Lead = new ExpandoObject();
        SalesforceConnectorEntities oSaleforceConnector = new SalesforceConnectorEntities();
        SalesforceConfiguration Configurations = new SalesforceConfiguration();
        int CustomerID;
        CustomerBL oCustomerBL = new CustomerBL();
        Errorlog Errorlog = new Errorlog();
        HttpResponseMessage response = new HttpResponseMessage();



        public object Is { get; private set; }
        #endregion

        #region public async Task<HttpResponseMessage> CreateLead(object data)
        /// <summary>
        /// Create a Lead
        /// </summary>
        /// <remarks>
        /// <list type="bullet">
        /// <listheader>  
        /// <description>Lead is used when any customer visit that site,lead will be created in Salesforce </description>  
        /// <description>Campaign is used when, from which site the customer is came to know our site</description>
        /// </listheader>  
        /// <item>  
        /// <term>CustomFields</term>  
        /// <description>{"CustomFields":"Gender__c":"Male","Age__c":"18"}</description>  
        /// </item>  
        /// </list>
        /// </remarks>
        /// <param name="Leads">LeadModels</param>
        /// <returns></returns>
        [HttpPost]
        public async Task<HttpResponseMessage> CreateLead(Lead odatas)
        {
            dynamic oLeadModels = new LeadModels();
            dynamic Lead = new ExpandoObject();
            var leaCustom = (from a in odatas.oLead select new { a }).FirstOrDefault();
            var datasLeadobj = new JavaScriptSerializer().Serialize(leaCustom.a);
            JObject lead = JObject.Parse(datasLeadobj);
            lead.Property("CustomFields").Remove();
            lead.Merge(leaCustom.a.CustomFields);
            Lead = lead;

            dynamic oCredential = new SFCredential();
            dynamic Credential = new ExpandoObject();
            var CredCustom = (from a in odatas.oCredential select new { a }).FirstOrDefault();
            var Credentialobj = new JavaScriptSerializer().Serialize(CredCustom.a);
            JObject credential = JObject.Parse(Credentialobj);
            Credential = credential;           

            //Request Log         
            dynamic oSalesforceModels = new LeadModels();
            dynamic Salesforce = new ExpandoObject();
            JObject salesforce = new JObject();
            salesforce.Add("Lead", Lead);
            salesforce.Add("Credential", Credential);
            Salesforce = salesforce;


            try
            {
                
                var leadId = string.Empty;
                var campaignId = string.Empty;
                var contactId = string.Empty;
                var Accountid = string.Empty;
                string productId = string.Empty;
                var statuscode = string.Empty;

                #region Object Declarations




                #endregion
                ConfigurationModels oConfigurationmodels = new ConfigurationModels();
                oConfigurationmodels.ApplicationId = Credential.ApplicationId;
                var authResult = Configurations.Authentication(oConfigurationmodels);
                if (authResult != "Success")
                {
                    return response = Request.CreateResponse(HttpStatusCode.Forbidden, authResult);
                }
                else
                {
                    var response11 = new HttpResponseMessage(HttpStatusCode.Unauthorized);
                    #region API details
                    //ConfigurationModels oConfigurationmodels = new ConfigurationModels();
                    //oConfigurationmodels.ApplicationId = Credential.ApplicationId;
                    var OCustomerId = Configurations.GetCustomerId(oConfigurationmodels);
                    oConfigurationmodels.CustomerId = Convert.ToInt32(OCustomerId[0].CustomerId);
                    var OConfigurationModels = Configurations.GetConfigurationDetails(oConfigurationmodels);
                    clientId = OConfigurationModels[0].ConsumerId;
                    clientSecretKey = OConfigurationModels[0].ConsumerSecretKey;
                    salesforceUserName = OConfigurationModels[0].SalesForceUserName;
                    salesforcePassword = OConfigurationModels[0].SalesForceUserPassword;
                    securityToken = OConfigurationModels[0].SecurityToken;
                    SalesforceTokenURL = OConfigurationModels[0].SalesforceTokenURL;
                    CustomerID = Convert.ToInt32(OConfigurationModels[0].CustomerId);
                    LeadSetting = true;
                    CampaignSetting = true;

                    //Request Log
                    int requestId = Errorlog.LogRequestToSF(CustomerID, Convert.ToString(Salesforce));

                    var auth = new AuthenticationClient();
                    ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
                    await auth.UsernamePasswordAsync(clientId, clientSecretKey, salesforceUserName, salesforcePassword + securityToken, SalesforceTokenURL);

                    var forceClient = new ForceClient(auth.InstanceUrl, auth.AccessToken, auth.ApiVersion);

                    //Errorlog.LogRequestToSF(CustomerID, request, orderId);
                    #endregion

                    #region Lead

                    if (LeadSetting)
                    {
                        var leadResult = await forceClient.QueryAsync<dynamic>("SELECT Id FROM Lead WHERE (FirstName='" + Lead.FirstName + "' and LastName='" + Lead.LastName + "' and Email='" + Lead.Email + "') and Status='Open - Not Contacted' and LeadSource = '" + Lead.LeadSource + "'");

                        if ((leadResult).TotalSize > 0)
                        {

                            leadId = (leadResult.Records[0].Id).Value;
                            var leadUpdateResult = await forceClient.UpdateAsync("Lead", leadId, Lead);
                            Errorlog.LogResponseToSF(CustomerID, string.Format(Thread.CurrentThread.CurrentCulture, Helper.Messages.LEAD_UPDATE, leadId), requestId, statuscode);
                            response = Request.CreateResponse(HttpStatusCode.Created, "Lead Updated Successfully");

                        }
                        else
                        {
                            leadResult = await forceClient.CreateAsync("Lead", Lead);
                            leadId = (leadResult.Id);
                            Errorlog.LogResponseToSF(CustomerID, string.Format(Thread.CurrentThread.CurrentCulture, Helper.Messages.LEAD_CREATE, leadId), requestId, statuscode);
                            response = Request.CreateResponse(HttpStatusCode.Created, "Lead Created Successfully");
                        }

                        if (CampaignSetting)
                        {
                            #region Campaign
                            // Get Campaign Id based on its Name 
                            var campaignResult = await forceClient.QueryAsync<dynamic>("SELECT ID FROM Campaign WHERE Name = '" + Lead.LeadSource + "' ");
                            campaignId = (campaignResult.Records[0].Id).Value;

                            // Checks whether the Lead already associated with corresponding campagign.
                            var campaignMemberResult = await forceClient.QueryAsync<dynamic>("SELECT Id FROM CampaignMember WHERE CampaignId = '" + campaignId + "' AND LeadId = '" + leadId + "'");
                            if (campaignMemberResult.TotalSize <= 0)
                            {
                                // Lead campaign member association
                                dynamic campaignMember = new ExpandoObject();
                                campaignMember.LeadId = leadId;
                                campaignMember.CampaignId = campaignId;
                                campaignMember.Status = "Sent";
                                var campaignid = await forceClient.CreateAsync("CampaignMember", campaignMember);
                                Errorlog.LogResponseToSF(CustomerID, string.Format(Thread.CurrentThread.CurrentCulture, Helper.Messages.CAMPAING_CREATE, campaignId), requestId, statuscode);
                                response = Request.CreateResponse(HttpStatusCode.Created, "Lead and Campaign Created Successfully");
                            }
                            #endregion
                        }

                    }
                    #endregion
                    return response;
                }
            }
            catch (Exception ex)
            {
                Email email = new Email();
                errorMessage = ex.Message.ToString();
                errorMessage = (errorMessage == "authentication failure") ? "Please Check your salesforce UserName ,Password , SecurityToken and SalesforceTokenURL" : (errorMessage == "invalid client credentials") ? "Please Check your salesforce clientId and clientSecretKey  " : errorMessage;
                Errorlog.ErrorDetail(CustomerID, orderId, "CreateLead", errorMessage, 1);
                email.SendMailForError("Salesforce Lead Creation Error", email.BodyService(Convert.ToString(Lead.FirstName + " " + Lead.LastName), Convert.ToString(Lead.Email), Convert.ToString(Credential.ApplicationId), ex.Message.ToString(),ex.StackTrace.ToString()));
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, errorMessage);
                return response;
            }
        }
        #endregion
    }

}








