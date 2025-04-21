
import classes from './adminDelete.module.scss'
import deleteImg from '../../../shared/lib/assets/icon/XSquare.png'
import { ProductDeleteModal } from '../../../widgets/productDelete'
import { ShopChangeFull } from '../../../widgets/shopChange'
import { BannerChangeModal } from '../../../widgets/bannerChange'
import { ItemChangeModal } from '../../../widgets/itemChange'
import { CharacteristicChangeModal } from '../../../widgets/characteristicChange'

export default function AdminDelete() {

    return (
        <section className={classes.adminCreate}>
            <section className={classes.title}>
                <h1>Удалить</h1>
                <img className={classes.icon} src={deleteImg} />
            </section>
            <section >
                <ProductDeleteModal />
                <BannerChangeModal />
                <ItemChangeModal />
                <CharacteristicChangeModal />
                <ShopChangeFull />
            </section>
        </section>
    )
}