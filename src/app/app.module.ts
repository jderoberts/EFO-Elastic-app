import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { SearchJsonComponent } from './search-json/search-json.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { ResultRecordComponent } from './result-record/result-record.component';
import { ResultRecordMiniComponent } from './result-record-mini/result-record-mini.component';
import { ResultRecordNoneComponent } from './result-record-none/result-record-none.component';
import { SearchTypeaheadComponent } from './search-typeahead/search-typeahead.component';
import { SearchWeightingComponent } from './search-weighting/search-weighting.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    SearchJsonComponent,
    SearchResultComponent,
    ResultRecordComponent,
    ResultRecordMiniComponent,
    ResultRecordNoneComponent,
    SearchTypeaheadComponent,
    SearchWeightingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
