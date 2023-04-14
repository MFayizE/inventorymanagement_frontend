import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillAddingComponent } from './bill-adding.component';

describe('BillAddingComponent', () => {
  let component: BillAddingComponent;
  let fixture: ComponentFixture<BillAddingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillAddingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillAddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
