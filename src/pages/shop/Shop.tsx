import { useEffect, useState } from 'react'
import { IShop, shopService } from '../../entities/shop'
import classes from './shop.module.scss'
import { YMaps } from '@pbe/react-yandex-maps';
import { useParams } from 'react-router-dom';
import { LoaderDiv } from '../../shared';
import { ComeBack } from '../../features/comeBack';
import { ShopCard } from '../../widgets/shopCard';
import { Helmet } from 'react-helmet-async';

export default function Shop(){

    const [shop, setShop] = useState<IShop | null>(null)
    const {titleSlug} = useParams<{titleSlug: string}>()

    const getShop = async () => {
        try{
            const data = await shopService.get(titleSlug || "")
            setShop(data)
        }
        catch(e){
            console.log(e)
        }
        finally{

        }   
    }

    useEffect(() => {
        getShop()
    }, [])


    return (
        <section className={classes.shop}>
            <Helmet>
                <title>Магазин</title>
                <meta name="description" content="Информация о магазине" />
            </Helmet>
            <section className={classes.wrap}>
                {
                    shop    
                        ?
                    <>
                        <Helmet>
                            <title>Магазин {shop.title}</title>
                            <meta name="description" content={`Адрес: ${shop.address}, часы работы: ${shop.openingHours}`} />
                            <meta property="og:title" content={`Магазин ${shop.title}`} />
                            <meta property="og:description" content={`Адрес: ${shop.address}, часы работы: ${shop.openingHours}`} />
                        </Helmet>
                        <ComeBack
                            to='/shops'
                            text='Вернуться к списку магазинов'
                        />
                        <ShopCard shop={shop} />
                    </>
                        :
                    <section className={classes.loader}><LoaderDiv /></section>
                }

            </section>
        </section>
    );
}