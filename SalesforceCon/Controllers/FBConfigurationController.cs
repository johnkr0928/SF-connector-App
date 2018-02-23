using SalesforceCon.DataAccessLayer;
using SalesforceCon.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Web.Mvc;
using SalesforceCon.BusinessAccessLayer;

namespace SalesforceCon.Controllers
{
    public class FBConfigurationController : Controller
    {
        //
        // GET: /FBConfiguration/
        SalesforceConnectorEntities oSaleforceConnector = new SalesforceConnectorEntities();
        FBConfigurationModels oFBConfigurationModels = new FBConfigurationModels();
        FBConfigurationBL oFBConfigurationBL = new FBConfigurationBL();
        string orderId = string.Empty;
        Errorlog Errorlog = new Errorlog();

        #region FBConfiguration Insert
        public ActionResult Index()
        {
            return View();
        }
        public bool CheckFbClientId(string ClientId)
        {
            bool Exists = false;
            var consumerid = oSaleforceConnector.FBConfigurations.Where(x => x.FBClientId == ClientId).ToList();
            if (consumerid.Count != 0)
            {
                Exists = true;
            }
            return Exists;
        }
        [HttpPost]
        public string FBConfigurationInsert(FBConfigurationModels oFBConfigurationModels)
        {
            var customerid = oFBConfigurationModels.CustomerId;
            try
            {
                string result = string.Empty;
                var idParameter = new ObjectParameter("Id", typeof(string));
                if (ModelState.IsValid)
                {
                    if (CheckFbClientId(oFBConfigurationModels.FBClientId) == false)
                    {
                        result = oFBConfigurationBL.FBConfigurationInsert(oFBConfigurationModels);
                        return "1";
                    }
                    return "-1";
                }
                return "3";
            }
            catch (Exception ex)
            {
                long CustomerID = Convert.ToInt32(customerid);
                ex.Message.ToString();
                Errorlog.ErrorDetail(CustomerID, orderId, "Sf Configuration Creation", ex.Message, 1);
                return "0";
            }
        }
        #endregion

        #region FBConfiguration Edit
        public JsonResult Edit(int Id)
        {
            var salesforceConnection = oSaleforceConnector.USP_FBConfiguration_SelectById(Id).FirstOrDefault();
            var oFBConfigurationModels = new FBConfigurationModels();
            oFBConfigurationModels.Id = Convert.ToInt32(salesforceConnection.Id);
            oFBConfigurationModels.FBDataSource = salesforceConnection.FBDataSource;
            oFBConfigurationModels.FBInitialCatalog = salesforceConnection.FBInitialCatalog;
            oFBConfigurationModels.FBClientId = salesforceConnection.FBClientId;
            oFBConfigurationModels.FBClientPassword = salesforceConnection.FBClientPassword;
            oFBConfigurationModels.FBPort = salesforceConnection.FBPort;
            oFBConfigurationModels.FBConnection = salesforceConnection.FBConnection;
            return Json(oFBConfigurationModels, JsonRequestBehavior.AllowGet);
        }

        public JsonResult EditById(int id)
        {
            var salesforceConnection = oSaleforceConnector.USP_FBConfiguration_SelectById(id).FirstOrDefault();
            var oFBConfigurationModels = new FBConfigurationModels();
            oFBConfigurationModels.Id = Convert.ToInt32(salesforceConnection.Id);
            oFBConfigurationModels.FBDataSource = salesforceConnection.FBDataSource;
            oFBConfigurationModels.FBInitialCatalog = salesforceConnection.FBInitialCatalog;
            oFBConfigurationModels.FBClientId = salesforceConnection.FBClientId;
            oFBConfigurationModels.FBClientPassword = salesforceConnection.FBClientPassword;
            oFBConfigurationModels.FBPort = salesforceConnection.FBPort;
            oFBConfigurationModels.FBConnection = salesforceConnection.FBConnection;
            return Json(oFBConfigurationModels, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        [HandleError]
        public string FBUpdate(FBConfigurationModels oFBConfigurationModels)
        {
            var customerid = oFBConfigurationModels.CustomerId;
            try
            { 
                if (ModelState.IsValid)
                {
                    if (CheckFbClientId(oFBConfigurationModels.FBClientId) == false)
                    {
                        var result = oFBConfigurationBL.FBConfigurationEdit(oFBConfigurationModels);
                        return "1";
                    }
                    return "-1";
                }
                return "3";
            }
            catch(Exception ex)
            {
                long CustomerID = Convert.ToInt32(customerid);
                ex.Message.ToString();
                Errorlog.ErrorDetail(CustomerID, orderId, "Sf Configuration Creation", ex.Message, 1);
                return "0";
            }
        }

        #endregion

        #region FBConfigurationList
        public ActionResult List()
        {

            List<FBConfigurationModels> oFBConfigurationModelses = new List<FBConfigurationModels>();


            var register = oFBConfigurationBL.FBConfigurationList();


            foreach (var item in register)
            {
                oFBConfigurationModelses.Add(new FBConfigurationModels
                {
                    Id = Convert.ToInt32(item.Id),
                    FBDataSource = item.FBDataSource,
                    FBInitialCatalog = item.FBInitialCatalog,
                    FBClientId = item.FBClientId,
                    FBClientPassword = item.FBClientPassword,
                    FBPort = item.FBPort,
                    FBConnection = item.FBConnection
                }
            );
            }

            return View(oFBConfigurationModelses.AsEnumerable());
        }

        [HttpGet]
        public ActionResult FBConfigurationList()
        {

            List<FBConfigurationModels> oFBConfigurationModelses = new List<FBConfigurationModels>();


            var register = oFBConfigurationBL.FBConfigurationList();


            foreach (var item in register)
            {
                oFBConfigurationModelses.Add(new FBConfigurationModels
                {
                    Id = Convert.ToInt32(item.Id),
                    FBDataSource = item.FBDataSource,
                    FBInitialCatalog = item.FBInitialCatalog,
                    FBClientId = item.FBClientId,
                    FBClientPassword = item.FBClientPassword,
                    FBPort = item.FBPort,
                    FBConnection = item.FBConnection
                }
            );
            }

            return Json(oFBConfigurationModelses.AsEnumerable(), JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region FBConfiguration Delete
        public string FBConfigurationDelete(int Id)
        {
            try { 
            if (Id > 0)
            {
                oFBConfigurationBL.FBConfigurationDelete(Id);
                return "1";
            }
            return "3";
            }
            catch(Exception ex)
            {
                return "0";
            }
        }

        #endregion
    }
}