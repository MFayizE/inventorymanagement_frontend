import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryCreatingComponent } from './inventory-creating.component';

describe('InventoryCreatingComponent', () => {
  let component: InventoryCreatingComponent;
  let fixture: ComponentFixture<InventoryCreatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryCreatingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryCreatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
