import { Action, State, StateContext } from "@ngxs/store";
import { TodoModel } from "./types/todo";
import { Injectable } from "@angular/core";
import { AddItemAction, DeleteItemAction, ToggleItemAction } from "./todo-actions";

export interface TodoStateModel {
    items: TodoModel[];
}

@State<TodoStateModel>({
    name: 'todo',
    defaults: {
        items: JSON.parse(localStorage.getItem('todos_ngxs') || '[]'),
    },
})
@Injectable()
export class TodoState {

    id:number = 0;

    @Action(AddItemAction)
    addItem(ctx: StateContext<TodoStateModel>, action: AddItemAction){
        const {name} = action;
        // console.log("{name}" , {name}, "action" , action);
        
        if(!name) return;

        const state = ctx.getState();
        // console.log("state", state);
        

        const todoItem: TodoModel = {
            id: ++this.id,
            isDone: false,
            title: name,
        };
        // console.log("todoItem", todoItem);

        const newState = {
            ...state,
            items: [...state.items, todoItem],
        };
        

        ctx.setState(newState);
        localStorage.setItem('todos_ngxs', JSON.stringify(newState.items));

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
        localStorage.setItem('todos_ngxs', JSON.stringify(newState.items));
    }

    @Action(DeleteItemAction)
    deleteItem(ctx: StateContext<TodoStateModel>, action: DeleteItemAction){
        
        const state = ctx.getState();
        const newTodoItems =  state.items.filter((it) => it.id !== action.id);
        console.log(newTodoItems);
        const newState = {
            items: [...newTodoItems],
        };
        ctx.setState(newState);
        localStorage.setItem('todos_ngxs', JSON.stringify(newState.items));
        
    }
}