import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent }   from './home/home.component';
import { SearchJsonComponent } from './search-json/search-json.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { SearchTypeaheadComponent } from './search-typeahead/search-typeahead.component';
import { SearchWeightingComponent } from './search-weighting/search-weighting.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'response', component: SearchJsonComponent },
    { path: 'results', component: SearchResultComponent },
    { path: 'typeahead', component: SearchTypeaheadComponent },
    { path: 'weighting', component: SearchWeightingComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
