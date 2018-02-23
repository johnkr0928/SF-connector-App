app.controller("myCntrl", function ($scope, myService) {
    $scope.listcustomer = true;
    debugger;
    $scope.SaveUser = function () {
        var User = {
            FirstName: $scope.FirstName,
            LastName: $scope.LastName,
            Email: $scope.Email,
            Company: $scope.Company,
            Password: $scope.Password,
            ConfirmPassword: $scope.ConfirmPassword
        };
        debugger;
        var response = myService.AddUser(User);
        response.then(function (data) {
            if (data.data == "1") {
                //clearFields();
                alert("User Created !");
                window.location.href = "/Customer/List";
            }
            else if (data.data == "-1") {
                alert("user already present !");
            }
            else {
                //clearFields();
                alert("Invalid data entered !");
            }
        });
    }
    $scope.user = {
        password: "",
        confirmPassword: ""
    };
  

    //function clearFields() {
    //    $scope.FirstName = "";
    //    $scope.LastName = "";
    //    $scope.Email = "";
    //    $scope.Company = "";
    //    $scope.Password = "";
    //    $scope.ConfirmPassword = "";
    //}


        $scope.LoginCheck = function () {
        var User = {
            Email: $scope.Email,
            Password: $scope.Password
        };
        debugger;
        var getData = myService.UserLogin(User);
        getData.then(function (msg) {
            if (msg.data == "0") {
                alert("username or password incorrect");
            }
            else if (msg.data == "-1") {
                alert("username or password incorrect");
            }
            else {
                debugger;
                uID = msg.data;
                //clearFields();
                //alert("Logged in");
                window.location.href = "/Login/CustomerView";
            }
        });
        debugger;
    }
       
    //function clearFields() {
    //    $scope.uName = '';
    //    $scope.uPwd = '';
    //}
        $scope.editCustomer = function (User) {
            debugger;
            myService.EditUser(User)
            .success(function (httpData) {
                $scope.Id = httpData.Id;
                $scope.FirstName = httpData.FirstName;
                $scope.LastName = httpData.LastName;
                $scope.Email = httpData.Email;
                $scope.Company = httpData.Company;
                $scope.Password = "Admin@123";
                $scope.ConfirmPassword = "Admin@123";
                //alert($scope.Email);
                $scope.listcustomer = false;
                $scope.update = true;
            },
               function () {
                   alert('Error in getting Customer records');

               });
        }

    $scope.updateUser = function () {
        var User = {
            Id:$scope.Id,
            FirstName: $scope.FirstName,
            LastName: $scope.LastName,
            Email: $scope.Email,
            Company: $scope.Company,
            Password: $scope.Password,
            ConfirmPassword: $scope.ConfirmPassword
        };

        User.Id = $scope.Id;
        var response = myService.updateUser(User);
        response.then(function (data) {
            if (data.data == "1") {
                alert("User Updated !");
                window.location.href = "/Customer/List";
            }
            else {
                alert("Invalid data entered !");
            }
        });
    }

    $scope.deleteCustomer = function (Id) {
        debugger;
        if (confirm("Are you sure to delete this record")) {
            alert("yes");
            var response = myService.deleteCustomer(Id);
            window.location.href = "/Customer/List";
        }
        else {
            //alert("no")
            var response = fbconfigservice.deleteCustomer(null);

        }
        var response = fbconfigservice.deleteCustomer(null);
    }

    //$scope.editCustomerById = function (User) {
    //    debugger;
    //    myService.EditUser(User)
    //    .success(function (httpData) {
    //        $scope.Id = httpData.Id;
    //        $scope.FirstName = httpData.FirstName;
    //        $scope.LastName = httpData.LastName;
    //        $scope.Email = httpData.Email;
    //        $scope.Company = httpData.Company;
    //        $scope.Password = "Admin@123";
    //        $scope.ConfirmPassword = "Admin@123";
    //        alert($scope.Email);
    //        $scope.profileupdate = true;
    //    },
    //       function () {
    //           alert('Error in getting Customer records');

    //       });
    //}

    //$scope.updateUserById = function () {
    //    debugger;
    //    var User = {
    //        Id: $scope.Id,
    //        FirstName: $scope.FirstName,
    //        LastName: $scope.LastName,
    //        Email: $scope.Email,
    //        Company: $scope.Company,
    //        Password: $scope.Password,
    //        ConfirmPassword: $scope.ConfirmPassword
    //    };

    //    User.Id = $scope.Id;
    //    var response = myService.updateUser(User);
    //    response.then(function (data) {
    //        if (data.data == "1") {
    //            alert("User Updated !");
    //        }
    //        else {
    //            alert("Invalid data entered !");
    //        }
    //    });
    //}

    $scope.SaveAddress = function () {
        debugger;
        if ($scope.SameAsBillingAddress == true) {
            var Address = {
                BillingAddress1: $scope.BillingAddress1,
                BillingAddress2: $scope.BillingAddress2,
                BillingState: $scope.BillingState,
                BillingCity: $scope.BillingCity,
                BillingCountry: $scope.BillingCountry,
                BillingPostalCode: $scope.BillingPostalCode,
                BillingPhoneNumber: $scope.BillingPhoneNumber,
                ShippingAddress1: $scope.BillingAddress1,
                ShippingAddress2: $scope.BillingAddress2,
                ShippingState: $scope.BillingState,
                ShippingCity: $scope.BillingCity,
                ShippingCountry: $scope.BillingCountry,
                ShippingPostalCode: $scope.BillingPostalCode,
                ShippingPhoneNumber: $scope.BillingPhoneNumber
            };
        }
        else {
            var Address = {
                BillingAddress1: $scope.BillingAddress1,
                BillingAddress2: $scope.BillingAddress2,
                BillingState: $scope.BillingState,
                BillingCity: $scope.BillingCity,
                BillingCountry: $scope.BillingCountry,
                BillingPostalCode: $scope.BillingPostalCode,
                BillingPhoneNumber: $scope.BillingPhoneNumber,
                ShippingAddress1: $scope.ShippingAddress1,
                ShippingAddress2: $scope.ShippingAddress2,
                ShippingState: $scope.ShippingState,
                ShippingCity: $scope.ShippingCity,
                ShippingCountry: $scope.ShippingCountry,
                ShippingPostalCode: $scope.ShippingPostalCode,
                ShippingPhoneNumber: $scope.ShippingPhoneNumber

            };
        }

        debugger;
        var response = myService.AddAddress(Address);
        response.then(function (data) {
            if (data.data == "1") {
                window.location.href = "/Customer/List";
                alert("Address Created !");
            }
            else {
                alert("Invalid data entered !");
            }
        });
    }

    $scope.editAddress = function (User) {
        debugger;
        myService.EditAddress(User)
       .success(function (httpData) {
           $scope.BillingAddress1 = httpData.BillingAddress1;
           $scope.BillingAddress2 = httpData.BillingAddress2;
           $scope.BillingState = httpData.BillingState;
           $scope.BillingCity = httpData.BillingCity;
           $scope.BillingCountry = httpData.BillingCountry;
           $scope.BillingPostalCode = httpData.BillingPostalCode;
           $scope.BillingPhoneNumber = httpData.BillingPhoneNumber;
           $scope.ShippingAddress1 = httpData.ShippingAddress1;
           $scope.ShippingAddress2 = httpData.ShippingAddress2;
           $scope.ShippingState = httpData.ShippingState;
           $scope.ShippingCity = httpData.ShippingCity;
           $scope.ShippingCountry = httpData.ShippingCountry;
           $scope.ShippingPostalCode = httpData.ShippingPostalCode;
           $scope.ShippingPhoneNumber = httpData.ShippingPhoneNumber;
           //alert($scope.SalesForceUserName);
          if($scope.BillingAddress1==null){
               window.location.href = "/Address/Index";
       }
           else {
               $scope.listcustomer = false;
               $scope.update = false;
               $scope.addressedit = true;
    }
       },
            function () {
                alert('Error in getting Configuration records');
            });
    }

    $scope.SaveAddrUpdate = function () {
        debugger;
        if ($scope.SameAsBillingAddress == true){
            var User = {
            BillingAddress1: $scope.BillingAddress1,
            BillingAddress2: $scope.BillingAddress2,
            BillingState: $scope.BillingState,
            BillingCity: $scope.BillingCity,
            BillingCountry: $scope.BillingCountry,
            BillingPostalCode: $scope.BillingPostalCode,
            BillingPhoneNumber: $scope.BillingPhoneNumber,
            ShippingAddress1: $scope.BillingAddress1,
            ShippingAddress2: $scope.BillingAddress2,
            ShippingState: $scope.BillingState,
            ShippingCity: $scope.BillingCity,
            ShippingCountry: $scope.BillingCountry,
            ShippingPostalCode: $scope.BillingPostalCode,
            ShippingPhoneNumber: $scope.BillingPhoneNumber

        };
        }
        else{
        var User = {
            BillingAddress1: $scope.BillingAddress1,
            BillingAddress2: $scope.BillingAddress2,
            BillingState: $scope.BillingState,
            BillingCity: $scope.BillingCity,
            BillingCountry: $scope.BillingCountry,
            BillingPostalCode: $scope.BillingPostalCode,
            BillingPhoneNumber: $scope.BillingPhoneNumber,
            ShippingAddress1: $scope.ShippingAddress1,
            ShippingAddress2: $scope.ShippingAddress2,
            ShippingState: $scope.ShippingState,
            ShippingCity: $scope.ShippingCity,
            ShippingCountry: $scope.ShippingCountry,
            ShippingPostalCode: $scope.ShippingPostalCode,
            ShippingPhoneNumber: $scope.ShippingPhoneNumber

        };
        }
        User.Id = $scope.Id;
        var response = myService.updateAddress(User);
        response.then(function (data) {
            if (data.data == "1") {
                alert("Address Updated !");
                window.location.href = "/Customer/List";
            }
            else {
                alert("Invalid data entered !");
            }
        });
    }

    $scope.Cancel = function () {
        $scope.update = false;
        $scope.addressedit = false;
        $scope.listcustomer = true;
    };

    $scope.CreateCancel = function () {
        window.location.href = "/Customer/List";
    };
    
});

