import { FC } from "react";
import { useAppSelector } from "../../../app/store/store";
import classes from './send.module.scss'
import { useLocation } from "react-router-dom";
import { ADMIN_CREATE_ROUTE } from "../../../app/router/routes";
import { AuthError, MyButton } from "../../../shared";
import { useUserAcions } from "../../../entities/user";
import { useSignActions } from "../../../entities/sign";
import { itemService,  } from "../../../entities/Item";
import { characteristicService, useCharacteristicActions } from "../../../entities/characteristic";


interface IProps {
    setOpen: (open: boolean) => void;
}


export const CharacteristicSend: FC<IProps> = ({setOpen}) => {

    const {characteristic, isLoading, error} = useAppSelector(s => s.CharacteristicReducer)
    const {setIsLoading, setError} = useCharacteristicActions()
    const {pathname} = useLocation()
    const isCreate = pathname === ADMIN_CREATE_ROUTE.path
    const {setIsAuth} = useUserAcions()
    const {setSign} = useSignActions()

    function checkItem(): boolean {
        let isOk: boolean = true;
        if(!characteristic.name) {
            setError('Укажите название характеристики')
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
                await characteristicService.create(characteristic)
            }
            else{
                await characteristicService.update(characteristic)
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