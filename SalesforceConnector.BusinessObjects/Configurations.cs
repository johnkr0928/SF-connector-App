using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SalesforceConnector.BusinessObjects
{
    public class Configurations
    {
        public virtual int Id { get; set; }
        public virtual string ConsumerId { get; set; }
        public virtual string ConsumerSecretKey { get; set; }
        public virtual string SalesForceUserName { get; set; }
        public virtual string SalesForceUserPassword { get; set; }
        public virtual string SecurityToken { get; set; }
        public virtual string CartConnection { get; set; }
        public virtual int CustomerId { get; set; }
        public virtual String SalesforceTokenURL { get; set; }
        public virtual Boolean IsActive { get; set; }
        public virtual Boolean LeadSettings { get; set; }
        public virtual Boolean CampaignSettings { get; set; }     

         public virtual string CallBackURL { get; set; }
        public virtual string ApplicationId { get; set; }
    }
}
