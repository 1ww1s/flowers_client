import { FC, useEffect, useState } from "react";
import { ProductCharacteristicsChange } from "../../../../features/characteristicsChange";
import { useAppSelector } from "../../../../app/store/store";
import { characteristicService } from "../../../../entities/characteristic";
import { IProduct, useProductActions } from "../../../../entities/product";
import classes from './characteristics.module.scss'
import { useLocation } from "react-router-dom";
import { ADMIN_CREATE_ROUTE } from "../../../../app/router/routes";
import { useUserAcions } from "../../../../entities/user";
import { useSignActions } from "../../../../entities/sign";
import { AuthError, LoaderSpinner } from "../../../../shared";

export const Characteristics: FC = () => {

    const {product} = useAppSelector(s => s.ProductReducer)
    const {setCharacteristics} = useProductActions()
    const [characteristicNames, setCharacteristicNames] = useState<string[]>([])
    const {pathname} = useLocation()
    const isCreate = pathname === ADMIN_CREATE_ROUTE.path
    const [isLoading, setIsLoading] = useState<boolean>(isCreate)
    const {setIsAuth} = useUserAcions()
    const {setSign} = useSignActions()

    const getCharacteristics = async () => {
        try{
            setIsLoading(true)
            const names = await characteristicService.getCharacteristics()
            const characteristics: IProduct['characteristics'] = []
            names.map(characteristicName => {
                if(product.characteristics.findIndex(ch => ch.name === characteristicName) === -1) {
                    characteristics.push({
                        name: characteristicName,
                        values: []
                    })
                }
            })
            setCharacteristics([...characteristics, ...product.characteristics])
            setCharacteristicNames(names)
        }
        catch(e){
            if(e instanceof Error){  // THIS
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
        getCharacteristics()
    }, [])

    return (
        <section className={classes.characteristics}>
            <h2>Характеристики</h2>
            {
                isLoading
                    ?
                <section className={classes.loader}><LoaderSpinner /></section>
                    :
                    characteristicNames.map(characteristicName => 
                    <section key={characteristicName}>
                        {product.characteristics.filter(ch => ch.name === characteristicName).map(ch => 
                            <ProductCharacteristicsChange 
                                key={ch.name} 
                                characteristic={ch} 
                            />
                        )}
                    </section>
                )
            }
        </section>

    )
}