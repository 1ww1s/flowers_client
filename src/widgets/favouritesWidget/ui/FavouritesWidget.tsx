import { FC, useEffect, useRef, useState } from "react";
import { IProductPreview, ProductPrev, ProductPrevLoader, productService } from "../../../entities/product";
import classes from './favouritesWidget.module.scss'
import { ProductToBasket } from "../../../features/productToBasket";
import { ProductToFavorites } from "../../../features/productToFavorites";
import { useAppSelector } from "../../../app/store/store";
import { useUserAcions } from "../../../entities/user";
import { Helmet } from "react-helmet-async";


export const FavouritesWidget: FC = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [products, setProducts] = useState<IProductPreview[]>([])
    const {user} = useAppSelector(s => s.UserReducer)
    const {setFavourites} = useUserAcions()

    const getProducts = async () => {
        try{
            setIsLoading(true)
            const data: (IProductPreview | null)[] = await productService.getFavourites(user.favourites.map(f => +f))
            const provenProducts: IProductPreview[] = data.filter(d => d !== null)
            const ids = provenProducts.map(product => product.id)
            localStorage.setItem('favourites', JSON.stringify(ids))
            setFavourites(ids)
            setProducts(provenProducts)
        }
        catch(e){
            console.log(e)
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if(user.favourites.length){
            getProducts()
        }
        else{
            setIsLoading(false)
        }
    }, [])

    const favouritesUpdate = () => {
        const copy: IProductPreview[] = JSON.parse(JSON.stringify(products))
        const newProducts = copy.filter(c => user.favourites.includes(c.id))
        setProducts(newProducts)
    }

    const isOne = useRef<boolean>(true)
    useEffect(() => {
        if(isOne.current) 
            isOne.current = false;
        else
            favouritesUpdate()
    }, [user.favourites])

    return (
        <section className={classes.favouritesWidget}>
            <Helmet>
                <meta name="description" content={`Избранные товары: ${products.map(product => product.name).join(', ')}`} />
            </Helmet>
            {
                isLoading
                    ?
                <ProductPrevLoader numbItems={3} />
                    :
                !user.favourites.length
                    ?
                <h2>Нет избранных товаров</h2>
                    :
                products.map((product, ind) => 
                    <ProductPrev 
                        key={ind}
                        product={product}
                        buttonBasket={ <ProductToBasket productId={product.id} /> }
                        buttonFavourites={ <ProductToFavorites productId={product.id} /> }
                    />
                )
            }
        </section>
    )
}