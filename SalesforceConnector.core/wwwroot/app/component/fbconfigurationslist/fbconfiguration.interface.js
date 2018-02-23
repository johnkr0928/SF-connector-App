"use strict";
var FBConfigurationModel = (function () {
    function FBConfigurationModel(FBDataSource, FBInitialCatalog, FBClientId, FBClientPassword, FBPort, FBConnection) {
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
