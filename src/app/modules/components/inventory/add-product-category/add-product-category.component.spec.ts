import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductCategoryComponent } from './add-product-category.component';

describe('AddProductCategoryComponent', () => {
  let component: AddProductCategoryComponent;
  let fixture: ComponentFixture<AddProductCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProductCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
