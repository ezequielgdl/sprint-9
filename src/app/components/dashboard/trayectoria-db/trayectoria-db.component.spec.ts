import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrayectoriaDbComponent } from './trayectoria-db.component';

describe('TrayectoriaDbComponent', () => {
  let component: TrayectoriaDbComponent;
  let fixture: ComponentFixture<TrayectoriaDbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrayectoriaDbComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrayectoriaDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