app.controller("ConfigurationCtrl", function ($scope, configservice) {
    $scope.listconfiguration = true;

    $scope.SaveConfiguration = function () {
        debugger;
        var Configuration = {
            ConsumerId: $scope.ConsumerId,
            ConsumerSecretKey: $scope.ConsumerSecretKey,
            SalesForceUserName: $scope.SalesForceUserName,
            SalesForceUserPassword: $scope.SalesForceUserPassword,
            SecurityToken: $scope.SecurityToken,
            SalesforceTokenURL: $scope.SalesforceTokenURL,
            CallBackURL: $scope.CallBackURL,
            LeadSettings : $scope.LeadSettings,
            CampaignSettings : $scope.CampaignSettings
        };
        debugger;
        var response = configservice.AddConfiguration(Configuration);
        response.then(function (data) {
            if (data.data == "1") {
                window.location.href = "/Configuration/Index";
                alert("Configuration Created !");
            }
            else {
                //clearFields();
                alert("Invalid data entered !");
            }
        });
    }


    $scope.editConfiguration = function (User) {
        debugger;
        configservice.EditUser(User)
       .success(function (httpData) {
           $scope.Id = httpData.Id;
           $scope.ConsumerId = httpData.ConsumerId;
           $scope.ConsumerSecretKey = httpData.ConsumerSecretKey;
           $scope.SalesForceUserName = httpData.SalesForceUserName;
           $scope.SalesForceUserPassword = httpData.SalesForceUserPassword;
           $scope.SecurityToken = httpData.SecurityToken;
           $scope.SalesforceTokenURL = httpData.SalesforceTokenURL;
           $scope.CallBackURL = httpData.CallBackURL;
           $scope.LeadSettings = httpData.LeadSettings;
           $scope.CampaignSettings = httpData.CampaignSettings;
           //alert($scope.SalesForceUserName);
           $scope.listconfiguration = false;
           $scope.configurationupdate = true;
        },
            function () {
               alert('Error in getting Configuration records');
           });
    }

    $scope.updateconfiguration = function () {
        debugger;
        var User = {
            Id: $scope.Id,
            ConsumerId: $scope.ConsumerId,
            ConsumerSecretKey: $scope.ConsumerSecretKey,
            SalesForceUserName: $scope.SalesForceUserName,
            SalesForceUserPassword: $scope.SalesForceUserPassword,
            SecurityToken: $scope.SecurityToken,
            SalesforceTokenURL: $scope.SalesforceTokenURL,
            CallBackURL: $scope.CallBackURL,
            LeadSettings: $scope.LeadSettings,
            CampaignSettings: $scope.CampaignSettings
        };

        User.Id = $scope.Id;
        var response = configservice.updateUser(User);
        response.then(function (data) {
            if (data.data == "1") {
                //clearFields();
                alert("Configuration Updated !");
                window.location.href = "/Configuration/Index";
            }
            else {
                clearFields();
                alert("Invalid data entered !");
            }
        });
    }
    $scope.deleteConfiguration = function (Id) {
        debugger;
        if (confirm("Are you sure to delete this record")) {
            alert("yes");
            var response = configservice.deleteConfiguration(Id);
            window.location.href = "/Configuration/Index";
        }
        else {
            //alert("no")
            var response = fbconfigservice.deleteConfiguration(null);

        }
        var response = fbconfigservice.deleteConfiguration(null);
    }
    $scope.Cancel = function () {
        $scope.configurationupdate = false;
        $scope.listconfiguration = true;
    };
    $scope.CreateCancel = function () {
        debugger;
        window.location.href = "/Configuration/Index";
    };
   
});

