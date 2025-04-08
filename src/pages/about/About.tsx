import { AboutCompany } from '../../widgets/aboutCompany'
import classes from './about.module.scss'




export default function About(){


    return (
        <section className={classes.about}>
            <section className={classes.wrap}>
                <h1>О компании</h1>
                <AboutCompany />
            </section>
        </section>
    )
}