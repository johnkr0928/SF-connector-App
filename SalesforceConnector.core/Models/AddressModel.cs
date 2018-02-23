using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Salesforceconnector_Core
{
    public class AddressModel
    {
        public int Id { get; set; }

        public string BillingAddress1 { get; set; }

        public string BillingAddress2 { get; set; }

        public string BillingCountry { get; set; }

        public string BillingState { get; set; }

        public string BillingCity { get; set; }

        public string BillingPostalCode { get; set; }

        public string BillingPhoneNumber { get; set; } 

        public string ShippingAddress1 { get; set; }

        public string ShippingAddress2 { get; set; }

        public string ShippingCountry { get; set; }

        public string ShippingState { get; set; }

        public string ShippingCity { get; set; }

        public string ShippingPostalCode { get; set; }

        public string ShippingPhoneNumber { get; set; }
       
        public bool IsBillingShipping { get; set; }

        public int CustomerId { get; set; }

    }
}
