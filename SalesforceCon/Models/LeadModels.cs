using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Dynamic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SalesforceCon.Models
{
    public class LeadModels
    {
        public string Company { get; set; }//is required
        public string Email { get; set; }
        public string LeadSource { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        //Added field for sf standard fields

        //public string status { get; set; } is required ----important
        public double AnnualRevenue { get; set; }
        public string Description { get; set; }
        public string Fax { get; set; }
        public string Industry { get; set; }
        public string MobilePhone { get; set; }
        public double NumberOfEmployees { get; set; }
        public string Phone { get; set; }
        public string Rating { get; set; }//and one contains hidden and all other editable
        public string Title { get; set; }
        public string Website { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string PostalCode { get; set; }
        public string Street { get; set; }

        public new dynamic CustomFields { get; set; }
        //hidden
        //public string Jigsaw { get; set; } //is hidden
        //public string DunsNumber { get; set; } is hidden
        //public Boolean DoNotCall { get; set; } is hidden
        //public Boolean HasOptedOutOfFax { get; set; } is hidden
        //public Boolean HasOptedOutOfEmail { get; set; } is hidden
        //public DateTime LastTransferDate { get; set; } is hidden

        //readonly

        //Editable
        //public string CleanStatus { get; set; } is contains some dropdown value(Pending,Matched,Acknowledged,
        //Different,SelectMatch,NotFound,Inactive,Skipped) this values are taken by cleanstatus  ---and hidden

        //public string Address { get; set; } contains Street,City, State,Country and PostalCode is above and it is editable      
        //public string Name { get; set; } contains firstname and lastname and it is ---required

        //LookUp Fields
        //public string Campaign { get; set; }is editable
        //public string createdby { get; set; }is also read only
        //public string dandbcompany { get; set; }is hidden
        //public string LastModifiedBy { get; set; } is readonly
        //public string owner { get; set; } is editable
    }
    public class datas
    {

        public List<LeadModels> oLead { get; set; }
        public List<Accounts> oAccount { get; set; }
        public List<Contacts> oContacts { get; set; }
        public List<Opportunity> oOpportunity { get; set; }
        public List<CartItems> oCartItems { get; set; }
        public List<SFCredential> oCredential { get; set; }
        public List<SFShipping> oShipping { get; set; }
        public List<SFDiscount> oDiscount { get; set; }
    }

    public class Lead
    {
        public List<LeadModels> oLead { get; set; }
        public List<SFCredential> oCredential { get; set; }
    }
    public class Accounts
    {
        [Required]
        public string Name { get; set; }//is required
        public string billingStreet { get; set; }
        public string billingCity { get; set; }
        public string billingCountry { get; set; }
        public string billingState { get; set; }
        public string billingPostalCode { get; set; }
        public string Phone { get; set; }
        public string shippingStreet { get; set; }
        public string shippingCity { get; set; }
        public string shippingCountry { get; set; }
        public string shippingState { get; set; }
        public string shippingPostalCode { get; set; }

        //Added field for sf standard fields
        public string AccountNumber { get; set; }
        public string Site { get; set; }
        public double AnnualRevenue { get; set; }
        public string Description { get; set; }
        public double NumberOfEmployees { get; set; }
        public string Industry { get; set; }
        public string Ownership { get; set; }
        public string Rating { get; set; }
        public string Sic { get; set; }
        public string TickerSymbol { get; set; }
        public string Type { get; set; }
        public string Website { get; set; }
        public string Fax { get; set; }
        public string ParentId { get; set; } //named as Parent
        public new dynamic CustomFields { get; set; }
        //hidden
        //public string Jigsaw { get; set; } is hidden
        //public string YearStarted { get; set; }is hidden
        //public string Tradestyle { get; set; } is hidden
        //public string SicDesc { get; set; }is hidden
        //public string NaicsCode { get; set; }is hidden
        //public string NaicsDesc { get; set; }is hidden
        //public string DunsNumber { get; set; }is hidden
        //public string AccountSource { get; set; } is hidden
        //public string CleanStatus { get; set; } is dropdown values (Pending,Matched,Acknowledged,
        //Different,SelectMatch,NotFound,Inactive,Skipped) is also hidden 

        //public string BillingAddress { get; set; } contains BillingStreet, BillingCity, BillingState/Province, 
        //BillingZip/PostalCode and BillingCountry and is also editable

        //public string ShippingAddress { get; set; } contains ShippingStreet, ShippingCity, ShippingState/Province,
        //ShippingZip/PostalCode and ShippingCountry and is also editable

        //public string Parent { get; set; } is denoted as ParentId and also editable

        //LookUp Fields
        //public string Owner { get; set; } is editable
        //public string CreatedBy { get; set; } is readonly
        //public string DandbCompany{get; set;} is hidden
        //public string LastModifiedBy {get; set;} is readonly
        //public string ReportsTo {get; set;}
    }
    public class Contacts
    {
        public string Email { get; set; }//email is required fields for swagger
        public string MailingCity { get; set; }
        public string MailingCountry { get; set; }
        public string MailingState { get; set; }
        public string MailingStreet { get; set; }
        public string MailingPostalCode { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }

        //Added field for sf standard fields
        public string OtherCity { get; set; }
        public string OtherCountry { get; set; }
        public string OtherState { get; set; }
        public string OtherStreet { get; set; }
        public string OtherPostalCode { get; set; }
        public string AssistantName { get; set; } //name as a Assitant on sf
        public string AssistantPhone { get; set; }
        public string Department { get; set; }
        public string Description { get; set; }
        public string Fax { get; set; }
        public string HomePhone { get; set; }
        public string LeadSource { get; set; } //need to specify the cart name
        public string MobilePhone { get; set; } // as mobile
        public string Title { get; set; }
        //public DateTime Birthdate { get; set; }        
        public string OtherPhone { get; set; }
        public new dynamic CustomFields { get; set; }
        //hiddden
        //public Boolean HasOptedOutOfEmail { get; set; }is hidden 
        //public Boolean HasOptedOutOfFax { get; set; } is hidden 
        //public string Jigsaw { get; set; } is a hidden
        //public Boolean DoNotCall { get; set; }is hidden
        //public string CleanStatus { get; set; } is a dropdown and --- is hidden
        //readonly
        //public DateTime LastCURequestDate { get; set; } is readonly 
        //public DateTime LastCUUpdateDate { get; set; } is readonly

        //public string Picklist { get; set; } is Salutation       
        //public string Name { get; set; } Contains FirstName and LastName and also --required

        //public string MailingAddress { get; set; } contains MailingStreet,MailingCity,MailingState/Province,
        //MailingZip/PostalCode and MailingCountry and also editable

        //public string OtherAddress { get; set; } contains OtherStreet,Othercity,OtherState/Province,OtherZip/postalcode
        //and Othercountry and also editable

        //LookUp Fields
        //public string Account {get; set;}is editable
        //public string Owner {get; set;} is editable
        //public string CreatedBy {get; set;}is readonly
        //public string LastModifiedBy {get; set;}is readonly
        //public string ReportsTo {get; set;} is editable
    }
    public class Opportunity
    {
        [Required]
        public string StageName { get; set; }//is required
        [Required]
        public string Name { get; set; } //is required as a Opportunity name
        [Required]
        public DateTime CloseDate { get; set; }//is required

        //Added field for sf standard fields     
        public double Amount { get; set; } // one contains required and all other are editable
        public string Description { get; set; }
        public string LeadSource { get; set; }
        public string NextStep { get; set; }
        public double Probability { get; set; }
        //public string ForecastCategoryName { get; set; }  need to specfiy dropdown values
        public double TotalOpportunityQuantity { get; set; }//is hidden and name as Quantity
        public string Type { get; set; } // is contains required and all other are editable
        public Boolean IsPrivate { get; set; }
        public new dynamic CustomFields { get; set; }

        //public string ForecastCategoryName { get; set; } contains stage as a StageName is dropdown(),Forecast Category as a ForecastCategoryName and Probability
        //stage contains dropdown (Qualification,Negotiation/Review,Closed Won,Closed Lost,Id. Decision Makers,Proposal/Price Quote,Value Proposition,
        //Prospecting,Perception Analysis, Needs Analysis,On Program)
        //ForecastCategoryName is contains(Pipeline, omitted , Bestcase, Committed) and also ---required

        //Editable
        //public double ExpectedRevenue { get; set; } is ReadOnly

        //LookUp fields
        //public string Account { get; set; }is editable
        //public string Owner { get; set; }is editable
        //public string Pricebook2 { get; set; }is editable
        //public string Campaign { get; set; }is editable
        //public Boolean Contract { get; set; } is hidden
        //public Boolean CreatedBy { get; set; }is readonly
        //public Boolean LastModifiedBy { get; set; }is readonly
    }
    public class CartItems
    {
        public string sku { get; set; }
        public double price { get; set; }
        public double quantity { get; set; }
        public bool isAKit { get; set; }
        public string shoppingCartRecordID { get; set; }
        public string productName { get; set; }
        public string code { get; set; }
        public int kitCount { get; set; }
        public string PriceBook2Id { get; set; }
        public string ParentAccountID { get; set; }
    }

    public class SFCredential
    {
        public string ApplicationId { get; set; }
    }

    public class SFShipping
    {
        public string SalesforceShippingMethod { get; set; }
    }
    public class SFDiscount
    {
        public double orderCount { get; set; }
    }
}