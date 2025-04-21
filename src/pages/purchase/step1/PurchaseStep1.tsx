import classes from './purchase.module.scss'
import { useEffect, useState } from 'react'
import { IShop, ShopData, shopService } from '../../../entities/shop'
import { ChoiceShop } from '../../../widgets/choiceShop'
import { AvailableAndUnavailableProducts, IProductCountShop } from '../../../entities/product'
import { basketService, IBasket } from '../../../entities/basket'
import { useAppSelector } from '../../../app/store/store'
import { LoaderDiv, LoaderScreen, MyButton, Warning, WrapItem } from '../../../shared'
import { ChoosingReceivingMethod } from '../../../features/methodOfReceipt'
import { IZone, orderService, useOrderActions } from '../../../entities/order'
import { OrderDetails } from '../../../widgets/orderDetails/ui/details/OrderDetails'
import { useNavigate } from 'react-router-dom'
import { BASKET_ROUTE, MY_BASKET_ROUTE, PURCHASE_STEP2_ROUTE } from '../../../app/router/routes'
import { ComeBack } from '../../../features/comeBack'


export default function PurchaseStep1() {

    const [shops, setShops] = useState<IShop[]>([])
    const [zones, setZones] = useState<IZone[]>([])
    const [isLoadingZones, setIsLoadingZones] = useState<boolean>(true)
    const [isLoadingShops, setIsLoadingShops] = useState<boolean>(true)
    const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(true)
    const [products, setProducts] = useState<IBasket[]>([])
    const {orderCreate, error} = useAppSelector(s => s.OrderReducer)
    const {setProducts: setOrderProducts, setError, setShop, setUnavailableProducts} = useOrderActions()
    const {user} = useAppSelector(s => s.UserReducer)
    const [availableProductsCountsShop, setAvailableProductsCountsShop] = useState<IProductCountShop[]>(orderCreate.products)
    const [unavailableProductsCountsShop, setUnavailableProductsCountsShop] = useState<IProductCountShop[]>([])
    const router = useNavigate()

    const getShops = async () => {
        try{
            setIsLoadingShops(true)
            const data = await shopService.getAll()
            setShops(data)
        }
        catch(e){
            console.log(e)
        }
        finally{
            setIsLoadingShops(false)
        }   
    }
    
    const getZones = async () => {
        try{
            setIsLoadingZones(true)
            const zones = await orderService.getZones()
            setZones(zones)
        }   
        catch(e){
            console.log(e)
        }
        finally{
            setIsLoadingZones(false)
        }
    }

    const getProducts = async () => {
        try{
            setIsLoadingProducts(true)
            const data = await basketService.getItems(user.basket.map(b => b.id)) as IBasket[]
            setProducts(data)
        }
        catch(e){
            console.log(e)
        }
        finally{
            setIsLoadingProducts(false)
        }
    }

    useEffect(() => {
        getProducts()
        getZones()
        getShops()
    }, [])
    
    useEffect(() => {
        setOrderProducts(availableProductsCountsShop)
    }, [availableProductsCountsShop])

    useEffect(() => {
        setUnavailableProducts(unavailableProductsCountsShop.map(p => ({id: p.productId, count: p.count})))
    }, [unavailableProductsCountsShop])

    let productCount = 0;
    for (let product of orderCreate.products){
        productCount += product.count;
    }

    const checkGoToStep2 = () => {
        if(orderCreate.methodOfReceipt === 'Доставка'){
            if(!orderCreate.address.street.value){
                setError('Нет адреса доставки')
                return
            }
            if(orderCreate.address.price === 0){
                setError('Нет доставки по указанному адресу')
                return
            }
        }
        if(!orderCreate.shop.title){
            setError('Не выбран магазин')
            return
        }
        if(!orderCreate.products.length){
            setError('Нет товаров для оформления')
            return
        }
        router(PURCHASE_STEP2_ROUTE.path)
    }


    return (
        <>
        <section className={classes.comeBack}>
            <ComeBack text='Венуться в корзину' to={user.isAuth ? MY_BASKET_ROUTE.path : BASKET_ROUTE.path} />
        </section>
        <section className={classes.purchase}>
                <h1>Оформление заказа. Шаг 1</h1>
                <section className={classes.wrap}>
                    <section className={classes.content}>
                    {
                        isLoadingProducts || isLoadingZones
                            ?
                        <section className={classes.loader}><LoaderDiv /></section>
                            :
                        <>
                        <WrapItem>
                            <ChoosingReceivingMethod zones={zones}/>
                        </WrapItem>
                        <WrapItem>
                        <h2>Адрес магазина</h2>
                            {
                                orderCreate.shop.title
                                    ?
                                <ShopData
                                    shop={{
                                        title: orderCreate.shop.title,
                                        address: orderCreate.shop.address,
                                        openingHours: orderCreate.shop.openingHours
                                    }}
                                />
                                    :
                                <Warning title={'Для перехода на следующий шаг нужно выбрать магазин'} />
                            }
                            <ChoiceShop 
                                setSelectedShop={setShop}
                                setAvailableProductsCountsShop={setAvailableProductsCountsShop}
                                setUnavailableProductsCountsShop={setUnavailableProductsCountsShop}
                                shops={shops}
                                isLoadingShops={isLoadingShops}
                            />
                        </WrapItem>
                        <WrapItem>
                            <AvailableAndUnavailableProducts 
                                products={orderCreate.shop.title ? availableProductsCountsShop : products.map((p, ind) => ({image: p.image, count: user.basket[ind].count}))} 
                            />
                            {
                                unavailableProductsCountsShop.length
                                    ?
                                <AvailableAndUnavailableProducts 
                                    available={false} 
                                    products={unavailableProductsCountsShop} 
                                />
                                    :
                                <></>
                            }
                        </WrapItem>
                       
                        </>
                    }
                    </section>
                    <section className={classes.sidebar}>
                        <OrderDetails
                            deliveryPrice={orderCreate.address.price}
                            productCount={orderCreate.shop.title ? productCount : user.basket.reduce((prev, cur) => prev + cur.count, 0)}

                        >
                            <MyButton 
                                sign='Далее'
                                onClick={checkGoToStep2}
                                error={error}
                            />
                        </OrderDetails>
                    </section>
              </section>
        </section>
        </>
    )
}