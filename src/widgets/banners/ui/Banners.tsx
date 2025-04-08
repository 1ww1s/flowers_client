import { FC, useEffect, useState } from "react";
import classes from './banners.module.scss'
import { LoaderDiv } from "../../../shared";
import { bannerService, IBanner } from "../../../entities/banner";
import { BannersCarousel } from "../../../features/bannersCarousel";


export const Banners: FC = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [banners, setBanners] = useState<IBanner[]>([])

    const getBanners = async () => {
        try{    
            setIsLoading(true)
            const data = await bannerService.getAll()
            // await new Promise(resolve => setTimeout(resolve, 3000))
            setBanners(data)
        }
        catch(e){
            console.log(e)
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getBanners()
    }, [])

    return (
        <section className={classes.banners}>   
            {
                isLoading
                    ?
                <section className={classes.loader}><LoaderDiv /></section>
                    :
                <BannersCarousel banners={banners} />
            }
        </section>
    )
}