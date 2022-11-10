import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMultipleRealEstatesComponent } from './add-multiple-real-estates.component';

describe('AddMultipleRealEstatesComponent', () => {
  let component: AddMultipleRealEstatesComponent;
  let fixture: ComponentFixture<AddMultipleRealEstatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMultipleRealEstatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMultipleRealEstatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
