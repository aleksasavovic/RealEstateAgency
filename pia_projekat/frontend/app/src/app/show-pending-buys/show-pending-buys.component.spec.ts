import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPendingBuysComponent } from './show-pending-buys.component';

describe('ShowPendingBuysComponent', () => {
  let component: ShowPendingBuysComponent;
  let fixture: ComponentFixture<ShowPendingBuysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPendingBuysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPendingBuysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
