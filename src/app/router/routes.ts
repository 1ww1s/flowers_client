import { IRoute } from "./types";



export const HOME_ROUTE: IRoute = {
    name: 'Главная',
    path: '/'
}

export const FAVOURITES_ROUTE: IRoute = {
    name: 'Избранное',
    path: '/favourites'
}

export const BASKET_ROUTE: IRoute = {
    name: 'Корзина',
    path: '/basket'
}

export const DELIVERY_AND_PAYMENT_ROUTE: IRoute = {
    name: 'Доставка и оплата',
    path: '/delivery'
}


export const ABOUT_ROUTE: IRoute = {
    name: 'О нас',
    path: '/about'
}

export const SHOPS_ROUTE: IRoute = {
    name: 'Магазины',
    path: '/shops'
}

export const SHOP_ROUTE: IRoute = {
    name: 'Магазин',
    path: '/shops/:titleSlug'
}

export const PURCHASE_ROUTE: IRoute = {
    name: 'Оформление заказа',
    path: '/purchase'
}

export const PURCHASE_STEP1_ROUTE: IRoute = {
    name: 'Оформление заказа. Шаг 1',
    path: '/purchase/step1'
}


export const PURCHASE_STEP2_ROUTE: IRoute = {
    name: 'Оформление заказа. Шаг 2',
    path: '/purchase/step2'
}

export const CATALOG_ROUTE: IRoute = {
    name: 'Каталог',
    path: '/catalog'
}

export const CATEGORY_ROUTE: IRoute = {
    name: 'Категории',
    path: '/catalog/:category'
}

export const PRODUCT_ROUTE: IRoute = {
    name: 'Продукт',
    path: '/catalog/:category/:product'
}



export const LOGIN_ROUTE: IRoute = {
    name: 'Вход',
    path: '/login'
}

export const REGISTRATION_ROUTE: IRoute = {
    name: 'Регистрация',
    path: '/registration'
}

export const MY_ROUTE: IRoute = {
    name: '',
    path: '/my'
}

export const MY_MAIN_ROUTE: IRoute = {
    name: 'Личный кабинет',
    path: '/my/main'
}

export const MY_FAVOURITES_ROUTE: IRoute = {
    name: 'Избранное',
    path: '/my/favourites'
}

export const MY_BASKET_ROUTE: IRoute = {
    name: 'Корзина',
    path: '/my/basket'
}

export const ORDERLIST_ROUTE: IRoute = {
    name: 'Заказы',
    path: '/my/orderlist'
}

export const ORDERLIST_ACTIVE_ROUTE: IRoute = {
    name: 'Актуальные',
    path: '/my/orderlist/active'
}

export const ORDERLIST_ARCHIVE_ROUTE: IRoute = {
    name: 'Завершенные',
    path: '/my/orderlist/archive'
}

export const ORDER_ROUTE: IRoute = {
    name: 'Заказ',
    path: '/my/order/:id'
}




export const ADMIN_ROUTE: IRoute = {
    name: 'Админ панель',
    path: '/my/admin'
}


export const ADMIN_ORDERLIST_ROUTE: IRoute = {
    name: 'Заказы в магазине',
    path: '/my/admin/orderlist/shop'
}

export const ADMIN_ORDER_ROUTE: IRoute = {
    name: 'Заказ',
    path: '/my/admin/order/:id'
}

export const ADMIN_ORDERLIST_ACTIVE_ROUTE: IRoute = {
    name: 'Активные',
    path: '/my/admin/orderlist/shop/active'
}

export const ADMIN_ORDERLIST_ARCHIVE_ROUTE: IRoute = {
    name: 'Завершенные',
    path: '/my/admin/orderlist/shop/archive'
}

export const ADMIN_ORDERLIST_USER_LAYOUT_ROUTE: IRoute = {
    name: 'Заказы пользователя',
    path: '/my/admin/orderlist/user'
}

export const ADMIN_ORDERLIST_USER_ACTIVE_ROUTE: IRoute = {
    name: 'Активные',
    path: '/my/admin/orderlist/user/active'
}

export const ADMIN_ORDERLIST_USER_ARCHIVE_ROUTE: IRoute = {
    name: 'Завершенные',
    path: '/my/admin/orderlist/user/archive'
}

export const ADMIN_CREATE_ROUTE: IRoute = {
    name: 'Создать',
    path: '/my/admin/create'
}

export const ADMIN_UPDATE_ROUTE: IRoute = {
    name: 'Обновить',
    path: '/my/admin/update'
}

export const ADMIN_DELETE_ROUTE: IRoute = {
    name: 'Удалить',
    path: '/my/admin/delete'
}

export const ADMIN_OTHER_ROUTE: IRoute = {
    name: 'Другое',
    path: '/my/admin/other'
}

export const PAYMENT_SUCCESS_ROUTE: IRoute = {
    name: 'Заказ успешно оплачен',
    path: '/payment/success/:id'
}

export const PAYMENT_FAILED_ROUTE: IRoute = {
    name: 'Ошибка оплаты заказа',
    path: '/payment/failed/:id'
}

export const PAYMENT_ROUTE: IRoute = {
    name: 'Оплата заказа',
    path: '/payment/:orderId'
}
