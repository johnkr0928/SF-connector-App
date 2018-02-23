using Salesforce.Common;
using Salesforce.Force;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Configuration;
using System.Data.SqlClient;
using Newtonsoft.Json;
using SalesforceCon.BusinessAccessLayer;
using SalesforceCon.Models;
using System.Threading;
using System.Web.Script.Serialization;
using Newtonsoft.Json.Linq;
using SalesforceCon.Helper;

namespace SalesforceCon.Controllers.api
{
    public class salesforceaccountordersyncController : ApiController
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
        private string priceBook2Id = string.Empty;
        private string shipMethod = string.Empty;
        string orderId = string.Empty;
        string errorMessage = string.Empty;
        HttpResponseMessage response = new HttpResponseMessage();

        int CustomerID;
        SalesforceConfiguration Configurations = new SalesforceConfiguration();
        Errorlog Errorlog = new Errorlog();
        CustomerBL oCustomerBL = new CustomerBL();
        #endregion


        /// <summary>
        /// Creates a Account,Contacts and Opportunity
        /// </summary>
        /// /// <remarks>
        /// <list type="bullet">
        /// <listheader>  
        /// <description>Account is used for,details of person and items purchased from the site </description>  
        /// <description>Opporunity is used for,how many product purchased by the customer can be view in it</description>
        /// <description>Product is used for,we can check the price and Pricebook Id in it</description>
        /// </listheader>  
        /// <item>  
        /// <term>CustomFields</term>  
        /// <description>{"CustomFields":"Gender__c":"Male","Age__c":"18"}</description>  
        /// </item>  
        /// </list>
        /// </remarks>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<HttpResponseMessage> SalesforceSync(datas odatas)
        {
           
            dynamic oLeadModels = new LeadModels();
            dynamic Lead = new ExpandoObject();
            var leaCustom = (from a in odatas.oLead select new { a }).FirstOrDefault();
            var datasLeadobj = new JavaScriptSerializer().Serialize(leaCustom.a);
            JObject lead = JObject.Parse(datasLeadobj);
            lead.Property("CustomFields").Remove();
            lead.Merge(leaCustom.a.CustomFields);
            Lead = lead;

            dynamic Account = new ExpandoObject();
            var accCustom = (from a in odatas.oAccount select new { a }).FirstOrDefault();
            var datasAccobj = new JavaScriptSerializer().Serialize(accCustom.a);
            JObject account = JObject.Parse(datasAccobj);
            account.Property("CustomFields").Remove();
            account.Merge(accCustom.a.CustomFields);
            Account = account;

            dynamic Contact = new ExpandoObject();
            var cont = (from a in odatas.oContacts select new { a }).FirstOrDefault();
            var datasContobj = new JavaScriptSerializer().Serialize(cont.a);
            JObject contacts = JObject.Parse(datasContobj);
            contacts.Property("CustomFields").Remove();
            contacts.Merge(cont.a.CustomFields);
            Contact = contacts;

            dynamic Opportunity = new ExpandoObject();
            var opp = (from a in odatas.oOpportunity select new { a }).FirstOrDefault();
            var datasOppobj = new JavaScriptSerializer().Serialize(opp.a);
            JObject opporunity = JObject.Parse(datasOppobj);
            opporunity.Property("CustomFields").Remove();
            opporunity.Merge(opp.a.CustomFields);
            Opportunity = opporunity;

            dynamic CartItems = new ExpandoObject();
            var cart = (from a in odatas.oCartItems select new { a }).FirstOrDefault();
            var datasCartobj = new JavaScriptSerializer().Serialize(cart.a);
            JObject CartItem = JObject.Parse(datasCartobj);
            CartItems = CartItem;

            dynamic ProductItems = new ExpandoObject();
            var productItem = (from a in odatas.oShipping select new { a }).FirstOrDefault();
            var datasProductobj = new JavaScriptSerializer().Serialize(productItem.a);
            JObject ProductItem = JObject.Parse(datasProductobj);
            ProductItems = ProductItem;

            dynamic DiscountItems = new ExpandoObject();
            var discountItem = (from a in odatas.oDiscount select new { a }).FirstOrDefault();
            var datasDiscountobj = new JavaScriptSerializer().Serialize(discountItem.a);
            JObject DiscountItem = JObject.Parse(datasDiscountobj);
            DiscountItems = DiscountItem;

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
            salesforce.Add("Account", Account);
            salesforce.Add("Contact", Contact);
            salesforce.Add("Opportunity", Opportunity);
            salesforce.Add("CartItems", CartItems);
            salesforce.Add("ProductItems", ProductItems);
            salesforce.Add("DiscountItems", DiscountItems);
            salesforce.Add("Credential", Credential);
            Salesforce = salesforce;


            try
            {
                var LeadId = string.Empty;
                var campaignId = string.Empty;
                var contactId = string.Empty;
                var Accountid = string.Empty;
                string productId = string.Empty;
                var pricebookID = string.Empty;
                var accountIds = string.Empty;
                var products = string.Empty;
                var Shippingproducts = string.Empty;
                var opportunityId = string.Empty;
                var statuscode = string.Empty;

                #region Object Declaration

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
                    orderId = Convert.ToString(Opportunity.Order_Number__c);
                    string request = Convert.ToString(((dynamic)(odatas)));
                    
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

                    //Request Log
                    int requestId = Errorlog.LogRequestToSF(CustomerID, Convert.ToString(Salesforce));

                    var auth = new AuthenticationClient();
                    ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
                    await auth.UsernamePasswordAsync(clientId, clientSecretKey, salesforceUserName, salesforcePassword + securityToken, SalesforceTokenURL);

                    var forceClient = new ForceClient(auth.InstanceUrl, auth.AccessToken, auth.ApiVersion);
                    //Errorlog.LogRequestToSF(CustomerID, request, orderId);


                    #region Lead Conversion
                    //Get contact details based on First Name, Last Name, Email and Parent Account
                    var contact = await forceClient.QueryAsync<dynamic>("SELECT Id,AccountId  FROM Contact WHERE Firstname= '" + Lead.FirstName + "' AND LastName = '" + Lead.LastName + "' AND Email='" + Lead.Email + "' ");

                    //Get lead details based on First Name, Last Name, Email, Status and Lead Source
                    var leadDetail = await forceClient.QueryAsync<dynamic>("SELECT Id,Company FROM Lead WHERE ( LastName='" + Lead.LastName + "' and Email='" + Lead.Email + "') and Status='Open - Not Contacted' ");

                    //var priceBook2Iddetail = await forceClient.QueryAsync<dynamic>("SELECT Id FROM Pricebook2 WHERE IsActive = false AND IsStandard = true ");
                    priceBook2Id = CartItems.PriceBook2Id;
                    //priceBook2Id = (priceBook2Iddetail.Records[0].Id).Value;


                    if (leadDetail.TotalSize > 0)
                    {
                        Lead.FirstName = Lead.FirstName;
                        Lead.LastName = Lead.LastName;
                        LeadId = (leadDetail.Records[0].Id).Value;
                        var success = await forceClient.UpdateAsync("Lead", LeadId, Lead);

                    }

                    #endregion

                    #region Account
                    // Creating Account in Salesforce
                    Account.ParentId = CartItems.ParentAccountID;
                    if (contact.TotalSize > 0)
                    {
                        var Accountids = (contact.Records[0].AccountId).Value;
                        var accountResult = await forceClient.UpdateAsync("Account", Accountids, Account);
                        Accountid = Accountids;
                        Errorlog.LogResponseToSF(CustomerID, string.Format(Thread.CurrentThread.CurrentCulture, Helper.Messages.ACCOUNT_UPDATE, Accountid), requestId, statuscode);
                        response = Request.CreateResponse(HttpStatusCode.Created, "Account Updated");

                    }
                    else
                    {
                        var accountIdResult = await forceClient.CreateAsync("Account", Account);
                        Accountid = (accountIdResult.Id);
                        Errorlog.LogResponseToSF(CustomerID, string.Format(Thread.CurrentThread.CurrentCulture, Helper.Messages.ACCOUNT_CREATE, Accountid), requestId, statuscode);
                        response = Request.CreateResponse(HttpStatusCode.Created, "Account Created");
                    }
                    #endregion

                    #region Contact
                    var contactDetail = await forceClient.QueryAsync<dynamic>("SELECT Id from Contact WHERE AccountId='" + Accountid + "'");

                    if (contactDetail.TotalSize > 0)
                    {
                        //Update Contact               
                        var contactIdValue = (contactDetail.Records[0].Id).Value;
                        contactId = contactIdValue;
                        await forceClient.UpdateAsync("Contact", contactId, Contact);
                        Errorlog.LogResponseToSF(CustomerID, string.Format(Thread.CurrentThread.CurrentCulture, Helper.Messages.CONTACT_UPDATE, contactId), requestId, statuscode);
                        response = Request.CreateResponse(HttpStatusCode.Created, "Contact and Account Updated");
                    }
                    else
                    {
                        //Create Contact
                        Contact.AccountId = Accountid;
                        var contactIds = await forceClient.CreateAsync("Contact", Contact);
                        contactId = (contactIds.Id);
                        Errorlog.LogResponseToSF(CustomerID, string.Format(Thread.CurrentThread.CurrentCulture, Helper.Messages.CONTACT_CREATE, contactId), requestId, statuscode);
                        response = Request.CreateResponse(HttpStatusCode.Created, "Contact and Account Created");
                    }
                    #endregion

                    #region Opportunity

                    Opportunity.AccountId = Accountid;
                    var OpportunityId = await forceClient.CreateAsync("Opportunity", Opportunity);
                    opportunityId = (OpportunityId.Id);
                    Errorlog.LogResponseToSF(CustomerID, string.Format(Thread.CurrentThread.CurrentCulture, Helper.Messages.OPPORTUNITY_CREATE, opportunityId), requestId, statuscode);
                    response = Request.CreateResponse(HttpStatusCode.Created, "Opportunity, Contact and Account Created Successfully");

                    #endregion

                    #region Opportunitycontactrole
                    // Inserting Opportunitycontactrole                  
                    dynamic OpportunityContactRole = new ExpandoObject();
                    {
                        OpportunityContactRole.ContactId = contactId;
                        OpportunityContactRole.OpportunityId = (OpportunityId.Id);
                        OpportunityContactRole.Role = "Business User";
                    }
                    var ContactRole = await forceClient.CreateAsync("OpportunityContactRole", OpportunityContactRole);
                    #endregion

                    #region kitproduct details for opportunity line item
                    List<CartItems> cartItem = new List<CartItems>();

                    foreach (var cartItems in ((dynamic)(odatas)).oCartItems)
                    {
                        string sku = cartItems.sku;
                        string description = "Product";
                        if (sku.Substring(sku.Length - 1).Equals("-"))
                        {
                            sku = sku.Substring(0, sku.Length - 1);
                        }

                        // Get the pricebookentryid
                        double totalprice = Convert.ToDouble(cartItems.price * cartItems.quantity);

                        var productDetails = await forceClient.QueryAsync<dynamic>("SELECT ID FROM PricebookEntry WHERE ProductCode ='" + sku + "'AND PRICEBOOK2ID='" + priceBook2Id + "'");
                        if (productDetails.TotalSize == 0)
                        {

                            // Create a new product
                            dynamic Product2 = new ExpandoObject();
                            Product2.Name = cartItems.productName;
                            Product2.ProductCode = sku;
                            Product2.IsActive = true;
                            var product = await forceClient.QueryAsync<dynamic>("SELECT Id FROM Product2 WHERE ProductCode ='" + sku + "'");
                            if (product.TotalSize > 0)
                            {
                                var ProductID = (product.Records[0].Id).Value;
                                productId = ProductID;
                                await forceClient.UpdateAsync("Product2", productId, Product2);
                            }
                            else
                            {
                                var productsId = await forceClient.CreateAsync("Product2", Product2);
                                productId = productsId.Id;

                            }


                            // Create a pricebook entry for standard pricebook               
                            dynamic PricebookEntry = new ExpandoObject();
                            PricebookEntry.Pricebook2Id = priceBook2Id;
                            PricebookEntry.Product2Id = productId;
                            PricebookEntry.IsActive = true;
                            PricebookEntry.UnitPrice = cartItems.price;
                            PricebookEntry.UseStandardPrice = false;
                            var pricebookid = await forceClient.CreateAsync("PricebookEntry", PricebookEntry);
                            pricebookID = pricebookid.Id;
                            Errorlog.LogRequestToSF(CustomerID, " productId '" + productId + "'Created Sucessfully");
                        }


                        //pricebookID = (productDetails.Records[0].Id);
                        string PricebookEntryId = !string.IsNullOrEmpty(pricebookID) ? pricebookID : (productDetails.Records[0].Id);
                        dynamic opportunitylineItem = new ExpandoObject();
                        //Assign values to opportunity line item  
                        opportunitylineItem.OpportunityId = (OpportunityId.Id);
                        opportunitylineItem.PricebookEntryId = PricebookEntryId;
                        opportunitylineItem.TotalPrice = Convert.ToDouble(totalprice);
                        opportunitylineItem.Description = description;

                        if (cartItems.isAKit == true)
                        {
                            long kitCount = cartItems.kitCount;

                            kitCount++;
                            {
                                opportunitylineItem.Quantity = kitCount * cartItems.quantity;
                                var OpportunityLineItemResult = await forceClient.CreateAsync("OpportunityLineItem", opportunitylineItem); //Insert Opportunity line item
                            }
                        }
                        else
                        {
                            opportunitylineItem.Quantity = cartItems.quantity;
                            var OpportunityLineItemResult = await forceClient.CreateAsync("OpportunityLineItem", opportunitylineItem); //Update Opportunity line item

                        }

                    }
                    //FedEx Shipping Line Item
                    shipMethod = ProductItems.SalesforceShippingMethod;
                    //shipMethod = "Test Shiping Method";
                    if (!string.IsNullOrEmpty(shipMethod) && Opportunity.ShippingTotal__c != 0)
                    {
                        pricebookID = "";
                        productId = "";
                        var priceBookDetail = await forceClient.QueryAsync<dynamic>("SELECT ID FROM PricebookEntry WHERE NAME ='" + shipMethod + "'AND PRICEBOOK2ID='" + priceBook2Id + "'");

                        if (priceBookDetail.TotalSize == 0)
                        {
                            // Create a new product
                            dynamic Product2 = new ExpandoObject();
                            Product2.Name = shipMethod;
                            var Shippingproduct = await forceClient.QueryAsync<dynamic>("SELECT Id FROM Product2 WHERE Name ='" + shipMethod + "'");
                            if (Shippingproduct.TotalSize > 0)
                            {
                                var ProductID = (Shippingproduct.Records[0].Id).Value;
                                productId = ProductID;
                                await forceClient.UpdateAsync("Product2", productId, Product2);
                            }
                            else
                            {
                                var productsId = await forceClient.CreateAsync("Product2", Product2);
                                productId = productsId.Id;

                            }
                            Errorlog.LogRequestToSF(CustomerID, " productId '" + productId + "'Created Sucessfully");
                            // Create a pricebook entry for standard pricebook               
                            dynamic PricebookEntry = new ExpandoObject();
                            PricebookEntry.Pricebook2Id = priceBook2Id;
                            PricebookEntry.Product2Id = productId;
                            PricebookEntry.IsActive = true;
                            PricebookEntry.UnitPrice = Convert.ToDouble(Opportunity.ShippingTotal__c);
                            PricebookEntry.UseStandardPrice = false;
                            var pricebookid = await forceClient.CreateAsync("PricebookEntry", PricebookEntry);
                            pricebookID = pricebookid.Id;
                        }

                        dynamic OpportunityLineItem = new ExpandoObject();
                        OpportunityLineItem.OpportunityId = (OpportunityId.Id);
                        OpportunityLineItem.PricebookEntryId = !string.IsNullOrEmpty(pricebookID) ? pricebookID : (priceBookDetail.Records[0].Id);
                        OpportunityLineItem.Description = "Shipping Product";
                        OpportunityLineItem.Quantity = 1.0;
                        OpportunityLineItem.TotalPrice = Convert.ToDouble(Opportunity.ShippingTotal__c);
                        var OpportunityLineItemResult = await forceClient.CreateAsync("OpportunityLineItem", OpportunityLineItem);
                    }
                    //Discount Line item

                    if (DiscountItems.orderCount < 0)
                    {
                        pricebookID = "";
                        productId = "";
                        //var priceBook2IdDiscount = await forceClient.QueryAsync<dynamic>("SELECT Id FROM Pricebook2 WHERE IsActive = false AND IsStandard = true ");
                        var priceBook2IdDiscount = await forceClient.QueryAsync<dynamic>("SELECT ID FROM PricebookEntry WHERE NAME ='Discount Amount' AND PRICEBOOK2ID='" + priceBook2Id + "'");

                        if (priceBook2IdDiscount.TotalSize == 0)
                        {
                            // Create a new product
                            dynamic Product2 = new ExpandoObject();
                            Product2.Name = "Discount Amount";
                            var Discountproduct = await forceClient.QueryAsync<dynamic>("SELECT Id FROM Product2 WHERE Name = ' Discount Amount ' ");
                            if (Discountproduct.TotalSize > 0)
                            {
                                var DiscountID = (Discountproduct.Records[0].Id).Value;
                                productId = DiscountID;
                                await forceClient.UpdateAsync("Product2", productId, Product2);
                            }
                            else
                            {
                                var productsId = await forceClient.CreateAsync("Product2", Product2);
                                productId = productsId.Id;

                            }
                            Errorlog.LogRequestToSF(CustomerID, " productId '" + productId + "'Created Sucessfully");
                            // Create a pricebook entry for standard pricebook               
                            dynamic PricebookEntry = new ExpandoObject();
                            PricebookEntry.Pricebook2Id = priceBook2Id;
                            PricebookEntry.Product2Id = productId;
                            PricebookEntry.IsActive = true;
                            PricebookEntry.UnitPrice = DiscountItems.orderCount;
                            PricebookEntry.UseStandardPrice = false;
                            var pricebookid = await forceClient.CreateAsync("PricebookEntry", PricebookEntry);
                            pricebookID = pricebookid.Id;
                        }

                        dynamic OpportunityLineItem = new ExpandoObject();
                        OpportunityLineItem.OpportunityId = (OpportunityId.Id);
                        OpportunityLineItem.PricebookEntryId = !string.IsNullOrEmpty(pricebookID) ? pricebookID : (priceBook2IdDiscount.Records[0].Id);
                        //OpportunityLineItem.PricebookEntryId = PricebookEntryId; 
                        OpportunityLineItem.Description = "Discount Total";
                        OpportunityLineItem.Quantity = 1.0;
                        OpportunityLineItem.TotalPrice = DiscountItems.orderCount;
                        var OpportunityLineItemResult = await forceClient.CreateAsync("OpportunityLineItem", OpportunityLineItem);
                    }
                    Errorlog.LogResponseToSF(CustomerID, string.Format(Thread.CurrentThread.CurrentCulture, Helper.Messages.SUCCESS_RESPONSE, contactId), requestId, statuscode = "OK");
                    #endregion
                    return response;
                }

            }
            catch (Exception ex)
            {
                Email email = new Email();
                errorMessage = ex.Message.ToString();
                errorMessage = (errorMessage == "authentication failure") ? "Please Check your salesforce UserName ,Password , SecurityToken and SalesforceTokenURL" : (errorMessage == "invalid client credentials") ? "Please Check your salesforce clientId and clientSecretKey  " : errorMessage;
                Errorlog.ErrorDetail(CustomerID, orderId, "SalesforceSync", errorMessage, 1);              
                email.SendMailForError("Salesforce Account Sync Error", email.BodyService(Convert.ToString(Lead.FirstName + " " + Lead.LastName), Convert.ToString(Lead.Email), Convert.ToString(Credential.ApplicationId), ex.Message.ToString(),ex.StackTrace.ToString()));
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, errorMessage);
                return response;
            }

        }

    }
}
