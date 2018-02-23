using SalesforceCon.DataAccessLayer;
using System;
using System.Data;
using System.Data.Sql;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SalesforceConnector.BusinessObjects;
using System.Data.Entity.Core.Objects;

namespace SalesforceCon.BusinessAccessLayer
{
    public class Errorlog : SalesforceConnector.BusinessObjects.Configurations
    {
        #region Gloubal variable
        SalesforceConnectorEntities salesforceEntity = new SalesforceConnectorEntities();
        #endregion

        #region public Methods

       

        #region public void Errorlog(long customerId, string  activityLog, string activityStatus)
        /// <summary>
        /// Errordetail to database 
        /// </summary>
        /// <returns></returns>
        public void ErrorDetail(long customerId,string orderId, string  methodName, string activityLog,int Activaty)
        {
            try
            {
                var responseLog = new ErrorLog
                {
                    CustomerId=customerId,
                    OrderId = orderId,
                    ErrorMessage = activityLog,
                    MethodName = methodName,
                    ActivityStatus=Activaty,
                    CreatedOn = DateTime.Now
                };
                salesforceEntity.ErrorLogs.Add(responseLog);
                salesforceEntity.SaveChanges();
            }
            catch (Exception ex)
            {               
               
            }
        }
        #endregion

        #region public void LogRequestToSF(long customerId, string data,string orderId)
        /// <summary>
        /// Errordetail to database 
        /// </summary>
        /// <returns></returns>
        public int LogRequestToSF(long customerId, string data)
        {
            int requestID = 0;
            try
            {
                var idParameter = new ObjectParameter("RequestId", typeof(int));
                var result = salesforceEntity.USP_SalesforceConnectorRequestLog_Insert(idParameter, customerId, data);
                requestID = Convert.ToInt32(idParameter.Value);
            }
            catch (Exception ex)
            {

            }
            return requestID;
        }
        #endregion

        #region public void LogRequestToSF(long customerId, string data)
        /// <summary>
        /// Errordetail to database 
        /// </summary>
        /// <returns></returns>
        public void LogResponseToSF(long customerId, string data,int requestid,string statuscode)
        {
            try
            {
                var result = salesforceEntity.USP_SalesforceConnectorResponseLog_Insert(data, customerId, requestid, statuscode);
                //var responseLog = new SalesforceConnectorResponseLog
                //{
                //    CustomerId = Convert.ToInt16(customerId),
                //    RequestId = requestid,
                //    SFOrderResponse = data,
                //    CreatedOn = DateTime.Now
                //};
                //salesforceEntity.SalesforceConnectorResponseLogs.Add(responseLog);
                //salesforceEntity.SaveChanges();
            }
            catch (Exception ex)
            {

            }
        }
        #endregion

        #endregion

    }
}
