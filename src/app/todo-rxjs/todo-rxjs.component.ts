import { Component } from '@angular/core';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo-rxjs',
  templateUrl: './todo-rxjs.component.html',
  styleUrls: ['./todo-rxjs.component.css']
})
export class TodoRxjsComponent {

  newItemName: string;
  todos = this.todoService.todoSubject;
  currentYear: number;

facebook(url) {
  // window.location = "https://www.facebook.com";
  window.open(url, '_blank', 'noopener,noreferrer');
}

  constructor(private todoService: TodoService){
    this.currentYear = new Date().getFullYear();
  }

  addItem(){
    this.todoService.addTodo(this.newItemName);
    this.newItemName = "";
  }

  toggleItem(id){
    this.todoService.toggleTodo(id);
  }

  removeItem(id){
    this.todoService.removeTodo(id);
  }


}
