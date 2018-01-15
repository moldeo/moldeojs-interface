import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoldeojsInterfaceComponent } from './moldeojs-interface.component';

describe('MoldeojsInterfaceComponent', () => {
  let component: MoldeojsInterfaceComponent;
  let fixture: ComponentFixture<MoldeojsInterfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoldeojsInterfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoldeojsInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
