import { FC, useEffect, useState } from "react";
import classes from './update.module.scss'
import { Change } from "../change/Change";
import { Stages, LoaderSpinner, AuthError } from "../../../../shared";
import { useSignActions } from "../../../../entities/sign";
import { useUserAcions } from "../../../../entities/user";
import { characteristicService, useCharacteristicActions } from "../../../../entities/characteristic";
import { CharacteristicSearchAndSelect } from "../../../../features/characteristicSearchAndSelect";
import { Delete } from "../delete/Delete";

interface IProps {
    isUpdate: boolean;
    setOpen: (open: boolean) => void;
}

export const Update: FC<IProps> = ({isUpdate, setOpen}) => {

    const [selected, setSelected] = useState<string>('')
    const {setSign} = useSignActions()
    const [stage, setStage] = useState<number>(1)
    const [isLoadingCharacteristic, setIsLoadingCharacteristic] = useState<boolean>(false)
    const {setCharacteristic, setError} = useCharacteristicActions()
    const {setIsAuth} = useUserAcions()

    const getCharacteristic = async () => {
        try{
            setIsLoadingCharacteristic(true)
            const characteristic = await characteristicService.get(selected)
            setCharacteristic(characteristic)
            setStage(2)
        }
        catch(e){
            if(e instanceof Error){
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
            setIsLoadingCharacteristic(false)
        }
    }

    useEffect(() => {
        if(selected){
            getCharacteristic()
        }
    }, [selected])

    return (
        <section className={classes.update}>
            <Stages setStage={setStage} stage={stage}>
                <section className={classes.content}>
                    <h2>{isUpdate ? 'Обновить' : 'Удалить'} характеристику</h2>
                    { stage === 1 && !isLoadingCharacteristic && <CharacteristicSearchAndSelect setSelected={setSelected} /> } {/* Переимновать продукт селект также */}
                    { stage === 1 && isLoadingCharacteristic && <section className={classes.loader}><LoaderSpinner /></section> }
                    { stage === 2 && (isUpdate ? <Change setOpen={setOpen} /> : <Delete setOpen={setOpen} />) } 
                </section>
            </Stages>
        </section>
    )
}