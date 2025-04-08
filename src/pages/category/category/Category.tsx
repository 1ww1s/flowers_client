
import { ProductsByCategory } from '../../../widgets/productsByCategory'
import classes from './category.module.scss'
import { useAppSelector } from '../../../app/store/store'
import { LoaderDiv } from '../../../shared'
import { Filters } from '../../../widgets/filters'
import { useEffect, useRef, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { ProductPriceSlider } from '../../../widgets/slider'


export default function Category() {

    const {category, error} = useAppSelector(s => s.CategoryReducer)
    const [searchParams, setSearchParams] = useSearchParams();
    const [urlSearchParams, setUrlSearchParams] = useState<URLSearchParams>(new URLSearchParams(searchParams))
    const {pathname} = useLocation()

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
        window.scrollTo({top: 0})
    }, [pathname, searchParams])
        
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
                <h1>{category.name}</h1>
                    :
                <section className={classes.loader}>
                    <LoaderDiv />
                </section>
            }
            </section>
            <section className={classes.content}>
                <aside className={classes.sidebar}>
                    <section className={classes.filters}>
                        <ProductPriceSlider />
                        <Filters />
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