"use strict";
var FBConfigurationModel = (function () {
    function FBConfigurationModel(CustomerId, FBDataSource, FBInitialCatalog, FBClientId, FBClientPassword, FBPort, FBConnection) {
        this.CustomerId = CustomerId;
        this.FBDataSource = FBDataSource;
        this.FBInitialCatalog = FBInitialCatalog;
        this.FBClientId = FBClientId;
        this.FBClientPassword = FBClientPassword;
        this.FBPort = FBPort;
        this.FBConnection = FBConnection;
    }
    return FBConfigurationModel;
}());
exports.FBConfigurationModel = FBConfigurationModel;
