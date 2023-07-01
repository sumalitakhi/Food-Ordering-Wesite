import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserviewTableComponent } from './userview-table.component';

describe('UserviewTableComponent', () => {
  let component: UserviewTableComponent;
  let fixture: ComponentFixture<UserviewTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserviewTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserviewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
