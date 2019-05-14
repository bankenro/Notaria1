import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditUsuComponent } from './dialog-edit-usu.component';

describe('DialogEditUsuComponent', () => {
  let component: DialogEditUsuComponent;
  let fixture: ComponentFixture<DialogEditUsuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEditUsuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditUsuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
