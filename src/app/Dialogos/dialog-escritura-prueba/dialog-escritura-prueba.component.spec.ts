import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEscrituraPruebaComponent } from './dialog-escritura-prueba.component';

describe('DialogEscrituraPruebaComponent', () => {
  let component: DialogEscrituraPruebaComponent;
  let fixture: ComponentFixture<DialogEscrituraPruebaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEscrituraPruebaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEscrituraPruebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
