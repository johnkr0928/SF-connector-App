import { Component, Injectable, Inject, ViewContainerRef } from '@angular/core';
import { MaterialModule, MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Ng2MaterialModule } from "ng2-material";
import { UpdateModel } from './update.interface'
import { UpdateService } from './update.service'
import { Http, Response } from '@angular/http';
import { Router, RouterLink} from '@angular/router';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'update',
    templateUrl: 'app/component/update/update.component.html', providers: [UpdateService, MdSnackBar]
})
export class UpdateComponent{
    lang: string;
    id: any; 
    paramsSub: any;
    private data: any;
    private router: any;
    private _snackBar: MdSnackBar;
    private _viewContainerRef: ViewContainerRef;
    update = new UpdateModel("", "", "", "", "", "",false,"");
    private _updateService: any; 
    private sub: any;
    private route: ActivatedRoute;
    constructor( @Inject(ActivatedRoute) _route: ActivatedRoute, @Inject(Router) _router: Router, @Inject(UpdateService) updateService: UpdateService, @Inject(MdSnackBar) snackbar: MdSnackBar, @Inject(ViewContainerRef) viewContainerRef: ViewContainerRef) {
        this._updateService = updateService;
        this.router = _router;
        this.route = _route;
        this._snackBar = snackbar;
        this._viewContainerRef = viewContainerRef;
    }
    updateUser(update: UpdateModel,t=1000): void {
        var result = this._updateService.updateUser(update)
            .subscribe(
            response => {
                let config = new MdSnackBarConfig(this._viewContainerRef);
                if (response == "0") {
                    let simpleSnackBarRef = this._snackBar.open('Exception', '', config);
                    setTimeout(simpleSnackBarRef.dismiss.bind(simpleSnackBarRef), t);
                    //localStorage.setItem("user", "0");
                    this.router.navigate(['/update']);
                }
                else if (response == "2") {
                    let simpleSnackBarRef = this._snackBar.open('User Updated Successfully', '', config);
                    setTimeout(simpleSnackBarRef.dismiss.bind(simpleSnackBarRef), t);
                    if (localStorage.getItem("Admin")=="true") {
                        this.router.navigate(['/profile']);
                    }
                }
                else if (response == "-1") {
                    this._snackBar.open('Email already exists', 'Try Again', config);
                    localStorage.setItem("user", "-1");
                    this.router.navigate(['/update']);
                }
                else{
                    this._snackBar.open('Model Not Valid', 'Try Again', config);
                    localStorage.setItem("user", "3");
                    this.router.navigate(['/update']);
                }
            },
            function (error) { console.log("Error happened" + error) }
            );
    };
    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['Id'];
        });   
        this._updateService.getUser(this.id)
            .subscribe(
            update => this.update = update,
            response => {
                if (response.status == 404) {
                    this.router.navigate(['NotFound']);
                }
         });     
    }
    IsAdmin() {
        return localStorage.getItem("Admin") !== "false";
    }   
}