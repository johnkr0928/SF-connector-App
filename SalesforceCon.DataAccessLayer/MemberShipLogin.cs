//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace SalesforceCon.DataAccessLayer
{
    using System;
    using System.Collections.Generic;
    
    public partial class MemberShipLogin
    {
        public long Id { get; set; }
        public long CustomerId { get; set; }
        public string Password { get; set; }
        public string SaltKey { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public System.DateTime UpdatedDate { get; set; }
        public Nullable<System.DateTime> LastLoginDate { get; set; }
        public Nullable<System.DateTime> LastPasswordChangedDate { get; set; }
    
        public virtual Customer Customer { get; set; }
    }
}