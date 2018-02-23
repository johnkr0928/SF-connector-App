namespace Salesforceconnector_Core.Controllers
{
    public class RegisterModels
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Company { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public bool IsActive { get; set; }
        public bool Admin { get; set; }
        public int BillingAddressId { get; set; }
       

    }
}