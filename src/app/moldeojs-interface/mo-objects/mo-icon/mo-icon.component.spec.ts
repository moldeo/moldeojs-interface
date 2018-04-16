import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoIconComponent } from './mo-icon.component';

describe('MoIconComponent', () => {
  let component: MoIconComponent;
  let fixture: ComponentFixture<MoIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
