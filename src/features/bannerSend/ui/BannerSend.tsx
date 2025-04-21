import { FC } from "react";
import { useAppSelector } from "../../../app/store/store";
import classes from './send.module.scss'
import { useLocation } from "react-router-dom";
import { ADMIN_CREATE_ROUTE } from "../../../app/router/routes";
import { AuthError, MyButton } from "../../../shared";
import { useUserAcions } from "../../../entities/user";
import { useSignActions } from "../../../entities/sign";
import { categoryService, useCategoryActions } from "../../../entities/category";
import { bannerService, useBannerActions } from "../../../entities/banner";


interface IProps {
    setOpen: (open: boolean) => void;
}


export const BannerSend: FC<IProps> = ({setOpen}) => {

    const {banner, isLoading, error} = useAppSelector(s => s.BannerReducer)
    const {setIsLoading, setError} = useBannerActions()
    const {pathname} = useLocation()
    const isCreate = pathname === ADMIN_CREATE_ROUTE.path
    const {setIsAuth} = useUserAcions()
    const {setSign} = useSignActions()

    function checkBanner(): boolean {
        let isOk: boolean = true;
        if(!banner.title) {
            setError('Укажите наименование баннера')
            isOk = false
        }
        if(!banner.image){
            setError('Добавьте фотографию баннера')
            isOk = false
        }
        if(!banner.buttonLink){
            setError('Добавьте ссылку баннера')
            isOk = false
        }
        return isOk
    }


    const sendBanner = async () => {
        if(!checkBanner()){
            return
        }
        try{
            setIsLoading(true)
            if(isCreate){
                await bannerService.create(banner)
            }
            else{
                await bannerService.update(banner)
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
                onClick={sendBanner}
                error={error}
            />
        </section>
    )
}