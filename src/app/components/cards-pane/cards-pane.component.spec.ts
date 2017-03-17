import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsPaneComponent } from './cards-pane.component';

describe('CardsPaneComponent', () => {
  let component: CardsPaneComponent;
  let fixture: ComponentFixture<CardsPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardsPaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
