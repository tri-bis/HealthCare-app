import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodBank } from './blood-bank';

describe('BloodBank', () => {
  let component: BloodBank;
  let fixture: ComponentFixture<BloodBank>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BloodBank]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BloodBank);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
