import { FC, useEffect, useState } from "react";
import { IProduct, productService, ProductShopsCard, useProductActions } from "../../../entities/product";
import classes from './shops.module.scss'
import { LoaderDiv } from "../../../shared";

interface IProps{
    slug: string;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    setCount: (count: number) => void;
}

export const ProductShopsWidget: FC<IProps> = ({slug, isLoading, setIsLoading, setCount}) => {

    const [shops, setShops] = useState<IProduct['shops']>([])
    const {setError} = useProductActions()

    const getShops = async () => {
        try{
            setIsLoading(true)
            const data = await productService.getShops(slug)
            setCount(data.length)
            setShops(data)
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
        getShops()
    }, [])

    return (
        <section id="shops" className={classes.shops}>
            <h2>Наличие в магазинах</h2>
            {
                isLoading
                    ?
                <section className={classes.loader}><LoaderDiv /></section>
                    :
                <ProductShopsCard shops={shops} />
            }
        </section>
    )
}