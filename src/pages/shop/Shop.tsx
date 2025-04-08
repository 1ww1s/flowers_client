import { useEffect, useState } from 'react'
import { IShop, shopService } from '../../entities/shop'
import classes from './shop.module.scss'
import { YMaps } from '@pbe/react-yandex-maps';
import { useParams } from 'react-router-dom';
import { LoaderDiv } from '../../shared';
import { ComeBack } from '../../features/comeBack';
import { ShopCard } from '../../widgets/shopCard';

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
            <section className={classes.wrap}>
                {
                    shop    
                        ?
                    <>
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