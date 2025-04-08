import { FC } from "react";
import { useAppSelector } from "../../../app/store/store";
import { productService, useProductActions } from "../../../entities/product";
import classes from './send.module.scss'
import { useLocation } from "react-router-dom";
import { ADMIN_CREATE_ROUTE } from "../../../app/router/routes";
import { AuthError, MyButton } from "../../../shared";
import { useUserAcions } from "../../../entities/user";
import { useSignActions } from "../../../entities/sign";


interface IProps {
    setOpen: (open: boolean) => void;
}


export const ProductSend: FC<IProps> = ({setOpen}) => {

    const {product, isLoading, error} = useAppSelector(s => s.ProductReducer)
    const {setIsLoading, setError} = useProductActions()
    const {pathname} = useLocation()
    const isCreate = pathname === ADMIN_CREATE_ROUTE.path
    const {setIsAuth} = useUserAcions()
    const {setSign} = useSignActions()

    function checkProduct(): boolean {
        let isOk: boolean = true;
        if(!product.categories.length) {
            setError('Укажите хотя бы одну категорию товара')
            isOk = false
        }
        if(!product.data.name){
            setError('Укажите имя товара')
            isOk = false
        }
        if(!product.data.price){
            setError('Укажите стоимость товара')
            isOk = false
        }
        if(!product.shops){
            setError('Укажите наличие хотя бы для одного магазина')
            isOk = false
        }
        if(!product.data.images.length){
            setError('Загрузите хотя бы одну фотографию')
            isOk = false
        }
        return isOk
    }


    const sendProduct = async () => {
        if(!checkProduct()){
            return
        }
        try{
            setIsLoading(true)
            if(isCreate){
                await productService.create(product)
            }
            else{
                await productService.update(product)
            }
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
                sign={isCreate ? "Создать" : "Обновить"}
                onClick={sendProduct}
                error={error}
            />
        </section>
    )
}