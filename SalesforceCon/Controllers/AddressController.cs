using SalesforceCon.BusinessAccessLayer;
using SalesforceCon.DataAccessLayer;
using SalesforceCon.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SalesforceCon.Controllers
{
    public class AddressController : Controller
    {
        SalesforceConnectorEntities oSaleforceConnector = new SalesforceConnectorEntities();
        AddressModels oAddressmodels = new AddressModels();
        string orderId = string.Empty;
        Errorlog Errorlog = new Errorlog();

        #region AddressInsert
        [HttpPost]
        public string AddressInsert(AddressModels oAddressmodels)
        {
            var BillingResult = 0;
            var shippingResult = 0;
            var customerid = oAddressmodels.CustomerId;
            try
            { 
                if (ModelState.IsValid)
                {
                    BillingResult = oSaleforceConnector.USP_Address_Insert(oAddressmodels.CustomerId, oAddressmodels.BillingAddress1, oAddressmodels.BillingAddress2, oAddressmodels.BillingCountry, oAddressmodels.BillingState, oAddressmodels.BillingCity, oAddressmodels.BillingPostalCode, oAddressmodels.BillingPhoneNumber, "Billing");

                    //shippingResult = oSaleforceConnector.USP_Address_Insert(oAddressmodels.CustomerId, oAddressmodels.ShippingAddress1, oAddressmodels.ShippingAddress2, oAddressmodels.ShippingCountry, oAddressmodels.ShippingState, oAddressmodels.ShippingCity, oAddressmodels.ShippingPostalCode, oAddressmodels.ShippingPhoneNumber, "Shipping");
                    return "1";
                }
            return "3";
            }
            catch (Exception ex)
            {
                long CustomerID = Convert.ToInt32(customerid);
                ex.Message.ToString();
                Errorlog.ErrorDetail(CustomerID, orderId, "AddressInsert", ex.Message, 1);
                return "0";
            }
        }
        #endregion

        #region EditById
        [HttpGet]
        public JsonResult EditById(int Id)
        {
            var User = (from s in oSaleforceConnector.Customers where s.Id == Id select s).FirstOrDefault();
            var BillingAddressId = User.BillingAddressId;
            var ShippingAddressId = User.ShippingAddressId;

            //return RedirectToAction("Index", "Address");
            var BillingsalesforceConnectionBilling = oSaleforceConnector.USP_Address_SelectByBillingAddressId(BillingAddressId).FirstOrDefault();
            var Addressmodels = new AddressModels();
            Addressmodels.Id = Convert.ToInt32(BillingsalesforceConnectionBilling.Id);
            Addressmodels.BillingAddress1 = BillingsalesforceConnectionBilling.Address1;
            Addressmodels.BillingAddress2 = BillingsalesforceConnectionBilling.Address2;
            Addressmodels.BillingCity = BillingsalesforceConnectionBilling.City;
            Addressmodels.BillingState = BillingsalesforceConnectionBilling.State;
            Addressmodels.BillingCountry = BillingsalesforceConnectionBilling.Country;
            Addressmodels.BillingPostalCode = BillingsalesforceConnectionBilling.PostalCode;
            Addressmodels.BillingPhoneNumber = BillingsalesforceConnectionBilling.PhoneNumber;
            Addressmodels.CustomerId = Convert.ToInt32(BillingsalesforceConnectionBilling.CustomerId);

            //var ShippingsalesforceConnectionShipping = oSaleforceConnector.USP_Address_SelectByShippingAddressId(ShippingAddressId).FirstOrDefault();
            //Addressmodels.Id = Convert.ToInt32(ShippingsalesforceConnectionShipping.Id);
            //Addressmodels.ShippingAddress1 = ShippingsalesforceConnectionShipping.Address1;
            //Addressmodels.ShippingAddress2 = ShippingsalesforceConnectionShipping.Address2;
            //Addressmodels.ShippingCity = ShippingsalesforceConnectionShipping.City;
            //Addressmodels.ShippingState = ShippingsalesforceConnectionShipping.State;
            //Addressmodels.ShippingCountry = ShippingsalesforceConnectionShipping.Country;
            //Addressmodels.ShippingPostalCode = ShippingsalesforceConnectionShipping.PostalCode;
            //Addressmodels.ShippingPhoneNumber = ShippingsalesforceConnectionShipping.PhoneNumber;

            return Json(Addressmodels, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region AddressUpdate
        [HttpPost]
        [HandleError]
        public string AddressUpdate(AddressModels oAddressmodels)
        {
            var BillingResult = 0;
          //  var shippingResult = 0;
            // long CustomerId = Convert.ToInt64(Session["CustomerId"]);
            var CustomerId = oAddressmodels.CustomerId;
            var User = (from s in oSaleforceConnector.Customers where s.Id == CustomerId select s).FirstOrDefault();
            var BillinAddressId = User.BillingAddressId;
            //var ShippingAddressId = User.ShippingAddressId;
            try
            { 
                if (ModelState.IsValid)
                {
                        BillingResult = oSaleforceConnector.USP_Address_Update
                            (
                                BillinAddressId,
                                oAddressmodels.BillingAddress1,
                                oAddressmodels.BillingAddress2,
                                oAddressmodels.BillingCountry,
                                oAddressmodels.BillingState,
                                oAddressmodels.BillingCity,
                                oAddressmodels.BillingPostalCode,
                                oAddressmodels.BillingPhoneNumber

                            );
                 //   shippingResult = oSaleforceConnector.USP_Address_Update
                 // (
                 //     ShippingAddressId,
                 //     oAddressmodels.ShippingAddress1,
                 //     oAddressmodels.ShippingAddress2,
                 //     oAddressmodels.ShippingCountry,
                 //     oAddressmodels.ShippingState,
                 //     oAddressmodels.ShippingCity,
                 //     oAddressmodels.ShippingPostalCode,
                 //     oAddressmodels.ShippingPhoneNumber
                 //);
                    return "2";
                }
                else
                {
                    return "3";
                }
            }
            catch (Exception ex)
            {
                long CustomerID = Convert.ToInt32(CustomerId);
                ex.Message.ToString();
                Errorlog.ErrorDetail(CustomerID, orderId, "AddressUpdate", ex.Message, 1);
                return "0";
            }
        }
        #endregion
    }
}