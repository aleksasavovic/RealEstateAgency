import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUserRealEstatesComponent } from './show-user-real-estates.component';

describe('ShowUserRealEstatesComponent', () => {
  let component: ShowUserRealEstatesComponent;
  let fixture: ComponentFixture<ShowUserRealEstatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowUserRealEstatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowUserRealEstatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
