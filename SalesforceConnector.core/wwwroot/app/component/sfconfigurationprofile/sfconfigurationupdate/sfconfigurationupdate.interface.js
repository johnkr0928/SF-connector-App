"use strict";
var SFConfigurationUpdateModel = (function () {
    function SFConfigurationUpdateModel(CustomerId, ConsumerId, ConsumerSecretKey, SalesForceUserName, SalesForceUserPassword, SecurityToken, LeadSettings, CampaignSettings, SalesforceTokenURL, CallBackURL, IsActive, Id) {
        this.CustomerId = CustomerId;
        this.ConsumerId = ConsumerId;
        this.ConsumerSecretKey = ConsumerSecretKey;
        this.SalesForceUserName = SalesForceUserName;
        this.SalesForceUserPassword = SalesForceUserPassword;
        this.SecurityToken = SecurityToken;
        this.LeadSettings = LeadSettings;
        this.CampaignSettings = CampaignSettings;
        this.SalesforceTokenURL = SalesforceTokenURL;
        this.CallBackURL = CallBackURL;
        this.IsActive = IsActive;
        this.Id = Id;
    }
    return SFConfigurationUpdateModel;
}());
exports.SFConfigurationUpdateModel = SFConfigurationUpdateModel;
