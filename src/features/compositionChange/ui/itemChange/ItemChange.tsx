import { FC, PropsWithChildren, useEffect, useState } from "react";
import { IItem, itemService } from "../../../../entities/Item";
import classes from './itemChange.module.scss'
import { useAppSelector } from "../../../../app/store/store";
import { useProductActions } from "../../../../entities/product";
import { AuthError, Autocomplete, MyInput } from "../../../../shared";
import { useUserAcions } from "../../../../entities/user";
import { useSignActions } from "../../../../entities/sign";


interface IProps {
    // setItem: (flower: IItem) => void;
    ind: number;
}

export const ItemChange: FC<IProps & PropsWithChildren> = ({ind, children}) => {

    const {product} = useAppSelector(s => s.ProductReducer)
    const {setComposition, setError} = useProductActions()
    const {setIsAuth} = useUserAcions()
    const {setSign} = useSignActions()
    const [name, setName] = useState<string>(product.composition[ind].name)
    const [count, setCount] = useState<string>(product.composition[ind].count)
    const [errorTarget, setErrorTarget] = useState<string>('')

    const [items, setItems] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const getItems = async () => {
        try{
            const names = await itemService.getStartsWith(name)
            setItems(names)
            setIsLoading(true)
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
            else {
                console.log(e)
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        setName(product.composition[ind].name)
        setCount(product.composition[ind].count)
    }, [product.composition[ind]])

    const changeItem = () => {
        setError('')
        const compositionNew = JSON.parse(JSON.stringify(product.composition))
        compositionNew[ind].name = name;
        compositionNew[ind].count = count;
        setComposition([...compositionNew])
    }

    useEffect(() => {
        getItems()
    }, [name])

    useEffect(() => {
        if(name.length){       
            changeItem()
        }
    }, [name, count])

    const check = () => {
        if(!items.includes(name)){
            setErrorTarget('Выберите из списка')
        }
    }

    return (
        
        <section className={classes.itemBox}>
            <section className={classes.wrap}>
                <section onBlur={check} className={classes.item}>
                    <Autocomplete
                        value={name}
                        setValue={setName}
                        values={items}
                        isLoading={isLoading}
                        title="Выберите единицу товара"
                        sign=""
                        globalError={errorTarget}
                        setGlobalError={(e) => {setErrorTarget(e); setError(e)}}
                    />
                </section>
                <section className={classes.count}>          
                    <MyInput
                        setGlobalError={setError}
                        value={count}
                        setValue={setCount}
                        title="Кол-во"
                        typeInput='number'
                        isSimple={false}
                        clear={false}
                    />
                </section>
            </section>
            <section className={classes.close}>
                {children}
            </section>
        </section>
    )
}