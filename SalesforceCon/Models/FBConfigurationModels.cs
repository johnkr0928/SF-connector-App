using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SalesforceConnector.BusinessObjects;
using System.ComponentModel.DataAnnotations;

namespace SalesforceCon.Models
{
    public class FBConfigurationModels : FBConfigurations
    {
        public override int Id { get; set; }
        public override int CustomerId { get; set; }

        [Display(Name = "FBData Source")]
        [RegularExpression(@"^[a-zA-Z0-9]*$", ErrorMessage = "please use letters in consumer secret key")]
        [Required(ErrorMessage = "fbdata source is required")]
        public override string FBDataSource { get; set; }

        [Display(Name = "FBInitial Catalog")]
        [RegularExpression(@"^[a-zA-Z0-9]*$", ErrorMessage = "please use letters in consumer secret key")]
        [Required(ErrorMessage = "fbinitial catalog is required")]
        public override string FBInitialCatalog { get; set; }

        [Display(Name = "FBClient Id")]
        [RegularExpression(@"^[a-zA-Z0-9]*$", ErrorMessage = "please use letters in consumer secret key")]
        [Required(ErrorMessage = "fbclient id is required")]
        public override string FBClientId { get; set; }

        [Display(Name = "FBClient Password")]
        [RegularExpression(@"^[a-zA-Z0-9]*$", ErrorMessage = "please use letters in consumer secret key")]
        [Required(ErrorMessage = "fbclient password is required")]
        public override string FBClientPassword { get; set; }

        [Display(Name = "FBPort")]
        [RegularExpression(@"^[a-zA-Z0-9]*$", ErrorMessage = "please use letters in consumer secret key")]
        [Required(ErrorMessage = "fbport is required")]
        public override string FBPort { get; set; }

        [Display(Name = "FBConnection")]
        [RegularExpression(@"^[a-zA-Z0-9]*$", ErrorMessage = "please use letters in consumer secret key")]
        [Required(ErrorMessage = "fbconnection is required")]
        public override string FBConnection { get; set; }

    }
}