app.controller("AddressCtrl", function ($scope, addressservice) {

    $scope.SaveAddress = function () {
        debugger;
        if ($scope.SameAsBillingAddress == true) {
        var Address = {
            BillingAddress1: $scope.BillingAddress1,
            BillingAddress2: $scope.BillingAddress2,
            BillingState: $scope.BillingState,
            BillingCity: $scope.BillingCity,
            BillingCountry: $scope.BillingCountry,
            BillingPostalCode: $scope.BillingPostalCode,
            BillingPhoneNumber: $scope.BillingPhoneNumber,
            ShippingAddress1: $scope.BillingAddress1,
            ShippingAddress2: $scope.BillingAddress2,
            ShippingState: $scope.BillingState,
            ShippingCity: $scope.BillingCity,
            ShippingCountry: $scope.BillingCountry,
            ShippingPostalCode: $scope.BillingPostalCode,
            ShippingPhoneNumber: $scope.BillingPhoneNumber
        };
        }
        else
        {
            var Address = {
                BillingAddress1: $scope.BillingAddress1,
                BillingAddress2: $scope.BillingAddress2,
                BillingState: $scope.BillingState,
                BillingCity: $scope.BillingCity,
                BillingCountry: $scope.BillingCountry,
                BillingPostalCode: $scope.BillingPostalCode,
                BillingPhoneNumber: $scope.BillingPhoneNumber,
                ShippingAddress1: $scope.ShippingAddress1,
                ShippingAddress2: $scope.ShippingAddress2,
                ShippingState: $scope.ShippingState,
                ShippingCity: $scope.ShippingCity,
                ShippingCountry: $scope.ShippingCountry,
                ShippingPostalCode: $scope.ShippingPostalCode,
                ShippingPhoneNumber: $scope.ShippingPhoneNumber

            };
        }
      
        debugger;
        var response = addressservice.AddAddress(Address);
        response.then(function (data) {
            if (data.data == "1") {
                alert("Address Created !");
            }
            else {
                alert("Invalid data entered !");
            }
        });
    }

    $scope.editAddress = function (User) {
        debugger;
        addressservice.EditUser(User)
       .success(function (httpData) {
           $scope.BillingAddress1 = httpData.BillingAddress1;
           $scope.BillingAddress2 = httpData.BillingAddress2;
           $scope.BillingState = httpData.BillingState;
           $scope.BillingCity = httpData.BillingCity;
           $scope.BillingCountry = httpData.BillingCountry;
           $scope.BillingPostalCode = httpData.BillingPostalCode;
           $scope.BillingPhoneNumber = httpData.BillingPhoneNumber;
           $scope.ShippingAddress1 = httpData.ShippingAddress1;
           $scope.ShippingAddress2 = httpData.ShippingAddress2;
           $scope.ShippingState = httpData.ShippingState;
           $scope.ShippingCity = httpData.ShippingCity;
           $scope.ShippingCountry = httpData.ShippingCountry;
           $scope.ShippingPostalCode = httpData.ShippingPostalCode;
           $scope.ShippingPhoneNumber = httpData.ShippingPhoneNumber;
           //alert($scope.SalesForceUserName);
           $scope.listconfiguration = false;
           $scope.configurationupdate = true;
       },
            function () {
                alert('Error in getting Configuration records');
            });
    }

});

