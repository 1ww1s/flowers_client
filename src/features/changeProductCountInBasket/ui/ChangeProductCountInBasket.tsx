import { FC, useState } from "react";
import classes from './changeProductCountInBasket.module.scss'
import { SyncBasket } from "../../../shared";
import { useAppSelector } from "../../../app/store/store";
import { useUserAcions } from "../../../entities/user";
import { IInfoAboutProduct } from "../../../entities/basket/model/types";
import { basketService } from "../../../entities/basket";

interface IProps {
    ind: number
    count: number;
    setCount: (count: number) => void;
    maxCount: number;
    setIsLoading: (isLoading: boolean) => void;
}

const minCount = 1;

export const ChangeProductCountInBasket: FC<IProps> = ({count, setCount, ind, maxCount, setIsLoading}) => {


    const {user} = useAppSelector(s => s.UserReducer)
    const {setBasket} = useUserAcions()

    const countUpdate = async (id: number, newCount: number) => {
        try{
            setIsLoading(true)
            await basketService.countUpdate(id, newCount)
        }
        catch(e){
            console.log(e)
        }
        finally{
            setIsLoading(false)
        }
    }

    const onPlus = () => {
        if(count < maxCount){
            const newCount = count + 1;
            setCount(newCount)
            const target: IInfoAboutProduct[] = JSON.parse(JSON.stringify(user.basket))
            target[ind].count = newCount;
            localStorage.setItem('basket', JSON.stringify(target))
            setBasket(target)
            if(user.isAuth) countUpdate(user.basket[ind].id, newCount)
        }
    }

    const onMinus = () => {
        if(count > minCount){
            const newCount = count - 1;
            setCount(newCount)
            const target: IInfoAboutProduct[] = JSON.parse(JSON.stringify(user.basket))
            target[ind].count = newCount;
            localStorage.setItem('basket', JSON.stringify(target))
            setBasket(target)
            if(user.isAuth) countUpdate(user.basket[ind].id, newCount)
        }
    }

    return (
        <section onMouseDown={e => e.preventDefault()} className={classes.change}>
            <section onClick={onMinus} className={classes.minus}>
                <svg className={count === minCount ? classes.disabled : ''} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.75 12H20.25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </section>
            <section className={classes.count}>
                {count}
            </section>
            <section onClick={onPlus} className={classes.plus}>
                <svg className={count === maxCount ? classes.disabled : ''} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.75 12H20.25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 3.75V20.25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </section>
        </section>
    )
}