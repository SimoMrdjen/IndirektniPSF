import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObrazacIoDetailsComponent } from './obrazac-io-details.component';

describe('ObrazacIoDetailsComponent', () => {
  let component: ObrazacIoDetailsComponent;
  let fixture: ComponentFixture<ObrazacIoDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObrazacIoDetailsComponent]
    });
    fixture = TestBed.createComponent(ObrazacIoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
