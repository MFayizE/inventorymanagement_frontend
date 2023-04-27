import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillEditingComponent } from './bill-editing.component';

describe('BillEditingComponent', () => {
  let component: BillEditingComponent;
  let fixture: ComponentFixture<BillEditingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillEditingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillEditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
