import { IOrderInitialState } from "../types";



export const OrderInitialState: IOrderInitialState = {
    orderCreate: {
        products: [],
        unavailableProducts: [],
        address: {
            street: {
                value: '',
                coords: [0, 0]
            },
            entrance: '',
            floor: '',
            apartment: '',
            message: '',
            price: 0,
        },
        senderName: '',
        senderPhone: '',
        recipientPhone: '',
        recipientName: '',
        methodOfReceipt: 'Самовывоз',
        message: '',
        methodPayment: 'Банковской картой',
        shop: {
            id: -1,
            title: '',
            openingHours: '',
            address: '',
        },
    },
    isLoading: false,
    error: '',
}