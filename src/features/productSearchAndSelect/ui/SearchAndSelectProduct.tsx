import { FC, useEffect, useState } from "react";
import { productService } from "../../../entities/product";
import classes from './searchAndSelectProd.module.scss'
import { useUserAcions } from "../../../entities/user";
import { useSignActions } from "../../../entities/sign";
import { AuthError, Autocomplete } from "../../../shared";

interface IProps {
    setSelected: (selected: string) => void;
}

export const SearchAndSelectProduct: FC<IProps> = ({setSelected}) => {

    const [value, setValue] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [values, setValues] = useState<string[]>([])
    const [initValues, setInitValues] = useState<{name: string, slug: string}[]>([])
    const {setSign} = useSignActions()
    const {setIsAuth} = useUserAcions()

    const getList = async () => {
        try{
            setIsLoading(true)
            const data = await productService.getStartsWith(value)
            setInitValues(data)
            setValues(data.map(d => d.name))
        }
        catch(e){
            if(e instanceof Error){
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
        setSelected(initValues.find(v => v.name === name)?.slug || "")
    }

    return (
        <section className={classes.searchAndSelectProduct}>
            <Autocomplete 
                value={value}
                setValue={setValue}
                sign="Начните вводить имя и выберите из списка нужный продукт"
                title="Наименование продукта"
                values={values}
                setSelectedValue={(name) => onSelected(name)}
                isLoading={isLoading}
            />
        </section>
    )
}