import { IShopInitialState } from "../types";


export const ShopInitialState: IShopInitialState = {
    shop: {
        id: -1,
        title: '',
        titleSlug: '',
        address: '',
        openingHours: '',
        coordinateX: 0,
        coordinateY: 0,
    },
    isLoading: false,
    error: ''
}