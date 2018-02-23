using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Salesforceconnector_Core
{
    public class SfConfigurationModels    {
      
        public int Id { get; set; }
        public string CustomerId { get; set; }    
        public string ConsumerId { get; set; }
        public string ConsumerSecretKey { get; set; }
        public string SalesForceUserName { get; set; }
        public string SalesForceUserPassword { get; set; }
        public string SecurityToken { get; set; }
        public Boolean LeadSettings { get; set; }
        public Boolean CampaignSettings { get; set; }
        public string SalesforceTokenURL { get; set; }
        public string CallBackURL { get; set; }
        public Boolean IsActive { get; set; }

    }
}
