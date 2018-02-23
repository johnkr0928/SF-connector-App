using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using SalesforceCon.Models;
using SalesforceCon.DataAccessLayer;
using System.Data.Entity.Core.Objects;
using PagedList;
using SalesforceCon.BusinessAccessLayer;

namespace SalesforceCon.Controllers
{
    public class ConfigurationController : Controller
    {
        //
        // GET: /Configuration/
        SalesforceConnectorEntities oSaleforceConnector = new SalesforceConnectorEntities();
        ConfigurationModels oConfigurationmodels = new ConfigurationModels();
        SalesforceConfiguration oSalesforceConfiguration = new SalesforceConfiguration();
        string orderId = string.Empty;
        Errorlog Errorlog = new Errorlog();

        #region SFConfigurationList
        public JsonResult SFConfigurationList()
        {
            try
            {
                List<ConfigurationModels> configurationModelses = new List<ConfigurationModels>();

                var register = oSalesforceConfiguration.ConfigurationSelectAll();

                foreach (var item in register)
                {
                    configurationModelses.Add(new ConfigurationModels
                    {
                        Id = Convert.ToInt32(item.Id),
                        ConsumerId = item.ConsumerId.Trim(),
                        ConsumerSecretKey = item.ConsumerSecretKey.Trim(),
                        SalesForceUserName = item.SalesForceUserName.Trim(),
                        SalesForceUserPassword = item.SalesForceUserPassword.Trim(),
                        SecurityToken = item.SecurityToken.Trim(),
                        SalesforceTokenURL = item.SalesforceTokenURL.Trim(),
                        // CartConnection = item.CartConnection,
                        CustomerId = Convert.ToInt32(item.CustomerId),
                        IsActive = Convert.ToBoolean(item.IsActive),
                        LeadSettings = item.LeadSettings,
                        CampaignSettings = item.CampaignSettings
                    }
                );
                }
                return Json(configurationModelses.AsEnumerable(), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        #endregion

        #region ConfigurationInsert
        public bool CheckConsumerId(string ConsumerId)
        {
            bool Exists = false;
            var consumerid = oSaleforceConnector.Configurations.Where(x => x.ConsumerId == ConsumerId).ToList();
            if (consumerid.Count != 0)
            {
                Exists = true;
            }
            return Exists;
        }

        [HttpPost]
        public string ConfigurationInsert(ConfigurationModels configurationModels)
        {
            long customerid = configurationModels.CustomerId;
            var result = 0;
            try
            {     
                if (ModelState.IsValid)
                {
                    if (CheckConsumerId(configurationModels.ConsumerId) == false)
                    {
                        result = oSalesforceConfiguration.ConfigurationInsert(configurationModels);
                        return "1";
                    }
                    return "-1";
                }
                return "3";
            }
            catch (Exception Ex)
            {
                long CustomerID = (customerid);
                Ex.Message.ToString();
                Errorlog.ErrorDetail(CustomerID, orderId, "ConfigurationInsert", Ex.Message, 1);
                return "0";
            }
        }
        #endregion

        #region EditById
        public JsonResult EditById(int Id)
        {
            try
            {
                var salesforceConnection = oSaleforceConnector.USP_Configuration_SelectById(Id).FirstOrDefault();
                var configurationModels = new ConfigurationModels();
                configurationModels.Id = Convert.ToInt32(salesforceConnection.Id);
                configurationModels.ConsumerId = salesforceConnection.ConsumerId.Trim();
                configurationModels.ConsumerSecretKey = salesforceConnection.ConsumerSecretKey.Trim();
                configurationModels.SalesForceUserName = salesforceConnection.SalesForceUserName.Trim();
                configurationModels.SalesForceUserPassword = salesforceConnection.SalesForceUserPassword.Trim();
                configurationModels.SecurityToken = salesforceConnection.SecurityToken.Trim();
                configurationModels.SalesforceTokenURL = salesforceConnection.SalesforceTokenURL.Trim();
                configurationModels.CustomerId = Convert.ToInt32(salesforceConnection.CustomerId);
                configurationModels.IsActive = Convert.ToBoolean(salesforceConnection.IsActive);
                configurationModels.LeadSettings = Convert.ToBoolean(salesforceConnection.LeadSettings);
                configurationModels.CallBackURL = salesforceConnection.CallBackURL.Trim();
                configurationModels.CampaignSettings = Convert.ToBoolean(salesforceConnection.CampaignSettings);
                return Json(configurationModels, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        #endregion

        #region EditByCustomerId
        public JsonResult EditByCustomerId(int Id)
        {
            try
            {
                var salesforceConnection = oSaleforceConnector.USP_Configuration_SelectByCustomerId(Id).FirstOrDefault();
                var configurationModels = new ConfigurationModels();
                configurationModels.Id = Convert.ToInt32(salesforceConnection.Id);
                configurationModels.ConsumerId = salesforceConnection.ConsumerId.Trim();
                configurationModels.ConsumerSecretKey = salesforceConnection.ConsumerSecretKey.Trim();
                configurationModels.SalesForceUserName = salesforceConnection.SalesForceUserName.Trim();
                configurationModels.SalesForceUserPassword = salesforceConnection.SalesForceUserPassword.Trim();
                configurationModels.SecurityToken = salesforceConnection.SecurityToken.Trim();
                configurationModels.SalesforceTokenURL = salesforceConnection.SalesforceTokenURL.Trim();
                configurationModels.CustomerId = Convert.ToInt32(salesforceConnection.CustomerId);
                configurationModels.IsActive = Convert.ToBoolean(salesforceConnection.IsActive);
                configurationModels.LeadSettings = Convert.ToBoolean(salesforceConnection.LeadSettings);
                configurationModels.CallBackURL = salesforceConnection.CallBackURL.Trim();
                configurationModels.CampaignSettings = Convert.ToBoolean(salesforceConnection.CampaignSettings);
                return Json(configurationModels, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        #endregion

        #region SFUpdate
        [HttpPost]
        [HandleError]
        public string SFUpdate(ConfigurationModels configurationModels)
         {
            var customerid = configurationModels.CustomerId;
            try
            {
                long result = 0;
                if (ModelState.IsValid)
                {
                        result = oSalesforceConfiguration.ConfigurationUpdate(configurationModels);
                        return "2";
                }
                return "3";
            }
            catch (Exception ex)
            {
                long CustomerID = Convert.ToInt32(customerid);
                ex.Message.ToString();
                Errorlog.ErrorDetail(CustomerID, orderId, "Sf Configuration Update", ex.Message, 1);
                return "0";
            }
        }
        #endregion

        #region Delete
        public string Delete(int Id)
        {
            try
            {
                if (Id > 0)
                {
                    oSalesforceConfiguration.ConfigurationDelete(Id);
                    return "1";
                }
                return "-1";
            }
            catch (Exception ex)
            {
                return "0";
            }
        }
        #endregion
    }
}