import { useLocation, useParams } from 'react-router-dom'
import classes from './order.module.scss'
import { useEffect, useState } from 'react'
import { IOrderRes, OrderDeliveryData, OrderProductItem, orderService, TStatus } from '../../entities/order'
import { LoaderDiv, WrapItem } from '../../shared'
import { OrderDetails } from '../../widgets/orderDetails'
import { OrderData } from '../../widgets/orderData'
import { ShopData } from '../../entities/shop'
import { ComeBack } from '../../features/comeBack'
import { OrderStatusChange } from '../../features/orderStatusChange'
import { NotFoundWidget } from '../../widgets/notFoundWidget'
import { Helmet } from 'react-helmet-async'


export default function Order() {
  
    const {id} = useParams<{id: string}>()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [order, setOrder] = useState<IOrderRes | null>(null)
    const [productCount, setProductCount] = useState<number>(0)
    const [fullPrice, setFullPrice] = useState<number>(0)
    const {pathname} = useLocation()
    const isAdmin = pathname.includes('admin')

    const getOrder = async () => {
        try{
            if(id){
                setIsLoading(true)
                const data = await orderService.get(+id)
                setOrder(data)
            }
        }
        catch(e){
            console.log(e)
        }
        finally{
            setIsLoading(false)
        }
    } 

    useEffect(() => {
        getOrder()
    }, [])

    const getProductCount = () => {
        if(order){
            let productCount = 0;
            let fullPrice = 0;
            for(let pr of order.products){
                productCount += pr.count;
                fullPrice += pr.price * pr.count;
            }
            setProductCount(productCount)
            setFullPrice(fullPrice)
        }
    } 
    useEffect(() => {
        getProductCount()
    }, [order])

    const setStatusOrder = (status: TStatus) => {
        setOrder({...order, statusOrder: status} as IOrderRes)
    }

    return (
        <section className={classes.order}>
            <Helmet >
                <title>{order ? ('Заказ от ' + order.date) : `Заказ`}</title>
                <meta name="description" content='' />
                <meta property="og:title" content={order ? ('Заказ от ' + order.date) : `Заказ`} />
            </Helmet>
            <section className={classes.comeBack}>
                <ComeBack 
                    to={isAdmin ? '/my/admin/orderlist/shop/active' : '/my/orderlist/active'}
                    text='Вернуться к списку заказов'
                />
            </section>
            <section className={classes.wrap}>
                <section className={classes.content}>
                {
                    isLoading
                        &&
                    <>
                        <WrapItem isLoading={isLoading} />
                        <WrapItem isLoading={isLoading} />
                    </>
                }
                { 
                    !order && !isLoading 
                        && 
                    <WrapItem>
                        <section className={classes.notFound}>
                            <NotFoundWidget /> 
                        </section>
                    </WrapItem>
                }
                {
                    order 
                        &&
                    <>
                    <WrapItem>
                        <section className={classes.data}>
                            <h1>Заказ от {order?.date}</h1>
                            <OrderData order={order} />
                        </section>
                    </WrapItem>
                    {
                        order.methodOfReceipt === 'Самовывоз'
                            ?
                        <WrapItem>
                            <section className={classes.shop}>
                                <h2>Самовывоз</h2>
                                <ShopData 
                                    shop={order.shop}
                                />
                            </section>
                        </WrapItem>
                            :
                        <WrapItem>
                            <section className={classes.delivery}>
                                <h2>Доставка</h2>
                                <OrderDeliveryData 
                                    price={order.deliveryPrice}
                                    address={order.address}
                                />
                            </section>
                        </WrapItem>
                    }
                    {
                        order.message.length > 0
                            &&
                        <WrapItem>
                            <h2>Сообщение</h2>
                            <p>{order.message}</p>
                        </WrapItem>
                    }
                    {
                        order.deliveryMessage.length > 0
                            &&
                        <WrapItem>
                            <h2>Сообщение курьеру</h2>
                            <p>{order.deliveryMessage}</p>
                        </WrapItem>
                    }
                    <WrapItem>
                        <section className={classes.products}>
                            <h2>Товары</h2>
                            <OrderProductItem 
                                admin={isAdmin}
                                products={order.products} 
                            />
                        </section>
                    </WrapItem>
                    </>
                }
                </section>
                <section className={classes.sidebar}>
                {
                    isLoading
                        ?
                    <section className={classes.wrap}>
                        <section className={classes.loader}><LoaderDiv /></section>
                    </section>
                        :
                    order
                        &&
                    <section className={classes.wrap}>
                            <OrderDetails 
                                deliveryPrice={order.deliveryPrice}
                                productsPrice={fullPrice}
                                productCount={productCount}
                            >
                            <>
                                <h2 className={classes.statusPayment}>{order?.statusPayment}</h2>
                                {   
                                    isAdmin && order.statusOrder !== 'Выдан' && order.statusOrder !== 'Отменен'
                                        &&
                                    <section className={classes.statusChange}>
                                        <OrderStatusChange 
                                            orderId={order.id}
                                            methodOfReceipt={order.methodOfReceipt }
                                            currentStatus={order.statusOrder}
                                            setStatusOrder={setStatusOrder}
                                        />
                                    </section>
                                }
                            </>
                            </OrderDetails>
                    </section>
                }
                </section>
            </section>
            {   
                isAdmin && order && !isLoading && (order.statusOrder !== 'Отменен')
                    &&
                <section className={classes.cancel}>
                    <section className={classes.cancelWrap}>
                        <OrderStatusChange 
                            cancel={true}
                            orderId={order.id}
                            methodOfReceipt={order.methodOfReceipt }
                            currentStatus={order.statusOrder}
                            setStatusOrder={setStatusOrder}
                        />
                    </section>
                </section>
            }
        </section>
    )
}