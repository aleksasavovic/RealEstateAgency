import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPendingRealEstatesComponent } from './show-pending-real-estates.component';

describe('ShowPendingRealEstatesComponent', () => {
  let component: ShowPendingRealEstatesComponent;
  let fixture: ComponentFixture<ShowPendingRealEstatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPendingRealEstatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPendingRealEstatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
