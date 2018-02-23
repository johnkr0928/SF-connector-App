using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SalesforceCon.Models
{
    public class ActivityLogModels
    {

        public int Id { get; set; }       
        public string MethodName { get; set; }
        public string ErrorMessage { get; set; }
        public int  ActivityStatus { get; set; }
        public DateTime CreatedOn { get; set; }
        public long CustomerId { get; set; }
        public string UserName { get; set; }

    }
}