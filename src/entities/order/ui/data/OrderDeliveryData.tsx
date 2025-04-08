import { FC } from "react";
import classes from './orderData.module.scss'
import { useAppSelector } from "../../../../app/store/store";
import rub from '../../../../shared/lib/assets/icon/Rub.png'

interface IProps {
    price?: number;
    address?: string;
}

export const OrderDeliveryData: FC<IProps> = ({price, address}) => {

    const {orderCreate} = useAppSelector(s => s.OrderReducer)

    const fullAddress = () => {
        const address = orderCreate.address.street.value + (orderCreate.address.entrance ? (', подъезд ' + orderCreate.address.entrance) : '') + (orderCreate.address.floor ? (', этаж ' + orderCreate.address.floor) : '') + (orderCreate.address.apartment ? ', кв.' + orderCreate.address.apartment : '');
        return address
    }

    return (
        <ul className={classes.list}>
            <li className={classes.item}>
                Цена - {price || orderCreate.address.price} <img src={rub} />
            </li>
            <li>
                Куда - {address || fullAddress()}
            </li>
        </ul>
    )
}