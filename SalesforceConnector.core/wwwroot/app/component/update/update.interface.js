"use strict";
var UpdateModel = (function () {
    function UpdateModel(FirstName, LastName, Email, Company, Password, ConfirmPassword, IsActive, ApplicationId) {
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.Email = Email;
        this.Company = Company;
        this.Password = Password;
        this.ConfirmPassword = ConfirmPassword;
        this.IsActive = IsActive;
        this.ApplicationId = ApplicationId;
    }
    return UpdateModel;
}());
exports.UpdateModel = UpdateModel;
