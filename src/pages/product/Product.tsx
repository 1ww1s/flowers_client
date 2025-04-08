import { useParams } from "react-router-dom";
import { ProductCard } from "../../widgets/productCard";
import { ProductImages } from "../../widgets/productImages";
import classes from './product.module.scss'
import { ProductPrice } from "../../widgets/productPrice";
import { ProductShopsWidget } from "../../widgets/productShops";
import { useEffect, useState } from "react";
import { WaysReceiveOrder } from "../../widgets/waysReceiveOrder";
import { WhereToPlaceAnOrder } from "../../widgets/whereToPlaceAnOrder";
import { useAppSelector } from "../../app/store/store";
import { useProductActions } from "../../entities/product";


export default function Product() {

    const param = useParams<{product: string}>()
    
    const [isLoadingShops, setIsLoadingShops] = useState<boolean>(true)
    const [countShops, setCountShops] = useState<number>(0)
    const {error} = useAppSelector(s => s.ProductReducer)
    const {setError} = useProductActions()

    useEffect(() => {
        setError('')
        window.scrollTo({top: 0})
    }, [])

    return (
        error
            ?
        <>Товар не найден</>
            :
        <section className={classes.product}>
            <section className={classes.data}>
                <ProductImages slug={param.product || ''} />
                <ProductCard slug={param.product || ''} />
                <section className={classes.side}>
                    <ProductPrice slug={param.product || ''} />
                    <WaysReceiveOrder isLoading={isLoadingShops} count={countShops} />
                    <WhereToPlaceAnOrder />
                </section>
            </section>
            <section className={classes.shops}>
                <ProductShopsWidget 
                    slug={param.product || ''} 
                    isLoading={isLoadingShops}
                    setIsLoading={setIsLoadingShops}
                    setCount={setCountShops}
                />
            </section>
        </section>
    )
}