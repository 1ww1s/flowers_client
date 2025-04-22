
import { ProductsByCategory } from '../../../widgets/productsByCategory'
import classes from './category.module.scss'
import { useAppSelector } from '../../../app/store/store'
import { LoaderDiv } from '../../../shared'
import { Filters } from '../../../widgets/filters'
import { useEffect, useRef, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { ProductPriceSlider } from '../../../widgets/slider'
import { FilterByFlowers } from '../../../widgets/filterByFlowers'
import { FilterByShops } from '../../../widgets/filterByShops'
import { Helmet } from 'react-helmet-async'


export default function Category() {

    const {category, error} = useAppSelector(s => s.CategoryReducer)
    const [searchParams, setSearchParams] = useSearchParams();
    const [urlSearchParams, setUrlSearchParams] = useState<URLSearchParams>(new URLSearchParams(searchParams))
    const {pathname} = useLocation()

    const ref = useRef<HTMLDivElement>(null)

    const isOne = useRef<boolean>(true)
    useEffect(() => {
        if(isOne.current){
            isOne.current = false;
        }
        else{
            setSearchParams('')
            setUrlSearchParams(new URLSearchParams(''))
        }
    }, [pathname])
    
    useEffect(() => {
        filterClose()
    }, [pathname, searchParams])
        
    const filterOpen = () => {
        if(ref.current){
            ref.current.classList.toggle(classes.open)
        }
    }

    const filterClose = () => {
        if(ref.current){
            ref.current.classList.remove(classes.open)
        }
    }

    return (
        <section className={classes.wrap}>
        {
            error
                ?
            <>404</>
                :
            <>
            <section className={classes.title}>
            {
                category.name
                    ?
                <>
                    <Helmet>
                        <title>{category.name}</title>
                        <meta property="og:title" content={category.name} />
                    </Helmet>
                    <h1>{category.name}</h1>
                </>
                    :
                <section className={classes.loader}>
                    <LoaderDiv />
                </section>
            }
            </section>
            <section className={classes.content}>
                <aside className={classes.sidebar}>
                    <h3
                        onClick={filterOpen} 
                        className={classes.titleFilter}
                    >
                        Фильтры
                    </h3>
                    <section ref={ref} className={classes.filters}>
                        <section className={classes.filterWrap}>
                            <ProductPriceSlider />
                            <FilterByShops />
                            <FilterByFlowers />
                            <Filters />
                        </section>
                    </section>
                </aside>
                <main className={classes.main}>
                    <ProductsByCategory />
                </main>
            </section>
            </>
        }
        </section>
    )
}