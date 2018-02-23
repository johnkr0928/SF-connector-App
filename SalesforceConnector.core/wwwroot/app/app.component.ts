import { Component } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { Ng2MaterialModule } from "ng2-material";
declare var jQuery: any;

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html'
})
export class AppComponent {
    public isValidated: boolean;
    public hoverEdit = false;
    constructor()
    {
        //localStorage.setItem("user", "-1");
    }
    IsAuthenticated() {
        return localStorage.getItem("user") !== "-1";
    }
    IsAdmin() {
        return localStorage.getItem("Admin") !== "false";
    }
    GetId() {
        return localStorage.getItem("user");
    }
}
