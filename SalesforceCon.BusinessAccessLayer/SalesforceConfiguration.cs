using SalesforceCon.DataAccessLayer;
using SalesforceConnector.BusinessObjects;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace SalesforceCon.BusinessAccessLayer
{

    public class SalesforceConfiguration : Configurations
    {
        #region Gloubal variable
        SalesforceConnectorEntities salesforceEntity = new SalesforceConnectorEntities();
        #endregion

        #region public Methods

        #region public void GetConfigurationDetails(Configurations configurations)
        /// <summary>
        /// Errordetail to database 
        /// </summary>
        /// <returns></returns>
        public List<USP_Configuration_Salesforce_Result> GetConfigurationDetails(Configurations configurations)
        {
            try
            {
                var result = salesforceEntity.USP_Configuration_Salesforce(configurations.CustomerId).ToList();
                return result;


            }
            catch (Exception ex)
            {
                return null;
            }
        }
        #endregion

        #region public int ConfigurationInsert(Configurations configurations)
        /// <summary>
        ///  configuration insert to database 
        /// </summary>
        /// <returns></returns>       
        public int ConfigurationInsert(Configurations configurations)
        {
            try
            {
                var idParameter = new ObjectParameter("Id", typeof(string));
                var res = salesforceEntity.USP_Configuration_Insert
                    (
                         idParameter,
                            (configurations.ConsumerId.Trim()),
                            (configurations.ConsumerSecretKey.Trim()),
                            (configurations.SalesForceUserName.Trim()),
                            (configurations.SalesForceUserPassword.Trim()),
                            (configurations.SecurityToken.Trim()),
                            (configurations.CustomerId),
                            (configurations.IsActive = true),
                            (configurations.LeadSettings),
                            (configurations.CampaignSettings),
                            (configurations.SalesforceTokenURL.Trim()),
                            (configurations.CallBackURL.Trim())
                    );
                return res;

            }
            catch (Exception ex)
            {
                return 1;
            }
        }
        #endregion

        #region public int ConfigurationUpdate(Customer oCustomer)
        /// <summary>
        /// Errordetail to database 
        /// </summary>
        /// <returns></returns>
        public long ConfigurationUpdate(Configurations configurations)
        {
            try
            {
                var res = salesforceEntity.USP_Configuration_Update
                    (
                        Convert.ToInt32(configurations.Id),
                        (configurations.ConsumerId.TrimEnd()),
                        (configurations.ConsumerSecretKey.Trim()),
                        (configurations.SalesForceUserName.TrimEnd()),
                        (configurations.SalesForceUserPassword.Trim()),
                        (configurations.SecurityToken.Trim()),
                        (configurations.SalesforceTokenURL.Trim()),
                        (configurations.LeadSettings),
                        (configurations.CallBackURL.Trim()),
                        (configurations.CampaignSettings),
                        (Convert.ToBoolean(configurations.IsActive))
                   );
                return Convert.ToInt64(res);

            }
            catch (Exception ex)
            {
                return 1;
            }
        }
        #endregion

        #region public int ConfigurationDelete(int Id)
        /// <summary>
        /// CustomerDelete to database 
        /// </summary>
        /// <returns></returns>
        public long ConfigurationDelete(int Id)
        {
            try
            {
                var res = salesforceEntity.USP_Configuration_Delete(Id);
                return Convert.ToInt64(res);

            }
            catch (Exception ex)
            {
                return 1;
            }
        }
        #endregion

        #region public void ConfigurationSelectAll(Configurations configurations)
        /// <summary>
        /// Errordetail to database 
        /// </summary>
        /// <returns></returns>
        public List<USP_Configuration_SelectAll_Result> ConfigurationSelectAll()
        {
            try
            {
                var result = salesforceEntity.USP_Configuration_SelectAll().ToList();
                return result;


            }
            catch (Exception ex)
            {
                return null;
            }
        }
        #endregion

        #region public void GetCustomerId(Configurations configurations)
        /// <summary>
        /// Errordetail to database 
        /// </summary>
        /// <returns></returns>
        public List<USP_Configuration_SelectByApplicationId_Result> GetCustomerId(Configurations configurations)
        {
            try
            {
                var result = salesforceEntity.USP_Configuration_SelectByApplicationId(configurations.ApplicationId).ToList();
                return result;


            }
            catch (Exception ex)
            {
                return null;
            }
        }
        #endregion

        #region public string Authentication(Configurations configurations)
        /// <summary>
        /// Authorization 
        /// </summary>
        /// <returns></returns>
        public string Authentication(Configurations configurations)
        {
            var SuccessResult = "";
            try
            {
                var SelectUserresult = salesforceEntity.USP_Configuration_SelectByApplicationId(configurations.ApplicationId).ToList();
                if (SelectUserresult.Count == 0)
                {
                    SuccessResult = "Access Denied";
                }
                else
                {
                    var Getapicount = salesforceEntity.USP_SalesforceConnectorResponseLog_GetApiByCustomerId(SelectUserresult[0].CustomerId).FirstOrDefault();
                    if(Getapicount.response<=100)
                    {
                        SuccessResult = "Success";
                    }
                    else
                    {
                        SuccessResult = "At this time you are reached your API hit Limit";
                    }
                }
                return SuccessResult;


            }
            catch (Exception ex)
            {
                return ex.Message.ToString();
            }
        }
        #endregion

        #endregion
    }
}
