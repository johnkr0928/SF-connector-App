export class SfConfigurationProfileModel {
    constructor(       
        public ConsumerId: string,
        public ConsumerSecretKey: string,
        public SalesForceUserName: string,
        public SalesForceUserPassword: string,
        public SecurityToken: string,
        public LeadSettings: string,
        public CampaignSettings: string,
        public SalesforceTokenURL: string,
        public CallBackURL: string,
        public IsActive: string
    ) { }
}