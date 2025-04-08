interface IComposition {
    id?: string;
    name: string;
    count: string;
}

interface ICharacteristic {
    name: string;
    values: {
        id?: string;
        value: string;
    }[]
}

export interface IProduct {
    shops: {
        id?: string;
        title: string;
        count: string;
        openingHours: string;
        address: string;
    }[]
    data: {
        id?: string;
        name: string;
        price: string;
        images: string[];
    }
    categories: {id?: number, name: string}[];
    composition: IComposition[]
    characteristics: ICharacteristic[]
}

export interface IProductInitialState {
    product: IProduct;
    isLoading: boolean;
    error: string;
}

export interface IProductPreview {
    id: string;
    name: string;
    slug: string;
    image: string;
    price: string;
}

export interface IProductCard {
    id: number;
    name: string;
    characteristics: ICharacteristic[];
    composition: IComposition[];
}

export interface IProductCountShop {
    productId: number;
    image: string;
    productCountMax: number;
    count: number;
    price: number;
}