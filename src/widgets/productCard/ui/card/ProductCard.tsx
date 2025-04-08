import { FC, useEffect, useState } from "react";
import { Card, IProductCard, productService, useProductActions } from "../../../../entities/product";
import classes from './card.module.scss'
import { ProductToFavorites } from "../../../../features/productToFavorites";

interface IProps {
    slug: string;
}

export const ProductCard: FC<IProps> = ({slug}) => {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const initialProduct: IProductCard = {id: 0, name: '', characteristics: [], composition: []}
    const [product, setProduct] = useState<IProductCard>(initialProduct)
    const {setError} = useProductActions()

    const getData = async () => {
        try{
            setIsLoading(true)
            const data = await productService.getCard(slug)
            setProduct(data)
        }
        catch(e){
            setError('err')
            console.log(e)
        }
        finally{
            setIsLoading(false)
        }
    }
    
    useEffect(() => {
        getData()
    }, [])

    return (
        <section className={classes.card}>
            <Card 
                product={product}
                isLoading={isLoading}            
            >
                <ProductToFavorites productId={`${product.id}`} />
            </Card>
        </section>
    )
}