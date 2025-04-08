import { FC, useEffect } from "react";
import { getPhoneFormat, ItemData } from "../../../../shared";
import { useAppSelector } from "../../../../app/store/store";
import { useOrderActions } from "../../../../entities/order";
import { Form } from "../form/Form";



export const MyData: FC = () => {

    const {user} = useAppSelector(s => s.UserReducer)
    const {orderCreate} = useAppSelector(s => s.OrderReducer)

    const {setSenderName, setSenderPhone} = useOrderActions()

    useEffect(() => {
        if(user.isAuth){
            setSenderName(user.name)
            setSenderPhone(user.phone)
        }
    }, [])

    return (
        <section>
            <ItemData
                items={[
                    {
                        sign: 'Имя',
                        data: orderCreate.senderName
                    },
                    {
                        sign: 'Телефон',
                        data: getPhoneFormat(orderCreate.senderPhone)
                    }
                ]}
            />
            {
                !user.isAuth
                    &&
                <Form 
                    name={orderCreate.senderName}
                    setName={setSenderName}
                    phone={orderCreate.senderPhone}
                    setPhone={setSenderPhone}
                />
            }
        </section>
    )
}