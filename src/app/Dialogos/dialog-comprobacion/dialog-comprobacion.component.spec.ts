import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComprobacionComponent } from './dialog-comprobacion.component';

describe('DialogComprobacionComponent', () => {
  let component: DialogComprobacionComponent;
  let fixture: ComponentFixture<DialogComprobacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogComprobacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComprobacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
