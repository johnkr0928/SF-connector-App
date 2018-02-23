using SalesforceCon.BusinessAccessLayer;
using SalesforceConnector.BusinessObjects;
using SalesforceCon.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity.Core.Objects;
using System.Security.Cryptography;
using System.Threading;
using System.Web.Security;
using SalesforceCon.DataAccessLayer;

namespace SalesforceCon.Controllers
{

    public class LoginController : Controller
    {
        //
        // GET: /Login/
        SalesforceConnectorEntities oSaleforceConnector = new SalesforceConnectorEntities();
        CustomerModels oCustomermodels = new CustomerModels();
        string email = string.Empty;
        Errorlog Errorlog = new Errorlog();
        string orderId = string.Empty;

        #region LoginUser

        [HttpPost]
        public string LoginUser(LoginModels oLoginModel)
        {
            var User = (from s in oSaleforceConnector.Customers where s.Email == oLoginModel.Email select s).FirstOrDefault();
            try
            {
                if (ModelState.IsValid)
                {
                    var CidParameter = new ObjectParameter("Id", typeof(string));
                    if (User != null)
                    {
                        if (User.IsActive == true)
                        {
                            var getUser = (from i in oSaleforceConnector.MemberShipLogins where i.CustomerId == User.Id select i).FirstOrDefault();
                            var hashCode = getUser.SaltKey;
                            var encodingPasswordString = SalesforceConnector.Helper.Encrypt(oLoginModel.Password, hashCode);
                            var query = oSaleforceConnector.USP_Customer_Login(CidParameter, oLoginModel.Email, encodingPasswordString);
                            string Result = Convert.ToString(CidParameter.Value);
                            if (Result == "Login Successfull")
                            {
                                Errorlog.LogRequestToSF(User.Id, string.Format(Thread.CurrentThread.CurrentCulture, Helper.Messages.USER_LOGIN, User.FirstName, User.LastName));
                                return User.Id.ToString();
                            }
                            return "-1";
                        }
                        return "4";
                    }
                    return "-1";

                }
                return "3";
            }
            catch (Exception ex)
            {
                long CustomerID = User.Id;
                ex.Message.ToString();
                Errorlog.ErrorDetail(CustomerID, orderId, "Login", ex.Message, 1);
                return "0";
            }
        }
        #endregion
    }
}