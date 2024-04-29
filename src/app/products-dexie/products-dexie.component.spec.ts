import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsDexieComponent } from './products-dexie.component';

describe('ProductsDexieComponent', () => {
  let component: ProductsDexieComponent;
  let fixture: ComponentFixture<ProductsDexieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsDexieComponent]
    });
    fixture = TestBed.createComponent(ProductsDexieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
