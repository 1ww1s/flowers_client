import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../app/store/store'
import classes from './purchase.module.scss'
import { OrderDeliveryData, orderService, useOrderActions } from '../../../entities/order';
import { useNavigate } from 'react-router-dom';
import { ComeBack } from '../../../features/comeBack';
import { PURCHASE_STEP1_ROUTE } from '../../../app/router/routes';
import { AvailableAndUnavailableProducts } from '../../../entities/product';
import { ShopData } from '../../../entities/shop';
import { OrderDetails } from '../../../widgets/orderDetails';
import { LoaderScreen, MyButton, WrapItem } from '../../../shared';
import { OrderIData } from '../../../widgets/orderIDataCreate';
import { basketService } from '../../../entities/basket';
import { IUser, useUserAcions } from '../../../entities/user';
import { PaymentMethods } from '../../../widgets/paymentMethods';
import { useSignActions } from '../../../entities/sign';


export default function PurchaseStep2() {

    const {orderCreate, error} = useAppSelector(s => s.OrderReducer)
    const {setError} = useOrderActions()
    const {user} = useAppSelector(s => s.UserReducer)
    const {setBasket} = useUserAcions()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useNavigate()

    const {setSign} = useSignActions()

    const checkStep2 = () => {
        if(orderCreate.methodOfReceipt === 'Доставка'){
            if(!orderCreate.address.street.value){
                router(PURCHASE_STEP1_ROUTE.path)
            }
        }
        if(!orderCreate.shop.title){
            router(PURCHASE_STEP1_ROUTE.path)
        }
    }

    let productCount = 0;
    let totalPrice = 0;
    for (let product of orderCreate.products){
        productCount += product.count;
        totalPrice += product.price * product.count;
    }

    useEffect(() => {
        checkStep2()
    }, [])

    const back = () => {
        router(PURCHASE_STEP1_ROUTE.path)
    }

    const updateBasket = async () => {
        const newBaket: IUser['basket'] = []
        await Promise.all(user.basket.map(async bProduct => {
            const orderP = orderCreate.products.find(p => p.productId === bProduct.id)
            if(orderP){
                if(orderP.count === bProduct.count){
                    if(user.isAuth){
                        await basketService.basketDelete(orderP.productId)
                    }
                }
                else{
                    const newCount = bProduct.count - orderP.count;
                    newBaket.push({
                        id: orderP.productId,
                        count: newCount
                    })
                    if(user.isAuth){
                        await basketService.countUpdate(orderP.productId, newCount)
                    }
                }
            }
            else{
                newBaket.push(bProduct)
            }
        }))
        localStorage.setItem('basket', JSON.stringify(newBaket))
        setBasket(newBaket)
    }



    const create = async () => {
        try{
            setIsLoading(true)
            const paymentUrl = await orderService.create({
                products: orderCreate.products.map(product => ({id: product.productId, count: product.count})),
                methodOfReceipt: orderCreate.methodOfReceipt,
                message: orderCreate.message,
                methodPayment: orderCreate.methodPayment,
                senderName: orderCreate.senderName,
                senderPhone: orderCreate.senderPhone,
                recipientName: orderCreate.recipientName,
                recipientPhone: orderCreate.recipientPhone,
                shopId: orderCreate.shop.id,
                address: {
                    street: orderCreate.address.street.value,
                    apartment: orderCreate.address.apartment,
                    floor: orderCreate.address.floor,
                    entrance: orderCreate.address.entrance,
                    message: orderCreate.address.message,
                }
            })
            await updateBasket()
            window.location.href = paymentUrl; // Перенаправление на страницу оплаты
        }
        catch(e) {
            if(e instanceof Error){
                setSign({type: 'error', message: e.message})
            }
            else{
                console.log(e)
            }
            router(PURCHASE_STEP1_ROUTE.path, {
                replace: true
            })
        }
        finally{
            setIsLoading(false)
        }
    }

    const check = () => {
        if(orderCreate.senderName === ''){
            setError('Не заполнено имя отправителя')
            return
        }
        if(orderCreate.senderPhone === ''){
            setError('Не заполнен телефон отправителя')
            return
        }
        else if(orderCreate.senderPhone.length !== 11){
            setError('Неправильно заполнен телефон отправителя')
            return
        }
        if(orderCreate.recipientName === ''){
            setError('Не заполнено имя получателя')
            return
        }
        if(orderCreate.recipientPhone === ''){
            setError('Не заполнен телефон получателя')
            return
        }
        else if(orderCreate.recipientPhone.length !== 11){
            setError('Неправильно заполнен телефон получателя')
            return
        }
        create()
    }   

    return (
        <>
            {isLoading && <LoaderScreen />}
            <section className={classes.comeBack} onClick={back}>
                <ComeBack text='Венуться к шагу 1' to={PURCHASE_STEP1_ROUTE.path} />
            </section>
            <section className={classes.purchaseStep2}>
                <h1>Оформление заказа. Шаг 2</h1>
                <section className={classes.wrap}>
                    <section className={classes.content}>
                        {
                            orderCreate.methodOfReceipt === 'Самовывоз'
                                ?
                            <WrapItem>
                                <h2>{orderCreate.methodOfReceipt}</h2>
                                {orderCreate.shop && <ShopData shop={orderCreate.shop} />}
                            </WrapItem>
                                :
                            <WrapItem>
                                <h2>Доставит курьер</h2>
                                <OrderDeliveryData />
                            </WrapItem>
                        }
                        <WrapItem>
                            <AvailableAndUnavailableProducts 
                                title={false}
                                products={orderCreate.products}
                            />  
                        </WrapItem>
                        <WrapItem>
                            <h2>Выбор оплаты</h2>
                            <PaymentMethods />
                        </WrapItem>
                        <WrapItem>
                            <OrderIData />
                        </WrapItem>
                    </section>
                        <section className={classes.sidebar}>
                            <OrderDetails
                                deliveryPrice={orderCreate.address.price}
                                productCount={productCount} 
                                productsPrice={totalPrice}                   
                            >
                                <MyButton
                                    sign={orderCreate.methodPayment === 'При получении' ? 'Оформить' : 'Оплатить'}
                                    onClick={() => check()}
                                    error={error}
                                />
                            </OrderDetails>
                        </section>
                </section>
            </section>
        </>
    )
}