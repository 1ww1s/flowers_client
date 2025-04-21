import { FC, useState } from "react";
import { useAppSelector } from "../../../app/store/store";
import classes from './delete.module.scss'
import { AuthError, MyButton } from "../../../shared";
import { useUserAcions } from "../../../entities/user";
import { useSignActions } from "../../../entities/sign";
import { shopService, useShopActions } from "../../../entities/shop";


interface IProps {
    setOpen: (open: boolean) => void;
}

export const ShopDelete: FC<IProps> = ({setOpen}) => {

    const {shop, isLoading} = useAppSelector(s => s.ShopReducer)
    const {setIsLoading} = useShopActions()
    const {setIsAuth} = useUserAcions()
    const [error, setError] = useState<string>('')
    const {setSign} = useSignActions()

    function checkShop(): boolean {
        let isOk: boolean = true;
        if(!shop.id) {
            setError('Нет id магазина')
            isOk = false
        }
        return isOk
    }

    const deleteShop = async () => {
        if(!checkShop()){
            return
        }
        try{
            setIsLoading(true)
            if(shop.id){
                await shopService.delete(shop.id)
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
                sign={"Удалить"}
                onClick={deleteShop}
                error={error}
            />
        </section>
    )
}