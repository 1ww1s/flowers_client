import { FC, useEffect, useState } from "react";
import classes from './update.module.scss'
import { AuthError, LoaderSpinner, Stages } from "../../../../shared";
import { useSignActions } from "../../../../entities/sign";
import { shopService, useShopActions } from "../../../../entities/shop";
import { useUserAcions } from "../../../../entities/user";
import { ShopSearchAndSelect } from "../../../../features/shopSearchAndSelect";
import { Change } from "../change/Change";


interface IProps {
    setOpen: (open: boolean) => void;
}


export const Update: FC<IProps> = ({setOpen}) => {
 const [selected, setSelected] = useState<string>('')
    const {setSign} = useSignActions()
    const [stage, setStage] = useState<number>(1)
    const [isLoadingShop, setIsLoadingShop] = useState<boolean>(false)
    const {setShop, setError} = useShopActions()
    const {setIsAuth} = useUserAcions()

    const getCategory = async () => {
        try{
            setIsLoadingShop(true)
            const shop = await shopService.get(selected)
            setShop(shop)
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
            setIsLoadingShop(false)
        }
    }

    useEffect(() => {
        if(selected){
            getCategory()
        }
    }, [selected])
    

    return (
        <section className={classes.content}>
            <Stages setStage={setStage} stage={stage}>
                <section className={classes.content}>
                    <h2>Обновить данные о магазине</h2>
                    { stage === 1 && !isLoadingShop && <ShopSearchAndSelect setSelected={setSelected} /> } {/* Переимновать продукт селект также */}
                    { stage === 1 && isLoadingShop && <section className={classes.loader}><LoaderSpinner /></section> }
                    { stage === 2 && <Change setOpen={setOpen} /> } 
                </section>
            </Stages>
        </section>
    )
}