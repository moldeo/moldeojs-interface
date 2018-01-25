import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoEraseComponent } from './mo-erase.component';

describe('MoEraseComponent', () => {
  let component: MoEraseComponent;
  let fixture: ComponentFixture<MoEraseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoEraseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoEraseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
