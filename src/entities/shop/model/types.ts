

export interface IShop {
    id: number;
    title: string;
    titleSlug: string;
    address: string;
    openingHours: string;
    coordinateX: number;
    coordinateY: number;
}

export interface IShopData {
    id: number;
    title: string;
    address: string;
    openingHours: string;
}

export interface IShopId {
    id: number;
    coordinateX: number;
    coordinateY: number;
}


export interface IShopInitialState {
    shop: IShop;
    isLoading: boolean;
    error: string;
}