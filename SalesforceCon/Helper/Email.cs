using SalesforceCon.BusinessAccessLayer;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Configuration;
using System.Net.Mail;
using System.Text;
using System.Web;

namespace SalesforceCon.Helper
{
    public class Email
    {       
        /// <summary>
        /// 
        /// </summary>
        /// <param name="subject"></param>
        /// <param name="body"></param>
        /// <returns></returns>
        public bool SendMailForError(string subject, string body)
        {
            try
            {
                SmtpSection settings = (SmtpSection)(ConfigurationManager.GetSection("system.net/mailSettings/smtp"));
                string mailFrom = settings.From;
                string Password = string.Empty;

                string subjectMessage = subject;
                string bodyMessage = body;
                SmtpClient client = new SmtpClient();
                MailAddress sendTo = new MailAddress(ConfigurationManager.AppSettings["ErrorMailCC1"]);
                MailAddress fromAddress = new MailAddress(mailFrom);
                MailMessage message = new MailMessage(fromAddress, sendTo);
                // Add a carbon copy recipient.
                //MailAddress firstcopy = new MailAddress(ConfigurationManager.AppSettings["ErrorMailCC1"]);
                //message.CC.Add(firstcopy);
                MailAddress secondcopy = new MailAddress(ConfigurationManager.AppSettings["ErrorMailCC2"]);
                message.CC.Add(secondcopy);
                MailAddress thirdcopy = new MailAddress(ConfigurationManager.AppSettings["ErrorMailCC3"]);
                message.CC.Add(thirdcopy);

                message.IsBodyHtml = true;
                message.Subject = (subjectMessage).ToString();
                message.Body = (bodyMessage).ToString();

                System.Net.NetworkCredential basicAuthenticationInfo = new System.Net.NetworkCredential(settings.Network.UserName, settings.Network.Password);
                client.Port = settings.Network.Port;
                client.Host = settings.Network.Host;
                client.UseDefaultCredentials = false;
                client.Credentials = basicAuthenticationInfo;
                //client.EnableSsl = true;
                client.EnableSsl = Convert.ToBoolean(ConfigurationManager.AppSettings["EnableSSL"]);
                client.Send(message);
                return true;
            }
            catch (Exception ex)
            {
                //MyBistroMD.Models.ViewModel.ErrorLogging.Log("ERR", "HomeManager", string.Empty, 0, string.Format("{0} TRACE: {1}", ex.Message.ToString(), ex.StackTrace));
                return false;
            }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="Name"></param>
        /// <param name="Email"></param>
        /// <param name="ApplicationId"></param>
        /// <param name="Comments"></param>
        /// <returns></returns>
        public string BodyService(string Name,string Email,string ApplicationId,  string Comments, string ExceptionDetails)
        {
            var bodyMessage = new StringBuilder();
            bodyMessage.Append("<P STYLE='margin-bottom: 0.14in; line-height: 100%'><FONT FACE='Verdana, serif'><FONT SIZE=2 STYLE='font-size: 11pt'><SPAN LANG='en'>Customer Full Name : " + Name + "</SPAN></FONT></FONT></P>");
            bodyMessage.Append("<P STYLE='margin-bottom: 0.14in; line-height: 100%'><FONT FACE='Verdana, serif'><FONT SIZE=2 STYLE='font-size: 11pt'><SPAN LANG='en'>Email : " + Email + "</SPAN></FONT></FONT></P>");
            bodyMessage.Append("<P STYLE='margin-bottom: 0.14in; line-height: 100%'><FONT FACE='Verdana, serif'><FONT SIZE=2 STYLE='font-size: 11pt'><SPAN LANG='en'>Application Id : " +ApplicationId + "</SPAN></FONT></FONT></P>");
            bodyMessage.Append("<P STYLE='margin-bottom: 0.14in; line-height: 100%'><FONT FACE='Verdana, serif'><FONT SIZE=2 STYLE='font-size: 11pt'><SPAN LANG='en'>Exception : " + Comments + "</SPAN></FONT></FONT></P>");
            bodyMessage.Append("<P STYLE='margin-bottom: 0.14in; line-height: 100%'><FONT FACE='Verdana, serif'><FONT SIZE=2 STYLE='font-size: 11pt'><SPAN LANG='en'>Logged Date : " + DateTime.Now.ToLongDateString() + "</SPAN></FONT></FONT></P>");
            bodyMessage.Append("<br/>");
            return bodyMessage.ToString();
        }

    }
}