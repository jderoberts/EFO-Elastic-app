import { Component, OnInit } from '@angular/core';
import { ElasticService } from '../elastic.service';
import { RecordResult } from '../record-result.model';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  search = false;
  searchParameter = "";
  jsonResponse : RecordResult[] = [];
  responseLength = [];
  pageStart = 0;
  pageEnd = 10;
  currentPage=0;

  constructor(private es: ElasticService) { }

  ngOnInit() { }

  onSubmit() {
    console.log('Getting results...');
    this.es.getResults(this.searchParameter)
      .subscribe((resp) => {
        let hits = resp.hits.hits
        this.jsonResponse = hits.map(hit => new RecordResult(hit));
        console.log(this.jsonResponse);
        this.responseLength = new Array(Math.ceil(this.jsonResponse.length/10));
    });
    this.search = true;
  }

  nextPage() {
    this.goToPage(this.currentPage+1);
  }
  prevPage() {
    this.goToPage(this.currentPage-1);
  }
  goToPage(page) {
    this.pageStart = page*10;
    this.pageEnd = page*10 + 10;
    this.currentPage = page;
    console.log(this.pageStart,",",this.pageEnd);
    window.scrollTo(0,300);
  }

}
