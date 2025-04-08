import { useEffect, useState } from 'react'
import { IShop, ShopList, shopService } from '../../entities/shop'
import classes from './shops.module.scss'
import { YMaps } from '@pbe/react-yandex-maps';
import { SelectedShowShops } from '../../features/selectedShowShops';
import { LoaderDiv } from '../../shared';
import { ShopsMap } from '../../features/shopsMap';

export default function Shops(){

    const [shops, setShops] = useState<IShop[]>([])
    const [selectedList, setSelectedList] = useState<boolean>(true)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const getShops = async () => {
        try{
            setIsLoading(true)
            const data = await shopService.getAll()
            setShops(data)
        }
        catch(e){
            console.log(e)
        }
        finally{
            setIsLoading(false)
        }   
    }

    useEffect(() => {
        getShops()
    }, [])

    return (
        <section className={classes.shops}>
            <section className={classes.wrap}>
                <h1>Магазины в твери</h1>
                {
                    isLoading
                        ?
                    <section className={classes.loader}><LoaderDiv /></section>
                        :
                    <>
                    <SelectedShowShops selectedList={selectedList} setSelectedList={setSelectedList} />
                    {
                        selectedList
                            ?
                        <ShopList shops={shops} />
                            :
                        <section className={classes.map}>
                            <YMaps query={{apikey: '5232156a-499a-4991-94f5-87306751113a'}}>
                                <ShopsMap shops={shops} />
                            </YMaps>
                        </section>
                    }
                    </>
                }

            </section>
        </section>
    );
}