using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SalesforceCon.DataAccessLayer;
using SalesforceConnector.BusinessObjects;
using System.Data.Entity.Core.Objects;
using SalesforceConnector;
using System.Threading.Tasks;

namespace SalesforceCon.BusinessAccessLayer
{
    public class FBConfigurationBL:FBConfigurations
    {
        #region Gloubal variable
        SalesforceConnectorEntities salesforceEntity = new SalesforceConnectorEntities();
        #endregion

        #region public Methods

        #region public int FBConfigurationInsert(FBConfigurations oFBConfigurations)
        /// <summary>
        /// CustomerInsert to database 
        /// </summary>
        /// <returns></returns>       
        public string FBConfigurationInsert(FBConfigurations oFBConfigurations)
        {
            try
            {
                var idParameter = new ObjectParameter("Id", typeof(string));
               var con = salesforceEntity.USP_FBConfiguration_Insert
                    (
                         idParameter,
                         oFBConfigurations.FBDataSource,
                         oFBConfigurations.FBInitialCatalog,
                         oFBConfigurations.FBClientId,
                         oFBConfigurations.FBClientPassword,
                         oFBConfigurations.FBPort,
                         oFBConfigurations.FBConnection
                    );
               string s = Convert.ToString(idParameter.Value);
                return s;

            }
            catch (Exception ex)
            {
                return null;
            }
        }
        #endregion        

        #region public int FBConfigurationEdit(FBConfigurations oFBConfigurations)
        /// <summary>
        /// Errordetail to database 
        /// </summary>
        /// <returns></returns>
        public long FBConfigurationEdit(FBConfigurations oFBConfigurations)
        {
            try
            {
                var res = salesforceEntity.USP_FBConfiguration_Update
                    (
                        Convert.ToInt32(oFBConfigurations.Id),
                        oFBConfigurations.FBDataSource,
                        oFBConfigurations.FBInitialCatalog,
                        oFBConfigurations.FBClientId,
                        oFBConfigurations.FBClientPassword,
                        oFBConfigurations.FBPort,
                        oFBConfigurations.FBConnection

                   );
                return Convert.ToInt64(res);

            }
            catch (Exception ex)
            {
                return 1;
            }
        }
        #endregion        

        #region public List<USP_Customer_SelectAll_Result> FBConfigurationList(FBConfigurations oFBConfigurations)
        /// <summary>
        /// Errordetail to database 
        /// </summary>
        /// <returns></returns>
        public List<USP_FBConfiguration_SelectAll_Result> FBConfigurationList()
        {
            try
            {
                var res = salesforceEntity.USP_FBConfiguration_SelectAll().ToList();
                return res;

            }
            catch (Exception ex)
            {
                return null;
            }
        }
        #endregion        

        #region public int FBConfigurationDelete(int Id)
        /// <summary>
        /// CustomerDelete to database 
        /// </summary>
        /// <returns></returns>
        public long FBConfigurationDelete(int Id)
        {
            try
            {
                var res = salesforceEntity.USP_FBConfiguration_Delete(Id);
                return Convert.ToInt64(res);

            }
            catch (Exception ex)
            {
                return 1;
            }
        }
        #endregion        

        #endregion

        
    }
}
