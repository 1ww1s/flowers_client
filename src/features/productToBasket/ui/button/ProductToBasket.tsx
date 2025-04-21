import { ComponentProps, FC, useState } from "react";
import classes from './button.module.scss'
import { useAppSelector } from "../../../../app/store/store";
import { useUserAcions } from "../../../../entities/user";
import { LoaderSpinner } from "../../../../shared";
import { basketService } from "../../../../entities/basket";

interface IProps{
    productId: string;
}

export const ProductToBasket: FC<IProps & ComponentProps<'button'>> = ({productId, ...props}) => {

    const {user} = useAppSelector(s => s.UserReducer)
    const {setBasket} = useUserAcions()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const isPresent = user.basket.find(b => b.id === +productId)
    const title = isPresent ? "В корзине" : "В корзину" 

    const basketAdd = async () => {
        await basketService.basketAdd({id: +productId, count: 1})
    }

    const basketDelete = async () => {
        await basketService.basketDelete(+productId)
    }

    const basketUpdate = async () => {
        try{
            setIsLoading(true)
            if(isPresent){
                await basketDelete()
            }
            else{
                if(user.basket.length < 99){
                    await basketAdd()
                }
            }
            basketLocalUpdate()
        }
        catch(e){
            console.log(e)
        }
        finally{
            setIsLoading(false)
        }
    }

    const basketLocalUpdate = () => {
        if(isPresent){
            const newBasket = user.basket.filter(b => b.id !== +productId)
            setBasket(newBasket)
            localStorage.removeItem('basket')
            localStorage.setItem('basket', JSON.stringify(newBasket))
        }
        else{
            if(user.basket.length < 99){
                const newBasket = [...user.basket, {id: +productId, count: 1}]
                setBasket(newBasket)
                localStorage.removeItem('basket')
                localStorage.setItem('basket', JSON.stringify(newBasket))
            }
        }
    }

    const onClick = () => {
        if(user.isAuth){
            basketUpdate()
        }
        else{
            basketLocalUpdate()
        }
    }

    return (
        <section className={classes.addProductToBasket}>
            <button {...props} className={isPresent ? classes.selected : ''} onClick={onClick}>{isLoading ? <LoaderSpinner /> : title}</button>
        </section>
    )
}