import { FC, useEffect, useState } from "react";
import User from '../../lib/assets/User.png'
import UserPlus from '../../lib/assets/UserPlus.png'
import { MyInput, SelectingItem } from "../../../../shared";
import { useOrderActions } from "../../../../entities/order";
import { useAppSelector } from "../../../../app/store/store";
import classes from './recipient.module.scss'
import { Form } from "../form/Form";


type TClient = 'Я получатель' | 'Получит другой человек'

export const Recipient: FC = () => {

    const {setRecipientName, setRecipientPhone, setError} = useOrderActions()
    const {orderCreate} = useAppSelector(s => s.OrderReducer)
    const [selectedName, setSelectedName] = useState<TClient>('Я получатель')
    const {user} = useAppSelector(s => s.UserReducer)

    const setData = () => {
        setRecipientName(user.name)
        setRecipientPhone(user.phone)
    }

    const emptyData = () => {
        setRecipientName('')
        setRecipientPhone('')
    }

    const onSelected = (name: string) => {
        let n = name as TClient  
        setSelectedName(n)
        setError('')
        if(n === 'Я получатель'){
            setData()
        }
        else{
            emptyData()
        }
    }

    useEffect(() => {
        setData()
    }, [])

    useEffect(() => {
        if(selectedName === 'Я получатель'){
            setRecipientName(orderCreate.senderName)
            setRecipientPhone(orderCreate.senderPhone)
        }
        else{
            emptyData()
        }
    }, [orderCreate.senderName, orderCreate.senderPhone, selectedName])

    return (
        <section className={classes.recipient + (user.isAuth ? (' ' + classes.margin) : '')}> 
            <h2>Получатель</h2>
            <SelectingItem
                selectedName={selectedName}
                setSelectedName={onSelected}
                items={[
                    {
                        icon: User,
                        name: 'Я получатель'
                    },
                    {
                        icon: UserPlus,
                        name: 'Получит другой человек'
                    }
                ]}
            />
            {
                (selectedName === 'Получит другой человек')
                    &&
                <Form 
                    name={orderCreate.recipientName}
                    setName={setRecipientName}
                    phone={orderCreate.recipientPhone}
                    setPhone={setRecipientPhone}
                />
            }
        </section>
    )
}