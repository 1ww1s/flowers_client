import { FC } from "react";
import { useAppSelector } from "../../../app/store/store";
import classes from './send.module.scss'
import { useLocation } from "react-router-dom";
import { ADMIN_CREATE_ROUTE } from "../../../app/router/routes";
import { AuthError, MyButton } from "../../../shared";
import { useUserAcions } from "../../../entities/user";
import { useSignActions } from "../../../entities/sign";
import { categoryService, useCategoryActions } from "../../../entities/category";


interface IProps {
    setOpen: (open: boolean) => void;
}


export const CategorySend: FC<IProps> = ({setOpen}) => {

    const {category, isLoading, error} = useAppSelector(s => s.CategoryReducer)
    const {setIsLoading, setError} = useCategoryActions()
    const {pathname} = useLocation()
    const isCreate = pathname === ADMIN_CREATE_ROUTE.path
    const {setIsAuth} = useUserAcions()
    const {setSign} = useSignActions()

    function checkProduct(): boolean {
        let isOk: boolean = true;
        if(!category.name) {
            setError('Укажите имя категории')
            isOk = false
        }
        if(!category.image){
            setError('Добавьте фотографию для категории')
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
                await categoryService.create(category)
            }
            else{
                await categoryService.update(category)
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