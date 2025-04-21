



export interface IFilters {
    characteristics: {
        characteristicName: string;
        values: string[]
    }[]
    page: number;
    sort: string;
    flower: string[];
    shop: string[];
    price_min: number;
    price_max: number;
}

