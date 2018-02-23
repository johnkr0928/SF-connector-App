"use strict";
var FBConfigurationUpdateModel = (function () {
    function FBConfigurationUpdateModel(FBDataSource, FBInitialCatalog, FBClientId, FBClientPassword, FBPort, FBConnection) {
        this.FBDataSource = FBDataSource;
        this.FBInitialCatalog = FBInitialCatalog;
        this.FBClientId = FBClientId;
        this.FBClientPassword = FBClientPassword;
        this.FBPort = FBPort;
        this.FBConnection = FBConnection;
    }
    return FBConfigurationUpdateModel;
}());
exports.FBConfigurationUpdateModel = FBConfigurationUpdateModel;
