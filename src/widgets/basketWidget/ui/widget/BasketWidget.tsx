import { FC, useEffect, useState } from "react";
import classes from './basketWidget.module.scss'
import { useAppSelector } from "../../../../app/store/store";
import { BasketItemLoader, basketService, IBasket, IInfoAboutProduct } from "../../../../entities/basket";
import { useUserAcions } from "../../../../entities/user";
import { Item } from "../item/Item";

interface IProps {
    setTotalPrice: (price: number) => void;
}

export const BasketWidget: FC<IProps> = ({setTotalPrice}) => {

    const {user, isLoading} = useAppSelector(s => s.UserReducer)
    const {setBasket, setIsLoading} = useUserAcions()
    const [products, setProducts] = useState<(IBasket & {countMax: number})[]>([])

    const getData = async () => {
        try{
            setIsLoading(true)
            const data = await basketService.getItems(user.basket.map(b => b.id)) 
            let provenBasket = data.filter(d => d !== null)
            const targer: IInfoAboutProduct[] = JSON.parse(JSON.stringify(user.basket))
            provenBasket = provenBasket.map(b => {
                const c = targer.find(t => t.id === b.id)
                return {
                    ...b,
                    count: c && c.count > 0 ? c.count : 1
                }
            })
            // await Promise.all(provenBasket.map(async (d, ind) => {
            //     d.count = user.basket[ind].count;
            //     if(user.basket[ind].count > d.countMax){
            //         await basketService.countUpdate(d.id, d.countMax)
            //         d.count = d.countMax;
            //         targer[ind].count = d.countMax;
            //         localStorage.setItem('basket', JSON.stringify(targer))
            //         setBasket(targer)
            //     }
            //     if(user.basket[ind].count === 0 && d.countMax > 0){
            //         d.count = 1;
            //         targer[ind].count = 1;
            //         localStorage.setItem('basket', JSON.stringify(targer))
            //         setBasket(targer)
            //     }
            // }))
            setProducts(provenBasket)
        }
        catch(e){
            console.log(e)
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        let price = 0;
        for (let product of products){
            price += product.price * product.count
        }
        setTotalPrice(price)
    }, [products])

    const setCount = (ind: number, count: number) => {
        const target: (IBasket & {countMax: number})[] = JSON.parse(JSON.stringify(products))
        target[ind].count = count
        setProducts(target)
    }

    const deleteCount = (ind: number) => {
        const target: (IBasket & {countMax: number})[] = JSON.parse(JSON.stringify(products))
        target.splice(ind, 1)
        setProducts(target)
    }

    return (
        <section className={classes.basketWidget}>
            {
                isLoading
                    ?
                <BasketItemLoader numb={2} />
                    :
                products.length === 0
                    ?
                <h2>В корзине пусто</h2>
                    :
                products.map((product, ind) => 
                    <Item 
                        key={ind}
                        product={product} 
                        ind={ind} 
                        setCount={setCount} 
                        deleteCount={() => deleteCount(ind)}
                    />
                )
            }
        </section>
    )
}