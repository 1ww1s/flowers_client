import { Helmet } from 'react-helmet-async'
import { AboutCompany } from '../../widgets/aboutCompany'
import classes from './about.module.scss'




export default function About(){

    // +

    return (
        <section className={classes.about}>
            <Helmet>
                <title>О компании</title>
                <meta name="description" content="Добро пожаловать на сайт компании flowers. Расскажем больше о нас" />
                <meta property="og:title" content='О компании' />
                <meta property="og:description" content='Добро пожаловать на сайт компании flowers. Расскажем больше о нас' />
            </Helmet>
            <section className={classes.wrap}>
                <h1>О компании</h1>
                <AboutCompany />
            </section>
        </section>
    )
}