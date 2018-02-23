export class SFConfigurationUpdateModel {
    constructor(
        public CustomerId: string,
        public ConsumerId: string,
        public ConsumerSecretKey: string,
        public SalesForceUserName: string,
        public SalesForceUserPassword: string,
        public SecurityToken: string,
        public LeadSettings: boolean,
        public CampaignSettings: boolean,
        public SalesforceTokenURL: string,
        public CallBackURL: string,
        public IsActive: boolean,
        public Id: string
    ) { }
}