
import classes from './adminCreate.module.scss'
import plus from '../../../shared/lib/assets/icon/Plus.png'
import { ProductChangeFull } from '../../../widgets/productChange'
import { CategoryChangeModal } from '../../../widgets/categoryChange'
import { ShopChangeFull } from '../../../widgets/shopChange'
import { BannerChangeModal } from '../../../widgets/bannerChange'
import { ItemChangeModal } from '../../../widgets/itemChange'
import { CharacteristicChangeModal } from '../../../widgets/characteristicChange'

export default function AdminCreate() {

    return (
        <section className={classes.adminCreate}>
            <section className={classes.title}>
                <h1>Создать</h1>
                <img className={classes.icon} src={plus} />
            </section>
            <section >
                <ProductChangeFull />
                <CategoryChangeModal />
                <ShopChangeFull />
                <BannerChangeModal />
                <ItemChangeModal />
                <CharacteristicChangeModal />
            </section>
        </section>
    )
}