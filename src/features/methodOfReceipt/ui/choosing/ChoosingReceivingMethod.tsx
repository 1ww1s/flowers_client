import { FC, useState } from "react";
import { TMethodOfReceipt, useOrderActions } from "../../../../entities/order";
import classes from './choosing.module.scss'
import { ButtonBlack } from "../button/ButtonBlack";
import { FormReceivingMethod } from "../form/FormReceivingMethod";
import { useAppSelector } from "../../../../app/store/store";
import { YMaps } from "@pbe/react-yandex-maps";



export const ChoosingReceivingMethod: FC = () => {

    const {setMethodOfReceipt, setError} = useOrderActions()
    const {orderCreate} = useAppSelector(s => s.OrderReducer)

    const s: TMethodOfReceipt = 'Самовывоз'
    const d: TMethodOfReceipt = 'Доставка'

    const onS = () => {
        setError('')
        setMethodOfReceipt('Самовывоз')
    }

    const onD = () => {
        setError('')
        setMethodOfReceipt('Доставка')
    }

    return (
        <section className={classes.choosing}>
            <section className={classes.buttons}>
                <ButtonBlack 
                    active={orderCreate.methodOfReceipt===s}
                    onClick={onS}
                >
                    {s}
                </ButtonBlack>
                <ButtonBlack 
                    active={orderCreate.methodOfReceipt===d}
                    onClick={onD}
                >
                    {d}
                </ButtonBlack>
            </section>
            {
                orderCreate.methodOfReceipt === 'Доставка'
                    ?
                <section className={classes.form}>
                    <YMaps query={{apikey: '5232156a-499a-4991-94f5-87306751113a'}}>
                        <FormReceivingMethod />
                    </YMaps>
                </section>
                    :
                <p>{orderCreate.shop.title ? 'Магазин выбран' : 'Нужно выбрать магазин'}</p>
            }
        </section>
    )
}