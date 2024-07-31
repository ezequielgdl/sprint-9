import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesDbComponent } from './actividades-db.component';

describe('ActividadesDbComponent', () => {
  let component: ActividadesDbComponent;
  let fixture: ComponentFixture<ActividadesDbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActividadesDbComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActividadesDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
