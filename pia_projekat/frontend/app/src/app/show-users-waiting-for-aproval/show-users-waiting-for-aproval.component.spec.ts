import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUsersWaitingForAprovalComponent } from './show-users-waiting-for-aproval.component';

describe('ShowUsersWaitingForAprovalComponent', () => {
  let component: ShowUsersWaitingForAprovalComponent;
  let fixture: ComponentFixture<ShowUsersWaitingForAprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowUsersWaitingForAprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowUsersWaitingForAprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
