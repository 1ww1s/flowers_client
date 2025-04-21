import { FC, useState } from "react";
import { useAppSelector } from "../../../app/store/store";
import classes from './delete.module.scss'
import { AuthError, MyButton } from "../../../shared";
import { useUserAcions } from "../../../entities/user";
import { useSignActions } from "../../../entities/sign";
import { shopService, useShopActions } from "../../../entities/shop";
import { itemService, useItemActions } from "../../../entities/Item";


interface IProps {
    setOpen: (open: boolean) => void;
}

export const ItemDelete: FC<IProps> = ({setOpen}) => {

    const {item, isLoading} = useAppSelector(s => s.ItemReducer)
    const {setIsLoading} = useItemActions()
    const {setIsAuth} = useUserAcions()
    const [error, setError] = useState<string>('')
    const {setSign} = useSignActions()

    function checkItem(): boolean {
        let isOk: boolean = true;
        if(!item.id) {
            setError('Нет id')
            isOk = false
        }
        return isOk
    }

    const deleteItem = async () => {
        if(!checkItem()){
            return
        }
        try{
            setIsLoading(true)
            if(item.id){
                await itemService.delete(item.id)
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
                onClick={deleteItem}
                error={error}
            />
        </section>
    )
}