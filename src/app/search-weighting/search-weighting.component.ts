import { Component, OnInit } from '@angular/core';
import { ElasticService } from '../elastic.service';
import { RecordResult } from "../record-result.model";

@Component({
  selector: 'app-search-weighting',
  templateUrl: './search-weighting.component.html',
  styleUrls: ['./search-weighting.component.scss']
})
export class SearchWeightingComponent implements OnInit {

  searchParameter = "";
  searchQuery = "";
  params1 = [5,1,0.5,5];
  params2 = [1,1,1,1];
  jsonResponse1 : RecordResult[] = [];
  jsonResponse2 : RecordResult[] = [];

  constructor(private es: ElasticService) { }

  ngOnInit() {
  }

  fetchResults() {
    this.jsonResponse1 = [];
    this.jsonResponse2 = [];
    this.es.getResults(this.searchParameter,this.params1)
      .subscribe((resp) => {
        let hits = resp.hits.hits
        this.jsonResponse1 = hits.map(hit => new RecordResult(hit));
        console.log(this.jsonResponse1);
    });
    this.es.getResults(this.searchParameter,this.params2)
      .subscribe((resp) => {
        let hits = resp.hits.hits
        this.jsonResponse2 = hits.map(hit => new RecordResult(hit));
        console.log(this.jsonResponse2);
    });
  }
}
