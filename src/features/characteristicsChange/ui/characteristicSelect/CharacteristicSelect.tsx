import { FC, PropsWithChildren, useEffect, useRef, useState } from "react";
import { characteristicService } from "../../../../entities/characteristic";
import classes from './characteristicSelect.module.scss'
import { useAppSelector } from "../../../../app/store/store";
import { AuthError, Autocomplete } from "../../../../shared";
import { useProductActions } from "../../../../entities/product";
import { useUserAcions } from "../../../../entities/user";
import { useSignActions } from "../../../../entities/sign";



interface IProps {
    characteristicName: string;
    value: string;
    setValue: (val: string) => void;
}


export const CharacteristicSelect: FC<IProps & PropsWithChildren> = ({characteristicName, value, setValue, children}) => {

    const [values, setValues] = useState<string[]>([])
    const [isLoadingReq, setIsLoadingReq] = useState<boolean>(false)
    const {isLoading} = useAppSelector(s => s.ProductReducer)
    const {setError} = useProductActions()
    const {setIsAuth} = useUserAcions()
    const {setSign} = useSignActions()

    const getData = async () => {
        try{
            if(~values.findIndex(v => v === value)){
                return
            }
            setIsLoadingReq(true)
            const data = await characteristicService.getCharacteristicsValuesStartsWith(value, characteristicName)
            setValues(data)
            setIsLoadingReq(false)
        }
        catch(e){
            if(e instanceof Error){  // THIS
                if(e.name === 'AbortError'){
                    return
                }
                if(e instanceof AuthError && e.status === 401){
                    setIsAuth(false)
                }
                else {
                    setSign({type: 'error', message: e.message})
                }
            }
            else{
                console.log(e)
            }
        }
    }

    const isOne = useRef<boolean>(true)
    useEffect(() => {
        if(!isOne.current){
            getData()
        }
        else{
            isOne.current = false;
        }
    }, [value])

    return (
        <section className={classes.characteristicSelect}>
            <section className={classes.autocomplete}>
                <Autocomplete
                    title={"Значение характеристики"}
                    sign={"Выберите из списка или создайте новое"}
                    value={value}
                    setValue={setValue}
                    values={values}
                    isLoading={isLoadingReq}
                    disabled={isLoading}
                    setGlobalError={setError}
                />
            </section>
            <section className={classes.feature}> 
                {children}
            </section>
        </section>
    )
}