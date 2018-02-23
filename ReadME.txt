Technologies Used:

Angular5, .Net Core, Web API, Microsoft SQL

Step 1:

Find the database back up in SFConnector/Database/SFConnector.bak and restore the database

Step 2:

Change the connection string to the web.config file.

 <connectionStrings>
    <add name="SalesforceConnectorEntities" connectionString="metadata=res://*/SalesforceConnector.csdl|res://*/SalesforceConnector.ssdl|res://*/SalesforceConnector.msl;provider=System.Data.SqlClient;provider connection string=&quot;data source=DESKTOP-C37EP8S;initial catalog=SalesforceConnector;persist security info=True;user id=sa;password=Admin@123;MultipleActiveResultSets=True;App=EntityFramework&quot;" providerName="System.Data.EntityClient" />
  </connectionStrings>

Step 3:

Launch the API and Connector application.

Step 4:

Go to the login file

Username: test@test.com
Password: Admin@test123