import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecksPaneComponent } from './decks-pane.component';

describe('DecksPaneComponent', () => {
  let component: DecksPaneComponent;
  let fixture: ComponentFixture<DecksPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecksPaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecksPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
