//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace SalesforceCon.DataAccessLayer
{
    using System;
    
    public partial class USP_Configuration_SelectByCustomerId_Result
    {
        public long Id { get; set; }
        public string ConsumerId { get; set; }
        public string ConsumerSecretKey { get; set; }
        public string SalesForceUserName { get; set; }
        public string SalesForceUserPassword { get; set; }
        public string SecurityToken { get; set; }
        public long CustomerId { get; set; }
        public bool IsActive { get; set; }
        public bool LeadSettings { get; set; }
        public bool CampaignSettings { get; set; }
        public string CallBackURL { get; set; }
        public string SalesforceTokenURL { get; set; }
    }
}
