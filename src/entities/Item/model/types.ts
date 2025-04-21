


export interface IItem {
    id?: number;
    name: string;
    slug?: string;
}

export interface IItemInitialState {
    item: IItem;
    isLoading: boolean;
    error: string;
}