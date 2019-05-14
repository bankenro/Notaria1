import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscriturasComponent } from './escrituras.component';

describe('EscriturasComponent', () => {
  let component: EscriturasComponent;
  let fixture: ComponentFixture<EscriturasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscriturasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscriturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
