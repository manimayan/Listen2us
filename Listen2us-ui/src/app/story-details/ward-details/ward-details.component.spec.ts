import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WardDetailsComponent } from './ward-details.component';

describe('WardDetailsComponent', () => {
  let component: WardDetailsComponent;
  let fixture: ComponentFixture<WardDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WardDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
