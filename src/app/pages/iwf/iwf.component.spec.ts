import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IwfComponent } from './iwf.component';

describe('IwfComponent', () => {
  let component: IwfComponent;
  let fixture: ComponentFixture<IwfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IwfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IwfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
