import { ICategoryInitialState } from "../../types";


export const CategoryInitialState: ICategoryInitialState = {
    category: {
        name: '',
        slug: '',
        image: '',
    },
    isLoading: false,
    error: ''
}
