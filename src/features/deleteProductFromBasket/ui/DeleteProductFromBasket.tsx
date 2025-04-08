import { FC, useState } from "react";
import classes from './deleteProductFromBasket.module.scss'
import { useAppSelector } from "../../../app/store/store";
import { useUserAcions } from "../../../entities/user";
import { basketService } from "../../../entities/basket";


interface IProps {
    productId: number;
    setIsLoading: (isLoading: boolean) => void;
    deleteCount: () => void;
}

export const DeleteProductFromBasket: FC<IProps>= ({productId, setIsLoading, deleteCount}) => {

    const {user} = useAppSelector(s => s.UserReducer)
    const {setBasket} = useUserAcions()

    const basketDelete = async () => {
        await basketService.basketDelete(productId)
    }

    const basketUpdate = async () => {
        try{
            setIsLoading(true)
            await basketDelete()
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
        const newBasket = user.basket.filter(b => b.id !== +productId)
        setBasket(newBasket)
        localStorage.removeItem('basket')
        localStorage.setItem('basket', JSON.stringify(newBasket))
        deleteCount()
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
        <section className={classes.deleteBox}>
            <span  onClick={onClick} className={classes.title}>Удалить</span>
        </section>
    )
}