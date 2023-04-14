import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillListingComponent } from './bill-listing.component';

describe('BillListingComponent', () => {
  let component: BillListingComponent;
  let fixture: ComponentFixture<BillListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillListingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
