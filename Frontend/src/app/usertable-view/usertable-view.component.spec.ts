import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsertableViewComponent } from './usertable-view.component';

describe('UsertableViewComponent', () => {
  let component: UsertableViewComponent;
  let fixture: ComponentFixture<UsertableViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsertableViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsertableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
