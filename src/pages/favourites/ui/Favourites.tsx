import { useLocation } from "react-router-dom";
import { FavouritesWidget } from "../../../widgets/favouritesWidget";
import classes from './favourites.module.scss'
import { CATALOG_ROUTE } from "../../../app/router/routes";
import { ComeBack } from "../../../features/comeBack";
import { Helmet } from "react-helmet-async";




function Favourites() {
    
    const {state, pathname} = useLocation()
    const isMy = pathname.includes('my')

    return (
        <section className={classes.favourites}>
            <Helmet>
                <title>Избранное</title>
            </Helmet>
            <section className={classes.wrap + (isMy ? (' ' + classes.my) : '')}>
                <h1>Избранное</h1>
                <ComeBack 
                    to={(state as string)?.includes('/catalog') ? state : CATALOG_ROUTE.path}
                    text={state ? 'Вернуться к покупкам' : 'К покупкам'}   
                />
                <section className={classes.content}>
                    <FavouritesWidget />
                </section>
            </section>
        </section>

    )
}

export default Favourites;