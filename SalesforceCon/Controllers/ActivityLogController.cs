using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using SalesforceCon.Models;
using SalesforceCon.DataAccessLayer;
using System.Data.Entity.Core.Objects;
using PagedList;
using SalesforceCon.BusinessAccessLayer;

namespace SalesforceCon.Controllers{
    public class ActivityLogController : Controller
    {
        SalesforceConnectorEntities oSaleforceConnector = new SalesforceConnectorEntities();
        ActivityLogModels activityLogModels = new ActivityLogModels();
        // GET: ActivityLog

        #region ActivityList
        [HttpGet]
        public ActionResult ActivityList()
        {

            List<ActivityLogModels> errorLogModelss = new List<ActivityLogModels>();
            var register = from s in oSaleforceConnector.USP_ActivityLog_SelectAll() select s;

            foreach (var item in register)
            {
                errorLogModelss.Add(new ActivityLogModels
                {
                    UserName = item.FirstName + " " + item.LastName,                   
                    MethodName = item.MethodName,
                    ErrorMessage = item.ErrorMessage,
                    ActivityStatus = Convert.ToInt32(item.ActivityStatus),
                    CreatedOn = Convert.ToDateTime(item.CreatedOn)
                }
            );
            }
            return Json(errorLogModelss.AsEnumerable(), JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region RequestResponceList
        [HttpGet]
        public ActionResult RequestResponceList()
        {

            List<ActivityLogModels> errorLogModelss = new List<ActivityLogModels>();
            var register = from s in oSaleforceConnector.USP_Request_SelectAll() select s;

            foreach (var item in register)
            {
                errorLogModelss.Add(new ActivityLogModels
                {
                    UserName = item.FirstName + " " + item.LastName,
                    ErrorMessage = item.RequestModel,
                    ActivityStatus = 1,
                    CreatedOn = Convert.ToDateTime(item.CreatedOn)

                }
            );
            }
            var responce = from s in oSaleforceConnector.USP_Responce_SelectAll() select s;

            foreach (var item in responce)
            {
                errorLogModelss.Add(new ActivityLogModels
                {
                    UserName = item.FirstName + " " + item.LastName,
                    ErrorMessage = item.SFOrderResponse,
                    ActivityStatus = 2,
                    CreatedOn = Convert.ToDateTime(item.CreatedOn)
                }
            );
            }
            return Json(errorLogModelss.AsEnumerable(), JsonRequestBehavior.AllowGet);
        }
        #endregion
    }
}

