



export interface IFilters {
    characteristics: {
        characteristicName: string;
        values: string[]
    }[]
    page: number;
    sort: string;
    price_min: number;
    price_max: number;
}

