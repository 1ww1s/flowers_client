import { FC } from "react";
import { useAppSelector } from "../../../app/store/store";
import classes from './shopSend.module.scss'
import { useLocation } from "react-router-dom";
import { ADMIN_CREATE_ROUTE } from "../../../app/router/routes";
import { AuthError, MyButton } from "../../../shared";
import { useUserAcions } from "../../../entities/user";
import { useSignActions } from "../../../entities/sign";
import { shopService, useShopActions } from "../../../entities/shop";

interface IProps {
    setOpen: (open: boolean) => void;
}

export const ShopSend: FC<IProps> = ({setOpen}) => {

    const {shop, isLoading, error} = useAppSelector(s => s.ShopReducer)
    const {setIsLoading, setError} = useShopActions()
    const {pathname} = useLocation()
    const isCreate = pathname === ADMIN_CREATE_ROUTE.path
    const {setIsAuth} = useUserAcions()
    const {setSign} = useSignActions()

    function checkProduct(): boolean {
        let isOk: boolean = true;
        if(!shop.address) {
            setError('Укажите адрес магазина')
            isOk = false
        }
        if(!shop.openingHours){
            setError('Укажите часы работы магазина')
            isOk = false
        }
        if(!shop.coordinateX){
            setError('Укажите координату x')
            isOk = false
        }
        if(!shop.coordinateY){
            setError('Укажите координату y')
            isOk = false
        }
        return isOk
    }

    const sendShop = async () => {
        if(!checkProduct()){
            return
        }
        try{
            setIsLoading(true)
            if(isCreate){
                await shopService.create(shop)
            }
            else{
                await shopService.update(shop)
            }
            setOpen(false)
        }
        catch(e){
            if(e instanceof Error){  // THIS
                if(e instanceof AuthError && e.status === 401){
                    setIsAuth(false)
                }
                else if(e instanceof AuthError && e.status === 403) {
                    setSign({type: 'error', message: e.message})
                }
                else{
                    setError(e.message)
                }
            }
            else{
                console.log(e)
            }
        }   
        finally{
            setIsLoading(false)
        }
    }

    return (
        <section className={classes.button}>
            <MyButton 
                width={200}
                isLoading={isLoading}
                sign={isCreate ? "Создать" : "Обновить"}
                onClick={sendShop}
                error={error}
            />
        </section>
    )
}