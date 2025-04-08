import { FC, useEffect, useState } from "react";
import { getFormatPrice, productService, useProductActions } from "../../../entities/product";
import { LoaderDiv, WrapSide } from "../../../shared";
import rub from '../../../shared/lib/assets/icon/Rub.png'
import classes from './productPrice.module.scss'
import { ProductToBasket } from "../../../features/productToBasket";

interface IProps {
    slug: string;
}


export const ProductPrice: FC<IProps> = ({slug}) => {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [product, setProduct] = useState<{price: number, id: number}>({id: 0, price: 0})
    const {setError} = useProductActions()

    const getPrice = async () => {
        try{
            setIsLoading(true)
            const data = await productService.getPrice(slug)
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
        getPrice()
    }, [])

    return (
        isLoading
            ?
        <section className={classes.loader}><LoaderDiv /></section>
            :
        <WrapSide>
            {
                <section className={classes.productPrice}>
                
                    <section className={classes.price}>
                        
                        {getFormatPrice(`${product.price}`)} <img src={rub} alt="Rub" />
                    </section>
                    <section className={classes.buttonToBasket}>
                        <ProductToBasket style={{fontSize: '14px'}} productId={`${product.id}`} />
                    </section>
                    
                </section>
            }
        </WrapSide>
    )
}