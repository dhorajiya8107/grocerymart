import { Action, Select, State, StateContext } from "@ngxs/store";
import { TodoModel } from "./types/todo";
import { Injectable } from "@angular/core";
import { AddItemAction, DeleteItemAction, ToggleItemAction } from "./todo-actions";
import { Observable } from "rxjs";

export interface TodoStateModel {
    items: TodoModel[];
}

@State<TodoStateModel>({
    name: 'todo',
    defaults: {
        items: [],
    },
})
@Injectable()
export class TodoState {

    id:number = 0;

    constructor(){}

    @Select(state => state.todo.items) todoItems$: Observable<TodoModel[]>;

    @Action(AddItemAction)
    addItem(ctx: StateContext<TodoStateModel>, action: AddItemAction){

        this.todoItems$.subscribe(items => {
            console.log(items);
            if(items.length > 0){
                this.id = Math.max(...items.map(item => item.id));
            }else{
                this.id = 0;
            }
        });

        const {name} = action;

        const state = ctx.getState();
        console.log("state", state);
    

        const todoItem: TodoModel = {
            id: ++this.id,
            isDone: false,
            title: name,
        };

        const newState = {
            items: [...state.items, todoItem],
        };
        console.log(newState);
        
        ctx.setState(newState);

        // console.log(ctx.getState());
        
    }

    @Action(ToggleItemAction)
    toggleItem(ctx: StateContext<TodoStateModel>, action: ToggleItemAction){

        // console.log("ToggleItemAction" , action);

        const state = ctx.getState();

        // console.log("ToggleItemAction: state", state);

        const newTodoItems = state.items.map((item) => {
            if(item.id === action.id){
                return {
                    ...item,
                    isDone: !item.isDone,
                };
            }
            return item;
        });

        // console.log("newTodoItems", newTodoItems);

        const newState = {
            items: [...newTodoItems],
        };

        ctx.setState(newState);
    }

    @Action(DeleteItemAction)
    deleteItem(ctx: StateContext<TodoStateModel>, action: DeleteItemAction){
        
        const state = ctx.getState();
        const newTodoItems =  state.items.filter((it) => it.id !== action.id);
        const newState = {
            items: [...newTodoItems],
        };
        ctx.setState(newState);
        
    }
}