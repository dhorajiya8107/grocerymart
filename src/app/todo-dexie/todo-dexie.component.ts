import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo-dexie',
  templateUrl: './todo-dexie.component.html',
  styleUrls: ['./todo-dexie.component.css']
})
export class TodoDexieComponent {

  itemName: string;
  todos: Todo[] = [];
  currentYear: number;

facebook(url) {
  // window.location = "https://www.facebook.com";
  window.open(url, '_blank', 'noopener,noreferrer');
}

  constructor(
    private todoService: TodoService,
  ){
    this.currentYear = new Date().getFullYear();
  }

  ngOnInit(){
    this.loadTodos();
  }

  async loadTodos(): Promise<void> {
    this.todos = await this.todoService.getAllTodos();
  }

  async addItem(): Promise<void>{
    const newTodo: Todo = {
      title: this.itemName,
      completed: false,
    };
    await this.todoService.addTodo(newTodo);
    this.itemName = "";
    this.loadTodos();
  }

  async deleteTodo(id: number): Promise<void>{
    await this.todoService.deleteTodo(id);
    this.loadTodos();
  }

  async toggle(todo: Todo): Promise<void>{
    const newTodo: Todo = {
      id: todo.id,
      title: todo.title,
      completed: !todo.completed
    };
    await this.todoService.updateTodo(newTodo);
    this.loadTodos();
  }

}
