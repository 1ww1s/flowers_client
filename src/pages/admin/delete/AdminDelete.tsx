
import classes from './adminDelete.module.scss'
import deleteImg from '../../../shared/lib/assets/icon/XSquare.png'
import { ProductDeleteModal } from '../../../widgets/productDelete'

export default function AdminDelete() {

    return (
        <section className={classes.adminCreate}>
            <section className={classes.title}>
                <h1>Удалить</h1>
                <img className={classes.icon} src={deleteImg} />
            </section>
            <section >
                <ProductDeleteModal />
            </section>
        </section>
    )
}