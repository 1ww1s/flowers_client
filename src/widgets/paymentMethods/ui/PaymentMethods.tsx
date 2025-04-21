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

interface IProps {
    choice?: boolean;
}

export const PaymentMethods: FC<IProps> = ({choice = true}) => {

    const {setMethodPayment} = useOrderActions()
    const {orderCreate} = useAppSelector(s => s.OrderReducer)

    const methods: IItem[] = [
        {
            icon: card,
            name: 'Банковской картой',
            value: 'Visa, Mastercard, Мир'
        },
        {
            icon: sbp,
            name: 'Системой быстрых платежей',
            value: 'Оплата по QR-коду через мобильное приложение банка (Недоступно в тестовом режиме)'
        },
    ]

    if (orderCreate.methodOfReceipt === 'Самовывоз' && choice) {
        methods.push({
            icon: wallet,
            name: 'При получении',
            value: 'Наличными, картой или переводом'
        })
    }

    const onSelecded = (name: string) => {
        if(choice){
            setMethodPayment(methods.find(m => m.name === name)?.name || 'Банковской картой')
        }
    }

    useEffect(() => {
        if(choice){
            setMethodPayment('Банковской картой')
        }
    }, [])

    return (
        <section>
            <SelectingItem 
                items={methods}
                setSelectedName={onSelecded}
                selectedName={choice ? orderCreate.methodPayment : ''}
            />
        </section>
    )
}