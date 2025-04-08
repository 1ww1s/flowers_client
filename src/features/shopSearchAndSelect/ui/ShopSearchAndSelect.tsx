import { FC, useEffect, useState } from "react";
import classes from './shopSearchAndSelect.module.scss'
import { useUserAcions } from "../../../entities/user";
import { useSignActions } from "../../../entities/sign";
import { AuthError, Autocomplete } from "../../../shared";
import { shopService } from "../../../entities/shop";

interface IProps {
    setSelected: (selected: string) => void;
}

export const ShopSearchAndSelect: FC<IProps> = ({setSelected}) => {

    const [value, setValue] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [values, setValues] = useState<{title: string, slug: string}[]>([])
    const {setSign} = useSignActions()
    const {setIsAuth} = useUserAcions()

    const getList = async () => {
        try{
            setIsLoading(true)
            const names = await shopService.getStartsWith(value)
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

    const onSelected = (title: string) => {
        const shop = values.find(v => v.title === title)
        if(shop){
            setSelected(shop.slug)
        }
    }

    return (
        <section className={classes.searchAndSelect}>
            <Autocomplete 
                value={value}
                setValue={setValue}
                sign="Начните вводить название магазина и выберите из списка нужный"
                title="Наименование магазина"
                values={values.map(v => v.title)}
                setSelectedValue={(name) => onSelected(name)}
                isLoading={isLoading}
            />
        </section>
    )
}