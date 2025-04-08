export type TSort = {name: string, value: string};

export const sort: TSort[] = [
    {
        name: 'Сначала популярные',
        value: ''
    },
    {
        name: 'Сначала дороже',
        value: 'price_desc'
    },
    {
        name: 'Сначала дешевле',
        value: 'price_asc'
    },
]