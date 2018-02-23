import { Component, Inject, ViewContainerRef, OnInit } from '@angular/core';
import { MaterialModule, MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Ng2MaterialModule } from "ng2-material";
import { DashboardService } from './dashboard.service';
import { Router } from '@angular/router';


@Component({
    selector: 'dashboard',
    templateUrl: 'app/component/dashboard/dashboard.component.html', providers: [DashboardService, MdSnackBar]
})
export class DashboardComponent{
   // private _dashboardService: any;
    pieChartOptions: any;
    private router: any;
    private _snackBar: MdSnackBar;
    private _viewContainerRef: ViewContainerRef;
    private _dashboardService: DashboardService;   
    constructor( @Inject(Router) _router: Router, @Inject(DashboardService) dashboardService: DashboardService, @Inject(MdSnackBar) snackbar: MdSnackBar, @Inject(ViewContainerRef) viewContainerRef: ViewContainerRef, public dialog: MdDialog){
        this._dashboardService = dashboardService;
        this.router = _router;
        this._snackBar = snackbar;
        this._viewContainerRef = viewContainerRef;
        debugger;
       // var some = this.get();
        var some = parseInt(this.get());
            
      debugger;
        this.pieChartOptions = {
            chartType: 'ColumnChart',
            dataTable: [
                ['Customer', 'No Of Hits'],
                ['FirstName', some],
            ],
            options: { 'title': 'Api Consumed' },
        };
    }
    get(): any{
        debugger;
        var result = this._dashboardService.getcustomerid(localStorage.getItem("user"))
      .subscribe(
            response => {
                debugger;
            //    return response;        
                this.pieChartOptions = {
                    chartType: 'ColumnChart',
                    dataTable: [
                        ['Customer', 'No Of Hits'],
                        [response.FirstName +" "+ response.LastName, response.response],
                    ],
                    options: { 'title': 'Api Request', backgroundColor: '#E4E4E4', colors: ['#5c3292'] },
                };
        },
        function (error) { console.log("Error happened" + error) }
        );
    };
}


