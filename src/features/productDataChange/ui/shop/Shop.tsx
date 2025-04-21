import { FC, useEffect, useState } from "react";
import { Autocomplete, MyInput } from "../../../../shared";
import { useAppSelector } from "../../../../app/store/store";
import { IProduct, useProductActions } from "../../../../entities/product";
import classes from './shop.module.scss'
import { shopService } from "../../../../entities/shop";
import close from '../../../../shared/lib/assets/icon/X.png'

interface IProps {
    ind: number;
}

export const Shop: FC<IProps> = ({ind}) => {

    const {product} = useAppSelector(s => s.ProductReducer)
    const {setError, setShops} = useProductActions()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [items, setItems] = useState<string[]>([])
    const [errorTarget, setErrorTarget] = useState<string>('')

    const getShops = async () => {
        try {
            setIsLoading(true)
            const names = await shopService.getStartsWith(product.shops[ind].title)
            const namesFiter = names.filter(name => !product.shops.find(shop => shop.title === name.title)).map(n => n.title)
            setItems(namesFiter)
        }
        catch(e){
            if(e instanceof Error){
                if(e.name === 'AbortError'){
                    return
                }
            }
            console.log(e)
        }
        finally{
            setIsLoading(false)
        }
    }

    const onChangeTitle = (newVal: string) => {
        const target: IProduct['shops'] = JSON.parse(JSON.stringify(product.shops))
        target[ind].title = newVal;
        setShops(target)
    }

    const onChangeCount = (newCount: string) => {
        const target: IProduct['shops'] = JSON.parse(JSON.stringify(product.shops))
        target[ind].count = newCount;
        setShops(target)
    }

    const deleteItem = () => {
        const target: IProduct['shops'] = JSON.parse(JSON.stringify(product.shops))
        target.splice(ind, 1)
        setShops(target)
    }

    

    useEffect(() => {
        if(product.shops[ind].title){
            getShops()
        }
        else{
            setItems([])
        }
    }, [product.shops[ind].title])

    return (

        <section className={classes.shop}>
            <section className={classes.wrap}>

                <section className={classes.search}>
                    <Autocomplete
                        value={product.shops[ind].title}
                        setValue={onChangeTitle}
                        values={items}
                        isLoading={isLoading}
                        title="Выберите магазин"
                        sign="Начните вводить название магазина и выберите из списка нужный"
                        globalError={errorTarget}
                        setGlobalError={(e) => {setErrorTarget(e); setError(e)}}
                    />
                </section>
                <section className={classes.numb}>
                    <MyInput 
                        setValue={onChangeCount}
                        value={product.shops[ind].count}
                        isSimple={false}
                        typeInput="number"
                        title="Количество товара"
                        clear={false}
                    />
                </section>     
            </section>
            <section className={classes.delete}>
               <img src={close} onClick={() => deleteItem()} className={classes.close} />   
            </section>   
        </section>
    )
}