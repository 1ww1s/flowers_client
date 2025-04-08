import { FC, useEffect, useState } from "react";
import { SearchAndSelectProduct } from "../../../../features/productSearchAndSelect";
import classes from './update.module.scss'
import { Change } from "../change/Change";
import { productService, useProductActions } from "../../../../entities/product";
import { Stages, LoaderSpinner } from "../../../../shared";
import { useSignActions } from "../../../../entities/sign";

interface IProps {
    setOpen: (open: boolean) => void;
}

export const Update: FC<IProps> = ({setOpen}) => {

    const [selected, setSelected] = useState<string>('') 
    const [stage, setStage] = useState<number>(1)
    const {setProduct} = useProductActions()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {setSign} = useSignActions()

    const getProduct = async () => {
        try{
            setIsLoading(true)
            const data = await productService.get(selected)
            setProduct(data)
            setStage(2)
        }
        catch(e){
            if(e instanceof Error){
                setSign({type: 'error', message: e.message})
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
        if(selected){
            getProduct()
        }
    }, [selected])

    return (
        <section className={classes.update}>
            <Stages setStage={setStage} stage={stage}>
                <section className={classes.content}>
                    <h2>Обновить товар</h2>
                    { stage === 1 && !isLoading && <SearchAndSelectProduct setSelected={setSelected} /> }
                    { stage === 1 && isLoading && <section className={classes.loader}><LoaderSpinner /></section> }
                    { stage === 2 && <Change setOpen={setOpen} /> } 
                </section>
            </Stages>
        </section>
    )
}