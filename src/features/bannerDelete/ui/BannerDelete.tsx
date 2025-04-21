import { FC, useState } from "react";
import { useAppSelector } from "../../../app/store/store";
import classes from './delete.module.scss'
import { AuthError, MyButton } from "../../../shared";
import { useUserAcions } from "../../../entities/user";
import { useSignActions } from "../../../entities/sign";
import { bannerService, useBannerActions } from "../../../entities/banner";


interface IProps {
    setOpen: (open: boolean) => void;
}

export const BannerDelete: FC<IProps> = ({setOpen}) => {

    const {banner, isLoading} = useAppSelector(s => s.BannerReducer)
    const {setIsLoading} = useBannerActions()
    const {setIsAuth} = useUserAcions()
    const [error, setError] = useState<string>('')
    const {setSign} = useSignActions()

    function checkBanner(): boolean {
        let isOk: boolean = true;
        if(!banner.id) {
            setError('Нет id баннера')
            isOk = false
        }
        return isOk
    }

    const deleteBanner = async () => {
        if(!checkBanner()){
            return
        }
        try{
            setIsLoading(true)
            if(banner.id){
                await bannerService.delete(banner.id)
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
                sign={"Удалить"}
                onClick={deleteBanner}
                error={error}
            />
        </section>
    )
}