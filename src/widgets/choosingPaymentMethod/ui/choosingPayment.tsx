import { FC, useEffect } from 'react'
import { SelectingItem } from '../../../shared'
import card from '../lib/assets/CreditCard.png'
import sbp from '../lib/assets/sbp.png'
import wallet from '../lib/assets/Wallet.png'
import { TMethodPayment, useOrderActions } from '../../../entities/order'
import { useAppSelector } from '../../../app/store/store'

interface IItem {
    icon: string;
    name: TMethodPayment;
    value?: string;
}


export const ChoosingPayment: FC = () => {

    const {setMethodPayment} = useOrderActions()
    const {orderCreate} = useAppSelector(s => s.OrderReducer)

    const methods: IItem[] = [
        {
            icon: card,
            name: 'Банковской картой',
            value: 'Visa, Mastercard, Мир, SberPay'
        },
        {
            icon: sbp,
            name: 'Системой быстрых платежей',
            value: 'Оплата по QR-коду через мобильное приложение банка'
        }
    ]

    if (orderCreate.methodOfReceipt === 'Самовывоз') {
        methods.push({
            icon: wallet,
            name: 'При получении',
            value: 'Наличными, картой или переводом'
        })
    }

    const onSelecded = (name: string) => {
        setMethodPayment(methods.find(m => m.name === name)?.name || 'Банковской картой')
    }

    useEffect(() => {
        setMethodPayment('Банковской картой')
    }, [])

    return (
        <section>
            <SelectingItem 
                items={methods}
                setSelectedName={onSelecded}
                selectedName={orderCreate.methodPayment}
            />
        </section>
    )
}