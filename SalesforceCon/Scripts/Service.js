app.service("myService", function ($http) {
    debugger;
    this.AddUser = function (User) {
        debugger;
        var response = $http({
            method: "post",
            url: "/Customer/AddUser",
            data: JSON.stringify(User),
            dataType: "json"
        });
        return response;
    }

    this.UserLogin = function (User) {
        debugger;
        var response = $http({
            method: "post",
            url: "/Login/LoginUser",
            data: JSON.stringify(User),
            dataType: "json"
        });
        return response;
    }

    //Edit
    this.EditUser = function (Id) {
        debugger;
        var response = $http({
            method: "post",
            url: "/Customer/EditById",
            params: {
                Id: JSON.stringify(Id)
            }
        });
        return response;
    }

    // Update Book 
    this.updateUser = function (User) {
        var response = $http({
            method: "post",
            url: "/Customer/Update",
            data: JSON.stringify(User),
            dataType: "json"
        });
        return response;
    }

    this.deleteCustomer = function (Id) {
        debugger;
        var response = $http({
            method: "post",
            url: "/Customer/Delete",
            params: {
                Id: JSON.stringify(Id)
            }
        });
        return response;
    }

    this.AddAddress = function (Address) {
        debugger;
        var response = $http({
            method: "post",
            url: "/Address/AddressInsert",
            data: JSON.stringify(Address),
            dataType: "json"
        });
        return response;
    }
    this.EditAddress = function (Id) {
        debugger;
        var response = $http({
            method: "post",
            url: "/Address/Edit",
            params: {
                Id: JSON.stringify(Id)
            }
        });
        return response;
    }

    // Update configuration 
    this.updateAddress = function (User) {
        debugger;
        var response = $http({
            method: "post",
            url: "/Address/Update",
            data: JSON.stringify(User),
            dataType: "json"
        });
        return response;
    }
    

});

//app.service("CustomerEditservice", function ($http) {

//    this.EditUser = function (Id) {
//        debugger;
//        var response = $http({
//            method: "post",
//            url: "/Customer/EditById",
//            params: {
//                Id: JSON.stringify(Id)
//            }
//        });
//        return response;
//    }
//    this.updateUser = function (User) {
//        var response = $http({
//            method: "post",
//            url: "/Customer/Update",
//            data: JSON.stringify(User),
//            dataType: "json"
//        });
//        return response;
//    }

//});
 
app.service("configservice", function ($http) {
    debugger;
    this.AddConfiguration = function (Configuration) {
        debugger;
        var response = $http({
            method: "post",
            url: "/Configuration/ConfigurationInsert",
            data: JSON.stringify(Configuration),
            dataType: "json"
        });
        return response;
    }

    //configuration edit and delete
    //Edit configuration

    //Edit
    this.EditUser = function (Id) {
        debugger;
        var response = $http({
            method: "post",
            url: "/Configuration/Edit",
            params: {
                Id: JSON.stringify(Id)
            }
        });
        return response;
    }

    // Update configuration 
    this.updateUser = function (User) {
        var response = $http({
            method: "post",
            url: "/Configuration/Update",
            data: JSON.stringify(User),
            dataType: "json"
        });
        return response;
    }
    //delete configuration
    this.deleteConfiguration = function (Id) {
        debugger;
        var response = $http({
            method: "post",
            url: "/Configuration/Delete",
            params: {
                Id: JSON.stringify(Id)
            }
        });
        return response;
    }
});


app.service("addressservice", function ($http) {
    debugger;
    this.AddAddress = function (Address) {
        debugger;
        var response = $http({
            method: "post",
            url: "/Address/AddressInsert",
            data: JSON.stringify(Address),
            dataType: "json"
        });
        return response;
    }
    this.EditAddress = function (Id) {
        debugger;
        var response = $http({
            method: "post",
            url: "/Address/Edit",
            params: {
                Id: JSON.stringify(Id)
            }
        });
        return response;
    }

    // Update configuration 
    this.updateAddress = function (User) {
        var response = $http({
            method: "post",
            url: "/Address/Update",
            data: JSON.stringify(User),
            dataType: "json"
        });
        return response;
    }


});

app.service("fbconfigservice", function ($http) {
    debugger;
    this.AddFBConfiguration = function (FBConfiguration) {
        debugger;
        var response = $http({
            method: "post",
            url: "/FBConfiguration/FBConfigurationInsert",
            data: JSON.stringify(FBConfiguration),
            dataType: "json"
        });
        return response;
    }
    this.EditUser = function (User) {
        debugger;
        var response = $http({
            method: "post",
            url: "/FBConfiguration/Edit",
            params: {
                Id: JSON.stringify(User)
            }
        });
        return response;
    }

    // Update fbconfigservice 
    this.updateUser = function (User) {
        var response = $http({
            method: "post",
            url: "/FBConfiguration/FBUpdate",
            data: JSON.stringify(User),
            dataType: "json"
        });
        return response;
    }
    //delete fbconfigservice
    this.deleteFBConfiguration = function (Id) {
        debugger;
        var response = $http({
            method: "post",
            url: "/FBConfiguration/FBConfigurationDelete",
            params: {
                Id: JSON.stringify(Id)
            }
        });
        return response;
    }
});