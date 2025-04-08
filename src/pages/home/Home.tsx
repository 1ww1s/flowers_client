import { AboutCompany } from "../../widgets/aboutCompany";
import { Banners } from "../../widgets/banners";
import { Categories } from "../../widgets/categories";
import { OurAdvantages } from "../../widgets/ourAdvantages";
import classes from './home.module.scss'

function Home() {
    return (
        <section className={classes.home}>
            <Banners />
            <section className={classes.advantages}>
                <h2 className={classes.title}>Наши преимущества</h2>   {/* НАШИ ПРЕИМУЩЕСТВА */}
                <OurAdvantages />
            </section>
            <section className={classes.categories}>
                <h2 className={classes.title}>Категории</h2>
                <Categories />
            </section>
            <section className={classes.about}>
                <h2 className={classes.title}>Цветы в Твери</h2>
                <AboutCompany />
            </section>
        </section>
    )
}

export default Home;