export class FBConfigurationModel {
    constructor(
        public CustomerId: string,
        public FBDataSource: string,
        public FBInitialCatalog: string,
        public FBClientId: string,
        public FBClientPassword: string,
        public FBPort: string,
        public FBConnection: string
    ) { }
}

