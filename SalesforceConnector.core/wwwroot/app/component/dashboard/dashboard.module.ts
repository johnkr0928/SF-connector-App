import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';

@NgModule({
    imports: [BrowserModule, MaterialModule.forRoot()]
})

export class DashboardModule { }