
export interface IOrderItem {
    id: number;
    date: string;
    fullPrice: number;
    statusOrder: string;
    statusPayment: TStatusPayment;
    methodOfReceipt: TMethodOfReceipt;
    methodPayment: TMethodPayment;
    products: {
        image: string;
        count: number;
    }[];
}

export type TStatusPayment =  "Оплачен" | "Не оплачен"
export type TMethodOfReceipt = "Самовывоз" | "Доставка"
export type TMethodPayment = "Банковской картой" | "Системой быстрых платежей" | "При получении"
 
export interface IOrderRes {
    date: string;
    products: {
        id: number;
        name: string;
        slug: string;
        categorySlug: string;
        image: string;
        count: number;
        price: number;
    }[];
    senderName: string;
    senderPhone: string;
    recipientName: string;
    recipientPhone: string;
    message: string;
    methodOfReceipt: TMethodOfReceipt;
    methodPayment: TMethodPayment;
    address: string;
    shop: {
        title: string;
        address: string;
        openingHours: string;
    }
    deliveryMessage: string;
    deliveryPrice: number;
    statusPayment: TStatusPayment,
    statusOrder: string;
    messageDelivery: string;
    
}

export interface IOrderReq {
    products: {
        id: number;
        count: number;
    }[];
    senderName: string;
    senderPhone: string;
    recipientName: string;
    recipientPhone: string;
    message: string;
    methodOfReceipt: TMethodOfReceipt;
    methodPayment: TMethodPayment;
    address: {
        street: string;
        apartment: string;
        entrance: string;
        floor: string;
        message: string;
    }
    shopId: number;
}

export interface IOrderCreate {
    products: {
        productId: number;
        image: string;
        productCountMax: number;
        count: number;
        price: number;
    }[];
    senderName: string;
    senderPhone: string;
    recipientName: string;
    recipientPhone: string;
    message: string;
    methodOfReceipt: TMethodOfReceipt;
    methodPayment: TMethodPayment;
    address: IAddress;
    shop: {
        id: number;
        title: string;
        address: string;
        openingHours: string;
    },
}

interface IAddress {
    street: {
        value: string;
        coords: [number, number];
    }
    apartment: string;
    entrance: string;
    floor: string;
    message: string;
    price: number;
}

export interface IOrderInitialState {
    orderCreate: IOrderCreate;
    isLoading: boolean;
    error: string;
}

export interface IZone {
    title: string;
    price: number;
    color: {
        title: string;
        value: string;
    }
    coords: number[][]
}