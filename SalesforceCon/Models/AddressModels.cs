using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace SalesforceCon.Models
{
    public class AddressModels
    {
            public int Id { get; set; }
            public string BillingAddress1 { get; set; }
            public string BillingAddress2 { get; set; }
            public string BillingCountry { get; set; }
            public string BillingState { get; set; }
            public string BillingCity { get; set; }
            public string BillingPostalCode { get; set; }
            public string BillingPhoneNumber { get; set; }

            //[Required(ErrorMessage = "Same As Billing Address is required")]
            //[Display(Name = "Same as Billing Information")]
            //public Boolean SameAsBillingAddress { get; set; }

            //[StringLength(50)]
            //[Required(ErrorMessage = "Shipping Address1 is required")]
            //[Display(Name = "Shipping Address1")]
            //public string ShippingAddress1 { get; set; }

            //[StringLength(50)]
            //[Required(ErrorMessage = "Shipping Address2 is required")]
            //[Display(Name = "Shipping Address2")]
            //public string ShippingAddress2 { get; set; }

            //[Required(ErrorMessage = "Shipping Country is required")]
            //[Display(Name = "Shipping Country")]
            //public string ShippingCountry { get; set; }

            //[StringLength(50)]
            //[Required(ErrorMessage = "Shipping State is required")]
            //[Display(Name = "Shipping State")]
            //[RegularExpression(@"^[a-zA-Z]+$", ErrorMessage = "Use letters only please")]
            //public string ShippingState { get; set; }

            //[StringLength(50)]
            //[Required(ErrorMessage = "Shipping City is required")]
            //[Display(Name = "Shipping City")]
            //[RegularExpression(@"^[a-zA-Z]+$", ErrorMessage = "Use letters only please")]
            //public string ShippingCity { get; set; }

            //[StringLength(10)]
            //[Required(ErrorMessage = "Shipping PostalCode is required")]
            //[Display(Name = "Shipping PostalCode")]
            //[RegularExpression(@"^[1-9][0-9]{5}$", ErrorMessage = "Please Enter Pincode Number")]
            //public string ShippingPostalCode { get; set; }

            //[StringLength(20)]
            //[Required(ErrorMessage = "Shipping PhoneNumber is required")]
            //[Display(Name = "Shipping PhoneNumber")]
            //[RegularExpression(@"^([0]|\+91[\-\s]?)?[789]\d{9}$", ErrorMessage = "Entered Mobile No is not valid.")]
           // public string ShippingPhoneNumber { get; set; }

          //  public string AddressType { get; set; }
            public int CustomerId { get; set; }
    }
}