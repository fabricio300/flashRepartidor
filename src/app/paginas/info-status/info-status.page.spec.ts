import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoStatusPage } from './info-status.page';

describe('InfoStatusPage', () => {
  let component: InfoStatusPage;
  let fixture: ComponentFixture<InfoStatusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoStatusPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
