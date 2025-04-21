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
import { ProductInitialState, useProductActions } from "../../entities/product";
import { ProductToFavorites } from "../../features/productToFavorites";
import { LoaderDiv } from "../../shared";
import { Helmet } from "react-helmet-async";


export default function Product() {

    const param = useParams<{product: string}>()


    const [isLoadingShops, setIsLoadingShops] = useState<boolean>(true)
    const [countShops, setCountShops] = useState<number>(0)
    const {error} = useAppSelector(s => s.ProductReducer)
    const {setError, setProduct, setName: setProductName} = useProductActions()

    const {product} = useAppSelector(s => s.ProductReducer)

    useEffect(() => {
        setError('')
        setProduct(ProductInitialState.product)
        window.scrollTo({top: 0})
    }, [])

    const getDescription = () => {
        if(product.data.name){
            return `Цена: ${product.data.price}. Описание: ${product.characteristics.map(ch => `${ch.name} - ${ch.values.map(v => v.value).join(', ')}`).join('; ')}. Наличие в магазинах: ${product.shops.map(shop => `${shop.address} - ${shop.count}шт.`).join(', ')}`
        }
        return ''
    }

    return (
        error
            ?
        <>Товар не найден</>
            :
        <section className={classes.product}>
            <section className={classes.data}>
                <section className={classes.inf}>
                    <section className={classes.top}>
                    {
                        (!product.data.id || !product.data.name)
                            ?
                        <section className={classes.loader}><LoaderDiv /></section>
                            :     
                        <>
                            <Helmet>
                                <title>{product.data.name}</title>
                                <meta name="description" content={getDescription()} />
                                <meta property="og:title" content={product.data.name} />
                                <meta property="og:description" content={getDescription()} />
                                <meta property="og:image" content={`${product.data.images[0]}`} />
                            </Helmet>
                            <h1 className={classes.name}>{product.data.name}</h1>
                            <ProductToFavorites productId={product.data.id} />
                        </>
                    }
                    </section>
                    <ProductImages slug={param.product || ''} />
                    <ProductCard 
                        slug={param.product || ''} 
                    />
                </section>
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