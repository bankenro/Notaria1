import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddUsuComponent } from './dialog-add-usu.component';

describe('DialogAddUsuComponent', () => {
  let component: DialogAddUsuComponent;
  let fixture: ComponentFixture<DialogAddUsuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddUsuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddUsuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
