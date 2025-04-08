import { ChangeRolesModal } from '../../../widgets/changeRoles'
import classes from './other.module.scss'



export default function Other() {

    return (
        <section className={classes.other}>
            <section className={classes.title}>
                <h1>Другое</h1>
                {/* <img className={classes.icon} src={arrows} /> */}
            </section>
            <section>
                <ChangeRolesModal />
            </section>
        </section>
    )
}