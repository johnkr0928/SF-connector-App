"use strict";
var AddressModel = (function () {
    function AddressModel(BillingAddress1, BillingAddress2, BillingCountry, BillingState, BillingCity, BillingPostalCode, BillingPhoneNumber, ShippingAddress1, ShippingAddress2, ShippingCountry, ShippingState, ShippingCity, ShippingPostalCode, ShippingPhoneNumber, CustomerId) {
        this.BillingAddress1 = BillingAddress1;
        this.BillingAddress2 = BillingAddress2;
        this.BillingCountry = BillingCountry;
        this.BillingState = BillingState;
        this.BillingCity = BillingCity;
        this.BillingPostalCode = BillingPostalCode;
        this.BillingPhoneNumber = BillingPhoneNumber;
        this.ShippingAddress1 = ShippingAddress1;
        this.ShippingAddress2 = ShippingAddress2;
        this.ShippingCountry = ShippingCountry;
        this.ShippingState = ShippingState;
        this.ShippingCity = ShippingCity;
        this.ShippingPostalCode = ShippingPostalCode;
        this.ShippingPhoneNumber = ShippingPhoneNumber;
        this.CustomerId = CustomerId;
    }
    return AddressModel;
}());
exports.AddressModel = AddressModel;
