import { FC, useEffect, useState } from "react";
import { SearchAndSelectProduct } from "../../../features/productSearchAndSelect";
import classes from './productDelete.module.scss'
import { Delete } from "./delete/Delete";
import { IProductPreview, productService } from "../../../entities/product";
import { AuthError, LoaderSpinner, MyModal, Stages } from "../../../shared";
import { useAppSelector } from "../../../app/store/store";
import { useUserAcions } from "../../../entities/user";
import { useSignActions } from "../../../entities/sign";


export const ProductDeleteModal: FC = () => {

    const [open, setOpen] = useState<boolean>(false)
    const [selectedSlug, setSelectedSlug] = useState<string>('')
    const [stage, setStage] = useState<number>(1)
    const productPrevInit = {id: '', name: '', slug: '', image: '', price: ''}
    const [selectedProduct, setSelectedProduct] = useState<IProductPreview>(productPrevInit)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const {sign} = useAppSelector(s => s.SignReducer)
    const {setIsAuth} = useUserAcions()
    const {setSign} = useSignActions()

    const onSelected = async () => {
        try{
            setIsLoading(true)
            const productPrev = await productService.getPreview(selectedSlug)
            setSelectedProduct(productPrev)
            setStage(2)
        }
        catch(e){
            if(e instanceof Error){  
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
        setStage(1)
    }, [open])
    
    useEffect(() => {
        if(selectedSlug){
            onSelected()
        }
    }, [selectedSlug])

    useEffect(() => {
        setOpen(false)
    }, [sign])

    return (
        <MyModal open={open} setOpen={setOpen} title={"Товар"}>
            <Stages stage={stage} setStage={setStage}>
                <section className={classes.content}>
                    <h2>Удалить товар</h2>
                    {stage === 1 && !isLoading && <SearchAndSelectProduct setSelected={setSelectedSlug} />}
                    {stage === 1 && isLoading && <section className={classes.loader}><LoaderSpinner /></section>}
                    {stage === 2 && <Delete selectedProduct={selectedProduct} setOpen={setOpen} />}
                </section>
            </Stages>
        </MyModal>
    )
}