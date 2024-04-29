import { Selector } from "@ngxs/store";
import { TodoState, TodoStateModel } from "./todo-state";
import { TodoModel } from "./types/todo";

export class TodoSelectors {
    @Selector([TodoState])
    static todoItems(state: TodoStateModel): TodoModel[] {
        // console.log("selectors: state.items", state.items);
        return state.items;
    }
}