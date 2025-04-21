import { Outlet, useLocation, useNavigate } from "react-router-dom";
import classes from './orderlist.module.scss'
import { NavAdmin } from "../../../entities/order";
import { useEffect, useState } from "react";
import { ADMIN_ORDERLIST_ACTIVE_ROUTE, ADMIN_ORDERLIST_ROUTE } from "../../../app/router/routes";
import { LoaderSpinner, MySelect } from "../../../shared";
import { ShopInitialState, shopService, useShopActions } from "../../../entities/shop";
import { useAppSelector } from "../../../app/store/store";
import { Pagination } from "../../../features/pagination";



export default function AdminOrderlistShopLayout() {
    const router = useNavigate()
    const {pathname} = useLocation()
    const [options, setOptions] = useState<{name: string, value: string}[]>([])
    const {setId, setTitle} = useShopActions()
    const {shop} = useAppSelector(s => s.ShopReducer)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [totalPageActive, setTotalPageActive] = useState<number>(0)
    const [totalPageArchive, setTotalPageArchive] = useState<number>(0)

    const initShop = (options: {id: number, title: string}[]) => {
        const id = localStorage.getItem('adminShopId')
        if(id){
            const isFound = options.find(o => o.id === Number(id))
            if(!isFound){
                if(options.length === 0){
                    setTitle("")
                    setId(-1)
                    localStorage.setItem('adminShopId', "")
                    localStorage.setItem('adminShopTitle', "")
                }
                else{
                    setTitle(options[0].title)
                    setId(options[0].id)
                    localStorage.setItem('adminShopId', `${options[0].id}`)
                    localStorage.setItem('adminShopTitle', `${options[0].title}`)
                }
            }
        }
    }

    const getOptions = async () => {
        try{
            setIsLoading(true)
            const options = await shopService.getOptions()
            setOptions(options.map(option => ({name: option.title, value: `${option.id}`})))
            initShop(options)
        }
        catch(e){
            console.log(e)
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if(pathname === ADMIN_ORDERLIST_ROUTE.path){
            router(ADMIN_ORDERLIST_ACTIVE_ROUTE.path, {
                replace: true
            })
        }
        else{
            const id = localStorage.getItem('adminShopId')
            const title = localStorage.getItem('adminShopTitle')
            if(id && title && id !== '' && title !== '') {
                setId(+id)
                setTitle(title)
            }
            getOptions()
        }
    }, [])

    const setVal = (id: string) => {
        const shop = options.find(o => o.value === id)
        if(shop){
            setTitle(shop.name)
            setId(+shop.value)
            localStorage.setItem('adminShopId', `${shop.value}`)
            localStorage.setItem('adminShopTitle', `${shop.name}`)
        }
    }

    return (
        <section className={classes.orderlist}>
            {
                isLoading
                    ?
                <LoaderSpinner />
                    :
                <>
                    <section className={classes.select}>
                    <MySelect 
                        multiple={false}
                        defaultValue={'Выбрать магазин'}
                        setValue={setVal}
                        value={`${shop.id === ShopInitialState.shop.id ? '' : shop.id}`}
                        options={options}
                    />
                    </section>
                    {
                        shop.title    
                            ?
                        <>
                            <h2>Заказы из магазина "{shop.title}"</h2>
                            {/* Возможно добавление фич типа фильтр по времени сбора или оформл заказа */}
                            <NavAdmin setTotalPageActive={setTotalPageActive} setTotalPageArchive={setTotalPageArchive} />
                            <Outlet />
                            <section className={classes.pagination}>
                                <Pagination totalPages={pathname.includes('active') ? totalPageActive : totalPageArchive} />
                            </section>
                        </>
                            :
                        <></>
                    }
                </>
            }
           
        </section>
    )
}