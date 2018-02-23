import { NgModule, Provider} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpModule } from "@angular/http";
import { LoginComponent } from './component/login/login.component';
import { CSSCarouselComponent } from './common/caroussel.component';
import { HomeComponent } from './component/home/home.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { RegisterComponent } from './component/register/register.component';
import { ProfileComponent } from './component/profile/profile.component';
import { MaterialModule  } from '@angular/material';
import { MdCoreModule } from '@angular/material/core';
import { Ng2MaterialModule } from "ng2-material";
import { FBConfigurationComponentlist } from './component/fbconfigurationslist/fbconfiguration.component';
import { FBConfigurationComponent } from './component/fbconfiguration/fbconfiguration.component';
import { SfConfigurationProfileComponent } from './component/sfconfigurationprofile/sfconfigurationprofile.component';
import { SfConfigurationComponent } from './component/sfconfiguration/sfconfiguration.component';
import { ActivityComponent } from './component/activity/activity.component';
import { UpdateComponent } from './component/update/update.component';
import { FbConfigurationUpdateComponent } from './component/fbconfigurationslist/fbconfigurationupdate/fbconfigurationupdate.component';
import { SfConfigurationUpdateComponent } from './component/sfconfigurationprofile/sfconfigurationupdate/sfconfigurationupdate.component';
import { AddressComponent } from './component/address/address.component';
import {AddressUpdateComponent} from './component/address/addressupdate/addressupdate.component';
import { Ng2PaginationModule } from 'ng2-pagination';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { FilterPipe } from './component/profile/filter.pipe';
import { OrderBy } from './component/profile/orderby.pipe';
//import { ToastModule, ToastsManager, ToastOptions } from 'ng2-toastr';

const appRoutes: Routes = [
    { path: 'home', component:  HomeComponent },  
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'fbconfigurationlist', component: FBConfigurationComponentlist },
    { path: 'fbconfiguration', component: FBConfigurationComponent },
    { path: 'sfconfigurationprofile', component: SfConfigurationProfileComponent },
    { path: 'sfconfiguration', component: SfConfigurationComponent },
    { path: 'activity', component: ActivityComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'update/:Id', component: UpdateComponent },
    { path: 'fbconfigurationupdate/:Id', component: FbConfigurationUpdateComponent },
    { path: 'sfconfigurationupdate/:Id', component: SfConfigurationUpdateComponent },
    { path: 'address/:Id', component: AddressComponent },
    { path: 'addressupdate/:Id', component: AddressUpdateComponent },
    { path: '', component: LoginComponent }
];
@NgModule({
    imports: [
        BrowserModule, Ng2PaginationModule,
        FormsModule, Ng2GoogleChartsModule,
        RouterModule.forRoot(appRoutes), MaterialModule.forRoot(), Ng2MaterialModule.forRoot()
    ],
    declarations: [
        AppComponent,
        LoginComponent, HomeComponent, CSSCarouselComponent, RegisterComponent, ProfileComponent,
        FBConfigurationComponentlist, SfConfigurationProfileComponent, SfConfigurationComponent, FBConfigurationComponent, ActivityComponent,
        UpdateComponent, FbConfigurationUpdateComponent, SfConfigurationUpdateComponent, AddressComponent, AddressUpdateComponent, FilterPipe, DashboardComponent, OrderBy
    ],
    providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
    bootstrap: [AppComponent]
})
export class AppModule {
}
