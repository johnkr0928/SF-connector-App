import { Component, Injectable, Inject, ViewContainerRef, ngOnInit } from '@angular/core';
import { MaterialModule, MdSnackBar, MdSnackBarConfig, MdDialog } from '@angular/material';
import { Ng2MaterialModule } from "ng2-material";
import { ProfileModel } from './profile.interface'
import { ProfileService } from './profile.service'
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Ng2PaginationModule } from 'ng2-pagination';
import { FilterComp } from './filter.component'
declare var jQuery: any;

@Component({
    selector: 'login',
    templateUrl: 'app/component/profile/profile.component.html', providers: [ProfileService, MdSnackBar]
})

export class ProfileComponent {
    columns: any[];
    sort: { name: string, descending: boolean };
    private data: any;
    private router: any;
    private _snackBar: MdSnackBar;
    private _viewContainerRef: ViewContainerRef;
    login = new ProfileModel("", "");
    private _profileService: ProfileService;    
    private profiles: ProfileModel[];
    constructor( @Inject(Router) _router: Router, @Inject(ProfileService) profileService: ProfileService, @Inject(MdSnackBar) snackbar: MdSnackBar, @Inject(ViewContainerRef) viewContainerRef: ViewContainerRef, public dialog: MdDialog) {              
        this.sort = { name: "FirstName", descending: false };
        this.sort.descending = false;
        this._profileService = profileService;
        this.router = _router;
        this._snackBar = snackbar;
        this._viewContainerRef = viewContainerRef;
        this.get();
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
                debugger;
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
        var result = this._profileService.getProfiles()
            .subscribe(
            response => {              
                let config = new MdSnackBarConfig(this._viewContainerRef);
                if (response == "0") {
                    this._snackBar.open('Username / Password is wrong', 'Try Again', config);
                    localStorage.setItem("user", "-1");
                    this.router.navigate(['/login']);
                }
                else {
                    this.profiles = <ProfileModel[]>(response);
                    
                }
            },
            function (error) { console.log("Error happened" + error) }
            );
    };
    //Delete
    deleteUser(Id, Name) {
        var alert = (confirm("Are you sure you want to delete  " + Name + "?"))
        if (alert)
        {
            var result = this._profileService.deleteUser(Id)
                .subscribe(
                response => {
                    let config = new MdSnackBarConfig(this._viewContainerRef);
                    if (response == "0") {
                        this._snackBar.open('Internal Server Error', 'Try Again', config);
                        localStorage.setItem("user", "-1");
                        this.router.navigate(['/profile']);
                    }
                    else {
                        this.get();
                    }
                },
                function (error) { console.log("Error happened" + error) }
                );
        }
            this.router.navigate(['/profile']);
        }    
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

