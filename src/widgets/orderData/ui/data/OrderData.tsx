import { FC } from "react";
import classes from './orderData.module.scss'
import { IOrderRes } from "../../../../entities/order";
import { getPhoneFormat, ItemData } from "../../../../shared";
import { getFormatPrice } from "../../../../entities/product";


interface IProps {
    order: Omit<IOrderRes, 'products'>;
}


export const OrderData: FC<IProps> = ({order}) => {

    

    return (
        <section>
            <ItemData 
                items={[
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
        </section>
    )
}