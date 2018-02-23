using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using SalesforceConnector.BusinessObjects;

namespace SalesforceCon.Models
{
    public class ConfigurationModels : Configurations
    {
        public override int Id { get; set; }

        public override string ConsumerId { get; set; }
        public override string ConsumerSecretKey { get; set; }
        public override string SalesForceUserName { get; set; }
        public override string SalesForceUserPassword { get; set; }
        public override string SecurityToken { get; set; }
        public override string SalesforceTokenURL { get; set; }
        public override int CustomerId { get; set; }
        public override Boolean IsActive { get; set; }
        public override Boolean LeadSettings { get; set; }
        public override Boolean CampaignSettings { get; set; }
        public override string CallBackURL { get; set; }

        List<ConfigurationModels> OConfigurationModels = new List<ConfigurationModels>();
        public override string ApplicationId { get; set; }
    }
}

