import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllRealEstatesComponent } from './show-all-real-estates.component';

describe('ShowAllRealEstatesComponent', () => {
  let component: ShowAllRealEstatesComponent;
  let fixture: ComponentFixture<ShowAllRealEstatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAllRealEstatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAllRealEstatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
