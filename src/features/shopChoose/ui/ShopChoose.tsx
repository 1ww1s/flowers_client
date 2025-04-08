import { FC } from "react";
import { MyButton } from "../../../shared";
import { useOrderActions } from "../../../entities/order";
import classes from './shopChoose.module.scss'
import { IShopData } from "../../../entities/shop";

interface IProps {
    shop: IShopData;
    onClick: () => void;
}

export const ShopChoose: FC<IProps> = ({shop, onClick}) => {

    const {setShop} = useOrderActions()

    const onChoose = () => {
        onClick()
        setShop(shop)
    }

    return (
        <section className={classes.shopChoose}>
            <MyButton
                onClick={onChoose}
                sign="Выбрать магазин"
            />
        </section>
    )
}