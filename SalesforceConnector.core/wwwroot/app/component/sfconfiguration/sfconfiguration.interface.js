"use strict";
var SfConfigurationModel = (function () {
    function SfConfigurationModel(CustomerId, ConsumerId, ConsumerSecretKey, SalesForceUserName, SalesForceUserPassword, SecurityToken, LeadSettings, CampaignSettings, SalesforceTokenURL, CallBackURL, IsActive) {
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
    }
    return SfConfigurationModel;
}());
exports.SfConfigurationModel = SfConfigurationModel;
