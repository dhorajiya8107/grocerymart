import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AddItemAction, DeleteItemAction, ToggleItemAction } from './todo-actions';
import { TodoModel } from './types/todo';
import { TodoSelectors } from './todo-selectors';
import { Observable } from 'rxjs';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {

  @Select(TodoSelectors.todoItems) todoItems$!: Observable<TodoModel[]>;

  newItemName!: string;

  constructor(private store: Store){}

  trackById(index: number, item:TodoModel): number {
    return item.id;
  }

  toggleItem(todoItem: TodoModel){
    this.store.dispatch(new ToggleItemAction(todoItem.id));
  }

  addItem(){
    this.store.dispatch(new AddItemAction(this.newItemName));
    this.newItemName = ''; 
  }

  removeItem(item:any){
    this.store.dispatch(new DeleteItemAction(item.id));
  }

  
}
