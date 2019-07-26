import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchWeightingComponent } from './search-weighting.component';

describe('SearchWeightingComponent', () => {
  let component: SearchWeightingComponent;
  let fixture: ComponentFixture<SearchWeightingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchWeightingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchWeightingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
