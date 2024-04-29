import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Todo } from "./todo";


@Injectable({
    providedIn: 'root'
})
export class TodoService {

    todoSubject = new BehaviorSubject<Todo[]>([]);
    // todos = this.todoSubject.asObservable();
    private id = 0;

    constructor(){
      const storedTodos: any = localStorage.getItem('todos_rxjs');
      if(storedTodos){
        this.todoSubject.next(JSON.parse(storedTodos));
      }
    }

    addTodo(todo: string){
        const newTodo: Todo = {
            id: ++this.id,
            text: todo,
            completed: false,
        };
        const addTodo = [...this.todoSubject.value, newTodo];
        this.updateTodos(addTodo);
    }

    toggleTodo(id: number) {
        const updatedTodos = this.todoSubject.value.map(todo => {
          if (todo.id === id) {
            return { 
                ...todo, 
                completed: !todo.completed 
            };
          }
          return todo;
        });
        this.updateTodos(updatedTodos);
        
    }

    removeTodo(id: number){
        const updatedTodos = this.todoSubject.value.filter(todo => todo.id !== id);
        this.updateTodos(updatedTodos);
    }

    updateTodos(updatedTodos: Todo[]){
        localStorage.setItem('todos_rxjs', JSON.stringify(updatedTodos));
        this.todoSubject.next(updatedTodos);
    }
}