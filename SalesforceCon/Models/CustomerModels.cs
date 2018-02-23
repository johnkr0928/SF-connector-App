using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using SalesforceConnector.BusinessObjects;

namespace SalesforceCon.Models
{
    public class CustomerModels : Customers
    {
        public override int Id { get; set; }
        public override string FirstName { get; set; }
        public override string LastName { get; set; }
        public override string Email { get; set; }
        public override string Company { get; set; }
        public override int BillingAddressId { get; set; }
        public override int ShippingAddressId { get; set; }
        public override Boolean IsActive { get; set; }
        public override int CustomerId { get; set; }
        public override string Password { get; set; }
        public override string ConfirmPassword { get; set; }
        public override string SaltKey { get; set; }
        public override DateTime LastLoginDate { get; set; }
        public override DateTime LastPasswordChangedDate { get; set; }
        public override string ApplicationId { get; set; }
        public bool Admin { get; set; }
    }
}