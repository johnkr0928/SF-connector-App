import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';
import { HomeComponent } from './home.component';

@NgModule({
    imports: [BrowserModule, MaterialModule.forRoot()],
    declarations: [HomeComponent],
    bootstrap: [HomeComponent]
})
export class HomeModule { }