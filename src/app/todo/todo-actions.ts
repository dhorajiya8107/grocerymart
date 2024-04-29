export class AddItemAction {
    static readonly type = '[TODO page] Add Item';
    constructor(public name: string){}
}

export class ToggleItemAction {
    static readonly type = '[TODO page] Toggle Item';
    constructor(public id: number){} 
}

export class DeleteItemAction {
    static readonly type = '[TODO page] Delete Item';
    constructor(public id: number){}
}