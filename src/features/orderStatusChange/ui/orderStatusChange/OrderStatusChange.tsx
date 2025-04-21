import { FC, useState } from "react";
import { ConfirmCustom, MyButton } from "../../../../shared";
import classes from './orderStatusChange.module.scss'
import { orderService, TMethodOfReceipt, TStatus } from "../../../../entities/order";

interface IVariant {
    method: TMethodOfReceipt;
    statuses: TStatus[];
}

interface IProps{
    methodOfReceipt: TMethodOfReceipt;
    orderId: number;
    currentStatus: TStatus;
    setStatusOrder: (status: TStatus) => void;
    cancel?: boolean;
}

export const OrderStatusChange: FC<IProps> = ({methodOfReceipt, orderId, currentStatus, setStatusOrder, cancel}) => {
    
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)

    const variants: IVariant[] = [
        {
            method: 'Самовывоз',
            statuses: ['Собирается', 'Готов к выдаче', 'Выдан'],
        },
        {
            method: 'Доставка',
            statuses: ['Собирается', 'Передается курьеру', 'Передан курьеру', 'Выдан'],
        }
    ]

    function choice(): TStatus | null {
        const variant = variants.find(v => v.method === methodOfReceipt)
        if(variant){
            const curStatusInd = variant.statuses.findIndex(s => s === currentStatus)
            if(curStatusInd !== -1 && curStatusInd < variant.statuses.length - 1){
                return variant.statuses[curStatusInd + 1]
            }
        }
        return null
    } 

    const change = async () => {
        if(cancel && !open){
            setOpen(true)
            return
        }
        try{
            setIsLoading(true)
            const selectedStatus = cancel ? 'Отменен' : choice()
            if(selectedStatus){
                await orderService.statusChange(orderId, selectedStatus)
                setStatusOrder(selectedStatus)
            }
            else{
                alert(`Не найден статус`)
            }
        }
        catch(e){
            console.log(e)
            alert(e)
        }
        finally{
            setIsLoading(false)
        }
    }

    const confirm = (isOk: boolean) => {
        setOpen(false)
        if(isOk){
            change()
        }
    }

    return (
        <>
            { open && <ConfirmCustom title="Подтверждение отмены заказа" setIsOk={confirm} /> }
            <MyButton 
                style={cancel ? {backgroundColor: 'var(--red)', color: 'white'} : {}}
                sign={cancel ? 'Отменить' : (choice() || 'Отменен')}
                onClick={change}
                isLoading={isLoading}
            />
        </>
    )
}