import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoAddEscrituraComponent } from './dialogo-add-escritura.component';

describe('DialogoAddEscrituraComponent', () => {
  let component: DialogoAddEscrituraComponent;
  let fixture: ComponentFixture<DialogoAddEscrituraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoAddEscrituraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoAddEscrituraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
