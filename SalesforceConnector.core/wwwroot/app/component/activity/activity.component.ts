import { Component, Injectable, Inject, ViewContainerRef } from '@angular/core';
import { MaterialModule, MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Ng2MaterialModule } from "ng2-material";
import { ActivityModel } from './activity.interface';
import { ActivityService } from './activity.service';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Ng2PaginationModule } from 'ng2-pagination';
import { FilterComp } from './filter.component'
declare var jQuery: any;

@Component({
    selector: 'activity',
    templateUrl: 'app/component/activity/activity.component.html', providers: [ActivityService, MdSnackBar],
})

export class ActivityComponent {
    columns: any[];
    sort: { name: string, descending: boolean };
    test: Date = new Date();
    private data: any;
    private router: any;
    private _snackBar: MdSnackBar;
    private _viewContainerRef: ViewContainerRef;
    activity = new ActivityModel("", "", "", "");
    private _activityService: ActivityService;
    private activities: ActivityModel[];
    private getactivitiesresponse: ActivityModel[];
    constructor( @Inject(Router) _router: Router, @Inject(ActivityService) activityService: ActivityService, @Inject(MdSnackBar) snackbar: MdSnackBar, @Inject(ViewContainerRef) viewContainerRef: ViewContainerRef) {

        this.sort = { name: "UserName", descending: false };
        this.sort.descending = false;
        this._activityService = activityService;
        this.router = _router;
        this._snackBar = snackbar;
        this._viewContainerRef = viewContainerRef;
        this.get();
        this.getActivityResponse();
    }

    ngOnInit() {
        jQuery(document).ready(function () {
            jQuery(".plus").click(function () {
                jQuery(".filter").slideToggle("fast");
                jQuery(".plus").css("display", "none");
                jQuery(".minus").css("display", "block");
                jQuery(".minus").addClass("active");
                jQuery(".plus").removeClass("active");
            });
            jQuery(".minus").click(function () {
                jQuery(".filter").slideToggle("fast");
                jQuery(".minus").css("display", "none");
                jQuery(".plus").css("display", "block");
                jQuery(".plus").addClass("active");
                jQuery(".minus").removeClass("active");
            });
            jQuery("#filter").click(function () {
                jQuery(".filter").slideToggle("fast");
                var some = jQuery(".active").attr("class");
                var myString = some;
                var arr = myString.split("");
                if (arr[6] == "p") {
                    jQuery(".minus").css("display", "block");
                    jQuery(".plus").css("display", "none");
                    jQuery(".minus").addClass("active");
                    jQuery(".plus").removeClass("active");
                }
                else {
                    jQuery(".minus").css("display", "none");
                    jQuery(".plus").css("display", "block");
                    jQuery(".plus").addClass("active");
                    jQuery(".minus").removeClass("active");
                }
            });
        });
    }

    get(): void {
        var result = this._activityService.getActivities()
            .subscribe(
            response => {
                let config = new MdSnackBarConfig(this._viewContainerRef);
                if (response == "0") {
                    this._snackBar.open('Username / Password is wrong', 'Try Again', config);
                    localStorage.setItem("user", "-1");
                    this.router.navigate(['/login']);
                }
                else {
                    this.activities = <ActivityModel[]>(response);
                }
            },
            function (error) { console.log("Error happened" + error) }
            );
    };

    getActivityResponse(): void {
        var result = this._activityService.getActivitiesresponse()
            .subscribe(
            response => {
                let config = new MdSnackBarConfig(this._viewContainerRef);
                if (response == "0") {
                    this._snackBar.open('Username / Password is wrong', 'Try Again', config);
                    localStorage.setItem("user", "-1");
                    this.router.navigate(['/login']);
                }
                else {
                    this.getactivitiesresponse = <ActivityModel[]>(response);
                }
            },
            function (error) { console.log("Error happened" + error) }
            );
    };
    selectedClass(columnName): string {
        return columnName == this.sort.name ? ' sort-' + this.sort.descending : '';
    }

    changeSorting(columnName, descending): void {
        this.sort.name = columnName;
        this.sort.descending = !this.sort.descending;

    }
    convertSorting(): string {
        if (this.sort)
            return this.sort.descending ? '-' + this.sort.name : this.sort.name;
    }
}

