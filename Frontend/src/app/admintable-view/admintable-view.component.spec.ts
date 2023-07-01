import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmintableViewComponent } from './admintable-view.component';

describe('AdmintableViewComponent', () => {
  let component: AdmintableViewComponent;
  let fixture: ComponentFixture<AdmintableViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmintableViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmintableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
