import { FC, useEffect, useState } from "react";
import classes from './productsByCategory.module.scss'
import { IProductPreview, ProductPrev, ProductPrevLoader, productService } from "../../../../entities/product";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { ProductToBasket } from "../../../../features/productToBasket";
import { ProductToFavorites } from "../../../../features/productToFavorites";
import { Pagination } from "../../../../features/pagination";
import { Sort } from "../sort/Sort";
import { sort } from "../../lib/const/const";
import { FiltersInitialState, IFilters } from "../../../../features/selectionFilter";
import { Helmet } from "react-helmet-async";
import { useAppSelector } from "../../../../app/store/store";

interface IProps {

}

export const ProductsByCategory: FC<IProps> = ({}) => {
    
    const [products, setProducts] = useState<IProductPreview[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [totalPages, setTotalPages] = useState<number>(1)
    const params = useParams<{category: string}>()
    const {pathname} = useLocation()
    const [searchParams, setSearchParams] = useSearchParams()

    const {category} = useAppSelector(s => s.CategoryReducer)

    const emptyFilters: IFilters = FiltersInitialState;

    const getProducts = async (filters: IFilters) => {
        try{
            setIsLoading(true)
            const data = await productService.getByCategory(params.category || '', filters)
            setTotalPages(data.totalPages)
            setProducts(data.products)
        }
        catch(e){
            if(e instanceof Error){
                if(e.name !== 'AbortError'){
                    console.log(e)
                }
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        let f: IFilters = JSON.parse(JSON.stringify(emptyFilters))
        for(let param of searchParams.entries()){
            if(param[0] === 'page'){
                f = {...f, page: +param[1]}
                continue
            }
            if(param[0] === 'sort'){
                f = {...f, sort: param[1]}
                continue
            }
            if(param[0] === 'price'){
                const prices = param[1].split('-')
                f = {...f, price_min: +prices[0], price_max: +prices[1]}
                continue
            }
            if(param[0] === 'flower'){
                f={...f, flower: param[1].split(',')}
                continue
            }
            if(param[0] === 'shop'){
                f={...f, shop: param[1].split(',')}
                continue
            }
            const ch: {characteristicName: string, values: string[]} = {characteristicName: param[0], values: param[1].split(',')}
            f.characteristics.push(ch)
        }
        getProducts(f)
    }, [searchParams, pathname])


    return (
        <section className={classes.productsByCategory}>
            <Sort 
                sort={sort} 
            />
            <section className={classes.list}>
                {
                    isLoading
                        ?
                    <ProductPrevLoader numbItems={8} />
                        :
                    !products.length
                        ?
                    <span className={classes.notFound}>Товары не найдены</span>
                        :
                    <>
                    <Helmet>
                        <meta name="description" content={`Товары в категории ${category.name}: ${products.map(product => product.name).join(', ')}`} />
                        <meta property="og:description" content={`Товары в категории ${category.name}: ${products.map(product => product.name).join(', ')}`} />
                    </Helmet>
                    {
                        products.map((productPrev, ind) => 
                            <ProductPrev 
                                key={ind} 
                                buttonBasket={ <ProductToBasket productId={productPrev.id} /> }
                                buttonFavourites={ <ProductToFavorites productId={productPrev.id} /> }
                                product={productPrev}>
                            </ProductPrev>
                        )
                    }
                    </>
                }
            </section>      
            <section className={classes.pagination}>
                <Pagination 
                    totalPages={totalPages} 
                />
            </section>
        </section>
    )
}