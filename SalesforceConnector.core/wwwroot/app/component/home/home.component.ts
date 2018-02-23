import { Component } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { Ng2MaterialModule } from "ng2-material";

@Component({
    selector: 'home',
    templateUrl: 'app/component/home/home.component.html'
})

export class HomeComponent {
    public materials = [];
    constructor()
    {
        this.materials = [{ name: "Wood", quantity: "Quantity", price: "2000" }, { name: "Iron", quantity: "Quantity", price: "2000" }];
    }
}