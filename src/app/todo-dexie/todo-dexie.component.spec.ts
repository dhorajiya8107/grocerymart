import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoDexieComponent } from './todo-dexie.component';

describe('TodoDexieComponent', () => {
  let component: TodoDexieComponent;
  let fixture: ComponentFixture<TodoDexieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoDexieComponent]
    });
    fixture = TestBed.createComponent(TodoDexieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
