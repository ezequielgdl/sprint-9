import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsDBComponent } from './events-db.component';

describe('EventsDBComponent', () => {
  let component: EventsDBComponent;
  let fixture: ComponentFixture<EventsDBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsDBComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsDBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
