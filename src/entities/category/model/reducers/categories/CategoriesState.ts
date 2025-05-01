import { ICategoriesInitialState } from "../../types";



export const CategoriesInitialState: ICategoriesInitialState = {
    categories: {
        data: [],
        loaded: false,
    },
    isLoading: true,
    error: ''
}