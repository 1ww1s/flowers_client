import { FC } from "react";
import { IOrderRes } from "../../../../entities/order";
import { getPhoneFormat, ItemData } from "../../../../shared";

interface IProps {
    order: Omit<IOrderRes, 'products'>;
}

export const OrderData: FC<IProps> = ({order}) => {

    return (
        <ItemData 
            items={[
                {
                    sign: 'Отправитель',
                    data: order.senderName + ', ' + getPhoneFormat(order.senderPhone)
                },  
                {
                    sign: 'Получатель',
                    data: order.recipientName + ', ' + getPhoneFormat(order.recipientPhone)
                },
                {
                    sign: 'Статус заказа',
                    data: order.statusOrder
                },
                {
                    sign: 'Способ получения',
                    data: order.methodOfReceipt
                },
                {
                    sign: 'Способ оплаты',
                    data: order.methodPayment
                },
            ]}
        />
    )
}