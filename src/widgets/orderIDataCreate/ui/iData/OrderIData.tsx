import { FC, useState } from "react";
import classes from './iData.module.scss'
import { ItemData, MyTextarea } from "../../../../shared";
import { useAppSelector } from "../../../../app/store/store";
import { MyData } from "../myData/MyData";
import { Recipient } from "../recipient/Recipient";
import { useOrderActions } from "../../../../entities/order";
import { Form } from "../form/Form";



export const OrderIData: FC = () => {

    const {user} = useAppSelector(s => s.UserReducer)
    const {orderCreate} = useAppSelector(s => s.OrderReducer)
    const {setMessage} = useOrderActions()

    return (
        <section className={classes.iData}> 
            <h2>Покупатель</h2>
            <MyData />
            <Recipient />
            <h2>Комментарий</h2>
            <MyTextarea
                placeholder="Комментарий к заказу" 
                value={orderCreate.message}
                setValue={setMessage}
            />
        </section>
    )
}