import { Component, OnInit } from '@angular/core';
import { ElasticService } from '../elastic.service';
import { RecordResult } from "../record-result.model";

@Component({
  selector: 'app-search-json',
  templateUrl: './search-json.component.html',
  styleUrls: ['./search-json.component.scss']
})
export class SearchJsonComponent implements OnInit {

  searchParameter = "";
  searchQuery = "";
  jsonResponse : RecordResult[] = [];

  constructor(private es: ElasticService) { }

  ngOnInit() { }

  fetchQuery() {
    this.searchQuery = this.es.buildWeightedQuery(this.searchParameter);
  }
  
  fetchResults() {
    console.log('Getting results...');
    this.es.getResults(this.searchParameter)
      .subscribe((resp) => {
        let hits = resp.hits.hits
        this.jsonResponse = hits.map(hit => new RecordResult(hit));
        console.log(this.jsonResponse);
    });
  }

  onSubmit() {
    this.fetchResults();
    this.fetchQuery();
  }
}
