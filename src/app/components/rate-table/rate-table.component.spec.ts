import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateTableComponent } from './rate-table.component';

describe('RateTableComponent', () => {
  let component: RateTableComponent;
  let fixture: ComponentFixture<RateTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
