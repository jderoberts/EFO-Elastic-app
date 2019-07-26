import { Component, OnInit, Input } from '@angular/core';
import { RecordResult } from '../record-result.model';

@Component({
  selector: 'app-result-record-mini',
  templateUrl: './result-record-mini.component.html',
  styleUrls: ['./result-record-mini.component.scss']
})
export class ResultRecordMiniComponent implements OnInit {

  @Input() record: RecordResult;

  constructor() { }

  ngOnInit() {
  }

}
