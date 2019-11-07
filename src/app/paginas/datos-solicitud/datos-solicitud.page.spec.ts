import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosSolicitudPage } from './datos-solicitud.page';

describe('DatosSolicitudPage', () => {
  let component: DatosSolicitudPage;
  let fixture: ComponentFixture<DatosSolicitudPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosSolicitudPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosSolicitudPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
