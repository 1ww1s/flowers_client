

export interface ICategory {
    id?: number;
    name: string;
    slug: string;
    image: string;
}


export interface ICategoryInitialState {
    category: ICategory;
    isLoading: boolean;
    error: string;
}

export interface IFilterCharacteristic {
    characteristicName: string,
    characteristicSlug: string,
    values: {
        name: string;
        slug: string;
        count: number;
    }[]
}


export interface ICategories {
    data: {id: number, name: string, slug: string}[];
    loaded: boolean;
}
export interface ICategoriesInitialState {
    categories: ICategories;
    isLoading: boolean;
    error: string;
}