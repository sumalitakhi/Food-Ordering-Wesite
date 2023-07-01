import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserprofileComponent } from './update-userprofile.component';

describe('UpdateUserprofileComponent', () => {
  let component: UpdateUserprofileComponent;
  let fixture: ComponentFixture<UpdateUserprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateUserprofileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateUserprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