app.controller("FBConfigurationCtrl", function ($scope, fbconfigservice) {
    $scope.listfbconfig = true;
    $scope.SaveFBConfiguration = function () {
        debugger;
        var FBConfiguration = {
            FBClientId: $scope.FBClientId,
            FBClientPassword: $scope.FBClientPassword,
            FBConnection: $scope.FBConnection,
            FBDataSource: $scope.FBDataSource,
            FBInitialCatalog: $scope.FBInitialCatalog,
            FBPort: $scope.FBPort
        };
        debugger;
        var response = fbconfigservice.AddFBConfiguration(FBConfiguration);
        response.then(function (data) {
            if (data.data == "1") {
                alert("FBConfiguration Created !");
                window.location.href = "/FBConfiguration/List";
            }
            else {
                clearFields();
                alert("Invalid data entered !");
            }
        });
    }


    $scope.editFBConfiguration = function (User) {
        debugger;
        var User = fbconfigservice.EditUser(User)
        .success(function (httpData) {
            $scope.User = httpData.User
            $scope.Id = httpData.Id;
            $scope.FBClientId = httpData.FBClientId;
            $scope.FBClientPassword = httpData.FBClientPassword;
            $scope.FBConnection = httpData.FBConnection;
            $scope.FBDataSource = httpData.FBDataSource;
            $scope.FBInitialCatalog = httpData.FBInitialCatalog;
            $scope.FBPort = httpData.FBPort;
            $scope.listfbconfig = false;
            $scope.fbconfigupdate = true;
        },

           function () {
               alert('Error in getting FBConfiguration records');
           });
    }

    $scope.UpdateFBConfiguration = function () {
        debugger;
        var User = {
            Id: $scope.Id,
            FBClientId: $scope.FBClientId,
            FBClientPassword: $scope.FBClientPassword,
            FBConnection: $scope.FBConnection,
            FBDataSource: $scope.FBDataSource,
            FBInitialCatalog: $scope.FBInitialCatalog,
            FBPort: $scope.FBPort

        };

        User.Id = $scope.Id;
        var response = fbconfigservice.updateUser(User);
        response.then(function (data) {
            if (data.data == "1") {
                alert("FBConfiguration Updated !");
                window.location.href = "/FBConfiguration/List";
            }
            else {
                clearFields();
                alert("Invalid data entered !");
            }
        });
    }

    $scope.deleteFBConfiguration = function (Id) {
        debugger;
        if (confirm("Are you sure to delete this record")) {
            alert("yes");
            var response = fbconfigservice.deleteFBConfiguration(Id);
            window.location.href = "/FBConfiguration/List";
        }
        else {
            //alert("no")
            var response = fbconfigservice.deleteFBConfiguration(null);
            
        }
        var response = fbconfigservice.deleteFBConfiguration(null);
    }
    //$scope.deleteFBConfiguration = function (Id) {
    //    var response = fbconfigservice.deleteFBConfiguration(Id);
    //    response.then(function (data) {
    //        if (data.data == "1") {
    //            alert("FBConfiguration Updated !");
    //            window.location.href = "/FBConfiguration/List";
    //        }
    //        else {
    //            clearFields();
    //            alert("Invalid data entered !");
    //        }
    //    });
    //}

    $scope.Cancel = function () {
        debugger;
        $scope.fbconfigupdate = false;
        $scope.listfbconfig = true;
    };
    $scope.CreateCancel = function () {
        debugger;
        window.location.href = "/FBConfiguration/List";
    };


});


