import { FC, MouseEvent, PropsWithChildren } from "react";
import { IOrderItem } from "../../model/types";
import classes from './orderPreview.module.scss'
import rub from "../../../../shared/lib/assets/icon/Rub.png"
import {  useNavigate } from "react-router-dom";
import { ItemData } from "../../../../shared";
import { Link } from "react-router-dom";

interface IProps {
    admin?: boolean;
    order: IOrderItem;
    getFormatPrice: (price: string) => string;
}

export const OrderPreview: FC<IProps & PropsWithChildren> = ({admin=false, order, getFormatPrice, children}) => {

    const router = useNavigate()



    const onClick = (e: MouseEvent, id: number) => {
        e.preventDefault()
        const target = e.target as HTMLElement
        const cancelClick = Boolean(target.closest('[data-cancel_click="true"]'))
        if(!cancelClick){
            if(admin){
                router(`/my/admin/order/${id}`)
            }
            else{
                router(`/my/order/${id}`)
            }
        }
    }

    return (
        <Link to={''} onClick={(e) => onClick(e, order.id)} className={classes.orderPreview}>
            <section className={classes.header}>
                <section className={classes.information}>
                    <span className={classes.date}>Заказ от {order.date}</span>
                    <span className={classes.id}>№ {order.id}</span>
                </section>
                <section className={classes.payment}>
                    <span className={classes.status}>{order.statusPayment === 'Оплачен' ? "оплачено" : "к оплате"}</span>
                    <span className={classes.price}>{getFormatPrice(`${order.fullPrice}`)}</span><img src={rub} />
                </section>
            </section>
            <section className={classes.details}>
                <section className={classes.data}>
                    <ItemData items={[
                        {
                            sign: "Статус заказа",
                            data: order.statusOrder
                        },
                        {
                            sign: "Статус оплаты",
                            data: order.statusPayment
                        },
                        {
                            sign: "Способ получения",
                            data: order.methodOfReceipt
                        },
                        {
                            sign: 'Способ оплаты',
                            data: order.methodPayment
                        }
                        // {
                        //     sign: `${order.isDelivery ? "Доставить" : "Собрать"} к`,
                        //     data: order.readyTime
                        // },
                        ]} 
                    />           
                </section>
                <section className={classes.products}>
                    <span className={classes.title}>Товары</span>
                    {children}
                </section>
            </section>
        </Link>
    )
}