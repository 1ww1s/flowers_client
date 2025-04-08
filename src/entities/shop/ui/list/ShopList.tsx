import { FC } from "react";
import { GoToTheShop, IShop, IShopData } from "../../../../entities/shop";
import classes from './shopList.module.scss'
import { ItemData } from "../../../../shared";

interface IProps {
    shops: IShop[];
    choice?: {selectedShop: IShopData; setSelectedShop: (shop: IShopData) => void};
}


export const ShopList: FC<IProps> = ({shops, choice}) => {

    return (
        <ul className={classes.list}>
            {shops.map((shop, ind) =>
                <li 
                    key={shop.title} 
                    className={classes.item + (choice ? (' ' + classes.choice + (choice.selectedShop?.id === shop.id ? ' ' + classes.active : '')) : '')} 
                    onClick={() => choice?.setSelectedShop(shop)} 
                >
                    <ItemData 
                        items={[
                            {
                                sign: 'Название',
                                data: shop.title,
                            },
                            {
                                sign: 'Адрес',
                                data: shop.address,
                            },
                            {
                                sign: 'Часы работы',
                                data: shop.openingHours,
                            },
                        ]}
                    />
                    {
                    !choice 
                        &&
                    <section className={classes.button}> 
                        <GoToTheShop to={shop.titleSlug} />
                    </section>
                    }
                </li>
            )}
        </ul>
    )
}