"use strict";
var RegisterModel = (function () {
    function RegisterModel(FirstName, LastName, Email, Company, Password, ConfirmPassword) {
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.Email = Email;
        this.Company = Company;
        this.Password = Password;
        this.ConfirmPassword = ConfirmPassword;
    }
    return RegisterModel;
}());
exports.RegisterModel = RegisterModel;
