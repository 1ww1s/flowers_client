import { FC, useState } from "react";
import { useAppSelector } from "../../../app/store/store";
import { IProductPreview, productService, useProductActions } from "../../../entities/product";
import classes from './delete.module.scss'
import { AuthError, MyButton } from "../../../shared";
import { useUserAcions } from "../../../entities/user";
import { useSignActions } from "../../../entities/sign";


interface IProps {
    product: IProductPreview;
    setOpen: (open: boolean) => void;
}

export const ProductDelete: FC<IProps> = ({product, setOpen}) => {

    const {isLoading} = useAppSelector(s => s.ProductReducer)
    const {setIsLoading} = useProductActions()
    const {setIsAuth} = useUserAcions()
    const [error, setError] = useState<string>('')
    const {setSign} = useSignActions()

    function checkProduct(): boolean {
        let isOk: boolean = true;
        if(!product.id) {
            setError('Нет id товара')
            isOk = false
        }
        return isOk
    }

    const deleteProduct = async () => {
        if(!checkProduct()){
            return
        }
        try{
            setIsLoading(true)
            await productService.delete(+product.id)
            setOpen(false)
        }
        catch(e){
            if(e instanceof Error){  // THIS
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
            setIsLoading(false)
        }
    }

    return (
        <section className={classes.button}>
            <MyButton
                width={200}
                isLoading={isLoading}
                sign={"Удалить"}
                onClick={deleteProduct}
                error={error}
            />
        </section>
    )
}