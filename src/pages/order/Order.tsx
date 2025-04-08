import { useLocation, useParams } from 'react-router-dom'
import classes from './order.module.scss'
import { useEffect, useState } from 'react'
import { IOrderRes, OrderDeliveryData, OrderProductItem, orderService } from '../../entities/order'
import { WrapItem } from '../../shared'
import { OrderDetails } from '../../widgets/orderDetails'
import { OrderData } from '../../widgets/orderData'
import { ShopData } from '../../entities/shop'
import { ComeBack } from '../../features/comeBack'


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
        window.scrollTo({top: 0})
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

    return (
        <section className={classes.order}>
            <section className={classes.comeBack + (isAdmin ? (' ' + classes.admin) : '')}>
                <ComeBack 
                    to={isAdmin ? '/my/admin/orderlist/active' : '/my/orderlist/active'}
                    text='Вернуться к списку заказов'
                />
            </section>
            <section className={classes.wrap}>
                <section className={classes.content}>
                    {isLoading
                        &&
                    <>
                        <WrapItem isLoading={isLoading} />
                        <WrapItem isLoading={isLoading} />
                    </>
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
                    <OrderDetails 
                        isLoading={isLoading}
                        deliveryPrice={order?.deliveryPrice}
                        productsPrice={fullPrice}
                        productCount={productCount}
                    >
                        <h2 className={classes.statusPayment}>{order?.statusPayment}</h2>
                    </OrderDetails>
                </section>
            </section>
        </section>
    )
}