import { FC, useState } from "react";
import { useAppSelector } from "../../../app/store/store";
import classes from './delete.module.scss'
import { AuthError, MyButton } from "../../../shared";
import { useUserAcions } from "../../../entities/user";
import { useSignActions } from "../../../entities/sign";
import { itemService, useItemActions } from "../../../entities/Item";
import { characteristicService, useCharacteristicActions } from "../../../entities/characteristic";


interface IProps {
    setOpen: (open: boolean) => void;
}

export const CharacteristicDelete: FC<IProps> = ({setOpen}) => {

    const {characteristic, isLoading} = useAppSelector(s => s.CharacteristicReducer)
    const {setIsLoading} = useCharacteristicActions()
    const {setIsAuth} = useUserAcions()
    const [error, setError] = useState<string>('')
    const {setSign} = useSignActions()

    function checkCharacteristic(): boolean {
        let isOk: boolean = true;
        if(!characteristic.id) {
            setError('Нет id')
            isOk = false
        }
        return isOk
    }

    const deleteCharacteristic = async () => {
        if(!checkCharacteristic()){
            return
        }
        try{
            setIsLoading(true)
            if(characteristic.id){
                await characteristicService.delete(characteristic.id)
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
                onClick={deleteCharacteristic}
                error={error}
            />
        </section>
    )
}