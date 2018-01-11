import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudsampleListComponent } from './crudsample-list.component';

describe('CrudsampleListComponent', () => {
  let component: CrudsampleListComponent;
  let fixture: ComponentFixture<CrudsampleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudsampleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudsampleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
