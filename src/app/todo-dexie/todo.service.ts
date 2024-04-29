import { Injectable } from "@angular/core";
import Dexie from "dexie";
import { Todo } from "./todo.model";

@Injectable({
    providedIn: 'root'
})
export class TodoService{
    private db: Dexie;

    constructor(){
        this.db = new Dexie('todoDB');
        this.db.version(1).stores({
            todos: '++id, title, completed'
        });
    }

    async getAllTodos(): Promise<Todo[]>{
        return await this.db.table<Todo>('todos').toArray();
    }

    async addTodo(todo: Todo): Promise<any> {
        return await this.db.table<Todo>('todos').add(todo);
    }

    async updateTodo(todo: Todo): Promise<any> {
        return await this.db.table<Todo>('todos').update(todo.id!, todo);
    }

    async deleteTodo(id:number): Promise<void> {
        return await this.db.table<Todo>('todos').delete(id);
    }


}