import { ABOUT_ROUTE, CATALOG_ROUTE, DELIVERY_AND_PAYMENT_ROUTE, SHOPS_ROUTE } from "../../../../app/router/routes";




export const paths: {name: string, path: string}[] = [
    {
        name: CATALOG_ROUTE.name,
        path: CATALOG_ROUTE.path
    },
    {
        name: SHOPS_ROUTE.name,
        path: SHOPS_ROUTE.path
    },
    {
        name: DELIVERY_AND_PAYMENT_ROUTE.name,
        path: DELIVERY_AND_PAYMENT_ROUTE.path
    },
    {
        name: ABOUT_ROUTE.name,
        path: ABOUT_ROUTE.path
    },
]