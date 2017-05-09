import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPane1Component } from './test-pane1.component';

describe('TestPane1Component', () => {
  let component: TestPane1Component;
  let fixture: ComponentFixture<TestPane1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestPane1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPane1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
