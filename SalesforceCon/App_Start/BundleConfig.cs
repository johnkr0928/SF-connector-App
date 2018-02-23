using System.Web;
using System.Web.Optimization;

namespace SalesforceCon
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Scripts/jquery-ui-{version}.js"));
            bundles.Add(new ScriptBundle("~/bundles/kendo")
               .Include("~/Scripts/kendo/2016.3.1028/kendo.web.min.js")
               .Include("~/Scripts/kendo/2016.3.1028/kendo.aspnetmvc.min.js")
               .Include("~/Scripts/jquery.validate.min.js")
               .Include("~/Scripts/jquery.validate.unobtrusive.min.js")
               .Include("~/Scripts/kendo/2016.3.1028/jquery.min.js")
               .Include("~/Scripts/kendo/2016.3.1028/kendo.angular.min.js")
               .Include("~/Scripts/kendo/2016.3.1028/kendo.all.min.js")
           );

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                     "~/Scripts/jquery.validate*",
                      "~/Scripts/jquery.validate.min*",
                      "~/Scripts/jquery.validate.unobtrusive*",
                       "~/Scripts/jquery.validate.unobtrusive.min*"
                //Url.AppRelativeSkinUrl("scripts/*.js"),

                      ));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));
            bundles.Add(new StyleBundle("~/Content/kendo/2016.3.1028/css")
              .Include("~/Content/kendo/2016.3.1028/kendo.common-bootstrap.core.min.css")
              .Include("~/Content/kendo/2016.3.1028/kendo.common.min.css")
              .Include("~/Content/kendo/2016.3.1028/kendo.default.min.css")
              .Include("~/Content/kendo/2016.3.1028/kendo.dataviz.min.css")
              .Include("~/Content/kendo/2016.3.1028/kendo.dataviz.default.min.css")
              .Include("~/Content/kendo/2016.3.1028/kendo.silver.min.css")
          );
        }
    }
}
