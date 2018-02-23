using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SalesforceConnector.BusinessObjects
{
    public class FBConfigurations
    {
        public virtual int Id { get; set; }
        public virtual int CustomerId { get; set; }
        public virtual string FBDataSource { get; set; }
        public virtual string FBInitialCatalog { get; set; }
        public virtual string FBClientId { get; set; }
        public virtual string FBClientPassword { get; set; }
        public virtual string FBPort { get; set; }
        public virtual string FBConnection { get; set; }
    }
}
