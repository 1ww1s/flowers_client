import { FC } from "react";
import { useAppSelector } from "../../../app/store/store";
import classes from './send.module.scss'
import { useLocation } from "react-router-dom";
import { ADMIN_CREATE_ROUTE } from "../../../app/router/routes";
import { AuthError, MyButton } from "../../../shared";
import { useUserAcions } from "../../../entities/user";
import { useSignActions } from "../../../entities/sign";
import { itemService, useItemActions } from "../../../entities/Item";


interface IProps {
    setOpen: (open: boolean) => void;
}


export const ItemSend: FC<IProps> = ({setOpen}) => {

    const {item, isLoading, error} = useAppSelector(s => s.ItemReducer)
    const {setIsLoading, setError} = useItemActions()
    const {pathname} = useLocation()
    const isCreate = pathname === ADMIN_CREATE_ROUTE.path
    const {setIsAuth} = useUserAcions()
    const {setSign} = useSignActions()

    function checkItem(): boolean {
        let isOk: boolean = true;
        if(!item.name) {
            setError('Укажите название цветка')
            isOk = false
        }
        return isOk
    }


    const sendItem = async () => {
        if(!checkItem()){
            return
        }
        try{
            setIsLoading(true)
            if(isCreate){
                await itemService.create(item)
            }
            else{
                await itemService.update(item)
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
                onClick={sendItem}
                error={error}
            />
        </section>
    )
}