using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SalesforceConnector.BusinessObjects
{
    public class Customers
    {
        public virtual int Id { get; set; }
        public virtual string FirstName { get; set; }      
        public virtual string LastName { get; set; }        
        public virtual string Email { get; set; }       
        public virtual string Company { get; set; }
        public virtual int BillingAddressId { get; set; }
        public virtual int ShippingAddressId { get; set; }
        public virtual Boolean IsActive { get; set; }
        public virtual int CustomerId { get; set; }       
        public virtual string Password { get; set; }       
        public virtual string ConfirmPassword { get; set; }       
        public virtual string SaltKey { get; set; }      
        public virtual DateTime LastLoginDate { get; set; }      
        public virtual DateTime LastPasswordChangedDate { get; set; }
        public virtual string ApplicationId { get; set; }

    }
}
