using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SalesforceCon.DataAccessLayer;
using SalesforceConnector.BusinessObjects;
using System.Data.Entity.Core.Objects;

namespace SalesforceCon.BusinessAccessLayer
{
    public class CustomerBL:Customers
    {
        #region Gloubal variable
        SalesforceConnectorEntities salesforceEntity = new SalesforceConnectorEntities();
        #endregion

        #region public Methods    

        #region public int CustomerInsert(string keyNew, string password, Customers Customer)
        /// <summary>
        /// CustomerInsert to database 
        /// </summary>
        /// <returns></returns>       
        public string CustomerInsert(Customers oCustomer)
        {
            try
            {
                var idParameter = new ObjectParameter("Id", typeof(string));
                var res = salesforceEntity.USP_Customer_Insert
                    (
                         idParameter,
                         oCustomer.FirstName,
                         oCustomer.LastName,
                         oCustomer.Email,
                         oCustomer.Company,
                         oCustomer.IsActive,
                         oCustomer.Password,
                         oCustomer.SaltKey,
                         oCustomer.ApplicationId
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

        #region public int CustomerEdit(Customer oCustomer)
        /// <summary>
        /// Errordetail to database 
        /// </summary>
        /// <returns></returns>
        public long CustomerEdit(Customers Customer)
        {
            try
            {
                var res = salesforceEntity.USP_Customer_Update
                    (
                        Convert.ToInt32(Customer.Id),
                        Customer.FirstName,
                        Customer.LastName,
                        Customer.Email,
                        Customer.Company,
                        Convert.ToInt32(Customer.BillingAddressId),
                        Convert.ToInt32(Customer.ShippingAddressId),
                        Convert.ToBoolean(Customer.IsActive),
                        Customer.Password,
                        Customer.SaltKey
                   );
                return Convert.ToInt64(res);

            }
            catch (Exception ex)
            {
                return 1;
            }
        }
        #endregion        

        #region public int CustomerDelete(int Id)
        /// <summary>
        /// CustomerDelete to database 
        /// </summary>
        /// <returns></returns>
        public long CustomerDelete(int Id)
        {
            try
            {
                var res = salesforceEntity.USP_Custmer_Delete(Id);
                return Convert.ToInt64(res);

            }
            catch (Exception ex)
            {
                return 1;
            }
        }
        #endregion        

        #region public List<USP_Customer_SelectAll_Result> CustomerList(Customer Customer)
        /// <summary>
        /// Errordetail to database 
        /// </summary>
        /// <returns></returns>
        public List<USP_Customer_SelectAll_Result> CustomerList()
        {
            try
            {
                var res = salesforceEntity.USP_Customer_SelectAll().ToList();
                return res;

            }
            catch (Exception ex)
            {
                return null;
            }
        }
        #endregion
        //dropdown
        #region public List<USP_CustomerName_SelectAll_Result> CustomerNameList(Customer Customer)
        /// <summary>
        /// Errordetail to database 
        /// </summary>
        /// <returns></returns>
        public List<USP_CustomerName_SelectAll_Result> CustomerNameList()
        {
            try
            {
                var res = salesforceEntity.USP_CustomerName_SelectAll().ToList();
                return res;

            }
            catch (Exception ex)
            {
                return null;
            }
        }
        #endregion     

        #region public List<USP_Customer_SelectById_Result > CustomerListSelectbyId(int Id)
        /// <summary>
        /// Errordetail to database 
        /// </summary>
        /// <returns></returns>
        public List<USP_Customer_SelectById_Result > CustomerListSelectbyId(int Id)
        {
            try
            {
                var res = salesforceEntity.USP_Customer_SelectById(Id).ToList();
                return res;

            }
            catch (Exception ex)
            {
                return null;
            }
        }
        #endregion

        //dropdown
        #region public List<USP_CustomerName_SelectAll_Result> CustomerNameList(Customer Customer)
        /// <summary>
        /// Errordetail to database 
        /// </summary>
        /// <returns></returns>
        //public List<USP_CustomerName_SelectAll_Result> CustomerNameList()
        //{
        //    try
        //    {
        //        var res = salesforceEntity.USP_CustomerName_SelectAll().ToList();
        //        return res;

        //    }
        //    catch (Exception ex)
        //    {
        //        return null;
        //    }
        //}
        #endregion
        #endregion

    }
}
