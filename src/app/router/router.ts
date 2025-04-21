import { RouteObject } from "react-router-dom";
import App from "../../App";
import { ABOUT_ROUTE, ADMIN_CREATE_ROUTE, ADMIN_DELETE_ROUTE, ADMIN_ORDERLIST_ACTIVE_ROUTE, ADMIN_ORDERLIST_ARCHIVE_ROUTE, ADMIN_ORDERLIST_ROUTE, ADMIN_OTHER_ROUTE, 
    ADMIN_ROUTE, ADMIN_UPDATE_ROUTE, BASKET_ROUTE, CATALOG_ROUTE, CATEGORY_ROUTE, SHOPS_ROUTE, FAVOURITES_ROUTE, HOME_ROUTE, LOGIN_ROUTE, MY_MAIN_ROUTE, MY_ROUTE, 
    ORDERLIST_ACTIVE_ROUTE, ORDERLIST_ARCHIVE_ROUTE, ORDERLIST_ROUTE, PRODUCT_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, PURCHASE_STEP1_ROUTE, PURCHASE_STEP2_ROUTE,
    DELIVERY_AND_PAYMENT_ROUTE, PURCHASE_ROUTE, ADMIN_ORDER_ROUTE, ORDER_ROUTE, MY_BASKET_ROUTE, MY_FAVOURITES_ROUTE, PAYMENT_SUCCESS_ROUTE, PAYMENT_FAILED_ROUTE,
    ADMIN_ORDERLIST_USER_ARCHIVE_ROUTE,
    ADMIN_ORDERLIST_USER_LAYOUT_ROUTE,
    ADMIN_ORDERLIST_USER_ACTIVE_ROUTE, } from "./routes";
import {Admin, AuthPage, Home, My, MyMain, OrderlistLayout, OrderlistActive, OrderlistArchive, 
    AdminCreate, AdminDelete, AdminOther, Catalog, About, Category, Product, CategoryLayout, Basket, Shops, Shop, Purchase, DeliveryAndPayment, PurchaseStep1,
    PurchaseStep2, Order, NotFound, Favourites, AdminUpdate, 
    AdminOrderlistShopLayout,
    AdminOrderlistShopActive,
    AdminOrderlistShopArchive,
    AdminOrderlistUserLayout,
    AdminOrderlistUserActive,
    AdminOrderlistUserArchive} from "../../pages";


export const router: RouteObject[] = [
    {
        path: '/',
        Component: App,
        ErrorBoundary:  NotFound,
        children: [
            {
                path: HOME_ROUTE.path,
                Component: Home,
            },
            {
                path: LOGIN_ROUTE.path,
                Component: AuthPage,
            },
            {
                path: REGISTRATION_ROUTE.path,
                Component: AuthPage,
            },
            {
                path: CATALOG_ROUTE.path,
                Component: Catalog
            },
            {
                path: DELIVERY_AND_PAYMENT_ROUTE.path,
                Component: DeliveryAndPayment
            },
            {
                path: CATEGORY_ROUTE.path,
                Component: CategoryLayout,
                children: [
                    {
                        path: CATEGORY_ROUTE.path,
                        Component: Category
                    },
                    {
                        path: PRODUCT_ROUTE.path,
                        Component: Product
                    }
                ]
            },
            {
                path: ABOUT_ROUTE.path,
                Component: About
            },
            {
                path: SHOPS_ROUTE.path,
                Component: Shops
            },
            {
                path: SHOP_ROUTE.path,
                Component: Shop
            },
            {
                path: BASKET_ROUTE.path,
                Component: Basket
            },
            {
                path: PURCHASE_ROUTE.path,
                Component: Purchase,
                children: [
                    {
                        path: PURCHASE_STEP1_ROUTE.path,
                        Component: PurchaseStep1
                    },
                    {
                        path: PURCHASE_STEP2_ROUTE.path,
                        Component: PurchaseStep2
                    },
                ]
            },
            {
                path: FAVOURITES_ROUTE.path,
                Component: Favourites
            },
            {
                path: MY_ROUTE.path,
                Component: My,
                children: [
                    {
                        path: MY_MAIN_ROUTE.path,
                        Component: MyMain,
                    },
                    {
                        path: ADMIN_ROUTE.path,
                        Component: Admin,
                        children: [
                            {
                                path: ADMIN_ORDERLIST_ROUTE.path,
                                Component: AdminOrderlistShopLayout,
                                children: [
                                    {
                                        path: ADMIN_ORDERLIST_ACTIVE_ROUTE.path,
                                        Component: AdminOrderlistShopActive
                                    },
                                    {
                                        path: ADMIN_ORDERLIST_ARCHIVE_ROUTE.path,
                                        Component: AdminOrderlistShopArchive
                                    }
                                ]
                            },
                            {
                                path: ADMIN_ORDERLIST_USER_LAYOUT_ROUTE.path,
                                Component: AdminOrderlistUserLayout,
                                children: [
                                    {
                                        path: ADMIN_ORDERLIST_USER_ACTIVE_ROUTE.path,
                                        Component: AdminOrderlistUserActive
                                    },
                                    {
                                        path: ADMIN_ORDERLIST_USER_ARCHIVE_ROUTE.path,
                                        Component: AdminOrderlistUserArchive
                                    }
                                ]
                            },
                            {
                                path: ADMIN_ORDER_ROUTE.path,
                                Component: Order
                            },
                            {
                                path: ADMIN_CREATE_ROUTE.path,
                                Component: AdminCreate
                            },
                            {
                                path: ADMIN_UPDATE_ROUTE.path,
                                Component: AdminUpdate
                            },
                            {
                                path: ADMIN_DELETE_ROUTE.path,
                                Component: AdminDelete
                            },
                            {
                                path: ADMIN_OTHER_ROUTE.path,
                                Component: AdminOther
                            }
                        ]
                    },
                    {
                        path: MY_BASKET_ROUTE.path,
                        Component: Basket
                    },
                    {
                        path: MY_FAVOURITES_ROUTE.path,
                        Component: Favourites
                    },
                    {
                        path: ORDER_ROUTE.path,
                        Component: Order
                    },
                    {
                        path: ORDERLIST_ROUTE.path,
                        Component: OrderlistLayout,
                        children: [
                            {
                                path: ORDERLIST_ACTIVE_ROUTE.path,
                                Component: OrderlistActive
                            },
                            {
                                path: ORDERLIST_ARCHIVE_ROUTE.path,
                                Component: OrderlistArchive
                            }
                        ]
                    }
                ]
            },
        ]
    }
] 