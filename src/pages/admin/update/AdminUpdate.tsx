import classes from './update.module.scss'
import arrows from '../../../shared/lib/assets/icon/ArrowsClockwise.png'
import { ProductChangeFull } from '../../../widgets/productChange'
import { CategoryChangeModal } from '../../../widgets/categoryChange'
import { ShopChangeFull } from '../../../widgets/shopChange'
import { BannerChangeModal } from '../../../widgets/bannerChange'

export default function AdminUpdate() {



    return (
        <section className={classes.update}>
            <section className={classes.title}>
                <h1>Обновить</h1>
                <img className={classes.icon} src={arrows} />
            </section>
            <section >
                <ProductChangeFull />
                <CategoryChangeModal />
                <ShopChangeFull />
                <BannerChangeModal />
            </section>
        </section>
    )
}