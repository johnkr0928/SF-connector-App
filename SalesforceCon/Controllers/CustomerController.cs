using SalesforceCon.DataAccessLayer;
using SalesforceCon.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Web.Mvc;
using SalesforceCon.BusinessAccessLayer;
using System.Threading;

namespace SalesforceConnector.Controllers
{
    public class CustomerController : Controller
    {
        //
        // GET: /Customer/
        SalesforceConnectorEntities oSaleforceConnector = new SalesforceConnectorEntities();
        CustomerModels oCustomermodels = new CustomerModels();
        CustomerBL ocustomerBL = new CustomerBL();
        Errorlog Errorlog = new Errorlog();
        string orderId = string.Empty;

        #region Customer Insert
        public bool CheckUser(string Email)
        {
            bool Exists = false;
            var email = oSaleforceConnector.Customers.Where(x => x.Email == Email).ToList();
            if (email.Count != 0)
            {
                Exists = true;
            }
            return Exists;
        }
        [HttpPost]
        public string AddUser(CustomerModels oCustomermodels)
        {
            var idParameter = new ObjectParameter("Id", typeof(string));
            try
            {
                string result = string.Empty;
                if (ModelState.IsValid)
                {
                    if (CheckUser(oCustomermodels.Email) == false)
                    {
                        var ConcatName = oCustomermodels.FirstName + "" + oCustomermodels.Email;
                        var Application = Helper.base64Encode(ConcatName);
                        oCustomermodels.ApplicationId = Application;
                        var keyNew = Helper.GeneratePassword(10);
                        var password = Helper.Encrypt(oCustomermodels.Password, keyNew);
                        oCustomermodels.SaltKey = keyNew;
                        oCustomermodels.Password = password;
                        result = ocustomerBL.CustomerInsert(oCustomermodels);
                        return "1";
                    }
                    else
                    {
                        return "-1";
                    }
                }
                else
                {
                    return "3";
                }
            }
            catch (Exception ex)
            {
                long CustomerID = Convert.ToInt32(idParameter);
                ex.Message.ToString();
                Errorlog.ErrorDetail(CustomerID, orderId, "User Creation", ex.Message, 1);
                return "0";
            }
        }

        #endregion

        #region Customer Edit
        public JsonResult GetCustomerById(int id)
        {

            var salesforceConnection = oSaleforceConnector.USP_Customer_SelectById(id).FirstOrDefault();
            var customerModels = new CustomerModels();
            customerModels.Id = Convert.ToInt32(salesforceConnection.Id);
            customerModels.FirstName = salesforceConnection.FirstName;
            customerModels.LastName = salesforceConnection.LastName;
            customerModels.Email = salesforceConnection.Email;
            customerModels.Company = salesforceConnection.Company;
            customerModels.BillingAddressId = Convert.ToInt32(salesforceConnection.BillingAddressId);
            customerModels.ShippingAddressId = Convert.ToInt32(salesforceConnection.ShippingAddressId);
            customerModels.IsActive = Convert.ToBoolean(salesforceConnection.IsActive);
            customerModels.ApplicationId = salesforceConnection.ApplicationId;
            var User = (from s in oSaleforceConnector.Customers where s.Email == salesforceConnection.Email select s).FirstOrDefault();
            var getUser = (from i in oSaleforceConnector.MemberShipLogins where i.CustomerId == User.Id select i).FirstOrDefault();
            var hashCode = getUser.SaltKey;
            var decrypt = Helper.Decrypt(salesforceConnection.Password, hashCode);
            customerModels.Password = decrypt;
            customerModels.ConfirmPassword = decrypt;
            return Json(customerModels, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region GetuserDetail
        public JsonResult GetUserDetail(int id)
        {

            var admin = (from s in oSaleforceConnector.Customers where s.Id == id select s.Admin).FirstOrDefault();
            return Json(admin, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region Update
        [HttpPost]
        [HandleError]
        public string Update(CustomerModels customerModels)
        {
            var User = (from s in oSaleforceConnector.Customers where s.Email == customerModels.Email select s).FirstOrDefault();
            try
            {
                if (ModelState.IsValid)
                {
                    if (CheckUser(oCustomermodels.Email) == false)
                    {
                        var keyNew = Helper.GeneratePassword(10);
                        var password = Helper.Encrypt(customerModels.Password, keyNew);
                        customerModels.SaltKey = keyNew;
                        customerModels.Password = password;
                        var result = ocustomerBL.CustomerEdit(customerModels);
                        return "2";
                    }
                    else
                    {
                        return "-1";
                    }
                }
                return "3";
            }
            catch (Exception ex)
            {
                long CustomerID = Convert.ToInt32(User.Id);
                ex.Message.ToString();
                Errorlog.ErrorDetail(CustomerID, orderId, "User Updated", ex.Message, 1);
                return "0";
            }
        }

        #endregion

        #region CustomerList
        [HttpGet]
        public ActionResult CustomerList()
        {
            List<CustomerModels> customerModelses = new List<CustomerModels>();
            var register = ocustomerBL.CustomerList();
            CustomerModels customerModels = new CustomerModels();

            foreach (var item in register)
            {
                customerModelses.Add(new CustomerModels
                {
                    Id = Convert.ToInt32(item.Id),
                    FirstName = item.FirstName,
                    LastName = item.LastName,
                    Company = item.Company,
                    Email = item.Email,
                    IsActive = Convert.ToBoolean(item.IsActive),
                    Admin = Convert.ToBoolean(item.Admin),
                    BillingAddressId = Convert.ToInt32(item.BillingAddressId)
                }
            );
            }

            return Json(customerModelses.AsEnumerable(), JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region Customer Delete
        public string Delete(int Id)
        {
            try
            {
                if (Id > 0)
                {
                    ocustomerBL.CustomerDelete(Id);
                    return "1";
                }
                return null;
            }
            catch (Exception ex)
            {
                long CustomerID = Convert.ToInt32(Id);
                ex.Message.ToString();
                Errorlog.ErrorDetail(CustomerID, orderId, "User Deleted", ex.Message, 1);
                return "0";
            }
        }
        #endregion

        #region CustomerNameList
        public ActionResult CustomerNameList()
        {
            CustomerModels customerModels = new CustomerModels();
            var customer = new List<SelectListItem>();
            var customers = ocustomerBL.CustomerNameList();
            if (customers != null)
            {
                foreach (var cust in customers)
                {
                    customer.Add(new SelectListItem { Value = Convert.ToString(cust.Id), Text = cust.FirstName+cust.LastName});
                }
                ViewBag.CName = customer;
            }
            return Json(customer.AsEnumerable(), JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region GetApiByCustomerId
        public JsonResult GetApiByCustomerId(int id)
        {
            var salesforceConnection = oSaleforceConnector.USP_SalesforceConnectorResponseLog_GetApiByCustomerId(id).FirstOrDefault();
            return Json(salesforceConnection, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region GetApiByAdmin
        public JsonResult GetApiByAdmin()
        {
            var salesforceConnection = oSaleforceConnector.USP_SalesforceConnectorResponseLog_GetApiByAdmin();
            return Json(salesforceConnection.AsEnumerable(), JsonRequestBehavior.AllowGet);
        }
        #endregion
    }
}