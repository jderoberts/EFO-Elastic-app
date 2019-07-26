import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ElasticService } from '../elastic.service';
import { RecordResult } from "../record-result.model";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  serviceRunning = false;
  searchField: FormControl;
  jsonResponse : RecordResult[] = [];
  searchSelected = false;
  currentPage = 'home';

  constructor(private es:ElasticService) {
      this.es.testConnection()
      .subscribe(
        result => { this.serviceRunning = true }, 
        error => { this.serviceRunning = false }
      );

      this.searchField = new FormControl();
      let input$ = this.searchField.valueChanges.pipe(
        debounceTime(200),
        filter(query => query.length >= 2 || query.length === 0),
        distinctUntilChanged(),
        switchMap(value => this.es.getResults(value))
      );

      input$.subscribe((resp) => {
        let result = resp as any;
        let hits = result.hits.hits;
        this.jsonResponse = hits.map(hit => new RecordResult(hit));
        console.log(this.jsonResponse);
      });
      console.log(this.es)
  }

  ngOnInit() {
  }

  setPage(page) {
    this.currentPage = page;
  }

  checkPage(page) {
    return page == this.currentPage ? 'active' : ''
  }
}
