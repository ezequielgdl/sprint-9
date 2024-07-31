import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiasDbComponent } from './noticias-db.component';

describe('NoticiasDbComponent', () => {
  let component: NoticiasDbComponent;
  let fixture: ComponentFixture<NoticiasDbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoticiasDbComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticiasDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
