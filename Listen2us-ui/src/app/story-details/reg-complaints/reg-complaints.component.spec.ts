import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegComplaintsComponent } from './reg-complaints.component';

describe('RegComplaintsComponent', () => {
  let component: RegComplaintsComponent;
  let fixture: ComponentFixture<RegComplaintsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegComplaintsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
