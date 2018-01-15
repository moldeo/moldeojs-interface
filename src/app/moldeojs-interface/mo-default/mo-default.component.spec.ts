import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoDefaultComponent } from './mo-default.component';

describe('MoDefaultComponent', () => {
  let component: MoDefaultComponent;
  let fixture: ComponentFixture<MoDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
