import { FC, useEffect, useState } from "react";
import classes from './update.module.scss'
import { Change } from "../change/Change";
import { Stages, LoaderSpinner, AuthError } from "../../../../shared";
import { useSignActions } from "../../../../entities/sign";
import { useUserAcions } from "../../../../entities/user";
import { bannerService, useBannerActions } from "../../../../entities/banner";
import { BannerSearchAndSelect } from "../../../../features/bannerSearchAndSelect";
import { Delete } from "../delete/Delete";
import { useLocation } from "react-router-dom";

interface IProps {
    isUpdate: boolean;
    setOpen: (open: boolean) => void;
}

export const Update: FC<IProps> = ({isUpdate, setOpen}) => {

    const [selected, setSelected] = useState<string>('')
    const {setSign} = useSignActions()
    const [stage, setStage] = useState<number>(1)
    const [isLoadingBanner, setIsLoadingBanner] = useState<boolean>(false)
    const {setBanner, setError} = useBannerActions()
    const {setIsAuth} = useUserAcions()

    const getCategory = async () => {
        try{
            setIsLoadingBanner(true)
            const banner = await bannerService.get(selected)
            setBanner(banner)
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
            setIsLoadingBanner(false)
        }
    }

    useEffect(() => {
        if(selected){
            getCategory()
        }
    }, [selected])

    return (
        <section className={classes.update}>
            <Stages setStage={setStage} stage={stage}>
                <section className={classes.content}>
                    <h2>{isUpdate ? 'Обновить' : 'Удалить'} баннер</h2>
                    { stage === 1 && !isLoadingBanner && <BannerSearchAndSelect setSelected={setSelected} /> } {/* Переимновать продукт селект также */}
                    { stage === 1 && isLoadingBanner && <section className={classes.loader}><LoaderSpinner /></section> }
                    { stage === 2 && (isUpdate ? <Change setOpen={setOpen} /> : <Delete setOpen={setOpen} />) } 
                </section>
            </Stages>
        </section>
    )
}