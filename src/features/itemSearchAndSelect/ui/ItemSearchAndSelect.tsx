import { FC, useEffect, useState } from "react";
import classes from './searchAndSelect.module.scss'
import { useUserAcions } from "../../../entities/user";
import { useSignActions } from "../../../entities/sign";
import { AuthError, Autocomplete } from "../../../shared";
import { itemService } from "../../../entities/Item";

interface IProps {
    setSelected: (selected: string) => void;
}

export const ItemSearchAndSelect: FC<IProps> = ({setSelected}) => {

    const [value, setValue] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [values, setValues] = useState<string[]>([])
    const {setSign} = useSignActions()
    const {setIsAuth} = useUserAcions()

    const getList = async () => {
        try{
            setIsLoading(true)
            const names = await itemService.getStartsWith(value)
            setValues(names)
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
        finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if(value){
            getList()
        }
        else{
            setValues([])
        }
    }, [value])

    const onSelected = (name: string) => {
        setSelected(name)
    }

    return (
        <section className={classes.searchAndSelectProduct}>
            <Autocomplete 
                value={value}
                setValue={setValue}
                sign="Начните вводить имя и выберите из списка нужный вариант"
                title="Наименование цветка"
                values={values}
                setSelectedValue={(name) => onSelected(name)}
                isLoading={isLoading}
            />
        </section>
    )
}