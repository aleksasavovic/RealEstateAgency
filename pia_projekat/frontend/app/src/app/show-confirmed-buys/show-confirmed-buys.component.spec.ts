import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowConfirmedBuysComponent } from './show-confirmed-buys.component';

describe('ShowConfirmedBuysComponent', () => {
  let component: ShowConfirmedBuysComponent;
  let fixture: ComponentFixture<ShowConfirmedBuysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowConfirmedBuysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowConfirmedBuysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
