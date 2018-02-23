using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SalesforceCon.Controllers.api
{
    class CartItems
    {
        public string sku { get; set; }
        public double price { get; set; }
        public double quantity { get; set; }
        public bool isAKit { get; set; }
        public string shoppingCartRecordID { get; set; }
        public virtual List<CartItems> cartItem { get; set; }
    }
}
